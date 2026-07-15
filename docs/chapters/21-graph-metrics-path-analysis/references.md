# References: Graph Metrics and Path Analysis

1. [Centrality](https://en.wikipedia.org/wiki/Centrality) - Wikipedia - Surveys the family of centrality metrics, including degree and betweenness centrality, the umbrella concept this chapter's Concept Centrality section introduces before narrowing to betweenness specifically.

2. [Betweenness centrality](https://en.wikipedia.org/wiki/Betweenness_centrality) - Wikipedia - Defines betweenness centrality formally in terms of shortest paths passing through a node, directly underlying this chapter's Betweenness Centrality section and its heatmap MicroSim specification.

3. [Transitive closure](https://en.wikipedia.org/wiki/Transitive_closure) - Wikipedia - Explains transitive closure as the complete set of implied relationships in a directed graph, the formal basis for this chapter's Transitive Closure section.

4. [Transitive reduction](https://en.wikipedia.org/wiki/Transitive_reduction) - Wikipedia - Explains the smallest edge set preserving a graph's transitive closure, directly underlying this chapter's Transitive Reduction and Redundant Dependency sections.

5. [Dense graph](https://en.wikipedia.org/wiki/Dense_graph) - Wikipedia - Covers the sparse-versus-dense distinction in graph theory, background for this chapter's Graph Density section and its claim that learning graphs are typically sparse.

6. [Degree distribution](https://en.wikipedia.org/wiki/Degree_distribution) - Wikipedia - Defines degree distribution as a per-node-degree summary across a graph, directly underlying this chapter's Degree Distribution section.

7. [Distance (graph theory)](https://en.wikipedia.org/wiki/Distance_(graph_theory)) - Wikipedia - Formalizes shortest-path distance and graph diameter, the mathematical basis for this chapter's Graph Diameter section.

8. [Critical path method](https://en.wikipedia.org/wiki/Critical_path_method) - Wikipedia - Describes the project-management technique this chapter's Critical Path section borrows its terminology from, substituting prerequisite concepts for project tasks.

9. Introduction to Algorithms (4th Edition) - Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein - MIT Press - Covers Brandes' algorithm for computing betweenness centrality efficiently and transitive-closure algorithms, the implementation basis referenced in this chapter's centrality MicroSim specification.

10. [Network science](https://en.wikipedia.org/wiki/Network_science) - Wikipedia - Surveys how centrality, density, and diameter metrics are applied to real-world networks at scale, broader context for why this chapter's per-graph metrics generalize beyond learning graphs specifically.
