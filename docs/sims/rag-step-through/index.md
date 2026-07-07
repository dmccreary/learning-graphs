---
title: Retrieval-Augmented Generation Step-Through
description: Given a worked example question ("What is Universal Design for Learning?"), the learner can explain what happens at each of the three RAG stages and identify why the retrieved passage changes the final generated answer compared to an ungrounded response.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Retrieval-Augmented Generation Step-Through



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Intelligent Agents and Generative AI](../../chapters/17-intelligent-agents-generative-ai/index.md).

```text
Type: microsim
**sim-id:** rag-step-through<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners step through the retrieve-augment-generate sequence with a concrete worked example (a question about a glossary term), seeing the actual retrieved text and augmented prompt at each stage, to make the abstract RAG technique concrete before GraphRAG extends it in the next section.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, sequence

Learning objective: Given a worked example question ("What is Universal Design for Learning?"), the learner can explain what happens at each of the three RAG stages and identify why the retrieved passage changes the final generated answer compared to an ungrounded response.

Canvas layout:
- Top: a fixed example query displayed as text: "What is Universal Design for Learning?"
- Middle (350px): a three-stage horizontal step panel (Retrieve / Augment / Generate), with Next and Previous buttons
- Bottom (150px): a comparison box showing "Without RAG" (a generic, possibly imprecise answer) side by side with "With RAG" (the grounded answer citing the retrieved passage)

Visual elements:
- Stage 1 "Retrieve" panel: shows a simulated search over a small three-document knowledge source, highlighting the one passage that matches (Chapter 16's actual UDL definition, three sentences)
- Stage 2 "Augment" panel: shows the original query and the retrieved passage combined into one augmented prompt block, visually distinguishing the original question (blue) from the inserted context (gold)
- Stage 3 "Generate" panel: shows the model's final answer, with the phrase drawn directly from the retrieved passage underlined

Interactive controls:
- "Next" and "Previous" buttons to move between the three stages
- Toggle: "Show Without-RAG Comparison" — reveals the bottom comparison box

Default parameters:
- Starts at Stage 1 (Retrieve); comparison box hidden until toggled on

Data Visibility Requirements:
Stage 1: Show the three-document mini knowledge source and highlight which document/passage the retrieval step selects, with a caption explaining why it was selected (keyword and topic match)
Stage 2: Show the exact augmented prompt text, with original query and retrieved passage visually distinguished
Stage 3: Show the generated answer with the grounded phrase underlined, and a caption: "This phrase came directly from the retrieved passage, not from the model's memory"
Final: With the comparison toggle on, show both answers side by side with a caption naming the specific difference (e.g., the without-RAG answer omits the three-principles structure Chapter 16 defines)

Instructional Rationale: An Understand-level objective requires the learner to trace a process with concrete data at each stage; a step-through with a fixed worked example and Next/Previous controls makes the transformation from query to grounded answer visible, which continuous animation would obscure.

Responsive behavior: three-stage panel and comparison box stack vertically on viewports narrower than 700px

Canvas size: responsive, 100% width, 560px height

Implementation: p5.js; three pre-scripted stages with fixed example text (no live model call); Next/Previous buttons advance a stage index that swaps which panel is visible
```

## Related Resources

- [Chapter 17: Intelligent Agents and Generative AI](../../chapters/17-intelligent-agents-generative-ai/index.md)
