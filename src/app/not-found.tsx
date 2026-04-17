import Link from 'next/link';
import NavBar from '@/components/layout/NavBar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <NavBar />
      <main className="flex-1 flex items-center">
        <div className="page-container py-16">
          <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>
            404
          </p>
          <h1 className="text-3xl sm:text-4xl font-light text-warm-white tracking-tight mb-4">
            page not found.
          </h1>
          <p className="text-warm-white/60 font-light mb-10" style={{ fontSize: '17px', lineHeight: 1.85 }}>
            Whatever you were looking for isn&apos;t here.
          </p>
          <Link
            href="/"
            className="px-5 py-2.5 bg-accent text-fg rounded text-sm font-medium hover:opacity-75 transition-opacity"
          >
            go home
          </Link>
        </div>
      </main>
    </div>
  );
}
