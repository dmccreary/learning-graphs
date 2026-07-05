// Ready-to-Learn Frontier Simulator
// Educational vis-network visualization
// CANVAS_HEIGHT: 540
//
// Learners click a gold ("ready-to-learn") concept to mark it learned. The sim
// recomputes the ready-to-learn frontier: any gray concept whose prerequisites
// are now ALL learned flips to gold, with a brief pulse to highlight the cascade.
//
// Edge convention: an edge points from a dependent concept TO its prerequisite
// (dependent -> prerequisite). So a node's prerequisites are its outgoing-edge
// targets, exactly as the spec describes.

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
// COLOR STATES
// ===========================================
const STATE_COLORS = {
    notready: { background: '#cfd8dc', border: '#90a4ae', font: '#37474f' },
    ready:    { background: '#ffc107', border: '#ff8f00', font: '#3e2723' },
    learned:  { background: '#43a047', border: '#2e7d32', font: '#ffffff' }
};

// ===========================================
// DATASET (9-node math-sequence DAG)
// Hierarchical top-down: foundations at the BOTTOM (higher y = lower on screen).
// level 0 is rendered at the bottom via layout direction 'DU'.
// ===========================================
const nodeData = [
    { id: 'number_sense',    label: 'Number Sense',    level: 0 },
    { id: 'arithmetic',      label: 'Arithmetic',      level: 1 },
    { id: 'algebra',         label: 'Algebra',         level: 2 },
    { id: 'geometry',        label: 'Geometry',        level: 2 },
    { id: 'functions',       label: 'Functions',       level: 3 },
    { id: 'trigonometry',    label: 'Trigonometry',    level: 3 },
    { id: 'derivatives',     label: 'Derivatives',     level: 4 },
    { id: 'integrals',       label: 'Integrals',       level: 5 },
    { id: 'applied_calculus',label: 'Applied Calculus',level: 6 }
];

// Edges: dependent -> prerequisite
const edgeData = [
    { from: 'arithmetic',       to: 'number_sense' },
    { from: 'algebra',          to: 'arithmetic' },
    { from: 'geometry',         to: 'arithmetic' },
    { from: 'trigonometry',     to: 'geometry' },
    { from: 'trigonometry',     to: 'algebra' },
    { from: 'functions',        to: 'algebra' },
    { from: 'derivatives',      to: 'functions' },
    { from: 'derivatives',      to: 'trigonometry' },
    { from: 'integrals',        to: 'derivatives' },
    { from: 'applied_calculus', to: 'integrals' }
];

// Prerequisite lookup: id -> array of prerequisite ids (its outgoing targets)
const prereqs = {};
nodeData.forEach(n => { prereqs[n.id] = []; });
edgeData.forEach(e => { prereqs[e.from].push(e.to); });

function labelOf(id) {
    const n = nodeData.find(nd => nd.id === id);
    return n ? n.label : id;
}

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let learned = new Set();          // ids marked learned
let statusById = {};              // id -> 'notready' | 'ready' | 'learned'
let pulseTimers = [];

// ===========================================
// FRONTIER COMPUTATION
// A gray node is "ready" when EVERY prerequisite is in the learned set.
// A node with no prerequisites is ready from the start.
// ===========================================
function isReady(id) {
    return prereqs[id].every(p => learned.has(p));
}

// Recompute statuses; returns the list of ids that newly became ready
function recomputeFrontier() {
    const newlyReady = [];
    nodeData.forEach(n => {
        if (learned.has(n.id)) {
            statusById[n.id] = 'learned';
            return;
        }
        const wasReady = statusById[n.id] === 'ready';
        if (isReady(n.id)) {
            statusById[n.id] = 'ready';
            if (!wasReady) newlyReady.push(n.id);
        } else {
            statusById[n.id] = 'notready';
        }
    });
    return newlyReady;
}

// ===========================================
// RENDER HELPERS
// ===========================================
function applyNodeColor(id) {
    const c = STATE_COLORS[statusById[id]];
    nodes.update({
        id: id,
        color: { background: c.background, border: c.border },
        font: { color: c.font, size: 14 },
        borderWidth: statusById[id] === 'ready' ? 4 : 2
    });
}

function renderAllNodes() {
    nodeData.forEach(n => applyNodeColor(n.id));
}

function updateReadyList() {
    const list = document.getElementById('ready-list');
    const readyIds = nodeData.filter(n => statusById[n.id] === 'ready').map(n => n.id);
    list.innerHTML = '';
    if (readyIds.length === 0) {
        const li = document.createElement('li');
        li.className = 'ready-empty';
        li.textContent = 'None';
        list.appendChild(li);
        return;
    }
    readyIds.forEach(id => {
        const li = document.createElement('li');
        li.textContent = labelOf(id);
        list.appendChild(li);
    });
}

// ===========================================
// PULSE ANIMATION (gray -> gold transition)
// Briefly grows the node's border + size, then settles back.
// ===========================================
function pulseNode(id) {
    let frame = 0;
    const frames = 6;
    const timer = setInterval(function () {
        frame++;
        const t = Math.sin((frame / frames) * Math.PI); // 0 -> 1 -> 0
        nodes.update({
            id: id,
            borderWidth: 4 + Math.round(t * 8),
            size: 22 + Math.round(t * 10)
        });
        if (frame >= frames) {
            clearInterval(timer);
            // settle back to the standard ready styling
            nodes.update({ id: id, borderWidth: 4, size: 22 });
        }
    }, 60);
    pulseTimers.push(timer);
}

function clearPulses() {
    pulseTimers.forEach(t => clearInterval(t));
    pulseTimers = [];
}

// ===========================================
// CLICK HANDLING
// Only gold (ready) nodes are clickable to become learned.
// ===========================================
function handleClick(params) {
    if (!params.nodes.length) return;
    const id = params.nodes[0];
    if (statusById[id] !== 'ready') return; // ignore gray/green clicks

    learned.add(id);
    const newlyReady = recomputeFrontier();
    renderAllNodes();
    // Pulse each newly-unlocked node to draw attention to the cascade
    newlyReady.forEach(nid => pulseNode(nid));
    updateReadyList();
}

// ===========================================
// INITIAL / RESET STATE
// Only "Number Sense" learned, "Arithmetic" ready, everything else gray.
// ===========================================
function setInitialState() {
    clearPulses();
    learned = new Set(['number_sense']);
    recomputeFrontier();
    renderAllNodes();
    updateReadyList();
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    const enableMouse = !isInIframe();

    // Seed statuses before building the DataSet so first paint is correct
    learned = new Set(['number_sense']);
    recomputeFrontier();

    const visNodes = nodeData.map(node => {
        const c = STATE_COLORS[statusById[node.id]];
        return {
            id: node.id,
            label: node.label,
            level: node.level,
            shape: 'dot',
            size: 22,
            borderWidth: statusById[node.id] === 'ready' ? 4 : 2,
            color: { background: c.background, border: c.border },
            font: { color: c.font, size: 14 }
        };
    });

    const visEdges = edgeData.map((edge, index) => ({
        id: 'e' + index,
        from: edge.from,
        to: edge.to,
        title: labelOf(edge.from) + ' depends on ' + labelOf(edge.to),
        color: { color: '#90a4ae', highlight: '#607d8b' },
        width: 2
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU',        // foundations (level 0) at the BOTTOM
                sortMethod: 'directed',
                levelSeparation: 78,
                nodeSpacing: 130,
                treeSpacing: 130,
                blockShifting: true,
                edgeMinimization: true
            }
        },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            tooltipDelay: 150,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            width: 2,
            smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    network.on('click', handleClick);

    updateReadyList();
}

// ===========================================
// BOOTSTRAP
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    document.getElementById('reset-btn').addEventListener('click', setInitialState);
});
