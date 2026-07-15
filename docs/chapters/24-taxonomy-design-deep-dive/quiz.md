# Quiz: Taxonomy Design Deep Dive

Test your understanding of taxonomy design with these review questions.

---

#### 1. Which term names "any systematic method for sorting concepts into named categories according to consistent, stated criteria"?

<div class="upper-alpha" markdown>
1. Ontology Class
2. Classification Scheme
3. Category Assignment
4. Taxonomy Drift
</div>

??? question "Show Answer"
    The correct answer is **B**. A Classification Scheme is the general, systematic sorting method. Ontology Class is a formally defined category within an ontology specifically, Category Assignment is the act of placing one concept into a category, and Taxonomy Drift describes degradation over time, not the sorting method itself.

    **Concept Tested:** Classification Scheme

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 2. In this project's own taxonomy, every one of the 400 concepts carries exactly one `TaxonomyID`. Which term describes this design choice?

<div class="upper-alpha" markdown>
1. Polyhierarchy
2. Exclusive Category
3. Category Overlap
4. Taxonomy Breadth
</div>

??? question "Show Answer"
    The correct answer is **B**. An Exclusive Category scheme assigns every concept to exactly one category, never more than one — exactly this project's design. Polyhierarchy is the direct alternative, permitting multiple category membership, and Category Overlap and Taxonomy Breadth describe unrelated boundary and hierarchy-width properties.

    **Concept Tested:** Exclusive Category

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 3. Which classification scheme allows a single concept to legitimately belong to more than one category at the same time?

<div class="upper-alpha" markdown>
1. Exclusive Category
2. Polyhierarchy
3. Category Boundary
4. Taxonomy Validation
</div>

??? question "Show Answer"
    The correct answer is **B**. Polyhierarchy permits a concept to belong to more than one category simultaneously, the direct alternative to an exclusive scheme. Exclusive Category is the opposite design choice, Category Boundary is the criterion distinguishing categories rather than a whole-scheme choice, and Taxonomy Validation is a quality-check process, not a classification scheme type.

    **Concept Tested:** Polyhierarchy

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 4. A reviewer notices one taxonomy category holds 45% of all concepts while most others hold under 10%. Which metric does this violate?

<div class="upper-alpha" markdown>
1. Category Coverage
2. Category Balance
3. Taxonomy Depth
4. Ontology Property
</div>

??? question "Show Answer"
    The correct answer is **B**. Category Balance measures how evenly concepts are distributed across categories, and a 45% share badly violates a healthy distribution (this project's own 30% ceiling). Category Coverage instead asks whether every concept has a category home at all, and Taxonomy Depth and Ontology Property describe hierarchy nesting and formal attributes, not distribution evenness.

    **Concept Tested:** Category Balance

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 5. A taxonomy's "Miscellaneous" bucket absorbs 20% of all concepts because the other categories don't clearly account for them. Which metric does this indicate a problem with?

<div class="upper-alpha" markdown>
1. Category Coverage
2. Category Balance
3. Taxonomy Breadth
4. Hierarchical Relation
</div>

??? question "Show Answer"
    The correct answer is **A**. Category Coverage measures whether a taxonomy's categories, together, account for every concept without an oversized miscellaneous bucket — a 20% miscellaneous share signals weak coverage. Category Balance addresses distribution evenness across defined categories rather than leftover concepts specifically, and Taxonomy Breadth and Hierarchical Relation are unrelated hierarchy and relation-type concepts.

    **Concept Tested:** Category Coverage

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 6. Two categories' boundaries are ambiguous enough that several concepts could plausibly be assigned to either one. Which concept names this problem?

<div class="upper-alpha" markdown>
1. Category Overlap
2. Taxonomy Drift
3. Ontology Class
4. Semantic Type
</div>

??? question "Show Answer"
    The correct answer is **A**. Category Overlap names exactly this ambiguous-boundary problem, even within a nominally exclusive scheme. Taxonomy Drift describes gradual degradation over time rather than a boundary-clarity snapshot, and Ontology Class and Semantic Type describe formal category and value-type definitions unrelated to boundary ambiguity between two specific categories.

    **Concept Tested:** Category Overlap

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 7. As new concepts are added to a graph over time without revisiting the original category design, a taxonomy's balance and clarity gradually degrade. Which concept names this process?

<div class="upper-alpha" markdown>
1. Taxonomy Depth
2. Taxonomy Drift
3. Category Assignment
4. Ontology Property
</div>

??? question "Show Answer"
    The correct answer is **B**. Taxonomy Drift is the gradual degradation of balance, coverage, or boundary clarity as new concepts are added without revisiting the original design. Taxonomy Depth measures hierarchy nesting rather than change over time, Category Assignment is the act of placing one concept into a category, and Ontology Property describes a formal attribute type.

    **Concept Tested:** Taxonomy Drift

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 8. Which term describes a formally defined category within an ontology, representing a type of thing rather than one specific instance?

<div class="upper-alpha" markdown>
1. Ontology Property
2. Semantic Type
3. Ontology Class
4. Associative Relation
</div>

??? question "Show Answer"
    The correct answer is **C**. An Ontology Class is a formally defined type, such as "Learning Graph" as a category distinct from any one specific instance. Ontology Property instead defines an attribute or relationship type that instances can carry, Semantic Type describes what kind of value a property holds, and Associative Relation describes a connection between concepts rather than a category type.

    **Concept Tested:** Ontology Class

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 9. SKOS's broader and narrower relations are both examples of which general relation family?

<div class="upper-alpha" markdown>
1. Associative Relation
2. Hierarchical Relation
3. Category Boundary
4. Polyhierarchy
</div>

??? question "Show Answer"
    The correct answer is **B**. Hierarchical Relation covers any relationship expressing that one concept is more general or more specific than another, which is exactly what SKOS broader and narrower relations express. Associative Relation instead covers meaningful connections with no implied hierarchy (SKOS related), and Category Boundary and Polyhierarchy describe unrelated classification-scheme design choices.

    **Concept Tested:** Hierarchical Relation

    **See:** [Taxonomy Design Deep Dive](index.md)

---

#### 10. Which process systematically checks a taxonomy against balance, coverage, overlap, and boundary-clarity criteria before considering it complete?

<div class="upper-alpha" markdown>
1. Learning Graph Validation
2. Taxonomy Validation
3. Dependency Review
4. Category Assignment
</div>

??? question "Show Answer"
    The correct answer is **B**. Taxonomy Validation is the systematic check against exactly these taxonomy-specific quality criteria. Learning Graph Validation checks the dependency graph's structural properties (cycles, orphans, connectivity), a related but independent check; Dependency Review examines edges rather than categories, and Category Assignment is the act of sorting one concept, not a validation process.

    **Concept Tested:** Taxonomy Validation

    **See:** [Taxonomy Design Deep Dive](index.md)

---
