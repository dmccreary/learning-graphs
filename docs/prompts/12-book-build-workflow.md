# Book Build Workflow

Use the mermaid-generator skill to create a new workflow diagram MicroSim.
The MicroSim directory is book-build-workflow
It is a top-down workflow.
It is designed to be in an iframe of a textbook.
It has minimal padding and margins.
The background for the containers are all aliceblue.
Use light pastel colors for the background of each element in the workflow starting with light red, light, orange, yellow etc.
Here are the elements of the workflow.

Course Description -> Learning Graph
Learning Graph -> Chapter Structure
Chapter Structure -> Chapter 1
Chapter Structure -> Chapter 2
Chapter 1 -> Content Complete
Chapter 2 -> Content Complete
Content Complete -> Glossary
Glossary -> FAQ
FAQ -> Quizzes
Quizzes -> References
Content Complete -> Diagrams
Diagrams -> Book Metrics
References -> Book Metrics

Use the following background colors:

Course Description: MistyRose
Learning Graph: PeachPuff
Chapter Structure: LightYellow
Chapter 1: Honeydew
Chapter 2: PaleTurquoise
Content Complete: AliceBlue
Glossary: Lavender
FAQ: LavenderBlush
Quizzes: BlanchedAlmond
References: MintCream
Diagrams: LightCoral
Book Metrics: Plum

Make sure that the height or the iframe contains the entire diagram.
Make sure that scrolling="no" is in the iframe.
Do not put any style attributes in the iframe.
Do not put any zoom or pan controls in the diagram.
Center the title in h1 and h2 at the top of the diagram.

h1, .subtitle {
    text-align: center;
}


Add the following tooltips:

Course Description: Run the course-description-analyzer skill to get a quality score
Learning Graph: Run the learning-graph-generator skill to generate the learning graph
Chapter Structure: Run the book-chapter-generator skill to partition the graph into chapters
Chapter 1: Run the chapter-content-generator skill to generate content for chapter 1
Chapter 2: Run the chapter-content-generator skill to generate content for chapter 2
Content Complete: This is the state when all chapters have been generated
Glossary: Run the glossary-generator skill
FAQ: Run the faq-generator skill
References: Run the references skill
Diagrams: Run microsim-matcher on each diagram details description and try the best match
Book Metrics: Run the bk-generate-book-metrics shell scripts


When finished, add the following line to the MicroSims area of the nav element in mkdocs.yml

    - Book Build Workflow: sims/book-build-workflow/index.md

Write a detail of the session to logs/book-build-workflow-YYYY-MM-DD.md

