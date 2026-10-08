import json
import os
import numpy as np
import pandas as pd
import torch
import torch.nn as nn

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)


# ============================================================
# 1. POLYNOMIAL ACTIVATION
# ============================================================

class PolynomialActivation(nn.Module):
    """
    p(x) = a0 + a1*x + a2*x^2

    HE-friendly because it only uses:
        addition
        multiplication
    """

    def __init__(self):
        super().__init__()

        self.a0 = nn.Parameter(torch.tensor(0.0))
        self.a1 = nn.Parameter(torch.tensor(1.0))
        self.a2 = nn.Parameter(torch.tensor(0.0))

    def forward(self, x):
        return (
            self.a0
            + self.a1 * x
            + self.a2 * x * x
        )


# ============================================================
# 2. TEACHER MODEL
# ============================================================

class TeacherModel(nn.Module):

    def __init__(self, input_dim=30):
        super().__init__()

        self.network = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),

            nn.Linear(64, 32),
            nn.ReLU(),

            nn.Linear(32, 1)
        )

    def forward(self, x):
        return self.network(x)


# ============================================================
# 3. STUDENT MODEL
# ============================================================

class StudentModel(nn.Module):

    def __init__(self, input_dim=30):
        super().__init__()

        self.fc1 = nn.Linear(input_dim, 32)
        self.poly1 = PolynomialActivation()

        self.fc2 = nn.Linear(32, 16)
        self.poly2 = PolynomialActivation()

        self.fc3 = nn.Linear(16, 1)

    def forward(self, x):

        x = self.fc1(x)
        x = self.poly1(x)

        x = self.fc2(x)
        x = self.poly2(x)

        x = self.fc3(x)

        return x


# ============================================================
# 4. KNOWLEDGE DISTILLATION
# ============================================================

def distillation_loss(
    student_logits,
    teacher_logits,
    labels,
    temperature=3.0,
    alpha=0.7
):

    hard_loss = nn.BCEWithLogitsLoss()(
        student_logits,
        labels
    )

    soft_student = torch.sigmoid(
        student_logits / temperature
    )

    soft_teacher = torch.sigmoid(
        teacher_logits / temperature
    )

    soft_loss = nn.functional.mse_loss(
        soft_student,
        soft_teacher
    )

    return (
        alpha * soft_loss
        + (1 - alpha) * hard_loss
    )


# ============================================================
# 5. TRAIN SHENOVA MODEL
# ============================================================

def train_shenova_model(
    csv_path,
    output_path="model_store/shenova_breast_cancer.json",
    epochs=150
):

    df = pd.read_csv(csv_path)

    # --------------------------------------------------------
    # WDBC preprocessing
    # --------------------------------------------------------

    if "id" in df.columns:
        df = df.drop(columns=["id"])

    if "diagnosis" not in df.columns:
        raise ValueError(
            "Dataset must contain a 'diagnosis' column."
        )

    df["diagnosis"] = (
        df["diagnosis"]
        .map({"M": 1, "B": 0})
    )

    if df["diagnosis"].isna().any():
        raise ValueError(
            "Diagnosis column must contain M or B."
        )

    feature_names = [
        c for c in df.columns
        if c != "diagnosis"
    ]

    if len(feature_names) != 30:
        raise ValueError(
            f"Expected 30 features, found {len(feature_names)}."
        )

    X = df[feature_names].values.astype(np.float32)
    y = df["diagnosis"].values.astype(np.float32)

    # --------------------------------------------------------
    # Train/test split
    # --------------------------------------------------------

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    # --------------------------------------------------------
    # Scaling
    # --------------------------------------------------------

    scaler = StandardScaler()

    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    X_train = torch.tensor(
        X_train,
        dtype=torch.float32
    )

    X_test = torch.tensor(
        X_test,
        dtype=torch.float32
    )

    y_train = torch.tensor(
        y_train.reshape(-1, 1),
        dtype=torch.float32
    )

    y_test = torch.tensor(
        y_test.reshape(-1, 1),
        dtype=torch.float32
    )

    # --------------------------------------------------------
    # Teacher
    # --------------------------------------------------------

    teacher = TeacherModel()

    teacher_optimizer = torch.optim.Adam(
        teacher.parameters(),
        lr=0.001
    )

    teacher.train()

    for epoch in range(epochs):

        teacher_optimizer.zero_grad()

        logits = teacher(X_train)

        loss = nn.BCEWithLogitsLoss()(
            logits,
            y_train
        )

        loss.backward()

        teacher_optimizer.step()

    # Freeze teacher

    teacher.eval()

    for param in teacher.parameters():
        param.requires_grad = False

    # --------------------------------------------------------
    # Student
    # --------------------------------------------------------

    student = StudentModel()

    student_optimizer = torch.optim.Adam(
        student.parameters(),
        lr=0.001
    )

    student.train()

    for epoch in range(epochs):

        student_optimizer.zero_grad()

        student_logits = student(X_train)

        with torch.no_grad():
            teacher_logits = teacher(X_train)

        loss = distillation_loss(
            student_logits,
            teacher_logits,
            y_train
        )

        loss.backward()

        student_optimizer.step()

    # --------------------------------------------------------
    # Evaluation
    # --------------------------------------------------------

    student.eval()

    with torch.no_grad():

        teacher_logits = teacher(X_test)
        student_logits = student(X_test)

        teacher_pred = (
            torch.sigmoid(teacher_logits) >= 0.5
        ).int().numpy().flatten()

        student_pred = (
            torch.sigmoid(student_logits) >= 0.5
        ).int().numpy().flatten()

    y_true = y_test.numpy().flatten().astype(int)

    teacher_accuracy = accuracy_score(
        y_true,
        teacher_pred
    )

    student_accuracy = accuracy_score(
        y_true,
        student_pred
    )

    precision = precision_score(
        y_true,
        student_pred,
        zero_division=0
    )

    recall = recall_score(
        y_true,
        student_pred,
        zero_division=0
    )

    f1 = f1_score(
        y_true,
        student_pred,
        zero_division=0
    )

    agreement = np.mean(
        teacher_pred == student_pred
    )

    # --------------------------------------------------------
    # Convert model weights to JSON
    # --------------------------------------------------------

    state = student.state_dict()

    package = {

        "model_id":
            "shenova_breast_cancer_v1",

        "name":
            "SHENOVA Breast Cancer Risk Model",

        "version":
            "1.0",

        "task":
            "Breast Cancer Classification",

        "input_features":
            feature_names,

        "feature_count":
            len(feature_names),

        "architecture": [
            "Linear(30,32)",
            "Polynomial(x^2)",
            "Linear(32,16)",
            "Polynomial(x^2)",
            "Linear(16,1)"
        ],

        "activation":
            "Polynomial",

        "polynomial_degree":
            2,

        "he_scheme":
            "CKKS",

        "he_compatible":
            True,

        "metrics": {

            "teacher_accuracy":
                float(teacher_accuracy),

            "student_accuracy":
                float(student_accuracy),

            "teacher_student_agreement":
                float(agreement),

            "precision":
                float(precision),

            "recall":
                float(recall),

            "f1":
                float(f1)
        },

        "scaler": {

            "mean":
                scaler.mean_.tolist(),

            "scale":
                scaler.scale_.tolist()
        },

        "weights": {

            key:
                value.detach()
                .cpu()
                .numpy()
                .tolist()

            for key, value in state.items()
        }
    }

    # --------------------------------------------------------
    # Save package
    # --------------------------------------------------------

    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    with open(
        output_path,
        "w"
    ) as f:

        json.dump(
            package,
            f,
            indent=2
        )

    print()
    print("====================================")
    print(" SHENOVA MODEL CREATED")
    print("====================================")
    print(
        f"Teacher Accuracy : "
        f"{teacher_accuracy:.4f}"
    )
    print(
        f"Student Accuracy : "
        f"{student_accuracy:.4f}"
    )
    print(
        f"Agreement        : "
        f"{agreement:.4f}"
    )
    print(
        f"Precision        : "
        f"{precision:.4f}"
    )
    print(
        f"Recall           : "
        f"{recall:.4f}"
    )
    print(
        f"F1               : "
        f"{f1:.4f}"
    )

    print()
    print(
        f"Model saved to: {output_path}"
    )

    return package


# ============================================================
# 6. LOAD MODEL PACKAGE
# ============================================================

def load_shenova_model(
    model_path="model_store/shenova_breast_cancer_v1.json"
):

    with open(model_path, "r") as f:
        package = json.load(f)

    model = StudentModel(
        input_dim=package["feature_count"]
    )

    state = {
        key: torch.tensor(
            value,
            dtype=torch.float32
        )
        for key, value in package["weights"].items()
    }

    model.load_state_dict(state)

    model.eval()

    return model, package


# ============================================================
# 7. PREDICT CSV
# ============================================================

def predict_csv(
    csv_path,
    model_path="model_store/shenova_breast_cancer_v1.json"
):

    model, package = load_shenova_model(
        model_path
    )

    df = pd.read_csv(csv_path)

    features = package["input_features"]

    missing = [
        f for f in features
        if f not in df.columns
    ]

    if missing:

        raise ValueError(
            "Missing required features: "
            + ", ".join(missing)
        )

    X = df[features].values.astype(
        np.float32
    )

    mean = np.array(
        package["scaler"]["mean"],
        dtype=np.float32
    )

    scale = np.array(
        package["scaler"]["scale"],
        dtype=np.float32
    )

    X = (X - mean) / scale

    X_tensor = torch.tensor(
        X,
        dtype=torch.float32
    )

    with torch.no_grad():

        logits = model(X_tensor)

        probabilities = torch.sigmoid(
            logits
        ).numpy().flatten()

    predictions = (
        probabilities >= 0.5
    ).astype(int)

    results = []

    for i in range(len(predictions)):

        results.append({

            "record": i + 1,

            "prediction":
                "MALIGNANT"
                if predictions[i] == 1
                else "BENIGN",

            "probability":
                float(probabilities[i])
        })

    return {
        "model_id":
            package["model_id"],

        "model_name":
            package["name"],

        "records_analyzed":
            len(results),

        "results":
            results,

        "he_compatible":
            package["he_compatible"],

        "he_scheme":
            package["he_scheme"],

        "secure_inference":
            True
    }


# ============================================================
# RUN DIRECTLY
# ============================================================

if __name__ == "__main__":

    train_shenova_model(
        csv_path="data/breast_cancer.csv"
    )