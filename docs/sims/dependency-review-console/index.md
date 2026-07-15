---
title: Dependency Review Console
description: Judge eight pre-written dependency edges — each with a stated rationale and a confidence badge — as sound, overconstrained, underconstrained, or a false prerequisite.
image: /sims/dependency-review-console/dependency-review-console.png
og:image: /sims/dependency-review-console/dependency-review-console.png
twitter:image: /sims/dependency-review-console/dependency-review-console.png
social:
   cards: false
status: implemented
library: HTML/CSS/JavaScript
bloom_level: Evaluate (L5)
---

# Dependency Review Console

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Dependency Review Console MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

A dependency CSV with 490 edges is not 490 equally trustworthy claims. Some are load-bearing,
some are merely helpful, and a few turn out on review to be wrong. **Dependency Review** is the
process of examining those assertions rather than accepting them at face value, and it is a
judgment a validator cannot make for you: an overconstrained graph is still a perfectly valid
DAG, and passes every structural check in Chapter 5.

This console deals you eight edges one at a time. Each shows the asserted relationship, the
**rationale** the asserter gave, their **confidence**, and the edge's **provenance**. Your job
is to classify it:

| Classification | What it means |
|---|---|
| **Sound** | A genuine, correctly scoped prerequisite |
| **Overconstrained** | Requires more than the concept genuinely needs — usually a *recommended* prerequisite encoded as *necessary*, which blocks learners for no reason |
| **Underconstrained** | Requires less than the concept genuinely needs, letting a learner attempt something they are not ready for |
| **False Prerequisite** | Not a real prerequisite at all — a plausible-sounding edge based on topical proximity rather than domain expertise |

Edges follow this book's convention: **A → B reads "A depends on B"**, so B is the prerequisite.

### Read the rationale, not the badge

The confidence values deliberately cross-cut correctness, because that is the trap this sim
exists to spring:

- **Edge 5** (`Topological Sort → Directed Acyclic Graph`) is asserted at only **medium**
  confidence, and it is **sound**. The asserter simply did not cite a source.
- **Edge 6** (`Concept Label → Learning Graph`) is asserted at **high** confidence by a **human
  domain expert**, and it is **overconstrained**.

Confidence records how sure the asserter was — not whether they were right. A reviewer who
classifies by reading the badge will land near chance. The rationale is the evidence; the
confidence is just how loudly it was claimed.

## How to Use

1. Read the edge, the rationale, and the confidence badge.
2. Ask the diagnostic question for each failure mode:
   - Could a learner genuinely *not* start B without A? If they could, but it would be harder,
     the edge is **overconstrained**.
   - Is something else obviously required that is *not* listed? Then **underconstrained**.
   - Is the rationale actually about topic, ordering, or convenience rather than required prior
     knowledge? Then **false prerequisite**.
3. Click a classification. The card turns green or red, the model answer's button turns green,
   and the justification appears below.
4. Advance through all eight, then click **Review Summary** for a table of your classifications
   against the model answers with your final accuracy.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/dependency-review-console/main.html"
        height="482px"
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

Learners need **Dependency Rationale**, **Dependency Confidence**, **Necessary Prerequisite**,
and **Recommended Prerequisite** from
[Chapter 23](../../chapters/23-advanced-dependency-modeling/index.md).

### Activities

1. **Solo review** (8 min): Each learner classifies all eight edges alone and records their
   accuracy from the summary table.
2. **Argue the misses** (7 min): Collect the class's answers for edges 2 and 6 — both
   overconstrained, but one is asserted at medium confidence by an AI pass and the other at high
   confidence by a human expert. Ask which one was harder to reject, and why. This is where the
   "confidence is not correctness" lesson lands.
3. **Necessary vs recommended** (5 min): Edge 2's rationale says graph theory "makes node
   styling much easier to reason about." Have learners rewrite that rationale so it would
   justify a *sound* edge, and then decide whether the edge should exist at all or be
   re-encoded as a recommended prerequisite.

### Assessment

Learners can:

- Classify a dependency edge against the four categories and justify the call from the rationale.
- Identify "makes it easier" language as the signature of a recommended prerequisite.
- Identify topical proximity and teaching order as false-prerequisite signals.
- Explain why confidence and provenance inform a review without settling it.

## Related Concepts

- **Dependency Review** — the process this console simulates
- **Dependency Rationale** — the stated reason, and the actual evidence a reviewer weighs
- **Dependency Confidence** — how sure the asserter was, which is not the same as correctness
- **Edge Provenance** — who or what asserted the edge
- **Overconstraint / Underconstraint / False Prerequisite** — the three failure modes
- **Necessary vs Recommended Prerequisite** — the distinction most overconstraint comes from

## References

1. [Chapter 23: Advanced Dependency Modeling](../../chapters/23-advanced-dependency-modeling/index.md) - The chapter this MicroSim supports.
2. [Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md) - The simpler single-flavor prerequisite edge this chapter extends.
3. [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Why an overconstrained graph still passes every structural check.
4. [Curriculum Mapping](https://en.wikipedia.org/wiki/Curriculum_mapping) - The broader practice that dependency review supports.
5. [Bloom's Taxonomy](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy) - The framework behind the Evaluate-level judgment this MicroSim asks for.
