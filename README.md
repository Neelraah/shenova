# SHENOVA

Constraint-aware student-model optimization for HE-compatible inference.

## Fast local demo

### 1. Backend

```bash
cd shenova
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

### 2. Frontend

```bash
cd frontend/shenova
npm install
npm run dev
```

Open `http://localhost:3000/dashboard`.

## Demo dataset

`demo_data/demo_healthcare.csv` is synthetic demo data only. Upload a real binary-classification CSV later by changing the target column in the dashboard.

## Dashboard flow

1. Upload training CSV.
2. Specify hospital constraints: target column, student hidden layers, polynomial degree, HE multiplicative-depth budget, epochs and accuracy target.
3. SHENOVA trains a ReLU teacher and a fresh polynomial student through knowledge-distillation-style targets.
4. The resulting model is stored as an HE-ready package with architecture, scaler, metrics and depth/feasibility analysis.
5. Download the model package or upload a patient CSV for dashboard inference.

### Important terminology

The current package keeps model weights in the downloadable model artifact and treats CKKS as the input/inference protection layer. It does **not** claim that the model weights themselves are encrypted. Full ciphertext execution should be benchmarked in the deployed TenSEAL runtime before presenting latency/noise figures as measured research results.
