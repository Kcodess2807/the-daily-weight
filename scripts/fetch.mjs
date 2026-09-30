// Gathers candidate stories for one edition into drafts/YYYY-MM-DD.json.
// No dependencies: Node 18+ fetch and a few regexes. Picking and writing stories is the editor's job
// (see scripts/editor-prompt.md, run by `npm run edition`).
//
//   node scripts/fetch.mjs              today's date, last 36 hours
//   node scripts/fetch.mjs 2026-10-01   a specific edition date
//
// Not covered: X/Twitter. Its API needs a paid key and the free mirrors are gone; the editor
// prompt asks Claude to web-search for anything big that broke there.

import { mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const date = process.argv[2] ?? new Date().toISOString().slice(0, 10);
const until = new Date(`${date}T12:00:00Z`).getTime(); // editions go out around midday UTC
const since = until - 36 * 3600 * 1000;
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; TheDailyWeight/0.2; daily AI news digest)' };

// Lab and company blogs. Anthropic has no feed, so it comes from its sitemap below.
const LAB_FEEDS = {
  OpenAI: 'https://openai.com/news/rss.xml',
  'Google DeepMind': 'https://deepmind.google/blog/rss.xml',
  'Google AI': 'https://blog.google/technology/ai/rss/',
  'Hugging Face': 'https://huggingface.co/blog/feed.xml',
};
// News outlets and writers; `aiOnly` feeds carry other topics too and get filtered.
const PRESS_FEEDS = {
  TechCrunch: { url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  'The Verge': { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
  'Ars Technica': { url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', aiOnly: true },
  'Simon Willison': { url: 'https://simonwillison.net/atom/everything/', aiOnly: true },
};
const SUBREDDITS = ['LocalLLaMA', 'MachineLearning', 'OpenAI', 'ClaudeAI'];
// Stable releases from these repos are always candidates. ponytail: hand-kept list; add to it as the beat changes.
const REPOS = [
  // inference and serving
  'vllm-project/vllm', 'sgl-project/sglang', 'ggml-org/llama.cpp', 'ollama/ollama', 'NVIDIA/TensorRT-LLM',
  'huggingface/text-generation-inference', 'ml-explore/mlx', 'ml-explore/mlx-lm', 'exo-explore/exo', 'LMCache/LMCache',
  // training and kernels
  'pytorch/pytorch', 'huggingface/transformers', 'unslothai/unsloth', 'axolotl-ai-cloud/axolotl',
  'Dao-AILab/flash-attention', 'triton-lang/triton', 'deepspeedai/DeepSpeed', 'jax-ml/jax', 'tinygrad/tinygrad',
  // agents, coding tools, protocols
  'openai/codex', 'anthropics/claude-code', 'google-gemini/gemini-cli', 'Aider-AI/aider', 'cline/cline',
  'All-Hands-AI/OpenHands', 'browser-use/browser-use', 'modelcontextprotocol/modelcontextprotocol',
  'langchain-ai/langgraph', 'stanfordnlp/dspy', 'microsoft/autogen', 'openai/openai-agents-python',
  // apps
  'open-webui/open-webui', 'comfyanonymous/ComfyUI',
];
// GitHub allows 60 requests/hour without a token, which the watch list alone would exhaust.
// Use $GITHUB_TOKEN, or the GitHub CLI's login if it's installed; fall back to anonymous.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || (() => {
  try { return execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; }
})();
const GH = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};
// A title hint, not a gate: product names change weekly, so the big HN stories go to the editor
// even when this misses (see hn()). "gpt" has no leading \b so ChatGPT/GPTs match.
const AI = /gpt|\b(ai|a\.i\.|llms?|ml|machine learning|deep learning|claude|opus|sonnet|haiku|gemini|gemma|openai|anthropic|deepmind|mistral|llama|qwen|deepseek|kimi|glm|grok|xai|jev|codex|copilot|cursor|agents?|agentic|chatbots?|inference|transformers?|diffusion|neural|models?|benchmarks?|evals?|fine-?tun\w*|rlhf|tokens?|gpus?|tpus?|cuda|nvidia|mcp|hugging ?face|robot\w*|facial recognition|face scans?|alignment|interpretability)\b/i;
const AI_DOMAINS = /(openai|anthropic|deepmind|huggingface|arxiv|mistral|x\.ai|together|fireworks|groq|cerebras|ollama|lmsys|meta\.com\/ai|ai\.google|nvidia)\./i;
const isAI = (title, url = '') => AI.test(title) || AI_DOMAINS.test(url);

const inWindow = (t) => t >= since && t <= until;
const iso = (t) => new Date(t).toISOString();
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) => s.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (m, e) =>
  e[0] !== '#' ? NAMED[e] ?? m : String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const tag = (xml, name) => decode(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1]
  ?.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '');

// Retries HTTP 429 with backoff; Reddit and Wikimedia both rate-limit bursts.
async function get(url, as = 'json', headers = {}) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { headers: { ...UA, ...headers } });
    if (res.ok) return as === 'json' ? res.json() : res.text();
    if (res.status !== 429 || attempt === 3) throw new Error(`${res.status} ${url}`);
    await sleep(attempt * 6000);
  }
}

// RSS <item> and Atom <entry> in one pass; returns items inside the window.
async function feed(url) {
  const xml = await get(url, 'text');
  return xml.split(/<item[\s>]|<entry[\s>]/).slice(1).map((it) => ({
    title: tag(it, 'title'),
    url: it.match(/<link[^>]*href="([^"]+)"/)?.[1] ?? tag(it, 'link'),
    published: Date.parse(tag(it, 'pubDate') || tag(it, 'published') || tag(it, 'updated') || tag(it, 'dc:date')),
    blurb: (tag(it, 'description') || tag(it, 'summary') || tag(it, 'content')).slice(0, 400),
    author: tag(it, 'dc:creator') || tag(it, 'name'),
    subreddit: it.match(/<category[^>]*label="(r\/\w+)"/)?.[1],
  })).filter((i) => i.title && inWindow(i.published)).map((i) => ({ ...i, published: iso(i.published) }));
}

async function labs() {
  const out = [];
  for (const [lab, url] of Object.entries(LAB_FEEDS)) {
    out.push(...(await feed(url)).map((i) => ({ source: 'labs', lab, ...i })));
  }
  // Anthropic: sitemap lastmod is the best date signal it publishes (it also moves on edits).
  const map = await get('https://www.anthropic.com/sitemap.xml', 'text');
  for (const [, loc, mod] of map.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    if (/\/(news|research|engineering)\/|\/claude-[\w-]+$/.test(loc) && inWindow(Date.parse(mod))) {
      out.push({ source: 'labs', lab: 'Anthropic', title: loc.split('/').pop().replace(/-/g, ' '), url: loc,
        published: iso(Date.parse(mod)), note: 'title from URL slug; open the page for the real headline' });
    }
  }
  return out;
}

async function press() {
  const out = [];
  for (const [outlet, { url, aiOnly }] of Object.entries(PRESS_FEEDS)) {
    out.push(...(await feed(url)).filter((i) => !aiOnly || AI.test(`${i.title} ${i.blurb}`))
      .map((i) => ({ source: 'press', outlet, ...i })));
  }
  return out;
}

async function hn() {
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=1000`
    + `&numericFilters=created_at_i>${since / 1000},created_at_i<${until / 1000},points>=10`;
  const { hits } = await get(url);
  // AI-looking stories from 10 points up (smaller launches, Show HNs and incident reports live
  // at 10-40), plus every front-page-sized story (150+) flagged ai_match: false, so a headline
  // that never says "AI" still reaches the editor.
  return hits.filter((h) => isAI(h.title, h.url) || h.points >= 150).map((h) => ({
    source: 'hn', title: h.title, url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
    discuss_url: `https://news.ycombinator.com/item?id=${h.objectID}`,
    published: h.created_at, points: h.points, comments: h.num_comments, ai_match: isAI(h.title, h.url),
  }));
}

// Reddit blocks unauthenticated JSON and rate-limits RSS hard, so fetch every subreddit
// in one combined "top of the day" feed; its order stands in for score.
async function reddit() {
  const items = await feed(`https://www.reddit.com/r/${SUBREDDITS.join('+')}/top/.rss?t=day&limit=60`);
  return items.map((i, rank) => ({ source: 'reddit', subreddit: i.subreddit, rank: rank + 1, ...i, discuss_url: i.url }));
}

async function lobsters() {
  return (await get('https://lobste.rs/t/ai.json'))
    .filter((s) => inWindow(Date.parse(s.created_at)))
    .map((s) => ({ source: 'hn', site: 'Lobsters', title: s.title, url: s.url || s.comments_url,
      discuss_url: s.comments_url, published: iso(Date.parse(s.created_at)), points: s.score }));
}

// arXiv via Hugging Face daily papers: community-upvoted, so it's the signal, not the firehose.
async function papers() {
  const days = [date, new Date(until - 86400000).toISOString().slice(0, 10)];
  const seen = new Map();
  for (const d of days) {
    for (const p of await get(`https://huggingface.co/api/daily_papers?date=${d}`)) seen.set(p.paper.id, p);
  }
  return [...seen.values()]
    .sort((a, b) => b.paper.upvotes - a.paper.upvotes).slice(0, 30)
    .map(({ paper: p }) => ({
      source: 'arxiv', title: p.title.replace(/\s+/g, ' '), url: `https://arxiv.org/abs/${p.id}`,
      discuss_url: `https://huggingface.co/papers/${p.id}`, published: p.publishedAt, upvotes: p.upvotes,
      organization: p.organization?.fullname ?? null, github: p.githubRepo ?? null,
      authors: p.authors.map((a) => a.name).slice(0, 8), blurb: (p.summary ?? '').replace(/\s+/g, ' ').slice(0, 600),
    }));
}

// GitHub from three angles: releases of the repos the beat depends on, what's trending today and
// this week, and brand-new AI repos gathering stars. Star counts can be gamed; the editor judges.
async function github() {
  const out = [];
  const api = (path) => get(`https://api.github.com${path}`, 'json', GH);

  const releases = await Promise.all(REPOS.map((repo) => settle(`github ${repo}`, async () =>
    (await api(`/repos/${repo}/releases?per_page=5`))
      // Skip drafts, pre-releases, nightlies and llama.cpp's per-commit bNNNN builds.
      .filter((r) => !r.draft && !r.prerelease && !/nightly|alpha|preview|rc\d*$|^b\d+$/i.test(r.tag_name))
      .filter((r) => inWindow(Date.parse(r.published_at)))
      .map((r) => ({ source: 'github', kind: 'release', repo, title: `${repo} ${r.name || r.tag_name}`,
        url: r.html_url, published: r.published_at, blurb: (r.body ?? '').slice(0, 800) })))));
  out.push(...releases.flat());

  // ponytail: scrapes github.com/trending HTML (no API exists); breaks if GitHub changes markup
  for (const since of ['daily', 'weekly']) {
    const html = await get(`https://github.com/trending?since=${since}`, 'text');
    for (const row of html.split('<article class="Box-row">').slice(1)) {
      const repo = row.match(/<h2[^>]*>\s*<a[^>]*href="\/([^"]+)"/)?.[1];
      const about = decode(row.match(/<p class="col-9[^>]*>([\s\S]*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '');
      const gained = Number(row.match(/([\d,]+) stars (today|this week)/)?.[1]?.replace(/,/g, '') ?? 0);
      if (repo && AI.test(`${repo} ${about}`)) {
        out.push({ source: 'github', kind: `trending-${since}`, repo, title: `Trending (${since}): ${repo}`,
          url: `https://github.com/${repo}`, published: iso(until), stars_gained: gained, blurb: about });
      }
    }
  }

  // New this week and already past 100 stars. Search allows 10 requests/minute anonymously.
  const week = new Date(until - 7 * 86400000).toISOString().slice(0, 10);
  for (const term of ['llm', 'agent', 'mcp', 'model', 'inference']) {
    const { items = [] } = await api(`/search/repositories?sort=stars&order=desc&per_page=15&q=${
      encodeURIComponent(`created:>=${week} stars:>=100 ${term} in:name,description,topics`)}`);
    out.push(...items.map((r) => ({ source: 'github', kind: 'new-repo', repo: r.full_name, title: `New: ${r.full_name}`,
      url: r.html_url, published: r.created_at, stars: r.stargazers_count, blurb: r.description ?? '' })));
  }
  return out;
}

// One failing source shouldn't sink the edition; record it and carry on.
const errors = [];
const settle = async (name, fn) => {
  try { return await fn(); } catch (e) { errors.push(`${name}: ${e.message}`); return []; }
};
const pools = await Promise.all(Object.entries({ labs, press, hn, reddit, lobsters, papers, github })
  .map(([name, fn]) => settle(name, fn)));

// The same link often arrives from several places (a lab feed and its HN thread): merge, don't drop,
// so the story keeps its discussion link and the editor sees how widely it travelled.
const byUrl = new Map();
for (const c of pools.flat().filter((c) => c.url)) {
  const key = c.url.replace(/[?#].*$/, '').replace(/\/$/, '');
  const prev = byUrl.get(key);
  if (!prev) { byUrl.set(key, { ...c, seen_on: [c.site ?? c.source] }); continue; }
  prev.seen_on.push(c.site ?? c.source);
  for (const k of ['discuss_url', 'points', 'comments', 'upvotes']) prev[k] ??= c[k];
}
const candidates = [...byUrl.values()];

mkdirSync('drafts', { recursive: true });
const file = `drafts/${date}.json`;
writeFileSync(file, JSON.stringify({ date, window: { since: iso(since), until: iso(until) }, errors, candidates }, null, 2));

const counts = Object.groupBy(candidates, (c) => c.site ?? c.source);
console.log(`${file}: ${candidates.length} candidates`,
  Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, v.length])));
if (errors.length) console.warn('Source errors:\n  ' + errors.join('\n  '));
