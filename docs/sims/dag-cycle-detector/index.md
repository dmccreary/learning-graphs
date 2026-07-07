---
title: DAG Cycle Detector
description: Given a small directed graph, the learner can determine whether it is a valid DAG and explain, in terms of "where would a learner start," why a cycle breaks the ability to sequence concepts.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# DAG Cycle Detector



<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md).

```text
Type: graph-model
**sim-id:** dag-cycle-detector<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners experiment with adding and removing an edge to see the difference between a valid DAG and a graph containing a cycle, and to see why a cycle prevents sequencing.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine

Learning objective: Given a small directed graph, the learner can determine whether it is a valid DAG and explain, in terms of "where would a learner start," why a cycle breaks the ability to sequence concepts.

Data Visibility Requirements:
Stage 1: Show the baseline valid DAG — three nodes "Multiplication" → "Addition", "Addition" → "Counting", "Multiplication" → "Counting" (transitive edge shown lightly dashed). All nodes green (valid).
Stage 2: On clicking the toggle button "Add cycle-forming edge," add a fourth edge "Counting" → "Multiplication". All three nodes in the resulting cycle turn red, and the edges in the cycle pulse or highlight red.
Stage 3: Infobox displays: "This graph is no longer a DAG. Counting depends on Multiplication, which depends on Addition, which depends on Counting — there is no concept left to start with."
Stage 4: Clicking "Remove cycle-forming edge" reverts to Stage 1 and the infobox reads "Cycle removed. Every learner now has a valid starting point: Counting."

Interactive controls:
- Button: "Add cycle-forming edge"
- Button: "Remove cycle-forming edge" (disabled until a cycle exists)
- Infobox panel to the right of the canvas showing the current DAG status (green "Valid DAG" badge or red "Cycle Detected" badge)

Visual styling:
- Valid state: green circular nodes, black arrows
- Cycle state: the nodes and edges participating in the cycle turn red; nodes not in the cycle stay green
- Badge: fixed-position colored pill in the infobox, green or red matching graph state

Layout: force-directed with mild gravity, allow the graph to settle after each edge change

Instructional Rationale: A toggle-based before/after comparison is used instead of continuous animation because the Analyze-level objective requires the learner to compare two concrete states (valid DAG vs. cycle) and trace the specific edges responsible for the difference. Continuous animation would obscure which single edge caused the change.

Implementation: vis-network JavaScript library; maintain an internal adjacency list and run a simple depth-first-search cycle check whenever an edge is added, coloring any nodes/edges found on a repeated visit path
```

## Related Resources

- [Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md)
