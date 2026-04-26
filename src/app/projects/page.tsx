import PageLayout from '@/components/layout/PageLayout';
import { projects } from '@/data/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | oumizumi',
  description: 'Things I have built.',
};

export default function ProjectsPage() {
  return (
    <PageLayout>
      <div className="page-container">

        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>projects</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-warm-white tracking-tight mb-4">
            things I&apos;ve built.
          </h1>
          <p className="text-warm-white/75 font-light" style={{ fontSize: '17px', lineHeight: 1.85 }}>
            A selection of projects I&apos;ve worked on.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-0">
          {projects.map((project) => (
            <div key={project.name} className="py-8 border-b border-subtle">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-warm-white font-normal" style={{ fontSize: '18px' }}>
                      {project.name}
                    </h2>
                    <span className="text-warm-white/35 font-light" style={{ fontSize: '13px' }}>
                      {project.year}
                    </span>
                  </div>
                  <p className="text-warm-white/65 font-light" style={{ fontSize: '15px', lineHeight: 1.8 }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-accent/70 border border-accent/25 rounded-full px-2.5 py-0.5 font-light"
                        style={{ fontSize: '12px' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.github || project.url) && (
                  <div className="flex items-center gap-3 flex-shrink-0 sm:pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-warm-white/45 hover:text-warm-white transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                      </a>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live site"
                        className="text-warm-white/45 hover:text-warm-white transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
