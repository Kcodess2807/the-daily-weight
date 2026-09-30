---
date: "2026-09-29"
title: "Jev, a model that returns typed decisions instead of text"
authors: ["Diogo Almeida"]
url: "https://typesafe.ai/blog/introducing-system-one-models-and-jev"
discuss_url: "https://news.ycombinator.com/item?id=49717558"
source: labs
section: models
interest_score: 8
recommended: true
must_read: false
why_read: "Jev launched September 15 and dominated launch week: DSPy, Ollama and a wave of open clones adopted its decision API. This is the original."
summary: "TypeSafe AI's Jev returns calibrated typed decisions in 70-500 ms at $0.042 per million input tokens."
image: "/images/typesafe-jev.jpg"
image_credit: "Alvesgaspar / Wikimedia Commons, CC BY-SA 3.0"
image_source: "https://commons.wikimedia.org/wiki/File:Navigational_compass.jpg"
sample: false
---

TypeSafe AI's Jev does not generate natural-language text. It takes unstructured state and returns typed, calibrated probabilistic decisions, sampled in parallel. The company calls it a "System One" model and says it is trained with Reinforcement Learning for Calibrated Decisions.

TypeSafe claims 70 to 500 ms latency and $0.042 per million input tokens, with output "too cheap to meter"; it has not disclosed the model's size, and access is by waitlist. The Register notes that the "hallucination-free" framing does not make a structured answer correct.

This week the idea spread through the tooling. [DSPy 3.4](https://github.com/stanfordnlp/dspy/releases/tag/3.4.0) added experimental Noul, Choice and Score types backed by Jev, Ollama 0.35 began serving Jev-style models, and open imitations such as Jeff and Ollaya appear elsewhere in this edition. The most-upvoted explainer, Duarte O. Carmo's self-described parody ["Jev in 25 Lines of Python"](https://www.nobodywho.ai/posts/jev-in-25-lines/) ([HN](https://news.ycombinator.com/item?id=49812769)), shows the core trick: read an LLM's logits over the option tokens and normalise them into probabilities, without RLCD.
