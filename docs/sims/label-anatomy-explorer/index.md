---
title: Label Anatomy Explorer
description: Label Anatomy Explorer
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Label Anatomy Explorer



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md).

```text
Type: graph-model
**sim-id:** label-anatomy-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners see that a single concept node carries one preferred label and zero or more alternate labels, and that alternate labels are aliases, not separate nodes.

Bloom Level: Understand (L2)
Bloom Verb: distinguish, classify

Node types:
1. Concept node (gold circle, larger radius) — labeled with its preferred label, e.g. "Bipartite Graph"
2. Alternate label node (light gray rounded rectangle, smaller) — e.g. "Two-Part Graph", "2-Partite Graph"

Edge types:
1. `hasAlternateLabel` (dashed gray line) connecting the concept node to each alternate label node

Sample data (three small concept clusters shown at once):
- Concept: "Bipartite Graph" — alternates: "Two-Part Graph", "2-Partite Graph"
- Concept: "Directed Acyclic Graph (DAG)" — alternates: "DAG", "Dependency Graph" (marked with a caution icon, see note below)
- Concept: "Preferred Label" — alternates: "Canonical Label"

Interactive features:
- Click the gold concept node: infobox shows "Preferred Label: <label>" plus the ISO-style definition of the concept
- Click a gray alternate-label node: infobox shows "Alternate label for: <preferred label>" plus one sentence on why this synonym exists (e.g., era, sub-field, or shorter colloquial form)
- Hover any node: highlights only that node's direct edges, dimming the rest of the canvas
- Layout: force-directed, concept nodes centered with alternate labels orbiting them

Special note to render as an infobox caveat: "Dependency Graph" is intentionally shown with a caution icon because in this course it is a related-but-distinct concept (see Chapter 1), not a true synonym of DAG — the diagram uses it to illustrate a common labeling mistake, not a valid alternate label.

Canvas size: responsive, minimum 600x450px, must reflow on window resize

Implementation: vis-network JavaScript library with a fixed node dataset (no live editing), infobox rendered in a side panel that appears on click
```

## Related Resources

- [Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md)
