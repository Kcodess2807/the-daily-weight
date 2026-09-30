---
date: "2026-09-29"
title: "Anthropic's Project Swap: agents traded well but misjudged what people wanted"
authors: ["Zoë Hitzig", "Sylvie Carr", "Tess Cotter", "et al."]
url: "https://www.anthropic.com/research/project-swap"
discuss_url: null
source: labs
section: agents
interest_score: 7
recommended: true
must_read: false
why_read: "A live agent-to-agent marketplace where most of the loss came from preference modelling, not negotiation, which is a useful place to look for anyone building delegated agents."
summary: "201 employees traded books via Claude agents; 85% of the gap to optimal came from Claude misjudging preferences."
image: "/images/anthropic-project-swap.jpg"
image_credit: "Roman Eisele / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Part_of_a_bookshelf_containing_books_by_ancient_philosophers_(1.1).jpg"
sample: false
---

Anthropic had 201 employees across six offices trade books through Claude agents that negotiated on their behalf. Claude's rankings of the books matched participants' own on 61% of pairs, against 53% for a popularity baseline and 55% for collaborative filtering.

People ended up with books scoring 0.55 on their own rankings, roughly their fifth choice of ten, against an achievable 0.89. Anthropic attributes 85% of that shortfall to Claude misjudging preferences rather than to bargaining. Opus agents reached 0.88 trading efficiency against 0.75 for Haiku, and telling agents to be "ruthless" or "prosocial" moved results by only 0.02.

The caveats are stated: all participants were Anthropic staff, there were no financial stakes, no adversarial agents were tested, and some books were never delivered.
