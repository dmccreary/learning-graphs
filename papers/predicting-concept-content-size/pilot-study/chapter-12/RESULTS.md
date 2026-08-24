# Pilot Study Results: Chapter 12 ("Exponential Functions")

## Setup

Three complete chapter drafts generated independently (separate agent sessions,
no shared context, no access to each other's output or the real published
chapter) from the same fixed scaffold (title, summary, prerequisites, 10
concepts in order), differing only in the per-concept word-budget instruction:

- **Condition A** (uniform): every concept gets 372 words.
- **Condition B** (in-degree weighted): see `sections/07-evaluation` Table 3.
- **Condition C** (CIS weighted, proposed): see `sections/06-system` Table 2.

Total chapter budget fixed at 3,722 words (the actual published Chapter 12
word count) across all three conditions.

Blind labels (mapping kept out of judge prompts):
- `draft-1.md` = Condition B (in-degree)
- `draft-2.md` = Condition A (uniform)
- `draft-3.md` = Condition C (CIS)

Judges: 3 independent fresh agent sessions, each given only the 3 blinded
files (Word Count Report footer stripped so target numbers couldn't leak the
condition) and the rubric from `sections/07-evaluation` (depth on
central concepts / worked examples & contrasts / coherence / absence of
padding on minor concepts), each scoring 1-5 per dimension plus overall, and
ranking best-to-worst.

## Scores (1-5, 5 = best)

| Draft (condition) | Judge | a: depth | b: examples | c: coherence | d: no padding | overall |
|---|---|---|---|---|---|---|
| 1 (B, in-degree) | 1 | 4 | 4 | 4 | 5 | 4 |
| 1 (B, in-degree) | 2 | 4 | 4 | 4 | 4 | 4 |
| 1 (B, in-degree) | 3 | 5 | 4 | 4 | 5 | 5 |
| **1 mean** | | **4.33** | **4.00** | **4.00** | **4.67** | **4.33** |
| 2 (A, uniform) | 1 | 3 | 3 | 4 | 3 | 3 |
| 2 (A, uniform) | 2 | 3 | 3 | 3 | 3 | 3 |
| 2 (A, uniform) | 3 | 3 | 4 | 4 | 3 | 3 |
| **2 mean** | | **3.00** | **3.33** | **3.67** | **3.00** | **3.00** |
| 3 (C, CIS) | 1 | 5 | 5 | 5 | 4 | 5 |
| 3 (C, CIS) | 2 | 5 | 5 | 5 | 4 | 5 |
| 3 (C, CIS) | 3 | 4 | 5 | 5 | 4 | 5 |
| **3 mean** | | **4.67** | **5.00** | **5.00** | **4.00** | **5.00** |

## Ranking

All 3 judges independently produced the same ranking:

**Draft 3 > Draft 1 > Draft 2**, i.e. **CIS-weighted > in-degree-weighted > uniform**, 3/3.

## Qualitative illustration (Growth Factor section, a low-budget concept in both B and C)

- **Condition A** (uniform, 339 words on this concept): full treatment with a
  rate-to-factor conversion table, matching its allotted share.
- **Condition B** (in-degree, 154 words): single paragraph, definition plus
  formula plus one brief example, no worked-example structure.
- **Condition C** (CIS, 290 words): a labeled "Worked Example" with a concrete
  scenario (a town's population growth) plus a second technique (recovering
  the growth factor from a table of values) -- more pedagogically complete
  than B despite a similar length budget.

## Caveats (do not overclaim from this)

- **N = 1 chapter.** This is a single pilot data point, not a powered study.
  The evaluation design (`sections/07-evaluation`) calls for 6-10 chapters;
  this is the first.
- **Judges are not independent humans.** All three "blind judges" are fresh
  sessions of the same underlying model family used to generate the drafts
  (Claude Sonnet 5). This is a useful fast first-pass signal, not a
  substitute for the planned human spot-check. Self-consistency (a model
  favoring outputs shaped like its own generation tendencies) cannot be
  ruled out from this data alone.
- **Single domain, single chapter profile.** Chapter 12 is a specialized,
  leaf-heavy chapter (see `sections/06-system` Table 2). The same test on
  Chapter 1 (foundational, opposite CIS profile) has not been run yet.
- Despite these caveats, the unanimous 3/3 ranking and the concrete
  qualitative contrast (Growth Factor section) are a genuine first result
  worth reporting as preliminary evidence in the paper, clearly labeled as
  such.

## Next steps

1. Run the same 3-condition generation + blind judging on Chapter 1.
2. Recruit at least one independent human rater for a spot-check on Chapter
   12 (the current judges are same-model-family, not independent).
3. If the pattern holds, extend to the full 6-10 chapter sample.
