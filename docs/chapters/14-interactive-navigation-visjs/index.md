---
title: Interactive Navigation in Vis.js
description: Covers the interaction patterns that let a learner explore a rendered graph — tooltips, hover states, click and double-click events, a node inspector, and type-ahead search with focus navigation.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:27:03
version: 0.09
---

# Interactive Navigation in Vis.js

## Summary

Covers the interaction patterns that let a learner explore a rendered graph — tooltips, hover states, click and double-click events, a node inspector, and type-ahead search with focus navigation.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Hover State
2. Node Tooltip
3. Edge Tooltip
4. Click Event Handling
5. Double-Click Event
6. Node Inspector
7. Node URL Property
8. Clickable Node
9. Search Feature (Graph)
10. Type-Ahead Filtering
11. Focus Node Navigation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 13: Physics Simulation and Graph Layout](../13-physics-simulation-graph-layout/index.md)

---

!!! mascot-welcome "From Looking to Exploring"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapters 11 through 13 taught you how a learning graph looks and how it settles into place. But a diagram a learner cannot touch is just a picture. This chapter turns your rendered graph into something a person can actually explore — hovering for definitions, clicking to drill in, and searching by name to jump straight to the concept they care about.

Every learning graph in this book is, structurally, the same object: a `DataSet` of nodes, a `DataSet` of edges, and a `physics`-and-`layout`-configured `vis.Network` binding them to a canvas. What has been missing until now is the layer that makes that object *interactive navigation* rather than a static rendering — the events vis-network fires when a learner moves the mouse, presses it down, or releases it, and the code an author writes to respond to those events. This chapter works through that event layer end to end, starting with the simplest possible interaction (the mouse resting over a node) and building toward a full search-and-focus system that lets a learner type a concept name and jump straight to it in a 300-node graph.

## Hover State: The Foundation of Every Interaction

The **Hover State** is the condition vis-network enters when a learner's mouse pointer is positioned over a node or edge without clicking, and it is the foundation every other interaction in this chapter builds on — before a learner can click something, double-click it, or search for it, they first need a way to discover *what it is* without committing to an action. Vis-network tracks hover state automatically and exposes it through two events: `hoverNode`, which fires when the pointer enters a node's boundary, and `blurNode`, which fires when the pointer leaves it. Edges have parallel `hoverEdge` and `blurEdge` events.

```javascript
network.on('hoverNode', function (params) {
  console.log('Hovering over node:', params.node);
});

network.on('blurNode', function (params) {
  console.log('Left node:', params.node);
});
```

The `params.node` value passed to the `hoverNode` callback is the ID of the node currently under the pointer — the same ID used throughout this book's node JSON objects (`{"id": 5, "label": "Ecology"}`). By itself, tracking hover state does nothing visible; it is a signal an author listens for and then decides what to do with. The single most common thing to do with it is show a tooltip, which is the very next concept.

## Node Tooltip and Edge Tooltip

A **Node Tooltip** is a small popup box that appears near a node while it is in hover state, displaying additional information about that node — typically a definition, a description, or metadata that would clutter the diagram if shown permanently as part of the node's label. Vis-network provides a built-in tooltip mechanism through the `title` property on a node's JSON object, which requires no manual `hoverNode` event handling at all: set `title` to a plain string or an HTML string, and vis-network automatically shows it near the cursor whenever that node enters hover state.

```json
{
  "id": 12,
  "label": "Barnes-Hut Solver",
  "title": "Approximates repulsion forces by clustering distant nodes, reducing per-frame calculation from O(n²) to O(n log n)."
}
```

Because `title` accepts HTML, a learning-graph author can format a tooltip with the same rigor as a glossary entry — bold the term, add a line break, even include a short "see also" link — rather than being limited to a single line of plain text.

```json
{
  "id": 12,
  "label": "Barnes-Hut Solver",
  "title": "<b>Barnes-Hut Solver</b><br>Vis-network's default physics solver. Approximates repulsion forces for O(n log n) performance."
}
```

An **Edge Tooltip** works identically, but on an edge's `title` property instead of a node's, appearing when the mouse hovers over the edge's line rather than a node's shape. Edge tooltips are the natural place to explain *why* a dependency exists — something a bare arrowhead cannot communicate on its own.

```json
{"from": 173, "to": 175, "title": "Double-click handling requires a working click event listener to build on."}
```

The following table summarizes the two tooltip types now that both have been explained in prose.

| Tooltip Type | JSON Property | Appears On Hover Over | Typical Content |
|---|---|---|---|
| Node Tooltip | `title` (on a node object) | A node's shape | Concept definition, glossary text |
| Edge Tooltip | `title` (on an edge object) | An edge's line | Explanation of the dependency relationship |

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Because `title` accepts HTML, you can pull the exact wording from `docs/glossary.md` and paste it into a node's tooltip verbatim. That keeps your diagram's on-hover definitions and your written glossary from silently drifting apart as one gets edited and the other does not.

Before moving from hovering to clicking, it helps to see both together on one small graph — hovering to preview a definition, and, in the next section, clicking to commit to an action.

#### Diagram: Hover Tooltip Explorer

<iframe src="../../sims/hover-tooltip-explorer/main.html" width="100%" height="522px" scrolling="no"></iframe>

[View Hover Tooltip Explorer Fullscreen](../../sims/hover-tooltip-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Hover Tooltip Explorer</summary>
Type: microsim
**sim-id:** hover-tooltip-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners experience the difference between a node with no tooltip and a node with a well-formatted HTML tooltip, on a small sample graph, so hover state and tooltip content are directly observable rather than only described.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, interpret

Learning objective: Given a 10-node sample graph where half the nodes have `title` tooltips and half do not, the learner can explain what a Hover State is and interpret which nodes provide additional information on hover versus which do not.

Canvas layout:
- Left/top (70% width): drawing area showing a 10-node sample graph
- Right/bottom (30% width or below on narrow screens): a status panel and a toggle control panel

Visual elements:
- 10 nodes styled per Chapter 11 conventions; 5 nodes have a small dotted outline indicating "has tooltip," 5 do not
- A status readout that echoes the current hover state in plain text, e.g. "Hovering: Barnes-Hut Solver (tooltip available)" or "Hovering: nothing"
- The built-in vis-network tooltip box itself, rendered natively near the cursor

Interactive controls:
- Checkbox: "Show which nodes have tooltips" (toggles the dotted-outline indicator)
- Button: "Reset View"

Default parameters:
- Show-indicator checkbox: checked

Behavior: Hovering any node fires `hoverNode`; the status panel updates via the event's `params.node` value. Nodes with a `title` property show vis-network's built-in tooltip automatically; nodes without one show nothing, making the contrast concrete. Leaving a node fires `blurNode` and clears the status panel back to "Hovering: nothing."

Canvas size: responsive, 100% width, 520px height, must reflow on window resize

Implementation: vis-network JavaScript library; `hoverNode`/`blurNode` event listeners update a plain HTML status panel; tooltips rendered via each node's `title` property
</details>

## Click Event Handling

Hovering previews information without commitment. **Click Event Handling** is the mechanism by which vis-network detects a learner pressing and releasing the mouse button on a node, edge, or empty canvas area, and reports that action through the `click` event, which fires on every single click regardless of what — if anything — was clicked.

```javascript
network.on('click', function (params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    console.log('Clicked node:', nodeId);
  } else if (params.edges.length > 0) {
    console.log('Clicked edge:', params.edges[0]);
  } else {
    console.log('Clicked empty canvas');
  }
});
```

The `params` object passed to a `click` handler carries two arrays worth understanding closely: `params.nodes` is an array of node IDs under the click location (empty if the click missed every node), and `params.edges` is the parallel array for edges. Checking `params.nodes.length > 0` first, before falling back to `params.edges`, reflects the fact that a click can register on a node and the edges beneath it simultaneously in a dense layout — a pattern also visible in the `dragEnd` handler Chapter 13 used for node pinning, which reads `params.nodes` the same way.

Click event handling is the single most important interaction pattern in this chapter, because every subsequent concept — double-click, the node inspector, and clickable nodes with URLs — is built directly on top of it. A learning-graph author rarely uses the raw `click` event alone in a finished MicroSim; instead, it becomes the entry point that decides which of several richer behaviors to trigger next.

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that `click` fires even when nothing was clicked — an empty-canvas click still triggers the event with both arrays empty. That third branch matters in practice: it is the natural place to write "clicking empty space clears the current selection," a small piece of interaction hygiene that keeps a diagram from feeling stuck on whatever was last selected.

## Double-Click Event

A **Double-Click Event** is a distinct vis-network event, fired through `doubleClick`, that reports two rapid clicks on the same location rather than one — and, critically, it is not simply two `click` events happening close together. Vis-network debounces click detection internally: a `click` event still fires on the first click of a double-click, but a fast second click within the platform's double-click interval upgrades the interaction to a separate `doubleClick` event with its own listener.

```javascript
network.on('doubleClick', function (params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    openNodeInspector(nodeId);
  }
});
```

The convention this book follows — and the one most learning-graph diagrams follow generally — is to reserve single-click for lightweight actions like selection or highlighting a node's neighborhood, and reserve double-click for a heavier action that opens more detail. That heavier action, in the code example above, is a call to `openNodeInspector()`, a function this chapter defines next.

## Node Inspector

The **Node Inspector** is a UI panel, typically a sidebar or modal, that displays a node's complete set of properties and metadata when a learner double-clicks it, going well beyond what a tooltip can show. Where a Node Tooltip is designed for a quick, transient glance — a sentence or two, visible only while hovering — a node inspector is designed for sustained reading: full definitions, a list of prerequisite and dependent concepts, taxonomy category, and any other metadata a learning graph's node JSON carries.

```javascript
function openNodeInspector(nodeId) {
  const node = nodes.get(nodeId);
  document.getElementById('inspector-title').innerText = node.label;
  document.getElementById('inspector-body').innerHTML = node.title || 'No description available.';
  document.getElementById('inspector-panel').style.display = 'block';
}
```

This function reads the clicked node's full record out of the `nodes` DataSet using `nodes.get(nodeId)` — the same `DataSet.get()` method used for lookups throughout earlier chapters — and writes its `label` and `title` fields into a panel that was hidden until this moment. Unlike a tooltip, which vis-network renders and positions automatically, a node inspector is ordinary HTML/CSS/JavaScript that an author builds and controls directly, which is exactly what makes it suitable for richer content: a scrollable list of prerequisites, a taxonomy badge, or a link to the concept's full glossary entry.

The following list distinguishes the three "learn more about this node" mechanisms covered so far, now that all three have been explained.

- **Node Tooltip** — automatic, vis-network-rendered, appears on hover, holds a sentence or two
- **Node Inspector** — author-built panel, appears on double-click, holds a full record of properties
- **Console logging** (seen in the `click` example above) — developer-facing only, not a learner-facing UI element at all

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A node inspector that opens on single-click instead of double-click will fight with every other single-click interaction you build later in this chapter — selection highlighting, focus navigation, and search results all expect a plain click to mean "select," not "open a full panel." Reserve double-click for the inspector and your interaction model stays predictable as you add more features.

## Node URL Property and Clickable Node

Not every "learn more" action should stay inside the diagram. Sometimes the right destination for a click is an entirely different page — a full chapter, an external reference, or a glossary entry with its own URL.

The **Node URL Property** is a custom field an author adds to a node's JSON object — commonly named `url`, though vis-network does not reserve this key itself — that stores a link to more information about the concept the node represents, such as its chapter section or glossary entry.

```json
{
  "id": 174,
  "label": "Node Inspector",
  "title": "A UI panel showing a node's full properties on double-click.",
  "url": "../14-interactive-navigation-visjs/index.md#node-inspector"
}
```

Because `url` is not a property vis-network interprets automatically the way it interprets `title`, an author must write a click handler that reads it and acts on it — which is exactly what makes a **Clickable Node** possible. A Clickable Node is a node whose click handler checks for a `url` property and, when present, navigates the browser to that address, turning the graph itself into a navigational index for the surrounding textbook.

```javascript
network.on('click', function (params) {
  if (params.nodes.length > 0) {
    const node = nodes.get(params.nodes[0]);
    if (node.url) {
      window.location.href = node.url;
    }
  }
});
```

This handler extends the plain `click` event pattern from earlier in the chapter: instead of only logging the clicked node's ID, it fetches the node's full record with `nodes.get()` and checks whether a `url` field exists before navigating. Nodes without a `url` property simply do nothing extra on click — they fall through safely, which means an author can add `url` to only the nodes that need it (typically the ones with a corresponding chapter section) without breaking the rest of the graph.

| Interaction Layer | Trigger | Destination | Property Used |
|---|---|---|---|
| Node Tooltip | Hover | Popup box, stays on page | `title` |
| Node Inspector | Double-click | Author-built panel, stays on page | `title` (and other node fields) |
| Clickable Node | Single click | Navigates to a new page or anchor | `url` |

!!! mascot-encourage "You Have Got This"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If it feels odd that vis-network lets you invent a property like `url` out of thin air, remember that a node's JSON object is just a plain JavaScript object underneath — vis-network only reads the keys it specifically documents (`id`, `label`, `title`, `color`, and so on), and quietly ignores everything else. That is exactly what makes it safe to attach your own custom metadata for a click handler to read later.

## Search Feature (Graph): Finding a Needle in a Large Graph

Hovering, clicking, and double-clicking all assume a learner has already found the node they care about on screen — a reasonable assumption for the 10 to 30-node sample graphs used throughout this book's MicroSims, but not for a full 300-concept learning graph rendered on one canvas. The remaining three concepts in this chapter solve that discovery problem.

A **Search Feature (Graph)** is a text input, positioned above or beside the canvas, that lets a learner type part of a concept's label and see matching nodes identified within the full graph, rather than visually scanning the entire diagram by eye. A basic search feature needs only two ingredients already familiar from earlier chapters: the `nodes` DataSet to search against, and its `get()` method, extended here with a filter function instead of a single ID.

```javascript
function searchNodes(query) {
  const lowerQuery = query.toLowerCase();
  return nodes.get({
    filter: function (node) {
      return node.label.toLowerCase().includes(lowerQuery);
    }
  });
}
```

Passing a `filter` function to `DataSet.get()` — rather than a specific ID — returns every node whose `label` contains the search text, case-insensitively. That returned array is the raw material for everything a search feature needs to display: a dropdown of matches, a highlighted subset of nodes on the canvas, or, as the next section covers, a jump directly to a single selected result.

## Type-Ahead Filtering

**Type-Ahead Filtering** is the refinement of a basic search feature that re-runs the search on every keystroke rather than waiting for a learner to press Enter or click a search button, producing a live-updating list of matches as the query is typed — the same interaction pattern used by nearly every modern search box, from a phone's contacts app to a code editor's "go to file" command.

```javascript
document.getElementById('search-box').addEventListener('input', function (event) {
  const matches = searchNodes(event.target.value);
  updateSuggestionList(matches);
});
```

This listener attaches to the search input's `input` event, which fires on every keystroke — as opposed to `change`, which would only fire once the input loses focus. Each keystroke re-runs the `searchNodes()` function defined above and passes the results to `updateSuggestionList()`, an author-written function that renders the matches as a dropdown list beneath the search box. Type-ahead filtering earns its value precisely because a learner searching a 300-node graph rarely knows the exact spelling of a concept label; seeing live-narrowing results as they type — "Barn" narrowing to "Barnes-Hut Solver" — is far more forgiving than requiring an exact match before showing any feedback at all.

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    On a large learning graph, running `searchNodes()` on every keystroke is cheap — a single pass through a DataSet's `filter` is fast even at a few hundred nodes — so you rarely need to add debouncing or throttling the way you might for a network request. Type-ahead search against an in-memory DataSet is one of the few places in this book where the simplest possible implementation is also the right one.

## Focus Node Navigation

A list of matching nodes is only useful if selecting one actually moves the learner's attention there. **Focus Node Navigation** is the action of programmatically panning and zooming the canvas so a specific node becomes centered and clearly visible, triggered after a learner selects a result from type-ahead search (or, just as usefully, after any other event that names a specific node of interest — a link from an external page, or a "jump to prerequisite" button inside a node inspector).

Vis-network provides this capability through the `network.focus()` method, which accepts a node ID and a configuration object controlling how the camera moves.

```javascript
function focusOnNode(nodeId) {
  network.focus(nodeId, {
    scale: 1.0,
    animation: {
      duration: 500,
      easingFunction: 'easeInOutQuad'
    }
  });
  network.selectNodes([nodeId]);
}
```

The `scale` parameter sets the zoom level the canvas settles at once focused — `1.0` is the network's default zoom, while a smaller value like `0.5` would zoom out to also show more of the surrounding graph context around the focused node. The `animation` object, with its `duration` (in milliseconds) and `easingFunction`, controls whether the camera jumps instantly to the new position or glides there smoothly; a smooth animated pan is almost always the better choice for a search result, because an instant jump can disorient a learner who loses track of where in the graph they landed. The final line, `network.selectNodes([nodeId])`, visually marks the focused node as selected using vis-network's built-in selection highlighting, giving the learner a second visual confirmation — beyond simply being centered on screen — of exactly which node their search found.

Type-ahead filtering and focus node navigation combine into the complete search experience this chapter has been building toward: type a few letters, see live-narrowing suggestions, click one, and watch the camera glide to that exact concept. The MicroSim below implements that full pipeline on a larger sample graph, so the payoff of everything in this chapter is something you can try directly.

#### Diagram: Search and Focus Navigation Console

<iframe src="../../sims/search-focus-navigation-console/main.html" width="100%" height="602px" scrolling="no"></iframe>

[View Search and Focus Navigation Console Fullscreen](../../sims/search-focus-navigation-console/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Search and Focus Navigation Console</summary>
Type: microsim
**sim-id:** search-focus-navigation-console<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners hands-on practice with the full navigation pipeline covered in this chapter — hover tooltips, click selection, double-click inspector, and type-ahead search with focus navigation — on a single graph large enough (60 nodes) that search is genuinely useful rather than a novelty.

Bloom Level: Apply (L3)
Bloom Verb: use, demonstrate, apply

Learning objective: Given a 60-node sample learning graph and a search box, the learner can use type-ahead filtering to locate a specific concept by partial label match and trigger focus node navigation to center it, then double-click it to open the node inspector and read its full properties.

Canvas layout:
- Top: search input box with a live-updating suggestion dropdown beneath it
- Left/center (75% width): drawing area showing the 60-node sample graph, styled per Chapter 11 conventions with taxonomy-based node coloring
- Right (25% width; moves below canvas on narrow screens): node inspector panel, hidden until a node is double-clicked

Visual elements:
- 60 nodes and roughly 75 edges forming a graph with realistic learning-graph structure (a few hub nodes, several prerequisite chains, some leaf concepts)
- Every node has a `title` tooltip and a `url` placeholder property
- A status line beneath the search box confirming the current hover/selection state, e.g. "3 matches for 'grav'" or "Focused: Central Gravity"

Interactive controls:
- Text input: search box with type-ahead filtering (updates on every keystroke)
- Dropdown/list: clickable suggestion results appearing beneath the search box as the learner types
- Node inspector panel: opens on double-click, closes via an "X" button
- Button: "Reset View" (clears search, closes inspector, re-fits the full graph)

Default parameters:
- Search box: empty
- Node inspector: hidden

Behavior: Typing in the search box calls a `filter`-based `nodes.get()` search on every `input` event and renders matches in the suggestion dropdown. Clicking a suggestion calls `network.focus()` with a 500ms animated pan/zoom and `network.selectNodes()` to highlight it, per this chapter's `focusOnNode()` example. Hovering any node shows its built-in tooltip. Double-clicking any node opens the node inspector panel showing its label, title text, and any prerequisite/dependent relationships found by scanning the edges DataSet. Single-clicking empty canvas closes the inspector and clears selection.

Canvas size: responsive, 100% width, 600px height, must reflow on window resize

Implementation: vis-network JavaScript library; DataSet `filter`-based search; `network.focus()` and `network.selectNodes()` for navigation; `hoverNode`, `click`, and `doubleClick` event listeners; node inspector built with standard HTML/CSS panel toggled via `style.display`
</details>

## Bringing the Interaction Layer Together

With all eleven concepts now explained individually, it helps to see how they lay on top of one another as a single stack, from the lightest-weight interaction to the heaviest.

| Layer | Event | Learner Action | What Happens |
|---|---|---|---|
| 1 | `hoverNode` / `hoverEdge` | Rest pointer over element | Hover State begins; Node Tooltip or Edge Tooltip appears |
| 2 | `click` | Single click | Selection, or navigation if a Node URL Property is present (Clickable Node) |
| 3 | `doubleClick` | Two rapid clicks | Node Inspector opens with full properties |
| 4 | `input` on search box | Typing | Type-Ahead Filtering narrows a Search Feature's results live |
| 5 | Selecting a search result | Click a suggestion | Focus Node Navigation pans and zooms to center that node |

Reading the table top to bottom traces exactly the order this chapter presented these concepts in, and that order is not arbitrary — each layer depends on the one above it. Type-ahead filtering would have nothing to filter without the underlying `nodes` DataSet search from earlier chapters; focus navigation would have no purpose without a search feature to produce a specific node ID to focus on; and the node inspector would have no data to display without click event handling delivering a node ID in the first place. What began, back in Chapter 11, as a static rendering of nodes and edges has become, over these last four chapters, a fully navigable, explorable interface — which is exactly the foundation the next chapter builds on when it turns individual graph views into complete, publishable learning-graph pages.

## Key Takeaways

- **Hover State** is the mouse-resting condition vis-network tracks via `hoverNode`/`blurNode`, and it underlies both the **Node Tooltip** and **Edge Tooltip**, which use a node's or edge's `title` property to show information automatically on hover.
- **Click Event Handling** reads `params.nodes` and `params.edges` from the `click` event to determine what, if anything, was clicked — the foundation every richer interaction in this chapter is built on.
- A **Double-Click Event**, fired through `doubleClick`, is distinct from two rapid single clicks and is the conventional trigger for opening a **Node Inspector** — an author-built panel showing a node's complete properties.
- A **Node URL Property** (commonly `url`) is a custom JSON field that, combined with a click handler, turns a node into a **Clickable Node** that navigates to another page or anchor.
- A **Search Feature (Graph)** filters the `nodes` DataSet by label text; **Type-Ahead Filtering** re-runs that search on every keystroke for live-narrowing results.
- **Focus Node Navigation**, implemented through `network.focus()`, pans and zooms the canvas to center a specific node — the payoff step that makes search actually useful on a large graph.

!!! mascot-celebration "Well Done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — your learning graph can now be hovered, clicked, double-clicked, searched, and navigated, not just admired from a distance. Let's connect the concepts, next by turning everything you have built across Chapters 11 through 14 into complete, shareable graph views!

[See Annotated References](./references.md)
