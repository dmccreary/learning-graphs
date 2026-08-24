# Suggested Figures

Priority order for creation.

1. **Toy DAG: in-degree vs. CIS divergence (High priority)**
   Small 6-8 node synthetic graph where a low-in-degree node has high CIS due
   to transitive reach. Annotate both scores on each node. Referenced from
   Section 4 (Formal Definitions).

2. **Algebra I real-data divergence table/chart (High priority)**
   Built from `data/algebra1-concept-impact.csv` (200 concepts, 277 edges,
   confirmed DAG). Candidate presentation: scatter plot, in-degree rank (x)
   vs. CIS rank (y), with "Constant", "Coefficient", "Term", "Function",
   "Slope" labeled as notable divergent points. Referenced from Section 6
   (System) and Section 4.

3. **Elaboration tier tables for Algebra I Chapters 1 and 12 (Done -- now
   Tables 1-2 in Section 6)**
   Concept | in-degree | CIS | Elaboration Score $E(c)$ | Tier | target
   words. Global normalization, tiered by log-scaled $E(c)$ (not population
   percentile rank -- an earlier attempt at percentile rank was shown broken
   by the Chapter 12 check, see `sections/04-formal-definitions` Definition
   4). Consider a combined bar/scatter figure plotting $E(c)$ per concept for
   both chapters side by side to make the opposite-profile contrast visual
   rather than only tabular.

4. **Chapter-generation pipeline diagram (Medium priority)**
   Flow: learning-graph.json -> /book-chapter-generator (partitioning +
   ordering) -> CIS-annotated scaffold -> /chapter-content-generator
   (CIS-weighted budget) -> chapter markdown. Shows where the proposed
   extension inserts into the existing two-skill pipeline (Section 6).

5. **Evaluation study design diagram (Medium priority)**
   3-condition (uniform / in-degree / CIS) x fixed-total-budget design, with
   LLM-judge + human spot-check rating flow. Section 7.

6. **Results chart (Low priority -- blocked on study completion)**
   Win/tie/loss tallies per pairwise condition comparison, once the blind
   comparison study (Section 7) has been run.

## Data available now

- `data/algebra1-concept-impact.csv` -- full ranked in-degree/out-degree/CIS
  table for all 200 Algebra I concepts. Source: computed directly from
  `/Users/danmccreary/Documents/ws/algebra-1/docs/learning-graph/learning-graph.json`
  via a topological-order single pass (Proposition 1, Section 4).
