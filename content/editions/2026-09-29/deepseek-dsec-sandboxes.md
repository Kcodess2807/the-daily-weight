---
date: "2026-09-29"
title: "DeepSeek describes the sandbox system behind its agent training"
authors: ["Jialiang Huang","Hongxuan Tang","Jingchang Chen","et al."]
url: "https://arxiv.org/abs/2609.22978"
discuss_url: "https://news.ycombinator.com/item?id=49859112"
source: arxiv
section: infra
interest_score: 8
recommended: true
must_read: false
why_read: "Rare operating numbers for the infrastructure that agentic RL actually needs."
summary: "DSec runs about 3 million sandboxes a day, 380,000+ concurrently, and 5,000+ creations per second."
image: "/images/deepseek-dsec-sandboxes.jpg"
image_credit: "AgainErick / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Shipping_container_-_Port_of_Rotterdam_-_2017_-_3.jpg"
sample: false
---

"DeepSeek Elastic Compute (DSec)", from 131 authors at DeepSeek-AI and Tsinghua University, describes the sandbox infrastructure DeepSeek uses for agentic RL. One scheduler runs function calls, containers, microVMs and full VMs, and the system is co-designed with the RL training framework.

"A single production-scale unit of DSec spans around 160 nodes, serving about 3 million sandboxes per day," the paper says; in production it supports more than 380,000 concurrent sandboxes and over 5,000 creations per second. It was submitted September 19 and discussed widely on Hacker News on September 26.
