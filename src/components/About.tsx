import { Target, Eye, Sparkles, Video, Brain, Megaphone, RefreshCw } from 'lucide-react';

const DIFFERENTIALS = [
  { icon: Target, title: 'Especialista em um nicho só', text: 'Trabalhamos apenas com o mercado imobiliário e conhecemos a rotina de quem vende imóveis.' },
  { icon: Video, title: 'Produção de conteúdo', text: 'Roteiro, gravação e edição de vídeos que valorizam o imóvel e prendem o comprador.' },
  { icon: Megaphone, title: 'Tráfego pago', text: 'Campanhas pensadas para gerar contatos qualificados e conversas no WhatsApp.' },
  { icon: Sparkles, title: 'Ensinamos também', text: 'Com o curso Corretor de Autoridade, o corretor aprende a fazer o próprio marketing.' },
  { icon: Brain, title: 'Inteligência artificial no processo', text: 'Mais agilidade e qualidade na criação de conteúdo.' },
  { icon: RefreshCw, title: 'Atualização constante', text: 'Novas ferramentas, IA e tendências aplicadas ao dia a dia do corretor.' },
];

export function About() {
  return (
    <section id="quem-somos" className="relative section-py">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl container-px">
        {/* Header */}
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">Quem somos</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Seu negócio merece um <span className="text-gradient-green">Up</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-200">
            A <span className="font-semibold text-white">Fast Up</span> é uma empresa de marketing digital
            feita exclusivamente para o mercado imobiliário. Unimos produção de vídeo, tráfego pago e
            estratégia para colocar corretores, imobiliárias e imóveis em evidência e transformar
            visibilidade em contatos e vendas.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-200">
            Nosso nome diz como trabalhamos: <span className="font-semibold text-white">Fast</span>,
            que significa rápido, porque o mercado imobiliário não espera; <span className="font-semibold text-brand-400">Up</span>,
            porque o objetivo é sempre levar o seu negócio para cima. Mais que divulgar, a gente
            trabalha lado a lado com cada parceiro para que ele chegue ao topo.
          </p>
        </div>

        {/* Mission / Vision / Value prop */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <div className="reveal motion-card rounded-3xl border border-white/10 bg-white/[0.02] p-7">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/15 text-brand-400">
              <Target className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-white">Missão</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-200">
              Colocar corretores, imobiliárias e proprietários no topo do mercado imobiliário, com um
              marketing que gera contatos reais e ajuda a vender imóveis.
            </p>
          </div>

          <div className="reveal motion-card rounded-3xl border border-white/10 bg-white/[0.02] p-7" style={{ transitionDelay: '80ms' }}>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/15 text-brand-400">
              <Eye className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-white">Visão</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-200">
              Ser referência em marketing imobiliário, reconhecida por quem vende imóveis como a
              parceira que faz o negócio crescer.
            </p>
          </div>

          <div className="reveal motion-card rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-transparent p-7" style={{ transitionDelay: '160ms' }}>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-ink-900">
              <Sparkles className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-white">Proposta de valor</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-200">
              Tudo o que o corretor e a imobiliária precisam para aparecer, gerar contatos e vender em
              um só lugar: conteúdo que valoriza o imóvel, anúncios que chegam no comprador certo e
              estratégia pensada para o mercado imobiliário.
            </p>
          </div>
        </div>

        {/* Differentials */}
        <div className="reveal mt-16">
          <h3 className="font-display text-2xl font-bold text-white">Diferenciais</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIALS.map((d) => (
              <div
                key={d.title}
                className="motion-card flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-400">
                  <d.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{d.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
