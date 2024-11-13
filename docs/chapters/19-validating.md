# Validating Learning Graphs and Estimating Quality

If get access to learning graph for a specific topic, you might
what to ask, *"What is the overall quality of this learning graph?".*

Here are a few points to consider:

1. How many concept nodes are there in the graph?
2. Are the nodes all connected to the main graph?  How
many nodes are there without any edges? ("orphaned" nodes)
3. How many foundation nodes (no outgoing edges) are there and how many
goal nodes (no incoming edges) are there?
4. Is there metadata associated with the learning graph (title, creator, publication date, 3rd party validation) (see [Dublin Core](../glossary.md#dublin-core-metadata))
5. Is there a taxonomy or ontology associated with the concepts?
6. Is there a legend that is displayed with the learning graph?
7. Are there 3rd party certificates or reviews associated with the learning graph?

## Validating with a JSON Schema

Because JSON is a standard way of storing data that is loaded into a browser, it is convenient to use the [JSON Schema]()
