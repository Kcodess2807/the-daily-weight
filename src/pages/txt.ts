import type { APIContext } from 'astro';
import { SECTIONS, getEditions, href, longDate, plural } from '../editions';

// The edition as plain text for terminals: 80 columns, no markup, clean to copy or pipe.
//   curl -s https://<site>/txt | less
const WIDTH = 80;

// Greedy word wrap with a hanging indent. Long URLs stay whole rather than being split.
function wrap(text: string, indent = '', width = WIDTH): string {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (line && indent.length + line.length + 1 + word.length > width) {
      lines.push(indent + line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(indent + line);
  return lines.join('\n');
}

// "12. Title that wraps" with continuation lines aligned under the title, not the number.
const numbered = (n: number, text: string) => `${String(n).padStart(2)}. ${wrap(text, '    ').slice(4)}`;

// Story bodies are light Markdown: keep link targets, drop the syntax.
const plain = (md: string) =>
  md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/[`*_]/g, '');

export async function GET({ site }: APIContext) {
  const [e] = await getEditions();
  const base = new URL('/', site).href.replace(/\/$/, '');
  const rule = '='.repeat(WIDTH);

  const head = [
    'The Daily Weight',
    'An AI Newspaper',
    `${longDate(e.date)} · ${plural(e.stories.length)}`,
    rule,
    '',
    ...e.stories.map((s, i) => numbered(i + 1, s.data.title)),
    '',
    rule,
  ];

  const stories = e.stories.map((s, i) => {
    const d = s.data;
    const grade = d.must_read ? ' · Must read' : d.recommended ? ' · Recommended' : '';
    return [
      numbered(i + 1, d.title),
      wrap(`${SECTIONS[d.section]}${grade} · By ${d.authors.join(', ')}`, '    '),
      '',
      wrap(`Why read: ${d.why_read}`, '    '),
      '',
      (s.body ?? '').trim().split(/\n\s*\n/).map((p) => wrap(plain(p), '    ')).join('\n\n'),
      '',
      `    Source:  ${d.url}`,
      ...(d.discuss_url ? [`    Discuss: ${d.discuss_url}`] : []),
      `    Read:    ${base}${href(s)}`,
    ].join('\n');
  });

  const foot = [rule, `Archive ${base}/archive · RSS ${base}/rss.xml · JSON ${base}/json`];
  const txt = [...head, '', stories.join(`\n\n${'-'.repeat(WIDTH)}\n\n`), '', ...foot].join('\n');
  return new Response(txt + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
