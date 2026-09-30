---
date: "2026-09-29"
title: "vLLM 0.30 adds a persistent weight cache and watermarked generation"
authors: ["vLLM project"]
url: "https://github.com/vllm-project/vllm/releases/tag/v0.30.0"
discuss_url: null
source: github
section: infra
interest_score: 6
recommended: false
must_read: false
why_read: "Faster restarts for serving fleets, plus breaking flag changes to check before upgrading."
summary: "vLLM v0.30.0: 762 commits, DeepSeek-V4.1-Flash support, ipc_cache weight daemon, keyed Gumbel-max watermarking."
image: "/images/vllm-0-30.jpg"
image_credit: "Pro-Per Energy Services / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Gas_Turbine_4.jpg"
sample: false
---

The September 22 release has 762 commits from 315 contributors, 104 of them new. It adds DeepSeek-V4.1-Flash support with the whole KV cache stored in MXFP8 on SM100, GLM-5.3-Flash and K2-Horizon, a persistent weight-cache daemon (`--load-format ipc_cache`) for faster restarts, and Gumbel-max watermarked generation and detection with a keyed PRF that also works with speculative decoding.

Breaking changes: scale-out endpoints now need `--enable-scale-out`, and GPTQ group/dynamic activation ordering is removed (`g_idx` is ignored). The `vllm.entrypoints.grpc_server` entry point is deprecated in favour of `vllm serve --grpc`.
