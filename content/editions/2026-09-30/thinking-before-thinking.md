---
date: "2026-09-30"
title: "A controller that decides which agent work to continue, restart or stop"
authors: ["Paras Dahal","Anton Bakhtin","Taco Cohen","Gabriel Synnaeve","Jason Weston","Anirudh Goyal","et al."]
url: "https://arxiv.org/abs/2609.38147"
discuss_url: null
source: arxiv
section: agents
interest_score: 7
recommended: true
must_read: false
why_read: "A concrete harness design for spending a fixed compute budget across many agent attempts, with reported gains over direct control."
summary: "\"Thinking Before Thinking\": a meta-reasoning controller over agent workers; 71.5% on ProgramBench with GPT-5.5."
image: "/images/thinking-before-thinking.jpg"
image_credit: "Edgepedia / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Plumpton_signal_box,_October_2014_02.JPG"
sample: false
---

The paper, "Thinking Before Thinking: Scaling Agentic Inference Through Meta-Reasoning", splits an agent run into a controller and workers. The controller keeps a compact account of the run instead of replaying the full history, and decides which partial work to continue, when to restart and when to stop within a compute budget.

The authors report 71.5% on ProgramBench with GPT-5.5, against 58.0% for Codex, and gains of 3.6 to 4.2 points over direct-control baselines across three frontier models.
