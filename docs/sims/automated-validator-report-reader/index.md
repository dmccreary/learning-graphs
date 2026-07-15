---
title: Automated Validator Report Reader
description: Read a simulated validator report of six findings against a 15-node graph, click each to locate it on the canvas, and decide whether the graph is safe to publish.
image: /sims/automated-validator-report-reader/automated-validator-report-reader.png
og:image: /sims/automated-validator-report-reader/automated-validator-report-reader.png
twitter:image: /sims/automated-validator-report-reader/automated-validator-report-reader.png
social:
   cards: false
status: implemented
library: vis-network
bloom_level: Analyze (L4)
---

# Automated Validator Report Reader

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Automated Validator Report Reader MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

A validator prints findings. It does not decide whether you ship. That decision is a triage
judgment, and this MicroSim is where you practice it.

The report holds **six findings — three errors and three warnings — against a 15-node graph**.
Every one of them is genuinely true of the graph on the right: the cycle really is a cycle, the
orphan really has no edges, the category really is 5 of 15 concepts. Clicking a finding
highlights the exact nodes and edges it refers to.

### The judgment

The obvious rule — "errors block, warnings don't" — gets you close but not to the right answer.
Three errors are reported, and yet only **two** block:

| Finding | Severity | Blocks? |
|---|---|---|
| `DAG-001` Cycle: Prerequisite → Learning Path → Readiness → Prerequisite | Error | **Yes** — no valid reading order exists |
| `ORPH-006` Orphan: 'Deployment' has no edges | Error | **Yes** — cannot be sequenced into any curriculum |
| `DUP-003` Duplicate label: 'Graph' at IDs 3 and 11 | Error — **resolved** | No — merged in the previous repair pass |
| `BAL-002` Category 'Graph Theory' at 33% | Warning | No |
| `LEAF-004` 'Traversal' has no dependents | Warning | No |
| `DEG-005` 'Taxonomy' has out-degree 5 | Warning | No |

So the answer is **No, not ready** — but for a reason you can only give after reading the
findings rather than counting their severity labels. A resolved error stays in the report as a
record of what was fixed; it is history, not a blocker.

The warnings are worth arguing about too. `BAL-002` flags a 33% category — but against only 15
concepts, that is five nodes. The same 33% across 200 concepts would be a real problem. A
warning marks a judgment call, and the judgment is still yours.

## How to Use

1. **Click any finding** to highlight the node or edge it affects and expand its explanation.
   The rest of the graph dims so the affected elements stand out.
2. **Toggle Sort by severity** to reorder the list errors-first. The report arrives in
   generation order, which is not triage order.
3. Once you have reviewed at least one finding, the **Ready to publish?** prompt unlocks. Write
   a justification, then answer Yes or No and check your reasoning against the model answer.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/automated-validator-report-reader/main.html"
        height="562px"
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

Learners need **Automated Validator**, **Validation Threshold**, **Finding Severity**, and
**Quality Metrics Report** from
[Chapter 25](../../chapters/25-graph-validation-quality-assurance/index.md), plus cycle and
orphan detection from [Chapter 5](../../chapters/05-graph-quality-validation-file-formats/index.md).

### Activities

1. **Locate every finding** (5 min): Click all six and, for each, name the specific node or edge
   involved before reading the explanation. A finding you cannot locate on the graph is a
   finding you cannot act on.
2. **Triage** (5 min): Toggle Sort by severity and ask the class to count the blockers. Most
   will say three. The answer is two — surface `DUP-003`'s resolved state and discuss why a
   report keeps resolved findings at all.
3. **Argue a warning** (5 min): Ask whether `BAL-002` should block. It should not, but the
   interesting discussion is *why*: at 15 concepts the 30% ceiling has almost no statistical
   meaning. Thresholds are heuristics, and heuristics need a reader.

### Assessment

Learners can:

- Locate each finding's affected node or edge on the rendered graph.
- Classify each finding's severity and say whether it blocks publication.
- Explain why three reported errors produce only two blockers.
- Justify a publish/no-publish decision by naming the specific unresolved errors.

## Related Concepts

- **Automated Validator** — the tool that produced this report
- **Finding Severity** — the error/warning distinction, and its limits
- **Validation Threshold** — the 30% ceiling behind `BAL-002`
- **Graph Quality Score** — the composite these findings roll up into
- **Cycle Detection / Orphan Detection** — the two checks that produce the blockers here

## References

1. [Chapter 25: Graph Validation and Quality Assurance](../../chapters/25-graph-validation-quality-assurance/index.md) - The chapter this MicroSim supports.
2. [Chapter 5: Graph Quality, Validation, and File Formats](../../chapters/05-graph-quality-validation-file-formats/index.md) - The structural checks that generate these findings.
3. [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Why a cycle makes a learning graph unsequenceable.
4. [Software Quality Assurance](https://en.wikipedia.org/wiki/Software_quality_assurance) - The broader discipline this triage workflow borrows from.
5. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - The graph rendering library used to build this MicroSim.
