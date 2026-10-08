"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, LockKeyhole } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-6 pt-20">

      {/* Subtle radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(124,92,246,0.09),transparent_32%)]" />

      {/* Technical grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1fr_0.8fr]">

        {/* =====================================================
            LEFT
            ===================================================== */}

        <div className="relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-violet-400/60" />

            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500">
              Privacy-preserving intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="max-w-4xl text-[clamp(4rem,8vw,8rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-white"
          >
            Intelligence
            <br />

            <span className="text-zinc-600">
              without
            </span>

            <br />

            exposure.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="mt-10 max-w-xl text-base leading-7 text-zinc-500 md:text-lg"
          >
            SHENOVA explores constraint-aware AI optimization for
            privacy-preserving inference under homomorphic encryption.
          </motion.p>

          {/* Technical metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {["CKKS", "HE INFERENCE", "KNOWLEDGE DISTILLATION"].map(
              (item) => (
                <div
                  key={item}
                  className="border border-white/[0.08] px-3 py-2 font-mono text-[8px] tracking-[0.18em] text-zinc-500"
                >
                  {item}
                </div>
              ),
            )}
          </motion.div>

          <motion.a
            href="#workflow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12 inline-flex items-center gap-3 border border-white/15 px-5 py-3 text-xs font-medium text-white transition-all duration-300 hover:border-violet-300/50 hover:bg-white/[0.03]"
          >
            Explore system
            <ArrowDownRight size={14} />
          </motion.a>
        </div>

        {/* =====================================================
            RIGHT — FLOATING SHENOVA PORTRAIT
            ===================================================== */}

        <div className="relative flex min-h-[620px] items-center justify-center">
  <div className="absolute h-[500px] w-[500px] rounded-full border border-white/[0.045]" />

  <div className="absolute h-[420px] w-[420px] rounded-full border border-violet-300/[0.055]" />

  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 24,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute h-[500px] w-[500px]"
  >
    <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-300/70 shadow-[0_0_15px_rgba(167,139,250,0.8)]" />
  </motion.div>

  <div className="relative text-center">
    <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
      SHENOVA ENGINE
    </p>

    <div className="mt-5 font-mono text-[11px] tracking-[0.25em] text-zinc-500">
      PRIVATE COMPUTATION
    </div>

    <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />

    <div className="mt-8 grid grid-cols-2 gap-px border border-white/[0.08] bg-white/[0.08]">
      {[
        "CKKS",
        "HE INFERENCE",
        "POLYNOMIAL",
        "DISTILLATION",
      ].map((item) => (
        <div
          key={item}
          className="bg-transparent/80 px-5 py-4 font-mono text-[8px] tracking-[0.18em] text-zinc-600"
        >
          {item}
        </div>
      ))}
    </div>
  </div>
</div>
      </div>

      {/* Bottom coordinates */}
      <div className="absolute bottom-8 left-6 font-mono text-[8px] tracking-[0.25em] text-zinc-700">
        13.0827° N / 80.2707° E
      </div>

      <div className="absolute bottom-8 right-6 font-mono text-[8px] tracking-[0.25em] text-zinc-700">
        SHENOVA / 001
      </div>
    </section>
  );
}