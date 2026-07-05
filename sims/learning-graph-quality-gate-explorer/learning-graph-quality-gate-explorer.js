// Learning Graph Quality Gate Explorer
// vis-network MicroSim - Chapter 19: Using a Skill to Generate a Learning Graph
// Bloom Analyze (L4): examine, differentiate, detect three structural failure modes.
// CANVAS_HEIGHT: 540

// ===========================================
// ENVIRONMENT DETECTION
// ===========================================
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ===========================================
// NODE PALETTE
// ===========================================
const palette = {
    good:    { background: '#4c8bf5', border: '#1a56c4', font: '#ffffff' }, // healthy / foundational
    orphan:  { background: '#ffffff', border: '#d93025', font: '#b71c1c' }, // orphaned node
    cluster: { background: '#ff9800', border: '#b26a00', font: '#333333' }, // disconnected component
    fixed:   { background: '#34a853', border: '#1e7e34', font: '#ffffff' }  // repaired / connected in "after"
};

// ===========================================
// 14 NODES (shared between Before and After) with fixed positions.
// Roles: main chain is healthy; 8/9/10 form a cycle; 11/12 are a
// disconnected pair; 13 is the orphan.
// ===========================================
const nodePositions = {
    1:  { x: -420, y: -120, label: 'Intro to Graphs' },
    2:  { x: -280, y: -120, label: 'Graph Basics' },
    3:  { x: -280, y:   10, label: 'Nodes' },
    4:  { x: -280, y:  130, label: 'Edges' },
    5:  { x: -120, y:   10, label: 'Prerequisites' },
    6:  { x:   30, y:  -90, label: 'Taxonomy' },
    7:  { x:   30, y:  110, label: 'Sequencing' },
    14: { x:  190, y:   10, label: 'Chapter Review' },
    // Cycle trio
    8:  { x:  360, y: -110, label: 'Concept A' },
    9:  { x:  470, y:   10, label: 'Concept B' },
    10: { x:  360, y:  130, label: 'Concept C' },
    // Disconnected two-node cluster
    11: { x: -430, y:  170, label: 'Side Note X' },
    12: { x: -430, y:  290, label: 'Side Note Y' },
    // Orphan
    13: { x:  200, y: -180, label: 'Loose Concept' }
};

// Which role each node plays in the BEFORE state (drives color + click text)
const beforeRoles = {
    1: 'good', 2: 'good', 3: 'good', 4: 'good', 5: 'good', 6: 'good', 7: 'good', 14: 'good',
    8: 'cycle', 9: 'cycle', 10: 'cycle',
    11: 'cluster', 12: 'cluster',
    13: 'orphan'
};

// BEFORE edges: healthy chain + a closed 8->9->10->8 cycle + an
// internally-connected-but-detached 11->12 pair. Node 13 has zero edges.
const beforeEdges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 }, { from: 2, to: 4 },
    { from: 3, to: 5 }, { from: 4, to: 5 },
    { from: 5, to: 6 }, { from: 5, to: 7 },
    { from: 6, to: 14 }, { from: 7, to: 14 },
    { from: 14, to: 8 },
    // Cycle (red)
    { from: 8, to: 9, cycle: true },
    { from: 9, to: 10, cycle: true },
    { from: 10, to: 8, cycle: true },
    // Disconnected pair (internal edge only)
    { from: 11, to: 12 }
];

// AFTER edges: cycle broken by REVERSING 10->8 into 8->10; orphan 13
// gains an edge from foundational node 5; cluster 11 gains a bridge from 7.
const afterEdges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 }, { from: 2, to: 4 },
    { from: 3, to: 5 }, { from: 4, to: 5 },
    { from: 5, to: 6 }, { from: 5, to: 7 },
    { from: 6, to: 14 }, { from: 7, to: 14 },
    { from: 14, to: 8 },
    // Cycle repaired: the 10->8 edge is reversed to 8->10 (acyclic now)
    { from: 8, to: 9 },
    { from: 9, to: 10 },
    { from: 8, to: 10, repaired: true },   // reversed edge, highlighted gold
    // Orphan repaired: 5 -> 13
    { from: 5, to: 13, repaired: true },
    // Cluster repaired: 7 -> 11 bridge
    { from: 7, to: 11, repaired: true },
    { from: 11, to: 12 }
];

// Click explanations for BEFORE-state flagged nodes
const explanations = {
    orphan: {
        check: 'Orphan detection',
        text: '"Loose Concept" has zero edges &mdash; nothing points to it and it points to nothing.',
        consequence: 'A learner could never reach it in a sequenced path, so the chapter that teaches it would be unreachable.'
    },
    cluster: {
        check: 'Connectivity analysis',
        text: '"Side Note X" and "Side Note Y" connect only to each other, forming an island detached from the main graph.',
        consequence: 'This disconnected component can\'t be ordered relative to the rest, so its chapters have no safe place in the sequence.'
    },
    cycle: {
        check: 'Cycle detection',
        text: 'Concepts A, B, and C form a closed loop (A&rarr;B&rarr;C&rarr;A).',
        consequence: 'A cycle means each concept is its own prerequisite, so no valid topological (teaching) order exists.'
    }
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let currentState = 'before';
let goldTimer = null;

// ===========================================
// DEGREE HELPERS (for hover tooltip)
// ===========================================
function computeDegrees(edgeList) {
    const indeg = {}, outdeg = {};
    Object.keys(nodePositions).forEach(id => { indeg[id] = 0; outdeg[id] = 0; });
    edgeList.forEach(e => {
        outdeg[e.from] = (outdeg[e.from] || 0) + 1;
        indeg[e.to] = (indeg[e.to] || 0) + 1;
    });
    return { indeg, outdeg };
}

// ===========================================
// BUILD DATASETS
// ===========================================
function buildNodes(state) {
    const edgeList = state === 'before' ? beforeEdges : afterEdges;
    const { indeg, outdeg } = computeDegrees(edgeList);

    return Object.keys(nodePositions).map(idStr => {
        const id = parseInt(idStr, 10);
        const pos = nodePositions[id];

        let role;
        if (state === 'before') {
            role = beforeRoles[id];
        } else {
            // In the "after" state every node is healthy; the three formerly
            // broken groups are shown green to signal they were repaired.
            const was = beforeRoles[id];
            role = (was === 'orphan' || was === 'cluster' || was === 'cycle') ? 'fixed' : 'good';
        }
        const colorKey = role === 'cycle' ? 'good' : role; // cycle nodes keep good fill; red edges mark the loop
        const c = palette[colorKey];

        const node = {
            id: id,
            label: pos.label,
            x: pos.x,
            y: pos.y,
            fixed: { x: true, y: true },
            shape: 'circle',
            color: {
                background: c.background,
                border: c.border,
                highlight: { background: c.background, border: '#111' }
            },
            borderWidth: 3,
            font: { color: c.font, size: 12, face: 'Arial' },
            title: pos.label + '  (in: ' + indeg[id] + ', out: ' + outdeg[id] + ')'
        };

        // Orphan gets a dashed outline in the before state.
        if (state === 'before' && role === 'orphan') {
            node.shapeProperties = { borderDashes: [5, 4] };
            node.borderWidth = 3;
        }
        return node;
    });
}

function buildEdges(state) {
    const list = state === 'before' ? beforeEdges : afterEdges;
    return list.map((e, i) => {
        const isCycle = !!e.cycle;
        return {
            id: 'e' + i,
            from: e.from,
            to: e.to,
            _repaired: !!e.repaired,
            color: { color: isCycle ? '#d93025' : '#8a94a6', highlight: '#111' },
            width: isCycle ? 2.5 : 1.5,
            dashes: false
        };
    });
}

// ===========================================
// RENDER A STATE
// ===========================================
function renderState(state) {
    currentState = state;
    if (goldTimer) { clearTimeout(goldTimer); goldTimer = null; }

    nodes.clear();
    edges.clear();
    nodes.add(buildNodes(state));
    edges.add(buildEdges(state));

    // Reset infobox
    const title = document.getElementById('infobox-title');
    const body = document.getElementById('infobox-body');
    if (state === 'before') {
        title.textContent = 'Before Validation — three problems flagged';
        body.innerHTML = 'Click a red or orange node to see what\'s wrong.';
    } else {
        title.textContent = 'After Validation — one connected, acyclic graph';
        body.innerHTML = 'All three problems repaired. The <span style="color:#c79100;font-weight:bold;">gold</span> edges are the fixes: a reversed edge breaks the cycle, a bridge connects the island, and the orphan now has a prerequisite.';
        highlightRepairedEdges();
    }

    network.fit({ animation: false });
}

// Highlight the repaired edges gold for three seconds (Stage 3).
function highlightRepairedEdges() {
    const repaired = edges.get().filter(e => e._repaired);
    repaired.forEach(e => {
        edges.update({ id: e.id, color: { color: '#f4b400', highlight: '#f4b400' }, width: 4 });
    });
    goldTimer = setTimeout(() => {
        repaired.forEach(e => {
            edges.update({ id: e.id, color: { color: '#8a94a6', highlight: '#111' }, width: 1.5 });
        });
        goldTimer = null;
    }, 3000);
}

// ===========================================
// CLICK: explain a flagged node (before state only)
// ===========================================
function handleClick(params) {
    if (currentState !== 'before') return;
    if (!params.nodes || params.nodes.length === 0) return;

    const id = params.nodes[0];
    const role = beforeRoles[id];
    const title = document.getElementById('infobox-title');
    const body = document.getElementById('infobox-body');

    if (role === 'good') {
        title.textContent = 'This node is healthy';
        body.innerHTML = '"' + nodePositions[id].label + '" is part of the connected, acyclic core. Click a <strong style="color:#d93025;">red</strong> or <strong style="color:#b26a00;">orange</strong> node to inspect a problem.';
        return;
    }

    const info = explanations[role];
    title.innerHTML = 'Caught by: <span class="check-name">' + info.check + '</span>';
    body.innerHTML = info.text + '<span class="consequence"><strong>Why it blocks sequencing:</strong> ' + info.consequence + '</span>';
}

// ===========================================
// INIT
// ===========================================
function init() {
    nodes = new vis.DataSet();
    edges = new vis.DataSet();

    const container = document.getElementById('network');
    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false, hierarchical: { enabled: false } },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            hover: true,
            tooltipDelay: 120,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'circle',
            margin: 8,
            widthConstraint: { minimum: 60, maximum: 90 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { enabled: true, type: 'cubicBezier', roundness: 0.35 }
        }
    };

    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
    network.on('click', handleClick);

    // Toggle buttons
    document.getElementById('btn-before').addEventListener('click', () => setState('before'));
    document.getElementById('btn-after').addEventListener('click', () => setState('after'));

    renderState('before');

    window.addEventListener('resize', function () {
        network.fit({ animation: false });
    });
}

function setState(state) {
    document.getElementById('btn-before').classList.toggle('active', state === 'before');
    document.getElementById('btn-after').classList.toggle('active', state === 'after');
    renderState(state);
}

document.addEventListener('DOMContentLoaded', init);
