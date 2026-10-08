"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Database,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Network,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const workflowSteps = [
  {
    number: "01",
    code: "KNOWLEDGE_SOURCE",
    title: "High-Performance Teacher",
    description:
      "A trained plaintext model provides the predictive knowledge that the compact student architecture must preserve.",
    icon: Brain,
    accent: "violet",
    metrics: ["PLAINTEXT", "HIGH ACCURACY", "SOFT TARGETS"],
  },
  {
    number: "02",
    code: "KNOWLEDGE_TRANSFER",
    title: "Knowledge Distillation",
    description:
      "The student learns from ground-truth labels and softened teacher predictions, transferring useful predictive behaviour into a smaller architecture.",
    icon: GraduationCap,
    accent: "white",
    metrics: ["KL DIVERGENCE", "TEMPERATURE", "STUDENT MODEL"],
  },
  {
    number: "03",
    code: "CONSTRAINT_SEARCH",
    title: "Constraint-Aware Search",
    description:
      "Candidate architectures are evaluated against accuracy, model complexity and homomorphic-encryption feasibility instead of optimizing accuracy alone.",
    icon: Search,
    accent: "violet",
    metrics: ["ACCURACY", "MODEL SIZE", "DEPTH"],
  },
  {
    number: "04",
    code: "HE_ADAPTATION",
    title: "HE Adaptation",
    description:
      "Encryption-unfriendly nonlinear operations are replaced with low-degree polynomial approximations that can be evaluated using HE-supported arithmetic.",
    icon: ShieldCheck,
    accent: "white",
    metrics: ["POLYNOMIAL", "LOW DEGREE", "HE COMPATIBLE"],
  },
  {
    number: "05",
    code: "PRIVATE_INFERENCE",
    title: "Encrypted Deployment",
    description:
      "The selected student architecture is prepared for CKKS-compatible encrypted inference with a controlled computational and multiplicative-depth budget.",
    icon: LockKeyhole,
    accent: "violet",
    metrics: ["CKKS", "CIPHERTEXT", "PRIVATE OUTPUT"],
  },
];

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-transparent px-6 py-32 text-white"
    >
      {/* Ambient system glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[10%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.035] blur-[180px]" />
        <div className="absolute right-[-15%] top-[45%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.025] blur-[180px]" />
      </div>

      {/* Technical grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-violet-300/60" />

            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500">
              01 / System Workflow
            </span>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                From trained
                <br />
                intelligence
                <br />
                <span className="text-zinc-600">to private inference.</span>
              </h2>
            </div>

            <div className="border-l border-white/[0.08] pl-6 lg:pb-2">
              <p className="max-w-md text-sm leading-7 text-zinc-500">
                SHENOVA treats homomorphic encryption as a model-design
                constraint. Instead of adapting an arbitrary network after
                training, the system searches for architectures that are
                practical for encrypted execution.
              </p>

              <div className="mt-7 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                Optimization pipeline / active
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* WORKFLOW TIMELINE */}
        {/* ========================================================= */}

        <div className="relative mx-auto max-w-6xl">
          {/* Main vertical line */}
          <div className="absolute bottom-0 left-[23px] top-0 hidden w-px bg-gradient-to-b from-violet-300/40 via-white/[0.08] to-transparent md:block" />

          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="relative grid gap-8 md:grid-cols-[48px_1fr]"
                >
                  {/* Node */}
                  <div className="relative z-10 flex items-start justify-center">
                    <div className="flex h-12 w-12 items-center justify-center border border-white/[0.12] bg-transparent">
                      <div
                        className={`h-2 w-2 ${
                          step.accent === "violet"
                            ? "bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.7)]"
                            : "bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.25 }}
                    className="group relative border-b border-white/[0.07] pb-14"
                  >
                    <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr_auto] lg:items-start">
                      {/* Number */}
                      <div>
                        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-700">
                          STEP
                        </span>

                        <div className="mt-1 font-mono text-4xl font-light tracking-[-0.05em] text-zinc-700 transition-colors group-hover:text-violet-300/50">
                          {step.number}
                        </div>
                      </div>

                      {/* Main */}
                      <div>
                        <div className="flex items-center gap-3">
                          <Icon
                            size={16}
                            strokeWidth={1.5}
                            className={
                              step.accent === "violet"
                                ? "text-violet-300"
                                : "text-zinc-300"
                            }
                          />

                          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-600">
                            {step.code}
                          </span>
                        </div>

                        <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-zinc-100 sm:text-3xl">
                          {step.title}
                        </h3>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
                          {step.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                          {step.metrics.map((metric) => (
                            <span
                              key={metric}
                              className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-600"
                            >
                              <span
                                className={`h-1 w-1 ${
                                  step.accent === "violet"
                                    ? "bg-violet-300/70"
                                    : "bg-zinc-500"
                                }`}
                              />
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Icon block */}
                      <div className="hidden lg:flex lg:justify-end">
                        <div className="flex h-20 w-20 items-center justify-center border border-white/[0.07] bg-white/[0.015] transition-all duration-300 group-hover:border-violet-300/20 group-hover:bg-violet-300/[0.025]">
                          <Icon
                            size={25}
                            strokeWidth={1}
                            className="text-zinc-600 transition-colors group-hover:text-violet-200"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* connector */}
                {index < workflowSteps.length - 1 && (
                  <div className="flex h-16 items-center pl-[22px] md:hidden">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowDown size={14} className="text-zinc-700" />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* SYSTEM ARCHITECTURE */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-40"
          id="architecture"
        >
          {/* Header */}
          <div className="mb-12 flex flex-col gap-5 border-b border-white/[0.07] pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-violet-300/60" />

                <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-zinc-600">
                  02 / System Architecture
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Inside the
                <span className="text-zinc-600"> SHENOVA engine.</span>
              </h3>
            </div>

            <p className="max-w-sm text-xs leading-6 text-zinc-600">
              A multi-stage optimization path connecting model compression,
              architecture search and encrypted inference.
            </p>
          </div>

          {/* Architecture shell */}
          <div className="relative overflow-hidden border border-white/[0.08] bg-white/[0.015]">
            {/* Corner marks */}
            <Corner position="tl" />
            <Corner position="tr" />
            <Corner position="bl" />
            <Corner position="br" />

            <div className="relative p-5 sm:p-10">
              {/* TOP INPUTS */}
              <div className="grid gap-4 lg:grid-cols-[1fr_48px_1fr]">
                <ArchitectureCard
                  icon={<Database size={19} />}
                  code="INPUT_01"
                  title="Training Dataset"
                  description="Features + ground-truth labels"
                />

                <ArchitectureConnector />

                <ArchitectureCard
                  icon={<Brain size={19} />}
                  code="MODEL_01"
                  title="Trained Teacher"
                  description="High-performance plaintext model"
                  active
                />
              </div>

              <ArchitectureVertical label="KNOWLEDGE TRANSFER" />

              {/* ENGINE */}
              <motion.div
                whileHover={{ borderColor: "rgba(167,139,250,0.25)" }}
                className="relative border border-violet-300/[0.14] bg-violet-300/[0.018] p-5 sm:p-8"
              >
                {/* engine glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 bg-violet-300/[0.025] blur-[100px]" />

                <div className="relative">
                  {/* Engine header */}
                  <div className="flex flex-col gap-5 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center border border-violet-300/20 bg-violet-300/[0.04]">
                        <ScanSearch
                          size={19}
                          strokeWidth={1.4}
                          className="text-violet-200"
                        />
                      </div>

                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-violet-300/70">
                          Core Optimization Layer
                        </p>

                        <h4 className="mt-1 text-xl font-medium">
                          SHENOVA Engine
                        </h4>
                      </div>
                    </div>

                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-700">
                      MULTI_OBJECTIVE / SEARCH
                    </span>
                  </div>

                  {/* Modules */}
                  <div className="mt-7 grid gap-px border border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
                    <EngineModule
                      number="01"
                      icon={<GraduationCap size={17} />}
                      title="Knowledge Distillation"
                      description="Transfer predictive behaviour from teacher to compact student."
                    />

                    <EngineModule
                      number="02"
                      icon={<Network size={17} />}
                      title="Architecture Search"
                      description="Explore candidate structures under deployment constraints."
                    />
                  </div>

                  {/* Constraint gate */}
                  <div className="mt-7 border border-white/[0.08] bg-transparent/40 p-5 sm:p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-violet-300/20 bg-violet-300/[0.04]">
                          <ShieldCheck
                            size={18}
                            strokeWidth={1.4}
                            className="text-violet-200"
                          />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-violet-300">
                              Constraint Gate
                            </span>

                            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
                              CANDIDATE EVALUATION
                            </span>
                          </div>

                          <h5 className="mt-2 text-lg font-medium">
                            HE Constraint Evaluator
                          </h5>

                          <p className="mt-2 max-w-xl text-xs leading-6 text-zinc-600">
                            Candidate models are assessed against predictive
                            quality, structural complexity and multiplicative
                            depth.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
                        <Constraint
                          label="ACCURACY"
                          value="MAX"
                        />
                        <Constraint
                          label="MODEL SIZE"
                          value="MIN"
                        />
                        <Constraint
                          label="DEPTH"
                          value="MIN"
                        />
                        <Constraint
                          label="HE COST"
                          value="MIN"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <ArchitectureVertical label="BEST CANDIDATE" />

              {/* STUDENT */}
              <div className="mx-auto max-w-2xl">
                <ArchitectureCard
                  icon={<CheckCircle2 size={19} />}
                  code="MODEL_02 / SELECTED"
                  title="HE-Compatible Student"
                  description="Compact architecture with controlled multiplicative depth and HE-friendly operations."
                  active
                  large
                />
              </div>

              <ArchitectureVertical label="SECURE DEPLOYMENT" />

              {/* INFERENCE */}
              <div className="border border-white/[0.08] bg-transparent/50 p-5 sm:p-8">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-600">
                      Deployment Layer
                    </span>

                    <h4 className="mt-2 text-xl font-medium">
                      Encrypted Inference
                    </h4>
                  </div>

                  <LockKeyhole
                    size={18}
                    strokeWidth={1.3}
                    className="text-violet-200"
                  />
                </div>

                <div className="grid gap-px border border-white/[0.06] bg-white/[0.06] md:grid-cols-4">
                  <InferenceModule
                    icon={<Database size={17} />}
                    code="INPUT"
                    title="Private Data"
                  />

                  <InferenceModule
                    icon={<LockKeyhole size={17} />}
                    code="ENCODE"
                    title="CKKS Encryption"
                  />

                  <InferenceModule
                    icon={<Zap size={17} />}
                    code="COMPUTE"
                    title="HE Evaluation"
                    active
                  />

                  <InferenceModule
                    icon={<Check size={17} />}
                    code="OUTPUT"
                    title="Prediction"
                  />
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.8)]" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700">
                    Computation performed on encrypted input
                  </span>

                  <div className="h-px flex-1 bg-white/[0.05]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* FINAL STATEMENT */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-32 overflow-hidden border border-white/[0.07] bg-white/[0.012] px-6 py-16 text-center sm:px-12"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 bg-violet-300/[0.035] blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-violet-300/20 bg-violet-300/[0.03]">
              <Sparkles
                size={19}
                strokeWidth={1.2}
                className="text-violet-200"
              />
            </div>

            <p className="mt-7 font-mono text-[8px] uppercase tracking-[0.4em] text-zinc-700">
              SHENOVA / SYSTEM OUTPUT
            </p>

            <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
              Intelligence
              <span className="text-zinc-600"> without exposure.</span>
            </h3>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-600">
              A deployment-aware path from knowledge transfer to
              privacy-preserving inference.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700">
              <span>KNOWLEDGE PRESERVED</span>
              <span>•</span>
              <span>DEPTH CONSTRAINED</span>
              <span>•</span>
              <span>HE COMPATIBLE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================= */
/* COMPONENTS */
/* ============================================================= */

function ArchitectureCard({
  icon,
  code,
  title,
  description,
  active = false,
  large = false,
}: {
  icon: React.ReactNode;
  code: string;
  title: string;
  description: string;
  active?: boolean;
  large?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`group relative border p-5 transition-all duration-300 ${
        active
          ? "border-violet-300/20 bg-violet-300/[0.025]"
          : "border-white/[0.07] bg-white/[0.012]"
      } ${large ? "p-7" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex shrink-0 items-center justify-center border ${
            active
              ? "border-violet-300/20 bg-violet-300/[0.04] text-violet-200"
              : "border-white/[0.08] bg-white/[0.02] text-zinc-500"
          } ${large ? "h-12 w-12" : "h-10 w-10"}`}
        >
          {icon}
        </div>

        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700">
            {code}
          </p>

          <h4 className={`mt-2 font-medium ${large ? "text-xl" : "text-base"}`}>
            {title}
          </h4>

          <p className="mt-2 text-xs leading-6 text-zinc-600">
            {description}
          </p>
        </div>
      </div>

      {active && (
        <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.8)]" />
      )}
    </motion.div>
  );
}

function ArchitectureConnector() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <ArrowRight size={15} className="text-zinc-700" />
    </div>
  );
}

function ArchitectureVertical({ label }: { label: string }) {
  return (
    <div className="flex h-20 flex-col items-center justify-center gap-2">
      <div className="h-8 w-px bg-gradient-to-b from-violet-300/40 to-white/[0.04]" />

      <div className="flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-violet-300/60" />

        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-700">
          {label}
        </span>
      </div>
    </div>
  );
}

function EngineModule({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
      className="bg-transparent/40 p-5 transition-colors sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center border border-white/[0.08] text-zinc-400">
          {icon}
        </div>

        <span className="font-mono text-[8px] text-zinc-800">
          {number}
        </span>
      </div>

      <h5 className="mt-5 text-sm font-medium text-zinc-300">{title}</h5>

      <p className="mt-2 text-xs leading-6 text-zinc-600">{description}</p>
    </motion.div>
  );
}

function Constraint({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-transparent px-4 py-3 text-center">
      <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-zinc-700">
        {label}
      </p>

      <p className="mt-1 font-mono text-[10px] text-zinc-300">{value}</p>
    </div>
  );
}

function InferenceModule({
  icon,
  code,
  title,
  active = false,
}: {
  icon: React.ReactNode;
  code: string;
  title: string;
  active?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
      className="bg-transparent px-5 py-6 transition-colors"
    >
      <div
        className={`mx-auto flex h-10 w-10 items-center justify-center border ${
          active
            ? "border-violet-300/20 text-violet-200"
            : "border-white/[0.07] text-zinc-600"
        }`}
      >
        {icon}
      </div>

      <p className="mt-4 text-center font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
        {code}
      </p>

      <p className="mt-2 text-center text-xs text-zinc-400">{title}</p>
    </motion.div>
  );
}

function Corner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const positions = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };

  return (
    <div
      className={`absolute h-3 w-3 border-violet-300/30 ${positions[position]}`}
    />
  );
}