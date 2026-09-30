---
date: "2026-09-29"
title: "Quantize prefill and decode differently, says a paper from Dan Alistarh's group"
authors: ["Andrei Panferov", "Maximilian Kleinegger", "Sweta Priyadarshi", "et al."]
url: "https://arxiv.org/abs/2609.26333"
discuss_url: "https://huggingface.co/papers/2609.26333"
source: arxiv
section: infra
interest_score: 7
recommended: true
must_read: false
why_read: "Disaggregated serving already splits prefill and decode onto different hardware; this argues their weights and activations should be quantized differently too."
summary: "Separate low-bit prefill weights and unquantized decode activations: 1.78x faster time-to-first-token on a 27B model."
image: "/images/disaggregated-quantization.jpg"
image_credit: "Ad Meskens / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Djerba_Weighing_scale_01.JPG"
sample: false
---

Prefill is compute-bound and decode is memory-bound, and many serving stacks already run them on separate machines. This paper, with authors including Tijmen Blankevoort and Dan Alistarh, argues each phase should get its own quantization scheme.

The authors find that dropping activation quantization during decode improves accuracy on decode-heavy tasks at no extra cost, while a separate set of prefill weights works at 2 to 3 bits. On a 27B model they report a 1.78x time-to-first-token speedup over a weight-only baseline at 8K prompt length, and accuracy gains of 32.5 points on MMLU-Pro and 35.3 on MMMU-Pro over the comparison setup. They validate the approach on models up to 2.8 trillion parameters.
