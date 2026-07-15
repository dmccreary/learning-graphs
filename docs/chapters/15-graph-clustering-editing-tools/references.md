# References: Graph Clustering and Editing Tools

1. [Community structure](https://en.wikipedia.org/wiki/Community_structure) - Wikipedia - Explains how nodes in a network naturally group into densely connected sets with sparser connections between groups, the network-science concept underlying this chapter's Graph Cluster and Domain Attribute-based clustering.

2. [JSON](https://en.wikipedia.org/wiki/JSON) - Wikipedia - Describes the JavaScript Object Notation data-interchange format, its object/array syntax, and its role as the dominant web data format, the exact file format this chapter's JSON Graph Import and JSON Graph Export round-trip through.

3. [Data validation](https://en.wikipedia.org/wiki/Data_validation) - Wikipedia - Covers the general principles of confirming data correctness, including structural and consistency checks, directly relevant to this chapter's Data Validation on Import and Orphaned Node Detection routines.

4. Data Clustering: Algorithms and Applications - Charu C. Aggarwal, Chandan K. Reddy (eds.) - CRC Press - A comprehensive survey of clustering algorithms and their evaluation, providing the theoretical grounding for grouping related nodes into a Graph Cluster represented by a single Composite Node.

5. Designing Data-Intensive Applications - Martin Kleppmann - O'Reilly Media - Covers data serialization formats like JSON, schema evolution, and data integrity, relevant background for this chapter's JSON Graph Import/Export round-trip and its Data Validation on Import checks.

6. [Clustering Methods](https://visjs.github.io/vis-network/docs/network/#methodClustering) - vis.js - Official documentation of `cluster()`, `openCluster()`, `isCluster()`, and `getNodesInCluster()`, the exact API this chapter uses to implement Graph Cluster, Composite Node, and Cluster Expand/Collapse.

7. [Network Manipulation Documentation](https://visjs.github.io/vis-network/docs/network/manipulation.html) - vis.js - Documents the `manipulation` options block that powers the Graph Editor's toolbar for adding, editing, and deleting nodes and edges, including the `editNode`/`editEdge` callbacks behind this chapter's property editors.

8. [Connected Components in an Undirected Graph](https://www.geeksforgeeks.org/dsa/connected-components-in-an-undirected-graph/) - GeeksforGeeks - Explains DFS, BFS, and disjoint-set approaches for finding connected components and isolated vertices, the graph-theory basis for this chapter's Orphaned Node Detection algorithm.

9. [Introducing JSON](https://www.json.org/json-en.html) - JSON.org - The canonical specification of JSON's object and array syntax, useful as a precise reference when writing or debugging the `.json` files this chapter's Node Enricher Script and Graph Editor read and write.

10. [Using files from web applications](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications) - MDN Web Docs - Documents the browser `FileReader` API for reading a user-selected file's contents as text, the exact mechanism this chapter's JSON Graph Import example uses to load a `.json` file into the DataSets.
