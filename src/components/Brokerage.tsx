import { Home, Video, Megaphone, MessageCircle, ArrowUpRight } from 'lucide-react';

const STEPS = [
  { icon: Video, title: 'Conteúdo que valoriza', text: 'Produção de vídeo para apresentar o seu imóvel.' },
  { icon: Megaphone, title: 'Anúncios com estratégia', text: 'Tráfego pago para dar visibilidade ao imóvel.' },
  { icon: MessageCircle, title: 'Contatos reais', text: 'Marketing pensado para gerar conversas com interessados.' },
];

export function Brokerage() {
  return (
    <section id="corretagem" className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 mask-fade-y" />
      <div className="relative mx-auto max-w-7xl container-px">
        <a href="/" className="text-sm text-ink-300 transition-colors hover:text-brand-300">← Voltar para a Fast Up</a>
        <div className="reveal mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
              <Home className="h-4 w-4" /> Para proprietários
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">Seu imóvel com <span className="text-gradient-green">marketing por trás.</span></h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-200">A Fast Up também atua na venda do seu imóvel. Unimos produção de vídeo e tráfego pago para valorizar a apresentação, dar visibilidade e gerar contatos.</p>
            <a href="https://www.instagram.com/sejafastup/" target="_blank" rel="noreferrer noopener" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-ink-900 shadow-glow transition-colors hover:bg-brand-400">Falar sobre meu imóvel <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <img src="/assets/interior.jpg" width={1200} height={900} alt="Sala de estar iluminada com decoração contemporânea" className="aspect-[4/3] w-full rounded-3xl border border-white/10 object-cover shadow-card" />
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title} className="reveal rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <step.icon className="h-6 w-6 text-brand-400" />
              <h2 className="mt-4 font-display text-lg font-bold text-white">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-200">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
