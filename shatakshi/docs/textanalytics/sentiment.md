# Sentiment Analysis

Analyze the sentiment of your text (positive, negative, or neutral).

<textarea id="sentimentInput" style="width: 100%; height: 100px;" placeholder="Enter your text here..."></textarea>
<p>Sentiment:</p>
<div id="sentimentResult" style="font-weight: bold; font-size: 16px;"></div>

<script>
  function mockSentimentAnalysis(text) {
    const positiveWords = ["love", "great", "excellent", "happy"];
    const negativeWords = ["hate", "bad", "terrible", "sad"];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    let score = 0;
    words.forEach(word => {
      if (positiveWords.includes(word)) score++;
      if (negativeWords.includes(word)) score--;
    });

    if (score > 0) return "Positive 😊";
    if (score < 0) return "Negative 😞";
    return "Neutral 😐";
  }

  function analyzeSentiment() {
    const text = document.getElementById("sentimentInput").value;
    const result = mockSentimentAnalysis(text);
    document.getElementById("sentimentResult").innerText = result;
  }

  document.getElementById("sentimentInput").addEventListener("input", analyzeSentiment);
</script>

