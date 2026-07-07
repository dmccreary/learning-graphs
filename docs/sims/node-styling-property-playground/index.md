---
title: Node Styling Property Playground
description: Given a control panel exposing every node styling property covered in this chapter, the learner can construct a fully styled node and correctly match each visual change to its corresponding JSON property.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Node Styling Property Playground



<iframe src="main.html" width="100%" height="582"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Vis.js Fundamentals and Node Styling](../../chapters/11-visjs-fundamentals-node-styling/index.md).

```text
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
```

## Related Resources

- [Chapter 11: Vis.js Fundamentals and Node Styling](../../chapters/11-visjs-fundamentals-node-styling/index.md)
