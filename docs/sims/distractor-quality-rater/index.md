---
title: Distractor Quality Rater
description: Given a multiple-choice question stem, its correct key, and one candidate distractor, the learner can assess whether the distractor is weak or strong against three stated criteria and justify that judgment by identifying the specific misconception (if any) the distractor targets.
status: scaffold
library: p5.js
bloom_level: Evaluate (L5)
---

# Distractor Quality Rater



<iframe src="main.html" width="100%" height="562"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Assessment, Feedback, and Quizzes](../../chapters/10-assessment-feedback-quizzes/index.md).

```text
Type: microsim
**sim-id:** distractor-quality-rater<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners practice the Evaluate-level skill of judging distractor quality by rating a series of sample multiple-choice distractors against explicit criteria, then comparing their rating to an expert rating with a justification.

Bloom Level: Evaluate (L5)
Bloom Verb: judge, critique, assess, justify

Learning objective: Given a multiple-choice question stem, its correct key, and one candidate distractor, the learner can assess whether the distractor is weak or strong against three stated criteria and justify that judgment by identifying the specific misconception (if any) the distractor targets.

Canvas layout:
- Top (100px): question stem and correct key displayed as fixed reference text
- Middle (280px): one candidate distractor shown at a time, with three criterion checkboxes below it
- Bottom (140px): rating buttons and feedback panel

Visual elements:
- A card showing the current question stem, e.g. "What is a Prerequisite Chain?" with the correct key "A sequence of concepts connected end to end by prerequisite relationships"
- A card showing one candidate distractor, e.g. "The set of concepts a learner has not yet mastered on the way to a goal"
- Three criterion checkboxes the learner ticks before rating: "Grammatically parallel to the key," "Plausible without deep understanding," "Targets a specific, nameable misconception"
- A two-button rating control: "Weak Distractor" / "Strong Distractor"

Interactive controls:
- Checkboxes: three criteria, learner ticks any that apply before submitting a rating
- Button: "Weak Distractor"
- Button: "Strong Distractor"
- Button: "Next Distractor" (advances through a bank of 6 pre-written distractor examples spanning several chapters' concepts)
- Button: "Reset"

Default parameters:
- First distractor in the bank loaded: the Prerequisite Chain / Skill Gap example from this chapter's prose
- No checkboxes ticked, no rating submitted

Data Visibility Requirements:
  Stage 1: Show the stem, key, and candidate distractor with no rating yet
  Stage 2: After the learner ticks criteria and clicks a rating button, show an infobox revealing the expert rating and, when the distractor is strong, naming the specific concept it is easy to confuse with the correct key (e.g., "This distractor targets confusion with Skill Gap, Chapter 3")
  Stage 3: Show a running score: "5 of 6 distractors rated correctly" as the learner progresses through the bank
  Final: After all 6 distractors are rated, show a summary panel listing which criterion the learner most often overlooked

Instructional Rationale: An Evaluate-level objective requires the learner to judge quality against explicit criteria and justify the judgment, which is best served by a structured rating task with expert-rating feedback, rather than simply reading a list of do's and don'ts for distractor writing.

Responsive behavior: the three panels stack vertically on viewports narrower than 600px

Canvas size: responsive, 100% width, 560px height

Implementation: p5.js; distractor bank stored as an array of objects with {stem, key, distractor, expertRating, misconceptionTargeted} fields; no scoring persistence beyond the current session
```

## Related Resources

- [Chapter 10: Assessment, Feedback, and Quizzes](../../chapters/10-assessment-feedback-quizzes/index.md)
