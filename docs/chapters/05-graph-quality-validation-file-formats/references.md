# References: Learning Graph Quality, Validation, and File Formats

1. [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia - Explains the mathematical definition and properties of DAGs, including why cycles cannot exist and how topological structure is verified, grounding this chapter's cycle-detection and self-dependency checks.

2. [Directed Graph](https://en.wikipedia.org/wiki/Directed_graph) - Wikipedia - Defines indegree and outdegree formally as the counts of head-end and tail-end edges at a vertex, the exact vocabulary this chapter uses to classify foundational and goal concepts.

3. [JSON](https://en.wikipedia.org/wiki/JSON) - Wikipedia - Describes the JSON data-interchange format's syntax, history, and design goals, supporting this chapter's coverage of the nodes/edges structure used to store a validated learning graph.

4. Introduction to Algorithms (3rd Edition) - Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein - MIT Press - Its graph algorithms chapter presents the white/gray/black depth-first-search coloring scheme this chapter's cycle-detection code directly implements, plus formal treatment of connectivity and degree.

5. Designing Data-Intensive Applications - Martin Kleppmann - O'Reilly Media - Covers data encoding and schema evolution across JSON, CSV, and other formats, directly relevant to this chapter's comparison of JSON, JSON Schema, CSV, YAML, and Markdown for storing a learning graph.

6. [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/) - JSON Schema Official Documentation - A complete reference for JSON Schema keywords, types, and validation rules, expanding on this chapter's example of requiring an `id` and `label` on every learning graph node.

7. [YAML Specification 1.2.2](https://yaml.org/spec/1.2.2/) - YAML.org - The official, formal specification for YAML's indentation-based syntax, useful for understanding the `mkdocs.yml` and chapter-frontmatter files this chapter cites as YAML examples.

8. [Markdown Guide: Basic Syntax](https://www.markdownguide.org/basic-syntax/) - Markdown Guide - A practical reference for Markdown's heading, list, and emphasis syntax, the publishing format this chapter identifies as the home for chapter prose and glossary entries.

9. [Directed Graphs (Algorithms, 4th Edition companion site)](https://algs4.cs.princeton.edu/42digraph/) - Princeton University (Sedgewick & Wayne) - Presents working implementations of directed-cycle detection and topological sort, illustrating the same depth-first-search cycle-checking logic this chapter's Python example walks through.

10. [csv — CSV File Reading and Writing](https://docs.python.org/3/library/csv.html) - Python Software Foundation - Official documentation for Python's `csv` module, supporting this chapter's CSV-to-JSON conversion script and its use of `csv.DictReader` to parse concept and dependency rows.
