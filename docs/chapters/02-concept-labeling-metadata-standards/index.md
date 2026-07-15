---
title: Concept Labeling and Metadata Standards
description: How individual concepts are named, defined, and standardized using preferred labels, alternate labels, controlled vocabularies, and the metadata standards (SKOS, ISO/IEC 11179, Dublin Core) that keep a learning graph machine-readable.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 09:40:13
version: 0.09
---

# Concept Labeling and Metadata Standards

## Summary

Covers how individual concepts are named, defined, and standardized so a learning graph stays machine-readable and consistent across a large book. Introduces preferred and alternate labels, controlled vocabularies, and the metadata standards (SKOS, ISO/IEC 11179, Dublin Core) used to label concepts in professional practice. Builds directly on the graph vocabulary introduced in Chapter 1.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

1. Concept Label
2. Preferred Label
3. Alternate Label
4. SKOS
5. ISO/IEC 11179
6. Dublin Core Metadata
7. Controlled Vocabulary
8. Concept Definition
9. Textbook Index
10. Named Concept

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Concept Graphs](../01-foundations-of-concept-graphs/index.md)

---

!!! mascot-welcome "Welcome back!"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! In Chapter 1 you learned that a node in a learning graph represents a **concept**. This chapter answers the question that comes right after: what do you actually put *in* that node so a machine — and a human reader — can find it, trust it, and never confuse it with a different node that happens to sound similar?

Chapter 1 treated a concept as an abstract circle in a diagram. In a real learning graph, every one of those circles is backed by a text record: a name, a definition, and — in mature systems — a set of standardized fields borrowed from library science and data governance. Get this record wrong, and the consequences compound across an entire book. Two nodes that are secretly the same idea under different names produce duplicate content and broken prerequisite chains. A node with no clear definition leaves both learners and generative AI tools guessing at what "mastery" even means. This chapter works through the naming and metadata practices that professional catalogers and metadata architects have already solved — so you don't have to reinvent them.

## From Concept to Concept Label

A **Concept Label** is the specific text string used to name a concept within a learning graph. It is the difference between the *idea* of a concept (which exists independent of language) and the *word or phrase* a book, a database, or a search box actually uses to refer to it. "The idea of a graph with no cycles" is a concept; "Directed Acyclic Graph (DAG)" is its concept label.

Once a concept has been assigned at least one authoritative label, it becomes a **Named Concept** — a concept that can be looked up, cited, and cross-referenced by name rather than described in paraphrase every time it's mentioned. This distinction matters more than it first appears: a course description or brainstorm might gesture at dozens of ideas informally, but none of them can become a graph node until each has been given a stable, citable name. Naming is the act that turns a fuzzy idea into an addressable unit of a learning graph.

Concept labels used across a large book need a small set of shared properties, or the graph slowly degrades into synonyms and near-duplicates:

- **Stable** — the label does not change once learners, quizzes, and other chapters reference it
- **Unique within the graph** — no two nodes share the same label
- **Human-readable** — a learner recognizes the label as the name of an idea, not a database key
- **Short** — typically two to five words, matching the naming convention already established in Chapter 1

!!! mascot-explain "A label is not a definition"
    ![Axiom explaining](../../img/mascot/explain.png){ class="mascot-admonition-img" }
    Don't confuse a concept label with a concept definition. The label "Photosynthesis" tells you *what to call* the idea. It says nothing about *what the idea means*. You need both, and we'll get to definitions shortly.

## Preferred Labels and Alternate Labels

Real subject areas are messy with synonyms. Practitioners call the same idea by different names depending on their training, their era, or their sub-field. A learning graph has to pick one name to stand as canonical while still remaining searchable under the names people actually use. Two paired terms handle this split.

A **Preferred Label** is the single, primary name a learning graph assigns to a concept — the label that appears on the node in every diagram, every cross-reference, and every generated index. A learning graph should have exactly one preferred label per concept, in a given language. An **Alternate Label** is a synonym or variant name that refers to the same concept without becoming the canonical name — it exists so that a learner searching for "Two-Part Graph" still lands on the node officially labeled "Bipartite Graph."

This preferred/alternate split solves a concrete problem: it lets a graph be simultaneously *consistent* (one canonical name per idea, so dependency edges never fork across synonyms) and *findable* (every common synonym still resolves to the right node). Before looking at the diagram below, notice that only the preferred label is drawn as the node itself — alternate labels branch off it as searchable aliases, not as separate concepts.

#### Diagram: Label Anatomy Explorer

<iframe src="../../sims/label-anatomy-explorer/main.html" width="100%" height="562px" scrolling="no"></iframe>

<details markdown="1">
<summary>Label Anatomy Explorer</summary>
Type: graph-model
**sim-id:** label-anatomy-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners see that a single concept node carries one preferred label and zero or more alternate labels, and that alternate labels are aliases, not separate nodes.

Bloom Level: Understand (L2)
Bloom Verb: distinguish, classify

Node types:
1. Concept node (gold circle, larger radius) — labeled with its preferred label, e.g. "Bipartite Graph"
2. Alternate label node (light gray rounded rectangle, smaller) — e.g. "Two-Part Graph", "2-Partite Graph"

Edge types:
1. `hasAlternateLabel` (dashed gray line) connecting the concept node to each alternate label node

Sample data (three small concept clusters shown at once):
- Concept: "Bipartite Graph" — alternates: "Two-Part Graph", "2-Partite Graph"
- Concept: "Directed Acyclic Graph (DAG)" — alternates: "DAG", "Dependency Graph" (marked with a caution icon, see note below)
- Concept: "Preferred Label" — alternates: "Canonical Label"

Interactive features:
- Click the gold concept node: infobox shows "Preferred Label: <label>" plus the ISO-style definition of the concept
- Click a gray alternate-label node: infobox shows "Alternate label for: <preferred label>" plus one sentence on why this synonym exists (e.g., era, sub-field, or shorter colloquial form)
- Hover any node: highlights only that node's direct edges, dimming the rest of the canvas
- Layout: force-directed, concept nodes centered with alternate labels orbiting them

Special note to render as an infobox caveat: "Dependency Graph" is intentionally shown with a caution icon because in this course it is a related-but-distinct concept (see Chapter 1), not a true synonym of DAG — the diagram uses it to illustrate a common labeling mistake, not a valid alternate label.

Canvas size: responsive, minimum 600x450px, must reflow on window resize

Implementation: vis-network JavaScript library with a fixed node dataset (no live editing), infobox rendered in a side panel that appears on click
</details>

To make this concrete, here is how a handful of concepts from this book split across the two label types:

| Concept | Preferred Label | Example Alternate Labels |
|---------|-----------------|---------------------------|
| The absence of cycles in a graph | Directed Acyclic Graph (DAG) | DAG |
| A vocabulary standard for taxonomies | SKOS | Simple Knowledge Organization System |
| A group of densely connected nodes | Cluster | Community |
| A learning graph as a whole | Learning Graph | Concept Dependency Graph |

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Every alternate label is a promise that the graph keeps for the reader: "however you know this idea, we'll get you to the same node." Break that promise — by silently creating a second node for a synonym — and you've fragmented one concept's dependency edges across two nodes, which is one of the most common integrity bugs in a hand-built learning graph.

## Writing a Concept Definition

A label tells a reader what to call a concept; a **Concept Definition** tells them what the concept actually *means*. Chapter 1's glossary already follows a specific quality standard for this — the same standard professional metadata registries use — so it is worth stating explicitly here rather than leaving it implicit.

A definition is considered well-formed when it satisfies five criteria:

1. **Precise** — states exactly what the concept is, with no vague hedging
2. **Concise** — as short as it can be while remaining complete
3. **Distinct** — could not be mistaken for the definition of a neighboring concept
4. **Non-circular** — never uses the term being defined (or a close variant of it) inside its own definition
5. **Unencumbered with business rules** — describes what the concept *is*, not how a particular organization happens to use it today

These five criteria come directly from the standard covered next, ISO/IEC 11179, but they are useful on their own even before you know the standard's name. A quick test: if you can swap two concepts' definitions and neither one reads as obviously wrong, at least one of the two definitions has failed the "distinct" criterion.

## SKOS: A Standard for Labels and Vocabularies

Once a graph has hundreds of concepts, each with a preferred label, alternate labels, and a definition, that collection of label data becomes a dataset in its own right — one worth storing in a standard, exchangeable format rather than a project-specific spreadsheet. **SKOS** (Simple Knowledge Organization System) is a W3C standard for representing exactly this kind of structured vocabulary in a machine-readable way, so that taxonomies, thesauri, and controlled vocabularies built by different tools and different teams can be shared and combined.

SKOS gives every concept a small, standard set of properties: `skos:prefLabel` for the preferred label, `skos:altLabel` for each alternate label, and hierarchical relationship properties — `skos:broader` and `skos:narrower` — for organizing concepts into general-to-specific hierarchies, plus `skos:related` for concepts that are associated but not hierarchically nested.

Before looking at the diagram, hold on to one distinction: `skos:broader`/`skos:narrower` describe a *classification* hierarchy (is this concept a kind of that one?), which is a different relationship from the *dependency* edges you learned about in Chapter 1 (must this concept be learned before that one?). A concept can be broader than another without being a prerequisite for it at all.

#### Diagram: SKOS Relationship Map

<iframe src="../../sims/skos-relationship-map/main.html" width="100%" height="562px" scrolling="no"></iframe>

<details markdown="1">
<summary>SKOS Relationship Map</summary>
Type: graph-model
**sim-id:** skos-relationship-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Show how SKOS represents a small vocabulary using prefLabel, altLabel, broader, narrower, and related properties, and contrast this classification hierarchy with the dependency edges from Chapter 1.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare

Node types:
1. SKOS concept node (blue circle) — displays its `skos:prefLabel`
2. Alternate label chip (small gray tag attached to a node) — displays a `skos:altLabel`

Edge types:
1. `skos:broader` (solid blue arrow, pointing from narrower to broader concept)
2. `skos:narrower` (rendered as the reverse view of the same edge, toggle-able)
3. `skos:related` (dotted purple line, no direction)

Sample data:
- "Graph" (broader) → "Directed Graph" (narrower) → "Directed Acyclic Graph (DAG)" (narrower)
- "Directed Acyclic Graph (DAG)" — altLabel chip: "DAG"
- "Learning Graph" — skos:related — "Concept Dependency Graph" (dotted line, both are near-synonyms in this book's usage)

Interactive features:
- Click any node: infobox shows its full SKOS record (prefLabel, altLabels, broader concept, narrower concepts, related concepts)
- Toggle button: "Show as Classification Hierarchy" vs "Show as Dependency Graph" — switching views re-lays-out the same three DAG-related nodes as a Chapter-1-style dependency graph and displays a caption explaining that broader/narrower and depends-on are different relationships that happen to look similar as diagrams
- Hover an edge: tooltip states the relationship in plain language, e.g. "DAG is a narrower (more specific) kind of Directed Graph"

Color scheme: blue for concept nodes and broader/narrower edges, purple dotted for related, gray for label chips

Implementation: vis-network JavaScript library, two saved layout configurations swapped via the toggle button
</details>

!!! mascot-warning "Common Mistake"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Don't reach for SKOS to encode "must be learned before." SKOS's `broader`/`narrower` properties model classification, not prerequisite order. As the glossary for this book notes, SKOS is ideal for storing taxonomies and controlled vocabularies — the dependency edges that drive learning sequence belong in the concept dependency graph format from Chapter 1, not in a SKOS hierarchy.

A **Controlled Vocabulary** is the broader practice SKOS was built to support: a fixed, curated set of preferred labels and their approved alternates for a domain, maintained so that everyone contributing to a shared graph draws from the same list of names instead of inventing new synonyms independently. Where SKOS is the *file format*, a controlled vocabulary is the *governance discipline* — deciding, in advance, which label wins when two contributors propose different names for the same idea.

## Metadata Standards Beyond the Concept: ISO/IEC 11179 and Dublin Core

SKOS and controlled vocabularies operate at the level of an individual concept and its labels. Two further standards operate one level up: they govern how the *fields themselves* — the definition, the resource description, the publication data — are structured, regardless of subject matter.

**ISO/IEC 11179** is an international standard for metadata registries — repositories that store precise, reusable definitions of data elements. It is the source of the five-criteria definition test introduced earlier in this chapter (precise, concise, distinct, non-circular, unencumbered with business rules). When a concept definition in this book's glossary follows those five rules, it is following ISO/IEC 11179 practice, whether or not the term itself is ever mentioned to the reader.

**Dublin Core Metadata** operates at a different scope entirely: instead of describing a single concept, it describes an entire *resource* — a book, a chapter, a video, a dataset — using a standardized set of 15 elements (Title, Creator, Subject, Description, Publisher, Contributor, Date, Type, Format, Identifier, Source, Language, Relation, Coverage, and Rights). A learning graph file itself is a resource, and tagging it with Dublin Core fields makes the graph discoverable and citable the same way a library catalog entry makes a book discoverable.

| Standard | Operates On | Typical Question It Answers |
|----------|-------------|------------------------------|
| ISO/IEC 11179 | A single concept's definition | "Is this definition precise, distinct, and non-circular?" |
| Dublin Core Metadata | An entire resource (book, chapter, dataset) | "Who created this, when, and what is it about?" |
| SKOS | A vocabulary of concept labels | "What is this concept's preferred label, and how does it relate to others?" |

#### Diagram: Dublin Core Metadata Explorer

<iframe src="../../sims/dublin-core-metadata-explorer/main.html" width="100%" height="642px" scrolling="no"></iframe>

<details markdown="1">
<summary>Dublin Core Metadata Explorer</summary>
Type: infographic
**sim-id:** dublin-core-metadata-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners explore all 15 Dublin Core elements and see a realistic example value for each, using this textbook's own learning graph file as the running example.

Bloom Level: Remember (L1)
Bloom Verb: identify, recall

Layout: 15 tiles arranged in a 5-column by 3-row responsive grid, one tile per Dublin Core element

Tile labels (element name shown on each tile face):
Title, Creator, Subject, Description, Publisher, Contributor, Date, Type, Format, Identifier, Source, Language, Relation, Coverage, Rights

Interactive features:
- Click a tile: it flips (or expands below the grid) to reveal a one-sentence definition of the element plus an example value drawn from this book's own learning-graph.json record, e.g.:
  - Title → "Learning Graphs: The Key to Intelligent Textbooks"
  - Creator → "Dan McCreary"
  - Subject → "Concept Dependency Graphs, Intelligent Textbooks"
  - Date → publication date of the current learning graph revision
  - Format → "application/json"
- Progress indicator: small counter in the corner ("6 of 15 explored") that increments the first time each tile is flipped, encouraging learners to explore all 15 before moving on
- Hover a tile before clicking: subtle highlight to show it is interactive

Color scheme: 15 tiles in a single accent color family (blues), flipped/explored tiles shown with a checkmark badge

Responsive behavior: grid reflows to 3 columns by 5 rows on narrow viewports

Implementation: HTML/CSS/JavaScript grid with a flip-card interaction; state (which tiles explored) held in page memory, not persisted
</details>

## From Concept Label to Textbook Index

Everything in this chapter converges on a practical, very old piece of technology: the back-of-book index. A **Textbook Index** is the alphabetized list, typically found at the end of a book, that maps concept names to the page or section numbers where they are discussed — the original human-built retrieval system, centuries older than any database.

A learning graph turns index generation from manual labor into an automatic byproduct of well-labeled concepts. Because every concept already has a preferred label (the index entry itself), a set of alternate labels (which become "See [preferred label]" cross-references), and a known location in the book (the chapter where it's covered), a complete, cross-referenced index can be generated directly from the graph's label data with no additional authoring.

The following workflow shows that pipeline end to end, from a single concept's label data to its two entries in the finished index.

#### Diagram: From Concept to Index Entry

<iframe src="../../sims/concept-to-index-workflow/main.html" width="100%" height="862px" scrolling="no"></iframe>

<details markdown="1">
<summary>From Concept to Index Entry Workflow</summary>
Type: workflow
**sim-id:** concept-to-index-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Show learners how a concept's label data (preferred label, alternate labels, chapter location) is mechanically transformed into textbook index entries, with no manual index-writing step.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, execute

Steps (each is a clickable Mermaid node with a `click` directive opening an infobox):
1. Start: "Concept Record" — hover/click text: "A graph node with a preferred label, alternate labels, a definition, and the chapter(s) where it appears — e.g., preferred label 'Bipartite Graph', alternate label 'Two-Part Graph', chapter 4."
2. Process: "Sort Alphabetically by Preferred Label" — click text: "All preferred labels across the graph are sorted A-to-Z to form the index's primary entries."
3. Process: "Attach Chapter/Page Numbers" — click text: "Each preferred label entry lists every chapter where the concept is covered or referenced."
4. Process: "Generate Cross-References" — click text: "Every alternate label becomes its own alphabetized index line reading 'See [preferred label]', so a reader searching under the synonym still finds the concept."
5. End: "Two-Part Graph, see Bipartite Graph" and "Bipartite Graph .......... 42" — click text: "The finished index contains both the canonical entry and its synonym cross-reference, generated automatically from the same label data."

Visual style: top-to-bottom Mermaid flowchart, rectangles for process steps, rounded ends for start/end

Color coding: gold for the source concept record, blue for processing steps, green for the two generated index lines

Mermaid click directive requirement: every node (Start, three Process nodes, End) must have a `click NodeId call showInfo("...")`-style directive wired to an infobox so the diagram meets this book's interactivity requirement.

Implementation: Mermaid flowchart with JavaScript click callbacks rendering definitions in a side infobox
</details>

!!! mascot-encourage "This is easier than it looks"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    You've just covered five vocabulary-heavy standards in one chapter — SKOS, ISO/IEC 11179, Dublin Core, controlled vocabularies, and the preferred/alternate label split. Most learners feel the term count pile up faster than the ideas feel like they should. Here's the shortcut: you only ever need to ask "does this describe a single concept's name, a single concept's definition, or a whole resource's publication data?" That one question sorts every term in this chapter into its right bucket.

## Key Takeaways

The ten concepts in this chapter split cleanly into three layers, each answering a different question about a concept record.

| Layer | Concepts | Question Answered |
|-------|----------|--------------------|
| Naming | Concept Label, Named Concept, Preferred Label, Alternate Label | What do we call this concept, and are there other names for it? |
| Meaning | Concept Definition, ISO/IEC 11179 | What does this concept actually mean, precisely and without circularity? |
| Organization & Discovery | SKOS, Controlled Vocabulary, Dublin Core Metadata, Textbook Index | How do we store, share, and let readers find concepts and the resources built around them? |

With every concept in the graph properly named, defined, and cataloged, the next chapter turns from a single node's record to the relationships between nodes — how one concept's prerequisite dependencies on another are modeled, validated, and kept free of contradictions.

!!! mascot-celebration "Nicely done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now give any concept in a learning graph a proper name, a rigorous definition, and a place in a standardized vocabulary — the same discipline professional catalogers apply to entire libraries. Pause and appreciate your progress before we move on to dependencies.

[See Annotated References](./references.md)
