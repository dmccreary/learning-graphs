# Pie Chart Simulation

Adjust the values to see how proportions change.

<div>
  <label for="segmentA">Segment A:</label>
  <input type="range" id="segmentA" min="1" max="100" step="1" value="25" oninput="updatePieChart()">
  <span id="segmentAValue">25</span>
</div>
<div>
  <label for="segmentB">Segment B:</label>
  <input type="range" id="segmentB" min="1" max="100" step="1" value="35" oninput="updatePieChart()">
  <span id="segmentBValue">35</span>
</div>
<div>
  <label for="segmentC">Segment C:</label>
  <input type="range" id="segmentC" min="1" max="100" step="1" value="40" oninput="updatePieChart()">
  <span id="segmentCValue">40</span>
</div>
<div id="pieChart" style="width: 100%; height: 400px;"></div>

<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script>
  function updatePieChart() {
    const segmentA = parseInt(document.getElementById("segmentA").value, 10);
    const segmentB = parseInt(document.getElementById("segmentB").value, 10);
    const segmentC = parseInt(document.getElementById("segmentC").value, 10);

    document.getElementById("segmentAValue").innerText = segmentA;
    document.getElementById("segmentBValue").innerText = segmentB;
    document.getElementById("segmentCValue").innerText = segmentC;

    const data = [
      {
        values: [segmentA, segmentB, segmentC],
        labels: ["Segment A", "Segment B", "Segment C"],
        type: "pie",
      },
    ];

    Plotly.newPlot("pieChart", data, { title: "Pie Chart Simulation" });
  }

  updatePieChart();
</script>

