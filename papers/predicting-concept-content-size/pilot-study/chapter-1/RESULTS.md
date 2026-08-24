# Pilot Study Results: Chapter 1 ("Foundations of Algebra")

## Setup

Same protocol as the Chapter 12 pilot (`pilot-study/chapter-12/RESULTS.md`):
three complete chapter drafts generated independently (separate agent
sessions, no shared context, no access to each other's output or the real
published chapter) from the same fixed scaffold (title, summary,
prerequisites, 17 concepts in order), differing only in the per-concept
word-budget instruction. Total chapter budget fixed at 6,800 words (the
actual published Chapter 1 word count) across all three conditions.

- **Condition A** (uniform): every concept gets 400 words.
- **Condition B** (in-degree weighted): see `data/algebra1-ch1-three-conditions.csv`.
- **Condition C** (CIS weighted, proposed): see `sections/06-system` Table 1.

Achieved totals: A 6,560 words; B 6,809 words; C 6,713 words -- all within
~3% of the 6,800-word target, all individual concepts within +/-15% of their
per-concept target.

Blind labels (deliberately different assignment than the Chapter 12 pilot,
so judges can't pattern-match across runs; mapping kept out of judge prompts):
- `draft-1.md` = Condition C (CIS)
- `draft-2.md` = Condition B (in-degree)
- `draft-3.md` = Condition A (uniform)

Judges: 3 independent fresh agent sessions, same rubric as the Chapter 12
pilot, Word Count Report footers stripped before judging.

## Scores (1-5, 5 = best)

| Draft (condition) | Judge | a: depth | b: examples | c: coherence | d: no padding | overall |
|---|---|---|---|---|---|---|
| 1 (C, CIS) | 1 | 5 | 5 | 4 | 5 | 5 |
| 1 (C, CIS) | 2 | 4 | 5 | 4 | 4 | 4 |
| 1 (C, CIS) | 3 | 3 | 5 | 4 | 3 | 4 |
| **1 mean** | | **4.00** | **5.00** | **4.00** | **4.00** | **4.33** |
| 2 (B, in-degree) | 1 | 4 | 3 | 4 | 4 | 4 |
| 2 (B, in-degree) | 2 | 3 | 3 | 4 | 3 | 3 |
| 2 (B, in-degree) | 3 | 3 | 3 | 3 | 3 | 3 |
| **2 mean** | | **3.33** | **3.00** | **3.67** | **3.33** | **3.33** |
| 3 (A, uniform) | 1 | 3 | 5 | 5 | 3 | 4 |
| 3 (A, uniform) | 2 | 3 | 5 | 5 | 3 | 4 |
| 3 (A, uniform) | 3 | 4 | 4 | 5 | 4 | 4 |
| **3 mean** | | **3.33** | **4.67** | **5.00** | **3.33** | **4.00** |

## Ranking -- NOT unanimous this time (report honestly)

- Judge 1: C > B > A
- Judge 2: C > A > B
- Judge 3: A > C > B

Unlike the Chapter 12 pilot (unanimous 3/3), judges disagreed on where
Condition A (uniform) slots in. But a consistent pattern still holds:

**Pairwise records:** C beats B 3-0. A beats B 2-1. C vs. A is 2-1 (C wins).
**C is the Condorcet winner** (undefeated pairwise) and has the highest mean
overall score (4.33 vs. A's 4.00 vs. B's 3.33). **B is dominated** -- it
loses to both A and C on aggregate, the opposite of the Chapter 12 pilot,
where B beat A.

This is a more informative result than a clean sweep would have been: it
suggests naive in-degree weighting is not reliably better than uniform
allocation -- on this chapter, several genuinely foundational concepts
(Constant, Coefficient, Monomial) have low *direct* in-degree and get
under-resourced by Condition B specifically because of that, which measurably
hurts quality relative to just treating everything equally. CIS avoids this
failure mode by capturing transitive reach, and comes out ahead in both
pilot chapters so far.

## Qualitative illustration (Constant, in-degree 1, CIS rank #4 of 200 book-wide)

- **Condition A** (uniform, 377 words): definition, several examples, and a
  4-row summary table -- solid, matches its equal share.
- **Condition B** (in-degree, 302-word target): definition plus a bulleted
  list of three quick examples, no worked example, no table -- brief, in
  proportion to its low direct in-degree (1).
- **Condition C** (CIS, 559-word target, Tier A): a full labeled "Worked
  Example" (a taxi-fare scenario) with a 3-row data table tracking the
  constant across changing mileage, plus a paragraph distinguishing "fixed
  within a problem" from "fixed forever" -- treatment on par with the
  chapter's most emphasized concepts, matching Constant's true book-wide
  importance (CIS rank #4 of 200) despite its low direct in-degree.

## Caveats (same as Chapter 12 pilot -- still apply)

- Judges are the same model family as the generator (Claude Sonnet 5), not
  independent humans.
- N is now 2 chapters total across both pilots, still well short of the
  planned 6-10 chapter sample.
- No independent human rating has been run on either chapter yet.

## Combined picture across both pilot chapters

| | Chapter 12 (specialized) | Chapter 1 (foundational) |
|---|---|---|
| C vs. A | 3-0 | 2-1 |
| C vs. B | 3-0 | 3-0 |
| A vs. B | 0-3 (B wins) | 2-1 (A wins) |
| C mean overall | 5.00 | 4.33 |
| Condorcet winner | C | C |

C (CIS) is the Condorcet winner in both chapters tested so far and undefeated
against B (in-degree) in both (6-0 combined). Its margin over uniform (A) is
narrower on the foundational chapter than the specialized one. B's standing
relative to A **flips between chapters** (B beats A on the specialized
chapter, loses to A on the foundational one) -- this instability is itself
evidence against naive in-degree weighting as a general-purpose strategy,
and for CIS's more consistent performance.
