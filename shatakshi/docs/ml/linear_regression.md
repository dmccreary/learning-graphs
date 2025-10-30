# Linear Regression Simulator

This simulation shows how the slope, intercept, and noise level affect a regression line and the data points.

## Adjust Parameters
<div>
  <label for="slope">Slope:</label>
  <input type="range" id="slope" min="-5" max="5" step="0.1" value="1" oninput="updateLinearRegression()">
  <span id="slopeValue">1</span>
</div>
<div>
  <label for="intercept">Intercept:</label>
  <input type="range" id="intercept" min="-10" max="10" step="0.1" value="0" oninput="updateLinearRegression()">
  <span id="interceptValue">0</span>
</div>
<div>
  <label for="noise">Noise Level:</label>
  <input type="range" id="noise" min="0" max="10" step="0.5" value="2" oninput="updateLinearRegression()">
  <span id="noiseValue">2</span>
</div>

## Visualization
<div id="linearRegressionChart" style="width: 100%; height: 400px;"></div>

<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script>
  function generateData(slope, intercept, noise) {
    const x = Array.from({ length: 20 }, (_, i) => i);
    const y = x.map(xi => slope * xi + intercept + (Math.random() - 0.5) * noise);
    return { x, y };
  }

  function updateLinearRegression() {
    const slope = parseFloat(document.getElementById("slope").value);
    const intercept = parseFloat(document.getElementById("intercept").value);
    const noise = parseFloat(document.getElementById("noise").value);

    document.getElementById("slopeValue").innerText = slope;
    document.getElementById("interceptValue").innerText = intercept;
    document.getElementById("noiseValue").innerText = noise;

    const { x, y } = generateData(slope, intercept, noise);
    const regressionLine = x.map(xi => slope * xi + intercept);

    const data = [
      {
        x,
        y,
        mode: "markers",
        name: "Data Points",
        marker: { color: "blue" },
      },
      {
        x,
        y: regressionLine,
        mode: "lines",
        name: "Regression Line",
        line: { color: "red" },
      },
    ];

    Plotly.newPlot("linearRegressionChart", data, {
      title: "Linear Regression Simulation",
      xaxis: { title: "X" },
      yaxis: { title: "Y" },
    });
  }

  updateLinearRegression();
</script>

