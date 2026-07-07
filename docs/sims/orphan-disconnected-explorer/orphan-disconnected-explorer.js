// Orphan & Disconnected Subgraph Explorer
// Educational vis-network visualization
// CANVAS_HEIGHT: 540
//
// Learners distinguish three structural conditions in a sample learning graph:
//   1. A healthy, connected main body (blue)
//   2. A single orphaned node with zero edges (red, thick stroke)
//   3. A disconnected subgraph: nodes connected only to each other (orange)
// Force-directed physics makes the isolated elements drift away from the
// main body on their own, because no edges pull them inward.

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
// COLOR PALETTE (per structural group)
// ===========================================
const GROUP_COLORS = {
    main:    { background: '#2196f3', border: '#1565c0', font: '#ffffff' },
    orphan:  { background: '#f44336', border: '#b71c1c', font: '#ffffff' },
    cluster: { background: '#ff9800', border: '#e65100', font: '#3e2723' }
};
const DIM_COLOR = { background: '#cfd8dc', border: '#b0bec5', font: '#90a4ae' };

// ===========================================
// SAMPLE DATASET (22 nodes)
// 17 main-body nodes (ids 1-17), 1 orphan (id 18),
// 4-node disconnected cluster (ids 19-22)
// ===========================================
const nodeData = [
    // --- Main connected body (17 nodes) ---
    { id: 1,  label: 'Number Sense',   group: 'main' },
    { id: 2,  label: 'Counting',       group: 'main' },
    { id: 3,  label: 'Addition',       group: 'main' },
    { id: 4,  label: 'Subtraction',    group: 'main' },
    { id: 5,  label: 'Multiplication', group: 'main' },
    { id: 6,  label: 'Division',       group: 'main' },
    { id: 7,  label: 'Fractions',      group: 'main' },
    { id: 8,  label: 'Decimals',       group: 'main' },
    { id: 9,  label: 'Ratios',         group: 'main' },
    { id: 10, label: 'Percentages',    group: 'main' },
    { id: 11, label: 'Integers',       group: 'main' },
    { id: 12, label: 'Variables',      group: 'main' },
    { id: 13, label: 'Expressions',    group: 'main' },
    { id: 14, label: 'Equations',      group: 'main' },
    { id: 15, label: 'Inequalities',   group: 'main' },
    { id: 16, label: 'Graphing',       group: 'main' },
    { id: 17, label: 'Functions',      group: 'main' },
    // --- Orphaned node (zero edges) ---
    { id: 18, label: 'Set Theory',     group: 'orphan' },
    // --- Disconnected subgraph (connected only among themselves) ---
    { id: 19, label: 'Vector',         group: 'cluster' },
    { id: 20, label: 'Matrix',         group: 'cluster' },
    { id: 21, label: 'Determinant',    group: 'cluster' },
    { id: 22, label: 'Eigenvalue',     group: 'cluster' }
];

// Directed edges: arrow points from dependent -> prerequisite
const edgeData = [
    // Main body dependencies (spanning tree + extra links = fully connected)
    { from: 2,  to: 1 },
    { from: 3,  to: 2 },
    { from: 4,  to: 3 },
    { from: 5,  to: 3 },
    { from: 6,  to: 5 },
    { from: 7,  to: 6 },
    { from: 8,  to: 7 },
    { from: 9,  to: 7 },
    { from: 10, to: 9 },
    { from: 11, to: 4 },
    { from: 12, to: 11 },
    { from: 13, to: 12 },
    { from: 14, to: 13 },
    { from: 15, to: 14 },
    { from: 16, to: 14 },
    { from: 17, to: 16 },
    { from: 17, to: 13 },
    // Disconnected cluster: edges ONLY among ids 19-22
    { from: 20, to: 19 },
    { from: 21, to: 20 },
    { from: 22, to: 20 },
    { from: 22, to: 21 }
    // Note: node 18 (orphan) intentionally has NO edges.
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let edgeCounts = {};       // id -> number of incident edges (in + out)
let flashTimer = null;

// Pre-compute the incident-edge count for every node
function computeEdgeCounts() {
    edgeCounts = {};
    nodeData.forEach(n => { edgeCounts[n.id] = 0; });
    edgeData.forEach(e => {
        edgeCounts[e.from] = (edgeCounts[e.from] || 0) + 1;
        edgeCounts[e.to]   = (edgeCounts[e.to]   || 0) + 1;
    });
}

function labelOf(id) {
    const n = nodeData.find(nd => nd.id === id);
    return n ? n.label : id;
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    computeEdgeCounts();

    const enableMouse = !isInIframe();

    const visNodes = nodeData.map(node => {
        const c = GROUP_COLORS[node.group];
        return {
            id: node.id,
            label: node.label,
            group: node.group,
            // Orphan gets a noticeably thicker stroke to draw attention
            borderWidth: node.group === 'orphan' ? 6 : 2,
            color: { background: c.background, border: c.border },
            font: { color: c.font, size: 14 }
        };
    });

    const visEdges = edgeData.map((edge, index) => ({
        id: 'e' + index,
        from: edge.from,
        to: edge.to,
        // Tooltip: dependent depends on prerequisite (from -> to)
        title: 'Dependency: ' + labelOf(edge.from) + ' depends on ' + labelOf(edge.to),
        color: { color: '#9e9e9e', highlight: '#616161' },
        width: 2
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const options = {
        layout: { improvedLayout: false },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -60,
                centralGravity: 0.008,
                springLength: 110,
                springConstant: 0.08,
                avoidOverlap: 0.6
            },
            stabilization: { enabled: true, iterations: 400, fit: true }
        },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            tooltipDelay: 120,
            zoomView: enableMouse,
            dragView: enableMouse,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'dot',
            size: 18,
            font: { size: 14, face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            width: 2,
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Once the force-directed layout settles, freeze it so clicks don't
    // trigger jerky re-simulation, and fit everything into view.
    network.once('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    network.on('selectNode', handleSelectNode);
    network.on('deselectNode', clearDiagnosis);
}

// ===========================================
// DIAGNOSIS PANEL
// ===========================================
function diagnosisFor(node) {
    const count = edgeCounts[node.id] || 0;
    if (node.group === 'orphan') {
        return {
            state: 'orphan',
            text: 'Orphaned node — zero edges. It has no prerequisites and ' +
                  'nothing depends on it, so it is unreachable from the main graph.'
        };
    }
    if (node.group === 'cluster') {
        return {
            state: 'cluster',
            text: 'Disconnected subgraph — connected internally but isolated ' +
                  'from the main graph. Its edges only link to other nodes in ' +
                  'this small cluster.'
        };
    }
    return {
        state: 'main',
        text: 'Part of the main graph. It is reachable through dependency ' +
              'edges from the rest of the connected body.'
    };
}

function handleSelectNode(params) {
    if (!params.nodes.length) return;
    const id = params.nodes[0];
    const node = nodeData.find(n => n.id === id);
    if (!node) return;

    const count = edgeCounts[id] || 0;
    const d = diagnosisFor(node);

    const panel = document.getElementById('info-panel');
    panel.className = 'info-panel state-' + d.state;

    document.getElementById('info-title').textContent = node.label;
    document.getElementById('info-content').innerHTML =
        'Edge count: <strong>' + count + '</strong>' +
        '<div class="diagnosis">' + d.text + '</div>';
}

function clearDiagnosis() {
    const panel = document.getElementById('info-panel');
    panel.className = 'info-panel';
    document.getElementById('info-title').textContent = 'Node Diagnosis';
    document.getElementById('info-content').innerHTML =
        '<p class="info-placeholder">Click any node to diagnose it.</p>';
}

// ===========================================
// HIGHLIGHT PROBLEMS (flash 3x, dim the healthy body)
// ===========================================
function setDimmed(dimmed) {
    const updates = nodeData.map(node => {
        if (node.group === 'main') {
            const c = dimmed ? DIM_COLOR : GROUP_COLORS.main;
            return {
                id: node.id,
                color: { background: c.background, border: c.border },
                font: { color: c.font }
            };
        }
        return { id: node.id }; // problems keep their color
    });
    nodes.update(updates);

    // Dim main-body edges too when highlighting
    const edgeUpdates = edgeData.map((e, i) => {
        const bothMain = isMain(e.from) && isMain(e.to);
        return {
            id: 'e' + i,
            color: { color: (dimmed && bothMain) ? '#e0e0e0' : '#9e9e9e' }
        };
    });
    edges.update(edgeUpdates);
}

function isMain(id) {
    const n = nodeData.find(nd => nd.id === id);
    return n && n.group === 'main';
}

function setProblemVisible(visible) {
    // Toggle the problem nodes between full color and near-invisible to "flash"
    const updates = nodeData
        .filter(n => n.group === 'orphan' || n.group === 'cluster')
        .map(node => {
            const c = GROUP_COLORS[node.group];
            if (visible) {
                return {
                    id: node.id,
                    color: { background: c.background, border: c.border },
                    borderWidth: node.group === 'orphan' ? 6 : 2
                };
            }
            return {
                id: node.id,
                color: { background: 'rgba(255,255,255,0.15)', border: '#e0e0e0' },
                borderWidth: node.group === 'orphan' ? 6 : 2
            };
        });
    nodes.update(updates);
}

function highlightProblems() {
    if (flashTimer) return; // ignore repeat clicks mid-animation
    const btn = document.getElementById('highlight-btn');
    btn.disabled = true;

    setDimmed(true);

    let flashes = 0;
    const totalFlashes = 3;
    let visible = true;

    flashTimer = setInterval(function () {
        visible = !visible;
        setProblemVisible(visible);
        if (visible) {
            flashes++;
            if (flashes >= totalFlashes) {
                clearInterval(flashTimer);
                flashTimer = null;
                setProblemVisible(true); // leave them fully lit
                btn.disabled = false;
            }
        }
    }, 320);
}

// ===========================================
// RESET
// ===========================================
function resetView() {
    if (flashTimer) {
        clearInterval(flashTimer);
        flashTimer = null;
    }
    document.getElementById('highlight-btn').disabled = false;
    setDimmed(false);
    setProblemVisible(true);
    clearDiagnosis();
    network.unselectAll();
    network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
}

// ===========================================
// BOOTSTRAP
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    document.getElementById('highlight-btn').addEventListener('click', highlightProblems);
    document.getElementById('reset-btn').addEventListener('click', resetView);
});
