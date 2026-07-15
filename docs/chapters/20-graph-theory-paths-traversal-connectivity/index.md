---
title: Graph Theory II - Paths, Traversal, and Connectivity
description: Extends Chapter 1's graph vocabulary with directed-edge orientation, paths, reachability, adjacency representations, and the depth-first and breadth-first traversal algorithms that walk a learning graph systematically.
generated_by: claude skill chapter-content-generator
date: 2026-07-15 00:00:00
version: 0.09
---

# Graph Theory II: Paths, Traversal, and Connectivity

## Summary

Extends Chapter 1's introductory graph vocabulary with the directional mechanics of edges, the paths and reachability relationships those edges create, and the two standard algorithms — depth-first and breadth-first search — for walking a graph systematically. Covers the two representations, adjacency lists and adjacency matrices, that a program uses to store a graph before it can traverse it. After this chapter, readers can trace a path between any two concepts by hand, choose the right traversal algorithm for a given question, and explain why a learning graph's weak connectivity does not guarantee every concept is reachable from every other.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Directed Edge
2. Edge Direction
3. Incoming Edge
4. Outgoing Edge
5. Source Node
6. Sink Node
7. Graph Path
8. Path Length
9. Reachability
10. Weak Connectivity
11. Strong Connectivity
12. Connected Component
13. Adjacency List
14. Adjacency Matrix
15. Graph Traversal
16. Depth-First Search
17. Breadth-First Search
18. Graph Schema

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Concept Graphs](../01-foundations-of-concept-graphs/index.md)
- [Chapter 3: Concept Dependencies and Prerequisites](../03-concept-dependencies-prerequisites/index.md)
- [Chapter 5: Learning Graph Quality, Validation, and File Formats](../05-graph-quality-validation-file-formats/index.md)

---

!!! mascot-welcome "Back to the Edges, One More Time"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 1 gave you nodes and edges as vocabulary. This chapter gives you the mechanics: which way an edge actually points, what it means for one concept to be *reachable* from another, and the two algorithms — depth-first and breadth-first search — that a program uses to walk a graph and answer those questions automatically. Everything here is graph theory your book has been quietly running underneath every viewer, validator, and recommendation engine since Chapter 1.

## Directed Edge, Edge Direction, and the Two Ends of a Connection

A **Directed Edge** is an edge that points from exactly one node to exactly one other node, carrying a direction rather than merely indicating "these two nodes are related." Directed Edge depends on Edge and Directed Graph in the learning graph — it is the specific kind of edge a directed graph is built from, as opposed to the undirected edges used in graphs where relationships run both ways equally. A learning graph is directed for a concrete reason: "Multiplication depends on Addition" is not a symmetric statement. Addition does not depend on Multiplication back.

Because a directed edge points somewhere, it has an **Edge Direction** — the specific orientation of a directed edge, identifying which endpoint is the source of the relationship and which is the target. Edge Direction depends directly on Directed Edge in the learning graph. This book has stressed edge direction before, in the danger notice every chapter-generation skill repeats: in this project's `learning-graph.json`, an edge from concept 5 to concept 1 means "concept 5 depends on concept 1," not the reverse. Getting the direction backward does not throw an error — it silently produces a graph that looks plausible but sequences every chapter wrong.

!!! mascot-warning "Direction Is Not Decoration"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    An arrowhead on a rendered edge is not a stylistic flourish — it is the entire piece of information that makes a dependency graph usable. Flip it, and "Learning Graph depends on Knowledge Graph" silently becomes "Knowledge Graph depends on Learning Graph." Every validator, every chapter-ordering script, and every recommendation engine in this book trusts that arrowhead completely.

Every directed edge touches a node on each end, and those two touches have different names depending on which node you are standing at. An **Incoming Edge**, from the perspective of a given node, is a directed edge whose arrowhead points into that node — meaning some other concept depends on it. An **Outgoing Edge**, from the perspective of a given node, is a directed edge whose tail leaves that node and points toward another node — meaning that node depends on something else. Both Incoming Edge and Outgoing Edge depend directly on Directed Edge in the learning graph; they are the same directed edge, just described from opposite ends. Chapter 5 already gave you the counting versions of these ideas — indegree counts incoming edges, outdegree counts outgoing edges — but Incoming Edge and Outgoing Edge name the edges themselves, not just their tally.

This distinction produces two special roles a node can play. A **Source Node**, within a specific path or subgraph, is a node with no incoming edges along that path — nothing points into it, so it is where a path can legitimately begin. A **Sink Node**, within a specific path or subgraph, is a node with no outgoing edges along that path — nothing leaves it, so it is where a path must end. Both Source Node and Sink Node depend on Incoming Edge and Outgoing Edge in the learning graph. Don't confuse these path-local roles with Chapter 3's Foundational Concept and Goal Concept — a source or sink is defined relative to one path you are tracing, while foundational and goal concepts describe a node's role in the whole graph.

## Graph Path, Path Length, and Reachability

With directed edges and their endpoints defined, the next question is what happens when you chain several of them together. A **Graph Path** is a sequence of nodes connected end-to-end by directed edges, where each edge in the sequence points from one node in the sequence to the next. Graph Path depends on Graph Representation and Directed Edge in the learning graph — it is the first genuinely multi-edge structure this book has named, built directly on top of the single-edge vocabulary above.

A path has a measurable size. **Path Length** is the number of edges traversed along a graph path — not the number of nodes visited, which is always one greater than the path length. Path Length depends directly on Graph Path in the learning graph. This distinction trips up more learners than it should: a path through four nodes has a path length of three, not four, because length counts the hops, not the stops.

A path answers a yes-or-no question that this book has relied on implicitly since Chapter 3, and now names explicitly. **Reachability** is the property of one node being connected to another through some graph path, regardless of that path's length. Reachability depends directly on Graph Path in the learning graph. Every "prerequisite chain" Chapter 3 described is really a reachability claim: "Multiplication is reachable from Addition" is the graph-theory way of saying Addition is (possibly indirectly) a prerequisite of Multiplication.

!!! mascot-thinking "Reachable Does Not Mean Adjacent"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A concept ten prerequisite-hops away is still reachable — reachability makes no promise about path length, only that some path exists. This matters for Chapter 21's centrality metrics, which need reachability as a starting definition before they can measure *how far* things are, not just *whether* they connect.

## Weak Connectivity, Strong Connectivity, and Connected Components

Reachability describes a relationship between two specific nodes. Connectivity scales that idea up to describe an entire graph, and it comes in two strengths that are easy to conflate. **Weak Connectivity** is the property of a graph in which every pair of nodes is connected by *some* path if you ignore edge direction entirely — treat every directed edge as if it were undirected, and check whether the graph holds together as one piece. Weak Connectivity depends directly on Graph Connectivity in the learning graph, applying Chapter 5's general connectivity check to the specific case where direction is set aside. **Strong Connectivity** is the stricter property of a graph in which every pair of nodes is mutually reachable — for any two nodes A and B, a directed path exists from A to B *and* a directed path exists from B to A. Strong Connectivity depends directly on Reachability in the learning graph.

A well-formed learning graph is essentially never strongly connected, and that is by design, not a defect: strong connectivity would require every concept to depend on every other concept, including its own dependents, which is exactly the cycle a DAG forbids. A learning graph should, however, be weakly connected — every concept should link back to the graph's main body somehow, even if the directed path only runs one way.

| Connectivity Type | Requirement | Typical in a Learning Graph? |
|---|---|---|
| Weak Connectivity | Every node pair joined by *some* path, direction ignored | Yes — this is the healthy default state |
| Strong Connectivity | Every node pair mutually reachable in *both* directions | No — would require a cycle, which breaks the DAG property |

When weak connectivity fails, the graph splits into pieces, and each piece has a name. A **Connected Component** is a maximal set of nodes in which every pair is joined by some path (again ignoring direction) but which shares no path with any node outside the set. Connected Component depends directly on Weak Connectivity in the learning graph. Chapter 19's own session log gave you a real example of this concept in action before this chapter ever named it: the first quality-validation pass on this project's own graph found seven separate connected components, and the fix — six targeted edges — merged them into the single connected component a healthy learning graph needs.

## Adjacency List and Adjacency Matrix: Two Ways to Store a Graph

Before any traversal algorithm can walk a graph, a program needs to store the graph's edges in memory in a form the algorithm can query quickly, and there are two standard choices. An **Adjacency List** is a graph representation in which every node stores a list of the nodes it directly connects to, so looking up "what does this node point to" is a fast, direct lookup for one node at a time. An **Adjacency Matrix** is a graph representation using a two-dimensional grid, one row and one column per node, where a marked cell at row A, column B indicates a directed edge from A to B. Both Adjacency List and Adjacency Matrix depend directly on Graph Representation in the learning graph, and both encode exactly the same information — they simply trade off differently on speed and memory depending on how the graph is shaped.

!!! mascot-tip "Pick the Representation That Matches Your Graph's Shape"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    An adjacency list is compact and fast for graphs where each node connects to only a few others — exactly the shape of this book's own 400-concept, 490-edge graph, where the average concept has just over one dependency. An adjacency matrix wastes memory on a sparse graph like that (imagine a 400-by-400 grid where fewer than 1% of cells are marked) but becomes competitive when a graph is dense, because checking "does an edge exist between A and B" is a single grid lookup instead of a list scan.

| Representation | Best For | Cost to Check "Does A → B Exist?" |
|---|---|---|
| Adjacency List | Sparse graphs (few edges relative to nodes) — most learning graphs | Scan A's list — proportional to A's outdegree |
| Adjacency Matrix | Dense graphs (many edges relative to nodes) | One direct grid lookup — constant time |

## Graph Traversal, Depth-First Search, and Breadth-First Search

With a representation chosen, an algorithm can finally walk the graph, and **Graph Traversal** is the general process of visiting every node reachable from a starting node by systematically following edges, without skipping any and without visiting the same node twice. Graph Traversal depends directly on Graph Path in the learning graph — it is what you get when you follow paths outward from a starting point in a disciplined, complete way rather than tracing one path by hand.

Two disciplines for doing this systematically dominate graph theory, and they differ in exactly one decision: which unvisited node to expand next. **Depth-First Search** is a graph-traversal strategy that follows one path as far as it can go before backtracking to explore alternatives — it commits fully to a single branch before trying the next one. Depth-First Search depends directly on Graph Traversal in the learning graph. **Breadth-First Search** is a graph-traversal strategy that visits all of a node's immediate neighbors before moving on to their neighbors — it explores the graph in expanding rings outward from the start, one hop-distance at a time. Breadth-First Search depends directly on Graph Traversal in the learning graph.

Both algorithms visit the same set of reachable nodes eventually; they differ only in the *order* they visit them, and that order has real pedagogical consequences for a learning graph.

| Algorithm | Explores | Answers Well | Answers Poorly |
|---|---|---|---|
| Depth-First Search | One branch fully before backtracking | "What is the deepest prerequisite chain under this concept?" | "What can I learn next, closest first?" |
| Breadth-First Search | All neighbors before going deeper | "What concepts are exactly two prerequisites away?" — closest-first sequencing | "What is the single longest chain from here?" |

Before we look at how these two strategies diverge on the same graph, let's define the one term the diagram below relies on: a node is **visited** the first time either algorithm reaches it, and once visited, a node is never re-queued, which is what keeps traversal from looping forever on a graph that happens to contain a shared ancestor two different paths pass through.

#### Diagram: Graph Traversal Step-Through — DFS vs. BFS


<iframe src="../../sims/graph-traversal-step-through/main.html" width="100%" height="542px" scrolling="no"></iframe>
[Run Graph Traversal Step-Through — DFS vs. BFS Fullscreen](../../sims/graph-traversal-step-through/main.html)

<details markdown="1">
<summary>Graph Traversal Step-Through — DFS vs. BFS</summary>
Type: microsim
**sim-id:** graph-traversal-step-through<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners step through Depth-First Search and Breadth-First Search on the same small directed graph, side by side, so the difference in visiting order becomes visible rather than theoretical.

Bloom Level: Analyze (L4)
Bloom Verb: compare, trace, differentiate

Learning objective: Given the same 10-node directed graph rendered twice, the learner can step both a depth-first and a breadth-first traversal from the same start node one click at a time and correctly predict which node is visited next at each step, explaining why the two orders diverge at the first branching node.

Canvas layout: two side-by-side vis-network panels (DFS left, BFS right), each 340px wide by 380px tall; a shared "Start Node" dropdown and "Step Forward" / "Reset" button row above both panels; a numbered visit-order list below each panel

Visual elements: identical 10-node, 12-edge sample graph in both panels; unvisited nodes light gray, the current node gold with a pulsing border, visited nodes blue with a small order-number badge (1, 2, 3, ...); the node currently being backtracked from (DFS only) shown with a dashed outline

Interactive controls: "Step Forward" advances both traversals by exactly one visit simultaneously; "Reset" clears both panels and order lists; hovering any node shows its adjacency list as a tooltip; a "Run to Completion" button animates both traversals at a fixed 600ms-per-step pace

Default parameters: start node preset to the graph's single source node; both panels reset and empty on load; step counter reads "Step 0 of 10"

Data Visibility Requirements:
Stage 1: On each "Step Forward" click, highlight the newly visited node in both panels and append it to that panel's order list
Stage 2: When DFS and BFS diverge (visit different nodes at the same step number), flash a connecting highlight between the two panels' current-node markers
Stage 3: On completion, display both final visit-order sequences stacked for direct side-by-side comparison, with the first point of divergence outlined in gold

Instructional Rationale: An Analyze-level objective requires learners to compare two processes operating on identical input — a single traversal in isolation cannot support that comparison, but two synchronized, steppable traversals on the same graph can.

Responsive behavior: panels stack vertically below 700px width; controls remain fixed above both panels

Canvas size: responsive, 100% width, 520px height

Implementation: vis-network for both graph panels sharing one dataset; a JavaScript step function maintains two independent visited-sets and frontier structures (a stack for DFS, a queue for BFS) and advances both by exactly one dequeue/pop per click
</details>

## Graph Schema: Formalizing the Whole Data Model

Every representation and algorithm this chapter has covered assumes the graph's data is shaped consistently — every node has an ID, every edge has a `from` and a `to`, every group has a color. That consistent shape has a name. A **Graph Schema** is a formal specification of the fields, types, and required structure that every node, edge, and group in a graph dataset must conform to. Graph Schema depends directly on Graph Representation in the learning graph. This is not an abstract idea for this project — `learning-graph-schema.json`, referenced throughout this book's own generation pipeline, *is* a graph schema, and it is what `validate-learning-graph.sh` checks every generated `learning-graph.json` file against before anyone trusts it.

!!! mascot-encourage "This Is the Last Purely Structural Chapter"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If directed edges, adjacency representations, and two traversal algorithms in one chapter felt dense, that is because this chapter deliberately front-loaded the graph-theory machinery the rest of this book's advanced-topics chapters lean on. Chapter 21 puts these tools to work measuring real graphs rather than defining new structural vocabulary — the hardest vocabulary lift is behind you.

## Synthesis: From Vocabulary to Mechanics

Chapter 1 gave you the nouns — concept, node, edge, DAG. This chapter gave you the mechanics that make those nouns computable: which way an edge points, what a path and its length actually measure, when a graph counts as reachable or connected, how a graph is stored so an algorithm can query it quickly, and the two disciplined strategies — depth-first and breadth-first search — for walking it completely. Every later advanced-topics chapter in this extension leans on this vocabulary directly: Chapter 21's centrality metrics measure distances along the paths defined here, Chapter 23's dependency-modeling patterns describe more nuanced kinds of the directed edges defined here, and Chapter 25's validators run traversal-based checks — reachability from foundational concepts, connected-component counts — to catch the same structural problems Chapter 5 first introduced and this chapter just gave you the machinery to detect by hand.

!!! mascot-celebration "You Can Now Trace a Graph by Hand"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress. You can now look at any small directed graph and correctly identify its sources and sinks, trace a path and state its length, tell weak connectivity from strong connectivity without hesitating, and predict — not just recognize — the visiting order a depth-first or breadth-first search would produce. That is real graph-theory fluency, not just vocabulary recall. Let's connect the concepts — Chapter 21 is waiting to put these tools to work.

[See Annotated References](./references.md)
