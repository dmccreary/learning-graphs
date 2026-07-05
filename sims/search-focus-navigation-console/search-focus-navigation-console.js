// Search and Focus Navigation Console
// CANVAS_HEIGHT: 600
// Educational vis-network MicroSim (Bloom L3 - Apply)
// A 60-node sample learning graph with the full navigation pipeline:
//   - type-ahead search box -> live suggestion dropdown
//   - clicking a suggestion -> network.focus() (animated) + selectNodes()
//   - hover -> built-in tooltip
//   - double-click -> node inspector (label, title, url, prereqs, dependents)
//   - single-click empty canvas -> close inspector + clear selection
//   - Reset View -> clear search, close inspector, re-fit graph

// ===========================================
// TAXONOMY (Chapter 11 style node coloring)
// ===========================================
const taxonomy = {
    foundation:  { label: 'Foundation',   background: '#90caf9', border: '#1565c0' },
    structure:   { label: 'Graph Theory', background: '#a5d6a7', border: '#2e7d32' },
    theory:      { label: 'Learning',     background: '#ffcc80', border: '#ef6c00' },
    tooling:     { label: 'Tools/Vis',    background: '#ce93d8', border: '#6a1b9a' },
    goal:        { label: 'Goal',         background: '#ef9a9a', border: '#c62828' }
};

// ===========================================
// 60-NODE SAMPLE LEARNING GRAPH
// A handful of hub concepts, several prerequisite chains, some leaf concepts.
// Every node carries a `title` tooltip and a `url` placeholder property.
// ===========================================
const rawNodes = [
    // --- Foundation hubs & basics (ids 1-12) ---
    { id: 1,  label: 'Graph',                tax: 'foundation' },
    { id: 2,  label: 'Node',                 tax: 'foundation' },
    { id: 3,  label: 'Edge',                 tax: 'foundation' },
    { id: 4,  label: 'Directed Edge',        tax: 'foundation' },
    { id: 5,  label: 'Undirected Edge',      tax: 'foundation' },
    { id: 6,  label: 'Vertex Degree',        tax: 'foundation' },
    { id: 7,  label: 'Adjacency',            tax: 'foundation' },
    { id: 8,  label: 'Adjacency List',       tax: 'foundation' },
    { id: 9,  label: 'Adjacency Matrix',     tax: 'foundation' },
    { id: 10, label: 'Path',                 tax: 'foundation' },
    { id: 11, label: 'Cycle',                tax: 'foundation' },
    { id: 12, label: 'Connected Component',  tax: 'foundation' },

    // --- Graph theory / structure (ids 13-27) ---
    { id: 13, label: 'DAG',                  tax: 'structure' },
    { id: 14, label: 'Topological Sort',     tax: 'structure' },
    { id: 15, label: 'Cycle Detection',      tax: 'structure' },
    { id: 16, label: 'Prerequisite Chain',   tax: 'structure' },
    { id: 17, label: 'Transitive Closure',   tax: 'structure' },
    { id: 18, label: 'Graph Traversal',      tax: 'structure' },
    { id: 19, label: 'Breadth-First Search', tax: 'structure' },
    { id: 20, label: 'Depth-First Search',   tax: 'structure' },
    { id: 21, label: 'Shortest Path',        tax: 'structure' },
    { id: 22, label: 'Central Gravity',      tax: 'structure' },
    { id: 23, label: 'Force-Directed Layout',tax: 'structure' },
    { id: 24, label: 'Hierarchical Layout',  tax: 'structure' },
    { id: 25, label: 'Graph Clustering',     tax: 'structure' },
    { id: 26, label: 'Hub Node',             tax: 'structure' },
    { id: 27, label: 'Leaf Concept',         tax: 'structure' },

    // --- Learning theory (ids 28-40) ---
    { id: 28, label: 'Learning Objective',   tax: 'theory' },
    { id: 29, label: "Bloom's Taxonomy",     tax: 'theory' },
    { id: 30, label: 'Concept Dependency',   tax: 'theory' },
    { id: 31, label: 'Mastery Learning',     tax: 'theory' },
    { id: 32, label: 'Spaced Repetition',    tax: 'theory' },
    { id: 33, label: 'Zone of Proximal Dev', tax: 'theory' },
    { id: 34, label: 'Scaffolding',          tax: 'theory' },
    { id: 35, label: 'Formative Assessment', tax: 'theory' },
    { id: 36, label: 'Summative Assessment', tax: 'theory' },
    { id: 37, label: 'Learning Path',        tax: 'theory' },
    { id: 38, label: 'Adaptive Sequencing',  tax: 'theory' },
    { id: 39, label: 'Prior Knowledge',      tax: 'theory' },
    { id: 40, label: 'Rhizomatic Learning',  tax: 'theory' },

    // --- Tooling / visualization (ids 41-52) ---
    { id: 41, label: 'vis-network',          tax: 'tooling' },
    { id: 42, label: 'DataSet',              tax: 'tooling' },
    { id: 43, label: 'Node Options',         tax: 'tooling' },
    { id: 44, label: 'Edge Options',         tax: 'tooling' },
    { id: 45, label: 'Physics Engine',       tax: 'tooling' },
    { id: 46, label: 'Navigation Buttons',   tax: 'tooling' },
    { id: 47, label: 'Focus Node',           tax: 'tooling' },
    { id: 48, label: 'Type-Ahead Search',    tax: 'tooling' },
    { id: 49, label: 'Node Inspector',       tax: 'tooling' },
    { id: 50, label: 'Tooltip',              tax: 'tooling' },
    { id: 51, label: 'JSON Import/Export',   tax: 'tooling' },
    { id: 52, label: 'Graph Editor',         tax: 'tooling' },

    // --- Goal concepts (ids 53-60) ---
    { id: 53, label: 'Learning Graph',       tax: 'goal' },
    { id: 54, label: 'Intelligent Textbook', tax: 'goal' },
    { id: 55, label: 'MicroSim',             tax: 'goal' },
    { id: 56, label: 'Personalization',      tax: 'goal' },
    { id: 57, label: 'Quality Gate',         tax: 'goal' },
    { id: 58, label: 'LMS Integration',      tax: 'goal' },
    { id: 59, label: 'Deployment Pattern',   tax: 'goal' },
    { id: 60, label: 'Certification Prep',   tax: 'goal' }
];

// Edges (from = prerequisite, to = dependent). ~75 edges with hubs & chains.
const rawEdges = [
    // Foundation chains
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 3, to: 4 }, { from: 3, to: 5 },
    { from: 2, to: 6 }, { from: 3, to: 6 }, { from: 2, to: 7 }, { from: 7, to: 8 },
    { from: 7, to: 9 }, { from: 3, to: 10 }, { from: 10, to: 11 }, { from: 2, to: 12 },
    { from: 3, to: 12 },
    // Structure
    { from: 4, to: 13 }, { from: 11, to: 13 }, { from: 13, to: 14 }, { from: 11, to: 15 },
    { from: 13, to: 15 }, { from: 13, to: 16 }, { from: 16, to: 17 }, { from: 10, to: 18 },
    { from: 18, to: 19 }, { from: 18, to: 20 }, { from: 10, to: 21 }, { from: 21, to: 19 },
    { from: 45, to: 22 }, { from: 22, to: 23 }, { from: 13, to: 24 }, { from: 12, to: 25 },
    { from: 6, to: 26 }, { from: 26, to: 25 }, { from: 6, to: 27 },
    // Learning theory
    { from: 29, to: 28 }, { from: 16, to: 30 }, { from: 30, to: 31 }, { from: 31, to: 32 },
    { from: 33, to: 34 }, { from: 28, to: 35 }, { from: 28, to: 36 }, { from: 30, to: 37 },
    { from: 14, to: 37 }, { from: 37, to: 38 }, { from: 39, to: 38 }, { from: 34, to: 38 },
    { from: 18, to: 40 }, { from: 37, to: 40 },
    // Tooling
    { from: 1, to: 41 }, { from: 41, to: 42 }, { from: 41, to: 43 }, { from: 41, to: 44 },
    { from: 23, to: 45 }, { from: 41, to: 46 }, { from: 41, to: 47 }, { from: 42, to: 48 },
    { from: 47, to: 48 }, { from: 47, to: 49 }, { from: 43, to: 50 }, { from: 42, to: 51 },
    { from: 51, to: 52 }, { from: 49, to: 52 },
    // Goals
    { from: 16, to: 53 }, { from: 30, to: 53 }, { from: 25, to: 53 }, { from: 53, to: 54 },
    { from: 41, to: 54 }, { from: 54, to: 55 }, { from: 38, to: 56 }, { from: 37, to: 56 },
    { from: 15, to: 57 }, { from: 36, to: 57 }, { from: 54, to: 58 }, { from: 54, to: 59 },
    { from: 56, to: 59 }, { from: 57, to: 60 }, { from: 36, to: 60 }
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let nodeById = {};
let activeSuggestionIndex = -1;
let currentSuggestions = [];

// ===========================================
// BUILD NODE / EDGE DATASETS
// ===========================================
function buildData() {
    const visNodes = rawNodes.map(n => {
        const t = taxonomy[n.tax];
        nodeById[n.id] = n;
        return {
            id: n.id,
            label: n.label,
            group: n.tax,
            // Built-in tooltip naming the concept and its taxonomy category.
            title: n.label + ' (' + t.label + ' concept)',
            url: 'https://example.org/concepts/' + slug(n.label),  // placeholder property
            color: {
                background: t.background,
                border: t.border,
                highlight: { background: t.background, border: '#ff9800' }
            },
            font: { color: '#1a202c', size: 13, face: 'Arial' }
        };
    });

    const visEdges = rawEdges.map((e, i) => ({
        id: 'e' + i,
        from: e.from,
        to: e.to,
        color: { color: '#b0bec5', highlight: '#ff9800' },
        width: 1.5
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);
}

function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ===========================================
// NETWORK INIT
// ===========================================
function initNetwork() {
    const enableView = !isInIframe();

    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true,
            barnesHut: { gravitationalConstant: -8000, springLength: 95, springConstant: 0.04, damping: 0.4 },
            stabilization: { iterations: 300 }
        },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            tooltipDelay: 120,
            zoomView: enableView,
            dragView: enableView,
            dragNodes: true,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'dot',
            size: 14,
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.6 } },
            width: 1.5,
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Freeze layout once stabilized so search/focus doesn't jitter the graph.
    network.once('stabilizationIterationsDone', function() {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    // Hover -> update status line (built-in tooltip also shows).
    network.on('hoverNode', function(params) {
        const n = nodeById[params.node];
        if (n) setStatus('Hovering: ' + n.label, true);
    });
    network.on('blurNode', function() {
        setStatus('Type to search across 60 concepts.', false);
    });

    // Single click: node selects; empty canvas closes inspector + clears selection.
    network.on('click', function(params) {
        if (params.nodes.length === 0) {
            network.unselectAll();
            closeInspector();
            setStatus('Type to search across 60 concepts.', false);
        }
    });

    // Double click: open the node inspector.
    network.on('doubleClick', function(params) {
        if (params.nodes.length > 0) {
            openInspector(params.nodes[0]);
        }
    });
}

// ===========================================
// TYPE-AHEAD SEARCH (DataSet filter on every keystroke)
// ===========================================
function handleSearchInput() {
    const query = document.getElementById('search-input').value.trim();
    const dropdown = document.getElementById('suggestions');
    activeSuggestionIndex = -1;

    if (query.length === 0) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        currentSuggestions = [];
        setStatus('Type to search across 60 concepts.', false);
        return;
    }

    const q = query.toLowerCase();
    // filter-based nodes.get() search by partial label match.
    const matches = nodes.get({
        filter: function(item) {
            return item.label.toLowerCase().indexOf(q) !== -1;
        }
    });
    currentSuggestions = matches;

    renderSuggestions(matches, q);
    setStatus(matches.length + ' match' + (matches.length === 1 ? '' : 'es') +
        " for '" + query + "'", true);
}

function renderSuggestions(matches, q) {
    const dropdown = document.getElementById('suggestions');
    dropdown.innerHTML = '';

    if (matches.length === 0) {
        const li = document.createElement('li');
        li.className = 'suggestion-empty';
        li.textContent = 'No concepts match.';
        dropdown.appendChild(li);
        dropdown.style.display = 'block';
        return;
    }

    matches.forEach((m, idx) => {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.dataset.nodeId = m.id;
        li.dataset.index = idx;

        // color swatch reflecting taxonomy
        const sw = document.createElement('span');
        sw.className = 'suggestion-swatch';
        sw.style.backgroundColor = taxonomy[nodeById[m.id].tax].background;
        li.appendChild(sw);

        // label with the matched substring emphasized
        const labelSpan = document.createElement('span');
        labelSpan.innerHTML = emphasize(m.label, q);
        li.appendChild(labelSpan);

        li.addEventListener('click', function() {
            focusOnNode(m.id);
        });
        dropdown.appendChild(li);
    });

    dropdown.style.display = 'block';
}

function emphasize(label, q) {
    const lower = label.toLowerCase();
    const i = lower.indexOf(q);
    if (i === -1) return escapeHtml(label);
    return escapeHtml(label.slice(0, i)) +
        '<span class="match">' + escapeHtml(label.slice(i, i + q.length)) + '</span>' +
        escapeHtml(label.slice(i + q.length));
}

function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Keyboard navigation of the suggestion dropdown.
function handleSearchKeydown(e) {
    const dropdown = document.getElementById('suggestions');
    if (dropdown.style.display === 'none') return;
    const items = dropdown.querySelectorAll('.suggestion-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeSuggestionIndex = Math.min(activeSuggestionIndex + 1, items.length - 1);
        updateActiveSuggestion(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeSuggestionIndex = Math.max(activeSuggestionIndex - 1, 0);
        updateActiveSuggestion(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const target = activeSuggestionIndex >= 0 ? items[activeSuggestionIndex] : items[0];
        if (target) focusOnNode(parseInt(target.dataset.nodeId, 10));
    } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
    }
}

function updateActiveSuggestion(items) {
    items.forEach((it, i) => it.classList.toggle('active', i === activeSuggestionIndex));
    if (activeSuggestionIndex >= 0 && items[activeSuggestionIndex]) {
        items[activeSuggestionIndex].scrollIntoView({ block: 'nearest' });
    }
}

// ===========================================
// FOCUS NAVIGATION (per chapter focusOnNode example)
// ===========================================
function focusOnNode(nodeId) {
    const n = nodeById[nodeId];
    document.getElementById('suggestions').style.display = 'none';

    network.selectNodes([nodeId]);
    network.focus(nodeId, {
        scale: 1.3,
        animation: { duration: 500, easingFunction: 'easeInOutQuad' }
    });
    setStatus('Focused: ' + n.label, true);
}

// ===========================================
// NODE INSPECTOR
// ===========================================
function openInspector(nodeId) {
    const n = nodeById[nodeId];
    const visNode = nodes.get(nodeId);

    // Scan the edges DataSet for prerequisites (into this node) and dependents (out of it).
    const prereqs = [];
    const dependents = [];
    edges.get().forEach(e => {
        if (e.to === nodeId) prereqs.push(nodeById[e.from].label);
        if (e.from === nodeId) dependents.push(nodeById[e.to].label);
    });

    document.getElementById('inspector-title').textContent = n.label;

    const body = document.getElementById('inspector-body');
    body.innerHTML =
        field('Concept', escapeHtml(n.label)) +
        field('Taxonomy', escapeHtml(taxonomy[n.tax].label)) +
        field('Tooltip (title)', escapeHtml(visNode.title)) +
        field('URL', '<span class="insp-value url">' + escapeHtml(visNode.url) + '</span>') +
        listField('Prerequisites (' + prereqs.length + ')', prereqs) +
        listField('Dependents (' + dependents.length + ')', dependents);

    document.getElementById('inspector').style.display = 'flex';

    // Also select + center it so the inspector and canvas agree.
    network.selectNodes([nodeId]);
    setStatus('Inspecting: ' + n.label, true);
}

function field(label, valueHtml) {
    return '<div class="insp-field"><span class="insp-label">' + label +
        '</span><span class="insp-value">' + valueHtml + '</span></div>';
}

function listField(label, arr) {
    let inner;
    if (arr.length === 0) {
        inner = '<span class="insp-none">none</span>';
    } else {
        inner = '<ul class="insp-list">' +
            arr.map(x => '<li>' + escapeHtml(x) + '</li>').join('') + '</ul>';
    }
    return '<div class="insp-field"><span class="insp-label">' + label + '</span>' + inner + '</div>';
}

function closeInspector() {
    document.getElementById('inspector').style.display = 'none';
}

// ===========================================
// STATUS LINE + RESET + ENV + RESIZE
// ===========================================
function setStatus(text, active) {
    const el = document.getElementById('status-line');
    el.textContent = text;
    el.classList.toggle('active', !!active);
}

function resetView() {
    document.getElementById('search-input').value = '';
    const dropdown = document.getElementById('suggestions');
    dropdown.style.display = 'none';
    dropdown.innerHTML = '';
    currentSuggestions = [];
    activeSuggestionIndex = -1;
    closeInspector();
    network.unselectAll();
    network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
    setStatus('Type to search across 60 concepts.', false);
}

function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function handleResize() {
    if (network) network.fit({ animation: false });
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    buildData();
    initNetwork();

    const input = document.getElementById('search-input');
    input.addEventListener('input', handleSearchInput);
    input.addEventListener('keydown', handleSearchKeydown);

    document.getElementById('reset-btn').addEventListener('click', resetView);
    document.getElementById('inspector-close').addEventListener('click', function() {
        closeInspector();
        network.unselectAll();
    });

    // Hide the suggestion dropdown when clicking outside the search wrapper.
    document.addEventListener('click', function(e) {
        const wrap = document.querySelector('.search-wrap');
        if (wrap && !wrap.contains(e.target)) {
            document.getElementById('suggestions').style.display = 'none';
        }
    });

    let resizeTO = null;
    window.addEventListener('resize', function() {
        if (resizeTO) clearTimeout(resizeTO);
        resizeTO = setTimeout(handleResize, 150);
    });
});
