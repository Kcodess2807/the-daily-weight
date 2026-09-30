---
date: "2026-09-30"
title: "Jeff v1.1: small open models that answer multiple-choice decisions in one pass"
authors: ["firelex"]
url: "https://github.com/firelex/jeff/releases/tag/v1.1"
discuss_url: "https://news.ycombinator.com/item?id=49883844"
source: github
section: models
interest_score: 7
recommended: true
must_read: false
why_read: "An open, local take on Jev-style decision models, with published latency and accuracy numbers you can reproduce."
summary: "Jeff: 0.8B and 2B open models for calibrated multiple-choice decisions, ~22 ms per call; v1.1 supports up to 254 options."
image: "/images/jeff-v1-1.jpg"
image_credit: "W.carter / Wikimedia Commons, Public domain"
image_source: "https://commons.wikimedia.org/wiki/File:Railway_switch_lever_on_Gr%C3%B6t%C3%B6.jpg"
sample: false
---

Jeff fine-tunes Qwen3.5 and Gemma 4 into 0.8B and 2B models that pick between options with a calibrated probability in a single forward pass. It uses the same request format as TypeSafe's Jev but states it is not affiliated. Code is MIT and weights are Apache 2.0 on Hugging Face.

The README reports about 22 ms per decision on an RTX PRO 6000 and 79.1% (0.8B) and 82.0% (2B) average accuracy across five benchmarks. Version 1.1 raises the option limit from 26 to 254, and the 0.8B model's long-list accuracy went from 40.3% to 94.7%.
