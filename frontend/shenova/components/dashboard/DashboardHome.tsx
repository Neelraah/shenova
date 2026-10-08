"use client";

import { dashboardStats, recentAnalyses } from "./Demodata";

interface DashboardHomeProps {
  onStartAnalysis: () => void;
}

export default function DashboardHome({
  onStartAnalysis,
}: DashboardHomeProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          SHENOVA
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Privacy-preserving healthcare intelligence
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Datasets"
          value={dashboardStats.datasets}
          description="Uploaded"
        />

        <StatCard
          label="Analyses"
          value={dashboardStats.analyses}
          description="Total analyses"
        />

        <StatCard
          label="Approved Models"
          value={dashboardStats.approvedModels}
          description="Available"
        />

        <StatCard
          label="Completed"
          value={dashboardStats.completed}
          description="Successful analyses"
        />
      </div>

      {/* Main CTA */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
              +
            </span>

            <span className="text-sm font-medium text-zinc-300">
              Secure Analysis
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-white">
            Start a Secure Analysis
          </h2>

          <p className="mt-3 max-w-xl leading-7 text-zinc-400">
            Analyze sensitive healthcare data using an approved SHENOVA model
            while keeping patient data protected during computation.
          </p>

          <button
            onClick={onStartAnalysis}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Start Analysis →
          </button>
        </div>
      </section>

      {/* Recent Analyses */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Recent Analyses
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your latest secure healthcare analyses
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          {recentAnalyses.map((analysis, index) => (
            <div
              key={analysis.id}
              className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between ${
                index !== recentAnalyses.length - 1
                  ? "border-b border-white/10"
                  : ""
              }`}
            >
              <div>
                <p className="font-medium text-white">{analysis.name}</p>

                <p className="mt-1 text-sm text-zinc-500">
                  {analysis.dataset}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-sm text-zinc-500">
                  {analysis.date}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-zinc-300">
                  ✓ {analysis.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <p className="text-sm text-zinc-500">{label}</p>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-semibold text-white">{value}</p>

        <span className="text-xs text-zinc-600">
          {description}
        </span>
      </div>
    </div>
  );
}