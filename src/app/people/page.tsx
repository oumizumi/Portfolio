import PageLayout from '@/components/layout/PageLayout';
import { people } from '@/data/people';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People — oumizumi',
  description: 'The giants I wish to emulate.',
};

const categoryOrder = ['History', 'Science & Technology', 'Mathematics', 'Philosophy'] as const;

export default function PeoplePage() {
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      items: people.filter((p) => p.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <PageLayout>
      <div className="page-container">

        {/* Header */}
        <div className="mb-16">
          <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>people</p>
          <h1 className="text-4xl md:text-5xl font-light text-warm-white tracking-tight mb-4">
            people who changed the game
          </h1>
          <p className="text-warm-white/75 font-light" style={{ fontSize: '17px', lineHeight: 1.85 }}>
            Individuals whose lives, work, and character I keep coming back to.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {grouped.map(({ category, items }) => (
            <section key={category}>
              <h2
                className="text-warm-white font-semibold uppercase tracking-widest mb-6"
                style={{ fontSize: '13px', letterSpacing: '0.14em' }}
              >
                {category}
              </h2>
              <div className="space-y-6">
                {items.map((person) => (
                  <article key={person.name} className="flex flex-col sm:flex-row items-start gap-6 p-5 border border-warm-white/20">
                    {/* Left: image + name */}
                    <div className="flex-shrink-0 w-full sm:w-[220px]">
                      <div className="relative w-full" style={{ height: '300px' }}>
                        {person.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={person.image}
                            alt={person.name}
                            className="object-cover object-top grayscale"
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-base"
                            style={{ backgroundColor: person.color }}
                          >
                            {person.initials}
                          </div>
                        )}
                      </div>
                      <p className="text-warm-white font-bold mt-2" style={{ fontSize: '15px' }}>{person.name}</p>
                    </div>

                    {/* Right: description */}
                    <p className="text-warm-white/75 font-normal flex-1" style={{ fontSize: '15px', lineHeight: 1.85 }}>
                      {person.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
