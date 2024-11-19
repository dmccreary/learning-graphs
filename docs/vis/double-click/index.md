# Double Click for Properties

[Run Double Click MicroSim](double-click.html){ .md-button .md-button--primary }

Certainly! Let's enhance the existing `vis.js` demo to include functionality that lists all properties of a node when it's double-clicked. This addition will provide a more interactive experience, allowing users to inspect node details easily.

### Features Added:
- **Double-Click Event on Nodes**: When a user double-clicks on a node, a detailed list of all its properties will be displayed.
- **Display Area for Node Properties**: A dedicated section below the network graph will show the properties of the selected node.

### Updated HTML Code:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>vis.js Hover and Double-Click Demo</title>
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
        #node-details {
            width: 700px;
            margin-top: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            max-height: 200px;
            overflow-y: auto;
            font-size: 14px;
        }
        #node-details h3 {
            margin-top: 0;
        }
        a {
            margin-top: 20px;
            text-decoration: none;
            color: #007BFF;
        }
        a:hover {
            text-decoration: underline;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table td, table th {
            padding: 8px 12px;
            border: 1px solid #ddd;
        }
        table th {
            background-color: #f2f2f2;
            text-align: left;
            width: 30%;
        }
    </style>
</head>
<body>
    <h2>vis.js Hover and Double-Click Function Demo</h2>
    <div id="mynetwork"></div>
    <div id="node-details">
        <h3>Node Details</h3>
        <p>Double-click on a node to see its properties here.</p>
    </div>
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
                title: "This is the Arithmetic node representing the main topic.",
                description: "Arithmetic is the branch of mathematics dealing with numbers and the basic operations on them."
            },
            // Operation nodes
            { 
                id: 2, 
                label: "Addition", 
                color: "tan", 
                y: -200,
                title: "Addition is the process of finding the total or sum by combining two or more numbers.",
                description: "Addition combines two or more numbers into a single sum."
            },
            { 
                id: 3, 
                label: "Subtraction", 
                color: "tan", 
                y: -100,
                title: "Subtraction is the process of finding the difference between two numbers.",
                description: "Subtraction calculates the difference by removing one number from another."
            },
            { 
                id: 4, 
                label: "Multiplication", 
                color: "tan", 
                y: 100,
                title: "Multiplication is the process of combining equal groups to find the total.",
                description: "Multiplication involves adding a number to itself a certain number of times."
            },
            { 
                id: 5, 
                label: "Division", 
                color: "tan", 
                y: 200,
                title: "Division is the process of splitting a number into equal parts.",
                description: "Division determines how many times one number is contained within another."
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
                title: "Numbers are the basic elements used in arithmetic operations.",
                description: "Numbers are symbols used to represent quantities and perform calculations."
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

        // Function to display node properties
        function displayNodeProperties(nodeId) {
            var node = nodes.get(nodeId);
            if (!node) return;

            var detailsDiv = document.getElementById('node-details');
            var html = '<h3>Node Details</h3>';
            html += '<table>';
            for (var prop in node) {
                if (node.hasOwnProperty(prop)) {
                    html += '<tr><th>' + prop + '</th><td>' + formatProperty(node[prop]) + '</td></tr>';
                }
            }
            html += '</table>';
            detailsDiv.innerHTML = html;
        }

        // Helper function to format property values
        function formatProperty(value) {
            if (typeof value === 'object' && value !== null) {
                return JSON.stringify(value, null, 2).replace(/\\n/g, '<br>').replace(/ /g, '&nbsp;');
            }
            return value;
        }

        // Add event listener for double-click
        network.on("doubleClick", function (params) {
            if (params.nodes.length > 0) {
                var nodeId = params.nodes[0];
                displayNodeProperties(nodeId);
            } else {
                // If double-clicked on empty space, clear the details
                var detailsDiv = document.getElementById('node-details');
                detailsDiv.innerHTML = '<h3>Node Details</h3><p>Double-click on a node to see its properties here.</p>';
            }
        });

    </script>
</body>
</html>
```

### Explanation of the Additions:

1. **HTML Structure Enhancements**:
    - **Node Details Div**: A new `<div>` with the ID `node-details` is added below the network graph. This section will display the properties of a node when it's double-clicked.
    - **Styling for Node Details**: CSS styles are added to ensure the details section is well-formatted, scrollable if content overflows, and visually distinct.

2. **Extended Node Definitions**:
    - **Description Property**: Each node now includes a `description` property to provide more detailed information. This is optional and can be tailored as needed.

3. **JavaScript Enhancements**:
    - **displayNodeProperties Function**: This function retrieves the node data based on its ID and constructs an HTML table listing all its properties. It formats object properties (like `fixed` and `font`) using `JSON.stringify` for better readability.
    - **formatProperty Helper Function**: This helper ensures that object properties are displayed in a readable format by converting them to JSON strings and replacing spaces and line breaks with HTML-friendly equivalents.
    - **Double-Click Event Listener**: An event listener is added to the network to listen for `doubleClick` events. When a node is double-clicked:
        - If a node is clicked, its ID is retrieved, and `displayNodeProperties` is called to show its properties.
        - If the empty space is double-clicked, the details section is reset to its default state.

4. **User Experience Enhancements**:
    - **Responsive Details Section**: The node details section updates dynamically based on user interactions, providing immediate feedback.
    - **Clear Instructions**: The details section initially contains a prompt guiding users to double-click on a node to view its properties.

### How It Works:

1. **Hover Functionality**:
    - As in the previous version, hovering over nodes or edges displays tooltips with the associated `title` text.

2. **Double-Click to View Properties**:
    - **User Action**: The user double-clicks on a node within the network graph.
    - **Event Triggered**: The `doubleClick` event is captured by the event listener.
    - **Property Display**:
        - The node's ID is extracted from the event parameters.
        - The `displayNodeProperties` function retrieves all properties of the node using `nodes.get(nodeId)`.
        - An HTML table is constructed listing each property and its value.
        - The `node-details` div is updated with this table, allowing the user to view all properties.

3. **Clearing Details**:
    - If the user double-clicks on an empty area of the network graph (i.e., not on any node), the `node-details` section resets to its default message.

### Live Demo:

You can test the updated functionality by running the above HTML code in your local environment or using online editors like [CodePen](https://codepen.io/) or [JSFiddle](https://jsfiddle.net/).

### Additional Customizations:

- **Formatting Enhancements**:
    - You can further enhance the `formatProperty` function to handle specific data types more gracefully or to format certain properties differently.

- **Selective Property Display**:
    - If you prefer to display only specific properties, modify the `displayNodeProperties` function to filter out unwanted properties.

- **Styling Improvements**:
    - Customize the CSS to better match your application's theme or to improve readability.

- **Exporting Properties**:
    - Add functionality to export the node properties (e.g., as a JSON file) if needed.

Feel free to adjust and expand upon this foundation to create a more robust and feature-rich network visualization tool tailored to your specific requirements!