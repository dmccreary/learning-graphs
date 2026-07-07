---
title: Hover Tooltip Explorer
description: Given a 10-node sample graph where half the nodes have `title` tooltips and half do not, the learner can explain what a Hover State is and interpret which nodes provide additional information on hover versus which do not.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Hover Tooltip Explorer



<iframe src="main.html" width="100%" height="522"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: Interactive Navigation in Vis.js](../../chapters/14-interactive-navigation-visjs/index.md).

```text
Type: microsim
**sim-id:** hover-tooltip-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners experience the difference between a node with no tooltip and a node with a well-formatted HTML tooltip, on a small sample graph, so hover state and tooltip content are directly observable rather than only described.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, interpret

Learning objective: Given a 10-node sample graph where half the nodes have `title` tooltips and half do not, the learner can explain what a Hover State is and interpret which nodes provide additional information on hover versus which do not.

Canvas layout:
- Left/top (70% width): drawing area showing a 10-node sample graph
- Right/bottom (30% width or below on narrow screens): a status panel and a toggle control panel

Visual elements:
- 10 nodes styled per Chapter 11 conventions; 5 nodes have a small dotted outline indicating "has tooltip," 5 do not
- A status readout that echoes the current hover state in plain text, e.g. "Hovering: Barnes-Hut Solver (tooltip available)" or "Hovering: nothing"
- The built-in vis-network tooltip box itself, rendered natively near the cursor

Interactive controls:
- Checkbox: "Show which nodes have tooltips" (toggles the dotted-outline indicator)
- Button: "Reset View"

Default parameters:
- Show-indicator checkbox: checked

Behavior: Hovering any node fires `hoverNode`; the status panel updates via the event's `params.node` value. Nodes with a `title` property show vis-network's built-in tooltip automatically; nodes without one show nothing, making the contrast concrete. Leaving a node fires `blurNode` and clears the status panel back to "Hovering: nothing."

Canvas size: responsive, 100% width, 520px height, must reflow on window resize

Implementation: vis-network JavaScript library; `hoverNode`/`blurNode` event listeners update a plain HTML status panel; tooltips rendered via each node's `title` property
```

## Related Resources

- [Chapter 14: Interactive Navigation in Vis.js](../../chapters/14-interactive-navigation-visjs/index.md)
