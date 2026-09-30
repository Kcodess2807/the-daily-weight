---
date: "2026-09-30"
title: "QwenGyre: running RL on agent rollouts that last hours and a million tokens"
authors: ["Weiqi Wang", "Yuxin Zhou", "Mouxiang Chen", "Siyuan Zhang", "Yi Zhang", "Yuyan Luo", "Zhiyu Yin", "Chencan Wu", "Jiemin Jiang", "Wentao Yao", "Chujie Zheng", "JianWei Zhang"]
url: "https://arxiv.org/abs/2609.33848"
discuss_url: null
source: arxiv
section: infra
interest_score: 7
recommended: true
must_read: false
why_read: "A rare look at the systems side of training long-horizon agents at frontier scale, including a 192-node run on a 2.4T-parameter Qwen model."
summary: "Alibaba's QwenGyre shifts GPUs between rollout and training without stopping live harness runs, cutting a 2.4T-model RL run from 134.6 to 75.4 hours."
image: "/images/qwengyre.jpg"
image_credit: "Nockson / Wikimedia Commons, CC BY-SA 3.0"
image_source: "https://commons.wikimedia.org/wiki/File:Ring_laser_gyroscope_at_MAKS-2011_airshow.jpg"
sample: false
---

When one agent rollout can run for hours and approach a million tokens, synchronous RL leaves GPUs idle waiting for stragglers, and branching trajectories repeat the same prefixes many times. QwenGyre, from Alibaba with USTC and Tsinghua, attacks both.

An elastic scheduler moves GPUs between rollout and training without interrupting running harness sessions. A trajectory processor records token-in, token-out, scores unfinished runs partially and deduplicates shared prefixes across branches.

On NL2RepoBench, training Qwen 3.8 (2.4T parameters) on 192 nodes raised the score from 52.5% to 58.5% in 48 steps. That run took 75.4 hours against 134.6 for an asynchronous baseline and 91.5 for a colocated one. Across other experiments on Qwen 3.6 122B the authors report speedups of up to 1.85x. No code release is mentioned.
