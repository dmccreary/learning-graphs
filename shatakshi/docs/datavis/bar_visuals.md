# Bar Chart Simulation

Toggle sorting to observe its effect on readability.

<div>
  <label><input type="checkbox" id="sortBars" onchange="updateBarChart()"> Sort Bars</label>
</div>
<div id="barChart" style="width: 100%; height: 400px;"></div>

<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script>
  const barData = Array.from({ length: 10 }, (_, i) => ({ category: `Category ${i + 1}`, value: Math.random() * 100 }));

  function updateBarChart() {
    const sorted = document.getElementById("sortBars").checked;
    const data = [...barData];

    if (sorted) {
      data.sort((a, b) => b.value - a.value);
    }

    const trace = {
      x: data.map(d => d.category),
      y: data.map(d => d.value),
      type: "bar",
      marker: { color: "orange" },
    };

    Plotly.newPlot("barChart", [trace], { title: "Bar Chart Simulation", xaxis: { title: "Categories" }, yaxis: { title: "Values" } });
  }

  updateBarChart();
</script>

