import type { CSSProperties, ReactNode } from 'react';
import { Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArrowUpRight, Target, MessageCircle, Users } from 'lucide-react';
import { ProductionVisual, EditTimeline } from './ProductionVisual';

export const FILM_FPS = 30;
export const SCENE_FRAMES = 135;
export const FILM_FRAMES = SCENE_FRAMES * 4;
export const SCENES = ['Gravação', 'Edição', 'Tráfego', 'Topo'];

const GREEN = '#54D654';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

function Fill({ children, style = {} }: { children?: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}>{children}</div>;
}

function Enter({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 110 } });
  return <div style={{ ...style, opacity: interpolate(frame - delay, [0, 12], [0, 1], clamp), transform: `translateY(${(1 - progress) * 45}px)` }}>{children}</div>;
}

function Scene({ children, first = false }: { children: ReactNode; first?: boolean }) {
  const frame = useCurrentFrame();
  const enter = first ? 1 : interpolate(frame, [0, 12], [0, 1], clamp);
  const exit = interpolate(frame, [SCENE_FRAMES, SCENE_FRAMES + 12], [1, 0], clamp);
  return <Fill style={{ opacity: enter * exit, overflow: 'hidden' }}>{children}</Fill>;
}

function FilmLogo({ width = 210 }: { width?: number }) {
  return <Img src="/assets/logo-dark.webp" style={{ width, height: 'auto', mixBlendMode: 'lighten' }} />;
}

function SceneLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div style={{ position: 'absolute', top: 55, left: 50, right: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <FilmLogo width={180} />
      <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: 3, color: '#D5DED5' }}>{number} / {children}</span>
    </div>
  );
}

function RecordingScene() {
  const frame = useCurrentFrame();

  return (
    <Scene first>
      <ProductionVisual frame={frame} />
      <SceneLabel number="01">GRAVAÇÃO</SceneLabel>
      <Enter delay={4} style={{ position: 'absolute', left: 50, top: 155 }}>
        <p style={{ fontSize: 86, lineHeight: 1.04, fontWeight: 750, letterSpacing: -4, margin: 0 }}>Gravação<br /><span style={{ color: GREEN }}>em foco.</span></p>
      </Enter>
      <Enter delay={24} style={{ position: 'absolute', left: 50, right: 50, bottom: 40, display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{ width: 35, height: 1, background: GREEN }} />
        <span style={{ fontSize: 18, color: '#B6CDBD' }}>Vídeo. Edição. Tráfego pago.</span>
      </Enter>
    </Scene>
  );
}

function ContentScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame: frame - 12, fps, config: { damping: 23, stiffness: 85 } });

  return (
    <Scene>
      <Fill style={{ background: 'radial-gradient(ellipse at 80% 65%, #17301877, transparent 65%)' }} />
      <SceneLabel number="02">EDIÇÃO</SceneLabel>
      <Enter delay={3} style={{ position: 'absolute', left: 50, top: 165 }}>
        <p style={{ fontSize: 75, lineHeight: 1.06, fontWeight: 750, letterSpacing: -4, margin: 0 }}>Do take<br />à <span style={{ color: GREEN }}>campanha.</span></p>
      </Enter>
      <div style={{ position: 'absolute', left: 260, top: 370, width: 330, height: 500, padding: 10, borderRadius: 42, border: '1px solid #5B725B', background: '#141A14', transform: `translateY(${(1 - rise) * 100}px) rotate(${interpolate(rise, [0, 1], [9, -5])}deg)`, boxShadow: '0 40px 80px #0008' }}>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 32, position: 'relative' }}>
          <EditTimeline frame={frame} />
          <Fill style={{ background: 'linear-gradient(transparent 60%, #0009)' }} />
          <span style={{ position: 'absolute', left: 22, top: 22, display: 'flex', gap: 9, alignItems: 'center', fontSize: 15, fontWeight: 600, color: '#FFF' }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ED665F', opacity: frame % 30 < 20 ? 1 : .45 }} /> REC</span>
        </div>
      </div>
      <Enter delay={22} style={{ position: 'absolute', left: 46, top: 555, padding: '20px 26px', borderRadius: 18, border: '1px solid #406A40', background: '#122012', fontSize: 23, color: '#E8F5E8', boxShadow: '0 15px 45px #0005' }}>Cortes e legendas.</Enter>
      <Enter delay={35} style={{ position: 'absolute', right: 44, top: 770, padding: '20px 26px', borderRadius: 18, background: GREEN, fontSize: 23, color: '#0A0A0A', fontWeight: 650 }}>Pronto para anunciar.</Enter>
      <Enter delay={42} style={{ position: 'absolute', left: 50, bottom: 48, fontSize: 18, letterSpacing: 3, color: '#A9BAA9' }}>VÍDEOS PRONTOS PARA GERAR CONVERSAS.</Enter>
    </Scene>
  );
}

function ConnectionScene() {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [20, 65], [1, 0], clamp);
  const destinations = [
    { x: 145, y: 740, icon: Users, label: 'Público certo' },
    { x: 400, y: 815, icon: Target, label: 'Campanhas' },
    { x: 655, y: 740, icon: MessageCircle, label: 'Uma conversa' },
  ];

  return (
    <Scene>
      <Fill style={{ backgroundImage: 'radial-gradient(ellipse at 50% 75%, #16301677, transparent 60%)' }} />
      <SceneLabel number="03">TRÁFEGO</SceneLabel>
      <Enter style={{ position: 'absolute', left: 50, top: 165 }}>
        <p style={{ fontSize: 75, lineHeight: 1.06, fontWeight: 750, letterSpacing: -4, margin: 0 }}>Seu conteúdo.<br /><span style={{ color: GREEN }}>O público certo.</span></p>
      </Enter>
      <svg width="800" height="1000" style={{ position: 'absolute', inset: 0 }}>
        {destinations.map((node, i) => (
          <g key={node.label}>
            <path d={`M 400 520 Q ${node.x} 530 ${node.x} ${node.y}`} fill="none" stroke="#2A492A" strokeWidth="2" />
            <path d={`M 400 520 Q ${node.x} 530 ${node.x} ${node.y}`} fill="none" stroke={GREEN} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={draw} />
            <circle cx={node.x} cy={node.y} r={49 + ((frame + i * 14) % 65) * .5} fill="none" stroke={GREEN} opacity={frame > 35 ? .2 * (1 - ((frame + i * 14) % 65) / 65) : 0} />
          </g>
        ))}
      </svg>
      <Enter delay={12} style={{ position: 'absolute', left: 260, top: 465, width: 280, height: 110, borderRadius: 24, border: '1px solid #527552', background: '#0A0D0A', display: 'grid', placeItems: 'center', boxShadow: '0 0 70px #54D65418' }}><FilmLogo width={220} /></Enter>
      {destinations.map((node, i) => (
        <Enter key={node.label} delay={35 + i * 7} style={{ position: 'absolute', left: node.x - 100, top: node.y - 42, width: 200, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 18 }}>
          <div style={{ width: 84, height: 84, borderRadius: 25, display: 'grid', placeItems: 'center', color: GREEN, border: '1px solid #436243', background: '#132013' }}><node.icon size={35} strokeWidth={1.5} /></div>
          <span style={{ fontSize: 19, color: '#D4DFD4' }}>{node.label}</span>
        </Enter>
      ))}
      <Enter delay={60} style={{ position: 'absolute', bottom: 40, width: '100%', textAlign: 'center', fontSize: 18, letterSpacing: 4, color: GREEN }}>TRÁFEGO PAGO + ESTRATÉGIA</Enter>
    </Scene>
  );
}

function TopScene() {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 75], [1, 0], clamp);

  return (
    <Scene>
      <Fill style={{ background: 'radial-gradient(ellipse at 95% 30%, #173D1677, transparent 60%)' }} />
      <SceneLabel number="04">FAST UP</SceneLabel>
      <svg width="800" height="1000" style={{ position: 'absolute', inset: 0 }}>
        <path d="M 370 800 L 690 440 L 690 580 M 690 440 L 552 456" pathLength="1" strokeDasharray="1" strokeDashoffset={draw} fill="none" stroke={GREEN} strokeWidth="2" opacity=".4" />
      </svg>
      <Enter delay={5} style={{ position: 'absolute', top: 230, left: 50 }}>
        <p style={{ margin: 0, fontSize: 106, fontWeight: 750, letterSpacing: -7, lineHeight: 1.03 }}>Você no<br /><span style={{ color: GREEN }}>topo.</span></p>
      </Enter>
      <Enter delay={20} style={{ position: 'absolute', top: 500, left: 55 }}>
        <p style={{ margin: 0, fontSize: 52, fontWeight: 500, lineHeight: 1.13, letterSpacing: -2 }}>do mercado<br />imobiliário.</p>
      </Enter>
      <Enter delay={38} style={{ position: 'absolute', left: 50, right: 50, bottom: 120, borderRadius: 22, background: GREEN, color: '#0A0A0A', padding: '25px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 27, fontWeight: 650 }}>Vamos para cima.<ArrowUpRight size={38} /></Enter>
      <Enter delay={45} style={{ position: 'absolute', left: 55, bottom: 55, color: '#C9D5C9', fontSize: 22 }}>@sejafastup</Enter>
    </Scene>
  );
}

export function FastUpFilm() {
  return (
    <Fill style={{ color: 'white', fontFamily: 'Sora, sans-serif' }}>
      <Sequence layout="none" from={0} durationInFrames={SCENE_FRAMES + 12}><RecordingScene /></Sequence>
      <Sequence layout="none" from={SCENE_FRAMES} durationInFrames={SCENE_FRAMES + 12}><ContentScene /></Sequence>
      <Sequence layout="none" from={SCENE_FRAMES * 2} durationInFrames={SCENE_FRAMES + 12}><ConnectionScene /></Sequence>
      <Sequence layout="none" from={SCENE_FRAMES * 3} durationInFrames={SCENE_FRAMES}><TopScene /></Sequence>
    </Fill>
  );
}
