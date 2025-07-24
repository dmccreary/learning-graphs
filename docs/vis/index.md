# Vis.js Tutorials For Learning Graphs

This section provides guidelines for using the vis.js JavaScript library for
displaying and editing learning graphs.  We focus on the key features of
vis.js to support the following key features of a learning graph:

1. Automatic layout of concepts using a force-directed graph layout engine
2. Support for displaying legends
3. Support for using groups to display taxonomies
4. Clustering to hide group complexity

## Why vis.js for Learning Graph Networks

Although there are many JavaScript libraries
that display graph networks, vis.js has a good combination of
default features, sample code and an active developer community
that makes it a good fit for learning graph networks.

## Overview of Steps

## Learning Graph File Setup Steps

1. Use generative AI to generate a CSV file of a learning graph.
    1. Create a clear course description with prerequisites and goals using [Bloom's Taxonomy]
    1. Enumerate Concepts
    1. Find [Concept dependencies](../glossary.md#concept-dependency)
    1. Generate a taxonomy of concepts and place in groups section of a graph.json file
    1. Add a classifier to each Concept
    1. Validate the learning graph network
2. Convert this learning graph to JSON format.
3. Use an enricher to add group="1" to all [foundational concepts](../glossary.md#foundational-concepts) and group="12" to goals

## Learning Graph Visualization

1. Load graph data from a JSON file and the legend from groups.json
2. Log any problems such as missing foundation, goals or orphan nodes and set NODE_COUNT
3. Count the number of nodes and estimate the graph X-dimension CANVAS-WIDTH
4. Run the enrich_nodes() function which will:
    1. Add a x=-CANVAS_WIDTH/2 to foundation nodes and set the shape to "box"
    2. Add a x=CANVAS_WIDTH/2 to goal nodes and set the shape to be "star"

## Basic Properties of Nodes and Edges

### Lab 1: Default Behavior

[Lab 1: Default Behavior](lab-01.md)

### Lab 2 - JSON

Learn the JSON format

[Lab 2: Loading Data From JSON](lab-02.md)

### Lab 3 - Node Properties

Learn the Properties of a Node

[Lab 3: Node Properties](lab-03.md)

## Lab 4 - Edge Shapes

[Lab 4 - Edge Properties](./lab-04.html)

## Lab 5 - Custom Shapes

[Lab 5 - Custom Shapes](./lab-05.html)


## Examples

[Concept Dependency Graph](./concept-dependency-graph.md)

## Graph Editor

Learn how to create an interactive graph editor

[Graph Editor](./graph-editor/index.md)

## CSV-Reader

[CSV Reader](./csv-reader/index.md)

## Node Enricher

[Node Enricher](./node-enricher/index.md)

## Adding Legends

[Adding Legends](./legends/index.md)

## Editing Nodes and Edges

[Edit Nodes](./edit-nodes/index.md)

