---
title: Using a Skill to Generate a Learning Graph
description: Walks through the actual agent-skill workflow for turning a course description into a validated learning graph — scoring, concept generation and review, dependency CSV creation, automated quality validation, taxonomy assignment, session logging, and iterative regeneration with human-in-the-loop review.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:47:34
version: 0.09
---

# Using a Skill to Generate a Learning Graph

## Summary

Walks through the actual agent-skill workflow (as implemented in the learning-graph-generator Claude Code skill) for turning a course description into a validated learning graph — scoring the course description, generating and reviewing a concept list, producing a dependency CSV, running automated quality validation, assigning taxonomy, and iterating with human-in-the-loop review before moving on to chapter design. This capstone chapter ties every prior chapter's concepts into one repeatable, automatable pipeline.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Agent Skill
2. Claude Code
3. Skill Invocation
4. Course Description Scoring
5. Concept List Generation
6. Concept List Review
7. Dependency CSV Generation
8. Automated Quality Validation
9. Taxonomy Generation Step
10. Pipeline Session Log
11. Iterative Graph Regeneration
12. Human-in-the-Loop Review

## Prerequisites

This chapter builds on concepts from:

- [Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../18-intelligent-textbooks-microsims-deployment/index.md)

---

!!! mascot-welcome "The Whole Book, Run in Reverse"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Every chapter so far has handed you a finished piece — a validated graph, a taxonomy, a vis.js diagram, a deployed MicroSim — and explained what it is. This last chapter hands you the machine that builds all of them, in order, from nothing but a course description. Eighteen chapters described the parts. This one starts the engine.

Every technique this book has taught — dependencies from Chapters 1–5, learning science from Chapters 6–10, vis.js from Chapters 11–15, personalization and agents from Chapters 16–17, deployment from Chapter 18 — describes a *destination*. This chapter describes the *vehicle*. A Claude Code agent skill named `learning-graph-generator` runs a fixed sequence of steps that takes a course description as input and produces a validated `learning-graph.json` file as output — the same file format that has anchored every diagram spec in this book. This is not a hypothetical workflow: the graph underneath the chapter you are reading was produced by exactly this skill, on this project, earlier today, and this chapter cites its own session log as a worked example throughout.

## Agent Skill, Claude Code, and Skill Invocation: The Machinery That Runs the Pipeline

Chapter 17 introduced the intelligent agent — a system that perceives a goal, plans steps, and takes action using tools rather than simply answering a single prompt. An agent capable of taking action still needs a defined *procedure* to follow when the action is complex and multi-step, rather than reinventing that procedure from scratch every time. An **Agent Skill** is a named, reusable set of instructions — typically written as a structured markdown file — that tells an AI agent exactly what steps to follow, what files to read and write, and what quality checks to apply when performing a specific, well-defined task. Agent Skill depends on Intelligent Agent and Tool Use (Agent) in the learning graph — a skill is only meaningful for a system that can already act autonomously and manipulate files, not for a chat interface that only returns text. The skill this chapter documents, `learning-graph-generator`, is exactly this kind of file: its own description reads "Generates a comprehensive learning graph from a course description, including 200 concepts with dependencies, taxonomy categorization, and quality validation reports." That one sentence is the skill's entire public contract.

An agent skill file is inert on its own — it needs a runtime that can read it and execute file reads, writes, and shell commands on a real project. **Claude Code** is Anthropic's command-line coding agent that can read and write files, run shell commands, and follow the instructions in an agent skill file to complete multi-step development and content-generation tasks inside a real project directory. Claude Code depends directly on Agent Skill in the learning graph — it is the *host* capable of loading and executing a skill file; without a host like it, a skill file is just documentation nobody runs. Two capabilities make it suited to this job: direct filesystem access (reading `docs/course-description.md`, writing `docs/learning-graph/concept-list.md`, running the skill's bundled Python scripts, all in one working directory) and long-running, multi-step execution (a single run touches ten or more files across thirteen steps in one continuous session).

A skill file sitting in a project's skills directory does nothing until something triggers it. **Skill Invocation** is the act of a user or agent explicitly triggering a named agent skill — typically by referencing its name or describing a matching task — causing Claude Code to load that skill's instructions and begin executing its steps in order. Skill Invocation depends directly on Claude Code in the learning graph — invocation is meaningless without a host runtime capable of loading and running the skill's instructions.

Invocation happens two ways in practice, and the distinction matters for how predictably a skill runs:

| Invocation Method | How It Works | Predictability |
|---|---|---|
| Explicit slash-style trigger | User names the skill directly | High — the exact skill file loads, no ambiguity |
| Description matching | Claude Code matches a described task against skill descriptions | Moderate — depends on how distinct the description is from other skills |

Once invoked, the skill does not immediately start generating 200 concepts. Its first step is quieter and easier to skip — which is exactly why the skill makes it mandatory.

## Course Description Scoring: Verifying the Input Before Spending Tokens on the Output

Chapter 1 opened this entire book with a warning about AI "slop" — content covering random concepts with no logic governing what is included or excluded. The learning-graph-generator skill takes that warning seriously enough to build a checkpoint into its very first content-generating step, rather than trusting that any course description is good enough to build 200 concepts from. **Course Description Scoring** is the skill's first content step, in which the agent evaluates a course description against a 100-point rubric — covering title, audience, prerequisites, topics covered and excluded, and Bloom's Taxonomy-aligned learning outcomes at all six levels — before generating a single concept. Course Description Scoring depends on Skill Invocation and Bloom's Taxonomy in the learning graph — it is literally the skill's Step 1, and it grades the outcomes section against the six Bloom levels Chapter 6 introduced.

The skill requires at least three specific, actionable outcomes at each Bloom level to award full credit for that row:

| Element | Points | What It Verifies |
|---|---|---|
| Title, Audience, Prerequisites | 5 each | Present and specific, not vague |
| Main Topics Covered / Excluded | 10 / 5 | Comprehensive topic list with clear boundaries |
| Remember / Understand / Apply / Analyze / Evaluate / Create | 10 each (60 total) | At least three specific outcomes per Bloom level |
| Descriptive Context | 5 | Additional framing on why the course matters |

A score of 85 or higher lets the skill skip re-scoring entirely on a later run — the reason this book's own pipeline skipped this step on its most recent run. This project's `course-description.md` carries `quality_score: 96` in its YAML frontmatter from an earlier pass, so when the skill ran again today it read that metadata and moved straight to concept generation, saving the tokens a full re-assessment would have cost. Below 85, the skill reports the gap and recommends revision before any concepts are generated, on the reasoning that a weak course description cannot support 200 well-formed concepts no matter how good the concept-generation step is.

!!! mascot-tip "A Score Below 70 Is a Stop Sign, Not a Suggestion"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The skill recommends the user not proceed unless the score is 70 or above. That threshold exists because every later step compounds the course description's weaknesses — a vague topics list becomes a vague concept list, then an arbitrary dependency structure, then a taxonomy with no natural boundaries. Fixing the course description costs a few minutes. Fixing 200 concepts built on a bad foundation costs an entire regeneration.

## Concept List Generation and Concept List Review: Drafting and Approving the Nodes

With a course description scored high enough to proceed, the skill's next step produces the raw material every later step depends on. **Concept List Generation** is the skill step in which the agent reads the scored course description and produces a flat, numbered list of concept labels — each in Title Case, capped at 32 characters, phrased as a named entity rather than a question — covering the full breadth of the course material. Concept List Generation depends on Concept Label, Course Description Scoring, and Generative AI in the learning graph — it applies Chapter 2's labeling-convention rules using the generative capability Chapter 17 defined, gated on the scoring checkpoint above. The 32-character cap exists because these labels become node text inside a vis-network graph, and Chapters 11 through 15 already showed what happens to readability when node labels run long. The "entity, not a question" rule exists because a concept is a *thing that can be understood or not understood* (Chapter 1's own definition), so the label should simply be "Git," not "What Is Git?" The skill's own guidance targets roughly 200 concepts as a baseline, scaling up to 500 for complex technical subjects — this project's own most recent run landed on 254, comfortably inside that range.

!!! mascot-thinking "A Label Is Not a Definition"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that concept list generation produces only labels — no definitions attached yet. That separation is deliberate: the glossary-generator skill writes ISO/IEC 11179-style definitions in a later, separate pass, once the label set is stable. Combining the two steps would mean re-writing definitions every time a label gets renamed during the review step covered next.

A freshly generated concept list is a draft, not a finished artifact, and the skill treats it that way explicitly. **Concept List Review** is a mandatory human-in-the-loop step, immediately following concept list generation, in which the skill instructs the user to manually read the entire concept list and add, remove, or rename concepts before any dependency or taxonomy work begins. Concept List Review depends directly on Concept List Generation in the learning graph — there is nothing to review until generation has produced a draft. This step is not decorative: changing concept labels *later* in the pipeline costs far more tokens than fixing them now, because a label change after dependency mapping means re-checking every edge that referenced it, and a change after taxonomy assignment means re-checking category boundaries too. Concept List Review is the cheapest point in the pipeline to catch a problem — the same principle Chapter 5 applied to validating structure before building on top of it.

- Duplicate or near-duplicate labels should be removed
- Labels phrased as questions, or longer than 32 characters, should be renamed
- Gaps in coverage — a course-description topic with no corresponding concept — should be filled in
- Unclear abbreviations deserve special attention, since they propagate into every diagram that later renders that node

## Dependency CSV Generation: Building the Edges

A reviewed concept list is a set of nodes with no relationships between them yet — the equivalent of a pile of index cards with no arrows drawn. **Dependency CSV Generation** is the skill step that produces a structured CSV file — with columns ConceptID, ConceptLabel, and a pipe-delimited Dependencies column — encoding which concepts each concept depends on, following the strict rule that the dependency direction must point from a dependent concept toward its prerequisite. Dependency CSV Generation depends on Concept Dependency and Concept List Review in the learning graph — it cannot begin until the concept list has passed human review, and it directly implements Chapter 3's concept-dependency relationship in a machine-readable file format.

Restating the edge-direction rule from Chapter 3 in its CSV form matters here, because getting it backward causes the exact inverted-graph consequence Chapter 5 warned about for the JSON format: a row for "Multiplication" with `Dependencies` value `"7|12"` means "Multiplication depends on concept 7 and concept 12," not the reverse. The skill's rules for this step are direct about the stakes:

- Foundational concepts have an empty Dependencies field — nothing precedes them
- Every other concept must list at least one dependency — no concept floats free
- No concept may depend on itself, and the completed graph must be a Directed Acyclic Graph — no cycle anywhere
- Dependencies should form meaningful pathways, not one linear chain from concept 1 to concept 254

That last rule matters because a purely linear chain is a common failure mode when a course description's topics happen to already read in a plausible order. Too many single-parent chains lose the branching structure that lets Chapter 9's mastery learning and Chapter 16's personalized learning paths offer more than one route through the material.

## Automated Quality Validation: Catching Structural Problems Before They Compound

A dependency CSV, freshly authored, is not guaranteed to be a well-formed DAG — hundreds of hand-authored dependency relationships can easily contain a cycle, an orphaned node, or a disconnected cluster nobody noticed. **Automated Quality Validation** is the skill step that runs a Python analysis script against the dependency CSV to check for cycles, self-dependencies, orphaned nodes, disconnected subgraphs, and overly linear chains, producing a quality-metrics report and an overall score from 1 to 100. Automated Quality Validation depends on Graph Quality Metric and Dependency CSV Generation in the learning graph — it applies Chapter 5's validation checks as a scripted, repeatable process rather than a manual inspection.

This check ran on this exact project earlier today, and its first pass caught a real problem. Recall two terms from Chapter 5: an *orphaned node* has zero edges connecting it to anything, while a *disconnected subgraph* is a cluster connected to itself but not to the graph's main body. Neither is a cycle — but both mean a learner following prerequisite chains from the foundational concepts could never reach that node.

| Validation Pass | Orphaned Nodes | Disconnected Components | Cycles | Quality Score |
|---|---|---|---|---|
| First run | 4 (YAML, Behaviorism, Connectivism, Andragogy) | 7 | 0 | Flagged for repair |
| After 6 edge patches | 0 | 1 (fully connected) | 0 | ~88/100 |

The fix in that second row was not a wholesale rewrite — it was six targeted edges, each connecting one isolated cluster back into the graph's main body (for example, linking "MkDocs" to "YAML" and "Markdown," and linking "Instructional Design" to "Behaviorism"). This is precisely the kind of small, surgical repair Automated Quality Validation exists to make cheap to find and cheap to fix, rather than a large restructuring discovered late in the process.

#### Diagram: Learning Graph Quality Gate Explorer

<iframe src="../../sims/learning-graph-quality-gate-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>

[View Learning Graph Quality Gate Explorer Fullscreen](../../sims/learning-graph-quality-gate-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Learning Graph Quality Gate Explorer</summary>
Type: microsim
**sim-id:** learning-graph-quality-gate-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners toggle a small sample graph between a "before validation" state (containing an orphaned node, a disconnected cluster, and a cycle) and an "after validation" state (fully connected, acyclic) so they can see exactly what Automated Quality Validation catches and fixes.

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate, detect

Learning objective: Given a 14-node sample dependency graph containing one orphaned node, one disconnected two-node cluster, and one three-node cycle, the learner can use the toggle and click controls to identify each structural problem and explain why it would block safe chapter sequencing.

Canvas layout: full-width vis-network graph panel (420px tall); a fixed-height infobox panel (100px) below it; a "Before Validation" / "After Validation" toggle at the top

Visual elements: 14 nodes using the circle/color conventions from Chapters 11-15. "Before" state: one red dashed-outline node (orphaned, zero edges), two orange nodes in a visibly separated cluster (disconnected component), three nodes joined in a closed loop with red edges (cycle). "After" state: same 14 nodes, all three problems repaired — the orphan gains one edge to a foundational node, the cluster gains one bridging edge, the cycle is broken by reversing one edge

Interactive controls: toggle swaps the dataset and redraws; clicking any flagged node in "Before" opens an infobox naming the check that catches it (orphan detection, connectivity analysis, or cycle detection) and why it matters; hovering any node shows its label and indegree/outdegree

Default parameters: initial view is "Before Validation," no node selected, infobox reads "Click a red or orange node to see what's wrong"

Data Visibility Requirements:
Stage 1: Show the "Before" graph with all three problems flagged simultaneously
Stage 2: On click, show the check name and a one-sentence consequence for chapter sequencing
Stage 3: On toggling to "After," show all edges forming one connected, acyclic component, with the three repaired edges highlighted gold for three seconds

Instructional Rationale: An Analyze-level objective requires learners to differentiate three failure modes that look superficially similar but require different fixes — a static diagram cannot support that comparison, but a before/after toggle with click-to-explain nodes can.

Responsive behavior: graph panel and infobox stack vertically below 650px; toggle stays fixed at top

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network with two pre-built 14-node/edge datasets swapped via the toggle; click handler maps node ID to pre-written explanation text; hover uses vis-network's built-in tooltip API
</details>

## Taxonomy Generation Step: Grouping the Graph Into Categories

A validated, acyclic, fully connected graph of 200-plus concepts is structurally sound but still difficult for a human to scan — 254 unlabeled circles convey little at a glance. The next step gives that structure a legend. The **Taxonomy Generation Step** is the skill stage in which the agent designs roughly ten to twelve categories, assigns every concept to exactly one category, and encodes each category as a short uppercase abbreviation (a TaxonomyID) added as a new column in the dependency CSV. Taxonomy Generation Step depends on Concept Taxonomy and Automated Quality Validation in the learning graph — it applies Chapter 4's taxonomy-design principles as a scripted pipeline stage, and it only runs after structure has already passed validation, so category design is not wasted on a graph that still needs repair.

The skill enforces one balance constraint worth naming, since it is the same imbalance problem Chapter 4 warned about: no single category should hold more than 30% of all concepts, since an over-large category is really several categories not yet separated. This project's own most recent taxonomy run produced 15 categories rather than the target 10–12 — within the skill's documented "+/- 2 to 3" tolerance — because the vis.js implementation content was broad enough to split into three balanced sub-buckets rather than one oversized category. The largest resulting category, Education and Learning Sciences, still landed at 13.0% — comfortably under the 30% ceiling.

Two files come out of this step together, and the distinction matters for anyone debugging a graph viewer's legend later:

| File | Contents | Consumed By |
|---|---|---|
| `concept-taxonomy.md` | Human-readable category names, TaxonomyID abbreviations, and descriptions | Reviewers reading the taxonomy design by eye |
| `taxonomy-names.json` | A machine-readable mapping from each TaxonomyID to its display name | The JSON-generation script, so the vis.js legend shows "Foundation Concepts" instead of the cryptic code "FOUND" |

!!! mascot-warning "Skip the Names File and the Legend Breaks"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The skill flags `taxonomy-names.json` as critical because omitting it is a common, easy-to-miss mistake: without it, the graph-generation script falls back to the raw TaxonomyID abbreviation as the display name, and a Chapter 11–15 vis.js legend shows "EDA1" and "SKILL" instead of "Exploratory Data Analysis I" and "Skill-Based Concepts." The fix costs one file. The bug it prevents is visible on every graph viewer page in the finished book.

## Pipeline Session Log: A Record of What Actually Happened

Every step so far produces a content artifact — a concept list, a CSV, a taxonomy file. One more artifact records something different: not the content, but the *process* that produced it. A **Pipeline Session Log** is a markdown file, written at the end of a skill run, that records which steps executed, which Python program versions were used, what problems were found and how they were fixed, and what the resulting graph's final metrics were. Pipeline Session Log depends directly on Taxonomy Generation Step in the learning graph — logging happens after the substantive pipeline work is complete, as a final record of it.

This is not a hypothetical file format — the session log for this project's own most recent run exists at `logs/learning-graph-generator-v0.05-2026-07-03.md`. It opens with a table of which Python program version ran at each step (`csv-to-json.py` v0.04, for instance), then narrates each numbered step in turn — noting that Step 1 (Course Description Scoring) was skipped because the existing score already exceeded 85, and that Step 4 (Automated Quality Validation) ran twice, once before and once after the six edge patches described above. It closes with a "Next Steps" section recommending the reviewer check the concept list, taxonomy, and CSV before the token-expensive chapter-generation skill runs next. A session log earns its place for a reason distinct from any single step's output: when a graph needs regenerating weeks later, or a second course reuses the skill, the log is the only artifact explaining *why* the pipeline made the choices it made.

## Iterative Graph Regeneration: The Pipeline Loops, It Does Not Just Run Once

The steps described so far read as a single pass from course description to validated graph, but the skill's design assumes that single pass will not always be the last one. **Iterative Graph Regeneration** is the pattern of re-running one or more pipeline steps — most often concept list generation, dependency mapping, or taxonomy assignment — after reviewing a session log's findings, in order to fix a specific problem without re-running the entire pipeline from scratch. Iterative Graph Regeneration depends on Pipeline Session Log and Quality Metrics Report in the learning graph — a regeneration decision is well-informed only when grounded in specific findings the log and quality report already surfaced, not a vague sense that "something looks off."

This project's own session log supplies a concrete instance: the first Automated Quality Validation pass found 4 orphaned nodes and 7 disconnected components, and rather than discarding the concept list or CSV and starting over, the pipeline made six targeted edge patches and re-ran the same validation script — a scoped, evidence-driven repair, not a full regeneration. The table below distinguishes the two responses a session log's findings can trigger:

| Response | When It Applies | Cost |
|---|---|---|
| Targeted iteration (patch and re-validate) | A small number of specific, named problems (a handful of orphaned nodes, one cycle) | Low — a few edge or label edits, then one re-run of the validation script |
| Full regeneration (restart from an earlier step) | The course description itself was scored too low, or the concept list's category structure is fundamentally wrong | High — every downstream file must be rebuilt |

!!! mascot-encourage "A Quality Score Below 100 Is Not a Failure"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    This project's own graph scored roughly 88 out of 100 after its repair pass — not a perfect 100. That is normal: a score above 70 is safe to proceed on, and the gap to 100 usually represents soft recommendations rather than blocking defects. Chasing a perfect score past the point of diminishing returns spends tokens a real project rarely has to spare.

## Human-in-the-Loop Review: Where Judgment Re-Enters the Pipeline

Automated Quality Validation catches structural problems — cycles, orphans, disconnected clusters — but structure is not the same as pedagogical soundness, and no script can judge whether "Multiplication depends on Addition" reflects genuine domain expertise or a plausible-sounding guess. **Human-in-the-Loop Review** is the set of mandatory checkpoints, built into the skill at specific steps (most explicitly Course Description Scoring and Concept List Review), where the pipeline pauses and asks a human reviewer to approve, edit, or reject the agent's output before the next step consumes it. Human-in-the-Loop Review depends on Iterative Graph Regeneration and Concept List Review in the learning graph — it is the general pattern that Concept List Review, introduced earlier as one specific instance, exemplifies at every checkpoint across the pipeline.

This closes a loop worth stating explicitly: automation handles what a script can verify objectively (does a cycle exist? does every category stay under 30%?), which frees the reviewer's limited attention for what requires domain judgment — is this concept list complete? does this dependency reflect real prerequisite knowledge, or just alphabetical proximity? The skill's closing instructions make this priority explicit: before running the next skill (`book-chapter-generator`), the user is told to review the concept list, taxonomy, and graph first, because chapter generation is token-expensive and a mistake caught here is far cheaper than the same mistake discovered nineteen chapters later.

#### Diagram: The Twelve-Step Pipeline From Course Description to Validated Graph

<iframe src="../../sims/learning-graph-pipeline-workflow/main.html" width="100%" height="902px" scrolling="no"></iframe>

[View The Twelve-Step Pipeline From Course Description to Validated Graph Fullscreen](../../sims/learning-graph-pipeline-workflow/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>The Twelve-Step Pipeline From Course Description to Validated Graph</summary>
Type: workflow
**sim-id:** learning-graph-pipeline-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through every step of the learning-graph-generator pipeline in order, seeing which steps are automated, which are human-in-the-loop checkpoints, and where iteration loops back to an earlier step — synthesizing every concept in this chapter into one end-to-end map.

Bloom Level: Evaluate (L5)
Bloom Verb: judge, assess, justify

Learning objective: Given the full pipeline as a flowchart with automated steps, human checkpoints, and a regeneration loop visually distinguished, the learner can judge which step a specific quality problem (an orphaned node, a vague course description, a mislabeled category) traces back to, and justify whether the correct response is targeted iteration or full regeneration.

Visual style: Mermaid top-to-bottom flowchart with color-coded node types (automated step, human checkpoint, output file) and one dashed feedback loop arrow from Quality Validation back to Concept List Review

Steps (each a Mermaid node with a click directive): (1) Skill Invocation, automated — reveals "The user or agent triggers the skill by name, and Claude Code loads its instructions." (2) Course Description Scoring, human checkpoint — reveals "Scored against a 100-point rubric; below 85 the user revises before continuing." (3) Concept List Generation, automated — reveals "Drafts a flat, numbered list of Title Case labels covering the course's full breadth." (4) Concept List Review, human checkpoint — reveals "The user reads the full list and adds, removes, or renames entries before dependency work begins." (5) Dependency CSV Generation, automated — reveals "Encodes prerequisites as a CSV, edges pointing from each dependent concept to its prerequisites." (6) Automated Quality Validation, automated — reveals "A script checks cycles, orphans, disconnected subgraphs, and linear chains, producing a numeric score." (7) Taxonomy Generation Step, automated — reveals "Designs 10-12 balanced categories and assigns every concept to one, adding a TaxonomyID column." (8) Generate learning-graph.json, automated — reveals "Combines the taxonomy-enriched CSV, metadata, and taxonomy names into the graph JSON used by every vis.js diagram in this book." (9) Pipeline Session Log, automated — reveals "Records every step executed, problems found, and fixes applied, for future debugging." (10) Human-in-the-Loop Review, human checkpoint — reveals "The user reviews the concept list, taxonomy, and graph JSON before the token-expensive chapter-generation skill runs."

Feedback loop: a dashed arrow labeled "Iterative Graph Regeneration" connects Automated Quality Validation back to Concept List Review / Dependency CSV Generation, clickable to reveal: "When validation finds a scoped, specific problem, the pipeline patches the affected concepts or edges and re-validates, rather than restarting from Step 1."

Interactive features: every node has a click directive opening an infobox below the diagram; human-checkpoint nodes use a person icon and gold fill; automated-step nodes use a gear icon and indigo fill; output-file nodes use a document icon and green fill; the feedback loop arrow is dashed gray and clickable

Color scheme: gold for human checkpoints, indigo for automated steps, green for output files, dashed gray for the feedback loop

Responsive behavior: flowchart scales to container width and reflows to single-column below 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 560px height

Implementation: Mermaid.js flowchart with click bindings wired to a JavaScript showInfo() function populating a div below the diagram; node styling via Mermaid classDef for the three node-type categories
</details>

## Synthesis: One Pipeline, Nineteen Chapters

Every concept in this chapter names one piece of machinery. Put together, they answer the question this book has been building toward since its first page: how does a learning graph actually get made, in practice, by a real team on a deadline?

- **Chapters 1–5** defined a concept, a dependency, a taxonomy, and a validated DAG — vocabulary that Concept List Generation, Dependency CSV Generation, and the Taxonomy Generation Step apply mechanically, at scale
- **Chapters 6–10** justified graph-based sequencing with learning science — Bloom's Taxonomy, referenced directly in Course Description Scoring's rubric, and mastery learning, echoed in this chapter's insistence that structural problems be fixed before content is built on top of them
- **Chapters 11–15** gave the graph a visual, explorable form with vis.js — the same JSON format that Automated Quality Validation checks and `taxonomy-names.json` feeds into, so a finished legend reads "Foundation Concepts" rather than "FOUND"
- **Chapter 16** introduced learning paths, which depend entirely on this pipeline's graph being trustworthy — a mis-sequenced dependency here becomes a wrong recommendation there
- **Chapter 17** introduced the intelligent agent capable of running this kind of multi-step procedure, culminating in the Agent Skill and Claude Code concepts that opened this chapter
- **Chapter 18** showed what happens after the graph is validated — MicroSims, MkDocs, and GitHub Pages turning it into the book you are reading, via a Book Build Workflow that begins where this chapter's pipeline ends

The loop closes precisely here. The `learning-graph.json` file this chapter's diagram specs reference is the same file the learning-graph-generator skill produced for this project, following the same twelve steps just diagrammed. Course Description Scoring read this book's own `course-description.md` and found a score of 96. Concept List Generation and Review produced the 254 concepts spread across nineteen chapters, this one included. Dependency CSV Generation encoded the very edge — Agent Skill depends on Intelligent Agent — that opened this chapter. Automated Quality Validation found four orphaned nodes on its first pass and zero on its second. The Taxonomy Generation Step placed this chapter's twelve concepts into a category named "SKILL." And the Pipeline Session Log recording all of it sits, right now, in this project's `logs/` directory, dated the same day you are reading this sentence.

A reader who has followed this book from Chapter 1 to here now holds something more useful than a description of a good textbook: a repeatable procedure — course description scored, concepts generated and reviewed, dependencies mapped and validated, taxonomy assigned and balanced, every step logged, every result eligible for targeted iteration, every checkpoint gated by human judgment — for building one of their own.

!!! mascot-celebration "You've Reached the Last Page — and the First Step"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — really pause, because this is the last time I get to say it in this book. Nineteen chapters ago I told you I had exactly eight jobs, and the sixth one was to sit with you when the vocabulary piled up faster than the concepts felt like they should. It piled up plenty. You stayed with it anyway. Let's connect the concepts one final time: you now know what a concept, a dependency, and a DAG are; why Bloom's Taxonomy and mastery learning justify sequencing knowledge this way; how vis.js turns a graph into something explorable; how personalization and intelligent agents put that graph to work for one specific learner; how the whole thing deploys as a real, published textbook; and now, in this chapter, the exact skill that builds all of it from a single course description — the same skill that built the very words in front of you. That is not a metaphor. It is a receipt. Somewhere in this project's `docs/learning-graph/` directory sits a `learning-graph.json` file with your name on it waiting to happen, for whatever course or curriculum you carry this forward into. Go build it. Thank you for reading all the way to the end — it has been the privilege of every chapter to have you here. Let's connect the concepts, one more time, on your own graph now.

[See Annotated References](./references.md)
