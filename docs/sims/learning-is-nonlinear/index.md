# Learning is Nonlinear

<iframe src="main.html" width="100%" height="800px" scrolling="no"></iframe>
[Fullscreen](./main.html)
## About This MicroSim

This interactive visualization demonstrates a fundamental insight about how we learn: **learning is not a linear process**. Using 40 topics from a typical calculus curriculum, this simulation contrasts two different mental models of learning.

## Learning Objectives

After exploring this MicroSim, students should be able to:

1. **Understand** the difference between linear and nonlinear learning pathways
2. **Analyze** how concept dependencies create a learning graph structure
3. **Evaluate** the limitations of sequential, textbook-style learning
4. **Apply** this understanding to their own study strategies

## Two Views of Learning

### Linear Learning (Sequential)

The traditional textbook approach presents topics in a fixed sequence, one after another. This view:

- Follows a serpentine pattern from beginning to end
- Assumes each topic depends only on the previous one
- Mirrors chapter-by-chapter progression
- Simplifies planning but may not reflect true concept relationships

### Nonlinear Learning (Concept Dependencies)

The learning graph view shows the actual dependency structure of concepts:

- Some topics (like **Limits**) are foundational and enable many others
- Multiple prerequisite concepts may be needed for advanced topics
- The structure forms a Directed Acyclic Graph (DAG)
- Reveals natural groupings and parallel learning opportunities

## How to Use This MicroSim

1. **Default View**: The simulation starts in **Nonlinear Learning** mode, showing the force-directed graph with concept dependencies
2. **Switch Modes**: Use the radio buttons at the bottom to toggle between Linear and Nonlinear views
3. **Explore Connections**: In nonlinear mode, click and drag nodes to explore relationships
4. **Identify Patterns**: Notice how foundational concepts (in red) enable many downstream topics

## Key Insights

### Foundational Concepts

Notice that **Limits** (concept #1) is pinned to the left in nonlinear mode. This reflects its role as the foundation of calculus - almost everything else depends on understanding limits.

### Topic Groups

Concepts are color-coded by category:

- **Red**: Foundations (Limits, Continuity)
- **Blue**: Derivatives (Power Rule, Chain Rule)
- **Green**: Applications (Optimization, Related Rates)
- **Purple**: Theorems (Mean Value, Fundamental Theorem)
- **Orange**: Integrals (Riemann Sums, Substitution)
- **Turquoise**: Transcendental Functions
- **Yellow**: Advanced Topics (Parametric, Polar)
- **Dark Gray**: Sequences and Series

### Dependencies Matter

In the nonlinear view, observe:

- Some topics have many prerequisites (e.g., Integration by Parts)
- Some topics enable many others (e.g., Derivative Definition)
- The actual dependency structure is much richer than linear progression suggests

## Pedagogical Applications

### For Students

This visualization helps you:

- Identify prerequisites you may need to review
- Understand why some topics feel harder (more dependencies)
- Find parallel learning paths when one approach isn't working
- Plan study sequences that respect concept dependencies

### For Educators

Use this to:

- Design curriculum that respects concept dependencies
- Identify bottleneck concepts that need extra emphasis
- Create flexible learning paths for different student needs
- Explain why topics are taught in a particular order

## Technical Details

- **Visualization Library**: vis-network.js
- **Node Shape**: Ellipses
- **Edge Labels**: "DEPENDS_ON" (8pt font)
- **Layout Algorithms**:
  - Linear: Fixed serpentine grid layout
  - Nonlinear: Barnes-Hut force-directed algorithm with stabilization
- **Data Structure**: 40 calculus topics with 43 dependency relationships

## Questions for Reflection

1. Which foundational concepts enable the most downstream learning?
2. How does the nonlinear structure suggest alternative learning sequences?
3. What topics could potentially be learned in parallel?
4. How might this change your approach to studying mathematics?

## Related Concepts

- **Directed Acyclic Graphs (DAGs)**: Mathematical structures representing dependencies without cycles
- **Bloom's Taxonomy**: Framework for categorizing learning objectives by cognitive complexity
- **Mastery Learning**: Educational approach where students master prerequisites before advancing
- **Concept Mapping**: Visual learning technique for representing knowledge relationships

## Extensions

Consider exploring:

- How would this graph look for other subjects (physics, programming, chemistry)?
- What happens if we add skill level as a third dimension?
- How could adaptive learning systems use dependency graphs to personalize instruction?

---

**Grade Level**: Undergraduate (College Calculus I-II)

**Duration**: 10-15 minutes

**Prerequisites**: Basic understanding of calculus topics (helpful but not required)
