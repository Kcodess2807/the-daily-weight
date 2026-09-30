---
date: "2026-09-30"
title: "Audit finds tool defects inside popular agent benchmarks"
authors: ["Rohith Reddy Bellibatlu","Zichong Wang","Wenbin Zhang"]
url: "https://arxiv.org/abs/2609.37315"
discuss_url: null
source: arxiv
section: research
interest_score: 7
recommended: true
must_read: false
why_read: "If a benchmark grades what a tool reports rather than the state it changes, the score measures the wrong thing. This paper checks."
summary: "Executable-contract audit of 34 state-changing tools in four agent benchmarks finds seven tool defects."
image: "/images/agent-benchmark-contract-audit.jpg"
image_credit: "Jacek Halicki / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:2020_Suwmiarka_cyfrowa.jpg"
sample: false
---

The authors treat each benchmark tool's advertised interface as an executable contract and check the implementation against it. Across 34 state-changing tools in four benchmarks they confirm seven tool defects and one evaluator property; in AgentDojo, at least five tools diverge from their advertised behaviour.

Static analysis found 14 of the 17 confirmed sites. Dynamic testing mostly confirmed and traced them rather than finding new ones.
