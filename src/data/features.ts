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
      'An AI‑powered platform for uOttawa students to automate schedule planning, get real‑time course and professor insights, and ask natural‑language questions about programs and prerequisites.',
    image: '/kairo-schedule.svg',
    metrics: [
      { label: 'courses indexed', value: '10,000+' },
      { label: 'subjects', value: '161+' },
    ],
    tech: ['Next.js', 'Django', 'OpenAI', 'Postgres'],
    ctaUrl: 'https://kairo.ai/try',
    tags: ['assistant'],
    bullets: [
      'Real‑time university data at scale with resilient web scraping (dynamic selectors, iframe handling, rate limiting, deduplication)',
      'Production‑grade system: multi‑service architecture, automated pipelines, type‑safe full‑stack, responsive animated UI'
    ],
  },
  {
    order: 2,
    title: 'Professor Insights',
    description: 'Summaries from syllabi, ratings, and historical outcomes to help select the right instructor.',
    image: '/kairo-professors.svg',
    metrics: [
      { label: 'professors', value: '1,200+' },
      { label: 'documents parsed', value: '30k+' },
    ],
    tech: ['Next.js', 'Python', 'Embeddings'],
    tags: ['insights'],
  },
  {
    order: 3,
    title: 'Your Scrapers Overview',
    description: 'Headless scrapers that collect uOttawa course data across terms and expose structured, real‑time availability.',
    image: '/scraper.svg',
    metrics: [
      { label: 'total courses', value: '10,608' },
      { label: 'subjects', value: '161' },
      { label: 'terms', value: 'F25, W26, S/S25' },
    ],
    tech: ['Puppeteer', 'Playwright', 'TypeScript', 'Express.js'],
    tags: ['scrapers'],
  }
];

