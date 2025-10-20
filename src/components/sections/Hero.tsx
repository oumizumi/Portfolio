"use client";

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/anim';
import BlinkingCursor  from '@/components/layout/BlinkingCursor';
import TypingDescription from '@/components/layout/TypingDescription';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center snap-start">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-20 max-w-6xl mx-auto px-4"
      >
        <motion.h1 variants={fadeUp} className="text-2xl md:text-4xl font-extralight tracking-tight">
           <TypingDescription /><BlinkingCursor />
        </motion.h1>
      </motion.div>
    </section>
  );
}

