import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import { FeaturesSection, ModulesSection, AboutSection } from '@/components/sections/Sections';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Page() {
  return (
    <main
      className="min-h-screen relative overflow-hidden bg-portfolio"
      id="top"
      style={{ fontFamily: 'Monaco, Menlo, "Courier New", monospace' }}
    >
      <div className="relative z-20">
        <NavBar />
        <Hero />
        <FeaturesSection />
        <ModulesSection />
        <AboutSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
