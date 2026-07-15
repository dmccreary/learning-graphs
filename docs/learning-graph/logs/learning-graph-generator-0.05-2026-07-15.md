# Learning Graph Generator Session Log

- **Skill version:** learning-graph-generator v0.05
- **Date:** 2026-07-15
- **Scope:** Partial re-run (Steps 3-10) to extend an existing 266-concept graph, not a full regeneration

## Trigger

`concept-list.md` had been expanded to 400 concepts (IDs 1-400), but `learning-graph.csv` / `learning-graph.json`
still only covered the first 266. Concepts 267-400 had no dependencies, taxonomy assignment, or graph nodes/edges.

## Action Taken

Per user decision, extended the graph to cover concepts 267-400 while leaving concepts 1-266 and all
downstream artifacts (chapters, glossary, quiz-bank, FAQ) untouched. Those downstream artifacts do **not**
yet cover the 134 new concepts and will need a separate pass if desired.

1. Manually authored dependencies + TaxonomyID for concepts 267-400, reusing the existing 16 taxonomy
   categories (no new categories were needed — every new concept fit an existing one).
2. Appended the 134 new rows to `learning-graph.csv`.
3. Ran `analyze-graph.py learning-graph.csv quality-metrics.md` (v as shipped in this repo) — valid DAG,
   0 cycles, 0 orphans, 1 connected component, max chain length 15.
4. Ran `csv-to-json.py learning-graph.csv learning-graph.json color-config.json metadata.json taxonomy-names.json`
   (v0.04) — regenerated `learning-graph.json` with 400 nodes / 490 edges, reusing the existing
   `color-config.json` and `taxonomy-names.json` (no changes needed to either).
5. Ran `taxonomy-distribution.py learning-graph.csv taxonomy-distribution.md taxonomy-names.json` — updated
   distribution report; largest category FOUND at 15.2%, well under the 30% cap.
6. Updated `concept-taxonomy.md` concept counts and descriptions to reflect the new totals.
7. Ran `./validate-learning-graph.sh learning-graph.json` — fails with `groups -> VISTOOLS -> color: 'DarkRed'
   is not of type 'object'`. Confirmed via the pre-edit backup that this schema/generator mismatch
   **predates this session** (csv-to-json.py v0.04 emits `color` as a plain string; the schema expects an
   object). Not a regression from this change — flagged separately, not fixed here (out of scope).

## Known Follow-ups (not done in this pass)

- Terminal-node percentage is 50.2% (healthy range per analyze-graph.py is 5-40%). Informational only,
  not a failure — could add more cross-dependencies among the new concepts later to enrich pathways.
- Chapters, glossary, quiz-bank, and FAQ were generated against the old 266-concept graph and do not yet
  cover concepts 267-400.
- `learning-graph-schema.json` vs `csv-to-json.py` `groups.*.color` shape mismatch (pre-existing, unrelated
  to this change).

## Files Changed

- `docs/learning-graph/learning-graph.csv` (266 -> 400 rows)
- `docs/learning-graph/learning-graph.json` (regenerated, 266 -> 400 nodes, 319 -> 490 edges)
- `docs/learning-graph/quality-metrics.md` (regenerated)
- `docs/learning-graph/taxonomy-distribution.md` (regenerated)
- `docs/learning-graph/concept-taxonomy.md` (counts/descriptions updated)
