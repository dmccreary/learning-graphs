// CANVAS_HEIGHT: 1180
// Book Build Workflow Pipeline — Mermaid top-down flowchart (7 stages).
// Bloom L4 (Analyze): click each stage to examine its inputs/outputs and
// differentiate the two problem-catching stages (Quality Validation, Local
// Preview) that precede public deployment. A dashed "Fix and Retry" loop from
// the Quality gate back to Content Generation models the iterative workflow.

// Per-stage descriptions. `kind` themes the infobox (gate / deploy / content).
const stepInfo = {
  Graph: {
    label: '1. Course Description and Learning Graph',
    text: 'The validated, cycle-free concept dependency graph from Chapters 1-5.'
  },
  Structure: {
    label: '2. Chapter Structure Generation',
    text: 'A skill reads the graph and produces chapter outlines in dependency order.'
  },
  Content: {
    label: '3. Chapter Content Generation',
    text: 'A skill turns each outline into prose, diagrams, and MicroSim specifications — the process that produced this chapter.'
  },
  MicroSim: {
    label: '4. MicroSim Implementation',
    text: 'Diagram specifications are turned into working main.html and JavaScript files.'
  },
  Quality: {
    label: '5. Quality Validation',
    text: 'Automated Quality Gate checks (word counts, broken links, missing concepts, reading-level drift) run before anything is published.',
    kind: 'gate'
  },
  Preview: {
    label: '6. Local Preview (mkdocs serve)',
    text: 'A reviewer checks formatting, links, and MicroSim rendering on their own machine before anything goes live.'
  },
  Deploy: {
    label: '7. Deployment (mkdocs gh-deploy)',
    text: 'The reviewed site is built and pushed to GitHub Pages, becoming publicly reachable.',
    kind: 'deploy'
  }
};

// Extra detail for the dashed retry loop (reachable via node click OR the button).
const retryInfo = {
  label: 'Fix and Retry (dashed loop)',
  text: 'A failed quality check sends content back for revision rather than blocking the entire pipeline — an iterative workflow, as defined in Chapter 17.',
  kind: 'retry'
};

// Mermaid source: seven-stage TD pipeline; Quality is a decision diamond; a
// dashed retry edge loops from Quality back to Content. Every node clickable.
const diagramSource = `flowchart TD
    Graph["1. Course Description<br/>and Learning Graph"]:::content
    Structure["2. Chapter Structure<br/>Generation"]:::content
    Content["3. Chapter Content<br/>Generation"]:::content
    MicroSim["4. MicroSim<br/>Implementation"]:::content
    Quality{"5. Quality<br/>Validation"}:::gate
    Preview["6. Local Preview<br/>mkdocs serve"]:::content
    Deploy["7. Deployment<br/>mkdocs gh-deploy"]:::deploy

    Graph --> Structure
    Structure --> Content
    Content --> MicroSim
    MicroSim --> Quality
    Quality -- "Pass" --> Preview
    Preview --> Deploy
    Quality -. "Fix and Retry" .-> Content

    click Graph call showInfo("Graph")
    click Structure call showInfo("Structure")
    click Content call showInfo("Content")
    click MicroSim call showInfo("MicroSim")
    click Quality call showInfo("Quality")
    click Preview call showInfo("Preview")
    click Deploy call showInfo("Deploy")

    classDef content fill:#3f51b5,stroke:#283593,stroke-width:2px,color:#ffffff,font-size:16px
    classDef gate fill:#ffc107,stroke:#b8860b,stroke-width:2px,color:#212529,font-size:16px
    classDef deploy fill:#2e7d32,stroke:#1b5e20,stroke-width:2px,color:#ffffff,font-size:16px

    linkStyle default stroke:#9e9e9e,stroke-width:2px,font-size:14px
`;

function paintBox(info, highlightId) {
  const box = document.getElementById('infobox');
  if (!box) return;
  box.className = info.kind ? info.kind : '';
  let html =
    '<div class="step-label">' + info.label + '</div>' +
    '<div class="step-text">' + info.text + '</div>';
  // Keep the retry button available on stage views (not on the retry view itself).
  if (info.kind !== 'retry') {
    html += '<button id="retryBtn">What does the dashed "Fix and Retry" arrow mean?</button>';
  }
  box.innerHTML = html;
  wireRetryButton();

  document.querySelectorAll('.node.selected').forEach(function (n) {
    n.classList.remove('selected');
  });
  if (highlightId) {
    const target = document.querySelector('[id^="flowchart-' + highlightId + '-"]');
    if (target) target.classList.add('selected');
  }
}

// Global callback invoked by Mermaid click directives (securityLevel loose).
window.showInfo = function (stepId) {
  const info = stepInfo[stepId];
  if (!info) return;
  paintBox(info, stepId);
};

function showRetry() {
  paintBox(retryInfo, null);
}

function wireRetryButton() {
  const btn = document.getElementById('retryBtn');
  if (btn) btn.addEventListener('click', showRetry);
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
  wireRetryButton();

  // Make the dashed "Fix and Retry" edge label clickable to reveal its detail.
  document.querySelectorAll('#mermaid-graph .edgeLabel').forEach(function (lbl) {
    if ((lbl.textContent || '').indexOf('Fix and Retry') !== -1) {
      lbl.style.cursor = 'pointer';
      lbl.addEventListener('click', showRetry);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
