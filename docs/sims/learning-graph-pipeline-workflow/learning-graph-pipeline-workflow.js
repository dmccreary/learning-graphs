// CANVAS_HEIGHT: 900
// The Pipeline From Course Description to Validated Graph — Mermaid top-to-bottom
// flowchart. Ten steps, color-coded by type: automated (gear, indigo), human
// checkpoint (person, gold), output file (document, green). One dashed feedback
// loop, "Iterative Graph Regeneration", runs from Automated Quality Validation
// back to Concept List Review. Bloom L5 (Evaluate): each infobox names the node
// type and gives a diagnostic cue so learners can judge which step a specific
// quality problem traces to and justify iteration vs. full regeneration.

// ---- Stored descriptions + evaluate-level diagnostics (spec contract) ---
// type drives the badge; diag is the "if a problem traces here" cue that makes
// the L5 judge/justify task concrete.
const info = {
  Invoke: {
    title: '1. Skill Invocation',
    type: 'auto',
    text: 'The user or agent triggers the skill by name, and Claude Code loads its instructions.',
    diag: 'Rarely the source of a content defect — problems here look like the skill not running at all.'
  },
  Score: {
    title: '2. Course Description Scoring',
    type: 'human',
    text: 'Scored against a 100-point rubric; below 85 the user revises before continuing.',
    diag: 'A vague or underspecified course description traces here. Fix the description and re-score — do not regenerate downstream artifacts yet.'
  },
  ConceptGen: {
    title: '3. Concept List Generation',
    type: 'auto',
    text: 'Drafts a flat, numbered list of Title Case labels covering the course’s full breadth.',
    diag: 'Missing whole topic areas traces here. If breadth is badly off, regenerate the list; if only a few labels are wrong, patch them in the review step.'
  },
  ConceptReview: {
    title: '4. Concept List Review',
    type: 'human',
    text: 'The user reads the full list and adds, removes, or renames entries before dependency work begins.',
    diag: 'A wrong, duplicate, or misnamed concept should be caught and corrected here — this is the cheapest place to fix the concept set.'
  },
  DepCSV: {
    title: '5. Dependency CSV Generation',
    type: 'auto',
    text: 'Encodes prerequisites as a CSV, edges pointing from each dependent concept to its prerequisites.',
    diag: 'A missing or backwards prerequisite edge traces here. Usually a targeted edit to a few rows, then re-validate.'
  },
  Validate: {
    title: '6. Automated Quality Validation',
    type: 'auto',
    text: 'A script checks cycles, orphans, disconnected subgraphs, and linear chains, producing a numeric score.',
    diag: 'This is where an orphaned node or a cycle is DETECTED — but the fix belongs to Step 4 or 5. A scoped failure means targeted iteration, not restarting from Step 1.'
  },
  Taxonomy: {
    title: '7. Taxonomy Generation Step',
    type: 'auto',
    text: 'Designs 10-12 balanced categories and assigns every concept to one, adding a TaxonomyID column.',
    diag: 'A mislabeled or miscategorized concept traces here. Re-assign the affected concepts rather than regenerating the whole graph.'
  },
  BuildJSON: {
    title: '8. Generate learning-graph.json',
    type: 'output',
    text: 'Combines the taxonomy-enriched CSV, metadata, and taxonomy names into the graph JSON used by every vis.js diagram in this book.',
    diag: 'A rendering or data-shape problem in the JSON usually means an upstream CSV/taxonomy fix, then rebuild this file.'
  },
  Log: {
    title: '9. Pipeline Session Log',
    type: 'output',
    text: 'Records every step executed, problems found, and fixes applied, for future debugging.',
    diag: 'Not a quality gate — it is the audit trail you consult to decide whether past fixes were iteration or full regeneration.'
  },
  HumanReview: {
    title: '10. Human-in-the-Loop Review',
    type: 'human',
    text: 'The user reviews the concept list, taxonomy, and graph JSON before the token-expensive chapter-generation skill runs.',
    diag: 'Last checkpoint before expensive downstream work. If a systemic problem surfaces here, that is when full regeneration may be justified over patching.'
  },
  Loop: {
    title: 'Iterative Graph Regeneration loop',
    type: 'auto',
    text: 'When validation finds a scoped, specific problem, the pipeline patches the affected concepts or edges and re-validates, rather than restarting from Step 1.',
    diag: 'This dashed path is the justification for targeted iteration: prefer it whenever the defect is specific and local.'
  }
};

const typeLabel = { auto: 'Automated step', human: 'Human checkpoint', output: 'Output file' };
const typeClass = { auto: 'type-auto', human: 'type-human', output: 'type-output' };

const infobox = document.getElementById('infobox');

function showInfo(nodeId) {
  const item = info[nodeId];
  if (!item) return;
  infobox.innerHTML =
    '<div class="info-title">' + item.title + '</div>' +
    '<span class="info-type ' + typeClass[item.type] + '">' + typeLabel[item.type] + '</span>' +
    '<div class="info-text">' + item.text + '</div>' +
    '<div class="info-diag"><strong>If a problem traces here:</strong> ' + item.diag + '</div>';
}
window.showInfo = showInfo;

// ---- Diagram definition ------------------------------------------------
// TB pipeline of 10 steps. Icons are emoji prefixes in each label. Three
// classDefs color-code the node types. The regeneration edge is dashed (-.->)
// and its label is wired clickable after render.
const diagram = [
  'flowchart TB',
  '    Invoke["&#9881;&#65039; Skill Invocation"]:::auto',
  '    Score["&#128100; Course Description<br/>Scoring"]:::human',
  '    ConceptGen["&#9881;&#65039; Concept List<br/>Generation"]:::auto',
  '    ConceptReview["&#128100; Concept List<br/>Review"]:::human',
  '    DepCSV["&#9881;&#65039; Dependency CSV<br/>Generation"]:::auto',
  '    Validate["&#9881;&#65039; Automated Quality<br/>Validation"]:::auto',
  '    Taxonomy["&#9881;&#65039; Taxonomy<br/>Generation Step"]:::auto',
  '    BuildJSON["&#128196; Generate<br/>learning-graph.json"]:::output',
  '    Log["&#128196; Pipeline<br/>Session Log"]:::output',
  '    HumanReview["&#128100; Human-in-the-Loop<br/>Review"]:::human',
  '',
  '    Invoke --> Score',
  '    Score --> ConceptGen',
  '    ConceptGen --> ConceptReview',
  '    ConceptReview --> DepCSV',
  '    DepCSV --> Validate',
  '    Validate --> Taxonomy',
  '    Taxonomy --> BuildJSON',
  '    BuildJSON --> Log',
  '    Log --> HumanReview',
  '    Validate -. Iterative Graph Regeneration .-> ConceptReview',
  '',
  '    click Invoke call showInfo("Invoke")',
  '    click Score call showInfo("Score")',
  '    click ConceptGen call showInfo("ConceptGen")',
  '    click ConceptReview call showInfo("ConceptReview")',
  '    click DepCSV call showInfo("DepCSV")',
  '    click Validate call showInfo("Validate")',
  '    click Taxonomy call showInfo("Taxonomy")',
  '    click BuildJSON call showInfo("BuildJSON")',
  '    click Log call showInfo("Log")',
  '    click HumanReview call showInfo("HumanReview")',
  '',
  '    classDef auto fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#ffffff,font-size:16px',
  '    classDef human fill:#f5b301,stroke:#b8860b,stroke-width:2px,color:#212529,font-size:16px',
  '    classDef output fill:#22a06b,stroke:#14663f,stroke-width:2px,color:#ffffff,font-size:16px',
  '    linkStyle default stroke:#94a3b8,stroke-width:2px,font-size:15px'
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

// The dashed regeneration arrow is an edge, not a node. After render, make its
// edge label clickable so learners can read the iteration-vs-regeneration rule.
function wireLoopEdge() {
  const labels = document.querySelectorAll('.edgeLabel, .edgeLabels .edgeLabel');
  labels.forEach(function (lbl) {
    const t = (lbl.textContent || '').trim().toLowerCase();
    if (t.indexOf('iterative graph regeneration') !== -1) {
      lbl.classList.add('loop-hot');
      lbl.style.cursor = 'pointer';
      lbl.addEventListener('click', function () { showInfo('Loop'); });
    }
  });
}
