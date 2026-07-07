---
title: Multiple-Choice vs. True/False Comparison Chart
description: Given a radar chart comparing the two quiz formats across four dimensions, the learner can differentiate the formats and recommend which one is appropriate for a stated assessment goal (e.g., "quickly check recall of ten facts" versus "diagnose a specific misconception").
status: scaffold
library: Chart.js
bloom_level: Analyze (L4)
---

# Multiple-Choice vs. True/False Comparison Chart



<iframe src="main.html" width="100%" height="622"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Assessment, Feedback, and Quizzes](../../chapters/10-assessment-feedback-quizzes/index.md).

```text
Type: chart
**sim-id:** quiz-format-comparison-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Purpose: Let learners compare Multiple-Choice Question and True/False Question across four practical dimensions, reinforcing that format choice is a deliberate design decision tied to what kind of feedback-log data an author needs.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare, contrast, examine

Learning objective: Given a radar chart comparing the two quiz formats across four dimensions, the learner can differentiate the formats and recommend which one is appropriate for a stated assessment goal (e.g., "quickly check recall of ten facts" versus "diagnose a specific misconception").

Chart type: Radar (spider) chart with two overlapping data series

Purpose: Show the relative strengths of Multiple-Choice Question and True/False Question across four assessment-design dimensions

Axes (four dimensions, each scored illustratively from 1-5):
1. Authoring speed (how quickly a question can be written)
2. Guess resistance (how hard it is to answer correctly without knowledge; true/false has a 50% guess rate vs. multiple-choice's lower rate with 3-4 options)
3. Diagnostic power (how much a wrong answer reveals about the specific misconception, via distractor selection)
4. Learner completion speed (how quickly a learner can answer)

Data series:
1. Multiple-Choice Question (blue): Authoring speed = 2, Guess resistance = 4, Diagnostic power = 5, Completion speed = 3
2. True/False Question (orange): Authoring speed = 5, Guess resistance = 2, Diagnostic power = 2, Completion speed = 5

Interactive features:
- Hover any axis point: tooltip states the exact illustrative score and one sentence explaining the rating (e.g., hovering True/False's Guess resistance point shows "A learner with zero knowledge has a 50% chance of guessing correctly, the weakest guess resistance of the two formats")
- Click a series name in the legend to toggle that format's shape on or off, isolating the other for closer inspection
- A dropdown below the chart: "Recommend a format for..." with sample goals (e.g., "Quick 10-question recall check" recommends True/False; "Diagnose a specific misconception" recommends Multiple-Choice); selecting a goal highlights the recommended series in the chart

Title: "Choosing a Quiz Format: Multiple-Choice vs. True/False"
Legend: positioned top-right, clickable per this diagram's interactive features

Color scheme: blue for Multiple-Choice Question, orange for True/False Question, matching this chapter's convention of blue for structured/higher-effort formats and orange for quick/lightweight ones

Responsive behavior: chart resizes to container width; on viewports narrower than 500px the recommendation dropdown moves above the chart

Canvas size: responsive, 100% width, 480px height

Implementation: Chart.js radar chart type; illustrative scores are fixed, labeled data representing general assessment-design trade-offs rather than a live-computed statistic
```

## Related Resources

- [Chapter 10: Assessment, Feedback, and Quizzes](../../chapters/10-assessment-feedback-quizzes/index.md)
