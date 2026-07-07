---
title: Ready-to-Learn Frontier Simulator
description: Given a small dependency graph and a starting state, the learner can predict and verify which concept(s) become ready-to-learn after marking a specific concept as learned.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Ready-to-Learn Frontier Simulator



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md).

```text
Type: graph-model
**sim-id:** ready-to-learn-frontier-simulator<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners click concepts to mark them "learned" one at a time and watch which other concepts flip to "ready-to-learn" as a result, making the cascading unlock effect concrete.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, apply

Learning objective: Given a small dependency graph and a starting state, the learner can predict and verify which concept(s) become ready-to-learn after marking a specific concept as learned.

Base dataset: 9-node subgraph — "Number Sense," "Arithmetic," "Algebra," "Geometry," "Trigonometry," "Functions," "Derivatives," "Integrals," "Applied Calculus" — with dependency edges forming a typical math-sequence DAG (Algebra and Geometry both depend on Arithmetic; Trigonometry depends on Geometry and Algebra; Functions depends on Algebra; Derivatives depends on Functions and Trigonometry; Integrals depends on Derivatives; Applied Calculus depends on Integrals)

Interactive features:
- Click any node currently colored gold (ready-to-learn) to mark it green (learned); clicking recalculates the ready-to-learn set and any newly-unlocked node animates from gray to gold
- Node color states: gray = "not yet ready" (at least one prerequisite unlearned), gold = "ready-to-learn," green = "learned"
- Reset button restores the initial state (only "Number Sense" learned, "Arithmetic" ready-to-learn, everything else gray)
- Infobox lists the current "Ready-to-Learn" set as a bulleted list, updating live

Visual styling:
- Gray, gold, and green circular nodes as described above
- A pulsing animation plays briefly on any node transitioning from gray to gold, to draw attention to the cascade

Layout: hierarchical top-down, foundational concepts at the bottom

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network JavaScript library; on each click, recompute ready-to-learn status for all gray nodes by checking whether every prerequisite (outgoing edge target) is in the learned set
```

## Related Resources

- [Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md)
