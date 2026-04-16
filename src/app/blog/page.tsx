import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import { posts } from '@/data/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — oumizumi',
  description: 'Writing about building software, learning, and other things.',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <PageLayout>
        <div className="page-container">
          {/* Header */}
          <div className="mb-16">
            <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>blog</p>
            <h1 className="text-4xl md:text-5xl font-light text-warm-white tracking-tight mb-4">
              writing.
            </h1>
            <p className="text-warm-white/75 font-light" style={{ fontSize: '17px', lineHeight: 1.85 }}>
              Occasional thoughts on building software, learning things, and whatever else is on my mind.
            </p>
          </div>

          {/* Posts */}
          <div className="space-y-0">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-6 border-b border-subtle hover:border-accent/40 transition-colors"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <h2
                    className="text-warm-white/90 group-hover:text-accent transition-colors font-normal"
                    style={{ fontSize: '17px' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-warm-white/60 font-normal" style={{ fontSize: '14px', lineHeight: 1.75 }}>
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0 sm:pl-6">
                  <span
                    className="text-accent font-normal border border-accent/40 rounded-full px-3 py-0.5"
                    style={{ fontSize: '12px' }}
                  >
                    {post.category}
                  </span>
                  <span className="text-warm-white/40 font-normal" style={{ fontSize: '13px' }}>
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </PageLayout>
  );
}
