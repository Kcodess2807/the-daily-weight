---
date: "2026-09-29"
title: "Ollaya runs Jev-style decision models locally behind a Jev-compatible API"
authors: ["ollaya-dev"]
url: "https://ollaya.dev/"
discuss_url: "https://news.ycombinator.com/item?id=49848269"
source: hn
section: infra
interest_score: 7
recommended: true
must_read: false
why_read: "A drop-in local endpoint for code written against TypeSafe's API, with its best open model within two points of hosted Jev."
summary: "Single-binary runtime serving 19 open decision models via /v1/systemone; winnow:e4b scores 0.722 against hosted Jev's 0.738."
image: "/images/ollaya.jpg"
image_credit: "Roger D Kidd / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Llama_grazing_south-east_of_Bobbington_in_Staffordshire_-_geograph.org.uk_-_6859252.jpg"
sample: false
---

Ollaya does for decision models what Ollama does for LLMs: a single binary with `serve`, `run`, `pull` and `list`, running ONNX and GGUF models behind a `/v1/systemone` endpoint compatible with TypeSafe's Jev API. It is not affiliated with Ollama or TypeSafe. The runtime is Apache-2.0; each of the 19 listed models keeps its own licence.

Its recommended model, winnow:e4b, scores 0.722 on the project's accuracy test against 0.738 for hosted Jev, and answers five questions in 87 ms on an RTX 4090 (the README says 89 ms). Versions 0.4 to 0.7.5 shipped between September 25 and 28, adding native NVIDIA support on Windows and a 2B vision model.

Ollama itself followed: [v0.35.0](https://github.com/ollama/ollama/releases/tag/v0.35.0) on September 28 serves decision models through the same `/v1/systemone` route, "based on TypeSafe's Jev API", with Bespoke Labs' Nimble and Together AI's [Tev1](https://github.com/togethercomputer/tev1).
