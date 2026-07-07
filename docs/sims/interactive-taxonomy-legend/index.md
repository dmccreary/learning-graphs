---
title: Interactive Taxonomy Legend and Filter
description: Given a color-coded concept graph and its legend, the learner can correctly identify which taxonomy category any node belongs to and predict which nodes will disappear when a given legend entry is toggled off.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Interactive Taxonomy Legend and Filter



<iframe src="main.html" width="100%" height="522"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Concept Taxonomies and Ontologies](../../chapters/04-concept-taxonomies-ontologies/index.md).

```text
Type: graph-model
**sim-id:** interactive-taxonomy-legend<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Show learners how a taxonomy legend both explains a color scheme and acts as a live filter over a rendered concept graph, reinforcing that a legend is a functional taxonomy tool, not decoration.

Bloom Level: Understand (L2)
Bloom Verb: interpret, classify

Learning objective: Given a color-coded concept graph and its legend, the learner can correctly identify which taxonomy category any node belongs to and predict which nodes will disappear when a given legend entry is toggled off.

Base dataset: 24-node sample concept graph drawn from this book's own learning graph, pre-assigned to 6 taxonomy categories: Graph Theory (blue), Metadata Standards (teal), Visualization Tools (gold), Learning Science (purple), Personalization (pink), Governance & Validation (gray)

Layout: force-directed, categories loosely clustered by mutual attraction

Legend panel (right side, fixed width):
- 6 rows, each showing a color swatch, the Taxonomy Category name, and a live count of visible nodes in that category
- Each row is a clickable checkbox-style toggle, checked by default

Interactive features:
- Click a legend row: all nodes in that category fade to 15% opacity and their edges hide; click again to restore full opacity
- Hover any node: tooltip shows the concept label and its Taxonomy Category name
- "Isolate" button per legend row: hides every other category at once, showing only that one node group
- "Reset" button: restores all categories to visible

Visual styling:
- Node color matches its taxonomy category exactly as listed above
- Node shape: circle for all concepts (shape is reserved for other purposes elsewhere in the book)
- Edge color: light gray, low opacity, so category color dominates the visual read

Canvas size: responsive, 100% width, 520px height, legend panel fixed at 180px on desktop and stacking below the graph under 600px viewport width

Implementation: vis-network JavaScript library; legend built as an HTML overlay bound to the DataSet's `updateOnly` API for toggling node/edge visibility without a full re-render
```

## Related Resources

- [Chapter 4: Concept Taxonomies and Ontologies](../../chapters/04-concept-taxonomies-ontologies/index.md)
