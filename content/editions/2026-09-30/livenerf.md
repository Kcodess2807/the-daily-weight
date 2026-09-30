---
date: "2026-09-30"
title: "LiveNerf tests daily whether Opus 5.5 gets worse after launch"
authors: ["ninjahawk"]
url: "https://github.com/ninjahawk/livenerf"
discuss_url: "https://news.ycombinator.com/item?id=49901736"
source: hn
section: research
interest_score: 7
recommended: true
must_read: false
why_read: "Nerf claims come up after every launch and are rarely measured. This one is pre-registered, controlled and honest about its detection limit."
summary: "A 78-question panel run daily for 30 days against Opus 5.5, with Opus 5 as a control; no change detected yet, and results are held until day 20."
image: "/images/livenerf.jpg"
image_credit: "Jacek Halicki / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:2023_Areometr_Ballinga.jpg"
sample: false
---

LiveNerf is an independent tracker, unaffiliated with Anthropic, that asks one question: does a model get worse after it ships? It runs Claude Opus 5.5 through a Claude Code Max subscription every day, with Claude Opus 5 as a control for platform-wide drift.

The panel is 78 questions from GPQA Diamond, MMLU-Pro, competition maths and AIME 2025-26. Each was chosen because the model gets it right 30-70% of the time, so small shifts in quality show up. Results are compared with a launch-week baseline using clustered standard errors, and output token counts are tracked as a sign of reduced effort. The author states the limit: it can detect about a 7.5-point change per 10-day window, and it could not tell Opus 5 from Opus 5.5.

As of September 29 it had six of 30 days collected and no change detected. On HN, the 540-point thread split between people pointing to real past regressions and people who say the perception is mostly users reaching a model's limits.
