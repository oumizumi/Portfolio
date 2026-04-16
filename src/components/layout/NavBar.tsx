'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const links = [
  { href: '/',         label: 'home' },
  { href: '/about',    label: 'about' },
  { href: '/people',   label: 'people' },
  { href: '/experiences', label: 'experiences' },
  { href: '/blog',     label: 'blog' },
  { href: '/contact',  label: 'contact' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-subtle bg-base/90 backdrop-blur-md"
    >
      <div className="page-container-wide py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium text-warm-white tracking-widest uppercase hover:text-accent transition-colors duration-200"
        >
          oumizumi
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((l) => {
            const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-base tracking-wide transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:rounded-full after:transition-transform after:duration-300 after:origin-left after:w-full ${
                  isActive
                    ? 'text-warm-white after:bg-accent after:scale-x-100'
                    : 'text-warm-white/65 hover:text-warm-white after:bg-accent after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: mobile menu */}
        <div className="flex items-center gap-3">

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-warm-white/60 hover:text-warm-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-subtle bg-base"
        >
          <nav className="page-container-wide py-5 flex flex-col gap-4" aria-label="Mobile navigation">
            {links.map((l) => {
              const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base tracking-wide transition-colors ${
                    isActive ? 'text-warm-white' : 'text-warm-white/65 hover:text-warm-white'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
