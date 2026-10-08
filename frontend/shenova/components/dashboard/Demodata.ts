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
  },
  {
    id: "AN-002",
    name: "Breast Cancer Analysis",
    dataset: "hospital_dataset_02.csv",
    model: "SHENOVA Breast Cancer Risk Model",
    status: "Completed",
    date: "07 Oct 2026",
  },
  {
    id: "AN-003",
    name: "Patient Risk Analysis",
    dataset: "patient_risk_demo.csv",
    model: "SHENOVA Breast Cancer Risk Model",
    status: "Completed",
    date: "06 Oct 2026",
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