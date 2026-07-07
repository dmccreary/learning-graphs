// Graph Editor with Live Validation
// Educational vis-network MicroSim: edit a learning graph with the
// manipulation toolbar and watch two validation layers respond in real
// time -- Data Validation on Import and Orphaned Node Detection.
// CANVAS_HEIGHT: 620
//
// Bloom L5 (Evaluate): the learner adds/connects/deletes nodes and edges
// and assesses the validation panel to judge structural soundness.

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
// GROUP STYLES (foundation / term / goal)
// ===========================================
const GROUP_STYLES = {
    foundation: { background: '#a5d6a7', border: '#43a047' },
    term:       { background: '#97c2fc', border: '#2b7ce9' },
    goal:       { background: '#ffcc80', border: '#fb8c00' }
};
const ORPHAN_STYLE = { background: '#ef9a9a', border: '#e53935' };

// ===========================================
// STARTER GRAPH: 15 nodes, 17 edges, node 15 orphaned
// ===========================================
function starterGraph() {
    return {
        metadata: { title: 'Live Validation Starter Graph', lastUpdated: '2026-07-03' },
        nodes: [
            { id: 1,  label: 'Sets',                group: 'foundation', domain: 'math-basics' },
            { id: 2,  label: 'Numbers',             group: 'foundation', domain: 'math-basics' },
            { id: 3,  label: 'Counting',            group: 'term',       domain: 'arithmetic' },
            { id: 4,  label: 'Addition',            group: 'term',       domain: 'arithmetic' },
            { id: 5,  label: 'Subtraction',         group: 'term',       domain: 'arithmetic' },
            { id: 6,  label: 'Multiplication',      group: 'term',       domain: 'arithmetic' },
            { id: 7,  label: 'Division',            group: 'term',       domain: 'arithmetic' },
            { id: 8,  label: 'Fractions',           group: 'term',       domain: 'rational' },
            { id: 9,  label: 'Decimals',            group: 'term',       domain: 'rational' },
            { id: 10, label: 'Ratios',              group: 'term',       domain: 'rational' },
            { id: 11, label: 'Percentages',         group: 'term',       domain: 'rational' },
            { id: 12, label: 'Variables',           group: 'term',       domain: 'algebra' },
            { id: 13, label: 'Expressions',         group: 'term',       domain: 'algebra' },
            { id: 14, label: 'Solve Linear\nEquations', group: 'goal',   domain: 'algebra' },
            { id: 15, label: 'Roman Numerals',      group: 'term',       domain: 'history' } // orphan
        ],
        edges: [
            { id: 'e1',  from: 3,  to: 1,  label: 'depends on' },
            { id: 'e2',  from: 3,  to: 2,  label: 'depends on' },
            { id: 'e3',  from: 4,  to: 3,  label: 'depends on' },
            { id: 'e4',  from: 5,  to: 4,  label: 'depends on' },
            { id: 'e5',  from: 6,  to: 4,  label: 'depends on' },
            { id: 'e6',  from: 7,  to: 6,  label: 'depends on' },
            { id: 'e7',  from: 8,  to: 7,  label: 'depends on' },
            { id: 'e8',  from: 9,  to: 8,  label: 'depends on' },
            { id: 'e9',  from: 10, to: 8,  label: 'depends on' },
            { id: 'e10', from: 11, to: 10, label: 'depends on' },
            { id: 'e11', from: 11, to: 9,  label: 'depends on' },
            { id: 'e12', from: 12, to: 2,  label: 'depends on' },
            { id: 'e13', from: 13, to: 12, label: 'depends on' },
            { id: 'e14', from: 14, to: 13, label: 'depends on' },
            { id: 'e15', from: 14, to: 4,  label: 'depends on' },
            { id: 'e16', from: 13, to: 4,  label: 'depends on' },
            { id: 'e17', from: 12, to: 1,  label: 'depends on' }
        ]
    };
}

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let edgeSeq = 100;   // for generating new edge ids
let suppressValidation = false; // batch-load guard

// ===========================================
// NODE STYLING (apply group color; recolor orphans)
// ===========================================
function styleNodeObject(n, isOrphan) {
    const base = GROUP_STYLES[n.group] || GROUP_STYLES.term;
    const c = isOrphan ? ORPHAN_STYLE : base;
    return {
        id: n.id,
        label: n.label,
        group: n.group,
        domain: n.domain,
        color: { background: c.background, border: c.border,
                 highlight: { background: c.background, border: c.border } },
        borderWidth: isOrphan ? 3 : 2,
        borderWidthSelected: 4
    };
}

// ===========================================
// VALIDATION LAYER 1: findOrphanedNodes
// A node is orphaned when it has zero connected edges.
// ===========================================
function findOrphanedNodes() {
    const connected = new Set();
    edges.forEach(e => {
        connected.add(e.from);
        connected.add(e.to);
    });
    const orphans = [];
    nodes.forEach(n => {
        if (!connected.has(n.id)) orphans.push(n);
    });
    return orphans;
}

// ===========================================
// VALIDATION LAYER 2: validateGraph (import-time)
// Detects duplicate node IDs and dangling edge references.
// Operates on a raw parsed object (arrays), not the live DataSets.
// ===========================================
function validateGraph(data) {
    const errors = [];
    if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
        errors.push('File is missing a nodes array or an edges array.');
        return errors;
    }

    // Duplicate node IDs
    const seen = new Set();
    data.nodes.forEach(n => {
        if (n.id === undefined || n.id === null) {
            errors.push('A node is missing an "id" field.');
        } else if (seen.has(n.id)) {
            errors.push('Duplicate node ID: "' + n.id + '".');
        } else {
            seen.add(n.id);
        }
    });

    // Dangling edge references
    data.edges.forEach((e, i) => {
        const tag = e.id !== undefined ? '"' + e.id + '"' : '#' + (i + 1);
        if (!seen.has(e.from)) {
            errors.push('Edge ' + tag + ' references missing node "' + e.from + '" (from).');
        }
        if (!seen.has(e.to)) {
            errors.push('Edge ' + tag + ' references missing node "' + e.to + '" (to).');
        }
    });

    return errors;
}

// ===========================================
// APPLY ORPHAN HIGHLIGHTING + RENDER VALIDATION PANEL
// importErrors: optional array from the last import attempt.
// ===========================================
function runValidation(importErrors) {
    if (suppressValidation) return;

    const orphans = findOrphanedNodes();
    const orphanIds = new Set(orphans.map(o => o.id));

    // Recolor nodes: orphans red, others by group.
    const updates = [];
    nodes.forEach(n => {
        updates.push(styleNodeObject(n, orphanIds.has(n.id)));
    });
    // Guard against re-triggering the 'update' listener recursively.
    suppressValidation = true;
    nodes.update(updates);
    suppressValidation = false;

    renderValidationPanel(orphans, importErrors || []);
}

function renderValidationPanel(orphans, importErrors) {
    // Import Errors section
    const errList = document.getElementById('error-list');
    const errCount = document.getElementById('error-count');
    errCount.textContent = importErrors.length;
    errCount.classList.toggle('has-issues', importErrors.length > 0);
    errList.innerHTML = '';
    if (importErrors.length === 0) {
        errList.innerHTML = '<li class="val-ok">No import errors.</li>';
    } else {
        importErrors.forEach(msg => {
            const li = document.createElement('li');
            li.className = 'val-issue';
            li.textContent = msg;
            errList.appendChild(li);
        });
    }

    // Orphaned Nodes section
    const orphanList = document.getElementById('orphan-list');
    const orphanCount = document.getElementById('orphan-count');
    orphanCount.textContent = orphans.length;
    orphanCount.classList.toggle('has-issues', orphans.length > 0);
    orphanList.innerHTML = '';
    if (orphans.length === 0) {
        orphanList.innerHTML = '<li class="val-ok">No orphaned nodes.</li>';
    } else {
        orphans.forEach(o => {
            const li = document.createElement('li');
            li.className = 'val-issue';
            li.textContent = (o.label || '(unlabeled)').replace(/\n/g, ' ') + '  [id ' + o.id + ']';
            orphanList.appendChild(li);
        });
    }

    // Overall badge
    const badge = document.getElementById('val-badge');
    const total = orphans.length + importErrors.length;
    if (total === 0) {
        badge.textContent = 'Structurally sound';
        badge.className = 'val-badge valid';
    } else {
        const parts = [];
        if (importErrors.length) parts.push(importErrors.length + ' error' + (importErrors.length > 1 ? 's' : ''));
        if (orphans.length) parts.push(orphans.length + ' orphan' + (orphans.length > 1 ? 's' : ''));
        badge.textContent = parts.join(' + ');
        badge.className = 'val-badge invalid';
    }
}

// ===========================================
// PROPERTY EDITOR (custom editNode / editEdge)
// ===========================================
function openNodeEditor(nodeData, callback) {
    const editor = document.getElementById('prop-editor');
    const title = document.getElementById('prop-title');
    const fields = document.getElementById('prop-fields');
    document.getElementById('help-panel').style.display = 'none';

    title.textContent = nodeData.id === undefined || nodeData._isNew ? 'New Node Properties' : 'Edit Node Properties';

    const labelVal = (nodeData.label || 'New Concept').replace(/\n/g, ' ');
    const groupVal = nodeData.group || 'term';
    const domainVal = nodeData.domain || '';

    fields.innerHTML =
        '<label for="pe-label">Label</label>' +
        '<input type="text" id="pe-label" value="">' +
        '<label for="pe-group">Group</label>' +
        '<select id="pe-group">' +
            '<option value="foundation">foundation</option>' +
            '<option value="term">term (concept)</option>' +
            '<option value="goal">goal</option>' +
        '</select>' +
        '<label for="pe-domain">Domain</label>' +
        '<input type="text" id="pe-domain" value="">';

    document.getElementById('pe-label').value = labelVal;
    document.getElementById('pe-group').value = groupVal;
    document.getElementById('pe-domain').value = domainVal;

    editor.style.display = 'block';

    const saveBtn = document.getElementById('prop-save');
    const cancelBtn = document.getElementById('prop-cancel');

    function cleanup() {
        editor.style.display = 'none';
        document.getElementById('help-panel').style.display = 'block';
        saveBtn.onclick = null;
        cancelBtn.onclick = null;
    }

    saveBtn.onclick = function () {
        nodeData.label = document.getElementById('pe-label').value.trim() || 'Concept';
        nodeData.group = document.getElementById('pe-group').value;
        nodeData.domain = document.getElementById('pe-domain').value.trim();
        const styled = styleNodeObject(nodeData, false);
        // Merge styling into the object vis-network will store.
        Object.assign(nodeData, styled);
        cleanup();
        callback(nodeData);
        // Validation fires via the DataSet add/update event.
    };

    cancelBtn.onclick = function () {
        cleanup();
        callback(null); // cancel the manipulation
    };
}

function openEdgeEditor(edgeData, callback) {
    const editor = document.getElementById('prop-editor');
    const title = document.getElementById('prop-title');
    const fields = document.getElementById('prop-fields');
    document.getElementById('help-panel').style.display = 'none';

    title.textContent = 'Edge Label';
    fields.innerHTML =
        '<label for="pe-edge-label">Relationship label</label>' +
        '<input type="text" id="pe-edge-label" value="">';
    document.getElementById('pe-edge-label').value = edgeData.label || 'depends on';

    editor.style.display = 'block';

    const saveBtn = document.getElementById('prop-save');
    const cancelBtn = document.getElementById('prop-cancel');

    function cleanup() {
        editor.style.display = 'none';
        document.getElementById('help-panel').style.display = 'block';
        saveBtn.onclick = null;
        cancelBtn.onclick = null;
    }

    saveBtn.onclick = function () {
        edgeData.label = document.getElementById('pe-edge-label').value.trim() || 'depends on';
        if (edgeData.id === undefined) edgeData.id = 'e' + (edgeSeq++);
        cleanup();
        callback(edgeData);
    };

    cancelBtn.onclick = function () {
        cleanup();
        callback(null);
    };
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork(graph) {
    const styledNodes = graph.nodes.map(n => {
        const obj = styleNodeObject(n, false);
        return obj;
    });
    const styledEdges = graph.edges.map(e => ({
        id: e.id, from: e.from, to: e.to, label: e.label
    }));

    nodes = new vis.DataSet(styledNodes);
    edges = new vis.DataSet(styledEdges);

    const enableMouse = !isInIframe();

    const options = {
        layout: {
            improvedLayout: true,
            randomSeed: 42
        },
        physics: {
            enabled: true,
            solver: 'barnesHut',
            barnesHut: { gravitationalConstant: -6000, springLength: 130, springConstant: 0.05, damping: 0.2 },
            stabilization: { enabled: true, iterations: 250, fit: true }
        },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: true,
            navigationButtons: true,
            keyboard: { enabled: enableMouse, bindToWindow: false },
            hover: true
        },
        nodes: {
            shape: 'box',
            margin: 10,
            font: { size: 13, face: 'Arial', color: '#222', multi: false },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            color: { color: '#848484', highlight: '#5a5a5a' },
            font: { size: 10, color: '#666', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
            width: 1.5,
            smooth: { enabled: true, type: 'cubicBezier', roundness: 0.4 }
        },
        manipulation: {
            enabled: true,
            initiallyActive: true,
            addNode: function (data, callback) {
                data.label = 'New Concept';
                data.group = 'term';
                data.domain = '';
                data._isNew = true;
                openNodeEditor(data, function (result) {
                    if (result) {
                        delete result._isNew;
                        callback(result);
                    } else {
                        callback(null);
                    }
                });
            },
            editNode: function (data, callback) {
                openNodeEditor(data, function (result) {
                    callback(result);
                });
            },
            addEdge: function (data, callback) {
                if (data.from === data.to) {
                    callback(null);
                    return;
                }
                data.label = 'depends on';
                openEdgeEditor(data, function (result) {
                    callback(result);
                });
            },
            editEdge: {
                editWithoutDrag: function (data, callback) {
                    const existing = edges.get(data.id) || data;
                    openEdgeEditor(existing, function (result) {
                        callback(result);
                    });
                }
            },
            deleteNode: true,
            deleteEdge: true
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.on('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    // LIVE VALIDATION: re-run on every DataSet change (add/update/remove).
    nodes.on('*', function () { runValidation(); });
    edges.on('*', function () { runValidation(); });
}

// ===========================================
// EXPORT / IMPORT
// ===========================================
function exportGraph() {
    const outNodes = nodes.map(n => ({
        id: n.id,
        label: (n.label || '').replace(/\n/g, ' '),
        group: n.group || 'term',
        domain: n.domain || ''
    }));
    const outEdges = edges.map(e => ({
        id: e.id, from: e.from, to: e.to, label: e.label || ''
    }));
    const out = {
        metadata: { title: 'Learning Graph Export', lastUpdated: new Date().toISOString().split('T')[0] },
        nodes: outNodes,
        edges: outEdges
    };
    downloadJSON(JSON.stringify(out, null, 2), 'learning-graph.json');
}

function downloadJSON(text, filename) {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importGraphFromText(text) {
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        renderValidationPanel([], ['File is not valid JSON: ' + e.message]);
        return;
    }

    // Data Validation on Import: check BEFORE rendering.
    const errors = validateGraph(data);
    if (errors.length > 0) {
        // Do NOT load a broken graph; report the errors and keep current view.
        renderValidationPanel(findOrphanedNodes(), errors);
        return;
    }

    // Clean import: rebuild the DataSets.
    suppressValidation = true;
    nodes.clear();
    edges.clear();
    nodes.add(data.nodes.map(n => styleNodeObject(n, false)));
    edges.add(data.edges.map(e => ({
        id: e.id !== undefined ? e.id : 'e' + (edgeSeq++),
        from: e.from, to: e.to, label: e.label
    })));
    suppressValidation = false;

    network.setOptions({ physics: { enabled: true } });
    network.stabilize();
    network.once('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    runValidation([]); // clean import: no import errors
}

// A deliberately broken sample: one duplicate ID and one dangling edge.
function brokenSampleJSON() {
    const sample = {
        metadata: { title: 'Broken Sample (for validation demo)', lastUpdated: '2026-07-03' },
        nodes: [
            { id: 1, label: 'Alpha', group: 'foundation', domain: 'demo' },
            { id: 2, label: 'Beta',  group: 'term',       domain: 'demo' },
            { id: 2, label: 'Beta Duplicate', group: 'term', domain: 'demo' },
            { id: 3, label: 'Gamma', group: 'goal',        domain: 'demo' }
        ],
        edges: [
            { id: 'e1', from: 2, to: 1, label: 'depends on' },
            { id: 'e2', from: 3, to: 2, label: 'depends on' },
            { id: 'e3', from: 3, to: 99, label: 'depends on' }
        ]
    };
    return JSON.stringify(sample, null, 2);
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork(starterGraph());

    // Initial validation: should report the 1 pre-existing orphan (node 15).
    runValidation([]);

    document.getElementById('validate-btn').addEventListener('click', function () {
        runValidation([]);
    });

    document.getElementById('export-btn').addEventListener('click', exportGraph);

    const fileInput = document.getElementById('file-input');
    document.getElementById('import-btn').addEventListener('click', function () {
        fileInput.value = '';
        fileInput.click();
    });
    fileInput.addEventListener('change', function (evt) {
        const file = evt.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            importGraphFromText(e.target.result);
        };
        reader.readAsText(file);
    });

    document.getElementById('sample-btn').addEventListener('click', function () {
        downloadJSON(brokenSampleJSON(), 'broken-sample.json');
    });

    window.addEventListener('resize', function () {
        if (network) network.redraw();
    });
});
