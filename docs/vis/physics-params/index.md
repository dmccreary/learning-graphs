# Physics Parameters

[Run the MicroSim](physics-params.html)

## Prompt

```linenums="0"
Create a vis.js program that demonstrates the different parameters in a physics model. Add horizontal sliders to change the physics parameters.
```

ChatGPT o1-preview thought for 17 seconds

Sure! Below is a vis.js program that demonstrates different physics parameters in a network visualization. You can adjust the parameters using horizontal sliders to see how they affect the network's behavior.

### **HTML and JavaScript Code:**

Save the following code in an `index.html` file and open it in a web browser.

```html
<!DOCTYPE html>
<html>
<head>
  <title>vis.js Physics Parameters Demo</title>
  
  <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <style type="text/css">
    #network {
      width: 800px;
      height: 600px;
      border: 1px solid lightgray;
      margin-bottom: 20px;
    }
    .slider-container {
      margin: 10px 0;
    }
    .slider-label {
      display: inline-block;
      width: 150px;
    }
  </style>
</head>
<body>

<div id="network"></div>

<div class="slider-container">
  <label class="slider-label" for="repulsion">Repulsion (Node Distance):</label>
  <input type="range" id="repulsion" min="50" max="500" value="100" step="10">
  <span id="repulsion-value">100</span>
</div>

<div class="slider-container">
  <label class="slider-label" for="gravity">Central Gravity:</label>
  <input type="range" id="gravity" min="0" max="1" value="0.3" step="0.01">
  <span id="gravity-value">0.30</span>
</div>

<div class="slider-container">
  <label class="slider-label" for="damping">Damping:</label>
  <input type="range" id="damping" min="0" max="1" value="0.09" step="0.01">
  <span id="damping-value">0.09</span>
</div>

<script type="text/javascript">
  // Create nodes and edges for the network
  var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'},
    {id: 6, label: 'Node 6'},
    {id: 7, label: 'Node 7'}
  ]);

  var edges = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 3, to: 6},
    {from: 3, to: 7}
  ]);

  // Get the container element
  var container = document.getElementById('network');

  // Initial physics options
  var physicsOptions = {
    repulsion: {
      centralGravity: 0.3,
      nodeDistance: 100,
      damping: 0.09
    },
    solver: 'repulsion'
  };

  // Initialize the network
  var data = {nodes: nodes, edges: edges};
  var options = {physics: physicsOptions};
  var network = new vis.Network(container, data, options);

  // Function to update physics options
  function updatePhysics() {
    network.setOptions({physics: physicsOptions});
  }

  // Event listeners for sliders
  document.getElementById('repulsion').addEventListener('input', function () {
    var value = parseInt(this.value);
    document.getElementById('repulsion-value').innerText = value;
    physicsOptions.repulsion.nodeDistance = value;
    updatePhysics();
  });

  document.getElementById('gravity').addEventListener('input', function () {
    var value = parseFloat(this.value).toFixed(2);
    document.getElementById('gravity-value').innerText = value;
    physicsOptions.repulsion.centralGravity = parseFloat(value);
    updatePhysics();
  });

  document.getElementById('damping').addEventListener('input', function () {
    var value = parseFloat(this.value).toFixed(2);
    document.getElementById('damping-value').innerText = value;
    physicsOptions.repulsion.damping = parseFloat(value);
    updatePhysics();
  });
</script>

</body>
</html>
```

### **Explanation:**

- **Nodes and Edges:**

    -   We define a simple network with 7 nodes and connections (edges) between them.
    -   Nodes are labeled from "Node 1" to "Node 7".
    -   Edges create connections forming a small network graph.

- **Physics Options:**

    -   We initialize the physics options with default values:
        -   `centralGravity`: Attraction of nodes towards the center.
        -   `nodeDistance`: Desired distance between nodes (affects repulsion).
        -   `damping`: Reduces the velocity over time to stabilize the network.
    -   We set the physics solver to `'repulsion'` for a force-directed layout.
-   **Sliders:**

    -   Three sliders allow users to adjust:
        -   **Repulsion (Node Distance):** How far apart nodes repel each other.
        -   **Central Gravity:** How strongly nodes are pulled toward the center.
        -   **Damping:** The rate at which movement slows down over time.
    -   Each slider displays its current value next to it.
-   **Updating Physics:**

    -   When a slider is moved, an event listener updates the corresponding physics parameter.
    -   The `network.setOptions()` method is called to apply the new physics settings.
    -   The network visualization updates in real-time to reflect changes.
-   **Styling:**

    -   Basic CSS styles define the size of the network container and layout of sliders.


### How to Use:

1.  **Copy and Save the Code:**

    -   Paste the code into a text editor and save it as `index.html`.
2.  **Open in a Web Browser:**

    -   Double-click the `index.html` file to open it in your default web browser.
3.  **Interact with the Sliders:**

    -   Adjust the sliders for Repulsion, Central Gravity, and Damping.
    -   Observe how the network graph rearranges itself based on the physics parameters.

### Understanding the Parameters

-   **Repulsion (Node Distance):**

    -   Higher values increase the distance nodes push away from each other.
    -   Lower values allow nodes to come closer together.

-   **Central Gravity:**

    -   Higher values pull nodes towards the center more strongly.
    -   A value of `0` means no central gravity; nodes only interact based on repulsion.

-   **Damping:**

    -   Controls how quickly nodes slow down after movement.
    -   Higher values make the network stabilize faster.

Feel free to experiment with different values to see how they affect the network's behavior. This interactive demo helps in understanding how physics parameters influence 
force-directed graph layouts in vis.js.
