'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MacDots from '@/components/ui/MacDots';
import type { Feature } from '@/data/features';
import { fadeUp } from '@/lib/anim';
import CountUp from '@/components/ui/CountUp';
import ScraperDiagram from '@/components/ui/ScraperDiagram';
import LeetHubDiagram from '@/components/ui/LeetHubDiagram';

export default function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const isScraperFeature = index === 1 || feature.image.includes('scraper.svg');
  const isLeetHubFeature = index === 2 || feature.image.includes('leethub');
  const isPLFeature = feature.image.includes('PL_logo');

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group border border-gray-300 dark:border-gray-800/40 rounded-xl overflow-hidden bg-white/40 dark:bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/30"
    >
      <div className="relative">
        <MacDots />
        <div className={`relative aspect-[16/9] ${isScraperFeature || isLeetHubFeature ? 'bg-white dark:bg-transparent' : ''} ${isPLFeature ? 'bg-white dark:bg-white' : ''}`}>
          {isScraperFeature ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 mt-8">
              <ScraperDiagram />
            </div>
          ) : isLeetHubFeature ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 mt-8">
              <LeetHubDiagram />
            </div>
          ) : (
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className={`${isPLFeature ? 'object-contain p-12' : 'object-cover object-center'} mt-8 transition-transform duration-500 group-hover:scale-[1.03]`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={index < 2}
            />
          )}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <motion.div variants={fadeUp} className="text-6xl md:text-8xl font-extralight text-gray-200 dark:text-white/10 select-none">
          {String(feature.order).padStart(2, '0')}
        </motion.div>
        <div className="space-y-1">
          <motion.h3 variants={fadeUp} className="text-2xl font-light tracking-tight text-gray-900 dark:text-white">{feature.title}</motion.h3>
          <motion.p variants={fadeUp} className="text-gray-700 dark:text-white/70">{feature.description}</motion.p>
        </div>
        {feature.bullets?.length ? (
          <motion.ul variants={fadeUp} className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-white/70">
            {feature.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </motion.ul>
        ) : null}
        {feature.metrics?.length ? (
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {feature.metrics.map((m) => (
              <div key={m.label} className="rounded-lg p-3 border border-gray-300 dark:border-gray-800/40">
                <div className="text-sm text-gray-600 dark:text-white/60">{m.label}</div>
                <div className="text-lg text-gray-900 dark:text-white">
                  <CountUp value={m.value} />
                </div>
              </div>
            ))}
          </motion.div>
        ) : null}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {feature.tech.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-800/40 text-gray-700 dark:text-white/80">
              {t}
            </span>
          ))}
        </motion.div>
        {feature.ctaUrl && (
          <motion.div variants={fadeUp}>
            <a
              href={feature.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-white/40"
            >
              Try It
            </a>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}

