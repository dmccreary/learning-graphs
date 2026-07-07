// Force-Directed Layout Explorer
// Educational vis-network MicroSim: manipulate barnesHut physics and
// watch how repulsion and spring forces reshape a force-directed graph.
// CANVAS_HEIGHT: 540
//
// This sim is ABOUT physics, so physics stays enabled and the graph is
// allowed to settle. Slider changes call network.setOptions() with new
// barnesHut parameters and briefly re-run the simulation.

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
// SAMPLE GRAPH (14 concepts from Chapter 11:
// Vis.js Fundamentals and Node Styling)
// ===========================================
const nodeData = [
    { id: 1,  label: 'Vis.js' },
    { id: 2,  label: 'Vis-Network\nLibrary' },
    { id: 3,  label: 'DataSet' },
    { id: 4,  label: 'Network\nContainer' },
    { id: 5,  label: 'Network\nInitialization' },
    { id: 6,  label: 'JSON Data\nFormat' },
    { id: 7,  label: 'Force-Directed\nGraph' },
    { id: 8,  label: 'Node' },
    { id: 9,  label: 'Edge' },
    { id: 10, label: 'Node Styling' },
    { id: 11, label: 'Node Shape' },
    { id: 12, label: 'Node Color' },
    { id: 13, label: 'Node Label' },
    { id: 14, label: 'Physics\nOptions' }
];

// Directed dependency edges: arrowhead points to the prerequisite.
const edgeData = [
    { from: 2,  to: 1 },   // Vis-Network Library depends on Vis.js
    { from: 3,  to: 2 },   // DataSet depends on Vis-Network Library
    { from: 4,  to: 2 },   // Network Container depends on Vis-Network Library
    { from: 5,  to: 3 },   // Network Initialization depends on DataSet
    { from: 5,  to: 4 },   // Network Initialization depends on Network Container
    { from: 3,  to: 6 },   // DataSet depends on JSON Data Format
    { from: 7,  to: 5 },   // Force-Directed Graph depends on Network Initialization
    { from: 8,  to: 3 },   // Node depends on DataSet
    { from: 9,  to: 3 },   // Edge depends on DataSet
    { from: 10, to: 8 },   // Node Styling depends on Node
    { from: 11, to: 10 },  // Node Shape depends on Node Styling
    { from: 12, to: 10 },  // Node Color depends on Node Styling
    { from: 13, to: 10 },  // Node Label depends on Node Styling
    { from: 14, to: 7 }    // Physics Options depends on Force-Directed Graph
];

// ===========================================
// DEFAULT PHYSICS PARAMETERS
// ===========================================
const DEFAULTS = {
    repulsion: -8000,      // barnesHut.gravitationalConstant
    springLength: 150,     // barnesHut.springLength
    springStrength: 0.08   // barnesHut.springConstant
};

let params = { ...DEFAULTS };
let nodes, edges, network;
let resettleTimer = null;

// ===========================================
// PHYSICS OPTIONS BUILDER
// ===========================================
function buildPhysicsOptions() {
    return {
        physics: {
            enabled: true,
            solver: 'barnesHut',
            barnesHut: {
                gravitationalConstant: params.repulsion,
                springLength: params.springLength,
                springConstant: params.springStrength,
                centralGravity: 0.3,
                damping: 0.09,
                avoidOverlap: 0.1
            },
            stabilization: {
                enabled: true,
                iterations: 300,
                updateInterval: 25,
                fit: true
            }
        }
    };
}

// ===========================================
// SETTLING INDICATOR
// ===========================================
function showSettling() {
    const el = document.getElementById('settling-indicator');
    if (el) el.classList.add('active');
}

function hideSettling() {
    const el = document.getElementById('settling-indicator');
    if (el) el.classList.remove('active');
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    const visNodes = nodeData.map(n => ({
        id: n.id,
        label: n.label
    }));

    const visEdges = edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const enableMouse = !isInIframe();

    const options = {
        layout: {
            improvedLayout: true,
            randomSeed: 7   // deterministic starting layout
        },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: true,      // learners may drag nodes to probe forces
            navigationButtons: true,
            keyboard: {
                enabled: enableMouse,
                bindToWindow: false
            }
        },
        nodes: {
            shape: 'circle',
            size: 22,
            margin: 8,
            widthConstraint: { minimum: 44, maximum: 90 },
            color: {
                background: '#97c2fc',
                border: '#2b7ce9',
                highlight: { background: '#cfe3fb', border: '#2b7ce9' }
            },
            font: { size: 12, face: 'Arial', color: '#000000' },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            color: { color: '#848484', highlight: '#5a5a5a' },
            width: 1.5,
            smooth: { enabled: true, type: 'dynamic' }
        },
        ...buildPhysicsOptions()
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    showSettling();

    // When the graph stops moving, hide the spinner. We keep physics
    // enabled (this sim is about physics) but the spinner tracks activity.
    network.on('stabilizationIterationsDone', function () {
        hideSettling();
    });
    network.on('stabilized', function () {
        hideSettling();
    });
}

// ===========================================
// RE-SETTLE: nudge the simulation from current positions
// ===========================================
function resettle() {
    if (!network) return;
    showSettling();
    // Re-apply current physics so the engine restarts from where nodes are.
    network.setOptions(buildPhysicsOptions());
    network.startSimulation();
    scheduleSettleStop();
}

// Safety: physics can run long with extreme parameters. Stop the visible
// spinner after a bounded window so it never spins forever.
function scheduleSettleStop() {
    if (resettleTimer) clearTimeout(resettleTimer);
    resettleTimer = setTimeout(function () {
        hideSettling();
    }, 4000);
}

// ===========================================
// SLIDER HANDLING
// ===========================================
function applyPhysicsLive() {
    if (!network) return;
    showSettling();
    network.setOptions(buildPhysicsOptions());
    // Briefly re-run so the change is visible, then let it settle.
    network.startSimulation();
    scheduleSettleStop();
}

function setInfobox(text) {
    const el = document.getElementById('infobox-text');
    if (el) el.textContent = text;
}

function bindSlider(id, key, formatFn, messageFn) {
    const slider = document.getElementById(id);
    const valEl = document.getElementById(id + '-val');
    slider.addEventListener('input', function () {
        const raw = parseFloat(slider.value);
        params[key] = raw;
        valEl.textContent = formatFn(raw);
        setInfobox(messageFn(raw));
        applyPhysicsLive();
    });
}

// ===========================================
// RESET TO DEFAULTS
// ===========================================
function resetToDefaults() {
    params = { ...DEFAULTS };

    const rep = document.getElementById('repulsion');
    const sl = document.getElementById('springLength');
    const ss = document.getElementById('springStrength');
    rep.value = DEFAULTS.repulsion;
    sl.value = DEFAULTS.springLength;
    ss.value = DEFAULTS.springStrength;
    document.getElementById('repulsion-val').textContent = DEFAULTS.repulsion;
    document.getElementById('springLength-val').textContent = DEFAULTS.springLength;
    document.getElementById('springStrength-val').textContent = DEFAULTS.springStrength.toFixed(2);

    setInfobox('Physics reset to default values. The graph re-settles into its balanced resting shape.');
    applyPhysicsLive();
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    bindSlider(
        'repulsion', 'repulsion',
        v => String(Math.round(v)),
        v => (v <= -8000)
            ? 'Higher repulsion pushes nodes further apart, spreading the graph out.'
            : 'Lower repulsion lets nodes drift closer together, tightening the graph.'
    );

    bindSlider(
        'springLength', 'springLength',
        v => String(Math.round(v)),
        v => (v >= 150)
            ? 'A longer spring length sets a wider natural distance between connected nodes.'
            : 'A shorter spring length pulls connected nodes into a more compact cluster.'
    );

    bindSlider(
        'springStrength', 'springStrength',
        v => v.toFixed(2),
        v => (v >= 0.08)
            ? 'Stronger springs pull connected nodes together more firmly, tightening edges.'
            : 'Weaker springs loosen the pull between connected nodes, relaxing edge length.'
    );

    document.getElementById('resettle-btn').addEventListener('click', function () {
        setInfobox('Re-settling the simulation from the current node positions.');
        resettle();
    });

    document.getElementById('reset-btn').addEventListener('click', resetToDefaults);

    // Reflow on window resize so the layout stays centered.
    window.addEventListener('resize', function () {
        if (network) network.redraw();
    });
});
