import { EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '@/contact';
import { ArrowUp, Instagram, MessageCircle, Mail } from 'lucide-react';
import { Logo } from './Logo';

const NAV = [
  { id: 'inicio', label: 'Início' },
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'curso', label: 'Curso' },
  { id: 'contato', label: 'Contato' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="/" aria-label="Fast Up — início" className="inline-block"><Logo className="w-[200px]" /></a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              Marketing digital focado no mercado imobiliário. Produção de vídeo, tráfego pago e
              estratégia para corretores, imobiliárias e proprietários.
            </p>
            <p className="mt-4 font-display text-sm font-semibold text-white">
              Você no topo do mercado imobiliário.
            </p>
            <a
              href="https://www.instagram.com/sejafastup/"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-ink-200 transition-colors hover:border-brand-500/50 hover:text-brand-400"
            >
              <Instagram className="h-4 w-4" /> @sejafastup
            </a>
            <div className="mt-4 space-y-2 text-sm text-ink-200">
              <a href={whatsappLink()} target="_blank" rel="noreferrer noopener" className="flex items-center gap-2 transition-colors hover:text-brand-400">
                <MessageCircle className="h-4 w-4 text-brand-400" /> {WHATSAPP_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition-colors hover:text-brand-400">
                <Mail className="h-4 w-4 text-brand-400" /> {EMAIL}
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">Navegação</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`/#${n.id}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-200 transition-colors hover:text-white"
                  >
                    <ArrowUp className="h-3.5 w-3.5 text-brand-500/0 transition-colors group-hover:text-brand-400" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services summary */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">O que fazemos</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-200">
              <li>Produção de vídeo imobiliário</li>
              <li>Tráfego pago (Meta Ads)</li>
              <li><a href="/proprietarios.html" className="transition-colors hover:text-brand-300">Para proprietários — corretagem ↗</a></li>
              <li>Curso Corretor de Autoridade</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Fast Up · MKT Imobiliário. Todos os direitos reservados.
          </p>
          <p className="text-xs text-ink-400">
            <span className="text-brand-400">Fast</span>, porque o mercado não espera ·{' '}
            <span className="text-brand-400">Up</span>, porque o objetivo é sempre crescer.
          </p>
        </div>
      </div>
    </footer>
  );
}
