"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Cpu,
  Database,
  LockKeyhole,
  UnlockKeyhole,
} from "lucide-react";

const steps = [
  {
    number: "01",
    code: "PRIVATE_INPUT",
    title: "Patient Data",
    description:
      "Healthcare data enters the SHENOVA pipeline while remaining under the control of the data owner.",
    icon: Database,
    detail: "PLAINTEXT INPUT",
  },
  {
    number: "02",
    code: "ENCRYPTION",
    title: "CKKS Encryption",
    description:
      "The input is encoded and encrypted into a ciphertext representation suitable for homomorphic computation.",
    icon: LockKeyhole,
    detail: "CIPHERTEXT",
  },
  {
    number: "03",
    code: "HE_COMPUTATION",
    title: "Encrypted Inference",
    description:
      "The HE-compatible student model evaluates the encrypted input without requiring the underlying data to be revealed.",
    icon: Cpu,
    detail: "COMPUTE ON CIPHERTEXT",
  },
  {
    number: "04",
    code: "AUTHORIZED_OUTPUT",
    title: "Prediction",
    description:
      "The authorized party decrypts the resulting output to obtain the final prediction.",
    icon: UnlockKeyhole,
    detail: "CONTROLLED DECRYPTION",
  },
];

export default function EncryptionFlow() {
  return (
    <section
      id="encryption"
      className="relative overflow-hidden bg-transparent px-6 py-32 text-white"
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.025] blur-[180px]" />
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
          className="mb-20"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-violet-300/60" />

            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              04 / Privacy Pipeline
            </span>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h2 className="max-w-5xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                Compute on
                <br />
                <span className="text-zinc-600">what stays hidden.</span>
              </h2>
            </div>

            <div className="border-l border-white/[0.08] pl-6">
              <p className="max-w-md text-sm leading-7 text-zinc-500">
                SHENOVA uses a homomorphic-encryption-compatible student model
                so inference can be performed over encrypted healthcare input.
              </p>

              <div className="mt-7 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70 shadow-[0_0_10px_rgba(196,181,253,0.6)]" />
                Encrypted computation / active
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================== */}
        {/* FLOW CONTAINER */}
        {/* ===================================================== */}

        <div className="relative border border-white/[0.08] bg-white/[0.012]">
          {/* Corner markers */}
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />

          <div className="relative p-5 sm:p-8 lg:p-10">
            {/* System header */}
            <div className="mb-10 flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-600">
                  SHENOVA / Encrypted Inference Layer
                </p>

                <p className="mt-2 text-xs text-zinc-700">
                  Private input → encryption → encrypted computation → authorized output
                </p>
              </div>

              <div className="flex items-center gap-2 border border-white/[0.07] px-3 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300 shadow-[0_0_9px_rgba(196,181,253,0.8)]" />

                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-600">
                  Secure channel
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* DESKTOP FLOW */}
            {/* ================================================= */}

            <div className="hidden lg:block">
              <div className="relative">
                {/* Connection line */}
                <div className="absolute left-[9%] right-[9%] top-[61px] h-px bg-gradient-to-r from-white/[0.04] via-violet-300/30 to-white/[0.04]" />

                <div className="grid grid-cols-4 gap-5">
                  {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.12,
                        }}
                        className="group relative"
                      >
                        {/* Node */}
                        <div className="relative z-10 mx-auto flex h-[122px] w-[122px] items-center justify-center">
                          <div className="absolute inset-0 rounded-full border border-white/[0.08]" />

                          <div className="absolute inset-3 rounded-full border border-violet-300/[0.08]" />

                          <motion.div
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 16,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0"
                          >
                            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.8)]" />
                          </motion.div>

                          <div className="relative flex h-14 w-14 items-center justify-center border border-white/[0.1] bg-transparent text-zinc-400 transition-all duration-300 group-hover:border-violet-300/30 group-hover:text-violet-200">
                            <Icon
                              size={21}
                              strokeWidth={1.25}
                            />
                          </div>
                        </div>

                        {/* Step */}
                        <div className="mt-7 text-center">
                          <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-violet-300/70">
                            {step.code}
                          </p>

                          <h3 className="mt-3 text-lg font-medium text-zinc-200">
                            {step.title}
                          </h3>

                          <p className="mx-auto mt-3 max-w-[230px] text-xs leading-6 text-zinc-600">
                            {step.description}
                          </p>

                          <div className="mx-auto mt-6 flex w-fit items-center gap-2 border border-white/[0.06] px-3 py-2">
                            <span className="h-1 w-1 bg-violet-300/70" />

                            <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-zinc-700">
                              {step.detail}
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        {index < steps.length - 1 && (
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute -right-3 top-[54px] z-20 flex items-center"
                          >
                            <ArrowRight
                              size={13}
                              strokeWidth={1}
                              className="text-violet-300/50"
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* MOBILE FLOW */}
            {/* ================================================= */}

            <div className="lg:hidden">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="relative">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.08,
                      }}
                      className="relative flex gap-5"
                    >
                      {/* Timeline */}
                      <div className="relative flex w-10 shrink-0 justify-center">
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-white/[0.1] bg-transparent text-violet-200">
                          <Icon size={16} strokeWidth={1.2} />
                        </div>

                        {index < steps.length - 1 && (
                          <div className="absolute bottom-[-45px] top-10 w-px bg-gradient-to-b from-violet-300/30 to-white/[0.03]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 border-b border-white/[0.06] pb-10">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[8px] tracking-[0.2em] text-zinc-700">
                            {step.number}
                          </span>

                          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-violet-300/70">
                            {step.code}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-medium text-zinc-200">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-xs leading-6 text-zinc-600">
                          {step.description}
                        </p>

                        <div className="mt-5 flex w-fit items-center gap-2 border border-white/[0.06] px-3 py-2">
                          <span className="h-1 w-1 bg-violet-300/70" />

                          <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-zinc-700">
                            {step.detail}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {index < steps.length - 1 && (
                      <div className="flex h-8 items-center justify-center">
                        <ArrowDown
                          size={12}
                          className="text-zinc-800"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* CORE PRINCIPLE */}
        {/* ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 grid border border-white/[0.07] bg-white/[0.012] md:grid-cols-[1fr_auto]"
        >
          <div className="p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-violet-300/60" />

              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-violet-300/70">
                Core Principle
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
              Compute first.
              <br />
              <span className="text-zinc-600">
                Reveal only what matters.
              </span>
            </h3>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600">
              Sensitive input remains encrypted during homomorphic evaluation.
              The system is designed so that the authorized party receives the
              prediction without exposing the underlying patient data to the
              inference process.
            </p>
          </div>

          <div className="flex items-center border-t border-white/[0.07] p-7 md:border-l md:border-t-0 sm:p-9">
            <div className="relative flex h-28 w-28 items-center justify-center border border-violet-300/20">
              <div className="absolute inset-3 border border-violet-300/[0.08]" />

              <div className="relative text-center">
                <p className="font-mono text-2xl font-light tracking-[0.15em] text-violet-200">
                  HE
                </p>

                <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.2em] text-zinc-700">
                  COMPUTATION
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom system label */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            Privacy layer
          </span>

          <div className="h-px flex-1 bg-white/[0.05]" />

          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            SHENOVA / 004
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================= */
/* CORNER MARKER */
/* ============================================================= */

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