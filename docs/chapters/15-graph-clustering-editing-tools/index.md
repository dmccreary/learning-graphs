---
title: Graph Clustering and Editing Tools
description: Covers grouping related nodes into composite clusters that can expand and collapse, plus the interactive graph editor used to create and modify a learning graph directly, including JSON import/export and data validation on import.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:29:49
version: 0.09
---

# Graph Clustering and Editing Tools

## Summary

Covers grouping related nodes into composite clusters that can expand and collapse, plus the interactive graph editor used to create and modify a learning graph directly, including JSON import/export and data validation on import.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Graph Cluster
2. Composite Node
3. Cluster Expand/Collapse
4. Group Visibility Checkbox
5. Group Styling
6. Domain Attribute (Clustering)
7. Graph Editor
8. Node Property Editor
9. Edge Property Editor
10. JSON Graph Import
11. JSON Graph Export
12. Node Enricher Script
13. Data Validation on Import
14. Orphaned Node Detection

## Prerequisites

This chapter builds on concepts from:

- [Chapter 14: Interactive Navigation in Vis.js](../14-interactive-navigation-visjs/index.md)

---

!!! mascot-welcome "From Exploring to Authoring"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapters 11 through 14 turned a learning graph from a static picture into something a learner could hover, click, search, and navigate. This chapter closes out Part III by giving you two new powers: folding a crowded 300-node graph down into a handful of readable groups, and editing the graph's own structure — nodes, edges, and properties — directly in the browser instead of hand-writing JSON.

Every chapter so far has treated the graph's `nodes` and `edges` DataSets as something an author prepares in advance and vis-network simply renders. This chapter breaks that assumption in two directions at once. First, you will learn how vis-network can temporarily replace a whole group of nodes with a single stand-in node — collapsing complexity without discarding it. Second, you will meet the **Graph Editor**, a tool this project actually ships, that lets an author build and revise a learning graph's structure interactively, complete with import, export, and the validation checks that keep a graph well-formed. Both threads matter for the same reason: a 300-concept learning graph is too large to read as one flat diagram, and too large to hand-edit as raw JSON without help.

## Graph Cluster: Folding Complexity Into a Single Node

A **Graph Cluster** is a set of nodes that vis-network temporarily combines and renders as one node on the canvas, replacing the individual nodes and their internal edges with a single visual placeholder until the cluster is expanded again. Clustering does not delete or modify the underlying data — every clustered node's full record still exists in the `nodes` DataSet — it only changes what vis-network draws, which makes it fundamentally a rendering technique rather than a data-editing one.

Clustering solves a problem force-directed and hierarchical layout, covered in Chapter 13, cannot solve on their own: no layout algorithm makes a 300-node diagram easy to read at a glance, because the problem is not *where* the nodes sit but *how many* there are. Clustering reduces that count directly, the same way a folder on a computer's desktop reduces forty loose files down to one icon you can open when you need to.

Vis-network exposes clustering through the network's `cluster()` method, which accepts a configuration object describing which nodes belong together and how the resulting stand-in node should look.

```javascript
const clusterOptionsByData = {
  joinCondition: function (childNode) {
    return childNode.domain === 'Graph Theory';
  },
  clusterNodeProperties: {
    id: 'cluster:Graph Theory',
    label: 'Graph Theory (12)',
    shape: 'box'
  }
};

network.cluster(clusterOptionsByData);
```

The `joinCondition` parameter is a function vis-network calls once for every node in the graph, passing each node's full record as `childNode`; any node for which the function returns `true` becomes a member of the new cluster. This is the same node-record shape used throughout this book — `childNode.domain` reads a property directly off a node's JSON object, exactly like `node.label` or `node.title` in earlier chapters' click handlers. The `clusterNodeProperties` object describes the stand-in node itself: its own `id` (by convention prefixed with `cluster:` so it cannot collide with a real concept's numeric ID), its `label`, and any styling properties a normal node would accept.

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that clustering is reversible in a way hierarchical layout and physics are not. A hierarchical layout recomputes every node's position; clustering just hides nodes behind a stand-in. That reversibility is exactly what the next section, Composite Node, depends on.

## Composite Node

The stand-in node that `clusterNodeProperties` describes has a name of its own. A **Composite Node** is the single node vis-network substitutes for an entire cluster's member nodes, carrying a synthetic `id` and typically a `label` summarizing the group it represents (such as a count of members or the shared property that grouped them). A composite node behaves like any other node for rendering and interaction purposes — it can be dragged, it participates in physics simulation like a regular node with its own mass, and it can carry a `title` tooltip — but internally vis-network tracks it as a cluster wrapper, which is what makes the expand step possible.

Two methods on the network object let an author or a learner check and manipulate that wrapper state directly:

```javascript
network.isCluster('cluster:Graph Theory');  // returns true
network.getNodesInCluster('cluster:Graph Theory');  // returns array of member node IDs
```

`network.isCluster(nodeId)` answers a simple yes/no question — is this particular node ID a composite node or an ordinary concept node — which matters because a click handler often needs to branch on that answer before deciding what a click should do. `network.getNodesInCluster(nodeId)` returns the array of original node IDs a composite node is standing in for, useful for building a tooltip or side panel that lists cluster membership without forcing a learner to expand the cluster just to see what is inside it.

## Cluster Expand/Collapse

A composite node that could never be opened again would defeat the purpose of clustering — a learner needs to fold a group away for a clean overview, then reopen it the moment they care about what is inside. **Cluster Expand/Collapse** is the pair of operations that toggle a composite node back into its full set of member nodes and edges, or back into a single collapsed composite node, typically triggered by a double-click, reusing the Double-Click Event pattern from Chapter 14.

```javascript
network.on('doubleClick', function (params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    if (network.isCluster(nodeId)) {
      network.openCluster(nodeId);
    }
  }
});
```

`network.openCluster(nodeId)` is the expand half of the pair — it removes the composite node and restores every original member node and edge to the canvas, re-running physics or layout to fit them back into the diagram. The collapse half is simply calling `network.cluster()` again, since clustering an already-expanded set of nodes re-creates the composite node from scratch. Most learning-graph MicroSims implement a full expand/collapse cycle by pairing `openCluster()` on double-click with a "Re-cluster" button that reapplies the original `clusterOptionsByData` configuration, giving a learner a way to return to the folded overview after exploring a group's internals.

The following list summarizes the full clustering vocabulary now that all three pieces have been defined.

- **Graph Cluster** — the operation and the resulting group of nodes rendered as one
- **Composite Node** — the single stand-in node representing a cluster, checkable with `network.isCluster()`
- **Cluster Expand/Collapse** — `network.openCluster()` to expand; calling `network.cluster()` again to re-collapse

## Domain Attribute (Clustering)

The `joinCondition` example above checked `childNode.domain === 'Graph Theory'` — but that raises a question the code alone does not answer: where does a node's `domain` property come from, and what does it mean? The **Domain Attribute (Clustering)** is a custom property, conventionally named `domain`, that an author adds to every node's JSON object to record which subject-matter category or taxonomy group that concept belongs to, and which a clustering function reads to decide cluster membership.

```json
{"id": 42, "label": "Barnes-Hut Solver", "domain": "Graph Theory"}
{"id": 43, "label": "Force-Directed Graph Layout", "domain": "Graph Theory"}
{"id": 44, "label": "Cognitive Load Theory", "domain": "Learning Science"}
```

Like the `url` property from Chapter 14, `domain` is not a key vis-network reserves or interprets automatically — it is ordinary custom metadata an author defines, and it becomes meaningful only because a `joinCondition` function is written to read it. In a learning graph, `domain` typically matches the taxonomy category assigned during the graph's original design — the same 10-12 balanced categories referenced in this course's learning outcomes — which means clustering by domain produces groups a curriculum reviewer will immediately recognize, rather than an arbitrary technical grouping.

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Domain-based clustering pairs naturally with the taxonomy-based node coloring used in earlier chapters — if two nodes share a `domain` value, they likely already share a color. Clustering by `domain` usually just confirms visually what the color scheme already implied, folding a same-colored cluster of dots into one labeled box.

Before seeing domain-based clustering in action, it helps to define one more pair of concepts: how a learner controls which clusters are visible in the first place, and how a composite node should look once it is on screen.

#### Diagram: Domain Cluster Explorer

<iframe src="../../sims/domain-cluster-explorer/main.html" width="100%" height="580px" scrolling="no"></iframe>

<details markdown="1">
<summary>Domain Cluster Explorer</summary>
Type: microsim
**sim-id:** domain-cluster-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners toggle between a fully expanded 40-node sample graph and a domain-clustered view of the same graph, so the effect of Graph Cluster, Composite Node, and Cluster Expand/Collapse is directly observable rather than only described.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, apply, use

Learning objective: Given a 40-node sample learning graph with a `domain` property on every node spanning 4 domains, the learner can apply domain-based clustering to collapse the graph into 4 composite nodes, then expand any single composite node back to its members by double-clicking it.

Canvas layout:
- Left/top (75% width): drawing area showing the sample graph, either fully expanded or domain-clustered depending on current mode
- Right/bottom (25% width or below on narrow screens): control panel and a live member-count readout per domain

Visual elements:
- 40 nodes spanning 4 domains ("Graph Theory," "Learning Science," "Taxonomy Design," "Visualization"), colored by domain per earlier chapters' conventions
- Composite nodes rendered as larger box-shaped nodes labeled with domain name and member count, e.g. "Graph Theory (11)"
- A status line reporting current node count on canvas, e.g. "Showing: 4 composite nodes (40 concepts folded)" or "Showing: 40 individual nodes"

Interactive controls:
- Button: "Cluster by Domain" (applies `clusterOptionsByData` for all 4 domains at once)
- Button: "Expand All" (calls `network.openCluster()` on every composite node)
- Instruction text: "Double-click any composite node to expand just that domain"

Default parameters:
- Initial state: fully expanded (40 individual nodes)

Behavior: Clicking "Cluster by Domain" runs a `joinCondition` function per domain value and calls `network.cluster()` four times, one per domain, replacing all 40 nodes with 4 composite nodes. Double-clicking any single composite node calls `network.openCluster()` for that node only, restoring its members while leaving other domains collapsed. "Expand All" restores the fully expanded view. The status line and per-domain member-count readout update after every clustering action.

Canvas size: responsive, 100% width, 580px height, must reflow on window resize

Implementation: vis-network JavaScript library; `network.cluster()` with `joinCondition` reading each node's `domain` property; `network.openCluster()` triggered from a `doubleClick` listener that checks `network.isCluster()` first
</details>

## Group Visibility Checkbox and Group Styling

Clustering folds nodes together on the canvas; a separate, complementary mechanism lets a learner hide an entire category of nodes from view without merging them into a composite node at all. A **Group Visibility Checkbox** is a checkbox control, one per taxonomy group or domain, that toggles whether every node belonging to that group is shown or hidden on the canvas — a pattern this project's legend systems use to let a learner declutter a dense diagram by category, such as hiding every "Learning Science" node to focus only on "Graph Theory" concepts.

```javascript
document.getElementById('checkbox-graph-theory').addEventListener('change', function (event) {
  const isVisible = event.target.checked;
  const idsToToggle = nodes.get({
    filter: (node) => node.domain === 'Graph Theory'
  }).map((node) => node.id);

  nodes.update(idsToToggle.map((id) => ({ id: id, hidden: !isVisible })));
});
```

This handler reuses the `filter`-based `nodes.get()` pattern from Chapter 14's search feature to collect every node ID matching a domain, then calls `nodes.update()` with a `hidden` property on each one — `hidden: true` removes a node (and its edges) from the rendered canvas entirely, while leaving its record untouched in the DataSet, which is why it can be reversed instantly by unchecking the box. A group visibility checkbox differs from clustering in one important respect worth naming directly: clustering *replaces* a group of nodes with a summary; a group visibility checkbox *removes* a group from view with no replacement at all. Both give a learner a way to manage visual complexity, but they answer different questions — "show me a summary of this group" versus "get this group out of my way entirely."

**Group Styling** is the set of visual properties — color, shape, border, and icon — applied uniformly to every node sharing a common `group` value, configured once in the network's top-level `groups` options object rather than repeated on every individual node.

```javascript
const options = {
  groups: {
    graphTheory: { color: { background: '#5B9BD5' }, shape: 'dot' },
    learningScience: { color: { background: '#ED7D31' }, shape: 'triangle' }
  }
};
```

Setting `group: 'graphTheory'` on any node automatically applies that group's `color` and `shape` without repeating the styling on every node's own JSON object — a node only needs to declare which group it belongs to, and the shared visual definition does the rest. This is the same relationship a CSS class has to a stylesheet: individual elements reference a class name, and the actual styling rules live in one shared place. Group styling and the `domain` attribute are frequently the same underlying value in a learning graph, but they are configured through two different mechanisms — `domain` is read by a `joinCondition` function an author writes, while `group` is read automatically by vis-network's built-in rendering, requiring no custom function at all.

The table below distinguishes the three visibility-and-grouping mechanisms covered so far, now that each has been explained individually.

| Mechanism | What It Does | Reversible? | Underlying Property |
|---|---|---|---|
| Graph Cluster | Replaces a group of nodes with one composite node | Yes, via `openCluster()` | Author-defined `joinCondition` (often reads `domain`) |
| Group Visibility Checkbox | Hides a group's nodes from the canvas entirely | Yes, via `hidden: false` | `hidden` property, filtered by `domain` or `group` |
| Group Styling | Applies shared color/shape to every node in a group | N/A (always active) | `group` property, matched to the `groups` options object |

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It is easy to conflate `domain` and `group` because they often carry the same real-world meaning — "which taxonomy category does this concept belong to." Keep them straight by remembering who reads each one: `group` is read automatically by vis-network's rendering engine for styling; `domain` is read only by whatever custom `joinCondition` function an author writes for clustering. A node can have a `group` and no `domain`, or vice versa, and vis-network will not complain either way.

## Introducing the Graph Editor

Everything from Chapter 11 onward has treated a learning graph's JSON file as something that already exists, prepared ahead of time by an author working in a text editor. That assumption breaks down the moment an author needs to add fifteen new concepts, rewire a dozen dependency edges, or fix a typo in a node label — hand-editing a 300-node JSON file by scrolling and searching is slow and error-prone. This project ships a dedicated tool for exactly that problem.

The **Graph Editor** is an interactive, browser-based tool — found in this project's own codebase under `docs/vis/graph-editor/` — that lets an author create, modify, and delete nodes and edges directly on a rendered vis-network canvas, without hand-writing JSON, while still producing valid JSON as its output. Where every earlier MicroSim in this book was read-only — a learner could look, hover, click, and search, but never change the underlying graph — the graph editor is the first tool in this book whose entire purpose is mutation: adding, moving, relabeling, connecting, and removing.

Vis-network supports this directly through a `manipulation` options block, which turns on a built-in editing toolbar above the canvas.

```javascript
const options = {
  manipulation: {
    enabled: true,
    addNode: true,
    addEdge: true,
    editNode: editNodeCallback,
    editEdge: true,
    deleteNode: true,
    deleteEdge: true
  }
};
```

Setting `enabled: true` reveals the manipulation toolbar, and each of the boolean flags — `addNode`, `addEdge`, `deleteNode`, `deleteEdge` — turns on one specific editing button; setting any of them to `false` removes that button entirely, which is how an author can build a restricted editor (read-only browsing plus node editing, but no deletion, for example). The `editNode` and `editEdge` options accept either `true`, which uses vis-network's minimal built-in prompt, or a custom callback function — the pattern this project actually uses, since a learning graph's nodes carry far more structured metadata than vis-network's default single-text-box prompt can collect. The manipulation toolbar is not a separate application bolted onto vis-network — it is built from the same `nodes` and `edges` DataSets, and the same `click`/`doubleClick` events, this book has used since Chapter 11. Adding a node through the toolbar ultimately calls `nodes.add()`; deleting one calls `nodes.remove()`.

## Node Property Editor and Edge Property Editor

The custom `editNode` callback mentioned above is where the graph editor's real value lives, because a learning-graph node carries far more than a label. A **Node Property Editor** is a form-based panel — opened when an author clicks "Edit Node" in the manipulation toolbar or double-clicks a node in edit mode — that exposes every relevant field on a node's JSON object (label, group, domain, URL, shape, fixed position) as editable form inputs, rather than a single free-text prompt.

```javascript
function editNodeCallback(nodeData, callback) {
  document.getElementById('edit-label').value = nodeData.label || '';
  document.getElementById('edit-group').value = nodeData.group || '';
  document.getElementById('edit-domain').value = nodeData.domain || '';
  document.getElementById('node-editor-panel').style.display = 'block';

  document.getElementById('save-node-btn').onclick = function () {
    nodeData.label = document.getElementById('edit-label').value;
    nodeData.group = document.getElementById('edit-group').value;
    nodeData.domain = document.getElementById('edit-domain').value;
    callback(nodeData);
  };
}
```

Vis-network calls this function automatically whenever an author triggers "Edit Node," passing in `nodeData` (the clicked node's current properties) and a `callback` function the editor must invoke to actually commit the change back into the `nodes` DataSet — calling `callback(nodeData)` with the modified object applies the edit, while calling `callback(null)` cancels it. This is the same read-then-modify-then-commit shape as the node inspector from Chapter 14, but running in reverse: the inspector only *reads* `nodes.get()`, while the node property editor reads the same fields and then writes them back.

An **Edge Property Editor** is the parallel form-based panel for edges, exposing an edge's own editable fields — typically its `label` (the relationship description shown in Chapter 12's edge styling) and, in some configurations, arrow style or dash pattern — triggered the same way through the `editEdge` callback when an author selects "Edit Edge" on an existing connection.

```javascript
function editEdgeCallback(edgeData, callback) {
  const newLabel = prompt('Edit edge label:', edgeData.label || '');
  if (newLabel !== null) {
    edgeData.label = newLabel;
    callback(edgeData);
  } else {
    callback(null);
  }
}
```

This shorter edge example uses the browser's built-in `prompt()` dialog rather than a custom panel, a reasonable simplification because an edge in a learning graph typically carries only one or two editable fields, compared to a node's half-dozen. Both callbacks follow the identical contract vis-network expects: accept the current data, let the author change it, and call `callback()` exactly once with either the updated object or `null`.

The following list distinguishes the two property editors now that both have been explained.

- **Node Property Editor** — form-based panel for a node's `label`, `group`, `domain`, `url`, and positioning fields
- **Edge Property Editor** — simpler panel or prompt for an edge's `label` and styling fields
- Both are wired through vis-network's `manipulation.editNode` / `manipulation.editEdge` callbacks, and both must call the provided `callback()` function to commit or cancel

## JSON Graph Import and JSON Graph Export

Editing nodes and edges interactively only matters if the resulting graph can leave the browser session it was edited in. **JSON Graph Import** is the graph editor's file-loading feature, which reads a `.json` file containing `nodes` and `edges` arrays from the author's computer and populates the `nodes` and `edges` DataSets from it, replacing or merging with whatever graph is currently loaded.

```javascript
document.getElementById('file-input').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const graphData = JSON.parse(e.target.result);
    nodes.clear();
    edges.clear();
    nodes.add(graphData.nodes);
    edges.add(graphData.edges);
  };

  reader.readAsText(file);
});
```

This handler attaches to a standard HTML `<input type="file">` element's `change` event, which fires once an author selects a file through the browser's native file picker. The browser's `FileReader` API reads the selected file's contents asynchronously — `reader.onload` runs only after the full file has been read into memory as text — at which point `JSON.parse()` converts that text into a JavaScript object, and `nodes.clear()` / `edges.clear()` empty the current DataSets before `nodes.add()` and `edges.add()` populate them with the newly loaded graph. **JSON Graph Export** is the reverse operation: reading the current contents of the `nodes` and `edges` DataSets and offering them to the author as a downloadable `.json` file, capturing whatever additions, deletions, and edits were made during the editing session.

```javascript
function exportGraph() {
  const graphData = {
    nodes: nodes.get(),
    edges: edges.get()
  };
  const blob = new Blob([JSON.stringify(graphData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'learning-graph.json';
  a.click();
}
```

Calling `nodes.get()` and `edges.get()` with no arguments — the same method used with a `filter` in Chapter 14's search feature, and with a single ID in the node inspector — returns every record currently in each DataSet as a plain array, which is exactly the shape the original JSON file used. The `JSON.stringify(graphData, null, 2)` call converts that object back into formatted text (the `2` argument requests two-space indentation, matching this project's JSON formatting convention), and the remaining lines use a standard browser pattern — a `Blob`, an object URL, and a synthetically clicked download link — to trigger a file save dialog without requiring a server round-trip at all. Because import and export both round-trip through the same plain JSON shape this book has used since Chapter 1 — `{"nodes": [...], "edges": [...]}` — a graph edited in the browser is never locked into that browser session. Export early and often: a downloaded `.json` file is your save point, and re-importing it is exactly how you resume editing later or hand the file to a teammate.

## Node Enricher Script

Not every edit to a learning graph's JSON needs to happen inside the graph editor's UI at all. A **Node Enricher Script** is a small standalone program, typically written in Python, that reads an exported graph JSON file, adds or modifies a computed property on some or all nodes according to a rule, and writes the result back out as a new JSON file — a batch-editing approach suited to changes too repetitive or rule-based to apply one node at a time by hand.

```python
import json

with open('learning-graph.json', 'r') as f:
    data = json.load(f)

for node in data['nodes']:
    if node.get('group') == 1:
        node['x'] = -300  # pin foundational-group nodes to the left column

with open('learning-graph-enriched.json', 'w') as f:
    json.dump(data, f, indent=2)
```

This script follows the same read-modify-write shape as `exportGraph()` above, just running outside the browser: it loads the JSON file, loops over every entry in the `nodes` array checking a condition (`node.get('group') == 1`), adds a computed property (`x`) when that condition is true, and writes the modified data to a new file that can then be re-imported through JSON Graph Import. A node enricher script is the right tool specifically when a change follows a rule rather than requiring individual judgment — assigning every node in a given `group` a fixed `x` position for a hierarchical taxonomy-column layout (the exact pattern from Chapter 13's Fixed Node Position section), computing an `indegree` count from the edges array and stamping it onto each node, or normalizing every node's `domain` value to a consistent capitalization. Attempting the same change by hand through the Node Property Editor, one node at a time, across 300 concepts would be both slow and inconsistent; a short enricher script applies the rule uniformly in one pass.

The table below compares the graph editor's interactive editing against a node enricher script's batch editing, now that both have been explained.

| Editing Approach | Best Suited For | Tooling | Applies To |
|---|---|---|---|
| Graph Editor (Node/Edge Property Editor) | Individual, judgment-based edits — fixing one label, adding one new concept | Browser, vis-network manipulation UI | One node or edge at a time |
| Node Enricher Script | Rule-based, repetitive edits across many nodes at once | Standalone Python (or similar) script | Every node matching a condition |

## Data Validation on Import

Import is also the natural place for a graph editor to catch structural problems before they spread further into a project — and reusing the JSON parsing already required for import is far cheaper than writing a separate validation tool. **Data Validation on Import** is the set of automated checks a graph editor runs immediately after loading a JSON file, before displaying it, flagging structural problems such as duplicate node IDs, edges referencing a node ID that does not exist, or malformed required fields, so an author discovers the problem at load time rather than discovering a broken diagram later.

```javascript
function validateGraph(graphData) {
  const errors = [];
  const nodeIds = new Set(graphData.nodes.map((n) => n.id));

  if (nodeIds.size !== graphData.nodes.length) {
    errors.push('Duplicate node IDs detected.');
  }

  graphData.edges.forEach((edge) => {
    if (!nodeIds.has(edge.from)) {
      errors.push(`Edge references missing node: from=${edge.from}`);
    }
    if (!nodeIds.has(edge.to)) {
      errors.push(`Edge references missing node: to=${edge.to}`);
    }
  });

  return errors;
}
```

This function builds a JavaScript `Set` of every node ID present in the file — a `Set` automatically discards duplicates, so comparing its `size` against the original array's `length` is a compact way to detect duplicate IDs in one line. The `edges.forEach()` loop then checks every edge's `from` and `to` fields against that same set of valid IDs, collecting a human-readable error message for any edge that points at a node the file never actually defines — a dangling reference that would otherwise render as an invisible, confusing edge or crash the network entirely. A graph editor that runs this check on every import, and reports the returned `errors` array to the author before rendering anything, turns a category of bug that used to surface as "the diagram looks wrong" into one that surfaces as "line 47 of your JSON file has a typo," which is a dramatically easier problem to fix.

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    An edge pointing at a missing node is exactly the kind of error that is invisible in a casual read-through of a 300-node JSON file but obvious the instant a validator checks it programmatically. If you only remember one lesson from this section, make it this: never skip import validation on a hand-edited or AI-generated learning graph file, even when the file "looks fine" at a glance.

## Orphaned Node Detection

Duplicate IDs and dangling edge references are not the only structural problems worth catching at import time. A learning graph can be perfectly valid JSON — every ID unique, every edge pointing at a node that exists — and still contain a concept nobody can reach. **Orphaned Node Detection** is a validation check that identifies any node with zero edges connecting it to the rest of the graph, meaning it appears in neither the `from` nor `to` field of any edge, and is therefore disconnected from every prerequisite chain in the learning graph.

```javascript
function findOrphanedNodes(graphData) {
  const connectedIds = new Set();
  graphData.edges.forEach((edge) => {
    connectedIds.add(edge.from);
    connectedIds.add(edge.to);
  });

  return graphData.nodes
    .filter((node) => !connectedIds.has(node.id))
    .map((node) => node.label);
}
```

This function builds a `Set` of every node ID that appears in at least one edge — as either the dependent (`from`) or the prerequisite (`to`) side — and then filters the full `nodes` array down to whichever nodes never appear in that set at all. An orphaned node is not necessarily a mistake in the JSON's syntax — the file is perfectly well-formed — but it is very likely a mistake in the learning graph's *design*: a concept with no prerequisites and no dependents cannot be reached by following the graph's dependency structure from any other concept, which usually means either the concept was never properly connected during authoring, or it does not actually belong in this learning graph at all.

Recall from this course's Analyze-level learning outcomes that a learning graph should be checked for orphaned nodes, disconnected subgraphs, and cyclical dependencies as part of ordinary quality review. Data Validation on Import and Orphaned Node Detection are two different layers of that same review, worth distinguishing clearly now that both have been defined.

| Validation Check | Catches | Timing | Severity |
|---|---|---|---|
| Data Validation on Import | Duplicate IDs, edges referencing missing nodes | Immediately on file load | Blocks a usable render — must be fixed |
| Orphaned Node Detection | Nodes present but disconnected from every edge | On load or on demand | Structurally valid but pedagogically suspect — needs author review |

The MicroSim below combines the graph editor's core manipulation features — adding, editing, and deleting nodes and edges — with both validation layers running live, so an author can watch orphaned-node and reference-error detection respond in real time as the graph changes.

#### Diagram: Graph Editor with Live Validation

<iframe src="../../sims/graph-editor-live-validation/main.html" width="100%" height="620px" scrolling="no"></iframe>

<details markdown="1">
<summary>Graph Editor with Live Validation</summary>
Type: microsim
**sim-id:** graph-editor-live-validation<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners hands-on practice with the graph editor's manipulation toolbar (add/edit/delete nodes and edges) and both validation layers from this chapter, so the abstract description of Data Validation on Import and Orphaned Node Detection becomes something a learner can trigger and observe directly.

Bloom Level: Evaluate (L5)
Bloom Verb: assess, validate, justify

Learning objective: Given a 15-node starter graph with the manipulation toolbar enabled, the learner can add a new node, connect or intentionally leave it disconnected, and assess the resulting validation panel to judge whether the graph is structurally sound and free of orphaned nodes.

Canvas layout:
- Left/top (70% width): drawing area showing a 15-node starter graph with the vis-network manipulation toolbar enabled above it
- Right/bottom (30% width or below on narrow screens): validation panel and node/edge property editor, which appears when editing is triggered

Visual elements:
- 15 nodes and 17 edges forming a small learning-graph-like structure with one node deliberately left disconnected at start, so orphaned-node detection has something to find immediately
- A validation panel listing current issues in two sections: "Import Errors" (duplicate IDs, missing references) and "Orphaned Nodes" (nodes with zero edges), each empty or populated in real time
- Node Property Editor panel (label, group, domain fields) and a simpler Edge Property Editor prompt for edge labels

Interactive controls:
- Manipulation toolbar buttons (vis-network built-in): "Add Node," "Add Edge," "Edit Node," "Edit Edge," "Delete selected"
- Button: "Export JSON" (downloads current graph state per this chapter's `exportGraph()` pattern)
- Button: "Import JSON" (file picker, runs `validateGraph()` and `findOrphanedNodes()` immediately on load)
- Button: "Run Validation Now" (re-runs both checks on demand without a fresh import)

Default parameters:
- Starter graph: 15 nodes, 17 edges, 1 pre-existing orphaned node
- Validation panel: shows "1 orphaned node" on load

Behavior: Adding a node via the toolbar opens the Node Property Editor; saving without connecting an edge leaves it orphaned, and the validation panel updates to reflect the new count immediately (event-driven off the DataSets' own `add`/`update`/`remove` events, not just on import). Deleting an edge that was a node's only connection immediately adds that node to the "Orphaned Nodes" list. Importing a deliberately broken JSON file (with a duplicate ID or a dangling edge reference, offered as a sample download) demonstrates Data Validation on Import catching the problem before rendering.

Canvas size: responsive, 100% width, 620px height, must reflow on window resize

Implementation: vis-network JavaScript library with `manipulation` options block enabled; custom `editNode`/`editEdge` callbacks per this chapter's Node/Edge Property Editor examples; `validateGraph()` and `findOrphanedNodes()` functions re-run on every DataSet change event and on file import; export via `Blob`/object URL download pattern
</details>

## Bringing Clustering and Editing Together

With all fourteen concepts now explained individually, it is worth stepping back and seeing how the two halves of this chapter — folding a graph down for readability, and editing a graph's structure directly — relate to each other and to the four chapters before them.

- Clustering (**Graph Cluster**, **Composite Node**, **Cluster Expand/Collapse**, **Domain Attribute**) is a *rendering* technique — it changes what a learner sees on screen without touching the underlying `nodes` and `edges` DataSets at all.
- Visibility and styling (**Group Visibility Checkbox**, **Group Styling**) sit alongside clustering as complementary complexity-management tools, one hiding nodes outright and the other applying shared visual treatment by category.
- The **Graph Editor** and its **Node Property Editor** / **Edge Property Editor** are *data-mutation* tools — they change the actual contents of the DataSets, which is why **JSON Graph Import** and **JSON Graph Export** exist as the bridge between an in-browser editing session and a durable file on disk.
- A **Node Enricher Script** handles the same kind of mutation as the property editors, but in bulk and outside the browser, for changes that follow a rule rather than requiring per-node judgment.
- **Data Validation on Import** and **Orphaned Node Detection** are the safety net underneath all of it — checks that catch structural mistakes, whether introduced by hand-editing, a buggy enricher script, or a generative AI tool that produced a slightly malformed graph.

Every mechanism in this chapter exists to solve the same underlying problem from a different angle: a learning graph large enough to be useful is also large enough to become unmanageable, whether the difficulty is visual (too many nodes to read) or structural (too many nodes to safely hand-edit). Clustering and visibility controls solve the visual half; the graph editor, import/export, enricher scripts, and validation checks solve the structural half. Together, they close out this book's third part on vis.js — the next part turns from *building and maintaining* a learning graph to the learning-science theories that justify why this graph-based approach to sequencing content works in the first place.

## Key Takeaways

- A **Graph Cluster** replaces a group of nodes with a single **Composite Node**, reversible through **Cluster Expand/Collapse** (`network.openCluster()`), typically grouped by a custom **Domain Attribute (Clustering)** an author adds to each node's JSON.
- A **Group Visibility Checkbox** hides an entire group's nodes from the canvas via the `hidden` property; **Group Styling** applies shared color and shape to every node sharing a `group` value through the network's `groups` options object.
- The **Graph Editor** turns on vis-network's `manipulation` options block, exposing a toolbar for adding, editing, and deleting nodes and edges directly on the canvas.
- The **Node Property Editor** and **Edge Property Editor** are custom callback functions wired through `manipulation.editNode` and `manipulation.editEdge`, exposing a node's or edge's full set of fields as an editable form rather than a single text prompt.
- **JSON Graph Import** loads a `.json` file into the `nodes` and `edges` DataSets; **JSON Graph Export** reads those same DataSets back out and offers them as a downloadable file — the round-trip that lets browser-based edits persist beyond one session.
- A **Node Enricher Script** applies a rule-based, computed change to many nodes at once outside the browser, complementing the graph editor's one-at-a-time interactive edits.
- **Data Validation on Import** catches structural errors (duplicate IDs, dangling edge references) at load time; **Orphaned Node Detection** catches nodes with zero edges — together, the safety net that keeps a learning graph well-formed as it grows and changes.

!!! mascot-celebration "Well Done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you have finished Part III! Your learning graph can now be styled, laid out, navigated, folded into readable clusters, and edited directly, with validation checks standing guard the whole time. Let's connect the concepts, next by turning to the learning-science theories that explain *why* a graph-based approach to sequencing concepts actually works!
