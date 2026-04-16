import PageLayout from '@/components/layout/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience · oumizumi',
  description: 'Work experience and projects by Oumer Gharad.',
};

const experience = [
  {
    role: 'Software Developer',
    company: 'Kelpie Robotics',
    org: 'University of Ottawa',
    location: 'Ottawa, ON',
    period: 'Sep 2025 – Present',
    bullets: [
      'Automated detection of 5 underwater object classes via YOLOv8 + COLMAP, processing 200 filtered frames per run',
      'Achieved ±1 cm accuracy in 300s via GPU-accelerated COLMAP SfM/MVS with O(n) sequential feature matching',
      'Containerized the full vision stack with Docker to ensure consistent deployment across heterogeneous hardware',
      'Implemented TCP-based sensor data streaming with timeout and recovery handling to ensure reliable flow',
    ],
  },
  {
    role: 'Machine Learning Research Assistant',
    company: 'Mer Lab, University of Ottawa',
    org: 'Supervised by Prof. Arvind Mer',
    location: 'Ottawa, ON',
    period: 'Feb 2026 – Present',
    bullets: [
      'Achieved 0.75 ROC-AUC on a 207-patient cohort by training a Python RandomForest on TCGA ovarian cancer expression matrices',
      'Applied SHAP TreeExplainer to identify the top 20 survival-driving genes for clinical review',
      'Validated generalizability across TCGA (n=207) and GSE102073 (n=84) via Kaplan-Meier OS with log-rank testing',
      'Reduced input dimensionality by 97% (48,167 to 1,565 genes) via expression thresholding and z-score normalization',
      'Contributing to a manuscript on genomic survival prediction in ovarian cancer for journal submission',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'The Acquist',
    org: null,
    location: 'Remote',
    period: 'Jan 2026 – Present',
    bullets: [
      'Architected a React Native + TypeScript monorepo with shared API and type packages for a talent marketplace',
      'Implemented Supabase OAuth with protected routing, session persistence, and onboarding gates for user activation',
      'Designed a PostgreSQL schema with full-text search, RLS policies, and cursor-based pagination across 11 API modules, reducing load times by 35%',
    ],
  },
  {
    role: 'Mobile Health Developer (Volunteer)',
    company: "L'Abbraccio ODV",
    org: 'University of Ottawa',
    location: 'Remote',
    period: 'Apr 2026 – Present',
    bullets: [
      "Restored a React Native maternal health app for rural Benin by resolving RLS across 14 tables and building a real-time labor monitoring dashboard",
    ],
  },
];

const projects = [
  {
    name: 'NestFinder',
    label: '2nd Place, uOttaHack (YellowCake)',
    tech: 'Next.js 15, TypeScript, FastAPI, Python',
    github: 'https://github.com/Homeless-Gonnabe-5-0/Nestfinder',
    website: 'https://nest-cyan-seven.vercel.app',
    bullets: [
      'Built a rental platform on Solace Agent Mesh to orchestrate intelligent multi-agent AI listing workflows',
      'Scraped live rental listings across multiple platforms using YellowCake to power real-time data ingestion',
      'Ranked Ottawa listings by livability and safety metrics, placing 2nd out of 70+ teams at uOttaHack',
    ],
  },
  {
    name: 'Kairo – AI University Scheduler',
    label: null,
    tech: 'Python, TypeScript, Django, PostgreSQL, Docker, Redis',
    github: 'https://github.com/oumizumi/kairo',
    website: 'https://kairo-gilt.vercel.app',
    bullets: [
      'Reached 20+ active users by scraping 10,000+ classes across 140 subjects with 100% data integrity',
      'Architected a Django schedule generator with concurrency handling to eliminate all student registration conflicts',
      'Containerized services with Docker and added Redis caching to improve API throughput by 40%',
      'Automated CI/CD via GitHub Actions with health-check retries to achieve zero-downtime production deploys',
    ],
  },
];

export default function ExperiencesPage() {
  return (
    <PageLayout>
      <div className="page-container">

        {/* Header */}
        <div className="mb-16">
          <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>portfolio</p>
          <h1 className="text-4xl md:text-5xl font-light text-warm-white tracking-tight">
            experience &amp; projects.
          </h1>
        </div>

        {/* ── Experience ───────────────────────── */}
        <section className="mb-16">
          <h2 className="text-warm-white/55 font-light tracking-widest uppercase mb-8" style={{ fontSize: '11px' }}>
            experience
          </h2>
          <div className="space-y-12">
            {experience.map((job) => (
              <article key={job.role}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 mb-1">
                  <h3 className="text-warm-white font-semibold" style={{ fontSize: '20px' }}>
                    {job.role}
                  </h3>
                  <span className="text-warm-white/40 font-normal shrink-0" style={{ fontSize: '14px' }}>
                    {job.period}
                  </span>
                </div>
                <p className="text-warm-white/60 font-normal mb-4" style={{ fontSize: '15px' }}>
                  {job.company}{job.org ? ` | ${job.org}` : ''} · {job.location}
                </p>
                <ul className="space-y-2.5">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0 mt-[8px]" />
                      <span className="text-warm-white/80 font-normal" style={{ fontSize: '16px', lineHeight: 1.75 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Projects ─────────────────────────── */}
        <section>
          <h2 className="text-warm-white/55 font-light tracking-widest uppercase mb-8" style={{ fontSize: '11px' }}>
            projects
          </h2>
          <div className="space-y-12">
            {projects.map((p) => (
              <article key={p.name}>
                {/* Title row */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-warm-white font-semibold" style={{ fontSize: '20px' }}>
                      {p.name}
                    </h3>
                    {p.label && (
                      <span className="text-accent/80 font-normal" style={{ fontSize: '14px' }}>
                        {p.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-5">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="text-warm-white font-semibold hover:text-accent hover:underline underline-offset-4 transition-colors"
                        style={{ fontSize: '15px' }}>
                        github
                      </a>
                    )}
                    {p.website && p.website !== p.github && (
                      <a href={p.website} target="_blank" rel="noopener noreferrer"
                        className="text-warm-white font-semibold hover:text-accent hover:underline underline-offset-4 transition-colors"
                        style={{ fontSize: '15px' }}>
                        website
                      </a>
                    )}
                  </div>
                </div>
                {/* Tech stack */}
                <p className="text-warm-white/55 font-normal mb-4" style={{ fontSize: '14px' }}>
                  {p.tech}
                </p>
                <ul className="space-y-2.5">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0 mt-[8px]" />
                      <span className="text-warm-white/80 font-normal" style={{ fontSize: '16px', lineHeight: 1.75 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
