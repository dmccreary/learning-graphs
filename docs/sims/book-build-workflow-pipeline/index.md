---
title: Book Build Workflow Pipeline
description: Given the seven-stage pipeline rendered as a flowchart, the learner can examine each stage's inputs and outputs and differentiate the two stages (quality validation and local preview) that exist specifically to catch problems before public deployment.
status: scaffold
library: Mermaid
bloom_level: Analyze (L4)
---

# Book Build Workflow Pipeline



<iframe src="main.html" width="100%" height="1182"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../../chapters/18-intelligent-textbooks-microsims-deployment/index.md).

```text
Type: workflow
**sim-id:** book-build-workflow-pipeline<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through the seven-stage book build workflow to see how content generation, MicroSim implementation, quality validation, and deployment chain together into one repeatable process, reinforcing that this book itself was produced by this exact pipeline.

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate, sequence

Learning objective: Given the seven-stage pipeline rendered as a flowchart, the learner can examine each stage's inputs and outputs and differentiate the two stages (quality validation and local preview) that exist specifically to catch problems before public deployment.

Visual style: Mermaid top-to-bottom flowchart, seven rectangular nodes connected by arrows, with the Quality Validation node styled as a decision diamond and a "Fix and Retry" dashed loop arrow back to Chapter Content Generation

Steps (each is one Mermaid node with a click directive):
1. "Course Description and Learning Graph" — click reveals: "The validated, cycle-free concept dependency graph from Chapters 1-5."
2. "Chapter Structure Generation" — click reveals: "A skill reads the graph and produces chapter outlines in dependency order."
3. "Chapter Content Generation" — click reveals: "A skill turns each outline into prose, diagrams, and MicroSim specifications — the process that produced this chapter."
4. "MicroSim Implementation" — click reveals: "Diagram specifications are turned into working main.html and JavaScript files."
5. "Quality Validation" — click reveals: "Automated Quality Gate checks (word counts, broken links, missing concepts, reading-level drift) run before anything is published."
6. "Local Preview (mkdocs serve)" — click reveals: "A reviewer checks formatting, links, and MicroSim rendering on their own machine before anything goes live."
7. "Deployment (mkdocs gh-deploy)" — click reveals: "The reviewed site is built and pushed to GitHub Pages, becoming publicly reachable."

Interactive features: every node has a click directive opening an infobox below the diagram; the Quality Validation node is colored gold to flag it as a gate; a dashed "Fix and Retry" arrow loops from Quality Validation back to Chapter Content Generation, clickable to reveal "A failed quality check sends content back for revision rather than blocking the entire pipeline — an iterative workflow, as defined in Chapter 17"

Color scheme: indigo fill for content-production nodes, gold fill for the Quality Validation decision node, green fill for the final Deployment node, dashed gray for the retry loop

Responsive behavior: flowchart scales to container width and reflows to a narrower single-column layout on viewports below 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 500px height

Implementation: Mermaid.js flowchart with click bindings wired to a JavaScript showInfo() function populating a div below the diagram with the selected stage's stored description text
```

## Related Resources

- [Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../../chapters/18-intelligent-textbooks-microsims-deployment/index.md)
