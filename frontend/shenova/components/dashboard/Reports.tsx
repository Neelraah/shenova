"use client";

type ReportsProps = {
  onViewResults: () => void;
};

export default function Reports({
  onViewResults,
}: ReportsProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            Results
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Review generated reports from completed privacy-preserving
            healthcare analyses.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            Report System Ready
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Generated Reports"
          value="8"
          detail="From completed analyses"
        />

        <SummaryCard
          label="Latest Report"
          value="RPT-001"
          detail="08 Oct 2026"
        />

        <SummaryCard
          label="Report Status"
          value="Ready"
          detail="Available for review"
        />
      </div>

      {/* Featured report */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
        "
      >
        <div className="border-b border-white/[0.07] px-6 py-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Latest Report
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Breast Cancer Analysis Report
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                RPT-001 · Generated 08 Oct 2026
              </p>
            </div>

            <span className="w-fit rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
              Completed
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Report preview */}
          <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                  Analysis Summary
                </p>

                <h3 className="mt-2 text-sm font-semibold text-zinc-200">
                  Secure Breast Cancer Classification
                </h3>
              </div>

              <span className="text-[10px] text-zinc-700">
                SHENOVA v1.0
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ReportMetric
                label="Prediction"
                value="Benign"
              />

              <ReportMetric
                label="Confidence"
                value="94.7%"
              />

              <ReportMetric
                label="Records"
                value="569"
              />
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <p className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                Report Description
              </p>

              <p className="mt-2 text-xs leading-6 text-zinc-500">
                The analysis was performed using the approved SHENOVA Breast
                Cancer Risk Model. Patient data remained protected during
                encrypted inference, with only the final prediction and
                associated analysis metadata exposed to the authorized
                administrator.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ReportDetail
                label="Dataset"
                value="breast_cancer_patients.csv"
              />

              <ReportDetail
                label="Analysis ID"
                value="AN-001"
              />

              <ReportDetail
                label="Encryption"
                value="CKKS"
              />

              <ReportDetail
                label="Inference"
                value="Encrypted"
              />
            </div>
          </div>

          {/* Report actions */}
          <div className="flex flex-col rounded-2xl border border-white/[0.07] bg-black/20 p-6">
            <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600">
              Report Actions
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={onViewResults}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-left
                  transition
                  hover:bg-white/[0.07]
                "
              >
                <div>
                  <p className="text-xs font-medium text-zinc-300">
                    View Results
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Open the complete analysis
                  </p>
                </div>

                <span className="text-zinc-600">
                  →
                </span>
              </button>

              <button
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-left
                  transition
                  hover:bg-white/[0.07]
                "
              >
                <div>
                  <p className="text-xs font-medium text-zinc-300">
                    Generate Report
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Create the latest report
                  </p>
                </div>

                <span className="text-zinc-600">
                  +
                </span>
              </button>

              <button
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-left
                  transition
                  hover:bg-white/[0.07]
                "
              >
                <div>
                  <p className="text-xs font-medium text-zinc-300">
                    Export Report
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Download a report copy
                  </p>
                </div>

                <span className="text-zinc-600">
                  ↓
                </span>
              </button>
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs text-zinc-500">
                    ◈
                  </div>

                  <div>
                    <p className="text-xs font-medium text-zinc-300">
                      Privacy preserved
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-zinc-600">
                      Reports contain analysis results and metadata, not
                      unencrypted patient records.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports list */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
        "
      >
        <div className="border-b border-white/[0.07] px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Archive
          </p>

          <h2 className="mt-1 text-sm font-semibold text-white">
            Generated Reports
          </h2>
        </div>

        <div className="divide-y divide-white/[0.06]">
          <ReportRow
            id="RPT-001"
            name="Breast Cancer Analysis Report"
            analysis="AN-001"
            date="08 Oct 2026"
            onView={onViewResults}
          />

          <ReportRow
            id="RPT-002"
            name="Breast Cancer Analysis Report"
            analysis="AN-002"
            date="07 Oct 2026"
            onView={onViewResults}
          />

          <ReportRow
            id="RPT-003"
            name="Patient Risk Analysis Report"
            analysis="AN-003"
            date="06 Oct 2026"
            onView={onViewResults}
          />
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-[9px] uppercase tracking-[0.17em] text-zinc-600">
        {label}
      </p>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-zinc-600">
        {detail}
      </p>
    </div>
  );
}

function ReportMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function ReportDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5">
      <p className="text-[9px] uppercase tracking-[0.14em] text-zinc-700">
        {label}
      </p>

      <p className="mt-1.5 truncate text-[11px] text-zinc-500">
        {value}
      </p>
    </div>
  );
}

function ReportRow({
  id,
  name,
  analysis,
  date,
  onView,
}: {
  id: string;
  name: string;
  analysis: string;
  date: string;
  onView: () => void;
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        px-5
        py-5
        transition
        hover:bg-white/[0.02]
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xs text-zinc-500">
          ▤
        </div>

        <div>
          <p className="text-xs font-medium text-zinc-300">
            {name}
          </p>

          <p className="mt-1 text-[10px] text-zinc-600">
            {id} · {analysis} · {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-2.5 py-1 text-[9px] uppercase tracking-wider text-emerald-400">
          Ready
        </span>

        <button
          onClick={onView}
          className="
            rounded-lg
            border
            border-white/10
            bg-white/[0.03]
            px-3
            py-2
            text-[10px]
            text-zinc-400
            transition
            hover:bg-white/[0.07]
            hover:text-white
          "
        >
          View
        </button>
      </div>
    </div>
  );
}