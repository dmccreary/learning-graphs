---
title: Graph Anatomy Explorer
description: Given a rendered graph, the learner can correctly label which visual elements are nodes and which are edges, and state what each represents.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Graph Anatomy Explorer



<iframe src="main.html" width="100%" height="502"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md).

```text
Type: graph-model
**sim-id:** graph-anatomy-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners identify the anatomy of a graph — nodes, edges, and the direction of an edge — using a small five-node example drawn from this chapter's own concept list.

Bloom Level: Understand (L2)
Bloom Verb: identify, classify

Learning objective: Given a rendered graph, the learner can correctly label which visual elements are nodes and which are edges, and state what each represents.

Nodes to display (5, using vis-network circle shape):
- "Concept" (id 1)
- "Node" (id 2)
- "Edge" (id 3)
- "Graph Representation" (id 4)
- "Directed Graph" (id 5)

Edges to display (dependency direction, arrow points from dependent to prerequisite):
- Node(2) → Concept(1)
- Edge(3) → Concept(1)
- Graph Representation(4) → Node(2)
- Graph Representation(4) → Edge(3)
- Directed Graph(5) → Graph Representation(4)

Layout: Hierarchical top-down, "Concept" at the bottom as the root prerequisite

Visual styling:
- Nodes: light blue circles, 40px diameter, black text labels
- Edges: solid black arrows, arrowhead at the "to" end
- Selected node: highlighted gold with a thicker gold border
- Selected edge: highlighted gold and thickened

Interactive features:
- Hover a node: tooltip shows "Node: represents the concept '{label}'"
- Click a node: side infobox opens with the concept's one-sentence glossary definition
- Hover an edge: tooltip shows "Edge: '{from label}' depends on '{to label}'"
- Click an edge: side infobox explains "This arrow means you should understand '{to label}' before '{from label}'"
- Toggle button: "Show as undirected" removes all arrowheads and relabels the callout text to explain that undirected edges only show connection, not order — reinforcing why direction matters
- Reset button restores default state

Canvas size: responsive, 100% width, 500px height, must reflow on window resize

Implementation: vis-network JavaScript library with a DataSet for nodes and edges, click and hover event handlers bound to an infobox `<div>` beside the canvas
```

## Related Resources

- [Chapter 1: Foundations of Concept Graphs](../../chapters/01-foundations-of-concept-graphs/index.md)
