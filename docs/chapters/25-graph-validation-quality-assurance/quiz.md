# Quiz: Graph Validation and Quality Assurance

Test your understanding of graph validation and quality assurance with these review questions.

---

#### 1. Which check confirms that a graph dataset's fields, types, and structure conform to its declared Graph Schema?

<div class="upper-alpha" markdown>
1. Referential Integrity
2. Schema Validation
3. Graph Completeness
4. Dependency Plausibility
</div>

??? question "Show Answer"
    The correct answer is **B**. Schema Validation checks that fields, types, and structure conform to the declared schema. Referential Integrity instead checks that references within a correctly-shaped file point to real IDs, and Graph Completeness and Dependency Plausibility address coverage and pedagogical judgment rather than structural shape.

    **Concept Tested:** Schema Validation

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 2. Which property ensures that every dependency edge's `from` and `to` values point to a concept ID that actually exists in the dataset?

<div class="upper-alpha" markdown>
1. Schema Validation
2. Metadata Validation
3. Referential Integrity
4. Graph Completeness
</div>

??? question "Show Answer"
    The correct answer is **C**. Referential Integrity specifically checks that references point to IDs that actually exist. Schema Validation checks shape and types rather than reference targets, Metadata Validation checks field presence and consistency, and Graph Completeness asks whether the graph's overall coverage matches its scope.

    **Concept Tested:** Referential Integrity

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 3. A dependency edge references ConceptID 999, but no concept with that ID exists anywhere in the concept list. Which finding is this?

<div class="upper-alpha" markdown>
1. Missing Dependency
2. Duplicate Concept Detection
3. Invalid Dependency ID
4. Validation Warning
</div>

??? question "Show Answer"
    The correct answer is **C**. An Invalid Dependency ID is exactly a dependency edge referencing a ConceptID that does not exist, typically from a typo or a deleted concept whose edges were never cleaned up. Missing Dependency describes an edge that should exist but doesn't, Duplicate Concept Detection finds effectively-identical concepts, and Validation Warning is a severity category, not the specific finding type.

    **Concept Tested:** Invalid Dependency ID

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 4. Which automated process identifies two or more concepts in a graph that are effectively the same idea, whether through identical or near-identical labels?

<div class="upper-alpha" markdown>
1. Duplicate Concept Detection
2. Missing Dependency
3. Metadata Validation
4. Graph Completeness
</div>

??? question "Show Answer"
    The correct answer is **A**. Duplicate Concept Detection identifies concepts that are effectively the same idea despite differing labels or formatting. Missing Dependency instead finds absent edges, Metadata Validation checks field presence and consistency, and Graph Completeness asks about overall scope coverage rather than concept-level duplication.

    **Concept Tested:** Duplicate Concept Detection

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 5. Which property asks whether a graph covers everything its scope promises — every concept the course description implies, every needed dependency, every taxonomy category populated?

<div class="upper-alpha" markdown>
1. Graph Completeness
2. Referential Integrity
3. Schema Validation
4. Validation Threshold
</div>

??? question "Show Answer"
    The correct answer is **A**. Graph Completeness asks whether a graph's coverage matches its promised scope, broader than any single structural check. Referential Integrity and Schema Validation check narrower structural properties (reference validity and shape), and Validation Threshold is a cutoff value, not a completeness measure.

    **Concept Tested:** Graph Completeness

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 6. A graph is a perfectly valid DAG with zero cycles and full connectivity, yet it sequences "Advanced Optimization" before "Basic Calculus" in a way no curriculum designer would approve. Which check would catch this, and why can no automated script fully replace it?

<div class="upper-alpha" markdown>
1. Schema Validation — because file shape checks catch sequencing errors.
2. Pedagogical Coherence — because it requires judging whether structure reflects genuine educational sense, not just mathematical validity.
3. Referential Integrity — because it verifies every edge points to a real concept.
4. Duplicate Concept Detection — because sequencing errors are a form of duplication.
</div>

??? question "Show Answer"
    The correct answer is **B**. Pedagogical Coherence specifically asks whether a graph's sequencing makes genuine educational sense, a judgment no purely structural check (like DAG validity) can make. Schema Validation, Referential Integrity, and Duplicate Concept Detection each check a different, fully automatable structural property and would not catch a pedagogically nonsensical but structurally valid ordering.

    **Concept Tested:** Pedagogical Coherence

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 7. Which concept applies Chapter 23's False Prerequisite concern at the level of a single edge, asking "does this specific claim hold up to genuine domain expertise"?

<div class="upper-alpha" markdown>
1. Dependency Plausibility
2. Graph Quality Score
3. Validation Error
4. Automated Validator
</div>

??? question "Show Answer"
    The correct answer is **A**. Dependency Plausibility is a judgment about whether one specific asserted dependency reflects genuine domain expertise, applying the False Prerequisite concern edge by edge. Graph Quality Score is a composite whole-graph number, Validation Error is a severity classification, and Automated Validator is the tool that runs checks, not the judgment itself.

    **Concept Tested:** Dependency Plausibility

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 8. Which finding severity level flags a potential quality problem worth a reviewer's attention but does not, by itself, make a graph unusable?

<div class="upper-alpha" markdown>
1. Validation Error
2. Validation Warning
3. Graph Quality Score
4. Validation Threshold
</div>

??? question "Show Answer"
    The correct answer is **B**. A Validation Warning flags a concern worth reviewing without blocking use, such as a taxonomy category just under a balance ceiling. Validation Error is the more severe category that does block use, and Graph Quality Score and Validation Threshold describe a composite score and a cutoff value, not a specific finding's severity label.

    **Concept Tested:** Validation Warning

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 9. Which concept is a pre-defined cutoff value, such as a 30% category-balance ceiling or a course-description score of 70, that separates an acceptable finding from an unacceptable one?

<div class="upper-alpha" markdown>
1. Validation Threshold
2. Graph Quality Score
3. Automated Validator
4. Metadata Validation
</div>

??? question "Show Answer"
    The correct answer is **A**. A Validation Threshold is exactly this kind of pre-defined cutoff separating acceptable from unacceptable. Graph Quality Score is the composite number a threshold might be applied to, Automated Validator is the tool that runs checks against thresholds, and Metadata Validation is an unrelated field-level check.

    **Concept Tested:** Validation Threshold

    **See:** [Graph Validation and Quality Assurance](index.md)

---

#### 10. This project's own graph scored roughly 88 out of 100 after its repair pass, summarizing results across every validation check in one number. Which concept does this score represent?

<div class="upper-alpha" markdown>
1. Validation Threshold
2. Graph Quality Score
3. Graph Completeness
4. Validation Warning
</div>

??? question "Show Answer"
    The correct answer is **B**. A Graph Quality Score is a single composite number, typically on a 1-to-100 scale, summarizing overall validation results across every check — exactly the 88/100 figure this project's own session log reported. Validation Threshold is the cutoff a score is compared against, and Graph Completeness and Validation Warning describe narrower, single-dimension checks rather than the composite score itself.

    **Concept Tested:** Graph Quality Score

    **See:** [Graph Validation and Quality Assurance](index.md)

---
