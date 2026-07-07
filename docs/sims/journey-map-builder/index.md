---
title: Journey Map Builder
description: Given a small learning graph and a chosen goal concept, the learner can construct (via the tool) a valid sequential journey map that respects every dependency edge, and explain why the resulting order is not the only valid one.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Journey Map Builder



<iframe src="main.html" width="100%" height="702"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md).

```text
Type: graph-model
**sim-id:** journey-map-builder<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners select a goal concept in a small learning graph and watch the tool derive one valid linear journey map (a topologically sorted path) from the graph's dependency structure.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, construct

Learning objective: Given a small learning graph and a chosen goal concept, the learner can construct (via the tool) a valid sequential journey map that respects every dependency edge, and explain why the resulting order is not the only valid one.

Base dataset: 8-node subgraph — "Node," "Edge," "Graph Representation," "Directed Graph," "Dependency Graph," "Directed Acyclic Graph (DAG)," "Learning Graph," "Journey Map" — using the dependency edges established earlier in this chapter

Interactive controls:
- Dropdown: "Choose your goal concept" (defaults to "Journey Map")
- Button: "Build My Journey"
- Reset button

Behavior:
- On "Build My Journey," the tool performs a topological sort restricted to the ancestors of the selected goal node and renders the result as a horizontal step sequence below the graph (Step 1, Step 2, Step 3...) with the goal concept as the final step
- Each step in the journey map is clickable, opening an infobox with that concept's one-sentence definition
- The graph view above highlights the path taken in gold, dimming nodes/edges not on the chosen path
- Infobox note after building: "This is one valid order. {N} other orderings would also satisfy every dependency — a journey map picks one path through the possibility space the learning graph describes."

Visual styling:
- Graph view: light blue circles, gold highlight for the active journey path
- Step sequence: horizontal row of numbered pill-shaped steps below the graph, connected by arrows, gold background on the active path

Canvas size: responsive, 100% width, 500px height (graph) plus a 120px step-sequence strip below

Implementation: vis-network JavaScript library for the graph view; a simple topological-sort function (Kahn's algorithm) run client-side in JavaScript on button click to generate the step sequence
```

## Related Resources

- [Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md)
