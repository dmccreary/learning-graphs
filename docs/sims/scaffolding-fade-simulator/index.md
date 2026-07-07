---
title: Scaffolding Fade Simulator
description: Given a slider controlling "fade rate" and a simulated learner whose mastery grows in response to practice attempts, the learner can adjust the fade rate to keep the simulated learner's task difficulty within their Zone of Proximal Development, avoiding both frustration (support removed too fast) and stagnation (support never removed).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Scaffolding Fade Simulator



<iframe src="main.html" width="100%" height="522"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Learning Theories and Instructional Design](../../chapters/07-learning-theories-instructional-design/index.md).

```text
Type: microsim
**sim-id:** scaffolding-fade-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners experiment with how quickly instructional support should fade as demonstrated mastery increases, connecting the abstract idea of "scaffolding" to a concrete, adjustable curve.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, apply, practice

Learning objective: Given a slider controlling "fade rate" and a simulated learner whose mastery grows in response to practice attempts, the learner can adjust the fade rate to keep the simulated learner's task difficulty within their Zone of Proximal Development, avoiding both frustration (support removed too fast) and stagnation (support never removed).

Canvas layout:
- Left (400px): line chart showing two curves over 20 simulated practice attempts — "Support Level" (starts high, decreases) and "Simulated Mastery" (starts low, increases)
- Right (200px): controls and status readout

Visual elements:
- X-axis: Practice Attempt (1-20)
- Y-axis: Level (0-100%)
- Support Level curve in blue, starting near 90% and decreasing according to the fade-rate slider
- Simulated Mastery curve in gold, increasing at a rate that depends on whether support stayed within the learner's current ZPD
- A shaded green band representing the "ZPD zone" — the range of task difficulty appropriate at each attempt

Interactive controls:
- Slider: "Fade Rate" (Slow, Medium, Fast) — controls how quickly Support Level decreases per attempt
- Button: "Run Simulation" — animates both curves attempt by attempt
- Button: "Reset"
- Display: status message updating each attempt, e.g., "Attempt 7: Support (62%) is within the learner's ZPD — mastery growing steadily" or "Attempt 7: Support removed too fast — learner frustration detected, mastery growth stalling"

Default parameters:
- Fade Rate: Medium
- Practice attempts: 20
- Initial Support Level: 90%
- Initial Simulated Mastery: 10%

Data Visibility Requirements:
  Stage 1: Show starting values (Support 90%, Mastery 10%) before any attempts run
  Stage 2: Show, attempt by attempt, the updated Support Level and Mastery values as plain numbers next to the chart, not just as curve positions
  Stage 3: Show the status message explaining whether the current gap between Support and Mastery falls inside or outside the shaded ZPD band
  Final: Show a summary comparing total mastery gained under Slow, Medium, and Fast fade rates side by side

Instructional Rationale: A parameter-exploration pattern is appropriate for this Apply-level objective because scaffolding is fundamentally a design decision about a rate of change, and a learner internalizes the trade-off best by directly manipulating that rate and observing the concrete numeric consequence, rather than by reading a static description of "fade support gradually."

Responsive behavior: chart and control panel stack vertically on viewports narrower than 600px

Canvas size: responsive, 100% width, 520px height

Implementation: p5.js for chart rendering and animation loop; mastery-growth formula implemented as a simple function of the gap between current Support Level and the ZPD band, exposed as commented, adjustable constants
```

## Related Resources

- [Chapter 7: Learning Theories and Instructional Design](../../chapters/07-learning-theories-instructional-design/index.md)
