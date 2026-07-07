---
title: Taxonomy Classifier Workbench
description: Given a concept label and definition, the learner can select the single most appropriate taxonomy category from a fixed set of options and explain why competing categories are a worse fit.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Taxonomy Classifier Workbench



<iframe src="main.html" width="100%" height="572"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Concept Taxonomies and Ontologies](../../chapters/04-concept-taxonomies-ontologies/index.md).

```text
Type: microsim
**sim-id:** taxonomy-classifier-workbench<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners practice the taxonomy-classifier task by hand — reading a concept's label and short definition, then choosing which TaxonomyID/Taxonomy Category it belongs to — before trusting an AI tool to do it at scale.

Bloom Level: Apply (L3)
Bloom Verb: classify, apply

Learning objective: Given a concept label and definition, the learner can select the single most appropriate taxonomy category from a fixed set of options and explain why competing categories are a worse fit.

Canvas layout:
- Top (100px): concept card showing a concept label in bold and a one-sentence definition below it
- Middle (300px): six category buttons arranged in a grid, each showing a TaxonomyID (1-6) and its Taxonomy Category name: "1: Graph Theory", "2: Metadata Standards", "3: Visualization Tools", "4: Learning Science", "5: Personalization", "6: Governance & Validation"
- Bottom (120px): feedback panel and "Next Concept" button

Sample concept deck (8 cards, cycled):
- "Force-Directed Layout" — "A physics-based algorithm that positions graph nodes by simulating repulsion and spring forces." Correct: Visualization Tools
- "Cycle Detection" — "A check that confirms a graph contains no circular dependency chains." Correct: Governance & Validation
- "Zone of Proximal Development" — "The gap between what a learner can do alone and with guidance." Correct: Learning Science
- "Hop Count" — "The number of edges separating two concepts along a prerequisite chain." Correct: Graph Theory
- "SKOS" — "A W3C standard vocabulary for expressing preferred and alternate labels." Correct: Metadata Standards
- "Adaptive Learning Path" — "A sequence of concepts customized to one learner's mastery state." Correct: Personalization
- "Orphaned Node" — "A concept with no incoming or outgoing dependency edges." Correct: Governance & Validation
- "Node Group" — "A collection of interconnected nodes treated as a unit for visualization." Correct: Visualization Tools

Interactive controls:
- Click a category button to submit a classification
- "Next Concept" button advances the deck (wraps to start after the last card)
- "Show Reasoning" toggle reveals a one-sentence explanation of why the correct category fits best

Behavior:
- Correct click: button flashes green, feedback panel states "Correct — {category} is the best fit because {reasoning}."
- Incorrect click: chosen button flashes red, feedback panel states "Not quite. {Category chosen} usually holds concepts like {example}. This concept fits {correct category} better because {reasoning}."
- Running score displayed as "Correct: X / Attempted: Y" in the top-right corner

Default parameters: concept deck starts at card 1, score reset to 0/0

Implementation notes:
- Use p5.js for rendering and click detection on button regions
- Store the concept deck as an array of objects with label, definition, correctCategoryId, and reasoning fields
- Responsive: canvas width tracks container width, category grid reflows from 3 columns to 2 columns below 500px
```

## Related Resources

- [Chapter 4: Concept Taxonomies and Ontologies](../../chapters/04-concept-taxonomies-ontologies/index.md)
