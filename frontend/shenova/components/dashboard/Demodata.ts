export const dashboardStats = {
  datasets: 12,
  analyses: 8,
  approvedModels: 1,
  completed: 8,
};

export const recentAnalyses = [
  {
    id: "AN-001",
    name: "Breast Cancer Analysis",
    dataset: "breast_cancer_patients.csv",
    model: "SHENOVA Breast Cancer Risk Model",
    status: "Completed",
    date: "08 Oct 2026",
    prediction: "Benign",
    confidence: 94.7,
    records: 569,
    features: 30,
    inferenceTime: "2.84s",
    encryption: "CKKS",
  },

  {
    id: "AN-002",
    name: "Breast Cancer Analysis",
    dataset: "hospital_dataset_02.csv",
    model: "SHENOVA Breast Cancer Risk Model",
    status: "Completed",
    date: "07 Oct 2026",
    prediction: "Malignant",
    confidence: 88.6,
    records: 412,
    features: 30,
    inferenceTime: "2.61s",
    encryption: "CKKS",
  },

  {
    id: "AN-003",
    name: "Breast Cancer Analysis",
    dataset: "patient_risk_demo.csv",
    model: "SHENOVA Breast Cancer Risk Model",
    status: "Completed",
    date: "06 Oct 2026",
    prediction: "Benign",
    confidence: 91.8,
    records: 287,
    features: 30,
    inferenceTime: "2.47s",
    encryption: "CKKS",
  },
];

export const demoModel = {
  id: "shenova-breast-cancer-v1",
  name: "SHENOVA Breast Cancer Risk Model",
  version: "1.0",
  task: "Breast Cancer Classification",
  heScheme: "CKKS",
  status: "Approved",
  heCompatible: true,
};