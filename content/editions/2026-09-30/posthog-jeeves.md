---
date: "2026-09-30"
title: "PostHog releases Jeeves, a 9B decision classifier that reasons before answering"
authors: ["PostHog"]
url: "https://github.com/PostHog/jeeves"
discuss_url: "https://news.ycombinator.com/item?id=49891290"
source: github
section: models
interest_score: 7
recommended: true
must_read: false
why_read: "A direct test of whether adding reasoning to Jev-style classifiers is worth the latency. The repo gives both sides."
summary: "Jeeves: Qwen3.5-9B classifier trained with SFT and CISPO, 0.889 test accuracy vs 0.857 for Jev, at higher latency."
image: "/images/posthog-jeeves.jpg"
image_credit: "Nikodem Nijaki / Wikimedia Commons, CC BY-SA 3.0"
image_source: "https://commons.wikimedia.org/wiki/File:Balance_scale_IMGP9755.jpg"
sample: false
---

Jeeves is built on Qwen3.5-9B and described as a reasoning Jev-style classifier with a diffusion drafter, trained with SFT and CISPO. It is MIT licensed with weights on Hugging Face.

PostHog reports test accuracy of 0.889 against 0.857 for Jev, dropping to 0.804 with reasoning off. The cost is latency: about 0.3 seconds on one H100 without reasoning, 3.3 seconds median with it, and 17 seconds at the 90th percentile.
