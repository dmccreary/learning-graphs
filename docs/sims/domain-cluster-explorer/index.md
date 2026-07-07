---
title: Domain Cluster Explorer
description: Given a 40-node sample learning graph with a `domain` property on every node spanning 4 domains, the learner can apply domain-based clustering to collapse the graph into 4 composite nodes, then expand any single composite node back to its members by double-clicking it.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Domain Cluster Explorer



<iframe src="main.html" width="100%" height="582"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Graph Clustering and Editing Tools](../../chapters/15-graph-clustering-editing-tools/index.md).

```text
Type: microsim
**sim-id:** domain-cluster-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners toggle between a fully expanded 40-node sample graph and a domain-clustered view of the same graph, so the effect of Graph Cluster, Composite Node, and Cluster Expand/Collapse is directly observable rather than only described.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, apply, use

Learning objective: Given a 40-node sample learning graph with a `domain` property on every node spanning 4 domains, the learner can apply domain-based clustering to collapse the graph into 4 composite nodes, then expand any single composite node back to its members by double-clicking it.

Canvas layout:
- Left/top (75% width): drawing area showing the sample graph, either fully expanded or domain-clustered depending on current mode
- Right/bottom (25% width or below on narrow screens): control panel and a live member-count readout per domain

Visual elements:
- 40 nodes spanning 4 domains ("Graph Theory," "Learning Science," "Taxonomy Design," "Visualization"), colored by domain per earlier chapters' conventions
- Composite nodes rendered as larger box-shaped nodes labeled with domain name and member count, e.g. "Graph Theory (11)"
- A status line reporting current node count on canvas, e.g. "Showing: 4 composite nodes (40 concepts folded)" or "Showing: 40 individual nodes"

Interactive controls:
- Button: "Cluster by Domain" (applies `clusterOptionsByData` for all 4 domains at once)
- Button: "Expand All" (calls `network.openCluster()` on every composite node)
- Instruction text: "Double-click any composite node to expand just that domain"

Default parameters:
- Initial state: fully expanded (40 individual nodes)

Behavior: Clicking "Cluster by Domain" runs a `joinCondition` function per domain value and calls `network.cluster()` four times, one per domain, replacing all 40 nodes with 4 composite nodes. Double-clicking any single composite node calls `network.openCluster()` for that node only, restoring its members while leaving other domains collapsed. "Expand All" restores the fully expanded view. The status line and per-domain member-count readout update after every clustering action.

Canvas size: responsive, 100% width, 580px height, must reflow on window resize

Implementation: vis-network JavaScript library; `network.cluster()` with `joinCondition` reading each node's `domain` property; `network.openCluster()` triggered from a `doubleClick` listener that checks `network.isCluster()` first
```

## Related Resources

- [Chapter 15: Graph Clustering and Editing Tools](../../chapters/15-graph-clustering-editing-tools/index.md)
