# Quiz: Graph Theory II - Paths, Traversal, and Connectivity

Test your understanding of graph paths, traversal, and connectivity with these review questions.

---

#### 1. Which term names the following idea: "An edge that points from exactly one node to exactly one other node, carrying a direction rather than an undirected relationship."?

<div class="upper-alpha" markdown>
1. Graph Path
2. Directed Edge
3. Adjacency List
4. Connected Component
</div>

??? question "Show Answer"
    The correct answer is **B**. A Directed Edge is an edge that points from exactly one node to exactly one other node, carrying a direction. Graph Path, Adjacency List, and Connected Component name related but distinct ideas — a path is a chain of such edges, an adjacency list is a way to store them, and a connected component describes a set of nodes joined by them, but none of the three is the single directed edge itself.

    **Concept Tested:** Directed Edge

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 2. A learner is tracing a dependency chain and needs to identify "a node with no incoming edges along the path being traced, so it is where the path can legitimately begin." Which concept applies?

<div class="upper-alpha" markdown>
1. Sink Node
2. Source Node
3. Connected Component
4. Path Length
</div>

??? question "Show Answer"
    The correct answer is **B**. A Source Node has no incoming edges along a given path, making it the path's legitimate starting point. Sink Node describes the opposite role (no outgoing edges), while Connected Component and Path Length describe properties of a whole graph or a whole path rather than a single node's role within it.

    **Concept Tested:** Source Node

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 3. Which statement best distinguishes Path Length from a simple node count along a graph path?

<div class="upper-alpha" markdown>
1. Path Length counts the number of edges traversed, which is always one fewer than the number of nodes visited.
2. Path Length counts the number of nodes visited, including the starting node.
3. Path Length is only defined for paths that form a cycle.
4. Path Length measures reachability rather than distance.
</div>

??? question "Show Answer"
    The correct answer is **A**. Path Length is the number of edges traversed along a path, not the number of nodes — a path through four nodes has a path length of three. Option B describes node count, not path length; option C is false because a valid DAG path never forms a cycle; option D confuses path length with the separate concept of reachability.

    **Concept Tested:** Path Length

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 4. A project team needs to verify "one node is connected to another through some graph path, regardless of that path's length." Which concept should the team apply?

<div class="upper-alpha" markdown>
1. Reachability
2. Strong Connectivity
3. Adjacency Matrix
4. Graph Schema
</div>

??? question "Show Answer"
    The correct answer is **A**. Reachability is the property of one node being connected to another through some graph path, regardless of length. Strong Connectivity requires mutual reachability between *every* pair of nodes in a graph, which is a stricter, graph-wide property rather than a single node-to-node check; Adjacency Matrix and Graph Schema describe storage and formatting concerns, not connectivity.

    **Concept Tested:** Reachability

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 5. Which description best differentiates Weak Connectivity from Strong Connectivity?

<div class="upper-alpha" markdown>
1. Weak Connectivity requires mutual reachability in both directions; Strong Connectivity ignores edge direction entirely.
2. Weak Connectivity ignores edge direction and only requires the graph to hold together as one piece; Strong Connectivity requires every pair of nodes to be mutually reachable in both directions.
3. Weak Connectivity and Strong Connectivity are two names for the same property.
4. Weak Connectivity applies only to undirected graphs, and Strong Connectivity applies only to directed acyclic graphs.
</div>

??? question "Show Answer"
    The correct answer is **B**. Weak Connectivity treats edges as undirected and requires the whole graph to hold together as one piece; Strong Connectivity is the stricter requirement that every node pair be mutually reachable in both directions — a property a valid DAG (like a learning graph) should never have, since it would require a cycle. Options A reverses the definitions, C denies a real distinction the chapter draws, and D misapplies the terms to graph types rather than connectivity properties.

    **Concept Tested:** Weak Connectivity

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 6. A quality-validation script reports that a 400-node learning graph splits into "a maximal set of nodes joined by some path, ignoring direction, that shares no path with any node outside the set." Which concept does this describe?

<div class="upper-alpha" markdown>
1. Graph Traversal
2. Depth-First Search
3. Connected Component
4. Adjacency List
</div>

??? question "Show Answer"
    The correct answer is **C**. A Connected Component is a maximal set of nodes joined by some path (direction ignored) that has no path to any node outside the set — exactly the structure a validator flags when a graph splits into isolated pieces. Graph Traversal and Depth-First Search describe processes for walking a graph rather than a structural grouping, and Adjacency List describes a storage format.

    **Concept Tested:** Connected Component

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 7. Which representation would be the better choice for a sparse learning graph where most concepts depend on only one or two prerequisites, and why?

<div class="upper-alpha" markdown>
1. Adjacency Matrix, because a grid lookup is always faster regardless of graph density.
2. Adjacency List, because it avoids wasting memory on mostly-empty grid cells in a sparse graph.
3. Adjacency Matrix, because it is required for depth-first search to function correctly.
4. Adjacency List, because it is the only representation that supports directed edges.
</div>

??? question "Show Answer"
    The correct answer is **B**. An Adjacency List avoids wasting memory on the mostly-empty cells an Adjacency Matrix would allocate for a sparse graph, where each node connects to only a few others — exactly the shape of a typical learning graph. Option A is false because matrix lookups only win on dense graphs; option C is false because both traversal algorithms work with either representation; option D is false because adjacency matrices support directed edges just as well.

    **Concept Tested:** Adjacency List

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 8. Which traversal strategy "follows one path as far as it can go before backtracking to explore alternatives"?

<div class="upper-alpha" markdown>
1. Breadth-First Search
2. Graph Schema
3. Depth-First Search
4. Reachability
</div>

??? question "Show Answer"
    The correct answer is **C**. Depth-First Search commits to one branch fully before backtracking to try the next. Breadth-First Search instead visits all of a node's immediate neighbors before going deeper, making it the opposite strategy. Graph Schema and Reachability are not traversal strategies at all — one is a data-shape specification, the other a node-to-node connectivity property.

    **Concept Tested:** Depth-First Search

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 9. A curriculum designer wants to sequence "what can a learner study next, closest prerequisite distance first." Which traversal strategy best matches that goal, and why?

<div class="upper-alpha" markdown>
1. Depth-First Search, because it always finds the shortest path first.
2. Breadth-First Search, because it visits all of a node's immediate neighbors before moving farther out, naturally ordering nodes by hop-distance.
3. Depth-First Search, because it visits nodes in alphabetical order.
4. Breadth-First Search, because it ignores edge direction entirely.
</div>

??? question "Show Answer"
    The correct answer is **B**. Breadth-First Search visits nodes in expanding rings outward from the start, one hop-distance at a time, which naturally produces a closest-first ordering well suited to "what's next" sequencing. Depth-First Search instead commits to one deep branch first, which is well suited to finding the longest prerequisite chain but poorly suited to closest-first recommendations; options A, C, and D each misstate what the algorithms actually guarantee.

    **Concept Tested:** Breadth-First Search

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---

#### 10. Which concept is best described as "a formal specification of the fields, types, and required structure every node, edge, and group in a graph dataset must conform to"?

<div class="upper-alpha" markdown>
1. Graph Schema
2. Graph Traversal
3. Edge Direction
4. Path Length
</div>

??? question "Show Answer"
    The correct answer is **A**. Graph Schema is the formal specification a graph dataset's nodes, edges, and groups must conform to — exactly what `learning-graph-schema.json` defines and `validate-learning-graph.sh` checks against in this project's own pipeline. Graph Traversal describes a process rather than a structural specification, and Edge Direction and Path Length describe narrower properties of individual edges or paths, not the dataset's overall shape.

    **Concept Tested:** Graph Schema

    **See:** [Graph Theory II: Paths, Traversal, and Connectivity](index.md)

---
