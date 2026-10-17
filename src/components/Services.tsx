import { Video, Megaphone, ArrowUp, Check, Users, Building2, MessageCircle, BarChart3, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    icon: Video,
    title: 'Produção de vídeo',
    desc: 'Vídeos que valorizam o imóvel e prendem o comprador nos primeiros segundos.',
    points: [
      'Captação profissional do imóvel',
      'Roteiros com gancho para imóveis',
      'Edição com cortes, legendas e áudios em alta',
    ],
  },
  {
    icon: Megaphone,
    title: 'Tráfego pago',
    desc: 'Anúncios que chegam no comprador certo e geram contatos qualificados no WhatsApp.',
    points: [
      'Meta Ads estruturado do zero',
      'Público por região e perfil de comprador',
      'Leads direto no WhatsApp + otimização',
    ],
  },
];

const AUDIENCE = [
  { icon: Users, title: 'Para corretores autônomos', text: 'Conteúdo e anúncios para construir autoridade e gerar contatos qualificados.' },
  { icon: Building2, title: 'Para imobiliárias', text: 'Estratégia de conteúdo e campanhas para vender imóveis e reforçar a presença da marca.' },
];

const FLOW = [
  { icon: Sparkles, title: 'Estratégia', text: 'Entendemos o imóvel, o público e a região.' },
  { icon: Video, title: 'Conteúdo', text: 'Gravação e edição pensadas para converter.' },
  { icon: Megaphone, title: 'Anúncios', text: 'Campanhas que geram contatos qualificados.' },
  { icon: MessageCircle, title: 'Contatos', text: 'Leads direto no WhatsApp para você vender.' },
];

export function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden section-py">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -top-10 left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl container-px">
        {/* Header */}
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">Serviços</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Para corretores e imobiliárias
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-200">
            Produção de vídeo e tráfego pago em uma só equipe, com foco em dar visibilidade aos imóveis
            e gerar contatos qualificados para o WhatsApp.
          </p>
        </div>

        {/* Audience cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {AUDIENCE.map((a) => (
            <div key={a.title} className="reveal motion-card flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-400">
                <a.icon className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{a.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Service cards */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative overflow-hidden motion-card rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition-colors hover:border-brand-500/40"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-ink-900 shadow-glow">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-200">{s.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-ink-100">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-400">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Flow */}
        <div className="service-flow reveal mt-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f, i) => (
              <div key={f.title} className="flow-step relative rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="absolute right-4 top-4 font-display text-sm font-bold text-ink-600">
                  0{i + 1}
                </span>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-400">
                  <f.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 text-sm font-bold text-white">{f.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300">{f.text}</p>
                {i < FLOW.length - 1 && (
                  <ArrowUp className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-500/40 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-12 flex flex-col items-start gap-4 motion-card rounded-3xl border border-brand-500/20 bg-gradient-to-r from-brand-500/10 to-transparent p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-brand-400" />
            <p className="text-base font-medium text-white">
              Pronto para gerar contatos qualificados e vender mais imóveis?
            </p>
          </div>
          <a
            href="#contato"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition-all hover:bg-brand-400 hover:shadow-glow-lg"
          >
            Falar com a Fast Up
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={3} />
          </a>
        </div>
      </div>
    </section>
  );
}
