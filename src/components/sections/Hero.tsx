'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fadeUp, staggerContainer } from '@/lib/anim';
import BlinkingCursor from '@/components/layout/BlinkingCursor';
import TypingDescription from '@/components/layout/TypingDescription';


export default function Hero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString('en-CA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Toronto',
        hour12: false,
      }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="min-h-[90vh] flex items-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="page-container-wide py-24 w-full"
      >
        <motion.h1
          variants={fadeUp}
          className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-warm-white leading-relaxed mb-5 max-w-2xl"
        >
          <TypingDescription />
          <BlinkingCursor />
        </motion.h1>

        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" className="text-warm-white/60">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="text-warm-white/60" style={{ fontSize: '15px', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}>
            {time} — Ottawa, ON
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <Link
            href="/experiences"
            className="px-5 py-2.5 bg-accent text-fg rounded text-sm font-medium hover:opacity-75 transition-opacity"
          >
            view experience
          </Link>
          <Link
            href="/about"
            className="px-5 py-2.5 border border-subtle text-warm-white rounded text-sm hover:border-accent hover:text-accent transition-colors"
          >
            about me
          </Link>
          <a
            href="/Oumer_Gharad_Res.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-subtle text-warm-white/65 rounded text-sm hover:border-accent hover:text-accent transition-colors"
          >
            resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
