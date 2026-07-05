// Interactive Taxonomy Legend and Filter - vis-network MicroSim
// CANVAS_HEIGHT: 520
// Bloom Level: Understand (L2) - interpret which taxonomy category a node
// belongs to and predict which nodes disappear when a legend entry is toggled.
// Single source of truth for iframe height is the CANVAS_HEIGHT comment above.

// ===========================================
// TAXONOMY CATEGORIES (6) with exact colors from the specification
// cx/cy is the cluster seed center used to loosely group each category.
// ===========================================
const CATEGORIES = [
    { key: 'graph',    label: 'Graph Theory',           color: '#2196f3', border: '#1565c0', cx: -260, cy: -140 }, // blue
    { key: 'metadata', label: 'Metadata Standards',     color: '#009688', border: '#00695c', cx:   60, cy: -170 }, // teal
    { key: 'vistools', label: 'Visualization Tools',    color: '#ffc107', border: '#c79100', cx:  260, cy:   20 }, // gold
    { key: 'learning', label: 'Learning Science',       color: '#9c27b0', border: '#6a1b9a', cx:   40, cy:  170 }, // purple
    { key: 'personal', label: 'Personalization',        color: '#e91e8c', border: '#ad1457', cx: -220, cy:  150 }, // pink
    { key: 'govern',   label: 'Governance & Validation',color: '#78909c', border: '#455a64', cx: -320, cy:    0 }  // gray
];

const FADED_OPACITY = 0.15;         // faded node opacity when a category is off
const EDGE_COLOR = 'rgba(120,130,140,0.35)'; // light gray, low opacity edges

const catByKey = {};
CATEGORIES.forEach(c => { catByKey[c.key] = c; });

// ===========================================
// GRAPH DATA (24 concepts from this book's learning graph)
// Each node is pre-assigned to one taxonomy category. Initial positions are
// seeded near the category's cluster center so physics settles into loose
// category clusters.
// ===========================================
const rawNodes = [
    // Graph Theory (blue) - 4
    { id: 1,  label: 'Directed Graph',     category: 'graph' },
    { id: 2,  label: 'DAG',                category: 'graph' },
    { id: 3,  label: 'Topological Sort',   category: 'graph' },
    { id: 4,  label: 'Dependency Edge',    category: 'graph' },
    // Metadata Standards (teal) - 4
    { id: 5,  label: 'Dublin Core',        category: 'metadata' },
    { id: 6,  label: 'SKOS',               category: 'metadata' },
    { id: 7,  label: 'ISO 11179',          category: 'metadata' },
    { id: 8,  label: 'Taxonomy',           category: 'metadata' },
    // Visualization Tools (gold) - 4
    { id: 9,  label: 'vis-network',        category: 'vistools' },
    { id: 10, label: 'Force-Directed',     category: 'vistools' },
    { id: 11, label: 'Node Styling',       category: 'vistools' },
    { id: 12, label: 'Legend',             category: 'vistools' },
    // Learning Science (purple) - 4
    { id: 13, label: "Bloom's Taxonomy",   category: 'learning' },
    { id: 14, label: 'Scaffolding',        category: 'learning' },
    { id: 15, label: 'Working Memory',     category: 'learning' },
    { id: 16, label: 'Prerequisite',       category: 'learning' },
    // Personalization (pink) - 4
    { id: 17, label: 'Adaptive Path',      category: 'personal' },
    { id: 18, label: 'Learner Model',      category: 'personal' },
    { id: 19, label: 'Ready-to-Learn',     category: 'personal' },
    { id: 20, label: 'Recommendation',     category: 'personal' },
    // Governance & Validation (gray) - 4
    { id: 21, label: 'Quality Gate',       category: 'govern' },
    { id: 22, label: 'Cycle Detection',    category: 'govern' },
    { id: 23, label: 'Orphan Check',       category: 'govern' },
    { id: 24, label: 'Review Workflow',    category: 'govern' }
];

// Visible cross-category edges (the real dependency structure).
const contentEdges = [
    { from: 2,  to: 1 },
    { from: 3,  to: 2 },
    { from: 4,  to: 1 },
    { from: 6,  to: 8 },
    { from: 7,  to: 8 },
    { from: 5,  to: 8 },
    { from: 10, to: 9 },
    { from: 11, to: 9 },
    { from: 12, to: 11 },
    { from: 14, to: 13 },
    { from: 15, to: 14 },
    { from: 16, to: 13 },
    { from: 18, to: 17 },
    { from: 19, to: 18 },
    { from: 20, to: 17 },
    { from: 22, to: 21 },
    { from: 23, to: 21 },
    { from: 24, to: 21 },
    // a few cross-links so clusters are connected, not islands
    { from: 8,  to: 1 },   // Taxonomy -> Directed Graph
    { from: 9,  to: 4 },   // vis-network -> Dependency Edge
    { from: 16, to: 4 },   // Prerequisite -> Dependency Edge
    { from: 17, to: 13 },  // Adaptive Path -> Bloom's Taxonomy
    { from: 19, to: 16 },  // Ready-to-Learn -> Prerequisite
    { from: 21, to: 2 },   // Quality Gate -> DAG
    { from: 12, to: 8 }    // Legend -> Taxonomy
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let edgeAutoId = 1;
// Which categories are currently visible (not faded).
const visibleState = {};
CATEGORIES.forEach(c => { visibleState[c.key] = true; });
// Map contentEdge -> its assigned id, so we can hide/show reliably.
const edgeRecords = [];

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

// Convert a #rrggbb color to an rgba() string with the given alpha.
function withAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function buildVisNodes() {
    return rawNodes.map(n => {
        const cat = catByKey[n.category];
        // Seed position in a small random spread around the cluster center so
        // physics pulls same-category nodes together into loose clusters.
        const jitter = () => (Math.random() - 0.5) * 90;
        return {
            id: n.id,
            label: n.label,
            category: n.category,
            x: cat.cx + jitter(),
            y: cat.cy + jitter(),
            // Tooltip: concept label + its taxonomy category name (per spec).
            title: makeTip(n.label, cat.label),
            opacity: 1,
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

// Build the tooltip DOM element for a node.
function makeTip(label, categoryName) {
    const el = document.createElement('div');
    el.className = 'vn-tip';
    el.innerHTML = '<div class="vn-tip-label">' + label + '</div>' +
                   '<div class="vn-tip-cat">Category: ' + categoryName + '</div>';
    return el;
}

function buildVisEdges() {
    edgeRecords.length = 0;
    const visEdges = [];

    // Visible content edges. Each remembers the categories of its endpoints
    // so we can hide it when EITHER endpoint's category is toggled off.
    contentEdges.forEach(e => {
        const id = 'c' + (edgeAutoId++);
        const fromCat = rawNodes.find(n => n.id === e.from).category;
        const toCat = rawNodes.find(n => n.id === e.to).category;
        edgeRecords.push({ id: id, fromCat: fromCat, toCat: toCat });
        visEdges.push({
            id: id,
            from: e.from,
            to: e.to,
            hidden: false,
            color: { color: EDGE_COLOR, highlight: EDGE_COLOR, hover: EDGE_COLOR }
        });
    });

    // Invisible intra-category attractor edges create mutual attraction so
    // each taxonomy category settles into its own loose cluster. They never
    // render (hidden) and are excluded from filtering.
    CATEGORIES.forEach(cat => {
        const ids = rawNodes.filter(n => n.category === cat.key).map(n => n.id);
        for (let i = 0; i < ids.length; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                visEdges.push({
                    id: 'a' + (edgeAutoId++),
                    from: ids[i],
                    to: ids[j],
                    hidden: true,
                    physics: true,
                    color: { color: 'rgba(0,0,0,0)' },
                    length: 90,
                    arrows: { to: { enabled: false } }
                });
            }
        }
    });

    return visEdges;
}

function initializeNetwork() {
    nodes = new vis.DataSet(buildVisNodes());
    edges = new vis.DataSet(buildVisEdges());

    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: {
            enabled: true,
            solver: 'barnesHut',
            barnesHut: {
                gravitationalConstant: -3200,
                centralGravity: 0.35,
                springLength: 110,
                springConstant: 0.05,
                damping: 0.5,
                avoidOverlap: 0.4
            },
            stabilization: { enabled: true, iterations: 220, fit: true }
        },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            dragNodes: enableMouseInteraction,
            navigationButtons: true,
            hover: true,
            tooltipDelay: 120,
            keyboard: {
                enabled: enableMouseInteraction,
                bindToWindow: false,
                speed: { x: 2, y: 2, zoom: 0.01 }
            }
        },
        nodes: {
            shape: 'dot',           // circle for all concepts, per spec
            size: 15,
            font: { size: 12, face: 'Arial', color: '#0d1b2a' },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            width: 1.5,
            color: { color: EDGE_COLOR },
            arrows: { to: { enabled: true, scaleFactor: 0.7 } },
            smooth: { enabled: true, type: 'continuous' }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Force-directed spec: run physics, then freeze + fit once stabilized so
    // the layout does not keep drifting while the learner interacts.
    network.once('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });
}

// ===========================================
// DATASET QUERIES (live counts)
// ===========================================
function idsInCategory(key) {
    return nodes.getIds({ filter: n => n.category === key });
}

function countInCategory(key) {
    return nodes.get({ filter: n => n.category === key }).length;
}

// ===========================================
// FILTER LOGIC (uses updateOnly-style node.update calls)
// Toggling a category fades its nodes to 15% opacity and hides edges that
// touch it; toggling back restores full opacity and re-shows edges whose
// BOTH endpoints are visible.
// ===========================================
function applyCategoryVisibility(key) {
    const visible = visibleState[key];
    const cat = catByKey[key];

    // Fade or restore the category's nodes.
    nodes.update(idsInCategory(key).map(id => ({
        id: id,
        opacity: visible ? 1 : FADED_OPACITY,
        color: {
            background: visible ? cat.color : withAlpha(cat.color, FADED_OPACITY),
            border: visible ? cat.border : withAlpha(cat.border, FADED_OPACITY),
            highlight: { background: cat.color, border: cat.border },
            hover: { background: cat.color, border: cat.border }
        }
    })));

    // Recompute edge visibility: a content edge shows only when BOTH of its
    // endpoint categories are currently visible.
    edges.update(edgeRecords.map(rec => ({
        id: rec.id,
        hidden: !(visibleState[rec.fromCat] && visibleState[rec.toCat])
    })));

    network.redraw();
    refreshLegend();
}

// Toggle a single category on/off.
function toggleCategory(key) {
    visibleState[key] = !visibleState[key];
    applyCategoryVisibility(key);
}

// Isolate: show only this category, hide (fade) every other one.
function isolateCategory(key) {
    CATEGORIES.forEach(c => { visibleState[c.key] = (c.key === key); });
    // Re-apply for all categories.
    CATEGORIES.forEach(c => applyCategoryVisibilityNoRefresh(c.key));
    network.redraw();
    refreshLegend();
}

// Same as applyCategoryVisibility but without redraw/refresh (batch helper).
function applyCategoryVisibilityNoRefresh(key) {
    const visible = visibleState[key];
    const cat = catByKey[key];
    nodes.update(idsInCategory(key).map(id => ({
        id: id,
        opacity: visible ? 1 : FADED_OPACITY,
        color: {
            background: visible ? cat.color : withAlpha(cat.color, FADED_OPACITY),
            border: visible ? cat.border : withAlpha(cat.border, FADED_OPACITY),
            highlight: { background: cat.color, border: cat.border },
            hover: { background: cat.color, border: cat.border }
        }
    })));
    edges.update(edgeRecords.map(rec => ({
        id: rec.id,
        hidden: !(visibleState[rec.fromCat] && visibleState[rec.toCat])
    })));
}

// Reset: restore every category to visible.
function resetAll() {
    CATEGORIES.forEach(c => { visibleState[c.key] = true; });
    CATEGORIES.forEach(c => applyCategoryVisibilityNoRefresh(c.key));
    network.redraw();
    refreshLegend();
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

        const check = document.createElement('div');
        check.className = 'legend-check';

        const swatch = document.createElement('div');
        swatch.className = 'legend-swatch';
        swatch.style.backgroundColor = cat.color;
        swatch.style.borderColor = cat.border;

        const text = document.createElement('div');
        text.className = 'legend-text';
        const label = document.createElement('span');
        label.className = 'legend-label';
        label.textContent = cat.label;
        const count = document.createElement('span');
        count.className = 'legend-count';
        text.appendChild(label);
        text.appendChild(count);

        const only = document.createElement('button');
        only.className = 'legend-only';
        only.textContent = 'Only';
        only.title = 'Isolate this category';

        row.appendChild(check);
        row.appendChild(swatch);
        row.appendChild(text);
        row.appendChild(only);

        // Clicking the row toggles the category; the "Only" button isolates
        // it. stopPropagation keeps the Only click from also toggling.
        row.addEventListener('click', () => toggleCategory(cat.key));
        only.addEventListener('click', (e) => {
            e.stopPropagation();
            isolateCategory(cat.key);
        });

        list.appendChild(row);
    });

    refreshLegend();
}

// Update each row's checked state and live count.
function refreshLegend() {
    document.querySelectorAll('.legend-row').forEach(row => {
        const key = row.dataset.key;
        const visible = visibleState[key];
        row.classList.toggle('off', !visible);
        const total = countInCategory(key);
        row.querySelector('.legend-count').textContent =
            (visible ? total : 0) + ' / ' + total + ' shown';
    });
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    buildLegend();

    document.getElementById('reset-btn').addEventListener('click', resetAll);

    window.addEventListener('resize', function () {
        if (network) {
            network.fit({ animation: false });
        }
    });
});
