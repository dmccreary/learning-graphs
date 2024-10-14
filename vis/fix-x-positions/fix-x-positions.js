// Define the nodes with fixed x positions and disable physics for them
var nodes = new vis.DataSet([
    { id: 1, label: "Foundation 1", group: 1, x: -300, y: -50, fixed: { x: true, y: false }, physics: false },
    { id: 2, label: "Foundation 2", group: 1, x: -300, y: 50, fixed: { x: true, y: false }, physics: false },
    { id: 3, label: "Level 2.1 (3)", group: 2, x: 0, y: -100, fixed: false },
    { id: 4, label: "Level 2.2 (4)", group: 2, x: 0, y: 100, fixed: false },
    { id: 5, label: "Level 3.1 (5)", group: 3, x: 100, y: -100, fixed: false },
    { id: 6, label: "Level 3.2 (6)", group: 3, x: 100, y: 0, fixed: false },
    { id: 7, label: "Level 3.3 (7)", group: 3, x: 100, y: 100, fixed: false },

    { id: 8, label: "Goal 1 (8)", group: 4, x: 300, y: -150, fixed: { x: true, y: false }, physics: false },
    { id: 9, label: "Goal 2 (9)", group: 4, x: 300, y: 0, fixed: { x: true, y: false }, physics: false },
    { id: 10, label: "Goal 3 (10)", group: 4, x: 300, y: 150, fixed: { x: true, y: false }, physics: false }
]);

  // Define the edges between nodes
  // always go from higher to lower, right side depends on the left
  var edges = new vis.DataSet([
    { from: 3, to: 1 },
    { from: 4, to: 2 },
    { from: 3, to: 2 },
    { from: 3, to: 4 },
    { from: 5, to: 3 },
    { from: 6, to: 5 },
    { from: 6, to: 4 },
    { from: 7, to: 4 },
    { from: 8, to: 6 },
    { from: 8, to: 5 },
    { from: 9, to: 6},
    { from: 10, to: 7}
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
      shape: 'circle',
      size: 30,
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