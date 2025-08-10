"use client";

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/anim';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center snap-start">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-4"
      >
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extralight tracking-tight">
          Hey, I’m Oumer
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-gray-700 dark:text-white/60">
          Second-year Computer Science student building clean interfaces and reliable systems.
        </motion.p>
      </motion.div>
    </section>
  );
}

