---
date: "2026-09-30"
title: "Claude Code 2.1.285 lets admins restrict API providers and caps background commands"
authors: ["Anthropic"]
url: "https://github.com/anthropics/claude-code/releases/tag/v2.1.285"
discuss_url: null
source: github
section: agents
interest_score: 5
recommended: false
must_read: false
why_read: "The managed-settings and sandbox changes matter if you deploy Claude Code across a team; the retry fix matters if you pay per request."
summary: "New allowedProviders managed setting, a 30-minute default limit on background shell commands, and project settings can no longer loosen an admin-required sandbox."
image: "/images/claude-code-2-1-285.jpg"
image_credit: "SysMusDes / Wikimedia Commons, CC0"
image_source: "https://commons.wikimedia.org/wiki/File:Function_keys.JPG"
sample: false
---

Anthropic's Claude Code release adds an `allowedProviders` managed setting that limits which API backends a machine may use, from the Anthropic API to Bedrock, Vertex AI, Foundry or a custom endpoint. Project settings can no longer widen or turn off a sandbox an administrator requires. A new `CLAUDE_CODE_DISABLE_WEB_FETCH` variable turns off the WebFetch tool.

Background Bash and PowerShell commands now stop at a time limit, 30 minutes by default and up to two hours. A custom `ANTHROPIC_BASE_URL` now gets the 1M-token context window where the model supports it. Among roughly 70 fixes: failing API requests could be retried up to 21 times, and a PowerShell permission check skipped deny rules when its parser failed to start.
