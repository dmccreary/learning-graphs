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
    },
    manipulation: {
      enabled: true,
      addNode: function (data, callback) {
        openNodeModal('Create New Node', data, callback);
      },
      editNode: function (data, callback) {
        openNodeModal('Edit Node', data, callback);
      },
      addEdge: function (data, callback) {
        if (data.from === data.to) {
          alert('Cannot connect node to itself.');
          return;
        }
        // Prevent duplicate edges
        const existingEdge = edges.get({
          filter: (item) =>
            (item.from === data.from && item.to === data.to) ||
            (item.from === data.to && item.to === data.from)
        });
        if (existingEdge.length > 0) {
          alert('An edge between these nodes already exists.');
          return;
        }
        data.id = edgeIdCounter++;
        data.label = 'New Edge';
        callback(data);
      },
      deleteNode: function (data, callback) {
        if (confirm('Are you sure you want to delete the selected node(s)?')) {
          callback(data);
        }
      },
      deleteEdge: function (data, callback) {
        if (confirm('Are you sure you want to delete the selected edge(s)?')) {
          callback(data);
        }
      }
    }
  };
  network = new vis.Network(container, data, options);

  // Event listeners for toolbar buttons
  document.getElementById('file-input').addEventListener('change', loadGraph);
  document.getElementById('create-node-btn').addEventListener('click', () => {
    network.addNodeMode();
  });
  document.getElementById('add-edge-btn').addEventListener('click', () => {
    network.addEdgeMode();
  });
  document.getElementById('edit-node-btn').addEventListener('click', () => {
    network.editNode();
  });
  document.getElementById('delete-node-btn').addEventListener('click', () => {
    network.deleteSelected();
  });
  document.getElementById('delete-edge-btn').addEventListener('click', () => {
    network.deleteSelected();
  });
  document.getElementById('save-graph-btn').addEventListener('click', saveGraph);
  document.getElementById('save-as-btn').addEventListener('click', saveAsGraph);

  // Modal window elements
  const modal = document.getElementById('node-modal');
  const saveBtn = modal.querySelector('.save-btn');
  const cancelBtn = modal.querySelector('.cancel-btn');

  saveBtn.addEventListener('click', saveNodeData);
  cancelBtn.addEventListener('click', cancelNodeEdit);

  // Close modal when clicking outside the modal content
  window.onclick = function(event) {
    if (event.target == modal) {
      cancelNodeEdit();
    }
  };
});

// Variables to store the callback function and node data during manipulation
var modalCallback = null;
var modalData = null;

// Function to open the modal for creating or editing a node
function openNodeModal(title, data, callback) {
  modalData = data;
  modalCallback = callback;
  const modal = document.getElementById('node-modal');
  const modalTitle = document.getElementById('modal-title');
  modalTitle.textContent = title;

  document.getElementById('node-label').value = data.label || '';
  document.getElementById('node-group').value = data.group || '';

  modal.style.display = 'block';
}

// Function to save node data from the modal
function saveNodeData() {
  const label = document.getElementById('node-label').value.trim();
  const group = document.getElementById('node-group').value.trim();

  if (label === "") {
    alert("Node label cannot be empty.");
    return;
  }

  modalData.label = label;
  modalData.group = group !== '' ? group : undefined;

  const modal = document.getElementById('node-modal');
  modal.style.display = 'none';

  modalCallback(modalData);

  // Reset modal variables
  modalData = null;
  modalCallback = null;
}

// Function to cancel node editing
function cancelNodeEdit() {
  const modal = document.getElementById('node-modal');
  modal.style.display = 'none';
  modalCallback(null); // Cancel the manipulation action

  // Reset modal variables
  modalData = null;
  modalCallback = null;
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
