---
title: Learning Objective Builder
description: Given a dropdown of Bloom levels, a dropdown of matching Bloom Verbs, and a text field for a target concept, the learner can construct a grammatically complete, appropriately leveled learning objective and receive feedback identifying which Bloom level their sentence actually reflects.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Learning Objective Builder



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Bloom's Taxonomy and Learning Objectives](../../chapters/06-blooms-taxonomy-learning-objectives/index.md).

```text
Type: microsim
**sim-id:** learning-objective-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners practice the core skill this chapter builds toward — composing a valid learning objective by pairing a Bloom Verb with a concept — and receive immediate, criteria-based feedback rather than a simple right/wrong grade.

Bloom Level: Apply (L3)
Bloom Verb: construct, compose, formulate

Learning objective: Given a dropdown of Bloom levels, a dropdown of matching Bloom Verbs, and a text field for a target concept, the learner can construct a grammatically complete, appropriately leveled learning objective and receive feedback identifying which Bloom level their sentence actually reflects.

Canvas layout:
- Top (120px): Bloom level selector (six labeled buttons, one per level, color-matched to the pyramid diagram earlier in this chapter) and a verb-chip tray that updates to show only verbs valid for the selected level
- Middle (200px): drag-and-drop composition area with three slots — "[Bloom Verb]" + "[Concept]" + optional "[Condition/Context]" — plus a live-assembled sentence preview above the slots
- Bottom (180px): feedback panel and controls

Interactive controls:
- Six Bloom-level buttons (Remember, Understand, Apply, Analyze, Evaluate, Create)
- Draggable verb chips (populated from that level's verb list, e.g., selecting Analyze shows chips: differentiate, organize, attribute, compare, contrast, examine, deconstruct, distinguish)
- Text input: "Concept" (learner types any concept, with placeholder examples drawn from this book, e.g., "cycle detection")
- Text input (optional): "Condition or context" (e.g., "given a sample dependency graph")
- Button: "Check My Objective"
- Button: "Clear"

Behavior:
- As the learner drags a verb into the first slot and types a concept into the second, the preview sentence assembles live: "The learner will be able to [verb] [concept]."
- On "Check My Objective," the feedback panel confirms whether the verb chosen matches a real Bloom Verb for the selected level, flags vague or non-actionable verbs (e.g., "understand," "know," "learn about") if typed manually instead of dragged from the chip tray, and displays which of the six levels the resulting objective actually reflects
- Feedback includes one sentence of guidance, e.g., "This objective uses 'differentiate,' an Analyze-level verb — well matched to your selection" or "This objective uses 'understand,' which is too vague to measure. Try a specific verb from the Understand level instead, like 'explain' or 'summarize.'"

Default parameters:
- Bloom level: Apply (pre-selected)
- Verb tray: populated with Apply-level verbs (use, execute, implement, solve, demonstrate, calculate, apply, practice)
- Concept field: empty with placeholder text "e.g., cycle detection"

Instructional Rationale: A drag-and-compose interaction with explicit verb chips is appropriate for an Apply-level objective because the learner must actively construct something (a complete, well-formed sentence) rather than passively recognize a correct answer, while the constrained verb tray prevents the common novice error of defaulting to vague, unmeasurable verbs like "understand" or "know."

Responsive behavior: composition slots stack vertically and the verb-chip tray wraps to multiple rows on viewports narrower than 480px

Canvas size: responsive, 100% width, 540px height

Implementation: p5.js for layout and drag-and-drop chip mechanics; verb-to-level lookup table stored as a JavaScript object matching the six Bloom Verb lists in this chapter; feedback logic implemented as simple lookup-and-template-string generation, no external API calls
```

## Related Resources

- [Chapter 6: Bloom's Taxonomy and Learning Objectives](../../chapters/06-blooms-taxonomy-learning-objectives/index.md)
