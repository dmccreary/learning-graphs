# Lab 5: Custom Shape

[Lab 5 Custom Shapes HTML](./lab-05.html)

Here's a small example of a `vis.js` program that uses the `ctxRenderer` function to draw a custom hexagonal shape for a node:

### HTML Code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vis.js Custom Shape Example</title>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
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

<script>
    function customShapeRenderer({ ctx, x, y, state: { selected, hover }, style }) {
        const r = style.size;  // size of the shape (radius)
        ctx.beginPath();
        const sides = 6;  // number of sides for the hexagon
        const a = (Math.PI * 2) / sides;  // angle between sides

        // Start drawing the hexagon
        ctx.moveTo(x + r * Math.sin(0), y + r * Math.cos(0));
        for (let i = 1; i <= sides; i++) {
            ctx.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
        }

        ctx.closePath();
        ctx.save();
        ctx.fillStyle = selected ? 'blue' : 'red';  // change color if selected
        ctx.fill();
        ctx.strokeStyle = hover ? 'orange' : 'black';  // change stroke if hovered
        ctx.stroke();
        ctx.restore();

        // Add label inside the shape
        ctx.font = "normal 12px sans-serif";
        ctx.fillStyle = 'black';
        ctx.fillText('Custom Node', x - r / 2, y + 4);

        // Return dimensions of the node
        return {
            nodeDimensions: { width: r * 2, height: r * 2 }
        };
    }

    // Create nodes and edges
    const nodes = new vis.DataSet([
        {
            id: 1,
            label: 'Custom Node',
            shape: 'custom',
            ctxRenderer: customShapeRenderer,  // specify the custom renderer
            size: 40  // set the size of the node
        }
    ]);

    const edges = new vis.DataSet([]);

    // Create the network
    const container = document.getElementById('mynetwork');
    const data = {
        nodes: nodes,
        edges: edges
    };
    const options = {};
    const network = new vis.Network(container, data, options);
</script>
</body>
</html>
```

### Explanation:

-   **Custom Renderer (`customShapeRenderer`)**: This function creates a hexagonal node. It takes the context (`ctx`) and node state as input, calculates the position of each side of the hexagon, and draws the shape using the `canvas` API.
    -   The node is filled with red unless it is selected, in which case it becomes blue.
    -   The stroke color is black but changes to orange when the node is hovered over.
    -   The label "Custom Node" is drawn inside the hexagon.
-   **Node Configuration**: The node uses the `shape: 'custom'` property to specify that it should use a custom renderer. The `ctxRenderer` property is set to the `customShapeRenderer` function.
-   **Node Dimensions**: The size of the hexagonal node is defined by the `r` variable, which is passed in via `style.size`.

When you load this HTML file in a browser, it will draw a single hexagonal node with the ability to change color when selected or hovered. You can easily modify the shape or style further by changing the drawing logic inside the `customShapeRenderer` function.

4o

requestAnimationFrame((function(){window.\_\_oai\_logTTI?window.\_\_oai\_logTTI():window.\_\_oai\_SSR\_TTI=window.\_\_oai\_SSR\_TTI??Date.now()}))

ChatGPT can make mistakes. Check important info.