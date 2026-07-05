// CANVAS_HEIGHT: 520
// Assessment Feedback Loop Explorer — Mermaid circular feedback loop.
// Four stages (Assess -> Feedback -> Adjust -> Reassess) connected in a cycle,
// with the closing arrow labeled "repeats" and itself clickable. Clicking any
// stage populates an infobox and highlights that node in gold. Bloom L2:
// learners explain each stage and classify scenarios by stage.

// ---- Stored descriptions (spec contract) -------------------------------
const info = {
  Assess: {
    title: '1. Assess',
    text: 'A quiz, project, or other structured measurement produces evidence of current understanding (this chapter’s Assessment).'
  },
  Feedback: {
    title: '2. Feedback',
    text: 'The learner receives actionable, specific information about the gap between current and target understanding (Formative Feedback).'
  },
  Adjust: {
    title: '3. Adjust',
    text: 'The learner changes study strategy — for example, reviewing a specific prior chapter section or requesting a different explanation.'
  },
  Reassess: {
    title: '4. Reassess',
    text: 'A new assessment checks whether the adjustment worked, and the cycle returns to stage 1 with updated evidence.'
  },
  Repeats: {
    title: 'The "repeats" arrow',
    text: 'This is why it’s called a loop and not a sequence — each pass uses updated evidence from the one before it.'
  }
};

const infobox = document.getElementById('infobox');

// showInfo() is called by Mermaid click directives and by the loop-edge handler.
function showInfo(nodeId) {
  const item = info[nodeId];
  if (!item) return;
  infobox.innerHTML =
    '<div class="info-title">' + item.title + '</div>' +
    '<div class="info-text">' + item.text + '</div>';
  highlight(nodeId);
}
// Expose for Mermaid securityLevel:'loose' click callbacks.
window.showInfo = showInfo;

// Gold-highlight the most recently clicked stage (skip the loop edge, which is
// not a node). Highlight persists until another node is clicked.
function highlight(nodeId) {
  document.querySelectorAll('.node.selected').forEach(function (n) {
    n.classList.remove('selected');
  });
  if (nodeId === 'Repeats') return;
  document.querySelectorAll('.node').forEach(function (n) {
    const id = n.id.replace('flowchart-', '').split('-')[0];
    if (id === nodeId) n.classList.add('selected');
  });
}

// ---- Diagram definition ------------------------------------------------
// A four-node cycle. The closing edge carries the "repeats" label. All four
// stage nodes share one indigo fill via classDef.
const diagram = [
  'flowchart LR',
  '    Assess["Assess"]:::stage',
  '    Feedback["Feedback"]:::stage',
  '    Adjust["Adjust"]:::stage',
  '    Reassess["Reassess"]:::stage',
  '',
  '    Assess --> Feedback',
  '    Feedback --> Adjust',
  '    Adjust --> Reassess',
  '    Reassess -->|repeats| Assess',
  '',
  '    click Assess call showInfo("Assess")',
  '    click Feedback call showInfo("Feedback")',
  '    click Adjust call showInfo("Adjust")',
  '    click Reassess call showInfo("Reassess")',
  '',
  '    classDef stage fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#ffffff,font-size:16px',
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

mermaid.run({ nodes: [container] }).then(wireLoopEdge);

// The "repeats" arrow is an edge, not a node, so Mermaid's click directive
// cannot bind to it. After render, make its edge label clickable.
function wireLoopEdge() {
  const labels = document.querySelectorAll('.edgeLabel, .edgeLabels .edgeLabel');
  labels.forEach(function (lbl) {
    if ((lbl.textContent || '').trim().toLowerCase() === 'repeats') {
      lbl.classList.add('loop-hot');
      lbl.style.cursor = 'pointer';
      lbl.addEventListener('click', function () { showInfo('Repeats'); });
    }
  });
}
