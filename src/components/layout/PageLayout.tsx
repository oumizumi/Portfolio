'use client';

import NavBar from './NavBar';
import Footer from './Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { motion } from 'framer-motion';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <NavBar />
      <main className="flex-1 pt-20 pb-12 sm:pt-24 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
