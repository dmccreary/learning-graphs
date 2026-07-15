---
title: Edge Styling and Visual Properties
description: Covers how prerequisite relationships are rendered visually in vis-network — edge labels, color, width, dashes, smoothing, cubic Bezier curves, arrows, and font — so dependency direction and relationship type stay legible in a rendered graph.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:20:51
version: 0.09
---

# Edge Styling and Visual Properties

## Summary

Covers how prerequisite relationships are rendered visually — edge labels, color, width, dashes, smoothing, and arrows — so dependency direction and relationship type stay legible in a rendered graph.

## Concepts Covered

This chapter covers the following 8 concepts from the learning graph:

1. Edge Label
2. Edge Color
3. Edge Width
4. Edge Dashes
5. Edge Smoothing
6. Cubic Bezier Curve
7. Edge Arrows
8. Edge Font

## Prerequisites

This chapter builds on concepts from:

- [Chapter 11: Vis.js Fundamentals and Node Styling](../11-visjs-fundamentals-node-styling/index.md)

---

!!! mascot-welcome "Edges Get Their Turn"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 11 gave you full control over how a node looks. But a learning graph's real message — *this concept depends on that one* — lives on the line between two nodes, not inside either circle. This chapter is where that line learns to talk.

Every diagram in this book has relied on an implicit assumption: that a reader can tell, at a glance, which direction a prerequisite relationship points, what kind of relationship it is, and how strong or important it is. None of that comes from the nodes. It comes entirely from how the edge connecting them is drawn — its color, its thickness, its label, and, most importantly, its arrowhead. This chapter works through vis-network's edge styling properties in the order a learning-graph author typically applies them: label first (what does this connection mean?), then color and width (how should it stand out?), then the two properties that give an edge its physical path — dashes and smoothing — and finally arrows and font, the details that make direction and meaning unambiguous even in a dense, crowded diagram.

## The Edge Property Toolbox: An Overview

Just as Chapter 11 organized node styling into a table before explaining each property, it helps to see every edge property together first. An edge's JSON object already has the two fields that make it structural — `from` and `to`, pointing at node IDs — and everything in this chapter adds to that same object.

| Property | JSON Key | What It Controls |
|---|---|---|
| Edge Label | `label` | Text drawn along the edge's path |
| Edge Color | `color` | The line color of the edge |
| Edge Width | `width` | The thickness, in pixels, of the edge line |
| Edge Dashes | `dashes` | Whether the edge is drawn solid or broken into dashes |
| Edge Smoothing | `smooth` | Whether the edge bends around other nodes or stays straight |
| Cubic Bezier Curve | `smooth.type` | The specific curve-fitting algorithm used when smoothing is enabled |
| Edge Arrows | `arrows` | Which end(s) of the edge display an arrowhead |
| Edge Font | `font` | The typeface, size, and color of an edge's label text |

Every property in this table is optional — an edge with only `from` and `to` still renders as a plain gray line with no label and no arrowhead. The rest of this chapter is about turning that plain line into a line that communicates.

## Edge Label

The **Edge Label** property is the text string drawn along an edge's path, set through the `label` key in the edge's JSON object (`{"from": 1, "to": 2, "label": "requires"}`). Where a node label answers "what is this concept?", an edge label answers "what kind of relationship connects these two concepts?" — and in a learning graph, that relationship is almost always some variant of "depends on" or "requires."

Most learning-graph diagrams in this book, including the ones in earlier chapters, deliberately leave edge labels blank, or use a single consistent label like "requires" across every edge. This is a legibility trade-off worth understanding explicitly: a graph with 40 nodes and 60 edges, each carrying a visible text label, becomes cluttered fast — labels overlap, cross each other, and compete with node labels for the same screen space. Edge labels earn their place when the relationship *type itself* varies and that variation is the point being taught, such as distinguishing "requires" from "recommends" or "related to" in a richer knowledge graph than a strict prerequisite DAG.

```json
{"from": 12, "to": 5, "label": "requires"},
{"from": 18, "to": 5, "label": "recommends"}
```

!!! mascot-tip "Helpful Tip"
    ![Axiom giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    If every edge in your graph means the same thing — "the `from` concept depends on the `to` concept" — skip the label entirely and let arrowhead direction alone carry that meaning. Save edge labels for graphs where relationship *type* genuinely varies from edge to edge.

## Edge Color

The **Edge Color** property is the line color of an edge, set through the `color` key, which accepts either a plain color string (`"color": "gray"`) or an object with finer-grained sub-properties for hover and highlight states (`"color": {"color": "gray", "highlight": "red", "hover": "blue"}`). Vis-network defaults every edge to a neutral gray, which is a deliberate and generally correct choice: gray recedes visually, letting node color — the taxonomy encoding from Chapter 4 — carry most of the diagram's meaning.

Edge color becomes worth customizing in three recurring situations in a learning-graph diagram: highlighting the path between two specific concepts a learner has selected (as the Journey Map Builder in Chapter 1 did by dimming everything off-path), distinguishing dependency edges from a second relationship type such as "related to" using a different color family, and flagging edges that participate in a validation problem — a red edge is an intuitive way to mark one leg of a detected cycle.

```json
{"from": 3, "to": 7, "color": {"color": "gray", "highlight": "#e63946", "hover": "#2b7de9"}}
```

The `highlight` sub-property controls the color shown when the edge (or one of its connected nodes) is selected, and `hover` controls the color shown while the mouse pointer rests over the edge — both are independent from the edge's resting `color` value, giving three distinct visual states from one property.

## Edge Width

The **Edge Width** property is the thickness, in pixels, of the line vis-network draws for an edge, set through the `width` key (default `1`). Like node size in Chapter 11, edge width is a natural encoding for a quantitative property of the relationship it represents — how strong, how confident, or how central a particular dependency is judged to be.

A learning-graph author has two realistic choices for what edge width encodes. It can be a fixed value chosen to make one category of edge visually dominant — for example, drawing every "hard prerequisite" edge at `width: 3` and every "helpful but optional" edge at `width: 1`, so a learner's eye is drawn first to the relationships that actually gate progress. Or it can be computed dynamically from graph metrics — an edge connecting two high-degree "hub" concepts (degree was covered in Chapter 5) might be drawn thicker than an edge connecting two peripheral concepts, visually surfacing the graph's backbone.

```json
{"from": 4, "to": 9, "width": 1},
{"from": 4, "to": 10, "width": 3}
```

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Don't combine variable edge width with variable edge color unless each is encoding something genuinely different. Two visual channels changing at once for the same underlying reason is redundant; two channels each encoding a *different* fact — width for strength, color for relationship type — is powerful.

## Edge Dashes

The **Edge Dashes** property controls whether an edge is drawn as a solid continuous line or broken into a repeating dash pattern, set through the `dashes` key, which accepts either a boolean (`"dashes": true` for a default dash pattern) or an array of numbers specifying the exact dash and gap lengths in pixels (`"dashes": [10, 5]` for a 10-pixel dash followed by a 5-pixel gap, repeating).

Dashing is the standard visual convention — borrowed from cartography and systems diagrams generally — for marking a relationship as weaker, optional, tentative, or not-yet-confirmed, in contrast to a solid line's implication of certainty. In a learning graph specifically, dashed edges are a natural fit for two situations: a "recommended but not required" prerequisite (as opposed to a solid line for a hard dependency), and an edge a validation script has flagged as needing human review, where the dash visually signals "unconfirmed" before a curriculum reviewer either solidifies or deletes it.

```json
{"from": 6, "to": 2, "dashes": false},
{"from": 6, "to": 15, "dashes": true},
{"from": 6, "to": 20, "dashes": [8, 4]}
```

## Edge Smoothing and the Cubic Bezier Curve

So far every property in this chapter has changed how an edge looks along its path. Smoothing changes the *path itself* — the actual line vis-network draws between two nodes — and it is worth understanding well because it directly affects how readable a dense graph is.

**Edge Smoothing** is the vis-network setting that controls whether an edge is drawn as a straight line directly between its two connected nodes or as a curved path that bends to avoid overlapping other nodes and edges, set through the `smooth` key as either a boolean or a configuration object (`"smooth": {"enabled": true, "type": "dynamic", "roundness": 0.5}`). With smoothing disabled (`"smooth": false`), every edge is a straight line — fast to compute and easy to reason about, but prone to overlapping other edges and passing directly through unrelated nodes in a dense graph. With smoothing enabled, vis-network calculates a curved path for each edge, which spreads parallel edges apart and routes around visual clutter, at the cost of a small amount of rendering performance on very large graphs.

When smoothing is enabled, vis-network needs a specific mathematical method for calculating the curve's shape — that method is the `type` sub-property, and one of its most useful values is the cubic Bezier curve.

A **Cubic Bezier Curve** is a smooth curve defined by two endpoints (the edge's connected nodes) and two additional control points that pull the curve's shape without the curve actually touching them, set in vis-network through `"smooth": {"type": "cubicBezier", "forceDirection": "vertical", "roundness": 0.4}`. This is the same mathematical curve family used throughout vector graphics and font rendering — familiar to anyone who has dragged a curve handle in Illustrator or SVG editing software — applied here to keep dependency edges from crossing directly through unrelated nodes. The `forceDirection` sub-property is particularly useful for hierarchical learning-graph layouts (covered in a later chapter): setting it to `"vertical"` makes every curve bow outward horizontally, which keeps a top-to-bottom prerequisite flow visually clean even when many edges skip over intermediate levels.

Vis-network offers several other `smooth.type` values beyond `cubicBezier` — `continuous`, `discrete`, `diagonalCross`, `dynamic`, and others — each trading off curve smoothness against rendering speed. `dynamic`, vis-network's default when smoothing is simply set to `true`, automatically routes each curve based on the graph's current layout and is the right starting choice for most learning-graph diagrams; reach for an explicit `cubicBezier` configuration only when you need the predictable, direction-aware bowing that `forceDirection` provides.

```json
{"from": 1, "to": 2, "smooth": false},
{"from": 1, "to": 3, "smooth": {"enabled": true, "type": "dynamic"}},
{"from": 1, "to": 4, "smooth": {"enabled": true, "type": "cubicBezier", "forceDirection": "vertical", "roundness": 0.4}}
```

The MicroSim below lets you toggle smoothing on and off and switch between curve types on the same sample graph, so the difference between a straight edge, a dynamic curve, and a cubic Bezier curve is something you can see rather than only read about.

#### Diagram: Edge Smoothing and Curve Type Explorer

<iframe src="../../sims/edge-smoothing-curve-explorer/main.html" width="100%" height="562px" scrolling="no"></iframe>

<details markdown="1">
<summary>Edge Smoothing and Curve Type Explorer</summary>
Type: microsim
**sim-id:** edge-smoothing-curve-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners compare straight, dynamically-curved, and cubic-Bezier edges on the same graph so the visual and structural differences between smoothing options become concrete rather than abstract.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, compare, examine

Learning objective: Given a graph with several overlapping edge paths, the learner can differentiate straight edges from smoothed edges and explain when cubic Bezier smoothing with a forced direction improves readability over the default dynamic curve.

Canvas layout:
- Left/top (70% width): drawing area showing a 10-node graph with deliberately overlapping prerequisite paths (several edges that would cross directly through an intermediate node if drawn straight)
- Right/bottom (30% width or below on narrow screens): control panel

Visual elements:
- 10 nodes styled per Chapter 11 conventions (light blue circles, black text)
- Edges whose path updates live based on the selected smoothing mode
- A highlighted "problem edge" (colored red) that visibly cuts through an unrelated node when smoothing is off, to make the motivation for smoothing concrete

Interactive controls:
- Radio buttons: Smoothing Mode ("Off (straight)", "Dynamic (default)", "Cubic Bezier")
- Slider: Roundness (0.0-1.0, only active when a curved mode is selected) — maps to `smooth.roundness`
- Dropdown: Force Direction ("none", "horizontal", "vertical") — only active when Cubic Bezier is selected, maps to `smooth.forceDirection`

Default parameters:
- Smoothing Mode: Off (straight)
- Roundness: 0.5
- Force Direction: none

Behavior: Changing any control calls `network.setOptions({edges: {smooth: {...}}})` with the updated configuration and the graph re-renders immediately. A caption below the canvas states in one sentence what changed, e.g., "Cubic Bezier with vertical force direction bows every edge outward instead of letting it cross other nodes."

Canvas size: responsive, 100% width, 560px height, must reflow on window resize

Implementation: vis-network JavaScript library using the `edges.smooth` options object exposed through `network.setOptions()`; radio button and slider `input`/`change` events trigger option updates
</details>

## Edge Arrows

Every property covered so far shapes an edge's appearance, but none of them communicate the single most important fact about a prerequisite relationship: which direction it points. That job belongs to arrows.

The **Edge Arrows** property controls which end or ends of an edge display an arrowhead, set through the `arrows` key, which accepts a comma-separated string (`"arrows": "to"`) or, for finer control over arrowhead style, an object with sub-properties for each end (`"arrows": {"to": {"enabled": true, "type": "arrow", "scaleFactor": 1}}`). The three possible ends are `to` (an arrowhead at the destination node), `from` (an arrowhead at the source node), and `middle` (an arrowhead at the edge's midpoint, useful for very long edges where an end-of-line arrowhead might be off-screen or hard to notice).

Recall the edge direction convention this entire book has used since Chapter 1: an edge's `from` field points at the *dependent* concept and its `to` field points at the *prerequisite* concept — so `{"from": 12, "to": 5}` means "concept 12 depends on concept 5," and the standard styling is an arrowhead on the `to` end, visually reading as "points toward what you need to learn first."

```json
{"from": 12, "to": 5, "arrows": "to"},
{"from": 8, "to": 5, "arrows": {"to": {"enabled": true, "type": "arrow", "scaleFactor": 0.8}}}
```

Vis-network supports three arrowhead shapes beyond the default `arrow` — `bar` (a short perpendicular line, resembling a UML "extends" relationship), `circle` (a filled dot), and `vee` (a wider, more open V-shaped arrow) — set through the `type` sub-property. The table below summarizes when a learning-graph author would reach for something other than the default:

| Arrow Type | Visual Effect | Typical Use in a Learning Graph |
|---|---|---|
| `arrow` (default) | Solid triangular arrowhead | Standard "depends on" prerequisite edges |
| `bar` | Short perpendicular tick | Marking a stricter "hard blocker" relationship distinct from ordinary prerequisites |
| `circle` | Filled dot | De-emphasized or exploratory "related to" edges, visually softer than an arrow |
| `vee` | Wide open V | High-visibility emphasis on a single critical-path edge in a presentation diagram |

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Arrowhead direction is the one styling choice in this entire chapter you should never treat as purely cosmetic. Get `arrows: "to"` paired with the correct `from`/`to` field assignment wrong, and the diagram will visually claim a concept is a prerequisite for something that is actually a prerequisite for *it* — silently teaching the dependency graph backwards.

## Edge Font

The last property in the edge toolbox governs the appearance of the label text this chapter introduced first. The **Edge Font** property controls the typeface, size, and color of an edge's label, set through the nested `font` key (`"font": {"color": "#343434", "size": 12, "align": "horizontal"}`). It is deliberately parallel in structure to the node font color property from Chapter 11, but edges add one sub-property nodes do not need: `align`.

The `align` sub-property controls how label text sits relative to the edge's line, with three useful values: `"horizontal"` keeps the text level regardless of the edge's angle, which is easiest to read but can visually separate the label from its edge on a steep diagonal; `"top"` places the text just above the line, following the edge's angle; and `"middle"` draws the text directly on top of the line, which requires vis-network to leave a small gap in the line itself so the text stays legible — this is the default and the most common choice, since it keeps label and edge visually inseparable even in a dense diagram.

```json
{
  "from": 7,
  "to": 3,
  "label": "requires",
  "font": {"color": "#343434", "size": 12, "align": "middle"}
}
```

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Edge font color defaults to a dark gray that reads fine against the page's white background — but if a chapter's CSS ever sets a dark canvas background, that same default becomes nearly invisible, the exact node-styling mistake Chapter 11 flagged for dark node backgrounds. Always check label contrast against your actual canvas background, not just against a blank page.

## Bringing the Properties Together

With all eight properties explained individually, it helps to see them applied at once to real edges from this book's own learning graph — the same `from`/`to`/prerequisite convention used throughout every chapter so far.

```json
{
  "from": 153,
  "to": 151,
  "label": "requires",
  "color": {"color": "#888888", "highlight": "#e63946"},
  "width": 2,
  "dashes": false,
  "smooth": {"enabled": true, "type": "cubicBezier", "forceDirection": "vertical", "roundness": 0.4},
  "arrows": "to",
  "font": {"color": "#343434", "size": 12, "align": "middle"}
}
```

This single JSON object encodes a complete design decision: a solid, medium-thickness, gray edge that curves vertically around other nodes, labeled "requires" in dark gray middle-aligned text, arrowhead pointing at the prerequisite. Every value in that object is a choice this chapter walked through — none of it is a vis-network default left untouched.

The MicroSim below turns that same set of choices into a live control panel, applied to a single sample edge, so you can build up a fully styled edge property by property and read the resulting JSON as it updates.

#### Diagram: Edge Styling Property Playground

<iframe src="../../sims/edge-styling-property-playground/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>Edge Styling Property Playground</summary>
Type: microsim
**sim-id:** edge-styling-property-playground<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners apply each edge styling property from this chapter to a single sample edge in real time and observe the resulting JSON alongside the rendered result, mirroring the Node Styling Property Playground from Chapter 11.

Bloom Level: Apply (L3)
Bloom Verb: apply, experiment, demonstrate

Learning objective: Given a control panel exposing every edge styling property covered in this chapter, the learner can construct a fully styled edge and correctly match each visual change to its corresponding JSON property.

Canvas layout:
- Left (55% width): drawing area showing two sample nodes connected by one large styled edge, plus two smaller unstyled edges for visual comparison
- Right (45% width): control panel, stacked vertically; on narrow screens, control panel moves below the canvas

Visual elements:
- Two labeled sample nodes ("Dependent Concept" and "Prerequisite Concept") connected by the sample edge
- Two smaller unstyled comparison edges elsewhere on the canvas, for scale reference
- A read-only JSON preview panel beneath the controls, live-updating to show the exact edge JSON the current control settings produce

Interactive controls:
- Text input: Edge Label
- Color picker: Edge Color
- Slider: Edge Width (1-10px)
- Checkbox: Dashes (with a secondary text input for custom dash pattern, e.g. "8,4")
- Dropdown: Smoothing ("Off", "Dynamic", "Cubic Bezier")
- Slider: Roundness (0.0-1.0, only active when a curved smoothing mode is selected)
- Dropdown: Arrow End ("to", "from", "to and from", "middle")
- Dropdown: Arrow Type ("arrow", "bar", "circle", "vee")
- Color picker: Font Color
- Slider: Font Size (8-24px)
- Dropdown: Font Align ("horizontal", "top", "middle")

Default parameters:
- Label: "requires", Color: gray, Width: 1, Dashes: off, Smoothing: Dynamic, Arrow End: "to", Arrow Type: "arrow", Font Color: dark gray, Font Size: 12, Font Align: "middle"

Behavior: Every control change calls `edges.update()` on the sample edge's DataSet entry with the new property value and refreshes the JSON preview panel to show the resulting object. Controls that don't apply to the current settings (e.g., Roundness when Smoothing is "Off") are visually disabled with an explanatory tooltip.

Canvas size: responsive, 100% width, 580px height, must reflow on window resize

Implementation: vis-network JavaScript library; control panel built with standard HTML form elements; JSON preview generated with `JSON.stringify(edges.get(sampleEdgeId), null, 2)`
</details>

## Key Takeaways

- **Edge Label** places relationship-type text along an edge, set through `label`; use it sparingly in dense graphs where a single dependency meaning already applies to every edge.
- **Edge Color** and **Edge Width** turn an edge's line into a channel for encoding relationship strength, category, or validation state — keep the two independent so they don't redundantly encode the same fact.
- **Edge Dashes** marks a relationship as optional, tentative, or unconfirmed, following the same solid-versus-dashed convention used in cartography and systems diagrams.
- **Edge Smoothing** decides whether an edge is a straight line or a curved path that routes around clutter; the **Cubic Bezier Curve** is vis-network's most controllable curve type, especially with `forceDirection` set for hierarchical layouts.
- **Edge Arrows** is the single property most responsible for a learning graph reading correctly — arrowheads on the `to` end visually confirm the from-depends-on-to convention this entire book relies on.
- **Edge Font** styles an edge's label text and, uniquely among font properties in this book, includes an `align` sub-property controlling how text sits relative to the line it labels.

!!! mascot-celebration "Well Done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — nodes and edges together now hold no styling secrets from you. You can take any concept dependency graph and make its shape, its color, and its direction all say exactly what you mean. Let's connect the concepts, next with layout and navigation!

[See Annotated References](./references.md)
