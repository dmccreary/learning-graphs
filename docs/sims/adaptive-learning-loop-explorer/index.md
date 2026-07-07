---
title: Adaptive Learning Loop Explorer
description: Given the four-stage adaptive learning loop rendered as a cyclic flowchart, the learner can explain what happens at each stage and classify which earlier-chapter mechanism (ready-to-learn rule, mastery gate, content sequencing algorithm) performs it.
status: scaffold
library: Mermaid
bloom_level: Understand (L2)
---

# Adaptive Learning Loop Explorer



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Personalization and Adaptive Learning Paths](../../chapters/16-personalization-adaptive-learning-paths/index.md).

```text
Type: workflow
**sim-id:** adaptive-learning-loop-explorer<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through the four-stage cycle that defines adaptive learning (present, observe, adjust, repeat) and see, for each stage, a plain-language description plus which earlier-chapter concept powers it, reinforcing that adaptive learning is a continuous loop rather than a single decision.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, classify

Learning objective: Given the four-stage adaptive learning loop rendered as a cyclic flowchart, the learner can explain what happens at each stage and classify which earlier-chapter mechanism (ready-to-learn rule, mastery gate, content sequencing algorithm) performs it.

Visual style: Mermaid flowchart arranged as a closed loop (four nodes connected in a cycle, with the fourth node's arrow returning to the first)

Steps (each is one Mermaid node with a click directive):
1. "Present Content" — click reveals: "The learner receives a concept, activity, or assessment chosen for their current mastery record."
2. "Observe Performance" — click reveals: "The system records how the learner performed — correct, incorrect, time taken, hints used."
3. "Adjust Recommendation" — click reveals: "Chapter 9's content sequencing algorithm recomputes the ready-to-learn set and reprioritizes it using the new evidence."
4. "Repeat" — click reveals: "The loop runs again on the next interaction, continually, rather than once at course start."

Interactive features: every node has a click directive that opens an infobox below the diagram with the step's description; the currently selected node highlights in gold; a small looping arrow animation on the edge from step 4 back to step 1 emphasizes the cycle never terminates

Color scheme: all four nodes share one indigo fill by default; selected node highlights gold

Responsive behavior: flowchart scales to container width; infobox appears below the diagram on viewports narrower than 600px

Canvas size: responsive, 100% width, 420px height

Implementation: Mermaid.js flowchart with click bindings wired to a JavaScript showInfo() function populating a div below the diagram with the selected step's stored description text
```

## Related Resources

- [Chapter 16: Personalization and Adaptive Learning Paths](../../chapters/16-personalization-adaptive-learning-paths/index.md)
