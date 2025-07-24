# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Learning Graphs** documentation site built with MkDocs Material, focusing on concept dependency graphs for educational purposes. The repository contains documentation, interactive vis.js visualizations, and tools for creating and managing learning graphs.

## Common Development Commands

### MkDocs Site Building
```bash
# Build the static site (outputs to site/)
mkdocs build

# Run local development server on http://localhost:8000
mkdocs serve

# Deploy to GitHub Pages (build + deploy)
mkdocs gh-deploy
```

### Python Environment Setup
```bash
# Create conda environment (recommended approach)
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"

# Or use venv alternative
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install mkdocs mkdocs-material
```

### Git Operations
```bash
# Standard workflow after changes
git add [files]
git commit -m "descriptive message"
git push
```

## Architecture Overview

### Content Structure
- **`/docs/`** - All MkDocs source content
  - **`chapters/`** - Main educational content about learning graphs
  - **`vis/`** - Interactive vis.js visualization examples and tutorials
  - **`concepts/`** - Concept definitions and taxonomies
  - **`case-studies/`** - Real-world applications
  - **`prompts/`** - AI prompts for generating learning content
- **`/site/`** - Generated static site (ignored in git)
- **`/src/`** - Source utilities (CSV conversion tools, image processing)

### Vis.js Visualization Architecture

The visualization components follow consistent patterns:

#### Core Structure Pattern
```javascript
// Standard initialization
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;

document.addEventListener('DOMContentLoaded', (event) => {
  var container = document.getElementById('mynetwork');
  var data = { nodes: nodes, edges: edges };
  network = new vis.Network(container, data, options);
});
```

#### Key Components
- **Graph Editor** (`docs/vis/graph-editor/`) - Full editing interface with JSON import/export
- **Graph Viewer** (`docs/vis/graph-viewer/`) - Read-only visualization with file loading
- **Templates** (`docs/vis/templates/`) - Self-contained HTML examples
- **Specialized Labs** - Tutorials covering specific vis.js features

#### Data Structures
**Node Format:**
```json
{
  "id": 1,
  "label": "Concept Name",
  "group": "foundation|term|goal", 
  "shape": "box|circle|star|dot",
  "x": -600, "y": 0,
  "fixed": {"x": true, "y": false},
  "domain": "category_for_clustering"
}
```

**Edge Format:**
```json
{
  "id": 1, "from": 1, "to": 2,
  "label": "Relationship Type"
}
```

### Common Utilities Available

1. **Position Management** - X-axis fixing for hierarchical layouts
2. **File I/O** - JSON import/export with proper error handling  
3. **Statistics Display** - Node/edge counting, orphan detection
4. **Group-based Styling** - Color coding by concept type
5. **Legend Systems** - Interactive legends with visibility toggles
6. **Clustering** - Domain-based node grouping

## File Naming Conventions

- **Visualization files**: Use descriptive names with version numbers (`graph-editor-v10.js`)
- **Documentation**: Use numbered prefixes for sequence (`01-learning-graphs.md`)
- **Data files**: JSON for graph data, CSV for bulk concept data
- **Images**: PNG for screenshots, SVG for diagrams when possible

## Key Configuration Files

- **`mkdocs.yml`** - Site structure, theme settings, navigation
- **`docs/css/extra.css`** - Custom styling for Material theme
- **`mkdocs-gen.sh`** - Site generation script

## Development Notes

- Site uses **MkDocs Material theme** with custom CSS extensions
- All vis.js components should follow the established architectural patterns
- Interactive examples should be self-contained HTML files when possible
- Use consistent group naming: `foundation`, `term`, `goal` for concept types
- JSON files should be formatted and validated before committing
- Physics settings in vis.js are standardized across components for consistency

## Content Creation Workflow

1. Create markdown content in appropriate `docs/` subdirectory
2. Add entry to `mkdocs.yml` navigation if needed
3. Test locally with `mkdocs serve`
4. Build and deploy with `mkdocs gh-deploy` after review