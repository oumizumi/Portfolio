'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Module } from '@/data/modules';
import { ExternalIcon, GitHubIcon } from './Icons';
import { fadeUp } from './anim';
import CountUp from './CountUp';

export default function ModuleCard({ mod, index }: { mod: Module; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group border border-gray-300 dark:border-gray-800/40 rounded-xl overflow-hidden bg-white/40 dark:bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/30"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={mod.image}
          alt={mod.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={index < 2}
        />
      </div>
      <div className="p-6 space-y-3">
        <div className="text-sm text-gray-600 dark:text-white/60">{mod.tagline}</div>
        <h3 className="text-2xl font-light tracking-tight text-gray-900 dark:text-white">{mod.title}</h3>
        <p className="text-gray-700 dark:text-white/70">{mod.description}</p>
        {mod.metrics?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mod.metrics.map((m) => (
              <div key={m.label} className="rounded-lg p-3 border border-gray-300 dark:border-gray-800/40">
                <div className="text-sm text-gray-600 dark:text-white/60">{m.label}</div>
                <div className="text-lg text-gray-900 dark:text-white"><CountUp value={m.value} /></div>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {mod.tech.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-800/40 text-gray-700 dark:text-white/80">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          {mod.codeUrl && (
            <a href={mod.codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-900 dark:text-white/85 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-white/40 rounded-md px-2 py-1">
              <GitHubIcon />
              <span>Code</span>
            </a>
          )}
          {mod.liveUrl && (
            <a href={mod.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-white/40">
              <ExternalIcon />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

