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
      addNode: function (data, callback) {
        data.label = prompt("Enter node label:", "New Node");
        if (data.label) {
          callback(data);
        }
      },
      editNode: function (data, callback) {
        data.label = prompt("Edit node label:", data.label || "New Node");
        if (data.label) {
          callback(data);
        }
      },
      addEdge: function (data, callback) {
        if (data.from !== data.to) {
          data.label = prompt("Enter edge label:", "New Edge");
          callback(data);
        } else {
          alert("Cannot connect a node to itself.");
        }
      }
    }
  };
  network = new vis.Network(container, data, options);

  // Event listeners for buttons
  document.getElementById('file-input').addEventListener('change', loadGraph);
  document.getElementById('add-node-btn').addEventListener('click', addNode);
  document.getElementById('add-edge-btn').addEventListener('click', addEdge);
  document.getElementById('delete-selected-btn').addEventListener('click', deleteSelected);
  document.getElementById('save-graph-btn').addEventListener('click', saveGraph);
  document.getElementById('save-as-btn').addEventListener('click', saveAsGraph);
});

// Functions for graph manipulation
function addNode() {
  const nodeId = nodes.length + 1;
  const label = prompt("Enter node label:", `Node ${nodeId}`);
  if (label) {
    nodes.add({ id: nodeId, label });
  }
}

function addEdge() {
  const from = prompt("Enter source node ID:");
  const to = prompt("Enter destination node ID:");
  if (from && to && from !== to) {
    edges.add({ id: edgeIdCounter++, from, to, label: "New Edge" });
  } else {
    alert("Invalid edge input.");
  }
}

function deleteSelected() {
  const selection = network.getSelectedNodes();
  const edgesSelection = network.getSelectedEdges();
  if (selection.length) {
    nodes.remove(selection);
  }
  if (edgesSelection.length) {
    edges.remove(edgesSelection);
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
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const graphData = JSON.parse(e.target.result);
        nodes.clear();
        edges.clear();
        nodes.add(graphData.nodes);
        edges.add(graphData.edges);
        console.log("Graph loaded successfully.");
      } catch (err) {
        alert("Error loading graph: " + err.message);
      }
    };
    reader.readAsText(file);
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
