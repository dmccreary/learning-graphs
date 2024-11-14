# Graph Editor


[Run the Graph Editor v18](./graph-editor-18.html){ .md-button .md-button--primary }

[Integer Node ID](./int-node-id.html)

[Run the Graph Editor v17](./graph-editor-17.html)

[Graph Editor v16](./graph-editor-16.html)

[Graph Editor v15](./graph-editor-15.html)

[Graph Editor v14](./graph-editor-14.html)

[Graph Editor v13](./graph-editor-13.html)

[Graph Editor V12](./graph-editor-12.html)

[Run Graph Editor](graph-editor.html)

## Prompt

```linenums="0"
Please generate a graph network editor based on vis.js.  The editor should be able to do the following:

1. Open a graph network from a JSON file to an in memory structure.  Look for files with .json extensions.
2. Add, update and delete nodes and edges.
3. Edit various properties of the nodes and edges such as color, shape, size and image
4. Save the in-memory structure to the file or do a "Save As" to a new file
5. Allow the user to change and save global options

Upon reading the file, display statistics about what was in the file including node count and edge count.  Also display the count of orphaned nodes when a file is read.
Perform checks on data quality as a new file is opened such as edges without nodes.
```


## Graph Editor Check for Network

[Check for Network after Load of JSON data](./graph-editor-cfn.html)

## Adding Details to Node

```
What are the most common properties that a user sets on a node? I can think of the following: 
1. Label 
2. Title (for hover text) 
3. Shape (selected from a list of shapes) 
4. Size 
5. Background color (select from list) 
6. Edge color (select from list) 
7. x 
8. y 
9. Fixed location (checkbox) 

What other parameters might a person change? Update the JavaScript to allow all these parameters to be visible when creating a new node or updating a node.
```

## ChatGPT said:

In addition to the properties you've already listed, here are some other common node properties that users might want to set:

1.  **Image** (for image-based nodes, with a URL to an image)
2.  **Font** (size, color, face for the label)
3.  **Border Width** (controls the thickness of the node's border)
4.  **Border Color** (set separately from edge color, allows customization of node outline)
5.  **Opacity** (allows transparency on nodes)
6.  **Shadow** (option to add shadows for depth perception)
7.  **Group** (used to assign nodes into categories for different styles or behaviors)
8.  **Icon** (if using icons instead of labels)
9.  **Physics** (whether the node is affected by physics simulation)

### Updated JavaScript for Node Creation/Editing Form

Here is an updated version of your **graph-editor.js** that includes a form for setting all these parameters when creating or editing nodes:
## References

[Sam Adams TinkerTiny Vis.js Graph Editor](https://github.com/metacognitive-technology/tinkertiny/tree/main) - an interesting UI.  One time code commit in 2022.