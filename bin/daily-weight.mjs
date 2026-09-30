#!/usr/bin/env node
// The Daily Weight in the terminal: a three-pane reader (sidebar, story list, article).
// No dependencies: Node's readline for keys, ANSI escapes for drawing.
//
//   node bin/daily-weight.mjs                        reads http://localhost:4321 (npm run dev)
//   node bin/daily-weight.mjs https://your.domain    reads the published paper
//   DAILY_WEIGHT_URL=https://your.domain node bin/daily-weight.mjs
//
// Read and marked stories are remembered in ~/.daily-weight.json.
//
// Testing without a terminal: --snapshot prints one frame and exits, after replaying --keys.
//   node bin/daily-weight.mjs --snapshot --size 120x34 --keys "jj\tj"

import readline from 'node:readline';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ARGS = process.argv.slice(2);
const opt = (name) => { const i = ARGS.indexOf(name); return i >= 0 ? ARGS[i + 1] : undefined; };
const SITE = (ARGS.find((a) => /^https?:\/\//.test(a))
  ?? process.env.DAILY_WEIGHT_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const SNAPSHOT = ARGS.includes('--snapshot');
if (SNAPSHOT) {
  const [c, r] = (opt('--size') ?? '120x34').split('x').map(Number);
  Object.assign(process.stdout, { columns: c, rows: r });
}

// ---------- persistent state ----------

const STATE_FILE = join(homedir(), '.daily-weight.json');
const state = (() => {
  if (SNAPSHOT) return {}; // snapshots start clean and never touch the real file
  try { return JSON.parse(readFileSync(STATE_FILE, 'utf8')); } catch { return {}; }
})();
state.read ??= {};
state.marked ??= {};
const save = () => { if (!SNAPSHOT) try { writeFileSync(STATE_FILE, JSON.stringify(state)); } catch {} };
const idOf = (s) => `${s.date}/${s.slug}`;

// ---------- data ----------

async function getJSON(path) {
  const res = await fetch(SITE + path);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${SITE}${path}`);
  return res.json();
}
const editionCache = new Map();
const loadEdition = async (date) => {
  if (!editionCache.has(date)) editionCache.set(date, await getJSON(`/edition/${date}.json`));
  return editionCache.get(date);
};

const SECTIONS = { models: 'Models', agents: 'Agents', infra: 'Infra', research: 'Research', safety: 'Safety', industry: 'Industry' };
const SOURCES = { hn: 'HN', reddit: 'Reddit', labs: 'Labs', arxiv: 'arXiv', github: 'GitHub', press: 'Press' };

// ---------- drawing primitives ----------

const ESC = '\x1b[';
const fg = (r, g, b) => `${ESC}38;2;${r};${g};${b}m`;
const bg = (r, g, b) => `${ESC}48;2;${r};${g};${b}m`;
const RESET = `${ESC}0m`, BOLD = `${ESC}1m`, DIM = `${ESC}2m`, ITALIC = `${ESC}3m`;

// Palette: the paper's night edition with its red accent, plus one hue per tag.
const T = {
  ink: fg(232, 226, 214), muted: fg(150, 143, 131), faint: fg(90, 86, 80), accent: fg(239, 107, 115),
  gold: fg(233, 196, 106), rule: fg(70, 68, 74),
  selFocus: bg(139, 154, 232) + fg(22, 22, 30), selBlur: bg(58, 58, 72) + fg(232, 226, 214),
  statusBar: bg(139, 154, 232) + fg(22, 22, 30),
};
const CHIP = {
  models: [88, 140, 230], agents: [78, 190, 170], infra: [226, 170, 80], research: [170, 130, 230],
  safety: [230, 100, 110], industry: [120, 190, 100],
  hn: [255, 128, 40], reddit: [255, 90, 50], labs: [140, 160, 240], arxiv: [200, 70, 70], github: [160, 160, 170], press: [190, 190, 120],
};

// Display width: CJK and full-width forms take two cells.
const WIDE = /[ᄀ-ᅟ⺀-〾ぁ-㏿㐀-䶿一-鿿ꀀ-꓏가-힣豈-﫿︰-﹏＀-｠￠-￦]/;
const cw = (ch) => (WIDE.test(ch) ? 2 : 1);
const width = (s) => [...s].reduce((n, ch) => n + cw(ch), 0);

// Cut or pad plain text to exactly w cells, with an ellipsis when it had to cut.
function fit(s, w) {
  if (w <= 0) return '';
  if (width(s) <= w) return s + ' '.repeat(w - width(s));
  let out = '', n = 0;
  for (const ch of s) {
    if (n + cw(ch) > w - 1) break;
    out += ch; n += cw(ch);
  }
  return out + '…' + ' '.repeat(w - n - 1);
}

// A line made of styled pieces, fitted to w cells.
function line(pieces, w, base = '') {
  let out = '', used = 0;
  for (const [text, style = ''] of pieces) {
    if (used >= w) break;
    const room = w - used;
    const t = width(text) > room ? fit(text, room) : text;
    out += base + style + t + RESET;
    used += width(t);
  }
  return out + base + ' '.repeat(Math.max(0, w - used)) + RESET;
}

// Word wrap to w cells; words longer than a line (URLs) are split.
function wrap(text, w) {
  const lines = [];
  let cur = '';
  for (let word of text.split(/\s+/).filter(Boolean)) {
    while (width(word) > w) {
      if (cur) { lines.push(cur); cur = ''; }
      let head = '';
      for (const ch of word) { if (width(head) + cw(ch) > w) break; head += ch; }
      lines.push(head); word = word.slice(head.length);
    }
    if (!cur) cur = word;
    else if (width(cur) + 1 + width(word) <= w) cur += ' ' + word;
    else { lines.push(cur); cur = word; }
  }
  if (cur) lines.push(cur);
  return lines;
}

const plainBody = (md = '') => md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/[`*_]/g, '');
const shortDate = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
const longDate = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// ---------- app state ----------

let editions = [];        // [{date, count}]
let edition = null;       // the loaded edition
let tree = [];            // sidebar rows
let treeAt = 0, listAt = 0, listTop = 0, readerTop = 0, treeTop = 0;
let focus = 1;            // 0 sidebar, 1 list, 2 reader
let filter = { key: 'all', label: 'All stories', test: () => true };
let message = '';
let showHelp = false;

const stories = () => (edition?.stories ?? []).filter(filter.test);
const current = () => stories()[listAt];

function buildTree() {
  const all = edition?.stories ?? [];
  const count = (test) => all.filter(test).length;
  const rows = [{ header: 'Editions' }];
  for (const e of editions) rows.push({ kind: 'edition', date: e.date, label: shortDate(e.date), count: e.count });
  rows.push({ header: 'This edition' });
  const views = [
    ['all', '▸', 'All stories', () => true],
    ['unread', '○', 'Unread', (s) => !state.read[idOf(s)]],
    ['marked', '★', 'Marked', (s) => state.marked[idOf(s)]],
    ['must', '◆', 'Must read', (s) => s.must_read],
  ];
  for (const [key, icon, label, test] of views) rows.push({ kind: 'filter', key, icon, label, test, count: count(test) });
  rows.push({ header: 'Sections' });
  for (const [key, label] of Object.entries(SECTIONS)) {
    const test = (s) => s.section === key;
    if (count(test)) rows.push({ kind: 'filter', key: `section:${key}`, icon: '■', chip: key, label, test, count: count(test) });
  }
  rows.push({ header: 'Sources' });
  for (const [key, label] of Object.entries(SOURCES)) {
    const test = (s) => s.sources.includes(key);
    if (count(test)) rows.push({ kind: 'filter', key: `source:${key}`, icon: '●', chip: key, label, test, count: count(test) });
  }
  tree = rows;
  if (!tree[treeAt] || tree[treeAt].header) treeAt = tree.findIndex((r) => !r.header);
}

async function openEdition(date) {
  try {
    message = `Loading ${longDate(date)}…`; render();
    edition = await loadEdition(date);
    listAt = 0; listTop = 0; readerTop = 0; message = '';
    buildTree(); markCurrentRead(); render();
  } catch (e) { message = `Couldn't load that edition: ${e.message}`; render(); }
}

function applyTreeRow() {
  const row = tree[treeAt];
  if (!row) return;
  if (row.kind === 'edition' && row.date !== edition?.date) return openEdition(row.date);
  if (row.kind === 'filter') {
    filter = row;
    listAt = 0; listTop = 0; readerTop = 0;
    markCurrentRead(); render();
  }
}

function markCurrentRead() {
  const s = current();
  if (s && !state.read[idOf(s)]) { state.read[idOf(s)] = 1; save(); }
}

// ---------- OS helpers ----------

function openUrl(url) {
  if (!url) return (message = 'No link for that.');
  const [cmd, args] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]]
    : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  spawn(cmd, args, { detached: true, stdio: 'ignore' }).on('error', () => {}).unref();
  message = `Opened ${url}`;
}

// OSC 52 reaches the clipboard in most modern terminals, even over SSH; the native tool covers the rest.
function copy(text, what) {
  const b64 = Buffer.from(text).toString('base64');
  process.stdout.write(`\x1b]52;c;${b64}\x07`);
  // Windows PowerShell 5.1 decodes piped stdin in the OEM code page and mangles "·", "—" and
  // accents, so hand it base64 and decode as UTF-8 inside.
  const ps = `Set-Clipboard -Value ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${b64}')))`;
  const tools = process.platform === 'win32' ? [['powershell', ['-NoProfile', '-Command', ps]]]
    : process.platform === 'darwin' ? [['pbcopy', []]]
    : [['wl-copy', []], ['xclip', ['-selection', 'clipboard']], ['xsel', ['-b']]];
  for (const [cmd, args] of tools) if (spawnSync(cmd, args, { input: text }).status === 0) break;
  message = `Copied ${what}.`;
}

const storyText = (s) => [
  s.title, `${SECTIONS[s.section]} · ${longDate(s.date)} · By ${s.authors.join(', ')}`, '',
  `Why read: ${s.why_read}`, '', plainBody(s.body), '',
  `Source:  ${s.url}`, ...(s.discuss_url ? [`Discuss: ${s.discuss_url}`] : []), `Read:    ${SITE}${s.link}`,
].join('\n');

// ---------- rendering ----------

function readerLines(s, w) {
  if (showHelp) return helpLines(w);
  if (!s) return [line([['  Nothing in this view.', T.muted]], w)];
  const pad = 2, inner = Math.min(w - pad * 2, 88);
  const L = (pieces) => line([[' '.repeat(pad)], ...pieces], w);
  const chip = (key, label) => {
    const [r, g, b] = CHIP[key] ?? [150, 150, 150];
    return [` ${label} `, bg(r, g, b) + fg(20, 20, 26) + BOLD];
  };
  const tags = [chip(s.section, SECTIONS[s.section].toLowerCase())];
  for (const src of s.sources) tags.push([' '], chip(src, SOURCES[src]));
  if (s.must_read) tags.push([' '], [' must read ', bg(239, 107, 115) + fg(20, 20, 26) + BOLD]);
  else if (s.recommended) tags.push([' '], [' recommended ', bg(80, 80, 96) + T.ink]);

  const out = [
    L([]),
    L([[`${shortDate(s.date)} ── ${SOURCES[s.source]}`, T.muted]]),
    ...wrap(s.title, inner).map((t) => L([[t, BOLD + T.ink]])),
    L([[`by ${s.authors.join(', ')}`, T.muted]])
    , L(tags), L([]),
  ];
  const why = wrap(`Why read: ${s.why_read}`, inner);
  why.forEach((t, i) => out.push(L(i === 0 ? [['Why read:', BOLD + T.accent], [t.slice(9), ITALIC + T.ink]] : [[t, ITALIC + T.ink]])));
  out.push(L([]));
  for (const para of plainBody(s.body).split(/\n\s*\n/)) {
    for (const t of wrap(para, inner)) out.push(L([[t, T.ink]]));
    out.push(L([]));
  }
  out.push(L([['Source  ', T.muted], [s.url, T.ink]]));
  if (s.discuss_url) out.push(L([['Discuss ', T.muted], [s.discuss_url, T.ink]]));
  out.push(L([['Read    ', T.muted], [SITE + s.link, T.ink]]));
  if (s.image_credit) out.push(L([]), L([[`Photo: ${s.image_credit}`, T.faint]]));
  return out;
}

function helpLines(w) {
  const keys = [
    ['j / k, ↓ / ↑', 'move'], ['tab, h / l', 'switch pane'], ['enter', 'open the story (or the sidebar item)'],
    ['esc', 'back to the list'], ['space / b', 'page the article down / up'], ['g / G', 'top / bottom'],
    ['o', 'open the source in your browser'], ['d', 'open the discussion'], ['w', 'open the story on the website'],
    ['c', 'copy the story as text'], ['u', 'copy the source link'], ['m', 'mark / unmark'],
    ['r', 'toggle read'], ['R', 'mark everything in view as read'], ['?', 'this help'], ['q', 'quit'],
  ];
  return [line([], w), line([['  Keys', BOLD + T.accent]], w), line([], w),
    ...keys.map(([k, v]) => line([['  ' + k.padEnd(16), BOLD + T.ink], [v, T.muted]], w)),
    line([], w), line([[`  Reading ${SITE}`, T.faint]], w)];
}

function render() {
  if (!SNAPSHOT) process.stdout.write(frame());
}

function frame() {
  const W = process.stdout.columns || 100, H = process.stdout.rows || 30;
  const bodyH = H - 1;
  const LW = Math.max(22, Math.min(34, Math.floor(W * 0.26)));
  const RW = W - LW - 1;
  const list = stories();
  const LH = Math.max(4, Math.min(list.length + 1, Math.floor(bodyH * 0.4)));
  const RH = bodyH - LH - 1;

  // sidebar
  const left = [line([[' THE DAILY WEIGHT', BOLD + T.accent]], LW)];
  const visible = bodyH - 1;
  if (treeAt < treeTop) treeTop = treeAt;
  if (treeAt >= treeTop + visible) treeTop = treeAt - visible + 1;
  tree.slice(treeTop, treeTop + visible).forEach((row, i) => {
    const at = treeTop + i;
    if (row.header) return left.push(line([[` ▾ ${row.header}`, BOLD + T.muted]], LW));
    const active = row.kind === 'edition' ? row.date === edition?.date : row.key === filter.key;
    const selected = at === treeAt;
    const base = selected ? (focus === 0 ? T.selFocus : T.selBlur) : '';
    const count = String(row.count);
    const iconStyle = row.chip ? fg(...CHIP[row.chip]) : row.key === 'marked' ? T.gold : row.key === 'must' ? T.accent : T.muted;
    const icon = row.kind === 'edition' ? (active ? '●' : '○') : row.icon;
    const labelW = LW - 7 - count.length;
    left.push(line([
      ['   '], [icon, selected ? '' : iconStyle], [' '],
      [fit(row.label, labelW), (active ? BOLD : '') + (selected ? '' : row.count ? T.ink : T.faint)],
      [` ${count} `, selected ? '' : ITALIC + T.muted],
    ], LW, base));
  });
  while (left.length < bodyH) left.push(line([], LW));

  // story list
  if (listAt < listTop) listTop = listAt;
  if (listAt >= listTop + LH - 1) listTop = listAt - LH + 2;
  const heading = edition ? `${longDate(edition.date)} · ${filter.label} · ${list.length}` : 'Loading…';
  const right = [line([[' ' + heading, BOLD + T.muted]], RW)];
  list.slice(listTop, listTop + LH - 1).forEach((s, i) => {
    const at = listTop + i, id = idOf(s), selected = at === listAt;
    const base = selected ? (focus === 1 ? T.selFocus : T.selBlur) : '';
    const unread = !state.read[id];
    right.push(line([
      [' '], [unread ? '●' : '○', selected ? '' : unread ? T.accent : T.faint], [' '],
      [state.marked[id] ? '★' : ' ', selected ? '' : T.gold], [' '],
      [s.must_read ? '◆' : s.recommended ? '◇' : ' ', selected ? '' : T.accent], ['  '],
      [fit(SECTIONS[s.section], 9), selected ? '' : fg(...CHIP[s.section])],
      [fit(SOURCES[s.source], 7), selected ? '' : T.muted],
      [s.title, selected ? BOLD : (unread ? BOLD + T.ink : T.muted)],
    ], RW, base));
  });
  if (!list.length && edition) right.push(line([['  No stories in this view.', T.muted]], RW));
  while (right.length < LH) right.push(line([], RW));
  right.push(T.rule + '─'.repeat(RW) + RESET);

  // article
  const article = readerLines(current(), RW);
  readerTop = Math.max(0, Math.min(readerTop, Math.max(0, article.length - RH)));
  right.push(...article.slice(readerTop, readerTop + RH));
  while (right.length < bodyH) right.push(line([], RW));

  // status bar
  const hints = 'j/k move · tab pane · enter open · o source · d discuss · c copy · m mark · ? keys · q quit';
  const pct = article.length > RH ? ` ${Math.round(((readerTop + RH) / article.length) * 100)}% ` : '';
  const status = line([[fit(` ${message || hints}`, W - width(pct))], [pct]], W, T.statusBar);

  const border = focus === 0 ? T.accent : T.rule;
  let out = `${ESC}H`;
  for (let r = 0; r < bodyH; r++) out += left[r] + border + '│' + RESET + right[r] + '\r\n';
  return out + status;
}

// ---------- input ----------

function move(delta) {
  if (focus === 0) {
    let i = treeAt;
    do { i += delta; } while (tree[i]?.header);
    // Filters apply as you move; editions wait for Enter so passing over one doesn't load it.
    if (tree[i]) { treeAt = i; if (tree[i].kind === 'filter') applyTreeRow(); }
  } else if (focus === 1) {
    const n = stories().length;
    listAt = Math.max(0, Math.min(n - 1, listAt + delta));
    readerTop = 0; markCurrentRead();
  } else {
    readerTop = Math.max(0, readerTop + delta);
  }
}

function onKey(str, key = {}) {
  message = '';
  const s = current();
  const page = Math.max(1, (process.stdout.rows || 30) - 12);
  if (key.ctrl && key.name === 'c') return quit();
  // Printable keys by character, so Shift+g arrives as 'G' and Shift+r as 'R'; others by name.
  const k = key.name === 'tab' ? (key.shift ? 'S-tab' : 'tab')
    : str === ' ' ? 'space' : str && /^[!-~]$/.test(str) ? str : key.name;
  switch (k) {
    case 'q': return quit();
    case 'j': case 'down': move(1); break;
    case 'k': case 'up': move(-1); break;
    case 'tab': focus = (focus + 1) % 3; break;
    case 'S-tab': focus = (focus + 2) % 3; break;
    case 'h': case 'left': focus = Math.max(0, focus - 1); break;
    case 'l': case 'right': focus = Math.min(2, focus + 1); break;
    case 'return': if (focus === 0) { applyTreeRow(); focus = 1; } else focus = 2; break;
    case 'escape': showHelp = false; focus = 1; break;
    case 'space': case 'pagedown': readerTop += page; break;
    case 'b': case 'pageup': readerTop = Math.max(0, readerTop - page); break;
    case 'g': case 'home': if (focus === 2) readerTop = 0; else move(-1e6); break;
    case 'o': openUrl(s?.url); break;
    case 'd': openUrl(s?.discuss_url); break;
    case 'w': openUrl(s && SITE + s.link); break;
    case 'c': if (s) copy(storyText(s), 'the story'); break;
    case 'u': if (s) copy(s.url, 'the source link'); break;
    case 'm': if (s) { state.marked[idOf(s)] ? delete state.marked[idOf(s)] : (state.marked[idOf(s)] = 1); save(); buildTree(); } break;
    case 'r': if (s) { state.read[idOf(s)] ? delete state.read[idOf(s)] : (state.read[idOf(s)] = 1); save(); buildTree(); } break;
    case '?': showHelp = !showHelp; break;
    case 'G': case 'end': if (focus === 2) readerTop = 1e6; else move(1e6); break;
    case 'R': for (const x of stories()) state.read[idOf(x)] = 1; save(); buildTree(); message = 'Marked everything in view as read.'; break;
    default: return;
  }
  render();
}

// ---------- lifecycle ----------

function restoreTerminal() {
  process.stdout.write(`${RESET}${ESC}?25h${ESC}?1049l`);
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
}

function quit(code = 0) {
  restoreTerminal();
  process.exit(code);
}

// Replays keys like vim's normal mode: \t is tab, \r is enter, \e is escape.
async function snapshot() {
  editions = await getJSON('/editions.json');
  await openEdition(editions[0].date);
  const names = { '\t': 'tab', '\r': 'return', '\x1b': 'escape' };
  for (const ch of (opt('--keys') ?? '').replace(/\\t/g, '\t').replace(/\\r/g, '\r').replace(/\\e/g, '\x1b')) {
    onKey(ch, { name: names[ch] ?? (/[a-z]/.test(ch) ? ch : undefined), shift: /[A-Z]/.test(ch) });
    await new Promise((r) => setTimeout(r, 0)); // let edition loads finish
    while (message.startsWith('Loading')) await new Promise((r) => setTimeout(r, 20));
  }
  process.stdout.write(frame().replace(`${ESC}H`, '') + '\n');
}

async function main() {
  if (SNAPSHOT) return snapshot();
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error('The Daily Weight reader needs an interactive terminal. For plain text, use: curl -s ' + SITE + '/txt');
    process.exit(1);
  }
  try {
    editions = await getJSON('/editions.json');
  } catch (e) {
    console.error(`Couldn't reach The Daily Weight at ${SITE} (${e.cause?.code ?? e.message}).`);
    console.error(existsSync('package.json')
      ? 'Start the site with `npm run dev` in another terminal, or pass the paper\'s address: npm run tui -- https://your.domain'
      : 'Pass the paper\'s address: daily-weight https://your.domain');
    process.exit(1);
  }
  if (!editions.length) { console.error('No editions published yet.'); process.exit(1); }

  process.stdout.write(`${ESC}?1049h${ESC}?25l${ESC}2J`);
  process.on('uncaughtException', (e) => { restoreTerminal(); console.error(e); process.exit(1); });
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', onKey);
  process.stdout.on('resize', () => { process.stdout.write(`${ESC}2J`); render(); });
  await openEdition(editions[0].date);
}

main();
