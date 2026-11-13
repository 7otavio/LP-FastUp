# Fast Up — Marketing Imobiliário

Site responsivo da Fast Up, com serviços de produção de vídeo e tráfego pago, curso Corretor de Autoridade, contato pelo Instagram e página para proprietários.

O projeto usa Astro (com React para a landing), TypeScript, Tailwind CSS e Remotion. O blog e as páginas de solução são gerados em HTML estático a partir de arquivos Markdown. A identidade visual segue o briefing da Fast Up: preto, verde e branco, com as logos originais.

## Executar localmente

Use Node.js 24 e execute:

```sh
npm ci
npm run dev
```

Abra o endereço exibido pelo Astro, normalmente `http://localhost:4321`.

## Verificar e gerar o site

```sh
npm run check
```

O comando roda `astro check` (tipos e schemas), `astro build` (gera `dist/`) e `scripts/validar-site.mjs` (links internos, títulos e descriptions únicos, um H1 por página, canibalização de palavra-chave e tamanho mínimo do conteúdo). Para conferir essa versão:

```sh
npm run preview
```

## Publicar no Netlify

Importe este repositório no Netlify. O arquivo `netlify.toml` já define:

| Configuração | Valor |
| --- | --- |
| Diretório base | Raiz do repositório |
| Comando de build | `npm run check` |
| Diretório de publicação | `dist` |
| Node.js | `24` |
| Variáveis de ambiente | Nenhuma necessária |

Para publicação manual, execute `npm run check` e envie a pasta `dist/` pelo Netlify Drop. Mais detalhes em [docs/netlify.md](docs/netlify.md).

## Estrutura

- `src/pages/`: rotas do site. `index.astro` e `proprietarios.astro` carregam a landing em React; `blog/` e `solucoes/` geram as páginas de conteúdo; `sitemap.xml.ts` gera o sitemap com todas as páginas.
- `src/App.tsx` e `src/components/`: landing (seções, navegação e componentes visuais).
- `src/components/site/`: cabeçalho, FAQ, breadcrumb e chamada para ação das páginas de conteúdo.
- `src/layouts/`: `BaseLayout.astro` (meta tags, canonical, Open Graph) e `ContentLayout.astro` (blog e soluções).
- `src/content/blog/` e `src/content/solucoes/`: conteúdo em Markdown.
- `src/content.config.ts`: schemas obrigatórios dos posts e das soluções.
- `src/config/site.ts`: categorias do blog (`CATEGORIES`), serviços (`SERVICOS`) e públicos (`PUBLICOS`).
- `scripts/validar-site.mjs`: validação de SEO e conteúdo rodada no `npm run check`.
- `docs/seo/pauta.md`: histórico das rodadas de conteúdo.
- `public/`: logos, imagens, favicon, `robots.txt`, `_redirects` e `404.html`.

## Páginas

- `/`: serviços, quem somos, curso e contato.
- `/proprietarios/`: corretagem com marketing para proprietários (`/proprietarios.html` redireciona para cá).
- `/blog/` e `/blog/<slug>/`: posts.
- `/solucoes/` e `/solucoes/<slug>/`: serviço aplicado a um nicho.

## Blog: como publicar um post

1. Crie `src/content/blog/<slug>.md`. O nome do arquivo vira a URL `/blog/<slug>/`.
2. Preencha o frontmatter conforme o schema `blog` de `src/content.config.ts`:

```yaml
---
title: "Título com a palavra-chave principal (até 70 caracteres)"
description: "Resumo único de 120 a 160 caracteres."
pubDate: 2026-11-12
category: trafego-pago # um slug de CATEGORIES em src/config/site.ts
keywords:
  - palavra-chave principal (a primeira é a principal)
  - variação
faq: # 3 ou 4 perguntas
  - pergunta: "Pergunta?"
    resposta: "Resposta direta."
pillar: false # true só no post pilar da categoria
---
```

3. Escreva o corpo em Markdown, com 1.100 a 1.800 palavras. Não use `#` (o título já é o H1); use `##` para os subtítulos, que viram o sumário.
4. Inclua pelo menos 3 links internos com URL relativa terminando em `/`: o post pilar da categoria, 1 ou 2 posts relacionados e 1 página de `/solucoes/<slug>/`.
5. Rode `npm run check` e corrija os erros apontados.

Páginas de solução seguem o schema `solucoes` (veja `src/content/solucoes/trafego-pago-para-loteamentos.md` como exemplo): slug `<servico>-para-<nicho>`, corpo de 300 a 500 palavras com 2 ou 3 subtítulos `##` e 2 ou 3 posts em `relacionados`.

Regras de conteúdo: nada de estatísticas, preços, cases ou resultados inventados (números só em exemplos marcados como hipotéticos), nada de páginas por cidade ou bairro e nada de travessão longo no texto.
