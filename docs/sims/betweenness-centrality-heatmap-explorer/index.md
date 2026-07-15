---
title: Betweenness Centrality Heatmap Explorer
description: Explore a 25-node learning graph colored by betweenness centrality, click a bottleneck to see which shortest paths depend on it, then remove it and watch what actually breaks.
image: /sims/betweenness-centrality-heatmap-explorer/betweenness-centrality-heatmap-explorer.png
og:image: /sims/betweenness-centrality-heatmap-explorer/betweenness-centrality-heatmap-explorer.png
twitter:image: /sims/betweenness-centrality-heatmap-explorer/betweenness-centrality-heatmap-explorer.png
social:
   cards: false
status: implemented
library: vis-network
bloom_level: Analyze (L4)
---

# Betweenness Centrality Heatmap Explorer

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Betweenness Centrality Heatmap Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

**Betweenness centrality** counts how many shortest paths between other pairs of nodes run
through a given node. A concept with high betweenness sits at a structural bottleneck: many
learners must pass through it to get from where they are to where they are going.

This MicroSim renders a 25-node sample learning graph with each node's fill color scaled
continuously to its betweenness centrality, from light yellow (low) to deep red (high). Node
*size* is deliberately held constant, so color is the only cue you can read the metric from.

The centrality values are computed at load time with **Brandes' algorithm**, and every
shortest-path distance is precomputed with a breadth-first search from each of the 25 sources.
Clicking and removing are therefore table lookups, not live recomputation.

### The point of the sim

A heatmap alone would only teach you to recognize a color. The **Simulate Removal** toggle is
what turns the number into something you can verify, and it has a genuine surprise in it:

| Concept | Rank | Betweenness | Pairs disconnected if removed |
|---|---|---|---|
| Graph | 1 of 25 | 57.0 | **57** — every dependent pair loses its only route |
| DAG | 2 of 25 | 50.0 | 35 disconnect, 10 more take a longer path |
| Learning Graph | 3 of 25 | 46.0 | 46 |
| **Path** | **5 of 25** | **32.0** | **0 — nothing breaks at all** |

`Path` ranks fifth of twenty-five, yet deleting it disconnects nothing and lengthens nothing.
Every route through `Path` has an equally short alternative: `Graph → Dir. Edge → DAG` covers
one, and `Graph → Adj. List → Traversal` covers the other. `Graph`, by contrast, is a true
articulation point — there is no way around it.

That contrast is the lesson. **Betweenness measures how many shortest paths cross a concept,
not how essential that concept is.** A curriculum designer who prunes by centrality alone will
protect redundant concepts and may still miss the ones that genuinely cannot be routed around.

## How to Use

1. **Read the heatmap first.** Before clicking anything, pick out the three darkest nodes. Those
   are the bottleneck candidates.
2. **Hover any node** to see its exact betweenness value and its rank ("Rank 2 of 25").
3. **Click a node.** Every shortest path that runs through it lights up gold, and the infobox
   lists the concept pairs that depend on it.
4. **Toggle Simulate Removal.** The node is grayed out and dropped from the graph, and every
   other node is recolored by what the removal did to it:
   - **Red** — this concept lost its only connecting path to or from at least one other concept
   - **Gold** — still reachable, but only by a longer route
   - **Gray** — completely unaffected
5. **Click Clear** (or click empty canvas) to return to the plain heatmap.

Try `Graph`, then `DAG`, then `Path`, in that order. The three results are meaningfully
different, and the third one is the one worth arguing about.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/betweenness-centrality-heatmap-explorer/main.html"
        height="622px"
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

Learners should be comfortable with **Graph Path**, **Shortest Path**, and **Reachability**
from [Chapter 20](../../chapters/20-graph-theory-paths-traversal-connectivity/index.md), and
with the definition of betweenness centrality from
[Chapter 21](../../chapters/21-graph-metrics-path-analysis/index.md).

### Activities

1. **Read the color, commit to an answer** (3 min): With the sim untouched, have learners write
   down the three concepts they believe have the highest betweenness. Then hover to check
   against the actual ranks.
2. **Metric to consequence** (5 min): Click `Graph`, note the 57 dependent pairs, then toggle
   Simulate Removal. Ask: does the count of pairs that *route through* a node always equal the
   count that *break* when it is removed? Then click `DAG` — 55 route through it, but only 35
   break. Ask where the other 20 went.
3. **The redundant bottleneck** (5 min): Click `Path` and predict the removal result before
   toggling. Most learners predict serious damage from a rank-5 node. The result is zero. Have
   them trace the two alternative routes on the canvas and explain why the metric was
   "misleading" — and then argue whether it was actually misleading at all, or whether it
   answered a different question than the one being asked.

### Assessment

Learners can:

- Rank the top three bottlenecks from color alone and confirm with the hover tooltip.
- State which concept pairs lose their only connecting path when a given node is removed.
- Distinguish a disconnection from a detour in the removal view.
- Explain, using `Path` as the worked case, why high betweenness does not imply essentialness.

## Related Concepts

- **Betweenness Centrality** — the metric this MicroSim colors by
- **Bottleneck Concept** — what a high-centrality node is a candidate for
- **Shortest Path** — the paths being counted
- **Critical Path** — the longest chain, a different question this metric does not answer
- **Transitive Reduction** — the pruning operation that redundancy like `Path`'s is relevant to

## References

1. [Chapter 21: Graph Metrics and Path Analysis](../../chapters/21-graph-metrics-path-analysis/index.md) - The chapter this MicroSim supports.
2. [Betweenness Centrality](https://en.wikipedia.org/wiki/Betweenness_centrality) - Wikipedia's definition and the formal notation behind the metric.
3. [Centrality](https://en.wikipedia.org/wiki/Centrality) - Overview of centrality measures, including Brandes' algorithm for computing betweenness efficiently.
4. [Biconnected Component](https://en.wikipedia.org/wiki/Biconnected_component) - Articulation points: the structural property that distinguishes `Graph` from `Path`.
5. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - The graph rendering library used to build this MicroSim.
