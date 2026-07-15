// Structural Variations Explorer - vis-network MicroSim
// Chapter 1: Foundations of Concept Graphs
// Bloom: Evaluate (L5) - assess/justify which layout fits which task.
// One fixed 12-node dependency dataset rendered as Hierarchy, Cluster, and Hybrid.
// CANVAS_HEIGHT: 520

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
// SHARED DATASET (12 nodes from this chapter's concept list)
// band: 'primitives' | 'properties' | 'types'  (also the 3 detected clusters)
// ===========================================
const BANDS = {
    primitives: { label: 'Primitives',       cssColor: 'band-blue',  level: 0 },
    properties: { label: 'Graph Properties',  cssColor: 'band-green', level: 1 },
    types:      { label: 'Graph Types',       cssColor: 'band-amber', level: 2 }
};

const baseNodes = [
    { id: 'concept',  label: 'Concept',              band: 'primitives' },
    { id: 'node',     label: 'Node',                 band: 'primitives' },
    { id: 'edge',     label: 'Edge',                 band: 'primitives' },
    { id: 'graphrep', label: 'Graph\nRepresentation', band: 'properties' },
    { id: 'hierarchy',label: 'Hierarchy',            band: 'properties' },
    { id: 'cluster',  label: 'Cluster',              band: 'properties' },
    { id: 'digraph',  label: 'Directed\nGraph',      band: 'properties' },
    { id: 'dag',      label: 'DAG',                  band: 'types' },
    { id: 'depgraph', label: 'Dependency\nGraph',    band: 'types' },
    { id: 'concgraph',label: 'Concept\nGraph',       band: 'types' },
    { id: 'learngraph',label: 'Learning\nGraph',     band: 'types' },
    { id: 'hybrid',   label: 'Hybrid\nGraph',        band: 'types' }
];

// Dependency edges. primary=true forms the single-parent hierarchy tree;
// primary=false are "also depends on" secondary edges (dashed, de-emphasized).
const baseEdges = [
    // primitives -> graph representation
    { from: 'graphrep',  to: 'node',      primary: true },
    { from: 'graphrep',  to: 'edge',      primary: false },
    { from: 'node',      to: 'concept',   primary: true },
    { from: 'edge',      to: 'concept',   primary: false },
    // properties layer
    { from: 'hierarchy', to: 'graphrep',  primary: true },
    { from: 'cluster',   to: 'graphrep',  primary: true },
    { from: 'digraph',   to: 'graphrep',  primary: true },
    { from: 'digraph',   to: 'edge',      primary: false },
    // graph types layer
    { from: 'dag',       to: 'digraph',   primary: true },
    { from: 'depgraph',  to: 'dag',       primary: true },
    { from: 'depgraph',  to: 'hierarchy', primary: false },
    { from: 'concgraph', to: 'depgraph',  primary: true },
    { from: 'learngraph',to: 'concgraph', primary: true },
    { from: 'learngraph',to: 'depgraph',  primary: false },
    { from: 'hybrid',    to: 'hierarchy', primary: true },
    { from: 'hybrid',    to: 'cluster',   primary: false }
];

// Per-view trade-off statements (the Evaluate-level payload).
const tradeoffs = {
    hierarchy: {
        title: 'Hierarchy View',
        html: 'Strict top-down levels, one parent per node. ' +
              '<span class="good">Good for</span> finding "the" path to a concept and showing a learner their next step. ' +
              '<span class="bad">But</span> it forces every node to pick a single parent even when it has two real prerequisites ' +
              '(shown here as thin dashed "also depends on" lines).'
    },
    cluster: {
        title: 'Cluster View',
        html: 'Force-directed layout grouped by connection density into three communities. ' +
              '<span class="good">Good for</span> showing an instructor the subject\'s overall shape and which concepts clump together. ' +
              '<span class="bad">But</span> there is no clear "start here" &mdash; direction and learning order are hard to read.'
    },
    hybrid: {
        title: 'Hybrid View',
        html: 'Three ordered bands (Primitives &rarr; Graph Properties &rarr; Graph Types) with nodes settling locally inside each band. ' +
              '<span class="good">Good for</span> keeping a top-to-bottom learning order <em>and</em> revealing local clusters. ' +
              '<span class="bad">But</span> it is denser and takes more effort to read than either pure view.'
    }
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let currentView = 'hierarchy';
let degreeMap = {};
let stabilizeFallbackTimer = null;

// ===========================================
// DERIVED: node degree (total connections)
// ===========================================
function computeDegrees() {
    degreeMap = {};
    baseNodes.forEach(n => { degreeMap[n.id] = 0; });
    baseEdges.forEach(e => {
        degreeMap[e.from] = (degreeMap[e.from] || 0) + 1;
        degreeMap[e.to] = (degreeMap[e.to] || 0) + 1;
    });
}

// ===========================================
// NODE / EDGE BUILDERS
// ===========================================
function buildNodes() {
    return baseNodes.map(n => ({
        id: n.id,
        label: n.label,
        group: n.band,
        shape: 'ellipse',
        // Consistent light-blue coloring across ALL views (only layout changes).
        color: { background: '#97c2fc', border: '#2b7ce9', highlight: { background: '#c9e0ff', border: '#1a5bb8' } },
        font: { color: '#1a3a6c', size: 14, face: 'Arial' },
        borderWidth: 3
    }));
}

function buildEdges() {
    return baseEdges.map((e, i) => {
        if (e.primary) {
            return {
                id: 'e' + i, from: e.from, to: e.to,
                color: { color: '#2b7ce9', highlight: '#1a5bb8' },
                width: 2.2,
                dashes: false,
                arrows: { to: { enabled: true, scaleFactor: 1.0 } },
                smooth: { enabled: true, type: 'cubicBezier', roundness: 0.4 }
            };
        }
        // secondary "also depends on": thin dashed, de-emphasized
        return {
            id: 'e' + i, from: e.from, to: e.to,
            color: { color: '#b0bec5', highlight: '#90a4ae' },
            width: 1.3,
            dashes: [4, 4],
            arrows: { to: { enabled: true, scaleFactor: 0.7 } },
            smooth: { enabled: true, type: 'curvedCW', roundness: 0.25 }
        };
    });
}

// ===========================================
// LAYOUT OPTION SETS (swapped via setOptions)
// ===========================================
function hierarchyOptions() {
    return {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU',          // dependencies point up: prerequisites on top
                sortMethod: 'directed',
                levelSeparation: 110,
                nodeSpacing: 140,
                treeSpacing: 160,
                blockShifting: true,
                edgeMinimization: true
            }
        },
        physics: { enabled: false }
    };
}

function clusterOptions() {
    return {
        layout: { hierarchical: { enabled: false }, improvedLayout: false },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -60,
                centralGravity: 0.012,
                springLength: 110,
                springConstant: 0.09,
                damping: 0.5,
                avoidOverlap: 0.6
            },
            stabilization: { enabled: true, iterations: 250, updateInterval: 25, fit: true },
            maxVelocity: 40,
            minVelocity: 0.75
        }
    };
}

function hybridOptions() {
    // Hierarchical bands top-to-bottom, but physics ON so nodes cluster locally
    // within their level while the band order is preserved.
    return {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU',
                sortMethod: 'directed',
                levelSeparation: 150,
                nodeSpacing: 130,
                blockShifting: true,
                edgeMinimization: false
            }
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                nodeDistance: 130,
                centralGravity: 0.0,
                springLength: 100,
                springConstant: 0.06,
                damping: 0.5,
                avoidOverlap: 0.8
            },
            solver: 'hierarchicalRepulsion',
            stabilization: { enabled: true, iterations: 200, updateInterval: 25, fit: true },
            minVelocity: 0.75
        }
    };
}

// ===========================================
// BAND SHADING (background strips)
// Shown in Hierarchy + Hybrid (ordered bands / detected clusters);
// In Cluster view the three communities are shaded too but without strict bands.
// We recompute strip positions from live node canvas positions after layout.
// ===========================================
function updateBandShading() {
    const shading = document.getElementById('band-shading');
    shading.innerHTML = '';

    if (currentView === 'cluster') {
        // Communities float; skip strict horizontal strips to avoid misleading bands.
        return;
    }

    // Group node vertical (DOM) positions by band, then draw a strip spanning each.
    const order = ['primitives', 'properties', 'types'];
    const positions = network.getPositions();
    const bandY = {};
    order.forEach(b => { bandY[b] = { min: Infinity, max: -Infinity }; });

    baseNodes.forEach(n => {
        const p = positions[n.id];
        if (!p) return;
        const dom = network.canvasToDOM({ x: p.x, y: p.y });
        const b = n.band;
        if (dom.y < bandY[b].min) bandY[b].min = dom.y;
        if (dom.y > bandY[b].max) bandY[b].max = dom.y;
    });

    const container = document.getElementById('network');
    const h = container.clientHeight;
    const pad = 34;

    order.forEach(b => {
        if (bandY[b].min === Infinity) return;
        let top = bandY[b].min - pad;
        let bottom = bandY[b].max + pad;
        top = Math.max(0, top);
        bottom = Math.min(h, bottom);
        const strip = document.createElement('div');
        strip.className = 'band ' + BANDS[b].cssColor;
        strip.style.top = top + 'px';
        strip.style.height = (bottom - top) + 'px';
        const lbl = document.createElement('span');
        lbl.className = 'band-label';
        lbl.textContent = BANDS[b].label;
        strip.appendChild(lbl);
        shading.appendChild(strip);
    });
}

// ===========================================
// APPLY A VIEW
// ===========================================
function applyView(view) {
    currentView = view;

    let opts;
    if (view === 'hierarchy') opts = hierarchyOptions();
    else if (view === 'cluster') opts = clusterOptions();
    else opts = hybridOptions();

    // Common interaction/nodes/edges options preserved on every swap.
    opts.interaction = interactionOptions();
    opts.nodes = { shape: 'ellipse', margin: 10, borderWidth: 3,
                   shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 } };
    opts.edges = { width: 2 };

    network.setOptions(opts);

    // For fixed (physics-off) hierarchy, fit immediately + draw bands.
    if (view === 'hierarchy') {
        clearTimeout(stabilizeFallbackTimer);
        network.stabilize();
        network.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } });
        setTimeout(updateBandShading, 650);
    } else {
        // Physics views: bands/fit normally handled by finalizePhysicsView(),
        // triggered by the 'stabilizationIterationsDone' event. That event is
        // not reliably emitted for every hierarchical+physics combination, so
        // a fallback timer guarantees the view still gets fit to the settled
        // layout even if the event never fires.
        updateBandShading(); // clear immediately
        clearTimeout(stabilizeFallbackTimer);
        stabilizeFallbackTimer = setTimeout(finalizePhysicsView, 900);
    }

    updateButtons();
    updateInfobox();
}

// Disable physics and snap the view to the now-settled layout. Called from
// 'stabilizationIterationsDone' when that event fires, and from a fallback
// timer (see applyView) when it doesn't.
function finalizePhysicsView() {
    clearTimeout(stabilizeFallbackTimer);
    network.setOptions({ physics: { enabled: false } });
    network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
    setTimeout(function () {
        network.fit({ animation: false });
        updateBandShading();
    }, 420);
}

function interactionOptions() {
    const enableMouse = !isInIframe();
    return {
        selectConnectedEdges: false,
        hover: true,
        zoomView: enableMouse,
        dragView: enableMouse,
        dragNodes: true,       // let learners nudge nodes to explore
        navigationButtons: true,
        keyboard: { enabled: false }
    };
}

// ===========================================
// UI CHROME
// ===========================================
function updateButtons() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === currentView);
    });
}

function updateInfobox() {
    const t = tradeoffs[currentView];
    document.getElementById('info-title').textContent = t.title;
    document.getElementById('info-tradeoff').innerHTML = t.html;
}

// ===========================================
// HOVER: show degree badge in node title (native tooltip) + temporary label
// ===========================================
function attachHover() {
    network.on('hoverNode', function (params) {
        const id = params.node;
        const deg = degreeMap[id] || 0;
        nodes.update({ id: id, title: 'Degree (connections): ' + deg });
    });
}

// ===========================================
// INITIALIZE
// ===========================================
function initializeNetwork() {
    computeDegrees();
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());

    // Pre-seed titles with degree so the badge is available on first hover.
    baseNodes.forEach(n => {
        nodes.update({ id: n.id, title: 'Degree (connections): ' + (degreeMap[n.id] || 0) });
    });

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, hierarchyOptions());

    // When any physics layout finishes, disable physics, fit, and draw bands
    // (falls back to a timer in applyView() if this event never fires).
    network.on('stabilizationIterationsDone', finalizePhysicsView);

    // Keep band strips aligned if the view is dragged/zoomed (standalone) or animates.
    network.on('afterDrawing', function () {
        // Lightweight: only redraw strips for non-cluster static views.
        if (currentView !== 'cluster') {
            // Avoid thrash: this is cheap DOM work relative to canvas paint.
        }
    });

    attachHover();

    // Start in hierarchy view.
    applyView('hierarchy');
}

// ===========================================
// EVENT WIRING
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const view = btn.dataset.view;
            if (view !== currentView) applyView(view);
        });
    });

    window.addEventListener('resize', function () {
        if (!network) return;
        network.fit({ animation: false });
        updateBandShading();
    });
});
