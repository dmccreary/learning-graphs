# Learning Graph Quiz

## Sample Prompt for Multiple-choice Questions

```
You are an expert in creating high-quality multiple-choice
questions for knowledge assessments. Your goal is to create
a single multiple-choice question that evaluates understanding
of a specific concept. The question must meet the following
requirements:

1. The question should assess a clearly defined and specific concept or skill. 
2. Provide four possible responses labeled **A.**, **B.**, **C.**, and **D.**.
3. **One response** should be **correct**, clearly aligned with the concept being assessed.
4. The other **three responses** should be plausible distractors, designed to be reasonable but incorrect. They should reflect common misconceptions or errors that someone learning the material might make.

Here is the structure for your response:

#### Concept being assessed

Question text

<div class="upper-alpha" markdown>
1. First item (A)
2. Second item (B)
3. Third item (C)
4. Fourth item (D)
</div>

??? question "Show Answer"
    The correct answer is **LETTER**.
    Explanation - Provide a brief explanation for why the correct
    answer is right and why the distractors are incorrect.

Make sure the language used is clear, concise, and appropriate for
the target audience. Here’s an example of how you should respond:

#### Definition of Degree of a Node

What is the "degree" of a node in a graph?

<div class="upper-alpha" markdown>
1. The shortest path between two nodes in the graph
2. The total number of edges connected to the node
3. The number of nodes directly reachable from the node
4. The maximum number of edges any node in the graph has
</div>

??? Question "Show Answer"
    The correct answer is **B**. The degree of a node in a 
    graph is the total number of edges connected to that node. 
    For undirected graphs, this includes all edges, while for 
    directed graphs, it can be further classified into in-degree 
    (edges coming into the node) and out-degree (edges going
    out of the node).
```

## Sample Responses

#### Self Assessment Question 47

What is the "degree" of a node in a graph?

<div class="upper-alpha" markdown>
1. The shortest path between two nodes in the graph
2. The total number of edges connected to the node
3. The number of nodes directly reachable from the node
4. The maximum number of edges any node in the graph has
</div>

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

## References

[Workera Blog Post on Learning Assessments](https://workera.ai/blog/chatgpt-learning-assessments)
