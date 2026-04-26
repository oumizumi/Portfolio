import PageLayout from '@/components/layout/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now · Oumer Gharad',
  description: 'What I am currently focused on.',
};

const lastUpdated = 'April 2026';

const now = [
  {
    heading: 'Working on',
    items: [
      'Underwater object detection pipeline at Kelpie Robotics, YOLOv8 + COLMAP vision stack',
      'Genomic survival prediction research at Mer Lab, Python RandomForest on TCGA ovarian cancer data',
      'React Native talent marketplace at The Acquist, Supabase auth + PostgreSQL schema design',
      'React Native maternal health app restoration for rural Benin (volunteer, L\'Abbraccio ODV)',
    ],
  },
  {
    heading: 'Learning',
    items: [
      'Operating systems internals, working through the xv6 labs',
      'Linear algebra more seriously, 3Blue1Brown → Gilbert Strang',
      'Getting deeper into distributed systems concepts',
    ],
  },
  {
    heading: 'Reading',
    items: [
      'The Making of the Atomic Bomb by Richard Rhodes',
      'Surely You\'re Joking, Mr. Feynman by Richard Feynman',
    ],
  },
  {
    heading: 'Thinking about',
    items: [
      'Writing up the Challenger disaster post, the organisational failure angle is more interesting than the engineering one',
      'How to build systems that stay reliable under real-world conditions, not just benchmarks',
    ],
  },
];

export default function NowPage() {
  return (
    <PageLayout>
      <div className="page-container">

        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>now</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-warm-white tracking-tight mb-4">
            what I&apos;m doing now.
          </h1>
          <p className="text-warm-white/50 font-light" style={{ fontSize: '14px' }}>
            Last updated {lastUpdated} · inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-accent/80 hover:text-accent transition-colors underline underline-offset-2">nownownow.com</a>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {now.map((section) => (
            <section key={section.heading}>
              <h2 className="text-warm-white/55 font-light tracking-widest uppercase mb-5" style={{ fontSize: '11px' }}>
                {section.heading}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0 mt-[9px]" />
                    <span className="text-warm-white/80 font-normal" style={{ fontSize: '16px', lineHeight: 1.75 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
