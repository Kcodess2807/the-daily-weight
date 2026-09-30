---
date: "2026-09-30"
title: "One word per prompt is enough to transfer a coding skill between models"
authors: ["Ziyang Zhang", "Yubin Jing", "Yuanhao Zeng", "Yuyao Li", "Haofan Wang", "Yichen Gong"]
url: "https://arxiv.org/abs/2609.29233"
discuss_url: null
source: arxiv
section: research
interest_score: 7
recommended: true
must_read: false
why_read: "If post-training leaks through single-word choices on unrelated prompts, distillation defences and data-provenance arguments both get harder. The setup is small enough to reproduce."
summary: "Active Taskless Distillation moves a coding skill from teacher to student using one teacher word per unrelated prompt, adding 5.34 points on HumanEval+."
image: "/images/behavioral-shadows.jpg"
image_credit: "Neil Owen / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Wall_of_shadows_-_geograph.org.uk_-_3705059.jpg"
sample: false
---

The paper introduces Active Taskless Distillation (ATD). A teacher and a student share a base model. ATD looks for prompts where that base model is nearly indifferent between two ordinary words, asks the teacher which word it prefers, and trains the student only on those prompt-word pairs. The student never sees task examples, teacher logits or weights.

In the main experiment on Qwen2.5-1.5B, 5,664 such single-word responses raise HumanEval+ from 45.88% to 51.22%, measured against a control that shuffles the prompt-response pairings. Across five independent runs the gain averages 4.80 points. The authors also report smaller positive effects on six other benchmarks and on Qwen3-1.7B, Qwen3-4B and Llama-3.2-1B.

The claim extends prior work on subliminal learning from traits and preferences to capabilities, and with far less teacher output. Code is on [GitHub](https://github.com/myboker/ATD).
