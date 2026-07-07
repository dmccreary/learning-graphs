---
title: Edge Smoothing and Curve Type Explorer
description: Given a graph with several overlapping edge paths, the learner can differentiate straight edges from smoothed edges and explain when cubic Bezier smoothing with a forced direction improves readability over the default dynamic curve.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Edge Smoothing and Curve Type Explorer



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Edge Styling and Visual Properties](../../chapters/12-edge-styling-visual-properties/index.md).

```text
Type: microsim
**sim-id:** edge-smoothing-curve-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners compare straight, dynamically-curved, and cubic-Bezier edges on the same graph so the visual and structural differences between smoothing options become concrete rather than abstract.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare, examine

Learning objective: Given a graph with several overlapping edge paths, the learner can differentiate straight edges from smoothed edges and explain when cubic Bezier smoothing with a forced direction improves readability over the default dynamic curve.

Canvas layout:
- Left/top (70% width): drawing area showing a 10-node graph with deliberately overlapping prerequisite paths (several edges that would cross directly through an intermediate node if drawn straight)
- Right/bottom (30% width or below on narrow screens): control panel

Visual elements:
- 10 nodes styled per Chapter 11 conventions (light blue circles, black text)
- Edges whose path updates live based on the selected smoothing mode
- A highlighted "problem edge" (colored red) that visibly cuts through an unrelated node when smoothing is off, to make the motivation for smoothing concrete

Interactive controls:
- Radio buttons: Smoothing Mode ("Off (straight)", "Dynamic (default)", "Cubic Bezier")
- Slider: Roundness (0.0-1.0, only active when a curved mode is selected) — maps to `smooth.roundness`
- Dropdown: Force Direction ("none", "horizontal", "vertical") — only active when Cubic Bezier is selected, maps to `smooth.forceDirection`

Default parameters:
- Smoothing Mode: Off (straight)
- Roundness: 0.5
- Force Direction: none

Behavior: Changing any control calls `network.setOptions({edges: {smooth: {...}}})` with the updated configuration and the graph re-renders immediately. A caption below the canvas states in one sentence what changed, e.g., "Cubic Bezier with vertical force direction bows every edge outward instead of letting it cross other nodes."

Canvas size: responsive, 100% width, 560px height, must reflow on window resize

Implementation: vis-network JavaScript library using the `edges.smooth` options object exposed through `network.setOptions()`; radio button and slider `input`/`change` events trigger option updates
```

## Related Resources

- [Chapter 12: Edge Styling and Visual Properties](../../chapters/12-edge-styling-visual-properties/index.md)
