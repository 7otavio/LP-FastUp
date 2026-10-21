import { EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '@/contact';
import { ArrowUpRight, MessageCircle, Mail, Video, GraduationCap } from 'lucide-react';
import { Logo } from './Logo';


export function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden section-py">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl container-px">
        <div className="reveal grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">Contato</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Vamos dar um <span className="text-gradient-green">Up</span> no seu negócio
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-200">
              Conte para a Fast Up o que você precisa pelo WhatsApp. A resposta é rápida, afinal, somos Fast.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex gap-3">
                <Video className="mt-1 h-5 w-5 shrink-0 text-brand-400" />
                <p className="text-sm leading-relaxed text-ink-200"><strong className="text-white">Para corretores e imobiliárias.</strong> Produção de vídeo e tráfego pago para dar visibilidade e gerar contatos.</p>
              </div>
              <div className="flex gap-3">
                <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-brand-400" />
                <p className="text-sm leading-relaxed text-ink-200"><strong className="text-white">Para aprender a fazer o próprio marketing.</strong> Conheça o curso Corretor de Autoridade.</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-500/10 via-ink-800 to-ink-900 p-7 sm:p-10">
            <Logo className="w-[192px]" />
            <div className="mt-10 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-400">
                <MessageCircle className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-300">Nosso WhatsApp</p>
                <p className="mt-1 text-lg font-bold text-white">{WHATSAPP_DISPLAY}</p>
              </div>
            </div>
            <h3 className="mt-7 font-display text-2xl font-bold text-white">Seu próximo passo começa com uma conversa.</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-200">Fale com a equipe sobre os serviços ou tire suas dúvidas sobre o curso.</p>
            <a href={whatsappLink()} target="_blank" rel="noreferrer noopener" className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-4 text-base font-bold text-ink-900 shadow-glow transition-all hover:bg-brand-400 hover:shadow-glow-lg">
              Falar no WhatsApp
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-300 transition-colors hover:text-brand-300">
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
