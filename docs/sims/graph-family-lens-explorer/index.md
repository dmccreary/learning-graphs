---
title: Graph Family Lens Explorer
description: Given a fixed set of entities, the learner can identify which edge relationships are appropriate under each of the five graph-type lenses and explain what changes between lenses.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Graph Family Lens Explorer



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md).

```text
Type: graph-model
**sim-id:** graph-family-lens-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Show the same five nodes rendered under five different "lenses" (concept graph, content graph, knowledge graph, dependency graph, learning graph) so learners can see how the edge set — not the node set — is what changes between graph types.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare, contrast

Learning objective: Given a fixed set of entities, the learner can identify which edge relationships are appropriate under each of the five graph-type lenses and explain what changes between lenses.

Base node set (shown in every lens, styling changes per lens):
- "Fractions" (concept)
- "Decimals" (concept)
- "Video: Intro to Fractions" (content item)
- "Quiz: Fractions Basics" (content item)
- "Khan Academy" (external entity, used only in Knowledge Graph lens)

Lens control: Dropdown selector with five options — "Concept Graph," "Content Graph," "Knowledge Graph," "Dependency Graph," "Learning Graph"

Lens behavior:
- Concept Graph lens: shows only "Fractions" and "Decimals" nodes, with an undirected "related-to" edge labeled "related to"
- Content Graph lens: shows only the two content-item nodes, with a directed edge "Video: Intro to Fractions" → "Quiz: Fractions Basics" labeled "precedes"
- Knowledge Graph lens: shows all five nodes with mixed, typed edges: "Video: Intro to Fractions" —[created by]→ "Khan Academy", "Quiz: Fractions Basics" —[tests]→ "Fractions"
- Dependency Graph lens: shows only "Fractions" and "Decimals" with a directed edge "Decimals" → "Fractions" labeled "depends on"
- Learning Graph lens: identical edge to the Dependency Graph lens, but the infobox additionally notes the DAG requirement and shows a green "Valid DAG" badge

Interactive features:
- Selecting a lens fades out nodes/edges not relevant to that lens and animates in the correct edge set (300ms transition)
- Hovering an edge shows a tooltip with the edge's relationship label
- Clicking a node opens an infobox stating which graph type(s) that node type belongs to
- A persistent caption below the canvas restates in one sentence what changed between the previous lens and the current one

Visual styling:
- Concept nodes: light blue circles
- Content-item nodes: green rounded rectangles
- External-entity nodes: gray hexagons
- Edge labels shown inline on the edge line

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network JavaScript library with five predefined edge-set configurations swapped in on a dropdown "change" event; use `network.setData()` to redraw
```

## Related Resources

- [Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md)
