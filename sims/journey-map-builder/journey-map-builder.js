// Journey Map Builder
// CANVAS_HEIGHT: 700
// Graph view (500px) + step-sequence strip (~160px) + title/controls.
// Learners pick a goal concept; the tool derives ONE valid linear journey
// (topological sort over the goal's ancestors) and shows that many other
// orderings would also be valid. Bloom Apply (L3): construct + explain.

// ---------------------------------------------------------------------------
// Environment detection (enable mouse pan/zoom only outside an iframe).
// ---------------------------------------------------------------------------
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ---------------------------------------------------------------------------
// Base dataset: 8-node dependency subgraph (Chapter 1 foundations).
// A dependency edge from -> to means "from is a prerequisite of to".
// Nodes are positioned in dependency layers so the DAG reads left-to-right.
// ---------------------------------------------------------------------------
const conceptData = [
    { id: 'node',   label: 'Node',                x: -560, y:  -40,
      def: 'A node is a single vertex in a graph that represents one concept or entity.' },
    { id: 'edge',   label: 'Edge',                x: -560, y:  120,
      def: 'An edge is a connection between two nodes that represents a relationship.' },
    { id: 'grep',   label: 'Graph\nRepresentation', x: -340, y:   40,
      def: 'A graph representation is a set of nodes joined by edges used to model relationships.' },
    { id: 'dgraph', label: 'Directed\nGraph',      x: -120, y:   40,
      def: 'A directed graph is a graph whose edges have a direction, pointing from one node to another.' },
    { id: 'dep',    label: 'Dependency\nGraph',    x:  100, y:  -60,
      def: 'A dependency graph is a directed graph whose edges show which items must come before others.' },
    { id: 'dag',    label: 'Directed Acyclic\nGraph (DAG)', x:  100, y: 140,
      def: 'A directed acyclic graph is a directed graph that contains no cycles, so no node depends on itself.' },
    { id: 'lgraph', label: 'Learning\nGraph',      x:  340, y:   40,
      def: 'A learning graph is a dependency DAG whose nodes are concepts a learner must master in order.' },
    { id: 'jmap',   label: 'Journey\nMap',         x:  560, y:   40,
      def: 'A journey map is one valid sequential path through a learning graph from basics to a goal concept.' }
];

// Dependency edges (from = prerequisite, to = dependent concept).
const dependencyEdges = [
    { from: 'node',   to: 'edge'   },
    { from: 'node',   to: 'grep'   },
    { from: 'edge',   to: 'grep'   },
    { from: 'grep',   to: 'dgraph' },
    { from: 'dgraph', to: 'dep'    },
    { from: 'dgraph', to: 'dag'    },
    { from: 'dep',    to: 'lgraph' },
    { from: 'dag',    to: 'lgraph' },
    { from: 'lgraph', to: 'jmap'   }
];

// Fast lookup: concept id -> concept object.
const conceptById = {};
conceptData.forEach(c => { conceptById[c.id] = c; });

// Single-line display label (for dropdown + step pills).
function plainLabel(id) {
    return conceptById[id].label.replace(/\n/g, ' ');
}

// ---------------------------------------------------------------------------
// Graph algorithms
// ---------------------------------------------------------------------------

// All ancestors of goal (concepts that must be learned before it), INCLUDING
// the goal itself. Walk dependency edges backwards from the goal.
function ancestorsOf(goalId) {
    const inSet = new Set([goalId]);
    let changed = true;
    while (changed) {
        changed = false;
        dependencyEdges.forEach(e => {
            if (inSet.has(e.to) && !inSet.has(e.from)) {
                inSet.add(e.from);
                changed = true;
            }
        });
    }
    return inSet;
}

// Kahn's algorithm on the subgraph induced by nodeSet. Produces ONE valid
// topological order. Ties are broken alphabetically for a deterministic path.
function topoSort(nodeSet) {
    const indeg = {};
    const adj = {};
    nodeSet.forEach(id => { indeg[id] = 0; adj[id] = []; });
    dependencyEdges.forEach(e => {
        if (nodeSet.has(e.from) && nodeSet.has(e.to)) {
            adj[e.from].push(e.to);
            indeg[e.to] += 1;
        }
    });

    // Ready queue = nodes with no unmet prerequisites, kept sorted by label.
    let ready = [];
    nodeSet.forEach(id => { if (indeg[id] === 0) ready.push(id); });
    ready.sort((a, b) => plainLabel(a).localeCompare(plainLabel(b)));

    const order = [];
    while (ready.length > 0) {
        const id = ready.shift();
        order.push(id);
        adj[id].forEach(next => {
            indeg[next] -= 1;
            if (indeg[next] === 0) {
                ready.push(next);
                ready.sort((a, b) => plainLabel(a).localeCompare(plainLabel(b)));
            }
        });
    }
    return order;
}

// Count the number of distinct topological orderings (linear extensions) of
// the induced subgraph. The node counts here are tiny (<= 8), so a recursive
// enumeration over the "ready set" is fast and exact.
function countLinearExtensions(nodeSet) {
    const indeg = {};
    const adj = {};
    nodeSet.forEach(id => { indeg[id] = 0; adj[id] = []; });
    dependencyEdges.forEach(e => {
        if (nodeSet.has(e.from) && nodeSet.has(e.to)) {
            adj[e.from].push(e.to);
            indeg[e.to] += 1;
        }
    });

    const remaining = new Set(nodeSet);

    function recurse() {
        if (remaining.size === 0) return 1;
        // Every currently-ready node is a legal next choice.
        const readyNow = [];
        remaining.forEach(id => { if (indeg[id] === 0) readyNow.push(id); });
        let total = 0;
        readyNow.forEach(id => {
            remaining.delete(id);
            adj[id].forEach(n => { indeg[n] -= 1; });
            total += recurse();
            adj[id].forEach(n => { indeg[n] += 1; });
            remaining.add(id);
        });
        return total;
    }
    return recurse();
}

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const COLOR = {
    defaultBg: '#a9cce3',
    defaultBorder: '#2e6da4',
    pathBg: '#ffd54f',
    pathBorder: '#f57f17',
    dimBg: '#e3ecf3',
    dimBorder: '#b8cbdd',
    edgeDefault: '#7f9db9',
    edgePath: '#f57f17',
    edgeDim: '#dbe5ee'
};

// ---------------------------------------------------------------------------
// State + vis-network objects
// ---------------------------------------------------------------------------
let nodes, edges, network;
let currentJourney = [];   // array of concept ids in journey order
let selectedStepId = null;

function buildNodeStyle(id, onPath, dimmed) {
    let bg = COLOR.defaultBg, border = COLOR.defaultBorder, fontColor = '#0b2545';
    if (onPath) { bg = COLOR.pathBg; border = COLOR.pathBorder; fontColor = '#3a2a00'; }
    else if (dimmed) { bg = COLOR.dimBg; border = COLOR.dimBorder; fontColor = '#8aa0b5'; }
    return {
        color: { background: bg, border: border,
                 highlight: { background: bg, border: border } },
        font: { color: fontColor, size: 14, face: 'Arial', multi: false },
        borderWidth: onPath ? 3 : 2
    };
}

function initNetwork() {
    const nodeArr = conceptData.map(c => Object.assign({
        id: c.id,
        label: c.label,
        x: c.x,
        y: c.y,
        shape: 'circle',
        widthConstraint: { minimum: 78, maximum: 110 }
    }, buildNodeStyle(c.id, false, false)));

    const edgeArr = dependencyEdges.map((e, i) => ({
        id: 'e' + i,
        from: e.from,
        to: e.to,
        color: { color: COLOR.edgeDefault, highlight: COLOR.edgePath },
        width: 2
    }));

    nodes = new vis.DataSet(nodeArr);
    edges = new vis.DataSet(edgeArr);

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: false
        },
        nodes: {
            shape: 'circle',
            margin: 8,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.0 } },
            smooth: { type: 'curvedCW', roundness: 0.15 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Fit the graph within the visible canvas once drawn.
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    // Clicking a graph node opens its definition in the infobox.
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            showConceptInfo(params.nodes[0]);
        }
    });
}

// ---------------------------------------------------------------------------
// Dropdown
// ---------------------------------------------------------------------------
function populateDropdown() {
    const sel = document.getElementById('goal-select');
    sel.innerHTML = '';
    conceptData.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = plainLabel(c.id);
        sel.appendChild(opt);
    });
    sel.value = 'jmap'; // default to "Journey Map"
}

// ---------------------------------------------------------------------------
// Build the journey
// ---------------------------------------------------------------------------
function buildJourney() {
    const goalId = document.getElementById('goal-select').value;
    const ancestorSet = ancestorsOf(goalId);
    const order = topoSort(ancestorSet);
    currentJourney = order;
    selectedStepId = null;

    highlightGraphPath(ancestorSet);
    renderSteps(order, goalId);

    const totalOrders = countLinearExtensions(ancestorSet);
    const others = totalOrders - 1;
    const goalName = plainLabel(goalId);

    let otherText;
    if (others === 0) {
        otherText = 'This is the <strong>only</strong> valid order for this goal — every step depends on the one before it.';
    } else if (others === 1) {
        otherText = 'This is one valid order. <strong>1</strong> other ordering would also satisfy every dependency — a journey map picks one path through the possibility space the learning graph describes.';
    } else {
        otherText = 'This is one valid order. <strong>' + others + '</strong> other orderings would also satisfy every dependency — a journey map picks one path through the possibility space the learning graph describes.';
    }

    setInfobox('Journey to ' + goalName,
        'Your journey has <strong>' + order.length + '</strong> step' +
        (order.length === 1 ? '' : 's') + '. ' + otherText +
        '<br><br><em>Click any step below to read its definition.</em>');
}

// Highlight ancestor path in gold; dim everything else.
function highlightGraphPath(pathSet) {
    conceptData.forEach(c => {
        const onPath = pathSet.has(c.id);
        nodes.update(Object.assign({ id: c.id }, buildNodeStyle(c.id, onPath, !onPath)));
    });
    dependencyEdges.forEach((e, i) => {
        const onPath = pathSet.has(e.from) && pathSet.has(e.to);
        edges.update({
            id: 'e' + i,
            color: { color: onPath ? COLOR.edgePath : COLOR.edgeDim },
            width: onPath ? 3 : 1
        });
    });
}

// ---------------------------------------------------------------------------
// Step-sequence strip
// ---------------------------------------------------------------------------
function renderSteps(order, goalId) {
    const strip = document.getElementById('journey-steps');
    const hint = document.getElementById('journey-hint');
    strip.innerHTML = '';
    hint.style.display = 'none';
    strip.classList.add('visible');

    order.forEach((id, idx) => {
        if (idx > 0) {
            const arrow = document.createElement('div');
            arrow.className = 'journey-arrow';
            arrow.textContent = '→';
            strip.appendChild(arrow);
        }
        const step = document.createElement('div');
        step.className = 'journey-step' + (id === goalId ? ' goal' : '');
        step.dataset.conceptId = id;

        const num = document.createElement('div');
        num.className = 'step-num';
        num.textContent = (id === goalId) ? 'Goal' : ('Step ' + (idx + 1));

        const name = document.createElement('div');
        name.className = 'step-name';
        name.textContent = plainLabel(id);

        step.appendChild(num);
        step.appendChild(name);
        step.addEventListener('click', function () { showConceptInfo(id); });
        strip.appendChild(step);
    });
}

// ---------------------------------------------------------------------------
// Infobox helpers
// ---------------------------------------------------------------------------
function setInfobox(title, html) {
    document.getElementById('infobox-title').innerHTML = title;
    document.getElementById('infobox-content').innerHTML = html;
}

function showConceptInfo(id) {
    const c = conceptById[id];
    if (!c) return;
    selectedStepId = id;
    // Mark the selected pill.
    document.querySelectorAll('.journey-step').forEach(el => {
        el.classList.toggle('selected', el.dataset.conceptId === id);
    });
    const stepIndex = currentJourney.indexOf(id);
    let position = '';
    if (stepIndex >= 0) {
        position = (id === document.getElementById('goal-select').value)
            ? 'Final goal of this journey. '
            : 'Step ' + (stepIndex + 1) + ' of this journey. ';
    }
    setInfobox(plainLabel(id), position + c.def);
}

// ---------------------------------------------------------------------------
// Reset
// ---------------------------------------------------------------------------
function reset() {
    currentJourney = [];
    selectedStepId = null;
    conceptData.forEach(c => {
        nodes.update(Object.assign({ id: c.id }, buildNodeStyle(c.id, false, false)));
    });
    dependencyEdges.forEach((e, i) => {
        edges.update({ id: 'e' + i, color: { color: COLOR.edgeDefault }, width: 2 });
    });
    const strip = document.getElementById('journey-steps');
    strip.innerHTML = '';
    strip.classList.remove('visible');
    document.getElementById('journey-hint').style.display = 'block';
    setInfobox('Getting Started',
        'Pick a goal concept, then press <strong>Build My Journey</strong>. ' +
        'The tool finds every concept you must learn first and puts them in a valid study order.');
    if (network) network.fit({ animation: false });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initNetwork();
    populateDropdown();
    document.getElementById('build-btn').addEventListener('click', buildJourney);
    document.getElementById('reset-btn').addEventListener('click', reset);
});
