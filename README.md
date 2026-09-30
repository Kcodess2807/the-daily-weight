# The Daily Weight

An AI newspaper. One dated edition per day, and the page ends at the bottom.

## Run

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Routes

- `/` — latest edition
- `/edition/YYYY-MM-DD` — any edition
- `/edition/YYYY-MM-DD/slug` — one story, with photo and full text
- `/archive` — every edition
- `/rss.xml`, `/md`, `/json` — feeds for readers and agents (`/md` and `/json` serve the latest edition)
- `/editions.json`, `/edition/YYYY-MM-DD.json` — every edition's date and count, and any edition in full
- `/txt` — the latest edition as plain text, 80 columns, for terminals: `curl -s <site>/txt | less`. In Windows PowerShell `curl` is an alias for `Invoke-WebRequest`; type `curl.exe` instead. Locally: `curl.exe -s http://localhost:4321/txt`

## Read it in the terminal

```sh
npm run tui                          # reads the local site (npm run dev in another terminal)
npm run tui -- https://your.domain   # reads the published paper
```

A three-pane reader in the style of [eilmeldung](https://www.reddit.com/r/CLI/comments/1qxbw8b/eilmeldung_a_tui_rss_reader/): a sidebar tree (editions as Today / Yesterday, your views, sections, sources), a short story list, and the article in a rounded panel with tag pills, on a Catppuccin-style pastel palette. The app paints its own background, so it looks the same on light and dark terminal themes. The focused pane's header and selection turn lavender, and the status bar shows the current story's link. No dependencies; works in Windows Terminal, Warp, macOS and Linux terminals.

| Key | Does |
|---|---|
| `j`/`k` or arrows | move (scrolls when the article has focus) |
| `J`/`K` or `n`/`p` | next / previous story, from any pane |
| `/` | search the current view as you type; `enter` keeps it, `esc` clears it |
| `tab`, `h`/`l` | switch pane (the focused pane's header turns lavender) |
| `enter` | read the story, or open the sidebar item (editions load on enter) |
| `space`/`b`, `g`/`G` | page the article, jump to top/bottom |
| `o` / `d` / `w` | open the source / the discussion / the story on the website |
| `c` / `u` | copy the story as text / copy the source link |
| `m` / `r` / `R` | mark, toggle read, mark all in view read |
| `?` / `q` | keys / quit |

A story counts as read after it has been on screen for a moment or when you open it, not when you scroll past it. Links in the article are clickable in terminals that support it (Windows Terminal, iTerm2, kitty, GNOME Terminal). Terminals without 24-bit colour get the nearest 256-colour match. Read and marked stories are remembered in `~/.daily-weight.json`. The reader uses `/editions.json` and `/edition/<date>.json`, which any other client can use too. `npm run check:tui` checks its layout at several terminal sizes.

## Make today's edition

```sh
npm run edition
```

This does two things:

1. `scripts/fetch.mjs` collects candidates from the last 36 hours into `drafts/YYYY-MM-DD.json`. No dependencies, no keys. Sources:
   - **Labs:** OpenAI, Google DeepMind, Google AI and Hugging Face blog feeds, plus Anthropic's sitemap (it has no feed)
   - **Press:** TechCrunch AI, The Verge AI, Ars Technica and Simon Willison, the last two filtered to AI
   - **Community:** Hacker News (AI stories from 10 points, plus every 150+ point story for the editor to judge), Lobsters `ai`, and Reddit's top of the day across r/LocalLLaMA, r/MachineLearning, r/OpenAI and r/ClaudeAI (one combined RSS request; Reddit blocks its JSON API and rate-limits hard)
   - **Papers:** Hugging Face daily papers, which are arXiv papers ranked by community upvotes
   - **Code:** stable releases from about 30 watch-list repos (edit `REPOS`), AI repos on GitHub Trending (daily and weekly), and new repos from the past week with 100+ stars. Uses `$GITHUB_TOKEN` or your `gh` login if present, since anonymous GitHub allows only 60 requests an hour

   A link found in several places is merged into one candidate with `seen_on` listing where. X/Twitter isn't fetched: its API needs a paid key and the free mirrors are gone, so the editor web-searches for anything major that broke there.
2. Claude Code runs headless (`claude -p`) with `scripts/editor-prompt.md`. It also checks the Anthropic and Meta AI newsrooms, which have no feeds. It then picks 20 to 30 stories (fewer on a quiet day, never padded), opens each primary source and writes only what it confirms. It adds a photo with `scripts/images.mjs` and runs the build. It uses your existing Claude Code login.

Read the new edition before publishing. The editor is told to drop anything it can't verify, but a human pass is still the last check.

To rebuild a past edition, fetch its window and point the editor at it, e.g. for a week-long catch-up issue:

```sh
node scripts/fetch.mjs 2026-09-29 180
claude -p "Follow scripts/editor-prompt.md for the edition dated 2026-09-29, using drafts/2026-09-29.json" \
  --allowedTools "Read,Write,Edit,Glob,Grep,WebFetch,WebSearch,Bash(node scripts/images.mjs:*),Bash(node scripts/drop.mjs:*),Bash(npm run build)"
```

The editor keeps an existing edition's stories that still hold up and removes the rest with `scripts/drop.mjs`.

`npm run fetch` runs step 1 on its own; pass a date (`node scripts/fetch.mjs 2026-10-01`) to build a past or future edition window.

## Add a story by hand

Create `content/editions/YYYY-MM-DD/some-slug.md`. The folder is the edition; `date` must match it.
Front matter is validated at build time (see `src/content.config.ts`):

```md
---
date: "2026-10-01"
title: "What happened, stated plainly"
authors: ["Who wrote the source"]
url: "https://..."
discuss_url: "https://news.ycombinator.com/item?id=..."   # or null
source: hn            # labs | press | hn | reddit | arxiv | github
section: infra        # models | agents | infra | research | safety | industry
interest_score: 7     # 1-10, sets order within the edition
recommended: true
must_read: false
why_read: "One or two sentences on why a builder should spend the time."
summary: "One line, used in RSS."
image: "/images/some-slug.jpg"   # file in public/images, or null
image_credit: "Author / Wikimedia Commons, CC BY-SA 4.0"   # shown as the photo caption
image_source: "https://commons.wikimedia.org/wiki/File:..."  # optional link for the credit
sample: false
---

Two or three short paragraphs. Explain what it is and why it matters, then link out. Do not reprint the original.
```

A new date folder is a new edition. The newest date becomes `/`.

## Editorial rules

AI only: models, agents, infra, research, safety, and industry news with technical consequence.
No tips-and-tricks lists, prompt packs, or duplicate coverage of one event.
Write specific, calm and mechanistic. No "game-changer", no emoji.

## Design rule

If it looks like a startup landing page, you broke it.

The front page follows the digital editions of Hindustan Times and Times of India: nameplate over a double rule, dark section bar, a lead story with a large photo, secondary stories, a ranked headline rail, then section boxes three across with column rules.
Lora for headlines, PT Serif for text, PT Sans for navigation, kickers and captions. One red accent for section marks.
All colours and type live as variables at the top of `src/styles/main.css`. No rounded cards, drop shadows or gradients.
JavaScript is used only for filters and the Day/Night toggle, and the page reads fine without it.

Use freely licensed photos (Wikimedia Commons, CC0/CC BY/CC BY-SA) and always fill in the credit. Avoid photos of real people or brand logos on stories they have nothing to do with.

## License

Code is MIT (see `LICENSE`). Story photos keep their own Creative Commons or public-domain licences from Wikimedia Commons, credited on each story page.
