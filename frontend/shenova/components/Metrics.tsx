"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  Clock3,
  Layers3,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const metrics = [
  {
    code: "METRIC_01",
    label: "Model Accuracy",
    value: "98%",
    description: "Target / reported performance",
    icon: Activity,
    progress: 98,
    accent: true,
  },
  {
    code: "METRIC_02",
    label: "Inference Efficiency",
    value: "3.2×",
    description: "Optimization indicator",
    icon: Clock3,
    progress: 82,
    accent: false,
  },
  {
    code: "METRIC_03",
    label: "HE Feasibility",
    value: "HIGH",
    description: "Deployment compatibility",
    icon: ShieldCheck,
    progress: 89,
    accent: true,
  },
];

const comparisonData = [
  {
    code: "BASELINE",
    label: "Previous Model",
    accuracy: 97,
    complexity: 95,
    status: "REFERENCE",
  },
  {
    code: "SHENOVA",
    label: "SHENOVA",
    accuracy: 98,
    complexity: 48,
    status: "OPTIMIZED",
  },
];

export default function Metrics() {
  return (
    <section
      id="metrics"
      className="relative overflow-hidden bg-transparent px-6 py-32 text-white"
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[15%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.025] blur-[180px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.015] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-violet-300/60" />

            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              05 / Performance Telemetry
            </span>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h2 className="max-w-5xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                Measure what
                <br />
                matters.
                <br />
                <span className="text-zinc-600">
                  Not accuracy alone.
                </span>
              </h2>
            </div>

            <div className="border-l border-white/[0.08] pl-6">
              <p className="max-w-md text-sm leading-7 text-zinc-500">
                SHENOVA evaluates predictive performance together with
                computational complexity and homomorphic-encryption
                feasibility.
              </p>

              <div className="mt-7 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                Evaluation layer / indexed
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================== */}
        {/* TELEMETRY PANEL */}
        {/* ===================================================== */}

        <div className="border border-white/[0.08] bg-white/[0.012]">
          <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <Activity
                size={15}
                strokeWidth={1.4}
                className="text-violet-200"
              />

              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-500">
                SHENOVA / Performance Telemetry
              </span>
            </div>

            <div className="flex items-center gap-2 border border-white/[0.07] px-3 py-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300 shadow-[0_0_9px_rgba(196,181,253,0.8)]" />

              <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-600">
                Evaluation active
              </span>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid gap-px border-b border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                  }}
                  className="group relative bg-transparent p-7 transition-colors duration-300 hover:bg-white/[0.018] sm:p-8"
                >
                  {/* top code */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700">
                      {metric.code}
                    </span>

                    <Icon
                      size={17}
                      strokeWidth={1.2}
                      className="text-zinc-700 transition-colors group-hover:text-violet-200"
                    />
                  </div>

                  <p className="mt-10 text-xs text-zinc-600">
                    {metric.label}
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <span
                      className={`font-mono text-4xl font-light tracking-[-0.05em] ${
                        metric.accent
                          ? "text-violet-200"
                          : "text-zinc-200"
                      }`}
                    >
                      {metric.value}
                    </span>

                    <span className="mb-1 font-mono text-[7px] uppercase tracking-[0.15em] text-zinc-700">
                      INDEX
                    </span>
                  </div>

                  <p className="mt-3 text-[10px] text-zinc-700">
                    {metric.description}
                  </p>

                  {/* Telemetry bar */}
                  <div className="mt-7">
                    <div className="mb-2 flex justify-between font-mono text-[6px] uppercase tracking-[0.18em] text-zinc-800">
                      <span>Signal</span>
                      <span>{metric.progress}</span>
                    </div>

                    <div className="relative h-px w-full bg-white/[0.08]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${metric.progress}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.2 + index * 0.12,
                        }}
                        className={`absolute left-0 top-0 h-px ${
                          metric.accent
                            ? "bg-violet-300"
                            : "bg-zinc-400"
                        }`}
                      />

                      <div
                        className="absolute top-[-2px] h-[5px] w-px bg-violet-200"
                        style={{
                          left: `${metric.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute bottom-4 right-4 h-2 w-2 border-b border-r border-white/[0.08] transition-colors group-hover:border-violet-300/30" />
                </motion.div>
              );
            })}
          </div>

          {/* ================================================= */}
          {/* COMPARISON */}
          {/* ================================================= */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-5 sm:p-8"
          >
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-700">
                  Comparative Analysis
                </span>

                <h3 className="mt-3 text-xl font-medium">
                  Baseline → SHENOVA
                </h3>
              </div>

              <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
                <TrendingDown size={12} className="text-violet-300" />
                Lower complexity is preferable
              </div>
            </div>

            {/* Comparison table */}
            <div className="border border-white/[0.07]">
              {/* Table header */}
              <div className="hidden grid-cols-[1.4fr_1fr_1fr_120px] border-b border-white/[0.06] bg-white/[0.015] px-5 py-3 md:grid">
                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
                  Model
                </span>

                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
                  Accuracy
                </span>

                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
                  Complexity
                </span>

                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
                  State
                </span>
              </div>

              {comparisonData.map((model, index) => (
                <div
                  key={model.label}
                  className="border-b border-white/[0.06] last:border-b-0"
                >
                  <div className="grid gap-6 px-5 py-7 md:grid-cols-[1.4fr_1fr_1fr_120px] md:items-center">
                    {/* Model */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 ${
                            index === 1
                              ? "bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.7)]"
                              : "bg-zinc-600"
                          }`}
                        />

                        <span className="text-sm font-medium text-zinc-300">
                          {model.label}
                        </span>
                      </div>

                      <p className="mt-2 pl-[18px] font-mono text-[7px] uppercase tracking-[0.18em] text-zinc-700">
                        {model.code}
                      </p>
                    </div>

                    {/* Accuracy */}
                    <ComparisonBar
                      label="Accuracy"
                      value={model.accuracy}
                      accent={index === 1}
                    />

                    {/* Complexity */}
                    <ComparisonBar
                      label="Complexity"
                      value={model.complexity}
                      accent={index === 1}
                      inverse
                    />

                    {/* State */}
                    <div className="flex md:justify-end">
                      <span
                        className={`border px-3 py-2 font-mono text-[7px] uppercase tracking-[0.15em] ${
                          index === 1
                            ? "border-violet-300/20 bg-violet-300/[0.035] text-violet-200"
                            : "border-white/[0.07] text-zinc-600"
                        }`}
                      >
                        {model.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===================================================== */}
        {/* EVALUATION MODEL */}
        {/* ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 grid border border-white/[0.07] bg-white/[0.012] md:grid-cols-3"
        >
          <SummaryBlock
            number="01"
            icon={<TrendingUp size={15} />}
            title="Predict"
            text="Measure useful predictive performance."
          />

          <SummaryBlock
            number="02"
            icon={<TrendingDown size={15} />}
            title="Optimize"
            text="Reduce structural and computational cost."
          />

          <SummaryBlock
            number="03"
            icon={<ShieldCheck size={15} />}
            title="Deploy"
            text="Evaluate feasibility for encrypted inference."
          />
        </motion.div>

        {/* ===================================================== */}
        {/* FOOTER LABEL */}
        {/* ===================================================== */}

        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            Evaluation layer
          </span>

          <div className="h-px flex-1 bg-white/[0.05]" />

          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            SHENOVA / 005
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================= */
/* COMPARISON BAR */
/* ============================================================= */

function ComparisonBar({
  label,
  value,
  accent = false,
  inverse = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
  inverse?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-zinc-700">
          {label}
        </span>

        <span
          className={`font-mono text-[9px] ${
            accent ? "text-violet-200" : "text-zinc-500"
          }`}
        >
          {value}%
        </span>
      </div>

      <div className="relative h-px w-full bg-white/[0.08]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute left-0 top-0 h-px ${
            accent
              ? "bg-violet-300"
              : inverse
                ? "bg-zinc-600"
                : "bg-zinc-400"
          }`}
        />
      </div>
    </div>
  );
}

/* ============================================================= */
/* SUMMARY BLOCK */
/* ============================================================= */

function SummaryBlock({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(255,255,255,0.018)" }}
      className="relative border-b border-white/[0.07] p-7 transition-colors last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center border border-white/[0.08] text-violet-200">
          {icon}
        </div>

        <span className="font-mono text-[8px] text-zinc-800">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-sm font-medium text-zinc-300">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-zinc-600">{text}</p>
    </motion.div>
  );
}