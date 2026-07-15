// Graph Anatomy Explorer - vis-network MicroSim
// CANVAS_HEIGHT: 500
// Bloom Level: Understand (L2) - identify/classify nodes vs edges and edge direction.
// Single source of truth for iframe height is the CANVAS_HEIGHT comment above.

// ===========================================
// COLOR / STYLE CONSTANTS
// ===========================================
const NODE_DEFAULT = { background: '#add8e6', border: '#4a90b8' }; // light blue
const NODE_SELECTED = { background: '#ffd700', border: '#e6a800' }; // gold
const EDGE_DEFAULT_COLOR = '#000000'; // solid black
const EDGE_SELECTED_COLOR = '#e6a800'; // gold
const EDGE_DEFAULT_WIDTH = 2;
const EDGE_SELECTED_WIDTH = 5;

// ===========================================
// GRAPH DATA (from the specification)
// Dependency direction: arrow points from dependent -> prerequisite.
// ===========================================
const nodeData = [
    { id: 1, label: 'Concept' },
    { id: 2, label: 'Node' },
    { id: 3, label: 'Edge' },
    { id: 4, label: 'Graph Representation' },
    { id: 5, label: 'Directed Graph' }
];

const edgeData = [
    { id: 1, from: 2, to: 1 }, // Node depends on Concept
    { id: 2, from: 3, to: 1 }, // Edge depends on Concept
    { id: 3, from: 4, to: 2 }, // Graph Representation depends on Node
    { id: 4, from: 4, to: 3 }, // Graph Representation depends on Edge
    { id: 5, from: 5, to: 4 }  // Directed Graph depends on Graph Representation
];

// One-sentence glossary definitions shown in the click infobox.
// Concept, Graph Representation, and Directed Graph use the project glossary text.
// Node and Edge have no standalone glossary entry, so concise ISO-style definitions are used.
const nodeDefinitions = {
    1: 'A fundamental unit of knowledge - an abstract idea that can be described, categorized, and related to other concepts within a domain.',
    2: 'A node is a single point in a graph that stands for one entity, such as one concept in a learning graph.',
    3: 'An edge is a link between two nodes that represents a relationship, such as one concept depending on another.',
    4: 'The visualization or modeling of data in graph format, where nodes represent entities and edges represent relationships.',
    5: 'A graph whose edges have a specific direction, indicating a one-way relationship between the nodes.'
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let directed = true;          // "Show as undirected" toggles this
let selectedNodeId = null;
let selectedEdgeId = null;

// Quick lookup helper for labels.
function labelFor(id) {
    const n = nodeData.find(n => n.id === id);
    return n ? n.label : '';
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
function buildVisNodes() {
    return nodeData.map(node => ({
        id: node.id,
        label: node.label,
        // Hover tooltip text per spec.
        title: "Node: represents the concept '" + node.label + "'",
        color: {
            background: NODE_DEFAULT.background,
            border: NODE_DEFAULT.border,
            highlight: { background: NODE_DEFAULT.background, border: NODE_DEFAULT.border },
            hover: { background: NODE_DEFAULT.background, border: NODE_DEFAULT.border }
        },
        borderWidth: 2
    }));
}

function buildVisEdges() {
    return edgeData.map(edge => ({
        id: edge.id,
        from: edge.from,
        to: edge.to,
        // Hover tooltip text per spec.
        title: "Edge: '" + labelFor(edge.from) + "' depends on '" + labelFor(edge.to) + "'",
        color: {
            color: EDGE_DEFAULT_COLOR,
            highlight: EDGE_SELECTED_COLOR,
            hover: EDGE_DEFAULT_COLOR
        },
        width: EDGE_DEFAULT_WIDTH,
        arrows: { to: { enabled: directed } }
    }));
}

function initializeNetwork() {
    directed = true;
    selectedNodeId = null;
    selectedEdgeId = null;

    nodes = new vis.DataSet(buildVisNodes());
    edges = new vis.DataSet(buildVisEdges());

    // Enable mouse zoom/pan only when NOT embedded in an iframe.
    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'UD',        // Up-to-Down layering; with these edges the
                                        // root prerequisite "Concept" lands at the BOTTOM
                sortMethod: 'directed',
                levelSeparation: 90,
                nodeSpacing: 150
            }
        },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            dragNodes: false,
            navigationButtons: true,
            hover: true,
            keyboard: {
                enabled: enableMouseInteraction,
                bindToWindow: false,
                speed: { x: 2, y: 2, zoom: 0.01 }
            }
        },
        nodes: {
            shape: 'circle',
            size: 20,                    // ~40px diameter
            widthConstraint: { minimum: 40, maximum: 90 },
            font: { size: 13, face: 'Arial', color: '#000000' },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            width: EDGE_DEFAULT_WIDTH,
            color: { color: EDGE_DEFAULT_COLOR },
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            smooth: { enabled: true, type: 'cubicBezier', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.on('click', handleClick);

    // After the hierarchical layout renders, fit it into view, then nudge it
    // left so the infobox (fixed to the right edge) doesn't sit on top of it.
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
        panLeftOfCenter();
    });

    updateStats();
    resetInfobox();
}

// ===========================================
// VIEW PANNING
// ===========================================
// vis-network's moveTo(position) sets the CANVAS point that lands in the
// middle of the viewport. Counter-intuitively, to make the drawn graph
// appear to shift LEFT on screen, you must move that focal point to the
// RIGHT (a larger x) - the graph content to the right of the old focal
// point is what slides into the newly-centered spot. So "shift the
// content left" = "increase position.x", not decrease it.
function panLeftOfCenter() {
    const infobox = document.querySelector('.infobox');
    if (!infobox || !network) {
        return;
    }
    // Reserve roughly half the infobox's on-screen footprint so the graph
    // centers itself in the space to the left of the infobox rather than
    // in the full canvas width.
    const shiftScreenPx = (infobox.offsetWidth + 16) / 2;
    const scale = network.getScale();
    const view = network.getViewPosition();
    network.moveTo({
        position: { x: view.x + (shiftScreenPx / scale), y: view.y },
        scale: scale,
        animation: false
    });
}

// ===========================================
// SELECTION HIGHLIGHTING
// ===========================================
function clearHighlights() {
    if (selectedNodeId !== null) {
        nodes.update({
            id: selectedNodeId,
            color: {
                background: NODE_DEFAULT.background,
                border: NODE_DEFAULT.border,
                highlight: { background: NODE_DEFAULT.background, border: NODE_DEFAULT.border },
                hover: { background: NODE_DEFAULT.background, border: NODE_DEFAULT.border }
            },
            borderWidth: 2
        });
        selectedNodeId = null;
    }
    if (selectedEdgeId !== null) {
        edges.update({ id: selectedEdgeId, color: { color: EDGE_DEFAULT_COLOR }, width: EDGE_DEFAULT_WIDTH });
        selectedEdgeId = null;
    }
}

function highlightNode(id) {
    clearHighlights();
    selectedNodeId = id;
    nodes.update({
        id: id,
        color: {
            background: NODE_SELECTED.background,
            border: NODE_SELECTED.border,
            highlight: { background: NODE_SELECTED.background, border: NODE_SELECTED.border },
            hover: { background: NODE_SELECTED.background, border: NODE_SELECTED.border }
        },
        borderWidth: 5
    });
}

function highlightEdge(id) {
    clearHighlights();
    selectedEdgeId = id;
    edges.update({ id: id, color: { color: EDGE_SELECTED_COLOR }, width: EDGE_SELECTED_WIDTH });
}

// ===========================================
// CLICK HANDLER -> INFOBOX
// ===========================================
function handleClick(params) {
    if (params.nodes.length > 0) {
        const id = params.nodes[0];
        highlightNode(id);
        showNodeInfo(id);
    } else if (params.edges.length > 0) {
        const id = params.edges[0];
        highlightEdge(id);
        showEdgeInfo(id);
    } else {
        clearHighlights();
        resetInfobox();
    }
}

function showNodeInfo(id) {
    const label = labelFor(id);
    setInfobox(
        'Node',
        '<p><span class="chip chip-node">NODE</span></p>' +
        '<p class="ib-lead">You clicked the node <strong>&ldquo;' + label + '&rdquo;</strong>.</p>' +
        '<p>A <strong>node</strong> is a single point in the graph. This one represents the concept ' +
        '<strong>&ldquo;' + label + '&rdquo;</strong>.</p>' +
        '<p class="ib-def">' + nodeDefinitions[id] + '</p>'
    );
}

function showEdgeInfo(id) {
    const edge = edgeData.find(e => e.id === id);
    const fromLabel = labelFor(edge.from);
    const toLabel = labelFor(edge.to);
    if (directed) {
        setInfobox(
            'Edge',
            '<p><span class="chip chip-edge">EDGE</span></p>' +
            '<p class="ib-lead">You clicked the arrow from <strong>&ldquo;' + fromLabel +
            '&rdquo;</strong> to <strong>&ldquo;' + toLabel + '&rdquo;</strong>.</p>' +
            '<p>This arrow means you should understand <strong>&ldquo;' + toLabel +
            '&rdquo;</strong> before <strong>&ldquo;' + fromLabel + '&rdquo;</strong>.</p>' +
            '<p class="ib-def">The direction of the arrow shows the order you learn things in.</p>'
        );
    } else {
        setInfobox(
            'Edge (undirected)',
            '<p><span class="chip chip-edge">EDGE</span></p>' +
            '<p class="ib-lead">You clicked the line between <strong>&ldquo;' + fromLabel +
            '&rdquo;</strong> and <strong>&ldquo;' + toLabel + '&rdquo;</strong>.</p>' +
            '<p>With the arrowheads hidden, this <strong>undirected</strong> edge only tells you the two ' +
            'concepts are <em>connected</em> &mdash; it does not tell you which one comes first.</p>' +
            '<p class="ib-def">That is why direction matters: a plain connection loses the "learn this before that" order.</p>'
        );
    }
}

// ===========================================
// INFOBOX HELPERS
// ===========================================
function setInfobox(title, html) {
    document.getElementById('infobox-title').textContent = title;
    document.getElementById('infobox-content').innerHTML = html;
}

function resetInfobox() {
    document.getElementById('infobox-title').textContent = 'Explore the Graph';
    let html;
    if (directed) {
        html =
            '<p class="ib-lead">Click any <strong>circle</strong> or <strong>arrow</strong> to learn what it is.</p>' +
            '<ul>' +
            '<li>A <strong>node</strong> (circle) stands for one concept.</li>' +
            '<li>An <strong>edge</strong> (arrow) stands for a dependency between two concepts.</li>' +
            '<li>The <strong>arrowhead</strong> shows direction: it points to the concept you learn first.</li>' +
            '</ul>';
    } else {
        html =
            '<p class="ib-lead">The arrowheads are now hidden, so every edge is <strong>undirected</strong>.</p>' +
            '<ul>' +
            '<li>An undirected edge only shows that two concepts are <strong>connected</strong>.</li>' +
            '<li>It does <strong>not</strong> show the order &mdash; you cannot tell which concept comes first.</li>' +
            '<li>Click <strong>Show as directed</strong> to bring the arrows back and see the order again.</li>' +
            '</ul>';
    }
    document.getElementById('infobox-content').innerHTML = html;
}

// ===========================================
// CONTROLS
// ===========================================
function toggleDirected() {
    directed = !directed;
    // Update every edge's arrowheads.
    edgeData.forEach(e => {
        edges.update({ id: e.id, arrows: { to: { enabled: directed } } });
    });

    const btn = document.getElementById('toggle-btn');
    btn.textContent = directed ? 'Show as undirected' : 'Show as directed';

    // Refresh whatever infobox is currently showing so the callout text matches.
    if (selectedEdgeId !== null) {
        showEdgeInfo(selectedEdgeId);
    } else if (selectedNodeId !== null) {
        showNodeInfo(selectedNodeId);
    } else {
        resetInfobox();
    }
    updateStats();
}

function updateStats() {
    const mode = directed ? 'directed' : 'undirected';
    document.getElementById('stats').textContent =
        'Nodes: ' + nodeData.length + ' | Edges: ' + edgeData.length + ' (' + mode + ')';
}

function reset() {
    // Rebuild everything to restore all defaults (directed arrows, no selection).
    if (network) {
        network.destroy();
    }
    initializeNetwork();
    document.getElementById('toggle-btn').textContent = 'Show as undirected';
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    document.getElementById('toggle-btn').addEventListener('click', toggleDirected);
    document.getElementById('reset-btn').addEventListener('click', reset);

    window.addEventListener('resize', function () {
        if (network) {
            network.fit({ animation: false });
            panLeftOfCenter();
        }
    });
});
