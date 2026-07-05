// Clustering and Abstraction Explorer
// Educational vis-network MicroSim - Chapter 4: Concept Taxonomies and Ontologies
// Bloom Level: Analyze (L4) - differentiate, organize
// CANVAS_HEIGHT: 560
//
// Learners run a simplified connected-components clustering pass over an
// 18-node "related-to" concept graph, see the detected groups colored, then
// trigger an abstraction step that proposes a taxonomy name for each group.

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
// CLUSTER PALETTE
// ===========================================
// Detected-group colors (assigned in detection order: A=blue, B=gold, C=purple).
const CLUSTER_COLORS = [
    { key: 'A', node: '#2f7ed8', border: '#1c4e8a', fill: 'rgba(47,126,216,0.12)', stroke: 'rgba(47,126,216,0.55)', title: '#1c4e8a' },
    { key: 'B', node: '#e6a817', border: '#9a6f0a', fill: 'rgba(230,168,23,0.14)', stroke: 'rgba(230,168,23,0.65)', title: '#8a6109' },
    { key: 'C', node: '#8e44ad', border: '#5b2c6f', fill: 'rgba(142,68,173,0.12)', stroke: 'rgba(142,68,173,0.55)', title: '#5b2c6f' }
];

const NEUTRAL = { background: '#c8c8c8', border: '#8a8a8a' };

// ===========================================
// BASE DATA - 18 nodes, three dense 6-node subgroups
// ===========================================
// truthGroup is only used to seed initial positions so physics separates the
// subgroups; the clustering step re-derives grouping purely from the edges.
const nodeData = [
    // Graph Theory cluster
    { id: 1,  label: 'Node',                         truthGroup: 0 },
    { id: 2,  label: 'Edge',                         truthGroup: 0 },
    { id: 3,  label: 'DAG',                          truthGroup: 0 },
    { id: 4,  label: 'Cycle Detection',              truthGroup: 0 },
    { id: 5,  label: 'Hop Count',                    truthGroup: 0 },
    { id: 6,  label: 'Traversal',                    truthGroup: 0 },
    // Visualization cluster
    { id: 7,  label: 'Force-Directed Layout',        truthGroup: 1 },
    { id: 8,  label: 'Hierarchical Layout',          truthGroup: 1 },
    { id: 9,  label: 'vis-network',                  truthGroup: 1 },
    { id: 10, label: 'Node Group',                   truthGroup: 1 },
    { id: 11, label: 'Taxonomy Legend',              truthGroup: 1 },
    { id: 12, label: 'Zoom/Pan',                     truthGroup: 1 },
    // Learning Science cluster
    { id: 13, label: 'Cognitive Load',               truthGroup: 2 },
    { id: 14, label: 'Mastery Learning',             truthGroup: 2 },
    { id: 15, label: 'Zone of Proximal Development', truthGroup: 2 },
    { id: 16, label: 'Scaffolding',                  truthGroup: 2 },
    { id: 17, label: 'Constructivism',               truthGroup: 2 },
    { id: 18, label: 'Backward Design',              truthGroup: 2 }
];

// Undirected "related to" edges. Dense within each subgroup; the three
// subgroups are disconnected from each other so connected-components finds
// exactly three groups.
const edgeData = [
    // Graph Theory (ids 1-6)
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 },
    { from: 3, to: 4 }, { from: 4, to: 6 }, { from: 5, to: 6 },
    { from: 1, to: 6 }, { from: 2, to: 5 },
    // Visualization (ids 7-12)
    { from: 7, to: 9 }, { from: 8, to: 9 }, { from: 9, to: 10 },
    { from: 9, to: 12 }, { from: 10, to: 11 }, { from: 11, to: 7 },
    { from: 8, to: 12 }, { from: 10, to: 12 },
    // Learning Science (ids 13-18)
    { from: 13, to: 16 }, { from: 14, to: 15 }, { from: 15, to: 16 },
    { from: 16, to: 17 }, { from: 17, to: 18 }, { from: 14, to: 18 },
    { from: 13, to: 15 }, { from: 15, to: 17 }
];

// Static abstraction lookup: each detected group's node-ID set -> category name.
// Keyed by a canonical (sorted) member-ID signature so the mapping is robust to
// the order connected-components discovers members.
const ABSTRACTION_LOOKUP = [
    { members: [1, 2, 3, 4, 5, 6],        name: 'Graph Theory' },
    { members: [7, 8, 9, 10, 11, 12],     name: 'Visualization Tools' },
    { members: [13, 14, 15, 16, 17, 18],  name: 'Learning Science' }
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let clusters = [];          // array of { colorIndex, members:Set, name:string|null }
let nodeToCluster = {};     // nodeId -> colorIndex
let phase = 'neutral';      // 'neutral' | 'clustered' | 'abstracted'

// ===========================================
// CLUSTERING: connected components over the adjacency list
// ===========================================
function computeConnectedComponents() {
    const adj = {};
    nodeData.forEach(n => { adj[n.id] = []; });
    edgeData.forEach(e => {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from);
    });

    const visited = new Set();
    const components = [];

    // Deterministic iteration order (ascending id) so group A/B/C are stable.
    nodeData.map(n => n.id).sort((a, b) => a - b).forEach(startId => {
        if (visited.has(startId)) return;
        const members = [];
        const stack = [startId];
        visited.add(startId);
        while (stack.length) {
            const cur = stack.pop();
            members.push(cur);
            adj[cur].forEach(nb => {
                if (!visited.has(nb)) {
                    visited.add(nb);
                    stack.push(nb);
                }
            });
        }
        members.sort((a, b) => a - b);
        components.push(members);
    });

    return components;
}

function lookupCategoryName(members) {
    const sig = [...members].sort((a, b) => a - b).join(',');
    const match = ABSTRACTION_LOOKUP.find(
        entry => entry.members.slice().sort((a, b) => a - b).join(',') === sig
    );
    return match ? match.name : 'Unnamed Group';
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function buildInitialNodes() {
    // Seed positions in three separated clouds so physics resolves quickly
    // into visually distinct groups.
    const clusterCenters = [
        { x: -260, y: -120 },
        { x: 260,  y: -120 },
        { x: 0,    y: 200 }
    ];
    return nodeData.map((n, i) => {
        const c = clusterCenters[n.truthGroup];
        const jitterX = ((i * 53) % 120) - 60;
        const jitterY = ((i * 37) % 120) - 60;
        return {
            id: n.id,
            label: n.label,
            title: n.label, // hover tooltip = concept label
            x: c.x + jitterX,
            y: c.y + jitterY,
            color: { background: NEUTRAL.background, border: NEUTRAL.border },
            font: { color: '#222', size: 14, face: 'Arial' }
        };
    });
}

function initializeNetwork() {
    phase = 'neutral';
    clusters = [];
    nodeToCluster = {};

    nodes = new vis.DataSet(buildInitialNodes());
    edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        color: { color: '#cfcfcf', highlight: '#9e9e9e' },
        width: 2
    })));

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -55,
                centralGravity: 0.012,
                springLength: 90,
                springConstant: 0.09,
                avoidOverlap: 0.6
            },
            stabilization: { enabled: true, iterations: 220, fit: true }
        },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'dot',
            size: 16,
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 1 }
        },
        edges: {
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Freeze layout once stabilized so clustering recolors don't reflow nodes.
    network.once('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    // Draw bounding regions + category titles on top of the graph.
    network.on('afterDrawing', drawClusterOverlays);

    updateUI();
}

// ===========================================
// CLUSTER OVERLAY DRAWING (bounding region + title)
// ===========================================
function drawClusterOverlays(ctx) {
    if (phase === 'neutral' || clusters.length === 0) return;

    clusters.forEach(cluster => {
        const color = CLUSTER_COLORS[cluster.colorIndex];
        const pts = [];
        cluster.members.forEach(id => {
            const p = network.getPositions([id])[id];
            if (p) pts.push(p);
        });
        if (pts.length === 0) return;

        // Bounding box of members, padded, drawn as a rounded translucent region.
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        pts.forEach(p => {
            minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
        });
        const pad = 46;
        minX -= pad; minY -= pad; maxX += pad; maxY += pad;

        drawRoundedRect(ctx, minX, minY, maxX - minX, maxY - minY, 22,
                        color.fill, color.stroke);

        // Label above the region: "Group X" (clustered) or category name (abstracted).
        const label = (phase === 'abstracted' && cluster.name)
            ? cluster.name
            : 'Group ' + color.key;
        const cx = (minX + maxX) / 2;
        const labelY = minY - 12;

        ctx.save();
        ctx.font = 'bold 17px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const metrics = ctx.measureText(label);
        const boxW = metrics.width + 20;
        const boxH = 26;
        // Rounded chip background for legibility over edges.
        drawRoundedRect(ctx, cx - boxW / 2, labelY - boxH / 2, boxW, boxH, 8,
                        'rgba(255,255,255,0.92)', color.stroke);
        ctx.fillStyle = color.title;
        ctx.fillText(label, cx, labelY);
        ctx.restore();
    });
}

function drawRoundedRect(ctx, x, y, w, h, r, fillStyle, strokeStyle) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
    ctx.restore();
}

// ===========================================
// ACTIONS
// ===========================================
function runClustering() {
    if (phase !== 'neutral') return;

    const components = computeConnectedComponents();
    clusters = components.map((members, idx) => ({
        colorIndex: idx % CLUSTER_COLORS.length,
        members: members,
        name: null
    }));

    // Recolor each node by its detected cluster.
    const updates = [];
    clusters.forEach(cluster => {
        const color = CLUSTER_COLORS[cluster.colorIndex];
        cluster.members.forEach(id => {
            nodeToCluster[id] = cluster.colorIndex;
            updates.push({
                id: id,
                color: { background: color.node, border: color.border },
                font: { color: '#fff', size: 14, face: 'Arial' }
            });
        });
    });
    nodes.update(updates);

    // Color edges to match their cluster (both endpoints share a cluster here).
    edges.update(edgeData.map((e, i) => {
        const ci = nodeToCluster[e.from];
        const color = CLUSTER_COLORS[ci];
        return { id: i, color: { color: color.stroke, highlight: color.border } };
    }));

    phase = 'clustered';
    network.redraw();
    updateUI();
}

function runAbstraction() {
    if (phase !== 'clustered') return;
    clusters.forEach(cluster => {
        cluster.name = lookupCategoryName(cluster.members);
    });
    phase = 'abstracted';
    network.redraw();
    updateUI();
}

function reset() {
    // Return every node to neutral gray and clear labels without re-running physics.
    phase = 'neutral';
    clusters = [];
    nodeToCluster = {};
    nodes.update(nodeData.map(n => ({
        id: n.id,
        color: { background: NEUTRAL.background, border: NEUTRAL.border },
        font: { color: '#222', size: 14, face: 'Arial' }
    })));
    edges.update(edgeData.map((e, i) => ({
        id: i, color: { color: '#cfcfcf', highlight: '#9e9e9e' }
    })));
    network.redraw();
    updateUI();
}

// ===========================================
// UI SYNC
// ===========================================
function updateUI() {
    const clusterBtn = document.getElementById('cluster-btn');
    const abstractBtn = document.getElementById('abstract-btn');
    const statusText = document.getElementById('status-text');
    const clusterLegendItems = document.querySelectorAll('.legend-cluster');

    clusterBtn.disabled = (phase !== 'neutral');
    abstractBtn.disabled = (phase !== 'clustered');

    // Legend: show colored-group rows only after clustering.
    const showGroups = (phase !== 'neutral');
    clusterLegendItems.forEach(el => { el.style.display = showGroups ? 'flex' : 'none'; });

    if (showGroups && clusters.length >= 3) {
        setLegendLabel('legend-a-label', 0);
        setLegendLabel('legend-b-label', 1);
        setLegendLabel('legend-c-label', 2);
    }

    if (phase === 'neutral') {
        statusText.innerHTML = 'All 18 concepts start gray. Physics has already ' +
            'pulled three dense groups apart. Press <strong>Run Clustering</strong> ' +
            'to color the groups a computer would detect from the edges alone.';
    } else if (phase === 'clustered') {
        statusText.innerHTML = 'The algorithm found <strong>3 groups</strong> by ' +
            'following the edges &mdash; nodes packed tightly together landed in the ' +
            'same group. They are only labeled <em>Group A/B/C</em> so far. ' +
            'Press <strong>Run Abstraction</strong> to propose a name for each.';
    } else {
        statusText.innerHTML = 'Abstraction assigned each group a ' +
            '<strong>taxonomy category</strong>: Graph Theory, Visualization Tools, ' +
            'and Learning Science. The name fits because those concepts are the ones ' +
            'most densely connected to one another.';
    }
}

function setLegendLabel(elementId, colorIndex) {
    const el = document.getElementById(elementId);
    const cluster = clusters.find(c => c.colorIndex === colorIndex);
    const color = CLUSTER_COLORS[colorIndex];
    if (!el || !cluster) return;
    const text = (phase === 'abstracted' && cluster.name)
        ? cluster.name
        : 'Group ' + color.key;
    el.innerHTML = '<strong>' + text + '</strong>';
}

// ===========================================
// BOOT
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    document.getElementById('cluster-btn').addEventListener('click', runClustering);
    document.getElementById('abstract-btn').addEventListener('click', runAbstraction);
    document.getElementById('reset-btn').addEventListener('click', reset);
});
