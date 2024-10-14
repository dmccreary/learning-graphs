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
      console.log("Initializing network...");
  
      // Create node and edge datasets
      var nodes = new vis.DataSet();
      var edges = new vis.DataSet();
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
      console.log("Network initialized successfully.");
  
      // Load a test graph to see if network renders correctly
      nodes.add({ id: 1, label: "Test Node 1", x: 0, y: 0 });
      nodes.add({ id: 2, label: "Test Node 2", x: 100, y: 100 });
      nodes.add({ id: 3, label: "Test Node 3", x: 200, y: 200 });
      edges.add({ from: 1, to: 2, label: "Edge 1" });
      
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
  
            // Add an edge between selected nodes
            edges.add({ from: fromNode, to: toNode, label: "New Edge" });
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
  
    } else {
      console.error("'mynetwork' container not found. Network not initialized.");
    }
  });
  
  // Variables for edge creation mode
  var selectedNodes = [];
  var edgeCreationMode = false;
  
  // Load graph from JSON file
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
            edges.add(graphData.edges);
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
  