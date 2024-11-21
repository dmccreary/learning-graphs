# Lab 4: Edge Properties

<iframe src="lab-04.html" height="320px" width="620px"></iframe>

[Run Lab 4 Edge MicroSim](lab-04.html){ .md-button .md-button--primary }

Here's a small example of a `vis.js` program that shows edge properties:

1. Edge Labels
2. Edge Color
3. Edge Width
4. Edge Dashes
5. Color Opacity
6. Hover Color
7. Highlight Color
8. Arrows

### JavaScript Code:

```js
// Fetch data from the JSON file
fetch('lab-04.json')
    .then(response => response.json())
    .then(data => {
        // Parse the data from JSON
        const nodes = new vis.DataSet(data.nodes);
        
        // Define edges with additional properties
        const edges = new vis.DataSet([
            { from: 1, to: 3, label: 'Edge 1-3', color: { color: 'red' }, 
               width: 2, arrows: 'to' },
            { from: 1, to: 2, label: 'Edge 1-2', color: { color: 'blue', 
               highlight: 'purple' }, width: 3, 
               arrows: { to: { enabled: true, type: 'arrow' }, 
               from: { enabled: true, type: 'circle' } } },
            { from: 2, to: 4, label: 'Edge 2-4', color: { color: 'green' }, 
            width: 3, dashes: true },
            { from: 2, to: 5, label: 'Edge 2-5', color: { color: 'orange', 
            hover: 'yellow' }, width: 4, arrows: 'middle' },
            { from: 3, to: 6, label: 'Edge 3-6', 
            color: { color: 'purple', opacity: 0.7 }, 
            width: 2, arrows: 'to' }
        ]);

        // Create a network
        const container = document.getElementById('mynetwork');
        const networkData = {
            nodes: nodes,
            edges: edges
        };
        
        const options = {
            edges: {
                font: {
                    size: 14,
                    color: 'black',
                    align: 'horizontal'
                },
                smooth: {
                    type: 'cubicBezier',
                    forceDirection: 'horizontal',
                    roundness: 0.4
                }
            }
        };

        // Initialize the network
        const network = new vis.Network(container, networkData, options);
    })
    .catch(error => console.error('Error loading the network data:', error));
```

## Instructions for Use:

1.  **HTML Setup**: We use [lab-04.html](../lab-04.html) to load this new script.
2.  **Edge Configuration**: Each edge is customized to demonstrate properties like:
    -   **Label**: Displays a label on each edge.
    -   **Color**: Sets custom colors and highlights.
    -   **Width**: Adjusts the thickness of edges.
    -   **Arrows**: Adds directional arrows with different placements.

This setup offers a variety of options for exploring edge properties in vis.js networks.