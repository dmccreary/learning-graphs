---
title: Bloom's Taxonomy Pyramid Explorer
description: Given the six-level pyramid, the learner can click each level and correctly recall its name, its position in the hierarchy, and at least two associated action verbs.
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# Bloom's Taxonomy Pyramid Explorer



<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Bloom's Taxonomy and Learning Objectives](../../chapters/06-blooms-taxonomy-learning-objectives/index.md).

```text
Type: infographic
**sim-id:** blooms-pyramid-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Give learners a persistent, clickable reference for the six cognitive-domain levels, their defining verbs, and one worked example per level drawn from this book's own concept list, before the chapter defines each level in prose.

Bloom Level: Remember (L1)
Bloom Verb: identify, recall, name

Learning objective: Given the six-level pyramid, the learner can click each level and correctly recall its name, its position in the hierarchy, and at least two associated action verbs.

Visual elements:
- A six-tier pyramid, widest at the bottom, drawn with p5.js `beginShape()`/`vertex()` trapezoids
- Bottom to top: Remembering, Understanding, Applying, Analyzing, Evaluating, Creating
- Each tier shaded a different color along a single blue-to-gold gradient (blue at the base, gold at the peak) to visually reinforce "increasing complexity" without implying one level is more "correct" than another
- Each tier labeled with its level name and level number (L1–L6) in bold

Interactive controls:
- Click any tier: an infobox to the right of the pyramid displays the level's full definition, its list of Bloom Verbs (e.g., Understanding shows "explain, summarize, interpret, classify, compare, contrast, exemplify, infer"), and one example objective written against a concept from this book (e.g., Analyzing shows "Differentiate a structural check from a coverage check")
- Hover any tier: tier highlights with a lighter shade and a tooltip shows just the level name and number
- Button: "Reset View" — clears the selected infobox

Default state: no tier selected, infobox shows prompt text "Click a level to see its verbs and an example"

Responsive behavior: canvas and pyramid redraw proportionally on window resize using p5.js `windowResized()`; infobox panel stacks below the pyramid on narrow viewports rather than beside it

Canvas size: responsive, 100% width, 560px height, minimum 600px internal drawing width before infobox reflows below

Implementation: p5.js for pyramid rendering and click hit-testing against tier boundaries; infobox rendered as an HTML div positioned via CSS flexbox next to the canvas
```

## Related Resources

- [Chapter 6: Bloom's Taxonomy and Learning Objectives](../../chapters/06-blooms-taxonomy-learning-objectives/index.md)
