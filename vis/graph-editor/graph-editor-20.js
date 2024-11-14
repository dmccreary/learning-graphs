// Initialize global variables
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;
var isNewNode = false; // Global variable to track if we're creating a new node
var edgeIdCounter = 1;

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the network
  const container = document.getElementById('mynetwork');
  const data = { nodes: nodes, edges: edges };
  const options = {
    physics: {
        enabled: true,
        solver: 'forceAtlas2Based',
        stabilization: {
            iterations: 1000,
            updateInterval: 25
        },
        forceAtlas2Based: {
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springLength: 50,  // Reduce this to make edges shorter
            springConstant: 0.08
        }
    },
    layout: {
        improvedLayout: false, // Prevent node overlap
    },
    manipulation: {
      enabled: true,
      addNode: function (data, callback) {
        openNodeModal('Create New Learning Concept', data, callback, true); // Pass true for isNew
      },
      editNode: function (data, callback) {
        openNodeModal('Edit Learning Concept', data, callback, false); // Pass false for isNew
      },
      addEdge: function (data, callback) {
        console.log('Attempting to add edge:', data);
        if (data.from === data.to) {
          alert('Cannot connect node to itself.');
          callback(null); // Properly cancel the action
          return;
        }
        // Assign a unique ID and label to the new edge
        data.id = edgeIdCounter++;
        console.log('Adding edge:', data);
        callback(data);
      },
      deleteNode: function (data, callback) {
        if (confirm('Are you sure you want to delete the selected node(s)?')) {
          callback(data);
        } else {
          callback(null); // Properly cancel the action
        }
      },
      deleteEdge: function (data, callback) {
        if (confirm('Are you sure you want to delete the selected edge(s)?')) {
          callback(data);
        } else {
          callback(null); // Properly cancel the action
        }
      }
    },
    edges: {
         arrows: {
          to: { enabled: true, scaleFactor: 1 }// Arrow at the destination
         }
    },
    // just the styles, no placement allowed
    groups: {
        found: {
           shape: "box", 
           color: {background:'red'},
           font: {color: "white", size: 16}
        },
        term: {
           shape: "dot",
           color:{background:'orange'}, 
        },
        goal: {
           shape: "star", 
           color:{background:'purple'}, 
           font: { size: 16 }
        }
    }
  };

  network = new vis.Network(container, data, options);

  // Event listeners for toolbar buttons
  // We need buttons for open file-input, save and save as.
  document.getElementById('file-input').addEventListener('change', loadGraph);
  document.getElementById('save-graph-btn').addEventListener('click', saveGraph);
  document.getElementById('save-as-btn').addEventListener('click', saveAsGraph);

  // Modal window elements
  const modal = document.getElementById('node-modal');
  const saveBtn = modal.querySelector('.save-btn');
  const cancelBtn = modal.querySelector('.cancel-btn');

  saveBtn.addEventListener('click', saveNodeData);
  cancelBtn.addEventListener('click', cancelNodeEdit);

  // Close modal when clicking outside the modal content
  //window.onclick = function(event) {
  //  if (event.target == modal) {
  //    cancelNodeEdit();
  //  }
  //};

  // Event listener for when edges are added to the dataset
  edges.on('add', function (event, properties) {
    properties.items.forEach(function (edgeId) {
      const newEdge = edges.get(edgeId);
      checkForDuplicateEdges(newEdge);
    });
  });
});

// Variables to store the callback function and node data during manipulation
var modalCallback = null;
var modalData = null;

// Function to open the modal for creating or editing a node
function openNodeModal(title, data, callback, isNew) {
  modalData = data;
  modalCallback = callback;
  isNewNode = isNew; // Set the global variable

  const modal = document.getElementById('node-modal');
  const modalTitle = document.getElementById('modal-title');
  modalTitle.textContent = title;

  // go into the form elements and get each value from the field
  document.getElementById('node-label').value = data.label || '';
  document.getElementById('node-group').value = data.group || '';

  modal.style.display = 'block';
}

// Function to save node data from the modal
function saveNodeData() {

  // move form fields into local variables
  const label = document.getElementById('node-label').value.trim();
  const group = document.getElementById('node-group').value.trim();

  // check for required fields
  if (label === "") {
    alert("Node label cannot be empty.");
    return;
  }

  // Assign a new ID if this is a new node (no ID assigned yet)
  if (isNewNode) {
    modalData.id = getNextNodeId();
  }

  // this is where we construct our JSON node object
  modalData.label = label;
  modalData.group = group !== '' ? group : undefined;
  // todo - add the fixed X for foundation and goals nodes
  
  const modal = document.getElementById('node-modal');
  modal.style.display = 'none';

  modalCallback(modalData);

  // Reset modal variables
  modalData = null;
  modalCallback = null;
  isNewNode = false; // Reset the flag
}

// Function to cancel node editing
function cancelNodeEdit() {
  const modal = document.getElementById('node-modal');
  modal.style.display = 'none';
  if (modalCallback) {
    modalCallback(null); // Properly cancel the action
  }

  // Reset modal variables
  modalData = null;
  modalCallback = null;
}

// Function to check for duplicate edges and remove them
function checkForDuplicateEdges(newEdge) {
  const from = newEdge.from;
  const to = newEdge.to;
  const edgeId = newEdge.id;

  // Get all edges between the same nodes excluding the new edge
  const duplicates = edges.get({
    filter: function(edge) {
      return (
        ((edge.from === from && edge.to === to) || (edge.from === to && edge.to === from)) &&
        edge.id !== edgeId
      );
    }
  });
  /*
  if (duplicates.length > 0) {
    // Remove the new edge if a duplicate exists
    alert('An edge between these nodes already exists. The duplicate edge will be removed.');
    edges.remove(edgeId);
  }
    */
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

          // After defining nodes, call the function to fix X positions
          fixXPositions(nodes);

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

// return the next largest integer of all the current IDs
function getNextNodeId() {
  const allNodeIds = nodes.getIds();
  if (allNodeIds.length === 0) return 1; // Start from 1 if no nodes exist
  return Math.max(...allNodeIds) + 1;
}

// Function to fix x positions for specific groups
// no styling here - use the options -> groups to style the groups
function fixXPositions(nodes) {
    nodes.forEach(function (node) {
        // place the foundation nodes on the left
        if (node.group === "found") {
            node.x = -600;
            node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
        // place the goal nodes on the right
        } else if (node.group === "goal") {
            node.x = 600;
            node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
        }
    });
}
