# References: Physics Simulation and Graph Layout

1. [Force-directed graph drawing](https://en.wikipedia.org/wiki/Force-directed_graph_drawing) - Wikipedia - Explains the class of algorithms that position nodes by simulating attractive spring forces on edges and repulsive charge forces between nodes, the exact mechanism behind vis-network's default physics simulation.

2. [Barnes–Hut simulation](https://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation) - Wikipedia - Describes the tree-based approximation algorithm, borrowed from astrophysics, that reduces repulsion-force computation from O(n²) to O(n log n), the same algorithm vis-network uses as its default physics solver.

3. [Layered graph drawing](https://en.wikipedia.org/wiki/Layered_graph_drawing) - Wikipedia - Covers Sugiyama-style hierarchical drawing, where vertices are assigned to horizontal or vertical layers by dependency depth, the rule-based alternative to physics-based layout this chapter presents.

4. Graph Drawing: Algorithms for the Visualization of Graphs - Giuseppe Di Battista, Peter Eades, Roberto Tamassia, Ioannis G. Tollis - Prentice Hall - The standard reference on graph layout theory, with chapters covering force-directed methods and hierarchical (layered) drawing that ground this chapter's two layout strategies.

5. Handbook of Graph Drawing and Visualization - Roberto Tamassia (ed.) - CRC Press - A comprehensive edited reference spanning force-directed, spectral, and hierarchical layout algorithms, useful for readers who want the deeper mathematics behind vis-network's solver choices.

6. [Network Physics Documentation](https://visjs.github.io/vis-network/docs/network/physics.html) - vis.js - Official documentation of vis-network's `physics` options, covering the Barnes-Hut, ForceAtlas2, repulsion, and hierarchicalRepulsion solvers plus damping and spring-length parameters used throughout this chapter.

7. [Network Layout Documentation](https://visjs.github.io/vis-network/docs/network/layout.html) - vis.js - Official documentation of the `layout` options block, detailing hierarchical layout configuration including `direction`, `levelSeparation`, `nodeSpacing`, and `sortMethod`, the exact settings this chapter's code examples use.

8. [Hierarchical Layout Example](https://visjs.github.io/vis-network/examples/network/layout/hierarchicalLayout.html) - vis.js - A runnable example demonstrating automatic level assignment in a scale-free network, illustrating how hierarchical layout positions nodes by dependency depth rather than simulated forces.

9. [Forceatlas2, a Continuous Graph Layout Algorithm](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679) - PLOS ONE - The original Jacomy et al. paper introducing ForceAtlas2, explaining its degree-dependent repulsion and adaptive-speed design that make it well suited to graphs with uneven node degree, like learning graphs with hub concepts.

10. [d3-force](https://d3js.org/d3-force) - D3.js - Documentation for a widely used alternative force-simulation library, useful for comparing its center, collide, link, and many-body forces against vis-network's Barnes-Hut and central-gravity equivalents covered in this chapter.
