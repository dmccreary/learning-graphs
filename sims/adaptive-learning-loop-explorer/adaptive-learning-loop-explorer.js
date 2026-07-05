// CANVAS_HEIGHT: 560
// Adaptive Learning Loop Explorer — Mermaid cyclic flowchart (4 stages).
// Bloom L2 (Understand): click each stage to explain it and classify the
// earlier-chapter mechanism that performs it. The step-4 -> step-1 edge is
// animated to reinforce that the loop never terminates.

// Per-stage descriptions revealed in the infobox below the diagram.
const stepInfo = {
  Present: {
    label: '1. Present Content',
    text: 'The learner receives a concept, activity, or assessment chosen for their current mastery record.'
  },
  Observe: {
    label: '2. Observe Performance',
    text: 'The system records how the learner performed — correct, incorrect, time taken, hints used.'
  },
  Adjust: {
    label: '3. Adjust Recommendation',
    text: "Chapter 9's content sequencing algorithm recomputes the ready-to-learn set and reprioritizes it using the new evidence."
  },
  Repeat: {
    label: '4. Repeat',
    text: 'The loop runs again on the next interaction, continually, rather than once at course start.'
  }
};

// Mermaid source: a closed loop of four nodes, with Repeat -> Present closing
// the cycle. Every node carries a click directive calling the global showInfo.
const diagramSource = `flowchart TD
    Present["1. Present Content"]:::stage
    Observe["2. Observe Performance"]:::stage
    Adjust["3. Adjust Recommendation"]:::stage
    Repeat["4. Repeat"]:::stage

    Present --> Observe
    Observe --> Adjust
    Adjust --> Repeat
    Repeat -- "next interaction" --> Present

    click Present call showInfo("Present")
    click Observe call showInfo("Observe")
    click Adjust call showInfo("Adjust")
    click Repeat call showInfo("Repeat")

    classDef stage fill:#3f51b5,stroke:#283593,stroke-width:2px,color:#ffffff,font-size:16px

    linkStyle default stroke:#7986cb,stroke-width:2px,font-size:14px
`;

// Global callback invoked by Mermaid click directives (needs securityLevel loose).
window.showInfo = function (stepId) {
  const info = stepInfo[stepId];
  const box = document.getElementById('infobox');
  if (!info || !box) return;

  box.innerHTML =
    '<div class="step-label">' + info.label + '</div>' +
    '<div class="step-text">' + info.text + '</div>';

  // Gold highlight on the currently selected node only.
  document.querySelectorAll('.node.selected').forEach(function (n) {
    n.classList.remove('selected');
  });
  const target = document.querySelector('[id^="flowchart-' + stepId + '-"]');
  if (target) target.classList.add('selected');
};

// Tag the Repeat -> Present edge so CSS can animate it as the "never ends" loop.
function markLoopEdge() {
  // Mermaid assigns edge ids like L_Repeat_Present_0; find and flag it.
  const edges = document.querySelectorAll('#mermaid-graph .edgePaths path.flowchart-link');
  edges.forEach(function (p) {
    const id = p.id || '';
    if (id.indexOf('Repeat') !== -1 && id.indexOf('Present') !== -1) {
      p.closest('.edgePaths') ? p.classList.add('loop-edge-path') : null;
      // Wrap the path so the dashed animation class targets it reliably.
      p.parentNode && p.parentNode.classList.add('loop-edge');
    }
  });
  // Fallback: if id-matching missed, animate the last edge (the closing arrow).
  if (!document.querySelector('.loop-edge') && edges.length) {
    edges[edges.length - 1].parentNode.classList.add('loop-edge');
  }
}

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'default',
  flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
});

async function render() {
  const el = document.getElementById('mermaid-graph');
  el.textContent = diagramSource;
  el.removeAttribute('data-processed');
  await mermaid.run({ nodes: [el] });
  markLoopEdge();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
