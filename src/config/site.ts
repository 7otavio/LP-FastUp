/**
 * Configuração central do site e do conteúdo (blog e soluções).
 * Os campos `category`, `servico` e `publico` dos arquivos Markdown
 * só aceitam os slugs definidos aqui (o schema valida no build).
 */

export const SITE = {
  name: 'Fast Up',
  fullName: 'Fast Up — MKT Imobiliário',
  url: 'https://sejafastup.com.br',
  description:
    'Marketing digital focado no mercado imobiliário: produção de vídeo, tráfego pago e o curso Corretor de Autoridade.',
  ogImage: '/assets/brand-original-3.png',
  instagram: 'https://www.instagram.com/sejafastup/',
} as const;

/** Categorias do blog. Cada categoria tem (ou terá) um post pilar. */
export const CATEGORIES = [
  {
    slug: 'trafego-pago',
    nome: 'Tráfego pago',
    descricao: 'Meta Ads, Google Ads e campanhas para gerar contatos de compradores de imóveis.',
  },
  {
    slug: 'video-imobiliario',
    nome: 'Vídeo imobiliário',
    descricao: 'Roteiro, gravação e edição de vídeos de imóveis que prendem a atenção e geram visitas.',
  },
  {
    slug: 'leads-e-atendimento',
    nome: 'Leads e atendimento',
    descricao: 'Onde anunciar, como receber contatos e como responder para transformar lead em visita.',
  },
  {
    slug: 'gestao-comercial',
    nome: 'Gestão comercial',
    descricao: 'Funil de vendas, metas, rotina da equipe e indicadores para vender mais imóveis.',
  },
] as const;

/** Serviços que a Fast Up vende. Base das páginas de soluções. */
export const SERVICOS = [
  {
    slug: 'trafego-pago',
    nome: 'Tráfego pago',
    descricao: 'Campanhas no Meta Ads (Instagram e Facebook) com contatos direto no WhatsApp.',
  },
  {
    slug: 'video-imobiliario',
    nome: 'Produção de vídeo imobiliário',
    descricao: 'Roteiro, captação e edição de vídeos de imóveis para anúncios e redes sociais.',
  },
] as const;

/** Públicos atendidos. */
export const PUBLICOS = [
  { slug: 'imobiliarias', nome: 'Imobiliárias' },
  { slug: 'corretores', nome: 'Corretores' },
  { slug: 'incorporadoras', nome: 'Construtoras e incorporadoras' },
  { slug: 'loteadoras', nome: 'Loteadoras' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
export type ServicoSlug = (typeof SERVICOS)[number]['slug'];
export type PublicoSlug = (typeof PUBLICOS)[number]['slug'];

export const slugs = <T extends readonly { slug: string }[]>(list: T) =>
  list.map((item) => item.slug) as [T[number]['slug'], ...T[number]['slug'][]];

export const categoria = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const servico = (slug: string) => SERVICOS.find((s) => s.slug === slug);
export const publico = (slug: string) => PUBLICOS.find((p) => p.slug === slug);
