'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('theme')) as 'dark' | 'light' | null;
    const initial: 'dark' | 'light' = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(initial);
    setTheme(initial);
  }, []);

  function toggleTheme() {
    const next: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(next);
    localStorage.setItem('theme', next);
    setTheme(next);
  }

  const isDark = theme === 'dark';

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800/40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-sm">
        <div className="text-gray-600 dark:text-white/60">© Oumer Gharad</div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={isDark}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {isDark ? (
            // Moon for dark mode
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="opacity-90 text-gray-300"><path fill="currentColor" d="M21.64 13a1 1 0 0 0-1.05-.14A8 8 0 0 1 11.1 3.41a1 1 0 0 0-1.19-1.3A10 10 0 1 0 22 14a1 1 0 0 0-.36-1Z"/></svg>
          ) : (
            // Sun for light mode
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="opacity-90 text-amber-500"><path fill="currentColor" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm13.66 6.66a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.05 6.05a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 1 1 6.34 3.93l.71.71a1 1 0 0 1 0 1.41Zm11.31-1.41a1 1 0 0 1 0 1.41l-.71.71A1 1 0 1 1 16.24 5l.71-.71a1 1 0 0 1 1.41 0ZM6.34 17.66a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41Z"/></svg>
          )}
          <span className="sr-only">Toggle theme</span>
          <span>{isDark ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </footer>
  );
}