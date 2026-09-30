---
date: "2026-09-30"
title: "Nvidia's OpenShell sandbox anchors a 100-company agent safety platform"
authors: ["NVIDIA"]
url: "https://github.com/NVIDIA/OpenShell"
discuss_url: null
source: github
section: safety
interest_score: 7
recommended: true
must_read: false
why_read: "An Apache-licensed runtime that isolates agents at the kernel level and hides credentials from them. It is worth evaluating before building your own sandbox."
summary: "OpenShell confines agents' file access and syscalls, gates outbound network by policy and injects credentials only for approved endpoints."
image: "/images/nvidia-openshell.jpg"
image_credit: "Tokumeigakarinoaoshima / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:A_sandbox_and_a_playground_slide_in_Ikoma.jpg"
sample: false
---

OpenShell describes itself as a safe, private runtime for fleets of autonomous agents. It confines file access and system calls at the kernel level, requires policy approval for outbound connections, and keeps credentials hidden from the agent, injecting them only for approved endpoints. It also uses formal verification to flag risky policy changes. It is Apache 2.0 and gained about 990 stars in a day.

On September 28 Nvidia made OpenShell one of three parts of its Open Agent Safety Platform. The others are Sentry, a watchdog on BlueField-4 DPUs that Nvidia says can quarantine an agent within milliseconds, and a reference system design. Nvidia lists integrations with Claude Managed Agents, Cursor, Grok, SAP and Slack.

TechCrunch [reports](https://techcrunch.com/2026/09/29/heres-why-openai-is-absent-from-nvidias-industry-wide-effort-to-end-rogue-ai-agents/) that more than 100 companies, including Anthropic, joined. OpenAI did not publicly sign on but is privately working with Nvidia on OpenShell.
