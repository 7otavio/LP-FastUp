import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Instagram, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useActiveSection } from '@/hooks/useReveal';

const LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'curso', label: 'Curso' },
  { id: 'contato', label: 'Contato' },
];
const IDS = LINKS.map((link) => link.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const section = useActiveSection(IDS);
  const active = window.location.pathname === '/' ? section : '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      const controls = panel.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
      menuButton.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-3 focus:text-ink-900">Ir para o conteúdo</a>
      <header className={'fixed inset-x-0 top-0 z-50 transition-all duration-300 ' + (scrolled ? 'border-b border-white/10 bg-ink-900/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent')}>
        <nav aria-label="Navegação principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between container-px lg:h-20">
          <a href="/#inicio" aria-label="Fast Up — início" className="shrink-0"><Logo /></a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <a key={link.id} href={'/#' + link.id} aria-current={active === link.id ? 'location' : undefined} className={'relative rounded-full px-4 py-2 text-sm font-medium transition-colors ' + (active === link.id ? 'text-white' : 'text-ink-200 hover:text-white')}>
                {link.label}
                {active === link.id && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-brand-400" />}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="https://www.instagram.com/sejafastup/" target="_blank" rel="noreferrer noopener" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-200 transition-colors hover:border-brand-500/60 hover:text-brand-400" aria-label="Instagram da Fast Up">
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a href="/#contato" className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-glow transition-all hover:bg-brand-400 hover:shadow-glow-lg">
              Fale conosco <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={3} />
            </a>
          </div>

          <button ref={menuButton} onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-white lg:hidden" aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-menu">
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-labelledby="menu-title" className="fixed inset-0 z-[60] animate-fade-in lg:hidden">
          <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div ref={panel} className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto border-l border-white/10 bg-ink-800 p-6">
            <div className="flex items-center justify-between gap-4">
              <p id="menu-title" className="sr-only">Menu principal</p>
              <Logo className="w-[144px]" />
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 text-white" aria-label="Fechar menu"><X className="h-5 w-5" /></button>
            </div>
            <nav aria-label="Navegação móvel" className="mt-8 flex flex-col gap-1">
              {LINKS.map((link) => (
                <a key={link.id} href={'/#' + link.id} onClick={() => setOpen(false)} aria-current={active === link.id ? 'location' : undefined} className={'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ' + (active === link.id ? 'bg-brand-500/10 text-white' : 'text-ink-200 hover:bg-white/5 hover:text-white')}>
                  {link.label}<ArrowUp className="h-4 w-4 text-brand-400" />
                </a>
              ))}
            </nav>
            <a href="https://www.instagram.com/sejafastup/" target="_blank" rel="noreferrer noopener" className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3.5 text-sm font-medium text-ink-100"><Instagram className="h-4.5 w-4.5" /> @sejafastup</a>
            <a href="/#contato" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3.5 text-sm font-semibold text-ink-900">Fale conosco <ArrowUp className="h-4 w-4" strokeWidth={3} /></a>
          </div>
        </div>
      )}
    </>
  );
}
