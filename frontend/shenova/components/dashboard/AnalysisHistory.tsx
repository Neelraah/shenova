"use client";

import { useEffect, useState } from "react";

type AnalysisHistoryProps = {
  onViewResults: (analysisId: string) => void;
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

export default function AnalysisHistory({
  onViewResults,
  onNewAnalysis,
}: AnalysisHistoryProps) {
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyses();

    const handleStorageChange = () => {
      loadAnalyses();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const loadAnalyses = () => {
    try {
      const storedAnalyses =
        localStorage.getItem(ANALYSES_KEY);

      if (!storedAnalyses) {
        setAnalyses([]);
        setLoading(false);
        return;
      }

      const parsed: AnalysisRecord[] =
        JSON.parse(storedAnalyses);

      /*
       * Newest analyses appear first.
       */
      const sorted = [...parsed].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setAnalyses(sorted);
    } catch (error) {
      console.error(
        "Unable to load analysis history:",
        error
      );

      setAnalyses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResults = (analysisId: string) => {
    /*
     * Tell the Results page which analysis
     * the administrator selected.
     */
    localStorage.setItem(
      CURRENT_ANALYSIS_KEY,
      analysisId
    );

    onViewResults(analysisId);
  };

  const totalAnalyses = analyses.length;

  const completedAnalyses = analyses.filter(
    (analysis) => analysis.status === "Completed"
  ).length;

  const processingAnalyses = analyses.filter(
    (analysis) => analysis.status === "Processing"
  ).length;

  const latestAnalysis =
    analyses.length > 0 ? analyses[0] : null;

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
            Review previously completed privacy-preserving
            healthcare analyses and their secure inference metadata.
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
          value={totalAnalyses.toString()}
          detail="Stored secure analyses"
        />

        <SummaryCard
          label="Completed"
          value={completedAnalyses.toString()}
          detail={
            totalAnalyses > 0
              ? `${Math.round(
                  (completedAnalyses / totalAnalyses) * 100
                )}% completion rate`
              : "No analyses yet"
          }
        />

        <SummaryCard
          label="Latest Analysis"
          value={
            latestAnalysis
              ? latestAnalysis.id
              : "—"
          }
          detail={
            latestAnalysis
              ? latestAnalysis.date
              : "No analysis available"
          }
        />

      </div>

      {/* Processing notice */}

      {processingAnalyses > 0 && (

        <div
          className="
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-amber-400/10
            bg-amber-400/[0.03]
            p-5
          "
        >

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
              border-amber-400/10
              bg-amber-400/[0.04]
              text-xs
              text-amber-400
            "
          >
            ◈
          </div>

          <div>

            <p className="text-xs font-medium text-zinc-300">
              Analysis currently processing
            </p>

            <p className="mt-1 text-[11px] leading-5 text-zinc-600">
              {processingAnalyses} analysis
              {processingAnalyses !== 1 ? "es are" : " is"}{" "}
              currently being processed through the secure
              analysis pipeline.
            </p>

          </div>

        </div>

      )}

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

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/[0.07]
            px-5
            py-5
          "
        >

          <div>

            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Records
            </p>

            <h2 className="mt-1 text-sm font-semibold text-white">
              Recent Analyses
            </h2>

          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-zinc-600">
            {totalAnalyses} total
          </span>

        </div>

        {/* Loading */}

        {loading && (

          <div className="px-5 py-12 text-center">

            <div className="mx-auto h-5 w-5 animate-spin rounded-full border border-white/10 border-t-white" />

            <p className="mt-4 text-xs text-zinc-600">
              Loading analysis history...
            </p>

          </div>

        )}

        {/* Empty state */}

        {!loading && analyses.length === 0 && (

          <div className="px-5 py-16 text-center">

            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-zinc-600
              "
            >
              ◈
            </div>

            <h3 className="mt-5 text-sm font-medium text-zinc-300">
              No analyses yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-zinc-600">
              Start a secure analysis to create your first
              analysis record.
            </p>

            <button
              onClick={onNewAnalysis}
              className="
                mt-5
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
              Start New Analysis
            </button>

          </div>

        )}

        {/* Desktop table */}

        {!loading && analyses.length > 0 && (

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

                {analyses.map((analysis) => (

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

                      <div>

                        <p className="max-w-[190px] truncate text-xs text-zinc-500">
                          {analysis.dataset}
                        </p>

                        <p className="mt-1 text-[9px] text-zinc-700">
                          {analysis.records} records ·{" "}
                          {analysis.features} features
                        </p>

                      </div>

                    </td>

                    <td className="px-5 py-5">

                      <div>

                        <p className="max-w-[220px] truncate text-xs text-zinc-500">
                          {analysis.model}
                        </p>

                        <p className="mt-1 text-[9px] text-zinc-700">
                          v{analysis.modelVersion} ·{" "}
                          {analysis.security.encryption}
                        </p>

                      </div>

                    </td>

                    <td className="px-5 py-5">

                      <StatusBadge
                        status={analysis.status}
                      />

                    </td>

                    <td className="px-5 py-5">

                      <p className="text-xs text-zinc-500">
                        {analysis.date}
                      </p>

                    </td>

                    <td className="px-5 py-5 text-right">

                      <button
                        onClick={() =>
                          handleViewResults(analysis.id)
                        }
                        disabled={
                          analysis.status !== "Completed"
                        }
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
                          disabled:cursor-not-allowed
                          disabled:opacity-30
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

        )}

        {/* Mobile cards */}

        {!loading && analyses.length > 0 && (

          <div className="divide-y divide-white/[0.06] md:hidden">

            {analyses.map((analysis) => (

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

                  <StatusBadge
                    status={analysis.status}
                  />

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
                    label="Records"
                    value={analysis.records.toString()}
                  />

                  <HistoryDetail
                    label="Features"
                    value={analysis.features.toString()}
                  />

                  <HistoryDetail
                    label="Encryption"
                    value={analysis.security.encryption}
                  />

                  <HistoryDetail
                    label="Date"
                    value={analysis.date}
                  />

                </div>

                <button
                  onClick={() =>
                    handleViewResults(analysis.id)
                  }
                  disabled={
                    analysis.status !== "Completed"
                  }
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
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  {analysis.status === "Completed"
                    ? "View Results"
                    : "Analysis Processing"}
                </button>

              </div>

            ))}

          </div>

        )}

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
            text-zinc-500
          "
        >
          ◈
        </div>

        <div>

          <p className="text-xs font-medium text-zinc-300">
            Analysis records are locally maintained
          </p>

          <p className="mt-1 text-[11px] leading-5 text-zinc-600">
            This MVP stores analysis metadata and generated
            results locally in the browser. Patient datasets
            are not stored as part of the analysis history.
          </p>

        </div>

      </div>

    </div>
  );
}

/* -----------------------------
   Summary Card
----------------------------- */

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

/* -----------------------------
   Status Badge
----------------------------- */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const completed = status === "Completed";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-[9px]
        font-medium
        uppercase
        tracking-wider

        ${
          completed
            ? "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-400"
            : "border-amber-400/15 bg-amber-400/[0.06] text-amber-400"
        }
      `}
    >

      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${
            completed
              ? "bg-emerald-400"
              : "animate-pulse bg-amber-400"
          }
        `}
      />

      {status}

    </span>
  );
}

/* -----------------------------
   History Detail
----------------------------- */

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