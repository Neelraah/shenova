"use client";

import { useEffect, useState } from "react";

type AnalysisResultsProps = {
  onBackToHistory: () => void;
  onNewAnalysis: () => void;
};

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

export default function AnalysisResults({
  onBackToHistory,
  onNewAnalysis,
}: AnalysisResultsProps) {
  const [analysis, setAnalysis] =
    useState<AnalysisRecord | null>(null);

  const [decryptionAuthorized, setDecryptionAuthorized] =
    useState(false);

  const [showAuthorization, setShowAuthorization] =
    useState(false);

  const [decrypting, setDecrypting] = useState(false);

  useEffect(() => {
    try {
      const currentAnalysisId =
        localStorage.getItem(CURRENT_ANALYSIS_KEY);

      const storedAnalyses =
        localStorage.getItem(ANALYSES_KEY);

      if (!currentAnalysisId || !storedAnalyses) {
        return;
      }

      const analyses: AnalysisRecord[] =
        JSON.parse(storedAnalyses);

      const currentAnalysis = analyses.find(
        (item) => item.id === currentAnalysisId
      );

      if (currentAnalysis) {
        setAnalysis(currentAnalysis);
      }
    } catch (error) {
      console.error(
        "Unable to load analysis results:",
        error
      );
    }
  }, []);

  /*
   * Fallback values are used only when no analysis
   * has been stored yet.
   */
  const analysisId = analysis?.id ?? "AN-001";

  const dataset =
    analysis?.dataset ??
    "breast_cancer_patients_01.csv";

  const model =
    analysis?.model ??
    "SHENOVA Breast Cancer Risk Model";

  const encryption =
    analysis?.security.encryption ?? "CKKS";

  const prediction =
    analysis?.result.prediction ?? "Benign";

  const confidence =
    analysis?.result.confidence ?? 94.7;

  const records =
    analysis?.records ?? 569;

  const features =
    analysis?.features ?? 30;

  const inferenceTime =
    analysis?.result.inferenceTime ?? "2.84s";

  const encryptedInference =
    analysis?.security.encryptedInference ?? true;

  const patientDataExposure =
    analysis?.security.patientDataExposure ?? "None";

  const modelCompatibility =
    analysis?.security.modelCompatibility ??
    "HE Compatible";

  const handleAuthorizeDecryption = () => {
    setShowAuthorization(true);
  };

  const handleConfirmDecryption = () => {
    setDecrypting(true);

    /*
     * Demonstration-only decryption delay.
     *
     * In the production implementation this action
     * will call the backend authorization/decryption
     * endpoint instead of revealing a frontend value.
     */
    setTimeout(() => {
      setDecrypting(false);
      setShowAuthorization(false);
      setDecryptionAuthorized(true);
    }, 1200);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

        <div>

          <div className="mb-3 flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">
              Analysis Complete
            </span>

          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Analysis Results
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Secure inference was completed while the submitted
            healthcare data remained protected during computation.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onBackToHistory}
            className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-2.5
              text-xs
              font-medium
              text-zinc-300
              transition
              hover:bg-white/[0.07]
              hover:text-white
            "
          >
            Analysis History
          </button>

          <button
            onClick={onNewAnalysis}
            className="
              rounded-xl
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-black
              transition
              hover:bg-zinc-200
            "
          >
            New Analysis
          </button>

        </div>

      </div>

      {/* Analysis identity */}

      <div
        className="
          grid
          gap-4
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-5
          md:grid-cols-4
        "
      >

        <InfoItem
          label="Analysis ID"
          value={analysisId}
        />

        <InfoItem
          label="Dataset"
          value={dataset}
        />

        <InfoItem
          label="Model"
          value={model}
        />

        <InfoItem
          label="Encryption"
          value={encryption}
        />

      </div>

      {/* Main result */}

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">

        {/* Result card */}

        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            p-6
            md:p-8
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              right-[-80px]
              top-[-80px]
              h-64
              w-64
              rounded-full
              bg-emerald-400/[0.04]
              blur-3xl
            "
          />

          <div className="relative">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Prediction Summary
                </p>

                <h2 className="mt-2 text-lg font-semibold text-white">
                  Breast Cancer Classification
                </h2>

              </div>

              <div
                className={`
                  rounded-full
                  border
                  px-3
                  py-1.5
                  ${
                    decryptionAuthorized
                      ? "border-emerald-400/20 bg-emerald-400/[0.07]"
                      : "border-amber-400/20 bg-amber-400/[0.07]"
                  }
                `}
              >
                <span
                  className={`
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    ${
                      decryptionAuthorized
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }
                  `}
                >
                  {decryptionAuthorized
                    ? "Decrypted"
                    : "Encrypted"}
                </span>
              </div>

            </div>

            {/* Encrypted / decrypted result */}

            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-black/30 p-6">

              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Predicted Outcome
              </p>

              {!decryptionAuthorized ? (

                <>

                  <div className="mt-5 flex items-center justify-between gap-5">

                    <div>

                      <p className="text-3xl font-semibold tracking-tight text-white">
                        ENCRYPTED
                      </p>

                      <p className="mt-2 max-w-md text-xs leading-5 text-zinc-500">
                        The model output remains protected.
                        Authorization is required before the
                        final prediction and confidence can be viewed.
                      </p>

                    </div>

                    <div
                      className="
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-amber-400/20
                        bg-amber-400/[0.05]
                        text-xl
                        text-amber-400
                      "
                    >
                      ◈
                    </div>

                  </div>

                  <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-zinc-500">
                        Encrypted confidence
                      </span>

                      <span className="text-xs font-medium text-amber-400">
                        ENCRYPTED
                      </span>

                    </div>

                  </div>

                  <button
                    onClick={handleAuthorizeDecryption}
                    className="
                      mt-6
                      w-full
                      rounded-xl
                      bg-white
                      px-5
                      py-3
                      text-xs
                      font-semibold
                      text-black
                      transition
                      hover:bg-zinc-200
                    "
                  >
                    Authorize Decryption
                  </button>

                </>

              ) : (

                <>

                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                      <p className="text-4xl font-semibold tracking-tight text-white">
                        {prediction}
                      </p>

                      <p className="mt-2 text-xs text-zinc-500">
                        Final classification after authorized decryption
                      </p>

                    </div>

                    <div className="text-left sm:text-right">

                      <p className="text-3xl font-semibold text-white">
                        {confidence.toFixed(1)}%
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-600">
                        Confidence
                      </p>

                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="mb-2 flex justify-between text-[10px] text-zinc-600">

                      <span>
                        Prediction confidence
                      </span>

                      <span>
                        {confidence.toFixed(1)}%
                      </span>

                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

                      <div
                        className="
                          h-full
                          rounded-full
                          bg-emerald-400
                          transition-all
                          duration-700
                        "
                        style={{
                          width: `${confidence}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="mt-5 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">

                    <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                      Decryption Authorized
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                      The final model output has been authorized
                      for administrator viewing.
                    </p>

                  </div>

                </>

              )}

            </div>

            {/* Dataset stats */}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <Metric
                label="Records Analyzed"
                value={records.toString()}
              />

              <Metric
                label="Features"
                value={features.toString()}
              />

              <Metric
                label="Inference Time"
                value={inferenceTime}
              />

            </div>

          </div>

        </section>

        {/* Security panel */}

        <section
          className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            p-6
          "
        >

          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Privacy & Security
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Secure computation
          </h2>

          <div className="mt-6 space-y-4">

            <SecurityItem
              label="Data Encryption"
              value="Completed"
            />

            <SecurityItem
              label="Encrypted Inference"
              value={
                encryptedInference
                  ? "Completed"
                  : "Not Completed"
              }
            />

            <SecurityItem
              label="Encrypted Output"
              value="Protected"
            />

            <SecurityItem
              label="Patient Data Exposure"
              value={patientDataExposure}
            />

            <SecurityItem
              label="Model Compatibility"
              value={modelCompatibility}
            />

            <SecurityItem
              label="Decryption"
              value={
                decryptionAuthorized
                  ? "Authorized"
                  : "Awaiting Authorization"
              }
            />

          </div>

          <div className="mt-6 rounded-xl border border-white/[0.07] bg-black/20 p-4">

            <div className="flex items-start gap-3">

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-xs
                "
              >
                ◈
              </div>

              <div>

                <p className="text-xs font-medium text-zinc-300">
                  Privacy-preserving inference
                </p>

                <p className="mt-1 text-[11px] leading-5 text-zinc-600">
                  The intended SHENOVA workflow keeps patient
                  data encrypted during model inference and
                  exposes only the authorized final result.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

      {/* Secure execution trace */}

      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
        "
      >

        <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
          Secure Execution Trace
        </p>

        <h2 className="mt-2 text-lg font-semibold text-white">
          Privacy-preserving inference pipeline
        </h2>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">

          <TraceItem
            label="Dataset Validation"
            status="Completed"
          />

          <TraceItem
            label={`${encryption} Encryption`}
            status="Completed"
          />

          <TraceItem
            label="Encrypted Input"
            status="Verified"
          />

          <TraceItem
            label="HE-Compatible Model"
            status="Verified"
          />

          <TraceItem
            label="Encrypted Inference"
            status="Completed"
          />

          <TraceItem
            label="Encrypted Output"
            status="Protected"
          />

          <TraceItem
            label="Patient Data Exposure"
            status="None"
          />

          <TraceItem
            label="Decryption"
            status={
              decryptionAuthorized
                ? "Authorized"
                : "Awaiting Authorization"
            }
          />

        </div>

      </section>

      {/* Technical details */}

      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
        "
      >

        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

          <div>

            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Technical Details
            </p>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Secure inference metadata
            </h2>

          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500">
            SHENOVA v1.0
          </span>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <TechnicalItem
            label="Encryption Scheme"
            value={encryption}
          />

          <TechnicalItem
            label="Model Type"
            value="Polynomial Student Model"
          />

          <TechnicalItem
            label="Inference Mode"
            value={
              encryptedInference
                ? "Encrypted"
                : "Standard"
            }
          />

          <TechnicalItem
            label="Analysis Status"
            value={
              analysis?.status === "Completed"
                ? "Completed"
                : "Processing"
            }
          />

        </div>

      </section>

      {/* Actions */}

      <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:justify-end">

        <button
          onClick={onBackToHistory}
          className="
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            px-5
            py-3
            text-xs
            font-medium
            text-zinc-300
            transition
            hover:bg-white/[0.07]
            hover:text-white
          "
        >
          View Analysis History
        </button>

        <button
          className="
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            px-5
            py-3
            text-xs
            font-medium
            text-zinc-300
            transition
            hover:bg-white/[0.07]
            hover:text-white
          "
        >
          Generate Report
        </button>

        <button
          onClick={onNewAnalysis}
          className="
            rounded-xl
            bg-white
            px-5
            py-3
            text-xs
            font-semibold
            text-black
            transition
            hover:bg-zinc-200
          "
        >
          Start New Analysis
        </button>

      </div>

      {/* Authorization modal */}

      {showAuthorization && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            px-5
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-white/10
              bg-zinc-950
              p-6
              shadow-2xl
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400">
                  Authorization Required
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  Decrypt analysis result?
                </h2>

              </div>

              <button
                onClick={() => setShowAuthorization(false)}
                className="
                  rounded-lg
                  border
                  border-white/10
                  px-2.5
                  py-1.5
                  text-xs
                  text-zinc-500
                  transition
                  hover:text-white
                "
              >
                ×
              </button>

            </div>

            <div className="mt-6 space-y-3">

              <AuthorizationRow
                label="Analysis"
                value={analysisId}
              />

              <AuthorizationRow
                label="Dataset"
                value={dataset}
              />

              <AuthorizationRow
                label="Encryption"
                value={encryption}
              />

              <AuthorizationRow
                label="Output"
                value="Encrypted"
              />

            </div>

            <div className="mt-5 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4">

              <p className="text-[11px] leading-5 text-zinc-500">
                This authorization represents the controlled
                release of the final analysis result. Patient
                records are not exposed by this action.
              </p>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => setShowAuthorization(false)}
                disabled={decrypting}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-xs
                  font-medium
                  text-zinc-300
                  transition
                  hover:bg-white/[0.07]
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDecryption}
                disabled={decrypting}
                className="
                  flex-1
                  rounded-xl
                  bg-white
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-black
                  transition
                  hover:bg-zinc-200
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {decrypting
                  ? "Authorizing..."
                  : "Authorize Decryption"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* -----------------------------
   Reusable UI components
----------------------------- */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 truncate text-xs font-medium text-zinc-300">
        {value}
      </p>

    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">

      <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

function SecurityItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const positive =
    value === "Completed" ||
    value === "None" ||
    value === "Protected" ||
    value === "HE Compatible" ||
    value === "Authorized";

  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">

      <span className="text-xs text-zinc-500">
        {label}
      </span>

      <span
        className={`
          text-[10px]
          font-medium
          uppercase
          tracking-wider
          ${
            positive
              ? "text-emerald-400"
              : "text-amber-400"
          }
        `}
      >
        {value}
      </span>

    </div>
  );
}

function TraceItem({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  const positive =
    status === "Completed" ||
    status === "Verified" ||
    status === "None" ||
    status === "Protected" ||
    status === "Authorized";

  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-start gap-3">

          <span
            className={`
              mt-0.5
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[9px]
              ${
                positive
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-amber-400/10 text-amber-400"
              }
            `}
          >
            {positive ? "✓" : "•"}
          </span>

          <span className="text-xs text-zinc-400">
            {label}
          </span>

        </div>

      </div>

      <p
        className={`
          mt-3
          text-[9px]
          uppercase
          tracking-wider
          ${
            positive
              ? "text-emerald-400"
              : "text-amber-400"
          }
        `}
      >
        {status}
      </p>

    </div>
  );
}

function TechnicalItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">

      <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-xs font-medium text-zinc-300">
        {value}
      </p>

    </div>
  );
}

function AuthorizationRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">

      <span className="text-[10px] uppercase tracking-wider text-zinc-600">
        {label}
      </span>

      <span className="max-w-[60%] truncate text-xs text-zinc-300">
        {value}
      </span>

    </div>
  );
}