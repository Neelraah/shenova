"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "5%", top: "15%", size: 4, delay: 0 },
  { left: "15%", top: "70%", size: 6, delay: 0.5 },
  { left: "25%", top: "35%", size: 3, delay: 1 },
  { left: "38%", top: "80%", size: 5, delay: 1.5 },
  { left: "48%", top: "20%", size: 4, delay: 0.8 },
  { left: "60%", top: "65%", size: 7, delay: 2 },
  { left: "72%", top: "30%", size: 3, delay: 1.2 },
  { left: "85%", top: "75%", size: 5, delay: 2.5 },
  { left: "92%", top: "18%", size: 4, delay: 1.8 },
  { left: "55%", top: "48%", size: 6, delay: 0.3 },
  { left: "32%", top: "55%", size: 3, delay: 2.2 },
  { left: "78%", top: "52%", size: 5, delay: 1.6 },
];

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/10 blur-[120px]"
      />

      {/* Animated particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-violet-300"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, index % 2 === 0 ? 15 : -15, 0],
            opacity: [0.15, 0.9, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + index * 0.4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Particle glow */}
          <div className="absolute inset-[-4px] rounded-full bg-violet-300/20 blur-md" />
        </motion.div>
      ))}

      {/* Floating horizontal lines */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          opacity: [0.1, 0.35, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[10%] top-[30%] h-px w-[35%] bg-gradient-to-r from-transparent via-violet-300 to-transparent"
      />

      <motion.div
        animate={{
          x: ["20%", "-20%", "20%"],
          opacity: [0.05, 0.3, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[5%] top-[65%] h-px w-[40%] bg-gradient-to-r from-transparent via-violet-300 to-transparent"
      />

      {/* Corner decorative rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-32 -top-32 h-64 w-64 rounded-full border border-violet-300/10"
      >
        <div className="absolute inset-6 rounded-full border border-violet-300/10" />
        <div className="absolute inset-14 rounded-full border border-violet-300/10" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full border border-violet-300/10"
      >
        <div className="absolute inset-8 rounded-full border border-violet-300/10" />
        <div className="absolute inset-16 rounded-full border border-violet-300/10" />
      </motion.div>
    </div>
  );
}