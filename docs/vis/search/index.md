# Search

[Search Nodes in Graph](search.html){ .md-button .md-button--primary }

## Prompt

```text
I am building a web application using the vis.js network
graph Javascript library.  I would like to add a search
feature so a user can search for a specific label or title
in the graph network.  Given the following template, can
you please add a search function to the HTML file?

The search should have an input field in the upper right corner.
When the user types a string, the list of nodes that the string
matches should be listed as a dropdown.  Each character should
narrow the list.

When the user selects an item from the list, the graph should
center on the node and select that node.

Here is the template to get you started:
```
[Sample vis.js Template](../templates/single-html-file.html)

## Response

Sure! Below is the modified HTML code with the search feature added. The search input field is placed in the upper right corner, and as the user types, a dropdown list of matching node labels appears, narrowing down with each character. When a user selects an item from the list, the graph centers on the node and selects it.

!!! note
    I changed the layout so that the search is on the top, not on the right.
    I also modified the layering so that the search dropdown list appears
    over the graph network so the network is not pushed down the screen.

```html
<html>
<head>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
       <style type="text/css">
        body {
            font-family: Arial, Helvetica, sans-serif;
        }
        #mynetwork {
            width: 80%;
            height: 600px;
            background-color: aliceblue;
            border: 1px solid silver;
            margin: 0 auto; /* Center the network */
        }
        #search-container {
            width: 80%; /* Same width as #mynetwork */
            margin: 10px auto; /* Center align and add margin for spacing */
            position: relative; /* To position #search-results relative to this container */
        }
        #search-input {
            width: 100%;
            padding: 5px;
        }
        #search-results {
            position: absolute; /* Float above the content */
            top: 100%; /* Align right below the input field */
            left: 0;
            width: 100%;
            background-color: white;
            border: 1px solid silver;
            max-height: 150px;
            overflow-y: auto;
            z-index: 1000; /* Ensure it appears above other elements */
            display: none; /* Initially hidden */
        }
        #search-results div {
            padding: 5px;
            cursor: pointer;
        }
        #search-results div:hover {
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
  
  <div id="search-container">
    <input type="text" id="search-input" placeholder="Search nodes...">
    <div id="search-results"></div>
  </div>
  <div id="mynetwork"></div>
  <br/>
<a href=".">Back to Lesson Plan</a>
<script type="text/javascript">

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

    // Now, add the search functionality
    var searchInput = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');
    var searchContainer = document.getElementById('search-container');

    searchInput.addEventListener('input', function() {
        var query = this.value.toLowerCase();
        if (query === '') {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }
        var matches = nodes.get({
            filter: function (item) {
                return item.label.toLowerCase().includes(query);
            }
        });
        if (matches.length > 0) {
            searchResults.innerHTML = '';
            matches.forEach(function(item) {
                var div = document.createElement('div');
                div.textContent = item.label;
                div.dataset.id = item.id;
                div.addEventListener('click', function() {
                    var nodeId = this.dataset.id;
                    network.focus(nodeId, {animation: {duration: 500}});
                    network.selectNodes([nodeId]);
                    searchResults.style.display = 'none';
                    searchResults.innerHTML = '';
                    searchInput.value = '';
                });
                searchResults.appendChild(div);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
        }
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchContainer.contains(event.target)) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
        }
    });
</script>
</body>
</html>
```

**Explanation of Changes:**

1.  **Search Input Field:** Added a search input field within a `div` with the ID `search-container` positioned in the upper right corner using CSS.

2.  **Dropdown List:** Created a `div` with the ID `search-results` to display the list of matching nodes. It's styled to appear as a dropdown below the search input.

3.  **Event Listener for Input:** Added a JavaScript event listener to the search input field that filters nodes based on the user's input and displays the matching nodes in the dropdown.

4.  **Selecting a Node:** When a user clicks on a node in the dropdown, the graph centers on that node and selects it using the `network.focus` and `network.selectNodes` methods from vis.js.

5.  **Closing the Dropdown:** Implemented an event listener on the document to close the dropdown when the user clicks outside of the search container.

6.  **Styling Adjustments:** Adjusted the CSS to ensure the dropdown appears correctly and is positioned relative to the search input.

Feel free to integrate this code into your application, and adjust the styles or functionality as needed!