// Knowledge Space Explorer
// CANVAS_HEIGHT: 620
// A hierarchical lattice of every VALID knowledge state for a 4-concept domain.
// Learners hover states, inspect edges, animate a learning path, and reveal
// invalid states. Bloom Analyze (L4): distinguish valid vs invalid states and
// trace at least two distinct paths from empty to full mastery.

// ---------------------------------------------------------------------------
// Environment detection: mouse zoom/pan only outside an iframe.
// ---------------------------------------------------------------------------
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ---------------------------------------------------------------------------
// Domain: four concepts with a partial order.
//   Arithmetic (A) and Number Sense (N) are incomparable; both are
//   prerequisites of Algebra (G); Algebra is a prerequisite of Applied
//   Calculus (C).
// A knowledge state is VALID when it is downward-closed: a concept may be in
// the set only if all of its prerequisites are also in the set.
// ---------------------------------------------------------------------------
const CONCEPTS = {
    A: 'Arithmetic',
    N: 'Number Sense',
    G: 'Algebra',
    C: 'Applied Calculus'
};
const PREREQS = {
    A: [],
    N: [],
    G: ['A', 'N'],
    C: ['G']
};
const ORDER = ['A', 'N', 'G', 'C']; // canonical display order within a subset

// Format a set of concept keys as a readable subset label.
function subsetLabel(keys) {
    if (keys.length === 0) return '{ }';
    const ordered = ORDER.filter(k => keys.indexOf(k) !== -1);
    return '{ ' + ordered.map(k => CONCEPTS[k]).join(', ') + ' }';
}
function subsetKey(keys) {
    // stable identity string, e.g. "A,N"
    return ORDER.filter(k => keys.indexOf(k) !== -1).join(',');
}

// A subset is valid if every member's prerequisites are also present.
function isValidState(keys) {
    return keys.every(k => PREREQS[k].every(p => keys.indexOf(p) !== -1));
}
// A concept is "ready to learn" in a state if it is absent but all its
// prerequisites are present.
function isReady(keys, concept) {
    return keys.indexOf(concept) === -1 &&
           PREREQS[concept].every(p => keys.indexOf(p) !== -1);
}

// ---------------------------------------------------------------------------
// Enumerate all VALID knowledge states (order ideals of the partial order).
// ---------------------------------------------------------------------------
function enumerateValidStates() {
    const all = [];
    const conceptKeys = Object.keys(CONCEPTS);
    const total = 1 << conceptKeys.length; // 2^4
    for (let mask = 0; mask < total; mask++) {
        const keys = [];
        conceptKeys.forEach((k, i) => { if (mask & (1 << i)) keys.push(k); });
        if (isValidState(keys)) all.push(keys);
    }
    return all;
}

const DEPTH_COLORS = {
    0: { bg: '#eceff1', border: '#90a4ae', font: '#37474f' },
    1: { bg: '#bbdefb', border: '#42a5f5', font: '#0d3b66' },
    2: { bg: '#64b5f6', border: '#1e88e5', font: '#08306b' },
    3: { bg: '#2196f3', border: '#1565c0', font: '#ffffff' },
    4: { bg: '#1565c0', border: '#f9a825', font: '#ffffff' }
};

// ---------------------------------------------------------------------------
// Build the nodes / edges data for the lattice.
// ---------------------------------------------------------------------------
const validStates = enumerateValidStates();
const keyToId = {};      // subsetKey -> node id
const idToKeys = {};     // node id -> array of concept keys
const nodeById = {};     // node id -> node object

let nextId = 1;
const validNodeDefs = [];
validStates.forEach(keys => {
    const id = 'v' + (nextId++);
    const sk = subsetKey(keys);
    keyToId[sk] = id;
    idToKeys[id] = keys;
    const depth = keys.length;
    const isFull = depth === Object.keys(CONCEPTS).length;
    const colors = DEPTH_COLORS[depth];
    const def = {
        id: id,
        keys: keys,
        depth: depth,
        label: subsetLabel(keys),
        level: depth, // hierarchical rank = number of concepts mastered
        color: {
            background: colors.bg,
            border: colors.border,
            highlight: { background: colors.bg, border: colors.border }
        },
        borderWidth: isFull ? 4 : 2,
        font: { color: colors.font, size: 13, face: 'Arial' },
        shape: 'box',
        margin: 8,
        title: subsetLabel(keys) +
               '\nConcepts mastered: ' + depth +
               '\nReachable from the empty state: yes'
    };
    validNodeDefs.push(def);
    nodeById[id] = def;
});

// Valid edges: from state K to K+{c} whenever c is ready in K. Label = concept.
const validEdgeDefs = [];
let edgeCounter = 1;
validStates.forEach(keys => {
    const fromId = keyToId[subsetKey(keys)];
    Object.keys(CONCEPTS).forEach(c => {
        if (isReady(keys, c)) {
            const toKeys = keys.concat([c]);
            const toId = keyToId[subsetKey(toKeys)];
            if (toId) {
                validEdgeDefs.push({
                    id: 'e' + (edgeCounter++),
                    from: fromId,
                    to: toId,
                    concept: c,
                    fromKeys: keys,
                    label: CONCEPTS[c],
                    font: { size: 11, color: '#37474f', strokeWidth: 3, strokeColor: '#ffffff' },
                    color: { color: '#78909c', highlight: '#f9a825' },
                    width: 2
                });
            }
        }
    });
});

// ---------------------------------------------------------------------------
// Invalid states (revealed by the toggle): valid-looking subsets that violate
// the partial order. Shown disconnected, flat gray, with a red X marker.
// ---------------------------------------------------------------------------
const invalidExamples = [
    { keys: ['G'],      missing: 'Arithmetic and Number Sense' },
    { keys: ['C'],      missing: 'Algebra' },
    { keys: ['A', 'G'], missing: 'Number Sense' },
    { keys: ['N', 'C'], missing: 'Algebra' }
];
const invalidNodeDefs = invalidExamples.map((ex, i) => ({
    id: 'x' + (i + 1),
    label: subsetLabel(ex.keys) + '  ❌',
    keysLabel: subsetLabel(ex.keys),
    missing: ex.missing,
    // Park them on a rank below the full-domain state so they sit apart.
    level: Object.keys(CONCEPTS).length + 1,
    color: {
        background: '#cfd8dc',
        border: '#d32f2f',
        highlight: { background: '#cfd8dc', border: '#d32f2f' }
    },
    borderWidth: 2,
    shapeProperties: { borderDashes: [4, 3] },
    font: { color: '#546e7a', size: 12, face: 'Arial' },
    shape: 'box',
    margin: 8,
    title: 'Invalid: missing prerequisite (' + ex.missing + ')'
}));

// ---------------------------------------------------------------------------
// vis-network setup
// ---------------------------------------------------------------------------
let nodes, edges, network;
let animating = false;

function initNetwork() {
    nodes = new vis.DataSet(validNodeDefs);
    edges = new vis.DataSet(validEdgeDefs);

    const enableMouse = !isInIframe();
    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'UD',        // empty at top, full at bottom
                sortMethod: 'directed',
                levelSeparation: 95,
                nodeSpacing: 150,
                treeSpacing: 150,
                blockShifting: true,
                edgeMinimization: true
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
            keyboard: false
        },
        nodes: {
            shape: 'box',
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    network.on('click', function (params) {
        if (params.edges.length > 0 && params.nodes.length === 0) {
            showEdgeInfo(params.edges[0]);
        } else if (params.nodes.length > 0) {
            showNodeInfo(params.nodes[0]);
        }
    });

    // Resize to container width on window resize.
    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
}

// ---------------------------------------------------------------------------
// Infobox
// ---------------------------------------------------------------------------
function setInfobox(title, html, cls) {
    const box = document.getElementById('infobox');
    box.className = 'infobox' + (cls ? ' ' + cls : '');
    document.getElementById('infobox-title').innerHTML = title;
    document.getElementById('infobox-content').innerHTML = html;
}

function showNodeInfo(id) {
    if (idToKeys[id] !== undefined) {
        const keys = idToKeys[id];
        const ready = Object.keys(CONCEPTS).filter(c => isReady(keys, c)).map(c => CONCEPTS[c]);
        let readyText = ready.length
            ? 'Ready to learn next: <strong>' + ready.join(', ') + '</strong>.'
            : 'This is full mastery — nothing left to learn.';
        setInfobox('Knowledge State ' + subsetLabel(keys),
            'A learner in this state has mastered <strong>' + keys.length +
            '</strong> of 4 concepts. ' + readyText +
            '<br><br>This state is <strong>reachable</strong> from the empty state.', null);
    } else {
        // Invalid node
        const inv = invalidNodeDefs.find(n => n.id === id);
        if (inv) {
            setInfobox('Invalid State ' + inv.keysLabel,
                'This subset is <strong>invalid</strong> — it violates the domain’s ' +
                'partial order. It is missing the prerequisite ' +
                '<strong>' + inv.missing + '</strong>, so no learner could reach it ' +
                'one ready-to-learn concept at a time.', 'invalid-note');
        }
    }
}

function showEdgeInfo(edgeId) {
    const e = edges.get(edgeId);
    if (!e) return;
    const conceptName = CONCEPTS[e.concept];
    const prereqs = PREREQS[e.concept];
    let why;
    if (prereqs.length === 0) {
        why = conceptName + ' has no prerequisites, so it is ready to learn from any state.';
    } else {
        why = 'It was ready to learn because its prerequisite' +
              (prereqs.length > 1 ? 's ' : ' ') +
              '<strong>' + prereqs.map(p => CONCEPTS[p]).join(' and ') + '</strong> ' +
              (prereqs.length > 1 ? 'were' : 'was') +
              ' already in the source state ' + subsetLabel(e.fromKeys) + '.';
    }
    setInfobox('Learning Step: ' + conceptName,
        'Along this edge the learner newly masters <strong>' + conceptName +
        '</strong>. ' + why, 'edge-note');
}

// ---------------------------------------------------------------------------
// "Highlight a Learning Path" — animate a token from {} to full mastery along
// one randomly chosen valid path.
// ---------------------------------------------------------------------------
function outgoingEdges(nodeId) {
    return validEdgeDefs.filter(e => e.from === nodeId);
}

function randomValidPath() {
    // Start at the empty state.
    const emptyId = keyToId[''];
    const path = [emptyId];
    let current = emptyId;
    while (idToKeys[current].length < Object.keys(CONCEPTS).length) {
        const outs = outgoingEdges(current);
        if (outs.length === 0) break;
        const chosen = outs[Math.floor(Math.random() * outs.length)];
        path.push(chosen.to);
        current = chosen.to;
    }
    return path;
}

function resetHighlights() {
    validNodeDefs.forEach(n => {
        const colors = DEPTH_COLORS[n.depth];
        nodes.update({
            id: n.id,
            color: { background: colors.bg, border: colors.border },
            borderWidth: n.depth === 4 ? 4 : 2
        });
    });
    validEdgeDefs.forEach(e => {
        edges.update({ id: e.id, color: { color: '#78909c' }, width: 2 });
    });
}

function highlightPath() {
    if (animating) return;
    animating = true;
    document.getElementById('path-btn').disabled = true;
    resetHighlights();

    const path = randomValidPath();
    const readable = path.map(id => subsetLabel(idToKeys[id])).join('  →  ');
    setInfobox('Tracing a Learning Path',
        'Watch the token travel from the empty state to full mastery, one ' +
        'ready-to-learn concept at a time.<br><br><strong>Path:</strong> ' + readable, null);

    let step = 0;
    const STEP_MS = 750;

    function advance() {
        // Highlight the current node in gold.
        const id = path[step];
        nodes.update({
            id: id,
            color: { background: '#ffd54f', border: '#f57f17' },
            borderWidth: 4
        });
        // Highlight the edge that got us here.
        if (step > 0) {
            const prev = path[step - 1];
            const edge = validEdgeDefs.find(e => e.from === prev && e.to === id);
            if (edge) edges.update({ id: edge.id, color: { color: '#f57f17' }, width: 4 });
        }
        step++;
        if (step < path.length) {
            setTimeout(advance, STEP_MS);
        } else {
            animating = false;
            document.getElementById('path-btn').disabled = false;
        }
    }
    advance();
}

// ---------------------------------------------------------------------------
// "Show Invalid States" toggle
// ---------------------------------------------------------------------------
function toggleInvalid(show) {
    if (show) {
        nodes.add(invalidNodeDefs);
        setInfobox('Invalid States Revealed',
            'The dashed gray nodes with a red ❌ are <strong>invalid</strong> ' +
            'knowledge states. They are disconnected because no sequence of ' +
            'ready-to-learn steps can ever reach them — each is missing a ' +
            'prerequisite. Click one to see which.', 'invalid-note');
    } else {
        invalidNodeDefs.forEach(n => nodes.remove(n.id));
        setInfobox('Explore the Knowledge Space',
            'Each node is a <strong>knowledge state</strong> — the set of concepts a ' +
            'learner has mastered so far. Hover a node to see its exact set. ' +
            'Click an edge to see which concept is learned at that step.', null);
    }
    network.fit({ animation: false });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initNetwork();
    document.getElementById('path-btn').addEventListener('click', highlightPath);
    document.getElementById('invalid-toggle').addEventListener('change', function (e) {
        toggleInvalid(e.target.checked);
    });
});
