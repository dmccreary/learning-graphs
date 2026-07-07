---
title: Nine Events of Instruction Explorer
description: Given Gagné's nine-step framework rendered as a flowchart, the learner can explain what instructional purpose each step serves and classify which earlier chapter's concept each step operationalizes.
status: scaffold
library: Mermaid
bloom_level: Understand (L2)
---

# Nine Events of Instruction Explorer



<iframe src="main.html" width="100%" height="922"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Mastery, Metacognition, and Instructional Sequencing](../../chapters/09-mastery-metacognition-sequencing/index.md).

```text
Type: workflow
**sim-id:** nine-events-explorer<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through Gagné's nine sequential instructional events and see, for each one, both a plain-language description and the specific cross-chapter concept it corresponds to, reinforcing that the framework operationalizes ideas already covered rather than introducing an unrelated ninth theory.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, classify

Learning objective: Given Gagné's nine-step framework rendered as a flowchart, the learner can explain what instructional purpose each step serves and classify which earlier chapter's concept each step operationalizes.

Visual style: Mermaid flowchart, top-to-bottom, nine sequential rectangular nodes connected by arrows in strict order (no branching)

Steps (each is one Mermaid node with a `click` directive):
1. "Gain Attention" — click reveals: "Signals to the learner that something worth their focus is beginning."
2. "Inform Objectives" — click reveals: "States the learning objective in observable terms (Chapter 6)."
3. "Stimulate Recall of Prior Knowledge" — click reveals: "This is Prior Knowledge Activation from Chapter 8, named independently by Gagné."
4. "Present Content" — click reveals: "Delivers the new material itself."
5. "Provide Learning Guidance" — click reveals: "Offers scaffolding and worked examples (Chapter 7)."
6. "Elicit Performance" — click reveals: "Has the learner practice or demonstrate the skill."
7. "Provide Feedback" — click reveals: "Gives specific, corrective information about that practice."
8. "Assess Performance" — click reveals: "Formally verifies mastery, gating advancement (Chapter 7's Mastery Learning)."
9. "Enhance Retention and Transfer" — click reveals: "Applies Spaced Repetition and connects the concept to new contexts."

Interactive features: every node has a `click NodeId call showInfo("...")` Mermaid directive; clicking opens an infobox panel below the diagram showing the step's full description and its cross-chapter concept link; hovering a node shows a short tooltip preview before clicking

Color scheme: all nine nodes share one teal fill by default; the node most recently clicked highlights in gold until another node is clicked

Responsive behavior: flowchart scales to container width; on viewports narrower than 600px the infobox panel appears below the diagram instead of beside it

Canvas size: responsive, 100% width, 520px height

Implementation: Mermaid.js flowchart with `click` bindings wired to a small JavaScript `showInfo()` function that populates a div below the diagram with the selected step's stored description text
```

## Related Resources

- [Chapter 9: Mastery, Metacognition, and Instructional Sequencing](../../chapters/09-mastery-metacognition-sequencing/index.md)
