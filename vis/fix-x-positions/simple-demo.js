// Define the nodes without fixed x values
var nodes = new vis.DataSet([
    {"id": 1, "label": "Algebra", "group": 1},
    {"id": 2, "label": "Trigonometry", group: 2},
    {"id": 3, "label": "Derivatives", group: 3},
    {"id": 4, "label": "Integrals", group: 3},
    {"id": 5, "label": "Calculus", group: 4},
    {"id": 6, "label": "Differential Equations", "group": 12},
]);

// Function to fix x positions for specific groups
function fixXPositions(nodes) {
    nodes.forEach(function (node) {
        if (node.group === 1) {
            node.x = -200;
            node.shape = "box";
            node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
        } else if (node.group === 12) {
            node.x = 200;
            node.shape = "star";
            node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
        }
    });
}

// After defining nodes, call the function
fixXPositions(nodes);

// Function to fix the x positions for groups 1 and 12 after the data is loaded
/*
nodes.forEach(function (node) {
    if (node.group === 1) {
        node.x = -500;
        node.shape = "box";
        node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
    } else if (node.group === 12) {
        node.x = 500;
        node.shape = "star";
        node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
    }
});
*/

// Define the edges between nodes
var edges = new vis.DataSet([
    {"from": 2, "to": 1}, 
    {"from": 3, "to": 2}, 
    {"from": 4, "to": 2},  
    {"from": 5, "to": 3},
    {"from": 5, "to": 4}, 
    {"from": 6, "to": 5}, 
    {"from": 7, "to": 6}
]);

// Get the container element
var container = document.getElementById('network');

// Provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};

var options = {
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
    interaction: { 
        dragNodes: true // Allow dragging of nodes
    },
    edges: {
        arrows: {
            to: {
                enabled: true,
                type: 'arrow',
                scaleFactor: 1
            }
        },
        smooth: {
            type: 'continuous' // Smooth edges
        }
    },
    nodes: {
        shape: 'dot',
        size: 20,
        font: {
            size: 14,
            color: 'black'
        },
        borderWidth: 2,
        borderWidthSelected: 4
    }
};

// Initialize your network!
var network = new vis.Network(container, data, options);

// Center the graph after stabilization
network.once("stabilized", function () {
    network.moveTo({
      position: { x: 0, y: 0 }, // Center point
      scale: 1,                 // Adjust the scale if needed
      offset: { x: 0, y: 0 },  // No additional offset
      animation: {
        duration: 1000,
        easingFunction: 'easeInOutQuad'
      }
    });
});

// Optional: Handle window resize to keep the network centered
window.addEventListener('resize', function () {
    network.fit({
      animation: {
        duration: 500,
        easingFunction: 'easeInOutQuad'
      }
    });
});
