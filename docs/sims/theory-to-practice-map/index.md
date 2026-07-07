---
title: Theory-to-Practice Concept Map
description: Given a two-tier network of theories and practices, the learner can correctly classify each of the nine chapter concepts as either a "theory" or a "practice," and correctly trace which theories inform which practices via the graph's edges.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Theory-to-Practice Concept Map



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Learning Theories and Instructional Design](../../chapters/07-learning-theories-instructional-design/index.md).

```text
Type: infographic
**sim-id:** theory-to-practice-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners a single, persistent, clickable map of how this chapter's five learning theories connect to Instructional Design and its four dependent practices, reinforcing the dependency relationships already explained in prose.

Bloom Level: Understand (L2)
Bloom Verb: summarize, classify, interpret

Learning objective: Given a two-tier network of theories and practices, the learner can correctly classify each of the nine chapter concepts as either a "theory" or a "practice," and correctly trace which theories inform which practices via the graph's edges.

Node types:
- Top tier (five theory nodes, blue circles): Constructivism, Cognitivism, Behaviorism, Connectivism, Andragogy
- Bottom tier (four practice nodes, gold squares): Instructional Design, Scaffolding, Curriculum Design, Mastery Learning

Edges (directed, dependent-to-prerequisite, matching this book's learning graph convention):
- Instructional Design to Constructivism, Behaviorism, Cognitivism
- Scaffolding to Instructional Design
- Curriculum Design to Instructional Design
- Mastery Learning to Scaffolding
- Non-Linear Learning Path (small extra node, shown lower-right) to Connectivism

Layout: vis-network hierarchical layout, theories on top row, Instructional Design in a middle row, Scaffolding/Curriculum Design/Mastery Learning cascading below it

Interactive features:
- Hover any node: tooltip shows the node's one-sentence definition, pulled from this chapter's own definitions
- Click any node: highlights every edge and neighboring node directly connected to it, dimming the rest of the graph, and opens a side panel with the full paragraph-length explanation from this chapter
- Click background: clears the highlight and returns to the full map
- Zoom: mouse wheel
- Pan: click and drag background

Color scheme: theory nodes in blue, practice nodes in gold, with the Non-Linear Learning Path node in a lighter gray to visually mark it as a secondary/illustrative addition rather than a core practice

Legend: circle = learning theory, square = instructional-design practice, arrow direction = "depends on" (matching every other graph diagram in this book)

Responsive behavior: network resizes to container width on window resize using vis-network's `fit()` method; side panel stacks below the network on viewports narrower than 640px

Canvas size: responsive, 100% width, 560px height

Implementation: vis-network with a fixed nodes/edges dataset matching this chapter's concept list and dependency structure; side-panel definitions stored as a JavaScript lookup object keyed by node id
```

## Related Resources

- [Chapter 7: Learning Theories and Instructional Design](../../chapters/07-learning-theories-instructional-design/index.md)
