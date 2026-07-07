// Concept-to-Content Viewer
// Educational vis-network MicroSim - Chapter 18: Intelligent Textbooks, MicroSims, Deployment
// Bloom Level: Apply (L3) - use, demonstrate, apply
// CANVAS_HEIGHT: 560
//
// Learners search or click a concept, watch the selected node highlight gold,
// its prerequisites highlight blue (with a pulse), optionally its dependents
// highlight green, and see a Content Card jump to that concept's chapter/section.
// The point: navigation is graph-driven (by node ID), not keyword/page-number.

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
// COLORS (match legend swatches)
// ===========================================
const COLORS = {
    neutral:   { background: '#c8c8c8', border: '#8a8a8a', font: '#222' },
    selected:  { background: '#f1c40f', border: '#b8940b', font: '#222' },
    prereq:    { background: '#2f7ed8', border: '#1c4e8a', font: '#fff' },
    dependent: { background: '#27ae60', border: '#1a7a42', font: '#fff' }
};

// ===========================================
// SAMPLE DATA - 10 nodes / 12 edges, dependency-directed (from = prerequisite)
// Positioned left-to-right by dependency depth (circle shape, color by group).
// Each node carries its chapter/section content location.
// ===========================================
const nodeData = [
    { id: 1,  label: 'Graph Basics',       group: 'foundation',  x: -320, y: -140 },
    { id: 2,  label: 'Nodes & Edges',      group: 'foundation',  x: -320, y:   40 },
    { id: 3,  label: 'Directed Graphs',    group: 'core',        x: -120, y: -140 },
    { id: 4,  label: 'Dependency Edges',   group: 'core',        x: -120, y:   60 },
    { id: 5,  label: 'DAGs',               group: 'core',        x:   80, y:  -60 },
    { id: 6,  label: 'Topological Sort',   group: 'core',        x:  280, y: -160 },
    { id: 7,  label: 'Learning Path',      group: 'application', x:  280, y:   40 },
    { id: 8,  label: 'Prerequisite Rule',  group: 'core',        x:   80, y:  160 },
    { id: 9,  label: 'Ready-to-Learn',     group: 'application', x:  300, y:  180 },
    { id: 10, label: 'Personalization',    group: 'application', x:  480, y:   60 }
];

// Dependency edges: from = prerequisite, to = concept that depends on it.
const edgeData = [
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 5, to: 8 },
    { from: 6, to: 7 },
    { from: 8, to: 9 },
    { from: 7, to: 10 },
    { from: 9, to: 10 },
    { from: 4, to: 8 }
];

// Content lookup: node ID -> chapter card content. Keyed by ID (not label) to
// make the "graph-driven, not keyword" point concrete.
const CONTENT_LOOKUP = {
    1:  { chapter: 2,  section: '2.1 What Is a Graph?' },
    2:  { chapter: 2,  section: '2.3 Nodes and Edges' },
    3:  { chapter: 3,  section: '3.2 Directed vs. Undirected' },
    4:  { chapter: 3,  section: '3.4 Dependency Edges' },
    5:  { chapter: 5,  section: '5.1 Directed Acyclic Graphs' },
    6:  { chapter: 6,  section: '6.2 Topological Ordering' },
    7:  { chapter: 8,  section: '8.3 Building a Learning Path' },
    8:  { chapter: 7,  section: '7.1 The Prerequisite Rule' },
    9:  { chapter: 9,  section: '9.2 The Ready-to-Learn Frontier' },
    10: { chapter: 16, section: '16.4 Adaptive Personalization' }
};

// Group colors used ONLY for the neutral (unselected) state coloring by group,
// keeping the Chapters 11-15 convention of color-by-group.
const GROUP_COLORS = {
    foundation:  { background: '#e8e8e8', border: '#9e9e9e' },
    core:        { background: '#d6d6d6', border: '#8a8a8a' },
    application: { background: '#c8c8c8', border: '#7a7a7a' }
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let selectedId = null;
let showDependents = false;
let pulseTimer = null;

// ===========================================
// ADJACENCY HELPERS
// ===========================================
function getPrerequisites(id) {
    return edgeData.filter(e => e.to === id).map(e => e.from);
}
function getDependents(id) {
    return edgeData.filter(e => e.from === id).map(e => e.to);
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id,
        label: n.label,
        x: n.x,
        y: n.y,
        color: {
            background: GROUP_COLORS[n.group].background,
            border: GROUP_COLORS[n.group].border
        },
        font: { color: '#222', size: 13, face: 'Arial' }
    })));

    edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        color: { color: '#b8c4d0', highlight: '#607d8b' },
        width: 1.5
    })));

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'circle',      // circle shape per Chapters 11-15 convention
            widthConstraint: { minimum: 70, maximum: 90 },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 1 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    // Click a node = select it (same handler as search).
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            selectConcept(params.nodes[0]);
        }
    });
}

// ===========================================
// SELECTION (shared by search + node click)
// ===========================================
function selectConcept(id) {
    if (!CONTENT_LOOKUP[id]) return;
    selectedId = id;
    stopPulse();
    applyHighlight();
    updateCard();
    // Keep the search box in sync with a graph click.
    const node = nodeData.find(n => n.id === id);
    const searchInput = document.getElementById('concept-search');
    if (node && searchInput.value !== node.label) {
        searchInput.value = node.label;
    }
}

function applyHighlight() {
    const prereqs = getPrerequisites(selectedId);
    const dependents = showDependents ? getDependents(selectedId) : [];
    const prereqSet = new Set(prereqs);
    const depSet = new Set(dependents);

    const updates = nodeData.map(n => {
        let c;
        if (n.id === selectedId) {
            c = COLORS.selected;
        } else if (prereqSet.has(n.id)) {
            c = COLORS.prereq;
        } else if (depSet.has(n.id)) {
            c = COLORS.dependent;
        } else {
            const g = GROUP_COLORS[n.group];
            return {
                id: n.id,
                color: { background: g.background, border: g.border },
                font: { color: '#222', size: 13, face: 'Arial' },
                borderWidth: 2
            };
        }
        return {
            id: n.id,
            color: { background: c.background, border: c.border },
            font: { color: c.font, size: 13, face: 'Arial' },
            borderWidth: n.id === selectedId ? 4 : 3
        };
    });
    nodes.update(updates);

    // Emphasize edges into the selected node (prereq edges) blue; dependents green.
    edges.update(edgeData.map((e, i) => {
        if (e.to === selectedId) {
            return { id: i, color: { color: '#2f7ed8', highlight: '#1c4e8a' }, width: 3 };
        }
        if (showDependents && e.from === selectedId) {
            return { id: i, color: { color: '#27ae60', highlight: '#1a7a42' }, width: 3 };
        }
        return { id: i, color: { color: '#b8c4d0', highlight: '#607d8b' }, width: 1.5 };
    }));

    // Brief pulse on the prerequisite nodes.
    startPulse(prereqs);
}

// ===========================================
// PULSE ANIMATION on prerequisite nodes
// ===========================================
function startPulse(prereqs) {
    stopPulse();
    if (prereqs.length === 0) return;
    let step = 0;
    const maxSteps = 6; // 3 grow/shrink cycles
    pulseTimer = setInterval(function () {
        const grow = step % 2 === 0;
        nodes.update(prereqs.map(id => ({
            id: id,
            borderWidth: grow ? 6 : 3
        })));
        step++;
        if (step >= maxSteps) {
            stopPulse();
            nodes.update(prereqs.map(id => ({ id: id, borderWidth: 3 })));
        }
    }, 220);
}

function stopPulse() {
    if (pulseTimer) {
        clearInterval(pulseTimer);
        pulseTimer = null;
    }
}

// ===========================================
// CONTENT CARD
// ===========================================
function updateCard() {
    const content = CONTENT_LOOKUP[selectedId];
    const node = nodeData.find(n => n.id === selectedId);
    if (!content || !node) return;

    document.getElementById('card-placeholder').style.display = 'none';
    document.getElementById('card-detail').style.display = 'block';
    document.getElementById('card-eyebrow').textContent = 'Content Card';
    document.getElementById('card-concept').textContent = node.label;
    document.getElementById('card-chapter').textContent = 'Chapter ' + content.chapter;
    document.getElementById('card-section').textContent = content.section;

    const prereqLabels = getPrerequisites(selectedId)
        .map(pid => (nodeData.find(n => n.id === pid) || {}).label)
        .filter(Boolean);
    const prereqRow = document.getElementById('card-prereq-row');
    if (prereqLabels.length > 0) {
        document.getElementById('card-prereqs').textContent = prereqLabels.join(', ');
    } else {
        document.getElementById('card-prereqs').textContent = 'None (foundational)';
    }
    prereqRow.style.display = 'flex';

    document.getElementById('card-caption').style.display = 'block';
}

// ===========================================
// SEARCH INPUT (type-ahead against labels)
// ===========================================
function setupSearch() {
    const input = document.getElementById('concept-search');
    const datalist = document.getElementById('concept-options');

    // Populate autocomplete options with all 10 concept labels.
    nodeData.forEach(n => {
        const opt = document.createElement('option');
        opt.value = n.label;
        datalist.appendChild(opt);
    });

    function trySelectFromText() {
        const text = input.value.trim().toLowerCase();
        if (!text) return;
        // Exact label match first, then a unique prefix match.
        let match = nodeData.find(n => n.label.toLowerCase() === text);
        if (!match) {
            const prefixMatches = nodeData.filter(n => n.label.toLowerCase().startsWith(text));
            if (prefixMatches.length === 1) match = prefixMatches[0];
        }
        if (match) selectConcept(match.id);
    }

    input.addEventListener('change', trySelectFromText); // datalist pick fires change
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') trySelectFromText();
    });
}

// ===========================================
// TOGGLE: Show Prerequisites and Dependents
// ===========================================
function setupToggle() {
    document.getElementById('show-dependents').addEventListener('change', function (e) {
        showDependents = e.target.checked;
        if (selectedId !== null) {
            stopPulse();
            applyHighlight();
        }
    });
}

// ===========================================
// JUMP BUTTON (placeholder, explicitly non-functional)
// ===========================================
function setupJumpButton() {
    document.getElementById('jump-btn').addEventListener('click', function () {
        const note = document.querySelector('.jump-note');
        note.textContent = '(placeholder — in a real textbook this would open the chapter)';
    });
}

// ===========================================
// BOOT
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    setupSearch();
    setupToggle();
    setupJumpButton();
});
