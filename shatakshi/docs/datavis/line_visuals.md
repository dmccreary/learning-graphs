# Line Chart Simulation

Adjust the moving average window size to smooth the trend.

<div>
  <label for="windowSize">Moving Average Window:</label>
  <input type="range" id="windowSize" min="1" max="10" step="1" value="3" oninput="updateLineChart()">
  <span id="windowSizeValue">3</span>
</div>
<div id="lineChart" style="width: 100%; height: 400px;"></div>

<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script>
  const rawData = Array.from({ length: 50 }, () => Math.random() * 100);

  function calculateMovingAverage(data, windowSize) {
    return data.map((_, idx) => {
      if (idx < windowSize - 1) return null;
      const slice = data.slice(idx - windowSize + 1, idx + 1);
      return slice.reduce((sum, val) => sum + val, 0) / windowSize;
    });
  }

  function updateLineChart() {
    const windowSize = parseInt(document.getElementById("windowSize").value, 10);
    document.getElementById("windowSizeValue").innerText = windowSize;

    const movingAvg = calculateMovingAverage(rawData, windowSize);

    const data = [
      { x: rawData.map((_, i) => i), y: rawData, mode: "lines", name: "Raw Data", line: { color: "gray" } },
      { x: rawData.map((_, i) => i), y: movingAvg, mode: "lines", name: "Moving Average", line: { color: "blue" } },
    ];

    Plotly.newPlot("lineChart", data, { title: "Line Chart Simulation", xaxis: { title: "Time" }, yaxis: { title: "Value" } });
  }

  updateLineChart();
</script>

