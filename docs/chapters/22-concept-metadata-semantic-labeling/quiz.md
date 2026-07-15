# Quiz: Concept Metadata and Semantic Labeling Standards

Test your understanding of concept metadata and semantic labeling standards with these review questions.

---

#### 1. Which term names "a stable, permanent identifier assigned to a concept that remains constant even if the concept's label is later renamed"?

<div class="upper-alpha" markdown>
1. SKOS Preferred Label
2. Unique Concept Identifier
3. Concept Provenance
4. Naming Convention
</div>

??? question "Show Answer"
    The correct answer is **B**. A Unique Concept Identifier stays constant across label renames, which is exactly what a `ConceptID` column provides in a dependency CSV. SKOS Preferred Label is a display label that can change, Concept Provenance records history rather than serving as an identifier, and Naming Convention is a rule set, not an identifier itself.

    **Concept Tested:** Unique Concept Identifier

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 2. A concept "cannot be meaningfully decomposed into smaller prerequisite concepts without losing coherence." Which term applies?

<div class="upper-alpha" markdown>
1. Composite Concept
2. Atomic Concept
3. Concept Granularity
4. Label Ambiguity
</div>

??? question "Show Answer"
    The correct answer is **B**. An Atomic Concept is a genuinely indivisible unit of knowledge that resists further decomposition. Composite Concept describes the opposite choice — deliberately bundling sub-ideas together — and Concept Granularity is the general spectrum both terms sit on, not either endpoint specifically; Label Ambiguity is an unrelated labeling problem.

    **Concept Tested:** Atomic Concept

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 3. Two concept labels, "CSV to JSON" and "csv2json," refer to the same idea but are formatted inconsistently. Which practice resolves this?

<div class="upper-alpha" markdown>
1. Homonym Disambiguation
2. Label Normalization
3. Vocabulary Governance
4. Concept Provenance
</div>

??? question "Show Answer"
    The correct answer is **B**. Label Normalization rewrites labels to a single consistent form, resolving exactly this kind of capitalization and formatting inconsistency. Homonym Disambiguation instead separates two genuinely different concepts sharing one label, and Vocabulary Governance and Concept Provenance describe broader policy and history-tracking practices, not the formatting fix itself.

    **Concept Tested:** Label Normalization

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 4. A reviewer discovers that the label "Model" is being used for both "a generative AI system" and "a formal representation of a learner's knowledge state." Which practice addresses this?

<div class="upper-alpha" markdown>
1. Synonym Management
2. Label Normalization
3. Homonym Disambiguation
4. Dublin Core Description
</div>

??? question "Show Answer"
    The correct answer is **C**. Homonym Disambiguation distinguishes multiple distinct concepts that happen to share the same or similar label — exactly the "Model" collision described, which should become two separately labeled nodes. Synonym Management addresses the opposite problem (different labels, same concept), and Label Normalization and Dublin Core Description do not address label collisions at all.

    **Concept Tested:** Homonym Disambiguation

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 5. Which Dublin Core field holds a resource's formal, human-readable name, such as the value in this project's `metadata.json` `title` field?

<div class="upper-alpha" markdown>
1. Dublin Core Description
2. SKOS Preferred Label
3. Dublin Core Title
4. Metadata Field
</div>

??? question "Show Answer"
    The correct answer is **C**. Dublin Core Title is the Dublin Core field for a resource's formal name. Dublin Core Description instead holds a free-text summary, SKOS Preferred Label is a SKOS-specific concept-display label rather than a Dublin Core resource-title field, and Metadata Field is the general category both specific fields belong to.

    **Concept Tested:** Dublin Core Title

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 6. Which SKOS relation links "Depth-First Search" to the more general concept "Graph Traversal"?

<div class="upper-alpha" markdown>
1. SKOS Narrower Relation
2. SKOS Related Relation
3. SKOS Broader Relation
4. SKOS Alternate Label
</div>

??? question "Show Answer"
    The correct answer is **C**. A SKOS Broader Relation links a concept to a more general concept that contains it — Graph Traversal is broader than Depth-First Search. SKOS Narrower Relation would describe the reverse direction, SKOS Related Relation implies association without hierarchy, and SKOS Alternate Label is a labeling field, not a relation between two concepts.

    **Concept Tested:** SKOS Broader Relation

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 7. Which concept is the general category that SKOS Broader, Narrower, and Related relations are all specific instances of?

<div class="upper-alpha" markdown>
1. Semantic Relationship
2. Machine-Readable Metadata
3. Concept Provenance
4. Naming Convention
</div>

??? question "Show Answer"
    The correct answer is **A**. Semantic Relationship is any typed, named connection between two concepts capturing how they relate, of which broader, narrower, and related are specific SKOS-defined instances. Machine-Readable Metadata, Concept Provenance, and Naming Convention describe unrelated metadata concerns — parseability, history, and label formatting rules, respectively.

    **Concept Tested:** Semantic Relationship

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 8. Why does a project store its learning graph as `learning-graph.json` rather than only as prose descriptions of each concept?

<div class="upper-alpha" markdown>
1. Because JSON is required by Dublin Core Title fields specifically.
2. Because Machine-Readable Metadata lets a script, not just a human, reliably extract and act on the data.
3. Because Concept Granularity requires a structured file format.
4. Because Vocabulary Governance is only possible in JSON format.
</div>

??? question "Show Answer"
    The correct answer is **B**. Machine-Readable Metadata is metadata structured in a consistent, parseable format specifically so scripts (viewers, validators, search features) can act on it reliably, not just a human reader. Dublin Core Title, Concept Granularity, and Vocabulary Governance do not require any specific file format to function.

    **Concept Tested:** Machine-Readable Metadata

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 9. A reviewer wants to trace a questionable dependency edge back to who or what created it and when. Which concept supports this?

<div class="upper-alpha" markdown>
1. Concept Provenance
2. Label Ambiguity
3. Atomic Concept
4. SKOS Related Relation
</div>

??? question "Show Answer"
    The correct answer is **A**. Concept Provenance records a concept's origin and history, including who or what created or last modified it, supporting exactly this kind of traceability. Label Ambiguity, Atomic Concept, and SKOS Related Relation describe labeling clarity, granularity, and relation type, none of which track origin or history.

    **Concept Tested:** Concept Provenance

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---

#### 10. As a concept vocabulary grows past a few hundred concepts with multiple contributors, which practice keeps labels from drifting into inconsistent near-duplicates over time?

<div class="upper-alpha" markdown>
1. Concept Granularity
2. Vocabulary Governance
3. Dublin Core Description
4. Unique Concept Identifier
</div>

??? question "Show Answer"
    The correct answer is **B**. Vocabulary Governance is the set of policies and review practices that keep a vocabulary consistent as new concepts are added and existing ones revised, directly preventing the drift a growing, multi-contributor project risks. Concept Granularity, Dublin Core Description, and Unique Concept Identifier address different concerns — sizing, summarizing, and identifying concepts — not ongoing vocabulary consistency.

    **Concept Tested:** Vocabulary Governance

    **See:** [Concept Metadata and Semantic Labeling Standards](index.md)

---
