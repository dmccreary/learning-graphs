---
title: Course Description for Learning Graphs: The Key to Intelligent Textbooks
description: A detailed course description for Learning Graphs including overview, topics covered and learning objectives in the format of the 2001 Bloom Taxonomy
quality_score: 96
---

# Course Description

**Title:** Learning Graphs: The Key to Intelligent Textbooks

**Target Audience:** Professionals — instructional designers, curriculum developers, educational
technologists, edtech product managers, and software engineers — who want to understand the core
data structures used to design, validate, and generate interactive intelligent textbooks. No prior
experience building a textbook or curriculum is assumed, but the course moves quickly and treats
readers as working professionals rather than beginning students.

**Prerequisites:**

- Comfort using a web browser and internet search
- Working access to a generative AI chat tool (e.g., Anthropic Claude or OpenAI ChatGPT)
- Helpful but not required: prior exposure to data structures (graphs, trees, lists), instructional
  design, curriculum development, or learning management systems. Unfamiliar terms can be looked up
  in the [Glossary of Terms](glossary.md).

## Course Overview

Generative AI has driven the cost of producing content to nearly zero — and with it has come a flood
of AI "slop": incoherent collections of text covering seemingly random concepts, with no logic
governing what is included, what is excluded, what order concepts are presented in, or how that
order should shape the structure of a book. Anyone can now generate a chapter. Almost no one can
generate a *course* that holds together.

Learning Graphs solve this problem. A learning graph is a precise, machine-readable representation
of every concept covered in a book and the prerequisite order in which those concepts must be
learned. Formally, it is a Directed Acyclic Graph (DAG) of concepts connected by "depends on" edges
— a roadmap for learning, and a map of concepts and their inter-dependencies. Learning graphs take
real effort to generate and validate, but that effort is what gives an intelligent textbook its
coherence, its pedagogical soundness, and its ability to be personalized and regenerated on demand.

This course teaches professionals how to build, validate, and use learning graphs as the foundational
data structure behind interactive intelligent textbooks. We begin with what a learning "concept" is
and how concept dependency graphs (CDGs) model relationships between concepts. We show how generative
AI tools can enumerate concepts, infer their dependencies, and review existing concept graphs for
completeness. We then cover the process of building taxonomies and ontologies for classifying
concepts, along with the underlying graph theory — abstraction, clustering, traversal, search, and
dependency analysis — needed to keep a learning graph well-formed. From there we move to
visualization and navigation, using vis.js as the primary tool for exploring and editing concept
dependency graphs. We close by connecting learning graphs to the learning sciences that justify them
— cognitive load theory, mastery learning, knowledge space theory, and backward design — and by
showing how intelligent agents use the graph together with a student's demonstrated mastery to
assemble hyper-personalized lesson plans and generate intelligent textbook content automatically.

## Main Topics Covered

- Concept dependency graphs (CDGs) and learning graphs as the foundational data structure for
  intelligent textbooks
- Concept enumeration, labeling conventions, and metadata standards (SKOS, Dublin Core, ISO/IEC 11179)
- Modeling prerequisite relationships and dependency structure between concepts
- Building concept taxonomies and ontologies for classifying and grouping concepts
- Learning graph quality validation: DAG structure, cycle detection, orphaned-node detection, and
  connectivity analysis
- Educational theory and learning-science foundations that justify graph-based sequencing (Bloom's
  Taxonomy, constructivism, the zone of proximal development, cognitive load theory, mastery learning,
  knowledge space theory, backward design)
- Graph visualization, layout, and navigation using vis.js
- Generative AI workflows for producing and reviewing concept lists, dependency graphs, and taxonomies
- Personalization: adaptive learning paths, hyper-personalization, and recommendation engines built
  on top of a learning graph
- Intelligent agents that use a learning graph to customize lesson plans and generate textbook content
- Publishing and integrating learning-graph-driven content with Learning Management Systems (LMS)
- Using an agent skill (e.g. Claude Code) to automate the full learning-graph generation pipeline —
  course description scoring, concept list generation, dependency CSV creation, automated quality
  validation, taxonomy assignment, and iterative regeneration with human-in-the-loop review

## Topics Not Covered

- In-depth instruction in any single subject-matter domain used as a case study (e.g., full circuit
  design, Python programming, or geometry curricula) — these appear only as illustrative examples of
  learning graphs applied to a domain
- General machine learning or deep learning model training and fine-tuning
- Formal graph theory proofs or algorithmic complexity analysis
- Full LMS administration, IT deployment, or systems operations
- General web or JavaScript programming instruction beyond what is needed to read and customize a
  vis.js configuration
- Accreditation, certification, or institutional policy processes for adopting intelligent textbooks

## Learning Outcomes

After completing this course, students will be able to:

### Remember
*Retrieving, recognizing, and recalling relevant knowledge from long-term memory.*

- Define the terms concept, concept dependency graph (CDG), learning graph, node, edge, and
  Directed Acyclic Graph (DAG)
- List the stages of a learning-graph generation pipeline, from course description through concept
  enumeration, dependency mapping, taxonomy assignment, and validation to visualization
- Recall the metadata standards commonly used for concept labeling (SKOS, Dublin Core, ISO/IEC 11179)
- Identify the structural properties that make a graph a valid DAG (no cycles, no self-dependencies)
- Recall the six levels of the 2001 revised Bloom's Taxonomy and their associated action verbs

### Understand
*Constructing meaning from instructional messages, including oral, written, and graphic communication.*

- Explain why a DAG, rather than a linear table of contents, is the appropriate structure for
  sequencing prerequisite knowledge
- Describe how learning-science theories — constructivism, the zone of proximal development,
  cognitive load theory, and mastery learning — justify graph-based instructional sequencing
- Summarize how a generative AI tool can enumerate concepts and infer dependency relationships from a
  course description
- Distinguish foundational concepts, intermediate concepts, and goal (terminal) concepts within a
  learning graph
- Interpret a vis.js network diagram to identify prerequisite chains, bottleneck concepts, and
  orphaned nodes

### Apply
*Carrying out or using a procedure in a given situation.*

- Write a generative AI prompt that enumerates a distinct, non-duplicated list of concept labels for
  a new subject domain
- Construct a concept dependency CSV file that models prerequisite relationships between concepts
- Apply a concept taxonomy to classify concepts into 10–12 balanced, non-overlapping categories
- Configure vis.js node and edge properties (shape, color, physics, layout) to visualize a learning
  graph
- Run validation checks — cycle detection, orphaned-node detection, connectivity analysis — against a
  learning graph dataset
- Invoke an agent skill (e.g. Claude Code) to automatically generate a concept list, dependency CSV,
  taxonomy, and validated learning graph JSON from a course description

### Analyze
*Breaking material into constituent parts and determining how the parts relate to one another and to
an overall structure or purpose.*

- Analyze a learning graph to detect orphaned nodes, disconnected subgraphs, and cyclical dependencies
- Decompose a complex learning objective into its constituent prerequisite concepts
- Differentiate foundational, intermediate, and terminal concepts using indegree and outdegree metrics
- Examine a taxonomy distribution report to identify over-represented or under-represented categories
- Compare the trade-offs of force-directed versus hierarchical graph layouts for a given dataset size
  and audience

### Evaluate
*Making judgments based on criteria and standards through checking and critiquing.*

- Evaluate a generative-AI-produced concept list against criteria of distinctness, granularity, and
  pedagogical soundness
- Judge whether a course description contains sufficient breadth and depth to seed a 200+ concept
  learning graph
- Critique a learning graph's dependency structure for logical gaps or unjustified prerequisite claims
- Assess whether a concept taxonomy provides balanced, well-labeled, non-overlapping categories
- Justify a choice between a linear, hierarchical, or non-linear (rhizombic) learning path for a
  specified audience and learning goal
- Judge when a skill-generated learning graph needs human-in-the-loop review versus iterative
  regeneration before proceeding to chapter design

### Create
*Putting elements together to form a coherent or functional whole; reorganizing elements into a new
pattern or structure.*

- Design and validate an original concept dependency graph for a new course or professional training
  program
- Build an interactive vis.js visualization that lets learners explore prerequisite relationships
  within a learning graph
- Develop a generative-AI-driven workflow — prompts plus supporting scripts — that converts a course
  description into a validated learning graph JSON file
- **Capstone project:** Produce a complete learning graph (concept list, dependency graph, taxonomy,
  and validated JSON) for an intelligent textbook in the student's own professional domain, and use it
  to drive an intelligent agent that generates a personalized lesson plan
