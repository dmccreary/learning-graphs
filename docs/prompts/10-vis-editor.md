# Vis.js Network Graph Editor

## Prompt

```linenums="0"
Please create a graph network editor
that uses the vis.js library.  The editor
should be able to do the following:

1. Create a new graph network (New Graph)
2. Open an existing graph network from a JSON file (Open)
2. Add a new node (Add Node)
3. Change properties of a node such as the label and group
4. Delete a selected node (Delete Node)
5. Add a new edge between two nodes (Add Edge)
6. Delete an edge (Delete Edge)
7. Save the graph Network (Save)
8. Save the graph network to a new name (Save As)

I have a start here.

Please use the following HTML template called graph-editor.html:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Vis.js Graph Network Editor</title>
  <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <script type="text/javascript" src="graph-editor.js" defer></script>
  <style>
    #mynetwork {
      width: 100%;
      height: 600px;
      border: 1px solid lightgray;
    }
    #sidebar {
      float: left;
      width: 20%;
      padding: 10px;
    }
    #main {
      margin-left: 22%;
      padding: 10px;
    }
    .stats {
      margin-top: 10px;
    }
  </style>
</head>
<body>

<div id="sidebar">
  <h3>Graph Editor</h3>
  <input type="file" id="file-input" accept=".json"><br><br>
  <button onclick="addNode()">Add Node</button>
  <button onclick="addEdge()">Add Edge</button><br><br>
  <button onclick="editSelected()">Edit Selected</button>
  <button onclick="deleteSelected()">Delete Selected</button><br><br>
  <button onclick="saveGraph()">Save</button>
  <button onclick="saveAsGraph()">Save As</button><br><br>
  <button onclick="changeGlobalOptions()">Global Options</button>
  <div class="stats" id="stats"></div>
</div>

<div id="main">
  <div id="mynetwork"></div>
</div>

</body>
</html>
```

This loads the following JavaScript file called graph-editor.js

```javascript
// Declare variables for nodes, edges, and network globally so they can be accessed everywhere
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;
var edgeIdCounter = 1; // Counter to keep track of the next edge ID


document.addEventListener('DOMContentLoaded', (event) => {
  console.log("DOM fully loaded and parsed");

  // Ensure the button is found and attach event listener for edge creation mode
  var addEdgeButton = document.getElementById('add-edge-btn');
  if (addEdgeButton) {
    console.log("Found 'Add Edge' button.");
    addEdgeButton.addEventListener('click', function() {
      console.log("Add Edge button clicked.");
      edgeCreationMode = true;
      selectedNodes = []; // Reset selected nodes
      console.log("Edge creation mode activated. Please select two nodes.");
      // alert("Edge creation mode activated. Select two nodes to create an edge.");
    });
  } else {
    console.error("'Add Edge' button not found.");
  }

  // Initialize network only if container is found
  var container = document.getElementById('mynetwork');
  if (container) {
    console.log("In container. Initializing network...");

    // Create node and edge datasets
    var data = { nodes: nodes, edges: edges };
    var options = {
      physics: {
        enabled: true, // Enable physics to auto-arrange nodes and edges
        solver: "forceAtlas2Based", // Use a stable layout algorithm
        stabilization: { iterations: 100 } // Stabilize after 100 iterations
      }
    };
    
    // Create network
    var network = new vis.Network(container, data, options);
    console.log("In container. Network initialized successfully.");
    
    console.log("Nodes added:", nodes.get());
    console.log("Edges added:", edges.get());

    // Event listeners for network interactions
    network.on("selectNode", function (params) {
      if (params.nodes.length) {
        var nodeId = params.nodes[0];
        console.log("Node selected:", nodeId);

        // Only add the node if it's not already selected
        if (selectedNodes.indexOf(nodeId) === -1) {
          selectedNodes.push(nodeId);
        }

        // Check if we're in edge creation mode and two nodes are selected
        if (edgeCreationMode && selectedNodes.length === 2) {
          var fromNode = selectedNodes[0];
          var toNode = selectedNodes[1];

          // Add an edge between selected nodes with sequential ID
          edges.add({ from: fromNode, to: toNode, id: edgeIdCounter++, label: "New Edge" });
          console.log("Edge created between:", fromNode, "and", toNode);

          // alert("Edge created between node " + fromNode + " and node " + toNode);

          // Refresh network to reflect the new edge
          network.setData({ nodes: nodes, edges: edges });

          // Reset edge creation mode and selected nodes
          selectedNodes = [];
          edgeCreationMode = false;
        }
      }
    });

    network.on("deselectNode", function (params) {
      // If nodes are deselected while in edge creation mode, do not reset selected nodes
      if (params.previousSelection.nodes.length) {
        console.log("Node deselected. Keeping selected nodes.");
        // Do not reset selectedNodes here to allow edge creation
      }
    });

    network.on("selectEdge", function (params) {
      if (params.edges.length) {
        var edgeId = params.edges[0];
        var edge = edges.get(edgeId);
        console.log("Edge selected:", edgeId);
  
        // Fill the form with the edge data
        document.getElementById('edge-id').value = edge.id;
        document.getElementById('edge-label').value = edge.label || "";
      }
    });

    // Handle edge label update form submission
    document.getElementById('edge-form').addEventListener('submit', function(event) {
      event.preventDefault();

      var edgeId = document.getElementById('edge-id').value;
      var newLabel = document.getElementById('edge-label').value;

      if (edgeId) {
        // Fetch the current edge to avoid overwriting other properties
        var currentEdge = edges.get(edgeId);
        if (currentEdge) {

          console.log("Before update:", edges.get(edgeId));
          edges.update({ id: edgeId, label: newLabel });
          console.log("After update:", edges.get(edgeId));

          console.log("Edge updated:", edgeId, "with new label:", newLabel);
        } else {
          console.error("Edge with ID:", edgeId, "not found.");
        }
      }
    });

    console.log("End of container initializations.");
  } else {
    console.error("'mynetwork' container not found. Network not initialized.");
  }
});

// Variables for edge creation mode
var selectedNodes = [];
var edgeCreationMode = false;

// Load graph from JSON file
// add an event listener if we get a new input file
document.getElementById('file-input').addEventListener('change', function() {
  var file = this.files[0];
  if (file && file.name.endsWith('.json')) {
    console.log("File selected:", file.name);
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var graphData = JSON.parse(e.target.result);
        console.log("File contents parsed:", graphData);

        // Clear current nodes and edges before loading new data
        nodes.clear();
        edges.clear();

        // Load nodes and edges from the file
        if (graphData.nodes && graphData.edges) {
          nodes.add(graphData.nodes);
          graphData.edges.forEach(function(edge) {
            // Only assign a new ID if one is not provided in the file
            if (!edge.id) {
              edge.id = edgeIdCounter++;
            } else {
              edgeIdCounter = Math.max(edgeIdCounter, edge.id + 1); // Ensure counter is ahead of the current ID
            }
            edges.add(edge);
          });

          console.log("Nodes loaded:", nodes.get());
          console.log("Edges loaded:", edges.get());
          displayStats(); // Update stats

          // Refresh network with loaded data
          network.setData({ nodes: nodes, edges: edges });

        } else {
          console.warn("Invalid graph data structure. No nodes or edges found.");
        }
      } catch (err) {
        console.error("Error parsing JSON file:", err);
      }
    };
    reader.readAsText(file);
  } else {
    console.error('Invalid file selected. Please select a .json file.');
  }
});

// Display graph statistics
function displayStats() {
  console.log("Displaying statistics...");
  var nodeCount = nodes.length;
  var edgeCount = edges.length;

  // this is generating a console error because network.getConnectedEdges(node.id); is not found
  var orphanedNodes = nodes.get().filter(function(node) {
    var connectedEdges = network.getConnectedEdges(node.id);
    return connectedEdges.length === 0;
  }).length;
  
  document.getElementById('stats').innerHTML =
    'Nodes: ' + nodeCount + '<br>' +
    'Edges: ' + edgeCount + '<br>' +
    'Orphaned Nodes: ' + orphanedNodes;
  console.log("Stats - Nodes:", nodeCount, "Edges:", edgeCount, "Orphaned Nodes:", orphanedNodes);
}

// Reset form fields after node is added/edited
function resetForm() {
  console.log("Resetting form...");
  document.getElementById('node-form').reset();
}

// Save graph to file
function saveGraph() {
  console.log("Saving graph...");
  var graphData = { nodes: nodes.get(), edges: edges.get() };
  var json = JSON.stringify(graphData, null, 2);
  download('graph.json', json);
}

// Save graph to a new file
function saveAsGraph() {
  console.log("Save As...");
  var fileName = prompt('Enter file name:', 'graph.json');
  if (fileName) {
    var graphData = { nodes: nodes.get(), edges: edges.get() };
    var json = JSON.stringify(graphData, null, 2);
    download(fileName, json);
  }
}

// Download helper
function download(filename, text) {
  console.log("Downloading file:", filename);
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
```

Sample JSON test file called test-01.json
```json
{
    "nodes": [
      { "id": 1, "label": "Node 1"},
      { "id": 2, "label": "Node 2", "group": "mygroup1"  },
      { "id": 3, "label": "Node 3", "group": "mygroup2", 
         "title": "A long text description for node 3 that is only shown on hover." },
      { "id": 4, "label": "Node 4", "group": "mygroup2", "color": "red"},
      { "id": 5, "label": "Node 5", "group": "mygroup3", "color": "blue", "shape": 
        "circle"},
      { "id": 6, "label": "Node 6", "group": "mygroup3", "color": "green", "shape": 
        "box",  "x": -400, "y": -200, "fixed": { "x": true, "y": false }}
    ],
    "edges": [
      { "from": 1, "to": 2, "label": "1 to 2" },
      { "from": 2, "to": 3, "label": "2 to 3" },
      { "from": 2, "to": 3, "label": "3 to 4" },
      { "from": 2, "to": 3, "label": "4 to 5" },
      { "from": 2, "to": 3, "label": "5 to 6" },
      { "from": 2, "to": 3, "label": "2 to 4" },
      { "from": 2, "to": 3, "label": "2 to 5" },
      { "from": 2, "to": 3, "label": "3 to 5" },
      { "from": 2, "to": 3, "label": "4 to 6" },
      { "from": 2, "to": 3, "label": "5 to 2" }
    ]
}
```
