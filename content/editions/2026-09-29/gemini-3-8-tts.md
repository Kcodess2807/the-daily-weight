---
date: "2026-09-29"
title: "Gemini 3.8 TTS models take acting direction and clone voices from 30 seconds"
authors: ["Leland Rechis", "Alan Cowen"]
url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/"
discuss_url: "https://news.ycombinator.com/item?id=49817615"
source: labs
section: models
interest_score: 7
recommended: true
must_read: false
why_read: "Two speech models in the Gemini API with line-level direction, native two-speaker output and hours-long generation, all watermarked."
summary: "Gemini 3.8 Flash TTS and Flash-Lite TTS: 100+ languages, 2,000+ voices, 30-second voice cloning, SynthID on all output."
image: "/images/gemini-3-8-tts.jpg"
image_credit: "Justin De La Ornellas from China Town, Hawaii / Wikimedia Commons, CC BY 2.0"
image_source: "https://commons.wikimedia.org/wiki/File:Studio_microphone_rack,_Avex_Honolulu_Studios.jpg"
sample: false
---

Google released two text-to-speech models on September 23, Gemini 3.8 Flash TTS and Gemini 3.8 Flash-Lite TTS, in the Gemini API and AI Studio. They cover more than 100 languages and dialects with over 2,000 voices, accept line-by-line acting direction, voice two speakers natively and can generate hours of long-form audio.

Voice cloning works from a 30-second sample, with consent checks, but is not available in Illinois, Texas, the EEA, the UK, Switzerland or India. All output carries SynthID watermarks and C2PA credentials. The post does not list prices.

A day later Google added [Gemini 3.8 Live with Live Avatar](https://deepmind.google/blog/introducing-gemini-38-live-with-live-avatar/) to Gemini Enterprise: a lip-synced avatar that takes audio and video at once, runs tools in the background while it talks, and supports 97 languages. Simon Willison built a [playground](https://tools.simonwillison.net/gemini-tts-playground) for the TTS models.
