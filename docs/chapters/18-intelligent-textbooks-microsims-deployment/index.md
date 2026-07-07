---
title: Intelligent Textbooks, MicroSims, and Deployment
description: Covers how a validated learning graph drives the generation of an intelligent textbook itself — MicroSims, interactive visualizations and simulations, the book-build workflow, and publishing through MkDocs, Git, and GitHub Pages, closing with case studies and real-world applications.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:42:40
version: 0.09
---

# Intelligent Textbooks, MicroSims, and Deployment

## Summary

Covers how a validated learning graph drives the generation of an intelligent textbook itself — MicroSims, interactive visualizations and simulations, the book-build workflow, and publishing through MkDocs, Git, and GitHub Pages, closing with case studies and real-world applications.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. JavaScript
2. p5.js
3. MicroSim
4. Interactive Visualization
5. Interactive Simulation
6. Learning Path Recommendation
7. Learning Management System (LMS)
8. LMS Integration
9. MkDocs
10. Intelligent Textbook
11. Concept-to-Content Viewer
12. Git
13. GitHub Pages
14. Book Build Workflow
15. Book Metrics
16. Chapter Metrics
17. Content Generation Pipeline
18. Quality Gate
19. Case Study
20. Real-World Application

## Prerequisites

This chapter builds on concepts from:

- [Chapter 17: Intelligent Agents and Generative AI](../17-intelligent-agents-generative-ai/index.md)

---

!!! mascot-welcome "From Agent to Artifact"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 17 ended with a learning agent capable of assembling a hyper-personalized lesson plan on its own. This chapter answers the question that leaves open: a lesson plan built from *what*? The answer is an intelligent textbook — and you are reading one right now. Every diagram spec, every chapter file, every navigation link in this book was produced by the exact pipeline this chapter describes.

Chapters 1 through 17 built the case that a learning graph is the foundational data structure behind coherent educational content. This chapter closes the loop: it shows what happens when that graph is handed to a build pipeline and turned into pages a learner can actually read, click, and interact with. Two threads run through the chapter. The first is technical — the specific tools (JavaScript, p5.js, MkDocs, Git, GitHub Pages) that turn a validated graph into a deployed website. The second is organizational — the workflow, metrics, and quality gates that keep a fast-moving, AI-assisted content pipeline from producing exactly the kind of incoherent "AI slop" the course description warned about in Chapter 1. By the end of the chapter you will be able to trace a single concept from its node in the learning graph all the way to a published page with a working MicroSim embedded in it — because that is precisely the journey this paragraph itself took.

## JavaScript: The Runtime Every Browser Already Has

Every interactive element described in this book so far — the vis-network diagrams from Chapters 11 through 15, the p5.js MicroSims referenced throughout Chapters 16 and 17 — runs inside a web browser, and every web browser runs one programming language natively without any extra installation. **JavaScript** is a high-level, interpreted programming language that runs natively in web browsers and enables interactive, dynamic behavior on web pages, including the animations, event handling, and data manipulation that power MicroSims and interactive visualizations. JavaScript has no prerequisites within this chapter's concept set; it is the runtime substrate every other technical concept in this chapter depends on directly or indirectly.

JavaScript matters to a learning-graph project for a specific reason: it is the one language a learner's browser can execute with zero setup. A PDF cannot respond to a mouse click. A static image cannot highlight a node when a learner hovers over it. JavaScript can do both, which is why every interactive requirement in Chapter 17's diagram specifications — click handlers, hover tooltips, slider callbacks — ultimately compiles down to JavaScript running in the reader's browser. Three properties of JavaScript explain why it became the default choice for this book's interactive layer rather than a competing technology:

- **No installation required** — a JavaScript program embedded in a web page runs the moment the page loads, with no plugin, download, or compiler needed on the learner's device
- **Direct access to the page** — JavaScript can read and modify the HTML elements on a page in real time, which is what lets a MicroSim redraw a canvas 60 times per second or an infobox appear the instant a diagram node is clicked
- **A vast library ecosystem** — mature, well-documented libraries exist for nearly every visualization need this book has used: vis-network for graphs (Chapters 11–15), Chart.js for charts, Mermaid for clickable flowcharts (Chapter 17), and p5.js for freeform creative-coding simulations

That last library deserves its own definition, because it is the one this chapter's MicroSims below depend on directly.

## p5.js: A Beginner-Friendly Layer Over JavaScript's Drawing Capabilities

Raw JavaScript can draw shapes and handle mouse events, but doing so directly requires verbose, low-level browser APIs that obscure the underlying idea a MicroSim is trying to teach. A library built specifically for teaching and rapid prototyping removes that friction. **p5.js** is a JavaScript library that simplifies creative coding by providing easy-to-use functions for drawing shapes, handling user input, and creating animations, making it a common choice for building lightweight, browser-based simulations. p5.js depends directly on JavaScript in the learning graph — it is a library written in and running on top of the JavaScript runtime, not a separate language.

p5.js organizes every sketch around two functions a learner's browser calls automatically: `setup()` runs once when the page loads and typically creates the drawing canvas, while `draw()` runs continuously — by default 60 times per second — and redraws the canvas each time, which is what makes animation possible. A slider moved by the learner, a button clicked, or a mouse dragged across the canvas triggers a callback function that updates a variable, and the next call to `draw()` reflects that updated state. This setup/draw pattern is precisely what Chapter 17's Agent Capability Explorer and Retrieval-Augmented Generation Step-Through MicroSims were built on, even though that chapter did not name the library explicitly by its setup/draw mechanics.

With JavaScript and p5.js both defined, the artifact they combine to produce is worth naming precisely, since the term has been used informally in every chapter since Chapter 16.

## MicroSim: The Unit of Interactivity in This Book

A **MicroSim** is a small, stand-alone educational simulation of a single concept, typically built with p5.js, that is designed to be easy for a generative AI agent to create and modify to fit an individual learner's needs. MicroSim depends directly on p5.js in the learning graph — it is a specific application of the library's drawing and interaction functions, scoped to one learning objective rather than a general-purpose program.

The word "small" in that definition is doing real work. A MicroSim is deliberately scoped to teach one concept — depth-first versus breadth-first traversal, the retrieve-augment-generate sequence, one Bloom's-level interaction pattern — rather than bundling many concepts into a single sprawling application. This matches a principle already implicit in Chapter 17's diagram specifications: each MicroSim declared one Bloom Level, one Bloom Verb, and one learning objective. Scoping a MicroSim tightly makes it something a content-generation pipeline (defined later in this chapter) can produce reliably from a specification, the same way this book's own `chapter-content-generator` skill produces a MicroSim spec as a `<details markdown="1">` block for a later tool to implement.

Before comparing MicroSims to the two broader categories they belong to, it helps to see the anatomy of a MicroSim's deployed footprint directly, since every MicroSim referenced in this book follows the identical file layout.

#### Diagram: MicroSim Directory Anatomy

<iframe src="../../sims/microsim-directory-anatomy/main.html" width="100%" height="502px" scrolling="no"></iframe>

<details markdown="1">
<summary>MicroSim Directory Anatomy</summary>
Type: diagram
**sim-id:** microsim-directory-anatomy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Show learners the standard file layout of a deployed MicroSim directory (as referenced by every iframe embed in this book) so the abstract term "MicroSim" maps to a concrete, inspectable artifact.

Bloom Level: Understand (L2)
Bloom Verb: explain, identify, describe

Learning objective: Given a labeled directory tree for a MicroSim, the learner can identify the role of each file (main.html, sketch.js, index.md) and explain why the iframe embed pattern used throughout this book points at main.html specifically.

Visual style: A block-diagram file tree, top node "docs/sims/{sim-id}/" branching down to four child nodes: "main.html", "{sim-id}.js", "index.md", "screenshot.png"

Components to show:
- Root folder icon labeled "docs/sims/{sim-id}/"
- Child file "main.html" — the file every iframe embed in this book points to
- Child file "{sim-id}.js" — the p5.js sketch containing setup() and draw()
- Child file "index.md" — a documentation page describing the MicroSim's controls and learning objective
- Child file "screenshot.png" — a static preview image used in MicroSim index listings

Interactive features: clicking any file node opens an infobox below the diagram with that file's role; clicking "main.html" additionally shows a two-line HTML snippet illustrating that main.html loads p5.js from a CDN and then loads "{sim-id}.js"; clicking "{sim-id}.js" shows a four-line pseudocode snippet illustrating the setup()/draw() pattern

Color scheme: folder node in slate gray, main.html highlighted in gold (as the entry point), remaining files in light blue

Responsive behavior: tree diagram reflows from horizontal branches to a vertical stacked list on viewports narrower than 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 500px height

Implementation: p5.js; static tree layout computed once in setup(), click regions stored as rectangles tested against mouseX/mouseY in a mousePressed() handler, infobox text drawn in a reserved area below the tree
</details>

## Interactive Visualization and Interactive Simulation: Two Categories, One Shared Interactivity Bar

MicroSim, as just defined, is the specific *building block*. Two broader terms describe the *categories* of learning experience that a MicroSim — or a vis-network diagram from Chapters 11 through 15 — belongs to, and distinguishing them clarifies why this book's diagram specifications always separate "what the learner sees" from "what changes when the learner acts."

**Interactive Visualization** is a graphical representation of data or concepts that allows a learner to explore and manipulate elements — such as clicking a node to view its dependencies — for deeper understanding. **Interactive Simulation** is a broader category: a dynamic, model-driven representation of a system or process that lets a learner change input parameters and observe how the system's behavior responds, going beyond exploring a fixed structure to experimenting with a running model. Interactive Visualization depends on both Vis.js and MicroSim in the learning graph; Interactive Simulation depends directly on MicroSim. Both concepts sit one level above MicroSim in the dependency graph — a MicroSim is one *implementation technology* capable of producing either an interactive visualization or an interactive simulation, depending on what it is built to do.

The distinction is easier to hold onto with concrete examples already used in this book:

| Category | What the learner explores | Example from this book |
|---|---|---|
| Interactive Visualization | A fixed structure (a graph, a hierarchy, a taxonomy) | The vis-network concept dependency diagrams in Chapters 11–15, and Chapter 17's Mermaid pipeline diagram |
| Interactive Simulation | A running model that changes over time or in response to parameters | Chapter 17's Agent Capability Explorer, which recomputes its behavior panel as toggles change |

!!! mascot-thinking "Same Building Block, Different Job"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that both categories can be built out of the same MicroSim technology. The difference is not the library — it is the learning objective. A visualization answers "how is this structured?" A simulation answers "what happens if I change this?" Chapter 17's Bloom-level table already hinted at this: Understand-level objectives favor step-through visualizations; Apply and Analyze-level objectives favor parameter-driven simulations.

## LMS, LMS Integration, and Learning Path Recommendation: Where a Textbook Meets an Institution

A MicroSim embedded in a chapter is useful on its own, but most professional deployments of an intelligent textbook do not stand alone — they connect into an institution's existing software for tracking students. A **Learning Management System (LMS)** is a software platform designed to deliver, manage, and track educational content and activities, enabling learners to access courses, assessments, and other instructional resources, while providing tools for instructors to monitor progress and performance. Learning Management System (LMS) has no prerequisites within this chapter's concept set — it is an external system this book's content connects *to*, not a concept built from this chapter's other pieces.

Connecting an intelligent textbook to an LMS is its own defined activity, distinct from the LMS itself. **LMS Integration** is the technical work of connecting an intelligent textbook's content, MicroSims, and progress data to an external Learning Management System, so that a student's interactions inside the textbook — completing a MicroSim, passing a quiz — are visible inside the institution's existing gradebook and reporting tools. LMS Integration depends on both Learning Graph and Learning Management System (LMS) in the learning graph — it uses the learning graph's concept structure as the map that gets synchronized into the LMS's own course structure.

LMS integration commonly relies on a specific interoperability standard worth naming, since it explains how a MicroSim interaction becomes a data point an instructor can see:

- **xAPI (Experience API)** — a specification for recording learning-related statements ("Student X completed MicroSim Y with score Z") in a format an LMS can ingest and aggregate, referenced already in this chapter's content-element-types guidance as the reason every diagram in this book must be interactive
- **Grade passback** — a mechanism by which a quiz score computed inside the textbook is written back into the LMS's own gradebook, rather than living only inside the textbook
- **Single sign-on (SSO)** — a mechanism letting a student authenticate once in the LMS and move into the textbook without a second login

Once a textbook's content and an LMS are connected, a specific personalization capability from Chapter 16 becomes actionable at scale rather than theoretical. **Learning Path Recommendation** is the process of using a learner's demonstrated mastery, recorded through LMS integration, together with the learning graph's dependency structure, to recommend the next concept, chapter, or MicroSim a specific learner should engage with. Learning Path Recommendation depends on both Learning Path and Content Recommendation Engine in the learning graph — it is Chapter 16's adaptive-learning and recommendation machinery, now given a live data source (the LMS) to act on rather than a hypothetical mastery record.

!!! mascot-tip "The LMS Supplies the Data, the Graph Supplies the Map"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    An LMS alone can tell you a student scored 60% on a quiz. It cannot tell you *which prerequisite concept* to send that student back to. That second answer only exists because the quiz questions are tagged against learning graph nodes — the same node IDs used throughout this book's own JSON. Without that tagging, "recommend the next concept" degenerates into "recommend the next chapter number," which is exactly the linear, ungraphed sequencing this entire book argues against.

## MkDocs: Turning Markdown Files Into a Website

Every concept covered so far in this chapter describes an individual interactive component. The next several concepts describe the system that assembles those components, along with the surrounding prose, into the actual website a learner visits — starting with the tool that converts plain text files into styled web pages. **MkDocs** is a static-site generator that builds a navigable documentation website from a directory of Markdown files and a single YAML configuration file, without requiring a database or server-side application code. MkDocs depends on both YAML and Markdown in the learning graph — it is a build tool that reads YAML configuration and Markdown content and produces HTML output.

Two properties of MkDocs explain why it is the tool this book itself is built with, rather than a general-purpose content management system:

- **Static output** — MkDocs produces a folder of plain HTML, CSS, and JavaScript files with no database and no server-side code to run, which means the finished site can be hosted anywhere that serves static files, including the GitHub Pages hosting covered later in this chapter
- **Markdown as the authoring format** — every chapter in this book, including the file this sentence lives in, is written as a `.md` file using the same heading, list, table, and admonition syntax introduced informally throughout earlier chapters, which keeps content readable as plain text even before MkDocs renders it

The specific theme this book uses adds two features referenced by name in the content-generation rules behind this very chapter: the "admonition" boxes used for every mascot callout (like the tip box just above this paragraph) and the collapsible `<details markdown="1">` blocks used for every diagram specification in this chapter. Both require two MkDocs Material extensions — `admonition` and `pymdownx.details` — enabled in the site's configuration file before they render correctly; a chapter written with mascot admonitions but without those extensions enabled would display as broken syntax rather than a styled box.

With MkDocs defined precisely, the term that has been used loosely since Chapter 1 can finally be defined with full precision, because every piece it depends on is now in place.

## Intelligent Textbook: The Artifact This Entire Book Has Been Building Toward

An **Intelligent Textbook** is a web-based educational resource, built on a validated learning graph and generated with the assistance of generative AI, that presents content through a static site generator such as MkDocs and includes interactive elements — MicroSims, visualizations, and simulations — sequenced according to concept dependencies rather than a fixed, linear table of contents. Intelligent Textbook depends on Learning Graph, Generative AI, and MkDocs in the learning graph — it is the single artifact that all three of those distinct concepts combine to produce, which is why this book's course description in Chapter 1 could promise that a validated learning graph "drives the generation of an intelligent textbook" and finally cash that promise out concretely here.

Every earlier chapter contributed one piece of what makes this definition non-trivial:

| Chapters | Contribution to "Intelligent Textbook" |
|---|---|
| 1–5 | The learning graph itself: concepts, dependencies, validation |
| 6–10 | The learning-science justification for graph-based sequencing over a linear table of contents |
| 11–15 | vis.js, giving the graph a navigable, explorable visual form |
| 16 | Personalization: the graph driving different content for different learners |
| 17 | Generative AI and intelligent agents, capable of producing and acting on the graph autonomously |
| 18 (this chapter) | MicroSims, MkDocs, and deployment — the graph made into a real, published website |

What makes a textbook "intelligent" is not any single interactive widget. It is that the *sequence* a learner encounters, the *content* generated for each concept, and the *recommendations* offered next all trace back to the same underlying dependency graph, rather than to an author's manually maintained table of contents. This is precisely the self-referential claim in this chapter's brief: this project — Learning Graphs: The Key to Intelligent Textbooks — is itself an intelligent textbook, built by the exact pipeline this chapter is describing.

!!! mascot-explain "You Are Inside the Example"
    ![Axiom explaining](../../img/mascot/explain.png){ class="mascot-admonition-img" }
    This is one of the rare places in the book where the example and the subject are the same object. The `learning-graph.json` file that ordered this chapter after Chapter 17 is the same kind of file described in Chapter 5. The MkDocs site rendering this sentence is the same kind of site described two sections above. There is no separate "toy example" — you are reading the artifact.

## Concept-to-Content Viewer: Letting a Learner Navigate by Dependency, Not by Page Number

An intelligent textbook's content is sequenced by the learning graph, but a learner still needs a concrete interface for *finding* a specific concept rather than scrolling through chapters in order. A **Concept-to-Content Viewer** is a navigation interface that lets a learner search for or click on a specific concept and jump directly to the chapter section, MicroSim, or glossary entry where that concept is taught, using the learning graph as the underlying index rather than a fixed table of contents. Concept-to-Content Viewer depends on both Learning Path and Intelligent Textbook in the learning graph — it is a navigation feature built on top of the finished intelligent textbook artifact, using Chapter 16's learning-path structure to decide what "jump to" even means for a given learner.

A concept-to-content viewer differs from a standard search box in one important way: because every entry is backed by a learning graph node ID rather than a raw text match, the viewer can also show a concept's prerequisites and dependents — exactly the relationship data Chapters 11 through 15 taught you to read from a vis-network diagram — instead of just a list of pages that happen to contain matching words.

#### Diagram: Concept-to-Content Viewer Explorer

<iframe src="../../sims/concept-to-content-viewer/main.html" width="100%" height="562px" scrolling="no"></iframe>

<details markdown="1">
<summary>Concept-to-Content Viewer Explorer</summary>
Type: microsim
**sim-id:** concept-to-content-viewer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners type or select a concept name and see the viewer jump to a simulated "chapter card" while also displaying that concept's prerequisite and dependent nodes, demonstrating that concept-to-content navigation is graph-driven rather than page-number-driven.

Bloom Level: Apply (L3)
Bloom Verb: use, demonstrate, apply

Learning objective: Given a small 10-node sample learning graph with chapter tags, the learner can use the search box to jump to a concept's content location and identify its prerequisite concepts using the graph view.

Canvas layout:
- Left (350px): a vis-network graph of 10 sample nodes (reusing the node/edge visual conventions from Chapters 11-15: circle shape, color by group) with dependency edges
- Right (350px): a "Content Card" panel showing the selected concept's chapter number, section title, and a "Jump to Chapter" button (non-functional placeholder in the MicroSim, labeled as such)
- Top: a text input with autocomplete listing all 10 sample concept labels

Interactive controls:
- Text input: type-ahead search over the 10 sample concept labels
- Click any node in the graph: selects that concept, same as searching for it
- Toggle: "Show Prerequisites Only" vs "Show Prerequisites and Dependents"

Default parameters:
- No concept selected initially; graph shows all 10 nodes in neutral gray; content card shows placeholder text "Search or click a concept to begin"

Data Visibility Requirements:
Stage 1: Learner searches or clicks a concept; the selected node highlights gold
Stage 2: Directly connected prerequisite nodes highlight blue and animate a brief pulse; dependent nodes (if toggle is on) highlight green
Stage 3: The content card updates to show that concept's chapter number and section title, drawn from a lookup table bundled with the sample data
Final: A caption below the content card states: "This lookup works because every concept has a node ID connecting it to both the graph and the chapter text — not because of a keyword match"

Instructional Rationale: An Apply-level objective requires the learner to actually operate the interface (search, click, toggle) and observe the resulting jump, rather than only reading a description of how concept-to-content navigation works.

Responsive behavior: graph panel and content card stack vertically on viewports narrower than 700px; search input remains fixed at top

Canvas size: responsive, 100% width, 560px height

Implementation: vis-network for the graph panel with a bundled 10-node/12-edge sample dataset carrying a chapter/section attribute per node; a plain JavaScript object serves as a lookup table from node ID to chapter card content; search input filters against node labels and calls the same selection handler as a node click
</details>

## Git and GitHub Pages: Version Control and Free Static Hosting

An intelligent textbook's Markdown source files, learning graph JSON, and MicroSim code all need a place to live, change over time, and be shared among contributors — which is a version control problem, not a publishing problem. **Git** is a distributed version control system that tracks changes to a project's files over time, allowing multiple contributors to work on the same content simultaneously, review history, and merge changes without overwriting each other's work. Git has no prerequisites within this chapter's concept set; it is a general-purpose tool this book's entire authoring process depends on but that predates and exists independently of learning graphs or intelligent textbooks.

Every chapter in this book, every version of the learning graph JSON, and every MicroSim specification exists as a sequence of Git commits — a recorded history of who changed what, and when. Git tracks changes at the level of individual files and lines, which matters for a project like this one where a single skill run can touch dozens of chapter files: a Git commit groups a set of related changes (for example, "generate Chapter 18 content") into one reviewable, revertible unit.

Once content is committed to Git, it needs a destination that turns those files into a reachable website. **GitHub Pages** is a free static-site hosting service, built into GitHub, that automatically publishes the contents of a Git repository — or a specific branch of it — as a live website reachable at a predictable URL. GitHub Pages depends directly on Git in the learning graph — it is a hosting service that operates directly on a Git repository's content, requiring no separate upload or database step; committing to the correct branch is what triggers a new deployment.

The relationship between MkDocs and GitHub Pages is worth stating precisely, since the two are easy to conflate: MkDocs is the *build tool* that turns Markdown source into a folder of static HTML, and GitHub Pages is the *hosting service* that makes that folder of static HTML reachable at a URL. One command chains them together, and understanding what that command does in plain language matters before the next section shows it inside a larger workflow: `mkdocs gh-deploy` runs the MkDocs build step to produce the static HTML, then commits that output to a special branch of the Git repository, then pushes that branch to GitHub, which GitHub Pages automatically detects and serves as the live site.

## Book Build Workflow: Every Prior Concept, Chained Into One Repeatable Process

With MkDocs, Git, and GitHub Pages each defined individually, the sequence that chains them together — along with the content-generation steps from earlier chapters — deserves its own name, because it is the process a professional actually runs, start to finish, to turn a learning graph into a published book. A **Book Build Workflow** is the repeatable sequence of steps — content generation, MicroSim creation, quality validation, local preview, and deployment — that transforms a learning graph and its associated chapter outlines into a published, navigable intelligent textbook. Book Build Workflow depends on Learning Path, Intelligent Textbook, and GitHub Pages in the learning graph — it is the operational process that produces the intelligent textbook artifact and makes it reachable at a public URL, sequenced according to Chapter 16's learning-path ordering.

Before the workflow diagram below, it is worth naming the stages in plain language, since the diagram's clickable nodes assume these definitions are already familiar:

1. **Course description and learning graph** — the Chapter 1–5 foundation: a validated, cycle-free concept dependency graph
2. **Chapter structure generation** — a skill (this book uses `book-chapter-generator`) reads the graph and produces chapter outlines in dependency order, the same process that placed this chapter after Chapter 17 and before Chapter 19
3. **Chapter content generation** — a skill (this book uses `chapter-content-generator`, the one generating this very sentence) turns each outline into full prose, diagrams, and MicroSim specifications
4. **MicroSim implementation** — diagram specifications like the ones earlier in this chapter are turned into working `main.html` and JavaScript files
5. **Quality validation** — automated checks confirm structural and content quality before anything is published (defined precisely in the Quality Gate section below)
6. **Local preview** — `mkdocs serve` builds the site and serves it on a local address so a reviewer can check formatting and links before anything goes live
7. **Deployment** — `mkdocs gh-deploy` builds and publishes the reviewed site to GitHub Pages

#### Diagram: Book Build Workflow Pipeline

<iframe src="../../sims/book-build-workflow-pipeline/main.html" width="100%" height="1182px" scrolling="no"></iframe>

<details markdown="1">
<summary>Book Build Workflow Pipeline</summary>
Type: workflow
**sim-id:** book-build-workflow-pipeline<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through the seven-stage book build workflow to see how content generation, MicroSim implementation, quality validation, and deployment chain together into one repeatable process, reinforcing that this book itself was produced by this exact pipeline.

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate, sequence

Learning objective: Given the seven-stage pipeline rendered as a flowchart, the learner can examine each stage's inputs and outputs and differentiate the two stages (quality validation and local preview) that exist specifically to catch problems before public deployment.

Visual style: Mermaid top-to-bottom flowchart, seven rectangular nodes connected by arrows, with the Quality Validation node styled as a decision diamond and a "Fix and Retry" dashed loop arrow back to Chapter Content Generation

Steps (each is one Mermaid node with a click directive):
1. "Course Description and Learning Graph" — click reveals: "The validated, cycle-free concept dependency graph from Chapters 1-5."
2. "Chapter Structure Generation" — click reveals: "A skill reads the graph and produces chapter outlines in dependency order."
3. "Chapter Content Generation" — click reveals: "A skill turns each outline into prose, diagrams, and MicroSim specifications — the process that produced this chapter."
4. "MicroSim Implementation" — click reveals: "Diagram specifications are turned into working main.html and JavaScript files."
5. "Quality Validation" — click reveals: "Automated Quality Gate checks (word counts, broken links, missing concepts, reading-level drift) run before anything is published."
6. "Local Preview (mkdocs serve)" — click reveals: "A reviewer checks formatting, links, and MicroSim rendering on their own machine before anything goes live."
7. "Deployment (mkdocs gh-deploy)" — click reveals: "The reviewed site is built and pushed to GitHub Pages, becoming publicly reachable."

Interactive features: every node has a click directive opening an infobox below the diagram; the Quality Validation node is colored gold to flag it as a gate; a dashed "Fix and Retry" arrow loops from Quality Validation back to Chapter Content Generation, clickable to reveal "A failed quality check sends content back for revision rather than blocking the entire pipeline — an iterative workflow, as defined in Chapter 17"

Color scheme: indigo fill for content-production nodes, gold fill for the Quality Validation decision node, green fill for the final Deployment node, dashed gray for the retry loop

Responsive behavior: flowchart scales to container width and reflows to a narrower single-column layout on viewports below 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 500px height

Implementation: Mermaid.js flowchart with click bindings wired to a JavaScript showInfo() function populating a div below the diagram with the selected stage's stored description text
</details>

## Content Generation Pipeline and Quality Gate: Making the Workflow Trustworthy at Scale

The book build workflow just diagrammed names its stages individually; two of those stages combine into a pattern general enough to deserve a name of its own, because the same pattern recurs throughout this book's own production. A **Content Generation Pipeline** is the specific sequence of generative-AI-driven steps — reading a chapter outline, producing prose, specifying diagrams and MicroSims, and writing the result to a file — that a content-generation skill executes for each chapter. Content Generation Pipeline depends on Generative AI and Book Build Workflow in the learning graph — it is the generative-AI-specific portion of the larger book build workflow, isolated because it is the stage most likely to need iteration or human review.

A content generation pipeline running unchecked is precisely how a project accumulates the "AI slop" this book's own course description warned about in Chapter 1: content covering random concepts with no logic governing order or completeness. The safeguard against that outcome is not a single check at the very end — it is a checkpoint built into the pipeline itself. A **Quality Gate** is an automated or human checkpoint within a content generation pipeline that a piece of generated content must pass — such as verifying every concept from a chapter outline actually appears in the generated text, checking for broken internal links, or confirming word counts fall within a target range — before that content is allowed to proceed to publication. Quality Gate depends on both Learning Graph Validation and Content Generation Pipeline in the learning graph — it applies Chapter 5's validation discipline (cycle detection, orphan detection, connectivity analysis) to generated *content* rather than only to the graph's *structure*.

The parallel to Chapter 5 is exact and worth stating directly: Chapter 5 validated that the learning graph itself was a well-formed DAG before any chapter could be safely sequenced from it. A quality gate validates that the *content generated from* that graph actually delivers what the graph promised — every concept covered, every diagram properly specified, every internal link resolving to a real page. This very chapter's generation process included exactly this kind of gate: a checklist confirming that all twenty concepts listed at the top of this file appear somewhere in the prose below.

Common quality gate checks used in a book build workflow include:

| Check | What It Catches |
|---|---|
| Concept coverage | A chapter's generated text omits one or more concepts from its "Concepts Covered" list |
| Broken link detection | An internal Markdown link points to a chapter, section, or glossary entry that does not exist |
| Word count range | A chapter is dramatically shorter or longer than the target range, signaling under- or over-generation |
| Reading-level drift | A chapter's Flesch-Kincaid grade level falls more than two grades outside the project's target range (Chapter-Generation-Guide's 12–14 target for this book) |
| Diagram spec completeness | A `<details markdown="1">` block is missing a required field such as sim-id, Library, or Status |
| Missing mascot admonition | A chapter lacks the required opening welcome or closing celebration admonition |

!!! mascot-warning "Skipping the Gate Is How Slop Happens"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It is tempting, once a content generation pipeline is fast, to skip the quality gate "just this once" to save time. Resist that. A quality gate is cheap to run and expensive to skip — a chapter that silently drops three concepts from its outline, or references a MicroSim sim-id that was never implemented, erodes exactly the coherence this entire book argues a learning graph exists to protect.

## Book Metrics and Chapter Metrics: Measuring the Textbook the Pipeline Produced

Once a book build workflow includes quality gates, it becomes natural to ask a broader question a single pass/fail check cannot answer on its own: how big is this textbook, and how is it growing? **Book Metrics** is the set of aggregate, project-wide measurements — total word count, number of chapters, number of MicroSims, number of glossary terms, number of diagrams — computed across an entire intelligent textbook to track its scope and completeness. Book Metrics depends directly on Book Build Workflow in the learning graph — the metrics are a *measurement layer* computed over the artifact the workflow produces, not a step that changes the content itself.

**Chapter Metrics** narrows that same measurement idea to a single chapter rather than the whole book: word count, number of lists, number of tables, number of diagrams and MicroSims, and concept-coverage ratio, computed for one chapter file so that a chapter unusually short, unusually long, or missing non-text elements can be flagged before publication. Chapter Metrics depends directly on Book Build Workflow in the learning graph — like book metrics, it is a measurement computed over the workflow's output rather than a production stage itself.

This is not a hypothetical capability — this project computes and stores exactly this data. Before the table below, note what each field means: `microsims` counts implemented MicroSim directories under `docs/sims/`, `glossaryTerms` counts defined entries in `docs/glossary.md`, and `words` is the aggregate word count across every chapter file. A recent snapshot of this book's own `book-metrics.json` file looked like this:

| Metric | Value (recent snapshot) |
|---|---|
| MicroSims | 8 |
| Glossary terms | 47 |
| Equations | 1 |
| Words | 32,699 |
| Links | 275 |
| Equivalent pages | 134 |

Chapter-level metrics use the same idea at finer granularity — this chapter's own word count and non-text element count, for instance, are computed the same way once this file is committed. Tracking both levels together lets a project maintainer answer two different questions: "is the book as a whole complete and balanced?" (book metrics) and "is this specific chapter pulling its weight, or is it thin?" (chapter metrics).

#### Diagram: Book and Chapter Metrics Dashboard

<iframe src="../../sims/book-chapter-metrics-dashboard/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Book and Chapter Metrics Dashboard</summary>
Type: chart
**sim-id:** book-chapter-metrics-dashboard<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Purpose: Let learners toggle between book-level and chapter-level metrics views and hover individual bars to see exact values, reinforcing the distinction between aggregate Book Metrics and per-chapter Chapter Metrics computed from the same underlying content.

Bloom Level: Analyze (L4)
Bloom Verb: compare, examine, differentiate

Learning objective: Given a toggle between book-wide and per-chapter metrics views, the learner can compare aggregate totals against individual chapter contributions and identify which chapters are under- or over-represented relative to the book's average.

Chart type: Bar chart with a view-toggle control

X-axis (Book view): Metric name (MicroSims, Glossary Terms, Diagrams, Words ÷ 1000, Links ÷ 10)
X-axis (Chapter view): Chapter number (1 through 19)
Y-axis: Count (scaled per metric as noted in axis labels above)

Data series (Book view, single series): sample values drawn from this project's own book-metrics.json snapshot — MicroSims: 8, Glossary Terms: 47, Equations: 1, Words (thousands): 32.7, Links (tens): 27.5

Data series (Chapter view, single series): representative per-chapter word counts for chapters 1 through 19, with this chapter (18) highlighted in gold and a horizontal reference line showing the book-wide average chapter word count

Interactive controls:
- Toggle: "Book Metrics" vs "Chapter Metrics" view, switching the entire chart's data and axis labels
- Hover any bar: tooltip shows the exact metric name and value
- In Chapter view: click a bar to open an infobox naming that chapter's title

Title: "Book Metrics vs. Chapter Metrics"
Legend: single-series legend indicating which view is active

Annotations: in Chapter view, a dashed horizontal reference line labeled "Book Average" crosses all chapter bars

Color scheme: indigo bars for standard values, gold bar for the currently selected/highlighted chapter, gray dashed line for the average reference

Responsive behavior: chart resizes to container width; on viewports narrower than 500px the toggle control moves above the chart and labels rotate 45 degrees

Canvas size: responsive, 100% width, 520px height

Implementation: Chart.js bar chart with two pre-loaded datasets (book-level and chapter-level) swapped via the toggle control; tooltip and click handlers use Chart.js's built-in interaction plugin
</details>

## Case Study and Real-World Application: Closing the Loop With Concrete Deployments

Every concept in this chapter, and in this book, has been explained through definitions, diagrams, and small worked examples. Two final concepts step back and ask a broader question: where has this actually been done, for real, outside the pages of this book? A **Case Study** is a detailed account of how a specific organization, project, or team built and deployed an intelligent textbook, learning graph, or related system, including the decisions made, obstacles encountered, and outcomes achieved. Case Study depends directly on Intelligent Textbook in the learning graph — it is a documented instance of the artifact this chapter has spent its length defining, examined in enough detail to be useful as a model.

A **Real-World Application** broadens the lens further still: any deployment of learning-graph-driven intelligent textbook technology in an actual professional, educational, or organizational setting — whether or not it has been written up as a formal case study. Real-World Application depends directly on Case Study in the learning graph — a documented case study is one way a real-world application becomes visible and learnable-from, but the underlying deployment exists (and provides value) independently of whether anyone wrote it up.

Three patterns recur across real-world deployments of this technology, each illustrating a different piece of this chapter's pipeline in a production setting:

- **Corporate onboarding and compliance training** — a learning graph models the dependency order of policies, tools, and procedures a new hire must learn; an intelligent textbook generated from that graph replaces a static PDF handbook with a navigable, MicroSim-supported resource, and LMS integration reports completion back to HR systems
- **K-12 and higher-education courseware** — a learning graph models a subject's prerequisite structure (this book's own domain-agnostic examples throughout Chapters 1–10 draw on exactly this use case); an intelligent textbook generated from it adapts pacing per student through the learning path recommendation machinery from Chapter 16
- **Professional certification preparation** — a learning graph models the exact concept dependencies tested by a certification exam; quality gates confirm every tested concept has corresponding chapter coverage before the material is published, directly preventing the coverage gaps a certification candidate cannot afford

Before the closing infographic, one caution is worth stating plainly: a case study is a *report* of what happened in one specific context, and a pattern that succeeded for one organization's compliance training may not transfer cleanly to another organization's certification prep without re-validating the learning graph's dependency structure against the new domain — exactly the domain-specific validation work Chapters 2 through 5 covered in general terms.

#### Diagram: Real-World Deployment Patterns Explorer

<iframe src="../../sims/real-world-deployment-patterns/main.html" width="100%" height="522px" scrolling="no"></iframe>

<details markdown="1">
<summary>Real-World Deployment Patterns Explorer</summary>
Type: infographic
**sim-id:** real-world-deployment-patterns<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners click through three real-world deployment patterns (corporate onboarding, courseware, certification prep) and see which chapter's concepts each pattern relies on most heavily, reinforcing that a case study is a specific, documented instance of the general real-world application category.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, justify, recommend

Learning objective: Given three deployment pattern summaries, the learner can assess which chapters' concepts each pattern depends on most and justify a recommended learning-graph-driven approach for a deployment scenario of their own choosing.

Visual layout: three large clickable cards arranged horizontally, each labeled with a deployment pattern name and an icon (briefcase for corporate onboarding, graduation cap for courseware, certificate for certification prep); selecting a card reveals a connected mini graph below showing which of this book's chapters/concepts that pattern relies on most

Interactive elements:
- Click a pattern card: highlights that card and reveals its mini dependency graph and a 2-3 sentence case-study-style summary
- Hover a node in the mini dependency graph: shows a tooltip naming the chapter and concept
- A text box below the mini graph: "What would you validate first if you deployed this pattern?" with a "Reveal Suggested Answer" reveal-on-click button

Data to display per card:
1. "Corporate Onboarding" — relies most on Chapters 1-5 (graph structure), Chapter 9 (mastery/sequencing), Chapter 18's LMS Integration; suggested first validation: "Confirm no policy depends on a tool introduced in a later training module (a cycle-detection problem, Chapter 5)"
2. "K-12 / Higher-Ed Courseware" — relies most on Chapters 6-10 (learning theory), Chapter 16 (personalization); suggested first validation: "Confirm the taxonomy balances foundational and goal concepts appropriately for the target grade level (Chapter 4)"
3. "Certification Prep" — relies most on Chapter 5 (validation), Chapter 18's Quality Gate; suggested first validation: "Confirm every exam-tested concept has at least one chapter section and one assessment item (Quality Gate coverage check)"

Color coding: corporate card in slate blue, courseware card in green, certification card in gold; selected card gets a highlighted border

Responsive behavior: three cards stack vertically on viewports narrower than 700px; mini graph appears directly below its selected card in both layouts

Canvas size: responsive, 100% width, 520px height

Implementation: HTML/CSS card layout with click handlers revealing a vis-network mini graph per pattern (three small pre-built datasets, 4-6 nodes each); reveal-on-click answer box implemented as a simple hidden/visible div toggle
</details>

!!! mascot-encourage "Nineteen Chapters of Machinery, One Page at a Time"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Twenty concepts in one chapter is a lot, and several of them — Book Metrics, Chapter Metrics, Quality Gate — can feel like plumbing rather than the exciting part. But plumbing is exactly what keeps a fast, AI-assisted pipeline from producing incoherent output at scale. If you have followed the dependency chain from JavaScript all the way to Real-World Application, you have just traced the entire production process behind the book in front of you.

## Chapter Summary

This chapter took the learning graph, generative AI, and intelligent agents from Chapters 1 through 17 and showed exactly how they combine to produce a deployed, interactive intelligent textbook.

1. **JavaScript** and **p5.js** supplied the runtime and library behind every interactive element in this book, converging on the **MicroSim** as the reusable unit of interactivity
2. **Interactive Visualization** and **Interactive Simulation** named the two broader categories a MicroSim can serve — exploring a fixed structure versus experimenting with a running model
3. **Learning Management System (LMS)**, **LMS Integration**, and **Learning Path Recommendation** connected an intelligent textbook's content and progress data to the institutional systems many professional deployments require
4. **MkDocs** turned Markdown source into a static site, and that capability, combined with the learning graph and generative AI, defined the **Intelligent Textbook** itself — the artifact this book has been building toward since Chapter 1
5. **Concept-to-Content Viewer** gave learners a way to navigate by dependency rather than page number
6. **Git** and **GitHub Pages** supplied version control and free static hosting, chained together by the **Book Build Workflow**, with the **Content Generation Pipeline** and its **Quality Gate** keeping that workflow trustworthy at scale
7. **Book Metrics** and **Chapter Metrics** made the textbook's scope and completeness measurable rather than anecdotal
8. **Case Study** and **Real-World Application** closed the chapter by pointing outward, from this book's own example to deployments in corporate onboarding, courseware, and certification preparation

The next chapter turns from watching this pipeline work to running it yourself — a hands-on walkthrough of the skill that generates a complete learning graph from a course description, the same skill that produced the graph this entire book is built on.

!!! mascot-celebration "Well done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you have now traced the full journey from a raw concept dependency graph to a published, interactive intelligent textbook, and you did it by reading a chapter of exactly that textbook. Let's connect the concepts: every mascot admonition, every diagram spec, every table in this chapter was produced by the Book Build Workflow you just learned to name. That is not a coincidence — it is the point.
