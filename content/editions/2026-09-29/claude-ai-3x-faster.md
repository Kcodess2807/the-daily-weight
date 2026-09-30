---
date: "2026-09-29"
title: "How Anthropic used Claude to make claude.ai load 3x faster in two weeks"
authors: ["Raymond Wang", "Sam Attard", "Issac G."]
url: "https://claude.dev/blog/how-we-made-claude-ai-faster/"
discuss_url: "https://news.ycombinator.com/item?id=49821196"
source: labs
section: agents
interest_score: 6
recommended: true
must_read: false
why_read: "A concrete account of agent-driven performance work at scale: measure first, then let parallel agents grind through thousands of small changes behind flags."
summary: "Fresh load went from 3,085 ms to 550 ms; 3,000+ changes merged behind about 200 feature flags."
image: "/images/claude-ai-3x-faster.jpg"
image_credit: "Ansgar Koreng / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Stopwatch,_1810201155,_ako.jpg"
sample: false
---

Anthropic's web team reports a 3.1x aggregate speedup for claude.ai, the geometric mean of 13 measurements, with fresh page load down from 3,085 ms to 550 ms. Opening existing conversations got 2.4 to 3.5 times faster, and sending a message up to 19 times faster in Cowork.

The work was done largely by an internal model the post calls "Claude Tag", driven from a Slack channel with more than 150 parallel threads. Over 3,000 changes were merged behind about 200 feature flags, peaking at 200 changes a day, with no customer-facing incidents. The premise is in the subtitle: once Claude can measure something, it can make it faster.

The team notes these are lab measurements and that gains in the field depend on users' devices and networks.
