---
title: Vis.js Fundamentals and Node Styling
description: Introduces vis.js and the vis-network library for visualizing concept dependency graphs, covering DataSet, network initialization, and the full range of node visual properties.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:17:31
version: 0.09
---

# Vis.js Fundamentals and Node Styling

## Summary

Introduces vis.js and the vis-network library as the primary tool for visualizing concept dependency graphs, covering DataSet, network initialization, and the full range of node visual properties (shape, color, size, icons, images, shadows).

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

1. Vis.js
2. Vis-Network Library
3. DataSet
4. Network Container
5. Network Initialization
6. JSON Data Format
7. Force-Directed Graph
8. Legend Display
9. Node Shape
10. Node Background Color
11. Node Size
12. Node Font Color
13. Node Border Width
14. Node Border Color
15. Node Opacity
16. Node Icon
17. Node Image
18. Node Shadow
19. Custom Canvas Shape

## Prerequisites

This chapter builds on concepts from:

- [Chapter 10: Assessment, Feedback, and Quizzes](../10-assessment-feedback-quizzes/index.md)

---

!!! mascot-welcome "Welcome to Part III!"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Every diagram you have clicked, hovered, and dragged through so far in this book was built with a specific JavaScript library — and starting now, you get to look under the hood. Part III is where the vocabulary of graphs meets actual code you can read, copy, and modify.

Everything up to this point in the book has treated a learning graph as an abstract structure: nodes, edges, dependency direction, validation rules, file formats. That abstraction was necessary, but abstractions do not help a learner *see* forty concepts and their prerequisite relationships at once. This chapter opens Part III, where the book shifts from theory to hands-on tooling — starting with the JavaScript library that renders every interactive graph diagram you have already clicked through in earlier chapters.

## What Is Vis.js?

**Vis.js** is a browser-based JavaScript visualization library for displaying dynamic, interactive data — networks, timelines, charts, and 3D graphs — directly in a web page with no server-side rendering required. It is not a single tool but a family of related components, each specialized for a different data shape: vis-timeline for chronological events, vis-graph3d for three-dimensional plots, and, most importantly for this book, vis-network for exactly the kind of node-and-edge structure a learning graph is.

The **Vis-Network Library** is the specific component of vis.js used to draw and interact with graphs made of nodes and edges — the component behind every diagram in this book so far, including the Graph Anatomy Explorer in Chapter 1 and the Orphan and Disconnected Subgraph Explorer in Chapter 5. Vis-network handles the parts of graph rendering that are tedious to build from scratch: physics-based layout, zooming and panning, click and hover event handling, and a large set of visual styling options for both nodes and edges. This chapter and the next several focus entirely on vis-network, because it is the single tool a learning-graph author needs to master in order to visualize, edit, and publish concept dependency graphs.

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    You do not need to be a JavaScript expert to use vis-network productively. Most of the work is describing *data* — which nodes exist, which edges connect them, and what each should look like — in a format vis-network already understands. The library does the hard part: physics, rendering, and interaction.

## Loading Graph Data: DataSet and JSON

Before vis-network can draw anything, it needs the node and edge data organized in a structure it can efficiently read, update, and re-render. That structure is called a DataSet.

A **DataSet** is a vis.js data container that holds a collection of JavaScript objects — nodes or edges — and gives vis-network fast, reactive access to them: when an item in a DataSet changes, any network displaying that DataSet updates automatically, without the developer manually re-drawing the canvas. You will create one DataSet for your nodes and a second DataSet for your edges, then hand both to the network object described in the next section.

You already know the file format that feeds a DataSet, because Chapter 5 covered it in detail. The **JSON Data Format** is the JavaScript Object Notation structure used to store vis-network's node and edge arrays — each node is a JSON object with at minimum an `id` and a `label` field, and each edge is a JSON object with a `from` field and a `to` field pointing at two node IDs. This is the same `learning-graph.json` file structure you have seen throughout this book; vis-network is simply the tool that turns that file into a picture.

The following short example shows the minimum code needed to load a JSON file and wrap its contents in two DataSets. Read it as three steps: fetch the file, wrap the arrays in `vis.DataSet`, and hand the pair to the network (covered in the next section). The `fetch()` call retrieves the JSON file asynchronously; `.then(response => response.json())` parses the raw text into a JavaScript object; and `new vis.DataSet(data.nodes)` wraps the resulting `nodes` array so vis-network can track it reactively.

```javascript
// Fetch data from the JSON file
fetch('learning-graph.json')
    .then(response => response.json())
    .then(data => {
        // Wrap the raw arrays in reactive DataSets
        const nodes = new vis.DataSet(data.nodes);
        const edges = new vis.DataSet(data.edges);
        // network initialization continues below...
    })
    .catch(error => console.error('Error loading the network data:', error));
```

## The Network Container and Network Initialization

A DataSet holds data, but data alone is invisible. Vis-network needs a place on the page to draw into, and an explicit instruction to start drawing.

The **Network Container** is the HTML element — almost always a `<div>` — that vis-network uses as the drawing surface for a graph. It must exist in the page's HTML before the JavaScript runs, and it must have a defined height (vis-network cannot compute its own height from empty content the way text elements can). A typical container looks like `<div id="mynetwork"></div>`, styled with CSS to a fixed or responsive height.

**Network Initialization** is the act of constructing a `new vis.Network(container, data, options)` object, which is the single line of code that actually renders the graph — combining the container element, the node/edge DataSets, and a configuration object into a live, interactive visualization. Once this line runs, vis-network takes over: it lays out the nodes, draws the edges, and starts listening for mouse events.

Building on the fetch example above, the code below completes the pattern by grabbing the container element, bundling the two DataSets into a `data` object, and calling `new vis.Network()`. The `options` object is left empty here (`{}`) — later sections of this chapter fill it with node styling instructions.

```javascript
// Fetch data from the JSON file
fetch('learning-graph.json')
    .then(response => response.json())
    .then(data => {
        const nodes = new vis.DataSet(data.nodes);
        const edges = new vis.DataSet(data.edges);

        // Locate the network container in the page
        const container = document.getElementById('mynetwork');
        const networkData = { nodes: nodes, edges: edges };
        const options = {};

        // Network Initialization: this line draws the graph
        const network = new vis.Network(container, networkData, options);
    })
    .catch(error => console.error('Error loading the network data:', error));
```

This four-part pattern — fetch, DataSet, container, initialize — is the skeleton underneath every vis-network visualization in this book. Every remaining topic in this chapter is about what goes *inside* the `options` object or *inside* each node's JSON, not about changing this skeleton.

## How Nodes Find Their Positions: The Force-Directed Graph

Notice that the JSON data above never specifies where each node should sit on the screen — no x/y coordinates. Vis-network still manages to lay the graph out sensibly, and the reason is its default layout algorithm.

A **Force-Directed Graph** is a graph layout technique that treats nodes as physical objects: edges act like springs pulling connected nodes together, while all nodes simultaneously repel each other like magnets with the same polarity. The layout "settles" into a stable arrangement where these opposing forces balance out — densely connected nodes cluster near each other, while loosely connected nodes drift toward the edges of the canvas. This is the layout style used by default in vis-network, and it is the reason the Structural Variations Explorer in Chapter 1 could offer a "Cluster View" without any manually assigned coordinates.

Force-directed layout is popular for concept dependency graphs precisely because it requires no manual positioning: add a new concept and a new edge to the JSON, and the physics simulation re-settles the whole graph to accommodate it. The trade-off, which later chapters in Part III return to, is that force-directed layouts can look chaotic for very large graphs and don't guarantee a clean top-to-bottom prerequisite ordering the way a hierarchical layout does.

Before you experiment with the MicroSim below, hold onto one more idea: every node in that MicroSim is still using vis-network's default circular shape with no custom styling — the rest of this chapter changes that, one property at a time.

#### Diagram: Force-Directed Layout Explorer

<iframe src="../../sims/force-directed-layout-explorer/main.html" width="100%" height="540px" scrolling="no"></iframe>

<details markdown="1">
<summary>Force-Directed Layout Explorer</summary>
Type: microsim
**sim-id:** force-directed-layout-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners manipulate the physics parameters of a force-directed layout and observe how spring strength and repulsion change the resting shape of a graph.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, experiment

Learning objective: Given a small graph and adjustable physics sliders, the learner can predict and observe how increasing repulsion spreads nodes apart and how increasing spring (edge) strength pulls connected nodes closer together.

Canvas layout:
- Left/top (75% width): drawing area showing a 14-node sample graph drawn from this chapter's own concept list (Vis.js, Vis-Network Library, DataSet, Network Container, Network Initialization, JSON Data Format, Force-Directed Graph, and 7 more)
- Right/bottom (25% width or below on narrow screens): control panel

Visual elements:
- 14 light-blue circular nodes with black text labels
- Directed gray edges (dependency direction, arrowhead at prerequisite end)
- A "settling" indicator (small spinner) that appears while physics is still animating and disappears once the layout stabilizes

Interactive controls:
- Slider: "Repulsion Strength" (range -20000 to -1000, default -8000) — maps to vis-network's `physics.barnesHut.gravitationalConstant`
- Slider: "Spring Length" (range 50 to 300, default 150) — maps to `physics.barnesHut.springLength`
- Slider: "Spring Strength" (range 0.01 to 0.5, default 0.08) — maps to `physics.barnesHut.springConstant`
- Button: "Re-Settle Graph" — nudges the physics simulation to re-run from the current node positions
- Button: "Reset to Defaults"

Default parameters:
- Repulsion Strength: -8000
- Spring Length: 150
- Spring Strength: 0.08

Behavior: Moving any slider calls `network.setOptions()` with the updated physics configuration and re-enables the physics simulation briefly so the graph visibly re-settles into its new resting shape. An infobox below the sliders states in one sentence what changed, e.g., "Higher repulsion pushes nodes further apart, spreading the graph out."

Canvas size: responsive, 100% width, 540px height, must reflow on window resize

Implementation: vis-network JavaScript library using the `physics.barnesHut` solver options exposed through `network.setOptions()`; slider `input` events trigger option updates
</details>

## The Node Property Toolbox: An Overview

Every node in a vis-network JSON file can carry an entire set of visual styling properties beyond just an `id` and a `label`. Before diving into each property individually, it helps to see them together as a toolbox, because in practice a learning-graph author combines several of these properties at once to make a diagram's visual encoding meaningful — for instance, using color to represent a taxonomy category (as Chapter 4 covered) while using shape to represent a concept's role (foundation, term, or goal).

The table below organizes the properties this chapter covers. Each row is explained in its own section afterward — treat the table as a map of what's coming, not as your first introduction to any of these terms.

| Property | JSON Key | What It Controls |
|---|---|---|
| Node Shape | `shape` | The geometric outline used to draw the node |
| Node Background Color | `color.background` | The fill color inside the node's shape |
| Node Size | `size` | The radius (in pixels) of shapes without an inline label |
| Node Font Color | `font.color` | The color of the node's label text |
| Node Border Width | `borderWidth` | The thickness, in pixels, of the node's outline |
| Node Border Color | `color.border` | The color of the node's outline |
| Node Opacity | `opacity` | How transparent or solid the node appears |
| Node Icon | `icon` | A font-based symbol (e.g., FontAwesome) drawn inside the node |
| Node Image | `image` | A raster or vector image file used as the node's shape |
| Node Shadow | `shadow` | A drop-shadow effect behind the node |
| Custom Canvas Shape | `shape: "custom"` | A developer-defined drawing function replacing all built-in shapes |

## Node Shape

The **Node Shape** property controls the geometric outline vis-network uses to draw a node — the most immediately visible styling choice, and usually the first one a learning-graph author sets. Vis-network ships with a substantial built-in library of shapes, split into two behavioral categories that matter for later properties in this chapter.

Some shapes draw the label text *inside* the shape, sizing the shape to fit the text automatically: `box`, `ellipse`, `circle`, and `database` all behave this way. Other shapes draw the label *below* a fixed-size icon or outline, and their visual size is controlled entirely by the Node Size property covered next: `image`, `circularImage`, `diamond`, `dot`, `star`, `triangle`, `triangleDown`, `hexagon`, `square`, and `icon`. Knowing which category a shape falls into matters because setting `size` on a `box` node does nothing — the box already sizes itself to the label — while setting `size` on a `dot` node is the only way to make it bigger or smaller.

- `circle` — a fixed circular outline with the label inside; label may be clipped if too long
- `box` — a rectangle sized to fit the label, with configurable rounded corners
- `ellipse` — the vis-network default shape; an oval sized to fit the label
- `diamond` — a fixed-size diamond outline, label drawn below
- `star` — a five-point star, label drawn below
- `triangle` / `triangleDown` — pointing up or down respectively, label drawn below
- `dot` — a simple filled circle, label drawn below
- `square` / `hexagon` — regular polygons, label drawn below
- `database` — a cylinder shape evoking a data store, label inside
- `text` — no visible outline at all, only the label text

Setting a node's shape in the JSON is a single key-value pair. The `shape` field accepts any of the string values listed above:

```json
{"id": 1, "label": "Node 1", "shape": "triangle"},
{"id": 2, "label": "Node 2", "shape": "square"},
{"id": 3, "label": "Node 3", "shape": "circle"},
{"id": 5, "label": "Node 5", "shape": "star"},
{"id": 6, "label": "Node 6", "shape": "ellipse"}
```

## Node Background Color and Node Font Color

Shape gives a node its outline; color gives it meaning at a glance. Two related properties control color, and it is worth learning them together because a common mistake — dark background with dark text — only becomes visible once both are set.

**Node Background Color** is the fill color inside a node's shape, set through the `color` property in the node's JSON. Vis-network accepts either a simple color name string (`"color": "red"`) or, for finer control, an object that separately specifies the background and border colors (`"color": {"background": "red", "border": "black"}`). Background color is the single most common visual encoding in a learning graph diagram — Chapter 4 used it to distinguish taxonomy categories, and Chapter 1's diagrams used it to distinguish node states (valid vs. cycle-forming, for example).

**Node Font Color** is the color of the text label drawn on or below a node, set through the nested `font.color` property (`"font": {"color": "white"}`). The default font color in vis-network is black, which reads clearly on light backgrounds like gold, orange, or pale blue — but becomes nearly illegible on dark backgrounds like green, purple, or navy. Whenever a background color falls on the darker half of the color spectrum, pair it with an explicit white font color.

The example below extends the shape example from the previous section, adding background colors to every node and white font color specifically on the two darkest nodes:

```json
{"id": 1, "label": "Node 1", "color": "red", "shape": "triangle"},
{"id": 2, "label": "Node 2", "color": "orange", "shape": "square"},
{"id": 3, "label": "Node 3", "color": "yellow", "shape": "circle"},
{"id": 4, "label": "Node 4", "color": "green", "shape": "box", "font": {"color": "white"}},
{"id": 5, "label": "Node 5", "color": "blue", "shape": "star"},
{"id": 6, "label": "Node 6", "color": "purple", "shape": "ellipse", "font": {"color": "white"}}
```

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Purple and green nodes with black text are a genuinely common accessibility mistake in early graph diagrams. If you can't read a label at a glance while zoomed to a normal level, neither can your students — fix the font color before you move on to any other styling.

## Node Size

Recall from the Node Shape discussion that some shapes size themselves to their label text, while others — `dot`, `star`, `diamond`, `triangle`, `square`, `hexagon`, `icon`, `image`, and `circularImage` — use a fixed size that must be set explicitly. The **Node Size** property, set through the `size` key, controls the radius in pixels of exactly this second category of shapes.

Node size is also a common encoding for a quantitative property of a concept — degree (the number of connections a node has, covered in Chapter 5) is a frequent choice, since a concept many other concepts depend on visually "reads" as more important when drawn larger. The Structural Variations Explorer's hover badge in Chapter 1, which displayed a node's degree on hover, pairs naturally with a diagram that also scales node size to that same degree value.

```json
{"id": 4, "label": "Node 4", "color": "green", "shape": "box", "size": 50}
```

Note that this example sets `size` on a `box`-shaped node — which, per the rule above, has no visible effect, since `box` sizes itself to its label. This is a common early mistake: setting `size` on a label-sized shape produces no visual change, which can look like a bug when it is really a mismatched shape choice.

## Node Border Width and Node Border Color

Fill color and font color handle the interior of a node; two more properties control its outline.

**Node Border Width** is the thickness, measured in pixels, of the line drawn around a node's shape, set through the `borderWidth` key (default `1`). Increasing border width is a lightweight way to draw attention to a specific node — a selected node, a node currently in violation of a validation rule, or a node representing the current step in a journey map — without changing its size or color.

**Node Border Color** is the color of that outline, set through the nested `color.border` key when `color` is expressed as an object rather than a single string (`"color": {"background": "lightblue", "border": "darkblue"}`). Border color and background color are independent: a node can have a light background with a dark, high-contrast border, which is often more readable than a uniformly dark node with white text.

Building on Chapter 1's Graph Anatomy Explorer, which used "highlighted gold with a thicker gold border" to mark a selected node, the JSON snippet below shows how that selected-state styling is expressed:

```json
{
  "id": 2,
  "label": "Node",
  "color": {"background": "gold", "border": "goldenrod"},
  "borderWidth": 4
}
```

## Node Opacity

The **Node Opacity** property controls how transparent or solid a node appears, set through the `opacity` key as a decimal between `0` (fully transparent, effectively invisible) and `1` (fully solid, the default). Opacity is most useful as a *state* indicator rather than a permanent styling choice — dimming nodes that are not currently relevant while keeping the highlighted subset at full opacity. The Journey Map Builder MicroSim from Chapter 1 used exactly this technique, described as "dimming nodes/edges not on the chosen path," to focus attention on one derived route through a larger graph.

```json
{"id": 7, "label": "Not Yet Relevant", "opacity": 0.3}
```

Because opacity is usually applied dynamically — in response to a click, a filter, or a lens selection — rather than baked permanently into a JSON file, it is more often set in JavaScript through `nodes.update({id: 7, opacity: 0.3})` than written directly into the static data file.

## Node Icon and Node Image

Shapes and colors communicate a lot, but sometimes the clearest way to represent a concept is a small recognizable symbol or picture. Vis-network supports two distinct approaches, and it is worth understanding the difference before choosing between them.

A **Node Icon** is a font-based symbol — typically drawn from an icon font library such as FontAwesome — rendered inside a node using the `shape: "icon"` setting together with an `icon` configuration object specifying the font face, the character code, the size, and the color. Icons are vector-based, so they stay crisp at any zoom level and can be recolored on the fly, which makes them a good fit for representing a small, fixed set of concept types (a book icon for reading material, a gear icon for a tool or process, a lightbulb icon for a key insight).

A **Node Image** is a raster or vector picture file — PNG, JPG, or SVG — used as the node's entire visual shape, set through `shape: "image"` (a rectangular image) or `shape: "circularImage"` (the same image cropped to a circle) together with an `image` field pointing at the file's URL. Images are the right choice when a concept is best represented by an actual photograph, diagram thumbnail, or custom illustration rather than a symbolic icon — a portrait node for a historical figure in the Stories section of a textbook, for instance, or a screenshot thumbnail representing a specific piece of content.

The following table summarizes when each is the better fit, now that both have been explained in prose:

| Situation | Better Choice | Why |
|---|---|---|
| Representing a category (tool, concept, process) | Node Icon | Scales cleanly, easy to recolor, small file footprint |
| Representing a specific real-world thing (a person, a screenshot) | Node Image | Preserves actual visual detail an icon cannot convey |
| Diagram will be zoomed in and out frequently | Node Icon | Vector icons stay sharp; raster images can blur |
| Large graph with hundreds of nodes | Node Icon | Icon fonts load faster than hundreds of image files |

```json
{
  "id": 8,
  "label": "Force-Directed Graph",
  "shape": "icon",
  "icon": {"face": "FontAwesome", "code": "", "size": 40, "color": "#2b7de9"}
},
{
  "id": 9,
  "label": "Axiom",
  "shape": "circularImage",
  "image": "../../img/mascot/neutral.png"
}
```

## Node Shadow

The **Node Shadow** property adds a drop-shadow effect behind a node, set through the `shadow` key — either a simple boolean (`"shadow": true` for a default gray shadow) or an object specifying the shadow's color, blur radius, and x/y offset (`"shadow": {"enabled": true, "color": "rgba(0,0,0,0.5)", "size": 10, "x": 5, "y": 5}`). Shadow is a subtle effect compared to shape, color, or size, but it is useful for creating a visual sense of depth — making a currently-selected or currently-hovered node appear to "lift" off the canvas relative to its neighbors.

```json
{"id": 10, "label": "Selected Node", "shadow": true}
```

## Legend Display

With eleven different node styling properties available, a diagram with a dozen or more nodes quickly needs a way to explain its own visual encoding to the reader — otherwise color and shape become decoration rather than information. **Legend Display** is the practice of rendering a key alongside a vis-network diagram that maps each visual encoding (a color, a shape, an icon) back to the category or meaning it represents, typically implemented as a small set of extra non-interactive nodes positioned in a fixed corner of the canvas, or as an HTML panel built alongside the network container.

A well-built legend does three things: it lists every distinct color, shape, or icon actually used in the diagram (not a generic reference list); it labels each with the plain-language category it stands for; and — per this book's interactivity standard — it responds to learner interaction rather than sitting inert. The MicroSim below demonstrates a clickable legend built on top of the taxonomy-colored nodes from Chapter 4, letting a learner toggle entire categories on and off.

Before exploring the MicroSim, note the key interaction pattern: clicking a legend entry doesn't just highlight it — it filters the DataSet, hiding every node that doesn't match the selected category, which is a different (and more powerful) interaction than a legend that merely displays.

#### Diagram: Interactive Legend Filter

<iframe src="../../sims/interactive-legend-filter/main.html" width="100%" height="560px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Legend Filter</summary>
Type: microsim
**sim-id:** interactive-legend-filter<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Teach learners that a legend in an intelligent textbook diagram is not a static caption but a functional filter control tied to the underlying DataSet.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, use

Learning objective: Given a graph with nodes colored by taxonomy category, the learner can use a clickable legend to filter the visible node set and explain how the legend's colors map to the DataSet's category field.

Canvas layout:
- Top (80% height): drawing area with a 20-node sample graph, nodes colored by one of four taxonomy categories drawn from Chapter 4 (Foundational Concepts = blue, Graph Theory = green, Visualization = gold, Learning Science = purple)
- Bottom (20% height) or right sidebar on wide screens: legend panel with four clickable color swatches, each labeled with its category name and a live count of visible nodes in that category

Visual elements:
- 20 circular nodes colored by category as listed above
- Directed gray edges
- Legend swatches: colored square, category label, node count badge (e.g., "Graph Theory (6)")
- A "Show All" reset link above the legend

Interactive controls:
- Click a legend swatch: toggles that category's visibility; hidden categories show the swatch at reduced opacity and gray out the count badge
- Multiple categories may be toggled off simultaneously
- Hover a legend swatch (without clicking): temporarily highlights that category's nodes in the graph with a gold outline, without hiding others
- "Show All" link: restores all four categories to visible

Behavior: Clicking a swatch calls `nodes.update()` to set `hidden: true` on every node in that category's DataSet subset, then calls `network.redraw()`. The node count badge recalculates from the live DataSet on every toggle.

Canvas size: responsive, 100% width, 560px height, must reflow on window resize

Implementation: vis-network JavaScript library; legend built as an HTML/CSS panel outside the canvas, wired to DataSet filter operations via `nodes.getIds({filter: ...})`
</details>

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A legend that only *displays* meaning is documentation. A legend that also *filters* the graph is a study tool — it lets a learner isolate one taxonomy category at a time and ask, "what does just the Graph Theory cluster look like on its own?" That shift, from passive caption to interactive control, is the theme of everything Part III builds toward.

## Custom Canvas Shape

Every property covered so far configures one of vis-network's built-in shapes. But sometimes none of them — box, star, diamond, icon, image — is the right fit for what a concept needs to communicate visually. Vis-network provides an escape hatch for exactly this situation.

A **Custom Canvas Shape** is a node shape defined by the developer's own drawing function rather than selected from vis-network's built-in list, enabled by setting `shape: "custom"` and supplying a `ctxRenderer` function that receives the browser's HTML5 Canvas 2D drawing context and draws whatever the developer specifies — an arbitrary polygon, a mini bar chart, a progress ring, or any shape composed from basic drawing primitives (arcs, lines, fills). This is the most powerful and most complex node styling option in vis-network, because it trades the simplicity of a JSON property for full programmatic control.

Because a custom canvas shape depends on the HTML5 Canvas API rather than a simple property value, it cannot be expressed in a single line of JSON the way `shape: "star"` can. Instead, the node's JSON sets `shape: "custom"` and points at a JavaScript function supplied separately in the network options:

```json
{"id": 11, "label": "Mastery Progress", "shape": "custom"}
```

```javascript
// Referenced by the node's "custom" shape — draws a ring whose
// fill proportion represents a student's mastery percentage
const options = {
  nodes: {
    ctxRenderer: ({ ctx, x, y, state: { selected }, style }) => {
      const radius = 25;
      const masteryFraction = 0.65; // 65% mastery, from student data
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#cccccc";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + masteryFraction * Math.PI * 2);
      ctx.strokeStyle = "#2b7de9";
      ctx.lineWidth = 6;
      ctx.stroke();
    }
  }
};
```

Custom canvas shapes are rare in ordinary concept dependency graph diagrams — most learning-graph visualization needs are met by the built-in shape, color, size, icon, and image properties covered earlier in this chapter. Reach for a custom shape only when the visualization needs to encode information no built-in property can express, such as a live progress ring, a sparkline, or a shape that changes based on real-time data rather than a fixed category.

The MicroSim below lets you compare every node styling property covered in this chapter side by side, so you can see how shape, color, size, border, opacity, icon, image, and shadow combine on the same underlying data.

#### Diagram: Node Styling Property Playground

<iframe src="../../sims/node-styling-property-playground/main.html" width="100%" height="580px" scrolling="no"></iframe>

<details markdown="1">
<summary>Node Styling Property Playground</summary>
Type: microsim
**sim-id:** node-styling-property-playground<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners apply each node styling property from this chapter to a single sample node in real time and observe the resulting JSON alongside the rendered result.

Bloom Level: Apply (L3)
Bloom Verb: apply, experiment, demonstrate

Learning objective: Given a control panel exposing every node styling property covered in this chapter, the learner can construct a fully styled node and correctly match each visual change to its corresponding JSON property.

Canvas layout:
- Left (55% width): drawing area showing one large sample node plus two unstyled neighbor nodes for visual context
- Right (45% width): control panel, stacked vertically; on narrow screens, control panel moves below the canvas

Visual elements:
- One centered sample node, initial state: default ellipse, light blue, black text, borderWidth 1
- Two smaller unstyled neighbor nodes connected by edges, for scale reference
- A read-only JSON preview panel beneath the controls, live-updating to show the exact node JSON the current control settings produce

Interactive controls:
- Dropdown: Node Shape (circle, box, ellipse, diamond, star, triangle, dot, square, hexagon, icon, image)
- Color picker: Background Color
- Color picker: Font Color
- Slider: Size (10-80px, only active/visible when shape is in the fixed-size category)
- Slider: Border Width (0-10px)
- Color picker: Border Color
- Slider: Opacity (0.0-1.0)
- Checkbox: Enable Shadow
- Dropdown: Icon (FontAwesome sample set of 6 icons, only active when shape is "icon")
- Text input: Image URL (only active when shape is "image" or "circularImage")

Default parameters:
- Shape: ellipse, Background: lightblue, Font: black, Size: 25, Border Width: 1, Border Color: darkblue, Opacity: 1.0, Shadow: off

Behavior: Every control change calls `nodes.update()` on the sample node's DataSet entry with the new property value and refreshes the JSON preview panel to show the resulting object. Controls that don't apply to the current shape (e.g., Size for a box shape) are visually disabled with an explanatory tooltip.

Canvas size: responsive, 100% width, 580px height, must reflow on window resize

Implementation: vis-network JavaScript library; control panel built with standard HTML form elements; JSON preview generated with `JSON.stringify(nodes.get(sampleNodeId), null, 2)`
</details>

## Key Takeaways

- **Vis.js** is a family of browser-based visualization libraries; the **Vis-Network Library** is the component used to render node-and-edge graphs like concept dependency graphs.
- A **DataSet** is vis-network's reactive container for nodes and edges, populated from the **JSON Data Format** already familiar from Chapter 5.
- A **Network Container** (an HTML element) plus **Network Initialization** (`new vis.Network(container, data, options)`) is the minimum code needed to render any graph.
- The default **Force-Directed Graph** layout uses spring-and-repulsion physics to position nodes without manual coordinates.
- Eleven node styling properties — **Shape**, **Background Color**, **Size**, **Font Color**, **Border Width**, **Border Color**, **Opacity**, **Icon**, **Image**, **Shadow**, and **Custom Canvas Shape** — give an author full control over what each node communicates visually.
- **Legend Display** turns a styled diagram's color and shape choices into readable, and ideally interactive, meaning for the learner.

!!! mascot-celebration "Well Done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you just went from reading graph diagrams to understanding exactly how they are built, property by property. Next up: edges get the same treatment, from arrow styles to dashed lines to hover labels. Let's connect the concepts!
