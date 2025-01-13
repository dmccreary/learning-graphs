# Clustering Simulator

Adjust the number of clusters to see how points are grouped into clusters.

<div>
  <label for="numClusters">Number of Clusters:</label>
  <input type="range" id="numClusters" min="1" max="50" step="1" value="3" oninput="updateClustering()">
  <span id="numClustersValue">3</span>
</div>
<div id="clusteringChart" style="width: 100%; height: 400px;"></div>

<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script>
  // Generate fixed random data points
  const dataPoints = Array.from({ length: 50 }, () => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
  }));

  // Function to assign clusters
  function assignClusters(points, numClusters) {
    // Randomly initialize cluster centers
    const centers = Array.from({ length: numClusters }, () => ({
      x: Math.random() * 10,
      y: Math.random() * 10,
    }));

    // Assign each point to the nearest center
    return points.map(point => {
      const distances = centers.map(center =>
        Math.hypot(point.x - center.x, point.y - center.y)
      );
      const cluster = distances.indexOf(Math.min(...distances));
      return { ...point, cluster };
    });
  }

  function updateClustering() {
    const numClusters = parseInt(document.getElementById("numClusters").value, 10);
    document.getElementById("numClustersValue").innerText = numClusters;

    const clusteredPoints = assignClusters(dataPoints, numClusters);

    // Group points by cluster for plotting
    const clusters = Array.from({ length: numClusters }, (_, cluster) =>
      clusteredPoints.filter(point => point.cluster === cluster)
    );

    // Plot data for each cluster
    const traces = clusters.map((clusterPoints, index) => ({
      x: clusterPoints.map(p => p.x),
      y: clusterPoints.map(p => p.y),
      mode: "markers",
      name: `Cluster ${index + 1}`,
      marker: { size: 10, color: `hsl(${(index / numClusters) * 360}, 100%, 50%)` },
    }));

    Plotly.newPlot("clusteringChart", traces, {
      title: `Clustering Simulation (${numClusters} Clusters)`,
      xaxis: { title: "X" },
      yaxis: { title: "Y" },
    });
  }

  updateClustering();
</script>

