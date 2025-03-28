// Declare variables for nodes, edges, and network globally
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
    displayStats(); 
  } else if (attempts > 0) {
    console.warn("Network is not yet available. Retrying...");
    setTimeout(function() {
      waitForNetworkAndSetData(attempts - 1, delay, data); 
    }, delay);
  } else {
    console.error("Failed to initialize network after multiple attempts.");
  }
}

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

          nodes.clear();
          edges.clear();

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

            var data = { nodes: nodes, edges: edges };
            waitForNetworkAndSetData(100, 100, data); 
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

// Display graph statistics
function displayStats() {
  var nodeCount = nodes.length;
  var edgeCount = edges.length;
  document.getElementById('stats').innerHTML =
    'Nodes: ' + nodeCount + '<br>' +
    'Edges: ' + edgeCount;
}

// Initialize network
document.addEventListener('DOMContentLoaded', (event) => {
  var container = document.getElementById('mynetwork');
  if (container) {
    var data = { nodes: nodes, edges: edges };
    var options = {
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        stabilization: { iterations: 100 }
      }
    };
    
    network = new vis.Network(container, data, options);
  }
});

// Toggle legend visibility
function toggleLegend() {
  var legend = document.getElementById('legend');
  if (document.getElementById('legend-checkbox').checked) {
    legend.style.display = 'block';
    displayLegend();
  } else {
    legend.style.display = 'none';
  }
}

// Display legend with node group colors
function displayLegend() {
  var legendHTML = 'Node groups and their colors:<br>';
  var nodeGroups = {}; // Assumed to be generated by node data
  
  nodes.forEach(function(node) {
    if (!nodeGroups[node.group]) {
      nodeGroups[node.group] = node.color;
    }
  });

  for (var group in nodeGroups) {
    legendHTML += `<div style="color:${nodeGroups[group]}">${group}: ${nodeGroups[group]}</div>`;
  }

  document.getElementById('legend').innerHTML = legendHTML;
}

// Load graph on file input
loadGraphFromFile();
