// graph-editor.js

var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;
var container = null;
var data = { nodes: nodes, edges: edges };
var options = {};
var selectedNodes = [];

// Wait for DOM to fully load before initializing the network
document.addEventListener('DOMContentLoaded', (event) => {
  container = document.getElementById('mynetwork');
  init();
});

// Initialize network
function init() {
  network = new vis.Network(container, data, options);
  network.on("selectNode", function (params) {
    handleNodeSelection(params.nodes[0]);
  });
  network.on("selectEdge", function (params) {
    console.log('selectEdge Event:', params);
  });
}

// Handle node selection to create edges
function handleNodeSelection(nodeId) {
  selectedNodes.push(nodeId);

  // If two nodes are selected, create an edge between them
  if (selectedNodes.length === 2) {
    var fromNode = selectedNodes[0];
    var toNode = selectedNodes[1];
    edges.add({ from: fromNode, to: toNode });
    selectedNodes = []; // Reset selection
    displayStats(); // Update stats after edge creation
  }
}

// Load graph from JSON file
document.getElementById('file-input').addEventListener('change', function() {
  var file = this.files[0];
  if (file && file.name.endsWith('.json')) {
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var obj = JSON.parse(e.target.result);
        loadGraph(obj);
        displayStats();
        checkDataQuality();
      } catch (err) {
        alert('Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  } else {
    alert('Please select a .json file.');
  }
});

// Load graph data into the network
function loadGraph(data) {
  nodes.clear();
  edges.clear();
  nodes.add(data.nodes);
  edges.add(data.edges);
}

// Display graph statistics
function displayStats() {
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
}

// Check data quality
function checkDataQuality() {
  var nodeIds = nodes.getIds();
  var invalidEdges = edges.get().filter(function(edge) {
    return !nodeIds.includes(edge.from) || !nodeIds.includes(edge.to);
  });
  if (invalidEdges.length > 0) {
    alert('Data Quality Issues: Edges without valid nodes detected.');
  }
}

// Add a new node
function addNode() {
  var nodeId = prompt('Enter node ID:');
  if (nodeId !== null) {
    nodes.add({ id: nodeId, label: 'Node ' + nodeId });
    displayStats(); // Update stats after node creation
  }
}

// Add an edge between two nodes by selecting them (function disabled)
function addEdge() {
  alert('Select two nodes with the mouse to add an edge.');
}

// Edit selected node or edge
function editSelected() {
  var selection = network.getSelection();
  if (selection.nodes.length > 0) {
    var nodeId = selection.nodes[0];
    var node = nodes.get(nodeId);
    var newLabel = prompt('Enter new label:', node.label);
    var newColor = prompt('Enter new color:', node.color || '');
    nodes.update({ id: nodeId, label: newLabel, color: newColor });
  } else if (selection.edges.length > 0) {
    var edgeId = selection.edges[0];
    var edge = edges.get(edgeId);
    var newLabel = prompt('Enter new label:', edge.label || '');
    var newColor = prompt('Enter new color:', edge.color || '');
    edges.update({ id: edgeId, label: newLabel, color: newColor });
  } else {
    alert('No node or edge selected.');
  }
}

// Delete selected node or edge
function deleteSelected() {
  var selection = network.getSelection();
  nodes.remove(selection.nodes);
  edges.remove(selection.edges);
  displayStats(); // Update stats after deletion
}

// Save graph to file
function saveGraph() {
  var graphData = { nodes: nodes.get(), edges: edges.get() };
  var json = JSON.stringify(graphData, null, 2);
  download('graph.json', json);
}

// Save graph to a new file
function saveAsGraph() {
  var fileName = prompt('Enter file name:', 'graph.json');
  if (fileName) {
    var graphData = { nodes: nodes.get(), edges: edges.get() };
    var json = JSON.stringify(graphData, null, 2);
    download(fileName, json);
  }
}

// Download helper
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Change global options
function changeGlobalOptions() {
  var physics = confirm('Enable physics simulation?');
  var newOptions = {
    physics: {
      enabled: physics
    }
  };
  network.setOptions(newOptions);
}
