"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  Cpu,
  Layers3,
  LockKeyhole,
  Scan,
  ShieldCheck,
} from "lucide-react";

const layers = [
  {
    nodes: 4,
    label: "INPUT",
    code: "L0",
    type: "FEATURE SPACE",
  },
  {
    nodes: 6,
    label: "HIDDEN 01",
    code: "L1",
    type: "TRANSFORM",
  },
  {
    nodes: 6,
    label: "HIDDEN 02",
    code: "L2",
    type: "POLYNOMIAL",
  },
  {
    nodes: 4,
    label: "STUDENT",
    code: "L3",
    type: "COMPACT",
  },
  {
    nodes: 2,
    label: "OUTPUT",
    code: "L4",
    type: "PREDICTION",
  },
];

export default function NeuralGraph() {
  return (
    <section
      id="architecture"
      className="relative overflow-hidden bg-transparent px-6 py-32 text-white"
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[25%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.025] blur-[180px]" />
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
              02 / Model Topology
            </span>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h2 className="max-w-5xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                Intelligence,
                <br />
                <span className="text-zinc-600">
                  compressed for privacy.
                </span>
              </h2>
            </div>

            <div className="border-l border-white/[0.08] pl-6">
              <p className="max-w-md text-sm leading-7 text-zinc-500">
                The selected student architecture is shaped around the
                computational constraints of homomorphic encryption, including
                controlled multiplicative depth and HE-compatible nonlinear
                operations.
              </p>

              <div className="mt-7 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                Neural topology / mapped
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================== */}
        {/* ARCHITECTURE PANEL */}
        {/* ===================================================== */}

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden border border-white/[0.08] bg-white/[0.012]"
        >
          {/* Corner brackets */}
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />

          <div className="relative p-5 sm:p-8 lg:p-10">
            {/* ================================================= */}
            {/* PANEL HEADER */}
            {/* ================================================= */}

            <div className="mb-12 flex flex-col gap-5 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-violet-300/20 bg-violet-300/[0.025]">
                  <Scan
                    size={17}
                    strokeWidth={1.2}
                    className="text-violet-200"
                  />
                </div>

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-600">
                    Architecture Map
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    HE-Compatible Student Network
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-white/[0.07] px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300 shadow-[0_0_9px_rgba(196,181,253,0.8)]" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-600">
                    Live topology
                  </span>
                </div>

                <span className="hidden font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-800 sm:block">
                  MODEL_02
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* NETWORK */}
            {/* ================================================= */}

            <div className="relative">
              {/* Connection layer */}
              <div className="pointer-events-none absolute inset-x-[8%] top-[145px] hidden h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent lg:block" />

              <div className="grid min-h-[500px] grid-cols-5 gap-2 sm:gap-6 lg:gap-10">
                {layers.map((layer, layerIndex) => (
                  <NetworkLayer
                    key={layer.code}
                    layer={layer}
                    layerIndex={layerIndex}
                  />
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* SIGNAL LEGEND */}
            {/* ================================================= */}

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.07] pt-6">
              <Legend
                symbol="ACTIVE"
                color="violet"
              />

              <Legend
                symbol="NEURON"
                color="white"
              />

              <Legend
                symbol="HE PATH"
                color="violet"
              />

              <div className="ml-auto flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-800">
                <Activity size={11} />
                Signal propagation
              </div>
            </div>

            {/* ================================================= */}
            {/* MODEL CHARACTERISTICS */}
            {/* ================================================= */}

            <div className="mt-8 grid gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              <ArchitectureStat
                icon={<Layers3 size={15} />}
                label="NETWORK DEPTH"
                value="5 Layers"
              />

              <ArchitectureStat
                icon={<Cpu size={15} />}
                label="NONLINEARITY"
                value="Polynomial"
              />

              <ArchitectureStat
                icon={<ShieldCheck size={15} />}
                label="HE TARGET"
                value="CKKS"
              />

              <ArchitectureStat
                icon={<LockKeyhole size={15} />}
                label="INFERENCE"
                value="Encrypted"
              />
            </div>
          </div>
        </motion.div>

        {/* ===================================================== */}
        {/* ARCHITECTURE EXPLANATION */}
        {/* ===================================================== */}

        <div className="mt-10 grid gap-px border border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
          <ArchitectureNote
            number="01"
            title="Compact"
            text="The student network reduces structural complexity while preserving useful knowledge transferred from the teacher."
          />

          <ArchitectureNote
            number="02"
            title="Polynomial"
            text="Nonlinear operations are represented using polynomial approximations suitable for encrypted arithmetic."
          />

          <ArchitectureNote
            number="03"
            title="Encrypted"
            text="The resulting model is intended for inference over encrypted input rather than requiring plaintext patient data."
          />
        </div>

        {/* Bottom label */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            Model layer
          </span>

          <div className="h-px flex-1 bg-white/[0.05]" />

          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-zinc-800">
            SHENOVA / 002
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================= */
/* NETWORK LAYER */
/* ============================================================= */

function NetworkLayer({
  layer,
  layerIndex,
}: {
  layer: {
    nodes: number;
    label: string;
    code: string;
    type: string;
  };
  layerIndex: number;
}) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Layer header */}
      <div className="mb-8 text-center">
        <span className="font-mono text-[7px] tracking-[0.2em] text-zinc-800 sm:text-[8px]">
          {layer.code}
        </span>

        <p className="mt-2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.12em] text-zinc-500 sm:text-[9px] sm:tracking-[0.18em]">
          {layer.label}
        </p>

        <p className="mt-1 hidden font-mono text-[6px] uppercase tracking-[0.12em] text-zinc-800 sm:block">
          {layer.type}
        </p>
      </div>

      {/* Nodes */}
      <div className="relative flex min-h-[300px] flex-col items-center justify-center gap-5">
        {/* Vertical trace */}
        <div className="pointer-events-none absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-white/[0.035]" />

        {Array.from({ length: layer.nodes }).map((_, nodeIndex) => (
          <Neuron
            key={nodeIndex}
            layerIndex={layerIndex}
            nodeIndex={nodeIndex}
            totalNodes={layer.nodes}
          />
        ))}
      </div>

      {/* Node count */}
      <div className="mt-6 border border-white/[0.06] px-3 py-2">
        <span className="font-mono text-[7px] tracking-[0.2em] text-zinc-700">
          {String(layer.nodes).padStart(2, "0")} NODES
        </span>
      </div>
    </div>
  );
}

/* ============================================================= */
/* NEURON */
/* ============================================================= */

function Neuron({
  layerIndex,
  nodeIndex,
  totalNodes,
}: {
  layerIndex: number;
  nodeIndex: number;
  totalNodes: number;
}) {
  const isCoreLayer = layerIndex === 2 || layerIndex === 3;
  const isOutput = layerIndex === 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: layerIndex * 0.12 + nodeIndex * 0.05,
      }}
      whileHover={{
        scale: 1.18,
      }}
      className="group relative z-10"
    >
      {/* Outer ring */}
      <div
        className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11 ${
          isCoreLayer
            ? "border-violet-300/25 bg-violet-300/[0.025]"
            : "border-white/[0.09] bg-transparent"
        } group-hover:border-violet-300/50`}
      >
        {/* Rotating orbit */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 7 + layerIndex,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-4px] rounded-full border border-transparent"
        >
          <span
            className={`absolute left-1/2 top-[-2px] h-1 w-1 -translate-x-1/2 rounded-full ${
              isCoreLayer
                ? "bg-violet-300"
                : "bg-zinc-500"
            }`}
          />
        </motion.div>

        {/* Core */}
        <motion.div
          animate={{
            opacity: [0.45, 1, 0.45],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: layerIndex * 0.25 + nodeIndex * 0.12,
            ease: "easeInOut",
          }}
          className={`h-2 w-2 rounded-full ${
            isOutput
              ? "bg-violet-200 shadow-[0_0_12px_rgba(196,181,253,0.9)]"
              : isCoreLayer
                ? "bg-violet-300 shadow-[0_0_9px_rgba(196,181,253,0.6)]"
                : "bg-zinc-500"
          }`}
        />

        {/* Pulse */}
        <motion.div
          animate={{
            scale: [1, 1.8],
            opacity: [0.35, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: layerIndex * 0.3 + nodeIndex * 0.16,
            ease: "easeOut",
          }}
          className={`absolute inset-0 rounded-full border ${
            isCoreLayer
              ? "border-violet-300/30"
              : "border-white/[0.12]"
          }`}
        />
      </div>

      {/* Node index */}
      <span className="absolute -right-5 top-1/2 hidden -translate-y-1/2 font-mono text-[5px] text-zinc-800 sm:block">
        {String(
          nodeIndex + 1
        ).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

/* ============================================================= */
/* ARCHITECTURE STAT */
/* ============================================================= */

function ArchitectureStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.018)",
      }}
      className="bg-transparent p-5 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-violet-200">{icon}</span>

        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
          {label}
        </span>
      </div>

      <p className="mt-4 text-sm text-zinc-300">{value}</p>
    </motion.div>
  );
}

/* ============================================================= */
/* ARCHITECTURE NOTE */
/* ============================================================= */

function ArchitectureNote({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.018)",
      }}
      className="bg-transparent p-7 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] tracking-[0.25em] text-violet-300/70">
          {number}
        </span>

        <ArrowRight
          size={13}
          strokeWidth={1}
          className="text-zinc-800"
        />
      </div>

      <h3 className="mt-6 text-sm font-medium text-zinc-300">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-6 text-zinc-600">
        {text}
      </p>
    </motion.div>
  );
}

/* ============================================================= */
/* LEGEND */
/* ============================================================= */

function Legend({
  symbol,
  color,
}: {
  symbol: string;
  color: "violet" | "white";
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-1.5 w-1.5 ${
          color === "violet"
            ? "bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.7)]"
            : "bg-zinc-500"
        }`}
      />

      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
        {symbol}
      </span>
    </div>
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