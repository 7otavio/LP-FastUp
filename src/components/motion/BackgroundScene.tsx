import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type BuildingSpec = {
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  opacity: number;
};

const BUILDINGS: BuildingSpec[] = [
  { x: -70, y: 460, width: 240, height: 450, depth: 90, opacity: .6 },
  { x: 230, y: 610, width: 150, height: 260, depth: 45, opacity: .38 },
  { x: 425, y: 670, width: 90, height: 160, depth: 25, opacity: .25 },
  { x: 1335, y: 285, width: 160, height: 650, depth: 65, opacity: .7 },
  { x: 1130, y: 540, width: 150, height: 310, depth: 45, opacity: .4 },
  { x: 1000, y: 650, width: 105, height: 180, depth: 30, opacity: .28 },
];

function Building({ spec, index }: { spec: BuildingSpec; index: number }) {
  const { x, y, width: w, height: h, depth: d, opacity } = spec;
  const outline = `M ${x} ${y + h} V ${y} H ${x + w} V ${y + h} Z M ${x} ${y} L ${x + d} ${y - d} H ${x + w + d} L ${x + w} ${y} M ${x + w + d} ${y - d} V ${y + h - d} L ${x + w} ${y + h}`;
  const trail = `M ${x} ${y + h} V ${y} L ${x + d} ${y - d} H ${x + w + d} V ${y + h - d}`;
  const windows = Array.from({ length: 7 }, (_, row) => `M ${x + 14} ${y + (h / 8) * (row + 1)} H ${x + w - 14}`).join(' ') +
    Array.from({ length: 3 }, (_, col) => `M ${x + (w / 4) * (col + 1)} ${y + 16} V ${y + h - 16}`).join(' ');

  return (
    <g opacity={opacity}>
      <path d={`M ${x + w} ${y} L ${x + w + d} ${y - d} V ${y + h - d} L ${x + w} ${y + h} Z`} fill="#54D654" fillOpacity=".035" />
      <path d={outline} className="ambient-building-edge" vectorEffect="non-scaling-stroke" />
      <path d={windows} className="ambient-window-grid" vectorEffect="non-scaling-stroke" />
      <path d={trail} pathLength="1" className="ambient-light-trace" style={{ animationDelay: `${index * -3.2}s`, animationDuration: `${18 + index * 2}s` }} vectorEffect="non-scaling-stroke" />
      {[0, 1, 2].map((light) => (
        <rect key={light} x={x + (w / 4) * (((index + light) % 3) + .35)} y={y + (h / 8) * (2 + ((index + light * 2) % 5))} width={Math.max(7, w / 10)} height="3" rx="1.5" className="ambient-lit-window" style={{ animationDelay: `${index * -1.9 - light * 3}s` }} />
      ))}
    </g>
  );
}

export function BackgroundScene() {
  const scene = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const running = !reduced && !paused && tabVisible;

  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (!running) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      scene.current?.style.setProperty('--ambient-x', `${x}px`);
      scene.current?.style.setProperty('--ambient-y', `${y}px`);
      scene.current?.style.setProperty('--ambient-scroll', `${Math.min(window.scrollY, 1600) * -.012}px`);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onPointer = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      x = (event.clientX / window.innerWidth - .5) * 18;
      y = (event.clientY / window.innerHeight - .5) * 12;
      schedule();
    };
    const onLeave = () => { x = 0; y = 0; schedule(); };
    update();
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, [running]);

  return (
    <>
      <div ref={scene} className="ambient-scene" data-motion={running ? 'running' : 'paused'} aria-hidden="true">
        <div className="ambient-glow ambient-glow-primary" />
        <div className="ambient-glow ambient-glow-secondary" />
        <div className="ambient-city">
          <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" focusable="false">
            <defs>
              <linearGradient id="ambient-floor-fade" gradientUnits="userSpaceOnUse" x1="0" y1="520" x2="0" y2="1000"><stop offset="0" stopColor="#54D654" stopOpacity="0" /><stop offset="1" stopColor="#54D654" stopOpacity=".13" /></linearGradient>
            </defs>
            <g className="ambient-floor" stroke="url(#ambient-floor-fade)" fill="none" strokeWidth="1">
              {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M 800 520 L ${-400 + i * 200} 1100`} vectorEffect="non-scaling-stroke" />)}
              {[560, 610, 680, 780, 930].map((row) => <path key={row} d={`M -200 ${row} H 1800`} vectorEffect="non-scaling-stroke" />)}
            </g>
            <g className="ambient-buildings-left">{BUILDINGS.slice(0, 3).map((spec, i) => <Building key={i} spec={spec} index={i} />)}</g>
            <g className="ambient-buildings-right">{BUILDINGS.slice(3).map((spec, i) => <Building key={i} spec={spec} index={i + 3} />)}</g>
            <g className="ambient-particles">
              {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={90 + (i * 157) % 1420} cy={160 + (i * 113) % 700} r={i % 4 === 0 ? 1.5 : .8} className="ambient-particle" style={{ animationDelay: `${i * -1.4}s`, animationDuration: `${14 + i % 6 * 2}s` }} />)}
            </g>
          </svg>
        </div>
        <div className="ambient-vignette" />
      </div>
      {!reduced && (
        <button type="button" className="ambient-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Ativar movimento do fundo' : 'Pausar movimento do fundo'} aria-pressed={paused}>
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          <span>{paused ? 'Ativar fundo' : 'Pausar fundo'}</span>
        </button>
      )}
    </>
  );
}
