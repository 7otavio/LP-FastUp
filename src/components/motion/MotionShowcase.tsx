import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Logo } from '../Logo';
import { ProductionVisual } from './ProductionVisual';

const BrandPlayer = lazy(() => import('./BrandPlayer'));

function BrandPoster() {
  return (
    <>
      <div className="film-surface film-poster">
        <ProductionVisual />
        <Logo className="absolute left-6 top-6 w-[140px]" />
        <div className="absolute left-[6.25%] top-[15.5%] font-display font-bold leading-[1.04] tracking-tight text-white" style={{ fontSize: 'clamp(32px, 8vw, 56px)' }}>Gravação<br /><span className="text-brand-300">em foco.</span></div>
      </div>
      <div className="film-poster-caption">Vídeo. Tráfego. Estratégia.<ArrowUpRight className="h-5 w-5 text-brand-300" /></div>
    </>
  );
}

export function MotionShowcase() {
  const container = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: '200px' });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <figure ref={container} className="motion-showcase" aria-label="Apresentação Fast Up: gravação, edição e tráfego pago para gerar contatos.">
      <div className="showcase-topline"><span className="showcase-status" /> Do REC ao contato <ArrowUpRight className="ml-auto h-4 w-4" /></div>
      {ready && !reduced ? <Suspense fallback={<BrandPoster />}><BrandPlayer /></Suspense> : <BrandPoster />}
      <figcaption className="sr-only">Uma apresentação em quatro cenas: gravação de vídeos, edição de conteúdo, campanhas para o público certo e a marca Fast Up.</figcaption>
    </figure>
  );
}
