# Predicting Concept Content Size -- ArXiv Paper

## Overview

LaTeX source for a paper proposing that per-concept content length (and
richness) in AI-generated textbook chapters should be allocated in proportion
to a concept's **Concept Impact Score (CIS)** -- a PageRank-style recursive
importance measure computed over the course's Learning Graph (a monopartite
concept dependency DAG) -- rather than allocated flatly per chapter or scaled
by raw in-degree alone.

Structure and build tooling follow the pattern of a previously published
ArXiv paper: <https://github.com/dmccreary/microsims/tree/main/paper>, adapted
so each section is its own directory (rather than a single flat `sections/`
folder of files) to keep per-section working notes, TODOs, and (eventually)
section-specific figures together.

## Paper Status

**Current state: outline draft.** Every section file contains a LaTeX skeleton
with bulleted outline content and inline `% TODO` comments, not finished prose.
No content has been generated for the evaluation study yet -- see Section 7.

### Section Status

| # | Section | Target length | Status |
|---|---------|---------------|--------|
| 1 | [Abstract](sections/01-abstract/01-abstract.tex) | 150-250 words | Draft prose, needs tightening after 4-7 finalized |
| 2 | [Introduction](sections/02-introduction/02-introduction.tex) | 500-700 words | Outline only |
| 3 | [Related Work](sections/03-related-work/03-related-work.tex) | 600-900 words | Outline only, citations seeded in `references.bib` |
| 4 | [Formal Definitions](sections/04-formal-definitions/04-formal-definitions.tex) | 450-700 words | Definitions + Proposition 1 drafted, needs proof + Figure 1 |
| 5 | [Problem Statement](sections/05-problem-statement/05-problem-statement.tex) | 800-1200 words | Outline only, 3 sub-problems specified |
| 6 | [System](sections/06-system/06-system.tex) | 500-800 words | Outline only, grounded in verified current skill behavior |
| 7 | [Evaluation](sections/07-evaluation/07-evaluation.tex) | 800-1500 words | **Pilot 1 complete** (Chapter 12, N=1, LLM-judge only) -- see `pilot-study/chapter-12/RESULTS.md`; full study still needs human raters + Chapter 1 |
| 8 | [Discussion & Limitations](sections/08-discussion-limitations/08-discussion-limitations.tex) | 300-500 words | Outline only |
| 9 | [Conclusion & Future Work](sections/09-conclusion-future-work/09-conclusion-future-work.tex) | 150-250 words | Outline only |

Target total: ~4,500-6,500 words body text, arXiv preprint (no venue page
limit, but keeping this range for focus and readability).

## Directory Structure

```
predicting-concept-content-size/
├── main.tex                          # Main LaTeX document, \input's each section
├── build.sh                          # Tectonic build script
├── abstract.txt                      # Plain-text abstract draft
├── README.md                         # This file
├── STATUS.md                         # Working status / next-steps log
├── data/
│   ├── algebra1-concept-impact.csv           # Real computed in-degree/CIS data, all 200 concepts
│   ├── algebra1-ch1-elaboration-budget.csv   # Chapter 1 tiered word budget (E(c), global)
│   └── algebra1-ch12-elaboration-budget.csv  # Chapter 12 tiered word budget (E(c), global) -- validation check
├── figures/
│   └── suggested-figures.md          # Figure plan, priority order
├── pilot-study/
│   └── chapter-12/
│       ├── condition-a-uniform.md    # Generated chapter, uniform word budget
│       ├── condition-b-indegree.md   # Generated chapter, in-degree-weighted budget
│       ├── condition-c-cis.md        # Generated chapter, CIS-weighted budget
│       ├── blind/                    # Condition-stripped copies used for blind judging
│       └── RESULTS.md                # Scores, unanimous ranking, caveats
└── sections/
    ├── 01-abstract/01-abstract.tex
    ├── 02-introduction/02-introduction.tex
    ├── 03-related-work/03-related-work.tex
    ├── 04-formal-definitions/04-formal-definitions.tex
    ├── 05-problem-statement/05-problem-statement.tex
    ├── 06-system/06-system.tex
    ├── 07-evaluation/07-evaluation.tex
    ├── 08-discussion-limitations/08-discussion-limitations.tex
    ├── 09-conclusion-future-work/09-conclusion-future-work.tex
    └── references.bib
```

## Compilation

```bash
brew install tectonic   # if not already installed
./build.sh               # produces main.pdf
./build.sh clean         # remove build artifacts
```

Or open in Overleaf: upload everything in this directory, set `main.tex` as
the main document, compiler = pdfLaTeX.

## Design Decisions

### Resolved

1. **CIS normalization scope: global.** Decided 2026-08-23. A concept's
   elaboration tier is set relative to the whole book's concept set, not
   just its chapter's. Local normalization was tried first and produced a
   degenerate result (only 1 of 17 Chapter 1 concepts reached the top tier,
   purely because Chapter 1 contains the single highest-CIS concept in the
   book).
2. **Tiering formula: log-scaled Elaboration Score, not population
   percentile rank.** Decided 2026-08-23, after computing the same table for
   Chapter 12 exposed a real bug: CIS has a floor of 1, and 103/200 (51.5%)
   of Algebra I concepts are true leaves sitting at that floor, so the
   population 35th-percentile cutoff sat *at* the floor -- Tier C was
   unreachable regardless of actual importance (Chapter 12 came out 1 A / 9
   B / 0 C, which is wrong for a chapter of mostly terminal concepts). Fixed
   by defining the Elaboration Score `E(c) = log(CIS(c)+1) / log(CIS_max+1)`
   and tiering on that value instead of rank. Re-validated on both chapters:
   Chapter 1 -> 8 A / 6 B / 3 C; Chapter 12 -> 0 A / 2 B / 8 C (the expected
   mirror-image profile). See `sections/04-formal-definitions` (Definition
   4), Tables 1-2 in `sections/06-system`, and
   `data/algebra1-ch1-elaboration-budget.csv` /
   `data/algebra1-ch12-elaboration-budget.csv`.

### Open

1. **`E(c)` cut points (0.5/0.2) are only lightly validated** -- sensible on
   two chapters with opposite expected profiles, but that's a small
   validation set. Consider a third, genuinely-mixed chapter before trusting
   the cut points across the full pilot study.
2. **Condition B ("in-degree weighted") has no prior documented formula to
   reproduce.** The original observation came from an informal session in a
   different project (`wake-word-detection`, Google Antigravity) whose output
   was not preserved. Condition B will be freshly specified for a fair
   comparison rather than reconstructed. See `sections/07-evaluation`.
3. **Word-count-only vs. full elaboration budget** (diagrams, MicroSims,
   worked examples) for the first pilot study -- simpler vs. more realistic.

## Source Context

This paper originated from a conversation analyzing why Claude Sonnet 5 vs.
Google Antigravity/Gemini produced noticeably different subjective quality
when generating textbook chapters from the same learning graph, and whether
that difference could be traced to (and improved by) an explicit
graph-centrality-driven content-allocation rule. Pilot data source:
`/Users/danmccreary/Documents/ws/algebra-1` (Algebra I intelligent textbook,
200-concept / 277-edge learning graph).
