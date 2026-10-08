"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Workflow from "../components/workflow";
import NeuralGraph from "../components/NeuralGraph";
import Metrics from "../components/Metrics";
import ParticleBackground from "../components/ParticleBackground";
import SplashScreen from "../components/SplashScreen";

/* =========================================================
   PERSISTENT SHENOVA FACE
   ========================================================= */

function BackgroundFace() {
  const { scrollYProgress } = useScroll();

  /*
   * SCROLL MOVEMENT
   *
   * HERO          → RIGHT
   * WORKFLOW      → LEFT
   * ARCHITECTURE  → CENTER
   * METRICS       → LEFT
   * BOTTOM        → RIGHT
   */

  const rawX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["21vw", "-19vw", "0vw", "-19vw", "21vw"]
  );

  const x = useSpring(rawX, {
    stiffness: 45,
    damping: 25,
    mass: 0.8,
  });

  /*
   * Small vertical movement.
   */

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["-1vh", "3vh", "-2vh", "3vh", "0vh"]
  );

  const y = useSpring(rawY, {
    stiffness: 40,
    damping: 24,
    mass: 0.8,
  });

  /*
   * Subtle breathing / scale.
   */

  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.88, 0.96, 1.02, 0.96, 0.9]
  );

  /*
   * Face visibility.
   */

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.5, 0.75, 0.9, 1],
    [0.48, 0.38, 0.3, 0.42, 0.3, 0.38, 0.45]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {/* =====================================================
          AMBIENT GLOW
          ===================================================== */}

      <motion.div
        style={{
          x,
          y,
          scale,
          opacity,
        }}
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.045] blur-[130px]"
      />

      {/* =====================================================
          MOVING FACE SYSTEM
          ===================================================== */}

      <motion.div
        style={{
          x,
          y,
          scale,
          opacity,
        }}
        className="absolute left-1/2 top-1/2 h-[76vh] w-[42vw] min-w-[390px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative h-full w-full">

          {/* =================================================
              FACE
              ================================================= */}

          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/shenova-face.png"
              alt=""
              className="h-[94%] w-auto max-w-none object-contain mix-blend-screen"
            />
          </div>

          {/* =================================================
              FACE EDGE FADE
              ================================================= */}

          <div className="pointer-events-none absolute inset-x-[12%] bottom-0 h-[28%] bg-gradient-to-t from-black via-black/60 to-transparent" />

          <div className="pointer-events-none absolute inset-y-[8%] left-0 w-[22%] bg-gradient-to-r from-black to-transparent" />

          <div className="pointer-events-none absolute inset-y-[8%] right-0 w-[18%] bg-gradient-to-l from-black to-transparent" />

          {/* =================================================
              OUTER ORBIT
              ================================================= */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.06]"
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-300/70 shadow-[0_0_18px_rgba(167,139,250,0.8)]" />
          </motion.div>

          {/* =================================================
              INNER ORBIT
              ================================================= */}

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
          >
            <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/40" />
          </motion.div>

          {/* =================================================
              SECOND SIGNAL ORBIT
              ================================================= */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2"
          >
            <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-200/60 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
          </motion.div>

          {/* =================================================
              SCAN LINE
              ================================================= */}

          <motion.div
            animate={{
              top: ["12%", "88%", "12%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent"
          />
        </div>
      </motion.div>

      {/* =====================================================
          VERY SUBTLE GLOBAL GRID
          ===================================================== */}

      <div
        className="absolute inset-0 opacity-[0.012] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:100px_100px]"
      />
    </div>
  );
}

/* =========================================================
   HOME
   ========================================================= */

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* =====================================================
          SPLASH
          ===================================================== */}

      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* =====================================================
          LANDING PAGE
          ===================================================== */}

      <div
        className={`relative transition-opacity duration-700 ${
          showSplash
            ? "opacity-0"
            : "opacity-100"
        }`}
      >

        {/* ===================================================
            PERSISTENT MOVING FACE
            =================================================== */}

        <BackgroundFace />

        {/* ===================================================
            NAVBAR
            =================================================== */}

        <Navbar />

        {/* ===================================================
            HERO
            =================================================== */}

        <section
          id="hero"
          className="relative z-10 min-h-screen overflow-hidden bg-transparent"
        >
          <ParticleBackground />
          <Hero />
        </section>

        {/* ===================================================
            WORKFLOW
            =================================================== */}

        <section
          id="workflow"
          className="relative z-10 bg-transparent"
        >
          <Workflow />
        </section>

        {/* ===================================================
            ARCHITECTURE
            =================================================== */}

        <section
          id="architecture"
          className="relative z-10 bg-transparent"
        >
          <NeuralGraph />
        </section>

        {/* ===================================================
            METRICS
            =================================================== */}

        <section
          id="metrics"
          className="relative z-10 bg-transparent"
        >
          <Metrics />
        </section>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <footer className="relative z-10 border-t border-white/[0.08] bg-black px-6 py-14">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">

            {/* Footer identity */}

            <div>
              <h3 className="text-xl font-bold tracking-[0.18em] text-white">
                SHENOVA
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
                Constraint-aware optimization for
                efficient, privacy-preserving,
                homomorphic-encryption-compatible AI.
              </p>
            </div>

            {/* Footer metadata */}

            <div className="text-center md:text-right">

              <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-600">
                Privacy × Intelligence × Optimization
              </p>

              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-zinc-700">
                SHENOVA RESEARCH PROJECT
              </p>

            </div>

          </div>

        </footer>

      </div>
    </main>
  );
}