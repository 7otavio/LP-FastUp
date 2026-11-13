import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES, PUBLICOS, SERVICOS, slugs } from './config/site';

const faq = z
  .array(
    z.object({
      pergunta: z.string().min(10),
      resposta: z.string().min(40),
    }),
  );

/**
 * Posts do blog: src/content/blog/<slug>.md
 * A URL final é /blog/<slug>/.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(20).max(90),
    description: z.string().min(120).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(slugs(CATEGORIES)),
    /** A primeira palavra-chave é a principal (usada na checagem de canibalização). */
    keywords: z.array(z.string().min(3)).min(1),
    faq: faq.min(3).max(4),
    /** Post pilar da categoria (guia mais completo, que os outros posts linkam). */
    pillar: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/**
 * Páginas de solução: src/content/solucoes/<servico>-para-<nicho>.md
 * A URL final é /solucoes/<slug>/.
 */
const solucoes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solucoes' }),
  schema: z.object({
    title: z.string().min(20).max(90),
    description: z.string().min(120).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    servico: z.enum(slugs(SERVICOS)),
    publico: z.enum(slugs(PUBLICOS)),
    /** Nome do nicho como aparece no texto, ex.: "loteamentos". */
    nicho: z.string().min(3),
    keywords: z.array(z.string().min(3)).min(1),
    /** Frase de abertura exibida logo abaixo do título. */
    resumo: z.string().min(80).max(320),
    dores: z
      .array(z.object({ titulo: z.string().min(5), texto: z.string().min(40) }))
      .min(3)
      .max(5),
    processo: z
      .array(z.object({ titulo: z.string().min(5), texto: z.string().min(40) }))
      .min(3)
      .max(6),
    entregas: z.array(z.string().min(10)).min(3).max(8),
    faq: faq.min(3).max(5),
    /** 2 ou 3 slugs de posts existentes em src/content/blog/. */
    relacionados: z.array(reference('blog')).min(2).max(3),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, solucoes };
