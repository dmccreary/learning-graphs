# Graph Editor

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

## References

[Sam Adams TinkerTiny Vis.js Graph Editor](https://github.com/metacognitive-technology/tinkertiny/tree/main) - an interesting UI.  One time code commit in 2022.