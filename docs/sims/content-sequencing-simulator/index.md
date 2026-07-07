---
title: Content Sequencing Algorithm Simulator
description: Given a ten-node sample dependency graph and a togglable mastery state for each node, the learner can apply the ready-to-learn rule to correctly identify which nodes the algorithm should recommend next, and can explain how enabling a spaced-repetition weighting changes that recommendation.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Content Sequencing Algorithm Simulator



<iframe src="main.html" width="100%" height="582"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Mastery, Metacognition, and Instructional Sequencing](../../chapters/09-mastery-metacognition-sequencing/index.md).

```text
Type: microsim
**sim-id:** content-sequencing-simulator<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners act as the content sequencing algorithm themselves on a small ten-node sample learning graph, toggling which nodes are "mastered" and watching the set of valid next-concept recommendations update live, making visible exactly how mastery data and graph structure combine to produce a personalized recommendation.

Bloom Level: Apply (L3)
Bloom Verb: apply, demonstrate, use, practice

Learning objective: Given a ten-node sample dependency graph and a togglable mastery state for each node, the learner can apply the ready-to-learn rule to correctly identify which nodes the algorithm should recommend next, and can explain how enabling a spaced-repetition weighting changes that recommendation.

Canvas layout:
- Left (480px): vis-network view of a ten-node sample graph (reusing this book's own Arithmetic/Number Sense/Algebra/Applied Calculus branch plus six additional nodes across two other small branches)
- Right (200px): a "Recommended Next" panel listing current top recommendations, plus controls

Visual elements:
- Ten nodes, each togglable between three states by clicking: Not Mastered (gray), Mastered (green), Due for Review (amber — only reachable from Mastered after the "Simulate Time Passing" button is used)
- Directed edges in dependency direction, matching this chapter's and earlier chapters' convention
- A highlighted ring around any node currently in the "Recommended Next" set

Interactive controls:
- Click any node: cycles it through Not Mastered → Mastered → Not Mastered (toggle)
- Button: "Simulate Time Passing" — randomly marks one or two already-Mastered nodes as Due for Review (amber), modeling the forgetting curve from this chapter's spaced-repetition section
- Toggle: "Weight Spaced Repetition" (off by default) — when on, Due for Review nodes are added to the Recommended Next panel even though they are already mastered
- Toggle: "Prefer Interleaving" (off by default) — when on and multiple branches have ready-to-learn nodes, the panel recommends nodes from different branches rather than several from the same branch
- Button: "Reset"

Default parameters:
- All ten nodes start Not Mastered except the two foundational nodes (no prerequisites), which start Mastered
- Both weighting toggles start off

Data Visibility Requirements:
  Stage 1: Show the graph with only foundational nodes mastered, and the Recommended Next panel listing exactly the nodes whose prerequisites are all mastered
  Stage 2: As the learner clicks nodes to Mastered, show the Recommended Next panel recompute in real time to include newly-ready nodes and drop the just-mastered one
  Stage 3: After "Simulate Time Passing," show one or two nodes turn amber, and show the Recommended Next panel unchanged until "Weight Spaced Repetition" is toggled on, at which point the amber nodes appear in the panel alongside any newly ready-to-learn nodes
  Final: With "Prefer Interleaving" on and ready nodes available in two different branches, show the panel explicitly grouping its top recommendation from a different branch than the immediately prior recommendation, with a caption explaining why

Instructional Rationale: An Apply-level objective asking the learner to use the ready-to-learn rule themselves is best served by direct manipulation of mastery state with an immediately recomputed recommendation, because the learner needs to personally trigger the rule's logic and observe its output changing, rather than watch a passive description of the algorithm.

Responsive behavior: graph view and Recommended Next panel stack vertically on viewports narrower than 700px

Canvas size: responsive, 100% width, 580px height

Implementation: vis-network for graph rendering; ready-to-learn computation is a plain JavaScript function checking, for each Not Mastered node, whether all of its dependency-direction neighbors are in the Mastered set; spaced-repetition and interleaving weighting implemented as simple re-ranking functions applied to the base ready-to-learn set
```

## Related Resources

- [Chapter 9: Mastery, Metacognition, and Instructional Sequencing](../../chapters/09-mastery-metacognition-sequencing/index.md)
