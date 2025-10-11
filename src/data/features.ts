export type Metric = { label: string; value: string };

export type Feature = {
  order: number;
  title: string;
  description: string;
  image: string; // /public path
  metrics?: Metric[];
  tech: string[];
  ctaUrl?: string; // Try It
  tags?: string[];
  bullets?: string[];
};

export const features: Feature[] = [
  {
    order: 1,
    title: 'Kairo — AI University Assistant',
    description:
      'An AI-powered platform for uOttawa students to automate schedule planning, get real-time course and professor insights, and ask natural-language questions about programs and prerequisites.',
    image: '/kairo-schedule.svg',
    metrics: [
      { label: 'live courses indexed', value: '10,000+' },
      { label: 'subjects', value: '160+' },
    ],
    tech: ['Python', 'Django', 'PostgreSQL', 'Typescript'],
    ctaUrl: 'https://kairo-gilt.vercel.app',
    tags: ['assistant'],
    bullets: [
      'Real-time university data at scale with resilient web scraping (dynamic selectors, iframe handling, rate limiting, deduplication)',
      'Production-grade system: multi-service architecture, automated pipelines, type-safe full-stack, responsive animated UI'
    ],
  },
  {
    order: 2,
    title: 'Professor Insights',
    description: 'Summaries of professor ratings, and historical outcomes to help select the right instructor.',
    image: '/kairo-professors.svg',
    metrics: [
      { label: 'professors', value: '1,200+' },
      { label: 'documents parsed', value: '30k+' },
    ],
    tech: ['Typescript', 'Python', 'Node.js',],
    tags: ['insights'],
  },
  {
    order: 3,
    title: 'Your Scrapers Overview',
    description: 'Multiple Headless scrapers that collect uOttawa course data across terms and expose structured, real-time availability.',
    image: '/scraper.svg',
    metrics: [
      { label: 'total courses', value: '15k+' },
      { label: 'subjects', value: '160+' },
      { label: 'prorgrams', value: '200+' },
      { label: 'terms', value: 'F25, W26, S/S25' },
    ],
    tech: ['Puppeteer', 'Playwright', 'TypeScript', 'Express.js'],
    tags: ['scrapers'],
  },
  {
    order: 4,
    title: 'LeetHub',
    description: 'A Chrome extension that automatically synchronizes accepted LeetCode solutions to GitHub, enabling me to maintain a well-organized portfolio of their coding practice with real-time detection, smart organization, and zero-friction backup.',
    image: '/leethub-demo.svg',
    metrics: [
      { label: 'Auto-sync time', value: '<2s' },
      { label: 'Core Modules', value: '6' },
      { label: 'Success Rate', value: '99%+' },
    ],
    tech: ['JavaScript', 'Chrome API', 'GitHub API', 'Manifest V3', 'REST API'],
    ctaUrl: 'https://github.com/oumizumi/leethub',
    bullets: [
      'Real-time detection of accepted solutions with automatic GitHub push within 2 seconds',
      'Modular architecture: service workers, content scripts, GitHub API integration with retry logic and error handling'
    ],
  }
];

