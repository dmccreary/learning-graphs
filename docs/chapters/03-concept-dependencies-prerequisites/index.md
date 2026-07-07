---
title: Concept Dependencies and Prerequisites
description: How prerequisite relationships are modeled between concepts — foundational and goal concepts, immediate/intermediate/ultimate learning goals, skill gaps, transitive dependencies, and dependency-chain analysis.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 09:49:31
version: 0.09
---

# Concept Dependencies and Prerequisites

## Summary

Explains how prerequisite relationships are modeled between concepts, including foundational concepts, goal concepts, and the different types of learning goals (immediate, intermediate, ultimate). Introduces skill gaps, transitive dependencies, and dependency-chain analysis as tools for reasoning about what a student is ready to learn next.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Concept Dependency
2. Prerequisite Relationship
3. Prerequisite Chain
4. Prerequisite Concept
5. Foundational Concept
6. Goal Concept
7. Immediate Goal
8. Intermediate Goal
9. Ultimate Goal
10. Learning Goal
11. Ready-to-Learn Concept
12. Learned Concept
13. Skill Gap
14. Transitive Dependency
15. Hop Count
16. Dependency Analysis

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Concept Labeling and Metadata Standards](../02-concept-labeling-metadata-standards/index.md)

---

!!! mascot-welcome "Welcome back!"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapters 1 and 2 gave every node in a learning graph a shape (concept), a home (graph representation), and a proper name (concept label). This chapter finally asks the question the whole book has been circling: what does that arrow between two nodes actually *mean*, and how do you reason about it at scale — across a graph with hundreds of nodes and thousands of arrows?

An edge in a learning graph is not decoration. It is a claim: *you should understand the concept at one end before you can fully understand the concept at the other.* Chapters 1 and 2 treated that claim informally. This chapter makes it precise — precise enough that software can walk a graph, tell a learner exactly what they're ready for next, and flag the exact gap between where they are and where they want to be. By the end of this chapter you will be able to name every stage of that reasoning process, from a single dependency edge to a full dependency-chain analysis across an entire book.

## Concept Dependency: The Atomic Relationship

A **Concept Dependency** is a directed relationship between two concepts stating that one — the *dependent* concept — cannot be fully understood until the other — the *prerequisite* concept — has been learned. "Multiplication" has a concept dependency on "Addition." This is the single relationship type that every edge in a learning graph represents, and it is the only edge type a learning graph needs, which is precisely what makes the graph computable: a piece of software never has to guess what an edge means, because in a learning graph it only ever means one thing.

A **Prerequisite Relationship** is the formal name for that same edge viewed from the other direction — the connection between a prerequisite concept and the dependent concept that requires it. "Concept dependency" and "prerequisite relationship" describe the identical arrow: the sentence *"Multiplication depends on Addition"* and the sentence *"Addition is a prerequisite for Multiplication"* state the same fact from opposite ends. You will see both terms used interchangeably in professional practice and in this book.

Two more roles complete the vocabulary for a single edge. A **Prerequisite Concept** is the concept that must be learned first — the node the arrow points *to*, using this book's arrow convention from Chapter 1 (arrow points from dependent to prerequisite). A **Foundational Concept** is a special case of prerequisite concept: one that has no prerequisites of its own within the graph, sitting at the very bottom of a dependency chain. Every learning graph needs at least one foundational concept, because without one, nothing would ever be ready-to-learn — a problem that should sound familiar from the cycle-detection discussion in Chapter 1.

The diagram below lets you click through a small dependency chain and see these three roles — dependent concept, prerequisite concept, and foundational concept — applied to the same set of nodes.

#### Diagram: Dependency Role Explorer

<iframe src="../../sims/dependency-role-explorer/main.html" width="100%" height="502px" scrolling="no"></iframe>

<details markdown="1">
<summary>Dependency Role Explorer</summary>
Type: graph-model
**sim-id:** dependency-role-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners click through a four-node dependency chain and see how the same node can be a "dependent concept" relative to one edge and a "prerequisite concept" relative to another, with the bottom node singled out as the foundational concept.

Bloom Level: Understand (L2)
Bloom Verb: identify, classify

Learning objective: Given a small rendered dependency chain, the learner can correctly label each node's role (dependent, prerequisite, foundational) relative to a selected edge.

Nodes to display (4, vis-network circle shape):
- "Calculus" (id 1)
- "Algebra" (id 2)
- "Arithmetic" (id 3)
- "Number Sense" (id 4)

Edges to display (arrow points from dependent to prerequisite):
- Calculus(1) → Algebra(2)
- Algebra(2) → Arithmetic(3)
- Arithmetic(3) → Number Sense(4)

Layout: Hierarchical top-down, "Number Sense" at the bottom

Interactive features:
- Click any edge: the two endpoint nodes are labeled in the infobox as "Dependent Concept: {from label}" and "Prerequisite Concept: {to label}"
- The bottom-most node ("Number Sense") is permanently badged "Foundational Concept" since it has no outgoing edges
- Hover a node: tooltip states how many prerequisite concepts it has (its out-degree) and how many dependent concepts rely on it (its in-degree)
- Toggle button: "Highlight foundational concepts" recolors any node with zero outgoing edges gold

Visual styling:
- Standard nodes: light blue circles, black text
- Foundational concept: gold circle with a small anchor icon badge
- Selected edge: thickened and highlighted with endpoint labels floating beside each node

Canvas size: responsive, 100% width, 500px height

Implementation: vis-network JavaScript library with a DataSet for nodes/edges; out-degree/in-degree computed client-side from the edge list on load
</details>

## Chaining Dependencies Together

A single dependency edge rarely tells the whole story. Real concepts sit inside longer sequences, and a learning graph needs a term for that sequence as a whole.

A **Prerequisite Chain** is a sequence of concepts connected end to end by prerequisite relationships, where each concept in the chain depends on the next, forming an ordered path from an advanced concept down to a foundational one. "Calculus depends on Algebra, which depends on Arithmetic, which depends on Number Sense" describes a four-concept prerequisite chain. A chain is simply a *path* through the graph — the same graph-theory idea introduced informally in Chapter 1, now given a name specific to learning-graph work.

Prerequisite chains rarely stand alone in a real graph; most concepts sit inside several overlapping chains at once. The table below shows how the vocabulary introduced so far composes, using the four-concept example from the diagram above.

| Term | Applied to the Calculus → Algebra → Arithmetic → Number Sense example |
|---|---|
| Concept Dependency | Each individual arrow, e.g. Calculus → Algebra |
| Prerequisite Relationship | The same arrow, described from the prerequisite's side |
| Prerequisite Concept | Algebra (relative to Calculus); Arithmetic (relative to Algebra) |
| Foundational Concept | Number Sense — no outgoing edges |
| Prerequisite Chain | The full path: Calculus → Algebra → Arithmetic → Number Sense |

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A prerequisite chain is not a special data structure — it's just a path you can trace by following edges. The vocabulary exists because humans reason about *chains* ("what leads up to this?") far more naturally than they reason about a whole graph at once. Software can compute both; people mostly think in chains.

## Naming the Other End: Goal Concepts

If a foundational concept sits at the bottom of a chain with nothing beneath it, something has to sit at the top. A **Goal Concept** is a concept that represents a desired learning outcome — the concept a learner, course designer, or lesson-planning agent is ultimately trying to reach, as distinct from the concepts that merely support getting there. Every prerequisite chain in a well-designed course terminates at some goal concept; the chain exists *because* of the goal, not the other way around.

Not every goal is the same distance away, though, and conflating "what I'm about to learn next" with "what the whole course is building toward" causes real confusion in lesson planning. This book distinguishes three flavors of goal concept by how far they sit from a learner's current position in the graph:

- **Immediate Goal** — the very next concept a learner is ready to tackle; typically one hop from their current mastery frontier
- **Intermediate Goal** — a meaningful milestone concept partway through a course, itself a prerequisite for later material but substantial enough to mark real progress
- **Ultimate Goal** — the final, terminal concept a course or curriculum is designed to reach — the capstone concept that, once mastered, means the learner has achieved the course's stated purpose

A **Learning Goal** is the general umbrella term covering all three: any concept explicitly designated as a target for a learner to reach, at any distance. Immediate, intermediate, and ultimate goals are all learning goals; the three-way split just adds distance-from-current-position as a second dimension.

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Don't assume a concept is permanently one type of goal. "Algebra" might be an ultimate goal for a remedial arithmetic course and an immediate goal for a student halfway through a calculus sequence. Goal type is relative to a specific learner's position and a specific course's scope — it is never a fixed property stored on the node itself.

The timeline below places all three goal types along a single learner's path toward a capstone concept, so you can see how the same graph structure supports different goal horizons simultaneously.

#### Diagram: Goal Horizon Timeline

<iframe src="../../sims/goal-horizon-timeline/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Goal Horizon Timeline</summary>
Type: chart
**sim-id:** goal-horizon-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Purpose: Show a single learner's position on a prerequisite chain and let them see which upcoming concept counts as their immediate goal, which counts as an intermediate goal, and which is the ultimate goal of the course.

Bloom Level: Understand (L2)
Bloom Verb: classify, distinguish

Learning objective: Given a learner's current position on a displayed chain, the learner can correctly classify each remaining concept as an immediate, intermediate, or ultimate goal.

Timeline items (7 concepts in sequence, left to right): "Number Sense" (mastered), "Arithmetic" (mastered), "Algebra" (current frontier), "Functions" , "Derivatives", "Integrals", "Applied Calculus" (course capstone)

Interactive controls:
- Draggable "You are here" marker, defaults positioned after "Algebra"
- As the marker moves, the timeline recolors: mastered concepts (left of marker) gray, the single next concept immediately right of the marker gold and badged "Immediate Goal," concepts further right but before the last item blue and badged "Intermediate Goal," and the rightmost concept ("Applied Calculus") always badged "Ultimate Goal" in purple regardless of marker position

Visual styling:
- vis-timeline horizontal axis, one item per concept, connecting line between consecutive items
- Badges rendered as small pills above each timeline item

Canvas size: responsive, 100% width, 480px height

Implementation: vis-timeline JavaScript library; badge assignment recalculated in a "rangechange"/drag event handler based on the marker's item index
</details>

## Are You Ready? Ready-to-Learn and Learned Concepts

Goal concepts describe where a learner is headed. Two more terms describe where a learner actually stands right now, relative to the graph.

A **Ready-to-Learn Concept** is a concept whose every prerequisite concept has already been mastered — nothing stands between the learner and attempting it. Formally, a concept is ready-to-learn exactly when all of its foundational and prerequisite concepts belong to the learner's set of mastered concepts. This is the concept-graph equivalent of "unlocked" in a game's skill tree: the dependencies are satisfied, so the node is available.

A **Learned Concept** is a concept a specific learner has already demonstrated mastery of — through assessment, completed exercises, or another form of verified evidence, not merely "read about." The distinction matters because a learning graph by itself says nothing about any individual learner; it only becomes personally useful once a set of learned concepts, tracked per learner, is layered on top of the static graph structure.

These two terms depend on each other in a specific way worth stating precisely: a concept becomes ready-to-learn *because* its prerequisites are already learned concepts for that learner. As soon as a ready-to-learn concept is itself mastered, it becomes a learned concept, which in turn may make one or more new concepts ready-to-learn for the first time — a cascading effect that is exactly how a lesson-planning agent decides what to recommend next.

#### Diagram: Ready-to-Learn Frontier Simulator

<iframe src="../../sims/ready-to-learn-frontier-simulator/main.html" width="100%" height="542px" scrolling="no"></iframe>

<details markdown="1">
<summary>Ready-to-Learn Frontier Simulator</summary>
Type: graph-model
**sim-id:** ready-to-learn-frontier-simulator<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners click concepts to mark them "learned" one at a time and watch which other concepts flip to "ready-to-learn" as a result, making the cascading unlock effect concrete.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, apply

Learning objective: Given a small dependency graph and a starting state, the learner can predict and verify which concept(s) become ready-to-learn after marking a specific concept as learned.

Base dataset: 9-node subgraph — "Number Sense," "Arithmetic," "Algebra," "Geometry," "Trigonometry," "Functions," "Derivatives," "Integrals," "Applied Calculus" — with dependency edges forming a typical math-sequence DAG (Algebra and Geometry both depend on Arithmetic; Trigonometry depends on Geometry and Algebra; Functions depends on Algebra; Derivatives depends on Functions and Trigonometry; Integrals depends on Derivatives; Applied Calculus depends on Integrals)

Interactive features:
- Click any node currently colored gold (ready-to-learn) to mark it green (learned); clicking recalculates the ready-to-learn set and any newly-unlocked node animates from gray to gold
- Node color states: gray = "not yet ready" (at least one prerequisite unlearned), gold = "ready-to-learn," green = "learned"
- Reset button restores the initial state (only "Number Sense" learned, "Arithmetic" ready-to-learn, everything else gray)
- Infobox lists the current "Ready-to-Learn" set as a bulleted list, updating live

Visual styling:
- Gray, gold, and green circular nodes as described above
- A pulsing animation plays briefly on any node transitioning from gray to gold, to draw attention to the cascade

Layout: hierarchical top-down, foundational concepts at the bottom

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network JavaScript library; on each click, recompute ready-to-learn status for all gray nodes by checking whether every prerequisite (outgoing edge target) is in the learned set
</details>

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you're building a lesson-planning agent, the ready-to-learn set is usually the single most useful query you can run against a learning graph. It's the answer to "what should this learner try next?" — and it only requires two inputs: the graph's edges and the learner's set of learned concepts.

## Naming the Gap: Skill Gap

Comparing a learner's learned concepts against a chosen goal concept surfaces one more essential term. A **Skill Gap** is the set of prerequisite concepts lying between a learner's current learned concepts and a stated goal concept that the learner has not yet mastered. If "Applied Calculus" is a learner's ultimate goal and they have only learned "Number Sense" and "Arithmetic," their skill gap is every other concept on every prerequisite chain leading to "Applied Calculus" — Algebra, Geometry, Trigonometry, Functions, Derivatives, and Integrals, in the example graph above.

A skill gap is not just a count; it's a specific, named list, which is what makes it actionable. "You have a skill gap" is a diagnosis. "Your skill gap is these six concepts, in this order" is a lesson plan waiting to be built. This is the mechanism behind the personalization workflows previewed in the course description — an agent computes the skill gap between a learner's mastery and a chosen goal, then sequences the gap concepts using the prerequisite chains that connect them.

## Beyond One Hop: Transitive Dependency and Hop Count

Every example so far has involved short chains you could trace by eye. Real learning graphs are far larger, and two more terms exist specifically to reason about dependency at a distance.

A **Transitive Dependency** is a prerequisite relationship that holds between two concepts *indirectly*, through one or more intermediate concepts, rather than through a direct edge. If Calculus depends directly on Algebra, and Algebra depends directly on Arithmetic, then Calculus has a transitive dependency on Arithmetic — there is no direct Calculus → Arithmetic edge in the graph, but the dependency is real and provable by following the chain. Transitive dependencies matter because a learner cannot skip Arithmetic just because no arrow points to it directly from Calculus; the requirement is inherited through the whole chain.

A **Hop Count** is the number of edges that must be traversed to get from one concept to another along a prerequisite chain — the length of the path. Calculus to Algebra is a hop count of 1 (direct dependency). Calculus to Arithmetic is a hop count of 2 (one transitive step through Algebra). Calculus to Number Sense, in the four-concept chain from earlier in this chapter, is a hop count of 3. Hop count gives transitive dependency a measurable distance, which turns "is this concept required, eventually?" into "how many concepts stand between here and there?" — a far more useful question for sequencing decisions.

!!! mascot-encourage "This connects two chapters at once"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If "hop count" reminds you of graph theory you half-remember from school, that instinct is correct — it's the same idea as shortest-path length in any directed graph. You don't need the underlying algorithm memorized yet; later chapters on graph theory formalize how software computes it. For now, just hold onto what it measures: distance, in prerequisite steps, between two concepts.

The explorer below lets you pick any two concepts in a small graph and see both the transitive dependency path and its hop count highlighted together.

#### Diagram: Transitive Dependency and Hop Count Finder

<iframe src="../../sims/transitive-dependency-hop-finder/main.html" width="100%" height="522px" scrolling="no"></iframe>

<details markdown="1">
<summary>Transitive Dependency and Hop Count Finder</summary>
Type: graph-model
**sim-id:** transitive-dependency-hop-finder<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners select a start concept and an end concept in a small graph and see the tool trace the connecting path, distinguishing a direct dependency (hop count 1) from a transitive dependency (hop count 2 or more).

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate

Learning objective: Given any two concepts in a displayed dependency graph, the learner can determine whether one has a direct or transitive dependency on the other and state the correct hop count.

Base dataset: same 9-node math-sequence subgraph used in the Ready-to-Learn Frontier Simulator (Number Sense, Arithmetic, Algebra, Geometry, Trigonometry, Functions, Derivatives, Integrals, Applied Calculus)

Interactive controls:
- Two dropdowns: "From concept" and "To concept"
- Button: "Find Path"

Behavior:
- On "Find Path," the tool runs a breadth-first search along outgoing (dependency) edges from the "From" node looking for the "To" node
- If found, every edge on the shortest path is highlighted gold and the infobox reports: "{From} has a transitive dependency on {To} — Hop Count: {N}" (or "direct dependency, Hop Count: 1" when N = 1)
- If no path exists in either direction, infobox reports: "No dependency relationship exists between {From} and {To} in this graph."
- Reset button clears the highlighted path and dropdown selections

Visual styling:
- Base graph: light blue circles, black arrows, hierarchical layout
- Highlighted path: gold nodes and thickened gold edges, with small numbered badges (1, 2, 3...) along the path showing hop order

Canvas size: responsive, 100% width, 520px height

Implementation: vis-network JavaScript library; breadth-first search implemented client-side in JavaScript over an adjacency list built from the edge DataSet
</details>

## Putting It Together: Dependency Analysis

Every term introduced in this chapter — dependency, prerequisite chain, foundational and goal concepts, ready-to-learn and learned concepts, skill gap, transitive dependency, hop count — is a building block for one overarching practice. **Dependency Analysis** is the systematic examination of a learning graph's dependency structure to answer practical questions about sequencing, readiness, and gaps: which concepts are foundational, which are bottlenecks that many others depend on, what a specific learner's skill gap is relative to a goal, and how many hops separate any two concepts.

Dependency analysis is not a single algorithm; it's a category of queries a learning-graph tool needs to support. The table below summarizes the questions this chapter's vocabulary lets you ask, and which term supplies the answer.

| Question | Answered Using |
|---|---|
| "What must be true before I can start this concept?" | Prerequisite Concept, Prerequisite Chain |
| "Which concepts have no prerequisites at all?" | Foundational Concept |
| "What is this learner or course ultimately working toward?" | Goal Concept (Immediate / Intermediate / Ultimate) |
| "What can this learner attempt right now?" | Ready-to-Learn Concept |
| "What has this learner already mastered?" | Learned Concept |
| "What stands between this learner and their goal?" | Skill Gap |
| "Is Concept A required for Concept B, even indirectly?" | Transitive Dependency |
| "How far apart are two concepts in the prerequisite structure?" | Hop Count |

Dependency analysis is also where a course designer catches structural problems before they reach a learner — a goal concept with an impossibly long skill gap for its target audience, or a concept nobody's chain ever reaches, both surface through the same kind of systematic pass across the graph. Chapter 5 picks this thread back up under the heading of learning graph validation, applying dependency-analysis techniques specifically to catch broken or malformed graphs.

#### Diagram: Dependency Analysis Console

<iframe src="../../sims/dependency-analysis-console/main.html" width="100%" height="562px" scrolling="no"></iframe>

<details markdown="1">
<summary>Dependency Analysis Console</summary>
Type: infographic
**sim-id:** dependency-analysis-console<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners a single console-style tool that runs the four most common dependency-analysis queries (foundational concepts, ready-to-learn set, skill gap to a goal, hop count between two concepts) against one shared dataset, reinforcing that these are variations on one underlying analytical practice.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, justify

Learning objective: Given a dependency graph and a specified learner state, the learner can select the correct dependency-analysis query for a given practical question and interpret its result.

Base dataset: same 9-node math-sequence subgraph used earlier in this chapter, with an adjustable "learned concepts" checklist (defaults: Number Sense, Arithmetic learned)

Interactive controls (left panel, query selector as radio buttons):
- "Show Foundational Concepts" — highlights all nodes with zero outgoing edges gold
- "Show Ready-to-Learn Set" — highlights all nodes whose prerequisites are fully in the learned set
- "Show Skill Gap to Goal" — adds a goal-concept dropdown; on selection, highlights every unlearned concept on any path from the learner's learned set to the goal
- "Show Hop Count Between Two Concepts" — adds two concept dropdowns and reuses the shortest-path behavior from the Transitive Dependency and Hop Count Finder diagram earlier in this chapter

Behavior: selecting a query re-renders the graph highlighting per that query's rule; a results panel on the right states the finding in one sentence, e.g. "Skill Gap to Applied Calculus: Algebra, Geometry, Trigonometry, Functions, Derivatives, Integrals (6 concepts)."

Visual styling:
- Base graph: light blue circles, hierarchical layout, black arrows
- Query-specific highlight color: gold for foundational, green for ready-to-learn, red for skill gap, purple path with numbered hop badges for hop count

Canvas size: responsive, 100% width, 560px height (graph) with a fixed-width control/results side panel

Implementation: vis-network JavaScript library with four client-side query functions sharing one adjacency-list representation of the dataset; UI built with plain HTML radio buttons and dropdowns bound to re-render calls
</details>

## Key Takeaways

- A **concept dependency** (equivalently, a **prerequisite relationship**) is the one edge type in a learning graph: one concept must be learned before another.
- A **prerequisite concept** sits at the "must learn first" end of an edge; a **foundational concept** is a prerequisite concept with no prerequisites of its own.
- A **prerequisite chain** is a path of concept dependencies strung end to end from an advanced concept down to a foundational one.
- A **goal concept** is a desired learning outcome; **immediate**, **intermediate**, and **ultimate goals** describe how far that outcome sits from a learner's current position, and all three are kinds of **learning goal**.
- A **ready-to-learn concept** has every prerequisite already satisfied; a **learned concept** is one a specific learner has demonstrably mastered — and mastering a ready-to-learn concept can cascade to unlock new ready-to-learn concepts.
- A **skill gap** is the named, ordered set of unlearned concepts standing between a learner and a goal concept.
- A **transitive dependency** is an indirect prerequisite relationship reached through intermediate concepts; **hop count** measures how many edges that indirect path crosses.
- **Dependency analysis** is the umbrella practice of running these queries — foundational-concept detection, ready-to-learn computation, skill-gap analysis, hop-count measurement — against a learning graph to support sequencing and personalization.

!!! mascot-celebration "Well done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you can now trace a full dependency chain from any concept down to its foundations, name every stage of a learner's readiness, and compute the skill gap between where someone is and where they're headed. That's the exact reasoning a personalization engine performs, just done by hand instead of by code. Next, we turn from individual dependencies to organizing whole graphs of concepts into taxonomies. Let's connect the concepts!
