import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Brokerage } from '@/components/Brokerage';
import { Course } from '@/components/Course';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';
import { PageMotion } from '@/components/motion/PageMotion';
import { BackgroundScene } from '@/components/motion/BackgroundScene';

function App() {
  const ref = useReveal<HTMLDivElement>();
  const path = window.location.pathname.replace(/\/+$/, '');
  const isOwnersPage = path === '/proprietarios' || path === '/proprietarios.html';

  return (
    <div ref={ref} className="relative isolate min-h-screen bg-ink-900 text-ink-100">
      <BackgroundScene />
      <PageMotion />
      <Navbar />
      <main id="conteudo">
        {isOwnersPage ? <Brokerage /> : (
          <>
            <Hero />
            <Marquee />
            <About />
            <Services />
            <Course />
          </>
        )}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
