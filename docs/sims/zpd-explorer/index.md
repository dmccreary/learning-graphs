---
title: Zone of Proximal Development Explorer
description: Given a learner's current mastery over a small concept dependency graph, the learner can classify each concept into the comfort zone, the Zone of Proximal Development, or the frustration zone, and can predict which concepts enter the ZPD when a given concept is mastered.
status: complete
library: p5.js
bloom_level: Apply (L3)
image: /sims/zpd-explorer/zpd-explorer.png
og:image: /sims/zpd-explorer/zpd-explorer.png
---

# Zone of Proximal Development Explorer

<iframe src="main.html" width="100%" height="730" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Overview

Vygotsky's Zone of Proximal Development describes three regions around a learner
at a single moment in time. This MicroSim draws all three around one simulated
learner working through a small slice of a graph-theory concept dependency graph:

| Zone | Color | Meaning | Confidence range shown |
|---|---|---|---|
| Comfort zone | Green | The learner can already do this alone, so practice here produces almost no learning | 0.90 and above |
| Zone of Proximal Development | Amber | Every prerequisite is mastered, so guidance, worked examples, and MicroSims will land | roughly 0.44 – 0.63 |
| Frustration zone | Red | At least one prerequisite is still missing, so even substantial help will not produce genuine learning | 0.22 and below |

The number inside each circle is the model's **mastery confidence** — its estimate
that this learner could succeed at that concept right now. The concept name
appears in black beneath the circle.

Zone membership is not hand-assigned. It is computed from the prerequisite
edges: a concept sits in the ZPD exactly when it is unmastered *and* every one of
its prerequisites is mastered.

## Interactive Features

- **Click an amber concept** to master it. Its confidence jumps above 0.90, it
  turns green and moves into the comfort zone, and any red concept whose last
  missing prerequisite was just satisfied turns amber and moves inward. This is
  the central idea: the ZPD is a moving frontier, not a fixed set of concepts.
- **Click a red concept** to see exactly which prerequisites are still missing
  and why guidance would be wasted on it right now.
- **Click a green concept** to see why more practice on it has little
  instructional value.
- **Layout** menu switches between three arrangements of the same data:
    - *Concentric* (default) — the three zones as nested rings around the learner,
      matching the standard textbook picture of the ZPD
    - *Left to Right* — the three zones as vertical bands, which makes the
      relative population of each zone easy to compare
    - *Top to Bottom* — the three zones as horizontal bands, which reads as a
      progression from mastered down to out of reach
- **Show all prerequisite links** draws every dependency edge at once. With the
  box unchecked, hovering or selecting a concept reveals just that concept's
  edges.
- **Reset Learner** restores the starting model.

Notice that a concept's confidence number *rises* when it moves from the
frustration zone into the ZPD. Nothing about the concept changed — what changed
is the learner's position in the graph beneath it.

## Suggested Exercise

Start from the reset state and master **Acyclic Graph** alone. Nothing new enters
the ZPD, because Topological Sort and Cycle Detection each need *two*
prerequisites. Now master **Graph Traversal**: two concepts move inward at once.
Predict, before clicking, how many concepts will enter the ZPD when you then
master Adjacency List.

## Lesson Plan

**Bloom Level:** Apply (L3)

**Learning objective:** Given a learner's current mastery over a small concept
dependency graph, classify each concept into the comfort zone, the Zone of
Proximal Development, or the frustration zone, and predict which concepts enter
the ZPD when a given concept is mastered.

1. Open the MicroSim in the Concentric layout and have students state, in their
   own words, why the innermost and outermost zones are both low-value targets
   for instruction.
2. Have students predict which concept, if mastered, would move the most
   concepts into the ZPD — then test the prediction.
3. Switch to the Left to Right layout and discuss what the concentric view shows
   that the banded view hides, and vice versa.
4. Connect the mechanic back to chapter design: a chapter should target the amber
   band for its readers, which is precisely what a validated prerequisite graph
   makes possible to estimate.

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/zpd-explorer/main.html"
        width="100%" height="730px" scrolling="no"></iframe>
```

## Editing in the p5.js Editor

The sketch parents its canvas to the page's `<main>` element, so
[`zpd-explorer.js`](zpd-explorer.js) can be pasted straight into the
[p5.js Web Editor](https://editor.p5js.org/) and run without modification.

## Related Resources

- [Chapter 7: Learning Theories and Instructional Design](../../chapters/07-learning-theories-instructional-design/index.md)
- [Chapter 8: Cognitive Load and Knowledge Space Theory](../../chapters/08-cognitive-load-knowledge-space-theory/index.md)
- [Knowledge Space Explorer](../knowledge-space-explorer/index.md) — the same
  "ready to learn" idea drawn as a full lattice of knowledge states
- [Ready-to-Learn Frontier Simulator](../ready-to-learn-frontier-simulator/index.md) —
  the frontier applied to a full-size learning graph

## References

1. [Zone of Proximal Development](https://en.wikipedia.org/wiki/Zone_of_proximal_development) - Wikipedia -
   Overview of Vygotsky's construct, including the three-region framing this MicroSim draws and the
   common criticisms of how the term is used in practice.
2. [Lev Vygotsky](https://en.wikipedia.org/wiki/Lev_Vygotsky) - Wikipedia - Biography and summary of the
   sociocultural theory of development that the Zone of Proximal Development belongs to.
3. Vygotsky, L. S. (1978). *Mind in Society: The Development of Higher Psychological Processes.*
   Harvard University Press - The primary source in which the Zone of Proximal Development is defined
   as the distance between independent problem solving and problem solving under guidance.
4. [Instructional Scaffolding](https://en.wikipedia.org/wiki/Instructional_scaffolding) - Wikipedia -
   The technique for delivering support inside the ZPD, and the fading pattern that removes it as
   competence grows.
5. [Knowledge Space Theory](https://en.wikipedia.org/wiki/Knowledge_space) - Wikipedia - The formal
   treatment of prerequisite-closed knowledge states that this MicroSim's zone computation follows.
