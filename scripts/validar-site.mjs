#!/usr/bin/env node
/**
 * Validação de SEO e conteúdo do site da Fast Up.
 * Roda depois do `astro build` (npm run check). Falha (exit 1) se houver erro.
 *
 * Conteúdo (src/content):
 *  - tamanho do corpo (posts: 1.100 a 1.800 palavras; soluções: 300 a 500)
 *  - description com 120 a 160 caracteres
 *  - links internos mínimos (posts: 3, incluindo /blog/ e /solucoes/; soluções: 1 para /blog/)
 *  - links internos em Markdown terminando com "/"
 *  - subtítulos ## (soluções: 2 ou 3)
 *  - slug de solução no padrão <servico>-para-<nicho>
 *  - canibalização: palavra-chave principal (keywords[0]) repetida entre páginas
 *  - soluções do mesmo serviço com mais da metade das dores ou etapas iguais
 *  - travessão longo (—) no texto
 *
 * Site gerado (dist):
 *  - um único <h1> por página (exceto páginas renderizadas só no navegador)
 *  - <title>, meta description e canonical presentes e únicos
 *  - todos os links internos apontam para páginas que existem
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse as parseYaml } from 'yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const CONTENT = join(ROOT, 'src/content');

const erros = [];
const avisos = [];
const erro = (onde, msg) => erros.push(`${onde}: ${msg}`);
const aviso = (onde, msg) => avisos.push(`${onde}: ${msg}`);

const LIMITES = {
  blog: { min: 1100, max: 1800, links: 3 },
  solucoes: { min: 300, max: 500, h2Min: 2, h2Max: 3 },
  description: { min: 120, max: 160 },
};

function walk(dir, ext) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full, ext);
    return full.endsWith(ext) ? [full] : [];
  });
}

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function contarPalavras(markdown) {
  const texto = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|\-]+/g, ' ');
  return texto.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;
}

function lerMarkdown(arquivo) {
  const bruto = readFileSync(arquivo, 'utf8');
  const m = bruto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${arquivo}: frontmatter não encontrado`);
  return { data: parseYaml(m[1]) ?? {}, body: m[2], bruto };
}

/* ---------------- Conteúdo ---------------- */

const paginas = []; // { tipo, slug, arquivo, data, body }
for (const tipo of ['blog', 'solucoes']) {
  for (const arquivo of walk(join(CONTENT, tipo), '.md')) {
    const slug = relative(join(CONTENT, tipo), arquivo).replace(/\.md$/, '');
    try {
      const { data, body } = lerMarkdown(arquivo);
      if (data.draft) continue;
      paginas.push({ tipo, slug, arquivo: relative(ROOT, arquivo), data, body });
    } catch (e) {
      erro(relative(ROOT, arquivo), e.message);
    }
  }
}

const linksInternos = (body) => [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);

for (const p of paginas) {
  const onde = p.arquivo;
  const palavras = contarPalavras(p.body);
  const desc = String(p.data.description ?? '');

  if (desc.length < LIMITES.description.min || desc.length > LIMITES.description.max) {
    erro(onde, `description com ${desc.length} caracteres (esperado ${LIMITES.description.min} a ${LIMITES.description.max})`);
  }
  if (/^#\s/m.test(p.body)) erro(onde, 'o corpo não pode ter título # (H1). Use ## para subtítulos.');

  const textoTodo = JSON.stringify(p.data) + p.body;
  if (textoTodo.includes('—')) erro(onde, 'tem travessão longo (—). Troque por vírgula, ponto ou dois-pontos.');

  const links = linksInternos(p.body);
  for (const link of links) {
    const caminho = link.split('#')[0];
    if (caminho && !caminho.endsWith('/')) erro(onde, `link interno sem "/" no final: ${link}`);
  }

  if (p.tipo === 'blog') {
    const lim = LIMITES.blog;
    if (palavras < lim.min) erro(onde, `corpo com ${palavras} palavras (mínimo ${lim.min})`);
    if (palavras > lim.max) aviso(onde, `corpo com ${palavras} palavras (recomendado até ${lim.max})`);
    if (String(p.data.title ?? '').length > 70) aviso(onde, `título com ${p.data.title.length} caracteres (recomendado até 70)`);
    const unicos = new Set(links.map((l) => l.split('#')[0]));
    if (unicos.size < lim.links) erro(onde, `tem ${unicos.size} links internos distintos (mínimo ${lim.links})`);
    if (![...unicos].some((l) => l.startsWith('/solucoes/'))) erro(onde, 'precisa linkar pelo menos 1 página de /solucoes/');
    if (![...unicos].some((l) => l.startsWith('/blog/'))) erro(onde, 'precisa linkar pelo menos 1 outro post do /blog/');
    if ([...unicos].includes(`/blog/${p.slug}/`)) erro(onde, 'o post linka para ele mesmo');
  }

  if (p.tipo === 'solucoes') {
    const lim = LIMITES.solucoes;
    if (palavras < lim.min) erro(onde, `corpo com ${palavras} palavras (mínimo ${lim.min})`);
    if (palavras > lim.max) aviso(onde, `corpo com ${palavras} palavras (recomendado até ${lim.max})`);
    const h2 = (p.body.match(/^##\s/gm) ?? []).length;
    if (h2 < lim.h2Min || h2 > lim.h2Max) erro(onde, `corpo com ${h2} subtítulos ## (esperado ${lim.h2Min} a ${lim.h2Max})`);
    if (!links.some((l) => l.startsWith('/blog/'))) erro(onde, 'o corpo precisa de pelo menos 1 link para um post do /blog/');
    if (!p.slug.startsWith(`${p.data.servico}-para-`)) erro(onde, `slug fora do padrão <servico>-para-<nicho> (servico: ${p.data.servico})`);
  }
}

// Canibalização: palavra-chave principal repetida
const porKeyword = new Map();
for (const p of paginas) {
  const kw = normalizar(String(p.data.keywords?.[0] ?? ''));
  if (!kw) {
    erro(p.arquivo, 'sem palavra-chave principal (keywords[0])');
    continue;
  }
  if (porKeyword.has(kw)) erro(p.arquivo, `canibalização: a palavra-chave principal "${p.data.keywords[0]}" já é usada em ${porKeyword.get(kw)}`);
  else porKeyword.set(kw, p.arquivo);
}

// Títulos repetidos entre páginas de conteúdo
const porTitulo = new Map();
for (const p of paginas) {
  const t = normalizar(String(p.data.title ?? ''));
  if (porTitulo.has(t)) erro(p.arquivo, `título igual ao de ${porTitulo.get(t)}`);
  else porTitulo.set(t, p.arquivo);
}

// Soluções do mesmo serviço parecidas demais
const solucoes = paginas.filter((p) => p.tipo === 'solucoes');
for (let i = 0; i < solucoes.length; i++) {
  for (let j = i + 1; j < solucoes.length; j++) {
    const a = solucoes[i];
    const b = solucoes[j];
    if (a.data.servico !== b.data.servico) continue;
    for (const campo of ['dores', 'processo']) {
      const ta = (a.data[campo] ?? []).map((x) => normalizar(x.titulo));
      const tb = new Set((b.data[campo] ?? []).map((x) => normalizar(x.titulo)));
      const iguais = ta.filter((t) => tb.has(t)).length;
      const menor = Math.min(ta.length, tb.size) || 1;
      if (iguais / menor > 0.5) erro(a.arquivo, `${campo}: ${iguais} títulos iguais aos de ${b.arquivo}. Reescreva para o nicho.`);
    }
  }
}

/* ---------------- Site gerado ---------------- */

if (!existsSync(DIST)) {
  erro('dist', 'pasta dist/ não encontrada. Rode `astro build` antes.');
} else {
  const htmls = walk(DIST, '.html').filter((f) => !f.endsWith('/404.html'));
  const titulos = new Map();
  const descricoes = new Map();

  const existe = (href) => {
    let caminho = href.split('#')[0].split('?')[0];
    if (caminho === '') return true;
    caminho = decodeURIComponent(caminho);
    if (caminho.endsWith('/')) return existsSync(join(DIST, caminho, 'index.html'));
    return existsSync(join(DIST, caminho)) || existsSync(join(DIST, caminho, 'index.html'));
  };

  for (const arquivo of htmls) {
    const html = readFileSync(arquivo, 'utf8');
    const url = '/' + relative(DIST, arquivo).replace(/index\.html$/, '');
    const soNoNavegador = html.includes('client="only"');

    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (!soNoNavegador && h1 !== 1) erro(url, `tem ${h1} <h1> (esperado 1)`);

    const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
    if (!titulo) erro(url, 'sem <title>');
    else if (titulos.has(titulo)) erro(url, `<title> igual ao de ${titulos.get(titulo)}`);
    else titulos.set(titulo, url);

    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim();
    if (!desc) erro(url, 'sem meta description');
    else if (descricoes.has(desc)) erro(url, `meta description igual à de ${descricoes.get(desc)}`);
    else descricoes.set(desc, url);

    if (!/<link rel="canonical" href="https:\/\/sejafastup\.com\.br\//.test(html)) erro(url, 'sem canonical absoluto');

    for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      const href = m[1].replace(/&amp;/g, '&');
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      if (!existe(href)) erro(url, `link interno quebrado: ${href}`);
    }
  }

  for (const req of ['sitemap.xml', 'robots.txt']) {
    if (!existsSync(join(DIST, req))) erro('dist', `${req} não foi gerado`);
  }
}

/* ---------------- Resultado ---------------- */

if (avisos.length) {
  console.log(`\n⚠️  ${avisos.length} aviso(s):`);
  for (const a of avisos) console.log('  - ' + a);
}
if (erros.length) {
  console.error(`\n❌ ${erros.length} erro(s):`);
  for (const e of erros) console.error('  - ' + e);
  process.exit(1);
}
console.log(`\n✅ Validação ok: ${paginas.filter((p) => p.tipo === 'blog').length} posts, ${solucoes.length} soluções.`);
