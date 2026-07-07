---
title: The Twelve-Step Pipeline From Course Description to Validated Graph
description: Given the full pipeline as a flowchart with automated steps, human checkpoints, and a regeneration loop visually distinguished, the learner can judge which step a specific quality problem (an orphaned node, a vague course description, a mislabeled category) traces back to, and justify whether the correct response is targeted iteration or full regeneration.
status: scaffold
library: Mermaid
bloom_level: Evaluate (L5)
---

# The Twelve-Step Pipeline From Course Description to Validated Graph



<iframe src="main.html" width="100%" height="902"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 19: Using a Skill to Generate a Learning Graph](../../chapters/19-skill-generate-learning-graph/index.md).

```text
Type: workflow
**sim-id:** learning-graph-pipeline-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through every step of the learning-graph-generator pipeline in order, seeing which steps are automated, which are human-in-the-loop checkpoints, and where iteration loops back to an earlier step — synthesizing every concept in this chapter into one end-to-end map.

Bloom Level: Evaluate (L5)
Bloom Verb: judge, assess, justify

Learning objective: Given the full pipeline as a flowchart with automated steps, human checkpoints, and a regeneration loop visually distinguished, the learner can judge which step a specific quality problem (an orphaned node, a vague course description, a mislabeled category) traces back to, and justify whether the correct response is targeted iteration or full regeneration.

Visual style: Mermaid top-to-bottom flowchart with color-coded node types (automated step, human checkpoint, output file) and one dashed feedback loop arrow from Quality Validation back to Concept List Review

Steps (each a Mermaid node with a click directive): (1) Skill Invocation, automated — reveals "The user or agent triggers the skill by name, and Claude Code loads its instructions." (2) Course Description Scoring, human checkpoint — reveals "Scored against a 100-point rubric; below 85 the user revises before continuing." (3) Concept List Generation, automated — reveals "Drafts a flat, numbered list of Title Case labels covering the course's full breadth." (4) Concept List Review, human checkpoint — reveals "The user reads the full list and adds, removes, or renames entries before dependency work begins." (5) Dependency CSV Generation, automated — reveals "Encodes prerequisites as a CSV, edges pointing from each dependent concept to its prerequisites." (6) Automated Quality Validation, automated — reveals "A script checks cycles, orphans, disconnected subgraphs, and linear chains, producing a numeric score." (7) Taxonomy Generation Step, automated — reveals "Designs 10-12 balanced categories and assigns every concept to one, adding a TaxonomyID column." (8) Generate learning-graph.json, automated — reveals "Combines the taxonomy-enriched CSV, metadata, and taxonomy names into the graph JSON used by every vis.js diagram in this book." (9) Pipeline Session Log, automated — reveals "Records every step executed, problems found, and fixes applied, for future debugging." (10) Human-in-the-Loop Review, human checkpoint — reveals "The user reviews the concept list, taxonomy, and graph JSON before the token-expensive chapter-generation skill runs."

Feedback loop: a dashed arrow labeled "Iterative Graph Regeneration" connects Automated Quality Validation back to Concept List Review / Dependency CSV Generation, clickable to reveal: "When validation finds a scoped, specific problem, the pipeline patches the affected concepts or edges and re-validates, rather than restarting from Step 1."

Interactive features: every node has a click directive opening an infobox below the diagram; human-checkpoint nodes use a person icon and gold fill; automated-step nodes use a gear icon and indigo fill; output-file nodes use a document icon and green fill; the feedback loop arrow is dashed gray and clickable

Color scheme: gold for human checkpoints, indigo for automated steps, green for output files, dashed gray for the feedback loop

Responsive behavior: flowchart scales to container width and reflows to single-column below 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 560px height

Implementation: Mermaid.js flowchart with click bindings wired to a JavaScript showInfo() function populating a div below the diagram; node styling via Mermaid classDef for the three node-type categories
```

## Related Resources

- [Chapter 19: Using a Skill to Generate a Learning Graph](../../chapters/19-skill-generate-learning-graph/index.md)
