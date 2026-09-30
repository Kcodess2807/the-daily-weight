---
date: "2026-09-30"
title: "Anthropic: open-weight GLM-5.3 can now build working exploits"
authors: ["Andrew Fasano", "Marius Fleischer", "Cole McFaul", "Robert Xiao", "Tripp Gallagher"]
url: "https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities"
discuss_url: "https://news.ycombinator.com/item?id=49897075"
source: labs
section: safety
interest_score: 9
recommended: true
must_read: true
why_read: "The first public measurement of a downloadable model close to Mythos Preview on exploit development, plus a costed recipe for stripping its refusals. Expect it in the open-weight policy debate."
summary: "GLM-5.3 achieved full control-flow hijacks in 4% of Anthropic's binary exploitation trials, against 6% for Claude Mythos Preview; abliteration cost about $4,400."
image: "/images/glm-5-3-cyber.jpg"
image_credit: "Lacz02 / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Padlock_with_chain.jpg"
sample: false
---

Anthropic's Frontier Red Team tested Zhipu's open-weight GLM-5.3 in sandboxed environments against offline targets. On 100 random tasks from its internal Binary Exploitation benchmark, GLM-5.3 achieved full control-flow hijacks in 4% of trials against 6% for Claude Mythos Preview. Earlier models, including Claude Opus 4.6 and GLM-5.2, did not succeed on any.

The team also measured how easily safeguards come off. GLM-5.3 refused plain harmful cyber requests, but went along with 64% when given a false cover story and 92% with prefilled reasoning. Abliteration cut refusals from 95% to 6% at a cost Anthropic puts at about 2,200 GPU hours, roughly $4,400, with GPQA-Diamond unchanged.

Anthropic asks governments to safety-test capable models, including GLM-5.3's successors, and asks developers to prevent misuse of open weights. It also argues defenders should get frontier models through trusted-access programmes such as Project Glasswing. On r/LocalLLaMA the post was read as an argument for restricting Chinese open-weight models.
