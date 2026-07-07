---
title: Transitive Dependency and Hop Count Finder
description: Given any two concepts in a displayed dependency graph, the learner can determine whether one has a direct or transitive dependency on the other and state the correct hop count.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Transitive Dependency and Hop Count Finder



<iframe src="main.html" width="100%" height="522"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md).

```text
Type: graph-model
**sim-id:** transitive-dependency-hop-finder<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners select a start concept and an end concept in a small graph and see the tool trace the connecting path, distinguishing a direct dependency (hop count 1) from a transitive dependency (hop count 2 or more).

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate

Learning objective: Given any two concepts in a displayed dependency graph, the learner can determine whether one has a direct or transitive dependency on the other and state the correct hop count.

Base dataset: same 9-node math-sequence subgraph used in the Ready-to-Learn Frontier Simulator (Number Sense, Arithmetic, Algebra, Geometry, Trigonometry, Functions, Derivatives, Integrals, Applied Calculus)

Interactive controls:
- Two dropdowns: "From concept" and "To concept"
- Button: "Find Path"

Behavior:
- On "Find Path," the tool runs a breadth-first search along outgoing (dependency) edges from the "From" node looking for the "To" node
- If found, every edge on the shortest path is highlighted gold and the infobox reports: "{From} has a transitive dependency on {To} — Hop Count: {N}" (or "direct dependency, Hop Count: 1" when N = 1)
- If no path exists in either direction, infobox reports: "No dependency relationship exists between {From} and {To} in this graph."
- Reset button clears the highlighted path and dropdown selections

Visual styling:
- Base graph: light blue circles, black arrows, hierarchical layout
- Highlighted path: gold nodes and thickened gold edges, with small numbered badges (1, 2, 3...) along the path showing hop order

Canvas size: responsive, 100% width, 520px height

Implementation: vis-network JavaScript library; breadth-first search implemented client-side in JavaScript over an adjacency list built from the edge DataSet
```

## Related Resources

- [Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md)
