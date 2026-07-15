# Quiz Generation Quality Report

Generated: 2026-07-15
Execution Mode: Serial (1 agent)

## Overall Statistics

- **Total Chapters:** 19
- **Total Questions:** 190
- **Questions per Chapter:** 10
- **Automated Structural Quality Score:** 92/100
- **Priority-Concept Coverage:** 100% in every chapter

The priority-concept measure uses the ten concepts selected for assessment after reviewing each chapter's title, summary, concept list, and learning-graph alignment. Total concept coverage is also shown so chapters with more than ten concepts are not overstated.

## Per-Chapter Summary

| Chapter | Questions | Readiness | Priority Coverage | Total Concept Coverage | Answer Balance |
|---|---:|---:|---:|---:|---|
| 1. Foundations of Concept Graphs | 10 | 100/100 | 100% | 10/15 (67%) | A:3, B:3, C:2, D:2 |
| 2. Concept Labeling and Metadata Standards | 10 | 100/100 | 100% | 10/10 (100%) | A:2, B:3, C:3, D:2 |
| 3. Concept Dependencies and Prerequisites | 10 | 100/100 | 100% | 10/16 (62%) | A:2, B:2, C:3, D:3 |
| 4. Concept Taxonomies and Ontologies | 10 | 100/100 | 100% | 10/13 (77%) | A:3, B:2, C:2, D:3 |
| 5. Learning Graph Quality, Validation, and File Formats | 10 | 90/100 | 100% | 10/21 (48%) | A:3, B:3, C:2, D:2 |
| 6. Bloom's Taxonomy and Learning Objectives | 10 | 100/100 | 100% | 10/11 (91%) | A:2, B:3, C:3, D:2 |
| 7. Learning Theories and Instructional Design | 10 | 95/100 | 100% | 10/14 (71%) | A:2, B:2, C:3, D:3 |
| 8. Cognitive Load and Knowledge Space Theory | 10 | 100/100 | 100% | 10/13 (77%) | A:3, B:2, C:2, D:3 |
| 9. Mastery, Metacognition, and Instructional Sequencing | 10 | 100/100 | 100% | 10/12 (83%) | A:3, B:3, C:2, D:2 |
| 10. Assessment, Feedback, and Quizzes | 10 | 100/100 | 100% | 10/12 (83%) | A:2, B:3, C:3, D:2 |
| 11. Vis.js Fundamentals and Node Styling | 10 | 100/100 | 100% | 10/19 (53%) | A:2, B:2, C:3, D:3 |
| 12. Edge Styling and Visual Properties | 10 | 95/100 | 100% | 8/8 (100%) | A:3, B:2, C:2, D:3 |
| 13. Physics Simulation and Graph Layout | 10 | 95/100 | 100% | 10/14 (71%) | A:3, B:3, C:2, D:2 |
| 14. Interactive Navigation in Vis.js | 10 | 95/100 | 100% | 10/11 (91%) | A:2, B:3, C:3, D:2 |
| 15. Graph Clustering and Editing Tools | 10 | 95/100 | 100% | 10/14 (71%) | A:2, B:2, C:3, D:3 |
| 16. Personalization and Adaptive Learning Paths | 10 | 95/100 | 100% | 10/19 (53%) | A:3, B:2, C:2, D:3 |
| 17. Intelligent Agents and Generative AI | 10 | 100/100 | 100% | 10/12 (83%) | A:3, B:3, C:2, D:2 |
| 18. Intelligent Textbooks, MicroSims, and Deployment | 10 | 100/100 | 100% | 10/20 (50%) | A:2, B:3, C:3, D:2 |
| 19. Using a Skill to Generate a Learning Graph | 10 | 95/100 | 100% | 10/12 (83%) | A:2, B:2, C:3, D:3 |

## Bloom's Taxonomy Distribution

| Level | Questions | Percentage |
|---|---:|---:|
| Remember | 40 | 21.1% |
| Understand | 56 | 29.5% |
| Apply | 51 | 26.8% |
| Analyze | 35 | 18.4% |
| Evaluate | 4 | 2.1% |
| Create | 4 | 2.1% |

Introductory chapters emphasize Remember and Understand. Intermediate chapters shift toward Apply and Analyze. Advanced chapters add Evaluate and Create while retaining retrieval and interpretation checks.

## Answer Balance

- **A:** 47 (24.7%)
- **B:** 48 (25.3%)
- **C:** 48 (25.3%)
- **D:** 47 (24.7%)

Every chapter keeps each answer position within the required 20–30% range, and the sequence avoids runs of three identical positions.

## Validation Results

- 19 quiz files contain exactly 10 questions apiece.
- Every question has four options, one answer disclosure, a concept label, and a verified link to its chapter source.
- Every explanation is 50–100 words.
- Correct-answer positions are balanced within 20–30% overall and within each chapter.
- Question stems are unique across the complete bank.
- All tested concepts exist in both the chapter concept list and the learning graph.
- Distractors come from the same chapter, making them plausible while keeping the keyed answer defensible from the chapter definitions.

## Recommendations

- Review item-performance data after deployment; revise distractors that almost no learner selects.
- When a chapter changes materially, regenerate its quiz and rerun duplicate, link, and answer-balance checks.
- For high-stakes use, add a subject-matter-expert review because automated structural validation cannot replace professional judgment about ambiguity or domain nuance.
