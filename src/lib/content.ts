import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '@/config/site';

export type Post = CollectionEntry<'blog'>;
export type Solucao = CollectionEntry<'solucoes'>;

const byDate = <T extends { data: { pubDate: Date } }>(a: T, b: T) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export async function getPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(byDate);
}

export async function getSolucoes() {
  return (await getCollection('solucoes', ({ data }) => !data.draft)).sort((a, b) => a.data.title.localeCompare(b.data.title, 'pt-BR'));
}

export const postUrl = (id: string) => `/blog/${id}/`;
export const solucaoUrl = (id: string) => `/solucoes/${id}/`;
export const absolute = (path: string) => new URL(path, SITE.url).href;

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Conta palavras do Markdown (ignora sintaxe de links, títulos e listas). */
export function wordCount(markdown = '') {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|\-]+/g, ' ');
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

export function readingTime(markdown = '') {
  return Math.max(1, Math.round(wordCount(markdown) / 200));
}

export const ORGANIZATION = {
  '@type': 'Organization',
  name: SITE.fullName,
  url: SITE.url,
  logo: absolute('/assets/logo-light.webp'),
  sameAs: [SITE.instagram],
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqLd(items: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  };
}
