---
title: Indegree and Out-Degree Counter
description: Given any node in a sample dependency graph, the learner can correctly state its indegree, out-degree, and node degree by tracing and counting its edges.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Indegree and Out-Degree Counter



<iframe src="main.html" width="100%" height="522"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Learning Graph Quality, Validation, and File Formats](../../chapters/05-graph-quality-validation-file-formats/index.md).

```text
Type: microsim
**sim-id:** indegree-outdegree-counter<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Make indegree and out-degree concrete by letting learners click a node and watch each incoming and outgoing edge get highlighted and counted in real time, rather than presenting degree as an abstract number.

Bloom Level: Understand (L2)
Bloom Verb: interpret, explain

Learning objective: Given any node in a sample dependency graph, the learner can correctly state its indegree, out-degree, and node degree by tracing and counting its edges.

Base dataset: 12-node sample dependency graph (directed edges, arrows pointing from dependent to prerequisite) drawn from this book's own concept list, including one clear foundational node (indegree 5, out-degree 0) and one clear goal node (indegree 0, out-degree 4)

Data Visibility Requirements:
  Stage 1: Show the full graph in neutral gray with no node selected
  Stage 2: On node click, show every incoming edge highlighted in green with an animated count-up: "Indegree: 0 → 1 → 2 → 3"
  Stage 3: Show every outgoing edge highlighted in orange with a separate animated count-up: "Out-Degree: 0 → 1 → 2"
  Stage 4: Show the final summary panel: "Indegree: 3, Out-Degree: 2, Node Degree: 5"

Interactive controls:
- Click any node to select it and trigger the counting sequence
- "Clear Selection" button to return to neutral state
- Toggle: "Show only incoming" / "Show only outgoing" / "Show both" to isolate each direction

Instructional Rationale: Step-through counting with concrete highlighted edges is appropriate because the Understand-level objective requires learners to trace individual edges and see how directionality changes what gets counted. A single static number would not reveal the difference between counting incoming versus outgoing edges.

Canvas size: responsive, 100% width, 520px height

Implementation: vis-network JavaScript library; edge highlighting and count animation driven by the `selectNode` event, iterating the DataSet's edges filtered by `from`/`to` matching the selected node ID
```

## Related Resources

- [Chapter 5: Learning Graph Quality, Validation, and File Formats](../../chapters/05-graph-quality-validation-file-formats/index.md)
