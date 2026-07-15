---
title: SKOS Relation Triple Builder
description: Pick the correct SKOS relation — broader, narrower, or related — for six concept pairs drawn from this book's own vocabulary, and get the direction right as well as the type.
image: /sims/skos-relation-triple-builder/skos-relation-triple-builder.png
og:image: /sims/skos-relation-triple-builder/skos-relation-triple-builder.png
twitter:image: /sims/skos-relation-triple-builder/skos-relation-triple-builder.png
social:
   cards: false
status: implemented
library: vis-network
bloom_level: Apply (L3)
---

# SKOS Relation Triple Builder

<iframe src="main.html" height="492px" width="100%" scrolling="no"></iframe>

[Run the SKOS Relation Triple Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

SKOS gives you three relations for linking concepts:

| Relation | Points to | Example |
|---|---|---|
| **Broader** | A more general concept | Depth-First Search → broader → Graph Traversal |
| **Narrower** | A more specific concept | Graph Traversal → narrower → Depth-First Search |
| **Related** | An associated concept, no hierarchy implied | SKOS → related → Dublin Core Metadata |

Recognizing those definitions is easy. Applying them is where people slip, because **the
direction is half the answer**. `Broader` and `narrower` describe the same hierarchy read from
opposite ends. Getting the relation type right while pointing the arrow the wrong way produces
a triple that asserts the exact opposite of what you meant — and a validator will happily
accept it, because it is structurally well-formed.

This MicroSim gives you six concept pairs from this book's own vocabulary and asks you to build
each triple. The **Swap** button flips which concept the arrow starts from, and the correct
answer inverts along with it: `broader` becomes `narrower`, while `related` — being symmetric —
stays `related` whichever way you point it.

## How to Use

1. Read the two concept boxes and the dashed placeholder arrow between them.
2. Decide whether the arrow, **as drawn**, should be labeled Broader, Narrower, or Related.
3. If the arrow points the wrong way for the relation you have in mind, click **Swap** first.
4. Click a relation button to commit. The arrow solidifies gold (correct) or red (incorrect),
   labeled with the relation you chose, and the feedback banner shows the correct triple plus a
   one-sentence explanation.
5. Click **Next Pair** to advance. After all six, you get a scorecard showing which pairs you
   answered correctly on the **first** try.

The progress dots along the top fill in green for a first-try correct answer and red otherwise,
so you can see your run at a glance.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/skos-relation-triple-builder/main.html"
        height="492px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience

Instructional designers, curriculum developers, and educational technologists working with
concept dependency graphs.

### Duration

10–15 minutes

### Prerequisites

Learners should know what **SKOS** is and have seen the definitions of **broader**,
**narrower**, and **related** from
[Chapter 22](../../chapters/22-concept-metadata-semantic-labeling/index.md).

### Activities

1. **First run, no help** (5 min): Learners complete all six pairs without discussion. Record
   the first-try score.
2. **The swap discussion** (5 min): Focus on pair 2. Ask half the room to answer it as drawn and
   half to swap first. Both can be correct — with *different* relation labels. Ask what that
   implies about storing a SKOS triple in a database: is `broader` a property of the pair, or of
   the ordered pair?
3. **Why related is different** (3 min): Pairs 3 and 6 are `related`. Ask what happens to those
   when you swap, and why symmetry makes `related` cheaper to store but weaker to reason with.

### Assessment

Learners can:

- Select the correct SKOS relation for an unseen concept pair.
- Orient the arrow correctly, and recognize that a right label on a backward arrow is wrong.
- Explain why `broader` and `narrower` are inverses and `related` is symmetric.
- Distinguish a hierarchical relation from an associative one for a pair of sibling concepts.

## Related Concepts

- **SKOS** — the vocabulary these three relations come from
- **Broader / Narrower** — inverse hierarchical relations
- **Related** — the symmetric associative relation
- **Dublin Core Metadata** — a sibling standard, used in pair 3
- **Concept Taxonomy** — what a well-formed set of broader/narrower triples builds up to

## References

1. [Chapter 22: Concept Metadata and Semantic Labeling](../../chapters/22-concept-metadata-semantic-labeling/index.md) - The chapter this MicroSim supports.
2. [SKOS Simple Knowledge Organization System](https://en.wikipedia.org/wiki/Simple_Knowledge_Organization_System) - Wikipedia's overview of the W3C standard.
3. [SKOS Reference](https://www.w3.org/TR/skos-reference/) - The W3C specification defining skos:broader, skos:narrower, and skos:related.
4. [Dublin Core](https://en.wikipedia.org/wiki/Dublin_Core) - The metadata standard used as the `related` example in pair 3.
5. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - The graph rendering library used to build this MicroSim.
