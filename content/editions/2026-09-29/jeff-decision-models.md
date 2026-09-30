---
date: "2026-09-29"
title: "Jeff: open Jev-style decision models from 0.8B, trained on one GPU"
authors: ["firelex"]
url: "https://github.com/firelex/jeff"
discuss_url: "https://news.ycombinator.com/item?id=49883844"
source: github
section: models
interest_score: 7
recommended: true
must_read: false
why_read: "A reproducible, permissively licensed take on calibrated single-pass classification that runs in about 25 ms on a laptop."
summary: "Three fine-tuned classifiers (0.8B, 2B, Gemma E2B) return calibrated option probabilities in one forward pass; code MIT, weights Apache-2.0."
image: "/images/jeff-decision-models.jpg"
image_credit: "Bill Boaden / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Railway_tracks_and_points_at_Clapham_Junction_-_geograph.org.uk_-_2552768.jpg"
sample: false
---

Jeff is an independent project, unaffiliated with TypeSafe, that fine-tunes small open models to behave like Jev: given a question and options, it returns a calibrated probability for each option from a single forward pass rather than generating text. It ships three models: Jeff-Qwen3.5-0.8B, Jeff-Qwen3.5-2B and Jeff-Gemma4-E2B.

The 0.8B model's median latency is 22 ms on an RTX PRO 6000, 28 ms on an M4 Max with MLX and 463 ms on CPU. Training took about two hours on one RTX PRO 6000 for the 0.8B and 3.5 hours for the 2B, using public synthetic and benchmark data such as MASSIVE and CLINC150. Across five benchmarks the author reports 79.1% for the 0.8B, 82.0% for the 2B and 81.6% for the Gemma variant. Code is MIT and weights Apache-2.0.
