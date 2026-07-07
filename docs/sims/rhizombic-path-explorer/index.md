---
title: Linear Path vs. Rhizombic Exploration
description: Given the same eight concept nodes rendered in two side-by-side network views, the learner can compare the fixed, single-order traversal of a linear path against the many valid entry points and connection patterns of a rhizomatic exploration, and articulate at least one advantage and one risk of each.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Linear Path vs. Rhizombic Exploration



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Learning Theories and Instructional Design](../../chapters/07-learning-theories-instructional-design/index.md).

```text
Type: graph-model
**sim-id:** rhizombic-path-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Contrast a strictly linear prerequisite chain with a rhizomatic, self-directed exploration of the same underlying concept set, so learners can see structurally what "non-linear" means rather than only reading a definition.

Bloom Level: Analyze (L4)
Bloom Verb: compare, contrast, examine, distinguish

Learning objective: Given the same eight concept nodes rendered in two side-by-side network views, the learner can compare the fixed, single-order traversal of a linear path against the many valid entry points and connection patterns of a rhizomatic exploration, and articulate at least one advantage and one risk of each.

Node types (shared between both views):
- Eight sample concept nodes drawn from a hypothetical "Photography Basics" domain: Aperture, Shutter Speed, ISO, Exposure Triangle, Composition, Rule of Thirds, Depth of Field, Portrait Lighting

Left panel — "Linear Path":
- Nodes arranged in a single fixed vertical chain with one entry point (Aperture) and one exit point (Portrait Lighting)
- Solid black directed edges showing the one permitted order
- Layout: vis-network hierarchical layout, direction top-to-bottom

Right panel — "Rhizombic Exploration":
- Same eight nodes arranged with force-directed (non-hierarchical) layout
- Multiple undirected edges showing several valid connection routes between concepts (e.g., a learner curious about Portrait Lighting can reach Depth of Field directly without passing through ISO)
- No single required entry point; any node can be a starting point, shown by a subtle pulsing highlight that cycles among all eight nodes on load

Interactive features:
- Hover any node in either panel: tooltip shows the concept's one-sentence definition
- Click any node in the Rhizombic panel: highlights every alternate path from that node to "Portrait Lighting," demonstrating there are multiple valid routes
- Click any node in the Linear panel: highlights only the single fixed path, demonstrating there is exactly one route
- Zoom: mouse wheel on either panel independently
- Pan: click and drag background of either panel independently
- Button: "Simulate a Curious Learner" — animates a token jumping between 3-4 loosely related nodes in the Rhizombic panel in a plausible but non-sequential order, then displays the caption "This learner built a working understanding of Depth of Field without ever visiting ISO directly."

Color scheme: Linear panel nodes in solid blue; Rhizombic panel nodes in gold with varying node size proportional to degree (more-connected nodes appear larger)

Responsive behavior: panels stack vertically on viewports narrower than 700px; both networks resize proportionally to container width using vis-network's `fit()` method on window resize

Canvas size: responsive, 100% width, 560px height, panels split 50/50 on wide viewports

Implementation: vis-network for both graph panels; a shared JavaScript array of the eight nodes and two edge sets (linear, rhizomatic) driving both renders
```

## Related Resources

- [Chapter 7: Learning Theories and Instructional Design](../../chapters/07-learning-theories-instructional-design/index.md)
