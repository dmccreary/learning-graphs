---
title: Interactive Legend Filter
description: Given a graph with nodes colored by taxonomy category, the learner can use a clickable legend to filter the visible node set and explain how the legend's colors map to the DataSet's category field.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Interactive Legend Filter



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Vis.js Fundamentals and Node Styling](../../chapters/11-visjs-fundamentals-node-styling/index.md).

```text
Type: microsim
**sim-id:** interactive-legend-filter<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Teach learners that a legend in an intelligent textbook diagram is not a static caption but a functional filter control tied to the underlying DataSet.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, use

Learning objective: Given a graph with nodes colored by taxonomy category, the learner can use a clickable legend to filter the visible node set and explain how the legend's colors map to the DataSet's category field.

Canvas layout:
- Top (80% height): drawing area with a 20-node sample graph, nodes colored by one of four taxonomy categories drawn from Chapter 4 (Foundational Concepts = blue, Graph Theory = green, Visualization = gold, Learning Science = purple)
- Bottom (20% height) or right sidebar on wide screens: legend panel with four clickable color swatches, each labeled with its category name and a live count of visible nodes in that category

Visual elements:
- 20 circular nodes colored by category as listed above
- Directed gray edges
- Legend swatches: colored square, category label, node count badge (e.g., "Graph Theory (6)")
- A "Show All" reset link above the legend

Interactive controls:
- Click a legend swatch: toggles that category's visibility; hidden categories show the swatch at reduced opacity and gray out the count badge
- Multiple categories may be toggled off simultaneously
- Hover a legend swatch (without clicking): temporarily highlights that category's nodes in the graph with a gold outline, without hiding others
- "Show All" link: restores all four categories to visible

Behavior: Clicking a swatch calls `nodes.update()` to set `hidden: true` on every node in that category's DataSet subset, then calls `network.redraw()`. The node count badge recalculates from the live DataSet on every toggle.

Canvas size: responsive, 100% width, 560px height, must reflow on window resize

Implementation: vis-network JavaScript library; legend built as an HTML/CSS panel outside the canvas, wired to DataSet filter operations via `nodes.getIds({filter: ...})`
```

## Related Resources

- [Chapter 11: Vis.js Fundamentals and Node Styling](../../chapters/11-visjs-fundamentals-node-styling/index.md)
