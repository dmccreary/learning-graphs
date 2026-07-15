---
title: Category Balance and Overlap Auditor
description: Audit a 12-category taxonomy for a balance violation you can see in the bar chart, and a boundary overlap you cannot — then propose the criterion that resolves it.
image: /sims/category-balance-overlap-auditor/category-balance-overlap-auditor.png
og:image: /sims/category-balance-overlap-auditor/category-balance-overlap-auditor.png
twitter:image: /sims/category-balance-overlap-auditor/category-balance-overlap-auditor.png
social:
   cards: false
status: implemented
library: Chart.js
bloom_level: Evaluate (L5)
---

# Category Balance and Overlap Auditor

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Category Balance and Overlap Auditor MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This is a sample taxonomy: 200 concepts sorted into 12 categories. It has two defects, and they
are different *kinds* of defect — which is the whole point of pairing them in one tool.

**Defect one is a balance violation, and the chart shows it to you.** *Graph Theory & Structure*
holds 76 of 200 concepts — 38%, well past the 30% ceiling marked by the dashed red line. You
can spot this from across the room.

**Defect two is a boundary overlap, and the chart is useless for it.** *Metadata & Standards*
(8%) and *Taxonomy & Classification* (7%) are both comfortably balanced. Nothing in their bars
looks wrong. But three concepts have a genuine argument for landing in either one:

| Concept | Argument for Metadata & Standards | Argument for Taxonomy & Classification |
|---|---|---|
| SKOS | It is a published W3C specification | Its whole purpose is expressing taxonomies |
| Concept Label | It is a field defined by ISO 11179 | Labels are what a taxonomy classifies |
| Dublin Core Subject Field | It is one named field in a standard | The subject field *is* a classification |

Balance is a **counting** problem, and counting is what a chart is for. Overlap is a
**definitional** problem, and no amount of charting will surface it — you have to open the two
categories and read their stated boundaries against real concepts. Both are taxonomy defects;
neither is caught by Chapter 5's structural validators, which would pass this graph without
complaint.

## How to Use

1. **Read the chart.** Find the category over the 30% ceiling. Click its red bar for an
   explanation of why concentration is a problem rather than just a number.
2. **Hover any bar** for its exact count and percentage.
3. **Click either gold-outlined bar**, or the **Inspect Overlap** button, to open the two
   flagged categories side by side with their stated boundaries.
4. **Read the three ambiguous concepts** and the argument for each category.
5. **Propose a criterion** that decides all three, and click **Compare with model answer**.

On that last step: your criterion is not machine-graded — free text cannot be honestly scored.
What the sim does is reveal the model answer and tell you one checkable thing, namely whether
your criterion even mentions the axis the model turns on. The real test is the one stated in the
prompt: does your criterion place *all three* concepts, or only two?

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/category-balance-overlap-auditor/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience

Instructional designers, curriculum developers, and educational technologists working with
concept dependency graphs.

### Duration

15–20 minutes

### Prerequisites

Learners need **Category Balance**, **Category Overlap**, and **Taxonomy Validation** from
[Chapter 24](../../chapters/24-taxonomy-design-deep-dive/index.md), plus the 30% balance ceiling
introduced in [Chapter 4](../../chapters/04-concept-taxonomies-ontologies/index.md).

### Activities

1. **Spot the obvious one** (3 min): Learners identify the balance violation from the chart
   alone and explain why the fix is to *split* the category rather than move concepts out to
   make the number look better.
2. **The invisible defect** (7 min): Ask the class whether *Metadata & Standards* and *Taxonomy
   & Classification* have any problem, judging from the chart. The honest answer is "no
   evidence." Then open the overlap panel. Discuss what it means that a chart can give a clean
   bill of health to a broken taxonomy.
3. **Propose and defend** (8 min): Each learner writes a criterion, then tests it aloud against
   all three concepts. Most first attempts ("is it about classifying?") decide two and split the
   third. Compare with the model answer and discuss why a criterion that leaves any concept
   arguable has not resolved the overlap.

### Assessment

Learners can:

- Identify a balance violation from a distribution chart and state the threshold it crosses.
- Explain why a balanced pair of categories can still be defective.
- Propose a disambiguating criterion and test it against every ambiguous concept, not just one.
- Explain why structural validation catches neither defect.

## Related Concepts

- **Category Balance** — the counting property the bar chart measures
- **Category Overlap** — the definitional property it cannot
- **Taxonomy Validation** — the review this MicroSim simulates
- **Miscellaneous Bucket** — the other classic balance smell, not shown here
- **ISO 11179** — the standard behind the Concept Label boundary argument

## References

1. [Chapter 24: Taxonomy Design Deep Dive](../../chapters/24-taxonomy-design-deep-dive/index.md) - The chapter this MicroSim supports.
2. [Chapter 4: Concept Taxonomies and Ontologies](../../chapters/04-concept-taxonomies-ontologies/index.md) - Where the 30% category-balance ceiling is introduced.
3. [Taxonomy](https://en.wikipedia.org/wiki/Taxonomy) - General principles of classification, including mutual exclusivity.
4. [Mutually Exclusive and Collectively Exhaustive](https://en.wikipedia.org/wiki/MECE_principle) - The MECE principle, which the overlap defect violates.
5. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) - The charting library used to build this MicroSim.
