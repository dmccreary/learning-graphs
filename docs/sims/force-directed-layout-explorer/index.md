---
title: Force-Directed Layout Explorer
description: Given a small graph and adjustable physics sliders, the learner can predict and observe how increasing repulsion spreads nodes apart and how increasing spring (edge) strength pulls connected nodes closer together.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Force-Directed Layout Explorer



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Vis.js Fundamentals and Node Styling](../../chapters/11-visjs-fundamentals-node-styling/index.md).

```text
Type: microsim
**sim-id:** force-directed-layout-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners manipulate the physics parameters of a force-directed layout and observe how spring strength and repulsion change the resting shape of a graph.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, experiment

Learning objective: Given a small graph and adjustable physics sliders, the learner can predict and observe how increasing repulsion spreads nodes apart and how increasing spring (edge) strength pulls connected nodes closer together.

Canvas layout:
- Left/top (75% width): drawing area showing a 14-node sample graph drawn from this chapter's own concept list (Vis.js, Vis-Network Library, DataSet, Network Container, Network Initialization, JSON Data Format, Force-Directed Graph, and 7 more)
- Right/bottom (25% width or below on narrow screens): control panel

Visual elements:
- 14 light-blue circular nodes with black text labels
- Directed gray edges (dependency direction, arrowhead at prerequisite end)
- A "settling" indicator (small spinner) that appears while physics is still animating and disappears once the layout stabilizes

Interactive controls:
- Slider: "Repulsion Strength" (range -20000 to -1000, default -8000) — maps to vis-network's `physics.barnesHut.gravitationalConstant`
- Slider: "Spring Length" (range 50 to 300, default 150) — maps to `physics.barnesHut.springLength`
- Slider: "Spring Strength" (range 0.01 to 0.5, default 0.08) — maps to `physics.barnesHut.springConstant`
- Button: "Re-Settle Graph" — nudges the physics simulation to re-run from the current node positions
- Button: "Reset to Defaults"

Default parameters:
- Repulsion Strength: -8000
- Spring Length: 150
- Spring Strength: 0.08

Behavior: Moving any slider calls `network.setOptions()` with the updated physics configuration and re-enables the physics simulation briefly so the graph visibly re-settles into its new resting shape. An infobox below the sliders states in one sentence what changed, e.g., "Higher repulsion pushes nodes further apart, spreading the graph out."

Canvas size: responsive, 100% width, 540px height, must reflow on window resize

Implementation: vis-network JavaScript library using the `physics.barnesHut` solver options exposed through `network.setOptions()`; slider `input` events trigger option updates
```

## Related Resources

- [Chapter 11: Vis.js Fundamentals and Node Styling](../../chapters/11-visjs-fundamentals-node-styling/index.md)
