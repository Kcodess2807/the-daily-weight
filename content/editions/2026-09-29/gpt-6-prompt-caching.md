---
date: "2026-09-29"
title: "OpenAI adds explicit cache breakpoints and miss diagnostics for GPT-6"
authors: ["OpenAI"]
url: "https://openai.com/index/better-prompt-caching-for-gpt-6"
discuss_url: null
source: labs
section: infra
interest_score: 6
recommended: true
must_read: false
why_read: "Cache hit rate is now a first-order cost lever for agents; this adds the controls to manage it instead of hoping for prefix matches."
summary: "GPT-6 prompt caching gets breakpoints, cache-safe effort changes, pre-warming and a tool that explains misses."
image: "/images/gpt-6-prompt-caching.jpg"
image_credit: "TBurmeister (WMF) / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Inside_a_card_catalog_at_the_Indiana_State_Library_-_ask_the_librarian.jpg"
sample: false
---

Alongside GPT-6 Sol and Luna, OpenAI changed how prompt caching works for the GPT-6 family. Developers can set explicit cache breakpoints, change reasoning effort through `configuration_update` without invalidating the cache, keep tool definitions stable with `allowed_tools`, and pre-warm shared instructions at startup. A dashboard and a diagnostic tool explain why a request missed.

According to Mixed-News, which reported the post, cached input is discounted by up to 90% when a prefix is reused within 30 minutes. OpenAI's customer figures include GitHub Copilot processing more than 50% fewer fresh tokens and Manus moving from 85% to consistently above 90% cache hits. We could not open OpenAI's page directly and have not confirmed per-token cached prices.
