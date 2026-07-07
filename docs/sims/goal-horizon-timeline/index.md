---
title: Goal Horizon Timeline
description: Given a learner's current position on a displayed chain, the learner can correctly classify each remaining concept as an immediate, intermediate, or ultimate goal.
status: scaffold
library: vis-timeline
bloom_level: Understand (L2)
---

# Goal Horizon Timeline



<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md).

```text
Type: chart
**sim-id:** goal-horizon-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Purpose: Show a single learner's position on a prerequisite chain and let them see which upcoming concept counts as their immediate goal, which counts as an intermediate goal, and which is the ultimate goal of the course.

Bloom Level: Understand (L2)
Bloom Verb: classify, distinguish

Learning objective: Given a learner's current position on a displayed chain, the learner can correctly classify each remaining concept as an immediate, intermediate, or ultimate goal.

Timeline items (7 concepts in sequence, left to right): "Number Sense" (mastered), "Arithmetic" (mastered), "Algebra" (current frontier), "Functions" , "Derivatives", "Integrals", "Applied Calculus" (course capstone)

Interactive controls:
- Draggable "You are here" marker, defaults positioned after "Algebra"
- As the marker moves, the timeline recolors: mastered concepts (left of marker) gray, the single next concept immediately right of the marker gold and badged "Immediate Goal," concepts further right but before the last item blue and badged "Intermediate Goal," and the rightmost concept ("Applied Calculus") always badged "Ultimate Goal" in purple regardless of marker position

Visual styling:
- vis-timeline horizontal axis, one item per concept, connecting line between consecutive items
- Badges rendered as small pills above each timeline item

Canvas size: responsive, 100% width, 480px height

Implementation: vis-timeline JavaScript library; badge assignment recalculated in a "rangechange"/drag event handler based on the marker's item index
```

## Related Resources

- [Chapter 3: Concept Dependencies and Prerequisites](../../chapters/03-concept-dependencies-prerequisites/index.md)
