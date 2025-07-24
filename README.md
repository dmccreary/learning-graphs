# Learning Graphs

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://dmccreary.github.io/learning-graphs/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Built with MkDocs](https://img.shields.io/badge/Built%20with-MkDocs-blue)](https://www.mkdocs.org/)
[![Material Theme](https://img.shields.io/badge/Theme-Material-blue)](https://squidfunk.github.io/mkdocs-material/)

> **A comprehensive resource for creating and maintaining learning graphs (concept dependency graphs) for education**

Learning graphs are powerful tools for visualizing relationships between educational concepts, helping educators design more effective curricula and students understand learning pathways. This repository provides documentation, interactive tools, and practical examples for implementing learning graphs in educational settings.

🌐 **[Visit the Website](https://dmccreary.github.io/learning-graphs/)**

## ✨ Features

- **📚 Comprehensive Documentation** - Detailed guides on creating and using learning graphs
- **🎮 Interactive Visualizations** - Built with vis.js for dynamic graph exploration
- **🛠️ Graph Editor Tools** - Create and modify concept dependency graphs
- **📊 Real-world Case Studies** - Examples from circuits, algorithms, and systems thinking
- **🤖 AI Integration Prompts** - Leverage generative AI for content creation
- **🎯 Educational Frameworks** - Integration with Bloom's Taxonomy and learning theory

## 🚀 Quick Start

### Prerequisites

- Python 3.x
- MkDocs and MkDocs Material theme

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dmccreary/learning-graphs.git
   cd learning-graphs
   ```

2. **Set up Python environment** (using conda - recommended)
   ```bash
   conda create -n mkdocs python=3
   conda activate mkdocs
   pip install mkdocs "mkdocs-material[imaging]"
   ```

3. **Run local development server**
   ```bash
   mkdocs serve
   ```
   
   Visit `http://localhost:8000` to view the site locally.

### Building and Deployment

```bash
# Build static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## 📖 Documentation Structure

- **[Chapters](docs/chapters/)** - Core concepts and methodology
- **[Visualizations](docs/vis/)** - Interactive vis.js examples and tutorials  
- **[Case Studies](docs/case-studies/)** - Real-world applications
- **[Concepts](docs/concepts/)** - Taxonomies and definitions
- **[AI Prompts](docs/prompts/)** - Templates for content generation

## 🎯 Use Cases

- **Curriculum Design** - Map prerequisite relationships between course topics
- **Personalized Learning** - Create adaptive learning pathways
- **Knowledge Assessment** - Identify learning gaps and dependencies
- **Course Planning** - Optimize topic sequencing and pacing
- **Educational Research** - Analyze concept relationships and learning patterns

## 🛠️ Interactive Tools

### Graph Viewer
- Load and visualize learning graphs from JSON files
- Interactive exploration with zoom, pan, and selection
- Statistics display (node count, edge count, orphaned concepts)

### Graph Editor
- Create and modify concept dependency graphs
- Real-time editing with drag-and-drop interface
- Import/export functionality for sharing graphs
- Group-based styling for different concept types

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test locally with `mkdocs serve`
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### For Contributors

- Review the [CLAUDE.md](CLAUDE.md) file for development guidelines
- Follow existing patterns in vis.js components
- Test all interactive examples before submitting
- Update documentation for new features

## 🎓 Educational Impact

Learning graphs help:
- **Students** understand prerequisite relationships and learning pathways
- **Educators** design more effective and coherent curricula
- **Institutions** optimize course sequences and identify knowledge gaps
- **Researchers** analyze and improve educational methodologies

## 🙏 Acknowledgements

We gratefully acknowledge the open source communities and developers who make this project possible:

### Core Technologies
- **[vis.js](https://visjs.org/)** - The amazing vis.js team for creating powerful network visualization tools that make our interactive learning graphs possible
- **[MkDocs](https://www.mkdocs.org/)** - For the excellent static site generator
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - For the beautiful and functional documentation theme

### JavaScript Libraries
- **vis.js Network** - Interactive network visualization and graph editing capabilities
- **p5.js** - Creative coding library used in some visualization examples

### Special Thanks
- The educational technology community for inspiring this work
- Contributors and volunteers who help improve the documentation
- Educators who provide feedback on practical applications

## 📄 License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

You are free to:
- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit
- **NonCommercial** — You may not use the material for commercial purposes  
- **ShareAlike** — You must distribute contributions under the same license

## 📧 Contact

- **Website**: [dmccreary.github.io/learning-graphs](https://dmccreary.github.io/learning-graphs/)
- **Repository**: [github.com/dmccreary/learning-graphs](https://github.com/dmccreary/learning-graphs)
- **Issues**: [Report bugs or request features](https://github.com/dmccreary/learning-graphs/issues)

---

⭐ **Star this repository** if you find it helpful! It helps others discover this resource.