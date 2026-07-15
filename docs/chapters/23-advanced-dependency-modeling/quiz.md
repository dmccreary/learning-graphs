# Quiz: Advanced Dependency Modeling

Test your understanding of advanced dependency modeling with these review questions.

---

#### 1. Which term names "the specific claim that one concept requires another as a prerequisite," as distinct from the edge itself sitting in a data file?

<div class="upper-alpha" markdown>
1. Direct Dependency
2. Dependency Assertion
3. Dependency Review
4. Edge Provenance
</div>

??? question "Show Answer"
    The correct answer is **B**. A Dependency Assertion is the act of claiming a dependency exists. Direct Dependency describes a structural property of how the claim is encoded (a single edge versus a chain), Dependency Review is the process of examining assertions afterward, and Edge Provenance records who made the assertion rather than naming the act of asserting itself.

    **Concept Tested:** Dependency Assertion

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 2. A dependency holds only through a chain of two or more intermediate concepts, with no single edge connecting the two concepts directly. Which term applies?

<div class="upper-alpha" markdown>
1. Direct Dependency
2. Indirect Dependency
3. Necessary Prerequisite
4. Co-Prerequisite
</div>

??? question "Show Answer"
    The correct answer is **B**. An Indirect Dependency holds only through an intermediate chain, with no direct edge. Direct Dependency describes the opposite case (a single connecting edge), and Necessary Prerequisite and Co-Prerequisite describe prerequisite strength and pairing, not the direct-versus-chained distinction.

    **Concept Tested:** Indirect Dependency

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 3. Which prerequisite type "substantially helps a learner but is not strictly required — skipping it makes the dependent concept harder, not impossible"?

<div class="upper-alpha" markdown>
1. Necessary Prerequisite
2. Mastery Prerequisite
3. Recommended Prerequisite
4. Alternative Prerequisite
</div>

??? question "Show Answer"
    The correct answer is **C**. A Recommended Prerequisite helps substantially but is not strictly required. Necessary Prerequisite and Mastery Prerequisite both describe stricter, non-skippable requirements, and Alternative Prerequisite describes a choice between two sufficient paths, not a soft recommendation.

    **Concept Tested:** Recommended Prerequisite

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 4. Which three fields together let a reviewer judge how much to trust a specific dependency edge?

<div class="upper-alpha" markdown>
1. Learning Sequence, Parallel Learning Paths, and Prerequisite Frontier
2. Dependency Rationale, Dependency Confidence, and Edge Provenance
3. Overconstraint, Underconstraint, and False Prerequisite
4. Direct Dependency, Indirect Dependency, and Necessary Prerequisite
</div>

??? question "Show Answer"
    The correct answer is **B**. Dependency Rationale (why), Dependency Confidence (how certain), and Edge Provenance (who or what asserted it, and when) are the three trust-supporting fields this chapter names. The other option sets each name real chapter concepts, but they describe review failure modes, flexible sequencing patterns, or structural classification rather than trust-assessment fields.

    **Concept Tested:** Edge Provenance

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 5. A dependency graph requires more prerequisites than a concept genuinely needs, unnecessarily blocking a learner from progressing. Which failure mode is this?

<div class="upper-alpha" markdown>
1. Underconstraint
2. Dependency Gap
3. False Prerequisite
4. Overconstraint
</div>

??? question "Show Answer"
    The correct answer is **D**. Overconstraint requires more prerequisites than genuinely needed, unnecessarily blocking progress — often caused by encoding a recommended prerequisite as if it were necessary. Underconstraint is the mirror-image failure (too few required prerequisites), Dependency Gap is a missing edge, and False Prerequisite is an edge that should not exist at all.

    **Concept Tested:** Overconstraint

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 6. Which failure mode describes a dependency assertion that, on closer review, does not actually reflect genuine required prior knowledge — for example, an edge based on alphabetical or topical proximity rather than real domain expertise?

<div class="upper-alpha" markdown>
1. False Prerequisite
2. Dependency Gap
3. Underconstraint
4. Indirect Dependency
</div>

??? question "Show Answer"
    The correct answer is **A**. A False Prerequisite is a plausible-sounding edge that closer review reveals is not a real prerequisite relationship. Dependency Gap describes a missing edge rather than a wrongly-present one, Underconstraint describes a graph allowing too much rather than a specific bad edge, and Indirect Dependency is a structural, not a correctness, classification.

    **Concept Tested:** False Prerequisite

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 7. Two concepts can be reached via either of two different prerequisites, and satisfying just one of them is sufficient. Which term describes this pattern?

<div class="upper-alpha" markdown>
1. Co-Prerequisite
2. Alternative Prerequisite
3. Mastery Prerequisite
4. Prerequisite Frontier
</div>

??? question "Show Answer"
    The correct answer is **B**. An Alternative Prerequisite describes a situation where either of two prerequisites is sufficient on its own. Co-Prerequisite instead describes two concepts that must be learned together, Mastery Prerequisite requires demonstrated mastery of one specific prerequisite, and Prerequisite Frontier describes the current set of newly-learnable concepts, not a choice between two paths.

    **Concept Tested:** Alternative Prerequisite

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 8. Given a learner's current mastered-concept state, which term names the specific set of concepts that have just become learnable — every prerequisite satisfied, nothing yet marked as learned?

<div class="upper-alpha" markdown>
1. Learning Sequence
2. Parallel Learning Paths
3. Prerequisite Frontier
4. Dependency Gap
</div>

??? question "Show Answer"
    The correct answer is **C**. Prerequisite Frontier is exactly this dynamically shifting set of newly-learnable concepts, generalizing Chapter 3's single-concept Ready-to-Learn Concept into a set that updates as a learner progresses. Learning Sequence and Parallel Learning Paths describe whole orderings rather than the frontier at one moment, and Dependency Gap is an unrelated review failure mode.

    **Concept Tested:** Prerequisite Frontier

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 9. Which process describes an automated system, typically a generative-AI pass, proposing dependency edges based on patterns in a course description, rather than a human authoring every edge by hand?

<div class="upper-alpha" markdown>
1. Human Dependency Review
2. Dependency Inference
3. Dependency Review
4. Learning Sequence
</div>

??? question "Show Answer"
    The correct answer is **B**. Dependency Inference is the automated, typically generative-AI-driven proposal of dependency edges. Human Dependency Review is the checkpoint that follows inference to catch its mistakes, Dependency Review is the broader examination process not limited to inferred edges, and Learning Sequence describes an ordering, not an edge-proposal process.

    **Concept Tested:** Dependency Inference

    **See:** [Advanced Dependency Modeling](index.md)

---

#### 10. Which concept is the specific application of Chapter 19's general Human-in-the-Loop Review pattern to dependency edges — checking inferred edges for gaps, overconstraint, underconstraint, and false prerequisites before a graph is final?

<div class="upper-alpha" markdown>
1. Dependency Confidence
2. Edge Provenance
3. Human Dependency Review
4. Co-Prerequisite
</div>

??? question "Show Answer"
    The correct answer is **C**. Human Dependency Review applies the general Human-in-the-Loop Review pattern specifically to checking dependency edges for this chapter's named failure modes before a graph ships. Dependency Confidence and Edge Provenance are properties recorded on individual edges rather than the review process itself, and Co-Prerequisite is an unrelated sequencing pattern.

    **Concept Tested:** Human Dependency Review

    **See:** [Advanced Dependency Modeling](index.md)

---
