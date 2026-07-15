---
title: Foundations of Concept Graphs
description: The vocabulary of graph-based knowledge representation — concepts, nodes, edges, and the DAG structure that distinguishes a learning graph from a table of contents.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 08:55:44
version: 0.09
---

# Foundations of Concept Graphs

## Summary

Introduces the vocabulary of graph-based knowledge representation — concepts, nodes, edges, and the directed acyclic graph (DAG) structure that makes a learning graph different from a simple table of contents. Covers related graph types (concept graph, content graph, knowledge graph, dependency graph) and structural variations like hierarchies, clusters, and hybrid graphs. After this chapter, students can distinguish a learning graph from other graph-based knowledge structures and explain why the DAG property matters for sequencing.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Concept
2. Concept Graph
3. Content Graph
4. Knowledge Graph
5. Dependency Graph
6. Learning Graph
7. Directed Graph
8. Directed Acyclic Graph (DAG)
9. Node
10. Edge
11. Hierarchy
12. Graph Representation
13. Cluster (Graph)
14. Journey Map
15. Hybrid Graph

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Hi! I'm Axiom."
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome to **Learning Graphs: The Key to Intelligent Textbooks**! I'm **Axiom**, an owl who has spent a very long time studying how ideas connect to other ideas — which, it turns out, is most of what wisdom is. I'll be popping up in the margins throughout this book, but I don't show up randomly. I have exactly **eight jobs**, and you'll learn to recognize me by which one I'm doing:

    1. **Welcome you** at the start of every chapter — that's what I'm doing right now.
    2. **Explain a concept** more plainly when a definition needs a second pass in different words.
    3. **Flag a key insight** worth pausing on before you move to the next idea.
    4. **Give you a tip** — the move a working instructional designer would make that nobody writes down.
    5. **Warn you gently** about the places where smart readers and smart graphs get into trouble.
    6. **Encourage you** when the vocabulary is piling up faster than the concepts feel like they should.
    7. **Sit quietly in the margin** with a general note when neither of the above quite fits.
    8. **Celebrate with you** at the end of each chapter when you've earned it.

    That's it. If I'm not doing one of those eight things, I'm not in the chapter. Let's connect the concepts!

Every intelligent textbook — indeed, every course anyone has ever taught well — rests on an answer to one question: what has to be understood before what? A table of contents *implies* an answer by listing chapters in order, but it never states the answer explicitly, and it certainly doesn't let software query it. This chapter builds the vocabulary you need to make that answer explicit, machine-readable, and precise. By the end, you will be able to look at a diagram of circles and arrows and say exactly what kind of graph it is, and why that distinction matters for the textbook you eventually build.

## What Is a Concept?

A **Concept** is a single, well-defined unit of knowledge — an idea specific enough that a learner can be said to understand it or not understand it. "Photosynthesis" is a concept. "Biology" is not; it is a whole field made up of hundreds of concepts. This distinction between a *field* and a *concept* is the first discipline a learning-graph author has to develop, because the entire method depends on breaking a subject into pieces small enough that dependency between them can be stated cleanly.

A well-formed concept has a few recognizable properties. It should be nameable in a short phrase, testable on its own (a learner can demonstrate mastery of it independently of neighboring concepts), and distinct from every other concept in the graph — no two nodes should describe the same idea under different names.

Useful concepts for a learning graph typically share these traits:

- **Atomic** — represents one idea, not a bundle of several
- **Nameable** — has a short, unambiguous label (2-5 words is typical)
- **Testable** — a learner's grasp of it can be assessed independently
- **Distinct** — does not duplicate or overlap another concept in the same graph
- **Connectable** — has at least one plausible prerequisite or dependent relationship to another concept

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that none of those five traits mentions *difficulty*. A concept can be simple ("Node") or hard ("Backward Design") and still be a single, well-formed unit. Difficulty is a property of the *learner's* relationship to the concept, not of the concept itself.

## Nodes, Edges, and Graph Representation

Once a subject has been broken into concepts, those concepts need a formal home. That home is a **graph representation** — a way of modeling entities and their relationships using two primitive building blocks: nodes and edges.

A **Node** is a single point in a graph that represents one entity — in our case, one concept. An **Edge** is a connection between two nodes that represents a relationship between the entities those nodes stand for. Formally, a graph \( G \) is defined as an ordered pair \( G = (V, E) \), where \( V \) is the set of nodes (vertices) and \( E \) is the set of edges connecting them. **Graph representation** is the general practice of modeling data this way — as entities (nodes) and relationships (edges) — rather than as rows in a table or headings in an outline.

This is worth pausing on, because it is the structural idea that separates a learning graph from a syllabus. A syllabus is a *list*: item 1, then item 2, then item 3. A graph is a *network*: item 5 might depend on items 2 and 3, but not on item 4, and item 7 might depend on nothing at all. Lists can only express "comes before" in a single sequence. Graphs can express "depends on" for every concept independently, which is what a real subject actually looks like once you draw it out.

Before you look at the diagram below, hold onto three terms: a **node** is a concept, an **edge** is a relationship between two concepts, and clicking either one in the diagram will show you its role.

#### Diagram: Graph Anatomy Explorer

<iframe src="../../sims/graph-anatomy-explorer/main.html" width="100%" height="502px" scrolling="no"></iframe>

[View Graph Anatomy Explorer Fullscreen](../../sims/graph-anatomy-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Graph Anatomy Explorer</summary>
Type: graph-model
**sim-id:** graph-anatomy-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners identify the anatomy of a graph — nodes, edges, and the direction of an edge — using a small five-node example drawn from this chapter's own concept list.

Bloom Level: Understand (L2)
Bloom Verb: identify, classify

Learning objective: Given a rendered graph, the learner can correctly label which visual elements are nodes and which are edges, and state what each represents.

Nodes to display (5, using vis-network circle shape):
- "Concept" (id 1)
- "Node" (id 2)
- "Edge" (id 3)
- "Graph Representation" (id 4)
- "Directed Graph" (id 5)

Edges to display (dependency direction, arrow points from dependent to prerequisite):
- Node(2) → Concept(1)
- Edge(3) → Concept(1)
- Graph Representation(4) → Node(2)
- Graph Representation(4) → Edge(3)
- Directed Graph(5) → Graph Representation(4)

Layout: Hierarchical top-down, "Concept" at the bottom as the root prerequisite

Visual styling:
- Nodes: light blue circles, 40px diameter, black text labels
- Edges: solid black arrows, arrowhead at the "to" end
- Selected node: highlighted gold with a thicker gold border
- Selected edge: highlighted gold and thickened

Interactive features:
- Hover a node: tooltip shows "Node: represents the concept '{label}'"
- Click a node: side infobox opens with the concept's one-sentence glossary definition
- Hover an edge: tooltip shows "Edge: '{from label}' depends on '{to label}'"
- Click an edge: side infobox explains "This arrow means you should understand '{to label}' before '{from label}'"
- Toggle button: "Show as undirected" removes all arrowheads and relabels the callout text to explain that undirected edges only show connection, not order — reinforcing why direction matters
- Reset button restores default state

Canvas size: responsive, 100% width, 500px height, must reflow on window resize

Implementation: vis-network JavaScript library with a DataSet for nodes and edges, click and hover event handlers bound to an infobox `<div>` beside the canvas
</details>

## Direction Matters: Directed Graphs

The diagram above used arrows, not plain lines, to connect nodes. That choice is not decorative. A **Directed Graph** is a graph in which every edge has a direction — it points from one node to another, rather than simply connecting them. Formally, each edge is an ordered pair \( (u, v) \in E \), meaning the edge runs *from* \( u \) *to* \( v \), and the reverse is not automatically true.

Direction is what allows a graph to express asymmetric relationships. "Multiplication depends on addition" is true; "addition depends on multiplication" is not. An undirected graph — plain lines with no arrowheads — cannot represent that asymmetry at all; it can only say the two concepts are *related*, not which one comes first. Every learning graph in this book is a directed graph for exactly this reason.

!!! mascot-warning "A Convention Worth Fixing Early"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Throughout this book, an edge points **from the dependent concept to its prerequisite**. An edge from "Multiplication" to "Addition" reads "Multiplication depends on Addition," not the reverse. Chapter 3 covers this convention — and the mirror-image "enablement" convention some tools use instead — in full detail. For now, just remember: the arrowhead points at the concept you need to learn *first*.

## From Directed to Acyclic: The Dependency Graph and the DAG

Direction alone is not enough to guarantee a graph is usable for sequencing. Consider three concepts, A, B, and C, connected so that A depends on B, B depends on C, and — accidentally — C depends on A. Try to find a place to *start*. There isn't one. Every concept requires learning another concept first, in an endless loop. A graph like this cannot generate a valid learning order no matter how it is drawn.

This is why learning graphs require a stronger property than "directed." A **Directed Acyclic Graph (DAG)** is a directed graph that contains no cycles — no path that starts at a node and, by following edges in their stated direction, eventually returns to that same node. The "acyclic" property is what guarantees a valid starting point always exists: at least one node has no outgoing dependencies, so a learner (or a lesson-planning algorithm) always has somewhere to begin.

A **Dependency Graph** is the general term for any directed graph whose edges represent a "requires" or "depends on" relationship — used far beyond education, in software build systems, project schedules, and supply chains. A **Learning Graph**, which you will meet formally in the next section, is a dependency graph applied specifically to educational concepts, and it must additionally be a DAG for the reasons just described.

Before the diagram below, hold onto one more term: a **cycle** is a closed loop of edges that returns to its starting node. Click any edge in the diagram to see whether adding it creates one.

#### Diagram: DAG Cycle Detector

<iframe src="../../sims/dag-cycle-detector/main.html" width="100%" height="602px" scrolling="no"></iframe>

[View DAG Cycle Detector Fullscreen](../../sims/dag-cycle-detector/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>DAG Cycle Detector</summary>
Type: graph-model
**sim-id:** dag-cycle-detector<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners experiment with adding and removing an edge to see the difference between a valid DAG and a graph containing a cycle, and to see why a cycle prevents sequencing.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine

Learning objective: Given a small directed graph, the learner can determine whether it is a valid DAG and explain, in terms of "where would a learner start," why a cycle breaks the ability to sequence concepts.

Data Visibility Requirements:
Stage 1: Show the baseline valid DAG — three nodes "Multiplication" → "Addition", "Addition" → "Counting", "Multiplication" → "Counting" (transitive edge shown lightly dashed). All nodes green (valid).
Stage 2: On clicking the toggle button "Add cycle-forming edge," add a fourth edge "Counting" → "Multiplication". All three nodes in the resulting cycle turn red, and the edges in the cycle pulse or highlight red.
Stage 3: Infobox displays: "This graph is no longer a DAG. Counting depends on Multiplication, which depends on Addition, which depends on Counting — there is no concept left to start with."
Stage 4: Clicking "Remove cycle-forming edge" reverts to Stage 1 and the infobox reads "Cycle removed. Every learner now has a valid starting point: Counting."

Interactive controls:
- Button: "Add cycle-forming edge"
- Button: "Remove cycle-forming edge" (disabled until a cycle exists)
- Infobox panel to the right of the canvas showing the current DAG status (green "Valid DAG" badge or red "Cycle Detected" badge)

Visual styling:
- Valid state: green circular nodes, black arrows
- Cycle state: the nodes and edges participating in the cycle turn red; nodes not in the cycle stay green
- Badge: fixed-position colored pill in the infobox, green or red matching graph state

Layout: force-directed with mild gravity, allow the graph to settle after each edge change

Instructional Rationale: A toggle-based before/after comparison is used instead of continuous animation because the Analyze-level objective requires the learner to compare two concrete states (valid DAG vs. cycle) and trace the specific edges responsible for the difference. Continuous animation would obscure which single edge caused the change.

Implementation: vis-network JavaScript library; maintain an internal adjacency list and run a simple depth-first-search cycle check whenever an edge is added, coloring any nodes/edges found on a repeated visit path
</details>

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you inherit someone else's concept graph, run a cycle check before you trust it for sequencing. A single mislabeled edge — pointing the wrong direction — is enough to create a hidden cycle that a human reviewer can easily miss but an algorithm cannot.

## A Family of Related Graphs

"Dependency graph" and "learning graph" are not the only graph-shaped structures you will encounter in intelligent-textbook work. Several related terms get used loosely — sometimes interchangeably — in software documentation and educational-technology marketing, and a professional working in this space needs to keep them straight.

!!! mascot-encourage "Keep Going"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    You're about to meet five related terms in quick succession. That's a lot of vocabulary landing at once — most learners slow down right here. The trick is to notice that each term answers the same two questions differently: *what do the nodes represent, and what do the edges mean?*

A **Concept Graph** is the broadest of the five: any graph whose nodes are concepts and whose edges represent *some* relationship between them — not necessarily "depends on." The edges in a concept graph might mean "is related to," "is a type of," "is part of," or several other relationships mixed together in the same graph.

A **Content Graph** shifts the nodes away from abstract ideas and toward the *material* that teaches them — nodes might be pages, videos, articles, or exercises, and edges represent how that content links together (a video that references an article, a quiz that follows a lesson). A content graph tells you how your *materials* are organized; it does not, by itself, tell you what a learner needs to know first.

A **Knowledge Graph** is a much more general structure used across computer science: nodes are entities of any kind (people, places, products, concepts), and edges represent typed relationships between them ("was born in," "is a subclass of," "manufactured by"). Knowledge graphs power search engines and recommendation systems far outside of education. A learning graph borrows the entity-and-relationship structure of a knowledge graph but restricts itself to one node type (concepts) and, ideally, one dominant edge type (prerequisite dependency).

You have already met the last two: a **Dependency Graph** restricts its edges to "requires" or "depends on" relationships, in any domain — not only education. A **Learning Graph** is the specialization of a dependency graph to educational concepts, and it is additionally required to be a DAG.

Now that each type has been defined in prose, the table below organizes them for quick comparison — use it as a reference, not as your first introduction to any of these five terms.

| Graph Type | What the Nodes Represent | What the Edges Represent | Must Be a DAG? |
|---|---|---|---|
| Concept Graph | Concepts | Any relationship (related-to, part-of, depends-on, etc.) | No |
| Content Graph | Learning materials (pages, videos, quizzes) | Links between materials | No |
| Knowledge Graph | Any entity (people, places, concepts, products) | Typed relationships of many kinds | No |
| Dependency Graph | Items in any domain | "Requires" / "depends on" | Typically, but not always enforced |
| Learning Graph | Educational concepts | "Depends on" (prerequisite) | Yes, required |

Because these five terms are easy to blur together in practice, the interactive explorer below lets you re-examine one small dataset through each lens and see how the same set of nodes gets a different edge structure depending on which type of graph you are building.

#### Diagram: Graph Family Lens Explorer

<iframe src="../../sims/graph-family-lens-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>

[View Graph Family Lens Explorer Fullscreen](../../sims/graph-family-lens-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Graph Family Lens Explorer</summary>
Type: graph-model
**sim-id:** graph-family-lens-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Show the same five nodes rendered under six different "lenses" (concept graph, content graph, knowledge graph, dependency graph, enablement graph, learning graph) so learners can see how the edge set — not the node set — is what changes between graph types.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare, contrast

Learning objective: Given a fixed set of entities, the learner can identify which edge relationships are appropriate under each of the six graph-type lenses and explain what changes between lenses.

Base node set (shown in every lens, styling changes per lens):
- "Fractions" (concept)
- "Decimals" (concept)
- "Video: Intro to Fractions" (content item)
- "Quiz: Fractions Basics" (content item)
- "Khan Academy" (external entity, used only in Knowledge Graph lens)

Lens control: Dropdown selector with six options — "Concept Graph," "Content Graph," "Knowledge Graph," "Dependency Graph," "Enablement Graph," "Learning Graph"

Lens behavior:
- Concept Graph lens: shows only "Fractions" and "Decimals" nodes, with an undirected "related-to" edge labeled "related to"
- Content Graph lens: shows only the two content-item nodes, with a directed edge "Video: Intro to Fractions" → "Quiz: Fractions Basics" labeled "precedes"
- Knowledge Graph lens: shows all five nodes with mixed, typed edges: "Video: Intro to Fractions" —[created by]→ "Khan Academy", "Quiz: Fractions Basics" —[tests]→ "Fractions"
- Dependency Graph lens: shows only "Fractions" and "Decimals" with a directed edge "Decimals" → "Fractions" labeled "DEPENDS_ON"
- Enablement Graph lens: same two nodes as the Dependency Graph lens, but the arrow is reversed — a directed edge "Fractions" → "Decimals" labeled "ENABLES LEARNING"
- Learning Graph lens: identical edge to the Dependency Graph lens, but the infobox additionally notes the DAG requirement and shows a green "Valid DAG" badge

Interactive features:
- Selecting a lens fades out nodes/edges not relevant to that lens and animates in the correct edge set (300ms transition)
- Hovering an edge shows a tooltip with the edge's relationship label
- Clicking a node opens an infobox stating which graph type(s) that node type belongs to
- A persistent caption below the canvas restates in one sentence what changed between the previous lens and the current one

Visual styling:
- Concept nodes: light blue circles
- Content-item nodes: green rounded rectangles
- External-entity nodes: gray hexagons
- Edge labels shown inline on the edge line

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network JavaScript library with six predefined edge-set configurations swapped in on a dropdown "change" event; use `network.setData()` to redraw
</details>

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    "Knowledge graph" and "learning graph" get used as if they mean the same thing more often than they should. A knowledge graph can mix dozens of entity types and relationship types in one structure — that flexibility is its strength for search and recommendation. A learning graph deliberately gives up that flexibility, restricting itself to one node type and one edge meaning, because that restriction is exactly what makes prerequisite sequencing computable.

## Structural Variations: Hierarchies, Clusters, and Hybrid Graphs

A learning graph's *type* (what nodes and edges mean) is one axis of variation. Its *shape* is another, and shape affects how learners and instructors read the graph even when the underlying dependency data is identical.

A **Hierarchy** is a structure in which entities are ranked or ordered under a strict parent-child relationship — every node except the root has exactly one parent. Hierarchies are easy to navigate (there is always one path up to any concept) but are too rigid for most real learning graphs, where a single advanced concept often depends on two or three unrelated foundational concepts at once, not one parent.

A **Cluster** (in graph terms) is a group of nodes that are more densely connected to each other than to nodes outside the group — not a formal parent-child relationship, but a statistical pattern of density. Clustering a learning graph typically corresponds to a subject-matter grouping: all the "vis.js styling" concepts naturally cluster together because they depend heavily on each other and only lightly on concepts from other parts of the book.

A **Hybrid Graph** combines both patterns in a single structure: a loose hierarchical backbone (broad topic areas ordered from foundational to advanced) with densely clustered subgraphs hanging off each hierarchical level. Most real intelligent-textbook learning graphs — including the one behind this book — are hybrid graphs. Pure hierarchies are too restrictive to be accurate, and pure clusters with no backbone give a reader no sense of overall progression.

The explorer below renders one 12-node subset of concepts under all three structural views so you can see the same dependency data organized three different ways.

#### Diagram: Structural Variations Explorer

<iframe src="../../sims/structural-variations-explorer/main.html" width="100%" height="522px" scrolling="no"></iframe>

[View Structural Variations Explorer Fullscreen](../../sims/structural-variations-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Structural Variations Explorer</summary>
Type: graph-model
**sim-id:** structural-variations-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Show one fixed dependency dataset rendered as a strict hierarchy, as a density-based cluster layout, and as a hybrid combining both, so learners can compare the trade-offs of each structural view.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, justify

Learning objective: Given the same 12-node dependency dataset shown under three structural layouts, the learner can judge which layout is most useful for a specified task (e.g., "showing an individual learner's next step" vs. "showing an instructor the subject's overall shape") and justify the choice.

Base dataset: 12 nodes drawn from this chapter's own concept list (Concept, Node, Edge, Graph Representation, Directed Graph, DAG, Dependency Graph, Learning Graph, Concept Graph, Hierarchy, Cluster, Hybrid Graph) with the dependency edges established earlier in this chapter

Layout control: Three buttons — "Hierarchy View," "Cluster View," "Hybrid View" — only one active at a time

View behavior:
- Hierarchy View: vis-network hierarchical layout, strict top-down levels, one parent enforced per node (secondary dependencies shown as thin dashed "also depends on" lines, visually de-emphasized)
- Cluster View: force-directed physics layout with vis-network's built-in clustering by community detection on edge density; each detected cluster shaded a distinct pale background color with a cluster label
- Hybrid View: hierarchical top-level grouping (three broad bands: "Primitives," "Graph Properties," "Graph Types") with force-directed physics active *within* each band, so nodes cluster locally but bands stay ordered top-to-bottom

Interactive features:
- Clicking a layout button animates the transition (vis-network's built-in physics stabilization) rather than an instant redraw
- Hovering a node shows its degree (number of connections) as a small badge
- An infobox beside the canvas updates per view with a one-sentence trade-off statement, e.g., for Hierarchy View: "Easy to find 'the' path to any concept, but forces every node to pick a single parent even when it has two real prerequisites."

Visual styling:
- Consistent node coloring across all three views (light blue circles) so only the layout changes, not the data
- Cluster background shading: three distinct pale colors (blue, green, amber) at low opacity

Canvas size: responsive, 100% width, 520px height

Implementation: vis-network JavaScript library using `network.setOptions()` to swap layout configuration (hierarchical vs. physics-based) on button click, with a single shared DataSet
</details>

## From Graph to Journey: The Journey Map

A learning graph describes *possibility space* — every valid order in which concepts could be learned, given their dependencies. A **Journey Map** narrows that possibility space down to one concrete path: a visual or structured representation of a specific individual's progression through a sequence of steps toward a goal, typically highlighting milestones, likely struggle points, and recommended next actions along the way.

The relationship between the two is worth stating precisely, because it previews a theme the rest of this book returns to repeatedly: a learning graph is the *map of everywhere a learner could go*; a journey map is *the specific route one learner is taking through it*, generated by walking the DAG from that learner's current mastery toward a stated goal concept. Chapter 16 covers how software generates journey maps automatically from mastery data — for now, the important idea is simply that these are two different objects, related but not interchangeable, and that the second is always derived from the first.

#### Diagram: Journey Map Builder

<iframe src="../../sims/journey-map-builder/main.html" width="100%" height="702px" scrolling="no"></iframe>

[View Journey Map Builder Fullscreen](../../sims/journey-map-builder/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Journey Map Builder</summary>
Type: graph-model
**sim-id:** journey-map-builder<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners select a goal concept in a small learning graph and watch the tool derive one valid linear journey map (a topologically sorted path) from the graph's dependency structure.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, construct

Learning objective: Given a small learning graph and a chosen goal concept, the learner can construct (via the tool) a valid sequential journey map that respects every dependency edge, and explain why the resulting order is not the only valid one.

Base dataset: 8-node subgraph — "Node," "Edge," "Graph Representation," "Directed Graph," "Dependency Graph," "Directed Acyclic Graph (DAG)," "Learning Graph," "Journey Map" — using the dependency edges established earlier in this chapter

Interactive controls:
- Dropdown: "Choose your goal concept" (defaults to "Journey Map")
- Button: "Build My Journey"
- Reset button

Behavior:
- On "Build My Journey," the tool performs a topological sort restricted to the ancestors of the selected goal node and renders the result as a horizontal step sequence below the graph (Step 1, Step 2, Step 3...) with the goal concept as the final step
- Each step in the journey map is clickable, opening an infobox with that concept's one-sentence definition
- The graph view above highlights the path taken in gold, dimming nodes/edges not on the chosen path
- Infobox note after building: "This is one valid order. {N} other orderings would also satisfy every dependency — a journey map picks one path through the possibility space the learning graph describes."

Visual styling:
- Graph view: light blue circles, gold highlight for the active journey path
- Step sequence: horizontal row of numbered pill-shaped steps below the graph, connected by arrows, gold background on the active path

Canvas size: responsive, 100% width, 500px height (graph) plus a 120px step-sequence strip below

Implementation: vis-network JavaScript library for the graph view; a simple topological-sort function (Kahn's algorithm) run client-side in JavaScript on button click to generate the step sequence
</details>

## Key Takeaways

- A **concept** is a single, testable, nameable unit of knowledge — the atomic building block of a learning graph.
- A **graph representation** models concepts as **nodes** and relationships as **edges**, formally \( G = (V, E) \).
- A **directed graph** gives every edge a direction, which is required to express asymmetric "depends on" relationships.
- A **directed acyclic graph (DAG)** additionally forbids cycles, guaranteeing every graph has at least one valid starting point.
- **Concept graphs**, **content graphs**, **knowledge graphs**, **dependency graphs**, and **learning graphs** differ in what their nodes and edges represent — a learning graph is the most restrictive: one node type (concepts), one edge meaning (prerequisite), and mandatory DAG structure.
- **Hierarchies**, **clusters**, and **hybrid graphs** are structural — not type — variations; most real learning graphs are hybrids.
- A **journey map** is one concrete path derived from a learning graph, not a substitute for the graph itself.

!!! mascot-celebration "Well Done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you can now name every structural piece of a learning graph and explain how it differs from its cousins in the graph family. That vocabulary is the foundation every later chapter builds on. Next, we turn to how those concepts get consistent, machine-readable labels. Let's connect the concepts!

[See Annotated References](./references.md)
