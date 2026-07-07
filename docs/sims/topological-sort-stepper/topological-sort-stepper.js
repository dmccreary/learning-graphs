// Topological Sort Step-Through
// CANVAS_HEIGHT: 540
// Educational vis-network MicroSim: step through Kahn's algorithm on a
// seven-node math dependency graph. Arrow convention is dependent -> prerequisite.
// A node is eligible once every prerequisite it points to has been placed.

// ---------------------------------------------------------------------------
// Node color states
// ---------------------------------------------------------------------------
const COLORS = {
    gray:  { background: '#d9d9d9', border: '#9e9e9e', font: '#333333' }, // not yet placed
    gold:  { background: '#ffca28', border: '#f5a623', font: '#5d4037' }, // eligible now
    green: { background: '#66bb6a', border: '#2e7d32', font: '#ffffff' }  // placed in order
};

// ---------------------------------------------------------------------------
// Seven sample concepts, laid out left (foundational) to right (advanced).
// x/y are fixed so the step-through is stable and easy to follow.
// ---------------------------------------------------------------------------
const nodeData = [
    { id: 'arithmetic',  label: 'Arithmetic',      x: -300, y: -130 },
    { id: 'numbersense', label: 'Number\nSense',   x: -300, y:  130 },
    { id: 'algebra',     label: 'Algebra',         x: -150, y:    0 },
    { id: 'geometry',    label: 'Geometry',        x:    0, y: -150 },
    { id: 'functions',   label: 'Functions',       x:    0, y:  150 },
    { id: 'trig',        label: 'Trigonometry',    x:  160, y: -80 },
    { id: 'calculus',    label: 'Applied\nCalculus', x: 320, y:  70 }
];

// Edges: dependent -> prerequisite (matches the chapter's arrow convention).
const edgeData = [
    { from: 'algebra',   to: 'arithmetic'  },
    { from: 'algebra',   to: 'numbersense' },
    { from: 'geometry',  to: 'algebra'     },
    { from: 'functions', to: 'algebra'     },
    { from: 'trig',      to: 'geometry'    },
    { from: 'trig',      to: 'algebra'     },
    { from: 'calculus',  to: 'functions'   },
    { from: 'calculus',  to: 'trig'        }
];

const labelById = {};
nodeData.forEach(n => { labelById[n.id] = n.label.replace('\n', ' '); });

// Prerequisites each node points to (its outgoing edges).
const prereqsOf = {};
// Dependents that point INTO each node (unblocked when this node is placed).
const dependentsOf = {};
nodeData.forEach(n => { prereqsOf[n.id] = []; dependentsOf[n.id] = []; });
edgeData.forEach(e => {
    prereqsOf[e.from].push(e.to);
    dependentsOf[e.to].push(e.from);
});

const TOTAL_STEPS = nodeData.length; // 7 placements

// ---------------------------------------------------------------------------
// Algorithm state (Kahn's algorithm with a FIFO queue of eligible nodes)
// ---------------------------------------------------------------------------
let nodes, edges, network;
let remaining;    // remaining unmet prerequisites per node (out-degree)
let queue;        // FIFO of eligible node ids (recorded eligibility order)
let placed;       // ordered list of placed node ids
let placedSet;    // Set of placed ids for quick lookup
let stepCount;    // how many nodes placed so far

function computeInitialEligible() {
    remaining = {};
    nodeData.forEach(n => { remaining[n.id] = prereqsOf[n.id].length; });
    queue = [];
    // Seed with foundational nodes (no prerequisites), in declaration order.
    nodeData.forEach(n => { if (remaining[n.id] === 0) queue.push(n.id); });
    placed = [];
    placedSet = new Set();
    stepCount = 0;
}

// ---------------------------------------------------------------------------
// Network setup
// ---------------------------------------------------------------------------
function buildNodes() {
    return nodeData.map(n => ({
        id: n.id,
        label: n.label,
        x: n.x,
        y: n.y,
        fixed: { x: true, y: true },
        color: {
            background: COLORS.gray.background,
            border: COLORS.gray.border,
            highlight: { background: COLORS.gray.background, border: COLORS.gray.border }
        },
        font: { color: COLORS.gray.font, size: 15, face: 'Arial', multi: false }
    }));
}

function buildEdges() {
    return edgeData.map((e, i) => ({
        id: 'e' + i,
        from: e.from,
        to: e.to,
        color: { color: '#607d8b', highlight: '#607d8b' },
        width: 2
    }));
}

function setNodeState(id, state) {
    const c = COLORS[state];
    nodes.update({
        id: id,
        color: {
            background: c.background,
            border: c.border,
            highlight: { background: c.background, border: c.border }
        },
        font: { color: c.font, size: 15, face: 'Arial' }
    });
}

function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

function fitGraphToLeft() {
    // Position the graph so it fills the area LEFT of the right panel without
    // being overlapped. On narrow viewports (<700px) the panel stacks BELOW the
    // graph (see the CSS media query), so the full width is usable.
    const container = document.getElementById('network');
    const w = container.clientWidth || 700;
    const h = container.clientHeight || 480;
    const stacked = w < 700;
    const rightReserve = stacked ? 0 : 250; // px the panel occupies on the right
    const pad = 44;                          // px margin around the graph
    const usableW = Math.max(220, w - rightReserve - pad);
    const usableH = Math.max(180, h - pad);

    // Graph bounding box in canvas coordinates (fixed node positions + box size).
    const xs = nodeData.map(n => n.x);
    const ys = nodeData.map(n => n.y);
    const minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
    const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    const gW = (maxX - minX) + 120;
    const gH = (maxY - minY) + 80;
    const gCx = (maxX + minX) / 2;
    const gCy = (maxY + minY) / 2;

    // Scale so the whole graph fits inside the usable region (never upscale past 1).
    const scale = Math.min(usableW / gW, usableH / gH, 1.0);

    // We want the graph center to sit at the usable-region center, not the full
    // canvas center. That means the CAMERA looks at a point to the RIGHT of the
    // graph center by half the reserved width (in canvas units at this scale).
    // Camera-right => diagram-left, which clears the right panel.
    const shiftCanvas = (rightReserve / 2) / scale; // px -> canvas units
    network.moveTo({
        scale: scale,
        position: { x: gCx + shiftCanvas, y: gCy },
        animation: false
    });
}

function setupViewPosition() {
    network.once('afterDrawing', function () {
        fitGraphToLeft();
    });
    // Re-fit if the iframe is resized.
    window.addEventListener('resize', function () {
        if (network) fitGraphToLeft();
    });
}

function initializeNetwork() {
    computeInitialEligible();

    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());

    // Color the initial eligible (foundational) nodes gold.
    queue.forEach(id => setNodeState(id, 'gold'));

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
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
            shape: 'box',
            margin: 10,
            widthConstraint: { minimum: 78, maximum: 100 },
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.0 } },
            width: 2,
            smooth: { enabled: true, type: 'curvedCW', roundness: 0.12 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
    window.__network = network; // exposed for debugging/verification only
    setupViewPosition();

    updateUI(null);
}

// ---------------------------------------------------------------------------
// One placement step
// ---------------------------------------------------------------------------
function nextStep() {
    if (stepCount >= TOTAL_STEPS || queue.length === 0) return;

    // Dequeue the next eligible node and place it.
    const id = queue.shift();
    placed.push(id);
    placedSet.add(id);
    stepCount++;
    setNodeState(id, 'green');

    // Unblock dependents: decrement their remaining-prerequisite count.
    const newlyEligible = [];
    dependentsOf[id].forEach(dep => {
        remaining[dep] -= 1;
        if (remaining[dep] === 0 && !placedSet.has(dep) && queue.indexOf(dep) === -1) {
            queue.push(dep);
            newlyEligible.push(dep);
            setNodeState(dep, 'gold');
        }
    });

    updateUI({ placedId: id, newlyEligible: newlyEligible });
}

// ---------------------------------------------------------------------------
// UI refresh
// ---------------------------------------------------------------------------
function updateUI(info) {
    // Step counter
    document.getElementById('step-counter').textContent =
        'Step ' + stepCount + ' / ' + TOTAL_STEPS;

    // Output Order list (explicit numbered sequence)
    const outEl = document.getElementById('output-list');
    outEl.innerHTML = '';
    if (placed.length === 0) {
        const li = document.createElement('li');
        li.className = 'empty-note';
        li.innerHTML = 'Empty &mdash; click “Next Step”';
        outEl.appendChild(li);
    } else {
        placed.forEach(id => {
            const li = document.createElement('li');
            li.textContent = labelById[id];
            outEl.appendChild(li);
        });
    }

    // Eligible Now list
    const eligEl = document.getElementById('eligible-list');
    eligEl.innerHTML = '';
    if (queue.length === 0) {
        const li = document.createElement('li');
        li.className = 'none-note';
        li.textContent = (stepCount >= TOTAL_STEPS) ? 'none — all placed' : 'none';
        eligEl.appendChild(li);
    } else {
        queue.forEach(id => {
            const li = document.createElement('li');
            li.textContent = labelById[id];
            eligEl.appendChild(li);
        });
    }

    // Explanation text
    const statusEl = document.getElementById('status-text');
    if (info === null) {
        statusEl.innerHTML = 'Two foundational concepts, <b>Arithmetic</b> and ' +
            '<b>Number Sense</b>, have no prerequisites, so they are eligible to be ' +
            'placed first. Click “Next Step” to begin.';
    } else if (stepCount >= TOTAL_STEPS) {
        statusEl.innerHTML = '<b>Step ' + stepCount + ':</b> ' + labelById[info.placedId] +
            ' is placed last. All seven concepts are now ordered.' +
            '<span class="caption">This is one of several valid topological orders ' +
            'for this graph &mdash; any order that never places a concept before its ' +
            'prerequisites is correct.</span>';
    } else {
        let msg = '<b>Step ' + stepCount + ':</b> ' + labelById[info.placedId] +
            ' is placed because all of its prerequisites are already in the output order.';
        if (info.newlyEligible.length > 0) {
            const parts = info.newlyEligible.map(function (depId) {
                const pre = prereqsOf[depId].map(p => labelById[p]).join(', ');
                return '<b>' + labelById[depId] + '</b> (needs ' + pre + ')';
            });
            msg += ' This makes ' + parts.join(' and ') +
                (parts.length === 1 ? ' eligible now.' : ' eligible now.');
        } else {
            msg += ' No new concept becomes eligible this step.';
        }
        statusEl.innerHTML = msg;
    }

    // Disable Next when finished
    document.getElementById('next-btn').disabled = (stepCount >= TOTAL_STEPS);
}

function reset() {
    if (network) network.destroy();
    initializeNetwork();
}

// ---------------------------------------------------------------------------
// Wire up
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('reset-btn').addEventListener('click', reset);
});
