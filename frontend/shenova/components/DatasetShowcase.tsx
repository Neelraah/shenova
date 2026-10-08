"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Database,
  LockKeyhole,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const datasets = [
  {
    id: "DATA_01",
    name: "Breast Cancer",
    description: "Binary classification",
    samples: "569",
    features: "30",
    accuracy: "97.4%",
  },
  {
    id: "DATA_02",
    name: "Diabetes",
    description: "Health risk prediction",
    samples: "768",
    features: "8",
    accuracy: "78.1%",
  },
  {
    id: "DATA_03",
    name: "Heart Disease",
    description: "Cardiac disease detection",
    samples: "303",
    features: "13",
    accuracy: "84.6%",
  },
];

export default function DatasetShowcase() {
  return (
    <section
      id="datasets"
      className="relative overflow-hidden bg-transparent px-6 py-32 text-white"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[20%] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-500/[0.025] blur-[160px]" />

      {/* Technical grid */}
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
              03 / Data Foundation
            </span>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                The data
                <br />
                behind
                <br />
                <span className="text-zinc-600">the intelligence.</span>
              </h2>
            </div>

            <div className="border-l border-white/[0.08] pl-6">
              <p className="max-w-md text-sm leading-7 text-zinc-500">
                SHENOVA evaluates healthcare datasets as the foundation for
                model optimization, measuring predictive behaviour alongside
                structural and encrypted-inference constraints.
              </p>

              <div className="mt-7 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                Dataset registry / indexed
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================== */}
        {/* DATASET REGISTRY */}
        {/* ===================================================== */}

        <div className="border border-white/[0.08] bg-white/[0.012]">
          {/* Registry header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <Database
                size={15}
                strokeWidth={1.4}
                className="text-violet-200"
              />

              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-500">
                SHENOVA / Dataset Registry
              </span>
            </div>

            <div className="flex items-center gap-5 font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
              <span>3 DATA SOURCES</span>
              <span className="hidden sm:block">•</span>
              <span className="hidden sm:block">HE RESEARCH</span>
            </div>
          </div>

          {/* Dataset rows */}
          <div>
            {datasets.map((dataset, index) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                className="group relative border-b border-white/[0.06] last:border-b-0"
              >
                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 top-0 w-px bg-violet-300/0 transition-colors duration-300 group-hover:bg-violet-300/60" />

                <div className="grid gap-7 px-5 py-8 transition-colors duration-300 group-hover:bg-white/[0.018] sm:px-7 lg:grid-cols-[90px_1fr_1fr_auto] lg:items-center">
                  {/* ID */}
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-700">
                      {dataset.id}
                    </span>

                    <div className="mt-3 flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-transparent">
                      <Database
                        size={13}
                        strokeWidth={1.2}
                        className="text-zinc-600 transition-colors group-hover:text-violet-200"
                      />
                    </div>
                  </div>

                  {/* Dataset identity */}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium tracking-[-0.02em] text-zinc-200">
                        {dataset.name}
                      </h3>

                      <ArrowUpRight
                        size={14}
                        className="text-zinc-800 transition-colors group-hover:text-violet-300"
                      />
                    </div>

                    <p className="mt-2 text-xs text-zinc-600">
                      {dataset.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                    <Metric
                      label="SAMPLES"
                      value={dataset.samples}
                    />

                    <Metric
                      label="FEATURES"
                      value={dataset.features}
                    />

                    <Metric
                      label="BASELINE"
                      value={dataset.accuracy}
                      accent
                    />
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 lg:justify-end">
                    <div className="flex items-center gap-2 border border-white/[0.07] px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.7)]" />

                      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-600">
                        Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accuracy trace */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.025]">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{
                      width: dataset.accuracy,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.1,
                      delay: 0.25 + index * 0.12,
                    }}
                    className="h-full bg-violet-300/40"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===================================================== */}
        {/* DATA / PRIVACY STRIP */}
        {/* ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 grid gap-px border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3"
        >
          <InfoBlock
            icon={<Activity size={16} />}
            label="PREDICTIVE QUALITY"
            value="Baseline performance"
          />

          <InfoBlock
            icon={<ShieldCheck size={16} />}
            label="MODEL CONSTRAINTS"
            value="Accuracy × complexity"
          />

          <InfoBlock
            icon={<LockKeyhole size={16} />}
            label="DEPLOYMENT TARGET"
            value="Encrypted inference"
          />
        </motion.div>

        {/* Bottom system label */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            Data layer
          </span>

          <div className="h-px flex-1 bg-white/[0.05]" />

          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            SHENOVA / 003
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================= */
/* COMPONENTS */
/* ============================================================= */

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
        {label}
      </p>

      <p
        className={`mt-2 font-mono text-sm ${
          accent ? "text-violet-200" : "text-zinc-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-transparent px-6 py-6">
      <div className="flex items-center gap-3">
        <span className="text-violet-200">{icon}</span>

        <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700">
          {label}
        </span>
      </div>

      <p className="mt-4 text-xs text-zinc-500">{value}</p>
    </div>
  );
}