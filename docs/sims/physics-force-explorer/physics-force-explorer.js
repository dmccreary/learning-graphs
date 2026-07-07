// Physics Force Explorer
// Educational vis-network visualization
// CANVAS_HEIGHT: 580
//
// This sim is ABOUT the physics simulation itself. Learners change the solver,
// the gravitational/repulsion constant, and central gravity, then watch the
// SAME 18-node graph re-settle so they can compare how each force shapes the
// layout. Physics stays ENABLED the whole time (unlike most MicroSims, which
// freeze the layout after first stabilization).

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
// SAMPLE GRAPH (18 nodes, 22 edges, two hubs)
// Degrees drive node color/size:
//   hub  = degree >= 5, mid = degree 2-4, leaf = degree 1
// ===========================================
const nodeIds = [
    'Core',        // hub A
    'Systems',     // hub B
    'Data', 'Logic', 'Memory', 'Search', 'Graph',
    'Sort', 'Cache', 'Queue', 'Stack', 'Tree',
    'Hash', 'Path', 'Flow', 'Node', 'Edge', 'Leaf'
];

// 22 undirected-feeling dependency edges. Two clear hubs: Core and Systems.
const edgePairs = [
    ['Core', 'Data'],
    ['Core', 'Logic'],
    ['Core', 'Memory'],
    ['Core', 'Search'],
    ['Core', 'Graph'],
    ['Core', 'Systems'],
    ['Systems', 'Sort'],
    ['Systems', 'Cache'],
    ['Systems', 'Queue'],
    ['Systems', 'Stack'],
    ['Systems', 'Tree'],
    ['Data', 'Hash'],
    ['Logic', 'Path'],
    ['Memory', 'Flow'],
    ['Graph', 'Node'],
    ['Graph', 'Edge'],
    ['Tree', 'Leaf'],
    ['Search', 'Path'],
    ['Queue', 'Flow'],
    ['Sort', 'Hash'],
    ['Stack', 'Node'],
    ['Cache', 'Edge']
];

// ===========================================
// DEFAULT PARAMETERS (from spec)
// ===========================================
const DEFAULTS = {
    solver: 'barnesHut',
    gravity: -2000,
    central: 0.3
};

// Per-solver slider configuration. The gravity slider's meaning, range and
// scale adapt to the selected solver.
const SOLVER_CONFIG = {
    barnesHut: {
        label: 'Gravitational Constant',
        min: -10000, max: -100, step: 100, def: -2000
    },
    forceAtlas2Based: {
        label: 'Gravitational Constant',
        min: -500, max: -10, step: 10, def: -100
    },
    repulsion: {
        label: 'Node Repulsion',
        min: 50, max: 600, step: 10, def: 200
    }
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let current = { solver: DEFAULTS.solver, gravity: DEFAULTS.gravity, central: DEFAULTS.central };
let degree = {};

function computeDegrees() {
    degree = {};
    nodeIds.forEach(id => { degree[id] = 0; });
    edgePairs.forEach(([a, b]) => {
        degree[a] = (degree[a] || 0) + 1;
        degree[b] = (degree[b] || 0) + 1;
    });
}

function styleForDegree(d) {
    if (d >= 5) return { background: '#1565c0', border: '#0d47a1', font: '#ffffff', size: 26 };
    if (d >= 2) return { background: '#42a5f5', border: '#1976d2', font: '#ffffff', size: 18 };
    return { background: '#bbdefb', border: '#64b5f6', font: '#0d47a1', size: 13 };
}

// ===========================================
// PHYSICS OPTIONS BUILDER
// ===========================================
function buildPhysicsOptions() {
    const base = {
        enabled: true,
        stabilization: { enabled: true, iterations: 300, fit: true }
    };
    base.solver = current.solver;

    if (current.solver === 'barnesHut') {
        base.barnesHut = {
            gravitationalConstant: current.gravity,
            centralGravity: current.central,
            springLength: 110,
            springConstant: 0.05,
            damping: 0.09,
            avoidOverlap: 0.1
        };
    } else if (current.solver === 'forceAtlas2Based') {
        base.forceAtlas2Based = {
            gravitationalConstant: current.gravity,
            centralGravity: current.central,
            springLength: 110,
            springConstant: 0.08,
            damping: 0.4,
            avoidOverlap: 0.2
        };
    } else { // repulsion
        base.repulsion = {
            nodeDistance: current.gravity, // positive distance for this solver
            centralGravity: current.central,
            springLength: 110,
            springConstant: 0.05,
            damping: 0.09
        };
    }
    return base;
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    computeDegrees();

    const enableMouse = !isInIframe();

    const visNodes = nodeIds.map(id => {
        const s = styleForDegree(degree[id]);
        return {
            id: id,
            label: id,
            shape: 'dot',
            size: s.size,
            color: { background: s.background, border: s.border },
            font: { color: s.font, size: 13 }
        };
    });

    const visEdges = edgePairs.map((p, i) => ({
        id: 'e' + i,
        from: p[0],
        to: p[1]
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const options = {
        layout: { improvedLayout: false },
        physics: buildPhysicsOptions(),
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: enableMouse,
            dragView: enableMouse,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            color: { color: '#90a4ae', highlight: '#546e7a' },
            width: 1.5,
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Live settled indicator: physics stays enabled, so we track motion.
    network.on('startStabilizing', function () { setSettled(false); });
    network.on('stabilized', function () { setSettled(true); });
}

// ===========================================
// SETTLED INDICATOR
// ===========================================
function setSettled(isSettled) {
    const box = document.getElementById('settled-box');
    const text = document.getElementById('settled-text');
    if (isSettled) {
        box.classList.remove('is-moving');
        box.classList.add('is-settled');
        text.textContent = 'Settled';
    } else {
        box.classList.remove('is-settled');
        box.classList.add('is-moving');
        text.textContent = 'Settling…';
    }
}

// ===========================================
// APPLY CURRENT PARAMETERS + RE-STABILIZE
// ===========================================
function applyPhysics() {
    setSettled(false);
    network.setOptions({ physics: buildPhysicsOptions() });
    network.stabilize();
}

// ===========================================
// UI: sync the gravity slider to the selected solver
// ===========================================
function syncSolverUI(keepValueIfPossible) {
    const cfg = SOLVER_CONFIG[current.solver];
    const slider = document.getElementById('gravity-slider');
    const nameEl = document.getElementById('gravity-name');

    slider.min = cfg.min;
    slider.max = cfg.max;
    slider.step = cfg.step;

    // Choose a value: keep the existing one if it fits the new range, else default
    let val = keepValueIfPossible ? current.gravity : cfg.def;
    if (val < cfg.min || val > cfg.max) val = cfg.def;
    current.gravity = val;
    slider.value = val;

    nameEl.textContent = cfg.label;
    document.getElementById('gravity-value').textContent = val;
}

function updateGravityReadout() {
    document.getElementById('gravity-value').textContent = current.gravity;
}

function updateCentralReadout() {
    document.getElementById('central-value').textContent = current.central.toFixed(2);
}

// ===========================================
// EVENT HANDLERS
// ===========================================
function onSolverChange(e) {
    current.solver = e.target.value;
    // Re-scale the gravity slider to the new solver's range/default
    syncSolverUI(false);
    updateGravityReadout();
    applyPhysics();
}

function onGravityInput(e) {
    current.gravity = parseFloat(e.target.value);
    updateGravityReadout();
    applyPhysics();
}

function onCentralInput(e) {
    current.central = parseFloat(e.target.value);
    updateCentralReadout();
    applyPhysics();
}

function scatterNodes() {
    // Randomize starting positions across the canvas, then re-run stabilization
    setSettled(false);
    const updates = nodeIds.map(id => ({
        id: id,
        x: Math.round((Math.random() - 0.5) * 900),
        y: Math.round((Math.random() - 0.5) * 600)
    }));
    nodes.update(updates);
    network.stabilize();
}

function resetDefaults() {
    current = { solver: DEFAULTS.solver, gravity: DEFAULTS.gravity, central: DEFAULTS.central };
    document.getElementById('solver-select').value = current.solver;
    document.getElementById('central-slider').value = current.central;
    syncSolverUI(true);
    updateGravityReadout();
    updateCentralReadout();
    applyPhysics();
}

// ===========================================
// BOOTSTRAP
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    // Initialize readouts / slider ranges to the defaults
    syncSolverUI(true);
    updateGravityReadout();
    updateCentralReadout();

    document.getElementById('solver-select').addEventListener('change', onSolverChange);
    document.getElementById('gravity-slider').addEventListener('input', onGravityInput);
    document.getElementById('central-slider').addEventListener('input', onCentralInput);
    document.getElementById('scatter-btn').addEventListener('click', scatterNodes);
    document.getElementById('reset-btn').addEventListener('click', resetDefaults);

    // Reflow on window resize (canvas is width-responsive)
    window.addEventListener('resize', function () {
        if (network) network.redraw();
    });
});
