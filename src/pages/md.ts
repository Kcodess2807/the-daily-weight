import { getEditions, longDate, plural } from '../editions';

export async function GET() {
  const [e] = await getEditions();
  const stories = e.stories.map(({ data: d, body }) => [
    `## [${d.title}](${d.url})`,
    `By ${d.authors.join(', ')} · Source: ${d.url}${d.discuss_url ? ` · Discuss: ${d.discuss_url}` : ''}`,
    `**Why read:** ${d.why_read}`,
    body?.trim(),
  ].join('\n\n'));
  const md = [`# The Daily Weight\n\n${longDate(e.date)} · ${plural(e.stories.length)}`, ...stories].join('\n\n---\n\n');
  return new Response(md + '\n', { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
