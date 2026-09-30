---
date: "2026-09-30"
title: "Training agents to be risk-averse with a constitution and on-policy distillation"
authors: ["Arav Dhoot","Punya Syon Pandey","Jamie Johnson","Daniel Tan","Elliott Thornley","David Demitri Africa"]
url: "https://arxiv.org/abs/2609.38093"
discuss_url: null
source: arxiv
section: safety
interest_score: 6
recommended: false
must_read: false
why_read: "A specific proposal for limiting what a misaligned agent would attempt, with modest but measured results."
summary: "Character training based on constant absolute risk aversion; better out-of-distribution generalisation in 2 of 4 models."
image: "/images/risk-averse-agents.jpg"
image_credit: "Korenn / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Sign_on_the_obligation_to_use_safety_equipment_-_goggles,_protective_helmet,_protective_shoes_and_noise_shields_in_a_construction_site_in_Jerusalem.jpg"
sample: false
---

The paper starts from the premise that risk aversion over resources could stop a misaligned agent from causing catastrophic harm. It writes a constitution based on constant absolute risk aversion and trains it in with on-policy distillation, aiming for agents that prefer safer strategies such as negotiation.

The trained models stay competitive with baselines, and out-of-distribution generalisation improved in two of the four models tested.
