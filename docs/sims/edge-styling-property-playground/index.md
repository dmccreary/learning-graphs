---
title: Edge Styling Property Playground
description: Given a control panel exposing every edge styling property covered in this chapter, the learner can construct a fully styled edge and correctly match each visual change to its corresponding JSON property.
status: scaffold
library: vis-network
bloom_level: Apply (L3)
---

# Edge Styling Property Playground



<iframe src="main.html" width="100%" height="582"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Edge Styling and Visual Properties](../../chapters/12-edge-styling-visual-properties/index.md).

```text
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
```

## Related Resources

- [Chapter 12: Edge Styling and Visual Properties](../../chapters/12-edge-styling-visual-properties/index.md)
