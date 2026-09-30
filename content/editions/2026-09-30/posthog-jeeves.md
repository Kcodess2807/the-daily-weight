---
date: "2026-09-30"
title: "PostHog's Jeeves: an open 9B classifier that reasons before deciding"
authors: ["PostHog"]
url: "https://github.com/PostHog/jeeves"
discuss_url: "https://news.ycombinator.com/item?id=49891290"
source: github
section: models
interest_score: 7
recommended: true
must_read: false
why_read: "The strongest open answer yet to TypeSafe's Jev. MIT-licensed, drop-in for Jev's SDK, and ahead of it on held-out classification."
summary: "Jeeves, a Qwen3.5-9B LoRA with a pointer head trained by SFT then CISPO RL, scores 0.889 held-out accuracy against Jev's 0.857."
image: "/images/posthog-jeeves.jpg"
image_credit: "Michael Gäbler / Wikimedia Commons, CC BY-SA 3.0"
image_source: "https://commons.wikimedia.org/wiki/File:Erinaceus_europaeus_(Linnaeus,_1758).jpg"
sample: false
---

Jeeves is a 9B "reasoning classifier": Qwen3.5-9B with a LoRA and a pointer head that picks an answer after a short chain of reasoning. PostHog trained it with supervised fine-tuning on 19,126 questions from 12 public datasets plus synthetic policy data, then with CISPO reinforcement learning on 9,992 questions.

On PostHog's held-out test set it scores 0.889, against 0.857 for Jev and 0.822 for Kev-9B. On JevBench it scores 0.935 against 0.866 on the public tiers and 0.865 against 0.730 on the hard tier. It is weaker on knowledge-heavy sets: 0.793 against Jev's 0.900 on MMLU. PostHog's argument is that letting a decision model reason first helps on policy-style questions.

It is a drop-in replacement for Jev's Python SDK for yes/no, multiple-choice and rating questions, under MIT. For background, Sebastian Raschka's [history of text classification](https://magazine.sebastianraschka.com/p/classifier-history-and-jev), published the same day, ends with Jev.
