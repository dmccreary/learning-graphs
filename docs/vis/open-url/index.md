# Open URL

[Open URL MicroSim V2](open-url-v2.html)

[Open URL MicroSim](open-url.html)

## Explanation of the Addition To Template

###  Adding the `url` Property to Nodes

Each node now includes a `url` property containing the link you want to associate with it. For example:

```javascript
{
    id: 2,
    label: "Addition",
    color: "tan",
    y: -200,
    title: "Addition is...",
    description: "Addition combines...",
    url: "https://en.wikipedia.org/wiki/Addition"
}
```

### Changing the Cursor on Hover

To indicate that a node is clickable (i.e., has an associated link), the cursor changes to a pointer when hovering over such nodes.

```javascript
network.on("hoverNode", function (params) {
    var nodeId = params.node;
    var node = nodes.get(nodeId);
    if (node.url) {
        container.style.cursor = 'pointer';
    } else {
        container.style.cursor = 'default';
    }
});

network.on("blurNode", function (params) {
    container.style.cursor = 'default';
});
```

!!! Note
    This does not appear to be working in the current demo.

### Handling Click Events with Modifier Keys

The `click` event listener checks if a node has a `url` property. If so, it determines if a modifier key was pressed during the click.

**Modifier Keys Detected**:

-   `Ctrl` (Windows/Linux/Mac) -Open in a new tab and sets the focus to the new tab.
-   `Cmd` (Mac): Open in a new tab in the background but keep the focus on the network.
-   `Shift`: Open in a new window.
-   **Middle-Click (Mouse Wheel Click)**: Typically handled by the browser to open in a new tab.


```javascript
// Handle click events with modifier keys to open links
network.on("click", function (params) {
    console.log('Click event params:', params);
    if (params.nodes.length === 1) {
        var nodeId = params.nodes[0];
        var node = nodes.get(nodeId);
        if (node.url) {
            // Corrected: Use params.event.srcEvent
            var srcEvent = params.event.srcEvent;
            console.log('Source Event:', srcEvent);

            // Check for modifier keys
            var openInNewTab = srcEvent.ctrlKey || srcEvent.metaKey || srcEvent.shiftKey || srcEvent.button === 1;
            console.log('Modifier Keys - Ctrl:', srcEvent.ctrlKey, 'Meta:', srcEvent.metaKey, 'Shift:', srcEvent.shiftKey, 'Alt:', srcEvent.altKey, 'Button:', srcEvent.button);

            if (openInNewTab) {
                // Open in a new tab
                console.log('Opening URL in a new tab:', node.url);
                window.open(node.url, '_blank');
            } else {
                console.log('Modifier keys not pressed. No action taken.');
                // Optionally, handle regular clicks
                // window.location.href = node.url; // Uncomment to navigate in the same tab
            }
        } else {
            console.log('Node does not have a URL:', node);
        }
    } else {
        console.log('No node clicked or multiple nodes selected.');
    }
});
```

-   `params.event.originalEvent.ctrlKey`: Detects if `Ctrl` (Windows/Linux) or `Cmd` (Mac) is pressed.
-   `params.event.originalEvent.metaKey`: Specifically for the `Cmd` key on Mac.
-   `params.event.originalEvent.shiftKey`: Detects if `Shift` is pressed.
-   `params.event.originalEvent.button === 1`: Detects middle-click.

### Preventing the Context Menu on Right-Click** *(Optional)*

To provide a cleaner experience, you can prevent the default context menu from appearing on right-clicks within the network area.

```javascript
network.on("oncontext", function (params) {
    // Prevent the context menu from appearing on right-click
    params.event.preventDefault();
});
```

### Visual Indicators for Clickable Nodes** *(Optional Enhancements)*

**Underline Labels**: To further indicate that a node is a link, you can underline the label text.

```javascript
nodes.update(nodes.map(node => {
    if (node.url) {
        node.font = Object.assign({}, node.font, { color: '#007BFF', underline: true });
    }
    return node;
}));
```

**Adding an Icon**: Alternatively, include an icon next to the label to signify a link.

### Accessibility Considerations

Ensure that keyboard users can navigate and activate links. You might need to implement additional keyboard event handlers to support `Enter` or `Space` key activation.

### User Interface Consistency

By adhering to standard web behaviors for opening links, your network visualization will align with user expectations, enhancing usability. Users are familiar with:

- **Shift + Click**: Opens links in a new **window** and makes the new tab active.
- **Ctrl + Click**: Opens links in a new tab and makes the new tab active.
- **Command + Click**: Opens links in a new tab but keeps it in the background.
-  **Middle-Click**: Opens links in a new tab.

Implementing these interactions ensures that users can seamlessly integrate your network tool into their existing workflows without confusion.

### Testing the Functionality

To verify the implemented features:

1.  **Hover Over Nodes**:

Nodes with associated URLs will change the cursor to a pointer, indicating interactivity.

2.  **Click with Modifier Keys**:
    -   **Ctrl/Cmd + Click**: Should open the node's link in a new tab.
    -   **Shift + Click**: Should open the node's link in a new window.
    -   **Middle-Click**: Should open the node's link in a new tab.
3.  **Double-Click on Nodes**:

    -   Should display the node's properties in the `node-details` section as before.

4.  **Double-Click on Empty Space**:

    -   Should reset the `node-details` section to its default state.

### Additional Enhancements

1.  **Dynamic Link Assignment**:

Allow links to be dynamically assigned or updated based on user interactions or data sources.
2.  **Visual Feedback on Click**:

Provide temporary visual feedback (e.g., a brief highlight) when a node is clicked to indicate that an action has been triggered.
3.  **Context Menu Integration**:

Implement a custom context menu with options like "Open Link in New Tab" or "Open Link in New Window" for more flexibility.
4.  **Responsive Design**:

Ensure that the network and its interactive elements are responsive and accessible on various devices and screen sizes.
5.  **Error Handling**:

Handle cases where the `url` might be invalid or unreachable, possibly by displaying an error message to the user.

### Final Thoughts

Integrating link functionality into your `vis.js` network enhances interactivity 
and provides users with direct access to related resources. By adhering to 
standard UI practices, you ensure that the tool remains intuitive and user-friendly.