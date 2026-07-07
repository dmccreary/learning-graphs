---
title: Generative AI to Learning Graph Pipeline
description: Given the five-stage pipeline rendered as a flowchart, the learner can explain what happens at each stage and identify which stage is responsible for catching an invalid (cyclic or orphaned) LLM proposal.
status: scaffold
library: Mermaid
bloom_level: Understand (L2)
---

# Generative AI to Learning Graph Pipeline



<iframe src="main.html" width="100%" height="522"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Intelligent Agents and Generative AI](../../chapters/17-intelligent-agents-generative-ai/index.md).

```text
Type: workflow
**sim-id:** genai-learning-graph-pipeline<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through the pipeline that turns a course description into a validated learning graph using generative AI, reinforcing that an LLM-generated dependency graph is a proposal that passes through validation before use, not a finished artifact.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, sequence

Learning objective: Given the five-stage pipeline rendered as a flowchart, the learner can explain what happens at each stage and identify which stage is responsible for catching an invalid (cyclic or orphaned) LLM proposal.

Visual style: Mermaid left-to-right flowchart, five rectangular nodes connected by arrows, with the validation node styled as a decision diamond

Steps (each is one Mermaid node with a click directive):
1. "Course Description" — click reveals: "A human-authored document stating audience, topics, and learning outcomes (Chapter 2)."
2. "Prompt-Engineered Request" — click reveals: "A structured prompt asks the model for a fixed number of distinct concept labels and candidate dependency edges."
3. "LLM-Generated Proposal" — click reveals: "The model returns a concept list and edges, formatted as JSON, but unverified."
4. "Validation" — click reveals: "Cycle detection, orphan detection, and connectivity analysis (Chapter 5) check the proposal before anything downstream trusts it."
5. "Validated Learning Graph JSON" — click reveals: "The artifact every later chapter — visualization, personalization, chapter generation — is built on."

Interactive features: every node has a click directive that opens an infobox below the diagram with the step's description; the Validation node is colored gold to flag it as the quality gate; a "Reject" label on a dashed arrow loops from Validation back to Prompt-Engineered Request, clickable to reveal "If validation fails, the prompt is refined and the model is asked again — this is Iterative Workflow, covered later in this chapter."

Color scheme: indigo fill for content nodes, gold fill for the Validation decision node, dashed gray for the reject loop

Responsive behavior: flowchart scales to container width and reflows to a vertical layout on viewports narrower than 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 480px height

Implementation: Mermaid.js flowchart with click bindings wired to a JavaScript showInfo() function populating a div below the diagram with the selected step's stored description text
```

## Related Resources

- [Chapter 17: Intelligent Agents and Generative AI](../../chapters/17-intelligent-agents-generative-ai/index.md)
