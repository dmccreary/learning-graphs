// Dependency Role Explorer
// CANVAS_HEIGHT: 500
// Educational vis-network visualization for Chapter 3: Concept Dependencies.
// Learners click edges in a 4-node chain to see how one node is simultaneously
// a "dependent concept" (relative to the edge below it) and a "prerequisite
// concept" (relative to the edge above it). Bloom L2: identify / classify.

// ---------------------------------------------------------------------------
// ENVIRONMENT DETECTION (enable pan/zoom only outside an iframe)
// ---------------------------------------------------------------------------
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ---------------------------------------------------------------------------
// DATA
// Arrow points FROM a dependent concept TO the prerequisite it needs.
// Out-degree of a node = how many prerequisites it has.
// In-degree of a node  = how many dependents rely on it.
// ---------------------------------------------------------------------------
const nodeLabels = {
    1: 'Calculus',
    2: 'Algebra',
    3: 'Arithmetic',
    4: 'Number Sense'
};

const edgeList = [
    { id: 'e1', from: 1, to: 2 }, // Calculus depends on Algebra
    { id: 'e2', from: 2, to: 3 }, // Algebra depends on Arithmetic
    { id: 'e3', from: 3, to: 4 }  // Arithmetic depends on Number Sense
];

// Colors
const COLOR_NODE = { background: '#a9d0f5', border: '#1b3b5f' };
const COLOR_GOLD = { background: '#ffd54f', border: '#b8860b' };
const COLOR_SEL_DEPENDENT = { background: '#f5b7b1', border: '#c0392b' };   // red-ish
const COLOR_SEL_PREREQUISITE = { background: '#abebc6', border: '#1e7e34' }; // green-ish
const EDGE_COLOR = '#333333';
const EDGE_HIGHLIGHT = '#e67e22';

// ---------------------------------------------------------------------------
// DEGREE COMPUTATION (client-side from the edge list on load)
// ---------------------------------------------------------------------------
const outDegree = {}; // number of prerequisites
const inDegree = {};  // number of dependents
Object.keys(nodeLabels).forEach(function (id) {
    outDegree[id] = 0;
    inDegree[id] = 0;
});
edgeList.forEach(function (e) {
    outDegree[e.from] += 1;
    inDegree[e.to] += 1;
});

function isFoundational(id) {
    return outDegree[id] === 0;
}

// ---------------------------------------------------------------------------
// STATE
// ---------------------------------------------------------------------------
let nodes, edges, network;
let highlightFoundational = false;
let selectedEdgeId = null;

// Build a node's tooltip title describing its roles.
function nodeTooltip(id) {
    const preq = outDegree[id];
    const dep = inDegree[id];
    let t = nodeLabels[id] + '\n';
    t += 'Prerequisites it needs: ' + preq + '\n';
    t += 'Dependents that rely on it: ' + dep;
    if (isFoundational(id)) {
        t += '\n(Foundational: no prerequisites)';
    }
    return t;
}

// Resolve a node's current color based on selection + highlight state.
function colorForNode(id) {
    if (selectedEdgeId) {
        const e = edgeList.find(function (x) { return x.id === selectedEdgeId; });
        if (e && e.from === id) return COLOR_SEL_DEPENDENT;
        if (e && e.to === id) return COLOR_SEL_PREREQUISITE;
    }
    if (highlightFoundational && isFoundational(id)) {
        return COLOR_GOLD;
    }
    return COLOR_NODE;
}

// A node's display label: foundational nodes always carry an anchor badge.
function labelForNode(id) {
    if (isFoundational(id)) {
        // Anchor glyph marks the permanent foundational concept.
        return nodeLabels[id] + '\n⚓ Foundational';
    }
    return nodeLabels[id];
}

// ---------------------------------------------------------------------------
// INITIALIZE
// ---------------------------------------------------------------------------
function buildNodes() {
    return Object.keys(nodeLabels).map(function (idStr) {
        const id = parseInt(idStr, 10);
        return {
            id: id,
            label: labelForNode(id),
            title: nodeTooltip(id),
            color: colorForNode(id),
            font: { color: '#111111', size: 15, multi: false },
            shape: 'circle',
            borderWidth: isFoundational(id) ? 4 : 2
        };
    });
}

function buildEdges() {
    return edgeList.map(function (e) {
        const isSel = e.id === selectedEdgeId;
        return {
            id: e.id,
            from: e.from,
            to: e.to,
            color: { color: isSel ? EDGE_HIGHLIGHT : EDGE_COLOR, highlight: EDGE_HIGHLIGHT },
            width: isSel ? 5 : 2
        };
    });
}

function initializeNetwork() {
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());

    const enableMouse = !isInIframe();

    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU',          // Down-to-Up: roots at bottom, so
                                          // Number Sense (a sink) sits at the bottom
                sortMethod: 'directed',
                levelSeparation: 110,
                nodeSpacing: 140
            }
        },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            tooltipDelay: 120,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'circle',
            margin: 10,
            widthConstraint: { minimum: 70, maximum: 110 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.1 } },
            smooth: { enabled: true, type: 'cubicBezier', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Fit once after the hierarchical layout is computed.
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
        // Nudge camera right so the graph clears the right panel.
        const pos = network.getViewPosition();
        network.moveTo({ position: { x: pos.x + 90, y: pos.y }, animation: false });
    });

    network.on('click', onClick);
}

// ---------------------------------------------------------------------------
// INTERACTION
// ---------------------------------------------------------------------------
function refreshNodeColors() {
    nodes.update(Object.keys(nodeLabels).map(function (idStr) {
        const id = parseInt(idStr, 10);
        return {
            id: id,
            label: labelForNode(id),
            color: colorForNode(id),
            borderWidth: isFoundational(id) ? 4 : 2
        };
    }));
}

function refreshEdges() {
    edges.update(edgeList.map(function (e) {
        const isSel = e.id === selectedEdgeId;
        return {
            id: e.id,
            color: { color: isSel ? EDGE_HIGHLIGHT : EDGE_COLOR, highlight: EDGE_HIGHLIGHT },
            width: isSel ? 5 : 2
        };
    }));
}

function showEdgeRoles(edgeId) {
    const e = edgeList.find(function (x) { return x.id === edgeId; });
    if (!e) return;
    const dependent = nodeLabels[e.from];
    const prerequisite = nodeLabels[e.to];
    const info = document.getElementById('info-content');
    info.innerHTML =
        '<div class="role-line"><span class="role-label role-dependent">Dependent Concept:</span> ' +
        dependent + '</div>' +
        '<div class="role-line"><span class="role-label role-prerequisite">Prerequisite Concept:</span> ' +
        prerequisite + '</div>' +
        '<div class="role-line" style="margin-top:8px;color:#555;">' +
        dependent + ' cannot be learned until ' + prerequisite + ' is understood.</div>';
}

function clearEdgeRoles() {
    const info = document.getElementById('info-content');
    info.innerHTML =
        '<span class="info-placeholder">Click any edge (arrow) to see how one ' +
        'concept can be a <em>dependent</em> of the concept below it and a ' +
        '<em>prerequisite</em> for the concept above it.</span>';
}

function onClick(params) {
    if (params.edges && params.edges.length > 0 && (!params.nodes || params.nodes.length === 0)) {
        selectedEdgeId = params.edges[0];
        refreshEdges();
        refreshNodeColors();
        showEdgeRoles(selectedEdgeId);
    } else if (params.nodes && params.nodes.length > 0) {
        // Clicking a node clears the edge selection but keeps highlight state.
        selectedEdgeId = null;
        refreshEdges();
        refreshNodeColors();
        clearEdgeRoles();
    }
}

function toggleHighlight() {
    highlightFoundational = !highlightFoundational;
    const btn = document.getElementById('highlight-btn');
    btn.classList.toggle('active', highlightFoundational);
    btn.textContent = highlightFoundational
        ? 'Un-highlight Foundational Concepts'
        : 'Highlight Foundational Concepts';
    refreshNodeColors();
}

function clearSelection() {
    selectedEdgeId = null;
    network.unselectAll();
    refreshEdges();
    refreshNodeColors();
    clearEdgeRoles();
}

// ---------------------------------------------------------------------------
// BOOT
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    document.getElementById('highlight-btn').addEventListener('click', toggleHighlight);
    document.getElementById('reset-btn').addEventListener('click', clearSelection);
    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
