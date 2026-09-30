---
date: "2026-09-30"
title: "OpenAI's GPT-6.1 Sol comes close to Astra at a fifth of the price"
authors: ["OpenAI"]
url: "https://openai.com/index/introducing-gpt-6-1-sol"
discuss_url: "https://news.ycombinator.com/item?id=49896586"
source: labs
section: models
interest_score: 9
recommended: true
must_read: true
why_read: "The day's biggest HN story at 900-plus points. If the benchmark claims hold, the default price of frontier-grade coding and computer use drops by roughly 5x."
summary: "GPT-6.1 Sol costs $2 input and $10 output per million tokens, one-fifth of GPT-6 Astra, and OpenAI says it matches Astra on DeepSWE."
image: "/images/gpt-6-1-sol.jpg"
image_credit: "Michal Klajban / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Sunrise_over_Benmore_Range,_New_Zealand.jpg"
sample: false
---

OpenAI released GPT-6.1 Sol at DevDay on September 29, a week after GPT-6 Sol. Its standard API prices are $2 per million input tokens, $0.10 cached and $10 output, one-fifth of GPT-6 Astra's input and output prices, according to VentureBeat and The Next Web.

OpenAI's reported results: Sol matches Astra on DeepSWE v1.1 and scores 6.4 points above GPT-6 Sol. It beats Claude Opus 5.5 by 2.2 points on AutomationBench and comes within 2.1 points of Astra on OSWorld 2.0. On Terminal-Bench Science it averaged $5.47 per task, against about $23 for Opus and Astra, though Astra scored higher. TechCrunch reports the factual error rate at low reasoning effort fell from 11.4% to 7.7%.

Sol is in the API as `gpt-6.1-sol`. In ChatGPT it is available to Plus, Pro, Business, Enterprise and Edu users in ChatGPT Work and Codex, but not yet in Chat. Codex CLI 0.159.1 made it the default model, and Cline switched most of its providers to it the same night. Simon Willison's [live blog](https://simonwillison.net/2026/Sep/29/openai-devday-2026-live-blog/) covers the rest of the keynote.
