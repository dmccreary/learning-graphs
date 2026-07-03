# Course Description Quality Assessment

**Skill:** course-description-analyzer v0.03
**File assessed:** `docs/course-description.md` (version prior to rewrite)

## 1. Overall Score

**17 / 100**

## 2. Quality Rating

**0–39: Poor — Major revision required**

The original description read well as marketing copy for the course, but it was missing every
structural element a learning-graph generator needs to reliably produce 200+ well-scoped concepts:
no itemized topic list, no excluded-topics boundary, and no Bloom's Taxonomy outcomes at all.

## 3. Detailed Scoring Breakdown

| Element | Points Possible | Points Earned | Notes |
|---|---|---|---|
| Title | 5 | 5 | Clear and descriptive: "Learning Graphs: The Key to Intelligent Textbooks" |
| Target Audience | 5 | 0 | No audience stated anywhere in the document |
| Prerequisites | 5 | 3 | Technical prerequisites given (internet, browser, GenAI tool access) but no explicit statement of required background knowledge, and no "None" fallback |
| Main Topics Covered | 10 | 4 | Topics are mentioned in narrative prose ("Why Learning Graphs" section) but never itemized as a scannable list |
| Topics Excluded | 5 | 0 | No boundaries set — scope is undefined |
| Learning Outcomes Header | 5 | 0 | No "After this course, students will be able to..." statement |
| Remember | 10 | 0 | Absent |
| Understand | 10 | 0 | Absent |
| Apply | 10 | 0 | Absent |
| Analyze | 10 | 0 | Absent |
| Evaluate | 10 | 0 | Absent |
| Create | 10 | 0 | Absent |
| Descriptive Context | 5 | 5 | "Why Learning Graphs" section gives strong motivating context (AI slop problem, coherence, roadmap framing) |
| **Total** | **100** | **17** | |

## 4. Gap Analysis

- **No target audience** — without this, learning-graph generation cannot calibrate concept depth/vocabulary (e.g., "professional" vs. "high school").
- **No itemized topic list** — the generator needs a scannable list of 5–10 topics to seed concept-count estimation; prose paragraphs undercount.
- **No excluded topics** — without a stated boundary, concept enumeration tends to sprawl into adjacent domains (e.g., general graph theory, general LMS administration).
- **All six Bloom's Taxonomy levels missing** — this is the single biggest gap. Bloom's outcomes are what let the generator produce concepts spanning recall-level vocabulary through capstone-level synthesis. Without them, a generator tends to only produce "Remember"- and "Understand"-level concepts, undercutting the 200-concept target and the diversity of concept types.

## 5. Improvement Suggestions (Priority Order)

1. Add an explicit **Target Audience** line.
2. Add six **Learning Outcomes** sections (Remember, Understand, Apply, Analyze, Evaluate, Create), each with 4–5 specific, verb-led outcomes.
3. Convert the narrative topic description into an itemized **Main Topics Covered** list.
4. Add a **Topics Not Covered** section to bound scope.
5. Tighten **Prerequisites** into a clear required-vs-helpful split.

## 6. Concept Generation Readiness (Original)

At 17/100, the original description could realistically seed only 40–60 concepts before a generator
would need to start improvising un-scoped material. The topic breadth (CDGs, taxonomies, graph
algorithms, vis.js, agents) is actually reasonable — the missing piece was outcome granularity, which
is what Bloom's-level outcomes provide.

## 7. Next Steps

This assessment was used to drive an immediate rewrite of `docs/course-description.md` (same session).
See the updated file for the revised score. Recommended follow-on: re-run this analyzer against the
rewritten file, then proceed to the `learning-graph-generator` skill once the score is ≥ 85.
