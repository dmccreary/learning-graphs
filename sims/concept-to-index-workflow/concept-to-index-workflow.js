// CANVAS_HEIGHT: 860
// From Concept to Index Entry — Mermaid top-down flowchart (6 nodes).
// Bloom L3 (Apply): click each node to demonstrate/execute how a concept's
// label data (preferred label, alternate labels, chapter) is mechanically
// transformed into finished index lines — including the synonym cross-reference
// — with no manual index-writing step.

// Per-node descriptions. `kind` themes the infobox (source / output / process).
const stepInfo = {
  Record: {
    label: 'Concept Record (source)',
    text: "A graph node with a preferred label, alternate labels, a definition, and the chapter(s) where it appears — e.g., preferred label 'Bipartite Graph', alternate label 'Two-Part Graph', chapter 4.",
    kind: 'source'
  },
  Sort: {
    label: 'Sort Alphabetically by Preferred Label',
    text: "All preferred labels across the graph are sorted A-to-Z to form the index's primary entries."
  },
  Attach: {
    label: 'Attach Chapter / Page Numbers',
    text: 'Each preferred label entry lists every chapter where the concept is covered or referenced.'
  },
  Cross: {
    label: 'Generate Cross-References',
    text: "Every alternate label becomes its own alphabetized index line reading 'See [preferred label]', so a reader searching under the synonym still finds the concept."
  },
  Canonical: {
    label: 'Bipartite Graph .......... 42',
    text: 'The finished index contains both the canonical entry and its synonym cross-reference, generated automatically from the same label data.',
    kind: 'output'
  },
  SeeAlso: {
    label: 'Two-Part Graph, see Bipartite Graph',
    text: 'The finished index contains both the canonical entry and its synonym cross-reference, generated automatically from the same label data.',
    kind: 'output'
  }
};

// Mermaid source: rounded start/end (concept record + two generated index
// lines), rectangles for the three processing steps. Every node clickable.
const diagramSource = `flowchart TD
    Record(["Concept Record"]):::source
    Sort["Sort Alphabetically<br/>by Preferred Label"]:::process
    Attach["Attach Chapter<br/>Page Numbers"]:::process
    Cross["Generate<br/>Cross-References"]:::process
    Canonical(["Bipartite Graph .......... 42"]):::output
    SeeAlso(["Two-Part Graph,<br/>see Bipartite Graph"]):::output

    Record --> Sort
    Sort --> Attach
    Attach --> Cross
    Cross --> Canonical
    Cross --> SeeAlso

    click Record call showInfo("Record")
    click Sort call showInfo("Sort")
    click Attach call showInfo("Attach")
    click Cross call showInfo("Cross")
    click Canonical call showInfo("Canonical")
    click SeeAlso call showInfo("SeeAlso")

    classDef source fill:#ffc107,stroke:#b8860b,stroke-width:2px,color:#212529,font-size:16px
    classDef process fill:#1976d2,stroke:#0d47a1,stroke-width:2px,color:#ffffff,font-size:16px
    classDef output fill:#2e7d32,stroke:#1b5e20,stroke-width:2px,color:#ffffff,font-size:16px

    linkStyle default stroke:#9e9e9e,stroke-width:2px,font-size:14px
`;

// Global callback invoked by Mermaid click directives (securityLevel loose).
window.showInfo = function (stepId) {
  const info = stepInfo[stepId];
  const box = document.getElementById('infobox');
  if (!info || !box) return;

  box.className = info.kind ? info.kind : '';
  box.innerHTML =
    '<div class="step-label">' + info.label + '</div>' +
    '<div class="step-text">' + info.text + '</div>';

  document.querySelectorAll('.node.selected').forEach(function (n) {
    n.classList.remove('selected');
  });
  const target = document.querySelector('[id^="flowchart-' + stepId + '-"]');
  if (target) target.classList.add('selected');
};

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
