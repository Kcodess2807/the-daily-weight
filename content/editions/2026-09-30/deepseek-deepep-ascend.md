---
date: "2026-09-30"
title: "DeepSeek open-sources DeepEP for Huawei Ascend NPUs"
authors: ["DeepSeek"]
url: "https://github.com/deepseek-ai/DeepEP-Ascend"
discuss_url: null
source: github
section: infra
interest_score: 8
recommended: true
must_read: false
why_read: "Expert-parallel communication was one of the pieces tying large MoE training to Nvidia. This is the benchmarked Ascend port from the team that wrote the original."
summary: "DeepEP-Ascend brings MoE dispatch and combine to Ascend 950, sustaining 373 GB/s dispatch at EP8, as part of a wider DeepSeek-Huawei release."
image: "/images/deepseek-deepep-ascend.jpg"
image_credit: "ProjectManhattan / Wikimedia Commons, CC BY-SA 3.0"
image_source: "https://commons.wikimedia.org/wiki/File:Network_cables_and_switch.jpg"
sample: false
---

DeepEP-Ascend is DeepSeek's communication library for mixture-of-experts training and inference on Huawei Ascend NPUs. It covers expert-parallel dispatch and combine, pipeline parallelism and distributed data operations. The kernels are written in Ascend C over Huawei's HCCL and UBMEM transports, compiled at runtime and support BF16 and FP8.

On Ascend 950DT, DeepSeek reports dispatch at 373-375 GB/s at EP8, falling to 313-320 GB/s at EP128, and combine at 345-347 GB/s falling to 272-278 GB/s. It says dispatch holds 90-95% of the physical payload bandwidth limit up to EP32. The repo has detailed API documentation, tests and benchmarks. No licence file was listed at publication.

According to [Bloomberg](https://www.bloomberg.com/news/articles/2026-09-30/deepseek-unveils-huawei-ai-chip-tools-that-may-replace-nvidia-s) and the South China Morning Post, it is one of several DeepSeek tools released for Ascend on September 30, alongside ports of TileLang, DeepGEMM and FlashMLA.
