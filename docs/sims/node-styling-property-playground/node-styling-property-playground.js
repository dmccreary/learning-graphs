// Node Styling Property Playground
// vis-network MicroSim - Chapter 11: Vis.js Fundamentals and Node Styling
// Bloom Apply (L3): construct a fully styled node; match each visual change to its JSON property.
// CANVAS_HEIGHT: 580

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

// vis-network shapes that honor the `size` property (fixed-size).
// Label-sized shapes (ellipse, circle, box) ignore `size`.
const FIXED_SIZE_SHAPES = new Set([
    'dot', 'star', 'triangle', 'square', 'diamond', 'hexagon', 'icon', 'image'
]);

// FontAwesome unicode code points for the sample icon set
const ICON_LABELS = {
    'f015': 'home', 'f19d': 'graduation-cap', 'f02d': 'book',
    'f0eb': 'lightbulb', 'f0c0': 'users', 'f542': 'project-diagram'
};

const SAMPLE_ID = 1;

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;

// Neighbor nodes give scale reference (unstyled) and stay put.
const neighborNodes = [
    { id: 2, label: 'Neighbor', x: 40, y: -150, shape: 'ellipse', fixed: { x: true, y: true },
      color: { background: '#e8eef5', border: '#9fb3c8' }, font: { color: '#333', size: 13 } },
    { id: 3, label: 'Neighbor', x: 40, y: 150, shape: 'ellipse', fixed: { x: true, y: true },
      color: { background: '#e8eef5', border: '#9fb3c8' }, font: { color: '#333', size: 13 } }
];

// ===========================================
// READ CONTROL VALUES -> BUILD SAMPLE NODE OBJECT
// ===========================================
function readControls() {
    return {
        shape: document.getElementById('ctl-shape').value,
        bg: document.getElementById('ctl-bg').value,
        font: document.getElementById('ctl-font').value,
        size: parseInt(document.getElementById('ctl-size').value, 10),
        borderWidth: parseInt(document.getElementById('ctl-bw').value, 10),
        borderColor: document.getElementById('ctl-bc').value,
        opacity: parseFloat(document.getElementById('ctl-op').value),
        shadow: document.getElementById('ctl-shadow').checked,
        icon: document.getElementById('ctl-icon').value,
        image: document.getElementById('ctl-image').value.trim()
    };
}

// Build the exact node object we hand to nodes.update() AND display as JSON.
function buildSampleNode(c) {
    const node = {
        id: SAMPLE_ID,
        label: 'Sample Node',
        shape: c.shape,
        x: -260,
        y: 0,
        fixed: { x: true, y: true },
        color: {
            background: c.bg,
            border: c.borderColor
        },
        borderWidth: c.borderWidth,
        font: { color: c.font, size: 16 },
        opacity: c.opacity,
        shadow: { enabled: c.shadow }
    };

    // Only include `size` for shapes that actually use it.
    if (FIXED_SIZE_SHAPES.has(c.shape)) {
        node.size = c.size;
    }

    // Icon shape needs an icon block (FontAwesome).
    if (c.shape === 'icon') {
        node.icon = {
            face: "'Font Awesome 6 Free'",
            weight: 'bold',
            code: String.fromCharCode(parseInt(c.icon, 16)),
            size: c.size,
            color: c.bg
        };
    }

    // Image shape needs a URL.
    if (c.shape === 'image') {
        node.image = c.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bitmap_VS_SVG.svg/240px-Bitmap_VS_SVG.svg.png';
    }

    return node;
}

// ===========================================
// APPLY CONTROLS
// ===========================================
function applyControls() {
    const c = readControls();
    const node = buildSampleNode(c);
    nodes.update(node);
    updateEnabledStates(c.shape);
    updateJsonPreview();
    updateReadouts(c);
}

// Enable/disable controls that don't apply to the current shape.
function updateEnabledStates(shape) {
    const sizeApplies = FIXED_SIZE_SHAPES.has(shape);
    const iconApplies = shape === 'icon';
    const imageApplies = shape === 'image';

    toggleCtl('wrap-size', 'ctl-size', sizeApplies,
        sizeApplies ? '' : 'Ellipse, circle, and box size themselves to their label — this slider has no effect.');
    toggleCtl('wrap-icon', 'ctl-icon', iconApplies,
        iconApplies ? '' : 'Choose the "icon" shape to enable a FontAwesome glyph.');
    toggleCtl('wrap-image', 'ctl-image', imageApplies,
        imageApplies ? '' : 'Choose the "image" shape to load a picture by URL.');
}

function toggleCtl(wrapId, inputId, enabled, tip) {
    const wrap = document.getElementById(wrapId);
    const input = document.getElementById(inputId);
    wrap.classList.toggle('disabled', !enabled);
    input.disabled = !enabled;
    wrap.title = enabled ? '' : tip;
}

// Live JSON preview — exactly what vis-network stored for the sample node.
function updateJsonPreview() {
    const stored = nodes.get(SAMPLE_ID);
    document.getElementById('json-preview').textContent = JSON.stringify(stored, null, 2);
}

function updateReadouts(c) {
    document.getElementById('val-size').textContent = c.size;
    document.getElementById('val-bw').textContent = c.borderWidth;
    document.getElementById('val-op').textContent = c.opacity.toFixed(2);
}

// ===========================================
// INIT
// ===========================================
function init() {
    const c = readControls();
    nodes = new vis.DataSet([buildSampleNode(c)].concat(neighborNodes));
    edges = new vis.DataSet([
        { id: 'e1', from: 1, to: 2 },
        { id: 'e2', from: 1, to: 3 }
    ]);

    const container = document.getElementById('network');
    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false, hierarchical: { enabled: false } },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            hover: false,
            keyboard: { enabled: false }
        },
        nodes: {
            margin: 10,
            shadow: { enabled: false }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            color: { color: '#9fb3c8' },
            width: 1.5,
            smooth: { enabled: true, type: 'cubicBezier', roundness: 0.3 }
        }
    };

    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    // Wire every control to re-apply on change/input.
    const changeIds = ['ctl-shape', 'ctl-bg', 'ctl-font', 'ctl-bc', 'ctl-shadow', 'ctl-icon', 'ctl-image'];
    changeIds.forEach(id => document.getElementById(id).addEventListener('change', applyControls));

    const inputIds = ['ctl-size', 'ctl-bw', 'ctl-op', 'ctl-image'];
    inputIds.forEach(id => document.getElementById(id).addEventListener('input', applyControls));

    // Initial paint
    applyControls();

    window.addEventListener('resize', function () {
        network.fit({ animation: false });
    });
}

document.addEventListener('DOMContentLoaded', init);
