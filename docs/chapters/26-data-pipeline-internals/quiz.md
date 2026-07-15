# Quiz: Data Pipeline Internals

Test your understanding of data pipeline internals with these review questions.

---

#### 1. Which term names "a sequence of automated steps that reads data in one format, transforms it, and writes it out in another format"?

<div class="upper-alpha" markdown>
1. Node Record
2. Data Pipeline
3. Schema Conformance
4. JSON Serialization
</div>

??? question "Show Answer"
    The correct answer is **B**. A Data Pipeline is the whole sequence of automated read-transform-write steps, such as this project's own CSV-to-JSON generation process. Node Record is one output artifact of that pipeline, Schema Conformance is a property the output should have, and JSON Serialization is one specific step within the pipeline, not the whole sequence.

    **Concept Tested:** Data Pipeline

    **See:** [Data Pipeline Internals](index.md)

---

#### 2. In `learning-graph.csv`, the first row reads `ConceptID,ConceptLabel,Dependencies,TaxonomyID`. What is this row called?

<div class="upper-alpha" markdown>
1. Node Record
2. CSV Header
3. Metadata Record
4. Pipe-Delimited Field
</div>

??? question "Show Answer"
    The correct answer is **B**. The CSV Header is the first row naming each column so later rows' values can be matched to the correct field. Node Record and Metadata Record are JSON output structures, not CSV rows, and Pipe-Delimited Field describes a single cell's internal formatting, not a whole header row.

    **Concept Tested:** CSV Header

    **See:** [Data Pipeline Internals](index.md)

---

#### 3. A CSV cell contains the value `"5|4"`, packing two ConceptIDs into a single field using the pipe character as a separator. What is this technique called?

<div class="upper-alpha" markdown>
1. CSV Header
2. Pipe-Delimited Field
3. Edge Record
4. Data Transformation
</div>

??? question "Show Answer"
    The correct answer is **B**. A Pipe-Delimited Field packs multiple values into one CSV cell using the pipe character, since CSV otherwise expects one value per cell. CSV Header names columns rather than packing values, Edge Record is the JSON structure generated *from* this field, and Data Transformation is the broader process this field-packing technique supports.

    **Concept Tested:** Pipe-Delimited Field

    **See:** [Data Pipeline Internals](index.md)

---

#### 4. One CSV row with a Dependencies value of `"5|4"` generates how many Edge Records, and why?

<div class="upper-alpha" markdown>
1. Exactly one Edge Record, because each CSV row produces exactly one edge regardless of the Dependencies field.
2. Two Edge Records, because the pipe-delimited Dependencies field is split into one edge per listed dependency.
3. Zero Edge Records, because Edge Records are only generated for TaxonomyID values.
4. Four Edge Records, one per column in the CSV row.
</div>

??? question "Show Answer"
    The correct answer is **B**. A pipe-delimited Dependencies field with two values generates two separate Edge Records, one per dependency, because Edge Record cardinality follows the number of pipe-delimited entries, not a fixed one-per-row count. The other options misstate how Edge Record generation actually works.

    **Concept Tested:** Edge Record

    **See:** [Data Pipeline Internals](index.md)

---

#### 5. Which JSON record type is generated once per distinct TaxonomyID across the whole CSV, rather than once per row?

<div class="upper-alpha" markdown>
1. Node Record
2. Edge Record
3. Group Record
4. Metadata Record
</div>

??? question "Show Answer"
    The correct answer is **C**. A Group Record is generated once per unique taxonomy category found across all rows, not per individual row. Node Record and Edge Record are generated per row (or per dependency within a row), and Metadata Record is generated once for the whole graph from a separate metadata file, not from per-row taxonomy values.

    **Concept Tested:** Group Record

    **See:** [Data Pipeline Internals](index.md)

---

#### 6. Which two specific fields inside a graph's Metadata Record record which format version a file represents and what reuse terms apply to its content?

<div class="upper-alpha" markdown>
1. Taxonomy Name Mapping and Color Configuration
2. Version Metadata and License Metadata
3. CSV Header and Schema Conformance
4. Node Record and Edge Record
</div>

??? question "Show Answer"
    The correct answer is **B**. Version Metadata records the format/version, and License Metadata records reuse terms — both specific fields within the Metadata Record. Taxonomy Name Mapping and Color Configuration are separate configuration files, not metadata-record fields, and CSV Header, Schema Conformance, Node Record, and Edge Record all describe unrelated structural concerns.

    **Concept Tested:** Version Metadata

    **See:** [Data Pipeline Internals](index.md)

---

#### 7. A graph viewer's legend shows the cryptic code "SKILL" instead of "Agent Skills for Learning Graph Generation." Which missing file most directly explains this?

<div class="upper-alpha" markdown>
1. Missing Color Configuration
2. Missing Taxonomy Name Mapping
3. Missing CSV Header
4. Missing JSON Serialization
</div>

??? question "Show Answer"
    The correct answer is **B**. A Taxonomy Name Mapping (like `taxonomy-names.json`) supplies the human-readable classifierName for each TaxonomyID; without it, the pipeline falls back to the raw abbreviation. Missing Color Configuration would produce wrong or unstable colors, not wrong names, and Missing CSV Header or Missing JSON Serialization would break the pipeline much more broadly rather than producing this specific symptom.

    **Concept Tested:** Taxonomy Name Mapping

    **See:** [Data Pipeline Internals](index.md)

---

#### 8. Why does this project save a `color-config.json` file rather than letting `csv-to-json.py` assign category colors fresh on every run?

<div class="upper-alpha" markdown>
1. To keep each category's color assignment stable across repeated regenerations, rather than reassigned arbitrarily each time.
2. Because JSON Serialization requires a separate color file to function at all.
3. Because Schema Conformance cannot be checked without a saved color file.
4. Because CSV Header names cannot include color values directly.
</div>

??? question "Show Answer"
    The correct answer is **A**. A saved Color Configuration keeps each TaxonomyID's color assignment stable across regenerations, supporting Reproducible Generation. JSON Serialization and Schema Conformance do not depend on a saved color file to function, and CSV Header naming is unrelated to why colors are stored separately.

    **Concept Tested:** Color Configuration

    **See:** [Data Pipeline Internals](index.md)

---

#### 9. Which step converts an in-memory Python data structure — assembled node, edge, group, and metadata records — into the textual JSON written to `learning-graph.json`?

<div class="upper-alpha" markdown>
1. Data Transformation
2. JSON Serialization
3. Schema Conformance
4. CSV Header
</div>

??? question "Show Answer"
    The correct answer is **B**. JSON Serialization is specifically the conversion of in-memory data structures into written JSON text, the pipeline's final output step. Data Transformation is the broader process this step belongs to, and Schema Conformance and CSV Header describe unrelated structural-shape and input-file concerns.

    **Concept Tested:** JSON Serialization

    **See:** [Data Pipeline Internals](index.md)

---

#### 10. Running this project's generation pipeline twice on the same CSV, metadata, and configuration files produces the exact same `learning-graph.json` output both times. Which property does this describe?

<div class="upper-alpha" markdown>
1. Schema Conformance
2. Data Transformation
3. Reproducible Generation
4. Pipe-Delimited Field
</div>

??? question "Show Answer"
    The correct answer is **C**. Reproducible Generation is exactly this property — the same inputs and configuration files produce the same output every run. Schema Conformance checks structural shape rather than run-to-run consistency, Data Transformation is the general conversion process (which reproducibility depends on but does not itself guarantee), and Pipe-Delimited Field is an unrelated CSV formatting detail.

    **Concept Tested:** Reproducible Generation

    **See:** [Data Pipeline Internals](index.md)

---
