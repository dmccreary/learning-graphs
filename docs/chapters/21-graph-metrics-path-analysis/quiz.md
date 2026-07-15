# Quiz: Graph Metrics and Path Analysis

Test your understanding of graph metrics and path analysis with these review questions.

---

#### 1. Which term names "any concept that a given concept depends on, either directly or through a chain of intermediate dependencies"?

<div class="upper-alpha" markdown>
1. Descendant Concept
2. Ancestor Concept
3. Terminal Concept
4. Bottleneck Concept
</div>

??? question "Show Answer"
    The correct answer is **B**. An Ancestor Concept is everything a given concept depends on, direct or transitive. Descendant Concept describes the reverse relationship (what depends on the concept), while Terminal Concept and Bottleneck Concept describe single-node structural roles rather than a whole set of related concepts.

    **Concept Tested:** Ancestor Concept

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 2. A reviewer finds a concept with zero descendants — nothing in the graph depends on it. Which concept role does this describe?

<div class="upper-alpha" markdown>
1. Root Concept
2. Terminal Concept
3. Ancestor Concept
4. Critical Path
</div>

??? question "Show Answer"
    The correct answer is **B**. A Terminal Concept has no descendants — nothing depends on it — making it a natural stopping point for a learning path. Root Concept describes the opposite structural extreme (zero ancestors), and Ancestor Concept and Critical Path describe unrelated relationships or metrics.

    **Concept Tested:** Terminal Concept

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 3. Which concept is best described as "the complete set of all ancestor-descendant relationships implied by a graph's direct edges, including multi-hop chains"?

<div class="upper-alpha" markdown>
1. Transitive Reduction
2. Redundant Dependency
3. Transitive Closure
4. Graph Density
</div>

??? question "Show Answer"
    The correct answer is **C**. Transitive Closure is the complete set of implied ancestor-descendant relationships, including those only reachable through multi-hop chains. Transitive Reduction is the smallest edge set that still implies the same closure, Redundant Dependency is a specific edge that reduction would remove, and Graph Density measures edge count relative to a maximum, an unrelated metric.

    **Concept Tested:** Transitive Closure

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 4. A dependency CSV contains a direct edge "Calculus depends on Algebra," but this relationship is already implied by the chain Calculus → Functions → Algebra. What is this direct edge called?

<div class="upper-alpha" markdown>
1. Critical Path
2. Redundant Dependency
3. Bottleneck Concept
4. Dependency Depth
</div>

??? question "Show Answer"
    The correct answer is **B**. A Redundant Dependency is a direct edge that is unnecessary because the same relationship is already implied by an existing chain through other concepts — exactly the Calculus-to-Algebra scenario described. It is not an error, but transitive reduction would remove it. Critical Path, Bottleneck Concept, and Dependency Depth describe unrelated path-length and importance metrics.

    **Concept Tested:** Redundant Dependency

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 5. Which metric is the ratio of a graph's actual edge count to the maximum number of edges the graph could possibly have?

<div class="upper-alpha" markdown>
1. Graph Diameter
2. Degree Distribution
3. Graph Density
4. Maximum Path Length
</div>

??? question "Show Answer"
    The correct answer is **C**. Graph Density is exactly this ratio, expressed between 0 and 1. Degree Distribution instead breaks node-degree counts down concept by concept rather than producing one graph-wide ratio, and Graph Diameter and Maximum Path Length measure distance rather than edge-count ratios.

    **Concept Tested:** Graph Density

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 6. Which concept measures how often a node lies on the shortest path between two *other* nodes, even if its own direct-edge count is unremarkable?

<div class="upper-alpha" markdown>
1. Concept Centrality
2. Betweenness Centrality
3. Degree Distribution
4. Graph Density
</div>

??? question "Show Answer"
    The correct answer is **B**. Betweenness Centrality specifically measures how often a node sits on the shortest path between other node pairs, which can be high even when a node's own indegree and outdegree are modest. Concept Centrality is the broader family of metrics betweenness belongs to, and Degree Distribution and Graph Density describe unrelated whole-graph or per-node edge-count summaries.

    **Concept Tested:** Betweenness Centrality

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 7. A learning-graph designer wants to find concepts whose removal would disproportionately disconnect or constrain other concepts' learning paths. Which concept names this kind of structurally critical node?

<div class="upper-alpha" markdown>
1. Root Concept
2. Bottleneck Concept
3. Redundant Dependency
4. Transitive Reduction
</div>

??? question "Show Answer"
    The correct answer is **B**. A Bottleneck Concept is a concept whose removal or unlearned status would disconnect or severely constrain a disproportionate number of other concepts' learning paths — typically identified by combining degree information with betweenness centrality. Root Concept describes a graph-entry point, and Redundant Dependency and Transitive Reduction address unnecessary edges, not structurally critical nodes.

    **Concept Tested:** Bottleneck Concept

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 8. Which pair of terms correctly distinguishes a graph's single longest named chain of concepts from the numeric length of that chain?

<div class="upper-alpha" markdown>
1. Graph Diameter names the chain; Dependency Depth reports its length.
2. Critical Path names the chain; Maximum Path Length reports its length.
3. Ancestor Concept names the chain; Betweenness Centrality reports its length.
4. Root Concept names the chain; Graph Density reports its length.
</div>

??? question "Show Answer"
    The correct answer is **B**. Critical Path is the specific longest unbroken prerequisite chain, and Maximum Path Length is that chain's length expressed as an edge count. Graph Diameter measures worst-case shortest-path distance between any two nodes rather than the longest prerequisite chain specifically, and the remaining pairs mismatch unrelated concepts entirely.

    **Concept Tested:** Critical Path

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 9. A specific concept sits 14 prerequisite hops from the nearest root concept along its deepest branch. Which metric does this number describe?

<div class="upper-alpha" markdown>
1. Graph Diameter
2. Dependency Depth
3. Graph Density
4. Degree Distribution
</div>

??? question "Show Answer"
    The correct answer is **B**. Dependency Depth is the length of the longest ancestor chain beneath one specific concept — how far that one concept sits from its nearest root. Graph Diameter instead measures the worst-case shortest-path distance across the *whole* graph between any two nodes, not one concept's depth, and Graph Density and Degree Distribution describe edge-count summaries unrelated to depth.

    **Concept Tested:** Dependency Depth

    **See:** [Graph Metrics and Path Analysis](index.md)

---

#### 10. Which concept is defined as "the greatest shortest-path distance between any two nodes in a graph"?

<div class="upper-alpha" markdown>
1. Maximum Path Length
2. Critical Path
3. Graph Diameter
4. Dependency Depth
</div>

??? question "Show Answer"
    The correct answer is **C**. Graph Diameter takes the shortest path between every pair of nodes and reports the longest one of those shortest paths — a graph-wide worst-case distance. Maximum Path Length and Critical Path instead describe the graph's single longest chain of dependencies specifically, and Dependency Depth measures one concept's distance from its nearest root rather than a graph-wide worst case.

    **Concept Tested:** Graph Diameter

    **See:** [Graph Metrics and Path Analysis](index.md)

---
