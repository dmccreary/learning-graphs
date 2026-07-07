---
title: Hyper-Personalization Input Explorer
description: Given four togglable personalization inputs, the learner can differentiate which aspects of a simulated lesson recommendation change in response to each input, and explain why combining multiple inputs produces a more individualized result than any single input alone.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Hyper-Personalization Input Explorer



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Personalization and Adaptive Learning Paths](../../chapters/16-personalization-adaptive-learning-paths/index.md).

```text
Type: microsim
**sim-id:** hyper-personalization-input-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners toggle individual data inputs (mastery record, quiz performance, stated preferences, time-of-day pattern) on and off and observe how a simulated lesson-plan recommendation panel changes, making concrete that hyper-personalization is the combined product of several independent data sources rather than one single signal.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine, distinguish, compare

Learning objective: Given four togglable personalization inputs, the learner can differentiate which aspects of a simulated lesson recommendation change in response to each input, and explain why combining multiple inputs produces a more individualized result than any single input alone.

Canvas layout:
- Left (320px): four toggle switches, one per input source, each with a one-line label
- Right (380px): a "Recommended Lesson Plan" card that updates live, showing a concept name, a content format (video, text, MicroSim, quiz), and a pacing note

Visual elements:
- Toggle 1: "Mastery Record" — when on, the recommended concept respects the ready-to-learn rule from Chapter 3
- Toggle 2: "Quiz Performance" — when on, the content format shifts toward more scaffolded formats (text plus MicroSim) if simulated recent quiz accuracy is low
- Toggle 3: "Stated Preferences" — when on, the content format shifts toward the learner's declared preferred format (e.g., video-first)
- Toggle 4: "Time-of-Day Pattern" — when on, the pacing note adjusts (e.g., "shorter 10-minute segment recommended" during a simulated low-focus time window)
- The lesson plan card visibly changes its concept, format, or pacing note as each toggle is switched, with a brief highlight animation on the field that just changed

Interactive controls:
- Four independent toggle switches (all default off)
- Button: "Randomize Simulated Learner Data" — regenerates the underlying simulated mastery record, quiz history, preference, and time pattern
- Button: "Reset All Toggles"

Default parameters:
- All four toggles off; lesson plan card shows a generic, non-personalized placeholder recommendation
- One pre-set simulated learner profile loaded by default; "Randomize" generates a new one

Data Visibility Requirements:
Stage 1: With all toggles off, show the generic placeholder recommendation and a caption: "No personalization inputs active"
Stage 2: As each toggle is switched on, show the specific field of the lesson plan card that changes, with a one-sentence caption naming which input drove the change
Stage 3: With multiple toggles on simultaneously, show the lesson plan card reflecting the combined effect (e.g., mastery record picks the concept, preferences pick the format, time-of-day picks the pacing)
Final: With all four toggles on, show a caption: "This is hyper-personalization: four independent signals combined into one recommendation"

Instructional Rationale: An Analyze-level objective requires the learner to isolate the contribution of each input, which is best served by letting the learner toggle inputs independently and observe exactly which output field each one controls, rather than reading a static description of a combined system.

Responsive behavior: toggle panel and lesson plan card stack vertically on viewports narrower than 640px

Canvas size: responsive, 100% width, 560px height

Implementation: p5.js; four boolean toggle states drive a simple rule-based function that selects concept, format, and pacing text from small pre-set lookup tables rather than a live machine-learning model, clearly labeled as an illustrative simulation
```

## Related Resources

- [Chapter 16: Personalization and Adaptive Learning Paths](../../chapters/16-personalization-adaptive-learning-paths/index.md)
