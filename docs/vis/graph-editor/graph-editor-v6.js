// graph-editor.js
// this version now loads the JSON file correctly
// note the new document.getElementById('file-input').addEventListener('change', function()

var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;
var container = null;
var data = { nodes: nodes, edges: edges };
var options = {};
var selectedNodes = [];

// Wait for DOM to fully load before initializing the network
document.addEventListener('DOMContentLoaded', (event) => {
  console.log("DOM fully loaded and parsed");
  container = document.getElementById('mynetwork');
  if (!container) {
    console.error("Could not find 'mynetwork' container!");
  } else {
    console.log("Found 'mynetwork' container with size:", container.clientWidth, container.clientHeight);
  }
  init();
  setupForm();
});

function init() {
  try {
    console.log("Initializing network...");
    network = new vis.Network(container, data, options);

    // Test: Add a node and an edge to see if the graph renders
    // nodes.add({ id: 1, label: "Test Node", x: 0, y: 0, size: 25 });
    // nodes.add({ id: 2, label: "Second Node", x: 100, y: 100, size: 25 });
    // edges.add({ from: 1, to: 2, label: "Test Edge" });

    console.log("Nodes after addition:", nodes.get());
    console.log("Edges after addition:", edges.get());

    console.log("Network initialized successfully.");
    network.on("selectNode", function (params) {
      console.log("Node selected:", params.nodes);
      populateForm(nodes.get(params.nodes[0]));
    });
    network.on("selectEdge", function (params) {
      console.log('Edge selected:', params.edges);
    });
    console.log("Network event listeners set up.");
  } catch (error) {
    console.error("Error initializing network:", error);
  }
}


// Populate the form when a node is selected for editing
function populateForm(nodeData) {
  if (!nodeData) {
    console.warn("No node data found to populate the form.");
    return;
  }
  console.log("Populating form for node:", nodeData);
  document.getElementById('node-id').value = nodeData.id || '';
  document.getElementById('node-label').value = nodeData.label || '';
  document.getElementById('node-title').value = nodeData.title || '';
  document.getElementById('node-shape').value = nodeData.shape || 'ellipse';
  document.getElementById('node-size').value = nodeData.size || 25;
  document.getElementById('node-bgcolor').value = nodeData.color?.background || '#ffffff';
  document.getElementById('node-bordercolor').value = nodeData.color?.border || '#000000';
  document.getElementById('node-x').value = nodeData.x || 0;
  document.getElementById('node-y').value = nodeData.y || 0;
  document.getElementById('node-fixed').checked = !!nodeData.fixed;
}

// Setup form for node creation/editing
function setupForm() {
  console.log("Setting up form...");
  document.getElementById('node-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var nodeId = document.getElementById('node-id').value;
    var nodeData = {
      id: nodeId || Date.now(), // Generate an ID if not provided
      label: document.getElementById('node-label').value,
      title: document.getElementById('node-title').value,
      shape: document.getElementById('node-shape').value,
      size: parseInt(document.getElementById('node-size').value),
      color: {
        background: document.getElementById('node-bgcolor').value,
        border: document.getElementById('node-bordercolor').value
      },
      x: parseInt(document.getElementById('node-x').value),
      y: parseInt(document.getElementById('node-y').value),
      fixed: document.getElementById('node-fixed').checked
    };

    console.log("Form submitted with node data:", nodeData);

    if (nodes.get(nodeId)) {
      console.log("Updating existing node:", nodeId);
      nodes.update(nodeData);
    } else {
      console.log("Adding new node:", nodeId);
      nodes.add(nodeData);
    }
    displayStats(); // Update stats after node creation or update
    resetForm();
  });
}

// Reset form fields after node is added/edited
function resetForm() {
  console.log("Resetting form...");
  document.getElementById('node-form').reset();
}

// Add a new node
function addNode() {
  console.log("Adding new node...");
  resetForm(); // Clear form for new node input
  document.getElementById('node-id').disabled = true; // Disable ID for new nodes
}

// Delete selected node or edge
function deleteSelected() {
  var selection = network.getSelection();
  console.log("Deleting selected nodes/edges:", selection);
  nodes.remove(selection.nodes);
  edges.remove(selection.edges);
  displayStats(); // Update stats after deletion
}

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
