---
date: "2026-09-30"
title: "Flaw in the official MCP Python SDK let a malicious server steal OAuth secrets"
authors: ["The Hacker News"]
url: "https://thehackernews.com/2026/09/official-mcp-python-sdk-flaw-can-let.html"
discuss_url: null
source: press
section: safety
interest_score: 7
recommended: true
must_read: false
why_read: "If you ship an MCP client in Python, upgrade. Two providers also need a code change, not just a version bump."
summary: "GHSA-qx49-fqc8-xw99 exposed client secrets, authorization codes and PKCE verifiers; fixed in 1.30.0 and 2.2.0."
image: "/images/mcp-python-sdk-oauth-flaw.jpg"
image_credit: "Sussex Archaeological Society, Laura Burnett, 2010-01-29 15: / Wikimedia Commons, CC BY-SA 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Medieval_padlock_(FindID_283918).jpg"
sample: false
---

Cycode found that a malicious MCP server could make clients built on the official Python SDK hand over their OAuth client secret, authorization code and PKCE verifier. The advisory is [GHSA-qx49-fqc8-xw99](https://github.com/advisories/GHSA-qx49-fqc8-xw99), rated CVSS 7.5, or 6.5 for the interactive provider. There is no CVE yet and no known exploitation.

Affected versions are 1.9.1 to 1.29.1 and 2.0.0 to 2.1.1. The fixes are in 1.30.0 and 2.2.0. Two of the auth providers also require callers to pass `issuer=` explicitly after upgrading, so check the advisory rather than just bumping the version.
