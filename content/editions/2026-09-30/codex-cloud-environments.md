---
date: "2026-09-30"
title: "Codex gets reusable cloud environments, voice control and a repository scanner"
authors: ["Sarah Perez"]
url: "https://techcrunch.com/2026/09/29/openai-gives-codex-reusable-cloud-environments-that-work-across-devices/"
discuss_url: null
source: press
section: agents
interest_score: 7
recommended: true
must_read: false
why_read: "Persistent cloud workspaces and a commit-triggered security scanner move Codex further from a CLI toward a hosted development platform."
summary: "Codex adds persistent cloud workspaces across devices, a voice-driven CLI, a new review flow and Codex Security Cloud for scheduled repo scans."
image: "/images/codex-cloud-environments.jpg"
image_credit: "Michael_Hiraeth / Wikimedia Commons, CC0"
image_source: "https://commons.wikimedia.org/wiki/File:Data_room.jpg"
sample: false
---

OpenAI announced several Codex changes at DevDay. Cloud environments are persistent workspaces with approved settings and permissions that users can pick up from a computer or a phone. The CLI can now take tasks by voice and adds an `/agents` view, prompt editing and session resuming. The ChatGPT desktop app has a new code review view that summarises changes and sends feedback to GitHub or GitLab.

The security product, Codex Security Cloud, scans GitHub repositories on demand, on a schedule, or whenever new commits arrive. It investigates findings, removes duplicates and prepares fixes. TechCrunch reports it also includes access to models from Daybreak Blue, OpenAI's cybersecurity programme. No pricing was given.

The open-source CLI shipped [0.159.0](https://github.com/openai/codex/releases/tag/rust-v0.159.0) the same day. It adds an opt-in `instant_interrupt` that lets new input steer a response already in progress, protects `.aws` directories by default, and removes automatic follow-up prompt suggestions.
