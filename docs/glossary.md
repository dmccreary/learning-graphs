# Glossary of Terms

This glossary was create with the help of ChatGPT using a
prompt that uses the ISO IEC 11179 standard for creating
precise, concise, distinct and non-circular definitions.
<!--
https://chatgpt.com/share/6732155f-1e6c-8001-994f-f6371995777d
-->
#### Adaptive Algorithm

A computational method designed to adjust its parameters or behavior based on real-time input or changing conditions.

**Example:** An adaptive algorithm in a learning system adjusts question difficulty based on the student’s response accuracy.

#### Adaptive Learning

A method of delivering personalized learning experiences by dynamically adjusting the content, pace, and instructional approach in response to an individual learner's performance, needs, and preferences.

**Example:** An adaptive learning system uses a concept graph to create customized content for a student. After analyzing the student’s responses to assessment questions, the system identifies specific areas where the student needs more practice. Based on the student's performance and the relationships between concepts in the graph, it selects appropriate materials, such as videos, exercises, or explanations, focusing on strengthening the weaker concepts before advancing to more complex topics. The system continually updates the content based on the student's progress.

#### Agent

An autonomous entity capable of perceiving its environment, processing inputs, and taking actions to achieve specific goals or objectives, often with the ability to adapt or learn from experience.

**Example:**  An intelligent agent in an educational platform uses a learning graph to create a customized lesson plan for students. Based on the results of the prior week's quiz and a predefined learning objective, the agent identifies key concepts where students struggled and selects activities that reinforce those concepts. The lesson plan adapts to each student's individual learning needs, ensuring that the content aligns with their current understanding and progress.

* Also known as: Intelligent Agent

#### Agent Characteristics

The main characteristics of learning graph intelligent agents.

This characteristics include:

**Autonomy and Decision-Making:** Intelligent agents can operate independently, making decisions to achieve goals, unlike LLMs, which respond only to prompts.

**Iterative Workflows:** Intelligent agents refine their outputs through repeated cycles, while LLMs do not improve iteratively without external integration.

**Tool Use and Environmental Interaction:** Intelligent agents interact with external tools and environments, whereas LLMs lack this capability.  Specifically, in this course, agents must be able to access a learning graph and generate learning paths for lesson plan customization.

**Modular Design and Multi-Agent Collaboration:** Intelligent agents can work in multi-agent systems, solving complex problems together, unlike LLMs, which work in isolation.

#### Alternate Label

A synonym or alternative term used to represent the same concept within a given context, providing additional ways to reference or describe the concept without altering its meaning.

**Example:** In a learning system, alternative labels are used to provide alternate names for learning concepts. For instance, the concept of "addition" in mathematics may have alternative labels such as "summing" or "totaling." These alternative labels allow students or teachers to reference the same concept using different terminology, accommodating variations in language or teaching style without changing the underlying concept.

#### Bloom's Taxonomy

![blooms-taxonomy](./img/blooms-taxonomy.png)

A hierarchical model used to classify educational learning objectives into levels of complexity and specificity. The taxonomy progresses from basic knowledge recall to higher-order thinking skills such as evaluation and creation.

Example: In a graph theory course, applying Bloom’s Taxonomy could involve starting with defining basic terms like “node” and “edge,” progressing to analyzing graph structures, and culminating in designing algorithms for solving graph-based problems.

#### Cluster

A group of nodes in a graph that are more densely connected to each other than to nodes outside the group.

**Example:** In a social network graph, a cluster might represent a group of friends who frequently interact with one another.

#### Concept

A fundamental unit of knowledge, representing an abstract idea or a mental construct that can be described, categorized, and related to other concepts within a domain.

**Example:** In an educational setting, the concept of "photosynthesis" represents the process by which plants convert light energy into chemical energy, and it can be related to concepts such as "sunlight," "chlorophyll," and "carbon dioxide."

#### Concept Dependency

A relationship between two or more concepts where the understanding of one concept is required before another can be fully understood or applied.

**Example:** The concept of "multiplication" is dependent on the understanding of "addition," as multiplication is often described as repeated addition. Therefore, "addition" is a prerequisite for learning "multiplication."

#### Concept Dependency Graph

A visual representation of the relationships between concepts, where nodes represent individual concepts and directed edges indicate dependencies between them, showing how the mastery of one concept is necessary before another.

**Example:** In a concept dependency graph for an algebra course, "solving linear equations" may depend on the prior understanding of "basic arithmetic operations" and "variables." This graph helps to design learning paths for students based on their current knowledge.

#### Constructivism

A learning theory suggesting that learners build their understanding
and knowledge best through active experiences and reflection.

**Example:** Constructivism is applied when students participate in
hands-on experiments to understand scientific principles.

#### Dependency

A relationship between two entities where one entity relies on the other for its function, understanding, or completion.

**Example:** In a learning graph, "multiplication" depends on the understanding of "addition," as it is built upon repeated addition.

#### Directed Graph

A graph consisting of nodes (vertices) connected by edges (arcs) that have a specific direction, indicating a one-way relationship between the nodes.

**Example:** A directed graph representing traffic flow in a city could have intersections as nodes and one-way streets as directed edges, showing how vehicles can travel from one intersection to another.

#### Dublin Core Metadata

A standardized set of 15 metadata elements used to describe and catalog digital resources, making them easier to find, manage, and share.

In a learning graph file, Dublin Core Metadata is used to annotate the
publication information associated with the file. This ensures consistent organization and enhances discoverability of resources across the platform.

**Example:** The learning graph for “Graph Algorithms” with Dublin Core Metadata elements such as Title (“Introduction to Graph Algorithms”), Creator (“Dan McCreary”), and Subject (“Computer Science”).

#### Feedback Loop

A cyclical process in which the output of a system influences its input, often used to improve performance or adapt to changes.

**Example:** An adaptive LMS uses a feedback loop of monitoring snd assessments to refine content based on student performance and engagement.

#### Foundational Concepts

Basic or essential concepts that serve as the building blocks for understanding more complex ideas or advanced knowledge within a domain.

**Example:** In mathematics, "number sense" and "basic arithmetic" are foundational concepts for understanding more advanced topics such as algebra and calculus.

#### Generative AI

A type of artificial intelligence capable of producing new content, such as text, images, or other data, by learning patterns from existing data and generating outputs that follow those patterns.

**Example:** A generative AI model can create personalized learning materials by analyzing a student's previous responses and generating explanations, questions, or study guides tailored to their learning progress.

#### Graph Representation

The visualization or modeling of data in graph format, where nodes represent entities and edges represent relationships.

**Example:** A graph representation of a transportation network shows cities as nodes and roads as edges.

#### Hyper-Personalization

The process of creating highly individualized experiences or content by leveraging advanced data analysis and machine learning to tailor recommendations, content, and interactions based on unique characteristics of the user.

**Example:** In an online learning platform, hyper-personalization is used to generate lesson plans based on a student's learning preferences, quiz performance, and real-time concept mastery, creating a unique learning path for each student.

#### Hierarchy

An organizational structure where entities are ranked or ordered based on predefined criteria, such as complexity or dependency.

**Example:** In Bloom’s Taxonomy, educational objectives are organized hierarchically, from basic knowledge recall to advanced 

#### Interactive Visualization

A graphical representation of data or concepts that allows users to explore and manipulate elements for deeper understanding.

**Example:** An interactive visualization of a learning graph enables students to click on nodes to view associated resources and dependencies.

#### ISO Definition

A term definition is considered to be consistent with ISO/IEC 11179 metadata registry guideline if it meets the following criteria:

1. Precise
2. Concise
3. Distinct
4. Non-circular
5. Unencumbered with business rules

#### JavaScript Object Notation (JSON)

A lightweight, text-based data interchange format used to store and transmit structured data.

In the field of learning graphs, JSON is commonly used for data representation, including storing concept nodes, edges, groups, and
learning graph metadata. JSON’s simplicity and compatibility with JavaScript make it ideal for integration with tools like MicroSims, p5.js and
vis.js.

#### JSON Schema

A file of rules in JSON format that allows you to annotate and validate the structure of JSON documents.

**Example:** In a graph theory course, a JSON schema could define the structure for graph data, ensuring that each node has a unique identifier, and edges include both source and target nodes with specified attributes.

#### Journey Map

![Journey Map for Python](./img/journey-map-python.png)

A visual or structured representation of an individual's experience as they move through a sequence of steps, interactions, or stages to achieve a specific goal, often used to identify [touchpoints](#touchpoint), challenges, and opportunities for improvement.

**Example:** A journey map for a student's learning process can be derived from a learning concept graph. For instance, the graph shows the required concepts to master "calculus," such as "basic arithmetic" and "algebra." A journey map can be created that outlines the student's progression through these concepts, highlighting key milestones, struggles, and recommended interventions at each stage to ensure the successful understanding of calculus.

#### Knowledge Graph

A structured representation of knowledge in graph form, consisting of nodes (entities) and edges (relationships) to facilitate understanding, querying, and reasoning.

**Example:** A knowledge graph of historical events connects key figures, dates, and places to provide contextual insights

#### Learning Graph

A network graph that stores learning [Concepts](#concept) and their dependencies.

Learning graphs are a type of [Directed Graphs](#directed-graph) where every node is a learning Concept and every edge is a concept dependency or prerequisite.

#### Learning Management System (LMS)

A software platform designed to deliver, manage, and track educational content and activities, enabling learners to access courses, assessments, and other instructional resources, while providing tools for instructors to monitor progress and performance.

**Example:** An LMS can use a learning graph to create customized lesson plans by analyzing a student's performance on past quizzes and identifying gaps in their understanding. For example, if a student demonstrates a weak grasp of "fractions" in a math course, the LMS can automatically adjust the lesson plan by offering additional exercises, videos, or tutorials on that specific concept before progressing to more advanced topics like "algebra." This personalized approach ensures that each student follows a learning path tailored to their individual needs.

#### Learning Objective

A specific, measurable goal that defines what a learner should know or be able to do by the end of a lesson, course, or training program.

**Example:** A learning objective for a biology class might be: "Students will be able to explain the process of cellular respiration and identify its stages."

#### Learning Path

A structured sequence of learning activities, materials, or modules designed to guide a learner through progressively more advanced content to achieve a specific learning goal.

**Example:** A learning path for mastering algebra might start with basic arithmetic, followed by lessons on solving equations, and then advance to systems of equations and quadratic functions.

#### Learning Resource

Any material, tool, or content used to facilitate learning, such as books, videos, simulations, or lesson plans.

**Example:** An interactive video on the water cycle serves as a learning resource for an environmental science course.

#### MicroSim

A small stand-alone educational simulation of a concept.  MicroSims
are designed to be easy for generative AI agents to create and
modify to accommodate the individual needs of students.

See also: [MicroSims Website](https://dmccreary.github.io/microsims/)

#### Node Group

A collection of interconnected nodes within a graph that share common characteristics or relationships, often treated as a unit for analysis or visualization.

**Example:** In a concept dependency graph, a node group could represent all the foundational concepts needed for understanding calculus, such as "algebra," "trigonometry," and "functions."

* Also know as: Community
* Also know as: Cluster

#### Ontology

A formal representation of knowledge as a set of concepts within a domain and the relationships between those concepts.

**Example:** In a learning graph, an ontology may define the relationships between mathematical concepts like “algebra” and “geometry.

#### Preferred Label

The primary or most commonly used name assigned to a [Concept](#concept) in a graph or ontology, intended to standardize references to that concept.

**Example:** In a graph theory course, the preferred label for a concept might be "Bipartite Graph," while alternate labels could include "Two-Part Graph."

In general, a concept has one and only one preferred name per language such as English, but a Concept
may have many alternate labels.

Within a learning graph, no two Concepts should have the same preferred name.

#### Real-Time Analytics

The immediate analysis of data as it is collected, enabling real-time insights and decision-making.

**Example:** A learning management system uses real-time analytics to monitor a student’s quiz performance and adapt subsequent content.

#### Rhizombic Learning

An educational model inspired by the way rhizomes grow and spread, allowing for non-linear, interconnected, and expansive pathways of knowledge acquisition.

The Rhizombic Learning approach contrasts with traditional hierarchical or linear models, focusing instead on exploration, connection, and adaptability.  Learning graphs are ideal
tools to encourage the curious leaner.

#### Prerequisite Chain

A sequence of concepts or courses that must be mastered in a specific order to achieve a learning objective.

**Example:** In mathematics, the prerequisite chain might include arithmetic before algebra, followed by calculus.

#### Scaffolding

A teaching method that provides structured support to help learners progress toward independence in mastering a concept or skill.

**Example:** A teacher uses scaffolding by providing step-by-step guidance for solving equations, gradually reducing support as students gain confidence.

#### Scale-Free Network

A type of network characterized by a power-law degree distribution, where a few nodes (hubs) have a significantly higher number of connections compared to most other nodes.

In the graph LMS, the concept of a scale-free network can describe how certain key concepts or resources (hubs) are highly connected to other learning elements. This insight is useful for optimizing learning paths and prioritizing the development of foundational or widely-used resources.

**Example:** The LMS identifies "Basic Algebra" as a hub in the learning graph because it is a prerequisite for multiple advanced concepts, demonstrating the scale-free nature of the learning graph.

#### Simulation

A computer-based or interactive program that models real-world processes or systems for educational purposes.

**Example:** A physics simulation allows students to adjust variables like gravity and observe the effects on a pendulum.

#### Skill Gap

The difference between a learner’s current capabilities and the required skills or knowledge to achieve a specific goal.

**Example:** A skill gap analysis reveals that a student needs to improve problem-solving skills before advancing to calculus.

#### SKOS

A W3C standard for representing structured knowledge in a simple, machine-readable format, allowing for the sharing and linking of controlled vocabularies, taxonomies, thesauri, and other knowledge organization systems across different systems and applications.

**Example:** SKOS can be used to exchange learning graphs by encoding the relationships between educational concepts as a set of SKOS concepts and properties. For instance, a graph that shows the dependency between "basic arithmetic," "algebra," and "calculus" can be expressed using SKOS, with "broader" and "narrower" properties to define the hierarchy and concept relationships. This allows different educational platforms to share and reuse the same structure for organizing learning materials.

Note that SKOS is ideal for storing taxonomies and ontologies, but is not use for showing learning order dependencies.

* Also Known as: Simple Knowledge Organization System

#### Touchpoint

An interaction or moment of engagement between a learner and a learning management system (LMS), typically associated with key stages in the learning process where progress, feedback, or guidance is provided.

Example: In a learning management system built around a learning graph, touchpoints occur when a student completes a quiz, views instructional content, or seeks help on a specific concept. By analyzing these touchpoints, instructors can identify where students frequently encounter difficulties or disengage. Touchpoint analysis might reveal that many students struggle with "fractions" before advancing to "algebra," allowing instructors to redesign the course by adding additional resources or alternative explanations at that critical stage, improving student success.

#### Vis.js

A JavaScript library for visualizing graph networks.

See: [https://visjs.github.io/vis-network/docs/network/](https://visjs.github.io/vis-network/docs/network/)


#### YML

A human-readable data serialization format often used for configuration files and data exchange. YML (YAML Ain't Markup Language) structures data hierarchically using indentation, making it suitable for describing learning graph configurations and settings in a clear, concise way.

**Example:** The [mkdocs](https://www.mkdocs.org/) system uses a configuration file called mkdocs.yml to generate the content of a microsite.  See the mkdocs for this site as an example: [https://github.com/dmccreary/learning-graphs/blob/main/mkdocs.yml](https://github.com/dmccreary/learning-graphs/blob/main/mkdocs.yml)

#### Zone of Proximal Development (ZPD)

The range of tasks or concepts that a learner can accomplish with guidance but not yet independently. This concept, introduced by Lev Vygotsky, highlights the importance of targeted assistance in learning.

In a learning graph, the ZPD is used to guide real-time personalization by identifying concepts that a student is ready to learn with support. A LMS leverages data analytics and AI to dynamically adjust content, ensuring it remains within the student's ZPD.

**Example:** The LMS identifies that a student struggling with graph traversal is within their ZPD for mastering depth-first search and provides an interactive simulation to bridge the gap.