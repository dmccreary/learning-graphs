# Fix the X Positions

![](./fix-x-positions.png)

## Left to Right Concept Graphs

In this lesson, we learn how to control the X placement of both
the [foundational concepts](../../glossary.md#foundational-concepts) to the **left** of a concept
dependency graph and goals to the right
of the network.  This allows us to consistently view
a learning graph from prerequisite concepts on the left
and goals on the right.

## Order of Labs

Our first examples will manually have us label each
of the nodes that disable the physics for x-placement
of the nodes in the correct locations.  Later, we
show that you can add a JavaScript function that will
automatically apply placement rules to nodes in groups.
This make preparing data much simpler.

## Background on the Physics of Springs

To place nodes on a 2-dimensional surface so they are
automatically spread apart, we simulated the forces
on springs.  The springs will pull connected nodes closer
together on the drawing canvas, but not so close that they
get stacked on top of each other or overlap too much.

Here is how the JSON data will look to disable the X movement:

```json
{
    "nodes": [
      { "id": 1, "label": "Foundation 1", "shape": "box", "group": 1, 
        "x": -400, "y": -200, 
        "fixed": { "x": true, "y": false }, "physics": false },
      { "id": 2, "label": "Foundation 2", "shape": "box", "group": 1, 
        "x": -400, "y": -150, 
        "fixed": { "x": true, "y": false }, "physics": false },
      { "id": 3, "label": "Foundation 3", "shape": "box", "group": 1, 
        "x": -400, "y": -100, 
        "fixed": { "x": true, "y": false }, "physics": false },
]}
```

The foundation concepts above must be placed on the left edge, around x=-400.
But we want to also prevent their X locations from getting moved.
So we use the ```fixed``` option and indicate that only the x element is fixed.

## Use of Vis.js Group Property

Vis.js allows each node in a graph to belong to a single group.  By
convention, we use group 1 as the group for all Foundation Concepts.
We also use group 12 for goal concepts, since that is a good number
to set as the maximum dependency level to reach a goal within a course.

By convention, any concepts that only depend on a Foundation Concept
are considered to be in level 2 concepts.  If a concept depends on a level 2 concept
it is called a level 3 concept.  In these demos, we will be using
a group number that indicates the group number = (number of hops +1) from a foundation concept.

[Fix X Positions Demo](./fix-x-positions.html)

!!! Warning
    We must also disable the ```Improved Layout``` which attempts to prevent
    overlap of the nodes.  Unfortunately, when we use fixed positioning on some
    nodes this causes conflicts.

```json
options: {
   physics: { ...
   },
   layout: {
        "improvedLayout": false, // Prevent node overlap
  }
}
```

## Simple Demo

[Simple Demo](simple-demo.html)

## Lab 2 - Loading From JSON

In this lab, we successfully load our graph data from this [graph.json](graph.json) file,
but the nodes placement and instructions to disable the physics is ignored.

[Fix X Positions V2](./fix-x-positions-2.html)

## Lab 3 - Fixing X and Fixed By Group

[Run the Fix by Groups Demo V3](./fix-x-positions-3.html)

This demo goes through all the nodes after they are loaded
and sets their x and fixed properties if they are in the "found"
or "goal" groups.  It loads data from [This JSON file graph-3.json](graph-3.json)
which does not have any x or y locations specified and does not specify
fixed physics, only groups.
The program also used the options/groups to do styling on the nodes.

### JavaScript to Fix X by Group ID

```javascript
// Create DataSet instances for nodes and edges
const nodes = new vis.DataSet(graphData.nodes);

// Process nodes to fix positions of foundation and goal nodes
nodes.forEach(function(node) {
  if (node.group === "found") {
    node.x = -400;
    node.fixed = { x: true, y: false };
  } else if (node.group === "goal") {
    node.x = 400;
    node.fixed = { x: true, y: false };
  }
});
```

### Group Styling

```javascript
options {...
  groups: {
        found: {
          shape: "box", 
          color:{background:'red'},
          font: {"color": "white"}
        },
        g2: {
          color:{background:'orange'}, 
        },
        g3: {
          color:{background:'green'}, 
        },
        goal: {
          shape: "star", 
          color:{background:'gold'}, 
          font: { size: 16 }
        }
    }
}
```



[Fix X Positions V4](./fix-x-positions-4.html)

[Fix X Positions V5](./fix-x-positions-5.html)

[Fix X Positions V6](./fix-x-positions-6.html) - where group 1 and group 12
have their X positions pinned to x=-1000 and x=1000 respectively.

The code that fixes the x positions for nodes in groups 1 and 12 is
executed immediately after the nodes are created.
Since the function is written within a forEach
loop right after the nodes are defined, it runs
automatically when the script is loaded.
No explicit function call is needed because the function
is not declared separately;
it is an inline anonymous function applied to the nodes directly.


[Fix X Positions V7](./fix-x-positions-7.html) - where we shorten distance
between the left and right x positions to be 500, not 1000.

An alternative that might be easier to work with is to create
a function that fixes the left and right nodes:

```javascript
// Function to fix x positions for specific groups
function fixXPositions(nodes) {
    nodes.forEach(function (node) {
        if (node.group === 1) {
            node.x = -500;
            node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
        } else if (node.group === 12) {
            node.x = 500;
            node.fixed = { x: true, y: false }; // Fix x, but let y be adjusted by physics
        }
    });
}

// After defining nodes, call the function
fixXPositions(nodes);
```

[Fix X Positions V8](./fix-x-positions-8.html) -
## Prompt

```
using vis.js, is there a way to freeze a node's x position
but let the y position float freely and be repositioned
by the force-directed graph algorithm?
```

## ChatGPT said:

In **vis.js**, the built-in options for node positioning allow you to fix both the **x** and **y** coordinates of a node using the `fixed` option. However, freezing only one axis while letting the other float (like freezing the x-axis and letting the y-axis adjust with the force-directed graph algorithm) is not supported natively.

That said, you can achieve this behavior with a workaround by using the `physics` option and manually adjusting the node's x position in each frame:

1.  Set the node's `x` position and use the `fixed: { x: true, y: false }` option to lock only the x-axis.
2.  During the graph's update cycle, reapply the node's fixed x position while letting the force algorithm adjust the y position.

Here's an example code snippet to implement this behavior:

```html
<!DOCTYPE html>
<html>
<head>
  <title>vis.js Fixed X Position Example</title>
  <script type="text/javascript" src="https://unpkg.com/vis-network@9.1.2/dist/vis-network.min.js"></script>

  <style>
    #network {
      width: 800px;
      height: 600px;
      border: 1px solid lightgray;
      margin-left: 10px;
      background-color: aliceblue;
    }
  </style>
</head>
<body>
<div id="network"></div>
<script type="text/javascript" src="fix-x-positions.js"></script>
</body>
</html>
```

```javascript
var nodes = new vis.DataSet([
  { id: 1, label: "Node 1", x: 100, fixed: { x: true, y: false } },
  { id: 2, label: "Node 2", x: 200, fixed: { x: true, y: false } },
  { id: 3, label: "Node 3", fixed: false },
]);

var edges = new vis.DataSet([
  { from: 1, to: 2 },
  { from: 2, to: 3 },
]);

var container = document.getElementById('network');
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
  physics: {
    enabled: true,
    solver: 'forceAtlas2Based',
    stabilization: false
  }
};

var network = new vis.Network(container, data, options);

// Workaround: Lock x position while letting y position be free
network.on("beforeDrawing", function () {
  nodes.forEach(function (node) {
    if (node.fixed && node.fixed.x) {
      var currentPosition = network.getPosition(node.id);
      nodes.update({ id: node.id, x: node.x, y: currentPosition.y });
    }
  });
});
```

### Explanation of Changes

1.  **Fixed Nodes Configuration:**

    -   **`fixed: { x: true, y: false }`:** This ensures that the x-position of the node remains constant while allowing the y-position to be influenced by the physics engine.
    -   **`physics: false`:** Disables physics simulation for these nodes, preventing them from being moved by forces or other nodes.
2.  **Removal of `beforeDrawing` Event:**

    -   Since we're now using `physics: false` for fixed nodes, the manual adjustment in the `beforeDrawing` event is no longer necessary and has been removed to prevent interference.
3.  **Centering the Graph:**

    -   **`moveTo` Method:** After the network stabilizes, `moveTo` centers the graph at (0,0) with a smooth animation.
    -   **`stabilization` Settings:** Increased the number of iterations to ensure the network has ample time to stabilize before centering.
4.  **Responsive Design:**

    -   **Window Resize Event:** Added an event listener to re-fit the network when the browser window is resized, maintaining the centered view.
5.  **Node Styling (Optional):**

    -   Enhanced node appearance for better visibility and aesthetics. This is optional but can help in visual differentiation.

### Additional Tips

-   **Adjust Initial Positions:** Ensure that the initial `x` positions of the fixed nodes are within the visible range of your container. If nodes are still drifting off, try setting `x` to smaller absolute values (e.g., closer to 0).

-   **Scale Adjustment:** If the graph appears too zoomed out or in, adjust the `scale` parameter in the `moveTo` method to better fit the nodes within the view.

-   **Solver Selection:** While `forceAtlas2Based` is a good general-purpose solver, experimenting with different solvers like `barnesHut` or `repulsion` might yield better results based on your specific graph structure.

-   **Debugging Node Positions:** Temporarily disable physics (`physics: false`) for all nodes to manually position them and ensure they appear correctly within the view. Once satisfied, re-enable physics selectively.

### Move to Center

```javascript
network.moveTo({position:{x:0,y:0},scale:1})
```

[Move to Center](./move-to-center.html)

[Reference](https://github.com/visjs/vis-network/issues/2170)

### Final Thoughts

By configuring the fixed nodes correctly and ensuring they are excluded from the physics simulation, you should achieve the desired behavior where specific nodes remain anchored on the x-axis while others are dynamically positioned. Centering the graph post-stabilization ensures that all nodes remain within the visible area, providing a clear and organized visualization.

Feel free to adjust the parameters further based on the specific requirements of your graph and the visual outcome you desire. Let me know if you encounter any more issues or need further assistance!