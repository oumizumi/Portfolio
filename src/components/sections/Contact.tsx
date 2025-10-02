'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/ui/Icons';
import { fadeUp, staggerContainer } from '@/lib/anim';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
      honeypot: String(formData.get('company') || ''),
    };

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    }
  }

  return (
    <section id="contact" className="py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10"
      >
        <div className="space-y-4">
          <motion.h3 variants={fadeUp} className="text-3xl font-light tracking-tight">Get in touch</motion.h3>
          <motion.p variants={fadeUp} className="text-gray-700 dark:text-white/70 max-w-prose">
            I&apos;m always open to hearing about new projects and opportunities. Whether you have a question or just want to say hello, I&apos;ll get back to you as soon as possible.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col items-start gap-3 text-gray-700 dark:text-white/70">
            <a
              href="mailto:oghar074@uottawa.ca"
              aria-label="Email"
              className="inline-flex items-center gap-2 hover:opacity-90"
            >
              <MailIcon className="w-5 h-5" />
              <span>oghar074@uottawa.ca</span>
            </a>
            <div className="inline-flex items-center gap-2" aria-label="Location: Ottawa, ON">
              <Image src="/globe.svg" alt="Location" width={20} height={20} />
              <span>Ottawa, ON</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="pt-2 flex items-center gap-4 text-gray-600 dark:text-white/70">
            <a
              href="https://github.com/oumizumi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/oumer-g-3a92a32b8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        <motion.form
          variants={fadeUp}
          className="space-y-4"
          onSubmit={onSubmit}
        >
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" className="bg-transparent border border-gray-300 dark:border-gray-800/50 rounded-lg px-3 py-2" placeholder="Your name" aria-label="Name" required />
            <input name="email" type="email" className="bg-transparent border border-gray-300 dark:border-gray-800/50 rounded-lg px-3 py-2" placeholder="your@email.com" aria-label="Email" required />
          </div>
          <textarea name="message" className="bg-transparent border border-gray-300 dark:border-gray-800/50 rounded-lg px-3 py-2 w-full min-h-32" placeholder="Your message" aria-label="Message" required />
          <div className="flex items-center gap-3">
            <button disabled={status === 'sending'} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-medium">
              {status === 'sending' ? 'Sending…' : 'Submit'}
            </button>
            {status === 'success' && <span className="text-green-600 dark:text-green-400">Message sent!</span>}
            {status === 'error' && <span className="text-red-600 dark:text-red-400">{error || 'Failed to send.Please try again later'}</span>}
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}

