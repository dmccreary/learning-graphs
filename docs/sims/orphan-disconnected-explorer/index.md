---
title: Orphan and Disconnected Subgraph Explorer
description: Given a rendered learning graph containing a healthy main component, one orphaned node, and one disconnected subgraph, the learner can correctly click-select each isolated element and state which failure mode it represents.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Orphan and Disconnected Subgraph Explorer



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Learning Graph Quality, Validation, and File Formats](../../chapters/05-graph-quality-validation-file-formats/index.md).

```text
Type: graph-model
**sim-id:** orphan-disconnected-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners visually distinguish an orphaned node from a disconnected subgraph, and practice identifying both failure modes in a small sample learning graph.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine

Learning objective: Given a rendered learning graph containing a healthy main component, one orphaned node, and one disconnected subgraph, the learner can correctly click-select each isolated element and state which failure mode it represents.

Base dataset: 22-node sample graph — 17 nodes forming a single connected main body (force-directed layout, blue), 1 completely isolated node with zero edges (red, positioned apart from the main body), and 4 nodes forming a small interconnected cluster with edges only among themselves (orange, positioned apart from the main body)

Layout: force-directed; the isolated node and the disconnected cluster naturally drift away from the main body since they share no edges pulling them inward

Interactive controls:
- Click any node: side panel reveals its label, its edge count, and a plain-language diagnosis ("Part of the main graph", "Orphaned node — zero edges", or "Disconnected subgraph — connected internally but isolated from the main graph")
- Button: "Highlight Problems" — flashes the red node and orange cluster three times while dimming the healthy blue body
- Button: "Reset View" — restores full-color, non-flashing state
- Hover any edge: tooltip shows "Dependency: {concept} depends on {concept}"

Visual styling:
- Main body: blue circles
- Orphaned node: red circle, larger stroke width to draw attention
- Disconnected subgraph: orange circles with a translucent bounding region
- Edges: gray, directional arrows pointing from dependent to prerequisite

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network JavaScript library; node/edge dataset pre-computed as a static sample; side panel implemented as an HTML overlay updated on vis-network's `selectNode` event
```

## Related Resources

- [Chapter 5: Learning Graph Quality, Validation, and File Formats](../../chapters/05-graph-quality-validation-file-formats/index.md)
