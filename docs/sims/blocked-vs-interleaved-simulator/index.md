---
title: Blocked vs. Interleaved Practice Simulator
description: Given the same 12-problem practice set, the learner can differentiate blocked and interleaved scheduling by observing simulated in-practice accuracy versus simulated one-week-delayed accuracy for each schedule, and explain why the two accuracy patterns diverge.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Blocked vs. Interleaved Practice Simulator



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Mastery, Metacognition, and Instructional Sequencing](../../chapters/09-mastery-metacognition-sequencing/index.md).

```text
Type: microsim
**sim-id:** blocked-vs-interleaved-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners directly compare blocked and interleaved practice schedules on the same 12-problem set (four problems each from three concept types: graph traversal, dependency validation, and taxonomy classification), observing why interleaving feels harder during practice but produces a better delayed-recall score.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare, contrast, examine

Learning objective: Given the same 12-problem practice set, the learner can differentiate blocked and interleaved scheduling by observing simulated in-practice accuracy versus simulated one-week-delayed accuracy for each schedule, and explain why the two accuracy patterns diverge.

Canvas layout:
- Left (420px): a practice-session timeline showing 12 problem tiles in sequence, color-coded by concept type (graph traversal = blue, dependency validation = orange, taxonomy classification = green)
- Right (180px): two bar readouts — "In-Practice Accuracy" and "Simulated 1-Week-Later Accuracy" — that update after each run

Visual elements:
- 12 problem tiles arranged left to right in the order they will be attempted
- A toggle: "Blocked" arranges tiles as BBBB-OOOO-GGGG (grouped by color); "Interleaved" arranges the same 12 tiles in mixed order (e.g., B-O-G-B-G-O-B-G-O-G-B-O)
- A "Run Simulated Session" button that animates a highlight moving across the 12 tiles in order
- Two bar charts that fill in after the run completes, using pre-set illustrative values: Blocked shows high in-practice accuracy (~90%) and low delayed accuracy (~55%); Interleaved shows lower in-practice accuracy (~70%) and higher delayed accuracy (~80%)

Interactive controls:
- Toggle: "Blocked" / "Interleaved" schedule
- Button: "Run Simulated Session"
- Button: "Reset"
- Hover on any bar: tooltip states the exact percentage and one sentence explaining the pattern (e.g., "Interleaved delayed accuracy is higher because each retrieval required identifying the concept type first")

Default parameters:
- Schedule: Blocked
- No session run yet; bars empty

Data Visibility Requirements:
  Stage 1: Show the 12-tile sequence in the selected schedule's order, unrun
  Stage 2: On "Run Simulated Session," show the highlight traveling tile by tile, with a small checkmark or X appearing per tile based on the schedule's illustrative in-practice accuracy
  Stage 3: Show the "In-Practice Accuracy" bar fill immediately after the run
  Final: Show the "Simulated 1-Week-Later Accuracy" bar fill with a one-sentence caption contrasting it against the in-practice bar for the same schedule

Instructional Rationale: An Analyze-level objective requires the learner to compare two conditions and explain why their outcomes diverge, which is best served by letting the learner run both schedules themselves and see the two accuracy metrics side by side, rather than simply reading a claim about the testing literature.

Responsive behavior: timeline and bar readouts stack vertically on viewports narrower than 640px

Canvas size: responsive, 100% width, 540px height

Implementation: p5.js; tile sequence stored as an array of {concept, order} objects; accuracy bars use pre-set illustrative values (not live-computed statistics) clearly labeled as representative of published research patterns rather than a live experiment
```

## Related Resources

- [Chapter 9: Mastery, Metacognition, and Instructional Sequencing](../../chapters/09-mastery-metacognition-sequencing/index.md)
