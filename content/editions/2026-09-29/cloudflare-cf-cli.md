---
date: "2026-09-29"
title: "Cloudflare's cf CLI covers 3,000 API operations and is built for agents"
authors: ["Matt Taylor"]
url: "https://blog.cloudflare.com/cloudflare-cf-cli-launch/"
discuss_url: "https://news.ycombinator.com/item?id=49879577"
source: hn
section: agents
interest_score: 6
recommended: true
must_read: false
why_read: "A major platform designing its CLI for coding agents first: JSON by default, natural-language command search and a shipped AGENTS.md."
summary: "cf, in open beta, exposes over 3,000 Cloudflare API operations against Wrangler's ~280 commands; Wrangler gets 18 months of maintenance."
image: "/images/cloudflare-cf-cli.jpg"
image_credit: "SolarMainframe / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Mechanical_Keyboard.jpg"
sample: false
---

Cloudflare released `cf` in open beta on September 28 (`npm i -g cf`), a CLI covering more than 3,000 operations across the Cloudflare API, compared with about 280 commands in Wrangler. It outputs JSON by default, offers `cf cli search` to find commands in natural language, uses TypeScript configuration with language-server support, ships an AGENTS.md and has Vite built in.

A final major version of Wrangler will point users to `cf`, and Wrangler will be maintained for 18 months after the beta. Cloudflare describes the tool as open source but the post does not name a licence.
