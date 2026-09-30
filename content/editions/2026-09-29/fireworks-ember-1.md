---
date: "2026-09-29"
title: "Fireworks says Ember-1 matches Kimi K3 with fewer reasoning tokens"
authors: ["Fireworks Research"]
url: "https://fireworks.ai/blog/ember-1"
discuss_url: "https://news.ycombinator.com/item?id=49868830"
source: hn
section: models
interest_score: 7
recommended: false
must_read: false
why_read: "Token efficiency is a cost lever. The post reports both benchmark and live A/B numbers."
summary: "Ember-1 research preview: Fireworks claims Kimi K3 quality with ~40% fewer tokens."
image: "/images/fireworks-ember-1.jpg"
image_credit: "Maksym Kozlenko / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:2020-06-06_Hot_coals_glowing_in_darkness.jpg"
sample: false
---

Fireworks Research says Ember-1, built on Kimi K3, delivers K3's quality with 40% fewer tokens by training out unnecessary reasoning. It reports 82.0% on Terminal Bench 2.1 against 80.9% for K3 max with 51.9% fewer tokens, and 92.2% against 93.2% on SWE-bench Verified with 15.5% fewer tokens.

Live A/B tests with two customers showed about 35% fewer tokens per task at comparable quality; in one, reasoning tokens fell 71.3% while the score held at 0.753 against 0.751. Ember-1 is a research preview on Fireworks Serverless; the post does not state weights, licence or price.
