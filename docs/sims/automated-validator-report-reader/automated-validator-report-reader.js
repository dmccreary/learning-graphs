// Automated Validator Report Reader
// CANVAS_HEIGHT: 560
//
// A simulated validate-learning-graph.sh report: six findings (three errors,
// three warnings) against a 15-node sample graph. Clicking a finding locates the
// node or edge it actually refers to.
//
// Every finding is TRUE of the graph below — the cycle, the orphan, the 33%
// category, the out-degree of 5 are all real properties of NODE_DEFS/EDGE_DEFS,
// not decoration. A report reader that pointed at the wrong element would teach
// the opposite of what it is for.
//
// The publish judgment is the Analyze-level payload: severity alone does not
// decide it. Three errors exist, but one is already resolved, so exactly two
// block. Warnings never block.

// ===========================================
// GRAPH DATA
// ===========================================

const NODE_DEFS = [
    // Graph Theory category — 5 of 15 concepts, which is the 33% in finding W1
    { id: 'Concept',       x: -300, y: -150, cat: 'Graph Theory' },
    { id: 'Edge',          x: -300, y:  -60, cat: 'Graph Theory' },
    { id: 'Graph',         x: -190, y: -105, cat: 'Graph Theory' },
    { id: 'DAG',           x:  -80, y: -150, cat: 'Graph Theory' },
    { id: 'Traversal',     x:  -80, y:  -55, cat: 'Graph Theory' },

    { id: 'Prerequisite',  x:   40, y: -150, cat: 'Dependencies' },
    { id: 'Learning Path', x:  165, y: -190, cat: 'Dependencies' },
    { id: 'Readiness',     x:  165, y: -105, cat: 'Dependencies' },

    { id: 'Taxonomy',      x: -230, y:   90, cat: 'Taxonomy' },
    { id: 'Concept Label', x:  -90, y:   25, cat: 'Taxonomy' },
    { id: 'Metadata',      x:  -90, y:   95, cat: 'Metadata' },
    { id: 'Assessment',    x:  -90, y:  165, cat: 'Assessment' },
    { id: 'Quiz',          x:   50, y:  135, cat: 'Assessment' },
    { id: 'Validation',    x:   50, y:   50, cat: 'Quality' },

    { id: 'Deployment',    x:  230, y:  120, cat: 'Deployment' }   // orphan (finding E2)
];

const EDGE_DEFS = [
    ['Concept', 'Graph'],
    ['Edge', 'Graph'],
    ['Graph', 'DAG'],
    ['Graph', 'Traversal'],
    ['DAG', 'Prerequisite'],
    ['Taxonomy', 'Concept Label'],
    ['Taxonomy', 'Metadata'],
    ['Taxonomy', 'Validation'],
    ['Taxonomy', 'Assessment'],
    ['Taxonomy', 'Quiz'],
    ['Prerequisite', 'Learning Path'],   // \
    ['Learning Path', 'Readiness'],      //  > the cycle in finding E1
    ['Readiness', 'Prerequisite'],       // /
    ['Assessment', 'Quiz'],
    ['Quiz', 'Validation']
];

// Edge lookup by "from|to" so findings can name the edges they affect.
const EDGE_ID = {};
EDGE_DEFS.forEach(([f, t], i) => { EDGE_ID[f + '|' + t] = 'e' + i; });

function edgeIds(pairs) {
    return pairs.map(p => EDGE_ID[p]).filter(Boolean);
}

// ===========================================
// FINDINGS
// ===========================================
// Listed in generation order (unsorted). severity: 'error' | 'warning'.
// resolved: an error already fixed in a previous pass — present in the report,
// but not a blocker.

const FINDINGS = [
    {
        id: 'BAL-002',
        severity: 'warning',
        message: "Category 'Graph Theory' holds 5 of 15 concepts (33%), above the 30% ceiling.",
        why: 'A warning flags a judgment call, not a broken graph. At 15 concepts the ceiling ' +
             'is a weak signal — the same 33% across 200 concepts would be worth splitting.',
        nodes: ['Concept', 'Edge', 'Graph', 'DAG', 'Traversal'],
        edges: []
    },
    {
        id: 'DAG-001',
        severity: 'error',
        message: 'Cycle detected: Prerequisite → Learning Path → Readiness → Prerequisite.',
        why: 'A cycle means no concept in it can be learned first, so no valid reading order ' +
             'exists. This is the one failure that makes the graph unusable rather than merely ' +
             'imperfect.',
        nodes: ['Prerequisite', 'Learning Path', 'Readiness'],
        edges: edgeIds(['Prerequisite|Learning Path', 'Learning Path|Readiness',
                        'Readiness|Prerequisite'])
    },
    {
        id: 'LEAF-004',
        severity: 'warning',
        message: "'Traversal' has no dependents — nothing in the graph builds on it.",
        why: 'Leaf concepts are legitimate for terminal topics, but a general concept like ' +
             'Traversal with nothing downstream usually means an edge is missing, not that the ' +
             'concept is terminal.',
        nodes: ['Traversal'],
        edges: []
    },
    {
        id: 'DUP-003',
        severity: 'error',
        resolved: true,
        message: "Duplicate concept label: 'Graph' appeared at IDs 3 and 11.",
        why: 'Already resolved — the two nodes were merged in the previous repair pass. It ' +
             'stays in the report as a record of what was fixed, and it does not block ' +
             'publication.',
        nodes: ['Graph'],
        edges: []
    },
    {
        id: 'DEG-005',
        severity: 'warning',
        message: "'Taxonomy' has 5 outgoing dependencies, above the recommended maximum of 4.",
        why: 'High fan-out suggests the concept is doing several jobs at once and may be worth ' +
             'splitting — but one extra edge over the guideline is not a defect on its own.',
        nodes: ['Taxonomy'],
        edges: edgeIds(['Taxonomy|Concept Label', 'Taxonomy|Metadata', 'Taxonomy|Validation',
                        'Taxonomy|Assessment', 'Taxonomy|Quiz'])
    },
    {
        id: 'ORPH-006',
        severity: 'error',
        message: "Orphan concept: 'Deployment' has no incoming or outgoing edges.",
        why: 'An orphan is unreachable: no learning path arrives at it and none leaves it, so ' +
             'it cannot be sequenced into any curriculum. Either it needs edges or it does not ' +
             'belong in the graph.',
        nodes: ['Deployment'],
        edges: []
    }
];

const COLORS = {
    base:    { background: '#cfd8dc', border: '#90a4ae', font: '#37474f' },
    error:   { background: '#e53935', border: '#b71c1c', font: '#b71c1c' },
    warning: { background: '#ffc107', border: '#ff8f00', font: '#e65100' },
    fixed:   { background: '#66bb6a', border: '#2e7d32', font: '#2e7d32' },
    dim:     { background: '#eceff1', border: '#cfd8dc', font: '#b0bec5' }
};

// ===========================================
// STATE
// ===========================================

let nodes, edges, network;
let selected = null;              // finding id
let sorted = false;
let answered = false;
const reviewed = new Set();       // finding ids the learner has opened

// Errors that actually block publication: unresolved ones only.
function blockers() {
    return FINDINGS.filter(f => f.severity === 'error' && !f.resolved);
}

const CORRECT_ANSWER = blockers().length > 0 ? 'no' : 'yes';

// ===========================================
// NETWORK
// ===========================================

function buildNetwork() {
    nodes = new vis.DataSet(NODE_DEFS.map(n => ({
        id: n.id,
        label: n.id,
        x: n.x,
        y: n.y,
        title: n.id + ' — category: ' + n.cat,
        color: { background: COLORS.base.background, border: COLORS.base.border },
        font: { color: COLORS.base.font, size: 11, face: 'Arial' },
        borderWidth: 1.5
    })));

    edges = new vis.DataSet(EDGE_DEFS.map(([from, to], i) => ({
        id: 'e' + i,
        from: from,
        to: to,
        color: { color: '#cfd8dc', highlight: '#cfd8dc' },
        width: 1
    })));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            dragNodes: false,
            dragView: false,
            zoomView: false,
            hover: true,
            navigationButtons: false,
            tooltipDelay: 120
        },
        nodes: {
            shape: 'dot',
            size: 11,
            borderWidth: 1.5,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 3, x: 1, y: 1 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.5 } },
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    network = new vis.Network(document.getElementById('network'),
        { nodes: nodes, edges: edges }, options);
    network.once('afterDrawing', () => network.fit({ animation: false }));
}

// Stage 1 baseline: neutral graph, nothing called out.
function renderGraphBase() {
    nodes.update(NODE_DEFS.map(n => ({
        id: n.id,
        color: { background: COLORS.base.background, border: COLORS.base.border },
        font: { color: COLORS.base.font, size: 11, face: 'Arial' },
        borderWidth: 1.5
    })));
    edges.update(EDGE_DEFS.map((e, i) => ({
        id: 'e' + i, color: { color: '#cfd8dc', highlight: '#cfd8dc' }, width: 1
    })));
}

// Stage 2: highlight exactly the elements the selected finding refers to.
function renderGraphForFinding(f) {
    const key = f.resolved ? 'fixed' : f.severity;
    const hit = COLORS[key];
    const hitNodes = new Set(f.nodes);
    const hitEdges = new Set(f.edges);

    nodes.update(NODE_DEFS.map(n => {
        const on = hitNodes.has(n.id);
        const c = on ? hit : COLORS.dim;
        return {
            id: n.id,
            color: { background: c.background, border: c.border },
            font: { color: on ? c.font : COLORS.dim.font, size: on ? 12 : 11, face: 'Arial' },
            borderWidth: on ? 3 : 1
        };
    }));

    edges.update(EDGE_DEFS.map((e, i) => {
        const on = hitEdges.has('e' + i);
        return {
            id: 'e' + i,
            color: { color: on ? hit.border : '#eceff1', highlight: on ? hit.border : '#eceff1' },
            width: on ? 3 : 1
        };
    }));
}

// ===========================================
// FINDINGS LIST
// ===========================================

function orderedFindings() {
    if (!sorted) return FINDINGS;
    // errors first, and among errors the blockers before the resolved one
    const rank = f => (f.severity === 'error' ? (f.resolved ? 1 : 0) : 2);
    return FINDINGS.slice().sort((a, b) => rank(a) - rank(b));
}

function renderFindings() {
    const list = document.getElementById('findings-list');
    list.innerHTML = '';

    orderedFindings().forEach(f => {
        const li = document.createElement('li');
        li.className = 'finding ' + f.severity +
            (f.resolved ? ' resolved' : '') +
            (selected === f.id ? ' selected' : '') +
            (reviewed.has(f.id) ? ' reviewed' : '');
        li.dataset.id = f.id;

        const sevLabel = f.resolved ? 'resolved' : f.severity;
        li.innerHTML =
            '<div class="f-top">' +
                '<span class="f-sev ' + f.severity + '">' + sevLabel + '</span>' +
                '<span class="f-id">' + f.id + '</span>' +
            '</div>' +
            '<div class="f-msg">' + f.message + '</div>' +
            '<div class="f-why"' + (selected === f.id ? '' : ' hidden') + '>' + f.why + '</div>';

        li.addEventListener('click', () => selectFinding(f.id));
        list.appendChild(li);
    });

    const errs = FINDINGS.filter(f => f.severity === 'error').length;
    const warns = FINDINGS.filter(f => f.severity === 'warning').length;
    document.getElementById('findings-head').textContent =
        'Findings — ' + errs + ' errors, ' + warns + ' warnings  (' + reviewed.size +
        '/' + FINDINGS.length + ' reviewed)';
}

// ===========================================
// PUBLISH PROMPT
// ===========================================

function syncPublishGate() {
    const open = reviewed.size > 0 && !answered;
    document.getElementById('btn-yes').disabled = !open;
    document.getElementById('btn-no').disabled = !open;
    document.getElementById('justification').disabled = !open;
    document.getElementById('pub-gate').hidden = reviewed.size > 0;
}

function answerPublish(choice) {
    if (answered || !reviewed.size) return;
    answered = true;

    const correct = choice === CORRECT_ANSWER;
    const row = document.getElementById('publish-row');
    row.className = 'publish-row ' + (correct ? 'correct' : 'wrong');

    const chips = blockers()
        .map(f => '<span class="blocker">' + f.id + '</span>')
        .join('');

    const head = correct
        ? '<span class="pub-head correct">Correct — not ready to publish</span>'
        : '<span class="pub-head wrong">Not quite — this graph is not ready to publish</span>';

    const body = 'Three errors were reported, but <b>DUP-003 is already resolved</b>, so only ' +
        blockers().length + ' block: ' + chips +
        ' — a cycle leaves no valid reading order, and an orphan cannot be sequenced at all. ' +
        'Warnings never block on their own.';

    const fb = document.getElementById('pub-feedback');
    fb.innerHTML = head + '<div>' + body + '</div>';
    fb.hidden = false;

    syncPublishGate();
}

// ===========================================
// ACTIONS
// ===========================================

function selectFinding(id) {
    selected = (selected === id) ? null : id;
    if (selected) {
        reviewed.add(selected);
        renderGraphForFinding(FINDINGS.find(f => f.id === selected));
    } else {
        renderGraphBase();
    }
    renderFindings();
    syncPublishGate();
}

function toggleSort() {
    sorted = document.getElementById('sort-toggle').checked;
    renderFindings();
}

function reset() {
    selected = null;
    answered = false;
    reviewed.clear();
    sorted = false;
    document.getElementById('sort-toggle').checked = false;
    document.getElementById('justification').value = '';
    document.getElementById('publish-row').className = 'publish-row';
    document.getElementById('pub-feedback').hidden = true;
    renderGraphBase();
    renderFindings();
    syncPublishGate();
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    buildNetwork();
    renderFindings();
    syncPublishGate();

    document.getElementById('sort-toggle').addEventListener('change', toggleSort);
    document.getElementById('btn-yes').addEventListener('click', () => answerPublish('yes'));
    document.getElementById('btn-no').addEventListener('click', () => answerPublish('no'));
    document.getElementById('btn-reset').addEventListener('click', reset);
    window.addEventListener('resize', () => network.fit({ animation: false }));
});
