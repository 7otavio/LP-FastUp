import type { APIRoute } from 'astro';
import { absolute, getPosts, getSolucoes, postUrl, solucaoUrl } from '@/lib/content';

const day = (date: Date) => date.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const solucoes = await getSolucoes();
  const latest = [...posts, ...solucoes].map((e) => e.data.updatedDate ?? e.data.pubDate).sort((a, b) => b.valueOf() - a.valueOf())[0];

  const urls: { loc: string; lastmod?: string }[] = [
    { loc: '/' },
    { loc: '/proprietarios/' },
    { loc: '/blog/', lastmod: latest ? day(latest) : undefined },
    { loc: '/solucoes/', lastmod: latest ? day(latest) : undefined },
    ...posts.map((p) => ({ loc: postUrl(p.id), lastmod: day(p.data.updatedDate ?? p.data.pubDate) })),
    ...solucoes.map((s) => ({ loc: solucaoUrl(s.id), lastmod: day(s.data.updatedDate ?? s.data.pubDate) })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${absolute(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
