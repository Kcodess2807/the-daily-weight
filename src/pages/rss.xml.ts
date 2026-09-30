import type { APIContext } from 'astro';
import { getEditions } from '../editions';

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

export async function GET({ site }: APIContext) {
  const home = new URL('/', site).href;
  const items = (await getEditions()).flatMap((e) =>
    e.stories.map(({ data: d }) => `
    <item>
      <title>${esc(d.title)}</title>
      <link>${esc(d.url)}</link>
      <guid isPermaLink="false">${esc(`${e.date}/${d.url}`)}</guid>
      <pubDate>${new Date(`${e.date}T06:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(`Why read: ${d.why_read} ${d.summary}`)}</description>
    </item>`),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Daily Weight</title>
    <link>${home}</link>
    <description>An AI Newspaper</description>${items.join('')}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
