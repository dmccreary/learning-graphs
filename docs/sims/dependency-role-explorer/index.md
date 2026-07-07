---
title: Dependency Role Explorer
description: Given a small rendered dependency chain, the learner can correctly label each node's role (dependent, prerequisite, foundational) relative to a selected edge.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Dependency Role Explorer



<iframe src="main.html" width="100%" height="502"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md).

```text
Type: graph-model
**sim-id:** dependency-role-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners click through a four-node dependency chain and see how the same node can be a "dependent concept" relative to one edge and a "prerequisite concept" relative to another, with the bottom node singled out as the foundational concept.

Bloom Level: Understand (L2)
Bloom Verb: identify, classify

Learning objective: Given a small rendered dependency chain, the learner can correctly label each node's role (dependent, prerequisite, foundational) relative to a selected edge.

Nodes to display (4, vis-network circle shape):
- "Calculus" (id 1)
- "Algebra" (id 2)
- "Arithmetic" (id 3)
- "Number Sense" (id 4)

Edges to display (arrow points from dependent to prerequisite):
- Calculus(1) → Algebra(2)
- Algebra(2) → Arithmetic(3)
- Arithmetic(3) → Number Sense(4)

Layout: Hierarchical top-down, "Number Sense" at the bottom

Interactive features:
- Click any edge: the two endpoint nodes are labeled in the infobox as "Dependent Concept: {from label}" and "Prerequisite Concept: {to label}"
- The bottom-most node ("Number Sense") is permanently badged "Foundational Concept" since it has no outgoing edges
- Hover a node: tooltip states how many prerequisite concepts it has (its out-degree) and how many dependent concepts rely on it (its in-degree)
- Toggle button: "Highlight foundational concepts" recolors any node with zero outgoing edges gold

Visual styling:
- Standard nodes: light blue circles, black text
- Foundational concept: gold circle with a small anchor icon badge
- Selected edge: thickened and highlighted with endpoint labels floating beside each node

Canvas size: responsive, 100% width, 500px height

Implementation: vis-network JavaScript library with a DataSet for nodes/edges; out-degree/in-degree computed client-side from the edge list on load
```

## Related Resources

- [Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md)
