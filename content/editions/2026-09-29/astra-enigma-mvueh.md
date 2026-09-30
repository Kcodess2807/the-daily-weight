---
date: "2026-09-29"
title: "GPT-6 Astra breaks an Enigma message that had resisted solution since 2005"
authors: ["Frode Weierud"]
url: "https://www.cryptocellar.org/bgac/the-mvueh-break.html"
discuss_url: "https://news.ycombinator.com/item?id=49801324"
source: hn
section: research
interest_score: 8
recommended: true
must_read: false
why_read: "A documented, checkable case of a model choosing an open problem, building its own tools and finding the crib that humans had missed."
summary: "Directed by Carter Leffen, GPT-6 Astra broke the 82-letter 1941 Army message MVUEH in about two days using a crib from a linked message."
image: "/images/astra-enigma-mvueh.jpg"
image_credit: "Nachosan / Wikimedia Commons, CC BY-SA 3.0"
image_source: "https://commons.wikimedia.org/wiki/File:Enigma_machine_National_Museum_of_Scotland_10.JPG"
sample: false
---

Crypto Cellar Research, which has catalogued unbroken German Enigma traffic for two decades, reports that GPT-6 Astra broke MVUEH, an 82-letter Army message sent on 10 July 1941 that had resisted solution since 2005. Carter Leffen directed the work on September 15, and it took about two days.

According to the write-up, the model reviewed the remaining unbroken messages, picked MVUEH as the most promising, and found a plaintext link to message Nr. 173 (SIPVX) that supplied the repeated crib "ROSENOW ROSENOW". It wrote its own Enigma simulator in Python and C++. MVUEH turned out to use wheel order 253 rather than the 512 used by the other messages that day, with entirely different plugs and ring settings, which helps explain why earlier attempts failed.

The page flags complications: transcription errors in the ciphertext and a left-hand wheel turnover at the 72nd letter. It also notes it is unclear how the model obtained the Bundesarchiv file references it cited.
