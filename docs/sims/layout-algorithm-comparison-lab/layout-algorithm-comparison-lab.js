// Layout Algorithm Comparison Lab
// vis-network MicroSim - Chapter 13: Physics Simulation and Graph Layout
// Bloom Evaluate (L5): justify a layout choice for a stated audience/purpose.
// CANVAS_HEIGHT: 600

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
// CLUSTER COLORS (Chapter 11 conventions)
// ===========================================
const clusterColors = {
    a:      { background: '#4c8bf5', border: '#1a56c4', font: '#ffffff' }, // Data Modeling cluster
    b:      { background: '#34a853', border: '#1e7e34', font: '#ffffff' }, // Visualization cluster
    bridge: { background: '#fbbc04', border: '#c79100', font: '#333333' }  // Bridge concept
};

// Pin marker appended to a label when a node is pinned
const PIN_ICON = ' 📌';

// ===========================================
// 30-NODE SAMPLE LEARNING GRAPH
// Two topic clusters (a, b), one bridge concept, and a clear
// prerequisite chain of >= 5 levels. `level` drives hierarchical layout.
// Two nodes are author-fixed (authorFixed:true) to demonstrate Fixed Node Position.
// ===========================================
const baseNodes = [
    // --- Cluster A: Data Modeling (prerequisite chain, 6 levels) ---
    { id: 1,  label: 'Nodes & Edges',        cluster: 'a', level: 0, authorFixed: true },
    { id: 2,  label: 'Graph Data',           cluster: 'a', level: 1 },
    { id: 3,  label: 'Directed Edges',       cluster: 'a', level: 1 },
    { id: 4,  label: 'Adjacency',            cluster: 'a', level: 2 },
    { id: 5,  label: 'Prerequisites',        cluster: 'a', level: 2 },
    { id: 6,  label: 'DAG',                  cluster: 'a', level: 3 },
    { id: 7,  label: 'Topological Order',    cluster: 'a', level: 4 },
    { id: 8,  label: 'Cycle Detection',      cluster: 'a', level: 4 },
    { id: 9,  label: 'Concept Taxonomy',     cluster: 'a', level: 2 },
    { id: 10, label: 'Dependency Depth',     cluster: 'a', level: 3 },
    { id: 11, label: 'Graph Validation',     cluster: 'a', level: 5 },
    { id: 12, label: 'Indegree',             cluster: 'a', level: 3 },
    { id: 13, label: 'Outdegree',            cluster: 'a', level: 3 },
    { id: 14, label: 'Orphan Check',         cluster: 'a', level: 4 },

    // --- Bridge concept (connects both clusters) ---
    { id: 15, label: 'Learning Graph',       cluster: 'bridge', level: 3 },

    // --- Cluster B: Visualization (prerequisite chain, 6 levels) ---
    { id: 16, label: 'Coordinate System',    cluster: 'b', level: 0, authorFixed: true },
    { id: 17, label: 'Node Shapes',          cluster: 'b', level: 1 },
    { id: 18, label: 'Node Colors',          cluster: 'b', level: 1 },
    { id: 19, label: 'Node Styling',         cluster: 'b', level: 2 },
    { id: 20, label: 'Edge Styling',         cluster: 'b', level: 2 },
    { id: 21, label: 'Legends',              cluster: 'b', level: 3 },
    { id: 22, label: 'Physics Options',      cluster: 'b', level: 3 },
    { id: 23, label: 'Force-Directed',       cluster: 'b', level: 4 },
    { id: 24, label: 'Hierarchical',         cluster: 'b', level: 4 },
    { id: 25, label: 'Layout Direction',     cluster: 'b', level: 5 },
    { id: 26, label: 'Fixed Positions',      cluster: 'b', level: 4 },
    { id: 27, label: 'Clustering',           cluster: 'b', level: 5 },
    { id: 28, label: 'Interactive Legend',   cluster: 'b', level: 4 },
    { id: 29, label: 'Hover Tooltips',       cluster: 'b', level: 3 },
    { id: 30, label: 'Graph Viewer',         cluster: 'b', level: 5 }
];

// Directed prerequisite edges (from prereq -> dependent, following level order)
const baseEdges = [
    // Cluster A chain
    { from: 1, to: 2 }, { from: 1, to: 3 },
    { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 2, to: 9 },
    { from: 3, to: 4 },
    { from: 4, to: 12 }, { from: 4, to: 13 },
    { from: 5, to: 6 }, { from: 9, to: 10 },
    { from: 6, to: 7 }, { from: 6, to: 8 }, { from: 10, to: 6 },
    { from: 12, to: 14 }, { from: 13, to: 14 },
    { from: 7, to: 11 }, { from: 8, to: 11 }, { from: 14, to: 11 },

    // Bridge wiring: bridge depends on cluster A, and cluster B depends on bridge
    { from: 6, to: 15 }, { from: 5, to: 15 },
    { from: 15, to: 22 }, { from: 15, to: 19 },

    // Cluster B chain
    { from: 16, to: 17 }, { from: 16, to: 18 },
    { from: 17, to: 19 }, { from: 18, to: 19 },
    { from: 19, to: 20 }, { from: 19, to: 29 },
    { from: 20, to: 21 }, { from: 22, to: 23 }, { from: 22, to: 24 },
    { from: 23, to: 26 }, { from: 24, to: 25 },
    { from: 21, to: 28 }, { from: 29, to: 28 },
    { from: 24, to: 27 }, { from: 26, to: 27 },
    { from: 25, to: 30 }, { from: 27, to: 30 }, { from: 28, to: 30 }
];

// ===========================================
// SCENARIO PROMPTS (rotating framings for L5 justification)
// ===========================================
const scenarios = [
    'You are showing this graph to a student asking "What do I need to learn first?" Which layout makes the prerequisite order easiest to read?',
    'You are showing this graph to a curriculum reviewer checking for orphaned or disconnected clusters. Which layout makes the two clusters and the bridge stand out?',
    'You are printing this graph in a landscape textbook page. Which hierarchical direction (UD, DU, LR, RL) fits the page shape best?',
    'You want to emphasize how tightly the "Data Modeling" concepts group together. Would Barnes-Hut or ForceAtlas2 pull that cluster into a tighter ball?',
    'You are presenting to instructors who read top-to-bottom like a syllabus. Which layout mode and direction match that reading habit?',
    'A learner complains the graph "looks like a hairball." Which layout untangles the prerequisite chain into clear levels?'
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let layoutMode = 'force';           // 'force' | 'hier'
let solver = 'barnesHut';           // 'barnesHut' | 'forceAtlas2Based'
let direction = 'UD';               // 'UD' | 'DU' | 'LR' | 'RL'
let pinMode = false;
let pinnedIds = new Set();          // learner-pinned node ids
let pinnedPos = {};                 // id -> {x,y} dropped position for learner pins
let scenarioIndex = 0;
const authorFixedIds = baseNodes.filter(n => n.authorFixed).map(n => n.id);

// Anchor coordinates for the two author-fixed nodes so they hold a stable,
// visible position under force-directed layout (rather than collapsing to 0,0).
const authorFixedPos = {
    1:  { x: -260, y: -200 },  // Cluster A root
    16: { x:  260, y: -200 }   // Cluster B root
};

// ===========================================
// BUILD VIS DATASETS
// ===========================================
// In hierarchical mode we must NOT pin any node: the hierarchical solver
// places every node by level, and a stray fixed node distorts the tree.
function buildNodes() {
    const hier = layoutMode === 'hier';
    return baseNodes.map(n => {
        const c = clusterColors[n.cluster];
        const isPinned = pinnedIds.has(n.id) || n.authorFixed;
        const node = {
            id: n.id,
            label: n.label + (isPinned ? PIN_ICON : ''),
            level: n.level,
            color: {
                background: c.background,
                border: isPinned ? '#d93025' : c.border,
                highlight: { background: c.background, border: '#d93025' }
            },
            borderWidth: isPinned ? 4 : 2,
            font: { color: c.font, size: 13, face: 'Arial' },
            fixed: { x: false, y: false }
        };
        // Author-fixed nodes get an explicit anchor + fixed flag in force mode.
        if (n.authorFixed && !hier) {
            node.x = authorFixedPos[n.id].x;
            node.y = authorFixedPos[n.id].y;
            node.fixed = { x: true, y: true };
        }
        // Learner-pinned nodes keep their dropped position across a force re-stabilize.
        if (!n.authorFixed && !hier && pinnedIds.has(n.id) && pinnedPos[n.id]) {
            node.x = pinnedPos[n.id].x;
            node.y = pinnedPos[n.id].y;
            node.fixed = { x: true, y: true };
        }
        return node;
    });
}

function buildEdges() {
    return baseEdges.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        color: { color: '#8a94a6', highlight: '#d93025' },
        width: 1.5
    }));
}

// ===========================================
// OPTIONS PER MODE
// ===========================================
function buildOptions() {
    const enableMouse = !isInIframe();
    const common = {
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: true,          // needed so learners can drag-to-pin
            navigationButtons: true,
            hover: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'box',
            margin: 8,
            widthConstraint: { maximum: 130 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { enabled: true, type: 'cubicBezier', roundness: 0.4 }
        }
    };

    if (layoutMode === 'hier') {
        return Object.assign({}, common, {
            layout: {
                hierarchical: {
                    enabled: true,
                    direction: direction,
                    sortMethod: 'directed',
                    levelSeparation: 90,
                    nodeSpacing: 120,
                    treeSpacing: 160,
                    blockShifting: true,
                    edgeMinimization: true
                }
            },
            physics: { enabled: false }
        });
    }

    // Force-directed
    return Object.assign({}, common, {
        layout: { hierarchical: { enabled: false }, improvedLayout: true },
        physics: {
            enabled: true,
            solver: solver,
            stabilization: { enabled: true, iterations: 220, fit: true },
            barnesHut: {
                gravitationalConstant: -6000,
                springLength: 110,
                springConstant: 0.04,
                centralGravity: 0.35,
                damping: 0.4,
                avoidOverlap: 0.2
            },
            forceAtlas2Based: {
                gravitationalConstant: -80,
                springLength: 110,
                springConstant: 0.08,
                centralGravity: 0.012,
                damping: 0.5,
                avoidOverlap: 0.4
            }
        }
    });
}

// ===========================================
// APPLY / RE-STABILIZE
// ===========================================
function applyLayout(rebuildData) {
    if (rebuildData) {
        nodes.clear();
        nodes.add(buildNodes());
    }
    network.setOptions(buildOptions());

    if (layoutMode === 'force') {
        // Re-enable physics, then freeze once stable and fit the view.
        network.setOptions({ physics: { enabled: true } });
        network.stabilize();
    } else {
        // Hierarchical is deterministic; just fit after reflow.
        network.once('afterDrawing', function () {
            network.fit({ animation: false });
        });
        network.redraw();
    }
    updateStatus();
}

// ===========================================
// UI HELPERS
// ===========================================
function updateStatus() {
    const el = document.getElementById('status-line');
    if (!el) return;
    if (layoutMode === 'force') {
        const nice = solver === 'barnesHut' ? 'Barnes-Hut' : 'ForceAtlas2';
        el.textContent = 'Force-Directed · ' + nice;
    } else {
        el.textContent = 'Hierarchical · ' + direction;
    }
}

function setMode(mode) {
    layoutMode = mode;
    document.getElementById('mode-force').classList.toggle('active', mode === 'force');
    document.getElementById('mode-hier').classList.toggle('active', mode === 'hier');

    const dirSel = document.getElementById('direction-select');
    const dirLbl = document.getElementById('direction-label');
    const solSel = document.getElementById('solver-select');
    const solLbl = document.getElementById('solver-label');

    const hier = mode === 'hier';
    dirSel.disabled = !hier;
    dirLbl.classList.toggle('disabled', !hier);
    solSel.disabled = hier;
    solLbl.classList.toggle('disabled', hier);

    // Rebuild node data so per-mode fixed/anchor logic re-applies.
    applyLayout(true);
}

function showScenario() {
    document.getElementById('scenario-text').textContent = scenarios[scenarioIndex];
}

// ===========================================
// PIN-ON-DRAG
// ===========================================
function handleDragEnd(params) {
    if (!params.nodes || params.nodes.length === 0) return;
    params.nodes.forEach(id => {
        if (authorFixedIds.includes(id)) return; // author-fixed already pinned
        if (!pinMode) return;                     // only pin while in pin mode
        pinnedIds.add(id);
        const pos = network.getPositions([id])[id];
        pinnedPos[id] = { x: pos.x, y: pos.y };
        // Freeze this node at its dropped location.
        nodes.update({
            id: id,
            x: pos.x,
            y: pos.y,
            fixed: { x: true, y: true },
            label: baseNodes.find(n => n.id === id).label + PIN_ICON,
            borderWidth: 4,
            color: { border: '#d93025' }
        });
    });
}

function togglePinMode() {
    pinMode = !pinMode;
    const btn = document.getElementById('pin-mode-btn');
    btn.classList.toggle('active', pinMode);
    btn.textContent = pinMode ? 'Pin Mode: ON (drag a node)' : 'Drag to Pin a Node';
}

function resetLayout() {
    // Clear learner pins; keep the two author-fixed nodes pinned.
    pinnedIds.clear();
    pinnedPos = {};
    pinMode = false;
    const btn = document.getElementById('pin-mode-btn');
    btn.classList.remove('active');
    btn.textContent = 'Drag to Pin a Node';
    applyLayout(true);
}

// ===========================================
// INIT
// ===========================================
function init() {
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, buildOptions());

    // Freeze physics once the force layout stabilizes, then fit.
    network.on('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    network.on('dragEnd', handleDragEnd);

    // Wire controls
    document.getElementById('mode-force').addEventListener('click', () => setMode('force'));
    document.getElementById('mode-hier').addEventListener('click', () => setMode('hier'));

    document.getElementById('direction-select').addEventListener('change', function () {
        direction = this.value;
        if (layoutMode === 'hier') applyLayout(false);
    });
    document.getElementById('solver-select').addEventListener('change', function () {
        solver = this.value;
        if (layoutMode === 'force') applyLayout(false);
    });

    document.getElementById('pin-mode-btn').addEventListener('click', togglePinMode);
    document.getElementById('reset-btn').addEventListener('click', resetLayout);
    document.getElementById('scenario-btn').addEventListener('click', function () {
        scenarioIndex = (scenarioIndex + 1) % scenarios.length;
        showScenario();
    });

    // Kick off default force layout
    network.stabilize();
    showScenario();
    updateStatus();

    window.addEventListener('resize', function () {
        network.fit({ animation: false });
    });
}

document.addEventListener('DOMContentLoaded', init);
