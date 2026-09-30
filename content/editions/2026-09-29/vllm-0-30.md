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
summary: "vLLM v0.30.0: 762 commits, DeepSeek-V4.1-Flash support, ipc_cache weight daemon, Gumbel-max watermarking."
image: "/images/vllm-0-30.jpg"
image_credit: "Pro-Per Energy Services / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Gas_Turbine_4.jpg"
sample: false
---

The release has 762 commits from 315 contributors. It adds DeepSeek-V4.1-Flash support, a persistent GPU weight-cache daemon (`--load-format ipc_cache`) for faster restarts, and Gumbel-max watermarked generation with a per-request opt-out.

Breaking changes: scale-out endpoints now need `--enable-scale-out`, GPTQ activation ordering is removed, and MRV1 is deprecated.
