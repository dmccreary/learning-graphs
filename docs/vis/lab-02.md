# Lab 2: JSON

<iframe src="../lab-02.html" height="320px" width="320px"></iframe>

[Run Lab 2](./lab-02.html)

## Prompt

```
Refactor the attached vis.js program to read the data
from a file called "lab-02.json" and store
the JavaScript in a separate file called lab-02.js
```

## ChatGPT 4o Response

To refactor your `lab-01.html` file, we can follow these steps:

1.  Move the JavaScript code to a separate file called `lab-02.js`.
2.  Fetch the node and edge data from a separate `lab-02.json` file.
3.  Refactor the HTML to reference the new JavaScript file and load the JSON data dynamically.

Here is how we can structure the files:

### Refactored HTML (`lab-01.html`):

```html
<html>
<head>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <script type="text/javascript" src="network.js"></script>

    <style type="text/css">
        #mynetwork {
            width: 600px;
            height: 400px;
            border: 1px solid lightgray;
        }
    </style>
</head>
<body>
<div id="mynetwork"></div>
<a href="lab-01">Back to Lesson</a>
</body>
</html>
```

### JavaScript (`lab-02.js`):

```javascript
// Fetch data from the JSON file
fetch('lab-02.json')
    .then(response => response.json())
    .then(data => {
        // Parse the data from JSON
        const nodes = new vis.DataSet(data.nodes);
        const edges = new vis.DataSet(data.edges);

        // Create a network
        const container = document.getElementById('mynetwork');
        const networkData = {
            nodes: nodes,
            edges: edges
        };
        const options = {};

        // Initialize the network
        const network = new vis.Network(container, networkData, options);
    })
    .catch(error => console.error('Error loading the network data:', error));
```

### JSON File (`lab-01.json`):

```json
{
    "nodes": [
        {"id": 1, "label": "Node 1"},
        {"id": 2, "label": "Node 2"},
        {"id": 3, "label": "Node 3"},
        {"id": 4, "label": "Node 4"},
        {"id": 5, "label": "Node 5"}
    ],
    "edges": [
        {"from": 1, "to": 3},
        {"from": 1, "to": 2},
        {"from": 2, "to": 4},
        {"from": 2, "to": 5}
    ]
}
```

### Explanation:

-   The HTML file now only includes the necessary script tags and references the new JavaScript file (`network.js`).
-   The `network.js` script fetches the data from `lab-01.json` and initializes the network once the data is loaded.
-   The `lab-01.json` file contains the nodes and edges in a format that can be easily fetched and parsed in JavaScript.

With this refactor, your data can now be dynamically loaded from the JSON file, and your JavaScript code is cleanly separated from the HTML.