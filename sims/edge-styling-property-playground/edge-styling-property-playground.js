// Edge Styling Property Playground
// CANVAS_HEIGHT: 580
// Bloom L3 (Apply): construct a fully styled edge from a control panel and
// match each visual change to its corresponding JSON property.
//
// One large STYLED sample edge (Dependent Concept -> Prerequisite Concept)
// plus two smaller UNSTYLED comparison edges for scale. Every control change
// calls edges.update() on the sample edge and refreshes a live JSON preview
// built with JSON.stringify(edges.get(sampleEdgeId), null, 2).

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

const SAMPLE_EDGE_ID = 'sample';

let nodes, edges, network;

// ---------------------------------------------------------------------------
// Read every control and assemble the sample edge's style object.
// The object we build IS the edge JSON the learner sees, so we only include
// properties that are actually active (e.g. omit dashes pattern when off).
// ---------------------------------------------------------------------------
function readControls() {
    const label = document.getElementById('edge-label').value;
    const color = document.getElementById('edge-color').value;
    const width = parseInt(document.getElementById('edge-width').value, 10);
    const dashesOn = document.getElementById('edge-dashes').checked;
    const dashPattern = document.getElementById('dash-pattern').value.trim();
    const smoothMode = document.getElementById('edge-smooth').value;
    const roundness = parseFloat(document.getElementById('edge-roundness').value);
    const arrowEnd = document.getElementById('arrow-end').value;
    const arrowType = document.getElementById('arrow-type').value;
    const fontColor = document.getElementById('font-color').value;
    const fontSize = parseInt(document.getElementById('font-size').value, 10);
    const fontAlign = document.getElementById('font-align').value;

    // --- dashes ---
    // vis-network: dashes = true, false, or an array like [8,4].
    let dashes = false;
    if (dashesOn) {
        const parts = dashPattern
            .split(',')
            .map(function (s) { return parseInt(s.trim(), 10); })
            .filter(function (n) { return !isNaN(n) && n > 0; });
        dashes = parts.length > 0 ? parts : true;
    }

    // --- arrows ---
    const arrows = {};
    if (arrowEnd === 'to') {
        arrows.to = { enabled: true, type: arrowType };
    } else if (arrowEnd === 'from') {
        arrows.from = { enabled: true, type: arrowType };
    } else if (arrowEnd === 'toandfrom') {
        arrows.to = { enabled: true, type: arrowType };
        arrows.from = { enabled: true, type: arrowType };
    } else if (arrowEnd === 'middle') {
        arrows.middle = { enabled: true, type: arrowType };
    }

    // --- smoothing ---
    let smooth;
    if (smoothMode === 'off') {
        smooth = { enabled: false };
    } else if (smoothMode === 'dynamic') {
        smooth = { enabled: true, type: 'dynamic', roundness: roundness };
    } else {
        smooth = { enabled: true, type: 'cubicBezier', roundness: roundness };
    }

    // Assemble the edge object (keep from/to so the JSON is a valid edge record)
    const edgeObj = {
        id: SAMPLE_EDGE_ID,
        from: 1,
        to: 2,
        label: label,
        color: { color: color },
        width: width,
        dashes: dashes,
        smooth: smooth,
        arrows: arrows,
        font: { color: fontColor, size: fontSize, align: fontAlign }
    };

    return edgeObj;
}

// ---------------------------------------------------------------------------
// Apply the current controls to the sample edge and refresh the JSON preview
// ---------------------------------------------------------------------------
function applyStyle() {
    const edgeObj = readControls();
    edges.update(edgeObj);
    refreshJson();
    updateControlEnabled();
}

function refreshJson() {
    // Exactly as the spec requires: stringify the live DataSet entry.
    const current = edges.get(SAMPLE_EDGE_ID);
    document.getElementById('json-preview').textContent =
        JSON.stringify(current, null, 2);
}

// ---------------------------------------------------------------------------
// Enable/disable controls that don't apply to the current settings
// ---------------------------------------------------------------------------
function updateControlEnabled() {
    // Roundness only applies when a curved smoothing mode is selected
    const smoothMode = document.getElementById('edge-smooth').value;
    const roundnessCtl = document.getElementById('roundness-ctl');
    const roundnessSlider = document.getElementById('edge-roundness');
    const curved = smoothMode !== 'off';
    roundnessCtl.classList.toggle('disabled', !curved);
    roundnessSlider.disabled = !curved;
    roundnessCtl.title = curved
        ? ''
        : 'Roundness applies only when Smoothing is Dynamic or Cubic Bezier.';

    // Dash pattern only applies when Dashes is checked
    const dashesOn = document.getElementById('edge-dashes').checked;
    const dashWrap = document.getElementById('dash-pattern-wrap');
    const dashInput = document.getElementById('dash-pattern');
    dashWrap.classList.toggle('disabled', !dashesOn);
    dashInput.disabled = !dashesOn;
    dashWrap.title = dashesOn
        ? ''
        : 'The dash pattern applies only when Dashes is enabled.';
}

// ---------------------------------------------------------------------------
// Initialize the network with the sample nodes + edges
// ---------------------------------------------------------------------------
function initializeNetwork() {
    // Two labeled sample nodes for the styled edge
    const nodeList = [
        { id: 1, label: 'Dependent\nConcept',   x: -160, y: -120, fixed: { x: true, y: true } },
        { id: 2, label: 'Prerequisite\nConcept', x: 160,  y: -120, fixed: { x: true, y: true } },
        // Small nodes for the two unstyled comparison edges (scale reference)
        { id: 3, label: 'A', x: -170, y: 130, fixed: { x: true, y: true } },
        { id: 4, label: 'B', x: -30,  y: 130, fixed: { x: true, y: true } },
        { id: 5, label: 'C', x: 110,  y: 130, fixed: { x: true, y: true } },
        { id: 6, label: 'D', x: 250,  y: 130, fixed: { x: true, y: true } }
    ];

    const edgeList = [
        // The one large styled sample edge (defaults per spec)
        {
            id: SAMPLE_EDGE_ID,
            from: 1,
            to: 2,
            label: 'requires',
            color: { color: '#808080' },
            width: 1,
            dashes: false,
            smooth: { enabled: true, type: 'dynamic', roundness: 0.5 },
            arrows: { to: { enabled: true, type: 'arrow' } },
            font: { color: '#343434', size: 12, align: 'middle' }
        },
        // Two smaller unstyled comparison edges
        { id: 'cmp1', from: 3, to: 4, color: { color: '#b0bdca' }, width: 1 },
        { id: 'cmp2', from: 5, to: 6, color: { color: '#b0bdca' }, width: 1 }
    ];

    nodes = new vis.DataSet(nodeList);
    edges = new vis.DataSet(edgeList);

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
            shape: 'box',
            color: {
                background: '#a7d3f2',
                border: '#2f6fb0'
            },
            font: { size: 14, color: '#000000', face: 'Arial', multi: true },
            borderWidth: 2,
            margin: 10
        },
        edges: {
            // Per-edge properties (set on the sample edge) override these.
            arrows: { to: { enabled: true } },
            width: 1
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Bias the graph left to clear the right control panel
    network.once('afterDrawing', function () {
        const pos = network.getViewPosition();
        network.moveTo({
            position: { x: pos.x + 120, y: pos.y },
            animation: false
        });
    });
}

// ---------------------------------------------------------------------------
// Wire up every control to applyStyle()
// ---------------------------------------------------------------------------
function wireControls() {
    // Live text label + numeric readouts
    document.getElementById('edge-label').addEventListener('input', applyStyle);

    const widthSlider = document.getElementById('edge-width');
    widthSlider.addEventListener('input', function () {
        document.getElementById('width-val').textContent = widthSlider.value;
        applyStyle();
    });

    document.getElementById('edge-color').addEventListener('input', applyStyle);

    document.getElementById('edge-dashes').addEventListener('change', applyStyle);
    document.getElementById('dash-pattern').addEventListener('input', applyStyle);

    document.getElementById('edge-smooth').addEventListener('change', applyStyle);

    const roundnessSlider = document.getElementById('edge-roundness');
    roundnessSlider.addEventListener('input', function () {
        document.getElementById('roundness-val').textContent =
            parseFloat(roundnessSlider.value).toFixed(2);
        applyStyle();
    });

    document.getElementById('arrow-end').addEventListener('change', applyStyle);
    document.getElementById('arrow-type').addEventListener('change', applyStyle);
    document.getElementById('font-color').addEventListener('input', applyStyle);

    const fontSizeSlider = document.getElementById('font-size');
    fontSizeSlider.addEventListener('input', function () {
        document.getElementById('font-size-val').textContent = fontSizeSlider.value;
        applyStyle();
    });

    document.getElementById('font-align').addEventListener('change', applyStyle);
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    wireControls();
    updateControlEnabled();
    refreshJson();

    window.addEventListener('resize', function () {
        if (network) {
            network.redraw();
        }
    });
});
