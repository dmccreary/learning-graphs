---
title: Learning Graph Quality, Validation, and File Formats
description: Cycle detection, orphaned-node detection, connectivity analysis, and degree metrics for validating a learning graph, paired with the JSON, CSV, YAML, and Markdown file formats used to store and exchange it.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 09:56:02
version: 0.09
---

# Learning Graph Quality, Validation, and File Formats

## Summary

Combines the quality-assurance side of learning graphs (cycle detection, orphaned-node detection, connectivity analysis, degree metrics) with the file formats — JSON, CSV, YAML, and Markdown — used to store, validate, and exchange them. Students learn to read a quality metrics report and understand the CSV-to-JSON conversion pipeline that produces a validated learning graph.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Learning Graph Validation
2. Graph Quality Metric
3. Orphaned Node
4. Disconnected Subgraph
5. Cycle Detection
6. Self-Dependency Prevention
7. Indegree
8. Out-Degree
9. Node Degree
10. Full Coverage Check
11. Structural Check
12. Graph Connectivity
13. Quality Metrics Report
14. Third-Party Certification
15. JSON
16. JSON Schema
17. CSV
18. YAML
19. Markdown
20. CSV to JSON Conversion
21. groups.json

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Concept Taxonomies and Ontologies](../04-concept-taxonomies-ontologies/index.md)

---

!!! mascot-welcome "Welcome back!"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 4 ended with a warning sign — a bloated miscellaneous category — and a promise that Chapter 5 would put the whole learning graph under the microscope. That promise starts now. A learning graph that looks finished is not the same as a learning graph that *is* finished. Before any graph earns the right to drive an intelligent textbook, it has to survive a battery of structural checks, and it has to be saved in file formats that other tools can actually read.

This chapter has two halves that fit together as one pipeline. The first half is quality validation: the specific checks — cycle detection, orphan detection, connectivity analysis, degree metrics — that a learning graph must pass before anyone trusts it. The second half is file formats: the JSON, CSV, YAML, and Markdown files that store a learning graph at each stage of its life, and the conversion step that turns a human-editable spreadsheet into a machine-validated graph. By the end of the chapter you will be able to read a quality metrics report the way a course designer does, and trace a concept from a row in a CSV file to a validated node in JSON.

## Learning Graph Validation: The Umbrella Term

Every check in this chapter is a specific instance of one general activity. **Learning Graph Validation** is the process of confirming that a learning graph meets structural and pedagogical soundness criteria — most centrally, that it forms a valid Directed Acyclic Graph (DAG) as introduced in earlier chapters, with no circular dependencies and no isolated concepts. Validation is not a single test; it is a family of tests, each catching a different way a learning graph can go wrong.

It helps to separate two categories of problem a validation pass can find, because they call for different fixes:

- **Structural problems** — the graph is malformed as a graph, independent of what the concepts mean. A cycle, a self-referencing edge, or a node with no connections at all are structural problems even if every concept label is spelled correctly.
- **Coverage problems** — the graph is structurally fine but incomplete or unbalanced relative to what the course description promises. A concept mentioned in the course description but missing from the graph is a coverage problem, not a structural one.

Nearly every term in this chapter's first half is a specific technique for catching one of these two problem categories. The next several sections build that vocabulary check by check, starting with the general measurement each check produces.

## Graph Quality Metric: Turning a Check into a Number

A validation check by itself only tells you pass or fail. To compare graphs, track progress over revisions, or set a bar for "good enough," you need something you can count. A **Graph Quality Metric** is a specific, measurable indicator of learning graph health — such as the orphaned-node count, the number of disconnected subgraphs, or the average node degree — used to quantify how well-formed a graph is beyond a simple pass/fail judgment.

Where a single validation check answers "does this graph have any cycles?", a graph quality metric answers "how many?" or "what fraction?" That distinction matters because a graph with two orphaned nodes out of 200 concepts is in very different shape than one with forty, even though both technically "fail" an orphan check. The rest of this chapter introduces the individual metrics that, together, make up a complete graph quality picture.

## Orphaned Node and Disconnected Subgraph: Two Ways to Be Isolated

The most intuitive thing that can go wrong with a learning graph is a concept that connects to nothing. But "connects to nothing" actually covers two distinct failure modes, and a validation pass needs to catch both separately.

An **Orphaned Node** is a concept with no incoming or outgoing dependency edges at all — a completely isolated concept, floating with zero connections to the rest of the graph. If nothing depends on it and it depends on nothing, a learner has no way to know where it fits in the course, and an automated lesson-planning agent has no way to know when to introduce it.

A **Disconnected Subgraph** is a cluster of two or more concepts that are connected to *each other* but have no path connecting them to the graph's main body. This is a subtler problem than an orphaned node: every concept in the cluster looks healthy when you inspect it individually — each has at least one edge — but the cluster as a whole is cut off from everything else. A five-concept mini-graph about, say, "citation formats" might be perfectly well-formed internally while sitting completely disconnected from the other 195 concepts in the course.

| Failure Mode | What It Looks Like | Edges Present? |
|---|---|---|
| Orphaned Node | A single concept, isolated | Zero |
| Disconnected Subgraph | A cluster of concepts, isolated together | One or more, but none leaving the cluster |

Before looking at the diagram below, note what each colored region represents: the main graph body in blue, a single orphaned node standing alone in red, and a small disconnected subgraph of three interconnected nodes in orange — connected to each other but not to the blue body.

#### Diagram: Orphan and Disconnected Subgraph Explorer

<iframe src="../../sims/orphan-disconnected-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>

<details markdown="1">
<summary>Orphan and Disconnected Subgraph Explorer</summary>
Type: graph-model
**sim-id:** orphan-disconnected-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Let learners visually distinguish an orphaned node from a disconnected subgraph, and practice identifying both failure modes in a small sample learning graph.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine

Learning objective: Given a rendered learning graph containing a healthy main component, one orphaned node, and one disconnected subgraph, the learner can correctly click-select each isolated element and state which failure mode it represents.

Base dataset: 22-node sample graph — 17 nodes forming a single connected main body (force-directed layout, blue), 1 completely isolated node with zero edges (red, positioned apart from the main body), and 4 nodes forming a small interconnected cluster with edges only among themselves (orange, positioned apart from the main body)

Layout: force-directed; the isolated node and the disconnected cluster naturally drift away from the main body since they share no edges pulling them inward

Interactive controls:
- Click any node: side panel reveals its label, its edge count, and a plain-language diagnosis ("Part of the main graph", "Orphaned node — zero edges", or "Disconnected subgraph — connected internally but isolated from the main graph")
- Button: "Highlight Problems" — flashes the red node and orange cluster three times while dimming the healthy blue body
- Button: "Reset View" — restores full-color, non-flashing state
- Hover any edge: tooltip shows "Dependency: {concept} depends on {concept}"

Visual styling:
- Main body: blue circles
- Orphaned node: red circle, larger stroke width to draw attention
- Disconnected subgraph: orange circles with a translucent bounding region
- Edges: gray, directional arrows pointing from dependent to prerequisite

Canvas size: responsive, 100% width, 540px height

Implementation: vis-network JavaScript library; node/edge dataset pre-computed as a static sample; side panel implemented as an HTML overlay updated on vis-network's `selectNode` event
</details>

## Cycle Detection and Self-Dependency Prevention: Guarding the "Acyclic" in DAG

A learning graph earns the "Directed Acyclic Graph" name only if it truly has no cycles. Two related checks guard that property, one general and one covering its smallest, sneakiest special case.

**Cycle Detection** is the algorithmic process of checking whether a learning graph contains any circular dependency chains — a path that starts at some concept, follows dependency edges, and eventually loops back to that same concept. A cycle of concept A depending on B, B depending on C, and C depending back on A is a logical contradiction: a learner could never satisfy the prerequisite chain, because satisfying it requires already knowing the thing it depends on. Cycle detection algorithms trace every path through the graph looking for exactly this kind of loop.

**Self-Dependency Prevention** is the narrowest possible case of cycle detection: a specific check that blocks a concept from listing itself as its own prerequisite — a one-node cycle where a concept literally depends on itself. This sounds too obvious to need its own check, but self-dependencies creep in easily during bulk CSV editing, where a copy-paste error can leave a concept's own ID sitting in its own prerequisite list. Because a one-node cycle is trivial to detect and devastating if missed (an agent building a lesson plan around that concept could loop forever), most validation pipelines run self-dependency prevention as a fast, separate first pass before running the more expensive general cycle-detection algorithm across the whole graph.

Before code can check for cycles, it needs the prerequisite map this book has used since Chapter 1: for each concept, the set of concepts it directly depends on. The Python function below walks that map using depth-first search, keeping track of which nodes are currently "on the stack" (being actively explored) versus fully finished. If the search ever reaches a node that is already on the stack, it has found a cycle — a path has looped back on itself.

```python
def has_cycle(prereqs, node_ids):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {n: WHITE for n in node_ids}

    def visit(node):
        color[node] = GRAY  # currently being explored
        for dep in prereqs.get(node, []):
            if color[dep] == GRAY:
                return True  # back-edge found: a cycle
            if color[dep] == WHITE and visit(dep):
                return True
        color[node] = BLACK  # fully explored, no cycle here
        return False

    return any(visit(n) for n in node_ids if color[n] == WHITE)
```

The `color` dictionary tracks each node's state using the classic white/gray/black convention: white means unvisited, gray means currently being explored (on the active search path), and black means fully finished with no cycle found through it. A cycle exists precisely when the search reaches a gray node — that is the "back-edge" that proves a loop.

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that self-dependency prevention is really just cycle detection with a search depth of one. Every self-dependency is a cycle, but not every cycle is a self-dependency — that's why production validation pipelines run the cheap, targeted check first and the expensive, general one second. Catching the obvious mistake early saves the general algorithm from wasted work.

## Indegree, Out-Degree, and Node Degree: Counting Connections

Orphan detection and cycle detection are pass/fail checks. But once a graph passes both, a course designer often wants a finer-grained question: *how* connected is each concept? Answering that requires counting edges, and graph theory has precise vocabulary for exactly what to count.

Recall from earlier chapters that a dependency edge points from a dependent concept to its prerequisite. That direction matters for counting, because a concept can have edges pointing away from it (toward its prerequisites) and edges pointing toward it (from concepts that depend on it) — and those two counts mean very different things.

- **Indegree** is the count of edges pointing *into* a node — for a learning graph, the number of other concepts that directly depend on this one. A high indegree means many concepts list this one as a prerequisite, making it a foundational, load-bearing concept.
- **Out-Degree** is the count of edges pointing *out of* a node — the number of prerequisites this concept itself directly depends on. A high out-degree means the concept sits late in the course, requiring a lot of prior knowledge before a learner can tackle it.
- **Node Degree** is the total connectivity of a node, combining both directions: node degree equals indegree plus out-degree. It is the single number that answers "how connected is this concept overall?", without distinguishing which direction those connections run.

Before the table below, one more piece of vocabulary from earlier chapters is worth restating in this new context: a concept with zero out-degree and nonzero indegree is a **foundational concept** (nothing above it to learn first), while a concept with zero indegree and nonzero out-degree is a **goal concept** (nothing depends on it — it is a course's terminal capstone topic). Indegree and out-degree give you a precise, countable way to confirm that classification instead of guessing at it.

| Concept | Indegree | Out-Degree | Node Degree | Interpretation |
|---|---|---|---|---|
| Node (basic graph term) | 14 | 0 | 14 | Highly foundational — many concepts depend on it, it depends on nothing |
| Cycle Detection | 1 | 1 | 2 | Ordinary mid-graph concept |
| Third-Party Certification | 0 | 5 | 5 | Goal concept — nothing depends on it, it depends on five others |
| Orphaned Node | 0 | 1 | 1 | Isolated risk if out-degree were also 0 — here it barely avoids orphan status |

The MicroSim below lets you click any node in a small sample graph and watch its indegree and out-degree get counted live, edge by edge, so the arithmetic behind "node degree" stops being abstract.

#### Diagram: Indegree and Out-Degree Counter

<iframe src="../../sims/indegree-outdegree-counter/main.html" width="100%" height="522px" scrolling="no"></iframe>

<details markdown="1">
<summary>Indegree and Out-Degree Counter</summary>
Type: microsim
**sim-id:** indegree-outdegree-counter<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Make indegree and out-degree concrete by letting learners click a node and watch each incoming and outgoing edge get highlighted and counted in real time, rather than presenting degree as an abstract number.

Bloom Level: Understand (L2)
Bloom Verb: interpret, explain

Learning objective: Given any node in a sample dependency graph, the learner can correctly state its indegree, out-degree, and node degree by tracing and counting its edges.

Base dataset: 12-node sample dependency graph (directed edges, arrows pointing from dependent to prerequisite) drawn from this book's own concept list, including one clear foundational node (indegree 5, out-degree 0) and one clear goal node (indegree 0, out-degree 4)

Data Visibility Requirements:
  Stage 1: Show the full graph in neutral gray with no node selected
  Stage 2: On node click, show every incoming edge highlighted in green with an animated count-up: "Indegree: 0 → 1 → 2 → 3"
  Stage 3: Show every outgoing edge highlighted in orange with a separate animated count-up: "Out-Degree: 0 → 1 → 2"
  Stage 4: Show the final summary panel: "Indegree: 3, Out-Degree: 2, Node Degree: 5"

Interactive controls:
- Click any node to select it and trigger the counting sequence
- "Clear Selection" button to return to neutral state
- Toggle: "Show only incoming" / "Show only outgoing" / "Show both" to isolate each direction

Instructional Rationale: Step-through counting with concrete highlighted edges is appropriate because the Understand-level objective requires learners to trace individual edges and see how directionality changes what gets counted. A single static number would not reveal the difference between counting incoming versus outgoing edges.

Canvas size: responsive, 100% width, 520px height

Implementation: vis-network JavaScript library; edge highlighting and count animation driven by the `selectNode` event, iterating the DataSet's edges filtered by `from`/`to` matching the selected node ID
</details>

## Structural Checks and Coverage Checks: Two Validation Families

With indegree, out-degree, cycle detection, and orphan detection all defined, it is worth stepping back and organizing them under the two problem categories introduced earlier in this chapter.

A **Structural Check** is a validation test that confirms the graph's shape is mathematically well-formed as a DAG — independent of whether the concepts it contains are the *right* concepts for the course. Cycle detection, self-dependency prevention, and orphaned-node detection are all structural checks: each one can be answered by examining edges and node IDs alone, with no knowledge of what the course is actually about.

A **Full Coverage Check** is a validation test that confirms every concept mentioned in the course description or learning outcomes actually appears in the learning graph as a node — catching concepts that were planned but never added, rather than catching malformed structure. Coverage checking is fundamentally different work from structural checking: it requires comparing the graph against an external source of truth (the course description), not just inspecting the graph in isolation.

**Graph Connectivity** is the property, confirmed by a structural check, that every node in the learning graph can be reached from at least one other node through some path of edges — in other words, that the graph has no disconnected subgraphs. Connectivity is really just the generalized version of the orphan and disconnected-subgraph checks from earlier in this chapter, phrased as a single property of the whole graph rather than a search for individual bad nodes.

Before we look at the summary table, it's worth naming the pattern explicitly: structural checks ask "is this graph shaped correctly?" and coverage checks ask "does this graph contain everything it should?" Both are necessary; neither is sufficient on its own.

| Check | Category | Question It Answers |
|---|---|---|
| Cycle Detection | Structural | Does any path loop back on itself? |
| Self-Dependency Prevention | Structural | Does any concept depend on itself? |
| Orphaned Node detection | Structural | Does any concept have zero edges? |
| Graph Connectivity | Structural | Can every node be reached from the rest of the graph? |
| Full Coverage Check | Coverage | Does every promised concept actually exist as a node? |

## Quality Metrics Report and Third-Party Certification: Publishing the Results

Running a dozen individual checks is only useful if the results get consolidated somewhere a human can review them at a glance — the same lesson Chapter 4's taxonomy distribution report taught about auditing category balance. A **Quality Metrics Report** is a generated summary that consolidates the results of every graph quality metric and validation check — orphan count, disconnected-subgraph count, cycle-detection result, degree statistics, and coverage results — into a single document a course designer reviews before trusting a learning graph.

A representative quality metrics report for a 200-concept learning graph looks like this:

| Metric | Result | Status |
|---|---|---|
| Total concepts | 200 | — |
| Total edges | 412 | — |
| Cycles detected | 0 | Pass |
| Self-dependencies detected | 0 | Pass |
| Orphaned nodes | 2 | Fail — investigate |
| Disconnected subgraphs | 1 (4 nodes) | Fail — investigate |
| Average node degree | 4.1 | Informational |
| Full coverage check | 197 / 200 concepts found | Fail — 3 missing |

Reading this report the way a course designer does means triaging the failing rows before anything else. Two orphaned nodes and one small disconnected subgraph are usually quick fixes — often just a missed edge during CSV editing — while three concepts missing from the coverage check point to a deeper gap between what the course description promises and what the graph actually contains.

Once a quality metrics report shows a clean pass across every row, a learning graph is ready for the strongest form of validation this chapter covers. **Third-Party Certification** is an independent review — by a person or automated tool separate from the graph's original author — that confirms a learning graph's quality metrics report is accurate and its structure meets the stated quality bar, before the graph is trusted for production use in an intelligent textbook. Self-reported validation is useful during authoring, but a course adopted at scale, especially one built partly by a generative AI tool, benefits from an independent check that the reported metrics were not fabricated, cherry-picked, or run against a stale version of the graph.

!!! mascot-warning "Watch Out"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A quality metrics report generated by the same generative AI tool that built the graph is a useful first pass, not a certification. Most learners stumble on this step: they treat a clean self-generated report as proof of quality. Always re-run the structural checks with an independent script or a second reviewer before calling a learning graph production-ready.

## Storing a Learning Graph: JSON

Every check in this chapter's first half operates on data that has to live in a file somewhere. The rest of this chapter covers the file formats that store a learning graph at each stage of its life, starting with the format used for the final, validated graph.

**JSON** (JavaScript Object Notation) is a lightweight, text-based data-interchange format built from nested key-value pairs, arrays, and primitive values — the format this book has used since Chapter 1 to store concept nodes and dependency edges for rendering with vis-network. JSON's popularity for learning graphs comes from three practical properties: it is human-readable enough to hand-edit in a pinch, it maps directly onto JavaScript's native data structures (which matters because vis-network and p5.js are both JavaScript libraries), and nearly every programming language has a fast, built-in JSON parser.

A minimal learning graph JSON file contains two top-level arrays, `nodes` and `edges`, matching the structure this book's chapters have referenced from the start:

```json
{
  "nodes": [
    { "id": 1, "label": "Node", "group": "foundation" },
    { "id": 2, "label": "Edge", "group": "foundation" },
    { "id": 3, "label": "Cycle Detection", "group": "validation" }
  ],
  "edges": [
    { "id": 1, "from": 3, "to": 1 },
    { "id": 2, "from": 3, "to": 2 }
  ]
}
```

Reading this file requires remembering the edge-direction rule established in earlier chapters: `"from": 3, "to": 1"` means concept 3 ("Cycle Detection") depends on concept 1 ("Node") — the dependency direction, not the enablement direction. Every `id` field is the stable, machine-facing identifier; every `label` field is the human-readable name a reader sees rendered in a diagram.

## Validating the Shape of the File: JSON Schema

JSON itself imposes almost no rules — a JSON file is valid as long as its brackets and commas are correctly placed, even if a node is missing its `id` field or an edge points to a node that does not exist. Catching *that* kind of mistake requires a second, separate file that describes what a well-formed learning graph JSON file must look like.

A **JSON Schema** is a file of rules, itself written in JSON format, that annotates and validates the structure of other JSON documents — specifying which fields are required, what data type each field must hold, and what constraints apply. For a learning graph, a JSON schema can require that every node have a numeric `id` and a string `label`, that every edge's `from` and `to` fields reference IDs that actually exist among the nodes, and that no two nodes share the same `id`.

The snippet below shows a small fragment of what a JSON schema for a learning-graph node might specify. Before reading it, note what each keyword means: `"type"` constrains what kind of value is allowed, `"required"` lists fields that must be present, and `"properties"` describes each individual field's own type constraint.

```json
{
  "type": "object",
  "required": ["id", "label"],
  "properties": {
    "id": { "type": "integer" },
    "label": { "type": "string" },
    "group": { "type": "string" }
  }
}
```

Running a learning graph's JSON file against a schema like this catches an entire category of structural mistakes — a missing `id`, a `label` accidentally stored as a number — before the file ever reaches cycle detection or orphan detection. It is, in effect, the very first structural check in the validation pipeline, run before any graph-theory algorithm even begins.

## Authoring Format: CSV

JSON is an excellent format for software to consume, but it is an uncomfortable format for a human to author by hand, especially when adding two hundred concepts and their dependencies. Most learning graphs are not typed directly into JSON — they start life in a format built for exactly this kind of bulk, tabular editing.

**CSV** (Comma-Separated Values) is a plain-text tabular format where each line represents one row and commas separate column values — the format this book's earlier chapters used for the initial concept list and dependency table, because it opens directly in any spreadsheet application. A course designer, or a generative AI tool prompted to produce a dependency list, can generate or edit a CSV file far more easily than hand-editing nested JSON, since every row is simply a concept and a comma-separated list of its prerequisites.

A representative dependency CSV row looks like this:

```csv
ConceptID,ConceptLabel,Dependencies
59,Cycle Detection,"55,58"
```

That third column is exactly the kind of thing self-dependency prevention has to guard against: if a careless edit turned that `"55,58"` into `"55,58,59"`, the concept would list itself as its own prerequisite, and the very next validation pass should catch it before the file is ever converted to JSON.

## Configuration Format: YAML

CSV handles tabular data well but struggles with anything hierarchical or configuration-like — a project's settings, a taxonomy's category definitions, or a MkDocs site's navigation structure all need nesting that a flat table cannot express cleanly. A third format fills that gap.

**YAML** (YAML Ain't Markup Language) is a human-readable data-serialization format that uses indentation rather than brackets or commas to represent nested structure, commonly used for configuration files and settings rather than for the bulk concept and dependency data itself. This book's own `mkdocs.yml` file, which controls site navigation and theme settings, is a YAML file — and so is the frontmatter block at the top of every chapter's Markdown file, including this one.

```yaml
title: Learning Graph Quality, Validation, and File Formats
generated_by: claude skill chapter-content-generator
version: 0.09
```

Notice the contrast with JSON's `{ "title": "..." }` syntax: YAML drops the braces and quotes in favor of a colon and consistent indentation, which is part of why it reads more comfortably as a configuration file than as a large dataset. For a learning graph specifically, YAML's role is narrow — it configures how a graph is displayed or published, while JSON stores the graph's actual nodes and edges.

## Publishing Format: Markdown

The final format in this chapter is the one every reader has been reading in, without necessarily naming it. **Markdown** is a lightweight markup language using plain-text symbols (like `#` for headings and `-` for list items) to format text, used throughout this book's chapter content and documentation because it renders cleanly as both plain text and formatted HTML. This project's MkDocs Material site — including this very chapter — is authored entirely in Markdown, then built into the styled web pages a reader sees in a browser.

Markdown's relationship to the other three formats in this chapter is different in kind: JSON, CSV, and YAML all store *data about* the learning graph's structure, while Markdown stores the *prose content* a learner reads about each concept — chapter text, glossary definitions, and the `<details markdown="1">` diagram specification blocks that appear throughout this book. A complete intelligent textbook pipeline touches all four formats, each doing a job the others are poorly suited for.

Before the summary table below, it is worth naming the pattern one more time in plain language: CSV is for humans authoring bulk tabular data, JSON is for software consuming validated graph structure, YAML is for configuring settings and metadata, and Markdown is for the prose a learner ultimately reads.

| Format | Best For | Used In This Book For |
|---|---|---|
| CSV | Bulk tabular authoring | Initial concept list and dependency table |
| JSON | Machine-validated graph structure | `learning-graph.json`, node/edge data for vis-network |
| YAML | Nested configuration | `mkdocs.yml`, chapter frontmatter |
| Markdown | Human-readable prose | Chapter content, glossary entries |

## From Spreadsheet to Validated Graph: CSV to JSON Conversion

Knowing all four formats individually sets up the final piece of this chapter: the pipeline step that turns a human-authored CSV file into the validated JSON file a rendering tool like vis-network actually consumes. **CSV to JSON Conversion** is the automated process — typically a short script — that reads a concept-and-dependency CSV file and transforms it into the nested `nodes`/`edges` JSON structure required for graph visualization and validation.

The conversion script's job is mechanical but exact: for every CSV row, create one JSON node object using the concept's ID and label, then parse the semicolon- or comma-separated Dependencies column into one JSON edge object per prerequisite listed. The Python sketch below shows the shape of that transformation. Before reading it, note the two parameters worth understanding: `dependencies_col` names which CSV column holds the prerequisite list, and `sep` is the character used to separate multiple prerequisites within a single cell.

```python
import csv, json

def csv_to_json(csv_path, dependencies_col="Dependencies", sep=","):
    nodes, edges = [], []
    edge_id = 1
    with open(csv_path) as f:
        for row in csv.DictReader(f):
            concept_id = int(row["ConceptID"])
            nodes.append({"id": concept_id, "label": row["ConceptLabel"]})
            deps = row[dependencies_col].strip()
            for dep_id in filter(None, deps.split(sep)):
                edges.append({"id": edge_id, "from": concept_id, "to": int(dep_id)})
                edge_id += 1
    return {"nodes": nodes, "edges": edges}
```

This conversion step is precisely where the CRITICAL edge-direction rule from earlier chapters has to be applied correctly: the script above creates each edge with `"from": concept_id, "to": int(dep_id)` — the concept as `from` and its prerequisite as `to` — matching the dependency direction this book uses throughout. A script that accidentally swapped `from` and `to` here would silently invert every dependency in the resulting graph, which is exactly the bug this book's earlier chapters warned about, just introduced one step earlier in the pipeline than a reader might expect.

Running the full validation suite from this chapter's first half — cycle detection, orphan detection, connectivity, coverage checking — makes the most sense immediately *after* this conversion step and before the resulting JSON is trusted for publication. That ordering is why this chapter presented validation before file formats: the checks exist to be run against exactly the kind of file this conversion step produces.

## The Last File: groups.json

One more small JSON file closes the loop between this chapter and Chapter 4's taxonomy work. **groups.json** is a small JSON configuration file that defines the visual styling — typically color and shape — for each taxonomy category, referenced by vis-network to render category-coded nodes consistently across every diagram in the book. Where `learning-graph.json` holds the concepts and their dependencies, `groups.json` holds a much shorter list: one entry per TaxonomyID, specifying how nodes in that category should be drawn.

```json
{
  "1": { "color": "#4C72B0", "shape": "dot" },
  "2": { "color": "#55A868", "shape": "dot" },
  "6": { "color": "#8C8C8C", "shape": "dot" }
}
```

Every taxonomy legend this book has shown — including Chapter 4's Interactive Taxonomy Legend and Filter — ultimately reads its color scheme from a file shaped like this one. It is a small file, usually a dozen lines for a 10-to-12-category taxonomy, but it is the final piece that connects Chapter 4's classification work to the actual pixels a learner sees on screen.

!!! mascot-encourage "You've covered a lot of ground"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Twenty-one concepts in one chapter is genuinely dense — if the file-format half feels like a different subject from the validation half, that's a fair reaction on first read. Hold onto the throughline: validation checks exist to be run against files, and the files exist to hold data the validation checks can check. Chapter 6 comes back to graph theory to explain the algorithms — traversal, search, dependency analysis — that power the checks you just learned to read.

## Putting the Whole Pipeline Together

Every term in this chapter fits into one of two halves of the same production pipeline: how a learning graph is checked, and how it is stored. The list below traces a learning graph's life from spreadsheet to validated, published graph, in the order these steps actually happen.

1. A course designer or generative AI tool authors concepts and dependencies in **CSV** — the easiest format for bulk tabular editing
2. **CSV to JSON Conversion** transforms that spreadsheet into the `nodes`/`edges` structure required by **JSON**
3. A **JSON Schema** confirms the resulting file is even well-formed enough to check further — every node has an ID and label, every edge references real nodes
4. **Structural Checks** run: **Cycle Detection**, **Self-Dependency Prevention**, **Orphaned Node** detection, and **Graph Connectivity** (which subsumes checking for any **Disconnected Subgraph**)
5. A **Full Coverage Check** confirms every concept promised by the course description actually made it into the graph
6. **Indegree**, **Out-Degree**, and **Node Degree** are computed for every node, feeding into broader **Graph Quality Metrics**
7. All of the above consolidate into a single **Quality Metrics Report**
8. For production use, an independent **Third-Party Certification** confirms that report is accurate
9. **YAML** configures how the validated graph is published (site navigation, chapter metadata), **groups.json** configures how its taxonomy categories are colored, and **Markdown** holds the prose a learner ultimately reads

That is the complete path from a raw spreadsheet of concept labels to a certified, publication-ready learning graph. Every earlier chapter's vocabulary — nodes, edges, dependencies, taxonomies — was building toward a graph that could survive exactly this gauntlet.

!!! mascot-celebration "Well done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you can now read a quality metrics report the way a course designer does, explain the difference between a structural check and a coverage check, and trace a concept all the way from a CSV row through JSON conversion to a certified, published graph. That is exactly the rigor an intelligent textbook needs before anyone trusts it with real learners. Next, we go back under the hood of the graph itself for the algorithms — traversal, search, dependency analysis — that make every check in this chapter possible. Let's connect the concepts!
