---
title: Physics Simulation and Graph Layout
description: Covers the physics solvers (Barnes-Hut, ForceAtlas2, repulsion, central gravity, damping) and layout algorithms (force-directed, hierarchical) that determine how a large graph arranges itself on screen, plus fixed node positions and stabilization.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:23:34
version: 0.09
---

# Physics Simulation and Graph Layout

## Summary

Covers the physics solvers (Barnes-Hut, ForceAtlas2, repulsion, central gravity, damping) and layout algorithms (force-directed, hierarchical) that determine how a large graph arranges itself on screen, plus fixed node positions and stabilization.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Physics Simulation
2. Force-Directed Graph Layout
3. Barnes-Hut Solver
4. ForceAtlas2 Layout
5. Repulsion Solver
6. Central Gravity
7. Damping
8. Hierarchical Layout
9. Layout Direction
10. Fixed Node Position
11. Node Pinning
12. Spring Length Parameter
13. Stabilization
14. Graph Layout Algorithm

## Prerequisites

This chapter builds on concepts from:

- [Chapter 12: Edge Styling and Visual Properties](../12-edge-styling-visual-properties/index.md)

---

!!! mascot-welcome "Why Does the Graph Arrange Itself?"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! You have now styled every node and every edge in a learning graph down to the last pixel. But none of that styling explains something you have watched happen in every MicroSim so far — nodes drifting into position, settling, and coming to rest without you dragging a single one of them. That motion is not decoration. It is a physics simulation, and this chapter is where you learn to control it.

Open any vis-network diagram in this book and watch the first half-second after it loads. Nodes that started stacked on top of each other, or scattered at random coordinates, spread apart, jostle briefly, and settle into a stable arrangement. Chapter 11 already introduced the term **force-directed graph** at a conceptual level — the idea that a layout can emerge from simulated forces rather than being drawn by hand. This chapter goes underneath that concept to the actual physics engine vis-network runs to make it happen: which forces it simulates, which solver algorithms compute those forces efficiently, and which settings an author controls to get a layout that is legible instead of chaotic.

## Physics Simulation: The Engine Behind Every Layout

**Physics Simulation** is vis-network's default layout mechanism, in which every node is treated as a small charged particle that repels every other node, every edge is treated as a spring that pulls its two connected nodes together, and the network's rendering loop repeatedly recalculates each node's position based on the combined effect of those forces until the layout stops changing. This is not a metaphor loosely borrowed from physics — vis-network's `physics` option block genuinely runs a numerical simulation, frame by frame, using the same kind of force-and-motion equations a game engine or particle simulator would use.

The simulation is controlled through the `physics` key in a network's options object, which can be toggled entirely on or off, or fine-tuned solver by solver:

```javascript
const options = {
  physics: {
    enabled: true,
    solver: 'barnesHut',
    stabilization: { iterations: 200 }
  }
};
```

The `enabled` parameter is the master switch — set it to `false` and every node stays exactly where its JSON specifies (an idea this chapter returns to under Fixed Node Position). The `solver` parameter selects which algorithm computes the repulsion forces between nodes, a choice significant enough that vis-network offers several distinct solvers with different performance and layout characteristics, covered later in this chapter. The `stabilization` block controls how many simulation steps run silently before the graph is first drawn, so a learner never sees the chaotic early frames of nodes flying apart from an initial random position.

Three simulated forces combine to produce a resting layout, and understanding each one separately makes every later section of this chapter easier to reason about:

- **Repulsion** — every node pushes every other node away, like same-charge particles, preventing nodes from overlapping
- **Spring attraction** — every edge pulls its two connected nodes together, like a spring, preventing the graph from flying apart into disconnected fragments
- **Central gravity** — a weak pull toward the canvas center, keeping the whole graph from drifting off-screen

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A physics-simulated layout has no "correct" final answer the way a hierarchical layout does — it settles into whichever stable arrangement the forces happen to reach first. Two runs of the exact same graph, from two different random starting positions, can settle into two different (but equally valid) layouts. That is a feature, not a bug: it is what lets the same 40-node learning graph render sensibly whether it starts from a blank canvas or from a previous session's saved positions.

## Force-Directed Graph Layout

**Force-Directed Graph Layout** is the general category of algorithm that positions nodes by simulating physical forces rather than computing coordinates through fixed rules — the technique the Physics Simulation section just described in vis-network's specific implementation. Force-directed layout is not unique to vis-network; it is a family of algorithms used across nearly every network visualization tool, because it solves a genuinely hard problem elegantly: given a graph of arbitrary shape, with no prior knowledge of which nodes are "important" or how the graph should be organized, produce a layout where connected nodes end up near each other and unconnected nodes end up spread apart.

That last property is what makes force-directed layout so well suited to learning graphs specifically. A concept dependency graph with a long prerequisite chain naturally strings those chained nodes out in the rendered layout, because each edge's spring force pulls dependent and prerequisite together, while the repulsion force keeps unrelated concept clusters from overlapping. The result is a layout that visually clusters related concepts without an author ever specifying cluster membership by hand — the taxonomy-based clustering from earlier chapters emerges from structure, not manual placement.

Force-directed layout is one of two broad layout strategies covered in this chapter; the other, hierarchical layout, computes node positions from explicit rules about dependency depth rather than simulated forces. The table below previews the comparison this chapter builds toward once both approaches have been explained in full.

| Layout Strategy | How Positions Are Determined | Best Suited For |
|---|---|---|
| Force-directed | Simulated repulsion, spring, and gravity forces reach equilibrium | Graphs where clustering and relationship structure matter more than strict ordering |
| Hierarchical | Explicit rules place each node at a level based on its dependency depth | Graphs where prerequisite *order* is the primary thing a learner needs to read |

## The Solvers: Computing Repulsion Efficiently

Simulating "every node repels every other node" sounds simple, but it hides a performance problem. A graph with \( n \) nodes has \( n(n-1)/2 \) possible node pairs, so a naive simulation that recalculates every pairwise repulsion force on every animation frame does \( O(n^2) \) work per frame. For a small graph of 20 nodes that is 190 pairwise calculations — trivial. For a 400-concept learning graph, it is nearly 80,000 pairwise calculations, repeated dozens of times per second, which is where naive physics simulation starts to visibly stutter. Vis-network solves this performance problem with **solvers** — selectable algorithms that approximate or restructure the repulsion calculation to keep large graphs responsive.

### The Barnes-Hut Solver

The **Barnes-Hut Solver** is vis-network's default physics solver, which approximates long-range repulsion forces by grouping distant nodes into clusters and treating each cluster as a single combined force source, reducing the per-frame calculation from \( O(n^2) \) to approximately \( O(n \log n) \). The algorithm originated in astrophysics, where researchers faced the identical problem simulating gravitational attraction between thousands of stars: a star's gravitational pull is felt by every other star, but a distant cluster of stars can be treated as one large mass at its center of gravity without meaningfully changing the simulation's accuracy. Vis-network borrows the same trick for node repulsion — a nearby node's exact position matters, but a cluster of far-away nodes can be approximated as one repulsion source.

Barnes-Hut is configured through the `barnesHut` sub-object of the `physics` options:

```javascript
physics: {
  solver: 'barnesHut',
  barnesHut: {
    gravitationalConstant: -2000,
    springLength: 95,
    springConstant: 0.04,
    damping: 0.09
  }
}
```

The `gravitationalConstant` parameter controls the strength of node-to-node repulsion — despite the name evoking attraction, in vis-network this value is negative and larger in magnitude means *stronger repulsion*, pushing nodes further apart. `springLength` and `springConstant` govern the spring-attraction force along edges (springLength is covered in its own section below), and `damping` controls how quickly the simulation loses energy and settles, also covered in its own section shortly.

### ForceAtlas2 Layout

The **ForceAtlas2 Layout** is an alternative physics solver, selected with `solver: 'forceAtlas2Based'`, originally designed for the Gephi network-visualization tool and adapted into vis-network, which tends to produce more evenly distributed layouts with less node overlap than Barnes-Hut on graphs with highly uneven degree distributions — the kind of graph a learning graph often is, since a handful of foundational concepts (recall the low-indegree "hub" concepts from earlier chapters) connect to dozens of dependents while most concepts connect to only two or three neighbors.

```javascript
physics: {
  solver: 'forceAtlas2Based',
  forceAtlas2Based: {
    gravitationalConstant: -50,
    centralGravity: 0.01,
    springLength: 100,
    springConstant: 0.08,
    damping: 0.4,
    avoidOverlap: 0.5
  }
}
```

ForceAtlas2's `gravitationalConstant` plays the same repulsion role as Barnes-Hut's, but the two solvers use different underlying mathematics, so a value tuned for one solver rarely produces the same visual density when copied to the other. The `avoidOverlap` parameter, unique to ForceAtlas2, is a value between 0 and 1 that adds an explicit node-overlap penalty on top of the physics forces — useful in a learning graph diagram where a densely connected cluster of intermediate concepts might otherwise stack nodes close enough to visually merge.

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Barnes-Hut is the right starting point for almost every learning graph — it is vis-network's default for a reason, and it performs well up to several hundred nodes. Reach for ForceAtlas2 specifically when you notice a small number of hub concepts crowding their many dependents into an unreadable clump; ForceAtlas2's overlap avoidance often untangles exactly that pattern.

Before comparing every solver side by side, one more force needs a name, because it appears as a parameter in both solvers above and deserves its own explanation.

## Repulsion Solver and Central Gravity

The **Repulsion Solver** is a third, simpler physics solver option, selected with `solver: 'repulsion'`, that calculates node-to-node repulsion directly for every pair without the Barnes-Hut clustering approximation — trading the performance benefit of Barnes-Hut for a more literal, predictable repulsion calculation. It is the right choice mainly for small graphs (well under 100 nodes) where \( O(n^2) \) performance is a non-issue and an author wants repulsion behavior that is simple to reason about, or for debugging a layout problem by temporarily ruling out Barnes-Hut's approximation as the cause.

**Central Gravity** is the weak, constant force pulling every node toward the center of the canvas, set through the `centralGravity` parameter present in every solver's options object (typically a small positive value like `0.3` for Barnes-Hut or `0.01` for ForceAtlas2). Without central gravity, a graph's repulsion forces alone would push nodes outward indefinitely, since nothing counteracts repulsion once nodes are already spread far apart — the layout would keep expanding, drifting nodes off the visible canvas entirely. Central gravity is what keeps a "settled" layout centered and bounded rather than sprawling.

A useful way to see how these forces interact is to increase or decrease each one independently and watch the resulting layout change shape. The MicroSim below does exactly that: it exposes gravitational constant, central gravity, and solver choice as live sliders on the same sample graph, so the abstract description above becomes something you can watch and adjust.

#### Diagram: Physics Force Explorer

<iframe src="../../sims/physics-force-explorer/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>Physics Force Explorer</summary>
Type: microsim
**sim-id:** physics-force-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners manipulate the individual forces that make up vis-network's physics simulation — repulsion strength, central gravity, and solver choice — on the same sample graph, so the effect of each parameter is directly observable rather than only described in prose.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine, compare

Learning objective: Given a fixed 18-node sample graph, the learner can predict and verify how changing gravitational constant, central gravity, and solver selection each independently affects the settled layout's shape and density.

Canvas layout:
- Left/top (70% width): drawing area showing an 18-node sample graph with a mix of hub nodes (high degree) and leaf nodes (degree 1), styled per Chapter 11 conventions
- Right/bottom (30% width or below on narrow screens): control panel

Visual elements:
- 18 nodes and roughly 22 edges forming a small learning-graph-like structure with two visible hub nodes
- A live "settled" indicator showing whether the simulation has stabilized or is still moving
- A readout of current force parameter values

Interactive controls:
- Dropdown: Solver ("Barnes-Hut", "ForceAtlas2", "Repulsion")
- Slider: Gravitational Constant / Repulsion Strength (range and scale adapt to selected solver, e.g. -100 to -10000 for Barnes-Hut)
- Slider: Central Gravity (0.0 to 1.0)
- Button: "Scatter Nodes" (randomizes starting positions and re-runs stabilization)
- Button: "Reset to Defaults"

Default parameters:
- Solver: Barnes-Hut
- Gravitational Constant: -2000
- Central Gravity: 0.3

Behavior: Every slider change calls `network.setOptions({physics: {...}})` with the updated solver configuration and triggers a fresh stabilization pass. Increasing repulsion strength visibly spreads nodes further apart; increasing central gravity visibly pulls the whole graph tighter toward the canvas center; switching solvers re-lays the same graph using the new algorithm so learners can compare Barnes-Hut's clustering against ForceAtlas2's more even spacing on identical data.

Canvas size: responsive, 100% width, 580px height, must reflow on window resize

Implementation: vis-network JavaScript library using the `physics` options object exposed through `network.setOptions()`; dropdown and slider `input`/`change` events trigger option updates and call `network.stabilize()`
</details>

## Damping and Spring Length Parameter

Two more parameters appeared in the solver code examples above without full explanation — both control how the simulation behaves as it runs, rather than which forces exist in the first place.

**Damping** is the physics parameter that controls how quickly the simulation loses kinetic energy on each step, set through the `damping` key (typical values range from `0.05` to `0.4`, depending on solver). Without damping, a physics simulation would oscillate forever — nodes overshooting their resting position, bouncing back, overshooting again — the same way a real spring with no friction never actually stops moving. A low damping value produces a layout that visibly "settles" through several bounces before coming to rest, which can look lively but takes longer to stabilize; a high damping value produces a layout that reaches its resting position quickly with little or no visible oscillation, at the cost of looking slightly abrupt.

The **Spring Length Parameter** is the resting length, in pixels, that vis-network's simulated edge-springs try to reach, set through the `springLength` key (default `95` for Barnes-Hut). Every edge behaves like a spring pulling its two connected nodes toward this ideal separation distance — shorter than `springLength` and the spring pushes the nodes apart; longer than `springLength` and the spring pulls them together. Increasing `springLength` produces a more spread-out layout with more breathing room between connected concepts; decreasing it produces a more compact layout, useful when a graph has many nodes and screen space is limited.

```javascript
physics: {
  barnesHut: {
    springLength: 150,   // more breathing room between connected nodes
    springConstant: 0.04,
    damping: 0.15         // settles with minimal oscillation
  }
}
```

The `springConstant` alongside `springLength` sets how *strongly* the spring pulls toward that resting length — a higher spring constant makes edges behave like stiff springs that snap quickly toward `springLength`, while a lower value makes edges behave like loose springs that tolerate more deviation from the ideal distance.

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Damping too low on a large learning graph can produce a layout that visibly jitters for several seconds before settling, which reads to a student as a bug rather than a feature. If a graph feels "shaky" on load, raising damping is usually a faster fix than adjusting any other physics parameter.

## Stabilization: Settling Before the First Frame

Every physics parameter covered so far describes forces that act continuously — but a learner should never actually watch several hundred raw simulation frames of nodes flying apart from random starting coordinates. That is the job of stabilization.

**Stabilization** is the process by which vis-network runs the physics simulation silently, without rendering intermediate frames, for a set number of iterations (or until node movement drops below a threshold) before displaying the graph for the first time, set through the `stabilization` sub-object of the `physics` options. Instead of a learner watching a chaotic tangle of nodes gradually untangle in real time, stabilization computes that entire process behind the scenes and reveals only the final, settled layout — or, with `stabilization.updateInterval` set, periodic snapshots that make the settling process visible as a smooth animation rather than a jarring one.

```javascript
physics: {
  stabilization: {
    enabled: true,
    iterations: 1000,
    updateInterval: 25,
    onlyDynamicEdges: false,
    fit: true
  }
}
```

The `iterations` parameter caps how many simulation steps stabilization will run before giving up even if the layout has not fully settled — a safety valve against pathological graphs that never converge. The `updateInterval` parameter controls how often (in iterations) vis-network redraws the canvas during stabilization, letting an author choose between a single instant "jump to final layout" (`updateInterval` equal to `iterations`) or a visible settling animation (a small `updateInterval`). The `fit` parameter, when `true`, automatically zooms and pans the canvas once stabilization finishes so the entire settled graph is visible without a learner needing to scroll or zoom manually.

Vis-network also exposes a `stabilizationIterationsDone` event, which fires exactly once when stabilization completes — a natural hook for an author to disable a loading spinner, enable interaction controls, or log an analytics event marking the graph as ready.

```javascript
network.on('stabilizationIterationsDone', function () {
  network.setOptions({ physics: false });
  console.log('Layout stabilized and physics disabled');
});
```

That last line is a common and important pattern: once stabilization finishes, many learning-graph authors disable physics entirely (`physics: false`) so that a learner's later click-and-drag interactions do not trigger the whole layout to keep re-simulating. The graph reaches a good resting position once, and then holds still until a person deliberately moves something.

## Hierarchical Layout: An Alternative to Physics

Force-directed layout, tuned through the solvers and parameters above, is excellent at revealing clustering and overall graph shape — but it does not guarantee that a prerequisite chain reads top-to-bottom or left-to-right. For a learning graph specifically, where the entire point of the diagram is often to show *order* — which concepts must come before which — a second layout strategy exists that trades physics-based emergence for explicit, rule-based positioning.

**Hierarchical Layout** is a vis-network layout mode that positions every node at a discrete level based on its distance from root nodes in the graph's dependency structure, rather than letting position emerge from simulated forces, enabled through the `layout.hierarchical` options block.

```javascript
const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 150,
      nodeSpacing: 100
    }
  },
  physics: {
    hierarchicalRepulsion: { nodeDistance: 120 }
  }
};
```

The `sortMethod` parameter tells vis-network how to determine each node's level: `'directed'` uses edge direction to compute depth (a node's level is determined by how many prerequisite edges separate it from a root), which is exactly the dependency-direction convention this entire book has used since Chapter 1 — a concept with zero prerequisites sits at the topmost level, and every dependent concept sits one or more levels below whatever it depends on. The `levelSeparation` and `nodeSpacing` parameters control, respectively, the pixel distance between levels and the pixel distance between nodes within the same level, playing a role visually similar to `springLength` in the force-directed layouts covered earlier in this chapter.

Hierarchical layout does not eliminate physics entirely — notice the `hierarchicalRepulsion` solver in the example above. Vis-network still runs a lightweight simulation *within* each level to prevent same-level nodes from overlapping, but that simulation cannot move a node between levels; the level itself is fixed by graph structure, not by force.

### Layout Direction

The **Layout Direction** parameter controls which way a hierarchical layout flows across the canvas, set through the `direction` key with four possible values: `'UD'` (up-to-down), `'DU'` (down-to-up), `'LR'` (left-to-right), and `'RL'` (right-to-left).

| Direction Value | Flow | Typical Use in a Learning Graph |
|---|---|---|
| `UD` | Top to bottom | Default and most intuitive for "prerequisites above, advanced concepts below" |
| `DU` | Bottom to top | Rare; sometimes used when foundational concepts should anchor the bottom of a printed page |
| `LR` | Left to right | Well suited to wide-screen displays or timeline-like prerequisite chains |
| `RL` | Right to left | Rare; occasionally used for right-to-left language localization |

`UD` is by far the most common choice for a learning graph, because it matches the reading convention most learners already associate with hierarchy diagrams and org charts — "up" reads as foundational, "down" reads as building on what came before.

Before looking at hierarchical and force-directed layout side by side, it is worth defining one more concept both layout modes rely on: what happens when a node's position should not move at all, regardless of physics or hierarchy rules.

## Fixed Node Position and Node Pinning

**Fixed Node Position** is a per-node setting that locks a node's `x` and `y` coordinates so that neither physics simulation nor hierarchical layout is allowed to move it, set through the `fixed` key in a node's JSON object, which accepts either a boolean (`"fixed": true`, locking both axes) or an object specifying each axis independently (`"fixed": {"x": true, "y": false}`).

```json
{"id": 1, "label": "Ecology", "x": -600, "y": 0, "fixed": {"x": true, "y": false}}
```

That example — `x` fixed, `y` free — is the exact pattern this project's own architecture notes describe for hierarchical layouts organized by domain column: a node's horizontal position is manually pinned to place it in the correct taxonomy column, while its vertical position is still free to be adjusted by physics or by the learner dragging it, spreading nodes within that column to avoid overlap.

**Node Pinning** is the related but distinct action of a learner manually dragging a node and dropping it in place during an interactive session, after which vis-network treats that node as fixed at its new position until physics is explicitly re-enabled or the page reloads. Node pinning is what makes an interactive learning-graph diagram feel trustworthy to explore: a learner can drag a cluttered node out of the way to read a label underneath it, and that node stays put — it does not spring back to its physics-determined position the instant the mouse releases.

The distinction matters because the two mechanisms serve different authors at different times. Fixed Node Position is something a learning-graph *author* sets in the JSON file ahead of time, usually to enforce a specific structural convention like the taxonomy-column layout above. Node pinning is something a *learner* does interactively, in the moment, usually just to declutter a view temporarily. Both use the same underlying `fixed` property, but one is authored and persistent; the other is a runtime side effect of dragging.

```javascript
network.on('dragEnd', function (params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    nodes.update({ id: nodeId, fixed: { x: true, y: true } });
  }
});
```

This event handler listens for vis-network's `dragEnd` event, which fires when a learner releases a node after dragging it. `params.nodes` is an array of node IDs involved in the drag — checking its length confirms a node (not empty canvas) was dragged — and `nodes.update()` writes a `fixed: {x: true, y: true}` property back onto that node's DataSet entry, pinning it at its new dropped position.

!!! mascot-encourage "You Have Got This"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the difference between "fixed by the author in JSON" and "pinned by a learner while dragging" feels like a subtle distinction right now, that is completely normal — most learning-graph authors don't need to think about it until the first time a student reports "I moved a node and now it looks wrong on reload." Once you see that bug once, the distinction clicks permanently.

## Comparing Force-Directed and Hierarchical Layout

With both major layout strategies and their supporting mechanics now explained, it is worth stepping back and comparing them directly — this is exactly the trade-off the course description's Analyze-level learning outcomes ask you to be able to reason through for a given dataset size and audience.

| Dimension | Force-Directed Layout | Hierarchical Layout |
|---|---|---|
| Position determined by | Simulated forces reaching equilibrium | Explicit level rules based on dependency depth |
| Best reveals | Clustering, community structure, hub concepts | Prerequisite order, depth, chain length |
| Performance on large graphs | Depends on solver (Barnes-Hut scales well) | Generally fast; no iterative force calculation needed within levels |
| Predictability | Same graph can settle differently between runs | Deterministic — same graph always produces the same level assignment |
| Weakness | Order is not visually guaranteed | Clustering and community structure are not visually apparent |

Neither strategy is universally "better" — the right choice depends on what question the diagram needs to answer for its audience. A curriculum reviewer auditing whether a 200-concept learning graph has any accidentally-orphaned clusters benefits from force-directed layout's tendency to visually separate disconnected components. A student trying to understand "what do I need to learn before I can tackle this advanced topic" benefits far more from hierarchical layout's guaranteed top-to-bottom prerequisite ordering.

## Graph Layout Algorithm: The General Category

Having worked through both specific strategies in detail, it is useful to name the general category they both belong to. A **Graph Layout Algorithm** is any algorithm that computes 2D or 3D screen positions for the nodes of a graph so that the resulting drawing is readable — force-directed and hierarchical layout are the two graph layout algorithms vis-network implements, but the term itself is broader and includes other approaches used across the wider field of graph visualization, such as circular layouts (nodes arranged evenly around a circle) and grid layouts (nodes snapped to a fixed grid), neither of which vis-network implements natively but which appear in other visualization libraries.

Every graph layout algorithm, regardless of family, is solving the same underlying readability problem: minimize edge crossings, avoid node overlap, keep related nodes near each other, and do it fast enough to remain interactive. Force-directed and hierarchical layout are simply two different, well-tested strategies for solving that problem, each making different trade-offs between predictability, performance, and what structural property of the graph gets emphasized visually.

The interactive diagram below lets you toggle between hierarchical and force-directed layout on the same 30-node sample graph, adjust layout direction, and watch fixed and pinned nodes behave differently under each mode — bringing every concept from this chapter together in one place.

#### Diagram: Layout Algorithm Comparison Lab

<iframe src="../../sims/layout-algorithm-comparison-lab/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Layout Algorithm Comparison Lab</summary>
Type: microsim
**sim-id:** layout-algorithm-comparison-lab<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners directly compare force-directed and hierarchical layout on the same sample graph, explore layout direction options, and observe how fixed/pinned nodes behave differently under each layout mode.

Bloom Level: Evaluate (L5)
Bloom Verb: justify, assess, recommend

Learning objective: Given a 30-node sample learning graph with a clear prerequisite structure and two visible clusters, the learner can justify a layout choice (force-directed vs. hierarchical, and if hierarchical, which direction) for a stated audience and purpose.

Canvas layout:
- Left/top (70% width): drawing area showing a 30-node sample graph modeled loosely on a small learning graph (two topic clusters, one connecting "bridge" concept, and a clear prerequisite chain of at least 5 levels)
- Right/bottom (30% width or below on narrow screens): control panel and scenario prompt panel

Visual elements:
- 30 nodes styled per Chapter 11 conventions, colored by cluster/taxonomy
- Two nodes pre-marked as author-fixed (small pin icon overlay) to demonstrate Fixed Node Position
- A scenario prompt box that rotates between short framings, e.g. "You are showing this graph to a curriculum reviewer checking for orphaned clusters" or "You are showing this graph to a student asking what they need to learn first"

Interactive controls:
- Toggle: Layout Mode ("Force-Directed", "Hierarchical")
- Dropdown: Layout Direction ("UD", "DU", "LR", "RL") — enabled only when Hierarchical is selected
- Dropdown: Solver ("Barnes-Hut", "ForceAtlas2") — enabled only when Force-Directed is selected
- Button: "Drag to Pin a Node" mode toggle, demonstrating Node Pinning behavior
- Button: "Reset Layout"

Default parameters:
- Layout Mode: Force-Directed
- Solver: Barnes-Hut
- Layout Direction: UD (pre-selected but inactive until Hierarchical is chosen)

Behavior: Switching Layout Mode calls `network.setOptions()` with the corresponding `layout.hierarchical.enabled` and `physics` configuration and triggers `network.stabilize()`. Under Hierarchical mode, changing Layout Direction re-flows the same graph instantly. When a learner drags and drops a node, that node becomes pinned (fixed: {x:true, y:true}) and displays a small pin icon; a "Reset Layout" button clears all pins except the two author-fixed nodes and re-stabilizes.

Canvas size: responsive, 100% width, 600px height, must reflow on window resize

Implementation: vis-network JavaScript library using `layout.hierarchical` and `physics` options exposed through `network.setOptions()`; `dragEnd` event handler implements node pinning as shown in this chapter's code example
</details>

## Key Takeaways

- **Physics Simulation** treats nodes as repelling particles and edges as springs, recalculating positions frame by frame until the layout reaches equilibrium — the mechanism behind every **Force-Directed Graph Layout**.
- The **Barnes-Hut Solver** approximates distant-node repulsion for \( O(n \log n) \) performance and is vis-network's default; **ForceAtlas2 Layout** handles uneven-degree graphs more evenly; the **Repulsion Solver** computes exact pairwise forces for small graphs.
- **Central Gravity** keeps a settled layout centered instead of drifting outward; **Damping** controls how quickly oscillation dies out; the **Spring Length Parameter** sets each edge's ideal resting distance.
- **Stabilization** runs the simulation silently before the first render, so learners see a settled graph rather than a chaotic startup animation.
- **Hierarchical Layout** replaces physics-based emergence with explicit level rules based on dependency depth, with **Layout Direction** (`UD`, `DU`, `LR`, `RL`) controlling which way the hierarchy flows.
- **Fixed Node Position** is an author-set JSON property that locks coordinates; **Node Pinning** is the same mechanism triggered at runtime when a learner drags and drops a node.
- Both force-directed and hierarchical layout are specific instances of the general category **Graph Layout Algorithm** — algorithms that compute readable node positions, each trading off predictability, performance, and which structural property of the graph is emphasized.

!!! mascot-celebration "Well Done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you now understand not just how a learning graph looks, but *why* it arranges itself that way, frame by frame, before you ever touch it. Let's connect the concepts, next by putting layout, styling, and interaction together into complete, publishable graph views!
