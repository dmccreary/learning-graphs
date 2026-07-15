---
title: Readiness and Mastery Dashboard
description: Move eight mastery sliders and watch the readiness frontier and the recommended sequence recompute live, then add a path constraint and see the order change.
image: /sims/readiness-mastery-dashboard/readiness-mastery-dashboard.png
og:image: /sims/readiness-mastery-dashboard/readiness-mastery-dashboard.png
twitter:image: /sims/readiness-mastery-dashboard/readiness-mastery-dashboard.png
social:
   cards: false
status: implemented
library: vis-network
bloom_level: Apply (L3)
---

# Readiness and Mastery Dashboard

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Readiness and Mastery Dashboard MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This is where the whole book converges. **Personalized Sequencing** takes three inputs — a
learner model, a mastery threshold, and a dependency graph — and produces one output: what this
learner should study next. This dashboard puts all three under your hands at once.

Eight knowledge components, one mastery slider each. Move a slider and three things recompute
immediately: the node's color, the **readiness frontier**, and the **recommended sequence**.

### The readiness frontier

A component is in the frontier when **every prerequisite is mastered but it is not yet mastered
itself** — it is exactly what this learner is ready to learn right now. Frontier components get
a pulsing blue ring.

Two consequences are worth predicting before you verify them:

- **At 0% mastery the frontier is not empty.** `Graph` and `Directed Edge` have no prerequisites,
  so their condition is satisfied vacuously. There is always somewhere to start.
- **Raising the threshold can take mastery away.** Set both roots to 80%, then drag the
  threshold to 90%. They stop counting as mastered, and the frontier collapses back to the
  roots. Mastery is a claim relative to a threshold, not an absolute property of a learner.

### The constraint

The unconstrained sequence is a plain topological order: `Graph → Directed Edge → DAG →
Traversal → Prerequisite → …`. Both `DAG` and `Traversal` become available at the same moment,
and the graph alone does not say which to teach first.

That is what a **learning path constraint** is for. Toggle **Add constraint** to apply
*Traversal before DAG* — a curriculum policy that gets learners writing working code before they
meet the formal definition. The sequence reorders to `Graph → Directed Edge → Traversal → DAG →
…`, with the moved components highlighted in purple.

Notice what does **not** happen: no prerequisite is ever violated. The constraint only decides
among orderings the graph already permits. A constraint that contradicted a real prerequisite
would be unsatisfiable, not merely inconvenient.

## How to Use

1. **Predict first.** Before touching a slider, say which components you expect to enter the
   frontier when `Graph` crosses 70%. Then drag it and check.
2. **Drag the mastery sliders** (0–100%). Nodes shade gray → gold → green; the sequence updates
   live; frontier rings appear and disappear.
3. **Drag the mastery threshold** (default 70%). This is the cutoff that decides what "mastered"
   means, and moving it can reclassify components in both directions.
4. **Toggle Add constraint** and watch the recommended sequence reorder.
5. **Hover any node** for its mastery, its status, and its prerequisite list.

In the sequence strip: green = already above threshold, blue outline = study this next,
purple = moved by the active constraint.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/readiness-mastery-dashboard/main.html"
        height="622px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience

Instructional designers, curriculum developers, and educational technologists working with
concept dependency graphs.

### Duration

15–20 minutes

### Prerequisites

Learners need **Learner Model**, **Knowledge Component**, **Mastery Threshold**, **Readiness
Estimation**, **Personalized Learning Path**, and **Personalized Sequencing** from
[Chapter 27](../../chapters/27-learner-modeling-advanced-assessment/index.md).

### Activities

1. **Predict the frontier** (5 min): Starting from reset, have learners write down which
   components enter the frontier after mastering `Graph` alone, then after mastering `Directed
   Edge` too. The answer changes from `{Traversal}` to `{Traversal, DAG}` — because `DAG` needs
   both roots and `Traversal` needs only one. Verify by dragging.
2. **The threshold is a policy, not a fact** (5 min): Set every component to 75% and note the
   sequence. Then drag the threshold from 70% to 80%. Every "mastered" component reverts. Ask
   what that implies about reporting a learner as having "mastered" something without also
   reporting the threshold.
3. **Constraints and freedom** (7 min): Toggle the constraint and identify what moved. Then ask
   the harder question: could a constraint ever reorder `Prerequisite` before `DAG`? No — that
   is a real prerequisite edge, not a free choice. Have learners articulate the difference
   between what the graph *requires* and what a curriculum merely *prefers*.

### Assessment

Learners can:

- Predict which components enter the readiness frontier as mastery values cross the threshold.
- Explain why the frontier is non-empty at zero mastery.
- Explain why raising the threshold can remove a component from "mastered".
- Explain why a path constraint can reorder some pairs but never violate a prerequisite.

## Related Concepts

- **Learner Model** — the eight mastery values on the left
- **Knowledge Component** — each of the eight nodes
- **Mastery Threshold** — the cutoff that turns a percentage into a claim
- **Readiness Estimation** — the frontier computation
- **Learning Path Constraint** — the toggle, and its limits
- **Personalized Sequencing** — the recommended sequence this all produces

## References

1. [Chapter 27: Learner Modeling and Advanced Assessment](../../chapters/27-learner-modeling-advanced-assessment/index.md) - The chapter this MicroSim supports.
2. [Chapter 16: Personalization and Adaptive Learning Paths](../../chapters/16-personalization-adaptive-learning-paths/index.md) - Where personalized paths are first introduced.
3. [Knowledge Space Theory](https://en.wikipedia.org/wiki/Knowledge_space) - The formal theory behind the readiness frontier, where it is called the "outer fringe".
4. [Topological Sorting](https://en.wikipedia.org/wiki/Topological_sorting) - Kahn's algorithm, which produces the recommended sequence.
5. [Mastery Learning](https://en.wikipedia.org/wiki/Mastery_learning) - Bloom's framework, and the origin of the mastery-threshold idea.
