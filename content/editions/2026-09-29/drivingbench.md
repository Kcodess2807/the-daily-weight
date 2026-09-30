---
date: "2026-09-29"
title: "DrivingBench puts GPT-6 Astra behind the wheel of a real Corolla"
authors: ["Aditya Ramabadran", "Simon Mahns", "Tobias Gessler"]
url: "https://drivingbench.com/"
discuss_url: "https://news.ycombinator.com/item?id=49817404"
source: hn
section: agents
interest_score: 6
recommended: false
must_read: false
why_read: "An unusual embodied eval: a general model steering a physical car through a cone course over a chat loop, with token and dollar costs reported."
summary: "GPT-6 Astra completed a cone course on its second attempt, using 246.6M tokens and $7.74."
image: "/images/drivingbench.jpg"
image_credit: "Ser Amantio di Nicolao / Wikimedia Commons, CC BY-SA 3.0"
image_source: "https://commons.wikimedia.org/wiki/File:Remains_of_a_traffic_cone_in_the_Safeway_parking_lot.jpg"
sample: false
---

DrivingBench gives a model control of a Toyota Corolla's steering, accelerator and brakes on a fixed cone course. Models get up to three attempts in one continuous chat; progress only counts while the car stays within 4 metres of the centreline, and collisions are penalised.

GPT-6 Astra reached 49% on its first attempt and 100% on its second, finishing in 5 minutes 22 seconds. The successful run consumed 246.6 million tokens and cost $7.74.

The authors describe it as research software to be used at one's own risk, unaffiliated with Toyota, comma.ai, openpilot or any model maker. The page carries no date; it reached Hacker News on September 23.
