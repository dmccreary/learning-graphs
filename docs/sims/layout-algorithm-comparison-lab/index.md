---
title: Layout Algorithm Comparison Lab
description: Given a 30-node sample learning graph with a clear prerequisite structure and two visible clusters, the learner can justify a layout choice (force-directed vs. hierarchical, and if hierarchical, which direction) for a stated audience and purpose.
status: scaffold
library: vis-network
bloom_level: Evaluate (L5)
---

# Layout Algorithm Comparison Lab



<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: Physics Simulation and Graph Layout](../../chapters/13-physics-simulation-graph-layout/index.md).

```text
Type: microsim
**sim-id:** layout-algorithm-comparison-lab<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners directly compare force-directed and hierarchical layout on the same sample graph, explore layout direction options, and observe how fixed/pinned nodes behave differently under each layout mode.

Bloom Level: Evaluate (L5)
Bloom Verb: justify, assess, recommend

Learning objective: Given a 30-node sample learning graph with a clear prerequisite structure and two visible clusters, the learner can justify a layout choice (force-directed vs. hierarchical, and if hierarchical, which direction) for a stated audience and purpose.

Canvas layout:
- Left/top (70% width): drawing area showing a 30-node sample graph modeled loosely on a small learning graph (two topic clusters, one connecting "bridge" concept, and a clear prerequisite chain of at least 5 levels)
- Right/bottom (30% width or below on narrow screens): control panel and scenario prompt panel

Visual elements:
- 30 nodes styled per Chapter 11 conventions, colored by cluster/taxonomy
- Two nodes pre-marked as author-fixed (small pin icon overlay) to demonstrate Fixed Node Position
- A scenario prompt box that rotates between short framings, e.g. "You are showing this graph to a curriculum reviewer checking for orphaned clusters" or "You are showing this graph to a student asking what they need to learn first"

Interactive controls:
- Toggle: Layout Mode ("Force-Directed", "Hierarchical")
- Dropdown: Layout Direction ("UD", "DU", "LR", "RL") — enabled only when Hierarchical is selected
- Dropdown: Solver ("Barnes-Hut", "ForceAtlas2") — enabled only when Force-Directed is selected
- Button: "Drag to Pin a Node" mode toggle, demonstrating Node Pinning behavior
- Button: "Reset Layout"

Default parameters:
- Layout Mode: Force-Directed
- Solver: Barnes-Hut
- Layout Direction: UD (pre-selected but inactive until Hierarchical is chosen)

Behavior: Switching Layout Mode calls `network.setOptions()` with the corresponding `layout.hierarchical.enabled` and `physics` configuration and triggers `network.stabilize()`. Under Hierarchical mode, changing Layout Direction re-flows the same graph instantly. When a learner drags and drops a node, that node becomes pinned (fixed: {x:true, y:true}) and displays a small pin icon; a "Reset Layout" button clears all pins except the two author-fixed nodes and re-stabilizes.

Canvas size: responsive, 100% width, 600px height, must reflow on window resize

Implementation: vis-network JavaScript library using `layout.hierarchical` and `physics` options exposed through `network.setOptions()`; `dragEnd` event handler implements node pinning as shown in this chapter's code example
```

## Related Resources

- [Chapter 13: Physics Simulation and Graph Layout](../../chapters/13-physics-simulation-graph-layout/index.md)
