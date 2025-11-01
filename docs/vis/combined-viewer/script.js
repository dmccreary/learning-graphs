// Global variables
var nodes, edges, network;

// ========== UTILITY FUNCTIONS ==========

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const sidebarContainer = document.getElementById("sidebar-container");
  const toggleButton = document.getElementById("toggle-button");

  if (sidebar.style.display === "none") {
    sidebar.style.display = "block";
    sidebarContainer.style.minWidth = "250px";
    toggleButton.innerHTML = "&#9776;";
  } else {
    sidebar.style.display = "none";
    sidebarContainer.style.minWidth = "auto";
    toggleButton.innerHTML = "&#8594;";
  }
}

// Function to update statistics
function updateStatistics() {
  var allNodes = nodes.get();
  var allEdges = edges.get();

  // Filter visible nodes
  var visibleNodes = allNodes.filter(node => !node.hidden);

  // Filter visible edges (both connected nodes must be visible)
  var visibleEdges = allEdges.filter(edge => {
    var fromNode = nodes.get(edge.from);
    var toNode = nodes.get(edge.to);
    return (!fromNode.hidden && !toNode.hidden);
  });

  var nodeCount = visibleNodes.length;
  var edgeCount = visibleEdges.length;

  // Find orphan nodes (nodes with no visible edges)
  var connectedNodeIds = new Set();
  visibleEdges.forEach(edge => {
    connectedNodeIds.add(edge.from);
    connectedNodeIds.add(edge.to);
  });
  var orphanNodes = visibleNodes.filter(node => !connectedNodeIds.has(node.id));
  var orphanCount = orphanNodes.length;

  // Update the HTML elements with the statistics
  document.getElementById('nodeCount').textContent = nodeCount;
  document.getElementById('edgeCount').textContent = edgeCount;
  document.getElementById('orphanCount').textContent = orphanCount;
}

// Function to toggle groups
function toggleGroup(groupName) {
  const visible = document.getElementById(`group${groupName}`).checked;
  nodes.forEach(node => {
    if (node.group === groupName) {
      nodes.update({id: node.id, hidden: !visible});
    }
  });
  updateStatistics();
}

// Function to check all groups
function checkAllGroups() {
  const checkboxes = document.querySelectorAll('input[id^="group"]');
  checkboxes.forEach(checkbox => {
    if (!checkbox.checked) {
      checkbox.checked = true;
      toggleGroup(checkbox.id.replace('group', ''));
    }
  });
}

// Function to uncheck all groups
function uncheckAllGroups() {
  const checkboxes = document.querySelectorAll('input[id^="group"]');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkbox.checked = false;
      toggleGroup(checkbox.id.replace('group', ''));
    }
  });
}

// ========== INITIALIZATION ==========

function initializeNetwork(graphData) {
  // Create DataSets from loaded data
  nodes = new vis.DataSet(graphData.nodes);
  edges = new vis.DataSet(graphData.edges);

  // Create a network
  var container = document.getElementById('mynetwork');

  // Provide the data in the vis format
  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    groups: graphData.groups || {},  // Apply group-based styling
    edges: {
      arrows: {
        to: { enabled: true, type: 'arrow', color: 'black', scaleFactor: 1 }
      },
      color: {
        color: 'black',
        inherit: false
      },
      width: 2,
      smooth: { type: 'continuous' }
    },
    physics: {
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        springLength: 100
      }
    }
  };

  network = new vis.Network(container, data, options);

  // Initialize search functionality
  initializeSearch();

  // Update statistics after network is initialized
  updateStatistics();
}

function initializeSearch() {
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchContainer = document.getElementById('search-container');

  searchInput.addEventListener('input', function() {
    var query = this.value.toLowerCase();
    if (query === '') {
      searchResults.style.display = 'none';
      searchResults.innerHTML = '';
      return;
    }

    // Only search visible nodes
    var matches = nodes.get({
      filter: function (item) {
        return !item.hidden && item.label.toLowerCase().includes(query);
      }
    });

    if (matches.length > 0) {
      searchResults.innerHTML = '';
      matches.forEach(function(item) {
        var div = document.createElement('div');
        div.textContent = item.label + ' (' + item.group + ')';
        div.dataset.id = item.id;
        div.addEventListener('click', function() {
          var nodeId = parseInt(this.dataset.id);
          network.focus(nodeId, {
            animation: {
              duration: 500,
              easingFunction: 'easeInOutQuad'
            },
            scale: 1.5
          });
          network.selectNodes([nodeId]);
          searchResults.style.display = 'none';
          searchResults.innerHTML = '';
          searchInput.value = '';
        });
        searchResults.appendChild(div);
      });
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<div style="color: gray; padding: 8px;">No matches found</div>';
      searchResults.style.display = 'block';
    }
  });

  // Close the dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!searchContainer.contains(event.target)) {
      searchResults.style.display = 'none';
      searchResults.innerHTML = '';
    }
  });
}

// ========== LOAD DATA AND START APPLICATION ==========

// Load the graph data from JSON file
fetch('learning-graph.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load learning-graph.json');
    }
    return response.json();
  })
  .then(graphData => {
    initializeNetwork(graphData);
  })
  .catch(error => {
    console.error('Error loading graph data:', error);
    document.getElementById('mynetwork').innerHTML =
      '<div style="padding: 20px; color: red;">Error loading graph data. Please check the console for details.</div>';
  });
