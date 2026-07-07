---
title: Clustering and Abstraction Explorer
description: Given an unlabeled concept graph, the learner can distinguish which nodes a clustering algorithm groups together based on connectivity and explain why the proposed abstraction name fits that group.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Clustering and Abstraction Explorer



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Concept Taxonomies and Ontologies](../../chapters/04-concept-taxonomies-ontologies/index.md).

```text
Type: microsim
**sim-id:** clustering-abstraction-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners run a simplified graph-clustering pass over a small concept graph, see the detected node groups highlighted, and then trigger an abstraction step that proposes a taxonomy category name for each detected cluster.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, organize

Learning objective: Given an unlabeled concept graph, the learner can distinguish which nodes a clustering algorithm groups together based on connectivity and explain why the proposed abstraction name fits that group.

Base dataset: 18-node concept graph with edges (undirected, "related to" for this exercise rather than dependency edges) forming three visually separable dense subgroups of 6 nodes each: a Graph Theory cluster (Node, Edge, DAG, Cycle Detection, Hop Count, Traversal), a Visualization cluster (Force-Directed Layout, Hierarchical Layout, vis-network, Node Group, Taxonomy Legend, Zoom/Pan), and a Learning Science cluster (Cognitive Load, Mastery Learning, Zone of Proximal Development, Scaffolding, Constructivism, Backward Design)

Interactive controls:
- Button: "Run Clustering" — applies a simplified connected-components-style grouping and recolors each detected cluster a distinct color (no category names yet, clusters labeled "Group A," "Group B," "Group C")
- Button: "Run Abstraction" (enabled only after clustering runs) — reveals a proposed taxonomy category name above each colored cluster, drawn from a small lookup keyed to the cluster's dominant concept types
- Button: "Reset" — returns all nodes to a single neutral gray color and clears cluster labels
- Hover any node: tooltip shows the concept label

Behavior:
- Before "Run Clustering": all 18 nodes rendered gray, edges visible, layout force-directed so the three dense subgroups are already visually separated by physics alone
- After "Run Clustering": each detected group recolors (blue, gold, purple) and a translucent bounding shape is drawn around each group with the temporary label "Group A / B / C"
- After "Run Abstraction": temporary labels are replaced with proposed names — "Graph Theory," "Visualization Tools," "Learning Science" — displayed as a title above each bounding shape

Visual styling:
- Neutral state: all nodes gray, edges light gray
- Post-clustering: three distinct saturated colors per group, translucent convex-hull-style bounding region per cluster
- Post-abstraction: bold category title label above each bounding region

Canvas size: responsive, 100% width, 560px height

Implementation: vis-network JavaScript library for rendering; clustering computed client-side as connected components over a pre-defined adjacency list (simplified stand-in for a real community-detection algorithm, appropriate for teaching the concept without requiring a full graph-theory library); abstraction step uses a static lookup table mapping each precomputed cluster's node-ID set to its category name
```

## Related Resources

- [Chapter 4: Concept Taxonomies and Ontologies](../../chapters/04-concept-taxonomies-ontologies/index.md)
