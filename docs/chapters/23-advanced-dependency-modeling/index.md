---
title: Advanced Dependency Modeling
description: Goes beyond a simple prerequisite edge to cover dependency strength, rationale, confidence, review workflows, and the more flexible prerequisite patterns -- co-prerequisites, alternative prerequisites, parallel paths -- real learning graphs need.
generated_by: claude skill chapter-content-generator
date: 2026-07-15 00:00:00
version: 0.09
---

# Advanced Dependency Modeling

## Summary

Extends Chapter 3's single-flavor prerequisite edge into the fuller vocabulary a production learning graph needs: distinguishing direct from indirect dependencies, necessary from merely recommended prerequisites, and tracking the rationale and confidence behind each asserted edge. Covers the review workflow that catches over-constrained, under-constrained, and outright false prerequisites, and the more flexible sequencing patterns — parallel paths, co-prerequisites, alternative prerequisites — that a purely linear dependency model cannot express. After this chapter, readers can review a dependency edge critically rather than accepting it at face value, and can model prerequisite relationships more flexible than a single strict chain.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Dependency Assertion
2. Direct Dependency
3. Indirect Dependency
4. Necessary Prerequisite
5. Recommended Prerequisite
6. Dependency Rationale
7. Dependency Confidence
8. Edge Provenance
9. Dependency Review
10. Dependency Gap
11. Overconstraint
12. Underconstraint
13. False Prerequisite
14. Learning Sequence
15. Parallel Learning Paths
16. Alternative Prerequisite
17. Co-Prerequisite
18. Prerequisite Frontier
19. Mastery Prerequisite
20. Dependency Inference
21. Human Dependency Review

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Concept Dependencies and Prerequisites](../03-concept-dependencies-prerequisites/index.md)
- [Chapter 17: Intelligent Agents and Generative AI](../17-intelligent-agents-generative-ai/index.md)

---

!!! mascot-welcome "Not Every Edge Deserves the Same Trust"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 3 taught you that an edge means "depends on." This chapter asks the harder question a working graph designer actually faces: how strong is this dependency, where did it come from, and should it even be there? A dependency CSV with 490 edges is not 490 equally trustworthy claims — some are load-bearing, some are optional, and a few, on close review, turn out to be wrong.

## Dependency Assertion, Direct Dependency, and Indirect Dependency

Every row in a dependency CSV is, formally, a claim someone or something is making about the world. A **Dependency Assertion** is the specific claim that one concept requires another as a prerequisite — the act of stating a dependency edge, as distinct from the edge itself sitting quietly in a data file. Dependency Assertion depends directly on Concept Dependency in the learning graph. Naming the assertion, not just the edge, matters because it opens the door to everything this chapter covers next: an assertion can be reviewed, sourced, trusted more or less, and revised.

Dependency assertions come in two structural flavors, distinguishing edges actually present in the data from relationships only implied by a chain. A **Direct Dependency** is a dependency asserted by a single edge directly connecting two concepts in the graph. A **Indirect Dependency** is a dependency that holds only through a chain of two or more intermediate concepts, with no single edge connecting the two concepts directly. Both Direct Dependency and Indirect Dependency depend directly on Dependency Assertion in the learning graph. This distinction should sound familiar: it is the same direct-versus-transitive contrast Chapter 21's Transitive Closure formalized for the whole graph, now applied to a single dependency assertion.

## Necessary Prerequisite and Recommended Prerequisite

Not every dependency edge carries the same weight, and treating them as uniformly mandatory oversimplifies real curricula. A **Necessary Prerequisite** is a dependency that a learner genuinely cannot skip — the dependent concept is not meaningfully learnable without it. Necessary Prerequisite depends directly on Prerequisite Relationship in the learning graph. A **Recommended Prerequisite** is a dependency that substantially helps a learner but is not strictly required — skipping it makes the dependent concept harder to learn, not impossible. Recommended Prerequisite depends directly on Prerequisite Relationship in the learning graph.

!!! mascot-thinking "Most Dependency CSVs Only Encode One of These Two"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    This project's own `learning-graph.csv` treats every edge as a necessary prerequisite implicitly, because the CSV format has no column for prerequisite strength. Recognizing that some of those edges are really recommended, not necessary, is a review-quality improvement — Chapter 16's personalized learning paths become far more flexible once a system knows which prerequisites a learner can skip under time pressure and which ones truly block progress.

## Dependency Rationale, Dependency Confidence, and Edge Provenance

Once an edge exists, three more fields determine how much a reviewer should trust it. **Dependency Rationale** is the stated reason a dependency assertion was made — the explanation for *why* one concept requires another, as opposed to the bare claim that it does. Dependency Rationale depends directly on Dependency Assertion in the learning graph. **Dependency Confidence** is a measure of how certain the asserter is that a given dependency is correct, ranging from a well-established prerequisite relationship to a plausible but unverified guess. Dependency Confidence depends directly on Dependency Assertion in the learning graph.

Both rationale and confidence become more useful once a reviewer also knows where the edge came from. **Edge Provenance** is a record of who or what asserted a specific dependency edge and when — a human domain expert, a generative-AI pass, or an automated inference step. Edge Provenance depends on Directed Edge and Concept Provenance in the learning graph, applying Chapter 22's general provenance idea specifically to dependency edges rather than concept labels.

| Field | Answers |
|---|---|
| Dependency Rationale | Why does this dependency exist? |
| Dependency Confidence | How certain is the asserter that it's correct? |
| Edge Provenance | Who or what asserted it, and when? |

## Dependency Review, Dependency Gap, and Three Ways a Graph Can Be Wrong

Rationale, confidence, and provenance are the raw material a structured review process actually uses. **Dependency Review** is the process of systematically examining a graph's dependency assertions for correctness, adequacy, and appropriateness before or after the graph is considered complete. Dependency Review depends on Dependency Rationale and Dependency Confidence in the learning graph. Chapter 3 already introduced one specific instance of this idea — Concept List Review — but Dependency Review applies the same scrutiny to the *edges*, not the concept labels.

Dependency review surfaces problems, and this chapter names four distinct failure modes rather than treating "bad dependency" as one catch-all category. A **Dependency Gap** is a missing edge — a genuine prerequisite relationship that should exist in the graph but does not, leaving a learner able to reach an advanced concept without having covered something they actually needed. Dependency Gap depends directly on Dependency Review in the learning graph.

**Overconstraint** is the opposite failure: a dependency graph that requires more prerequisites than a concept genuinely needs, unnecessarily blocking a learner from progressing. Overconstraint depends on Dependency Review and Necessary Prerequisite in the learning graph — it typically happens when a recommended prerequisite gets encoded as if it were necessary. **Underconstraint** is a dependency graph that requires fewer prerequisites than a concept genuinely needs, letting a learner attempt something they are not actually ready for. Underconstraint depends on Dependency Review and Necessary Prerequisite in the learning graph — the mirror image of overconstraint, and functionally the same problem as a Dependency Gap viewed from the reviewer's evaluative stance rather than the graph's missing-edge stance.

!!! mascot-warning "Overconstraint and Underconstraint Both Look Fine Until Tested"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A validator running Chapter 5's structural checks (cycle detection, orphan detection) will not catch either problem — an overconstrained or underconstrained graph is still a perfectly valid DAG. Both failures are pedagogical judgments, not structural ones, which is exactly why Dependency Review needs a human reviewer applying domain expertise, not just an automated script.

The fourth and most direct failure mode is a dependency that should never have been asserted at all. A **False Prerequisite** is a dependency assertion that does not actually reflect genuine required prior knowledge — a plausible-sounding edge that closer review reveals is not a real prerequisite relationship. False Prerequisite depends directly on Dependency Review in the learning graph. Chapter 19's own quality-metrics discussion warned about exactly this risk: an edge based on alphabetical or topical proximity, rather than genuine domain expertise, is a false-prerequisite risk waiting to be caught.

## Learning Sequence, Parallel Learning Paths, and More Flexible Prerequisite Patterns

A validated, review-clean dependency graph still only expresses a partial order — it does not, by itself, dictate one single reading order. A **Learning Sequence** is one specific, concrete ordering of concepts that respects a graph's dependency structure — one valid path through the partial order a dependency graph defines. Learning Sequence depends directly on Prerequisite Chain in the learning graph. Because a DAG usually permits more than one valid topological ordering, a single dependency graph typically supports more than one learning sequence.

That flexibility is a feature, not an ambiguity to resolve away. **Parallel Learning Paths** are two or more valid learning sequences through the same dependency graph that a learner could follow in either order (or even interleaved) without violating any prerequisite. Parallel Learning Paths depend directly on Learning Sequence in the learning graph. Chapter 16's personalized learning paths lean on exactly this flexibility — a system can route different learners down different, equally valid sequences depending on their interests or prior background.

Three more specific patterns refine what a "prerequisite" can mean beyond a single strict requirement. An **Alternative Prerequisite** describes a situation where a concept can be reached by satisfying *either* of two different prerequisites, not necessarily both — either path is sufficient on its own. A **Co-Prerequisite** is a pair of concepts that must be learned together, or in close succession, because neither is fully coherent without the other even though neither strictly depends on the other in the usual sense. A **Prerequisite Frontier**, given a learner's current mastered-concept state, is the specific set of concepts that have just become learnable — every prerequisite satisfied, nothing yet marked as learned. Alternative Prerequisite and Co-Prerequisite depend on Prerequisite Relationship in the learning graph; Prerequisite Frontier depends on Ready-to-Learn Concept in the learning graph, generalizing Chapter 3's single-concept idea into the dynamically shifting *set* of concepts available at any given moment.

One more pattern names a specific, high-stakes kind of prerequisite. A **Mastery Prerequisite** is a necessary prerequisite that additionally requires demonstrated mastery, not merely exposure, before a learner is considered ready for the dependent concept — a stricter bar than simply having encountered the material once. Mastery Prerequisite depends on Necessary Prerequisite and Mastery Learning in the learning graph.

!!! mascot-tip "Parallel Paths Are Why 'The' Reading Order Is a Simplification"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    This book itself is one chosen learning sequence through its own dependency graph — Chapters 1 through 19, then this extension. But a reader with strong prior vis.js experience could legitimately read Chapters 11 through 15 before Chapters 6 through 10, because nothing in those chapters' concepts depends on the learning-science material. That flexibility is exactly what Parallel Learning Paths formalizes.

#### Diagram: Dependency Review Console


<iframe src="../../sims/dependency-review-console/main.html" width="100%" height="482px" scrolling="no"></iframe>
[Run Dependency Review Console Fullscreen](../../sims/dependency-review-console/main.html)

<details markdown="1">
<summary>Dependency Review Console</summary>
Type: microsim
**sim-id:** dependency-review-console<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners review a small set of pre-loaded dependency edges, each carrying a stated rationale and confidence value, and classify each as sound, overconstrained, underconstrained, or a false prerequisite.

Bloom Level: Evaluate (L5)
Bloom Verb: judge, critique, justify

Learning objective: Given eight pre-written dependency edges, each with a one-sentence rationale and a confidence label (high, medium, low), the learner can classify each edge as sound, overconstrained, underconstrained, or a false prerequisite, and justify the classification against a model answer.

Canvas layout: a single edge card (340px tall) showing the two concept labels, the arrow between them, the stated rationale text, and the confidence badge; four classification buttons below the card; a progress indicator ("Edge 4 of 8") above

Visual elements: concept-pair card styled like a graph edge (two labeled boxes joined by an arrow); confidence badge colored green (high), gold (medium), or gray (low); after classification, the card border colors green (correct classification) or red (incorrect) with the model answer's justification revealed beneath

Interactive controls: four buttons — "Sound," "Overconstrained," "Underconstrained," "False Prerequisite" — one of which the learner clicks per edge; "Next Edge" advances after feedback; "Review Summary" available after all eight edges are classified

Default parameters: starts at Edge 1 of 8; no classification selected; feedback area empty

Data Visibility Requirements:
Stage 1: Show only the edge card, rationale, and confidence badge — no classification hint
Stage 2: On classification, reveal whether the answer matches the model classification and show a one-to-two sentence justification
Stage 3: After all eight edges, show a summary table of the learner's classifications versus the model answers, with a running accuracy score

Instructional Rationale: An Evaluate-level objective requires learners to judge edges against criteria (soundness, over/underconstraint, plausibility) rather than simply recall a definition — a classify-and-justify interaction against a curated answer set directly exercises that judgment, which a definitional multiple-choice question cannot.

Responsive behavior: classification buttons stack to two rows below 480px width; card remains fixed height

Canvas size: responsive, 100% width, 460px height

Implementation: vis-network (or plain HTML/CSS) for the single edge-card display, cycling through a hardcoded array of eight edge objects (concepts, rationale, confidence, correct classification, justification text)
</details>

## Dependency Inference and Human Dependency Review

The final two concepts return to where this book's own pipeline actually sits, closing the loop back to Chapter 19. **Dependency Inference** is the process of an automated system — typically a generative-AI pass — proposing dependency edges based on patterns in a course description or concept list, rather than a human authoring every edge by hand. Dependency Inference depends on LLM-Generated Dependency Graph and Dependency Assertion in the learning graph. This is precisely how the 490 edges in this project's own `learning-graph.json` originated: proposed by a generative-AI pass, following the rules Chapter 19's Dependency CSV Generation section described.

Inference produces a first draft, and this chapter's whole point has been that a first draft deserves scrutiny before it is trusted. **Human Dependency Review** is the specific application of Chapter 19's general Human-in-the-Loop Review pattern to dependency edges — a human reviewer checking inferred or asserted edges for the failure modes this chapter named (gaps, overconstraint, underconstraint, false prerequisites) before the graph is considered final. Human Dependency Review depends on Human-in-the-Loop Review and Dependency Review in the learning graph.

!!! mascot-encourage "Every Edge in This Book's Own Graph Passed Through This Chapter's Lens"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    The 134 concepts and edges added to this project's own graph for this extension — the very chapter you are reading — were authored following exactly the direct-versus-indirect, necessary-versus-recommended reasoning this chapter describes, then checked for cycles and connectivity before being trusted. This is not a hypothetical process description; it is a receipt for how this chapter's own prerequisite edges came to exist.

## Synthesis: An Edge Is a Claim, Not a Fact

Chapter 3 gave you the single idea of a prerequisite edge. This chapter took that idea apart: direct versus indirect, necessary versus recommended, rationale and confidence and provenance behind each assertion, four distinct ways an edge can be wrong, and five more flexible patterns — sequences, parallel paths, alternatives, co-prerequisites, frontiers, mastery-gated prerequisites — that a single strict chain cannot express. Chapter 25's automated validators check some of this chapter's failure modes mechanically (a Dependency Gap often surfaces as Chapter 5's Disconnected Subgraph), but overconstraint, underconstraint, and false prerequisites require the human judgment this chapter's Dependency Review and Human Dependency Review sections insist on.

!!! mascot-celebration "You Now Review Edges, Not Just Trust Them"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress. You started this book trusting that an arrow between two concepts meant what it said. You now know to ask where that arrow came from, how confident its author was, whether it is truly necessary or just helpful, and which of four specific failure modes to check for before trusting it. That is the difference between reading a dependency graph and auditing one. Let's connect the concepts — Chapter 24 applies this same critical eye to the categories a taxonomy sorts concepts into.

[See Annotated References](./references.md)
