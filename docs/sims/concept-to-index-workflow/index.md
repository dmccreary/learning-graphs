---
title: From Concept to Index Entry
description: From Concept to Index Entry
status: scaffold
library: Mermaid
bloom_level: Apply (L3)
---

# From Concept to Index Entry



<iframe src="main.html" width="100%" height="862"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md).

```text
Type: workflow
**sim-id:** concept-to-index-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Show learners how a concept's label data (preferred label, alternate labels, chapter location) is mechanically transformed into textbook index entries, with no manual index-writing step.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, execute

Steps (each is a clickable Mermaid node with a `click` directive opening an infobox):
1. Start: "Concept Record" — hover/click text: "A graph node with a preferred label, alternate labels, a definition, and the chapter(s) where it appears — e.g., preferred label 'Bipartite Graph', alternate label 'Two-Part Graph', chapter 4."
2. Process: "Sort Alphabetically by Preferred Label" — click text: "All preferred labels across the graph are sorted A-to-Z to form the index's primary entries."
3. Process: "Attach Chapter/Page Numbers" — click text: "Each preferred label entry lists every chapter where the concept is covered or referenced."
4. Process: "Generate Cross-References" — click text: "Every alternate label becomes its own alphabetized index line reading 'See [preferred label]', so a reader searching under the synonym still finds the concept."
5. End: "Two-Part Graph, see Bipartite Graph" and "Bipartite Graph .......... 42" — click text: "The finished index contains both the canonical entry and its synonym cross-reference, generated automatically from the same label data."

Visual style: top-to-bottom Mermaid flowchart, rectangles for process steps, rounded ends for start/end

Color coding: gold for the source concept record, blue for processing steps, green for the two generated index lines

Mermaid click directive requirement: every node (Start, three Process nodes, End) must have a `click NodeId call showInfo("...")`-style directive wired to an infobox so the diagram meets this book's interactivity requirement.

Implementation: Mermaid flowchart with JavaScript click callbacks rendering definitions in a side infobox
```

## Related Resources

- [Chapter 2: Concept Labeling and Metadata Standards](../../chapters/02-concept-labeling-metadata-standards/index.md)
