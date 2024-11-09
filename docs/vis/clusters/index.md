# Clustering in Graph Visualization

Network diagrams can quickly get vary complicated.  As the number of vertices gets
larger, the network becomes more difficult to view and see key
relationships.  We need ways to quickly collapse a group
of nodes into a single symbol to reduce complexity.  The primary tool we
used to do this is called a graph node [cluster](../../glossary.md#cluster).

## What is a Cluster?

In graph theory, a cluster in is a **composite node** that encapsulates a group of related nodes and their connections, formed based on specific criteria, to simplify and enhance the visualization of network diagrams. It serves as an interactive element that can be expanded or collapsed, allowing users to explore the network at different levels of detail while reducing visual complexity.

## Why Use Clusters?

- **Representation of Grouped Nodes**: A cluster acts as a **higher-level abstraction**, encapsulating several nodes (and their edges) into one composite node. This helps in visualizing the network at different levels of detail.

- **Formation Criteria**: Clusters are formed based on **specific conditions or attributes** of the nodes, such as shared properties (e.g., a common `domain` attribute), connectivity patterns, or spatial proximity.

- **Interactivity**: Clusters are **interactive** elements in the network graph. Users can **expand (open)** a cluster to reveal the individual nodes it contains or **collapse** them back into a single cluster node. This dynamic interaction allows for exploration of the network at varying granularities.

- **Visual Simplification**: By clustering nodes, the network diagram becomes **less cluttered**, making it easier to understand the overall structure and relationships without being overwhelmed by too many individual elements.

- **Simplifies Complex Networks**: Clustering reduces the number of visible nodes and edges, making large and complex networks more manageable and understandable.

- **Improves Performance**: By displaying fewer elements, rendering performance is enhanced, leading to smoother interactions, especially with large datasets.

- **Enhances User Experience**: Interactive clustering allows users to focus on areas of interest within the network, drilling down into clusters for detailed information or zooming out for an overview.

- **Facilitates Data Analysis**: Grouping related nodes helps in identifying patterns, relationships, and hierarchical structures within the network data.

### Example: Domain Clusters

In the following example, we will show how different sections of a large graph
data model can be grouped into clusters.  We call each grouping of related vertex types a **domain**.

When we build large complex data models, we would ideally like is to be able to group the nodes
into domains of similar items.  For example, Location, Address, City, State and Country
might all be in the **geospatial** domain.  Content that is converted into Documents, DocumentSections, DocumentChunks, Entities and Concepts are part of the **lexical** domain.

- **Clustering by Attribute (`domain`)**: Nodes that share the same `domain` attribute are merged into a cluster. For instance, all nodes with `domain: 'A'` are grouped into a cluster labeled **'Cluster A'**.

- **Cluster Node Properties**: The appearance of the cluster node can be customized (e.g., shape, size, color, label placement) to distinguish it from regular nodes and to convey meaningful information about the grouped nodes.

- **Re-collapsing Clusters**: The code allows for clusters to be **re-collapsed** by double-clicking on any node that was part of an expanded cluster, enhancing the interactive exploration of the network.

## Lab 1: Working Interactive Clustering Examples with vis.js

This next section assumes you know about the way that graphs are represented
in JSON in the vis.js library.  See out [Intro to Vis.js](../../library-analysis/vis/index.md)

Here is an example of a flattened view of a small graph:

![](./unclustered-nodes.png)

Note that there are vertices grouped by three letters: "A", "B" and "C".
In this lesson we will show you how to group communities of nodes
together under a single icon called a [cluster](../../glossary.md#cluster).  
This allows you to quickly focus
in on the key nodes in a graph you are concerned with without
having the rest of the graph get in the way.

In our example, each domain will have a label property so
that the software can quickly identify what nodes to cluster
together or un-cluster to show internal detail.

Here is a high-level clustered view of the above graph network using circles
as the grouping icon:

![](./cluster-a-b-c.png)

Here is a demonstration of opening a clustered node:

[Simple Interactive Clustering Example 1 (expand only)](clustering-1.html)

Note that you can drag the cluster around and double click on a cluster to expand the nodes
within that cluster.  This first example does not have any way to re-collapse a cluster
other than refreshing the entire page.

!!! Tip
    When generating graph vertex-type network diagrams with vis.js,
    prefer the '''circle''' shape over the '''dot''' shape
    so the text appears inside the vertex, not under the vertex.

## Lab2: Adding a Domain Property to Each Vertex

In the following examples, we will assign each node to
a specific domain using the ```domain``` property.
The values in the example are "A", "B", and "C" however
you can use any string for the domain value.

```js
var nodes = new vis.DataSet([
    { id: 1, label: 'Node 1A', domain: 'A' },
    { id: 2, label: 'Node 2A', domain: 'A' },
    { id: 3, label: 'Node 3A', domain: 'A' },

    { id: 4, label: 'Node 4B', domain: 'B' },
    { id: 5, label: 'Node 5B', domain: 'B' },
    { id: 6, label: 'Node 6B', domain: 'B' },

    { id: 7, label: 'Node 7C', domain: 'C' },
    { id: 8, label: 'Node 8C', domain: 'C' },
    { id: 9, label: 'Node 9C', domain: 'C' }
  ]);
```

### Cluster Drawing Properties

Our first step is to learn how to render a cluster.  We do this
by adding a ```clusterNodeProperies``` JSON data structure
to our program.  Here is an example that uses the ```square``` shape
for the clusters.

![](cluster-boxes.png)

```js
clusterNodeProperties: {
    id: 'cluster:' + domain,
    label: 'Cluster ' + domain,
    shape: 'square', // Change shape to square
    size: 40,        // Increase size
    color: {
        border: 'orange',      // Set border color (e.g., orange)
        background: '#FFE5B4'   // Set background color (e.g., light orange)
    },
    font: { color: 'black' } // Set font color to black for readability
}
```

Note that we are contacting the string "cluster" to the domain to create the cluster
```id``` and we are using ```"Cluster" + domain``` for the label.

[Clustering Example 2](clustering-v2.html)

## Lab 3: Individual Cluster Colors

One of the key things we can do to each domain is to color the domain
icons with different colors.  Each domain can have a different
color for the boarder and the background of the icon.

To do this we will need to create a list of the domains and then
use this list to assign the color:

```js
var domainColors = {
      'A': { border: '#FF0000', background: '#FFCCCC' }, // Red
      'B': { border: '#00FF00', background: '#CCFFCC' }, // Green
      'C': { border: '#0000FF', background: '#CCCCFF' }  // Blue
    };
```

```js
clusterNodeProperties: {
   color: domainColors[domain]
}
```

![](./cluster-boxes-domain-colors.png)

```js
function clusterByDomain() {
  // Get unique domains from nodes
  var allNodes = nodes.get();
  var domains = [...new Set(allNodes.map(node => node.domain))];

  domains.forEach(function(domain) {
    // Define colors based on domain
    var domainColors = {
      'A': { border: '#FF0000', background: '#FFCCCC' }, // Red
      'B': { border: '#00FF00', background: '#CCFFCC' }, // Green
      'C': { border: '#0000FF', background: '#CCCCFF' }  // Blue
    };

    var clusterOptionsByData = {
      joinCondition: function(childNode) {
        return childNode.domain === domain;
      },
      clusterNodeProperties: {
        id: 'cluster:' + domain,
        label: 'Cluster ' + domain,
        shape: 'square',
        size: 40,
        color: domainColors[domain],
        font: { color: '#000000' }
      }
    };
    network.cluster(clusterOptionsByData);
  });
}
```

[Example 3: Colored Cluster Icons](clustering-v3.html)

## Lab 4: Repositioning Text

Next, we want the text to be positioned in the center of the cluster icon.
It would be nice to have a "centerLabel" property, but vis.js does not
support this.  Instead we must move the vertical positioning up
by setting negative distance based on the square size.  For a square
of size 40, we need to move up -55.  For a square if size 50 we need
to move up -65.

```js
clusterNodeProperties: {
  font: {
    vadjust: -55,      // Adjust label position upwards
  }
}
```
![](./cluster-boxes-domain-colors-centered.png)

[Example 4: Repositioning the Label Within the Square Cluster](./clustering-v4.html)

## Lab 5: Recollapse

Although we can now double click on each cluster to expand it, we might
change our mind and want the cluster to be collapsed again into a single
structure.  This allows uses to successively browse through each domain
in succession, opening and closing each domain.

To do this, we will need to add an event handler that will
close the domain if any of the nodes within that domain get
a double click.  Here is sample code to collapse a domain.

### Event Handler for Double-Click Events
```js
// Event handler for all double-click events on nodes
network.on("doubleClick", function (params) {
    if (params.nodes.length === 1) {
      // get the node we clicked on
      var nodeId = params.nodes[0];
      if (network.isCluster(nodeId) === true) {
        // Open the cluster
        network.openCluster(nodeId);
      } else {
        // Check if the node belongs to any cluster
        for (var clusterId in clusters) {
          if (clusters[clusterId].includes(nodeId)) {
            // Re-cluster the nodes
            recluster(clusterId);
            break;
          }
        }
      }
    }
});
```

The event handler checks if you clicked on a note that is in a cluster.
If the node is in a cluster and if is, it calls the ```recluster()``` function using
the ```clusterID``` as a parameter.  Here is that recluster function.

### The Recluster Function

This function gets called when you double-click on any node that is in
a cluster.  It extracts the domain name from the input clusterID
and then uses that domain to recluster the diagram using cluster
properties.

```js
// Function to re-cluster nodes into the cluster with the given clusterId
function recluster(clusterId) {
    var domain = clusterId.split(':')[1];  // Extract domain from clusterId

    var clusterOptionsByData = {
      joinCondition: function(childNode) {
        return childNode.domain === domain && childNode.id !== clusterId;
      },
      processProperties: function(clusterOptions, childNodes, childEdges) {
        // Update the mapping of cluster to its nodes
        clusters[clusterId] = childNodes.map(function(node) { return node.id; });

        // Set cluster properties
        clusterOptions.id = clusterId;
        clusterOptions.label = '<b>Cluster ' + domain + '</b>';
        clusterOptions.shape = 'square';
        clusterOptions.size = 50;
        clusterOptions.color = {
          border: 'orange',      // Orange border
          background: '#FFE5B4'   // Light orange background
        };
        clusterOptions.font = {
          color: '#000000',
          size: 16,
          vadjust: -35,
          align: 'horizontal',
          multi: true
        };
        return clusterOptions;
      },
      clusterNodeProperties: {
        allowSingleNodeCluster: false
      }
    };
    network.cluster(clusterOptionsByData);
}
```

[Example 5: Recollapseing the Cluster](./clustering-v5b.html)

## Lab 6: Integrating Recollapse

[Example 6 (work in progress)](./clustering-v6.html)