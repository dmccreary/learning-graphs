# Word Cloud Simulator

Visualize the most frequent words in your text as a word cloud.

<textarea id="wordCloudInput" style="width: 100%; height: 100px;" placeholder="Enter your text here..."></textarea>
<div id="wordCloud" style="width: 100%; height: 400px; border: 1px solid #ccc; background: #f9f9f9;"></div>

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-cloud"></script>
<script>
  function createWordCloud() {
    const text = document.getElementById("wordCloudInput").value.toLowerCase();
    const words = text.match(/\b\w+\b/g) || [];
    const frequency = {};

    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    const data = Object.entries(frequency).map(([text, size]) => ({ text, size: size * 10 }));

    d3.select("#wordCloud").html(""); // Clear previous word cloud
    const svg = d3.select("#wordCloud").append("svg")
      .attr("width", 400)
      .attr("height", 400);

    const layout = d3.layout.cloud()
      .size([400, 400])
      .words(data)
      .padding(5)
      .rotate(() => (~~(Math.random() * 2) * 90))
      .fontSize(d => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      svg.append("g")
        .attr("transform", "translate(200,200)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => d.size + "px")
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }

  document.getElementById("wordCloudInput").addEventListener("input", createWordCloud);
</script>

