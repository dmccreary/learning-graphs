---
title: Knowledge Space Explorer
description: Given the full knowledge-state lattice for a small four-concept domain, the learner can identify which knowledge states are valid (consistent with the domain's partial order) versus invalid, and can trace at least two distinct valid learning paths from the empty state to full mastery.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Knowledge Space Explorer



<iframe src="main.html" width="100%" height="622"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Cognitive Load and Knowledge Space Theory](../../chapters/08-cognitive-load-knowledge-space-theory/index.md).

```text
Type: graph-model
**sim-id:** knowledge-space-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners explore the full knowledge space for a small four-concept domain (Arithmetic, Number Sense, Algebra, Applied Calculus, matching this chapter's running example), visualizing every valid knowledge state as a node and every valid one-concept learning step as an edge, so the abstract idea of a "knowledge space" becomes a structure they can click through.

Bloom Level: Analyze (L4)
Bloom Verb: examine, distinguish, differentiate

Learning objective: Given the full knowledge-state lattice for a small four-concept domain, the learner can identify which knowledge states are valid (consistent with the domain's partial order) versus invalid, and can trace at least two distinct valid learning paths from the empty state to full mastery.

Node types:
- One node per valid knowledge state, labeled with its concept subset (e.g., "{}" for empty, "{Arithmetic}", "{Arithmetic, Number Sense}", "{Arithmetic, Number Sense, Algebra}", "{Arithmetic, Number Sense, Algebra, Applied Calculus}" for the full domain)
- Node shading: light gray for the empty state, deepening blue as more concepts are included, gold outline on the full-domain state

Edges:
- A directed edge from state \(K_i\) to state \(K_{i+1}\) whenever \(K_{i+1}\) adds exactly one ready-to-learn concept to \(K_i\)
- Edges labeled with the single concept name being added at that step

Layout: vis-network hierarchical layout, empty state at top, full domain state at bottom, states with the same number of concepts arranged on the same horizontal rank

Interactive features:
- Hover any node: tooltip lists the exact concept subset that knowledge state represents and states whether it is reachable (all valid states are reachable by construction in this small example)
- Click "Highlight a Learning Path" button: animates a token moving from the empty state to the full-domain state along one randomly chosen valid path, pausing briefly at each intermediate state
- Click any edge: infobox states which single concept becomes newly learned at that step, and why it was ready-to-learn at that point (its prerequisites were already in the source state)
- Toggle: "Show Invalid States" — reveals several grayed-out, disconnected nodes representing subsets that violate the partial order (e.g., "{Algebra}" without Arithmetic), each labeled "Invalid: missing prerequisite"
- Zoom: mouse wheel
- Pan: click and drag background

Color scheme: valid states in blue gradient by depth, full-domain state with gold outline, invalid states (when toggled on) in flat gray with a red X icon

Legend: node shade = number of concepts mastered in that state; edge label = concept learned at that step; gold outline = full domain mastery

Responsive behavior: network resizes to container width using vis-network's `fit()` method on window resize; control buttons wrap below the network on viewports narrower than 600px

Canvas size: responsive, 100% width, 580px height

Implementation: vis-network with a precomputed nodes/edges dataset generated from the four-concept domain's partial order (Arithmetic and Number Sense incomparable and both prerequisites of Algebra; Algebra a prerequisite of Applied Calculus); path animation implemented as a timed sequence of node-highlight state changes
```

## Related Resources

- [Chapter 8: Cognitive Load and Knowledge Space Theory](../../chapters/08-cognitive-load-knowledge-space-theory/index.md)
