// Declare variables for nodes, edges, and network globally so they can be accessed everywhere
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;
var edgeIdCounter = 1; // Counter to keep track of the next edge ID

// Function to wait for the network to be ready and then set data
function waitForNetworkAndSetData(attempts, delay, data) {
  console.log("Checking if network is ready... Attempt remaining:", attempts);
  
  if (network) {
      // Set data to the network once it is ready
      network.setData(data);
      console.log("Network is ready. Data has been set.");
      
      // Now we can safely count orphaned nodes and display stats
      var orphanedNodesCount = countOrphanedNodes();
      console.log("Orphaned Nodes Count:", orphanedNodesCount);
      
      // Call displayStats after setting the data
      displayStats(); 
  } else if (attempts > 0) {
      console.warn("Network is not yet available. Retrying...");
      setTimeout(function() {
          waitForNetworkAndSetData(attempts - 1, delay, data); // Recursive call with decremented attempts
      }, delay);
  } else {
      console.error("Failed to initialize network after multiple attempts.");
  }
}

// Load graph from JSON file
// Load graph from JSON file
function loadGraphFromFile() {
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
                          if (!edge.id) {
                              edge.id = edgeIdCounter++;
                          } else {
                              edgeIdCounter = Math.max(edgeIdCounter, edge.id + 1);
                          }
                          edges.add(edge);
                      });

                      // Prepare data to set to the network
                      var data = { nodes: nodes, edges: edges };

                      // Start waiting for the network to be ready
                      waitForNetworkAndSetData(100, 100, data); // 100 attempts, 100 ms delay
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
}


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
          // Should this be an update?
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

  // var edgeId = document.getElementById('edge-id').value;
  var edgeId = parseInt(document.getElementById('edge-id').value, 10); // Convert to integer

  var newLabel = document.getElementById('edge-label').value;

  if (edgeId) {
    // Fetch the current edge to ensure it exists before updating
    var currentEdge = edges.get(edgeId);
    if (currentEdge) {
      // Update only the label to avoid accidental overwriting of other properties
      currentEdge.label = newLabel;

      // Perform the update on the dataset, which automatically updates the network visualization
      console.log("Available edges:", edges.get());
      edges.update(currentEdge);
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
// To do this we add an event listener if we get a new input file
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
            // Assign new ID if one is not provided in the file
            if (!edge.id) {
              edge.id = edgeIdCounter++;
            } else {
              edgeIdCounter = Math.max(edgeIdCounter, edge.id + 1);
            }
            edges.add(edge);
          });

          // Start waiting for the network to be ready
          waitForNetworkAndSetData(100, 100); // 100 attempts, 100 ms delay


          console.log("Nodes loaded:", nodes.get());
          console.log("Edges loaded:", edges.get());

          // Ensure network is initialized before counting orphaned nodes
          if (network) {
            var orphanedNodesCount = countOrphanedNodes();
            console.log("Orphaned Nodes Count:", orphanedNodesCount);
          } else {
            console.warn("Network is not initialized. Cannot count orphaned nodes.");
          }

          displayStats(); // Update stats
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

  // error is here for getConnectedEdges no longer working
  // we want a count of the nodes without edges
  var orphanedNodes = countOrphanedNodes();

  document.getElementById('stats').innerHTML =
    'Nodes: ' + nodeCount + '<br>' +
    'Edges: ' + edgeCount + '<br>' +
    'Orphaned Nodes: ' + orphanedNodes;
  console.log("Stats - Nodes:", nodeCount, "Edges:", edgeCount, "Orphaned Nodes:", orphanedNodes);
  // console.log("Stats - Nodes:", nodeCount, "Edges:", edgeCount);

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

// Function to count orphaned nodes
function countOrphanedNodes() {
  if (!network) {
    console.error("Network is not initialized.");
    return 0; // Return 0 if network is not available
  }

  let orphanedCount = 0;

  nodes.forEach(function(node) {
    var connectedEdges = network.getConnectedEdges(node.id);
    if (connectedEdges.length === 0) {
      orphanedCount++;
    }
  });

  return orphanedCount;
}
