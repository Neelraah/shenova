"use client";

import { useRef, useState } from "react";
import { demoModel } from "./Demodata";

interface NewAnalysisProps {
  onAnalysisStart?: () => void;
}

interface AnalysisRecord {
  id: string;
  name: string;
  dataset: string;
  model: string;
  modelVersion: string;
  status: "Processing" | "Completed";
  date: string;
  createdAt: string;
  records: number;
  features: number;
  result: {
    prediction: string;
    confidence: number;
    inferenceTime: string;
  };
  security: {
    encryption: string;
    encryptedInference: boolean;
    patientDataExposure: string;
    modelCompatibility: string;
  };
}

const ANALYSES_KEY = "shenova_analyses";
const CURRENT_ANALYSIS_KEY = "shenova_current_analysis";

export default function NewAnalysis({
  onAnalysisStart,
}: NewAnalysisProps) {
  const [step, setStep] = useState(1);
  const [uploaded, setUploaded] = useState(false);
  const [modelSelected, setModelSelected] = useState(false);

  // Currently selected dataset
  const [datasetName, setDatasetName] = useState(
    "breast_cancer_patients_01.csv"
  );

  // Number of records in the selected demo dataset
  const [datasetRecords, setDatasetRecords] = useState(569);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* =================================================
     DATASET UPLOAD
     ================================================= */

  const handleUpload = () => {
    setUploaded(true);
    setDatasetName("breast_cancer_patients_01.csv");
    setDatasetRecords(569);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    setDatasetName(file.name);

    /*
      Demo dataset metadata.

      These values correspond to the three
      synthetic SHENOVA demonstration datasets.
    */

    if (file.name.includes("_01")) {
      setDatasetRecords(569);
    } else if (file.name.includes("_02")) {
      setDatasetRecords(412);
    } else if (file.name.includes("_03")) {
      setDatasetRecords(287);
    } else {
      /*
        Unknown CSV:
        Keep a reasonable default for the MVP.
      */
      setDatasetRecords(569);
    }

    setUploaded(true);
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  /* =================================================
     LOCAL ANALYSIS STORAGE
     ================================================= */

  const getExistingAnalyses = (): AnalysisRecord[] => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = localStorage.getItem(ANALYSES_KEY);

      if (!stored) {
        return [];
      }

      return JSON.parse(stored);
    } catch {
      return [];
    }
  };

  const generateAnalysisId = (
    analyses: AnalysisRecord[]
  ) => {
    const numbers = analyses
      .map((analysis) => {
        const match = analysis.id.match(/AN-(\d+)/);

        return match ? Number(match[1]) : 0;
      })
      .filter((number) => number > 0);

    const nextNumber =
      numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1;

    return `AN-${String(nextNumber).padStart(3, "0")}`;
  };

  /* =================================================
     RUN ANALYSIS
     ================================================= */

  const handleRunAnalysis = () => {
    if (!uploaded || !modelSelected) {
      return;
    }

    const existingAnalyses =
      getExistingAnalyses();

    const analysisId =
      generateAnalysisId(existingAnalyses);

    const now = new Date();

    /*
      -------------------------------------------------
      DEMO RESULT MAPPING
      -------------------------------------------------

      Dataset 01
      -> Benign
      -> 94.7%
      -> 2.84s

      Dataset 02
      -> Malignant
      -> 88.6%
      -> 2.61s

      Dataset 03
      -> Benign
      -> 91.8%
      -> 2.47s

      These are DEMO/UI values only.
      They are not clinical predictions.
    */

    let prediction = "Benign";
    let confidence = 94.7;
    let inferenceTime = "2.84s";

    if (datasetName.includes("_02")) {
      prediction = "Malignant";
      confidence = 88.6;
      inferenceTime = "2.61s";
    } else if (datasetName.includes("_03")) {
      prediction = "Benign";
      confidence = 91.8;
      inferenceTime = "2.47s";
    }

    const newAnalysis: AnalysisRecord = {
      id: analysisId,

      name: "Breast Cancer Analysis",

      dataset: datasetName,

      model: demoModel.name,

      modelVersion: demoModel.version,

      status: "Processing",

      date: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      createdAt: now.toISOString(),

      /*
        Current MVP uses the WDBC-style
        30-feature dataset structure.
      */
      records: datasetRecords,

      features: 30,

      /*
        Demo result values.

        These will later be replaced by
        actual HE inference output.
      */
      result: {
        prediction,
        confidence,
        inferenceTime,
      },

      security: {
        encryption: demoModel.heScheme,

        encryptedInference: true,

        patientDataExposure: "None",

        modelCompatibility:
          demoModel.heCompatible
            ? "HE Compatible"
            : "Not Compatible",
      },
    };

    /*
      Save analysis metadata locally.

      IMPORTANT:
      We are NOT storing the actual patient dataset.
      Only analysis metadata is stored in localStorage.
    */

    const updatedAnalyses = [
      newAnalysis,
      ...existingAnalyses,
    ];

    localStorage.setItem(
      ANALYSES_KEY,
      JSON.stringify(updatedAnalyses)
    );

    /*
      Remember which analysis is currently running.
    */

    localStorage.setItem(
      CURRENT_ANALYSIS_KEY,
      analysisId
    );

    /*
      Move to Analysis Progress page.
    */

    if (onAnalysisStart) {
      onAnalysisStart();
    }
  };

  return (
    <div className="space-y-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
          Secure Analysis
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          New Analysis
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          Analyze sensitive healthcare data using an approved SHENOVA
          model while keeping patient data protected during computation.
        </p>
      </div>

      {/* =================================================
          STEP INDICATOR
      ================================================= */}

      <div className="flex items-center gap-2">

        <StepIndicator
          number="01"
          label="Dataset"
          active={step === 1}
          completed={step > 1}
        />

        <div className="h-px w-10 bg-white/10" />

        <StepIndicator
          number="02"
          label="Model"
          active={step === 2}
          completed={step > 2}
        />

        <div className="h-px w-10 bg-white/10" />

        <StepIndicator
          number="03"
          label="Security"
          active={step === 3}
          completed={false}
        />

      </div>

      {/* =================================================
          STEP 1 — DATASET
      ================================================= */}

      {step === 1 && (
        <section className="max-w-3xl rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

          <div className="mb-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
              Step 01
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Upload Healthcare Dataset
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Upload the dataset you want to analyze using an approved
              SHENOVA model.
            </p>
          </div>

          {!uploaded ? (
            <>
              {/* Hidden real file input */}

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload area */}

              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="
                  group
                  flex
                  min-h-[240px]
                  w-full
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-white/15
                  bg-white/[0.015]
                  transition
                  hover:border-white/25
                  hover:bg-white/[0.03]
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-xl
                    text-zinc-500
                    transition
                    group-hover:text-white
                  "
                >
                  ↑
                </div>

                <p className="mt-5 text-sm font-medium text-zinc-300">
                  Drop your CSV dataset here
                </p>

                <p className="mt-2 text-xs text-zinc-600">
                  or click to browse files
                </p>

                <span className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500">
                  CSV files only
                </span>

              </button>

              {/* Demo helper */}

              <button
                onClick={handleUpload}
                className="mt-4 text-xs text-zinc-600 underline underline-offset-4 transition hover:text-zinc-400"
              >
                Use demo dataset · 569 records
              </button>
            </>
          ) : (
            <DatasetUploaded
              datasetName={datasetName}
              records={datasetRecords}
            />
          )}

          {uploaded && (
            <div className="mt-7 flex justify-end">

              <button
                onClick={handleContinue}
                className="
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-zinc-200
                "
              >
                Continue to Model →
              </button>

            </div>
          )}

        </section>
      )}

      {/* =================================================
          STEP 2 — MODEL
      ================================================= */}

      {step === 2 && (
        <section className="max-w-3xl rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

          <div className="mb-7">

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
              Step 02
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Select Approved Model
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Select a validated model from the SHENOVA model library.
            </p>

          </div>

          {/* Model card */}

          <button
            onClick={() =>
              setModelSelected(true)
            }
            className={`
              w-full
              rounded-2xl
              border
              p-6
              text-left
              transition
              ${
                modelSelected
                  ? "border-white/25 bg-white/[0.07]"
                  : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
              }
            `}
          >

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  ◇
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-medium text-white">
                      {demoModel.name}
                    </h3>

                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-400">
                      Approved
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-zinc-600">
                    Version {demoModel.version}
                  </p>

                </div>

              </div>

              <div
                className={`
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  ${
                    modelSelected
                      ? "border-white bg-white text-black"
                      : "border-white/20"
                  }
                `}
              >
                {modelSelected && (
                  <span className="text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </div>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

              <ModelProperty
                label="Task"
                value="Classification"
              />

              <ModelProperty
                label="HE Scheme"
                value={demoModel.heScheme}
              />

              <ModelProperty
                label="HE Compatible"
                value="Yes ✓"
              />

              <ModelProperty
                label="Status"
                value="Approved"
              />

            </div>

          </button>

          <div className="mt-7 flex justify-between">

            <button
              onClick={() => setStep(1)}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              ← Back
            </button>

            <button
              onClick={handleContinue}
              disabled={!modelSelected}
              className="
                rounded-xl
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-zinc-200
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              Continue to Security →
            </button>

          </div>

        </section>
      )}

      {/* =================================================
          STEP 3 — SECURITY
      ================================================= */}

      {step === 3 && (
        <section className="max-w-4xl rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

          <div className="mb-8">

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
              Step 03
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Security Configuration
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Review how SHENOVA will protect the dataset during analysis.
            </p>

          </div>

          {/* Secure pipeline */}

          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

            <div className="mb-7 text-center">

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                SHENOVA Secure Pipeline
              </p>

            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-5">

              <SecurityStep
                number="01"
                title="Dataset"
                description="Validated"
              />

              <PipelineArrow />

              <SecurityStep
                number="02"
                title="Encryption"
                description="CKKS"
              />

              <PipelineArrow />

              <SecurityStep
                number="03"
                title="Secure AI"
                description="HE Inference"
              />

              <PipelineArrow />

              <SecurityStep
                number="04"
                title="Result"
                description="Protected"
              />

              <PipelineArrow />

              <SecurityStep
                number="05"
                title="Report"
                description="Generated"
              />

            </div>

          </div>

          {/* Security checks */}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            <SecurityCheck
              title="Dataset encryption"
              description="Sensitive data is protected before secure computation."
            />

            <SecurityCheck
              title="Approved model"
              description="Only validated SHENOVA models can be used."
            />

            <SecurityCheck
              title="Encrypted inference"
              description="AI inference is designed around encrypted data."
            />

            <SecurityCheck
              title="Raw data protection"
              description="Patient data is not intended to be exposed during computation."
            />

          </div>

          {/* Selected dataset/model */}

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">

            <div className="grid gap-5 sm:grid-cols-2">

              <div>

                <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                  Dataset
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  {datasetName}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  {datasetRecords} records · 30 features
                </p>

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                  Model
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  {demoModel.name}
                </p>

              </div>

            </div>

          </div>

          {/* Demo notice */}

          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">

            <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600">
              Demonstration Mode
            </p>

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              This MVP uses synthetic demonstration data and simulated
              result values. Actual CKKS encryption and encrypted model
              inference will be connected to the backend implementation.
            </p>

          </div>

          {/* Actions */}

          <div className="mt-7 flex justify-between">

            <button
              onClick={() => setStep(2)}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              ← Back
            </button>

            <button
              onClick={handleRunAnalysis}
              className="
                rounded-xl
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-zinc-200
              "
            >
              Run Secure Analysis →
            </button>

          </div>

        </section>
      )}

    </div>
  );
}

/* =====================================================
   SMALL COMPONENTS
===================================================== */

function StepIndicator({
  number,
  label,
  active,
  completed,
}: {
  number: string;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">

      <div
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          border
          text-[10px]
          font-medium
          ${
            active || completed
              ? "border-white/20 bg-white/[0.08] text-white"
              : "border-white/10 text-zinc-600"
          }
        `}
      >
        {completed ? "✓" : number}
      </div>

      <span
        className={`hidden text-xs sm:block ${
          active
            ? "text-zinc-200"
            : "text-zinc-600"
        }`}
      >
        {label}
      </span>

    </div>
  );
}

function DatasetUploaded({
  datasetName,
  records,
}: {
  datasetName: string;
  records: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sm">
            CSV
          </div>

          <div>

            <p className="text-sm font-medium text-white">
              {datasetName}
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              {records} records · 30 features
            </p>

          </div>

        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] text-zinc-400">
          Uploaded
        </span>

      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">

        <ValidationItem text="CSV format" />

        <ValidationItem text="Features detected" />

        <ValidationItem text="Dataset validated" />

      </div>

    </div>
  );
}

function ValidationItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/[0.025] px-3 py-2">

      <span className="text-xs text-emerald-400">
        ✓
      </span>

      <span className="text-xs text-zinc-500">
        {text}
      </span>

    </div>
  );
}

function ModelProperty({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">

      <p className="text-[9px] uppercase tracking-wider text-zinc-600">
        {label}
      </p>

      <p className="mt-1.5 text-xs text-zinc-300">
        {value}
      </p>

    </div>
  );
}

function SecurityStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-center">

      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[10px] text-zinc-500">
        {number}
      </div>

      <p className="mt-3 text-xs font-medium text-zinc-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-zinc-600">
        {description}
      </p>

    </div>
  );
}

function PipelineArrow() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <span className="text-zinc-700">
        →
      </span>
    </div>
  );
}

function SecurityCheck({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">

      <div className="flex gap-3">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-xs text-emerald-400">
          ✓
        </div>

        <div>

          <p className="text-xs font-medium text-zinc-300">
            {title}
          </p>

          <p className="mt-1 text-[11px] leading-5 text-zinc-600">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}