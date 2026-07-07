// Transitive Dependency and Hop Count Finder
// CANVAS_HEIGHT: 520
// Educational vis-network MicroSim: select a From concept and a To concept,
// then breadth-first search along outgoing (dependency) edges to trace the
// shortest connecting path and report the hop count. Arrow convention is
// dependent -> prerequisite, so "outgoing" edges mean "depends on".

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const NODE_BLUE   = { background: '#90caf9', border: '#1e88e5' };
const NODE_GOLD   = { background: '#ffca28', border: '#f5a623' };
const EDGE_BASE   = '#333333';
const EDGE_GOLD   = '#f5a623';

// Circled-number glyphs used as hop badges on path nodes.
const BADGES = ['', '①', '②', '③', '④', '⑤',
                '⑥', '⑦', '⑧', '⑨', '⑩'];

// ---------------------------------------------------------------------------
// Nine math-sequence concepts, hand-placed in dependency layers so the flow
// reads left (foundational) to right (advanced) — a stable hierarchical layout.
// ---------------------------------------------------------------------------
const nodeData = [
    { id: 'numbersense', label: 'Number\nSense',      x: -420, y:    0 },
    { id: 'arithmetic',  label: 'Arithmetic',         x: -260, y:    0 },
    { id: 'algebra',     label: 'Algebra',            x: -100, y:    0 },
    { id: 'geometry',    label: 'Geometry',           x:   60, y: -150 },
    { id: 'functions',   label: 'Functions',          x:   60, y:  150 },
    { id: 'trig',        label: 'Trigonometry',       x:  220, y: -150 },
    { id: 'derivatives', label: 'Derivatives',        x:  220, y:   60 },
    { id: 'integrals',   label: 'Integrals',          x:  220, y:  220 },
    { id: 'calculus',    label: 'Applied\nCalculus',  x:  400, y:   30 }
];

// Directed dependency edges: dependent -> prerequisite ("depends on").
const edgeData = [
    { from: 'arithmetic',  to: 'numbersense' },
    { from: 'algebra',     to: 'arithmetic'  },
    { from: 'geometry',    to: 'algebra'     },
    { from: 'functions',   to: 'algebra'     },
    { from: 'trig',        to: 'geometry'    },
    { from: 'derivatives', to: 'functions'   },
    { from: 'integrals',   to: 'functions'   },
    { from: 'calculus',    to: 'derivatives' },
    { from: 'calculus',    to: 'integrals'   },
    { from: 'calculus',    to: 'trig'        }
];

const plainLabel = {};
nodeData.forEach(n => { plainLabel[n.id] = n.label.replace('\n', ' '); });

// Adjacency list along OUTGOING edges (from -> [to, ...]) for BFS.
const adj = {};
nodeData.forEach(n => { adj[n.id] = []; });
edgeData.forEach(e => { adj[e.from].push(e.to); });

// Quick lookup: does a directed edge from A to B exist? -> its edge id.
const edgeIdByPair = {};
edgeData.forEach((e, i) => { edgeIdByPair[e.from + '>' + e.to] = 'e' + i; });

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let nodes, edges, network;

// ---------------------------------------------------------------------------
// Breadth-first shortest path along outgoing edges. Returns array of node ids
// (start..end) or null if unreachable.
// ---------------------------------------------------------------------------
function bfsPath(start, goal) {
    if (start === goal) return [start];
    const prev = {};
    const seen = new Set([start]);
    const queue = [start];
    while (queue.length) {
        const cur = queue.shift();
        for (const nxt of adj[cur]) {
            if (!seen.has(nxt)) {
                seen.add(nxt);
                prev[nxt] = cur;
                if (nxt === goal) {
                    // Reconstruct path.
                    const path = [goal];
                    let step = goal;
                    while (step !== start) { step = prev[step]; path.unshift(step); }
                    return path;
                }
                queue.push(nxt);
            }
        }
    }
    return null;
}

// ---------------------------------------------------------------------------
// Network setup
// ---------------------------------------------------------------------------
function baseNodes() {
    return nodeData.map(n => ({
        id: n.id,
        label: n.label,
        x: n.x,
        y: n.y,
        fixed: { x: true, y: true },
        color: {
            background: NODE_BLUE.background,
            border: NODE_BLUE.border,
            highlight: { background: NODE_BLUE.background, border: NODE_BLUE.border }
        },
        font: { color: '#0d3c61', size: 14, face: 'Arial' }
    }));
}

function baseEdges() {
    return edgeData.map((e, i) => ({
        id: 'e' + i,
        from: e.from,
        to: e.to,
        color: { color: EDGE_BASE, highlight: EDGE_BASE },
        width: 2
    }));
}

function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

function fitGraphToLeft() {
    // Fit the graph into the area LEFT of the right panel. On narrow viewports
    // (<700px) the panel stacks BELOW the graph (CSS media query), so the full
    // width is usable. Camera math is analytic (no post-moveTo DOM round-trips).
    const container = document.getElementById('network');
    const w = container.clientWidth || 700;
    const h = container.clientHeight || 480;
    const stacked = w < 700;
    const rightReserve = stacked ? 0 : 250;
    const pad = 48;
    const usableW = Math.max(220, w - rightReserve - pad);
    const usableH = Math.max(180, h - pad);

    const xs = nodeData.map(n => n.x);
    const ys = nodeData.map(n => n.y);
    const minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
    const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    const gW = (maxX - minX) + 140;
    const gH = (maxY - minY) + 90;
    const gCx = (maxX + minX) / 2;
    const gCy = (maxY + minY) / 2;

    const scale = Math.min(usableW / gW, usableH / gH, 1.0);
    // Camera looks RIGHT of graph center by half the reserved width => graph
    // sits in the usable region, clearing the right panel.
    const shiftCanvas = (rightReserve / 2) / scale;
    network.moveTo({
        scale: scale,
        position: { x: gCx + shiftCanvas, y: gCy },
        animation: false
    });
}

function initializeNetwork() {
    nodes = new vis.DataSet(baseNodes());
    edges = new vis.DataSet(baseEdges());

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false, hierarchical: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'ellipse',
            margin: 10,
            widthConstraint: { minimum: 70, maximum: 96 },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            width: 2,
            smooth: { enabled: true, type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.35 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
    window.__network = network; // exposed for debugging/verification only

    network.once('afterDrawing', fitGraphToLeft);
    window.addEventListener('resize', function () { if (network) fitGraphToLeft(); });
}

// ---------------------------------------------------------------------------
// Highlight / clear
// ---------------------------------------------------------------------------
function clearHighlight() {
    // Reset all nodes to blue and restore plain labels.
    nodes.update(nodeData.map(n => ({
        id: n.id,
        label: n.label,
        color: {
            background: NODE_BLUE.background,
            border: NODE_BLUE.border,
            highlight: { background: NODE_BLUE.background, border: NODE_BLUE.border }
        },
        font: { color: '#0d3c61', size: 14, face: 'Arial' }
    })));
    // Reset all edges to base.
    edges.update(edgeData.map((e, i) => ({
        id: 'e' + i,
        color: { color: EDGE_BASE, highlight: EDGE_BASE },
        width: 2
    })));
}

function highlightPath(path) {
    // Gold nodes with numbered hop badges (start = 1, then 2, 3, ...).
    path.forEach((id, idx) => {
        const badge = BADGES[idx + 1] || (idx + 1) + '.';
        nodes.update({
            id: id,
            label: badge + '  ' + nodeData.find(n => n.id === id).label,
            color: {
                background: NODE_GOLD.background,
                border: NODE_GOLD.border,
                highlight: { background: NODE_GOLD.background, border: NODE_GOLD.border }
            },
            font: { color: '#5d4037', size: 14, face: 'Arial', bold: { color: '#5d4037' } }
        });
    });
    // Thicken and gold each edge on the path.
    for (let i = 0; i < path.length - 1; i++) {
        const eid = edgeIdByPair[path[i] + '>' + path[i + 1]];
        if (eid) {
            edges.update({
                id: eid,
                color: { color: EDGE_GOLD, highlight: EDGE_GOLD },
                width: 5
            });
        }
    }
}

// ---------------------------------------------------------------------------
// Find Path handler
// ---------------------------------------------------------------------------
function findPath() {
    const fromId = document.getElementById('from-select').value;
    const toId = document.getElementById('to-select').value;
    const infobox = document.getElementById('infobox');
    const infoText = document.getElementById('info-text');

    clearHighlight();
    infobox.className = 'infobox';

    if (fromId === toId) {
        infobox.classList.add('result-none');
        infoText.innerHTML = 'The <b>From</b> and <b>To</b> concepts are the same. ' +
            'Choose two different concepts to trace a dependency.';
        return;
    }

    const from = plainLabel[fromId];
    const to = plainLabel[toId];

    // Search along outgoing (dependency) edges from -> to.
    const path = bfsPath(fromId, toId);

    if (path) {
        const hops = path.length - 1;
        highlightPath(path);
        if (hops === 1) {
            infobox.classList.add('result-direct');
            infoText.innerHTML = '<b>' + from + '</b> has a <b>direct dependency</b> on <b>' +
                to + '</b> &mdash; Hop Count: <span class="hop-badge">1</span>';
        } else {
            infobox.classList.add('result-transitive');
            infoText.innerHTML = '<b>' + from + '</b> has a <b>transitive dependency</b> on <b>' +
                to + '</b> &mdash; Hop Count: <span class="hop-badge">' + hops + '</span>' +
                '<br><span style="font-size:11px;color:#666;">Path: ' +
                path.map(id => plainLabel[id]).join(' → ') + '</span>';
        }
    } else {
        // No dependency in the From->To direction. Check the reverse to give a
        // clearer message per the spec ("in either direction").
        const reverse = bfsPath(toId, fromId);
        infobox.classList.add('result-none');
        if (reverse) {
            infoText.innerHTML = 'No dependency relationship exists between <b>' + from +
                '</b> and <b>' + to + '</b> in this direction. (Here <b>' + to +
                '</b> actually depends on <b>' + from + '</b> &mdash; try swapping them.)';
        } else {
            infoText.innerHTML = 'No dependency relationship exists between <b>' + from +
                '</b> and <b>' + to + '</b> in this graph.';
        }
    }
}

function reset() {
    clearHighlight();
    const infobox = document.getElementById('infobox');
    infobox.className = 'infobox';
    document.getElementById('info-text').innerHTML =
        'Pick a <b>From</b> concept and a <b>To</b> concept, then click ' +
        '<b>Find Path</b> to trace the dependency and count the hops.';
    // Restore default selections.
    document.getElementById('from-select').value = 'calculus';
    document.getElementById('to-select').value = 'numbersense';
}

// ---------------------------------------------------------------------------
// Populate dropdowns
// ---------------------------------------------------------------------------
function populateSelects() {
    const fromSel = document.getElementById('from-select');
    const toSel = document.getElementById('to-select');
    nodeData.forEach(n => {
        const o1 = document.createElement('option');
        o1.value = n.id; o1.textContent = plainLabel[n.id];
        fromSel.appendChild(o1);
        const o2 = document.createElement('option');
        o2.value = n.id; o2.textContent = plainLabel[n.id];
        toSel.appendChild(o2);
    });
    // Sensible defaults that demonstrate a transitive (multi-hop) path.
    fromSel.value = 'calculus';
    toSel.value = 'numbersense';
}

// ---------------------------------------------------------------------------
// Wire up
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    populateSelects();
    initializeNetwork();
    document.getElementById('find-btn').addEventListener('click', findPath);
    document.getElementById('reset-btn').addEventListener('click', reset);
});
