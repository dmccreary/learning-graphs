# LLM Simulation with Gemini API

This simulation performs text completion, summarization, and Q&A using a Flask backend.

## Choose Task
<div>
  <label for="taskType">Task:</label>
  <select id="taskType">
    <option value="completion">Text Completion</option>
    <option value="summarization">Summarization</option>
    <option value="qa">Question & Answer</option>
  </select>
</div>

## Input Area
<div>
  <label for="userInput">Enter your text:</label>
  <textarea id="userInput" rows="4" style="width: 100%;"></textarea>
  <button onclick="runLLM()">Run</button>
</div>

## Output
<div id="outputArea" style="margin-top: 20px;">
  <h3>Output:</h3>
  <p id="outputText" style="padding: 10px; background-color: #f9f9f9; border: 1px solid #ccc;"></p>
</div>

<script>
  async function runLLM() {
    const taskType = document.getElementById("taskType").value;
    const userInput = document.getElementById("userInput").value.trim();
    const outputArea = document.getElementById("outputText");

    if (!userInput) {
      outputArea.innerText = "Please enter some input.";
      return;
    }

    outputArea.innerText = "Processing...";

    try {
      const response = await fetch("http://127.0.0.1:5000/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskType, userInput }),
      });

      const result = await response.json();

      if (response.ok) {
        outputArea.innerText = result.text || "No response received.";
      } else {
        outputArea.innerText = `Error: ${result.message || "An error occurred."}`;
      }
    } catch (error) {
      outputArea.innerText = `Error: ${error.message}`;
    }
  }
</script>

