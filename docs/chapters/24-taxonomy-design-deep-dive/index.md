---
title: Taxonomy Design Deep Dive
description: Extends Chapter 4's taxonomy basics into classification-scheme design, category-balance metrics, polyhierarchy, and the ontology vocabulary (classes, properties, semantic types) that gives a taxonomy formal rigor.
generated_by: claude skill chapter-content-generator
date: 2026-07-15 00:00:00
version: 0.09
---

# Taxonomy Design Deep Dive

## Summary

Extends Chapter 4's introduction to concept taxonomies into the formal design vocabulary a taxonomy architect actually uses: classification schemes, category boundaries, and the balance and coverage metrics that keep categories useful rather than arbitrary. Covers polyhierarchy as an alternative to strict single-category assignment, and borrows ontology vocabulary — classes, properties, semantic types — to give taxonomy design the same formal rigor Chapter 22 gave concept labeling. After this chapter, readers can audit a taxonomy for balance and overlap problems and decide when a strict single-category scheme is the wrong choice.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Classification Scheme
2. Exclusive Category
3. Category Boundary
4. Polyhierarchy
5. Category Assignment
6. Category Balance
7. Category Coverage
8. Category Overlap
9. Taxonomy Depth
10. Taxonomy Breadth
11. Taxonomy Drift
12. Ontology Class
13. Ontology Property
14. Semantic Type
15. Hierarchical Relation
16. Associative Relation
17. Taxonomy Validation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Concept Taxonomies and Ontologies](../04-concept-taxonomies-ontologies/index.md)
- [Chapter 22: Concept Metadata and Semantic Labeling Standards](../22-concept-metadata-semantic-labeling/index.md)

---

!!! mascot-welcome "A Legend Is Only as Good as Its Categories"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 4 taught you to build a taxonomy with roughly a dozen balanced categories. This chapter asks what "balanced" actually means, whether every concept really belongs to just one category, and how to formally validate a taxonomy the way Chapter 5 taught you to validate a dependency graph. The taxonomy behind this book's own graph viewer legend went through exactly this scrutiny.

## Classification Scheme, Exclusive Category, and Category Boundary

Chapter 4 walked through building a taxonomy without ever naming the general pattern it was an instance of. A **Classification Scheme** is any systematic method for sorting a set of items — here, concepts — into named categories according to consistent, stated criteria. Classification Scheme depends directly on Concept Taxonomy in the learning graph.

The simplest and most common classification scheme requires every item to land in exactly one bucket. An **Exclusive Category** is a taxonomy category designed so that every concept belongs to it or does not — no concept is assigned to more than one exclusive category at a time. Exclusive Category depends directly on Classification Scheme in the learning graph. This project's own 16 taxonomy categories (FOUND, DEPEND, TAXON, and so on) are exclusive categories: every one of the 400 concepts in `learning-graph.csv` carries exactly one `TaxonomyID`.

Making a category exclusive requires deciding, precisely, what does and does not belong inside it. A **Category Boundary** is the specific criterion, stated or implied, that determines whether a given concept belongs in one category rather than another. Category Boundary depends directly on Taxonomy Category in the learning graph. A fuzzy category boundary is what produces the miscategorization disputes a taxonomy review session spends most of its time resolving — is "Prerequisite Frontier" a DEPEND concept or a PERS concept, and which category boundary settles that question?

## Polyhierarchy: When One Category Is Not Enough

Exclusive categories are the default, but not every concept fits neatly into exactly one bucket, and forcing it to can distort a taxonomy's usefulness. **Polyhierarchy** is a classification scheme in which a single concept can legitimately belong to more than one category simultaneously, rather than being forced into exactly one. Polyhierarchy depends directly on Classification Scheme in the learning graph — it is the direct alternative to Exclusive Category, chosen when a domain's concepts genuinely cross category lines.

!!! mascot-thinking "This Book's Own Taxonomy Chose Exclusivity on Purpose"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A vis-network legend can only assign one fill color per node, so this project's graph viewer requires exclusive categories to render correctly — a polyhierarchical scheme would need a different visualization approach (overlapping shaded regions, or multiple small color tags per node) to display cleanly. Polyhierarchy is a legitimate design choice for many taxonomies; it was deliberately avoided here for a concrete rendering reason, not because exclusivity is always superior.

Once a scheme's exclusivity policy is settled, the practical work of sorting begins. **Category Assignment** is the act of placing a specific concept into one or more categories, applying a classification scheme's category boundaries to a real concept rather than defining the boundaries in the abstract. Category Assignment depends directly on Concept-to-Taxonomy Mapping in the learning graph.

## Category Balance, Category Coverage, and Category Overlap

Chapter 4 already introduced the 30%-ceiling rule informally; this chapter names the three metrics a taxonomy reviewer actually checks. **Category Balance** is a quantitative measure of how evenly concepts are distributed across a taxonomy's categories, typically expressed as each category's percentage share of the total concept count. Category Balance depends directly on Balanced Taxonomy in the learning graph. This project's own extended taxonomy — now covering 400 concepts across 16 categories — has a largest category (Concept Graph Foundations) at just 15.2%, comfortably inside the healthy range Chapter 4's 30% ceiling defines.

Balance describes distribution across existing categories; a separate question is whether the categories, together, actually account for every concept. **Category Coverage** is the extent to which a taxonomy's categories, taken together, account for every concept in the graph without leaving any concept uncategorized or forced into an ill-fitting "miscellaneous" bucket. Category Coverage depends directly on Miscellaneous Category in the learning graph — a taxonomy with strong coverage needs little or no miscellaneous bucket at all, because well-designed categories absorb what would otherwise be leftover concepts.

A third, subtler problem arises even in a scheme that is nominally exclusive. **Category Overlap** is the degree to which two or more categories' boundaries are ambiguous enough that a meaningful number of concepts could plausibly be assigned to either one. Category Overlap depends directly on Category Boundary in the learning graph. Overlap is a design smell even in an exclusive scheme — it signals that two categories should either be merged or given sharper, non-overlapping boundaries.

| Metric | Question It Answers |
|---|---|
| Category Balance | Are concepts spread evenly, or does one category dominate? |
| Category Coverage | Does every concept have a genuine home, or do many fall into "miscellaneous"? |
| Category Overlap | Are category boundaries sharp, or do concepts plausibly fit more than one? |

## Taxonomy Depth, Taxonomy Breadth, and Taxonomy Drift

Beyond the flat 16-category scheme this project uses, taxonomies in general can be shaped along two independent dimensions. **Taxonomy Depth** is how many levels of hierarchy a taxonomy nests categories into — a flat, one-level taxonomy like this project's has a depth of one, while a taxonomy with categories, subcategories, and sub-subcategories has a depth of three or more. Taxonomy Depth depends directly on Concept Taxonomy in the learning graph. **Taxonomy Breadth** is how many sibling categories exist at a given level of the hierarchy — a wide taxonomy has many categories at the top level; a narrow one has few. Taxonomy Breadth depends directly on Concept Taxonomy in the learning graph.

!!! mascot-tip "Depth and Breadth Trade Off Against Each Other"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A taxonomy with 16 flat categories, like this project's, chose breadth over depth — every category sits at the same level, easy to scan in a sidebar legend. A deeper alternative might nest "Vis.js Fundamentals," "Graph Layout," and "Graph Clustering" under one parent category "Visualization," trading a shorter top-level list for an extra click to reach any specific category. Neither choice is objectively better; it depends on how many total categories a taxonomy needs to stay legible.

Even a well-designed taxonomy is not static once concepts start getting added over time — this book's own graph is a working example. **Taxonomy Drift** is the gradual degradation of a taxonomy's balance, coverage, or boundary clarity as new concepts are added without revisiting the original category design. Taxonomy Drift depends on Balanced Taxonomy and Concept Taxonomy in the learning graph. When this book's own concept list grew from 266 to 400 concepts, every one of the 134 new concepts was checked against the *existing* 16 categories before any new category was considered — precisely the discipline that prevents drift, since adding new categories reflexively for every batch of new concepts is what fragments a taxonomy over time.

## Ontology Class, Ontology Property, and Semantic Type

A taxonomy sorts concepts into categories; an ontology goes one step further and formally defines what those categories and their concepts actually *are* and *can have*. An **Ontology Class** is a formally defined category within an ontology, representing a type of thing rather than a specific individual instance — "Learning Graph" as an ontology class describes the type, distinct from any one specific learning graph. Ontology Class depends directly on Ontology in the learning graph. An **Ontology Property** is a formally defined attribute or relationship type that instances of an ontology class can carry — "hasTaxonomyID" or "dependsOn" would each be an ontology property. Ontology Property depends directly on Ontology in the learning graph.

A related but narrower idea names the specific *kind* of value a concept or property can take. A **Semantic Type** is a formally defined category describing what kind of thing a value represents — distinguishing, for instance, a value that is a concept identifier from one that is a color name or a date. Semantic Type depends directly on Ontology Class in the learning graph.

## Hierarchical Relation and Associative Relation

Chapter 22 already named SKOS's three specific relation types — broader, narrower, related. This chapter groups them into the two general families a taxonomy or ontology designer thinks in. A **Hierarchical Relation** is any relationship expressing that one concept or category is more general or more specific than another — SKOS's broader and narrower relations are both hierarchical relations. Hierarchical Relation depends on SKOS Broader Relation and SKOS Narrower Relation in the learning graph. An **Associative Relation** is any relationship expressing a meaningful connection between two concepts without implying either is more general or more specific — SKOS's related relation is an associative relation. Associative Relation depends directly on SKOS Related Relation in the learning graph.

## Taxonomy Validation

Chapter 5 gave a dependency graph a full suite of structural checks. This chapter's closing concept gives a taxonomy the equivalent treatment. **Taxonomy Validation** is the process of systematically checking a taxonomy against the quality criteria this chapter has named — balance, coverage, overlap, and boundary clarity — before considering the taxonomy complete. Taxonomy Validation depends on Concept Taxonomy and Learning Graph Validation in the learning graph.

!!! mascot-warning "Taxonomy Validation Is Not the Same Check as Graph Validation"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A graph can pass every one of Chapter 5's structural checks — valid DAG, no orphans, fully connected — while still having a taxonomy with one category holding 60% of all concepts, three categories with unclear boundaries, and a miscellaneous bucket absorbing 10% of the graph. Structural validity and taxonomy quality are independent checks; passing one says nothing about the other.

#### Diagram: Category Balance and Overlap Auditor


<iframe src="../../sims/category-balance-overlap-auditor/main.html" width="100%" height="562px" scrolling="no"></iframe>
[Run Category Balance and Overlap Auditor Fullscreen](../../sims/category-balance-overlap-auditor/main.html)

<details markdown="1">
<summary>Category Balance and Overlap Auditor</summary>
Type: microsim
**sim-id:** category-balance-overlap-auditor<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Purpose: Let learners inspect a sample 12-category taxonomy's balance as a bar chart, then click into a pair of visually similar categories to see a worked example of category overlap and how tightening a boundary resolves it.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, critique, justify

Learning objective: Given a sample 12-category taxonomy with one deliberately over-represented category (38%) and two categories with an ambiguous shared boundary, the learner can identify the balance violation from the bar chart alone and, after inspecting the flagged category pair, propose which single criterion would resolve the overlap.

Canvas layout: a horizontal bar chart (420px tall) showing all 12 categories' concept counts and percentages, sorted descending; an "Inspect Overlap" button that opens a side-by-side comparison panel for the two flagged categories

Visual elements: bars colored gray by default; the over-30%-threshold category highlighted red with a dashed threshold line at 30%; the two overlap-flagged categories outlined gold and clickable; comparison panel lists both categories' stated boundaries and three concepts that plausibly fit either

Interactive controls: hovering any bar shows exact count and percentage; clicking the red bar reveals a text explanation of why 30%+ concentration is a balance problem; clicking "Inspect Overlap" opens the two-category comparison with the three ambiguous concepts listed and a prompt asking the learner to propose a disambiguating criterion, checked against a model answer on submission

Default parameters: chart loads sorted descending by count; overlap panel closed by default

Data Visibility Requirements:
Stage 1: Show only the balance bar chart with the 30% threshold line
Stage 2: On clicking the red bar, reveal the balance-violation explanation
Stage 3: On opening the overlap panel, reveal the three ambiguous concepts and, after the learner submits a proposed criterion, show the model answer's actual disambiguating rule

Instructional Rationale: An Evaluate-level objective requires learners to critique a taxonomy against stated criteria and propose a fix, not just recognize an imbalance visually — the balance chart supports quick pattern recognition, while the overlap-inspection step with a submit-and-compare interaction verifies the learner can propose a workable boundary criterion, not just spot that a problem exists.

Responsive behavior: bar chart switches to vertical bars with rotated labels below 500px width; comparison panel stacks below the chart on narrow screens

Canvas size: responsive, 100% width, 560px height

Implementation: Chart.js horizontal bar chart for the balance view; a small hardcoded dataset (12 categories, their counts, and the two flagged categories' overlapping concept list) drives both the chart and the comparison panel
</details>

## Synthesis: From a Legend to a Governed Classification System

Chapter 4 gave you a working taxonomy. This chapter gave you the vocabulary to defend it: classification-scheme design choices (exclusive versus polyhierarchical), the three metrics — balance, coverage, overlap — that separate a good taxonomy from an arbitrary one, the depth-and-breadth trade-off, drift as a taxonomy ages, and the ontology vocabulary that gives category definitions formal rigor. Chapter 25's automated validators compute Category Balance directly (this project's own `taxonomy-distribution.py` script produces exactly that report), and Chapter 26's data-pipeline internals show precisely how `taxonomy-names.json` and `color-config.json` carry a validated taxonomy's category definitions into the rendered graph viewer.

!!! mascot-celebration "You Can Now Defend a Taxonomy, Not Just Build One"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress. You can now look at a taxonomy and ask the right questions: is this balanced, does every concept have a real home, do any two categories overlap, has this taxonomy drifted since it was first designed? Those are the questions a taxonomy reviewer asks professionally, and they are exactly the questions this project's own 16-category, 400-concept taxonomy had to answer before this chapter existed. Let's connect the concepts — Chapter 25 turns this same critical eye toward the graph's structural and pedagogical validity as a whole.

[See Annotated References](./references.md)
