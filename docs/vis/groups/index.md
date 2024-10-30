# Using Groups in Vis.js

## How To Add Groups to a Learning Graph Node

Each node in a learning graph can have a group attribute:

```json
{
    "nodes": [
        {"id": 1, "label": "Node 1", "group": 1},
        {"id": 2, "label": "Node 2", "group": 1},
        {"id": 3, "label": "Node 3", "group": 2},
        {"id": 4, "label": "Node 4", "group": 2},
        {"id": 5, "label": "Node 5", "group": 3}
    ],
    "edges": [
        {"from": 3, "to": 1},
        {"from": 2, "to": 1},
        {"from": 4, "to": 2},
        {"from": 5, "to": 2}
    ]
}
```

![](./simple-groups.png)
[Run Simple Groups Example](./01-simple-groups.html)

Note that in the JSON example file, the type of each group 
is an integer, but strings can also be used:

```json
{
    "nodes": [
        {"id": 1, "label": "Node 1", "group": "foundation"},
        {"id": 2, "label": "Node 2", "group": "foundation"},
        {"id": 3, "label": "Node 3", "group": "level2"},
        {"id": 4, "label": "Node 4", "group": "level2"},
        {"id": 5, "label": "Node 5", "group": "goal"}
    ],
    "edges": [
        {"from": 3, "to": 1},
        {"from": 2, "to": 1},
        {"from": 4, "to": 2},
        {"from": 5, "to": 2}
    ]
}
```

## Styling Graph Nodes

When options are loaded, we can add style elements to the groups object
within the options. 

```js
var options = {
      groups: {
        foundation: {
           shape: "box", 
           color:{background:'red'},
           font: {"color": "white"},
        },
        level2: {
           color:{background:'orange'}, 
        },
        goal: {
           shape: "star", 
           color:{background:'gold'}, 
           font: { size: 16 }
        }
     }
}
```

[Run Groups Style](./02-group-style.html)

All other valid node properties can also be specified for a group.  
For example:

- color.background
- color.highlight
- color.highlight.border
- color.highlight.background
- color.hover
- color.hover.border
- color.hover.background
- color.border
- borderWidth
- font.size
- font.color
- opacity

[See the Node Properties docs for more](https://visjs.github.io/vis-network/docs/network/nodes.html)

## References

[Vis.js Group Documentation](https://visjs.github.io/vis-network/docs/network/groups.html)

[Vis.js Groups Example](https://visjs.github.io/vis-network/examples/network/nodeStyles/groups.html)

[Vis.js Custom Groups Example](https://visjs.github.io/vis-network/examples/network/nodeStyles/customGroups.html)