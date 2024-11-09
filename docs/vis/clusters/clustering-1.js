// Fetch the data from 'graph-data.json'
fetch('graph-data.json')
  .then(response => response.json())
  .then(data => {
    // Create DataSets for nodes and edges
    var nodes = new vis.DataSet(data.nodes);
    var edges = new vis.DataSet(data.edges);

    // Get the HTML element with the id='mynetwork'
    var container = document.getElementById('mynetwork');

    var data = {
      nodes: nodes,
      edges: edges
    };

    // Use circle shape for nodes to center the label
    var options = {
      nodes: {
        shape: 'circle',
        size: 16
      },
      physics: true  // Enable physics for clustering
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

      domains.forEach(function (domain) {
        // Define clustering options for each domain
        var clusterOptionsByData = {
          joinCondition: function (childNode) {
            return childNode.domain === domain; // Nodes with the same domain will be clustered
          },
          clusterNodeProperties: {
            id: 'cluster:' + domain,
            label: 'Cluster ' + domain,
            borderWidth: 4,
            color: {
              border: 'blue',
              background: 'LightBlue'
            },
            font: { color: 'black' }
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
  })
  .catch(error => {
    console.error('Error fetching the graph data:', error);
  });
