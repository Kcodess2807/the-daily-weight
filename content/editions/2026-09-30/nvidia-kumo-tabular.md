---
date: "2026-09-30"
title: "Nvidia's Kumo Tabular predicts on tables in one forward pass, no training"
authors: ["Martin Jurkovic", "Jingang Qu", "Kashif Rasul"]
url: "https://huggingface.co/blog/nvidia/kumo-tabular"
discuss_url: null
source: labs
section: models
interest_score: 6
recommended: true
must_read: false
why_read: "Most production ML is still tabular. An open, commercially usable in-context model that tops TabArena is a real alternative to tuning gradient-boosted trees per dataset."
summary: "Open 28M-215M parameter models trained only on synthetic tables; Nvidia reports first place on TabArena at 17x the speed of LimiX-2."
image: "/images/nvidia-kumo-tabular.jpg"
image_credit: "Syced / Wikimedia Commons, CC0"
image_source: "https://commons.wikimedia.org/wiki/File:Abacus_actually_in_use_at_kimono_shop_in_Otaru.jpg"
sample: false
---

Kumo Tabular is a family of open foundation models for classification and regression on tables. It uses in-context learning: the training rows go in as context and predictions come out in one forward pass, with no fitting or hyperparameter search. There are three sizes, 28M, 81M and 215M parameters, trained only on 35 to 137 million synthetic tables generated from structural causal models.

Nvidia reports an Elo of 1950 and first place on TabArena, 17 times faster than LimiX-2, plus first place on TALENT and ScoringBench. Weights are on [Hugging Face](https://huggingface.co/nvidia/Kumo-Tabular) under OpenMDW-1.1, which permits commercial use, with code in NVIDIA's structured-data-models repository. The blog lists more than 30 authors.
