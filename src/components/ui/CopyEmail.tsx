'use client';

import { useState } from 'react';

const EMAIL = 'ofgharad@gmail.com';

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href={`mailto:${EMAIL}`}
        className="flex items-center gap-3 text-warm-white hover:text-accent transition-colors group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm-white/60 group-hover:text-accent transition-colors flex-shrink-0">
          <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
        </svg>
        {EMAIL}
      </a>
      <button
        onClick={copy}
        aria-label="Copy email address"
        className="text-warm-white/35 hover:text-accent transition-colors"
        title="Copy email"
      >
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
