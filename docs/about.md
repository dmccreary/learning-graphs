# About the Learning Graphs Website

The goal of this website is to enable teaching the concepts around [Learning Graphs](glossary.md#learning-graph).  It was inspired by the 1988 cyberpunk science fiction novel [The Diamond Age: Or, A Young Lady's Illustrated Primer](https://en.wikipedia.org/wiki/The_Diamond_Age) by Neal Stephenson.  In this novel, a child uses a tablet-like device called "The Primer" that generates customized stories in real-time to meet the needs of the child.  The stories get more sophisticated as the needs of the child mature.

This form of highly-customized learning is our goal.  We believe that learning graphs are the core data structure that these intelligent learning agents will be built on.

Today, there are no formal standards for Learning Graphs.  We hope that the resources on this site can enable an organization to publish
these learning graph interoperability standards.  See our chapter on [Validating Learning Graphs](./chapters/19-validating.md) for examples.

## Terminology

In this course, the term **learning graph** (lower cases) will
be used to describe the general topic of using concept graphs
to empower intelligent agents to generate customized content.

We will use the term **Learning Graph** to describe a JSON file
that conforms to our proposed Leaning Graph standard.

We will also use the term **Concept Dependency Graph** or CDG
to describe the general graph structure of these systems.

We also will be using [SKOS](glossary.md#skos) terminology to
describe Concepts.  When in doubt, we encourage you to use
the W3C SKOS definitions for concepts and their relationships.

## Integration with other Projects

This websites puts a focus on the creation and editing of learning
graphs for hyper-personalization of learning content.

It does not cover the following topics:

1. **Graph Algorithms** - Graph algorithms are used
to traverse a learning graph to build custom lesson plans.  For this topic please see the [Graph Algorithms](https://dmccreary.github.io/graph-algorithms/).  To leverage learning graphs, understanding dependency path finding algorithms is essential.
2. **LMS Integration** - We do not cover the topic of integrating learning graphs into [learning management systems](glossary.md#learning-management-system-lms).  For this topic please see the [Graph Learning Management Systems](https://dmccreary.github.io/graph-lms/)
3. **Systems Thinking** - learning graphs do not stand alone.  To be valuable they need to integrate with a complex network of other technologies that make up our educational systems.  To get exposure to Systems Thinking we encourage you to use the [Systems Thinking for Technologists](https://dmccreary.github.io/graph-systems-thinking/).  We feel that understanding the [Network Effect](https://dmccreary.github.io/graph-systems-thinking/archetypes/#network-effect) will help you understand how learning graph standards
can transform education.

In addition to these websites, we have also worked with specific subject-matter experts to create examples of learning graphs.
Please see the [Case Studies](./case-studies/index.md) section
for descriptions and links to these websites.

## What is a Learning Graph?

Learning Graphs are [concept dependency graphs](glossary.md/#concept-dependency-graph) that are used to:

1. Understand and visualize the important [concepts](glossary.md#concept) in a course and their dependencies.
2. Suggest [learning paths](glossary.md#learning-path) to achieve [learning objectives](glossary.md#learning-objective)
3. Serve as the core data structure for [hyper-personalization](glossary.md#hyper-personalization) of lesson plans by [generative AI](glossary.md#generative-ai) and other content such as [MicroSims](glossary.md#microsim) by [agents](glossary.md#agent).

## Course Learning Objectives

<!--
Please suggest 10 learning objectives for a course on learning graphs (concept dependency graphs or CDGs) using the Bloom Taxonomy.  These graphs are used to

1. Understand the important concepts in a course and their dependencies
2. Suggest learning paths to achieve learning objectives
3. Serve as the core data structure for hyper-personalization of lesson plans by generative AI agents when integrated with a Learning Management System

Make sure to cover how to use GenAI to find the concepts in a course, use GenAI to find concept dependencies, generate course concept taxonomies, view the graphs using tools like vis.js, edit the graphs, use the graphs to generate personalized lesson plans and build intelligent agents to use the CDGs to build hyper-customized lesson plans for each student.
-->

Here are 10 learning objectives for a course on learning **Concept Dependency Graphs (CDGs)** using Bloom's Taxonomy, aligned with the use of Generative AI (GenAI) for analyzing course content, creating concept taxonomies, visualizing, editing, and personalizing lesson plans:

### 1. **Remembering**:

**Identify the basic structure of Learning Graphs** used to model concepts and their dependencies in a course.  Understand the graph data model
and how concept dependency graphs (CDGs) are used to model
learning concept graphs.

*Example: Define the nodes and edges in a Learning Graph and recognize them in different graphical representations.*

### 2. **Understanding**:

**Explain how Learning Graphs represent the relationships between course concepts** and how they suggest learning paths based on these dependencies.

*Example: Describe how prerequisite concepts are connected to higher-level concepts within a learning graph.*

### 3. **Applying**:

**Use Generative AI to generate concepts lists or use NLP frameworks to extract key concepts from course materials** and generate a list of vertices (nodes) for building a learning graph.

*Example: Apply AI tools to analyze a syllabus or textbook and identify core concepts.*

### 4. Apply JavaScript Graph Libraries

Use [vis.js](glossary.md#visjs) (or similar tools) to visualize a
 Learning Graph** for a given set of concepts and dependencies.

-   *Example: Use vis.js to create an interactive graph of course concepts and their dependencies.*

### 5. Analyzing Dependencies

Analyze concept relationships using Generative AI to discover hidden dependencies that may not be immediately obvious from the course materials.

**Example:** Use an AI agent to uncover both direct and indirect concept dependencies based on patterns found in text data.

### 6. Evaluating

**Evaluate the quality of a generated learning graph** in terms of completeness, accuracy, and alignment with learning objectives.

**Example:** Critically assess a learning graph created by a user or an AI agent for coverage of all key topics and concept dependencies.

### 7.  Assess
Analyze personalized learning paths generated from a learning graph**, ensuring they meet the individual learning objectives of diverse student profiles.

**Example:** Review AI-generated personalized lesson plans for different student backgrounds and adjust if needed.*

### 8. Creating

**Use Generative AI to automatically generate concept lists, dependencies, and concept taxonomies** for a course, organizing concepts into hierarchical categories that represent broader topics.

**Example:** Create a hierarchical taxonomy of concepts in a data structures course using GenAI tools.

### 9.  Edit CGSs
Edit a CDG interactively to improve learning pathways**, adding or removing dependencies between concepts based on AI suggestions or instructor insights.

**Example:** Modify a CDG for a calculus course by adding missing concepts or removing unnecessary dependencies.

### 10.  **Design intelligent AI agents that use CDGs to generate hyper-personalized lesson plans**, adapting to each student's learning progress and needs.

**Example:** Build an AI system that integrates with a Learning Management System (LMS) to continuously update personalized learning paths based on the student's mastery of concepts.

### Summary

Each of these objectives integrates various levels of Bloom's Taxonomy (from remembering and understanding basic concepts to applying, analyzing, evaluating, and creating new knowledge) while leveraging Generative AI and CDGs to enhance the learning process.
