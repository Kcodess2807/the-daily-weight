---
date: "2026-09-29"
title: "Claude Sonnet 5.5 beats Opus 5.5 on Terminal-Bench at half the price"
authors: ["Anthropic"]
url: "https://www.anthropic.com/claude-sonnet-5-5"
discuss_url: "https://news.ycombinator.com/item?id=49881850"
source: labs
section: models
interest_score: 9
recommended: true
must_read: true
why_read: "The mid-tier model now matches or passes the flagship on agentic coding benchmarks at $2/$10, which changes the default choice for most agent workloads."
summary: "Claude Sonnet 5.5: $2/$10 per million tokens, 70.6% on Terminal-Bench 4.0 against Opus 5.5's 66.4%."
image: "/images/claude-sonnet-5-5.jpg"
image_credit: "Tool Dude8mm / Wikimedia Commons, CC BY 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Bird_Feather_Feather_Paper_pen_Bird_feather_made_into_dipping_pen,_inkwell,_paper,_handwritten_letter,_inkblots,_etc._2505306_Edited_2020.jpg"
sample: false
---

Anthropic released Claude Sonnet 5.5 on September 28 as `claude-sonnet-5-5`, priced at $2 per million input tokens and $10 per million output, with cache reads at $0.20. Anthropic says it runs more than 30% faster than Sonnet 5, and that at low or medium effort it beats Sonnet 5's best score for about a tenth of the cost per task.

The published table has Sonnet 5.5 at 70.6% on Terminal-Bench 4.0, ahead of Opus 5.5's 66.4% and far ahead of Sonnet 5's 10.3%. On OSWorld 2.1 it scores 80.1% (Opus 5.5: 81.8%), and on FrontierCode 1.1 46.2% (Opus 5.5: 54.4%). Anthropic still calls Opus 5.5 "clearly stronger" at open-ended work. [Artificial Analysis](https://artificialanalysis.ai/articles/claude-sonnet-5-5) places it second on its Intelligence Index, behind Opus 5.5 at max effort.

Sonnet 5.5 is now the default on claude.ai's free tier, according to [Simon Willison](https://simonwillison.net/2026/Sep/28/claude-sonnet-5-5/). Anthropic notes some microbiology and virology requests may be flagged in error, and higher-risk cyber tasks fall back to Sonnet 5.
