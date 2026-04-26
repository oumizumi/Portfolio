'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About' },
  { href: '/projects',     label: 'Projects' },
  { href: '/experiences',  label: 'Experience' },
  { href: '/blog',         label: 'Blog' },
  { href: '/contact',      label: 'Contact' },
];

export default function Footer() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(!document.documentElement.classList.contains('light'));
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('light', next === 'light');
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    setIsDark(next === 'dark');
  }

  const bg     = isDark ? '#000000' : '#F6F6F6';
  const text   = isDark ? '#F6F6F6' : '#000000';
  const muted  = isDark ? 'rgba(246,246,246,0.60)' : 'rgba(0,0,0,0.60)';
  const divider = isDark ? 'rgba(246,246,246,0.08)' : 'rgba(0,0,0,0.08)';
  const accent = '#A8C5DA';

  return (
    <footer style={{ background: bg, color: text, marginTop: '6rem', borderTop: `1px solid ${divider}` }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 0' }}>
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-start">

          {/* Left: Navigation */}
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: 600, marginBottom: '1.5rem', marginTop: 0 }}>
              Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative font-light text-warm-white/60 hover:text-warm-white transition-colors duration-200 w-fit
                    after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-full after:rounded-full
                    after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                    hover:after:scale-x-100"
                  style={{ fontSize: '14px', textDecoration: 'none' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Social icons */}
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: 600, marginBottom: '1.5rem', marginTop: 0 }}>
              Contact
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

              <a href="https://github.com/oumizumi" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                style={{ color: muted, transition: 'color 0.2s', lineHeight: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = text)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/oumzumi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                style={{ color: muted, transition: 'color 0.2s', lineHeight: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = text)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X"
                style={{ color: muted, transition: 'color 0.2s', lineHeight: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = text)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a href="mailto:ofgharad@gmail.com" aria-label="Email"
                style={{ color: muted, transition: 'color 0.2s', lineHeight: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = text)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '1100px', margin: '2.5rem auto 0' }}>
        <div style={{ padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '12px', color: muted, letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} Oumer Gharad. All rights reserved.
          </span>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: muted, padding: '4px', lineHeight: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = text)}
            onMouseLeave={e => (e.currentTarget.style.color = muted)}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

    </footer>
  );
}
