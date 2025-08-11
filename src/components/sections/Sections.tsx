'use client';

import { motion } from 'framer-motion';
import FeatureCard from '@/components/cards/FeatureCard';
import ModuleCard from '@/components/cards/ModuleCard';
import { features } from '@/data/features';
import { modules } from '@/data/modules';
import { fadeUp, staggerContainer } from '@/lib/anim';

export function FeaturesSection() {
  return (
    <>
      <section id="features" className="min-h-screen snap-start flex items-center py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto px-4"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extralight tracking-tight">
            What I’ve Worked On
          </motion.h2>
        </motion.div>
      </section>

      {features.map((f, i) => (
        <section key={f.title} className="min-h-screen snap-start flex items-center py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 w-full">
            <FeatureCard feature={f} index={i} />
          </div>
        </section>
      ))}
    </>
  );
}

export function ModulesSection() {
  return (
    <>
      {modules.map((m, i) => (
        <section key={m.slug} className="min-h-screen snap-start flex items-center py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 w-full">
            <ModuleCard mod={m} index={i} />
          </div>
        </section>
      ))}
    </>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen snap-start flex items-center py-12 md:py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-20 max-w-3xl mx-auto px-6 w-full"
      >
        <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-extralight tracking-tight mb-6">
          A little bit about me
        </motion.h3>
        <motion.p variants={fadeUp} className="text-lg text-gray-700 dark:text-white/80 leading-relaxed">
          I’m a second-year Computer Science student at uOttawa. I enjoy building projects from scratch, figuring things out along the way, and getting a little better with each one. When I’m not coding, I’m usually watching football, spending time with friends and family, or out in nature.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-white/40"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 rounded-xl p-6 border border-gray-300 dark:border-gray-800/40 bg-white/40 dark:bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/30 text-gray-700 dark:text-white/70">
          <div className="text-sm text-gray-600 dark:text-white/60 mb-2">Tech</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Django</li>
            <li>Postgres</li>
            <li>OpenAI</li>
            <li>Vercel</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

