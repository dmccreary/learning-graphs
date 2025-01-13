# KNN Classification Simulator

This simulator dynamically classifies data points using the KNN algorithm. Adjust `k` to see how the decision boundary changes.

## Controls
<div>
  <label for="kValue">Number of Neighbors (k):</label>
  <input type="range" id="kValue" min="1" max="25" step="1" value="3" oninput="updateKNN()">
  <span id="kValueDisplay">3</span>
</div>
<button onclick="generateData()">Generate New Data</button>

<div id="knnChart" style="width: 100%; height: 500px;"></div>

<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script>
  let dataPoints = [];
  let grid = [];

  function generateData() {
    // Generate random data points for two classes
    const classA = Array.from({ length: 25 }, () => ({ x: Math.random() * 10, y: Math.random() * 10, label: "A" }));
    const classB = Array.from({ length: 25 }, () => ({ x: Math.random() * 10 + 10, y: Math.random() * 10 + 10, label: "B" }));
    dataPoints = [...classA, ...classB];

    // Generate a fine grid of points to classify
    grid = [];
    for (let x = 0; x <= 20; x += 0.5) {
      for (let y = 0; y <= 20; y += 0.5) {
        grid.push({ x, y });
      }
    }

    updateKNN();
  }

  function classifyKNN(grid, dataPoints, k) {
    return grid.map(point => {
      const distances = dataPoints.map(data => ({
        ...data,
        distance: Math.hypot(point.x - data.x, point.y - data.y),
      }));

      // Find the k-nearest neighbors
      const neighbors = distances.sort((a, b) => a.distance - b.distance).slice(0, k);

      // Count the labels among neighbors
      const labelCounts = neighbors.reduce((acc, neighbor) => {
        acc[neighbor.label] = (acc[neighbor.label] || 0) + 1;
        return acc;
      }, {});

      // Determine the majority label
      const majorityLabel = Object.keys(labelCounts).reduce((a, b) =>
        labelCounts[a] > labelCounts[b] ? a : b
      );

      return { ...point, label: majorityLabel };
    });
  }

  function updateKNN() {
    const k = parseInt(document.getElementById("kValue").value, 10);
    document.getElementById("kValueDisplay").innerText = k;

    // Classify grid points
    const classifiedGrid = classifyKNN(grid, dataPoints, k);

    // Separate points by their classification
    const gridClassA = classifiedGrid.filter(point => point.label === "A");
    const gridClassB = classifiedGrid.filter(point => point.label === "B");

    // Separate original data points by class
    const dataClassA = dataPoints.filter(point => point.label === "A");
    const dataClassB = dataPoints.filter(point => point.label === "B");

    // Plot decision regions and original data
    const traces = [
      {
        x: gridClassA.map(p => p.x),
        y: gridClassA.map(p => p.y),
        mode: "markers",
        marker: { color: "rgba(0, 0, 255, 0.2)", size: 8 },
        name: "Region A",
        hoverinfo: "skip",
      },
      {
        x: gridClassB.map(p => p.x),
        y: gridClassB.map(p => p.y),
        mode: "markers",
        marker: { color: "rgba(255, 0, 0, 0.2)", size: 8 },
        name: "Region B",
        hoverinfo: "skip",
      },
      {
        x: dataClassA.map(p => p.x),
        y: dataClassA.map(p => p.y),
        mode: "markers",
        marker: { color: "blue", size: 10 },
        name: "Class A",
      },
      {
        x: dataClassB.map(p => p.x),
        y: dataClassB.map(p => p.y),
        mode: "markers",
        marker: { color: "red", size: 10 },
        name: "Class B",
      },
    ];

    Plotly.newPlot("knnChart", traces, {
      title: `KNN Classification (k = ${k})`,
      xaxis: { title: "X", range: [0, 20] },
      yaxis: { title: "Y", range: [0, 20] },
    });
  }

  // Initialize
  generateData();
</script>

