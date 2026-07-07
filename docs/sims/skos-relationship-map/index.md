---
title: SKOS Relationship Map
description: SKOS Relationship Map
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# SKOS Relationship Map



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md).

```text
Type: graph-model
**sim-id:** skos-relationship-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Show how SKOS represents a small vocabulary using prefLabel, altLabel, broader, narrower, and related properties, and contrast this classification hierarchy with the dependency edges from Chapter 1.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare

Node types:
1. SKOS concept node (blue circle) — displays its `skos:prefLabel`
2. Alternate label chip (small gray tag attached to a node) — displays a `skos:altLabel`

Edge types:
1. `skos:broader` (solid blue arrow, pointing from narrower to broader concept)
2. `skos:narrower` (rendered as the reverse view of the same edge, toggle-able)
3. `skos:related` (dotted purple line, no direction)

Sample data:
- "Graph" (broader) → "Directed Graph" (narrower) → "Directed Acyclic Graph (DAG)" (narrower)
- "Directed Acyclic Graph (DAG)" — altLabel chip: "DAG"
- "Learning Graph" — skos:related — "Concept Dependency Graph" (dotted line, both are near-synonyms in this book's usage)

Interactive features:
- Click any node: infobox shows its full SKOS record (prefLabel, altLabels, broader concept, narrower concepts, related concepts)
- Toggle button: "Show as Classification Hierarchy" vs "Show as Dependency Graph" — switching views re-lays-out the same three DAG-related nodes as a Chapter-1-style dependency graph and displays a caption explaining that broader/narrower and depends-on are different relationships that happen to look similar as diagrams
- Hover an edge: tooltip states the relationship in plain language, e.g. "DAG is a narrower (more specific) kind of Directed Graph"

Color scheme: blue for concept nodes and broader/narrower edges, purple dotted for related, gray for label chips

Implementation: vis-network JavaScript library, two saved layout configurations swapped via the toggle button
```

## Related Resources

- [Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md)
