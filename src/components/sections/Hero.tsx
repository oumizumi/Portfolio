'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
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
    <section id="home" className="min-h-[90vh] flex items-center relative">
      <SpaceShuttle3D />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="page-container-wide py-16 sm:py-24 w-full"
      >
        {/* Open to work badge */}
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
          <span className="text-accent font-medium" style={{ fontSize: '13px', letterSpacing: '0.04em' }}>
            open to new opportunities
          </span>
        </motion.div>

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
            {time} · Ottawa, ON
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

const STARS = [
  { x: -22, y: 18, d: 0 },
  { x: 118, y: 28, d: 0.12 },
  { x: -18, y: 52, d: 0.22 },
  { x: 112, y: 62, d: 0.08 },
  { x: 12,  y: -18, d: 0.32 },
  { x: 88,  y: -14, d: 0.18 },
  { x: -28, y: 78, d: 0.42 },
  { x: 122, y: 82, d: 0.28 },
  { x: 42,  y: -22, d: 0.05 },
  { x: 62,  y: -20, d: 0.38 },
  { x: -12, y: 38,  d: 0.48 },
  { x: 106, y: 45,  d: 0.15 },
];

function SpaceShuttle3D() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isBoosting, setIsBoosting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [40, -40]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-40, 40]), { stiffness: 100, damping: 20 });
  const shipX = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), { stiffness: 80, damping: 20 });
  const shipY = useSpring(useTransform(mouseY, [-1, 1], [-30, 30]), { stiffness: 80, damping: 20 });

  return (
    <div
      className="absolute top-[12%] right-[2%] lg:right-[15%] w-[90px] h-[90px] md:w-[130px] md:h-[130px] pointer-events-auto cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseDown={() => setIsBoosting(true)}
      onMouseUp={() => setIsBoosting(false)}
      onMouseLeave={() => setIsBoosting(false)}
      onTouchStart={() => setIsBoosting(true)}
      onTouchEnd={() => setIsBoosting(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: isBoosting ? 0.95 : 1,
          y: isBoosting ? [0, -3, 3, -3, 0] : [0, -15, 0],
        }}
        transition={{
          opacity: { duration: 1.5, delay: 0.2, ease: 'easeOut' },
          scale: { duration: 0.3 },
          y: {
            duration: isBoosting ? 0.12 : 5,
            repeat: Infinity,
            ease: isBoosting ? 'linear' : 'easeInOut',
          },
        }}
        style={{ rotateX, rotateY, x: shipX, y: shipY }}
        className="w-full h-full"
      >
        <motion.div style={{ rotateZ: 25 }} className="w-full h-full relative">

          {/* Single sketch SVG — all line work in one pass */}
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
            <defs>
              {/* Hand-drawn wobble filter */}
              <filter id="pencil" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency="0.058" numOctaves="4" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            <g filter="url(#pencil)" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round">

              {/* Wings — drawn first so body sits on top */}
              <path d="M40 46 L15 68 C13 70 14 75 18 75 L40 75"
                strokeWidth="1.3" fill="none" />
              <path d="M60 46 L85 68 C87 70 86 75 82 75 L60 75"
                strokeWidth="1.3" fill="none" />

              {/* Wing hatching for shadow/depth */}
              <path d="M39 53 L26 68" strokeWidth="0.4" strokeOpacity="0.45" />
              <path d="M37 59 L27 70" strokeWidth="0.35" strokeOpacity="0.35" />
              <path d="M35 65 L28 72" strokeWidth="0.3" strokeOpacity="0.28" />
              <path d="M61 53 L74 68" strokeWidth="0.4" strokeOpacity="0.45" />
              <path d="M63 59 L73 70" strokeWidth="0.35" strokeOpacity="0.35" />
              <path d="M65 65 L72 72" strokeWidth="0.3" strokeOpacity="0.28" />

              {/* Fuselage outline */}
              <path
                d="M50 7 C41 21 40 46 40 70 C40 73 43 75 46 75 L54 75 C57 75 60 73 60 70 C60 46 59 21 50 7 Z"
                strokeWidth="1.5" fill="none"
              />

              {/* Nose hatching */}
              <path d="M47 10 L45.5 17" strokeWidth="0.35" strokeOpacity="0.4" />
              <path d="M50 8 L48.5 15" strokeWidth="0.35" strokeOpacity="0.4" />
              <path d="M53 10 L54.5 17" strokeWidth="0.35" strokeOpacity="0.4" />

              {/* Panel seam lines */}
              <path d="M42 34 Q50 31.5 58 34" strokeWidth="0.5" strokeOpacity="0.5" />
              <path d="M41 49 Q50 46.5 59 49" strokeWidth="0.5" strokeOpacity="0.5" />
              <path d="M40 63 Q50 60.5 60 63" strokeWidth="0.45" strokeOpacity="0.4" />

              {/* Payload bay centre seam */}
              <path d="M50 22 L50 72" strokeWidth="0.3" strokeOpacity="0.3" strokeDasharray="2 2.5" />

              {/* Cockpit window */}
              <path d="M44.5 22 C47 18.5 53 18.5 55.5 22 L54.5 27.5 C52 30 48 30 45.5 27.5 Z"
                strokeWidth="1.1" stroke="#7dd3fc" strokeOpacity="0.8" fill="none" />
              {/* Small glint cross */}
              <path d="M46.5 22.5 L47.5 23.5" strokeWidth="0.6" stroke="#e0f2fe" strokeOpacity="0.7" />

              {/* RCS thrusters */}
              <rect x="41.5" y="31" width="3.5" height="1.4" rx="0.5" strokeWidth="0.7" />
              <rect x="55" y="31" width="3.5" height="1.4" rx="0.5" strokeWidth="0.7" />

              {/* Engine nozzles */}
              <ellipse cx="44.5" cy="77.5" rx="2.8" ry="1.8" strokeWidth="1.1" />
              <ellipse cx="55.5" cy="77.5" rx="2.8" ry="1.8" strokeWidth="1.1" />
              <ellipse cx="50" cy="80" rx="3.2" ry="2" strokeWidth="1.2" />

              {/* Tail fin */}
              <path d="M50 47 L47.5 73 L50 71 L52.5 73 Z" strokeWidth="1.1" />

              {/* NASA meatball on right wing */}
              <g transform="translate(71, 65) scale(0.065) rotate(-30)">
                <circle cx="0" cy="0" r="50" fill="#0b3d91" />
                <ellipse cx="0" cy="0" rx="55" ry="15" fill="none" stroke="#ffffff" strokeWidth="5" transform="rotate(30)" />
                <path d="M-40,20 Q0,-60 60,-20 Q10,-10 -50,40 Z" fill="#fc3d21" />
                <text x="0" y="10" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32" textAnchor="middle">NASA</text>
              </g>

            </g>
          </svg>

          {/* Flame strokes — outside the pencil filter so they stay crisp */}
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 overflow-visible" fill="none">
            <motion.path
              d="M47 81 Q48.5 89 50 97 Q51.5 89 53 81"
              stroke={isBoosting ? '#93c5fd' : '#fb923c'}
              strokeWidth={isBoosting ? '1.6' : '1.1'}
              strokeLinecap="round"
              animate={{ pathLength: [0.55, 1, 0.65, 1, 0.55], opacity: [0.35, 0.85, 0.45, 0.8, 0.35] }}
              transition={{ duration: isBoosting ? 0.18 : 0.65, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M42 79 Q43 85 44.5 79"
              stroke={isBoosting ? '#bfdbfe' : '#fdba74'}
              strokeWidth="0.9"
              strokeLinecap="round"
              animate={{ pathLength: [0.4, 1, 0.4], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: isBoosting ? 0.13 : 0.5, repeat: Infinity, delay: 0.1, ease: 'easeInOut' }}
            />
            <motion.path
              d="M55.5 79 Q57 85 58 79"
              stroke={isBoosting ? '#bfdbfe' : '#fdba74'}
              strokeWidth="0.9"
              strokeLinecap="round"
              animate={{ pathLength: [0.4, 1, 0.4], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: isBoosting ? 0.16 : 0.6, repeat: Infinity, delay: 0.2, ease: 'easeInOut' }}
            />
          </svg>

          {/* Star field — twinkling dots at idle, streaking when boosting */}
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 overflow-visible" fill="none">
            {STARS.map((star, i) => (
              <motion.g
                key={i}
                animate={{
                  y: isBoosting ? [0, 30] : [0, 0],
                  opacity: isBoosting ? [0.85, 0] : [0.12, 0.4, 0.12],
                }}
                transition={{
                  duration: isBoosting ? 0.32 : 2.2 + star.d * 1.5,
                  repeat: Infinity,
                  delay: star.d,
                  ease: isBoosting ? 'linear' : 'easeInOut',
                }}
              >
                <motion.line
                  x1={star.x} y1={star.y}
                  x2={star.x} y2={star.y - 12}
                  stroke="#e2e8f0"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  animate={{ opacity: isBoosting ? 0.7 : 0 }}
                  transition={{ duration: 0.1 }}
                />
                <circle cx={star.x} cy={star.y} r="0.55" fill="#e2e8f0" />
              </motion.g>
            ))}
          </svg>

{/* Speed-sketch lines when boosting */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full absolute inset-0 overflow-visible hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: isBoosting ? 0.45 : 0 }}
          >
            <motion.line x1="14" y1="15" x2="14" y2="85" stroke="#94a3b8" strokeWidth="0.45" strokeLinecap="round"
              animate={{ y: isBoosting ? [0, 100] : 0 }} transition={{ repeat: Infinity, duration: 0.15, ease: 'linear' }} />
            <motion.line x1="86" y1="5" x2="86" y2="95" stroke="#94a3b8" strokeWidth="0.45" strokeLinecap="round"
              animate={{ y: isBoosting ? [-20, 80] : 0 }} transition={{ repeat: Infinity, duration: 0.25, ease: 'linear' }} />
            <motion.line x1="28" y1="-5" x2="28" y2="65" stroke="#94a3b8" strokeWidth="0.3" strokeLinecap="round"
              animate={{ y: isBoosting ? [-50, 100] : 0 }} transition={{ repeat: Infinity, duration: 0.1, ease: 'linear' }} />
          </motion.svg>

        </motion.div>
      </motion.div>
    </div>
  );
}
