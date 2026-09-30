---
date: "2026-09-30"
title: "Xiaomi grades passing patches against each other to train better code agents"
authors: ["Jinhao Dong", "Liang Zhao", "Zihao Yue", "Wenhan Ma", "Linghao Zhang", "Lei Li", "Shicheng Li", "Yifan Song", "Bowen Ye", "Fuli Luo"]
url: "https://arxiv.org/abs/2609.32577"
discuss_url: null
source: arxiv
section: research
interest_score: 7
recommended: true
must_read: false
why_read: "Binary test rewards treat a sprawling patch and a minimal one as equal. This is a concrete recipe for fixing that inside GRPO without changing the total reward."
summary: "GAGAR uses a group-level grader to redistribute GRPO advantages among test-passing trajectories, lifting DeepSWE from 50.2% to 62.2% at step 28."
image: "/images/gagar-code-agent-rl.jpg"
image_credit: "Markus Spiske markusspiske / Wikimedia Commons, CC0"
image_source: "https://commons.wikimedia.org/wiki/File:Code_on_computer_monitor_(Unsplash).jpg"
sample: false
---

Reinforcement learning for code agents usually rewards a trajectory 1 if the tests pass. Under GRPO every passing trajectory in a group then gets the same advantage, so the policy learns nothing about whether a fix was minimal, consistent with the codebase or free of side effects.

GAGAR, from Xiaomi's LLM team with Renmin, Peking and Hong Kong universities, adds a grader: a fine-tuned MiMo-V2.6-Pro that reads the whole group of passing trajectories, patches and test logs together and ranks them on five dimensions, including minimality and side effects. Advantages are redistributed so the group total is unchanged but better implementations get more of it.

In a controlled MiMo-V2.6-Flash run, DeepSWE v1.1 reached 62.2% at step 28 against 50.2% for the binary-reward baseline, with 15.6% fewer turns and 9.9% fewer tokens per trajectory. Downweighting poor solutions without redistribution reached 56.2%. The paper does not mention a code release.
