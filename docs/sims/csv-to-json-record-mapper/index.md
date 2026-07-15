---
title: CSV-to-JSON Record Mapper
description: Watch one CSV row become a node record and its edge records, one field at a time, then transform a row of your own.
image: /sims/csv-to-json-record-mapper/csv-to-json-record-mapper.png
og:image: /sims/csv-to-json-record-mapper/csv-to-json-record-mapper.png
twitter:image: /sims/csv-to-json-record-mapper/csv-to-json-record-mapper.png
social:
   cards: false
status: implemented
library: HTML/CSS/JavaScript
bloom_level: Understand (L2)
---

# CSV-to-JSON Record Mapper

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the CSV-to-JSON Record Mapper MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

`learning-graph.csv` opens with the header `ConceptID,ConceptLabel,Dependencies,TaxonomyID`.
This MicroSim takes one row under that header — the sample is `6,Learning Graph,5|4,FOUND` —
and shows, four clicks at a time, exactly what `csv-to-json.py` turns it into.

The transformation mirrors this project's real script:

~~~python
node = {'id': concept_id, 'label': concept_name, 'group': category_id}

dependencies = dependency_list.split('|')
for dep_id in dependencies:
    edges.append({'from': concept_id, 'to': dep_id})
~~~

So the sample row produces **one node record and two edge records**:

~~~json
{ "id": 6, "label": "Learning Graph", "group": "FOUND" }

{ "from": 6, "to": 5 }
{ "from": 6, "to": 4 }
~~~

### The asymmetry worth noticing

Three of the four CSV fields map one-to-one onto a JSON key. `Dependencies` does not.

CSV has no list type. Every cell holds exactly one value — so when a concept depends on two
prior concepts, the pipe character has to carry the structure that the format itself cannot:
`5|4` is two ConceptIDs packed into one cell. Splitting it is what produces *two* edge records
from *one* row, and it is why the chapter's record table says a row yields **zero or more** edge
records rather than exactly one.

That is the whole reason this step is worth a click of its own. Try `1,Concept,,FOUND` — a real
row from this book's own CSV — in the input box: an empty Dependencies cell produces a node and
**no** edges at all.

## How to Use

1. **Next Step** reveals one field's transformation at a time, in four steps: ConceptID → `id`,
   ConceptLabel → `label`, Dependencies → edge records, TaxonomyID → `group`.
2. Each CSV field carries a color, and the JSON key it becomes carries the same color. A dashed
   arrow connects the field to the key on the step it fires.
3. Watch step 3 closely: the pipe turns red, and the single Dependencies cell fans out into one
   edge record per value.
4. **Try your own row** with the input box. It does the same comma-split and pipe-split the real
   script does. Predict the output before you press Transform — that prediction is the point.

Rows worth trying: `1,Concept,,FOUND` (no dependencies), `12,Readiness Estimation,9|7|3,LEARN`
(three dependencies, three edges).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/learning-graphs/sims/csv-to-json-record-mapper/main.html"
        height="482px"
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

Learners need **CSV**, **CSV Header**, **Pipe-Delimited Field**, **Node Record**, and **Edge
Record** from [Chapter 26](../../chapters/26-data-pipeline-internals/index.md). No ability to
read Python is required.

### Activities

1. **Trace the sample** (4 min): Step through all four steps of `6,Learning Graph,5|4,FOUND`.
   At each step, have learners name the JSON key the field will become *before* clicking.
2. **Predict an unseen row** (5 min): Give learners `12,Readiness Estimation,9|7|3,LEARN` on
   paper and ask them to write the complete JSON output. Then type it in and check. The common
   miss is producing one edge record instead of three.
3. **The empty cell** (4 min): Ask what `1,Concept,,FOUND` produces. Most learners expect an
   edge with an empty `to`. It produces none. Discuss why "zero or more" is the correct
   cardinality in the chapter's record table.

### Assessment

Learners can:

- Name which JSON key each CSV field becomes.
- Predict the complete JSON output for an unseen CSV row, including the correct edge count.
- Explain why one row can produce several edge records but only ever one node record.
- Explain what the pipe character is doing and why CSV needs it.

## Related Concepts

- **CSV Header** — the four column names this mapping depends on
- **Pipe-Delimited Field** — the `5|4` cell, and why CSV needs it
- **Node Record** — one per row, always
- **Edge Record** — zero or more per row, one per dependency
- **Group Record** — generated once per distinct TaxonomyID across the whole file, not per row
- **JSON Serialization** — the final `json.dump()` that writes these records to disk

## References

1. [Chapter 26: Data Pipeline Internals](../../chapters/26-data-pipeline-internals/index.md) - The chapter this MicroSim supports.
2. [Chapter 5: Graph Quality, Validation, and File Formats](../../chapters/05-graph-quality-validation-file-formats/index.md) - Where CSV and JSON are first named.
3. [Comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values) - The format, and its lack of any list type.
4. [JSON](https://en.wikipedia.org/wiki/JSON) - The target format, which does have arrays and objects.
5. [Delimiter](https://en.wikipedia.org/wiki/Delimiter) - Why a secondary delimiter like the pipe is needed inside a delimited field.
