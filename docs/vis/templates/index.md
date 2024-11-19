# Vis.js Templates for Learning Graph

The following are a list of template files you
can use to create your own learning graphs that
embody the best practices we have learned.

We begin with the simplest template and
proceed to more complex versions.  If you
are using generative AI tools, providing them
with the simplest template for a working
learning graph is a good first step.

## Index.md file

```markdown
![Image Name](./image.png){ width="400" }
```

```html
<iframe src="../lab-01.html" height="320px" width="600px"></iframe>
```

```markdown
[Run the MicroSim Template](./template.html){ .md-button .md-button--primary }
[Edit this MicroSim](https://editor.p5js.org/dmccreary/sketches/dJq4nTXE4)
```

## Single Template HTML File

This is a very simple of a learning graph example
for arithmetic that uses our best practices.

[Single HTML File Template](./single-html-file.html)

Specifically you will see that:

1. All nodes are associated with a group.
2. All edges have an arrow on the "to" end.
3. Foundation elements use a red box
4. Goals use a gold star shape.
5. The physics engine place all nodes on the graph.
6. You can drag the central nodes around with both X and Y,
but the foundation and goal nodes have a fixed horizontal position

This example is ideal when you have a small example where you want
to edit the HTML file directly and the CSS and JavaScript are imbedded
directly in the HTML.

```html
<html>
<head>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <style type="text/css">
        body {
            font-family: Arial, Helvetica, sans-serif;
        }
        #mynetwork {
            width: 350px;
            height: 200px;
            background-color: aliceblue;
            border: 1px solid silver;
        }
    </style>
</head>
<body>
  <div id="mynetwork"></div>
  <br/>
<a href=".">Back to Lesson Plan</a>
<script type="text/javascript" delay>

    // create an array of nodes in groups
    var nodes = new vis.DataSet([
      // our goal node place on the right and fixed
      { id: 1, label: "Arithmetic", color: "gold", shape: "star", size: 30, x: 200, y: 0, fixed: { x: true, y: false }, font: { size: 24 } },
      // default is from the top to the bottom
      { id: 2, label: "Addition", color: "tan", y: -200},
      { id: 3, label: "Subtraction", color: "tan", y: -100},
      { id: 4, label: "Multiplication", color: "tan", y: 100},
      { id: 5, label: "Division", color: "tan", y: 200},
      // our foundation node on the left
      { id: 6, label: "Numbers", color: "coral", shape: "box", x: -200, y: 0, fixed: { x: true, y: false } }
    ]);
  
    var edges = new vis.DataSet([
      { from: 1, to: 2},
      { from: 1, to: 3},
      { from: 1, to: 4},
      { from: 1, to: 5},
      { from: 2, to: 6},
      { from: 3, to: 6},
      { from: 4, to: 6},
      { from: 5, to: 6}
    ]);

    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        edges: {
            arrows: {
                to: { enabled: true}
            },     // Arrow at the destination
            color: {
                color: 'black',  // Set edge color to black
                inherit: false     // Ensure color is applied to all edges explicitly
            },
            width: 2               // Set edge width to 2
        },
        physics: {
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                springLength: 80          // Higher value for larger spacing
            }
        }
    };

    // initialize your network!
    var network = new vis.Network(container, data, options);
</script>
</body>
</html>
```

## Single File Template With Legend

This is another single-file HTML template file with the CSS and JavaScript
embedded directly in the HTML.  The addition is a collapsible sidebar
that displays the legend and graph statistics.

[Single HTML File With Legend](./single-html-file-with-legend.html)

```html
<html>
<head>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <style type="text/css">
    body {
      font-family: Arial, Helvetica, sans-serif;
      display: flex;
    }

    #sidebar {
        width: auto; /* Automatically adjust width based on content */
        max-width: 300px; /* Set a maximum width to avoid excessive size */
        padding: 2px;
        margin-right: 5px; /* Space between sidebar and main content */
        box-sizing: border-box;
    }

    #main {
        flex: 1; /* Takes up remaining space */
        padding: 5px;
    }

    #mynetwork {
        width: 100%;
        height: 700px;
        background-color: aliceblue;
        border: 1px solid lightgray;
    }
    </style>
</head>
<body>
    <div id="sidebar-container">
        <button id="toggle-button" onclick="toggleSidebar()">&#9776;</button>

    <div id="sidebar">
        <h3>Legend Sidebar</h3>
        <table>
            <tr>
                <td>Foundation</td>
                <td style="background-color: red; color: white;">Red</td>
            </tr>
            <tr>
                <td>Level 1</td>
                <td style="background-color: orange;">Orange</td>
            </tr>
            <tr>
                <td>Level 2</td>
                <td style="background-color: yellow;">Yellow</td>
            </tr>
            <tr>
                <td>Level 3</td>
                <td style="background-color: green; color: white;">Green</td>
            </tr>
            <tr>
                <td>Level 4</td>
                <td style="background-color: cyan;">Cyan</td>
            </tr>
            <tr>
                <td>Level 5</td>
                <td style="background-color: blue; color: white;">Blue</td>
            </tr>
            <tr>
                <td>Level 6</td>
                <td style="background-color: indigo; color: white;">Indigo</td>
            </tr>
            <tr>
                <td>Level 7</td>
                <td style="background-color: violet;">Violet</td>
            </tr>
            <tr>
                <td>Level 8</td>
                <td style="background-color: gray; color: white;">Gray</td>
            </tr>
            <tr>
                <td>Level 9</td>
                <td style="background-color: brown; color: white;">Brown</td>
            </tr>
            <tr>
                <td>Goal</td>
                <td style="background-color: lightgreen; color: black;">LightGreen</td>
            </tr>
        </table>
    </div>
    </div> <!-- sidebar container-->
    <div id="main">
        <div id="mynetwork"></div>
        <br/>
        <a href=".">Back to Lesson Plan</a>
    </div>
<script type="text/javascript">

    // create an array of nodes in groups
    var nodes = new vis.DataSet([
      // our goal node place on the right and fixed
      { id: 1, label: "Arithmetic", color: "gold", shape: "star", size: 50, x: 200, y: 0, fixed: { x: true, y: false }, font: { size: 24 } },
      // default is from the top to the bottom
      { id: 2, label: "Addition", color: "tan", y: -200},
      { id: 3, label: "Subtraction", color: "tan", y: -100},
      { id: 4, label: "Multiplication", color: "tan", y: 100},
      { id: 5, label: "Division", color: "tan", y: 200},
      // our foundation node on the left
      { id: 6, label: "Numbers", color: "coral", shape: "box", x: -200, y: 0, fixed: { x: true, y: false } }
    ]);
  
    var edges = new vis.DataSet([
      { from: 1, to: 2},
      { from: 1, to: 3},
      { from: 1, to: 4},
      { from: 1, to: 5},
      { from: 2, to: 6},
      { from: 3, to: 6},
      { from: 4, to: 6},
      { from: 5, to: 6}
    ]);

    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        edges: {
            arrows: {
                to: { enabled: true}
            },     // Arrow at the destination
            color: {
                color: 'black',  // Set edge color to black
                inherit: false     // Ensure color is applied to all edges explicitly
            },
            width: 2               // Set edge width to 2
        },
        physics: {
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                springLength: 100          // Higher value for larger spacing
            }
        }
    };

    // initialize your network!
    var network = new vis.Network(container, data, options);

    function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("main");
        const toggleButton = document.getElementById("toggle-button");

        if (sidebar.style.display === "none") {
            sidebar.style.display = "block";
            // toggleButton.textContent = "☰"; // Open icon
            toggleButton.innerHTML = "&#9776;"; // Hamburger menu icon (open state)

            mainContent.style.marginLeft = "auto"; // Restore margin
        } else {
            sidebar.style.display = "none";
            // toggleButton.textContent = "→"; // Collapse icon
            toggleButton.innerHTML = "&#8594;"; // Right arrow (collapsed state)
            mainContent.style.marginLeft = "0"; // Remove margin for full width
        }
    }
</script>
</body>
</html>
```

