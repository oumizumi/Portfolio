import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import { posts } from '@/data/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — oumizumi`, description: post.excerpt };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.split('\n\n').filter(Boolean);

  return (
    <PageLayout>
        <article style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-warm-white/60 hover:text-warm-white transition-colors mb-14"
            style={{ fontSize: '14px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            back to blog
          </Link>

          {/* Header */}
          <header className="mb-12 space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="text-accent font-normal border border-accent/40 rounded-full px-3 py-0.5"
                style={{ fontSize: '12px', letterSpacing: '0.05em' }}
              >
                {post.category}
              </span>
              <span className="text-warm-white/45 font-normal" style={{ fontSize: '14px' }}>
                {formatDate(post.date)}
              </span>
            </div>
            <h1
              className="font-normal text-warm-white tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2 }}
            >
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-warm-white/60 font-normal" style={{ fontSize: '17px', lineHeight: 1.85 }}>
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Divider */}
          <hr className="border-subtle mb-12" />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            {paragraphs.map((para, i) => {
              const parts = para.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i} className="text-warm-white/80 font-normal" style={{ fontSize: '17px', lineHeight: 1.85 }}>
                  {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={j} className="text-warm-white font-medium">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
          </div>
        </article>
    </PageLayout>
  );
}
