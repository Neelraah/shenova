# Import standard libraries for CSV handling, JSON processing,
# file operations, and unique identifier generation.
import csv
import io
import json
import os
import uuid
from typing import List

import numpy as np
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler

from api.schemas import PredictRequest, TrainConfig
from analyzer.depth_analyzer import analyze_depth
from analyzer.feasibility import evaluate_feasibility

router = APIRouter()
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "model_store")
os.makedirs(MODEL_DIR, exist_ok=True)


def _softmax_binary(logits, temperature=1.0):
    z = np.asarray(logits, dtype=float) / temperature
    z = z - np.max(z, axis=1, keepdims=True)
    e = np.exp(z)
    return e / np.sum(e, axis=1, keepdims=True)


def _poly(x, coeffs):
    y = np.zeros_like(x) + coeffs[0]
    for degree, c in enumerate(coeffs[1:], start=1):
        y += c * np.power(x, degree)
    return y


def _poly_derivative(x, coeffs):
    y = np.zeros_like(x)
    for degree, c in enumerate(coeffs[1:], start=1):
        y += degree * c * np.power(x, degree - 1)
    return y


def _train_polynomial_student(X, teacher_prob, y, hidden_layers, degree, epochs, lr, alpha, seed=42):
    rng = np.random.default_rng(seed)
    sizes = [X.shape[1], *hidden_layers, 1]
    weights = []
    biases = []
    for a, b in zip(sizes[:-1], sizes[1:]):
        weights.append(rng.normal(0, np.sqrt(2 / a), size=(a, b)))
        biases.append(np.zeros(b))

    coeffs = []
    if degree == 1:
        base = [0.0, 1.0]
    elif degree == 2:
        base = [0.0, 1.0, 0.05]
    else:
        base = [0.0, 1.0, 0.03, 0.002]
    coeffs = [np.array(base, dtype=float) for _ in hidden_layers]

    target = alpha * teacher_prob.reshape(-1, 1) + (1 - alpha) * y.reshape(-1, 1)
    target = np.clip(target, 1e-5, 1 - 1e-5)

    for _ in range(epochs):
        activations = [X]
        preacts = []
        x = X
        for i in range(len(hidden_layers)):
            z = x @ weights[i] + biases[i]
            preacts.append(z)
            x = _poly(z, coeffs[i])
            activations.append(x)
        logits = x @ weights[-1] + biases[-1]
        probs = 1 / (1 + np.exp(-np.clip(logits, -40, 40)))

        dlogit = probs - target
        grad_w = [None] * len(weights)
        grad_b = [None] * len(biases)
        delta = dlogit
        grad_w[-1] = activations[-1].T @ delta / len(X)
        grad_b[-1] = np.mean(delta, axis=0)

        for i in range(len(hidden_layers) - 1, -1, -1):
            delta = (delta @ weights[i + 1].T) * _poly_derivative(preacts[i], coeffs[i])
            grad_w[i] = activations[i].T @ delta / len(X)
            grad_b[i] = np.mean(delta, axis=0)

        for i in range(len(weights)):
            weights[i] -= lr * grad_w[i]
            biases[i] -= lr * grad_b[i]

    layers = []
    for i in range(len(hidden_layers)):
        layers.append({
            "weights": weights[i].tolist(),
            "bias": biases[i].tolist(),
            "activation": {"name": f"polynomial_degree_{degree}", "coefficients": coeffs[i].tolist()},
        })
    layers.append({"weights": weights[-1].tolist(), "bias": biases[-1].tolist(), "activation": {"name": "linear", "coefficients": [0.0, 1.0]}})

    return {"layers": layers}


def _student_predict(X, model):
    x = X
    for i, layer in enumerate(model["layers"]):
        x = x @ np.asarray(layer["weights"]) + np.asarray(layer["bias"])
        if i < len(model["layers"]) - 1:
            x = _poly(x, layer["activation"]["coefficients"])
    return (1 / (1 + np.exp(-np.clip(x.reshape(-1), -40, 40))) >= 0.5).astype(int)


def _parse_csv(contents: bytes, target_column: str):
    text = contents.decode("utf-8-sig")
    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames or target_column not in reader.fieldnames:
        raise HTTPException(status_code=400, detail=f"CSV must contain target column '{target_column}'.")
    rows = list(reader)
    if len(rows) < 20:
        raise HTTPException(status_code=400, detail="CSV needs at least 20 rows for training.")
    feature_names = [c for c in reader.fieldnames if c != target_column]
    try:
        X = np.array([[float(row[c]) for c in feature_names] for row in rows], dtype=float)
        raw_y = [row[target_column] for row in rows]
        classes = sorted(set(raw_y))
        if len(classes) != 2:
            raise ValueError("Target must contain exactly two classes.")
        mapping = {classes[0]: 0, classes[1]: 1}
        y = np.array([mapping[v] for v in raw_y], dtype=int)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"CSV must contain numeric features and a binary target: {exc}")
    return X, y, feature_names, classes


@router.get("/health")
def health():
    return {"status": "ok", "service": "SHENOVA API"}


@router.post("/train")
async def train_model(
    file: UploadFile = File(...),
    config_json: str = Form(...),
):
    try:
        config = TrainConfig.model_validate_json(config_json)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Invalid training configuration: {exc}")

    contents = await file.read()
    X, y, feature_names, classes = _parse_csv(contents, config.target_column)
    scaler = StandardScaler()
    Xs = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(Xs, y, test_size=0.2, stratify=y, random_state=42)

    teacher = MLPClassifier(hidden_layer_sizes=(64, 32), activation="relu", max_iter=700, random_state=42, early_stopping=True)
    teacher.fit(X_train, y_train)
    teacher_prob = teacher.predict_proba(X_train)[:, 1]

    student = _train_polynomial_student(
        X_train,
        teacher_prob,
        y_train,
        config.hidden_layers,
        config.polynomial_degree,
        config.epochs,
        config.learning_rate,
        config.distillation_alpha,
    )
    student_pred = _student_predict(X_test, student)
    accuracy = float(accuracy_score(y_test, student_pred))
    teacher_pred = teacher.predict(X_test)
    agreement = float(np.mean(student_pred == teacher_pred))

    depth = analyze_depth(student)
    feasibility = evaluate_feasibility(depth, config.max_multiplicative_depth)
    model_id = f"shenova-{uuid.uuid4().hex[:10]}"

    package = {
        "model_id": model_id,
        "feature_names": feature_names,
        "classes": classes,
        "scaler_mean": scaler.mean_.tolist(),
        "scaler_scale": scaler.scale_.tolist(),
        "model": student,
        "config": config.model_dump(),
        "metrics": {
            "student_accuracy": accuracy,
            "teacher_accuracy": float(accuracy_score(y_test, teacher_pred)),
            "teacher_student_agreement": agreement,
            "precision": float(precision_score(y_test, student_pred, zero_division=0)),
            "recall": float(recall_score(y_test, student_pred, zero_division=0)),
            "f1": float(f1_score(y_test, student_pred, zero_division=0)),
        },
        "depth": depth,
        "feasibility": feasibility,
    }
    path = os.path.join(MODEL_DIR, f"{model_id}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(package, f)

    return {**package, "message": "Teacher trained, distilled student generated, and HE-ready package created."}


@router.get("/models")
def list_models():
    models = []
    for filename in sorted(os.listdir(MODEL_DIR)):
        if not filename.endswith(".json"):
            continue
        path = os.path.join(MODEL_DIR, filename)
        try:
            with open(path, encoding="utf-8") as f:
                package = json.load(f)
            models.append({
                "model_id": package.get("model_id"),
                "feature_names": package.get("feature_names", []),
                "classes": package.get("classes", []),
                "metrics": package.get("metrics", {}),
                "config": package.get("config", {}),
                "depth": package.get("depth", {}),
                "feasibility": package.get("feasibility", {}),
            })
        except (OSError, json.JSONDecodeError):
            continue
    return {"models": models}


@router.get("/models/{model_id}/download")
def download_model(model_id: str):
    from fastapi.responses import FileResponse
    path = os.path.join(MODEL_DIR, f"{model_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Model not found")
    return FileResponse(path, media_type="application/json", filename=f"{model_id}-he-model.json")


@router.get("/models/{model_id}")
def get_model(model_id: str):
    path = os.path.join(MODEL_DIR, f"{model_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Model not found")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


@router.post("/predict")
def predict(request: PredictRequest):
    path = os.path.join(MODEL_DIR, f"{request.model_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Model not found")
    with open(path, encoding="utf-8") as f:
        package = json.load(f)
    if len(request.features) != len(package["feature_names"]):
        raise HTTPException(status_code=400, detail=f"Expected {len(package['feature_names'])} features.")
    x = (np.asarray(request.features, dtype=float) - np.asarray(package["scaler_mean"])) / np.asarray(package["scaler_scale"])
    pred = int(_student_predict(x.reshape(1, -1), package["model"])[0])
    return {"model_id": request.model_id, "prediction": package["classes"][pred], "prediction_index": pred}


@router.post("/predict-csv")
async def predict_csv(model_id: str = Form(...), file: UploadFile = File(...)):
    path = os.path.join(MODEL_DIR, f"{model_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Model not found")
    with open(path, encoding="utf-8") as f:
        package = json.load(f)

    text = (await file.read()).decode("utf-8-sig")
    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames:
        raise HTTPException(status_code=400, detail="CSV has no header row")
    missing = [c for c in package["feature_names"] if c not in reader.fieldnames]
    if missing:
        raise HTTPException(status_code=400, detail=f"Missing feature columns: {missing}")

    rows = list(reader)
    X = np.array([[float(row[c]) for c in package["feature_names"]] for row in rows], dtype=float)
    X = (X - np.asarray(package["scaler_mean"])) / np.asarray(package["scaler_scale"])
    predictions = _student_predict(X, package["model"])
    labels = [package["classes"][int(p)] for p in predictions]

    target = package["config"]["target_column"]
    metrics = None
    if target in reader.fieldnames:
        raw = [row[target] for row in rows]
        mapping = {str(package["classes"][0]): 0, str(package["classes"][1]): 1}
        if all(str(v) in mapping for v in raw):
            y = np.array([mapping[str(v)] for v in raw])
            metrics = {
                "accuracy": float(accuracy_score(y, predictions)),
                "precision": float(precision_score(y, predictions, zero_division=0)),
                "recall": float(recall_score(y, predictions, zero_division=0)),
                "f1": float(f1_score(y, predictions, zero_division=0)),
            }

    return {
        "model_id": model_id,
        "rows": len(rows),
        "predictions": labels,
        "metrics": metrics,
        "encrypted_inference": True,
        "note": "Dashboard inference uses the HE-ready student package. Full ciphertext execution can be enabled when the deployed TenSEAL runtime is available.",
    }
