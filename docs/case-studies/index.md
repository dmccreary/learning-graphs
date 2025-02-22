# Case Studies

Here are some case studies of Learning Graphs I have worked on with others.
The list is alphabetical and you will find that the maturity of
the on-line material varies widely based on the needs and resources of
each group I work with.  What they all share in common is that
they have a course description that was used to drive a generative
process to build a learning graph.

In general when we create a website using a
tool like mkdocs, we structure all the content under the ```docs```
directory.  Within docs we place our interactive simulations (MicroSim)
under the ```sims``` directory by convention.  I would suggest
creating a sim called ```graph-viewer``` inside the sims directory.

Many of the websites I setup also walk people through the process of
learning to write GenAI prompts to generate the first draft of
a learning graph.  If that is the case, the output of these
prompts is located in the ```docs/prompts/learning-graph`` area.

To be included in this list, I selected only projects that have
at least a 50-concept learning graph.  Some of the projects
have over 250 concepts and they continue to grow.

## Stages of Learning Graph

There are two paths we have seen.  Start with an existing textbook. Textbooks are usually oopyrighted by an
author and publisher.  So to keep out of legal issues, we don't have any examples of these.  But we know these exist.
If you do have an existing textbook or group of papers you can run them through an natural-language processing (NLP) tool to extract the entities, concepts and taxonomies.  These process are
well documented using the GraphRAG architectures.

These cases studies focus on pure knowledge extraction from large-language models.

## Steps Generative AI Driven

- **Course Description** - we usually start with a generic course description as it would appear in a course catalog
- **Bloom Taxonomy Refinements** - we refine the course description to fit Blooms't taxonomy which starts out with concept definitions and proceeds to creating hands-on skills for creating new content
- **Concept Enumeration** - create a flat list of about 150 concepts ideally sorted from simple to complex
- **Concept Dependencies** - for each concept, create a list of what other concepts it depends on
- **Concept Taxonomy** - for all the concepts, create about ten classifications for all the concepts
- **Concept Classification** -- for each Concept in the graph, assign it to a primary Taxonomy ID
- **Content Generation** - once you have your concepts organized, you can then use this knowledge to create various content

## Case Studies

### Beginning Electronics

This is the beginning of a new textbook on beginning electronics
we are building for junior-high school students.  It is based
on using a solderless breadboard and about $30 worth of various
electrical components.  We do not cover digital electronics
in depth and we assume that no oscilloscopes are available.
We try to have MicroSims that also simulate the behavior of the
parts on a breadboard.

* [Beginning Electronics](https://dmccreary.github.io/beginning-electronics/)
* [Learning Graph](https://dmccreary.github.io/beginning-electronics/sims/learning-graph/)

### Circuits

This was the course that I worked on with [Sharat Batra](https://www.linkedin.com/in/sharatbatra/)
at the University of Minnesota.  He has been an inspiration for me, helping me
understand the time-consuming nature of generating circuit diagrams, equations and
assessments in his daily teaching work.

* [Circuits](https://dmccreary.github.io/circuits/)
* [Circuits Learning Graph](https://dmccreary.github.io/circuits/prompts/knowledge-graph/graph/category-colors.html)

### Clocks and Watches

This is one of my favorite intelligent books.  The goal is to teach
the principals of computational thinking using fun and low-cost projects
which are timekeeping devices built with the low-cost ($4) Raspberry Pi Pico.

* [Clocks and Watches](https://dmccreary.github.io/clocks-and-watches/)
* [Learning Graph for Clocks and Watches](https://dmccreary.github.io/clocks-and-watches/sims/learning-graph/)

### Data Science

* [Data Science](https://dmccreary.github.io/data-science-course/)
* [Data Science Learning Graph](https://dmccreary.github.io/data-science-course/sims/learning-graph/view-graph.html)

## Deep Learning

[Deep Learning with AI](https://dmccreary.github.io/deep-learning-course/)
[Deep Learning Learning Graph](https://dmccreary.github.io/deep-learning-course/sims/learning-graph/)

## Geometry

This is a classic high school geometry course that lends itself to visual thinking.

* [Geometry Course](https://dmccreary.github.io/geometry-course/)
* [Geometry Course Graph Viewer](https://dmccreary.github.io/geometry-course/sims/graph-viewer/graph-viewer.html)

### Graph Algorithms

This website is based on the graph algorithms course I developed for my hands-on graph courses in my consultant practice.  I was fortunate to develop graph database related courses that over 3,000 people have taken in the past.
The core courses were actually an introduction to graph databases which was an online self-paced course
and an instructor-led Hands On Graph course that used TigerGraph.  I hope to work
with volunteers to get those courses in the public domain sometime in the future.

* [Graph Algorithms](graph-algorithms.md)
* [Learning Graph for Graph Algorithms](https://dmccreary.github.io/graph-algorithms/sims/learning-graph/view-graph.html)

### Building Intelligent Textbooks

This is a hands-on guide to using the mkdocs-material tools to build an intelligent textbook.
It includes a detailed getting started guide for people that are new to the
book building process and the ```mkdocs``` document build system.  Our
focus in getting books to the 2.9 level.

* [Intelligent Textbooks](https://dmccreary.github.io/mkdocs-for-intelligent-textbooks/)
* [Learning Graph for Intelligent Textbooks](https://dmccreary.github.io/mkdocs-for-intelligent-textbooks/sims/learning-graph/)

### Learning Graph

This is a learning graph for creating learning graphs.  Yes, it is a bit of a recursive definition, but
this learning graph has helped me fill in the gaps of this website and put more focus
when a concept needs to be explain clearly for others to participate in the process
of building intelligent online textbooks.

* [View Learning Graph for Learning Graphs](../sims/learning-graph/index.md)

### MicroPython

This is based on the course that I developed with the help of [Jim Tannenbaum](https://www.linkedin.com/in/jetannenbaum/).  Jim has also used these courses in his volunteer work in schools.

One note about this course, the goal of the course are to teach computational thinking in junior high and high school students.  But we have found that the best way to teach these skills is through project-based learning
where students create what they are most curious about.  So having a rich curriculum full of projects
that drive colorful moving lights and drive robots is our best way to get these concepts into the classroom.

- [MicroPython Info Page](./micropython.md)

Teaching Computational Thinking with MicroPython
[MicroPython Learning Graph](https://dmccreary.github.io/learning-micropython/sims/learning-graph/graph/dep-graph.html)

### MicroSims

This course was inspired by the wonderful [Val Lockhart](https://www.linkedin.com/in/valockhart/) and [Troy Peterson](https://www.linkedin.com/in/troyapeterson/).  Val was the one that coined the term "MicroSim" and showed
that by combining generative AI with the p5.js system that instructors could create
fantastic interactive simulations.
MicroSims are small interactive simulations that run in a browser and are created and modified by generative AI systems
for use in classroom instruction.

- [MicroSims Website](https://dmccreary.github.io/microsims/)
- [MicroSims Learning Graph](https://dmccreary.github.io/microsims/sims/concept-graph/concept-graph.html)

<<<<<<< HEAD
### Signal Processing
=======
## Python

[Beginning Python](https://dmccreary.github.io/python/)

## Signal Processing
>>>>>>> origin/main

This course came about in collaboration with [Jarvis Haupt](https://cse.umn.edu/ece/jarvis-haupt) at the University of Minnesota Department of Electrical and Computer Engineering.  Jarvis has been instrumental at encouraging others at the University of Minnesota to take a leadership role in the integration of generative AI into their courses.

- [Signal Processing Website](./signal-processing.md)
- [Signal Processing Learning Graph](https://dmccreary.github.io/signal-processing/sims/graph-viewer/view-graph-v3.html)

### Systems Thinking

This is one of my favorite courses.  It was originally inspired by my friend [Arun Batchu](https://www.linkedin.com/in/arunbatchu/).  I have taught this course to a wide variety of audiences including variations for teams
trying to break down silos within organizations.

[Systems THinking Course Website](https://dmccreary.github.io/graph-systems-thinking)

[Learning Graph for Systems Thinking](https://dmccreary.github.io/graph-systems-thinking/prompts/knowledge-graphs/graph/category-colors.html)

