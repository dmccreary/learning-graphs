# Hover Text

<iframe src="hover-text.html" height="400px" width="600px"></iframe>
[Run the Hover Text MicroSim](./hover-text.html){ .md-button .md-button--primary }

Things to try:

1. Hover over a node - note the text describes the node
2. Hover over an edge - note the text describes the edge

Below is a complete HTML example using the vis-network library that demonstrates how to display tooltips when hovering over nodes and edges. The tooltips show the text associated with each vertex (node) and edge.

## Features Implemented:

1. **Nodes with Tooltips:** Each node has a ```title``` property that specifies the text to display when hovered over.
2. **Edges with Tooltips:** Similarly, each edge has a ```title``` property for hover text.
3. **Customized Appearance:** Nodes and edges are styled with different colors, shapes, and sizes for better visualization.

## Summary

1. Both nodes end edges have ```title``` properties.
2. The options have an ```interaction``` section

```javascript
options: {
   interaction: {
        hover: true, // Enable hover interactions
        tooltipDelay: 200 // Delay before showing tooltip
    }
}
```

## Full listing

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>vis.js Hover Demo</title>
    <!-- Include the vis-network library from a CDN -->
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <style type="text/css">
        body {
            font-family: Arial, Helvetica, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        #mynetwork {
            width: 700px;
            height: 500px;
            background-color: aliceblue;
            border: 1px solid silver;
        }
        a {
            margin-top: 20px;
            text-decoration: none;
            color: #007BFF;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h2>vis.js Hover Function Demo</h2>
    <div id="mynetwork"></div>
    <a href=".">Back to Lesson Plan</a>
    <script type="text/javascript">
        // Create an array of nodes with 'title' for tooltips
        var nodes = new vis.DataSet([
            // Goal node on the right, fixed horizontally
            { 
                id: 1, 
                label: "Arithmetic", 
                color: "gold", 
                shape: "star", 
                size: 30, 
                x: 200, 
                y: 0, 
                fixed: { x: true, y: false }, 
                font: { size: 24 },
                title: "This is the Arithmetic node representing the main topic."
            },
            // Operation nodes
            { 
                id: 2, 
                label: "Addition", 
                color: "tan", 
                y: -200,
                title: "Addition is the process of finding the total or sum by combining two or more numbers."
            },
            { 
                id: 3, 
                label: "Subtraction", 
                color: "tan", 
                y: -100,
                title: "Subtraction is the process of finding the difference between two numbers."
            },
            { 
                id: 4, 
                label: "Multiplication", 
                color: "tan", 
                y: 100,
                title: "Multiplication is the process of combining equal groups to find the total."
            },
            { 
                id: 5, 
                label: "Division", 
                color: "tan", 
                y: 200,
                title: "Division is the process of splitting a number into equal parts."
            },
            // Foundation node on the left, fixed horizontally
            { 
                id: 6, 
                label: "Numbers", 
                color: "coral", 
                shape: "box", 
                x: -200, 
                y: 0, 
                fixed: { x: true, y: false },
                title: "Numbers are the basic elements used in arithmetic operations."
            }
        ]);

        // Create an array of edges with 'title' for tooltips
        var edges = new vis.DataSet([
            { 
                from: 1, 
                to: 2,
                title: "Connects Arithmetic to Addition"
            },
            { 
                from: 1, 
                to: 3,
                title: "Connects Arithmetic to Subtraction"
            },
            { 
                from: 1, 
                to: 4,
                title: "Connects Arithmetic to Multiplication"
            },
            { 
                from: 1, 
                to: 5,
                title: "Connects Arithmetic to Division"
            },
            { 
                from: 2, 
                to: 6,
                title: "Addition relies on Numbers"
            },
            { 
                from: 3, 
                to: 6,
                title: "Subtraction relies on Numbers"
            },
            { 
                from: 4, 
                to: 6,
                title: "Multiplication relies on Numbers"
            },
            { 
                from: 5, 
                to: 6,
                title: "Division relies on Numbers"
            }
        ]);

        // Create a network
        var container = document.getElementById('mynetwork');

        // Provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {
            edges: {
                arrows: {
                    to: { enabled: true }
                },
                color: {
                    color: 'black',
                    inherit: false
                },
                width: 2,
                smooth: {
                    type: 'cubicBezier',
                    roundness: 0.4
                }
            },
            nodes: {
                font: {
                    size: 14,
                    color: '#343434'
                },
                borderWidth: 2,
                shadow: true
            },
            physics: {
                solver: 'forceAtlas2Based',
                forceAtlas2Based: {
                    springLength: 100
                },
                stabilization: {
                    iterations: 1000
                }
            },
            interaction: {
                hover: true, // Enable hover interactions
                tooltipDelay: 200 // Delay before showing tooltip
            },
            layout: {
                improvedLayout: true
            }
        };

        // Initialize your network!
        var network = new vis.Network(container, data, options);

        // Optional: Customize the tooltip style (CSS)
        // You can add CSS rules to style the tooltips if desired
    </script>
</body>
</html>
```

### Explanation of the Code:

1.  **Including the vis-network Library**:

    -   The `vis-network` library is included via a CDN link in the `<head>` section.
2.  **Styling**:

    -   The `#mynetwork` div is styled to have a specific width, height, background color, and border.
    -   The body is styled to center the content and add some padding.
3.  **Defining Nodes**:

    -   Each node in the `nodes` DataSet has several properties:
        -   `id`: Unique identifier for the node.
        -   `label`: Text displayed on the node.
        -   `color`, `shape`, `size`, `x`, `y`: Define the appearance and position.
        -   `fixed`: Fixes the node's position along the x-axis.
        -   `font`: Customizes the font size.
        -   `title`: The tooltip text that appears on hover.
4.  **Defining Edges**:

    -   Each edge in the `edges` DataSet connects two nodes (`from` and `to`) and includes a `title` for the tooltip.
5.  **Network Options**:

    -   **Edges**:
        -   Arrows are enabled at the destination.
        -   Edges are colored black with a fixed width.
        -   Smooth curves are added for better aesthetics.
    -   **Nodes**:
        -   Font size and color are customized.
        -   Borders and shadows are added for better visibility.
    -   **Physics**:
        -   The `forceAtlas2Based` solver is used for node positioning.
        -   Spring length is adjusted for spacing.
        -   Stabilization iterations ensure the network settles into a stable layout.
    -   **Interaction**:
        -   Hover interactions are enabled to show tooltips.
        -   A slight delay is added before tooltips appear.
    -   **Layout**:
        -   Improved layout settings enhance the visual arrangement of nodes and edges.
6.  **Initializing the Network**:

    -   The `vis.Network` constructor is used to create and render the network inside the `#mynetwork` div with the specified `data` and `options`.
7.  **Tooltips**:

    -   The `title` property for both nodes and edges automatically enables tooltips on hover.
    -   The `interaction.hover` option ensures that hovering is enabled, and `tooltipDelay` controls the delay before the tooltip appears.

### How It Works:

-   **Hovering Over Nodes**: When you move your mouse over any node, a tooltip appears displaying the `title` associated with that node. For example, hovering over the "Addition" node will show "Addition is the process of finding the total or sum by combining two or more numbers."

-   **Hovering Over Edges**: Similarly, hovering over any edge will display the `title` of that edge. For example, hovering over the edge connecting "Arithmetic" to "Addition" will show "Connects Arithmetic to Addition."

### Live Demo:

You can run the above HTML code in your local environment or any online HTML editor (like [CodePen](https://codepen.io/) or [JSFiddle](https://jsfiddle.net/)) to see the hover functionality in action.

### Additional Customizations:

-   **Styling Tooltips**: If you want to further customize the appearance of the tooltips, you can add custom CSS or use HTML within the `title` property to include richer content.

-   **Dynamic Content**: You can dynamically update the `title` properties based on user interactions or other events to provide more interactive experiences.

Feel free to modify the nodes, edges, and their associated titles to suit your specific needs!