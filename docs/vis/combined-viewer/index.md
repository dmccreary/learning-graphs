# Combined Learning Graph Viewer

This viewer combines two powerful features for exploring learning graphs:

1. **Search Functionality** - Quick node lookup with autocomplete
2. **Taxonomy Legend Controls** - Filter nodes by category/taxonomy

## Features

### Search
- Type-ahead search for node names
- Displays matching results in a dropdown
- Shows node group/category in results
- Clicking a result focuses and highlights the node on the graph
- Only searches visible nodes (respects taxonomy filters)

### Taxonomy Legend with Checkboxes
- Sidebar legend with all node categories
- Toggle visibility of entire node groups
- Color-coded categories matching the graph
- "Check All" and "Uncheck All" buttons for bulk operations
- Collapsible sidebar to maximize graph viewing area

### Graph Statistics
Real-time statistics that update as you filter:
- **Nodes**: Count of visible nodes
- **Edges**: Count of visible edges (both endpoints must be visible)
- **Orphans**: Nodes with no visible connections

## Sample Graph

The demo includes a Graph Theory learning graph with 10 taxonomy categories:

- **Foundation** (Red) - Core concepts
- **Types** (Orange) - Graph types
- **Representations** (Gold) - Data structures
- **Algorithms** (Green) - Basic algorithms
- **Paths** (Blue) - Shortest path algorithms
- **Flow** (Indigo) - Network flow algorithms
- **Advanced** (Violet) - Advanced topics
- **Metrics** (Gray) - Centrality measures
- **Spectral** (Brown) - Spectral theory
- **ML & Networks** (Teal) - Machine learning

## Try It Out

[Open Combined Viewer](combined-viewer.html){ .md-button .md-button--primary }

## Usage Tips

1. **Hide a category** - Uncheck a category in the sidebar to hide all nodes in that group
2. **Search within visible nodes** - Use search to quickly find specific concepts among visible nodes
3. **Focus on a topic** - Uncheck all categories, then check only the ones you want to study
4. **Collapse sidebar** - Click the menu button (☰) to hide the sidebar and expand the graph view
5. **Find orphans** - Check the statistics to see if any nodes lack connections

## Implementation Notes

This viewer follows the standard vis.js architectural patterns:

- Uses `vis.DataSet` for nodes and edges
- Implements node `hidden` property for filtering
- Combines separate search and legend features
- Updates statistics dynamically based on visibility
- Maintains consistent styling across features

## Use Cases

- **Course planning** - Filter by topic area to design lesson sequences
- **Concept exploration** - Search for specific concepts and see their dependencies
- **Gap analysis** - Use orphan count to identify disconnected concepts
- **Progressive learning** - Start with foundation concepts, gradually enable advanced topics
