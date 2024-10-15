// Declare variables for nodes, edges, and network globally
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;

// Function to wait for the network to be ready and then set data
function waitForNetworkAndSetData(attempts, delay, data) {
  if (network) {
    network.setData(data);
    displayStats();
  } else if (attempts > 0) {
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
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          var graphData = JSON.parse(e.target.result);
          nodes.clear();
          edges.clear();

          if (graphData.nodes && graphData.edges) {
            nodes.add(graphData.nodes);
            edges.add(graphData.edges);

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

// Initialize the network
document.addEventListener('DOMContentLoaded', (event) => {
  var container = document.getElementById('mynetwork');
  var data = { nodes: nodes, edges: edges };
  var options = {
    physics: {
      enabled: true,
      solver: "forceAtlas2Based",
      stabilization: { iterations: 100 }
    }
  };

  network = new vis.Network(container, data, options);

  loadGraphFromFile(); // Initialize file loading on page load
});

// Display graph statistics
function displayStats() {
  var nodeCount = nodes.length;
  var edgeCount = edges.length;
  document.getElementById('stats').innerHTML =
    'Nodes: ' + nodeCount + '<br>' +
    'Edges: ' + edgeCount;
}

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
  var nodeGroups = {}; // To hold unique colors for each group

  nodes.forEach(function(node) {
    if (!nodeGroups[node.group]) {
      nodeGroups[node.group] = node.color || 'gray'; // Default to gray if no color is defined
    }
  });

  for (var group in nodeGroups) {
    legendHTML += `<div style="color:${nodeGroups[group]}">${group}: ${nodeGroups[group]}</div>`;
  }

  document.getElementById('legend').innerHTML = legendHTML;
}
