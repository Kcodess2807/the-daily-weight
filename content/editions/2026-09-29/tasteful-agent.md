---
date: "2026-09-29"
title: "Taste-Bench: frontier agents pick the better option at key decision points only 59.7% of the time"
authors: ["Wenbo Pan", "Zhichao Liu", "Shujie Liu", "et al."]
url: "https://arxiv.org/abs/2609.25804"
discuss_url: "https://huggingface.co/papers/2609.25804"
source: arxiv
section: research
interest_score: 6
recommended: true
must_read: false
why_read: "It isolates the judgement calls inside long agent runs, and finds more reasoning does not help."
summary: "Taste-Bench extracts decision points from agent trajectories; best models reach 59.7%, and outcome distillation helps on unseen tasks."
image: "/images/tasteful-agent.jpg"
image_credit: "Bill Boaden / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Crossroads_signpost_-_geograph.org.uk_-_2178020.jpg"
sample: false
---

Long-horizon agents succeed or fail on a few judgement calls: which approach to take, when to stop exploring. Taste-Bench extracts those decision points automatically from software-engineering and research trajectories and asks models to choose.

The best models reach 59.7% accuracy. More reasoning did not improve results, and decisions whose quality only becomes clear from later evidence were hardest. The authors report that distilling from the eventual outcomes of trajectories improves performance on tasks not seen in training.
