---
title: Learning Graph Quality Gate Explorer
description: Given a 14-node sample dependency graph containing one orphaned node, one disconnected two-node cluster, and one three-node cycle, the learner can use the toggle and click controls to identify each structural problem and explain why it would block safe chapter sequencing.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Learning Graph Quality Gate Explorer



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 19: Using a Skill to Generate a Learning Graph](../../chapters/19-skill-generate-learning-graph/index.md).

```text
Type: microsim
**sim-id:** learning-graph-quality-gate-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners toggle a small sample graph between a "before validation" state (containing an orphaned node, a disconnected cluster, and a cycle) and an "after validation" state (fully connected, acyclic) so they can see exactly what Automated Quality Validation catches and fixes.

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate, detect

Learning objective: Given a 14-node sample dependency graph containing one orphaned node, one disconnected two-node cluster, and one three-node cycle, the learner can use the toggle and click controls to identify each structural problem and explain why it would block safe chapter sequencing.

Canvas layout: full-width vis-network graph panel (420px tall); a fixed-height infobox panel (100px) below it; a "Before Validation" / "After Validation" toggle at the top

Visual elements: 14 nodes using the circle/color conventions from Chapters 11-15. "Before" state: one red dashed-outline node (orphaned, zero edges), two orange nodes in a visibly separated cluster (disconnected component), three nodes joined in a closed loop with red edges (cycle). "After" state: same 14 nodes, all three problems repaired — the orphan gains one edge to a foundational node, the cluster gains one bridging edge, the cycle is broken by reversing one edge

Interactive controls: toggle swaps the dataset and redraws; clicking any flagged node in "Before" opens an infobox naming the check that catches it (orphan detection, connectivity analysis, or cycle detection) and why it matters; hovering any node shows its label and indegree/outdegree

Default parameters: initial view is "Before Validation," no node selected, infobox reads "Click a red or orange node to see what's wrong"

Data Visibility Requirements:
Stage 1: Show the "Before" graph with all three problems flagged simultaneously
Stage 2: On click, show the check name and a one-sentence consequence for chapter sequencing
Stage 3: On toggling to "After," show all edges forming one connected, acyclic component, with the three repaired edges highlighted gold for three seconds

Instructional Rationale: An Analyze-level objective requires learners to differentiate three failure modes that look superficially similar but require different fixes — a static diagram cannot support that comparison, but a before/after toggle with click-to-explain nodes can.

Responsive behavior: graph panel and infobox stack vertically below 650px; toggle stays fixed at top

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network with two pre-built 14-node/edge datasets swapped via the toggle; click handler maps node ID to pre-written explanation text; hover uses vis-network's built-in tooltip API
```

## Related Resources

- [Chapter 19: Using a Skill to Generate a Learning Graph](../../chapters/19-skill-generate-learning-graph/index.md)
