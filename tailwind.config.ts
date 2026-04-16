import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        base:         'rgb(var(--color-base)        / <alpha-value>)',
        surface:      'rgb(var(--color-surface)     / <alpha-value>)',
        subtle:       'rgb(var(--color-subtle)      / <alpha-value>)',
        'warm-white': 'rgb(var(--color-warm-white)  / <alpha-value>)',
        muted:        'rgb(var(--color-muted)        / <alpha-value>)',
        accent:       'rgb(var(--color-accent)       / <alpha-value>)',
        highlight:    'rgb(var(--color-highlight)    / <alpha-value>)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
