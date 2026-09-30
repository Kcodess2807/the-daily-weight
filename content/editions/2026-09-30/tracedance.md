---
date: "2026-09-30"
title: "ByteDance builds agent behaviour tests from 250,000 real deployment sessions"
authors: ["Dehai Min", "Daoan Zhang", "Yiming Zeng", "Huayi Zhang", "Ziyi Chen", "Yan Zhang", "Qinbo Bai", "Mengyuan Chao", "Jing Ning", "Qiyue Hua", "Huiyi Chen", "Hanrong Zhang", "Henry Peng Zou", "Jie Yang", "Wei Xu", "Philip S. Yu"]
url: "https://arxiv.org/abs/2609.33295"
discuss_url: null
source: arxiv
section: agents
interest_score: 6
recommended: true
must_read: false
why_read: "Evaluating an agent at a recorded decision point, without replaying the environment, is a cheap pattern any team with traces can copy."
summary: "TraceDance turned 252,557 Claude Code and OpenClaw sessions into 107 behaviour benchmarks; nine frontier models averaged a 26.7% pass rate."
image: "/images/tracedance.jpg"
image_credit: "Kritzolina / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Human_footprint.jpg"
sample: false
---

Agents can finish a task while doing something undesirable along the way. TraceDance, from ByteDance and the University of Illinois Chicago, builds benchmarks for behaviours a developer names, drawn from their own deployment traces.

Retrieval runs programmable queries over traces and a small model confirms each candidate. Tests use "decision-point continuation": the model under test writes the next turn at a recorded moment and a behaviour-specific rubric grades it, so no reference answer or environment replay is needed.

From 252,557 de-identified sessions (75,076 from Claude Code, 177,481 from OpenClaw) the system produced 107 benchmarks with 4,125 instances. Nine models averaged 26.7%; Claude Opus 4.8 scored highest at 33.5%. The code is [public](https://github.com/ZhishanQ/TraceDance), but the traces and benchmarks are not.
