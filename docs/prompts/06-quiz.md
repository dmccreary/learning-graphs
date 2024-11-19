# Learning Graph Quiz

## Sample Prompt for Multiple-choice Qustions

~~~linenums="0"
I am preparing a review quiz for a course called "Learning Graphs."
For the network graph concept of the term "degree," create a four-answer
multiple-choice questions, the definition of the term "degree."  Create three
plausible destructor answers that are incorrect but have a
similar form to the correct answer.  Use the following format:

#### Question 1

What is the "degree" of a node in a graph?

```markdown {.upper-alpha}
1. Response 1
2. Response 2
3. Response 3
4. Response 4
```

??? note "Show Answer"
    The correct answer is **LETTER**.  Explanation of answer text.
~~~

## Sample Responses

#### Self Assessment Question 47

What is the "degree" of a node in a graph?

```markdown {.upper-alpha}
1. The shortest path between two nodes in the graph
2. The total number of edges connected to the node
3. The number of nodes directly reachable from the node
4. The maximum number of edges any node in the graph has
```

??? Question "Show Answer"
    The correct answer is **B**. The degree of a node in a 
    graph is the total number of edges connected to that node. 
    For undirected graphs, this includes all edges, while for 
    directed graphs, it can be further classified into in-degree 
    (edges coming into the node) and out-degree (edges going
    out of the node).

#### Learning Graph Representation

Learning Graphs are a represented as a concept dependency graphs
True or False??

??? Question "Show Answer"
    **True:**  Learning Graphs stored as a graph of concept where
    each concept has an edge to the concepts that must be
    understood before you can understand that concept.

#### Question 2

True or False: Learning Graphs are used to create custom learning plans.

??? Question "Show Answer"
    **True:**  Learning Graphs can find all the dependent concepts
    for a given concept so they are ideal for generating a listed
    of all unmastered concepts that a concept depends on.
    

#### Question 3

True or False: Within a Learning Graph course, all concepts must have other 
concepts listed that they depend upon.

??? Question "Show Answer"
    **False:**  Foundation concepts, also called prerequisites 
    concepts, do not have dependencies listed for a given course.

## Render Test 2 Superfences

::: {.upper-alpha}
1. Response 1
2. Response 2
3. Response 3
4. Response 4
:::

## Render Test 3 Superfences

::: {:.upper-alpha}
1. Bla Bla Bla
2. Bla Bla Bla
3. Bla Bla Bla
4. Bla Bla Bla
:::


