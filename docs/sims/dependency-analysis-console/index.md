---
title: Dependency Analysis Console
description: Given a dependency graph and a specified learner state, the learner can select the correct dependency-analysis query for a given practical question and interpret its result.
status: scaffold
library: vis-network
bloom_level: Evaluate (L5)
---

# Dependency Analysis Console



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md).

```text
Type: infographic
**sim-id:** dependency-analysis-console<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners a single console-style tool that runs the four most common dependency-analysis queries (foundational concepts, ready-to-learn set, skill gap to a goal, hop count between two concepts) against one shared dataset, reinforcing that these are variations on one underlying analytical practice.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, justify

Learning objective: Given a dependency graph and a specified learner state, the learner can select the correct dependency-analysis query for a given practical question and interpret its result.

Base dataset: same 9-node math-sequence subgraph used earlier in this chapter, with an adjustable "learned concepts" checklist (defaults: Number Sense, Arithmetic learned)

Interactive controls (left panel, query selector as radio buttons):
- "Show Foundational Concepts" — highlights all nodes with zero outgoing edges gold
- "Show Ready-to-Learn Set" — highlights all nodes whose prerequisites are fully in the learned set
- "Show Skill Gap to Goal" — adds a goal-concept dropdown; on selection, highlights every unlearned concept on any path from the learner's learned set to the goal
- "Show Hop Count Between Two Concepts" — adds two concept dropdowns and reuses the shortest-path behavior from the Transitive Dependency and Hop Count Finder diagram earlier in this chapter

Behavior: selecting a query re-renders the graph highlighting per that query's rule; a results panel on the right states the finding in one sentence, e.g. "Skill Gap to Applied Calculus: Algebra, Geometry, Trigonometry, Functions, Derivatives, Integrals (6 concepts)."

Visual styling:
- Base graph: light blue circles, hierarchical layout, black arrows
- Query-specific highlight color: gold for foundational, green for ready-to-learn, red for skill gap, purple path with numbered hop badges for hop count

Canvas size: responsive, 100% width, 560px height (graph) with a fixed-width control/results side panel

Implementation: vis-network JavaScript library with four client-side query functions sharing one adjacency-list representation of the dataset; UI built with plain HTML radio buttons and dropdowns bound to re-render calls
```

## Related Resources

- [Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md)
