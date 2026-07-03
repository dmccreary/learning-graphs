# Learning Graph Generator Session Log

- **Skill Version:** v0.05
- **Date:** 2026-07-03
- **Project:** Learning Graphs: The Key to Intelligent Textbooks
- **Working Directory:** /Users/dan/Documents/ws/learning-graphs/docs/learning-graph

---

## Python Program Versions Used

| Program | Version | Notes |
|---------|---------|-------|
| analyze-graph.py | from skill v0.05 | Quality metrics generation, run twice (before/after connectivity fixes) |
| csv-to-json.py | v0.04 | Generated learning-graph.json |
| add-taxonomy.py | from skill v0.05 | Reference only; TaxonomyID column added via inline Python by concept-ID range |
| taxonomy-distribution.py | from skill v0.05 | Taxonomy distribution report |
| validate-learning-graph.sh / .py | from skill v0.05 | Run against learning-graph-schema.json; schema in this skill copy is stale (expects a nested `groups[X].color.color` object with lowercase-only values) and disagrees with the actual consumer, `docs/sims/graph-viewer/script.js`, which reads `groups[X].color` as a flat CSS color string. Validation was skipped (documented as optional) in favor of matching the real renderer. |

---

## Steps Completed

### Step 0: Setup
- Confirmed `docs/` directory and `mkdocs.yml` exist
- Confirmed `docs/learning-graph/` directory exists (already created in a prior session for `concept-list-v1.md`)
- Copied Python programs from skill package to working directory

### Step 1: Course Description Assessment (Skipped)
- Found existing `course-description.md` with `quality_score: 96` (set earlier this session via the `course-description-analyzer` skill after a full rewrite targeting a professional audience)
- Score above 85 threshold — step skipped to save tokens

### Step 2: Concept List Generation
- **Source:** `concept-list-v1.md` (254 concepts across 19 thematic sections), produced in a prior turn this session by scanning every markdown page on the site plus adding an Education Theory & Learning Sciences section
- Trimmed 8 concept labels that exceeded the 32-character graph-node limit (e.g. "SKOS (Simple Knowledge Organization System)" → "SKOS")
- **Output:** `concept-list.md` — flat numbered list of the same 254 concepts, used as the working file for the dependency pipeline

### Step 3: Dependency Graph
- Hand-authored prerequisite dependencies for all 254 concepts based on the category structure of `concept-list-v1.md`
- **Output:** `learning-graph.csv` (ConceptID, ConceptLabel, Dependencies)
- Initial pass: valid DAG, 0 cycles, but 4 orphaned nodes (YAML, Behaviorism, Connectivism, Andragogy) and 7 disconnected components

### Step 4: Quality Validation
- Ran `analyze-graph.py` — found 4 orphaned nodes and 7 disconnected components
- Patched 6 edges to connect isolated clusters into the main graph (e.g. linked MkDocs → YAML/Markdown, Instructional Design → Behaviorism, Non-Linear Learning Path → Connectivism, Competency-Based Education → Andragogy, Book Build Workflow → GitHub Pages)
- Re-ran `analyze-graph.py`: **0 orphaned nodes, 1 connected component, 0 cycles, valid DAG**
- Final metrics: 254 concepts, 298 edges, 18 foundational concepts (7.1%), avg 1.26 dependencies/concept, longest chain 12 concepts, 48.0% terminal nodes (informational, not blocking)
- **Quality score: ~88/100 (Good)** — solid DAG structure and full connectivity; the one soft recommendation is to add more cross-domain dependencies to reduce the terminal-node percentage below 40%
- **Output:** `quality-metrics.md`

### Step 5: Concept Taxonomy
- Built 15 categories (target ~12, within the documented +/-2-3 variance) by keeping the theory/domain categories from `concept-list-v1.md` distinct and splitting the vis.js implementation content (fundamentals, styling, layout/physics, interactivity, clustering, editing) into 3 balanced sub-buckets instead of one 66-concept mega-category
- Largest category: LSCI (Education & Learning Sciences) at 13.0% — well under the 30% cap
- **Output:** `concept-taxonomy.md`

### Step 5b: Taxonomy Names JSON
- **Output:** `taxonomy-names.json`

### Step 6: Add Taxonomy to CSV
- Added `TaxonomyID` column via inline Python, mapped by ConceptID range
- Renamed `EDU1` → `EDUF` mid-pipeline after schema validation caught that group IDs must match `^[A-Z]+$` (no digits)
- **Output:** updated `learning-graph.csv`

### Step 7-8: Metadata and Groups
- **Output:** `metadata.json`, `color-config.json` (15-color palette from the skill's recommended list)

### Step 9: Generate Complete JSON
- `python csv-to-json.py learning-graph.csv learning-graph.json color-config.json metadata.json taxonomy-names.json`
- **Result:** 254 nodes, 298 edges, 15 groups
- **Output:** `learning-graph.json` (overwrote a stale prior file that was, unrelated, about general graph theory rather than this course's own subject matter)

### Step 10: Taxonomy Distribution Report
- **Output:** `taxonomy-distribution.md`

### Step 11: index.md
- Created from `index-template.md`, customized for "Learning Graphs: The Key to Intelligent Textbooks"

### Step 12: Session Log
- This file

---

## mkdocs.yml Changes

Added a "Learning Graph" nav section (previously only had two entries from a prior session):

```yaml
- Learning Graph:
  - Introduction: learning-graph/index.md
  - Course Description Assessment: learning-graph/course-description-assessment.md
  - Concept List v1: learning-graph/concept-list-v1.md
  - Concept List: learning-graph/concept-list.md
  - Concept Taxonomy: learning-graph/concept-taxonomy.md
  - Taxonomy Distribution Report: learning-graph/taxonomy-distribution.md
  - Graph Quality Metrics: learning-graph/quality-metrics.md
```

## Next Steps

- Run `/book-installer` (install learning graph guide) to wire up the MicroSim at `docs/sims/graph-viewer` against the new `learning-graph.json`
- Review `concept-list.md`, `concept-taxonomy.md`, and `learning-graph.csv` before running `/book-chapter-generator` — chapter content generation is token-expensive, so it's worth confirming the concept set and dependencies are right first
