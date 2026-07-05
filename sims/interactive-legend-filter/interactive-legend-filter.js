// Interactive Legend Filter - vis-network MicroSim
// CANVAS_HEIGHT: 560
// Bloom Level: Apply (L3) - use a clickable legend to filter the visible node
// set and explain how legend colors map to the DataSet's category field.
// Single source of truth for iframe height is the CANVAS_HEIGHT comment above.

// ===========================================
// TAXONOMY CATEGORIES (colors from Chapter 4)
// The `key` is exactly what each node stores in its `category` field, so the
// legend colors map one-to-one onto the DataSet's category field.
// ===========================================
const CATEGORIES = [
    { key: 'foundational', label: 'Foundational Concepts', color: '#2196f3', border: '#1565c0' }, // blue
    { key: 'graph',        label: 'Graph Theory',          color: '#4caf50', border: '#2e7d32' }, // green
    { key: 'visualization',label: 'Visualization',         color: '#ffc107', border: '#c79100' }, // gold
    { key: 'learning',     label: 'Learning Science',      color: '#9c27b0', border: '#6a1b9a' }  // purple
];

const HIGHLIGHT_BORDER = '#ffd700'; // gold outline used on legend hover
const EDGE_COLOR = '#9aa5b1';       // muted gray directed edges

// Quick lookup: category key -> definition object.
const catByKey = {};
CATEGORIES.forEach(c => { catByKey[c.key] = c; });

// ===========================================
// GRAPH DATA (from the specification)
// 20 nodes, each pre-assigned to one taxonomy category. Fixed positions keep
// the layout stable so the filtering effect is easy to follow.
// ===========================================
const nodeData = [
    // Foundational Concepts (blue) - 5
    { id: 1,  label: 'Concept',            category: 'foundational', x: -360, y: -170 },
    { id: 2,  label: 'Learning Graph',     category: 'foundational', x: -210, y: -220 },
    { id: 3,  label: 'Dependency',         category: 'foundational', x: -300, y: -30 },
    { id: 4,  label: 'Prerequisite',       category: 'foundational', x: -150, y: -70 },
    { id: 5,  label: 'Knowledge Unit',     category: 'foundational', x: -420, y: -40 },
    // Graph Theory (green) - 6
    { id: 6,  label: 'Node',               category: 'graph', x: -30,  y: -190 },
    { id: 7,  label: 'Edge',               category: 'graph', x: 120,  y: -210 },
    { id: 8,  label: 'Directed Graph',     category: 'graph', x: 40,   y: -60 },
    { id: 9,  label: 'DAG',                category: 'graph', x: 200,  y: -80 },
    { id: 10, label: 'Topological Sort',   category: 'graph', x: 130,  y: 60 },
    { id: 11, label: 'Cycle',              category: 'graph', x: 280,  y: 20 },
    // Visualization (gold) - 5
    { id: 12, label: 'vis-network',        category: 'visualization', x: -350, y: 130 },
    { id: 13, label: 'Node Styling',       category: 'visualization', x: -200, y: 180 },
    { id: 14, label: 'Layout',             category: 'visualization', x: -300, y: 250 },
    { id: 15, label: 'Force-Directed',     category: 'visualization', x: -120, y: 250 },
    { id: 16, label: 'Legend',             category: 'visualization', x: -440, y: 190 },
    // Learning Science (purple) - 4
    { id: 17, label: "Bloom's Taxonomy",   category: 'learning', x: 60,   y: 180 },
    { id: 18, label: 'Scaffolding',        category: 'learning', x: 210,  y: 150 },
    { id: 19, label: 'Personalization',    category: 'learning', x: 120,  y: 260 },
    { id: 20, label: 'Adaptive Path',      category: 'learning', x: 270,  y: 240 }
];

// Directed gray edges connecting the sample graph.
const edgeData = [
    { id: 1,  from: 2,  to: 1 },
    { id: 2,  from: 3,  to: 1 },
    { id: 3,  from: 4,  to: 3 },
    { id: 4,  from: 5,  to: 1 },
    { id: 5,  from: 6,  to: 1 },
    { id: 6,  from: 7,  to: 6 },
    { id: 7,  from: 8,  to: 6 },
    { id: 8,  from: 8,  to: 7 },
    { id: 9,  from: 9,  to: 8 },
    { id: 10, from: 10, to: 9 },
    { id: 11, from: 11, to: 8 },
    { id: 12, from: 13, to: 12 },
    { id: 13, from: 14, to: 12 },
    { id: 14, from: 15, to: 14 },
    { id: 15, from: 16, to: 13 },
    { id: 16, from: 18, to: 17 },
    { id: 17, from: 19, to: 17 },
    { id: 18, from: 20, to: 19 },
    { id: 19, from: 13, to: 6 },
    { id: 20, from: 15, to: 8 }
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
// Tracks which categories are currently visible.
const visibleState = {};
CATEGORIES.forEach(c => { visibleState[c.key] = true; });

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
    return nodeData.map(n => {
        const cat = catByKey[n.category];
        return {
            id: n.id,
            label: n.label,
            category: n.category,        // the DataSet field the legend maps to
            x: n.x,
            y: n.y,
            hidden: false,
            borderWidth: 2,
            color: {
                background: cat.color,
                border: cat.border,
                highlight: { background: cat.color, border: cat.border },
                hover: { background: cat.color, border: cat.border }
            }
        };
    });
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
            hover: true,
            keyboard: {
                enabled: enableMouseInteraction,
                bindToWindow: false,
                speed: { x: 2, y: 2, zoom: 0.01 }
            }
        },
        nodes: {
            shape: 'dot',           // circular nodes per spec
            size: 16,
            font: { size: 13, face: 'Arial', color: '#0d1b2a' },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            width: 1.5,
            color: { color: EDGE_COLOR },
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            smooth: { enabled: true, type: 'dynamic' }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });
}

// ===========================================
// DATASET QUERIES
// Live counts and subsets always come from the DataSet, per spec.
// ===========================================
// Ids of every node in a category (regardless of hidden state).
function idsInCategory(key) {
    return nodes.getIds({ filter: n => n.category === key });
}

// Count of currently VISIBLE nodes in a category.
function visibleCountInCategory(key) {
    return nodes.get({ filter: n => n.category === key && n.hidden !== true }).length;
}

// Total visible nodes across all categories.
function totalVisible() {
    return nodes.get({ filter: n => n.hidden !== true }).length;
}

// ===========================================
// FILTER LOGIC
// ===========================================
// Toggle one category's visibility by setting hidden on its DataSet subset.
function toggleCategory(key) {
    const nowVisible = !visibleState[key];
    visibleState[key] = nowVisible;

    const ids = idsInCategory(key);
    nodes.update(ids.map(id => ({ id: id, hidden: !nowVisible })));
    network.redraw();

    refreshLegend();
}

// Restore every category to visible ("Show All").
function showAll() {
    CATEGORIES.forEach(c => { visibleState[c.key] = true; });
    nodes.update(nodeData.map(n => ({ id: n.id, hidden: false })));
    network.redraw();
    refreshLegend();
}

// ===========================================
// LEGEND HOVER HIGHLIGHT (does NOT hide others)
// Temporarily give a category's nodes a thick gold outline.
// ===========================================
function highlightCategory(key) {
    const ids = idsInCategory(key);
    nodes.update(ids.map(id => ({
        id: id,
        borderWidth: 5,
        color: { border: HIGHLIGHT_BORDER }
    })));
}

// Remove the gold outline, restoring each node's category border color.
function clearHighlight() {
    nodes.update(nodeData.map(n => {
        const cat = catByKey[n.category];
        return {
            id: n.id,
            borderWidth: 2,
            color: {
                background: cat.color,
                border: cat.border,
                highlight: { background: cat.color, border: cat.border },
                hover: { background: cat.color, border: cat.border }
            }
        };
    }));
}

// ===========================================
// LEGEND RENDERING
// ===========================================
function buildLegend() {
    const list = document.getElementById('legend-list');
    list.innerHTML = '';

    CATEGORIES.forEach(cat => {
        const row = document.createElement('div');
        row.className = 'legend-row';
        row.dataset.key = cat.key;

        const swatch = document.createElement('div');
        swatch.className = 'legend-swatch';
        swatch.style.backgroundColor = cat.color;
        swatch.style.borderColor = cat.border;

        const label = document.createElement('div');
        label.className = 'legend-label';
        label.textContent = cat.label;

        const count = document.createElement('div');
        count.className = 'legend-count';
        count.textContent = '0';

        row.appendChild(swatch);
        row.appendChild(label);
        row.appendChild(count);

        // Click toggles this category's visibility.
        row.addEventListener('click', () => toggleCategory(cat.key));
        // Hover highlights this category without hiding others.
        row.addEventListener('mouseenter', () => highlightCategory(cat.key));
        row.addEventListener('mouseleave', clearHighlight);

        list.appendChild(row);
    });

    refreshLegend();
}

// Recompute every count badge and row state from the live DataSet.
function refreshLegend() {
    document.querySelectorAll('.legend-row').forEach(row => {
        const key = row.dataset.key;
        const visible = visibleState[key];
        row.classList.toggle('off', !visible);
        // Count reflects visible nodes; shows 0 when the category is hidden.
        row.querySelector('.legend-count').textContent = visible ? visibleCountInCategory(key) : 0;
    });

    document.getElementById('legend-total').textContent =
        'Showing ' + totalVisible() + ' of ' + nodeData.length + ' nodes';
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    buildLegend();

    document.getElementById('show-all').addEventListener('click', function (e) {
        e.preventDefault();
        showAll();
    });

    window.addEventListener('resize', function () {
        if (network) {
            network.fit({ animation: false });
        }
    });
});
