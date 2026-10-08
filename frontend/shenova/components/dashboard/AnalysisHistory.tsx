"use client";

import { recentAnalyses } from "../dashboard/Demodata";

type AnalysisHistoryProps = {
  onViewResults: (analysisId: string) => void;
  onNewAnalysis: () => void;
};

export default function AnalysisHistory({
  onViewResults,
  onNewAnalysis,
}: AnalysisHistoryProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            Analysis
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Analysis History
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Review previously completed privacy-preserving healthcare
            analyses and their secure inference metadata.
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="
            w-fit
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
          + New Analysis
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Analyses"
          value="8"
          detail="All secure analyses"
        />

        <SummaryCard
          label="Completed"
          value="8"
          detail="100% completion rate"
        />

        <SummaryCard
          label="Latest Analysis"
          value="AN-001"
          detail="08 Oct 2026"
        />
      </div>

      {/* History table */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
        "
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Records
            </p>

            <h2 className="mt-1 text-sm font-semibold text-white">
              Recent Analyses
            </h2>
          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-zinc-600">
            8 total
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-left">
                <th className="px-5 py-4 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Analysis
                </th>

                <th className="px-5 py-4 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Dataset
                </th>

                <th className="px-5 py-4 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Model
                </th>

                <th className="px-5 py-4 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Status
                </th>

                <th className="px-5 py-4 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Date
                </th>

                <th className="px-5 py-4 text-right text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {recentAnalyses.map((analysis) => (
                <tr
                  key={analysis.id}
                  className="
                    border-b
                    border-white/[0.05]
                    transition
                    last:border-0
                    hover:bg-white/[0.025]
                  "
                >
                  <td className="px-5 py-5">
                    <div>
                      <p className="text-xs font-medium text-zinc-200">
                        {analysis.name}
                      </p>

                      <p className="mt-1 text-[10px] text-zinc-600">
                        {analysis.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <p className="max-w-[190px] truncate text-xs text-zinc-500">
                      {analysis.dataset}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="max-w-[220px] truncate text-xs text-zinc-500">
                      {analysis.model}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <StatusBadge status={analysis.status} />
                  </td>

                  <td className="px-5 py-5">
                    <p className="text-xs text-zinc-500">
                      {analysis.date}
                    </p>
                  </td>

                  <td className="px-5 py-5 text-right">
                    <button
                      onClick={() => onViewResults(analysis.id)}
                      className="
                        rounded-lg
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-3
                        py-2
                        text-[10px]
                        font-medium
                        text-zinc-400
                        transition
                        hover:bg-white/[0.07]
                        hover:text-white
                      "
                    >
                      View Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-white/[0.06] md:hidden">
          {recentAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-200">
                    {analysis.name}
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    {analysis.id}
                  </p>
                </div>

                <StatusBadge status={analysis.status} />
              </div>

              <div className="mt-5 space-y-3">
                <HistoryDetail
                  label="Dataset"
                  value={analysis.dataset}
                />

                <HistoryDetail
                  label="Model"
                  value={analysis.model}
                />

                <HistoryDetail
                  label="Date"
                  value={analysis.date}
                />
              </div>

              <button
                onClick={() => onViewResults(analysis.id)}
                className="
                  mt-5
                  w-full
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
                View Results
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Security note */}
      <div
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-white/[0.07]
          bg-white/[0.02]
          p-5
        "
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs text-zinc-500">
          ◈
        </div>

        <div>
          <p className="text-xs font-medium text-zinc-300">
            Analysis records are securely maintained
          </p>

          <p className="mt-1 text-[11px] leading-5 text-zinc-600">
            Analysis history stores metadata and generated results. Patient
            records remain protected throughout the secure computation
            workflow.
          </p>
        </div>
      </div>
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

function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-emerald-400/15
        bg-emerald-400/[0.06]
        px-2.5
        py-1
        text-[9px]
        font-medium
        uppercase
        tracking-wider
        text-emerald-400
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      {status}
    </span>
  );
}

function HistoryDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[10px] uppercase tracking-wider text-zinc-700">
        {label}
      </span>

      <span className="max-w-[65%] truncate text-right text-[11px] text-zinc-500">
        {value}
      </span>
    </div>
  );
}