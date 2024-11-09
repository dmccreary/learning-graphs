// Create an array of nodes with a 'domain' attribute
var nodes = new vis.DataSet([
    { id: 1, label: 'Node 1A', domain: 'A' },
    { id: 2, label: 'Node 2A', domain: 'A' },
    { id: 3, label: 'Node 3A', domain: 'A' },

    { id: 4, label: 'Node 4B', domain: 'B' },
    { id: 5, label: 'Node 5B', domain: 'B' },
    { id: 6, label: 'Node 6B', domain: 'B' },

    { id: 7, label: 'Node 7C', domain: 'C' },
    { id: 8, label: 'Node 8C', domain: 'C' },
    { id: 9, label: 'Node 9C', domain: 'C' }
  ]);

// Create an array of edges in three clusters
var edges = new vis.DataSet([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },

    { from: 1, to: 4 },

    { from: 4, to: 5 },
    { from: 4, to: 6 },
    { from: 5, to: 6 },

    { from: 4, to: 7 },

    { from: 7, to: 8 },
    { from: 7, to: 9 },
    { from: 8, to: 9 },

    { from: 1, to: 7 }
  ]);

// get the HTML element with the id='mynetwork'
var container = document.getElementById('mynetwork');

var data = {
    nodes: nodes,
    edges: edges
};

// used circle not dot since it centers the label inside the vertex
var options = {
    nodes: {
      shape: 'circle',
      size: 16
    },
    physics: true  // Disable physics to cluster immediately
};

var network = new vis.Network(container, data, options);

// Cluster after stabilization
network.once('stabilized', function () {
  clusterByDomain();
});

// Function to cluster nodes by the 'domain' attribute
function clusterByDomain() {
    // Get unique domains from nodes
    var allNodes = nodes.get();
    var domains = [...new Set(allNodes.map(node => node.domain))];

    domains.forEach(function(domain) {
      // Define clustering options for each domain
      var clusterOptionsByData = {
        joinCondition: function(childNode) {
          return childNode.domain === domain; // Nodes with the same domain will be clustered
        },
        clusterNodeProperties: {
          id: 'cluster:' + domain,
          label: 'Cluster ' + domain,
          borderWidth: 4,
          color: {
            border: 'blue',
            background: '#97C2FC'
          },
          font: { color: 'blue' }
        }
      };
      network.cluster(clusterOptionsByData);
    });
}

// Cluster the nodes immediately after network creation
clusterByDomain();

// Optionally, handle double-click events to open clusters
network.on("doubleClick", function (params) {
    if (params.nodes.length === 1) {
      var nodeId = params.nodes[0];
      if (network.isCluster(nodeId) === true) {
        network.openCluster(nodeId);
      }
    }
});
