"use client";

import { demoModel } from "../dashboard/Demodata";

type ModelLibraryProps = {
  onUseModel: () => void;
};

export default function ModelLibrary({
  onUseModel,
}: ModelLibraryProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            Models
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Model Library
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            View approved AI models available for privacy-preserving
            healthcare inference.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-[10px] uppercase tracking-[0.15em] text-emerald-400">
            Secure Model Registry
          </span>
        </div>
      </div>

      {/* Registry summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Approved Models"
          value="1"
          detail="Available for inference"
        />

        <SummaryCard
          label="HE Compatible"
          value="1"
          detail="Encrypted inference ready"
        />

        <SummaryCard
          label="Model Version"
          value="1.0"
          detail="Current production version"
        />
      </div>

      {/* Main model */}
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
            right-[-100px]
            top-[-100px]
            h-72
            w-72
            rounded-full
            bg-white/[0.025]
            blur-3xl
          "
        />

        <div className="relative">
          {/* Model heading */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  text-lg
                  text-zinc-300
                "
              >
                ◇
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">
                    {demoModel.name}
                  </h2>

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                    {demoModel.status}
                  </span>
                </div>

                <p className="mt-2 text-xs text-zinc-600">
                  Model ID: {demoModel.id}
                </p>
              </div>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-zinc-500">
              v{demoModel.version}
            </span>
          </div>

          {/* Model description */}
          <div className="mt-8 max-w-3xl">
            <p className="text-sm leading-6 text-zinc-400">
              An approved SHENOVA student model designed for
              privacy-preserving breast cancer classification. The model is
              optimized for encrypted inference and is exposed to the
              hospital application as a deployable model package.
            </p>
          </div>

          {/* Model metadata */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ModelDetail
              label="Task"
              value={demoModel.task}
            />

            <ModelDetail
              label="Encryption"
              value={demoModel.heScheme}
            />

            <ModelDetail
              label="HE Compatibility"
              value="Compatible"
            />

            <ModelDetail
              label="Deployment"
              value="Approved Package"
            />
          </div>

          {/* Architecture */}
          <div className="mt-8 rounded-2xl border border-white/[0.07] bg-black/20 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600">
              Model Architecture
            </p>

            <div className="mt-5 flex flex-col items-center gap-3 md:flex-row md:justify-between">
              <ArchitectureStep
                number="01"
                title="Teacher Model"
                description="High-capacity reference model"
              />

              <Connector />

              <ArchitectureStep
                number="02"
                title="Knowledge Distillation"
                description="Transfer learned representations"
              />

              <Connector />

              <ArchitectureStep
                number="03"
                title="Student Model"
                description="Compact HE-compatible model"
              />

              <Connector />

              <ArchitectureStep
                number="04"
                title="Encrypted Inference"
                description="Prediction on protected data"
              />
            </div>
          </div>

          {/* Security badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge text="CKKS Compatible" />
            <Badge text="Encrypted Inference" />
            <Badge text="Approved" />
            <Badge text="Production Ready" />
          </div>

          {/* Action */}
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium text-zinc-300">
                Ready for secure analysis
              </p>

              <p className="mt-1 text-[10px] text-zinc-600">
                This model can be selected during the analysis workflow.
              </p>
            </div>

            <button
              onClick={onUseModel}
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
              Use This Model
            </button>
          </div>
        </div>
      </section>

      {/* Research boundary */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.02]
          p-5
        "
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs text-zinc-500">
            i
          </div>

          <div>
            <p className="text-xs font-medium text-zinc-300">
              Model development is managed separately
            </p>

            <p className="mt-1 max-w-3xl text-[11px] leading-5 text-zinc-600">
              Knowledge distillation, model optimization, polynomial
              activation design, and HE compatibility preparation are part of
              the SHENOVA model-development pipeline. Hospital administrators
              interact only with approved model packages.
            </p>
          </div>
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

function ModelDetail({
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

function ArchitectureStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="w-full rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 md:flex-1">
      <span className="text-[9px] tracking-[0.15em] text-zinc-700">
        {number}
      </span>

      <p className="mt-2 text-xs font-medium text-zinc-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-zinc-600">
        {description}
      </p>
    </div>
  );
}

function Connector() {
  return (
    <div className="hidden text-zinc-700 md:block">
      →
    </div>
  );
}

function Badge({
  text,
}: {
  text: string;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] uppercase tracking-wider text-zinc-500">
      {text}
    </span>
  );
}