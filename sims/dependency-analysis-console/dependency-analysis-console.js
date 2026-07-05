// Dependency Analysis Console
// CANVAS_HEIGHT: 560
// Chapter 3: Concept Dependencies and Prerequisites. Bloom L5 (Evaluate).
// A single console runs the four most common dependency-analysis queries
// against ONE shared 9-node math-sequence dataset, reinforcing that they are
// variations on one analytical practice. Learner selects a query (radio),
// the graph re-renders with a query-specific highlight, and the results panel
// states the finding in one sentence.
//
// Edge convention (consistent with Chapter 3): an arrow points FROM a
// dependent concept TO the prerequisite it needs. So a node's OUT-neighbors
// are its prerequisites; a foundational concept has zero out-edges.

// ---------------------------------------------------------------------------
// ENVIRONMENT
// ---------------------------------------------------------------------------
function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

// ---------------------------------------------------------------------------
// SHARED DATASET (9-node math sequence)
// Hierarchical levels: higher level number = further from foundation.
// ---------------------------------------------------------------------------
const NODES = [
    { id: 1, label: 'Number Sense',     level: 0 },
    { id: 2, label: 'Arithmetic',       level: 1 },
    { id: 3, label: 'Algebra',          level: 2 },
    { id: 4, label: 'Geometry',         level: 2 },
    { id: 5, label: 'Trigonometry',     level: 3 },
    { id: 6, label: 'Functions',        level: 3 },
    { id: 7, label: 'Derivatives',      level: 4 },
    { id: 8, label: 'Integrals',        level: 5 },
    { id: 9, label: 'Applied Calculus', level: 6 }
];

// Directed edges: from dependent -> prerequisite.
const EDGES = [
    { from: 2, to: 1 }, // Arithmetic       needs Number Sense
    { from: 3, to: 2 }, // Algebra          needs Arithmetic
    { from: 4, to: 2 }, // Geometry         needs Arithmetic
    { from: 5, to: 4 }, // Trigonometry     needs Geometry
    { from: 5, to: 3 }, // Trigonometry     needs Algebra
    { from: 6, to: 3 }, // Functions        needs Algebra
    { from: 7, to: 6 }, // Derivatives      needs Functions
    { from: 7, to: 5 }, // Derivatives      needs Trigonometry
    { from: 8, to: 7 }, // Integrals        needs Derivatives
    { from: 9, to: 8 }, // Applied Calculus needs Integrals
    { from: 9, to: 4 }  // Applied Calculus needs Geometry
];

const labelOf = {};
NODES.forEach(function (n) { labelOf[n.id] = n.label; });

// Adjacency: prereqs[id] = list of that node's prerequisites (out-neighbors).
const prereqs = {};
// dependents[id] = list of nodes that depend on it (in-neighbors).
const dependents = {};
NODES.forEach(function (n) { prereqs[n.id] = []; dependents[n.id] = []; });
EDGES.forEach(function (e) {
    prereqs[e.from].push(e.to);
    dependents[e.to].push(e.from);
});

function outDegree(id) { return prereqs[id].length; }

// ---------------------------------------------------------------------------
// COLORS
// ---------------------------------------------------------------------------
const C_BASE     = { background: '#a9d0f5', border: '#1b3b5f' };
const C_LEARNED  = { background: '#cfd8dc', border: '#607d8b' };
const C_GOLD     = { background: '#ffd54f', border: '#b8860b' };
const C_GREEN    = { background: '#66bb6a', border: '#2e7d32' };
const C_RED      = { background: '#ef5350', border: '#c62828' };
const C_PURPLE   = { background: '#ab47bc', border: '#6a1b9a' };
const EDGE_BASE = '#555555';
const EDGE_PURPLE = '#8e24aa';

// ---------------------------------------------------------------------------
// STATE
// ---------------------------------------------------------------------------
let nodes, edges, network;
let learned = { 1: true, 2: true }; // defaults: Number Sense + Arithmetic learned
let currentQuery = 'foundational';
let goalId = 9;
let hopFrom = 9;
let hopTo = 1;

// ---------------------------------------------------------------------------
// QUERY FUNCTIONS (client-side, share the adjacency list above)
// Each returns { nodeIds:Set, edgeSet:Set|null, badges:{id:num}|null, text }.
// ---------------------------------------------------------------------------

// Q1: foundational = zero outgoing edges (no prerequisites).
function queryFoundational() {
    const set = new Set();
    NODES.forEach(function (n) { if (outDegree(n.id) === 0) set.add(n.id); });
    const names = NODES.filter(function (n) { return set.has(n.id); })
                       .map(function (n) { return n.label; });
    return {
        nodeIds: set, color: C_GOLD, edgeSet: null, badges: null,
        text: 'Foundational concepts (no prerequisites): ' + names.join(', ') +
              ' (' + names.length + ' concept' + (names.length === 1 ? '' : 's') + ').'
    };
}

// Q2: ready-to-learn = unlearned nodes whose every prerequisite is learned.
function queryReady() {
    const set = new Set();
    NODES.forEach(function (n) {
        if (learned[n.id]) return;
        const allPreqLearned = prereqs[n.id].every(function (p) { return learned[p]; });
        if (allPreqLearned) set.add(n.id);
    });
    const names = NODES.filter(function (n) { return set.has(n.id); })
                       .map(function (n) { return n.label; });
    return {
        nodeIds: set, color: C_GREEN, edgeSet: null, badges: null,
        text: names.length
            ? 'Ready to learn now (all prerequisites satisfied): ' + names.join(', ') +
              ' (' + names.length + ').'
            : 'Nothing is ready to learn yet - every unlearned concept still has an unmet prerequisite.'
    };
}

// Q3: skill gap to goal = every UNLEARNED prerequisite the learner must still
// acquire on any path from their learned set to the goal. This is the set of
// the goal's transitive prerequisites minus everything already learned. The
// goal concept itself is the destination, not part of the gap, matching the
// chapter's worked example ("Skill Gap to Applied Calculus: ... 6 concepts").
function queryGap() {
    const gap = new Set();
    const stack = [goalId];
    const seen = new Set();
    while (stack.length) {
        const id = stack.pop();
        if (seen.has(id)) continue;
        seen.add(id);
        // Count only unlearned PREREQUISITES; exclude the goal itself.
        if (!learned[id] && id !== goalId) gap.add(id);
        prereqs[id].forEach(function (p) { if (!seen.has(p)) stack.push(p); });
    }
    const ordered = NODES.filter(function (n) { return gap.has(n.id); })
                         .map(function (n) { return n.label; });
    let text;
    if (learned[goalId]) {
        text = labelOf[goalId] + ' is already in your learned set - no skill gap.';
    } else if (ordered.length === 0) {
        text = 'No skill gap: all prerequisites for ' + labelOf[goalId] + ' are learned.';
    } else {
        text = 'Skill gap to ' + labelOf[goalId] + ': ' + ordered.join(', ') +
               ' (' + ordered.length + ' concept' + (ordered.length === 1 ? '' : 's') + ').';
    }
    return { nodeIds: gap, color: C_RED, edgeSet: null, badges: null, text: text };
}

// Q4: hop count = shortest directed path (BFS over prerequisite edges) from
// the "from" concept to the "to" concept. Numbered hop badges on the path.
function queryHops() {
    if (hopFrom === hopTo) {
        return {
            nodeIds: new Set([hopFrom]), color: C_PURPLE, edgeSet: new Set(),
            badges: { [hopFrom]: 0 },
            text: 'Start and end are the same concept (' + labelOf[hopFrom] + '): 0 hops.'
        };
    }
    // BFS
    const queue = [hopFrom];
    const parent = {}; parent[hopFrom] = null;
    let found = false;
    while (queue.length) {
        const id = queue.shift();
        if (id === hopTo) { found = true; break; }
        prereqs[id].forEach(function (p) {
            if (!(p in parent)) { parent[p] = id; queue.push(p); }
        });
    }
    if (!found) {
        return {
            nodeIds: new Set(), color: C_PURPLE, edgeSet: null, badges: null,
            text: 'No prerequisite path from ' + labelOf[hopFrom] + ' to ' +
                  labelOf[hopTo] + '. (' + labelOf[hopTo] +
                  ' is not a prerequisite of ' + labelOf[hopFrom] + '.)'
        };
    }
    // Reconstruct path from hopTo back to hopFrom.
    const path = [];
    let cur = hopTo;
    while (cur !== null && cur !== undefined) { path.push(cur); cur = parent[cur]; }
    path.reverse(); // hopFrom ... hopTo
    const nodeIds = new Set(path);
    const badges = {};
    path.forEach(function (id, i) { badges[id] = i; }); // hop index 0..N
    const edgeSet = new Set();
    for (let i = 0; i < path.length - 1; i++) {
        edgeSet.add(path[i] + '->' + path[i + 1]);
    }
    const hops = path.length - 1;
    return {
        nodeIds: nodeIds, color: C_PURPLE, edgeSet: edgeSet, badges: badges,
        text: labelOf[hopFrom] + ' is ' + hops + ' hop' + (hops === 1 ? '' : 's') +
              ' from ' + labelOf[hopTo] + ': ' +
              path.map(function (id) { return labelOf[id]; }).join(' -> ') + '.'
    };
}

function runQuery() {
    switch (currentQuery) {
        case 'foundational': return queryFoundational();
        case 'ready':        return queryReady();
        case 'gap':          return queryGap();
        case 'hops':         return queryHops();
        default:             return queryFoundational();
    }
}

// ---------------------------------------------------------------------------
// RENDER
// ---------------------------------------------------------------------------
function nodeBaseColor(id) {
    return learned[id] ? C_LEARNED : C_BASE;
}

function edgeKey(e) { return e.from + '->' + e.to; }

function render() {
    const result = runQuery();

    // Nodes
    nodes.update(NODES.map(function (n) {
        let color = nodeBaseColor(n.id);
        let label = n.label;
        let borderWidth = 2;
        if (result.nodeIds.has(n.id)) {
            color = result.color;
            borderWidth = 3;
        }
        if (result.badges && result.badges[n.id] !== undefined) {
            label = n.label + '\n[hop ' + result.badges[n.id] + ']';
        }
        return {
            id: n.id,
            label: label,
            color: color,
            borderWidth: borderWidth,
            font: { color: '#111111', size: 13 }
        };
    }));

    // Edges - purple + thick along the hop path, otherwise base.
    edges.update(EDGES.map(function (e, idx) {
        const onPath = result.edgeSet && result.edgeSet.has(edgeKey(e));
        return {
            id: idx,
            color: { color: onPath ? EDGE_PURPLE : EDGE_BASE },
            width: onPath ? 5 : 1.5
        };
    }));

    // Results panel
    document.getElementById('results-text').textContent = result.text;
}

// ---------------------------------------------------------------------------
// INITIALIZE
// ---------------------------------------------------------------------------
function initializeNetwork() {
    nodes = new vis.DataSet(NODES.map(function (n) {
        return {
            id: n.id, label: n.label, level: n.level,
            color: nodeBaseColor(n.id), shape: 'circle',
            font: { color: '#111111', size: 13 }
        };
    }));
    edges = new vis.DataSet(EDGES.map(function (e, idx) {
        return { id: idx, from: e.from, to: e.to, color: { color: EDGE_BASE }, width: 1.5 };
    }));

    const enableMouse = !isInIframe();

    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU',        // foundation (level 0) at the bottom
                sortMethod: 'directed',
                levelSeparation: 78,
                nodeSpacing: 120,
                treeSpacing: 120
            }
        },
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
            shape: 'circle',
            margin: 8,
            widthConstraint: { minimum: 62, maximum: 96 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.0 } },
            smooth: { enabled: true, type: 'cubicBezier', roundness: 0.25 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.once('afterDrawing', function () {
        network.fit({ animation: false });
        const pos = network.getViewPosition();
        network.moveTo({ position: { x: pos.x + 95, y: pos.y }, animation: false });
    });
}

// ---------------------------------------------------------------------------
// UI WIRING
// ---------------------------------------------------------------------------
function populateSelect(sel, selectedId) {
    sel.innerHTML = '';
    NODES.forEach(function (n) {
        const opt = document.createElement('option');
        opt.value = String(n.id);
        opt.textContent = n.label;
        if (n.id === selectedId) opt.selected = true;
        sel.appendChild(opt);
    });
}

function buildLearnedChecklist() {
    const list = document.getElementById('learned-list');
    list.innerHTML = '';
    NODES.forEach(function (n) {
        const row = document.createElement('label');
        row.className = 'learned-item';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!learned[n.id];
        cb.value = String(n.id);
        cb.addEventListener('change', function () {
            learned[n.id] = cb.checked;
            render();
        });
        row.appendChild(cb);
        row.appendChild(document.createTextNode(n.label));
        list.appendChild(row);
    });
}

function updateParamVisibility() {
    document.getElementById('param-gap').style.display =
        currentQuery === 'gap' ? 'block' : 'none';
    document.getElementById('param-hops').style.display =
        currentQuery === 'hops' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    buildLearnedChecklist();

    const goalSel = document.getElementById('goal-select');
    const hopFromSel = document.getElementById('hop-from-select');
    const hopToSel = document.getElementById('hop-to-select');
    populateSelect(goalSel, goalId);
    populateSelect(hopFromSel, hopFrom);
    populateSelect(hopToSel, hopTo);

    document.querySelectorAll('input[name="query"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                currentQuery = radio.value;
                updateParamVisibility();
                render();
            }
        });
    });

    goalSel.addEventListener('change', function () {
        goalId = parseInt(goalSel.value, 10);
        render();
    });
    hopFromSel.addEventListener('change', function () {
        hopFrom = parseInt(hopFromSel.value, 10);
        render();
    });
    hopToSel.addEventListener('change', function () {
        hopTo = parseInt(hopToSel.value, 10);
        render();
    });

    updateParamVisibility();
    render();

    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
