---
title: Topological Sort Step-Through
description: Given a seven-node sample dependency graph (matching the Arithmetic/Number Sense/Algebra/Applied Calculus example plus three additional nodes), the learner can explain, step by step, why a node becomes eligible for the output order only once all of its prerequisite nodes have already been placed.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Topological Sort Step-Through



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Cognitive Load and Knowledge Space Theory](../../chapters/08-cognitive-load-knowledge-space-theory/index.md).

```text
Type: microsim
**sim-id:** topological-sort-stepper<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners step through Kahn's algorithm for topological sort on a small sample dependency graph, seeing exactly which nodes become eligible at each step and why, rather than only reading the final ordered list.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, interpret

Learning objective: Given a seven-node sample dependency graph (matching the Arithmetic/Number Sense/Algebra/Applied Calculus example plus three additional nodes), the learner can explain, step by step, why a node becomes eligible for the output order only once all of its prerequisite nodes have already been placed.

Canvas layout:
- Left (450px): vis-network graph view of the seven sample nodes and their dependency edges
- Right (250px): a running "Output Order" list and an "Eligible Now" list, both updated at each step

Visual elements:
- Seven nodes: Arithmetic, Number Sense, Algebra, Geometry, Trigonometry, Functions, Applied Calculus
- Directed edges matching this chapter's arrow convention (dependent to prerequisite)
- Node color states: gray = "not yet placed," gold = "eligible this step," green = "placed in output order"

Interactive controls:
- Button: "Next Step" — advances the algorithm by exactly one placement
- Button: "Reset"
- Display: text explanation updating each step, e.g., "Step 3: Algebra is now eligible because both its prerequisites (Arithmetic, Number Sense) are already in the output order"

Default parameters:
- All seven nodes start gray, Output Order list empty
- Eligible Now list starts with only the foundational nodes (no outgoing edges): Arithmetic, Number Sense

Data Visibility Requirements:
  Stage 1: Show the full unordered graph with the Eligible Now list computed as only foundational nodes
  Stage 2: On each "Next Step" click, show one node moving from Eligible Now (gold) to Output Order (green), and show the Eligible Now list recompute to include any newly-unblocked node
  Stage 3: Show the growing Output Order list as an explicit numbered sequence, not just colored nodes
  Final: Show the complete valid topological order as a numbered list, with a caption noting this is one of several valid orders for this graph

Instructional Rationale: A step-through pattern with explicit data visibility is appropriate for this Understand-level objective because the learner must trace exactly which nodes are eligible at each intermediate stage; a continuous animation would show the final order without letting the learner verify or predict each individual placement decision.

Responsive behavior: graph view and output/eligible lists stack vertically on viewports narrower than 700px

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network for graph rendering; Kahn's algorithm implemented in plain JavaScript tracking in-degree counts per node, exposing each step's state to the UI before advancing
```

## Related Resources

- [Chapter 8: Cognitive Load and Knowledge Space Theory](../../chapters/08-cognitive-load-knowledge-space-theory/index.md)
