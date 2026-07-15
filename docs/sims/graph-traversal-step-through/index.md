---
title: Graph Traversal Step-Through — DFS vs. BFS
description: Step a depth-first and a breadth-first traversal through the same 10-node directed graph one click at a time, and see exactly where the two visit orders diverge.
image: /sims/graph-traversal-step-through/graph-traversal-step-through.png
og:image: /sims/graph-traversal-step-through/graph-traversal-step-through.png
twitter:image: /sims/graph-traversal-step-through/graph-traversal-step-through.png
social:
   cards: false
status: implemented
library: vis-network
bloom_level: Analyze (L4)
---

# Graph Traversal Step-Through — DFS vs. BFS

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Graph Traversal Step-Through MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Depth-First Search and Breadth-First Search visit **exactly the same set of reachable nodes**.
They differ in one decision only: which unvisited node to expand next. DFS pulls from a stack
and commits to a branch; BFS pulls from a queue and finishes each ring before going deeper.

That single difference is hard to see when you trace one algorithm at a time. This MicroSim
renders the same 10-node, 12-edge directed graph twice and advances both traversals in
lockstep, one visit per click, so the divergence is something you watch happen rather than
something you take on faith.

The sample graph has a single source node (A) whose three children make it the first
branching node. Both traversals visit A first and B second. They split at step 3:

| | Visit order from A |
|---|---|
| Depth-First Search | A B **E** J F C G D H I |
| Breadth-First Search | A B **C** D E F G H I J |

Node J is a useful one to watch. DFS reaches it 4th, because J sits at the bottom of the
first branch DFS commits to. BFS reaches it 10th — last — because J is the only node three
hops from the start. Same node, same graph, same start; the order reflects what each
algorithm optimizes for.

## How to Use

1. **Step Forward** advances *both* traversals by exactly one visit. Before each click, try to
   predict which node each panel will take next. This prediction step is the point of the sim.
2. Watch for the **dashed orange connector** between the panels. It appears whenever the two
   traversals are sitting on different nodes, and it labels the mismatch (`E ≠ C`).
3. **Hover any node** to see its adjacency list — the outgoing edges each algorithm chooses from.
4. Look for the **dashed border** in the DFS panel. Those are the nodes just popped off the
   stack: DFS had to backtrack through them to reach its next node. The BFS panel never shows
   one, because a queue never backtracks.
5. Use the **Start node** dropdown to traverse from somewhere other than A. Starting at B or D
   reaches only 4 of the 10 nodes — a direct demonstration that reachability in a *directed*
   graph is not symmetric.
6. **Run to Completion** animates both traversals at 600ms per step; click again to pause.

Colors: gray = unvisited, gold = the node being visited right now, blue = visited, with a
circled badge showing its position in that panel's visit order.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/graph-traversal-step-through/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience

Instructional designers, curriculum developers, and educational technologists working with
concept dependency graphs.

### Duration

10–15 minutes

### Prerequisites

Learners should already be comfortable with **Directed Edge**, **Graph Path**, and
**Adjacency List** from [Chapter 20](../../chapters/20-graph-theory-paths-traversal-connectivity/index.md).

### Activities

1. **Predict and check** (5 min): Reset to node A. Before each **Step Forward** click, have
   learners write down which node each panel will visit next. Stop at the first miss and ask
   what rule they applied that the algorithm didn't.
2. **Locate the divergence** (5 min): Ask learners to identify the exact step where the orders
   split, then explain *why* it is step 3 rather than step 2 — both algorithms still agree on B,
   because both take A's first neighbor. The branching at A is the cause; the divergence
   surfaces one step later.
3. **Reachability** (5 min): Set the start node to D. Only 4 of 10 nodes are reachable. Ask
   which nodes are unreachable and why following arrows backward is not allowed.

### Assessment

Learners can:

- State that both traversals visit the same set of nodes and differ only in order.
- Identify step 3 as the first divergence and attribute it to the branching at node A.
- Explain why DFS visits J 4th while BFS visits J 10th.
- Predict the visit order for a start node they have not yet tried.

## Related Concepts

- **Graph Traversal** — the general process this MicroSim makes concrete
- **Depth-First Search** — follows one path fully, then backtracks
- **Breadth-First Search** — visits all neighbors before going deeper
- **Adjacency List** — the representation each algorithm reads from (shown on hover)
- **Reachability** — what the Start node dropdown lets you probe

## References

1. [Chapter 20: Graph Theory — Paths, Traversal, and Connectivity](../../chapters/20-graph-theory-paths-traversal-connectivity/index.md) - The chapter this MicroSim supports.
2. [Depth-First Search](https://en.wikipedia.org/wiki/Depth-first_search) - Wikipedia's treatment of DFS, including the stack-based and recursive formulations.
3. [Breadth-First Search](https://en.wikipedia.org/wiki/Breadth-first_search) - Wikipedia's treatment of BFS and its shortest-path property on unweighted graphs.
4. [Graph Traversal](https://en.wikipedia.org/wiki/Graph_traversal) - Overview of traversal strategies and the role of the visited-set.
5. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - The graph rendering library used to build this MicroSim.
