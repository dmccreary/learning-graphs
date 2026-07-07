---
title: Working Memory Load Simulator
description: Given a set of 12 raw information items, the learner can apply chunking to group them into fewer meaningful units and observe, through a live load meter, how grouping and prior-knowledge activation reduce effective working memory load below the four-to-seven item constraint.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Working Memory Load Simulator



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Cognitive Load and Knowledge Space Theory](../../chapters/08-cognitive-load-knowledge-space-theory/index.md).

```text
Type: microsim
**sim-id:** working-memory-load-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners directly experience the Working Memory Constraint by comparing how many discrete items versus chunked items they can hold, then see how Chunking and Prior Knowledge Activation change the effective load of the same information set.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, apply, practice

Learning objective: Given a set of 12 raw information items, the learner can apply chunking to group them into fewer meaningful units and observe, through a live load meter, how grouping and prior-knowledge activation reduce effective working memory load below the four-to-seven item constraint.

Canvas layout:
- Left (420px): a "workbench" showing 12 draggable item tiles (unchunked) that the learner can group into boxes
- Right (180px): a vertical "Working Memory Load" gauge (0-12 items) with a shaded red zone above 7 and green zone at or below 7

Visual elements:
- 12 small tiles, each labeled with a short concept fragment (e.g., "199", "706", "1509" style groupings using this chapter's own five cognitive-load terms split into sub-fragments)
- Empty "chunk boxes" the learner can drag tiles into
- Load gauge needle that moves in real time as tiles are grouped or ungrouped
- A toggle labeled "Activate Prior Knowledge" that, when on, visually pre-fills one chunk box automatically, demonstrating that an already-activated schema does not count against the load gauge

Interactive controls:
- Drag-and-drop: move tiles into chunk boxes
- Button: "Reset Workbench"
- Toggle: "Activate Prior Knowledge" (off by default)
- Display: numeric readout of current effective load next to the gauge

Default parameters:
- 12 ungrouped tiles at start, load gauge reads 12 (red zone)
- Prior Knowledge Activation toggle: off

Data Visibility Requirements:
  Stage 1: Show all 12 raw tiles ungrouped, load gauge at 12, red zone, with the label "Exceeds Working Memory Constraint"
  Stage 2: As the learner drags tiles into a shared box, show the gauge recompute to count the box as one item, updating the numeric readout live
  Stage 3: Show the gauge drop into the green zone once total effective items reach 7 or fewer
  Final: Show a side-by-side comparison of "load with no chunking" versus "load with chunking and prior knowledge activation" as two numbers

Instructional Rationale: An Apply-level objective calling for direct manipulation of a limited resource is best served by a hands-on parameter-exploration pattern rather than animation, because the learner needs to personally perform the act of chunking and see its numeric consequence, not merely watch a narrated demonstration of the concept.

Responsive behavior: chunk boxes and gauge stack vertically on viewports narrower than 640px; tiles remain draggable via touch events on mobile

Canvas size: responsive, 100% width, 540px height

Implementation: p5.js with a simple array-of-objects model for tiles and chunk boxes; drag-and-drop via mouse/touch event handlers; load calculation is a plain JavaScript function counting occupied boxes plus unassigned tiles
```

## Related Resources

- [Chapter 8: Cognitive Load and Knowledge Space Theory](../../chapters/08-cognitive-load-knowledge-space-theory/index.md)
