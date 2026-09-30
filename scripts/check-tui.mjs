// Layout check for the terminal reader: renders snapshots at several sizes and after navigating,
// and fails if any line is not exactly the terminal width. Needs the site running (npm run dev).
//   npm run check:tui
import { execFileSync } from 'node:child_process';
const strip = (s) => s.replace(/\x1b\[[0-9;]*m/g, '').replace(/\x1b\]52[^\x07]*\x07/g, '').replace(/\r/g, '');
const WIDE = /[\u1100-\u115f\u2e80-\u303e\u3041-\u33ff\u3400-\u4dbf\u4e00-\u9fff\ua000-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]/;
const width = (l) => [...l].reduce((n, c) => n + (WIDE.test(c) ? 2 : 1), 0);
let fail = 0;
const snap = (size, keys = '') => strip(execFileSync('node', ['bin/daily-weight.mjs', '--snapshot', '--size', size, '--keys', keys], { encoding: 'utf8' }));
for (const [size, keys, label] of [
  ['120x34', '', 'start'], ['80x24', '', 'small'], ['200x50', '', 'wide'], ['60x20', '', 'tiny'],
  ['120x34', '\tjjj', 'sidebar -> Must read'], ['120x34', '\tj\r', 'sidebar -> Sep 29'],
  ['120x34', 'jjjjj\rGG', 'reader bottom'], ['120x34', '?', 'help'],
]) {
  const [c, r] = size.split('x').map(Number);
  const lines = snap(size, keys).split('\n').filter((l, i, a) => i < a.length - 1 || l);
  const bad = lines.map((l, i) => [i, width(l)]).filter(([, w]) => w !== c);
  const ok = lines.length === r && bad.length === 0;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(22)} ${size}  lines=${lines.length}/${r}${bad.length ? '  bad widths: ' + JSON.stringify(bad.slice(0, 4)) : ''}`);
}
process.exitCode = fail ? 1 : 0;
