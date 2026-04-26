import PageLayout from '@/components/layout/PageLayout';
import { quoteGroups } from '@/data/quotes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quotes | oumizumi',
  description: 'A curated collection of quotes I keep coming back to.',
};

export default function QuotesPage() {
  return (
    <PageLayout>
        <div className="page-container">
          {/* Header */}
          <div className="mb-10 sm:mb-16">
            <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>quotes</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-warm-white tracking-tight mb-4">
              words worth keeping.
            </h1>
            <p className="text-warm-white/75 font-light" style={{ fontSize: '17px', lineHeight: 1.85 }}>
              Things I&apos;ve read or heard that stuck with me. Grouped loosely by theme.
            </p>
          </div>

          {/* Quote groups */}
          <div className="space-y-16">
            {quoteGroups.map((group) => (
              <section key={group.theme}>
                <h2 className="text-warm-white/55 font-light tracking-widest uppercase mb-8 pb-2 border-b border-subtle" style={{ fontSize: '11px' }}>
                  {group.theme}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {group.quotes.map((q, i) => (
                    <blockquote
                      key={i}
                      className="border border-subtle rounded-xl p-6 bg-surface space-y-3 hover:border-accent/40 transition-colors"
                    >
                      <p className="text-warm-white/80 font-light" style={{ fontSize: '15px', lineHeight: 1.8 }}>
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <footer className="flex flex-col gap-0.5">
                        <span className="text-accent/80 font-light" style={{ fontSize: '13px' }}>{q.author}</span>
                        {q.source && (
                          <span className="text-warm-white/55 font-light italic" style={{ fontSize: '12px' }}>{q.source}</span>
                        )}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
    </PageLayout>
  );
}
