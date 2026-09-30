---
date: "2026-09-30"
title: "MassAlloc attention skips the work on tiles that carry almost no softmax mass"
authors: ["Jingze Shi", "Zhangyang Peng", "Xianduo Li", "Yanlin Qi", "Xiaotian Lin", "Haoxian Chen", "Liangdong Wang", "Guang Liu", "Yuyu Luo"]
url: "https://arxiv.org/abs/2609.32712"
discuss_url: null
source: arxiv
section: infra
interest_score: 6
recommended: false
must_read: false
why_read: "Unlike most sparse attention, it still scores every causal pair, so recall holds up. The kernel is open source under BSD-3."
summary: "A fused kernel from HKUST (Guangzhou) and BAAI that keeps full score access but drops post-score compute on low-mass tiles; 3.0x faster backward at 128K."
image: "/images/massalloc-attention.jpg"
image_credit: "c-g. / Wikimedia Commons, CC BY 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Aurora_2ch_mixer_board_arrived_(2009-07-28_11.20.55_by_c-g.).jpg"
sample: false
---

MALA computes every causal query-key score, then spends the rest of the attention computation only on tiles whose normalised contribution clears a tolerance. The forward pass uses the running online-softmax normaliser; the backward pass reuses the final one. One tolerance setting governs training and inference.

At 8K context, associative recall was 89.67% against 89.97% for full attention, where NSA, MoBA and DSA scored between 22.61% and 52.61%. At 128K the authors report 2.2x lower forward and 3.0x lower backward training latency and 1.6x faster decoding. For a 14B model, training FLOPs fell 23.1% in 32K long-context training with results comparable to full attention.

The kernel is in [flash-sparse-attention](https://github.com/HKUSTDial/flash-sparse-attention).
