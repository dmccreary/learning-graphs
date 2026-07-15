---
title: Concept Metadata and Semantic Labeling Standards
description: Extends Chapter 2's labeling conventions into full SKOS and Dublin Core metadata fields, concept granularity, and the governance practices that keep thousands of concept labels unambiguous and machine-readable.
generated_by: claude skill chapter-content-generator
date: 2026-07-15 00:00:00
version: 0.09
---

# Concept Metadata and Semantic Labeling Standards

## Summary

Extends Chapter 2's introduction to concept labels and metadata standards into the full mechanics of keeping labels unique, appropriately sized, and unambiguous at scale, and into the specific SKOS and Dublin Core fields a production learning graph actually populates. Covers how synonyms, homonyms, and label drift are managed across a graph with hundreds of concepts, and the governance practice that keeps a vocabulary consistent as a graph grows over time. After this chapter, readers can assign a correctly-grained concept identifier, populate a full SKOS relationship set, and explain why vocabulary governance matters once a graph passes a few hundred concepts.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Unique Concept Identifier
2. Concept Granularity
3. Atomic Concept
4. Composite Concept
5. Label Ambiguity
6. Label Normalization
7. Synonym Management
8. Homonym Disambiguation
9. Naming Convention
10. Metadata Field
11. Dublin Core Title
12. Dublin Core Description
13. SKOS Preferred Label
14. SKOS Alternate Label
15. SKOS Broader Relation
16. SKOS Narrower Relation
17. SKOS Related Relation
18. Semantic Relationship
19. Machine-Readable Metadata
20. Concept Provenance
21. Vocabulary Governance

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Concept Labeling and Metadata Standards](../02-concept-labeling-metadata-standards/index.md)

---

!!! mascot-welcome "Every Label Is a Promise to a Future Reader"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 2 introduced SKOS and Dublin Core by name. This chapter opens both standards fully — every field a production learning graph actually populates — and tackles the practical mess real concept lists develop at scale: near-duplicate labels, words that mean two different things depending on context, and the slow drift that happens when three different contributors name the same idea three different ways over six months.

## Unique Concept Identifier, Concept Granularity, and the Atomic-Composite Split

Every concept in a learning graph needs an anchor that never changes even if its label does. A **Unique Concept Identifier** is a stable, permanent identifier assigned to a concept that remains constant even if the concept's label is later renamed — in this project's own `learning-graph.csv`, the integer `ConceptID` column plays exactly this role. Unique Concept Identifier depends directly on Concept Label in the learning graph. Renaming "CSV to JSON Conversion" to "CSV-to-JSON Conversion" should never require touching a single dependency edge, because every edge references the stable ID, not the label text.

Before assigning an identifier, though, a designer has to decide how big a "concept" should be — a question Chapter 2 assumed was already settled and this chapter now opens up. **Concept Granularity** is the level of detail at which a concept is defined — how large or small a unit of knowledge one node in the graph represents. Concept Granularity depends directly on Concept in the learning graph. Granularity is a judgment call with real consequences: too coarse, and a single node like "Graph Theory" hides dozens of distinct prerequisite relationships inside itself; too fine, and a graph fragments into hundreds of nearly-identical nodes that add review overhead without adding pedagogical clarity.

Two poles anchor that granularity spectrum. An **Atomic Concept** is a concept that cannot be meaningfully decomposed into smaller prerequisite concepts without losing coherence — it names one genuinely indivisible unit of knowledge. Atomic Concept depends directly on Concept Granularity in the learning graph. A **Composite Concept** is a concept that bundles several related sub-ideas under one label, deliberately choosing breadth over the finer granularity a set of atomic concepts would provide. Composite Concept depends directly on Concept Granularity in the learning graph.

!!! mascot-thinking "There Is No Universally Correct Granularity"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    "Depth-First Search" is atomic in this book — Chapter 20 treats it as one indivisible idea. A textbook specifically about algorithm implementation might split it into "DFS Recursive Implementation," "DFS Iterative Implementation," and "DFS Stack Management" as three atomic concepts instead. Neither choice is wrong; granularity should match what the course description's learning outcomes actually require distinguishing.

## Label Ambiguity, Label Normalization, Synonym Management, and Homonym Disambiguation

A concept list drafted quickly, or grown by several contributors over time, accumulates labeling problems that a single pass of Chapter 2's rules does not fully prevent. **Label Ambiguity** is the condition of a concept label being unclear about which specific idea it refers to, either because the wording is vague or because the same wording could plausibly apply to more than one concept in the graph. Label Ambiguity depends directly on Concept Label in the learning graph.

**Label Normalization** is the process of rewriting concept labels to a single consistent form — resolving capitalization, punctuation, and phrasing inconsistencies (such as "CSV-to-JSON" versus "CSV to JSON" versus "csv2json") so that equivalent labels do not silently diverge into apparent duplicates. Label Normalization depends directly on Label Ambiguity in the learning graph.

Normalization fixes formatting drift; a related but distinct problem is when two *different-looking* labels genuinely mean the same thing. **Synonym Management** is the practice of tracking which alternate labels refer to the same underlying concept, so a search for either term correctly resolves to one node rather than two. Synonym Management depends directly on Label Ambiguity in the learning graph. The opposite failure mode — one label secretly meaning two different things — gets its own name. **Homonym Disambiguation** is the practice of distinguishing multiple distinct concepts that happen to share the same or a very similar label, ensuring each is assigned its own node rather than being collapsed into one. Homonym Disambiguation depends directly on Label Ambiguity in the learning graph.

!!! mascot-warning "Synonym and Homonym Problems Look Identical at First Glance"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Both problems surface the same way — two rows in a concept-list review that look suspiciously related. The fix is opposite in each case: a synonym pair should merge into one node with the extra label recorded as an alternate label; a homonym pair should stay two separate nodes with more specific labels. Merging a true homonym pair loses real distinctions; keeping a true synonym pair as two nodes creates a redundant, confusing near-duplicate. Reading each pair's intended meaning carefully, not just its surface text, is what tells them apart.

A **Naming Convention** is a documented, agreed-upon set of rules — capitalization, maximum length, phrasing style — that every concept label in a project must follow, reducing how often ambiguity, normalization, and synonym problems arise in the first place. Naming Convention depends directly on Concept Label in the learning graph. Chapter 2's own rules (Title Case, a 32-character cap, entity phrasing rather than a question) are this project's naming convention, stated once and applied to all 400 concepts.

## Metadata Field, Dublin Core Title, and Dublin Core Description

Beyond the label itself, a concept's full metadata record has multiple named slots, and this chapter names the general category before drilling into the two standards Chapter 2 introduced. A **Metadata Field** is any single named attribute in a concept's metadata record — title, description, provenance, and so on are each one metadata field. Metadata Field depends directly on Concept Definition in the learning graph.

Two Dublin Core fields matter enough to name individually, because this project's own `metadata.json` and `learning-graph.json` populate them directly. **Dublin Core Title** is the Dublin Core metadata field holding a resource's formal, human-readable name. Dublin Core Title depends on Metadata Field and Dublin Core Metadata in the learning graph — in this project, the value `"Learning Graphs: The Key to Intelligent Textbooks"` in `metadata.json`'s `title` field is a Dublin Core Title in practice. **Dublin Core Description** is the Dublin Core metadata field holding a free-text summary of what a resource covers. Dublin Core Description depends on Metadata Field and Dublin Core Metadata in the learning graph — this project's `metadata.json` `description` field plays this exact role.

## SKOS Preferred Label, Alternate Label, and the Three Relation Types

SKOS supplies its own labeling fields, distinct from — but compatible with — Dublin Core's resource-level fields. A **SKOS Preferred Label** is the single, canonical, display-quality label SKOS assigns to a concept — the one label a rendered graph or search result should show by default. SKOS Preferred Label depends on Preferred Label and SKOS in the learning graph, applying Chapter 2's general Preferred Label idea specifically within the SKOS vocabulary. A **SKOS Alternate Label** is any additional label SKOS permits a concept to carry beyond its preferred label — synonyms, abbreviations, or alternate phrasings that should still resolve to the same node in a search. SKOS Alternate Label depends on Alternate Label and SKOS in the learning graph, and is the standards-compliant mechanism Synonym Management actually implements with.

SKOS also formalizes *relationships between* concepts, not just labels on individual concepts, and it names exactly three kinds. A **SKOS Broader Relation** links a concept to a more general concept that contains it — "Graph Theory" as a SKOS-broader relation of "Depth-First Search." A **SKOS Narrower Relation** links a concept to a more specific concept it contains — the inverse direction of the same pair. A **SKOS Related Relation** links two concepts that are meaningfully associated without either being more general or more specific than the other. All three — SKOS Broader Relation, SKOS Narrower Relation, and SKOS Related Relation — depend directly on SKOS in the learning graph.

!!! mascot-tip "SKOS Relations Are Not the Same as Dependency Edges"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A SKOS broader/narrower pair describes a *hierarchical* relationship (is-a-kind-of), and a SKOS related pair describes a loose *association* — neither one is a "depends on" edge. "Depth-First Search" has "Graph Traversal" as a SKOS-broader concept, but the *dependency* edge in this project's own graph runs the opposite way (Depth-First Search depends on Graph Traversal), because prerequisite order and conceptual hierarchy are two different relationships that happen to often point the same direction without being the same thing.

These three relation types are specific instances of a more general idea this chapter names once, at the top of the hierarchy. A **Semantic Relationship** is any typed, named connection between two concepts that captures *how* they relate, beyond a simple hierarchy — broader, narrower, related, part-of, and other typed links are all semantic relationships. Semantic Relationship depends on SKOS Broader Relation, SKOS Narrower Relation, and SKOS Related Relation in the learning graph.

| SKOS Relation | Direction | Example |
|---|---|---|
| Broader | Points to a more general concept | Depth-First Search → broader → Graph Traversal |
| Narrower | Points to a more specific concept | Graph Traversal → narrower → Depth-First Search |
| Related | Points to an associated concept, no hierarchy implied | SKOS → related → Dublin Core Metadata |

#### Diagram: SKOS Relation Triple Builder

<details markdown="1">
<summary>SKOS Relation Triple Builder</summary>
Type: microsim
**sim-id:** skos-relation-triple-builder<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners build SKOS broader, narrower, and related relationships between concept pairs by dragging a labeled relation arrow onto a graph, then see it rendered correctly (or flagged if backward) against a small answer key.

Bloom Level: Apply (L3)
Bloom Verb: construct, classify, apply

Learning objective: Given six unlabeled concept-pair prompts drawn from this book's own vocabulary (e.g., "Depth-First Search" and "Graph Traversal"), the learner can correctly select and orient the SKOS relation type (broader, narrower, or related) for each pair and receive immediate correct/incorrect feedback.

Canvas layout: a two-node mini-graph panel (360px tall) with the current concept pair displayed as two boxes; three relation-type buttons (Broader, Narrower, Related) below the panel; a progress indicator ("Pair 3 of 6") and feedback banner above the panel

Visual elements: two concept-label boxes per prompt, connected by a dashed placeholder arrow until the learner picks a relation type, at which point the arrow solidifies gold (correct) or red (incorrect) with a labeled arrowhead showing direction

Interactive controls: clicking a relation-type button applies that relation and checks it against the answer key; a direction-swap icon lets the learner flip which of the two concepts is "broader"; "Next Pair" advances after feedback is shown; "Reset Progress" restarts the six-pair sequence

Default parameters: starts at Pair 1 of 6 with no relation selected; feedback banner empty until the first attempt

Data Visibility Requirements:
Stage 1: Show only the two unlabeled concept boxes and the three relation buttons
Stage 2: On selection, reveal whether the choice (including direction) was correct, with a one-sentence explanation of the correct SKOS relation
Stage 3: On completing all six pairs, show a summary scorecard listing each pair and whether it was answered correctly on the first attempt

Instructional Rationale: An Apply-level objective requires learners to correctly classify and orient a relation type on new concept pairs, not just recognize a definition — a build-and-check interaction, rather than a multiple-choice question, is what verifies the learner can apply the distinction rather than just recall it.

Responsive behavior: relation buttons wrap to two rows below 500px width; graph panel remains fixed height

Canvas size: responsive, 100% width, 480px height

Implementation: vis-network for the two-node mini-graph with a single directed edge whose label and color update on each interaction; a small JSON answer key maps each of the six prompt pairs to its correct relation type and direction
</details>

## Machine-Readable Metadata, Concept Provenance, and Vocabulary Governance

Every field this chapter has named so far serves one overarching requirement, worth stating explicitly before closing. **Machine-Readable Metadata** is metadata structured in a consistent, parseable format — such as this project's own `learning-graph.json` — so that a script, rather than only a human reader, can reliably extract and act on it. Machine-Readable Metadata depends on Metadata Field and JSON in the learning graph. Every field discussed above only earns its keep if a viewer, validator, or search feature can actually read it programmatically; a beautifully written but unstructured description defeats the purpose.

Metadata also needs to record where it came from. **Concept Provenance** is a record of a concept's origin and history — who or what created or last modified it, and when — kept so that a reviewer can trace a questionable label or dependency back to its source. Concept Provenance depends directly on Concept Label in the learning graph. A concept generated by an LLM pipeline, then manually edited by a human reviewer during Concept List Review, ideally carries both events in its provenance record.

Finally, none of these practices — normalization, synonym tracking, naming conventions, provenance — sustains itself automatically as a graph grows past a few hundred concepts and multiple contributors. **Vocabulary Governance** is the set of policies and review practices that keep a concept vocabulary consistent over time, as new concepts are added and existing ones are revised, preventing the slow labeling drift that ungoverned growth produces. Vocabulary Governance depends on Naming Convention and Controlled Vocabulary in the learning graph.

!!! mascot-encourage "Governance Sounds Bureaucratic, But It Is Cheap Insurance"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    A one-page naming convention document and a habit of checking new labels against existing ones before adding them is most of what vocabulary governance requires for a project this size — it does not need a formal committee. The payoff shows up later: a 400-concept graph with consistent labels is far cheaper to search, cross-reference, and extend than one where "Assessment," "Assessments," and "Student Assessment" all quietly refer to the same idea.

## Synthesis: From One Label to a Governed Vocabulary

Chapter 2 taught you to write a single good concept label. This chapter scaled that skill to an entire vocabulary: choosing the right granularity before labeling begins, catching ambiguity and near-duplicates as a graph grows, populating the specific Dublin Core and SKOS fields a real graph needs, and governing the whole vocabulary so it stays trustworthy over time rather than drifting. The SKOS relations defined here — broader, narrower, related — resurface directly in Chapter 24's taxonomy design, where they formalize how categories nest and connect to each other, and Concept Provenance resurfaces in Chapter 23's dependency-review workflows, where knowing who asserted an edge matters as much as knowing the edge exists.

!!! mascot-celebration "Your Labels Can Now Survive Contact with 400 Concepts"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress. A vocabulary of a dozen concepts barely needs any of this chapter's tools — ambiguity and drift are easy to catch by eye. A vocabulary of 400 needs every one of them: stable identifiers, disciplined granularity, synonym and homonym tracking, full SKOS relations, and governance that outlives any single contributor. You now have the full toolkit a production learning graph's metadata actually runs on. Let's connect the concepts — Chapter 23 takes this same rigor and applies it to the dependency edges themselves.

[See Annotated References](./references.md)
