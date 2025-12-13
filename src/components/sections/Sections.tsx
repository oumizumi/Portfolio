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
            What I&apos;ve Worked On
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
          A Bit About Me
        </motion.h3>
        <motion.p variants={fadeUp} className="text-lg text-gray-700 dark:text-white/80 leading-relaxed">
          i enjoy creating software thats clean, reliable, and easy to use. i usually spend my free time watching football/soccer, spending with with my family and friends, or out in nature.
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
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tech Stack</h4>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Python</li>
            <li>Java</li>
            <li>C++</li>  
            <li>NumPy</li>
            <li>Tensorflow</li>
            <li>Scikit-learn</li>
            <li>React</li>
            <li>Django</li>
            <li>Node.js</li>
            <li>Tailwind CSS</li>
            <li>PostgreSQL</li>
            <li>Puppeteer</li>
            <li>Playwright</li>
            <li>REST API</li>
            <li>GraphQL</li>
            <li>Git</li>
            <li>Docker</li>
            <li>AWS</li>
            <li>MongoDB</li>
            <li>Vercel</li>
            <li>Supabase</li>
            <li>Docker</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

