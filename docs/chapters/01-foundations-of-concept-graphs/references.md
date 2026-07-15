# References: Foundations of Concept Graphs

1. [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia - Explains the formal definition, properties, and applications of DAGs, including why acyclicity guarantees a valid topological ordering — the exact property that makes a learning graph sequenceable.

2. [Knowledge graph](https://en.wikipedia.org/wiki/Knowledge_graph) - Wikipedia - Describes how knowledge graphs represent entities and typed relationships at scale, giving context for how a learning graph specializes this broader structure to one node type and one edge meaning.

3. [Graph theory](https://en.wikipedia.org/wiki/Graph_theory) - Wikipedia - Surveys the mathematical study of graphs, nodes, and edges that underlies this chapter's vocabulary of graph representation, directed graphs, and structural variations like hierarchies and clusters.

4. Introduction to Graph Theory (2nd Edition) - Douglas B. West - Prentice Hall - The standard university reference for formal graph definitions, directed graphs, trees, and acyclic structures; grounds this chapter's informal vocabulary in rigorous graph-theoretic proofs and terminology.

5. Networks, Crowds, and Markets: Reasoning About a Highly Connected World - David Easley and Jon Kleinberg - Cambridge University Press - Shows how graph, network, and hierarchy concepts apply to real interconnected systems, illustrating why structural choices like clustering and hybrid layouts matter beyond pure theory.

6. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - vis.js - Official reference for the JavaScript library used to render this chapter's interactive graph diagrams, covering node/edge data structures, hierarchical layouts, and physics-based clustering options.

7. [Directed Graph](https://mathworld.wolfram.com/DirectedGraph.html) - Wolfram MathWorld - A concise mathematical reference defining directed graphs as ordered pairs of vertices, reinforcing the formal G = (V, E) notation this chapter uses to distinguish directed from undirected structures.

8. [Acyclic Graph](https://mathworld.wolfram.com/AcyclicGraph.html) - Wolfram MathWorld - Defines acyclic graphs and their tree/forest special cases, complementing the chapter's explanation of why a learning graph must forbid cycles to guarantee a valid starting point.

9. [Lecture 14: Depth-First Search (DFS), Topological Sort](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-14-depth-first-search-dfs-topological-sort/) - MIT OpenCourseWare - A free university lecture covering how DFS detects cycles and produces a topological order on a DAG, the algorithmic basis for validating and sequencing a learning graph.

10. [Detect Cycle in a Graph](https://www.geeksforgeeks.org/dsa/detect-cycle-in-a-graph/) - GeeksforGeeks - A practical tutorial with working code for detecting cycles in directed graphs, directly supporting this chapter's discussion of why cycle detection is essential before trusting a graph for sequencing.
