---
title: Dublin Core Metadata Explorer
description: Dublin Core Metadata Explorer
status: scaffold
library: vis-network
bloom_level: Remember (L1)
---

# Dublin Core Metadata Explorer



<iframe src="main.html" width="100%" height="642"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md).

```text
Type: infographic
**sim-id:** dublin-core-metadata-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners explore all 15 Dublin Core elements and see a realistic example value for each, using this textbook's own learning graph file as the running example.

Bloom Level: Remember (L1)
Bloom Verb: identify, recall

Layout: 15 tiles arranged in a 5-column by 3-row responsive grid, one tile per Dublin Core element

Tile labels (element name shown on each tile face):
Title, Creator, Subject, Description, Publisher, Contributor, Date, Type, Format, Identifier, Source, Language, Relation, Coverage, Rights

Interactive features:
- Click a tile: it flips (or expands below the grid) to reveal a one-sentence definition of the element plus an example value drawn from this book's own learning-graph.json record, e.g.:
  - Title → "Learning Graphs: The Key to Intelligent Textbooks"
  - Creator → "Dan McCreary"
  - Subject → "Concept Dependency Graphs, Intelligent Textbooks"
  - Date → publication date of the current learning graph revision
  - Format → "application/json"
- Progress indicator: small counter in the corner ("6 of 15 explored") that increments the first time each tile is flipped, encouraging learners to explore all 15 before moving on
- Hover a tile before clicking: subtle highlight to show it is interactive

Color scheme: 15 tiles in a single accent color family (blues), flipped/explored tiles shown with a checkmark badge

Responsive behavior: grid reflows to 3 columns by 5 rows on narrow viewports

Implementation: HTML/CSS/JavaScript grid with a flip-card interaction; state (which tiles explored) held in page memory, not persisted
```

## Related Resources

- [Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md)
