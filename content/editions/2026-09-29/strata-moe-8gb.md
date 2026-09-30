---
date: "2026-09-29"
title: "Strata runs a 125B mixture-of-experts model on an 8GB GPU"
authors: ["Niko1221"]
url: "https://github.com/Niko1221/Strata"
discuss_url: null
source: github
section: infra
interest_score: 6
recommended: true
must_read: false
why_read: "Expert offloading on llama.cpp that makes a frontier-sized open MoE usable on a consumer card, provided you have 64 GB of system RAM."
summary: "Qwen3.8-Flash-Next (125B MoE) at 60-95 tokens/s on an RTX 5070, with an OpenAI- and Anthropic-compatible local API."
image: "/images/strata-moe-8gb.jpg"
image_credit: "Colin Park / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Rock_strata,_Garden_Cliff,_Westbury-on-Severn_-_geograph.org.uk_-_7679331.jpg"
sample: false
---

Strata, created September 24 and past 2,000 stars within days, claims to run Qwen3.8-Flash-Next, a 125B-parameter mixture-of-experts model, on an NVIDIA GPU with 8 GB or more, as long as the machine has 64 GB of RAM. It is built on llama.cpp and ggml.

The README reports 60 to 95 tokens per second on an RTX 5070; its Q2_0 configuration reaches 93 tokens per second for generation and 2,170 for prompt processing. It serves an OpenAI- and Anthropic-compatible API on localhost, so coding agents can point at it directly. Licence: MIT.
