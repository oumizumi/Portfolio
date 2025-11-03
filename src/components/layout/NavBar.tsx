'use client';

import { motion } from 'framer-motion';

const links = [
  { href: '/latest.pdf', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-30"
    >
      <ul className="flex gap-5 text-sm text-gray-700 dark:text-white/80">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.label === 'Resume' ? 'latest.pdf' : undefined}
              className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-white/40 rounded"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
