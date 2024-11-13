// Initialize global variables
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;
var edgeIdCounter = 1;
var currentEditingNode = null; // To track if we're editing a node

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
    },
    manipulation: {
      enabled: false // Disable default manipulation to use custom controls
    }
  };
  network = new vis.Network(container, data, options);

  // Event listeners for toolbar buttons
  document.getElementById('file-input').addEventListener('change', loadGraph);
  document.getElementById('create-node-btn').addEventListener('click', openCreateNodeModal);
  document.getElementById('add-edge-btn').addEventListener('click', addEdge);
  document.getElementById('delete-selected-btn').addEventListener('click', deleteSelected);
  document.getElementById('save-graph-btn').addEventListener('click', saveGraph);
  document.getElementById('save-as-btn').addEventListener('click', saveAsGraph);

  // Modal window elements
  const modal = document.getElementById('node-modal');
  const saveBtn = modal.querySelector('.save-btn');
  const cancelBtn = modal.querySelector('.cancel-btn');
  const modalTitle = document.getElementById('modal-title');

  saveBtn.addEventListener('click', saveNode);
  cancelBtn.addEventListener('click', closeNodeModal);

  // Close modal when clicking outside the modal content
  window.onclick = function(event) {
    if (event.target == modal) {
      closeNodeModal();
    }
  }

  // Add double-click event listener for editing nodes
  network.on("doubleClick", function (params) {
    if (params.nodes.length === 1) {
      const nodeId = params.nodes[0];
      openEditNodeModal(nodeId);
    }
  });
});

// Function to open the modal in create mode
function openCreateNodeModal() {
  currentEditingNode = null; // Set to null for create mode
  const modal = document.getElementById('node-modal');
  const modalTitle = document.getElementById('modal-title');
  modalTitle.textContent = "Create New Node";
  document.getElementById('node-label').value = '';
  document.getElementById('node-group').value = '';
  modal.style.display = 'block';
}

// Function to open the modal in edit mode
function openEditNodeModal(nodeId) {
  currentEditingNode = nodeId; // Set to node ID for edit mode
  const modal = document.getElementById('node-modal');
  const modalTitle = document.getElementById('modal-title');
  modalTitle.textContent = "Edit Node";
  
  const nodeData = nodes.get(nodeId);
  document.getElementById('node-label').value = nodeData.label || '';
  document.getElementById('node-group').value = nodeData.group || '';
  
  modal.style.display = 'block';
}

// Function to close the modal
function closeNodeModal() {
  const modal = document.getElementById('node-modal');
  modal.style.display = 'none';
  // Clear input fields
  document.getElementById('node-label').value = '';
  document.getElementById('node-group').value = '';
  // Reset current editing node
  currentEditingNode = null;
}

// Function to save a node (create or edit)
function saveNode() {
  const label = document.getElementById('node-label').value.trim();
  const group = document.getElementById('node-group').value.trim();

  if (label === "") {
    alert("Node label cannot be empty.");
    return;
  }

  if (currentEditingNode === null) {
    // Create mode
    const nodeId = getNextNodeId();
    const newNode = { id: nodeId, label };
    if (group !== "") {
      newNode.group = group;
    }
    nodes.add(newNode);
  } else {
    // Edit mode
    const updatedNode = { id: currentEditingNode, label };
    if (group !== "") {
      updatedNode.group = group;
    } else {
      updatedNode.group = undefined; // Remove group if empty
    }
    nodes.update(updatedNode);
  }

  closeNodeModal();
}

// Helper function to get the next unique node ID
function getNextNodeId() {
  const allNodeIds = nodes.getIds();
  if (allNodeIds.length === 0) return 1;
  return Math.max(...allNodeIds) + 1;
}

// Function to add an edge between two selected nodes
function addEdge() {
  const selectedNodes = network.getSelectedNodes();
  if (selectedNodes.length !== 2) {
    alert('Please select exactly two nodes to create an edge.');
    return;
  }
  const from = selectedNodes[0];
  const to = selectedNodes[1];

  // Prevent duplicate edges
  const existingEdge = edges.get({
    filter: (item) => 
      (item.from === from && item.to === to) || 
      (item.from === to && item.to === from)
  });

  if (existingEdge.length > 0) {
    alert('An edge between these nodes already exists.');
    return;
  }

  edges.add({ id: edgeIdCounter++, from, to, label: "New Edge" });
}

// Function to delete selected nodes and edges
function deleteSelected() {
  const selectedNodes = network.getSelectedNodes();
  const selectedEdges = network.getSelectedEdges();
  if (selectedNodes.length === 0 && selectedEdges.length === 0) {
    alert('Please select nodes or edges to delete.');
    return;
  }
  if (selectedNodes.length > 0) {
    nodes.remove(selectedNodes);
  }
  if (selectedEdges.length > 0) {
    edges.remove(selectedEdges);
  }
}

// Function to save the graph to a JSON file
function saveGraph() {
  const graphData = { nodes: nodes.get(), edges: edges.get() };
  download("graph.json", JSON.stringify(graphData, null, 2));
}

// Function to save the graph to a new JSON file with a custom name
function saveAsGraph() {
  const fileName = prompt("Enter file name:", "graph.json");
  if (fileName) {
    const graphData = { nodes: nodes.get(), edges: edges.get() };
    download(fileName, JSON.stringify(graphData, null, 2));
  }
}

// Function to load a graph from a JSON file
function loadGraph(event) {
  const file = event.target.files[0];
  if (file && file.name.endsWith('.json')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const graphData = JSON.parse(e.target.result);
        if (graphData.nodes && graphData.edges) {
          nodes.clear();
          edges.clear();
          nodes.add(graphData.nodes);
          edges.add(graphData.edges);
          // Update edgeIdCounter to prevent ID conflicts
          const maxEdgeId = graphData.edges.reduce((max, edge) => Math.max(max, edge.id || 0), 0);
          edgeIdCounter = maxEdgeId + 1;
          console.log("Graph loaded successfully.");
        } else {
          alert("Invalid graph data structure.");
        }
      } catch (err) {
        alert("Error loading graph: " + err.message);
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please select a valid JSON file.");
  }
}

// Helper function to download data as a file
function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
