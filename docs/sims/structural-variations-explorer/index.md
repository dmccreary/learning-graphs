---
title: Structural Variations Explorer
description: Given the same 12-node dependency dataset shown under three structural layouts, the learner can judge which layout is most useful for a specified task (e.g., "showing an individual learner's next step" vs. "showing an instructor the subject's overall shape") and justify the choice.
status: scaffold
library: vis-network
bloom_level: Evaluate (L5)
---

# Structural Variations Explorer



<iframe src="main.html" width="100%" height="622"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md).

```text
Type: graph-model
**sim-id:** structural-variations-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Show one fixed dependency dataset rendered as a strict hierarchy, as a density-based cluster layout, and as a hybrid combining both, so learners can compare the trade-offs of each structural view.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, justify

Learning objective: Given the same 12-node dependency dataset shown under three structural layouts, the learner can judge which layout is most useful for a specified task (e.g., "showing an individual learner's next step" vs. "showing an instructor the subject's overall shape") and justify the choice.

Base dataset: 12 nodes drawn from this chapter's own concept list (Concept, Node, Edge, Graph Representation, Directed Graph, DAG, Dependency Graph, Learning Graph, Concept Graph, Hierarchy, Cluster, Hybrid Graph) with the dependency edges established earlier in this chapter

Layout control: Three buttons — "Hierarchy View," "Cluster View," "Hybrid View" — only one active at a time

View behavior:
- Hierarchy View: vis-network hierarchical layout, strict top-down levels, one parent enforced per node (secondary dependencies shown as thin dashed "also depends on" lines, visually de-emphasized)
- Cluster View: force-directed physics layout with vis-network's built-in clustering by community detection on edge density; each detected cluster shaded a distinct pale background color with a cluster label
- Hybrid View: hierarchical top-level grouping (three broad bands: "Primitives," "Graph Properties," "Graph Types") with force-directed physics active *within* each band, so nodes cluster locally but bands stay ordered top-to-bottom

Interactive features:
- Clicking a layout button animates the transition (vis-network's built-in physics stabilization) rather than an instant redraw
- Hovering a node shows its degree (number of connections) as a small badge
- An infobox beside the canvas updates per view with a one-sentence trade-off statement, e.g., for Hierarchy View: "Easy to find 'the' path to any concept, but forces every node to pick a single parent even when it has two real prerequisites."

Visual styling:
- Consistent node coloring across all three views (light blue circles) so only the layout changes, not the data
- Cluster background shading: three distinct pale colors (blue, green, amber) at low opacity

Canvas size: responsive, 100% width, 520px height

Implementation: vis-network JavaScript library using `network.setOptions()` to swap layout configuration (hierarchical vs. physics-based) on button click, with a single shared DataSet
```

## Related Resources

- [Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md)
