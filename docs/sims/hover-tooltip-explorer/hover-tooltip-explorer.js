// Hover Tooltip Explorer - vis-network MicroSim
// CANVAS_HEIGHT: 520
// Bloom Level: Understand (L2) - explain a Hover State and interpret which
// nodes offer extra information on hover versus which do not.
// Single source of truth for iframe height is the CANVAS_HEIGHT comment above.

// ===========================================
// STYLE CONSTANTS
// ===========================================
const NODE_BG = '#add8e6';        // light blue fill for every node
const NODE_BORDER = '#4a90b8';    // plain border (no tooltip)
const TIP_BORDER = '#1565c0';     // deeper blue used for the dotted "has tooltip" ring
const NODE_HOVER_BG = '#ffe082';  // soft gold on hover so the hovered node is obvious
const EDGE_COLOR = '#9aa5b1';     // muted gray directed edges

// ===========================================
// GRAPH DATA (from the specification)
// 10 nodes: exactly 5 carry an HTML `title` tooltip, 5 carry none.
// hasTooltip drives BOTH the tooltip and the dotted-outline indicator.
// Positions are fixed so the layout is stable and easy to talk about.
// ===========================================
const nodeData = [
    { id: 1,  label: 'Barnes-Hut Solver',  hasTooltip: true,
      tip: 'A physics solver that groups distant nodes to speed up force-directed layout of large graphs.',
      x: -320, y: -150 },
    { id: 2,  label: 'DataSet',            hasTooltip: false, x: -110, y: -170 },
    { id: 3,  label: 'Node',               hasTooltip: true,
      tip: 'A single point in the graph that stands for one entity, such as one concept.',
      x: 90,  y: -150 },
    { id: 4,  label: 'Edge',               hasTooltip: false, x: -330, y: 10 },
    { id: 5,  label: 'Hover State',        hasTooltip: true,
      tip: 'The visual state a node enters while the pointer is over it — vis-network fires a hoverNode event.',
      x: -110, y: 0 },
    { id: 6,  label: 'Tooltip',            hasTooltip: true,
      tip: 'A small pop-up box, driven by a node’s <b>title</b> property, that shows extra detail near the cursor.',
      x: 100, y: 20 },
    { id: 7,  label: 'Physics',            hasTooltip: false, x: -300, y: 170 },
    { id: 8,  label: 'Stabilization',      hasTooltip: false, x: -90, y: 190 },
    { id: 9,  label: 'Network',            hasTooltip: true,
      tip: 'The vis-network object that renders nodes and edges onto the canvas and dispatches interaction events.',
      x: 120, y: 180 },
    { id: 10, label: 'Layout',             hasTooltip: false, x: -430, y: 90 }
];

// Directed edges wiring the sample graph together.
const edgeData = [
    { id: 1,  from: 9, to: 1 },
    { id: 2,  from: 9, to: 2 },
    { id: 3,  from: 2, to: 3 },
    { id: 4,  from: 2, to: 4 },
    { id: 5,  from: 3, to: 5 },
    { id: 6,  from: 5, to: 6 },
    { id: 7,  from: 1, to: 7 },
    { id: 8,  from: 7, to: 8 },
    { id: 9,  from: 10, to: 7 },
    { id: 10, from: 9, to: 6 }
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let showIndicator = true;   // checkbox default: checked

// Fast lookup of a node record by id.
function nodeById(id) {
    return nodeData.find(n => n.id === id);
}

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
// NETWORK INITIALIZATION
// ===========================================
// Build a vis node. The dotted border (indicator) is applied only when
// showIndicator is true AND the node actually has a tooltip.
function buildVisNode(n) {
    const dotted = showIndicator && n.hasTooltip;
    const node = {
        id: n.id,
        label: n.label,
        x: n.x,
        y: n.y,
        shapeProperties: { borderDashes: dotted ? [3, 3] : false },
        borderWidth: dotted ? 3 : 2,
        color: {
            background: NODE_BG,
            border: n.hasTooltip && showIndicator ? TIP_BORDER : NODE_BORDER,
            highlight: { background: NODE_HOVER_BG, border: TIP_BORDER },
            hover: { background: NODE_HOVER_BG, border: TIP_BORDER }
        }
    };
    // Only nodes flagged hasTooltip get a `title`; that is what makes
    // vis-network render its built-in tooltip box automatically.
    if (n.hasTooltip) {
        const el = document.createElement('div');
        el.className = 'vn-tooltip';
        el.innerHTML = '<div class="vn-tip-label">' + n.label + '</div>' +
                       '<div class="vn-tip-body">' + n.tip + '</div>';
        node.title = el;
    }
    return node;
}

function buildVisNodes() {
    return nodeData.map(buildVisNode);
}

function buildVisEdges() {
    return edgeData.map(e => ({
        id: e.id,
        from: e.from,
        to: e.to,
        color: { color: EDGE_COLOR, highlight: EDGE_COLOR, hover: EDGE_COLOR }
    }));
}

function initializeNetwork() {
    nodes = new vis.DataSet(buildVisNodes());
    edges = new vis.DataSet(buildVisEdges());

    // Enable mouse zoom/pan only when NOT embedded in an iframe.
    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            dragNodes: false,
            navigationButtons: true,
            hover: true,            // required so hoverNode / blurNode fire
            tooltipDelay: 120,
            keyboard: {
                enabled: enableMouseInteraction,
                bindToWindow: false,
                speed: { x: 2, y: 2, zoom: 0.01 }
            }
        },
        nodes: {
            shape: 'ellipse',
            font: { size: 14, face: 'Arial', color: '#0d1b2a' },
            borderWidth: 2,
            widthConstraint: { minimum: 70, maximum: 150 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            width: 2,
            color: { color: EDGE_COLOR },
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { enabled: true, type: 'dynamic' }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Live hover status wiring.
    network.on('hoverNode', function (params) {
        const n = nodeById(params.node);
        if (!n) return;
        setStatus(n.label + (n.hasTooltip ? ' (tooltip available)' : ' (no tooltip)'), n.hasTooltip);
    });
    network.on('blurNode', function () {
        setStatus('nothing', false);
    });

    // Fit the fixed layout into view once drawn.
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });
}

// ===========================================
// STATUS READOUT
// ===========================================
function setStatus(text, active) {
    const el = document.getElementById('status-readout');
    el.textContent = 'Hovering: ' + text;
    el.classList.toggle('active', !!active);
}

// ===========================================
// CONTROLS
// ===========================================
// Re-apply borders/colors on every node when the indicator toggles.
// This uses nodes.update() so positions and tooltips are preserved.
function applyIndicator() {
    nodes.update(nodeData.map(n => {
        const dotted = showIndicator && n.hasTooltip;
        return {
            id: n.id,
            shapeProperties: { borderDashes: dotted ? [3, 3] : false },
            borderWidth: dotted ? 3 : 2,
            color: {
                background: NODE_BG,
                border: dotted ? TIP_BORDER : NODE_BORDER,
                highlight: { background: NODE_HOVER_BG, border: TIP_BORDER },
                hover: { background: NODE_HOVER_BG, border: TIP_BORDER }
            }
        };
    }));
}

function resetView() {
    if (network) {
        network.fit({ animation: true });
    }
    setStatus('nothing', false);
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    setStatus('nothing', false);

    document.getElementById('show-indicator').addEventListener('change', function (e) {
        showIndicator = e.target.checked;
        applyIndicator();
    });
    document.getElementById('reset-btn').addEventListener('click', resetView);

    window.addEventListener('resize', function () {
        if (network) {
            network.fit({ animation: false });
        }
    });
});
