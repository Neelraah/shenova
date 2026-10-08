"use client";

type AnalysisResultsProps = {
  onBackToHistory: () => void;
  onNewAnalysis: () => void;
};

export default function AnalysisResults({
  onBackToHistory,
  onNewAnalysis,
}: AnalysisResultsProps) {
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
            Secure inference completed successfully. Results were generated
            without exposing the underlying patient records.
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
          value="AN-001"
        />

        <InfoItem
          label="Dataset"
          value="breast_cancer_patients.csv"
        />

        <InfoItem
          label="Model"
          value="SHENOVA Breast Cancer Risk Model"
        />

        <InfoItem
          label="Encryption"
          value="CKKS"
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

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5">
                <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                  Completed
                </span>
              </div>
            </div>

            {/* Prediction */}
            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-black/30 p-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Predicted Outcome
              </p>

              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-4xl font-semibold tracking-tight text-white">
                    Benign
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    Model prediction for the submitted dataset
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-3xl font-semibold text-white">
                    94.7%
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-600">
                    Confidence
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-[10px] text-zinc-600">
                  <span>Prediction confidence</span>
                  <span>94.7%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: "94.7%" }}
                  />
                </div>
              </div>
            </div>

            {/* Dataset stats */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Metric
                label="Records Analyzed"
                value="569"
              />

              <Metric
                label="Features"
                value="30"
              />

              <Metric
                label="Inference Time"
                value="2.84s"
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
            Secure computation verified
          </h2>

          <div className="mt-6 space-y-4">
            <SecurityItem
              label="Data Encryption"
              value="Completed"
            />

            <SecurityItem
              label="Encrypted Inference"
              value="Completed"
            />

            <SecurityItem
              label="Patient Data Exposure"
              value="None"
            />

            <SecurityItem
              label="Model Compatibility"
              value="HE Compatible"
            />
          </div>

          <div className="mt-6 rounded-xl border border-white/[0.07] bg-black/20 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs">
                ◈
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-300">
                  Privacy-preserving inference
                </p>

                <p className="mt-1 text-[11px] leading-5 text-zinc-600">
                  The model performed inference on encrypted healthcare data.
                  Only the final analysis result was made available to the
                  administrator.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

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
            value="CKKS"
          />

          <TechnicalItem
            label="Model Type"
            value="Polynomial Student Model"
          />

          <TechnicalItem
            label="Inference Mode"
            value="Encrypted"
          />

          <TechnicalItem
            label="Analysis Status"
            value="Verified"
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
    </div>
  );
}

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
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
      <span className="text-xs text-zinc-500">
        {label}
      </span>

      <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
        {value}
      </span>
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