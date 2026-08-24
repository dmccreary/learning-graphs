---
title: Concept Impact Score and Predicting Content Length
description: Introduces the Concept Impact Score (CIS), a PageRank-style recursive importance measure computed over a learning graph's dependency DAG, and shows how it replaces flat per-chapter word counts with a per-concept elaboration budget.
generated_by: claude skill chapter-content-generator
date: 2026-08-24 00:00:00
version: 0.09
---

# Concept Impact Score and Predicting Content Length

## Summary

Every earlier chapter in this book treated a learning graph as a structure to validate, visualize, or query. This closing chapter treats it as something else: a source of quantitative evidence about how much explanation each concept deserves. It introduces the Concept Impact Score (CIS), a PageRank-style recursive importance measure computed exactly, in a single pass, over any concept dependency DAG — and shows why raw in-degree, the metric Chapter 21 already gave you, systematically undercounts concepts that are foundational only *transitively*. From there it covers how a CIS value becomes a normalized Elaboration Score, how that score sorts every concept into an elaboration tier, and how those tiers replace a flat "N words per chapter" instruction with a per-concept content budget. The chapter closes by tracing this idea's actual adoption history: four real agent skills in the `ibook-skills` repository — the same tooling used to generate this book — were modified within hours of each other to compute, propagate, and consume CIS, a change documented in that repository's own git history.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

| Concept | [Concept Impact Score](../../glossary.md#concept-impact-score-cis) |
|---|---|
| Recursive Importance Measure | 8 |
| PageRank | 7 |
| Concept Impact Score (CIS) | 6 |
| Single-Pass DAG Computation | 1 |
| Global Normalization | 4 |
| Elaboration Score | 3 |
| Elaboration Tier | 2 |
| Chapter Partitioning Problem | 3 |
| Within-Chapter Concept Ordering | 1 |
| Content-Budget Allocation | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Concept Graphs](../01-foundations-of-concept-graphs/index.md)
- [Chapter 5: Learning Graph Quality, Validation, and File Formats](../05-graph-quality-validation-file-formats/index.md)
- [Chapter 8: Cognitive Load and Knowledge Space Theory](../08-cognitive-load-knowledge-space-theory/index.md)
- [Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../18-intelligent-textbooks-microsims-deployment/index.md)
- [Chapter 21: Graph Metrics and Path Analysis](../21-graph-metrics-path-analysis/index.md)

---

!!! mascot-welcome "How Much Does One Concept Deserve to Say?"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Every chapter before this one asked whether your graph was *correct*. This one asks a different question: once it's correct, how should that structure decide how many words, examples, and diagrams each concept gets? The answer turns out to live inside the graph itself.

## Recursive Importance Measure, PageRank, and the Concept Impact Score (CIS)

Chapter 21 gave you indegree and betweenness centrality as ways to rank a concept's importance from its immediate neighborhood. Both share a blind spot: they only count what touches a node directly. A **Recursive Importance Measure** is any importance score for a node in a directed graph that is computed from the importance scores of the nodes pointing to it, rather than from a simple count of those nodes — importance recurses through the graph instead of stopping at the first hop. Recursive Importance Measure depends on Directed Graph in the learning graph, and it is the general category both of this section's other two concepts belong to.

The best-known recursive importance measure has nothing to do with textbooks. **PageRank** is the recursive importance algorithm originally developed to rank web pages, where a page's score is a damped, iteratively-converged sum of the scores of every page linking to it. PageRank depends directly on Recursive Importance Measure in the learning graph. On the open web, pages can link to each other in cycles, so PageRank needs a damping factor \(d\) (traditionally 0.85) and repeated iteration to guarantee the calculation converges to a stable answer at all.

A learning graph is not the open web. Because Chapter 1 defined it as a Directed Acyclic Graph, cycles are structurally impossible — and that single fact changes everything about how a recursive importance score can be computed on it. The **Concept Impact Score (CIS)** is a PageRank-style recursive importance measure defined over a learning graph's dependency DAG: \(\mathrm{CIS}(x) = 1 + \sum \mathrm{CIS}(d)\) for every concept \(d\) that directly depends on \(x\). CIS depends on PageRank, Directed Acyclic Graph (DAG), and Indegree in the learning graph — it is this book's own answer to the question Chapter 21's indegree metric left open: how do you count influence that passes *through* other concepts, not just influence that lands directly?

This book's own graph supplies a clean worked example. **Behaviorism** has an indegree of exactly 1 — only Instructional Design depends on it directly, so a raw dependents-count would rank it as a minor, peripheral concept. But Instructional Design itself has four direct dependents of its own (Scaffolding, Curriculum Design, Metacognition, and Nine Events of Instruction), each with further dependents beyond that. Working the recursion out: \(\mathrm{CIS}(\text{Instructional Design}) = 102\), so \(\mathrm{CIS}(\text{Behaviorism}) = 1 + 102 = 103\) — a top-15 concept by impact in this entire 410-concept graph, despite an indegree of 1. Indegree only sees the first hop; CIS sees the whole downstream chain Behaviorism ultimately supports.

!!! mascot-thinking "One Direct Dependent, Many Indirect Ones"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what actually happened with Behaviorism: its own score is small, but the concept depending on it (Instructional Design) turned out to be a hub. CIS's recursive definition passes that hidden importance backward, one hop at a time, all the way to the root cause. That is exactly the failure mode a first-hop-only metric like indegree cannot detect.

## Computing CIS Exactly: Single-Pass DAG Computation

Web-graph PageRank needs damping and iteration because cycles make a single deterministic pass impossible — a page's score can depend on another page whose own score depends back on the first page. **Single-Pass DAG Computation** is the property that, because a learning graph has no cycles, CIS can be computed exactly in one traversal, processing concepts in topological order so that every concept is scored only after all of its dependents have already been scored. Single-Pass DAG Computation depends on Topological Sort and Concept Impact Score (CIS) in the learning graph. Terminal concepts (nothing depends on them) start at CIS 1 and are processed first; foundational hub concepts, scored last, simply sum what has already been finalized beneath them — no damping factor, no fixed-point iteration, and no risk of non-convergence, because none of the conditions that make those safeguards necessary on a general graph can occur here.

## Comparing Concepts Book-Wide: Global Normalization and the Elaboration Score

A raw CIS value only means something relative to other CIS values, which raises a scope question: relative to what set of concepts? **Global Normalization** is the decision to compare a concept's CIS against the maximum CIS across the *entire* book, not just the concepts co-occurring in its own chapter. Global Normalization depends directly on Concept Impact Score (CIS) in the learning graph. The alternative — chapter-local normalization — was tried and rejected during this idea's development: scoring each chapter's concepts only against each other made a chapter's single most-important concept always look book-level important, even in a late, narrow chapter where nothing it contains is actually foundational to the rest of the book. A concept's real-world impact is a claim about the whole book, so the comparison set has to be the whole book too.

Comparing raw CIS values directly still causes a second, subtler problem: CIS is heavy-tailed, with roughly half of a typical graph's concepts sitting at the minimum score of 1. The **Elaboration Score** is a normalized value, \(E(c) = \log(\mathrm{CIS}(c)+1) / \log(\mathrm{CIS}_{\max}+1)\), that rescales every concept's CIS onto a \([0,1]\) range using this book's single highest CIS value as \(\mathrm{CIS}_{\max}\). Elaboration Score depends directly on Global Normalization in the learning graph. In this book, \(\mathrm{CIS}_{\max} = 661\) (the concept **Concept**, at the root of the whole graph), so Recursive Importance Measure's own \(E(c) = \log(9)/\log(662) \approx 0.34\) — comfortably mid-range, appropriate for a concept this chapter treats as important but not foundational to the rest of the book.

!!! mascot-warning "A Percentile Rank Looks Reasonable and Is Not"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The first attempt at this scale did not use a logarithm at all — it ranked concepts by population percentile instead. That version passed every check on one chapter and then broke completely on a second: because CIS has a hard floor of 1, and over half of a typical graph's concepts sit at that floor, the "bottom 35th percentile" cutoff landed *at* the floor itself, making the lowest tier structurally unreachable no matter how unimportant a concept actually was. The log-scaled Elaboration Score fixes this by scoring the *value*, not the *rank* — tied floor concepts separate cleanly from true hubs instead of hiding inside one enormous median band.

## From Score to Budget: Elaboration Tier and Content-Budget Allocation

A continuous \([0,1]\) score is precise but awkward to hand to a writer as an instruction. An **Elaboration Tier** is one of three discrete bands — A, B, or C — assigned from a concept's Elaboration Score, each carrying its own target word count and required content elements. Elaboration Tier depends directly on Elaboration Score in the learning graph.

| Tier | \(E(c)\) range | Target words | Required elements |
|---|---|---|---|
| A — full treatment | \(\geq 0.5\) | 500–750 | Worked example **and** diagram/chart/table/MicroSim |
| B — standard | \(0.2 \leq E(c) < 0.5\) | 250–400 | Worked example |
| C — brief | \(< 0.2\) | 120–200 | A clear definition; a short example is optional |

**Content-Budget Allocation** is the resulting practice of setting each concept's word count and required content elements from its elaboration tier, rather than dividing a chapter's total word budget evenly across however many concepts it happens to contain. Content-Budget Allocation depends on Elaboration Tier and Chapter Partitioning Problem in the learning graph. A chapter's total length becomes the *sum* of its concepts' individual targets — a chapter loaded with Tier A concepts will legitimately run longer than one built mostly from Tier C concepts, and that variation is the intended behavior, not an inconsistency to smooth away.

## The Other Two Sub-Problems: Chapter Partitioning and Within-Chapter Concept Ordering

Content-budget allocation only makes sense once two prior questions are already answered: which chapter does a concept belong to, and where does it sit within that chapter? The **Chapter Partitioning Problem** is the task of dividing a learning graph's full concept set into an ordered sequence of chapters, respecting the book-wide topological order while keeping each chapter close to a target size. Chapter Partitioning Problem depends on Learning Graph and Content Generation Pipeline in the learning graph. This book is itself the running example: its own 410-concept graph is partitioned into 28 chapters, and this very chapter could not have been placed any earlier than position 28, because every one of its 10 concepts depends — directly or transitively — on material Chapters 1, 5, 8, 18, and 21 already established.

Partitioning alone does not fix a reading order *within* one chapter's concept set. **Within-Chapter Concept Ordering** is the task of arranging one chapter's concepts into a single linear sequence that respects every in-chapter prerequisite edge, informed by Elaboration Theory's simple-to-complex sequencing principle. Within-Chapter Concept Ordering depends on Topological Sort and Chapter Partitioning Problem in the learning graph. This chapter's own concept order is an instance of the rule: Recursive Importance Measure had to come before PageRank, which had to come before CIS, which had to come before every concept defined in terms of it — the same dependency-respecting constraint Chapter 3 first introduced for the book as a whole, applied at chapter scale.

## This Chapter, Scored By Its Own Method

Running this chapter's own 10 concepts through the pipeline just described produces the following Elaboration Budget:

| Concept | CIS | \(E(c)\) | Tier | Target Words |
|---|---|---|---|---|
| Recursive Importance Measure | 8 | 0.34 | B | 250–400 |
| PageRank | 7 | 0.32 | B | 250–400 |
| Concept Impact Score (CIS) | 6 | 0.30 | B | 250–400 |
| Global Normalization | 4 | 0.25 | B | 250–400 |
| Elaboration Score | 3 | 0.21 | B | 250–400 |
| Chapter Partitioning Problem | 3 | 0.21 | B | 250–400 |
| Elaboration Tier | 2 | 0.17 | C | 120–200 |
| Single-Pass DAG Computation | 1 | 0.11 | C | 120–200 |
| Within-Chapter Concept Ordering | 1 | 0.11 | C | 120–200 |
| Content-Budget Allocation | 1 | 0.11 | C | 120–200 |

Zero Tier A, six Tier B, four Tier C. That profile is not an accident of writing — it is exactly what the theory predicts for a chapter this late and this specialized, and it mirrors the very validation check that motivated Global Normalization in the first place: a book's final, narrowest chapter should skew toward its lowest tiers, not its highest, because nothing later in the book depends on what it introduces.

!!! mascot-encourage "The Theory Just Explained Its Own Chapter"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Pause and appreciate this: the method this chapter teaches was just used to score the chapter itself, and it correctly predicted that a closing, specialized chapter should be treated briefly rather than heavily. A metric that can be turned on the very book explaining it, and produce a sane answer, is a good sign the metric is measuring something real.

## How CIS Changed Four Real Agent Skills

Everything above is not a hypothetical proposal — it shipped. This project's own tooling, the `ibook-skills` repository, records the exact change as ordinary git history: four skills, each modified within about half an hour of the others, adding CIS support end to end.

| Skill | Version | What changed |
|---|---|---|
| `learning-graph-generator` | v1.06 (`23a4b4dc`) | `csv-to-json.py` now computes CIS for every node — \(\mathrm{CIS}(x) = 1 + \sum \mathrm{CIS}(d)\) over a topological pass — and writes it into `learning-graph.json` as `node.cis`. Marked **BREAKING**: every book must regenerate its `learning-graph.json` before the other three skills below will work correctly. |
| `book-chapter-generator` | v1.0.0 (`f0d9a049`) | No longer computes its own "dependents count" from the edge list. It now reads `node.cis` directly and writes it into each generated chapter's "Concepts Covered" section — now a markdown table with `Concept` and `CIS Score` columns, replacing the old numbered list. This chapter's own Concepts Covered table, above, follows that table format, spelling the second column out as "Concept Impact Score" rather than the skill's literal `CIS Score` header — "CIS" already stands for *Concept Impact Score*, so "CIS Score" is redundant. |
| `chapter-content-generator` | v1.09 (`dc52df59`) | Replaces the old flat "3000–5000 words, 4–6 non-text elements per chapter" instruction with the per-concept Elaboration Budget this chapter just walked through — Tier A/B/C, driven by each concept's globally normalized Elaboration Score. |
| `learning-graph-viewer` | v1.04 (`24014524`) | The interactive graph viewer (Chapters 11–15) now sizes each node's box using \(\log(\mathrm{CIS}+1)\), so high-impact concepts render visibly larger — the same log-normalization used everywhere else in this chapter, applied to layout instead of word count. |

The dependency order between these four changes is itself worth noticing, because it is the same partitioning-then-ordering logic this chapter just defined for chapters: `learning-graph-generator` had to change first, since the other three all read a field (`node.cis`) that did not exist before it. `book-chapter-generator` had to change next, since `chapter-content-generator`'s Elaboration Budget reads the `CIS Score` column that only `book-chapter-generator`'s new table format provides. `learning-graph-viewer` had no such dependency on the other two skills and could change independently, which is exactly why its commit sits in parallel with, rather than strictly after, the chapter-generation pair. A concept dependency graph does not just describe *what a book teaches* — the same acyclic, prerequisite-respecting structure describes *how the tools that build the book had to be upgraded*.

## Synthesis: The Graph Grades Its Own Book

This chapter closes a loop the rest of the book left open. Chapter 21 gave you indegree and centrality to rank a concept's local importance. This chapter gave you CIS to rank its *transitive* importance exactly, in one pass, because a learning graph's acyclic structure makes that exact computation possible in the first place. It gave you Global Normalization and the Elaboration Score to make CIS values comparable across an entire book, and Elaboration Tiers and Content-Budget Allocation to turn that comparison into an actual writing instruction — replacing a flat, concept-blind word count with one that spends more explanation where the graph says more explanation is deserved. And it showed you, in this book's own `ibook-skills` git history, that this is not academic: four real skills changed, in a real dependency order, to make every future chapter — including this one — generated this way.

!!! mascot-celebration "You've Reached the End of the Graph"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Let's connect the concepts, one final time. You started this book learning what a node and an edge are. You end it holding a method that turns those same nodes and edges into a number — CIS — precise enough to decide how many words a concept deserves, confident enough to have already rewritten the tools that write books like this one. That is the whole promise of a learning graph, kept: not just a map of what to teach, but a measure of how much each part of that map is worth.

[See Annotated References](./references.md)
