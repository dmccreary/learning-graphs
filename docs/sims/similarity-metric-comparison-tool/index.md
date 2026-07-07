---
title: Similarity Metric Comparison Tool
description: Given two feature vectors representing either two concepts, two students, or two content items, the learner can apply the cosine similarity formula by adjusting vector values with sliders and observing how the resulting similarity score changes, and can demonstrate why increasing shared feature values raises the score while divergent values lower it.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Similarity Metric Comparison Tool



<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Personalization and Adaptive Learning Paths](../../chapters/16-personalization-adaptive-learning-paths/index.md).

```text
Type: microsim
**sim-id:** similarity-metric-comparison-tool<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners select a comparison type (concept-to-concept, student-to-student, or content-to-content), adjust the underlying feature vectors with sliders, and watch the computed cosine similarity score update live, making the abstract similarity-metric formula concrete across all three similarity types this chapter defines.

Bloom Level: Apply (L3)
Bloom Verb: apply, calculate, demonstrate, use

Learning objective: Given two feature vectors representing either two concepts, two students, or two content items, the learner can apply the cosine similarity formula by adjusting vector values with sliders and observing how the resulting similarity score changes, and can demonstrate why increasing shared feature values raises the score while divergent values lower it.

Canvas layout:
- Top: a three-way selector (radio buttons or tabs): "Concept Similarity", "Student Similarity", "Content Similarity"
- Middle (500px): five paired sliders, one pair per feature dimension, labeled according to the selected comparison type (e.g., for Student Similarity: "Mastered: Graph Theory", "Mastered: Taxonomy", "Mastered: Cognitive Load", "Quiz Accuracy", "Time on Task" — each slider pair shows Learner A's value and Learner B's value side by side)
- Bottom (100px): a large numeric similarity score (0.00 to 1.00) with a horizontal bar gauge, plus a one-sentence plain-language interpretation ("These two students are highly similar" for scores above 0.8, "These two students have little in common" for scores below 0.3)

Visual elements:
- Five vertical slider pairs (A value in blue, B value in orange), each ranging 0-10
- A live-updating bar gauge showing the computed cosine similarity score, color-coded green (high similarity) to red (low similarity)
- Labels update automatically when the comparison type selector changes, pulling from three small pre-set label sets (concept features, student features, content features)

Interactive controls:
- Three-way selector: comparison type
- Ten sliders total (five feature dimensions times two items, A and B), each 0-10
- Button: "Randomize Both Vectors"
- Button: "Make Identical" — sets B's sliders to match A's exactly, demonstrating a similarity score of 1.00
- Button: "Make Opposite" — sets B's sliders to maximally diverge from A's, demonstrating a low similarity score

Default parameters:
- Comparison type: Student Similarity
- All ten sliders start at mid-range (5), producing a starting similarity score near 1.00 to demonstrate the identical-vector case first

Data Visibility Requirements:
Stage 1: Show all sliders at default mid-range values with the resulting high similarity score, and a caption explaining that identical vectors always produce the maximum score
Stage 2: As the learner drags any slider, show the similarity score recompute in real time, with the changed slider briefly highlighted
Stage 3: After clicking "Make Opposite," show the score drop toward its minimum with a caption explaining that divergent vectors produce low similarity regardless of how "large" the values are individually
Final: After switching comparison type, show all labels and the score recompute for the new comparison type's pre-set default vectors, reinforcing that the same mathematical formula underlies all three similarity types

Instructional Rationale: An Apply-level objective asking the learner to apply a formula is best served by direct manipulation of the formula's inputs with immediate recalculation of its output, letting the learner build intuition for how vector agreement drives the score rather than only reading the formula's mathematical definition.

Responsive behavior: slider panel and score gauge stack vertically on viewports narrower than 700px; sliders switch to a compact stacked layout rather than side-by-side pairs

Canvas size: responsive, 100% width, 600px height

Implementation: p5.js; cosine similarity computed directly from the ten slider values as two five-dimensional vectors using the standard dot-product-over-norms formula; three label sets stored as small JavaScript objects keyed by comparison type
```

## Related Resources

- [Chapter 16: Personalization and Adaptive Learning Paths](../../chapters/16-personalization-adaptive-learning-paths/index.md)
