import { useEffect, useRef } from 'react';

export function PageMotion() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty('--progress', String(total > 0 ? window.scrollY / total : 0));
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
