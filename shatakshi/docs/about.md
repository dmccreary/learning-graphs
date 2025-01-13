# Data Storytelling Clustering Example

This page demonstrates clustering functionality using **vis.js** for data storytelling.

## Example Code

Below is the HTML code for the clustering example. You can copy and use it directly in an HTML file.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Data Storytelling Clustering</title>
  <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      display: flex;
    }
    #sidebar {
      width: auto;
      max-width: 300px;
      padding: 10px;
      margin-right: 10px;
      border: 1px solid lightgray;
      background-color: #f9f9f9;
    }
    #main {
      flex: 1;
      padding: 10px;
    }
    #mynetwork {
      width: 100%;
      height: 700px;
      background-color: aliceblue;
      border: 1px solid lightgray;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div id="sidebar">
    <h3>Actions</h3>
    <button onclick="clusterByDomain()">Cluster by Domain</button>
    <button onclick="reclusterAll()">Re-cluster All</button>
    <button onclick="clearClusters()">Clear Clusters</button>
  </div>
  <div id="main">
    <div id="mynetwork"></div>
  </div>
  <script>
    const nodes = new vis.DataSet([
      { id: 1, label: "Data Storytelling", domain: "core" },
      { id: 2, label: "Computational Thinking", domain: "foundation" },
      { id: 3, label: "Data Types", domain: "foundation" },
      { id: 4, label: "Text Analysis", domain: "level2" },
      { id: 5, label: "Image Processing", domain: "level2" },
      { id: 6, label: "Machine Learning", domain: "foundation" },
      { id: 7, label: "AI Tools", domain: "goal" },
      { id: 8, label: "Wolfram Mathematica", domain: "goal" },
      { id: 9, label: "GPT/OpenAI", domain: "goal" },
      { id: 10, label: "Tableau", domain: "goal" },
      { id: 11, label: "Visualization", domain: "core" },
      { id: 12, label: "Real-world Applications", domain: "core" }
    ]);
    const edges = new vis.DataSet([
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 3, to: 5 },
      { from: 2, to: 6 },
      { from: 1, to: 7 },
      { from: 7, to: 8 },
      { from: 7, to: 9 },
      { from: 7, to: 10 },
      { from: 1, to: 11 },
      { from: 11, to: 12 }
    ]);
    const container = document.getElementById("mynetwork");
    const data = { nodes, edges };
    const options = { edges: { arrows: "to" }, layout: { hierarchical: { direction: "LR" } } };
    const network = new vis.Network(container, data, options);
    function clusterByDomain() {
      const allNodes = nodes.get();
      const domains = [...new Set(allNodes.map(node => node.domain))];
      domains.forEach(domain => {
        network.cluster({
          joinCondition: childNode => childNode.domain === domain,
          clusterNodeProperties: {
            label: "Cluster " + domain,
            shape: "box",
            color: domain === "goal" ? "#FFD700" : domain === "foundation" ? "#90EE90" : "#FFCC99"
          }
        });
      });
    }
    function clearClusters() {
      network.setData({ nodes, edges });
    }
  </script>
</body>
</html>
