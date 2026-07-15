// Graph Traversal Step-Through — DFS vs. BFS
// CANVAS_HEIGHT: 540
//
// Two vis-network panels render the SAME 10-node / 12-edge directed graph and
// advance in lockstep, one visit per click, so the learner can predict the next
// node before revealing it and see exactly where the two orders split.
// DFS and BFS each keep their own visited-set and frontier (a stack vs a queue).

// ===========================================
// GRAPH DATA (shared definition, two independent DataSets)
// ===========================================

// Level-by-level positions: A on top, then its three children, then the leaf
// row, then the shared sink J. Single source node = A.
const NODE_DEFS = [
    { id: 'A', x:    0, y: -150 },
    { id: 'B', x: -130, y:  -50 },
    { id: 'C', x:    0, y:  -50 },
    { id: 'D', x:  130, y:  -50 },
    { id: 'E', x: -195, y:   50 },
    { id: 'F', x: -105, y:   50 },
    { id: 'G', x:  -10, y:   50 },
    { id: 'H', x:   85, y:   50 },
    { id: 'I', x:  180, y:   50 },
    { id: 'J', x:  -55, y:  150 }
];

const EDGE_DEFS = [
    ['A', 'B'], ['A', 'C'], ['A', 'D'],
    ['B', 'E'], ['B', 'F'],
    ['C', 'G'],
    ['D', 'H'], ['D', 'I'],
    ['E', 'J'], ['F', 'J'], ['G', 'J'], ['H', 'J']
];

// Adjacency list, insertion-ordered — both traversals expand neighbors in this
// same order, so any difference in visit order comes purely from stack-vs-queue.
const ADJ = {};
NODE_DEFS.forEach(n => { ADJ[n.id] = []; });
EDGE_DEFS.forEach(([from, to]) => { ADJ[from].push(to); });

const COLORS = {
    unvisited: { background: '#e0e0e0', border: '#9e9e9e', font: '#424242' },
    current:   { background: '#ffd54f', border: '#ffa000', font: '#212121' },
    visited:   { background: '#64b5f6', border: '#1565c0', font: '#0d47a1' }
};

const CIRCLED = ['①', '②', '③', '④', '⑤',
                 '⑥', '⑦', '⑧', '⑨', '⑩'];

const RUN_INTERVAL_MS = 600;
const PULSE_INTERVAL_MS = 500;

function badge(n) {
    return n <= CIRCLED.length ? CIRCLED[n - 1] : '(' + n + ')';
}

function adjacencyTooltip(id) {
    const out = ADJ[id];
    return out.length
        ? id + ' → ' + out.join(', ')
        : id + ' → (no outgoing edges)';
}

// ===========================================
// TRAVERSAL ALGORITHMS
// ===========================================

// Depth-First Search: commit fully to one branch, then backtrack.
// Returns the visit order plus the DFS-tree parent of each visited node, which
// is what lets us show which nodes were backtracked from between two visits.
function computeDFS(start) {
    const visited = new Set();
    const order = [];
    const parent = {};

    (function walk(u, p) {
        if (visited.has(u)) return;
        visited.add(u);
        parent[u] = p;
        order.push(u);
        ADJ[u].forEach(v => { if (!visited.has(v)) walk(v, u); });
    })(start, null);

    return { order: order, parent: parent };
}

// Breadth-First Search: expand every neighbor before going a level deeper.
function computeBFS(start) {
    const visited = new Set([start]);
    const order = [];
    const queue = [start];

    while (queue.length) {
        const u = queue.shift();
        order.push(u);
        ADJ[u].forEach(v => {
            if (!visited.has(v)) { visited.add(v); queue.push(v); }
        });
    }

    return { order: order, parent: null };
}

// Nodes popped off the DFS stack to get from visit i-1 to visit i: walk up the
// DFS tree from the previous node until we reach the new node's parent.
function backtrackedNodes(order, parent, i) {
    if (i <= 0) return [];
    const target = parent[order[i]];
    const path = [];
    let cur = order[i - 1];
    while (cur !== null && cur !== undefined && cur !== target) {
        path.push(cur);
        cur = parent[cur];
    }
    return path;
}

// ===========================================
// PANEL STATE
// ===========================================

const panels = {
    dfs: { key: 'dfs', containerId: 'net-dfs', orderId: 'order-dfs', compute: computeDFS },
    bfs: { key: 'bfs', containerId: 'net-bfs', orderId: 'order-bfs', compute: computeBFS }
};

let startNode = 'A';
let step = 0;          // number of nodes visited so far (0 = nothing yet)
let totalSteps = 0;    // reachable node count from startNode
let firstDivergence = -1;  // 1-based step where the orders first disagree, -1 if never
let runTimer = null;
let pulseTimer = null;
let pulseOn = false;

function buildNetwork(panel) {
    const nodes = new vis.DataSet(NODE_DEFS.map(n => ({
        id: n.id,
        label: n.id,
        x: n.x,
        y: n.y,
        title: adjacencyTooltip(n.id),
        color: { background: COLORS.unvisited.background, border: COLORS.unvisited.border },
        font: { color: COLORS.unvisited.font, size: 18, face: 'Arial', bold: { size: 18 } },
        borderWidth: 2,
        shapeProperties: { borderDashes: false }
    })));

    const edges = new vis.DataSet(EDGE_DEFS.map(([from, to], i) => ({
        id: 'e' + i,
        from: from,
        to: to,
        color: { color: '#b0bec5', highlight: '#b0bec5' },
        width: 1.5
    })));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            dragNodes: false,
            dragView: false,   // never steal scroll from the surrounding page
            zoomView: false,
            hover: true,
            navigationButtons: false,
            tooltipDelay: 120
        },
        nodes: {
            shape: 'circle',
            size: 16,
            margin: 6,
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 1 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.6 } },
            smooth: { type: 'continuous', roundness: 0.15 }
        }
    };

    panel.container = document.getElementById(panel.containerId);
    panel.nodes = nodes;
    panel.edges = edges;
    panel.network = new vis.Network(panel.container, { nodes: nodes, edges: edges }, options);
    panel.network.once('afterDrawing', () => panel.network.fit({ animation: false }));
}

// Repaint every node in one panel to match the current step.
function renderPanel(panel) {
    const visitedSoFar = panel.order.slice(0, step);
    const currentNode = step > 0 ? panel.order[step - 1] : null;
    const backtrack = (panel.key === 'dfs' && step > 0)
        ? backtrackedNodes(panel.order, panel.parent, step - 1)
        : [];

    const updates = NODE_DEFS.map(n => {
        const idx = visitedSoFar.indexOf(n.id);
        const isCurrent = n.id === currentNode;
        const isVisited = idx !== -1 && !isCurrent;

        let state = COLORS.unvisited;
        let label = n.id;
        let borderWidth = 2;

        if (isCurrent) {
            state = COLORS.current;
            label = n.id + ' ' + badge(idx + 1);
            borderWidth = pulseOn ? 6 : 3;
        } else if (isVisited) {
            state = COLORS.visited;
            label = n.id + ' ' + badge(idx + 1);
            borderWidth = 2;
        }

        return {
            id: n.id,
            label: label,
            color: { background: state.background, border: state.border },
            font: { color: state.font, size: 18, face: 'Arial' },
            borderWidth: borderWidth,
            // DFS only: dash the border of nodes we just popped off the stack
            shapeProperties: { borderDashes: backtrack.indexOf(n.id) !== -1 ? [4, 3] : false }
        };
    });

    panel.nodes.update(updates);
    renderOrderList(panel);
}

function renderOrderList(panel) {
    const host = document.getElementById(panel.orderId);
    if (step === 0) {
        host.innerHTML = '<span class="empty">not started</span>';
        return;
    }
    host.innerHTML = '';
    panel.order.slice(0, step).forEach((id, i) => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        if (i === step - 1) chip.classList.add('chip-current');
        if (firstDivergence !== -1 && i === firstDivergence - 1) chip.classList.add('chip-diverge');
        chip.textContent = badge(i + 1) + ' ' + id;
        host.appendChild(chip);
    });
}

// ===========================================
// DIVERGENCE CONNECTOR
// ===========================================

// Draw a dashed line between the two panels' current-node markers whenever the
// traversals are sitting on different nodes. Node canvas coords are converted to
// DOM coords per panel, then offset into the shared .panels coordinate space.
function updateDivergenceLink() {
    const svg = document.getElementById('link-overlay');
    svg.innerHTML = '';

    if (step === 0) return;
    const dCur = panels.dfs.order[step - 1];
    const bCur = panels.bfs.order[step - 1];
    if (!dCur || !bCur || dCur === bCur) return;

    const wrap = document.getElementById('panels').getBoundingClientRect();

    function pointFor(panel, nodeId) {
        const canvasPos = panel.network.getPositions([nodeId])[nodeId];
        const dom = panel.network.canvasToDOM(canvasPos);
        const box = panel.container.getBoundingClientRect();
        return { x: box.left - wrap.left + dom.x, y: box.top - wrap.top + dom.y };
    }

    const p1 = pointFor(panels.dfs, dCur);
    const p2 = pointFor(panels.bfs, bCur);

    const ns = 'http://www.w3.org/2000/svg';
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    line.setAttribute('class', 'diverge-line');
    svg.appendChild(line);

    [p1, p2].forEach(p => {
        const dot = document.createElementNS(ns, 'circle');
        dot.setAttribute('cx', p.x);
        dot.setAttribute('cy', p.y);
        dot.setAttribute('r', 3);
        dot.setAttribute('class', 'diverge-dot');
        svg.appendChild(dot);
    });

    const tag = document.createElementNS(ns, 'text');
    tag.setAttribute('x', (p1.x + p2.x) / 2);
    tag.setAttribute('y', (p1.y + p2.y) / 2 - 6);
    tag.setAttribute('class', 'diverge-tag');
    tag.textContent = dCur + ' ≠ ' + bCur;
    svg.appendChild(tag);
}

// ===========================================
// UI
// ===========================================

function updateSummary() {
    const el = document.getElementById('summary');

    if (step < totalSteps) {
        el.classList.remove('done');
        el.innerHTML = '<span class="summary-hint">Unvisited <span class="sw sw-unvisited"></span>' +
            '&nbsp;&nbsp;Current <span class="sw sw-current"></span>' +
            '&nbsp;&nbsp;Visited <span class="sw sw-visited"></span>' +
            '&nbsp;&nbsp;Backtracked from <span class="sw sw-backtrack"></span>' +
            '&nbsp;&nbsp;— hover any node to see its adjacency list.</span>';
        return;
    }

    // Stage 3: both final orders stacked, first divergence outlined in gold.
    el.classList.add('done');
    const rows = ['dfs', 'bfs'].map(key => {
        const seq = panels[key].order.map((id, i) =>
            (firstDivergence !== -1 && i === firstDivergence - 1)
                ? '<span class="dv">' + id + '</span>'
                : id
        ).join(' ');
        return '<div class="final-row"><span class="final-key">' +
               key.toUpperCase() + '</span><span class="final-seq">' + seq + '</span></div>';
    }).join('');

    const note = firstDivergence === -1
        ? 'Both traversals visited these ' + totalSteps +
          ' nodes in the same order — this branch of the graph offers no choice to disagree about.'
        : 'First divergence at step ' + firstDivergence + ': DFS went deeper to <b>' +
          panels.dfs.order[firstDivergence - 1] + '</b> while BFS stayed shallow and took <b>' +
          panels.bfs.order[firstDivergence - 1] + '</b>, another neighbor of the first branching node.';

    el.innerHTML = '<div>' + rows + '<div class="final-note">' + note + '</div></div>';
}

function updateControls() {
    const atEnd = step >= totalSteps;
    document.getElementById('step-btn').disabled = atEnd;
    document.getElementById('run-btn').disabled = atEnd;
    document.getElementById('step-counter').textContent = 'Step ' + step + ' of ' + totalSteps;
}

function render() {
    renderPanel(panels.dfs);
    renderPanel(panels.bfs);
    updateDivergenceLink();
    updateSummary();
    updateControls();
}

// ===========================================
// ACTIONS
// ===========================================

function stepForward() {
    if (step >= totalSteps) { stopRun(); return; }
    step++;
    render();
    if (step >= totalSteps) stopRun();
}

function startRun() {
    if (runTimer || step >= totalSteps) return;
    document.getElementById('run-btn').textContent = 'Pause';
    runTimer = setInterval(stepForward, RUN_INTERVAL_MS);
}

function stopRun() {
    if (runTimer) { clearInterval(runTimer); runTimer = null; }
    document.getElementById('run-btn').textContent = 'Run to Completion';
}

function toggleRun() {
    if (runTimer) stopRun(); else startRun();
}

// Recompute both traversals for the selected start node and return to step 0.
function reset() {
    stopRun();
    step = 0;

    ['dfs', 'bfs'].forEach(key => {
        const result = panels[key].compute(startNode);
        panels[key].order = result.order;
        panels[key].parent = result.parent;
    });

    totalSteps = panels.dfs.order.length;   // reachable-from-start node count

    firstDivergence = -1;
    for (let i = 0; i < totalSteps; i++) {
        if (panels.dfs.order[i] !== panels.bfs.order[i]) { firstDivergence = i + 1; break; }
    }

    render();
}

// Gentle pulse on the current node only — draws the eye to what just changed.
function startPulse() {
    if (pulseTimer) return;
    pulseTimer = setInterval(() => {
        if (step === 0) return;
        pulseOn = !pulseOn;
        ['dfs', 'bfs'].forEach(key => {
            const cur = panels[key].order[step - 1];
            if (cur) panels[key].nodes.update({ id: cur, borderWidth: pulseOn ? 6 : 3 });
        });
    }, PULSE_INTERVAL_MS);
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById('start-select');
    NODE_DEFS.forEach(n => {
        const opt = document.createElement('option');
        opt.value = n.id;
        opt.textContent = 'Node ' + n.id;
        select.appendChild(opt);
    });
    select.value = startNode;

    buildNetwork(panels.dfs);
    buildNetwork(panels.bfs);

    document.getElementById('step-btn').addEventListener('click', stepForward);
    document.getElementById('run-btn').addEventListener('click', toggleRun);
    document.getElementById('reset-btn').addEventListener('click', reset);
    select.addEventListener('change', function () {
        startNode = this.value;
        reset();
    });

    window.addEventListener('resize', function () {
        Object.values(panels).forEach(p => p.network.fit({ animation: false }));
        updateDivergenceLink();
    });

    reset();
    startPulse();
});
