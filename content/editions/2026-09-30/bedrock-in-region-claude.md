---
date: "2026-09-30"
title: "Amazon Bedrock adds in-region Claude inference in Seoul and Singapore"
authors: ["Aamna Najmi","Alfredo Castillo","Eugenio Soltero","Sofian Hamiti"]
url: "https://aws.amazon.com/blogs/machine-learning/introducing-anthropic-models-on-amazon-bedrock-for-in-region-inference-in-seoul-and-singapore/"
discuss_url: null
source: labs
section: infra
interest_score: 5
recommended: false
must_read: false
why_read: "For teams with data residency rules in Korea or Singapore, this removes the cross-region routing layer."
summary: "Claude Opus 5 and Sonnet 5 in Seoul, Sonnet 5 in Singapore, with prompts and outputs kept in-region."
image: "/images/bedrock-in-region-claude.jpg"
image_credit: "Basile Morin / Wikimedia Commons, CC BY-SA 4.0"
image_source: "https://commons.wikimedia.org/wiki/File:Skylines_of_the_Central_Business_District,_Singapore_at_dusk.jpg"
sample: false
---

AWS now serves Claude Opus 5 and Sonnet 5 in Seoul (ap-northeast-2) and Sonnet 5 in Singapore (ap-southeast-1) without cross-region inference profiles. Prompts and outputs stay in the region for the whole request, and throughput is limited to that region's capacity.

It uses the `bedrock-runtime` endpoint with direct model IDs such as `anthropic.claude-opus-5`, and supports the Messages, InvokeModel and Converse APIs.
