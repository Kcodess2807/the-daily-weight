---
date: "2026-09-30"
title: "Claude down for an hour across apps, API and Claude Code"
authors: ["Anthropic"]
url: "https://status.claude.com/incidents/4xvtc2gnq73l"
discuss_url: "https://news.ycombinator.com/item?id=49893876"
source: hn
section: infra
interest_score: 6
recommended: false
must_read: false
why_read: "Some messages sent during the window may be lost. If you run production traffic on the Claude API, check your retries for 14:00-14:59 UTC."
summary: "Elevated errors hit claude.ai, the Console, the API, Claude Code and Cowork from 14:00 to 14:59 UTC on September 29."
image: "/images/claude-outage-sep-29.jpg"
image_credit: "Hybirdd / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Sandy_Poweroutage_1.jpg"
sample: false
---

Anthropic's status page reported elevated errors on claude.ai, the desktop and mobile apps, the Claude Console, the Claude API, Claude Code and Claude Cowork. Impact ran from 14:00 to 14:59 UTC on September 29. A mitigation went in at 14:41. At 15:00 Anthropic found a second issue that blocked sign-ins and new chats. The incident was marked resolved at 16:27.

Anthropic warned that some messages sent during the window may have been lost. It has not given a cause. HN commenters noted 500 errors while the status page still showed green. The outage also fed claims that Opus 5.5 got worse afterwards, which a popular tracker (see LiveNerf in this edition) is designed to test.
