import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import { FeaturesSection, ModulesSection, AboutSection } from '@/components/sections/Sections';
import GitTimeline from '@/components/sections/GitTimeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import FloatingDots from '@/components/ui/FloatingDots';
import LightDotGrid from '@/components/ui/LightDotGrid';

export default function Page() {
  return (
    <main
      className="min-h-screen relative overflow-hidden bg-portfolio"
      id="top"
      style={{ fontFamily: 'Monaco, Menlo, "Courier New", monospace' }}
    >
      <LightDotGrid />
      <FloatingDots />
      <div className="relative z-20">
        <NavBar />
        <Hero />
        <FeaturesSection />
        <ModulesSection />
        <AboutSection />
        <GitTimeline />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
