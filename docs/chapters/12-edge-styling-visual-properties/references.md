# References: Edge Styling and Visual Properties

1. [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) - Wikipedia - Defines the control-point mathematics behind the curve family this chapter's Cubic Bezier Curve section uses to route vis-network edges around unrelated nodes.

2. [Directed graph](https://en.wikipedia.org/wiki/Directed_graph) - Wikipedia - Explains edges with a distinguished direction from one vertex to another, the structural concept this chapter's Edge Arrows section relies on to justify arrowheads pointing toward a prerequisite.

3. [Arrow (symbol)](https://en.wikipedia.org/wiki/Arrow_(symbol)) - Wikipedia - Traces how arrow glyphs came to conventionally represent direction in diagrams and notation, background for this chapter's claim that arrowhead placement is the single most meaning-bearing edge property.

4. Graph Drawing: Algorithms for the Visualization of Graphs - Giuseppe Di Battista, Peter Eades, Roberto Tamassia, and Ioannis G. Tollis - Prentice Hall - Covers edge-routing and curve-fitting algorithms used to reduce visual clutter in dense graphs, the same motivation this chapter gives for enabling Edge Smoothing.

5. Computer Graphics: Principles and Practice (3rd Edition) - James D. Foley, Andries van Dam, Steven K. Feiner, and John F. Hughes - Addison-Wesley - A comprehensive computer-graphics reference whose treatment of parametric curves underlies the Cubic Bezier Curve mathematics this chapter applies to edge rendering.

6. [vis-network Edges Documentation](https://visjs.github.io/vis-network/docs/network/edges.html) - vis.js Official Docs - The authoritative reference for every edge property this chapter covers, including label, color, width, dashes, smooth, arrows, and font, with full configuration syntax for each.

7. [Edge Styles: Static Smooth Curves](https://visjs.github.io/vis-network/examples/network/edgeStyles/smooth.html) - vis.js Official Docs - A live, draggable example contrasting static and dynamic smooth-curve settings, letting learners see the exact `smooth` behavior this chapter's Edge Smoothing section describes in prose.

8. [cubic-bezier.com](https://cubic-bezier.com/) - Lea Verou - An interactive tool for dragging a cubic Bezier curve's control points and watching the resulting path change in real time, useful for building intuition before applying `smooth.type: "cubicBezier"` in vis-network.

9. [Cubic Bezier Curve Implementation in C](https://www.geeksforgeeks.org/dsa/cubic-bezier-curve-implementation-in-c/) - GeeksforGeeks - Walks through the four-control-point parametric formula for cubic Bezier curves, the same P0/P1/P2/P3 structure vis-network uses internally when `smooth.type` is set to `cubicBezier`.

10. [Quadratic Bezier Curve: Convert Edges from Lines to Curved Paths](https://www.geeksforgeeks.org/data-visualization/quadratic-bezier-curve-convert-edges-from-lines-to-curved-paths/) - GeeksforGeeks - Demonstrates converting straight graph edges into curved paths for readability in dense networks, directly illustrating why this chapter recommends smoothing over straight edges for crowded learning graphs.
