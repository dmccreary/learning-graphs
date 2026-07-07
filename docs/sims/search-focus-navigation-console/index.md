---
title: Search and Focus Navigation Console
description: Given a 60-node sample learning graph and a search box, the learner can use type-ahead filtering to locate a specific concept by partial label match and trigger focus node navigation to center it, then double-click it to open the node inspector and read its full properties.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Search and Focus Navigation Console



<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: Interactive Navigation in Vis.js](../../chapters/14-interactive-navigation-visjs/index.md).

```text
Type: microsim
**sim-id:** search-focus-navigation-console<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners hands-on practice with the full navigation pipeline covered in this chapter — hover tooltips, click selection, double-click inspector, and type-ahead search with focus navigation — on a single graph large enough (60 nodes) that search is genuinely useful rather than a novelty.

Bloom Level: Apply (L3)
Bloom Verb: use, demonstrate, apply

Learning objective: Given a 60-node sample learning graph and a search box, the learner can use type-ahead filtering to locate a specific concept by partial label match and trigger focus node navigation to center it, then double-click it to open the node inspector and read its full properties.

Canvas layout:
- Top: search input box with a live-updating suggestion dropdown beneath it
- Left/center (75% width): drawing area showing the 60-node sample graph, styled per Chapter 11 conventions with taxonomy-based node coloring
- Right (25% width; moves below canvas on narrow screens): node inspector panel, hidden until a node is double-clicked

Visual elements:
- 60 nodes and roughly 75 edges forming a graph with realistic learning-graph structure (a few hub nodes, several prerequisite chains, some leaf concepts)
- Every node has a `title` tooltip and a `url` placeholder property
- A status line beneath the search box confirming the current hover/selection state, e.g. "3 matches for 'grav'" or "Focused: Central Gravity"

Interactive controls:
- Text input: search box with type-ahead filtering (updates on every keystroke)
- Dropdown/list: clickable suggestion results appearing beneath the search box as the learner types
- Node inspector panel: opens on double-click, closes via an "X" button
- Button: "Reset View" (clears search, closes inspector, re-fits the full graph)

Default parameters:
- Search box: empty
- Node inspector: hidden

Behavior: Typing in the search box calls a `filter`-based `nodes.get()` search on every `input` event and renders matches in the suggestion dropdown. Clicking a suggestion calls `network.focus()` with a 500ms animated pan/zoom and `network.selectNodes()` to highlight it, per this chapter's `focusOnNode()` example. Hovering any node shows its built-in tooltip. Double-clicking any node opens the node inspector panel showing its label, title text, and any prerequisite/dependent relationships found by scanning the edges DataSet. Single-clicking empty canvas closes the inspector and clears selection.

Canvas size: responsive, 100% width, 600px height, must reflow on window resize

Implementation: vis-network JavaScript library; DataSet `filter`-based search; `network.focus()` and `network.selectNodes()` for navigation; `hoverNode`, `click`, and `doubleClick` event listeners; node inspector built with standard HTML/CSS panel toggled via `style.display`
```

## Related Resources

- [Chapter 14: Interactive Navigation in Vis.js](../../chapters/14-interactive-navigation-visjs/index.md)
