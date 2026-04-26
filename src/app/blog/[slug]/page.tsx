import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import { posts } from '@/data/blog';
import { notFound } from 'next/navigation';
import { readingTime } from '@/lib/readingTime';
import ScrollProgress from '@/components/ui/ScrollProgress';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | oumizumi`, description: post.excerpt };
}

function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={j} className="text-warm-white font-medium">{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={j} className="bg-surface border border-subtle rounded px-1.5 py-0.5 text-accent font-mono" style={{ fontSize: '14px' }}>{part.slice(1, -1)}</code>;
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={j} className="text-warm-white/70 italic">{part.slice(1, -1)}</em>;
    return part;
  });
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

  const blocks = post.content.split('\n\n').filter(Boolean);

  return (
    <PageLayout>
        <ScrollProgress />
        <article style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-warm-white/60 hover:text-warm-white transition-colors mb-8 sm:mb-14"
            style={{ fontSize: '14px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            back to blog
          </Link>

          {/* Header */}
          <header className="mb-8 sm:mb-12 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-accent font-normal border border-accent/40 rounded-full px-3 py-0.5"
                style={{ fontSize: '12px', letterSpacing: '0.05em' }}
              >
                {post.category}
              </span>
              <span className="text-warm-white/45 font-normal" style={{ fontSize: '14px' }}>
                {formatDate(post.date)}
              </span>
              {post.content && (
                <span className="text-warm-white/30 font-normal" style={{ fontSize: '14px' }}>
                  {readingTime(post.content)} min read
                </span>
              )}
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
          <hr className="border-subtle mb-8 sm:mb-12" />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            {blocks.map((block, i) => {
              // Image
              const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
              if (imgMatch) {
                return (
                  <img key={i} src={imgMatch[2]} alt={imgMatch[1]}
                    className="w-full rounded-lg"
                    style={{ maxHeight: '480px', objectFit: 'cover' }}
                  />
                );
              }
              // Horizontal rule
              if (block.trim() === '---') {
                return <hr key={i} className="border-subtle" />;
              }
              // H2
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-warm-white font-normal tracking-tight" style={{ fontSize: '22px', lineHeight: 1.3, marginTop: '0.8rem' }}>
                    {renderInline(block.slice(3))}
                  </h2>
                );
              }
              // H3
              if (block.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-warm-white font-normal tracking-tight" style={{ fontSize: '18px', lineHeight: 1.4, marginTop: '0.4rem' }}>
                    {renderInline(block.slice(4))}
                  </h3>
                );
              }
              // Blockquote
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={i} className="border-l-2 border-accent/50 pl-5 text-warm-white/65 font-light italic" style={{ fontSize: '17px', lineHeight: 1.85 }}>
                    {renderInline(block.slice(2))}
                  </blockquote>
                );
              }
              // Code block
              if (block.startsWith('```')) {
                const lines = block.split('\n');
                const code = lines.slice(1).join('\n').replace(/```$/, '');
                return (
                  <pre key={i} className="bg-surface border border-subtle rounded-lg px-5 py-4 overflow-x-auto" style={{ fontSize: '14px', lineHeight: 1.7 }}>
                    <code className="text-warm-white/80 font-mono">{code}</code>
                  </pre>
                );
              }
              // Bullet list
              if (block.split('\n').every(l => l.startsWith('- '))) {
                return (
                  <ul key={i} className="space-y-2">
                    {block.split('\n').map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-warm-white/80 font-normal" style={{ fontSize: '17px', lineHeight: 1.85 }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0 mt-[10px]" />
                        {renderInline(item.slice(2))}
                      </li>
                    ))}
                  </ul>
                );
              }
              // Paragraph
              return (
                <p key={i} className="text-warm-white/80 font-normal" style={{ fontSize: '17px', lineHeight: 1.85 }}>
                  {renderInline(block)}
                </p>
              );
            })}
          </div>
        </article>
    </PageLayout>
  );
}
