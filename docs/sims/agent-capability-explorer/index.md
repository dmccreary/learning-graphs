---
title: Agent Capability Explorer
description: Given four togglable agent capabilities, the learner can differentiate which behaviors each capability enables and explain why a system with all four toggles off is equivalent to generative AI responding to a single prompt.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Agent Capability Explorer



<iframe src="main.html" width="100%" height="542"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Intelligent Agents and Generative AI](../../chapters/17-intelligent-agents-generative-ai/index.md).

```text
Type: microsim
**sim-id:** agent-capability-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners toggle the four defining capabilities (agent autonomy, iterative workflow, tool use, multi-agent collaboration) on and off and read a simulated behavior description that updates live, making concrete that each capability contributes independently to what distinguishes an intelligent agent from a single generative AI call.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine, distinguish

Learning objective: Given four togglable agent capabilities, the learner can differentiate which behaviors each capability enables and explain why a system with all four toggles off is equivalent to generative AI responding to a single prompt.

Canvas layout:
- Left (300px): four toggle switches, one per capability, each with a one-line label
- Right (400px): a "Simulated Agent Behavior" text panel that updates as toggles change

Visual elements:
- Toggle 1: "Agent Autonomy" — when on, the behavior panel adds: "Decides its next action without waiting for a new human prompt."
- Toggle 2: "Iterative Workflow" — when on, the behavior panel adds: "Evaluates its own output and refines it across repeated cycles."
- Toggle 3: "Tool Use" — when on, the behavior panel adds: "Queries the learning graph and other external systems for real data instead of relying on memory."
- Toggle 4: "Multi-Agent Collaboration" — when on, the behavior panel adds: "Coordinates with other specialized agents on subtasks."
- With all four off, the panel shows: "Generates one response to one prompt, then stops."

Interactive controls:
- Four independent toggle switches (all default off)
- Button: "Reset All Toggles"

Default parameters:
- All four toggles off; behavior panel shows the baseline generative-AI-only description

Data Visibility Requirements:
Stage 1: With all toggles off, show the baseline description and a caption: "This is generative AI without agent capabilities"
Stage 2: As each toggle is switched on, append its corresponding behavior sentence to the panel with a brief highlight animation
Stage 3: With all four toggles on, show all four behavior sentences together with a caption: "This is a fully capable intelligent agent"
Final: Clicking any toggle off again removes its sentence immediately, reinforcing that each capability is independent and additive

Instructional Rationale: An Analyze-level objective requires the learner to isolate the contribution of each capability, which is best served by direct toggling that adds or removes one behavior sentence at a time, rather than a static paragraph describing all four capabilities at once.

Responsive behavior: toggle panel and behavior panel stack vertically on viewports narrower than 640px

Canvas size: responsive, 100% width, 540px height

Implementation: p5.js; four boolean toggle states drive a lookup table of behavior sentences, concatenated into the display panel; no live AI model involved, clearly labeled as an illustrative simulation
```

## Related Resources

- [Chapter 17: Intelligent Agents and Generative AI](../../chapters/17-intelligent-agents-generative-ai/index.md)
