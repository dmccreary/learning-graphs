---
title: Assessment Feedback Loop Explorer
description: Given a four-stage feedback loop rendered as a circular flowchart, the learner can explain the purpose of each stage and classify a given classroom or intelligent-textbook scenario according to which stage it represents.
status: scaffold
library: Mermaid
bloom_level: Understand (L2)
---

# Assessment Feedback Loop Explorer



<iframe src="main.html" width="100%" height="522"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Assessment, Feedback, and Quizzes](../../chapters/10-assessment-feedback-quizzes/index.md).

```text
Type: workflow
**sim-id:** feedback-loop-explorer<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through the four stages of a recurring assessment feedback loop and see, for each stage, a plain-language description plus a concrete example drawn from this book's own quiz-generator pipeline, reinforcing that the loop repeats rather than terminating after one pass.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, classify

Learning objective: Given a four-stage feedback loop rendered as a circular flowchart, the learner can explain the purpose of each stage and classify a given classroom or intelligent-textbook scenario according to which stage it represents.

Visual style: Mermaid flowchart arranged in a circular loop (four nodes connected in a cycle, with the final arrow returning to the first node)

Steps (each is one Mermaid node with a click directive):
1. "Assess" — click reveals: "A quiz, project, or other structured measurement produces evidence of current understanding (this chapter's Assessment)."
2. "Feedback" — click reveals: "The learner receives actionable, specific information about the gap between current and target understanding (Formative Feedback)."
3. "Adjust" — click reveals: "The learner changes study strategy — for example, reviewing a specific prior chapter section or requesting a different explanation."
4. "Reassess" — click reveals: "A new assessment checks whether the adjustment worked, and the cycle returns to stage 1 with updated evidence."

Interactive features: every node has a click NodeId call showInfo("...") Mermaid directive; clicking opens an infobox panel below the diagram; the arrow from "Reassess" back to "Assess" is labeled "repeats" and is itself clickable, revealing: "This is why it's called a loop and not a sequence — each pass uses updated evidence from the one before it."

Color scheme: all four nodes share one indigo fill by default; the node most recently clicked highlights in gold until another node is clicked

Responsive behavior: circular flowchart scales to container width; on viewports narrower than 600px the infobox panel appears below the diagram instead of beside it

Canvas size: responsive, 100% width, 480px height

Implementation: Mermaid.js flowchart with click bindings wired to a small JavaScript showInfo() function that populates a div below the diagram with the selected stage's stored description text
```

## Related Resources

- [Chapter 10: Assessment, Feedback, and Quizzes](../../chapters/10-assessment-feedback-quizzes/index.md)
