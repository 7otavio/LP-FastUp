import { useState } from 'react';
import { ArrowUp, Pause, Play } from 'lucide-react';

const WORDS = [
  'Produção de vídeo',
  'Tráfego pago',
  'Meta Ads',
  'Leads no WhatsApp',
  'IA para corretores',
  'Marketing imobiliário',
  'Contatos qualificados',
  'Corretor de Autoridade',
];

export function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = [...WORDS, ...WORDS];
  return (
    <div className="brand-marquee relative overflow-hidden border-y border-white/10 bg-ink-800/40 py-5">
      <p className="sr-only">{WORDS.join('. ')}.</p>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-8" aria-hidden="true" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
          {items.map((w, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-200">
              <ArrowUp className="h-4 w-4 text-brand-400" strokeWidth={3} />
              {w}
            </span>
          ))}
        </div>
      </div>
      <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Reproduzir faixa animada' : 'Pausar faixa animada'} className="marquee-toggle absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900 text-ink-200 transition-colors hover:border-brand-500/50 hover:text-brand-300">
        {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
