// DAG Cycle Detector
// Educational vis-network MicroSim
// Bloom level: Analyze (L4) - learners toggle a single edge to compare a
// valid DAG against a graph with a cycle and reason about why a cycle
// removes every valid starting point for sequencing concepts.
//
// CANVAS_HEIGHT: 600
//
// Single source of truth for iframe height: the index.md iframe and any
// height sync tooling should use 600 (network + title + right-panel stack).

// ===========================================
// ENVIRONMENT DETECTION
// ===========================================
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true; // cross-origin iframe => access denied
    }
}

// ===========================================
// COLOR CONSTANTS
// ===========================================
const VALID_NODE = {
    background: '#66bb6a',
    border: '#2e7d32',
    highlight: { background: '#81c784', border: '#2e7d32' }
};
const CYCLE_NODE = {
    background: '#ef5350',
    border: '#b71c1c',
    highlight: { background: '#e57373', border: '#b71c1c' }
};
const VALID_EDGE = '#333333';   // black arrows for the valid DAG
const CYCLE_EDGE = '#d32f2f';   // red for edges on the cycle
const DASHED_EDGE = '#9e9e9e';  // light gray for the transitive edge

// ===========================================
// GRAPH MODEL
// Arrows point from a concept TO the concept it depends on
// (a prerequisite edge). In a valid DAG you can follow arrows
// backward to a node with no outgoing edge = a starting point.
// ===========================================
const NODES = [
    { id: 'mult',  label: 'Multiplication' },
    { id: 'add',   label: 'Addition' },
    { id: 'count', label: 'Counting' }
];

// Base (valid DAG) edges. The Multiplication -> Counting edge is transitive,
// so it is drawn lightly dashed.
const BASE_EDGES = [
    { id: 'e_mult_add',   from: 'mult',  to: 'add',   transitive: false },
    { id: 'e_add_count',  from: 'add',   to: 'count', transitive: false },
    { id: 'e_mult_count', from: 'mult',  to: 'count', transitive: true  }
];

// The single edge that turns the DAG into a cycle:
// Counting -> Multiplication closes the loop mult -> add -> count -> mult.
const CYCLE_EDGE_DEF = { id: 'e_count_mult', from: 'count', to: 'mult', transitive: false };

// Exact infobox copy from the specification (Stage 1/3/4).
const TEXT_VALID_DAG =
    'This is a valid DAG. Follow the arrows backward to find where a learner ' +
    'can start: Counting has no prerequisites.';
const TEXT_CYCLE =
    'This graph is no longer a DAG. Counting depends on Multiplication, which ' +
    'depends on Addition, which depends on Counting — there is no concept ' +
    'left to start with.';
const TEXT_REMOVED =
    'Cycle removed. Every learner now has a valid starting point: Counting.';

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let cyclePresent = false;

// ===========================================
// DFS CYCLE DETECTION
// Builds an adjacency list from the current edge set and runs a
// depth-first search. Returns the set of node ids that lie on a cycle
// (nodes revisited while still on the recursion stack, plus the path
// back to them).
// ===========================================
function findCycleNodes(edgeList) {
    const adj = {};
    NODES.forEach(n => { adj[n.id] = []; });
    edgeList.forEach(e => { adj[e.from].push(e.to); });

    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = {};
    NODES.forEach(n => { color[n.id] = WHITE; });

    const stack = [];            // current DFS recursion path
    const cycleNodes = new Set();

    function visit(u) {
        color[u] = GRAY;
        stack.push(u);
        for (const v of adj[u]) {
            if (color[v] === GRAY) {
                // Found a back-edge to v: everything on the stack from v
                // onward is part of the cycle.
                const idx = stack.indexOf(v);
                for (let i = idx; i < stack.length; i++) {
                    cycleNodes.add(stack[i]);
                }
            } else if (color[v] === WHITE) {
                visit(v);
            }
        }
        stack.pop();
        color[u] = BLACK;
    }

    NODES.forEach(n => { if (color[n.id] === WHITE) visit(n.id); });
    return cycleNodes;
}

// An edge is "on the cycle" if both its endpoints are cycle nodes.
function edgeOnCycle(edge, cycleNodes) {
    return cycleNodes.has(edge.from) && cycleNodes.has(edge.to);
}

// ===========================================
// RENDERING
// ===========================================
function currentEdgeDefs() {
    return cyclePresent ? BASE_EDGES.concat([CYCLE_EDGE_DEF]) : BASE_EDGES.slice();
}

function styleEdge(edgeDef, cycleNodes) {
    const onCycle = edgeOnCycle(edgeDef, cycleNodes);
    const isTransitive = !!edgeDef.transitive;
    return {
        id: edgeDef.id,
        from: edgeDef.from,
        to: edgeDef.to,
        color: {
            color: onCycle ? CYCLE_EDGE : (isTransitive ? DASHED_EDGE : VALID_EDGE),
            highlight: onCycle ? CYCLE_EDGE : (isTransitive ? DASHED_EDGE : VALID_EDGE)
        },
        width: onCycle ? 4 : 2,
        dashes: isTransitive ? [6, 6] : false
    };
}

function styleNode(nodeDef, cycleNodes) {
    const inCycle = cycleNodes.has(nodeDef.id);
    const palette = inCycle ? CYCLE_NODE : VALID_NODE;
    return {
        id: nodeDef.id,
        label: nodeDef.label,
        color: {
            background: palette.background,
            border: palette.border,
            highlight: palette.highlight
        }
    };
}

// Recompute cycle membership and repaint all nodes/edges to match state.
function repaint() {
    const edgeDefs = currentEdgeDefs();
    const cycleNodes = cyclePresent ? findCycleNodes(edgeDefs) : new Set();

    nodes.update(NODES.map(n => styleNode(n, cycleNodes)));

    // Replace the edge DataSet contents so added/removed edges appear.
    edges.clear();
    edges.add(edgeDefs.map(e => styleEdge(e, cycleNodes)));

    updateInfobox();
}

// ===========================================
// INFOBOX / BADGE / BUTTON STATE
// ===========================================
function updateInfobox(overrideText) {
    const badge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const infoPanel = document.getElementById('info-panel');
    const addBtn = document.getElementById('add-btn');
    const removeBtn = document.getElementById('remove-btn');

    if (cyclePresent) {
        badge.textContent = 'Cycle Detected';
        badge.className = 'badge badge-cycle';
        infoPanel.className = 'info-panel cycle';
        statusText.textContent = overrideText || TEXT_CYCLE;
        addBtn.disabled = true;
        removeBtn.disabled = false;
    } else {
        badge.textContent = 'Valid DAG';
        badge.className = 'badge badge-valid';
        infoPanel.className = 'info-panel';
        statusText.textContent = overrideText || TEXT_VALID_DAG;
        addBtn.disabled = false;
        removeBtn.disabled = true;
    }
}

// ===========================================
// BUTTON HANDLERS (Stage 2/3 and Stage 4)
// ===========================================
function addCycleEdge() {
    if (cyclePresent) return;
    cyclePresent = true;
    repaint();                 // sets Stage 3 infobox text via updateInfobox()
    gentleSettle();
}

function removeCycleEdge() {
    if (!cyclePresent) return;
    cyclePresent = false;
    repaint();
    updateInfobox(TEXT_REMOVED); // Stage 4 confirmation message
    gentleSettle();
}

// Nudge physics on so the graph re-settles after an edge change, then fit.
function gentleSettle() {
    network.setOptions({ physics: { enabled: true } });
    network.stabilize();
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    nodes = new vis.DataSet(NODES.map(n => styleNode(n, new Set())));
    edges = new vis.DataSet(BASE_EDGES.map(e => styleEdge(e, new Set())));

    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true,
            solver: 'barnesHut',
            barnesHut: {
                gravitationalConstant: -3000,
                centralGravity: 0.35,   // mild gravity keeps the graph compact
                springLength: 140,
                springConstant: 0.04,
                damping: 0.5            // high damping => nodes settle gently
            },
            stabilization: { enabled: true, iterations: 300, fit: true },
            minVelocity: 0.75
        },
        interaction: {
            zoomView: enableMouse,
            dragView: enableMouse,
            navigationButtons: true,
            selectConnectedEdges: false,
            dragNodes: true
        },
        nodes: {
            shape: 'circle',
            margin: 12,
            widthConstraint: { minimum: 70 },
            font: { size: 15, face: 'Arial', color: '#0d2818' },
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.1 } },
            width: 2,
            smooth: { enabled: true, type: 'curvedCW', roundness: 0.18 },
            font: { size: 12, color: '#555', strokeWidth: 3, strokeColor: '#f0f8ff' }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Freeze physics once the layout settles so later edge toggles don't
    // send nodes flying, and center the graph in the viewport.
    network.on('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    updateInfobox();
}

// ===========================================
// BOOTSTRAP
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    document.getElementById('add-btn').addEventListener('click', addCycleEdge);
    document.getElementById('remove-btn').addEventListener('click', removeCycleEdge);
    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
