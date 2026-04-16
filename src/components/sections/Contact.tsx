'use client';

import { useState } from 'react';

export default function ContactForm() {
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
    <form className="space-y-4 max-w-lg" onSubmit={onSubmit}>
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          required
          placeholder="Your name"
          aria-label="Name"
          className="bg-surface border border-subtle rounded-lg px-4 py-2.5 text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-accent/50 transition-colors"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          aria-label="Email"
          className="bg-surface border border-subtle rounded-lg px-4 py-2.5 text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="Your message"
        aria-label="Message"
        className="bg-surface border border-subtle rounded-lg px-4 py-2.5 text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-accent/50 transition-colors w-full min-h-32 resize-none"
      />
      <div className="flex items-center gap-4">
        <button
          disabled={status === 'sending'}
          className="px-5 py-2.5 bg-accent text-fg rounded text-sm font-medium hover:opacity-75 disabled:opacity-50 transition-opacity"
        >
          {status === 'sending' ? 'sending…' : 'send message'}
        </button>
        {status === 'success' && (
          <span className="text-sm text-green-600 dark:text-green-400">message sent!</span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-600 dark:text-red-400">{error || 'failed to send. try again.'}</span>
        )}
      </div>
    </form>
  );
}
