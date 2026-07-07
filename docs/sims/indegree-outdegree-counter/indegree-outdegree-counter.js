// Indegree and Out-Degree Counter
// Educational vis-network MicroSim for Chapter 5:
// Learning Graph Quality, Validation, and File Formats.
//
// CANVAS_HEIGHT: 520
//
// Edge semantics: arrows point from the DEPENDENT node to its PREREQUISITE,
// so an edge { from: A, to: B } means "A depends on B".
//   - Indegree(X)  = # of edges whose `to`   === X  (how many depend on X)
//   - Out-degree(X)= # of edges whose `from` === X  (how many X depends on)

// ============================================================
// COLOR PALETTE
// ============================================================
const COLORS = {
    nodeNeutral:  { background: '#d0d3d8', border: '#8a9099', font: '#2b2f36' },
    nodeSelected: { background: '#2196f3', border: '#1565c0', font: '#ffffff' },
    edgeNeutral:  '#b4bac2',
    edgeIn:       '#2e9e4f',  // incoming = indegree = green
    edgeOut:      '#f28c1e'   // outgoing = out-degree = orange
};

// ============================================================
// SAMPLE 12-NODE DEPENDENCY GRAPH (from this book's concept list)
// Positioned left (prerequisites) -> right (goals).
// ============================================================
const nodeData = [
    // Foundational prerequisite: indegree 5, out-degree 0
    { id: 1,  label: 'Concept',                x: -520, y:    0 },

    // Second layer (each depends on Concept -> out-degree toward node 1)
    { id: 2,  label: 'Directed\nEdge',         x: -300, y: -180 },
    { id: 3,  label: 'Prerequisite',           x: -300, y:  -60 },
    { id: 4,  label: 'Dependency\nGraph',      x: -300, y:   60 },
    { id: 5,  label: 'Node\nDegree',           x: -300, y:  180 },

    // Third layer
    { id: 6,  label: 'Learning\nGraph',        x:  -80, y: -120 },
    { id: 7,  label: 'Topological\nSort',      x:  -80, y:    0 },
    { id: 8,  label: 'Graph\nValidation',      x:  -80, y:  140 },

    // Fourth layer
    { id: 9,  label: 'Cycle\nDetection',       x:  150, y:  -60 },
    { id: 10, label: 'Concept\nSequencing',    x:  150, y:   90 },
    { id: 11, label: 'Learning\nPath',         x:  360, y:   20 },

    // Goal node: indegree 0, out-degree 4
    { id: 12, label: 'Adaptive\nLearning Path',x:  580, y:  -70 }
];

// Directed edges: { from: dependent, to: prerequisite }
const edgeData = [
    // --- Node 1 "Concept" receives 5 incoming edges => indegree 5 ---
    { from: 2, to: 1 },   // Directed Edge depends on Concept
    { from: 3, to: 1 },   // Prerequisite depends on Concept
    { from: 4, to: 1 },   // Dependency Graph depends on Concept
    { from: 5, to: 1 },   // Node Degree depends on Concept
    { from: 6, to: 1 },   // Learning Graph depends on Concept

    // --- middle structure ---
    { from: 4, to: 2 },   // Dependency Graph depends on Directed Edge
    { from: 4, to: 3 },   // Dependency Graph depends on Prerequisite
    { from: 5, to: 2 },   // Node Degree depends on Directed Edge
    { from: 6, to: 4 },   // Learning Graph depends on Dependency Graph
    { from: 7, to: 4 },   // Topological Sort depends on Dependency Graph
    { from: 8, to: 4 },   // Graph Validation depends on Dependency Graph
    { from: 8, to: 5 },   // Graph Validation depends on Node Degree
    { from: 9, to: 7 },   // Cycle Detection depends on Topological Sort
    { from: 9, to: 8 },   // Cycle Detection depends on Graph Validation
    { from: 10, to: 6 },  // Concept Sequencing depends on Learning Graph
    { from: 10, to: 7 },  // Concept Sequencing depends on Topological Sort
    { from: 11, to: 9 },  // Learning Path depends on Cycle Detection
    { from: 11, to: 10 }, // Learning Path depends on Concept Sequencing

    // --- Node 12 "Adaptive Learning Path" has 4 outgoing edges => out-degree 4 ---
    { from: 12, to: 6 },  // Adaptive Learning Path depends on Learning Graph
    { from: 12, to: 8 },  // Adaptive Learning Path depends on Graph Validation
    { from: 12, to: 10 }, // Adaptive Learning Path depends on Concept Sequencing
    { from: 12, to: 11 }  // Adaptive Learning Path depends on Learning Path
];

// ============================================================
// STATE
// ============================================================
let nodes, edges, network;
let selectedNodeId = null;
let directionMode = 'both';        // 'incoming' | 'outgoing' | 'both'
let animTimers = [];               // pending setTimeout ids for count animation

// ============================================================
// ENVIRONMENT DETECTION
// ============================================================
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ============================================================
// INITIALIZE NETWORK
// ============================================================
function initializeNetwork() {
    const visNodes = nodeData.map(n => ({
        id: n.id,
        label: n.label,
        x: n.x,
        y: n.y,
        color: {
            background: COLORS.nodeNeutral.background,
            border: COLORS.nodeNeutral.border
        },
        font: { color: COLORS.nodeNeutral.font, size: 13, face: 'Arial', multi: false }
    }));

    const visEdges = edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        color: { color: COLORS.edgeNeutral, highlight: COLORS.edgeNeutral, inherit: false },
        width: 2
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: false,
            dragNodes: false,
            dragView: enableMouse,
            zoomView: enableMouse,
            navigationButtons: true,
            keyboard: {
                enabled: true,
                bindToWindow: false,
                speed: { x: 2, y: 2, zoom: 0.01 }
            }
        },
        nodes: {
            shape: 'box',
            margin: 10,
            widthConstraint: { minimum: 70, maximum: 90 },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            width: 2,
            smooth: { type: 'curvedCW', roundness: 0.12 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Fit the whole graph into view after the initial auto-center render.
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    // Selecting a node triggers the counting sequence.
    network.on('selectNode', function (params) {
        if (params.nodes.length > 0) {
            selectNode(params.nodes[0]);
        }
    });

    // Clicking empty space clears the selection.
    network.on('click', function (params) {
        if (params.nodes.length === 0) {
            clearSelection();
        }
    });
}

// ============================================================
// EDGE HELPERS
// ============================================================
function incomingEdges(nodeId) {
    // edges whose `to` === nodeId  => contribute to indegree
    return edgeData
        .map((e, i) => ({ ...e, id: i }))
        .filter(e => e.to === nodeId);
}

function outgoingEdges(nodeId) {
    // edges whose `from` === nodeId => contribute to out-degree
    return edgeData
        .map((e, i) => ({ ...e, id: i }))
        .filter(e => e.from === nodeId);
}

// ============================================================
// SELECT NODE + ANIMATED COUNT-UP
// ============================================================
function selectNode(nodeId) {
    clearTimers();
    selectedNodeId = nodeId;

    // Reset all edges to neutral and recolor nodes.
    resetEdgeColors();
    setNodeSelectedStyles(nodeId);

    const nodeLabel = nodeData.find(n => n.id === nodeId).label.replace(/\n/g, ' ');
    document.getElementById('count-node').textContent = nodeLabel;

    const inEdges = incomingEdges(nodeId);
    const outEdges = outgoingEdges(nodeId);
    const inTotal = inEdges.length;
    const outTotal = outEdges.length;

    // Reset the numeric readouts to 0 before animating up.
    setValue('indegree-value', 0);
    setValue('outdegree-value', 0);
    setValue('degree-value', 0);

    const showIn = directionMode === 'incoming' || directionMode === 'both';
    const showOut = directionMode === 'outgoing' || directionMode === 'both';

    const stepMs = 420;
    let t = 0;

    // Stage 2: highlight each incoming edge (green) and count up.
    if (showIn) {
        inEdges.forEach((e, idx) => {
            t += stepMs;
            schedule(() => {
                highlightEdge(e.id, COLORS.edgeIn);
                setValue('indegree-value', idx + 1, true);
                setValue('degree-value', currentDegree(), true);
            }, t);
        });
    } else {
        setValue('indegree-value', '—');
    }

    // Stage 3: highlight each outgoing edge (orange) and count up.
    if (showOut) {
        outEdges.forEach((e, idx) => {
            t += stepMs;
            schedule(() => {
                highlightEdge(e.id, COLORS.edgeOut);
                setValue('outdegree-value', idx + 1, true);
                setValue('degree-value', currentDegree(), true);
            }, t);
        });
    } else {
        setValue('outdegree-value', '—');
    }

    // Stage 4: final summary (guarantees exact totals even if a step is skipped).
    t += stepMs;
    schedule(() => {
        if (showIn) setValue('indegree-value', inTotal);
        if (showOut) setValue('outdegree-value', outTotal);
        setValue('degree-value', (showIn ? inTotal : 0) + (showOut ? outTotal : 0));
    }, t);
}

// Running degree = whatever numbers are currently shown in the two readouts.
function currentDegree() {
    const inV = parseInt(document.getElementById('indegree-value').textContent, 10);
    const outV = parseInt(document.getElementById('outdegree-value').textContent, 10);
    return (isNaN(inV) ? 0 : inV) + (isNaN(outV) ? 0 : outV);
}

// ============================================================
// STYLING HELPERS
// ============================================================
function setNodeSelectedStyles(nodeId) {
    const updates = nodeData.map(n => {
        const isSel = n.id === nodeId;
        const c = isSel ? COLORS.nodeSelected : COLORS.nodeNeutral;
        return {
            id: n.id,
            color: { background: c.background, border: c.border },
            font: { color: c.font, size: 13, face: 'Arial' },
            borderWidth: isSel ? 4 : 2
        };
    });
    nodes.update(updates);
}

function resetNodeStyles() {
    const updates = nodeData.map(n => ({
        id: n.id,
        color: { background: COLORS.nodeNeutral.background, border: COLORS.nodeNeutral.border },
        font: { color: COLORS.nodeNeutral.font, size: 13, face: 'Arial' },
        borderWidth: 2
    }));
    nodes.update(updates);
}

function resetEdgeColors() {
    const updates = edges.getIds().map(id => ({
        id: id,
        color: { color: COLORS.edgeNeutral, highlight: COLORS.edgeNeutral, inherit: false },
        width: 2
    }));
    edges.update(updates);
}

function highlightEdge(edgeId, color) {
    edges.update({
        id: edgeId,
        color: { color: color, highlight: color, inherit: false },
        width: 4
    });
}

// ============================================================
// NUMERIC READOUT HELPERS
// ============================================================
function setValue(elementId, value, bump) {
    const el = document.getElementById(elementId);
    el.textContent = value;
    if (bump) {
        el.classList.remove('bump');
        // force reflow so the animation restarts on repeat increments
        void el.offsetWidth;
        el.classList.add('bump');
    }
}

// ============================================================
// TIMER MANAGEMENT (so Clear / re-select cancels pending steps)
// ============================================================
function schedule(fn, delay) {
    const id = setTimeout(fn, delay);
    animTimers.push(id);
}

function clearTimers() {
    animTimers.forEach(id => clearTimeout(id));
    animTimers = [];
}

// ============================================================
// CLEAR SELECTION -> neutral state
// ============================================================
function clearSelection() {
    clearTimers();
    selectedNodeId = null;
    if (network) network.unselectAll();
    resetNodeStyles();
    resetEdgeColors();
    document.getElementById('count-node').textContent = 'No node selected';
    setValue('indegree-value', '—');
    setValue('outdegree-value', '—');
    setValue('degree-value', '—');
}

// ============================================================
// DIRECTION TOGGLE (In / Both / Out)
// ============================================================
function setDirectionMode(mode) {
    directionMode = mode;
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    // Re-run the counting sequence for the current node under the new filter.
    if (selectedNodeId !== null) {
        selectNode(selectedNodeId);
    }
}

// ============================================================
// BOOTSTRAP
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    document.getElementById('clear-btn').addEventListener('click', clearSelection);
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            setDirectionMode(btn.dataset.mode);
        });
    });

    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
