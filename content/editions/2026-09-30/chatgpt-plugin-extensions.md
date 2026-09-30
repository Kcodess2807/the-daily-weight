---
date: "2026-09-30"
title: "OpenAI extends MCP so ChatGPT plug-ins get panels, file viewers and event triggers"
authors: ["OpenAI"]
url: "https://github.com/openai/mcp-extensions"
discuss_url: null
source: github
section: agents
interest_score: 6
recommended: true
must_read: false
why_read: "If you ship an MCP server, this is the surface for looking native in ChatGPT. It also adopts the proposed MCP Events spec for automations."
summary: "openai/mcp-extensions, Apache 2.0, adds ChatGPT-specific MCP features: sidebar entries, file viewers, composer mentions and extended forms."
image: "/images/chatgpt-plugin-extensions.jpg"
image_credit: "Wpcpey / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:MTR_CRH380A_AC_power_plugs_and_sockets_201710.jpg"
sample: false
---

At DevDay OpenAI expanded ChatGPT plug-ins with their own sidebar homes, interactive panels next to the chat, file viewers for developer formats, per-plug-in approval controls and better ranking in the directory, [TechCrunch reports](https://techcrunch.com/2026/09/29/openai-expands-chatgpts-plugins-with-app-like-interfaces-and-automations/). ChatGPT also supports the proposed MCP Events specification, so a plug-in can start an automation when something happens in a connected app.

The developer side is the new `mcp-extensions` repository. It extends the Model Context Protocol with ChatGPT-only capabilities, including sidebar entry points, custom file-viewer handlers, composer mentions for searching resources and extended forms. It ships TypeScript (`@openai/mcp-extensions`) and Python (`openai-mcp-extensions`) SDKs and an example app, under Apache 2.0.

These are extensions, not changes to the MCP spec, so servers that use them will behave differently in ChatGPT than in other MCP clients. TechCrunch's [companion piece](https://techcrunch.com/2026/09/29/openais-latest-features-take-direct-aim-at-the-app-store-model/) looks at the business side.
