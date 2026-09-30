// Layout check for the terminal reader: renders snapshots at several sizes and after navigating,
// and fails if any line is not exactly the terminal width. Needs the site running (npm run dev).
//   npm run check:tui
import { execFileSync } from 'node:child_process';
// Colour codes and OSC sequences (clipboard, hyperlinks) take no cells on screen.
const strip = (s) => s.replace(/\x1b\[[0-9;]*m/g, '').replace(/\x1b\][0-9]+;[^\x07]*\x07/g, '').replace(/\r/g, '');
const WIDE = /[\u1100-\u115f\u2e80-\u303e\u3041-\u33ff\u3400-\u4dbf\u4e00-\u9fff\ua000-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]/;
const width = (l) => [...l].reduce((n, c) => n + (WIDE.test(c) ? 2 : 1), 0);
let fail = 0;
const raw = (size, keys = '') => execFileSync('node', ['bin/daily-weight.mjs', '--snapshot', '--size', size, '--keys', keys],
  { encoding: 'utf8', env: { ...process.env, COLORTERM: 'truecolor' } });
const snap = (size, keys) => strip(raw(size, keys));
for (const [size, keys, label] of [
  ['120x34', '', 'start'], ['80x24', '', 'small'], ['200x50', '', 'wide'], ['60x20', '', 'tiny'],
  ['120x34', 'hjjjjj', 'sidebar -> Must read'], ['120x34', 'hj\r', 'sidebar -> Sep 29'],
  ['120x34', 'jjjjj\rGG', 'reader bottom'], ['120x34', '?', 'help'], ['120x34', '/openai', 'searching'],
]) {
  const [c, r] = size.split('x').map(Number);
  const lines = snap(size, keys).split('\n').filter((l, i, a) => i < a.length - 1 || l);
  const bad = lines.map((l, i) => [i, width(l)]).filter(([, w]) => w !== c);
  const ok = lines.length === r && bad.length === 0;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(22)} ${size}  lines=${lines.length}/${r}${bad.length ? '  bad widths: ' + JSON.stringify(bad.slice(0, 4)) : ''}`);
}

// Behaviour: what the screen says after a key sequence.
const expect = (label, keys, test, get = snap) => {
  const ok = test(get('120x34', keys));
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
};
const heading = (out) => out.split('\n')[0]; // pane headers: sidebar, then the list's label
const count = (out) => Number(heading(out).match(/· (\d+) ─/)?.[1]);
const statusBar = (out) => out.trimEnd().split('\n').at(-1);
// The line carrying the focused selection bar (lavender background).
const focusedLine = (rawOut) => strip(rawOut.split('\n').find((l) => l.includes('48;2;180;190;254;')
  || l.includes('48;2;180;190;254m')) ?? '');
expect('search narrows the list and names the query', '/openai\r',
  (o) => heading(o).includes('"openai"') && count(o) > 0 && count(o) < count(snap('120x34')));
expect('a search with no matches says how to clear it', '/zzqqxx\r', (o) => o.includes('Nothing matches "zzqqxx". Esc clears'));
expect('esc clears the search', '/openai\r\x1b', (o) => !heading(o).includes('"openai"'));
expect('J moves to the next story from the article pane', '\rJ', (o) => /\b2\/\d+/.test(statusBar(o)));
expect('the status bar shows the position', 'jj', (o) => /\b3\/\d+/.test(statusBar(o)));
// The sidebar's first edition row reads "Today", "Yesterday" or a date, depending on the day you run this.
const editionRow = /\b(Today|Yesterday|[A-Z][a-z]{2}, [A-Z][a-z]{2} \d+) \d+/;
expect('the list has focus at start', '', (o) => focusedLine(o).length > 0 && !editionRow.test(focusedLine(o)), raw);
expect('h moves focus to the sidebar', 'h', (o) => editionRow.test(focusedLine(o)), raw);

process.exitCode = fail ? 1 : 0;
