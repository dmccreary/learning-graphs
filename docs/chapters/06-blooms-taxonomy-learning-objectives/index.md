---
title: Bloom's Taxonomy and Learning Objectives
description: The six cognitive-domain levels of the 2001 revised Bloom's Taxonomy — remembering, understanding, applying, analyzing, evaluating, and creating — plus the affective and psychomotor domains, and how they combine to produce measurable learning objectives.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 09:59:22
version: 0.09
---

# Bloom's Taxonomy and Learning Objectives

## Summary

Introduces the six cognitive-domain levels of the 2001 revised Bloom's Taxonomy — remembering, understanding, applying, analyzing, evaluating, and creating — along with the affective and psychomotor domains. Shows how learning objectives are written against these levels to frame measurable outcomes.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Bloom's Taxonomy
2. Cognitive Domain
3. Affective Domain
4. Psychomotor Domain
5. Remembering
6. Understanding
7. Applying
8. Analyzing
9. Evaluating
10. Creating
11. Learning Objective

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Learning Graph Quality, Validation, and File Formats](../05-graph-quality-validation-file-formats/index.md)

---

!!! mascot-welcome "Welcome back!"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! The first five chapters gave you the machinery of a learning graph — concepts, dependency edges, taxonomies, and the validation checks that certify a graph is well-formed. This chapter asks a different question: once a graph is valid, how do you know a concept has actually been *learned*? The answer comes from a piece of vocabulary that has been quietly waiting in the background since Chapter 1 — every node in a learning graph implies a level of mastery, and Bloom's Taxonomy is the vocabulary for naming that level precisely.

Every concept node you have seen so far — "Node," "Cycle Detection," "JSON Schema" — carries an unstated question: what does it mean to *know* that concept? Simply recalling its definition is a much lower bar than being able to design a new graph that uses it correctly. Bloom's Taxonomy gives course designers a shared, precise vocabulary for that distinction, and this chapter shows how that vocabulary attaches directly to the concept dependency graphs you have already built.

## Bloom's Taxonomy: A Vocabulary for Depth of Learning

**Bloom's Taxonomy** is a hierarchical classification framework for educational learning objectives, originally published in 1956 and revised in 2001, that organizes learning into three domains and, within the most commonly used domain, six levels of increasing cognitive complexity. In the learning graph you validated in Chapter 5, Bloom's Taxonomy has zero prerequisites — it is a foundational concept in its own right, one that this book's course description has referenced since its own Learning Outcomes section.

The original 1956 framework, led by educational psychologist Benjamin Bloom, used verbs like "knowledge" and "comprehension" for its lowest levels. A 2001 revision — the version this chapter and this entire book use — renamed those levels as active verbs (Remembering, Understanding) rather than static nouns, and swapped the order of the top two levels so that Creating, not Evaluating, sits at the peak. That shift in verb form is not cosmetic: it reflects a deliberate emphasis on what a learner *does* with knowledge, not just what they passively hold in memory.

Bloom's original framework actually spans three separate domains of learning, not one. Before looking at how they divide the work, it helps to name what a "domain" means in this context: a broad category of human capability that learning objectives can target, distinct from the specific concepts a course covers.

- **Cognitive Domain** — thinking and knowledge-based mental skills (the domain this chapter spends most of its time on)
- **Affective Domain** — attitudes, values, and emotional responses to learning
- **Psychomotor Domain** — physical, hands-on skills and motor coordination

Because this book's learning graph is built almost entirely from mental-skill concepts — nodes, edges, taxonomies, JSON schemas — nearly every learning objective in this course lives in the cognitive domain. But a well-rounded course description, including this book's own, occasionally reaches into the other two domains, and a course designer needs to recognize when that happens.

## The Three Domains: Thinking, Feeling, Doing

Each of the three domains listed above depends directly on Bloom's Taxonomy in the learning graph, and each answers a different question about what a learner should be able to do.

**Cognitive Domain** is the branch of Bloom's Taxonomy concerned with mental skills — recalling facts, building understanding, and reasoning about relationships between concepts. This is the domain that produces the six-level hierarchy the rest of this chapter covers in depth, and it is the domain that maps most directly onto a concept dependency graph, since every node you have modeled since Chapter 1 represents a piece of knowledge or a skill a learner comes to hold in mind.

**Affective Domain** is the branch of Bloom's Taxonomy concerned with attitudes, values, motivation, and emotional responses — how a learner comes to *care about* a subject, not just know facts about it. A cognitive-domain objective might state "the learner can define a directed acyclic graph"; an affective-domain objective for the same course might state "the learner values rigorous graph validation over shipping an unverified learning graph quickly." Affective objectives are harder to measure than cognitive ones, but they matter — a course designer who never states them is implicitly assuming motivation takes care of itself.

**Psychomotor Domain** is the branch of Bloom's Taxonomy concerned with physical movement, coordination, and hands-on manual or technical skill — the domain most associated with fields like surgery, athletics, musical performance, or skilled trades. A course on configuring vis-network's physics settings has almost no psychomotor content; a course on soldering a circuit board or performing a physical examination has a great deal. Naming this domain even in a course with little psychomotor content is useful, because it forces a course designer to confirm the absence deliberately rather than by oversight.

Before comparing the three domains side by side, note that this book's course description — like most professional-skills courses — concentrates its Learning Outcomes almost entirely in the cognitive domain, with only light touches of the affective domain (for example, valuing third-party certification over self-reported validation, from Chapter 5).

| Domain | Core Question | Example from This Book |
|---|---|---|
| Cognitive | What can the learner think through or explain? | Explain why a DAG, not a linear table of contents, sequences prerequisites |
| Affective | What does the learner value or feel motivated toward? | Value independent certification over self-reported quality metrics |
| Psychomotor | What can the learner physically perform? | (Largely absent from this course — no hands-on manual skill required) |

## The Cognitive Domain's Six Levels

The remaining six concepts in this chapter's list — Remembering, Understanding, Applying, Analyzing, Evaluating, and Creating — are all children of Cognitive Domain in the learning graph, and together they form the taxonomy's best-known structure: a six-level hierarchy, usually drawn as a pyramid, running from simple recall at the base to original synthesis at the peak.

Before examining the pyramid, it is worth stating the hierarchy's core claim plainly: each level generally requires competence at the levels below it. A learner cannot meaningfully *analyze* a learning graph's dependency structure without first *understanding* what a dependency edge means, and cannot *understand* an edge without first being able to *remember* that edges point from dependent to prerequisite. The hierarchy is not strict in every case — real learning is messier than any pyramid — but it is a reliable design heuristic for sequencing objectives within a single concept.

#### Diagram: Bloom's Taxonomy Pyramid Explorer

<iframe src="../../sims/blooms-pyramid-explorer/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Bloom's Taxonomy Pyramid Explorer</summary>
Type: infographic
**sim-id:** blooms-pyramid-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Give learners a persistent, clickable reference for the six cognitive-domain levels, their defining verbs, and one worked example per level drawn from this book's own concept list, before the chapter defines each level in prose.

Bloom Level: Remember (L1)
Bloom Verb: identify, recall, name

Learning objective: Given the six-level pyramid, the learner can click each level and correctly recall its name, its position in the hierarchy, and at least two associated action verbs.

Visual elements:
- A six-tier pyramid, widest at the bottom, drawn with p5.js `beginShape()`/`vertex()` trapezoids
- Bottom to top: Remembering, Understanding, Applying, Analyzing, Evaluating, Creating
- Each tier shaded a different color along a single blue-to-gold gradient (blue at the base, gold at the peak) to visually reinforce "increasing complexity" without implying one level is more "correct" than another
- Each tier labeled with its level name and level number (L1–L6) in bold

Interactive controls:
- Click any tier: an infobox to the right of the pyramid displays the level's full definition, its list of Bloom Verbs (e.g., Understanding shows "explain, summarize, interpret, classify, compare, contrast, exemplify, infer"), and one example objective written against a concept from this book (e.g., Analyzing shows "Differentiate a structural check from a coverage check")
- Hover any tier: tier highlights with a lighter shade and a tooltip shows just the level name and number
- Button: "Reset View" — clears the selected infobox

Default state: no tier selected, infobox shows prompt text "Click a level to see its verbs and an example"

Responsive behavior: canvas and pyramid redraw proportionally on window resize using p5.js `windowResized()`; infobox panel stacks below the pyramid on narrow viewports rather than beside it

Canvas size: responsive, 100% width, 560px height, minimum 600px internal drawing width before infobox reflows below

Implementation: p5.js for pyramid rendering and click hit-testing against tier boundaries; infobox rendered as an HTML div positioned via CSS flexbox next to the canvas
</details>

With the pyramid as a standing reference, the next six sections define each level in the order a learner actually climbs it — starting with the simplest kind of knowing.

### Remembering: The Foundation

**Remembering** is the cognitive-domain level at which a learner retrieves, recognizes, or recalls relevant facts, terms, and basic concepts from long-term memory, without necessarily understanding what they mean or how they relate to anything else. This is the level a flash card tests: can you state that an edge in this book's JSON format points from `from` to `to`, without being asked to explain why that direction matters?

Remembering-level objectives typically use verbs like **list, define, recall, identify, name, recognize, locate,** and **describe**. A remembering-level objective from this book's own course description reads: "Recall the six levels of the 2001 revised Bloom's Taxonomy and their associated action verbs" — notice that the objective itself is written at the very level it names, asking only for recall, not explanation.

### Understanding: Constructing Meaning

**Understanding** is the cognitive-domain level at which a learner constructs meaning from instructional material — explaining ideas in their own words, summarizing a passage, or interpreting a diagram — demonstrating comprehension beyond rote recall. Where remembering asks "what is the edge-direction rule?", understanding asks "why does that rule matter, and can you restate it in your own words?"

Understanding-level objectives typically use verbs like **explain, summarize, interpret, classify, compare, contrast, exemplify,** and **infer**. A learner operating at this level, given a new vis-network JSON snippet they have never seen, could correctly explain in plain language what each edge means — not just recite the rule about `from` and `to`, but apply it to interpret a specific, unfamiliar example.

### Applying: Using Knowledge in New Situations

**Applying** is the cognitive-domain level at which a learner uses acquired knowledge or a learned procedure to solve problems in new or unfamiliar situations — carrying out a method, not just describing it. This is the first level in the hierarchy that typically requires the learner to *produce* something rather than only explain or interpret.

Applying-level objectives typically use verbs like **use, execute, implement, solve, demonstrate, calculate, apply,** and **practice**. This book's course description shows exactly this level in action: "Construct a concept dependency CSV file that models prerequisite relationships between concepts" asks a learner to take the CSV format defined in Chapter 5 and apply it to a brand-new set of concepts they choose themselves.

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the jump between Understanding and Applying: explaining a rule and using that rule under pressure, on new data, are genuinely different skills. Most learners stumble here — they can recite the edge-direction rule perfectly on a quiz, then still write `prereqs[edge['to']].add(edge['from'])` by accident in real code, exactly the inverted-dependency bug Chapter 5 warned about. That gap is precisely why Applying gets its own level instead of being folded into Understanding.

### Analyzing: Examining Structure and Relationships

**Analyzing** is the cognitive-domain level at which a learner breaks material into its constituent parts to understand its structure and relationships, examining how those parts connect to one another and to an overall purpose. Analysis is where the vocabulary of this book's own Chapter 5 lives most naturally: differentiating a structural check from a coverage check, or comparing force-directed against hierarchical graph layouts, both require pulling something apart to see how its pieces relate.

Analyzing-level objectives typically use verbs like **differentiate, organize, attribute, compare, contrast, examine, deconstruct,** and **distinguish**. Note that "compare" and "contrast" appear at both the Understanding and Analyzing levels in Bloom's verb lists — the distinguishing factor is depth: comparing two things at the Understanding level might mean listing similarities and differences you were told about, while comparing them at the Analyzing level means discovering the structural reasons those differences exist.

### Evaluating: Making Justified Judgments

**Evaluating** is the cognitive-domain level at which a learner makes judgments about the value, quality, or validity of information based on defined criteria or standards, requiring critical thinking and a defensible justification for the judgment reached. This is a higher bar than Analyzing: analysis identifies what the parts are and how they relate, while evaluation goes further and asks whether those parts are *good* by some named standard.

Evaluating-level objectives typically use verbs like **judge, critique, assess, justify, prioritize, recommend, validate,** and **defend**. This book's course description again supplies a direct example: "Critique a learning graph's dependency structure for logical gaps or unjustified prerequisite claims" requires more than spotting a missing edge — it requires justifying, against a standard of "logical soundness," why that gap is actually a problem worth fixing.

### Creating: Producing Original Work

**Creating** is the cognitive-domain level at which a learner produces new or original work by combining elements into a novel whole — designing, composing, or inventing a solution that did not exist in that specific form before the learner made it. This sits at the pyramid's peak in the 2001 revision, above Evaluating, reflecting the judgment that synthesizing something original draws on every level beneath it: you must remember relevant facts, understand principles, apply procedures, analyze structure, and evaluate trade-offs, all in service of producing something new.

Creating-level objectives typically use verbs like **design, construct, develop, formulate, compose, produce, invent,** and **generate**. This book's course description states its own Creating-level capstone directly: "Produce a complete learning graph (concept list, dependency graph, taxonomy, and validated JSON) for an intelligent textbook in the student's own professional domain" — a task that draws on all five earlier levels but is graded on the original, working artifact the learner ultimately builds.

Having walked the pyramid from base to peak, it is useful to see all six levels side by side, along with their verb families and one worked example per level drawn from this book's own material.

| Level | Core Question | Sample Verbs | Example From This Book |
|---|---|---|---|
| Remembering | What can you recall? | list, define, recall, identify | Recall the six Bloom's Taxonomy levels |
| Understanding | Can you explain it? | explain, summarize, interpret, classify | Explain why a DAG sequences prerequisites |
| Applying | Can you use it on something new? | use, execute, implement, solve | Construct a dependency CSV for new concepts |
| Analyzing | How do the parts relate? | differentiate, compare, examine, distinguish | Differentiate a structural check from a coverage check |
| Evaluating | Is it any good, and why? | judge, critique, assess, justify | Critique a graph's dependency structure for gaps |
| Creating | Can you build something new? | design, construct, develop, generate | Produce a validated learning graph for a new domain |

## Learning Objective: Where the Taxonomy Meets the Course

Every concept and every Bloom level defined so far in this chapter exists to serve one final, practical purpose: writing statements that tell a learner, precisely, what they will be able to do. A **Learning Objective** is a specific, measurable statement of what a learner will be able to do after instruction, typically written by pairing a Bloom Verb from a chosen taxonomy level with a concept from the learning graph. In the learning graph itself, Learning Objective depends directly on Bloom's Taxonomy — you cannot write a well-formed objective without first knowing which level you intend to target.

The formula is deliberately simple: a Bloom Verb plus a concept node produces a testable objective. "Recall" plus "the edge-direction rule" produces a Remembering-level objective. "Critique" plus "a learning graph's dependency structure" produces an Evaluating-level objective. This is exactly the pattern this book's own course description follows throughout its Learning Outcomes section — and, not coincidentally, the same pattern every `<details markdown="1">` diagram specification in this book has been quietly following since Chapter 1, each one stating its own Bloom Level and Bloom Verb before describing what the learner does.

!!! mascot-tip "Try This"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you write a learning objective for your own course, resist the urge to reach for "understand" as a default verb — it is vague and hard to measure. Ask instead: what would a learner physically do to prove this? Write a CSV row? Critique a dependency chain? Design a new graph? Pick the verb that names that action, and the correct Bloom level follows automatically.

A single concept node in a learning graph is rarely tied to just one learning objective. A concept like "Cycle Detection" from Chapter 5 could reasonably support a Remembering-level objective ("define cycle detection"), an Applying-level objective ("implement a depth-first-search cycle check"), and an Evaluating-level objective ("assess whether a given cycle-detection result is trustworthy") all at once, depending on which chapter or assessment is targeting it. This is why a mature intelligent textbook pipeline does not store just one Bloom level per node — it stores the full set of objectives an author has written against that node, each tagged with its own level.

The interactive builder below lets you practice constructing a well-formed learning objective from scratch, using exactly this Bloom-Verb-plus-concept formula, before checking your work against the taxonomy's own criteria.

#### Diagram: Learning Objective Builder

<iframe src="../../sims/learning-objective-builder/main.html" width="100%" height="542px" scrolling="no"></iframe>

<details markdown="1">
<summary>Learning Objective Builder</summary>
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
</details>

## How Bloom Levels Attach to a Learning Graph

Stepping back from any single objective, it is worth connecting this chapter's vocabulary explicitly to the graph structures built in Chapters 1 through 5. A concept dependency graph tells you *what order* concepts must be learned in; Bloom's Taxonomy tells you *how deeply* each concept must be known at a given point in a course. The two are complementary, not competing, layers of the same design problem.

In practice, a course designer typically assigns a target Bloom level to each concept node — often the same level implied by the verb used in that concept's chapter objectives — and that assignment becomes metadata the graph can carry alongside a node's `id`, `label`, and `group` fields from Chapter 5's JSON format. A foundational concept early in the graph (low out-degree, high indegree, in Chapter 5's vocabulary) is frequently targeted only at the Remembering or Understanding level within a given chapter, while a goal concept near the end of a course is more often targeted at Analyzing, Evaluating, or Creating — exactly the pattern this book's own course description follows, reserving its capstone Create-level outcome for the very last item in its Learning Outcomes section.

This is also precisely why every `<details markdown="1">` diagram specification throughout this book states a Bloom Level and Bloom Verb before describing the diagram's mechanics: the interaction pattern that makes a good MicroSim differs by level. A Remembering-level objective is well served by flash cards or labeling exercises; an Applying-level objective calls for a parameter explorer or calculator; a Creating-level objective calls for an open-ended builder like the one earlier in this chapter. Choosing the wrong interaction pattern for a level — animating a concept a learner is only meant to recall, for instance — wastes both design effort and the learner's attention.

!!! mascot-encourage "This vocabulary sticks with practice"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Six levels and three domains in one chapter is a lot of new vocabulary at once — if the verb lists blur together on a first pass, that is completely normal. Most learners stumble on Analyzing versus Evaluating specifically, since both involve close scrutiny; the reliable test is whether the objective asks you to describe structure (Analyze) or to render a judgment against a standard (Evaluate). That distinction gets easier every time you write a new objective.

## Chapter Summary

This chapter connected the concept dependency graphs built in Chapters 1 through 5 to the vocabulary course designers use for describing depth of learning. The path traced three domains, then the cognitive domain's six levels in order, then the practical skill of composing a learning objective from a Bloom Verb and a concept node.

1. **Bloom's Taxonomy** organizes learning objectives into three domains and, within the cognitive domain, six levels of increasing complexity
2. The **Cognitive Domain**, **Affective Domain**, and **Psychomotor Domain** cover thinking, feeling/valuing, and physical doing respectively
3. Within the cognitive domain, **Remembering** (recall), **Understanding** (explain), **Applying** (use in new situations), **Analyzing** (examine structure), **Evaluating** (judge against criteria), and **Creating** (produce original work) form a hierarchy from simple to complex
4. Each level has its own family of Bloom Verbs, and pairing a verb with a concept node from a learning graph produces a **Learning Objective** — a specific, measurable statement of what a learner will be able to do
5. Bloom levels are not decoration on a learning graph; they are metadata that determines which interaction pattern — flash card, calculator, network explorer, or open-ended builder — best serves a given concept at a given point in a course

!!! mascot-celebration "Well done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you now have the vocabulary to look at any concept in a learning graph and ask a sharper question than "is this covered?": *at what level* is it covered, and is that the right level for where this concept sits in the course? That question is exactly what turns a validated graph into a genuinely well-designed course. Let's connect the concepts — next, we return to the graph theory underneath everything you've learned so far: traversal, search, and dependency analysis, the algorithms that make every check and every objective in this book possible.

[See Annotated References](./references.md)
