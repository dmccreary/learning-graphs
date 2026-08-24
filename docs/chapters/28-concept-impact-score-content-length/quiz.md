# Quiz: Concept Impact Score and Predicting Content Length

Test your understanding of the Concept Impact Score and CIS-driven content-budget allocation with these review questions.

---

#### 1. Which term names "any importance score for a node in a directed graph that is computed from the importance scores of the nodes pointing to it, rather than from a simple count of those nodes"?

<div class="upper-alpha" markdown>
1. Indegree
2. Recursive Importance Measure
3. Elaboration Score
4. Betweenness Centrality
</div>

??? question "Show Answer"
    The correct answer is **B**. A Recursive Importance Measure computes a node's score from the scores of the nodes that point to it, letting importance propagate through the graph. Indegree and Betweenness Centrality are both first-hop or path-count metrics, not recursive ones, and Elaboration Score is a later normalization of a recursive score, not a recursive measure itself.

    **Concept Tested:** Recursive Importance Measure

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 2. Why does PageRank need a damping factor and iterative convergence on the web graph?

<div class="upper-alpha" markdown>
1. Because web pages have too much text to score directly.
2. Because the web graph can contain cycles, so a single deterministic pass cannot guarantee a stable answer.
3. Because search engines require every score to fall between 0 and 1.
4. Because PageRank only works on graphs with fewer than 1,000 nodes.
</div>

??? question "Show Answer"
    The correct answer is **B**. Cycles in the web graph mean a page's score can depend on another page whose score depends back on the first page, so damping and iteration are needed to guarantee convergence. The other options misstate PageRank's actual constraints.

    **Concept Tested:** PageRank

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 3. In this book's own graph, Behaviorism has an indegree of 1 but a CIS of 103, ranking it in the top 15 concepts by impact. What explains this gap?

<div class="upper-alpha" markdown>
1. Behaviorism's single direct dependent, Instructional Design, is itself a hub with many further dependents, and CIS counts that transitive chain.
2. The learning graph contains a data error that should be fixed.
3. CIS is measured on a different scale than indegree and the two numbers cannot be compared.
4. Behaviorism has more outgoing edges than any other concept.
</div>

??? question "Show Answer"
    The correct answer is **A**. CIS's recursive definition passes Instructional Design's own high impact backward to Behaviorism, one hop at a time, which a first-hop-only metric like indegree cannot see. This is not a data error, both metrics are comparable counts of concepts, and the explanation concerns dependents, not outgoing edges.

    **Concept Tested:** Concept Impact Score (CIS)

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 4. Why can CIS be computed in a single topological-order pass, with no damping factor, on a learning graph?

<div class="upper-alpha" markdown>
1. Because learning graphs are always smaller than web graphs.
2. Because a learning graph is acyclic by definition, so no concept's score can depend back on itself.
3. Because every learning graph has exactly one foundational concept.
4. Because Elaboration Tiers are computed before CIS.
</div>

??? question "Show Answer"
    The correct answer is **B**. Acyclicity guarantees a valid topological order exists in which every concept is scored only after all of its dependents, so no back-reference and no iteration are ever needed. Graph size, the number of foundational concepts, and tier computation order are unrelated to why the single pass is exact.

    **Concept Tested:** Single-Pass DAG Computation

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 5. Why is a concept's Elaboration Score normalized against the maximum CIS across the whole book, rather than against just its own chapter's concepts?

<div class="upper-alpha" markdown>
1. Chapter-local normalization is computationally slower.
2. A concept's impact is a book-wide claim, and chapter-local normalization made a chapter's own top concept always look book-important even when it wasn't.
3. Global normalization was required by the JSON schema.
4. Book-wide normalization uses less memory than chapter-local normalization.
</div>

??? question "Show Answer"
    The correct answer is **B**. Chapter-local normalization was tried and rejected because it produced a degenerate result — a chapter's single most-important concept always scored as book-level important. Speed, memory, and schema requirements were not the deciding factors.

    **Concept Tested:** Global Normalization

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 6. An early tiering scheme ranked concepts by population percentile instead of a log-scaled Elaboration Score, and it broke on a second chapter. What went wrong?

<div class="upper-alpha" markdown>
1. Percentile rank is impossible to compute on a DAG.
2. CIS has a hard floor of 1, and because over half of all concepts sit at that floor, the lowest-tier percentile cutoff landed at the floor itself, making that tier unreachable.
3. The percentile scheme required negative CIS values.
4. Percentile rank only works for graphs with fewer than 50 concepts.
</div>

??? question "Show Answer"
    The correct answer is **B**. Because so many concepts tie at the CIS floor, a percentile cutoff lands on that same floor, making the bottom tier structurally unreachable regardless of true importance — the exact bug the log-scaled Elaboration Score was introduced to fix. Percentile rank is computable on a DAG, does not require negative values, and is not limited by graph size.

    **Concept Tested:** Elaboration Score

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 7. A concept has an Elaboration Score of 0.65. According to the tier table, what target word count and required elements apply?

<div class="upper-alpha" markdown>
1. Tier C: 120-200 words, a clear definition only
2. Tier B: 250-400 words, a worked example
3. Tier A: 500-750 words, a worked example and a diagram/chart/table/MicroSim
4. No tier applies because 0.65 is out of range
</div>

??? question "Show Answer"
    The correct answer is **C**. An Elaboration Score of 0.65 is at or above the 0.5 cutoff for Tier A, which requires both a worked example and a diagram, chart, table, or MicroSim. Tiers B and C apply to lower score ranges, and 0.65 is a valid, in-range score.

    **Concept Tested:** Elaboration Tier

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 8. What replaces the old flat "3000-5000 words per chapter" instruction under CIS-driven Content-Budget Allocation?

<div class="upper-alpha" markdown>
1. Every chapter is fixed at exactly 4,000 words regardless of content.
2. Each concept gets its own word-count target and required elements from its elaboration tier, and the chapter total is the sum of those targets.
3. Word count is no longer tracked at all.
4. Only Tier A concepts receive any word budget.
</div>

??? question "Show Answer"
    The correct answer is **B**. Content-Budget Allocation sets each concept's target from its tier and sums those targets into the chapter total, so chapters with more high-tier concepts naturally run longer. A fixed universal length, no tracking at all, and ignoring Tier B/C concepts all contradict how the allocation actually works.

    **Concept Tested:** Content-Budget Allocation

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 9. What is the Chapter Partitioning Problem, and why couldn't this chapter have been placed earlier than position 28 in this book?

<div class="upper-alpha" markdown>
1. It is the task of dividing a learning graph's concepts into an ordered sequence of chapters respecting topological order; this chapter's concepts depend on material from Chapters 1, 5, 8, 18, and 21.
2. It is the task of choosing chapter titles; this chapter's title was decided last.
3. It is the task of assigning taxonomy colors to chapters; CIS concepts use a new color.
4. It is unrelated to chapter placement and only concerns word counts.
</div>

??? question "Show Answer"
    The correct answer is **A**. Chapter Partitioning must respect the book-wide topological order, and this chapter's 10 concepts depend, directly or transitively, on concepts first introduced in Chapters 1, 5, 8, 18, and 21, which fixes its earliest possible position. Titles, taxonomy colors, and word counts are separate concerns handled elsewhere.

    **Concept Tested:** Chapter Partitioning Problem

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---

#### 10. Which real-world skill change was marked BREAKING because the other three skills in the CIS pipeline depend on it?

<div class="upper-alpha" markdown>
1. `learning-graph-viewer` v1.04, which sizes nodes by CIS
2. `learning-graph-generator` v1.06, which first computes and writes `node.cis` into `learning-graph.json`
3. `chapter-content-generator` v1.09, which computes the Elaboration Budget
4. `book-chapter-generator` v1.0.0, which adds the CIS Score column
</div>

??? question "Show Answer"
    The correct answer is **B**. `learning-graph-generator` v1.06 had to change first because it is the only one of the four skills that produces the `node.cis` field every other skill reads — without it, `book-chapter-generator`, `chapter-content-generator`, and `learning-graph-viewer` have nothing to consume. The other three skills are downstream consumers of that field, not its source.

    **Concept Tested:** Within-Chapter Concept Ordering

    **See:** [Concept Impact Score and Predicting Content Length](index.md)

---
