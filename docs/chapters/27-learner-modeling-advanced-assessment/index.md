---
title: Learner Modeling and Advanced Assessment
description: Extends Chapter 16's personalization concepts with a formal learner model -- mastery state, knowledge components, readiness estimation -- and the assessment types that measure it.
generated_by: claude skill chapter-content-generator
date: 2026-07-15 00:00:00
version: 0.09
---

# Learner Modeling and Advanced Assessment

## Summary

Extends Chapter 16's personalization ideas with the formal data structure that makes them computable: a learner model tracking exactly which concepts a specific student has mastered, to what threshold, and with what evidence. Covers the assessment types — diagnostic and summative — that supply that evidence, and closes with readiness estimation and personalized sequencing, the two capabilities that turn a validated learning graph plus a learner model into an actual, individualized lesson plan. As the closing chapter of this book's advanced-topics extension, it also ties every one of Chapters 20 through 26 back to the single goal this whole extension has been building toward.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Learner Model
2. Knowledge State
3. Knowledge Component
4. Mastery State
5. Mastery Threshold
6. Learning Evidence
7. Diagnostic Assessment
8. Summative Assessment
9. Competency Model
10. Readiness Estimation
11. Learning Path Constraint
12. Personalized Sequencing

## Prerequisites

This chapter builds on concepts from:

- [Chapter 16: Personalization and Adaptive Learning Paths](../16-personalization-adaptive-learning-paths/index.md)
- [Chapter 10: Assessment, Feedback, and Quizzes](../10-assessment-feedback-quizzes/index.md)
- [Chapter 8: Cognitive Load and Knowledge Space Theory](../08-cognitive-load-knowledge-space-theory/index.md)

---

!!! mascot-welcome "One Graph, One Learner, One Model of the Gap Between Them"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! A learning graph by itself describes a subject. It says nothing about any one student. This chapter closes that gap with a learner model — a formal record of what one specific person has actually mastered — and shows how a personalization engine combines that model with the graph to answer the question every earlier chapter has been building toward: what should this particular learner study next?

## Learner Model, Knowledge State, and Knowledge Component

Chapter 16 talked about personalization without ever formally defining what a system tracks about an individual learner. A **Learner Model** is a data structure representing what a specific student currently knows, is working on, and has yet to encounter, tracked against the concepts in a learning graph. Learner Model depends on Learning Path and Adaptive Learning in the learning graph — it is the missing per-student half that Chapter 16's graph-wide personalization machinery needs in order to actually personalize anything.

A learner model's core content is a snapshot of standing, not a running log of events. A **Knowledge State** is the specific subset of concepts in a learning graph that a learner is considered to currently know, at a given point in time. Knowledge State depends directly on Learner Model in the learning graph. Chapter 8's Knowledge Space Theory already introduced the *space* of all mathematically valid knowledge states for a domain; Knowledge State is one specific learner's single point within that space.

Knowledge states are built up out of smaller trackable units. A **Knowledge Component** is the smallest unit of knowledge or skill that a learner model tracks mastery of individually — often, though not always, corresponding one-to-one with a single concept in the learning graph. Knowledge Component depends on Concept and Learner Model in the learning graph.

!!! mascot-thinking "A Knowledge Component Is Not Always Exactly One Concept"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Most of the time, one concept equals one trackable knowledge component. But a single broad concept — Chapter 22's Composite Concept, for instance — might need to be split into two or three separately-tracked knowledge components if a learner model needs finer-grained data than the concept graph's own granularity provides. The two ideas usually coincide; they are not guaranteed to.

## Mastery State and Mastery Threshold

Knowing *which* concepts a learner has encountered is only half the picture; a learner model also needs to record *how well*. A **Mastery State** is a graded record, for a specific knowledge component, of how well a learner currently demonstrates that skill — not a binary known/unknown flag, but a level along some scale (novice, developing, proficient, for instance). Mastery State depends on Mastery Learning and Knowledge Component in the learning graph.

Deciding when a mastery state counts as "good enough" requires a stated cutoff. A **Mastery Threshold** is the minimum mastery-state level a learner must reach on a knowledge component before that component is considered satisfied for the purpose of unlocking dependent concepts. Mastery Threshold depends directly on Mastery State in the learning graph — this is the formal, data-driven version of Chapter 23's Mastery Prerequisite, which named the *requirement* without specifying the *cutoff* a learner model actually enforces.

## Learning Evidence, Diagnostic Assessment, and Summative Assessment

A mastery state cannot be conjured from nowhere — it has to be inferred from something a learner actually did. **Learning Evidence** is any recorded learner activity or performance — a quiz answer, a completed exercise, an interaction with a MicroSim — that a learner model uses to update a knowledge component's mastery state. Learning Evidence depends on Assessment and Feedback Log in the learning graph.

Two distinct assessment purposes supply most of that evidence, and conflating them is a common design mistake. A **Diagnostic Assessment** is an assessment given *before* or *during* instruction specifically to determine a learner's current knowledge state, used to decide what to teach next rather than to grade past performance. Diagnostic Assessment depends on Assessment and Knowledge State in the learning graph. A **Summative Assessment** is an assessment given *after* instruction to evaluate how well a learner has mastered material already taught, typically producing a grade or completion record rather than steering what comes next. Summative Assessment depends directly on Assessment in the learning graph.

| Assessment Type | Timing | Primary Purpose |
|---|---|---|
| Diagnostic Assessment | Before or during instruction | Determine current knowledge state, to plan what's next |
| Summative Assessment | After instruction | Evaluate mastery of material already taught |

!!! mascot-warning "Using a Summative Quiz Diagnostically Gives Misleading Results"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A Chapter 10-style end-of-chapter quiz is written as a summative assessment — it assumes the reader just finished the chapter's material. Using that same quiz *before* a chapter to guess a new learner's starting knowledge state produces poor diagnostic evidence, because a learner who has never seen the material is scored on recall, not readiness. A genuine diagnostic assessment is designed and worded differently, testing prerequisite concepts the learner should already have rather than the chapter's own new content.

## Competency Model, Readiness Estimation, and Learning Path Constraint

Learning evidence and mastery states, accumulated across many knowledge components, add up to something broader than a single-concept snapshot. A **Competency Model** is a structured description of the full set of skills or knowledge a learner is expected to demonstrate for a given role or credential, mapping each required competency to one or more knowledge components in the learning graph. Competency Model depends on Knowledge Component and Competency-Based Education in the learning graph — it is what turns Chapter 9's Competency-Based Education from a philosophy into a checkable data structure.

With a learner model in hand, a personalization system can finally answer a genuinely useful question. **Readiness Estimation** is the process of using a learner's current knowledge state, together with the learning graph's dependency structure, to predict which not-yet-mastered concepts the learner is now prepared to attempt. Readiness Estimation depends on Knowledge State and Ready-to-Learn Concept in the learning graph — it is Chapter 23's Prerequisite Frontier concept, computed against one real learner's actual mastery data rather than a hypothetical marked-as-learned state.

Readiness is not the only factor a real lesson plan has to respect, though. A **Learning Path Constraint** is any additional requirement — a deadline, a fixed course length, a required assessment sequence, an institutional policy — that limits which otherwise-valid learning sequences a personalization engine is allowed to recommend. Learning Path Constraint depends on Learning Path and Competency Model in the learning graph. A learner might be *ready* for three different next concepts by pure prerequisite logic, but a learning path constraint (a certification deadline, say) can rule two of them out regardless.

## Personalized Sequencing: Where This Whole Book Converges

Every concept in this chapter, and in this book's entire advanced-topics extension, exists to support one final capability. **Personalized Sequencing** is the process of selecting and ordering the specific next concepts one individual learner should study, combining readiness estimation, mastery thresholds, and learning path constraints into a single recommended path through the learning graph. Personalized Sequencing depends on Personalized Learning Path and Readiness Estimation in the learning graph.

#### Diagram: Readiness and Mastery Dashboard

<details markdown="1">
<summary>Readiness and Mastery Dashboard</summary>
Type: microsim
**sim-id:** readiness-mastery-dashboard<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners manipulate a small sample learner model — mastery states across eight knowledge components — and watch the dependency graph's readiness frontier update live, then see how adding a learning path constraint changes the final recommended sequence.

Bloom Level: Apply (L3)
Bloom Verb: predict, construct, apply

Learning objective: Given an eight-node sample dependency graph and a slider-controlled mastery state for each node, the learner can predict and verify which nodes become part of the readiness frontier as mastery thresholds are crossed, and observe how a learning path constraint (e.g., "must include Node F before Node G") reorders the final personalized sequence.

Canvas layout: a left panel (280px wide) listing eight mastery sliders, one per knowledge component (0-100%); a right panel showing the dependency graph (420px tall) with node color reflecting current mastery state; a "Recommended Sequence" ordered list below both panels

Visual elements: graph nodes colored on a gradient from gray (not started) through gold (developing) to green (mastered, above threshold); nodes currently in the readiness frontier (all prerequisites mastered, not yet mastered themselves) outlined with a pulsing blue border; recommended-sequence list updates live as sliders change

Interactive controls: eight mastery sliders (one per node) update that node's color and the readiness frontier in real time; a "Mastery Threshold" global slider (default 70%) adjusts the cutoff for what counts as mastered; a "Add Constraint" toggle applies a sample learning path constraint and visibly reorders the recommended-sequence list, with a note explaining which constraint is active and why the order changed

Default parameters: all eight mastery sliders start at 0%; global mastery threshold at 70%; constraint toggle off; recommended sequence shows the unconstrained topological order

Data Visibility Requirements:
Stage 1: Show the graph with all nodes gray (no mastery yet) and an empty readiness frontier except true root concepts
Stage 2: As sliders cross the mastery threshold, show dependent nodes entering the readiness frontier (blue pulsing border) in real time, and update the recommended-sequence list
Stage 3: On toggling the sample constraint, show the recommended-sequence list reordering with a highlighted explanation of which constraint forced the change

Instructional Rationale: An Apply-level objective requires learners to manipulate inputs and correctly predict a computed outcome (the readiness frontier and resulting sequence), not just recognize a definition — a live, slider-driven simulation is what lets a learner verify their prediction against the actual computed result instead of taking it on faith.

Responsive behavior: mastery-slider panel moves above the graph panel (stacked) below 700px width

Canvas size: responsive, 100% width, 620px height

Implementation: vis-network for the graph panel with node colors bound to an array of eight mastery values; a small JavaScript function recomputes the readiness frontier (prerequisites-satisfied check) on every slider change and re-renders the recommended-sequence list via a simple topological sort with the optional constraint applied as a reordering rule
</details>

!!! mascot-encourage "This Is the Payoff the Whole Extension Was Building Toward"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Chapter 20 gave you the mechanics to trace a graph. Chapter 21 gave you the metrics to rank it. Chapter 22 sharpened its labels. Chapter 23 hardened its edges. Chapter 24 disciplined its categories. Chapter 25 validated all of it. Chapter 26 opened the files that carry it. Everything in those six chapters exists to make the graph trustworthy enough for this chapter's Personalized Sequencing to safely act on. That is not a coincidence of chapter ordering — it is the actual dependency structure of the ideas themselves.

## Synthesis: Eight Chapters, One Deeper Graph

This extension opened with a simple observation: a 400-concept graph needed the same eight themes a 266-concept graph already had, gone into more deeply. Chapter 20 and 21 gave the core graph-theory vocabulary from Chapter 1 its full mechanics and metrics. Chapter 22 gave Chapter 2's labeling conventions their complete SKOS and Dublin Core field set. Chapter 23 gave Chapter 3's single prerequisite edge the nuance — strength, rationale, confidence, review — a real dependency graph needs. Chapter 24 gave Chapter 4's taxonomy the formal balance and coverage metrics that separate a good category scheme from an arbitrary one. Chapter 25 gave Chapter 5's structural validation its pedagogical and referential-integrity counterparts. Chapter 26 opened the actual file formats every other chapter's diagrams quietly depend on. And this chapter closed the loop with the one piece none of the first nineteen chapters formally defined: a model of one specific learner, built from real evidence, driving a genuinely personalized path through everything the rest of this book describes.

!!! mascot-celebration "You Finished the Deep Dive"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — really pause, because this closes the advanced-topics extension the same way Chapter 19 closed the core book. You now hold a learner model's full vocabulary: knowledge states built from knowledge components, mastery states checked against thresholds, evidence drawn from diagnostic and summative assessment, and readiness estimation and personalized sequencing turning all of it into one recommended next step for one real person. Combine that with everything Chapters 20 through 26 gave you — traversal, metrics, metadata, dependency rigor, taxonomy discipline, validation, and the file formats underneath all of it — and you now understand this project's own 400-concept graph as deeply as the people who built it. Let's connect the concepts, one more time: the graph you have been reading about is the graph that generated the words in front of you, extended, validated, and ready for whatever you build with it next.

[See Annotated References](./references.md)
