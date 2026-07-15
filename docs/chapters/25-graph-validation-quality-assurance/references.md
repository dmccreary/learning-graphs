# References: Graph Validation and Quality Assurance

1. [JSON Schema](https://json-schema.org/understanding-json-schema/) - JSON Schema Organization - The official guide to JSON Schema validation, the mechanism this chapter's Schema Validation section applies to `learning-graph.json` against `learning-graph-schema.json`.

2. [Referential integrity](https://en.wikipedia.org/wiki/Referential_integrity) - Wikipedia - Defines referential integrity in database systems, the same principle this chapter's Referential Integrity section applies to dependency-edge ConceptID references.

3. [Record linkage](https://en.wikipedia.org/wiki/Record_linkage) - Wikipedia - Covers techniques for identifying records that refer to the same real-world entity, background for this chapter's Duplicate Concept Detection section.

4. [Data validation](https://en.wikipedia.org/wiki/Data_validation) - Wikipedia - Surveys general data-validation principles, the umbrella discipline this chapter's Automated Validator, Validation Warning, and Validation Error sections apply specifically to learning graphs.

5. [Completeness (knowledge bases)](https://en.wikipedia.org/wiki/Knowledge_base_completeness) - Wikipedia - Discusses completeness assumptions in structured knowledge bases, conceptually relevant to this chapter's Graph Completeness section.

6. [Instructional design](https://en.wikipedia.org/wiki/Instructional_design) - Wikipedia - Covers principles of educationally sound sequencing, the discipline this chapter's Pedagogical Coherence section draws on to distinguish mathematically valid from pedagogically sound ordering.

7. [Software quality](https://en.wikipedia.org/wiki/Software_quality) - Wikipedia - Frames the general distinction between automatable and judgment-based quality checks, background for this chapter's split between fully automated checks and Pedagogical Coherence / Dependency Plausibility.

8. [Static program analysis](https://en.wikipedia.org/wiki/Static_program_analysis) - Wikipedia - Explains how automated tools check code for defects without execution, an analogous pattern to this chapter's Automated Validator running fixed checks against a graph dataset.

9. [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) - Anthropic - Describes giving an agent a verifiable, automatable check paired with human review for judgment calls, the pattern this chapter's split between automated validation and Pedagogical Coherence review directly follows.

10. Introduction to Algorithms (4th Edition) - Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein - MIT Press - Covers graph-validation algorithms (cycle detection, connectivity) referenced throughout this chapter's automated-check sections and their relationship to Chapter 5's structural validators.
