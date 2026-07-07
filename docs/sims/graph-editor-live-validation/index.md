---
title: Graph Editor with Live Validation
description: Given a 15-node starter graph with the manipulation toolbar enabled, the learner can add a new node, connect or intentionally leave it disconnected, and assess the resulting validation panel to judge whether the graph is structurally sound and free of orphaned nodes.
status: scaffold
library: vis-network
bloom_level: Evaluate (L5)
---

# Graph Editor with Live Validation



<iframe src="main.html" width="100%" height="622"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Graph Clustering and Editing Tools](../../chapters/15-graph-clustering-editing-tools/index.md).

```text
Type: microsim
**sim-id:** graph-editor-live-validation<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners hands-on practice with the graph editor's manipulation toolbar (add/edit/delete nodes and edges) and both validation layers from this chapter, so the abstract description of Data Validation on Import and Orphaned Node Detection becomes something a learner can trigger and observe directly.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, validate, justify

Learning objective: Given a 15-node starter graph with the manipulation toolbar enabled, the learner can add a new node, connect or intentionally leave it disconnected, and assess the resulting validation panel to judge whether the graph is structurally sound and free of orphaned nodes.

Canvas layout:
- Left/top (70% width): drawing area showing a 15-node starter graph with the vis-network manipulation toolbar enabled above it
- Right/bottom (30% width or below on narrow screens): validation panel and node/edge property editor, which appears when editing is triggered

Visual elements:
- 15 nodes and 17 edges forming a small learning-graph-like structure with one node deliberately left disconnected at start, so orphaned-node detection has something to find immediately
- A validation panel listing current issues in two sections: "Import Errors" (duplicate IDs, missing references) and "Orphaned Nodes" (nodes with zero edges), each empty or populated in real time
- Node Property Editor panel (label, group, domain fields) and a simpler Edge Property Editor prompt for edge labels

Interactive controls:
- Manipulation toolbar buttons (vis-network built-in): "Add Node," "Add Edge," "Edit Node," "Edit Edge," "Delete selected"
- Button: "Export JSON" (downloads current graph state per this chapter's `exportGraph()` pattern)
- Button: "Import JSON" (file picker, runs `validateGraph()` and `findOrphanedNodes()` immediately on load)
- Button: "Run Validation Now" (re-runs both checks on demand without a fresh import)

Default parameters:
- Starter graph: 15 nodes, 17 edges, 1 pre-existing orphaned node
- Validation panel: shows "1 orphaned node" on load

Behavior: Adding a node via the toolbar opens the Node Property Editor; saving without connecting an edge leaves it orphaned, and the validation panel updates to reflect the new count immediately (event-driven off the DataSets' own `add`/`update`/`remove` events, not just on import). Deleting an edge that was a node's only connection immediately adds that node to the "Orphaned Nodes" list. Importing a deliberately broken JSON file (with a duplicate ID or a dangling edge reference, offered as a sample download) demonstrates Data Validation on Import catching the problem before rendering.

Canvas size: responsive, 100% width, 620px height, must reflow on window resize

Implementation: vis-network JavaScript library with `manipulation` options block enabled; custom `editNode`/`editEdge` callbacks per this chapter's Node/Edge Property Editor examples; `validateGraph()` and `findOrphanedNodes()` functions re-run on every DataSet change event and on file import; export via `Blob`/object URL download pattern
```

## Related Resources

- [Chapter 15: Graph Clustering and Editing Tools](../../chapters/15-graph-clustering-editing-tools/index.md)
