---
title: Book and Chapter Metrics Dashboard
description: Given a toggle between book-wide and per-chapter metrics views, the learner can compare aggregate totals against individual chapter contributions and identify which chapters are under- or over-represented relative to the book's average.
status: scaffold
library: Chart.js
bloom_level: Analyze (L4)
---

# Book and Chapter Metrics Dashboard



<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../../chapters/18-intelligent-textbooks-microsims-deployment/index.md).

```text
Type: chart
**sim-id:** book-chapter-metrics-dashboard<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Purpose: Let learners toggle between book-level and chapter-level metrics views and hover individual bars to see exact values, reinforcing the distinction between aggregate Book Metrics and per-chapter Chapter Metrics computed from the same underlying content.

Bloom Level: Analyze (L4)
Bloom Verb: compare, examine, differentiate

Learning objective: Given a toggle between book-wide and per-chapter metrics views, the learner can compare aggregate totals against individual chapter contributions and identify which chapters are under- or over-represented relative to the book's average.

Chart type: Bar chart with a view-toggle control

X-axis (Book view): Metric name (MicroSims, Glossary Terms, Diagrams, Words ÷ 1000, Links ÷ 10)
X-axis (Chapter view): Chapter number (1 through 19)
Y-axis: Count (scaled per metric as noted in axis labels above)

Data series (Book view, single series): sample values drawn from this project's own book-metrics.json snapshot — MicroSims: 8, Glossary Terms: 47, Equations: 1, Words (thousands): 32.7, Links (tens): 27.5

Data series (Chapter view, single series): representative per-chapter word counts for chapters 1 through 19, with this chapter (18) highlighted in gold and a horizontal reference line showing the book-wide average chapter word count

Interactive controls:
- Toggle: "Book Metrics" vs "Chapter Metrics" view, switching the entire chart's data and axis labels
- Hover any bar: tooltip shows the exact metric name and value
- In Chapter view: click a bar to open an infobox naming that chapter's title

Title: "Book Metrics vs. Chapter Metrics"
Legend: single-series legend indicating which view is active

Annotations: in Chapter view, a dashed horizontal reference line labeled "Book Average" crosses all chapter bars

Color scheme: indigo bars for standard values, gold bar for the currently selected/highlighted chapter, gray dashed line for the average reference

Responsive behavior: chart resizes to container width; on viewports narrower than 500px the toggle control moves above the chart and labels rotate 45 degrees

Canvas size: responsive, 100% width, 520px height

Implementation: Chart.js bar chart with two pre-loaded datasets (book-level and chapter-level) swapped via the toggle control; tooltip and click handlers use Chart.js's built-in interaction plugin
```

## Related Resources

- [Chapter 18: Intelligent Textbooks, MicroSims, and Deployment](../../chapters/18-intelligent-textbooks-microsims-deployment/index.md)
