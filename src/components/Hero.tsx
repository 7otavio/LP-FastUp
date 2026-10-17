import { ArrowUp, ArrowDown, Instagram, Play, TrendingUp, Video, Megaphone } from 'lucide-react';
import { MotionShowcase } from './motion/MotionShowcase';

const STATS = [
  { icon: TrendingUp, title: 'Um nicho só', label: 'Especialistas no mercado imobiliário' },
  { icon: Video, title: 'Uma só equipe', label: 'Produção de vídeo e tráfego pago' },
  { icon: Megaphone, title: 'Foco em venda', label: 'Estratégia para gerar contatos reais' },
];

const PILLS = [
  { icon: Video, label: 'Produção de vídeo' },
  { icon: Megaphone, label: 'Tráfego pago' },
  { icon: TrendingUp, label: 'Foco em venda' },
];

export function Hero() {
  return (
    <section id="inicio" className="hero-intro relative overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-32">
      <div className="relative mx-auto max-w-7xl container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="hero-copy">
            <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              MKT Imobiliário
            </div>

            <h1 className="hero-title mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="hero-line">Você no <span className="hero-top-word text-gradient-green">topo<svg viewBox="0 0 200 18" aria-hidden="true"><path d="M 3 12 Q 90 0 195 8" pathLength="1" /></svg></span></span>
              <span className="hero-line" style={{ animationDelay: '100ms' }}>do mercado</span>
              <span className="hero-line" style={{ animationDelay: '200ms' }}>imobiliário.</span>
            </h1>

            <p className="hero-body mt-7 max-w-xl text-lg leading-relaxed text-ink-200">
              Marketing digital feito exclusivamente para quem vende imóveis. Unimos
              produção de vídeo, tráfego pago e estratégia para transformar
              visibilidade em <span className="text-white">contatos reais e vendas</span>.
            </p>

            <div className="hero-pills mt-7 flex flex-wrap gap-2.5">
              {PILLS.map((pill) => (
                <span key={pill.label} className="hero-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-ink-100">
                  <pill.icon className="h-4 w-4 text-brand-400" />{pill.label}
                </span>
              ))}
            </div>

            <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#servicos" className="primary-cta group inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-ink-900 shadow-glow transition-all hover:bg-brand-400 hover:shadow-glow-lg">
                Ver serviços <ArrowUp className="h-4.5 w-4.5 transition-transform group-hover:-translate-y-0.5" strokeWidth={3} />
              </a>
              <a href="#curso" className="secondary-cta group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-base font-semibold text-white transition-all hover:border-brand-500/50 hover:bg-white/[0.06]">
                <Play className="h-4 w-4 text-brand-400" fill="currentColor" />Conhecer o curso
              </a>
            </div>

            <a href="https://www.instagram.com/sejafastup/" target="_blank" rel="noreferrer noopener" className="mt-6 inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-brand-300">
              <Instagram className="h-4 w-4" /> @sejafastup
            </a>
          </div>

          <div className="reveal relative min-w-0" style={{ transitionDelay: '150ms' }}>
            <MotionShowcase />
          </div>
        </div>

        <div className="reveal mt-14 grid gap-4 sm:grid-cols-3" style={{ transitionDelay: '150ms' }}>
          {STATS.map((stat) => (
            <div key={stat.title} className="motion-card flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
              <stat.icon className="h-6 w-6 shrink-0 text-brand-400" />
              <div><p className="font-display text-base font-bold text-white">{stat.title}</p><p className="mt-1 text-sm leading-snug text-ink-200">{stat.label}</p></div>
            </div>
          ))}
        </div>
        <a href="#quem-somos" className="explore-link mx-auto mt-10 flex w-fit items-center gap-3 text-[11px] font-medium uppercase tracking-[.2em] text-ink-300 transition-colors hover:text-brand-300">
          Conheça a Fast Up <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15"><ArrowDown className="h-3.5 w-3.5" /></span>
        </a>
      </div>
    </section>
  );
}
