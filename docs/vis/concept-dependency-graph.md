# Concept Dependency Graph

[SampleConcept Dependency Graph for Ohm's Law](./concept-dependency-graph.html)

A Concept Dependency Graph is a specific type of graph that has the following properties.

1. Each Concept is represented by a vertex and all concepts have a short name called the "label".
2. By default circles are used to represent concepts in a graph.
2. To learn a new Concept, you must understand the prerequisite concepts called the dependant concepts.
3. Concepts each have a DEPENDS_ON directed link that points to what other Concepts any concept depends on.  To keep the chart ink smaller, the abbreviation "dep" is often used.
4. A course is a collection of Concepts that must be learned in an approximate order.
5. Every course has a collection of background foundational concepts that
should be mastered before the student takes the course.
6. Concepts that are prerequisites for the course often appear on the left
edge of the concept graph at a location of x=-300.
7. Advanced concepts often appear on the right at x=300
8. By convention, concrete physical concepts are lower in the graph and more abstract mathematical concepts are initially located toward the top of the graph.
9. When we want to focus on a concept, that concept is displayed in a larger font.

## Sample Prompt

```linenums="0"
Generate a vis.js application that shows what concepts must
be mastered before you understand Ohm's Law.

Use this graph data:

// create an array with nodes
    var nodes = new vis.DataSet([
        {id: 1, label: "Ohm's Law", color: "wheat", size: 150, x: 150, y: 0, fixed: true,font: { size: 24 }, color: {border: "black"}},
        {id: 2, label: 'Voltage', color: "tan"},
        {id: 3, label: 'Current', color: "tan"},
        {id: 4, label: 'Resistance', color: "tan"},
        {id: 5, label: 'Linear Equations', color: "coral", shape: "box", x: -150, y: 0, fixed: true}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 1, to: 2, arrows: 'to', label: 'DEPENDS_ON' },
        {from: 1, to: 3, arrows: 'to', label: 'DEPENDS_ON' },
        {from: 1, to: 4, arrows: 'to', label: 'DEPENDS_ON' },
        {from: 1, to: 5, arrows: 'to', label: 'DEPENDS_ON' }
    ]);
```