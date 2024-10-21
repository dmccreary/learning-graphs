// Define the nodes with fixed x positions and disable physics for them
var nodes = new vis.DataSet([
    { id: 1, label: "Foundation 1", "shape": "box", group: 1, x: -400, y: -150, fixed: { x: true, y: false }, physics: false },
    { id: 2, label: "Foundation 2", "shape": "box", group: 1, x: -400, y: -100, fixed: { x: true, y: false }, physics: false },
    { id: 3, label: "Foundation 3", "shape": "box", group: 1, x: -400, y: 50, fixed: { x: true, y: false }, physics: false },
    { id: 4, label: "Foundation 4", "shape": "box", group: 1, x: -400, y: 0, fixed: { x: true, y: false }, physics: false },
    { id: 5, label: "Foundation 5", "shape": "box", group: 1, x: -400, y: 150, fixed: { x: true, y: false }, physics: false },

    { id: 21, label: "Level 2.1 (21)", group: 2},
    { id: 22, label: "Level 2.2 (22)", group: 2},
    { id: 23, label: "Level 2.2 (23)", group: 2},
    { id: 24, label: "Level 2.2 (24)", group: 2},
    { id: 25, label: "Level 2.2 (25)", group: 2},

    { id: 31, label: "Level 3.1 (31)", group: 3},
    { id: 32, label: "Level 3.2 (32)", group: 3, x: 100, y: 0, fixed: false },
    { id: 33, label: "Level 3.3 (33)", group: 3, x: 100, y: 100, fixed: false },
    { id: 34, label: "Level 3.1 (34)", group: 3, x: 100, y: -100, fixed: false },
    { id: 35, label: "Level 3.2 (35)", group: 3, x: 100, y: 0, fixed: false },
    { id: 36, label: "Level 3.3 (36)", group: 3, x: 100, y: 100, fixed: false },

    { id: 100, label: "Goal 1 (100)", group: 4, x: 400, y: -150, fixed: { x: true, y: false }, physics: false },
    { id: 101, label: "Goal 2 (101)", group: 4, x: 400, y: 0, fixed: { x: true, y: false }, physics: false },
    { id: 102, label: "Goal 3 (102)", group: 4, x: 400, y: 150, fixed: { x: true, y: false }, physics: false }
]);

  // Define the edges between nodes
  // always go from higher to lower, right side depends on the left
  var edges = new vis.DataSet([
    { from: 21, to: 1 },
    { from: 21, to: 2 },
    { from: 21, to: 3 },
    { from: 22, to: 2 },
    { from: 22, to: 3 },
    { from: 22, to: 4 },
    { from: 23, to: 3 },
    { from: 23, to: 4 },
    { from: 23, to: 5 },
    { from: 24, to: 4 },
    { from: 25, to: 5 },
    { from: 31, to: 21 },
    { from: 32, to: 22 },
    { from: 33, to: 21 },
    { from: 34, to: 22 },
    { from: 34, to: 23 },
    { from: 34, to: 24 },
    { from: 35, to: 25 },
    { from: 36, to: 24 },
    { from: 38, to: 25 },
    { from: 100, to: 31 },
    { from: 100, to: 32 },
    { from: 100, to: 34 },
    { from: 101, to: 31 },
    { from: 101, to: 32 },
    { from: 101, to: 33 },
    { from: 102, to: 32},
    { from: 102, to: 33},
    { from: 102, to: 35},
    { from: 102, to: 36}
  ]);

  // Get the container element
  var container = document.getElementById('network');

  // Provide the data in the vis format
  var data = {
    nodes: nodes,
    edges: edges
  };

  // Configuration options
  var options = {
    physics: {
      enabled: true,
      solver: 'forceAtlas2Based',
      stabilization: {
        iterations: 1000,
        updateInterval: 25
      },
    },
    layout: {
      improvedLayout: true, // Prevent node overlap
    },
    interaction: { 
      dragNodes: true // Allow dragging of nodes
    },
    edges: {
        arrows: {
          to: {
            enabled: true,
            type: 'arrow', // Options: 'arrow', 'bar', 'circle', 'triangle'
            scaleFactor: 1
          }
        },
        smooth: {
          type: 'continuous' // Smooth edges
        }
      },
    // Optional: Define how nodes behave when fixed
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