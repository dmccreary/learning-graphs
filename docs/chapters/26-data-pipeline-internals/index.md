---
title: Data Pipeline Internals
description: Opens up the CSV and JSON file formats from Chapter 5 to show the actual record structures, header conventions, and configuration files a generation pipeline reads and writes at each step.
generated_by: claude skill chapter-content-generator
date: 2026-07-15 00:00:00
version: 0.09
---

# Data Pipeline Internals

## Summary

Opens up the CSV and JSON file formats Chapter 5 named only in passing, showing the actual record structures — node records, edge records, group records — and configuration files a learning-graph generation pipeline reads and writes at each step. Covers the specific metadata fields (version, license, taxonomy names, color assignments) that travel from a hand-edited CSV all the way to a rendered graph viewer legend, and the discipline that keeps a pipeline reproducible when it needs to run again. After this chapter, readers can trace exactly how one row in `learning-graph.csv` becomes one node and its styling in `learning-graph.json`.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Data Pipeline
2. CSV Header
3. Pipe-Delimited Field
4. Node Record
5. Edge Record
6. Group Record
7. Metadata Record
8. Version Metadata
9. License Metadata
10. Schema Conformance
11. Taxonomy Name Mapping
12. Color Configuration
13. JSON Serialization
14. Data Transformation
15. Reproducible Generation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Learning Graph Quality, Validation, and File Formats](../05-graph-quality-validation-file-formats/index.md)
- [Chapter 22: Concept Metadata and Semantic Labeling Standards](../22-concept-metadata-semantic-labeling/index.md)
- [Chapter 24: Taxonomy Design Deep Dive](../24-taxonomy-design-deep-dive/index.md)

---

!!! mascot-welcome "Opening Up the Machine's Actual Gears"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 5 named JSON, CSV, YAML, and Markdown as file formats a learning graph uses. This chapter opens the hood on exactly how those files are structured, row by row and field by field, and traces one concept's journey from a single CSV line all the way to a colored, labeled node on a rendered graph. Every field this chapter names is a real column or key you can find in this project's own files right now.

## Data Pipeline: The Whole Assembly Line

Before naming individual records, this chapter needs the umbrella term for the whole process they flow through. A **Data Pipeline** is a sequence of automated steps that reads data in one format, transforms it, and writes it out in another format, with each step's output becoming the next step's input. Data Pipeline depends on JSON and CSV in the learning graph. This project's own generation pipeline — `learning-graph.csv` in, `learning-graph.json` out, by way of `csv-to-json.py` — is a concrete, working data pipeline, not an abstract description.

## CSV Header and Pipe-Delimited Field

A CSV file's very first line carries essential information the rest of the file depends on. A **CSV Header** is the first row of a CSV file, naming each column so that every subsequent row's values can be matched to the correct field. CSV Header depends directly on CSV in the learning graph. This project's own `learning-graph.csv` opens with the header `ConceptID,ConceptLabel,Dependencies,TaxonomyID` — four names that tell every downstream script exactly what each comma-separated value in every following row means.

One of those four columns needs to hold something CSV was never designed for: a list. A **Pipe-Delimited Field** is a single CSV cell containing multiple values separated by the pipe character (`|`) rather than one value, used when a field needs to hold a variable-length list inside a format that otherwise expects one value per cell. Pipe-Delimited Field depends directly on CSV in the learning graph. The `Dependencies` column is exactly this kind of field — a value like `"5|4"` packs two ConceptIDs into one cell, which every downstream script must split on the pipe character before it can be used.

!!! mascot-tip "Pipe, Not Comma, for a Reason"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A comma-separated list inside one cell of a comma-separated file would be genuinely ambiguous — a parser could not tell where one field ends and a nested list begins. The pipe character almost never appears in a concept label, which is exactly why it was chosen as the inner-list delimiter: it needs to be a character the outer CSV format never uses for anything else.

## Node Record, Edge Record, and Group Record

Once a CSV row is parsed, it becomes one of three distinct record types inside `learning-graph.json`, and this chapter names each precisely. A **Node Record** is the JSON representation of a single concept, including its ID, label, and group assignment, corresponding to one row of the source CSV. Node Record depends on JSON Data Format and Concept Label in the learning graph. An **Edge Record** is the JSON representation of a single dependency relationship, holding a `from` ID and a `to` ID, generated from one entry in a CSV row's pipe-delimited Dependencies field. Edge Record depends on JSON Data Format and Concept Dependency in the learning graph — notice that one CSV row can produce *multiple* edge records, one per pipe-delimited dependency.

A **Group Record** is the JSON representation of a single taxonomy category, holding its `classifierName`, `color`, and font styling, generated once per distinct TaxonomyID found across the whole CSV rather than once per row. Group Record depends on JSON Data Format and Taxonomy Category in the learning graph.

| Record Type | Generated From | Cardinality |
|---|---|---|
| Node Record | One CSV row | One record per row |
| Edge Record | One row's pipe-delimited Dependencies field | Zero or more records per row |
| Group Record | Distinct TaxonomyID values across all rows | One record per unique category, not per row |

## Metadata Record, Version Metadata, and License Metadata

Beyond nodes, edges, and groups, `learning-graph.json` carries one more record type describing the graph as a whole rather than any individual concept. A **Metadata Record** is the top-level JSON object holding whole-graph descriptive information — title, description, creator, date — corresponding to Chapter 22's Dublin Core Title and Dublin Core Description fields collected into one place. Metadata Record depends on Metadata Field and Dublin Core Metadata in the learning graph. This project's own `metadata.json` file is read directly into this record by `csv-to-json.py`.

Two specific fields inside that metadata record matter enough to name individually. **Version Metadata** is the metadata field recording which version of a graph or its generation format a given file represents — this project's own `metadata.json` carries `"version": "1.0"` and `"format": "Learning Graph JSON v1.0"` as version metadata. Version Metadata depends directly on Metadata Record in the learning graph. **License Metadata** is the metadata field recording the terms under which a graph's content may be reused — this project's own `metadata.json` carries `"license": "CC BY-NC-SA 4.0 DEED"`. License Metadata depends directly on Metadata Record in the learning graph.

## Schema Conformance, Taxonomy Name Mapping, and Color Configuration

A generated `learning-graph.json` file needs to match the shape Chapter 20's Graph Schema declares, and this chapter names the ongoing property, not just the one-time check. **Schema Conformance** is the property of a generated data file matching its declared schema at every point during a pipeline's operation, not merely at one validation checkpoint. Schema Conformance depends directly on JSON Schema in the learning graph — where Chapter 25's Schema Validation is the *act* of checking, Schema Conformance is the *property* being checked for.

Two configuration files feed specific display information into the generation step, and both matter enough that this project's own skill documentation calls out the consequence of skipping either one. A **Taxonomy Name Mapping** is a lookup table associating each TaxonomyID abbreviation with its human-readable classifierName, read from a file like this project's own `taxonomy-names.json` so that a rendered legend shows "Concept Graph Foundations" instead of the cryptic code "FOUND." Taxonomy Name Mapping depends on Taxonomy Category and JSON in the learning graph. A **Color Configuration** is a lookup table associating each TaxonomyID with a specific display color, read from a file like this project's own `color-config.json` so that a category's color assignment stays stable across repeated graph regenerations rather than being reassigned arbitrarily each time. Color Configuration depends on Node Group and JSON in the learning graph.

!!! mascot-warning "Skip the Name Mapping and the Legend Breaks"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Chapter 19 already warned about this exact failure mode from the skill-authoring side; here is what it looks like from the file-format side. Without a Taxonomy Name Mapping file, `csv-to-json.py` falls back to using the raw TaxonomyID as the display name, and every graph-viewer legend in this book would show "SKILL" and "VISCORE" instead of "Agent Skills for Learning Graph Generation" and "Vis.js Fundamentals and Styling." One missing file, one broken legend, across every page that renders it.

## JSON Serialization and Data Transformation

With every record type and configuration file in place, one mechanical step turns Python data structures into the actual bytes written to disk. **JSON Serialization** is the process of converting an in-memory data structure — the node, edge, group, and metadata records this chapter has named — into the textual JSON format that gets written to a file. JSON Serialization depends directly on JSON in the learning graph. This project's own `csv-to-json.py` performs this step at its very last line, calling Python's `json.dump()` to write the assembled dictionary out as `learning-graph.json`.

Serialization is the last step of a broader process worth naming on its own. **Data Transformation** is the general process of converting data from one structure or format into another — parsing CSV rows into Python dictionaries, splitting pipe-delimited fields into lists, and assembling those into the node/edge/group/metadata records this chapter has described are all data transformation steps. Data Transformation depends on CSV to JSON Conversion and JSON Serialization in the learning graph.

#### Diagram: CSV-to-JSON Record Mapper


<iframe src="../../sims/csv-to-json-record-mapper/main.html" width="100%" height="482px" scrolling="no"></iframe>
[Run CSV-to-JSON Record Mapper Fullscreen](../../sims/csv-to-json-record-mapper/main.html)

<details markdown="1">
<summary>CSV-to-JSON Record Mapper</summary>
Type: microsim
**sim-id:** csv-to-json-record-mapper<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners watch one CSV row, field by field, transform step-by-step into its corresponding JSON node record and edge records, making the abstract Data Transformation process concrete.

Bloom Level: Understand (L2)
Bloom Verb: illustrate, summarize, exemplify

Learning objective: Given the sample CSV row `6,Learning Graph,5|4,FOUND`, the learner can trace, one click at a time, how each field maps into the generated JSON node record and the two generated edge records, and correctly predict the JSON output for a new, unseen CSV row.

Canvas layout: a left panel (300px wide) showing the raw CSV row with each field highlighted in a distinct color; a right panel showing the generated JSON output, built up incrementally; a "Try Your Own Row" input field below both panels

Visual elements: CSV field highlights (ConceptID blue, ConceptLabel green, Dependencies gold, TaxonomyID purple) with connecting animated arrows to the matching JSON keys as each step is revealed; generated edge records appear as two separate JSON objects, visually split from the pipe-delimited Dependencies field with a "splits into 2 edges" annotation

Interactive controls: "Next Step" button reveals one field's transformation at a time (four steps: ID, label, dependencies-split, taxonomy/group); "Reset" restarts the sample row from step zero; a text input lets the learner type a new CSV row and click "Transform" to see the same four-step animation applied to their own input

Default parameters: sample row `6,Learning Graph,5|4,FOUND` pre-loaded; step 0 (nothing transformed yet) on load

Data Visibility Requirements:
Stage 1: Show the raw CSV row only, JSON panel empty
Stage 2: On each "Next Step" click, animate one field's value into its corresponding JSON location, including the Dependencies field visibly splitting into two separate edge objects
Stage 3: On completing all four steps, show the complete node record and both edge records side by side with the original CSV row, so the full before/after mapping is visible at once

Instructional Rationale: An Understand-level objective requires learners to summarize how a transformation process works, not analyze its internals — a guided, steppable animation with a try-your-own-input option is sufficient to build that comprehension without requiring code-reading ability.

Responsive behavior: CSV and JSON panels stack vertically below 600px width

Canvas size: responsive, 100% width, 480px height

Implementation: plain HTML/CSS/JavaScript state machine driving four transformation steps; the "Try Your Own Row" feature does a simplified client-side parse (split on comma, split Dependencies on pipe) mirroring csv-to-json.py's actual logic
</details>

## Reproducible Generation

Every concept this chapter has named serves one final, practical requirement, worth stating as this chapter's closing idea. **Reproducible Generation** is the property that running a pipeline's steps again, on the same input data and configuration files, produces the same output every time — the same node IDs, the same edge structure, the same color assignments. Reproducible Generation depends on Data Pipeline and Data Transformation in the learning graph, applying the general reproducibility standard research and engineering both depend on to this specific pipeline. This is precisely why Color Configuration and Taxonomy Name Mapping exist as separate, saved files rather than being regenerated fresh each run: without them, `csv-to-json.py` would assign colors positionally, and two runs of the same script could produce two different-looking graphs from the identical CSV.

!!! mascot-encourage "Reproducibility Is What Makes 'Regenerate the Graph' a Safe Thing to Say"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    A pipeline that is not reproducible turns every regeneration into a small risk — will this run's colors still match the last one, will a concept's ID stay stable. This chapter's extension to this project's own graph, adding 134 concepts and regenerating `learning-graph.json`, only stayed safe because `color-config.json` and `taxonomy-names.json` already existed and were reused unchanged. That is reproducible generation working exactly as intended, not a coincidence.

## Synthesis: The Files Behind Every Diagram in This Book

Chapter 5 told you these files existed. This chapter told you exactly what is inside them: a header naming four columns, a pipe character packing lists into single cells, three record types built from each row, a metadata record carrying version and license information, two small configuration files that keep a legend's names and colors stable, and the serialization and transformation steps that turn all of it into the `learning-graph.json` every diagram in this book ultimately reads. Chapter 19 walked through this pipeline's *procedure*; this chapter walked through its *file formats* — two views of the exact same machine.

!!! mascot-celebration "You Can Now Read This Book's Own Source Files"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress. Open this project's own `learning-graph.csv`, `taxonomy-names.json`, or `color-config.json` right now, and you will recognize every field this chapter named, doing exactly the job this chapter described. That is not a coincidence and not a simplified example — it is the actual file this book's own graph viewer reads every time someone loads this page. Let's connect the concepts — Chapter 27 turns from the pipeline that builds a graph to the model that tracks what a learner has actually mastered from it.

[See Annotated References](./references.md)
