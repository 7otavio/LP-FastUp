import {
  Play, Smartphone, Clapperboard, Brain, Megaphone, UserCheck,
  BookOpen, FileText, LayoutTemplate, MessageCircle, ArrowUp, Check, GraduationCap, Sparkles
} from 'lucide-react';
import { Logo } from './Logo';

const MODULES = [
  {
    n: '01',
    icon: Smartphone,
    title: 'Roteiro e gravação com celular',
    items: ['Roteiros prontos para imóveis', 'Gancho que prende em 3 segundos', 'Câmera, luz e movimentos', 'Imóvel pronto pro REC'],
  },
  {
    n: '02',
    icon: Clapperboard,
    title: 'Edição de vídeos imobiliários',
    items: ['Cortes secos e transições', 'Legendas automáticas', 'Áudios em alta', 'Música sem problema de direitos'],
  },
  {
    n: '03',
    icon: Brain,
    title: 'IA para corretores',
    items: ['Imagens e posts com IA', 'Fotos do imóvel tratadas', 'Legendas e descrições', 'Calendário de conteúdo do mês'],
  },
  {
    n: '04',
    icon: Megaphone,
    title: 'Tráfego pago para corretores',
    items: ['Meta Ads do zero', 'Público certo na sua região', 'Leads direto no WhatsApp', 'Otimização e ajustes de anúncios'],
  },
];

const BONUS = [
  { icon: UserCheck, title: 'Corretor', text: 'Bio, destaques, feed e conteúdo.' },
  { icon: UserCheck, title: 'Imobiliária', text: 'Marca, redes e presença da equipe.' },
  { icon: Sparkles, title: 'Reunião de diagnóstico', text: 'Com a equipe Fast Up.' },
];

const DELIVERABLES = [
  { icon: Play, title: 'Aulas em vídeo', text: 'Passo a passo e tela gravada.' },
  { icon: FileText, title: 'E-book em PDF', text: 'Um para cada módulo.' },
  { icon: LayoutTemplate, title: 'Templates prontos', text: 'Roteiros, checklists e prompts.' },
  { icon: MessageCircle, title: 'Grupo VIP no WhatsApp', text: 'Dúvidas e networking.' },
];

export function Course() {
  return (
    <section id="curso" className="relative overflow-hidden section-py">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="pointer-events-none absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-brand-500/12 blur-[130px]" />

      <div className="mx-auto max-w-7xl container-px">
        {/* Header */}
        <div className="reveal max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            <GraduationCap className="h-3.5 w-3.5" />
            Curso Fast Up
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Corretor de <span className="text-gradient-green">Autoridade</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-200">
            O curso da Fast Up que ensina o corretor a gravar, editar, usar IA e anunciar
            para transformar postagens em contatos de verdade.
          </p>
        </div>

        {/* Opening callout + video */}
        <div className="reveal mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <div className="flex flex-col justify-center motion-card rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            <p className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              "Você grava, posta… e ninguém entra em contato?"
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-200">
              O <span className="font-semibold text-white">Corretor de Autoridade</span> é para
              corretores autônomos e imobiliárias que querem atrair clientes pelas redes sociais
              e transformar postagens em contatos de verdade.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-brand-500/15 px-4 py-2 text-sm font-medium text-brand-300">
              <UserCheck className="h-4 w-4" />
              Para corretores autônomos e imobiliárias
            </div>
          </div>

          {/* Video placeholder */}
          <div className="relative min-h-[300px] overflow-hidden motion-card rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900" role="img" aria-label="Apresentação do curso Corretor de Autoridade. Vídeo em breve.">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center">
                <Logo className="mb-6 w-[176px]" />
                <span className="grid h-14 w-14 place-items-center rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400" aria-hidden="true">
                  <Play className="h-5 w-5" />
                </span>
                <p className="mt-5 text-sm font-medium text-ink-200">Vídeo promocional do curso</p>
                <p className="mt-1 text-xs text-ink-400">Em breve disponível aqui</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="reveal mt-14">
          <h3 className="font-display text-2xl font-bold text-white">Módulos</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MODULES.map((m, i) => (
              <div
                key={m.n}
                className="reveal group relative overflow-hidden motion-card rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-brand-500/40"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 blur-2xl" />
                <div className="relative flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-ink-900">
                    <m.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-4xl font-extrabold text-white/10">{m.n}</span>
                </div>
                <h4 className="mt-5 font-display text-lg font-bold text-white">
                  Módulo {m.n} — {m.title}
                </h4>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {m.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-ink-200">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={3} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus */}
        <div className="reveal mt-10 overflow-hidden motion-card rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-7 sm:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500 text-ink-900 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
                <Sparkles className="h-3.5 w-3.5" /> Bônus
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">Análise do seu perfil</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-200">
                Uma análise personalizada da sua presença nas redes, com reunião de diagnóstico
                com a equipe Fast Up.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-xl">
              {BONUS.map((b) => (
                <div key={b.title} className="rounded-2xl border border-white/10 bg-ink-900/50 p-4">
                  <b.icon className="h-5 w-5 text-brand-400" />
                  <h4 className="mt-3 text-sm font-bold text-white">{b.title}</h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-300">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="reveal mt-10">
          <h3 className="font-display text-2xl font-bold text-white">Tudo o que você recebe</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-400">
                  <d.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 text-sm font-bold text-white">{d.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300">{d.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="reveal mt-12 overflow-hidden motion-card rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-500/20 via-brand-500/10 to-transparent p-8 text-center sm:p-12">
          <BookOpen className="mx-auto h-8 w-8 text-brand-400" />
          <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Você no topo do mercado imobiliário
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-200">
            Garanta sua vaga no Corretor de Autoridade e aprenda a fazer o próprio marketing
            para atrair clientes pelas redes sociais.
          </p>
          <a
            href="https://www.instagram.com/sejafastup/"
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-ink-900 shadow-glow-lg transition-all hover:bg-brand-400 hover:scale-[1.02]"
          >
            Garanta sua vaga
            <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" strokeWidth={3} />
          </a>
        </div>
      </div>
    </section>
  );
}
