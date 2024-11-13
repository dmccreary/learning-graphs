// Initialize global variables
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;
var edgeIdCounter = 1;

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the network
  const container = document.getElementById('mynetwork');
  const data = { nodes: nodes, edges: edges };
  const options = {
    physics: {
      enabled: true,
      solver: "forceAtlas2Based",
      stabilization: { iterations: 100 }
    }
  };
  network = new vis.Network(container, data, options);

  // Event listeners for buttons
  document.getElementById('file-input').addEventListener('change', loadGraph);
  document.getElementById('create-node-btn').addEventListener('click', openNodeModal);
  document.getElementById('add-edge-btn').addEventListener('click', addEdge);
  document.getElementById('delete-selected-btn').addEventListener('click', deleteSelected);
  document.getElementById('save-graph-btn').addEventListener('click', saveGraph);
  document.getElementById('save-as-btn').addEventListener('click', saveAsGraph);

  // Modal window elements
  const modal = document.getElementById('node-modal');
  const saveBtn = modal.querySelector('.save-btn');
  const cancelBtn = modal.querySelector('.cancel-btn');

  saveBtn.addEventListener('click', createNode);
  cancelBtn.addEventListener('click', closeNodeModal);
});

// Functions for graph manipulation
function openNodeModal() {
  const modal = document.getElementById('node-modal');
  modal.style.display = 'block';
}

function closeNodeModal() {
  const modal = document.getElementById('node-modal');
  modal.style.display = 'none';
  // Clear input fields
  document.getElementById('node-label').value = '';
  document.getElementById('node-group').value = '';
}

function createNode() {
  const label = document.getElementById('node-label').value || `Node ${nodes.length + 1}`;
  const group = document.getElementById('node-group').value;
  const nodeId = nodes.length + 1;

  const newNode = { id: nodeId, label };
  if (group) {
    newNode.group = group;
  }

  nodes.add(newNode);
  closeNodeModal();
}

function addEdge() {
  const selectedNodes = network.getSelectedNodes();
  if (selectedNodes.length !== 2) {
    alert('Please select exactly two nodes to create an edge.');
    return;
  }
  const from = selectedNodes[0];
  const to = selectedNodes[1];

  edges.add({ id: edgeIdCounter++, from, to, label: "New Edge" });
}

function deleteSelected() {
  const selectedNodes = network.getSelectedNodes();
  const selectedEdges = network.getSelectedEdges();
  if (selectedNodes.length) {
    nodes.remove(selectedNodes);
  }
  if (selectedEdges.length) {
    edges.remove(selectedEdges);
  }
}

function saveGraph() {
  const graphData = { nodes: nodes.get(), edges: edges.get() };
  download("graph.json", JSON.stringify(graphData, null, 2));
}

function saveAsGraph() {
  const fileName = prompt("Enter file name:", "graph.json");
  if (fileName) {
    const graphData = { nodes: nodes.get(), edges: edges.get() };
    download(fileName, JSON.stringify(graphData, null, 2));
  }
}

function loadGraph(event) {
  const file = event.target.files[0];
  if (file && file.name.endsWith('.json')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const graphData = JSON.parse(e.target.result);
        nodes.clear();
        edges.clear();
        nodes.add(graphData.nodes);
        edges.add(graphData.edges);
        edgeIdCounter = edges.length + 1; // Update edge ID counter
        console.log("Graph loaded successfully.");
      } catch (err) {
        alert("Error loading graph: " + err.message);
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please select a valid JSON file.");
  }
}

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
