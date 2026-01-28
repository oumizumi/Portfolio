'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import { FeaturesSection, ModulesSection, AboutSection } from '@/components/sections/Sections';
import GitTimeline from '@/components/sections/GitTimeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import FloatingDots from '@/components/ui/FloatingDots';
import LightDotGrid from '@/components/ui/LightDotGrid';
import SplashScreen from '@/components/layout/SplashScreen';

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main
      className="min-h-screen relative overflow-hidden bg-portfolio"
      id="top"
    >
      <AnimatePresence>
        {showSplash && (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }} // Faster entry
          className="relative z-20"
        >
          <LightDotGrid />
          <FloatingDots />
          <NavBar />
          <Hero />
          <FeaturesSection />
          <ModulesSection />
          <AboutSection />
          <GitTimeline />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}
