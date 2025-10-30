# docs/tokenization.md

# Understanding Tokenization
Tokenization is the process of breaking down text into smaller units like words or sentences. This is a fundamental step in natural language processing (NLP).

# Tokenization Simulation

This interactive demo shows how tokenization works with different modes (word, sentence, and token-level embeddings). Modify the text or select a mode to see the visualization.

<div>
  <textarea id="inputText" style="width: 100%; height: 100px;" placeholder="Enter your text here..."></textarea>
  <label for="tokenizationMode">Select Mode:</label>
  <select id="tokenizationMode" onchange="updateVisualizations()" style="margin-bottom: 10px;">
    <option value="word">Word Tokenization</option>
    <option value="sentence">Sentence Tokenization</option>
    <option value="token">Token-Level Embeddings</option>
  </select>
  <div id="visualizations" style="display: flex; flex-wrap: wrap; gap: 20px;">
    <div id="barChart" style="flex: 1; min-width: 300px; height: 400px;"></div>
    <div id="scatterPlot" style="flex: 1; min-width: 300px; height: 400px;"></div>
  </div>
</div>

<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script>
  function tokenize(text, mode) {
    if (mode === "word") {
      return text.split(/\s+/);
    } else if (mode === "sentence") {
      return text.match(/[^.!?]+[.!?]/g) || [text];
    } else if (mode === "token") {
      // Simulated tokenization into smaller subwords/tokens
      return text.split(/\b/);
    }
  }

  function generateEmbeddings(tokens) {
    // Simulate random embeddings for visualization
    return tokens.map(() => [Math.random() * 10, Math.random() * 10]);
  }

  function updateVisualizations() {
    const text = document.getElementById("inputText").value || "Enter some text to tokenize.";
    const mode = document.getElementById("tokenizationMode").value;

    const tokens = tokenize(text, mode);
    const embeddings = generateEmbeddings(tokens);

    // Bar Chart: Token lengths or IDs
    const barData = [
      {
        x: tokens.map((_, i) => i + 1),
        y: tokens.map(token => token.length),
        type: "bar",
        text: tokens,
        hoverinfo: "text",
        name: "Token Lengths",
      },
    ];
    const barLayout = {
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Tokenization`,
      xaxis: { title: "Token Index" },
      yaxis: { title: "Length / ID" },
    };
    Plotly.newPlot("barChart", barData, barLayout);

    // Scatter Plot: Embeddings
    const scatterData = [
      {
        x: embeddings.map(e => e[0]),
        y: embeddings.map(e => e[1]),
        mode: "markers+text",
        text: tokens,
        textposition: "top center",
        marker: { size: 10 },
      },
    ];
    const scatterLayout = {
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Embeddings`,
      xaxis: { title: "Embedding Dimension 1" },
      yaxis: { title: "Embedding Dimension 2" },
    };
    Plotly.newPlot("scatterPlot", scatterData, scatterLayout);
  }

  // Initial Visualization
  document.addEventListener("DOMContentLoaded", updateVisualizations);
</script>
