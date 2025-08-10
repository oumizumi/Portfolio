import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import { FeaturesSection, ModulesSection, AboutSection } from '@/components/Sections';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

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
