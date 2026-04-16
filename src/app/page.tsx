import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/layout/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-base">
      <NavBar />
      <main className="pt-16">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
