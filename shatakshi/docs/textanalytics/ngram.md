# N-Gram Generator

Generate n-grams from your text by selecting the N value.

<textarea id="ngramInput" style="width: 100%; height: 100px;" placeholder="Enter your text here..."></textarea>
<label for="ngramSize">N-Gram Size:</label>
<select id="ngramSize" onchange="generateNGrams()" style="margin-bottom: 10px;">
  <option value="1">1 (Unigrams)</option>
  <option value="2">2 (Bigrams)</option>
  <option value="3">3 (Trigrams)</option>
</select>
<p>Generated N-Grams:</p>
<div id="ngramOutput" style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ccc;"></div>

<script>
  function generateNGrams() {
    const text = document.getElementById("ngramInput").value;
    const n = parseInt(document.getElementById("ngramSize").value, 10);
    const words = text.split(/\s+/).filter(Boolean);
    const ngrams = [];
    for (let i = 0; i <= words.length - n; i++) {
      ngrams.push(words.slice(i, i + n).join(" "));
    }
    document.getElementById("ngramOutput").innerText = ngrams.join(", ");
  }

  document.getElementById("ngramInput").addEventListener("input", generateNGrams);
</script>

