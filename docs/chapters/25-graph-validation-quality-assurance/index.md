---
title: Graph Validation and Quality Assurance
description: Extends Chapter 5's validation checks into a full automated-validator toolkit -- schema validation, referential integrity, duplicate detection, and a composite graph quality score -- for catching structural and pedagogical problems before they compound.
generated_by: claude skill chapter-content-generator
date: 2026-07-15 00:00:00
version: 0.09
---

# Graph Validation and Quality Assurance

## Summary

Extends Chapter 5's structural validation checks — cycle detection, orphan detection, connectivity — into the fuller toolkit a production validator actually runs: schema conformance, referential integrity, duplicate and missing-edge detection, and the harder-to-automate pedagogical checks that ask whether a graph's structure makes educational sense, not just mathematical sense. Covers how individual findings roll up into warnings, errors, and a single composite quality score. After this chapter, readers can distinguish a validation warning from a validation error and explain which quality checks a script can run alone and which still need a human reviewer.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Metadata Validation
2. Schema Validation
3. Referential Integrity
4. Duplicate Concept Detection
5. Missing Dependency
6. Invalid Dependency ID
7. Graph Completeness
8. Pedagogical Coherence
9. Dependency Plausibility
10. Graph Quality Score
11. Validation Threshold
12. Automated Validator
13. Validation Warning
14. Validation Error

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Learning Graph Quality, Validation, and File Formats](../05-graph-quality-validation-file-formats/index.md)
- [Chapter 22: Concept Metadata and Semantic Labeling Standards](../22-concept-metadata-semantic-labeling/index.md)
- [Chapter 23: Advanced Dependency Modeling](../23-advanced-dependency-modeling/index.md)

---

!!! mascot-welcome "From Is-It-a-DAG to Is-It-Actually-Good"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 5 asked one question: is this graph a valid DAG? This chapter asks several more, some a script can answer and some it cannot. A graph can pass every structural check Chapter 5 taught you and still have a duplicate concept hiding under two labels, a dependency pointing at an ID that does not exist, or a pedagogically nonsensical prerequisite no cycle-detector would ever catch.

## Schema Validation and Referential Integrity

The most basic check a validator runs happens before any graph theory is even considered. **Schema Validation** is the process of checking that a graph dataset's fields, types, and structure conform to its declared Graph Schema — every node has the required fields, every field holds the expected data type, every group has a color. Schema Validation depends on Graph Schema and JSON Schema in the learning graph. This is precisely what this project's own `validate-learning-graph.sh` runs against `learning-graph.json` and `learning-graph-schema.json` — and, worth noting honestly, a check this project's own graph currently fails on one field shape, a reminder that schema validation catches real, specific problems rather than being a formality.

A schema check confirms a file is *shaped* correctly; it does not confirm the *references inside* it point anywhere real. **Referential Integrity** is the property that every reference from one part of a dataset to another — most importantly, every dependency edge's `from` and `to` values — points to a concept ID that actually exists in the dataset. Referential Integrity depends on Schema Validation and Unique Concept Identifier in the learning graph.

A referential-integrity failure has a specific, named cause worth calling out on its own. An **Invalid Dependency ID** is a dependency edge referencing a ConceptID that does not exist anywhere in the concept list — typically the result of a typo, a deleted concept whose edges were never cleaned up, or an off-by-one error during manual CSV editing. Invalid Dependency ID depends directly on Referential Integrity in the learning graph.

!!! mascot-warning "An Invalid Dependency ID Fails Silently in a Spreadsheet"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Open `learning-graph.csv` in a spreadsheet application and a Dependencies value like `"999"` looks completely normal — just a number in a cell. Nothing visually distinguishes a valid ConceptID from an invalid one until a referential-integrity check specifically cross-references every ID against the concept list. This is exactly the kind of error a human reviewer skimming a CSV is likely to miss and an automated validator catches instantly.

## Duplicate Concept Detection and Missing Dependency

Chapter 22 covered label ambiguity as a metadata-quality concern; this chapter names the automated check that catches its most severe form. **Duplicate Concept Detection** is the automated process of identifying two or more concepts in a graph that are effectively the same idea, whether through identical labels, near-identical labels, or labels differing only in formatting. Duplicate Concept Detection depends on Named Concept and Label Ambiguity in the learning graph.

Where duplicate detection finds concepts that should not both exist, **Missing Dependency** finds edges that should exist but do not. A Missing Dependency is a genuine prerequisite relationship that the graph fails to encode as an edge, discoverable by comparing what a concept's content actually assumes against what its dependency list actually states. Missing Dependency depends on Dependency Gap and Full Coverage Check in the learning graph — it is the automatable, structural symptom that often accompanies Chapter 23's more judgment-based Dependency Gap finding.

## Metadata Validation and Graph Completeness

Chapter 22 introduced several metadata fields without checking whether they are actually populated correctly across an entire graph; this chapter closes that gap. **Metadata Validation** is the automated check that every concept's metadata fields — labels, definitions, taxonomy assignments — are present, correctly typed, and internally consistent across the whole dataset. Metadata Validation depends on Metadata Field and Learning Graph Validation in the learning graph.

Beyond individual fields, a validator also asks whether the graph as a whole leaves anything out. **Graph Completeness** is the property that a graph covers everything its scope promises — every concept the course description implies, every dependency a concept's content actually requires, and every taxonomy category actually populated. Graph Completeness depends directly on Full Coverage Check in the learning graph. Completeness is a broader, harder-to-automate cousin of Chapter 5's narrower structural coverage check — it asks not just "is every node connected" but "does this graph cover what it claims to cover."

## Pedagogical Coherence and Dependency Plausibility

The checks so far are all things a script can verify with certainty — a missing ID, an unpopulated field, an unreachable node. Two more checks matter just as much and resist full automation. **Pedagogical Coherence** is the property that a graph's structure makes genuine educational sense — its sequencing reflects how the subject is actually taught and learned, not merely a mathematically valid ordering. Pedagogical Coherence depends on Learning Graph Validation and Learning Progression in the learning graph. A graph can be a perfectly valid DAG with zero cycles and full connectivity while still sequencing "Advanced Optimization" before "Basic Calculus" in a way no working curriculum designer would ever approve — the DAG property alone cannot catch that.

Closely related, **Dependency Plausibility** is a judgment about whether a specific asserted dependency reflects genuine domain expertise rather than superficial or coincidental association. Dependency Plausibility depends on Dependency Review and Pedagogical Coherence in the learning graph — it applies Chapter 23's False Prerequisite concern at the level of a single edge, asking "does this specific claim hold up," rather than at the level of the whole graph's sequencing logic.

!!! mascot-thinking "These Two Checks Are Why Human Review Never Fully Disappears"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Every check earlier in this chapter — schema, referential integrity, duplicates, missing dependencies — can run as a script with zero human judgment required. Pedagogical Coherence and Dependency Plausibility cannot: no script currently knows enough about how a subject is actually taught to judge whether a sequencing choice makes pedagogical sense. This is the concrete reason Chapter 23's Human Dependency Review checkpoint exists and will keep existing, no matter how sophisticated automated validation becomes.

## Automated Validator, Validation Warning, and Validation Error

All of this chapter's automatable checks are, in practice, bundled into one tool that runs them together. An **Automated Validator** is a script or program that runs a fixed battery of quality checks against a graph dataset and reports its findings, without requiring a human to manually inspect each concept or edge. Automated Validator depends on Automated Quality Validation and Schema Validation in the learning graph. This project's own `analyze-graph.py` and `validate-learning-graph.sh` are both automated validators in exactly this sense — one checking structural graph-theory properties, the other checking schema conformance.

An automated validator's findings are not all equally serious, and distinguishing them matters for deciding what blocks progress and what does not. A **Validation Warning** is a finding that flags a potential quality problem worth a reviewer's attention but does not, by itself, make the graph unusable — a slightly imbalanced taxonomy category, for instance. Validation Warning depends directly on Automated Validator in the learning graph. A **Validation Error** is a finding severe enough that the graph should not be considered valid or safe to use until it is fixed — a cycle, an invalid dependency ID, or a schema violation are all validation errors. Validation Error depends directly on Automated Validator in the learning graph.

| Finding Severity | Blocks Use? | Example |
|---|---|---|
| Validation Warning | No — worth reviewing, not blocking | A taxonomy category at 28%, just under the 30% ceiling |
| Validation Error | Yes — must be fixed first | An invalid dependency ID, a cycle, a schema violation |

## Validation Threshold and Graph Quality Score

Individual findings eventually need to roll up into a single go/no-go decision, and two more concepts close that loop. A **Validation Threshold** is a pre-defined cutoff value that separates an acceptable finding from an unacceptable one — Chapter 4's 30% category-balance ceiling and Chapter 19's course-description score of 70 are both validation thresholds. Validation Threshold depends directly on Automated Validator in the learning graph. A **Graph Quality Score** is a single composite number, typically on a 1-to-100 scale, summarizing a graph's overall validation results across every check this chapter has named. Graph Quality Score depends on Quality Metrics Report and Automated Validator in the learning graph — it is the number Chapter 19's session log reported as roughly 88 out of 100 for this project's own graph after its repair pass.

#### Diagram: Automated Validator Report Reader


<iframe src="../../sims/automated-validator-report-reader/main.html" width="100%" height="562px" scrolling="no"></iframe>
[Run Automated Validator Report Reader Fullscreen](../../sims/automated-validator-report-reader/main.html)

<details markdown="1">
<summary>Automated Validator Report Reader</summary>
Type: microsim
**sim-id:** automated-validator-report-reader<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners read a simulated validator report containing a mix of warnings and errors, click each finding to see the affected node or edge highlighted on a small graph, and sort findings by severity to practice triaging which ones block progress.

Bloom Level: Analyze (L4)
Bloom Verb: classify, triage, examine

Learning objective: Given a simulated validator report listing six findings (three warnings, three errors) against a 15-node sample graph, the learner can correctly classify each finding's severity, identify the specific node or edge it affects on the rendered graph, and correctly determine whether the graph is safe to publish given the findings present.

Canvas layout: a findings list panel (left, 300px wide) showing all six findings with severity icons; a graph panel (right, flexible width, 420px tall) showing the sample graph; a "Ready to Publish?" yes/no prompt with justification field below both panels

Visual elements: findings list items color-coded gold (warning) or red (error) with a short description each; clicking a finding highlights its affected node or edge on the graph panel in matching color; graph panel otherwise shows nodes in neutral gray/blue

Interactive controls: clicking any finding highlights the affected graph element and expands a one-sentence explanation inline; a "Sort by Severity" toggle reorders the findings list; after reviewing all six findings, the learner selects Yes/No on "Ready to Publish?" and receives feedback on whether that judgment matches the correct answer (No, because two of the three errors remain unresolved in this scenario)

Default parameters: findings list unsorted (as originally generated) on load; no finding selected; publish prompt disabled until at least one finding has been reviewed

Data Visibility Requirements:
Stage 1: Show the findings list and full graph, no findings expanded
Stage 2: On clicking a finding, highlight its graph element and show the one-sentence explanation
Stage 3: On answering the publish-readiness prompt, reveal the correct answer and a summary of which specific errors would need to be fixed first

Instructional Rationale: An Analyze-level objective requires learners to classify findings by severity and connect each to a concrete graph element, then synthesize an overall publish/no-publish judgment — a static report list cannot support the click-to-locate and judgment-check interactions this requires.

Responsive behavior: findings list moves above the graph panel (stacked) below 700px width

Canvas size: responsive, 100% width, 560px height

Implementation: vis-network for the graph panel; findings stored as a small JSON array (severity, description, affected node/edge ID); click handler cross-references the affected ID to highlight the correct graph element
</details>

## Synthesis: A Graph That Passes Every Check, Including the Hard Ones

Chapter 5 gave you a structural pass/fail check. This chapter gave you the fuller picture: schema conformance and referential integrity as automatable first-line checks, duplicate and missing-dependency detection as automatable content checks, graph completeness as a broader coverage question, and pedagogical coherence and dependency plausibility as the two checks that will keep needing a human reviewer no matter how sophisticated automated validation becomes. All of it rolls up into warnings and errors, and those roll up into one quality score — the same score this book's own generation pipeline reports after every validation pass.

!!! mascot-celebration "You Can Now Triage a Validator Report Like a Reviewer"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress. You started this book's validation story in Chapter 5 knowing what a cycle and an orphaned node were. You now know the full battery a production validator runs, which findings are warnings versus blocking errors, and — just as important — which quality questions no script can fully answer on its own. Let's connect the concepts — Chapter 26 opens up the actual file formats and pipeline internals that every one of these checks reads and writes.

[See Annotated References](./references.md)
