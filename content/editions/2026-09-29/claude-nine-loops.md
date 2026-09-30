---
date: "2026-09-29"
title: "Claude computes a nine-loop amplitude in N=4 super-Yang-Mills, one loop past the record"
authors: ["Matt von Hippel", "Lance Dixon"]
url: "https://www.anthropic.com/research/yes-claude-can-do-nine-loops"
discuss_url: "https://news.ycombinator.com/item?id=49848033"
source: labs
section: research
interest_score: 7
recommended: true
must_read: false
why_read: "A physicist who set the challenge explains what the model did, what it cost, and why it is known methods plus compute rather than new physics."
summary: "Fable 5.1 in Claude Science extended Dixon's 2023 eight-loop result to nine loops for about $100 of compute on the main calculation."
image: "/images/claude-nine-loops.jpg"
image_credit: "Roman Mager roman_lazygeek / Wikimedia Commons, CC0"
image_source: "https://commons.wikimedia.org/wiki/File:Formulas_on_an_old_blackboard_(Unsplash).jpg"
sample: false
---

In a guest post on Anthropic's site, physicist Matt von Hippel describes a challenge he set in early August: could Claude extend the amplitude bootstrap in N=4 super-Yang-Mills from eight loops, the 2023 record held by Lance Dixon's group, to nine? Anthropic physicists Liam Fitzpatrick and Siddharth Mishra-Sharma ran Fable 5.1 inside Claude Science, and the result was finished by the end of August.

The bootstrap calculation cost about $100, roughly 96 CPUs for a week, and both methods together around one or two thousand dollars. Claude wrote the code in Python with SymPy rather than the Maple or Mathematica the field usually uses. Von Hippel's assessment is that "Claude used known methods, with a bit more compute."

Dixon adds an addendum confirming the result. Separately, Song He's group at the Chinese Academy of Sciences independently obtained most of the same result with GPT-6 in about two weeks.
