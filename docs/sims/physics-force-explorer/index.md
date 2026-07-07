---
title: Physics Force Explorer
description: Given a fixed 18-node sample graph, the learner can predict and verify how changing gravitational constant, central gravity, and solver selection each independently affects the settled layout's shape and density.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Physics Force Explorer



<iframe src="main.html" width="100%" height="582"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: Physics Simulation and Graph Layout](../../chapters/13-physics-simulation-graph-layout/index.md).

```text
Type: microsim
**sim-id:** physics-force-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners manipulate the individual forces that make up vis-network's physics simulation — repulsion strength, central gravity, and solver choice — on the same sample graph, so the effect of each parameter is directly observable rather than only described in prose.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine, compare

Learning objective: Given a fixed 18-node sample graph, the learner can predict and verify how changing gravitational constant, central gravity, and solver selection each independently affects the settled layout's shape and density.

Canvas layout:
- Left/top (70% width): drawing area showing an 18-node sample graph with a mix of hub nodes (high degree) and leaf nodes (degree 1), styled per Chapter 11 conventions
- Right/bottom (30% width or below on narrow screens): control panel

Visual elements:
- 18 nodes and roughly 22 edges forming a small learning-graph-like structure with two visible hub nodes
- A live "settled" indicator showing whether the simulation has stabilized or is still moving
- A readout of current force parameter values

Interactive controls:
- Dropdown: Solver ("Barnes-Hut", "ForceAtlas2", "Repulsion")
- Slider: Gravitational Constant / Repulsion Strength (range and scale adapt to selected solver, e.g. -100 to -10000 for Barnes-Hut)
- Slider: Central Gravity (0.0 to 1.0)
- Button: "Scatter Nodes" (randomizes starting positions and re-runs stabilization)
- Button: "Reset to Defaults"

Default parameters:
- Solver: Barnes-Hut
- Gravitational Constant: -2000
- Central Gravity: 0.3

Behavior: Every slider change calls `network.setOptions({physics: {...}})` with the updated solver configuration and triggers a fresh stabilization pass. Increasing repulsion strength visibly spreads nodes further apart; increasing central gravity visibly pulls the whole graph tighter toward the canvas center; switching solvers re-lays the same graph using the new algorithm so learners can compare Barnes-Hut's clustering against ForceAtlas2's more even spacing on identical data.

Canvas size: responsive, 100% width, 580px height, must reflow on window resize

Implementation: vis-network JavaScript library using the `physics` options object exposed through `network.setOptions()`; dropdown and slider `input`/`change` events trigger option updates and call `network.stabilize()`
```

## Related Resources

- [Chapter 13: Physics Simulation and Graph Layout](../../chapters/13-physics-simulation-graph-layout/index.md)
