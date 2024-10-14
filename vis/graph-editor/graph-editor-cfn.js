// Declare variables for nodes, edges, and network globally
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null; // Initialize as null
var edgeIdCounter = 1; // Counter for edge IDs

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    // Initialize network only if container is found
    var container = document.getElementById('mynetwork');
    if (container) {
        console.log("In container. Initializing network...");

        // Create node and edge datasets
        var data = { nodes: nodes, edges: edges };
        var options = {
            physics: {
                enabled: true,
                solver: "forceAtlas2Based",
                stabilization: { iterations: 100 }
            }
        };

        // Create network
        network = new vis.Network(container, data, options);
        console.log("In container. Network initialized successfully.");

        // Check if the network is initialized right after creation
        if (network) {
            console.log("Network is now available.");
        } else {
            console.error("Network is still not available after initialization.");
        }

        // Load graph data from JSON
        loadGraphFromFile();
    } else {
        console.error("'mynetwork' container not found. Network not initialized.");
    }
});

// Function to load graph from JSON file
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

                    // Clear current nodes and edges before loading new data
                    nodes.clear();
                    edges.clear();

                    // Load nodes and edges from the file
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

                        // Prepare data to set to the network
                        var data = { nodes: nodes, edges: edges };

                        // Start waiting for the network to be ready
                        waitForNetworkAndSetData(100, 100, data); // 100 attempts, 100 ms delay
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

// Function to wait for the network to be ready and then set data
function waitForNetworkAndSetData(attempts, delay, data) {
    console.log("Checking if network is ready... Attempt remaining:", attempts);
    
    if (network) {
        // Set data to the network once it is ready
        network.setData(data);
        console.log("Network is ready. Data has been set.");
        
        // Count orphaned nodes and display stats
        var orphanedNodesCount = countOrphanedNodes();
        console.log("Orphaned Nodes Count:", orphanedNodesCount);
        displayStats(); 
    } else if (attempts > 0) {
        console.warn("Network is not yet available. Retrying...");
        setTimeout(function() {
            waitForNetworkAndSetData(attempts - 1, delay, data); // Recursive call with decremented attempts
        }, delay);
    } else {
        console.error("Failed to initialize network after multiple attempts.");
    }
}

// Function to count orphaned nodes
function countOrphanedNodes() {
    if (!network) {
        console.error("Network is not initialized.");
        return 0;
    }

    let orphanedCount = 0;
    nodes.forEach(function(node) {
        var connectedEdges = network.getConnectedEdges(node.id);
        if (connectedEdges.length === 0) {
            orphanedCount++;
        }
    });
    return orphanedCount;
}

// Function to display statistics
function displayStats() {
    var nodeCount = nodes.length;
    var edgeCount = edges.length;
    var orphanedCount = countOrphanedNodes();
    console.log("Stats - Nodes:", nodeCount, "Edges:", edgeCount, "Orphaned Nodes:", orphanedCount);
}

// Display graph statistics
function displayStats() {
    console.log("Displaying statistics...");
    var nodeCount = nodes.length;
    var edgeCount = edges.length;
  
    // error is here for getConnectedEdges no longer working
    // we want a count of the nodes without edges
    var orphanedNodes = countOrphanedNodes();
  
    document.getElementById('stats').innerHTML =
      'Nodes: ' + nodeCount + '<br>' +
      'Edges: ' + edgeCount + '<br>' +
      'Orphaned Nodes: ' + orphanedNodes;
    console.log("Stats - Nodes:", nodeCount, "Edges:", edgeCount, "Orphaned Nodes:", orphanedNodes);
    // console.log("Stats - Nodes:", nodeCount, "Edges:", edgeCount);
  
  }