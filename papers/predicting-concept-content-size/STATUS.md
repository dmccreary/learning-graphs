# Status Report

## Completed

- [x] Paper directory structure created, mirroring
      `github.com/dmccreary/microsims/tree/main/paper` conventions (main.tex,
      sections/, figures/, references.bib, build.sh, README.md), adapted to
      one directory per section.
- [x] `main.tex` with ArXiv-compatible preamble, `\input` wiring for all 9
      sections.
- [x] All 9 section files created with outline-level content (bulleted, with
      `% TODO` markers) reflecting the "Suggested section budget" discussed
      in the originating conversation.
- [x] `references.bib` seeded with 14 entries from initial literature review
      (elaboration theory, cognitive load theory, concept-network analysis,
      curriculum/prerequisite graphs, PageRank/TextRank/Eigenfactor/TotalRank,
      Knowledge Space Theory). Several marked `[snippet]` -- full citation
      details need verification before submission (some full-text fetches
      returned 403).
- [x] Formal definitions drafted for Learning Graph, in-degree, and Concept
      Impact Score (CIS), including Proposition 1 (CIS has an exact
      closed-form single-pass computation on a DAG, no damping factor needed)
      -- proof sketch outlined, not yet written up formally.
- [x] Real data computed: in-degree, out-degree, and CIS for all 200 concepts
      in the Algebra I learning graph (`data/algebra1-concept-impact.csv`).
      Confirmed the graph is a valid DAG (200/200 topologically sortable).
      Found concrete divergent examples (Constant, Coefficient, Term: low
      in-degree, top-5 CIS) that motivate the paper's core argument.
- [x] Verified current system behavior directly from source: neither
      `/book-chapter-generator` nor `/chapter-content-generator` currently
      implements in-degree or CIS weighting; content length is a flat
      3000-5000 words/chapter instruction today.
- [x] **Global vs. local CIS normalization resolved: global.**
- [x] **Computed and validated the Chapter 12 table** ("Exponential
      Functions", 10 concepts, mostly terminal/leaf concepts) as the
      cross-check for the tiering rule. This caught a real bug: the original
      tiering rule (population percentile rank) put zero concepts in Tier C
      for Chapter 12, because CIS has a floor of 1 and 103/200 (51.5%) of
      Algebra I concepts sit at that floor -- the population 35th-percentile
      cutoff landed at the floor, making Tier C structurally unreachable.
- [x] **Fixed the tiering rule: switched from population percentile rank to
      a log-scaled Elaboration Score** `E(c) = log(CIS+1)/log(CIS_max+1)`,
      consistent with the word-budget weighting formula which already used
      log(CIS+1). Re-validated on both chapters: Chapter 1 -> 8A/6B/3C
      (previously 11A/6B/0C under the broken rule); Chapter 12 -> 0A/2B/8C
      (previously 1A/9B/0C). The two chapters now show the expected
      opposite-direction profiles. Regenerated both data CSVs and rewrote
      Table 1 (Chapter 1) and added Table 2 (Chapter 12) in
      `sections/06-system`, updated Definition 4 in
      `sections/04-formal-definitions`, updated `sections/07-evaluation` open
      items, and added a methodological-caution bullet to
      `sections/08-discussion-limitations` (heavy-tailed recursive metrics
      with a floor need value-based, not rank-based, discretization -- a
      point likely worth generalizing beyond this paper's specific metric).

## Not Yet Done (in priority order)

1. **Optionally validate `E(c)` cut points (0.5/0.2) on a third, mixed-profile
   chapter** before treating them as final -- currently checked on two
   chapters with opposite (foundational vs. specialized) profiles only.
2. **Design/write proof for Proposition 1** in Section 4.
3. **Specify Condition B precisely** for the evaluation study (no prior
   formula exists to reproduce -- see README).
4. **Run the blind-comparison pilot study** (Section 7) on Algebra I Chapter
   1 at minimum. This is the critical path item -- the paper's central claim
   is currently a well-motivated hypothesis, not a confirmed result.
5. **Draft full prose** for all 9 sections from the outlines (currently
   bullet/TODO form throughout).
6. **Create figures** per `figures/suggested-figures.md`, starting with the
   toy-DAG divergence example and the real Algebra I divergence chart (data
   already available).
7. **Verify all `[snippet]`-flagged references** in `references.bib` against
   primary sources before submission.
8. Decide whether to pursue the cross-model (Claude vs. Gemini/Antigravity)
   claim empirically (re-run under controlled conditions) or drop it to
   future work, given the original comparison data was not preserved.

## Next Immediate Step

Specify Condition B precisely and begin the blind-comparison pilot study
(items 3-4) -- the tiering rule is now validated on two chapters and ready to
drive real content generation.
