// CANVAS_HEIGHT: 520
// Generative AI to Learning Graph Pipeline — Mermaid left-to-right flowchart.
// Five stages turn a course description into a validated learning graph.
// The Validation stage is a gold decision diamond (the quality gate); a dashed
// "Reject" arrow loops from Validation back to the Prompt-Engineered Request.
// Bloom L2: learners explain each stage and identify which stage catches an
// invalid (cyclic or orphaned) LLM proposal.

// ---- Stored descriptions (spec contract) -------------------------------
const info = {
  Desc: {
    title: '1. Course Description',
    text: 'A human-authored document stating audience, topics, and learning outcomes (Chapter 2).'
  },
  Prompt: {
    title: '2. Prompt-Engineered Request',
    text: 'A structured prompt asks the model for a fixed number of distinct concept labels and candidate dependency edges.'
  },
  Proposal: {
    title: '3. LLM-Generated Proposal',
    text: 'The model returns a concept list and edges, formatted as JSON, but unverified.'
  },
  Validation: {
    title: '4. Validation (quality gate)',
    text: 'Cycle detection, orphan detection, and connectivity analysis (Chapter 5) check the proposal before anything downstream trusts it. This is the stage that catches an invalid — cyclic or orphaned — proposal.'
  },
  Graph: {
    title: '5. Validated Learning Graph JSON',
    text: 'The artifact every later chapter — visualization, personalization, chapter generation — is built on.'
  },
  Reject: {
    title: 'The dashed "Reject" loop',
    text: 'If validation fails, the prompt is refined and the model is asked again — this is Iterative Workflow, covered later in this chapter.'
  }
};

const infobox = document.getElementById('infobox');

// showInfo() is called by Mermaid click directives and the reject-loop handler.
function showInfo(nodeId) {
  const item = info[nodeId];
  if (!item) return;
  infobox.innerHTML =
    '<div class="info-title">' + item.title + '</div>' +
    '<div class="info-text">' + item.text + '</div>';
}
window.showInfo = showInfo;

// ---- Diagram definition ------------------------------------------------
// LR pipeline. Validation is a diamond {"..."} styled gold. The Reject edge is
// dashed (-.->) and gray; its label is wired clickable after render.
const diagram = [
  'flowchart LR',
  '    Desc["Course Description"]:::content',
  '    Prompt["Prompt-Engineered Request"]:::content',
  '    Proposal["LLM-Generated Proposal"]:::content',
  '    Validation{"Validation"}:::gate',
  '    Graph["Validated Learning Graph JSON"]:::content',
  '',
  '    Desc --> Prompt',
  '    Prompt --> Proposal',
  '    Proposal --> Validation',
  '    Validation -->|Pass| Graph',
  '    Validation -. Reject .-> Prompt',
  '',
  '    click Desc call showInfo("Desc")',
  '    click Prompt call showInfo("Prompt")',
  '    click Proposal call showInfo("Proposal")',
  '    click Validation call showInfo("Validation")',
  '    click Graph call showInfo("Graph")',
  '',
  '    classDef content fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#ffffff,font-size:16px',
  '    classDef gate fill:#f5b301,stroke:#b8860b,stroke-width:2px,color:#212529,font-size:16px',
  '    linkStyle default stroke:#94a3b8,stroke-width:2px,font-size:16px'
].join('\n');

// ---- Render ------------------------------------------------------------
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'default',
  flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
});

const container = document.getElementById('theDiagram');
container.textContent = diagram;

mermaid.run({ nodes: [container] }).then(wireRejectEdge);

// The dashed "Reject" arrow is an edge, not a node — Mermaid click directives
// cannot target it. After render, make its edge label clickable.
function wireRejectEdge() {
  const labels = document.querySelectorAll('.edgeLabel, .edgeLabels .edgeLabel');
  labels.forEach(function (lbl) {
    if ((lbl.textContent || '').trim().toLowerCase() === 'reject') {
      lbl.classList.add('reject-hot');
      lbl.style.cursor = 'pointer';
      lbl.addEventListener('click', function () { showInfo('Reject'); });
    }
  });
}
