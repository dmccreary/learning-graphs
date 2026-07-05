// Edge Smoothing and Curve Type Explorer
// CANVAS_HEIGHT: 560
// Bloom L4 (Analyze): differentiate straight vs. smoothed edges and examine
// when cubic Bezier with a forced direction improves readability.
//
// A 10-node prerequisite graph with a deliberately-placed RED "problem edge"
// (1 -> 7) that runs straight through an unrelated node (4). Learners switch
// smoothing modes and watch whether edges cross nodes or bow cleanly around
// them. Fixed positions (physics off) so only the EDGE PATHS change.

// ---------------------------------------------------------------------------
// Environment detection
// ---------------------------------------------------------------------------
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ---------------------------------------------------------------------------
// Node + edge data. Nodes 1, 4, 7 are intentionally collinear (same x) so the
// straight problem edge 1 -> 7 visibly passes THROUGH node 4.
// ---------------------------------------------------------------------------
const nodeData = [
    { id: 1, label: 'Sets',            x: -260, y: -180 },
    { id: 2, label: 'Logic',           x: -60,  y: -190 },
    { id: 3, label: 'Functions',       x: 150,  y: -170 },
    { id: 4, label: 'Relations',       x: -260, y: 0    }, // sits on the 1->7 line
    { id: 5, label: 'Graphs',          x: -40,  y: 10   },
    { id: 6, label: 'Trees',           x: 170,  y: 0    },
    { id: 7, label: 'DAGs',            x: -260, y: 180  }, // collinear with 1 & 4
    { id: 8, label: 'Topological Sort',x: -30,  y: 190  },
    { id: 9, label: 'Dependencies',    x: 180,  y: 175  },
    { id: 10,label: 'Learning Graph',  x: 380,  y: 5    }
];

// Regular prerequisite edges (several overlap / route near intermediate nodes)
const edgeData = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 1, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 3, to: 6 },
    { from: 4, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 6, to: 10 },
    { from: 9, to: 10 },
    { from: 2, to: 5 },
    { from: 5, to: 8 }
];

// The problem edge: skips node 4 and, when straight, cuts right through it.
const PROBLEM_EDGE_ID = 'problem';

let nodes, edges, network;

// Current smoothing configuration
const state = {
    mode: 'off',          // 'off' | 'dynamic' | 'cubicBezier'
    roundness: 0.5,
    forceDirection: 'none'
};

// ---------------------------------------------------------------------------
// Build the vis smooth-options object for the current state
// ---------------------------------------------------------------------------
function buildSmoothOptions() {
    if (state.mode === 'off') {
        return { enabled: false };
    }
    if (state.mode === 'dynamic') {
        return { enabled: true, type: 'dynamic', roundness: state.roundness };
    }
    // cubicBezier
    return {
        enabled: true,
        type: 'cubicBezier',
        forceDirection: state.forceDirection,
        roundness: state.roundness
    };
}

// ---------------------------------------------------------------------------
// Apply smoothing live to the whole graph
// ---------------------------------------------------------------------------
function applySmoothing() {
    network.setOptions({ edges: { smooth: buildSmoothOptions() } });
    updateControlEnabled();
    updateCaption();
}

// ---------------------------------------------------------------------------
// Caption: one sentence describing what the current mode does
// ---------------------------------------------------------------------------
function updateCaption() {
    const caption = document.getElementById('caption');
    let text;

    if (state.mode === 'off') {
        text = 'Straight edges: the red problem edge runs directly through the "Relations" node, ' +
               'making it look like a connection that does not exist.';
    } else if (state.mode === 'dynamic') {
        text = 'Dynamic smoothing (the vis-network default) gently curves each edge with roundness ' +
               state.roundness.toFixed(2) +
               ', nudging the red edge off the node but curving all edges in a single shared direction.';
    } else {
        // cubicBezier
        if (state.forceDirection === 'none') {
            text = 'Cubic Bezier with no forced direction bends each edge by roundness ' +
                   state.roundness.toFixed(2) +
                   ', chosen per-edge from its endpoints.';
        } else {
            text = 'Cubic Bezier with ' + state.forceDirection + ' force direction bows every edge outward ' +
                   'along the ' + state.forceDirection + ' axis (roundness ' + state.roundness.toFixed(2) +
                   ') instead of letting the red edge cross other nodes.';
        }
    }
    caption.textContent = text;
}

// ---------------------------------------------------------------------------
// Enable/disable controls that don't apply to the current mode
// ---------------------------------------------------------------------------
function updateControlEnabled() {
    const roundnessGroup = document.getElementById('roundness-group');
    const forceGroup = document.getElementById('force-group');
    const slider = document.getElementById('roundness-slider');
    const select = document.getElementById('force-select');

    // Roundness only applies to a curved mode
    const curved = state.mode !== 'off';
    roundnessGroup.classList.toggle('disabled', !curved);
    slider.disabled = !curved;
    roundnessGroup.title = curved ? '' : 'Roundness applies only when a curved smoothing mode is selected.';

    // Force direction only applies to Cubic Bezier
    const isBezier = state.mode === 'cubicBezier';
    forceGroup.classList.toggle('disabled', !isBezier);
    select.disabled = !isBezier;
    forceGroup.title = isBezier ? '' : 'Force Direction applies only to the Cubic Bezier smoothing mode.';
}

// ---------------------------------------------------------------------------
// Initialize the network
// ---------------------------------------------------------------------------
function initializeNetwork() {
    // Chapter 11 convention: light blue circles, black text
    const visNodes = nodeData.map(function (n) {
        return {
            id: n.id,
            label: n.label,
            x: n.x,
            y: n.y,
            fixed: { x: true, y: true }
        };
    });

    const visEdges = edgeData.map(function (e, i) {
        return { id: 'e' + i, from: e.from, to: e.to, color: { color: '#6b7c8d' } };
    });

    // Add the highlighted problem edge (red), skipping node 4
    visEdges.push({
        id: PROBLEM_EDGE_ID,
        from: 1,
        to: 7,
        color: { color: '#e53935', highlight: '#e53935' },
        width: 3,
        label: 'problem edge'
    });

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            zoomView: enableMouse,
            dragView: enableMouse,
            navigationButtons: true,
            selectConnectedEdges: false,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'circle',
            color: {
                background: '#a7d3f2',
                border: '#2f6fb0',
                highlight: { background: '#c3e2fa', border: '#1f5c9e' }
            },
            font: { size: 13, color: '#000000', face: 'Arial' },
            borderWidth: 2,
            widthConstraint: { minimum: 40, maximum: 90 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            width: 2,
            color: { color: '#6b7c8d' },
            font: { size: 11, color: '#b71c1c', strokeWidth: 3, strokeColor: '#ffffff', align: 'top' },
            smooth: buildSmoothOptions()
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Center the graph, biased left to clear the right control panel
    network.once('afterDrawing', function () {
        const pos = network.getViewPosition();
        network.moveTo({
            position: { x: pos.x + 70, y: pos.y },
            animation: false
        });
    });
}

// ---------------------------------------------------------------------------
// Wire up controls
// ---------------------------------------------------------------------------
function wireControls() {
    // Smoothing mode radios
    document.querySelectorAll('input[name="smoothMode"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                state.mode = radio.value;
                applySmoothing();
            }
        });
    });

    // Roundness slider
    const slider = document.getElementById('roundness-slider');
    const roundnessValue = document.getElementById('roundness-value');
    slider.addEventListener('input', function () {
        state.roundness = parseFloat(slider.value);
        roundnessValue.textContent = state.roundness.toFixed(2);
        applySmoothing();
    });

    // Force direction dropdown
    const select = document.getElementById('force-select');
    select.addEventListener('change', function () {
        state.forceDirection = select.value;
        applySmoothing();
    });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    wireControls();
    updateControlEnabled();
    updateCaption();

    window.addEventListener('resize', function () {
        if (network) {
            network.redraw();
        }
    });
});
