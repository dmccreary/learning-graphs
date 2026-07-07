---
title: MicroSim Directory Anatomy
description: Given a labeled directory tree for a MicroSim, the learner can identify the role of each file (main.html, sketch.js, index.md) and explain why the iframe embed pattern used throughout this book points at main.html specifically.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# MicroSim Directory Anatomy



<iframe src="main.html" width="100%" height="502"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../../chapters/18-intelligent-textbooks-microsims-deployment/index.md).

```text
Type: diagram
**sim-id:** microsim-directory-anatomy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Show learners the standard file layout of a deployed MicroSim directory (as referenced by every iframe embed in this book) so the abstract term "MicroSim" maps to a concrete, inspectable artifact.

Bloom Level: Understand (L2)
Bloom Verb: explain, identify, describe

Learning objective: Given a labeled directory tree for a MicroSim, the learner can identify the role of each file (main.html, sketch.js, index.md) and explain why the iframe embed pattern used throughout this book points at main.html specifically.

Visual style: A block-diagram file tree, top node "docs/sims/{sim-id}/" branching down to four child nodes: "main.html", "{sim-id}.js", "index.md", "screenshot.png"

Components to show:
- Root folder icon labeled "docs/sims/{sim-id}/"
- Child file "main.html" — the file every iframe embed in this book points to
- Child file "{sim-id}.js" — the p5.js sketch containing setup() and draw()
- Child file "index.md" — a documentation page describing the MicroSim's controls and learning objective
- Child file "screenshot.png" — a static preview image used in MicroSim index listings

Interactive features: clicking any file node opens an infobox below the diagram with that file's role; clicking "main.html" additionally shows a two-line HTML snippet illustrating that main.html loads p5.js from a CDN and then loads "{sim-id}.js"; clicking "{sim-id}.js" shows a four-line pseudocode snippet illustrating the setup()/draw() pattern

Color scheme: folder node in slate gray, main.html highlighted in gold (as the entry point), remaining files in light blue

Responsive behavior: tree diagram reflows from horizontal branches to a vertical stacked list on viewports narrower than 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 500px height

Implementation: p5.js; static tree layout computed once in setup(), click regions stored as rectangles tested against mouseX/mouseY in a mousePressed() handler, infobox text drawn in a reserved area below the tree
```

## Related Resources

- [Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../../chapters/18-intelligent-textbooks-microsims-deployment/index.md)
