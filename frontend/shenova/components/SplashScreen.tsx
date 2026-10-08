"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({
  onComplete,
}: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    // First glitch
    const glitchOne = setTimeout(() => {
      setGlitch(true);

      setTimeout(() => {
        setGlitch(false);
      }, 170);
    }, 950);

    // Second glitch
    const glitchTwo = setTimeout(() => {
      setGlitch(true);

      setTimeout(() => {
        setGlitch(false);
      }, 150);
    }, 1750);

    // Exit splash
    const exitTimer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onComplete?.();
      }, 650);
    }, 5000);

    return () => {
      clearTimeout(glitchOne);
      clearTimeout(glitchTwo);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-transparent"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* =====================================================
              FACE
              ===================================================== */}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative flex h-[92vh] items-center justify-center"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -4, 0],
              }}
              transition={{
                opacity: {
                  duration: 1.15,
                  ease: "easeOut",
                },
                scale: {
                  duration: 1.3,
                  ease: [0.22, 1, 0.36, 1],
                },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.img
                src="/shenova-face.png"
                alt="SHENOVA"
                draggable={false}
                className={`block h-full w-auto max-w-none object-contain ${
                  glitch ? "shenova-glitch" : ""
                }`}
              />

              {/* Very subtle glow around portrait */}
              <div className="pointer-events-none absolute inset-0 rounded-[45%] shadow-[0_0_90px_rgba(120,90,255,0.06)]" />
            </motion.div>
          </div>

          {/* =====================================================
              CINEMATIC VIGNETTE
              ===================================================== */}

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.25)_65%,#000_100%)]" />

          {/* =====================================================
              SCANLINES
              ===================================================== */}

          <div className="pointer-events-none absolute inset-0 shenova-scanlines" />

          {/* Moving scan line */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-px bg-white/15 shadow-[0_0_18px_rgba(167,139,250,0.4)]"
            initial={{ top: "-5%" }}
            animate={{ top: "105%" }}
            transition={{
              duration: 3,
              ease: "linear",
            }}
          />

          {/* =====================================================
              TOP LABEL
              ===================================================== */}

          <motion.div
            className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] tracking-[0.45em] text-white/30"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.7,
            }}
          >
            SECURE INTELLIGENCE SYSTEM
          </motion.div>

          {/* =====================================================
              SHENOVA ORBIT
              ===================================================== */}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

            {/* Outer ring */}
            <motion.div
              className="absolute h-[72vh] w-[72vh] rounded-full border border-white/[0.07]"
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.85,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Inner ring */}
            <motion.div
              className="absolute h-[66vh] w-[66vh] rounded-full border border-white/[0.035]"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 1.05,
                duration: 1,
              }}
            />

            {/* =================================================
                ROTATING SHENOVA TEXT
                ================================================= */}

            <motion.div
              className="absolute h-[72vh] w-[72vh]"
              initial={{
                opacity: 0,
                rotate: -25,
              }}
              animate={{
                opacity: 1,
                rotate: 360,
              }}
              transition={{
                opacity: {
                  delay: 1.15,
                  duration: 0.8,
                },
                rotate: {
                  delay: 1.4,
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <svg
                viewBox="0 0 500 500"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <defs>
                  <path
                    id="shenova-orbit-path"
                    d="
                      M 250 250
                      m -205 0
                      a 205 205 0 1 1 410 0
                      a 205 205 0 1 1 -410 0
                    "
                  />
                </defs>

               <motion.text
  className="fill-white font-sans text-[42px] font-bold"
  initial={{
    opacity: 0,
  }}
  animate={{
    opacity: 1,
  }}
  transition={{
    delay: 1.35,
    duration: 0.8,
  }}
  style={{
    letterSpacing: "15px",
  }}
>
  <textPath
    href="#shenova-orbit-path"
    startOffset="3%"
  >
    S H E N O V A
  </textPath>
</motion.text>
              </svg>
            </motion.div>

            {/* =================================================
                ORBITAL MARKERS
                ================================================= */}

            <motion.div
              className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.65)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1.5 }}
              style={{
                transform: "translateX(36vh)",
              }}
            />

            <motion.div
              className="absolute h-1 w-1 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(167,139,250,0.8)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.7 }}
              style={{
                transform: "translateX(-36vh)",
              }}
            />

            <motion.div
              className="absolute h-1 w-1 rounded-full bg-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.8 }}
              style={{
                transform: "translateY(-36vh)",
              }}
            />

          </div>

          {/* =====================================================
              CORNER MARKERS
              ===================================================== */}

          <div className="absolute left-6 top-6 h-7 w-7 border-l border-t border-white/[0.12]" />

          <div className="absolute right-6 top-6 h-7 w-7 border-r border-t border-white/[0.12]" />

          <div className="absolute bottom-6 left-6 h-7 w-7 border-b border-l border-white/[0.12]" />

          <div className="absolute bottom-6 right-6 h-7 w-7 border-b border-r border-white/[0.12]" />

          {/* =====================================================
              BOTTOM TAGLINE
              ===================================================== */}

          <motion.div
            className="absolute bottom-[9%] left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.55,
              duration: 0.8,
            }}
          >
            <div
              className={`font-sans text-[10px] tracking-[0.5em] text-white/45 md:text-xs ${
                glitch ? "shenova-text-glitch" : ""
              }`}
            >
              INTELLIGENCE WITHOUT EXPOSURE
            </div>
          </motion.div>

          {/* =====================================================
              INITIALIZATION
              ===================================================== */}

          <motion.div
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.9,
            }}
          >
            <div className="h-px w-12 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-white/60"
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 1,
                  delay: 1.9,
                  ease: "easeInOut",
                }}
              />
            </div>

            <span className="font-mono text-[7px] tracking-[0.3em] text-white/25">
              INITIALIZING
            </span>

            <div className="h-1 w-1 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}