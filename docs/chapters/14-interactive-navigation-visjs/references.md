# References: Interactive Navigation in Vis.js

1. [Tooltip](https://en.wikipedia.org/wiki/Tooltip) - Wikipedia - Explains tooltips as GUI elements that display information when a user hovers over a screen element, the general interface pattern behind this chapter's Node Tooltip and Edge Tooltip, implemented via vis-network's `title` property.

2. [Autocomplete](https://en.wikipedia.org/wiki/Autocomplete) - Wikipedia - Describes predictive-text and live-suggestion interfaces that narrow results as a user types, the general pattern this chapter's Type-Ahead Filtering applies to searching a large learning graph's node labels.

3. [Event-driven programming](https://en.wikipedia.org/wiki/Event-driven_programming) - Wikipedia - Covers the paradigm in which program flow is determined by external triggers like mouse clicks, the conceptual foundation for this chapter's `hoverNode`, `click`, and `doubleClick` event handlers.

4. Designing Interfaces: Patterns for Effective Interaction Design (3rd Edition) - Jenifer Tidwell, Charles Brewer, Aynne Valencia - O'Reilly Media - A pattern catalog covering hover reveals, tooltips, and progressive disclosure that informs how this chapter layers tooltip, inspector, and search interactions without overwhelming a learner.

5. Information Visualization: Perception for Design (3rd Edition) - Colin Ware - Morgan Kaufmann - Explains the perceptual and cognitive principles behind effective interactive visualization, including focus-plus-context navigation, directly relevant to this chapter's Focus Node Navigation and search-driven exploration of large graphs.

6. [Network Events Documentation](https://visjs.github.io/vis-network/docs/network/#Events) - vis.js - Official reference for every event vis-network fires, including `hoverNode`, `blurNode`, `click`, and `doubleClick`, the exact events this chapter's code examples attach listeners to for hover, click, and inspector behavior.

7. [Network Interaction Documentation](https://visjs.github.io/vis-network/docs/network/interaction.html) - vis.js - Documents the `interaction` options block controlling hover highlighting, node selectability, and navigation controls, the configuration layer underlying this chapter's Hover State and Clickable Node behavior.

8. [dblclick event](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event) - MDN Web Docs - Explains how browsers detect and fire a double-click as a distinct event from two single clicks, the underlying browser mechanism vis-network's `doubleClick` event wraps for this chapter's Node Inspector trigger.

9. [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event) - MDN Web Docs - Documents the `input` event that fires on every keystroke in a text field, the browser API this chapter's Type-Ahead Filtering example uses to re-run a search on each character typed.

10. [Tooltip Guidelines](https://www.nngroup.com/articles/tooltip-guidelines/) - Nielsen Norman Group - UX research-based guidance on when and how to use tooltips effectively, including keeping content brief and never hiding task-critical information, useful for authoring this chapter's Node Tooltip content responsibly.
