import PageLayout from '@/components/layout/PageLayout';
import ContactForm from '@/components/sections/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — oumizumi',
  description: "Get in touch — I'm always open to new projects and opportunities.",
};

export default function ContactPage() {
  return (
    <PageLayout>
        <div className="page-container">
          {/* Header */}
          <div className="mb-16">
            <p className="text-warm-white/50 font-light tracking-widest uppercase mb-4" style={{ fontSize: '12px' }}>contact</p>
            <h1 className="text-4xl md:text-5xl font-light text-warm-white tracking-tight mb-4">
              get in touch.
            </h1>
            <p className="text-warm-white/75 font-light" style={{ fontSize: '17px', lineHeight: 1.85 }}>
              I&apos;m always open to hearing about new projects and opportunities. Whether you have a question
              or just want to say hello, I&apos;ll get back to you as soon as I can.
            </p>
          </div>

          {/* Contact info */}
          <section className="mb-16 space-y-4">
            <h2 className="text-warm-white/55 font-light tracking-widest uppercase mb-6" style={{ fontSize: '11px' }}>contact information</h2>
            <div className="space-y-3">
              <a
                href="mailto:ofgharad@gmail.com"
                className="flex items-center gap-3 text-warm-white hover:text-accent transition-colors group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm-white/60 group-hover:text-accent transition-colors">
                  <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                </svg>
                ofgharad@gmail.com
              </a>
              <div className="flex items-center gap-3 text-warm-white/65">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Ottawa, ON, Canada
              </div>
              <a
                href="https://github.com/oumizumi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-warm-white hover:text-accent transition-colors group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" className="text-warm-white/60 group-hover:text-accent transition-colors">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
                github.com/oumizumi
              </a>
              <a
                href="https://www.linkedin.com/in/oumzumi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-warm-white hover:text-accent transition-colors group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" className="text-warm-white/60 group-hover:text-accent transition-colors">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                linkedin.com/in/oumzumi
              </a>
            </div>
          </section>

          {/* Divider */}
          <hr className="border-subtle mb-12" />

          {/* Contact form */}
          <section>
            <h2 className="text-warm-white/55 font-light tracking-widest uppercase mb-8" style={{ fontSize: '11px' }}>send a message</h2>
            <ContactForm />
          </section>
        </div>
    </PageLayout>
  );
}
