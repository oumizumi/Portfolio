"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface StarSpec {
  size: number; // px
  delay: number; // seconds
  duration: number; // seconds
  xPercent: number; // 0-100
  yPercent: number; // 0-100
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return function next() {
    // LCG: Numerical Recipes
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296; // [0,1)
  };
}

function generateStarSpecs(count: number, seed = 1337): StarSpec[] {
  const rand = createSeededRandom(seed);
  const specs: StarSpec[] = [];
  for (let i = 0; i < count; i += 1) {
    const margin = 2; // keep off the very edges
    const xPercent = margin + rand() * (100 - margin * 2);
    const yPercent = margin + rand() * (100 - margin * 2);
    const size = 2 + Math.floor(rand() * 4); // 2-5px
    const delay = rand() * 6; // 0-6s stagger
    const duration = 2.2 + rand() * 4.2; // 2.2 - 6.4s
    specs.push({ size, delay, duration, xPercent, yPercent });
  }
  return specs;
}

function Star({ size, delay, duration, xPercent, yPercent }: StarSpec) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <span
        className="block w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-300 dark:from-blue-300 dark:to-white"
        style={{
          boxShadow: `
            0 0 ${size * 1.5}px rgba(37,99,235,.85),
            0 0 ${size * 3}px rgba(37,99,235,.55),
            inset 0 0 ${Math.max(1, size / 2)}px rgba(255,255,255,.9)
          `,
          border: "1px solid rgba(37,99,235,.6)",
          filter: "drop-shadow(0 0 4px rgba(37,99,235,.7))",
        }}
      />
    </motion.div>
  );
}

const StarMemo = memo(Star);

export default function FloatingDots() {
  // Many stars with deterministic PRNG so layout is stable
  const stars = useMemo<StarSpec[]>(() => generateStarSpecs(120, 20240918), []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 hidden dark:block">
      {stars.map((spec, index) => (
        <StarMemo key={`${spec.xPercent.toFixed(2)}-${spec.yPercent.toFixed(2)}-${index}`} {...spec} />)
      )}
    </div>
  );
}
