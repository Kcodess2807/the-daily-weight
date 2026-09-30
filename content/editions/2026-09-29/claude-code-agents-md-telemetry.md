---
date: "2026-09-29"
title: "Claude Code ignored AGENTS.md whenever telemetry was off, until a fix this week"
authors: ["Przemek"]
url: "https://blog.szypowi.cz/p/claude-code-reads-agents.md-only-when-telemetry-is-on/"
discuss_url: "https://news.ycombinator.com/item?id=49814947"
source: hn
section: agents
interest_score: 7
recommended: true
must_read: false
why_read: "Privacy-conscious setups silently lost their project instructions. If you disable telemetry or run through Bedrock or Vertex, check your version."
summary: "AGENTS.md loading was gated on a remote feature flag; with telemetry disabled it never loaded. Fixed in Claude Code 2.1.281-2.1.282."
image: "/images/claude-code-agents-md-telemetry.jpg"
image_credit: "Ka23 13 / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Switches_20201003_110916.jpg"
sample: false
---

Claude Code added AGENTS.md support in version 2.1.277, but loading was gated behind a remote feature flag, `tengu_agents_md_mod`. With `DISABLE_TELEMETRY` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` set to any value, even 0, the flag never arrived and AGENTS.md was silently skipped. The author found it with a canary word in AGENTS.md and `claude -p`; the workaround was a `CLAUDE.md` containing `@AGENTS.md`.

Anthropic's changelog for 2.1.281 and 2.1.282 now reads: "Changed AGENTS.md support to also work on Amazon Bedrock, Google Vertex AI, Microsoft Foundry, LLM gateways, and sessions with telemetry disabled." Version 2.1.282 also shows a startup notice listing telemetry variables that were ignored or that turned telemetry off.
