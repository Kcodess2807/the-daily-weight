---
date: "2026-09-29"
title: "H Company's Holo4 open computer-use models reach 61.7% on OSWorld 2.0"
authors: ["Maxime Theillard", "Frederic Renard", "H Company"]
url: "https://huggingface.co/blog/Hcompany/holo4"
discuss_url: null
source: labs
section: agents
interest_score: 6
recommended: true
must_read: false
why_read: "Open weights for computer-use agents with per-task costs reported, and an Apache 2.0 option, though the strongest model is non-commercial."
summary: "Holo4-27B (CC BY-NC) scores 61.7% on OSWorld 2.0; the Apache 2.0 Holo4-35B-A3B scores 30.9%."
image: "/images/holo4.jpg"
image_credit: "Shixart1985 / Wikimedia Commons, CC BY 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:A_computer_keyboard_and_mouse_are_positioned_on_a_wooden_des.jpg"
sample: false
---

H Company released Holo4 on September 28, a family of models for agents that operate desktops and browsers. Holo4-27B is dense and built on Qwen3.8-27B; Holo4-35B-A3B is a mixture-of-experts model built on Qwen3.6-35B-A3B; a third, Holotron4 Nano, is built on Nemotron 3 Nano Omni.

On OSWorld 2.0 the 27B model scores 61.7% at $1.22 per task and the 35B-A3B 30.9% at $0.61. On AutomationBench they score 45.4% and 34.5%. The licences differ: the 27B is CC BY-NC 4.0, the 35B-A3B Apache 2.0. Weights ship in BF16, FP8, NVFP4 and GGUF.

The blog sets these against Opus 5.5's 81.8%, but that number is on OSWorld 2.1, not 2.0, so the comparison is loose.
