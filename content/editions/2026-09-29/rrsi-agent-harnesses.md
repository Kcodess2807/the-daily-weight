---
date: "2026-09-29"
title: "RRSI lets an agent rewrite its own harness without overfitting the benchmark"
authors: ["Peng Xia", "Rujun Han", "Zifeng Wang", "et al."]
url: "https://arxiv.org/abs/2609.24972"
discuss_url: "https://huggingface.co/papers/2609.24972"
source: arxiv
section: agents
interest_score: 6
recommended: true
must_read: false
why_read: "Self-improving harnesses tend to learn the test set; this adds a critic and a pruner to keep the edits general, and reports out-of-distribution gains."
summary: "Regularised harness self-improvement: up to +14.1 points in-distribution, +4.7 out-of-distribution, 30% fewer policy tokens."
image: "/images/rrsi-agent-harnesses.jpg"
image_credit: "Pete Markham from Loretto, USA / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Horse_harness_closeup.jpg"
sample: false
---

RRSI is a loop in which an agent proposes edits to its own harness (prompts, tools, control flow) and a selector decides which to keep. The authors, including Tomas Pfister and Chen-Yu Lee, add three brakes: "temporal budget annealing" that shrinks how much the proposer may change over time, a critic that rejects benchmark-specific proposals, and a pruner that removes edits with no measurable effect.

On coding, workspace and design tasks they report gains of up to 14.1 points in-distribution and 4.7 out-of-distribution, and the evolved harness uses 30% fewer policy tokens than one evolved without regularisation.
