# Fast Face Detection Simulation

This demo detects faces in an uploaded image quickly using a lightweight model.

## Instructions
1. Upload an image.
2. Detected faces will be highlighted with bounding boxes.

<input type="file" id="imageUpload" accept="image/*" style="margin-bottom: 10px;">
<div id="output" style="margin-top: 10px; font-weight: bold;">Upload an image to start...</div>
<canvas id="canvas" style="border: 1px solid black; margin-top: 10px;"></canvas>

<script src="https://cdn.jsdelivr.net/npm/face-api.js"></script>
<script>
  async function loadModels() {
    const MODEL_URL = "https://cdn.jsdelivr.net/npm/face-api.js/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL); // Load lightweight model
    console.log("Model loaded!");
  }

  async function handleImage(event) {
    const file = event.target.files[0];
    const output = document.getElementById("output");
    const canvas = document.getElementById("canvas");

    if (!file) {
      output.textContent = "No file selected.";
      return;
    }

    // Clear canvas and output
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    output.textContent = "Processing...";

    const img = await faceapi.bufferToImage(file);
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());

    if (detections.length === 0) {
      output.textContent = "No faces detected.";
      return;
    }

    detections.forEach((detection) => {
      const { x, y, width, height } = detection.box;
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    });

    output.textContent = `Detected ${detections.length} face(s).`;
  }

  document.getElementById("imageUpload").addEventListener("change", handleImage);
  loadModels();
</script>

