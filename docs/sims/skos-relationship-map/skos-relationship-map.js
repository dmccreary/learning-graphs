// SKOS Relationship Map - vis-network MicroSim
// Chapter 2: Concept Labeling and Metadata Standards
// Bloom: Analyze (L4) - differentiate, compare SKOS broader/narrower vs. depends-on
// CANVAS_HEIGHT: 560

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
// COLORS
// ===========================================
const CONCEPT_COLOR = { background: '#97c2fc', border: '#2b7ce9' };
const CHIP_COLOR = { background: '#e0e0e0', border: '#9e9e9e' };
const EDGE_BROADER = '#2b7ce9';   // blue for broader/narrower
const EDGE_RELATED = '#9c27b0';   // purple dotted for related
const EDGE_DEPENDS = '#ff9800';   // orange for Chapter-1 depends-on

// ===========================================
// SKOS RECORDS (the vocabulary)
// prefLabel, altLabels, broader (id), narrower (ids), related (ids)
// ===========================================
const skosRecords = {
    graph:    { pref: 'Graph', alt: [], broader: null, narrower: ['digraph'], related: [] },
    digraph:  { pref: 'Directed Graph', alt: ['Digraph'], broader: 'graph', narrower: ['dag'], related: [] },
    dag:      { pref: 'Directed Acyclic Graph (DAG)', alt: ['DAG'], broader: 'digraph', narrower: [], related: [] },
    lg:       { pref: 'Learning Graph', alt: [], broader: null, narrower: [], related: ['cdg'] },
    cdg:      { pref: 'Concept Dependency Graph', alt: [], broader: null, narrower: [], related: ['lg'] }
};

// ===========================================
// LAYOUT A: CLASSIFICATION HIERARCHY
// broader/narrower chain + related pair + altLabel chip
// ===========================================
const hierarchyNodes = [
    { id: 'graph',   label: 'Graph',                        kind: 'concept', x: -260, y: -160 },
    { id: 'digraph', label: 'Directed\nGraph',              kind: 'concept', x: -260, y:    0 },
    { id: 'dag',     label: 'Directed Acyclic\nGraph (DAG)', kind: 'concept', x: -260, y:  160 },
    { id: 'dag_chip', label: 'altLabel:\n"DAG"',            kind: 'chip',    x:  -40, y:  160 },
    { id: 'lg',      label: 'Learning\nGraph',              kind: 'concept', x:  120, y: -100 },
    { id: 'cdg',     label: 'Concept Dependency\nGraph',    kind: 'concept', x:  120, y:  100 }
];

// Broader edges point from narrower -> broader (child -> parent), per spec.
const hierarchyEdgesBroader = [
    { id: 'e_dig_graph', from: 'digraph', to: 'graph',   rel: 'broader',
      tip: 'Directed Graph is a narrower (more specific) kind of Graph', to_id: 'graph', from_id: 'digraph' },
    { id: 'e_dag_dig',   from: 'dag',     to: 'digraph', rel: 'broader',
      tip: 'DAG is a narrower (more specific) kind of Directed Graph', to_id: 'digraph', from_id: 'dag' },
    { id: 'e_dag_chip',  from: 'dag',     to: 'dag_chip', rel: 'chip',
      tip: '"DAG" is an alternate label (skos:altLabel) for Directed Acyclic Graph' },
    { id: 'e_related',   from: 'lg',      to: 'cdg',      rel: 'related',
      tip: 'Learning Graph is related to Concept Dependency Graph (skos:related, no direction)' }
];

// ===========================================
// LAYOUT B: DEPENDENCY GRAPH (Chapter-1 style)
// same three DAG-family nodes, but as depends-on edges
// ===========================================
const dependencyNodes = [
    { id: 'graph',   label: 'Graph',                         kind: 'concept', x: -200, y:  150 },
    { id: 'digraph', label: 'Directed\nGraph',               kind: 'concept', x:    0, y:    0 },
    { id: 'dag',     label: 'Directed Acyclic\nGraph (DAG)', kind: 'concept', x:  200, y: -150 }
];

// depends-on: DAG depends on Directed Graph depends on Graph
const dependencyEdges = [
    { id: 'd_dag_dig', from: 'dag',     to: 'digraph', rel: 'depends',
      tip: 'To understand a DAG you first need Directed Graph (depends-on)' },
    { id: 'd_dig_graph', from: 'digraph', to: 'graph',  rel: 'depends',
      tip: 'To understand a Directed Graph you first need Graph (depends-on)' }
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let currentView = 'hierarchy';   // 'hierarchy' | 'dependency'
let showNarrower = false;        // false = broader arrows, true = narrower arrows

// ===========================================
// NODE / EDGE BUILDERS
// ===========================================
function buildNode(n) {
    if (n.kind === 'chip') {
        return {
            id: n.id,
            label: n.label,
            x: n.x, y: n.y,
            shape: 'box',
            color: { background: CHIP_COLOR.background, border: CHIP_COLOR.border },
            font: { color: '#555', size: 12, face: 'Arial' },
            borderWidth: 2,
            margin: 6,
            shapeProperties: { borderDashes: [4, 3] }
        };
    }
    return {
        id: n.id,
        label: n.label,
        x: n.x, y: n.y,
        shape: 'ellipse',
        color: { background: CONCEPT_COLOR.background, border: CONCEPT_COLOR.border },
        font: { color: '#1a3a6c', size: 14, face: 'Arial' },
        borderWidth: 3
    };
}

function buildHierarchyEdge(e) {
    if (e.rel === 'related') {
        // dotted purple, no direction
        return {
            id: e.id, from: e.from, to: e.to, relKind: 'related', title: e.tip,
            label: 'related',
            color: { color: EDGE_RELATED, highlight: EDGE_RELATED },
            dashes: [3, 4], width: 2,
            arrows: { to: { enabled: false } },
            font: { color: EDGE_RELATED, size: 11, strokeWidth: 4, strokeColor: '#ffffff' },
            smooth: { enabled: true, type: 'curvedCW', roundness: 0.2 }
        };
    }
    if (e.rel === 'chip') {
        // attach altLabel chip with a thin gray connector (no arrow)
        return {
            id: e.id, from: e.from, to: e.to, relKind: 'chip', title: e.tip,
            color: { color: '#9e9e9e', highlight: '#9e9e9e' },
            dashes: [2, 3], width: 1,
            arrows: { to: { enabled: false } },
            smooth: { enabled: false }
        };
    }
    // broader / narrower (blue solid). Direction depends on showNarrower.
    const asNarrower = showNarrower;
    return {
        id: e.id,
        from: asNarrower ? e.to : e.from,
        to: asNarrower ? e.from : e.to,
        relKind: asNarrower ? 'narrower' : 'broader',
        title: asNarrower
            ? deriveNarrowerTip(e)
            : e.tip,
        label: asNarrower ? 'narrower' : 'broader',
        color: { color: EDGE_BROADER, highlight: '#1a5bb8' },
        width: 2.5,
        arrows: { to: { enabled: true, scaleFactor: 1.1 } },
        font: { color: EDGE_BROADER, size: 11, strokeWidth: 4, strokeColor: '#ffffff' },
        smooth: { enabled: true, type: 'curvedCW', roundness: 0.15 }
    };
}

function deriveNarrowerTip(e) {
    // reverse reading of the broader relationship
    const broaderRec = skosRecords[e.to_id];
    const narrowerRec = skosRecords[e.from_id];
    if (broaderRec && narrowerRec) {
        return broaderRec.pref + ' has a narrower (more specific) concept: ' + narrowerRec.pref;
    }
    return 'narrower (more specific) relationship';
}

function buildDependencyEdge(e) {
    return {
        id: e.id, from: e.from, to: e.to, relKind: 'depends', title: e.tip,
        label: 'depends on',
        color: { color: EDGE_DEPENDS, highlight: '#e65100' },
        width: 2.5,
        arrows: { to: { enabled: true, scaleFactor: 1.1 } },
        font: { color: '#e65100', size: 11, strokeWidth: 4, strokeColor: '#ffffff' },
        smooth: { enabled: true, type: 'curvedCW', roundness: 0.15 }
    };
}

// ===========================================
// RENDER A VIEW
// ===========================================
function renderView() {
    let nodeDefs, edgeDefs;
    if (currentView === 'hierarchy') {
        nodeDefs = hierarchyNodes.map(buildNode);
        edgeDefs = hierarchyEdgesBroader.map(buildHierarchyEdge);
    } else {
        nodeDefs = dependencyNodes.map(buildNode);
        edgeDefs = dependencyEdges.map(buildDependencyEdge);
    }
    nodes.clear();
    edges.clear();
    nodes.add(nodeDefs);
    edges.add(edgeDefs);

    // fit the new layout
    network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
    updateChrome();
}

// ===========================================
// UI CHROME (caption, buttons, infobox reset)
// ===========================================
function updateChrome() {
    const captionBox = document.getElementById('caption-box');
    const captionTitle = captionBox.querySelector('.caption-title');
    const captionText = document.getElementById('caption-text');
    const viewBtn = document.getElementById('view-toggle-btn');
    const dirBtn = document.getElementById('direction-toggle-btn');

    if (currentView === 'hierarchy') {
        captionBox.classList.remove('dependency');
        captionTitle.textContent = 'Classification Hierarchy view';
        captionText.innerHTML =
            'Edges are <strong>skos:' + (showNarrower ? 'narrower' : 'broader') + '</strong>. ' +
            'They classify concepts as more-general or more-specific <em>kinds</em> of one another &mdash; ' +
            'this is <em>not</em> the same as a depends-on prerequisite.';
        viewBtn.textContent = 'Show as Dependency Graph';
        dirBtn.disabled = false;
        dirBtn.textContent = showNarrower ? 'Flip: show broader' : 'Flip: show narrower';
    } else {
        captionBox.classList.add('dependency');
        captionTitle.textContent = 'Dependency Graph view (Chapter 1)';
        captionText.innerHTML =
            'The <strong>same three nodes</strong> now carry <strong>depends-on</strong> edges. ' +
            'The picture looks similar, but the meaning differs: broader/narrower is about ' +
            '<em>classification</em>, depends-on is about <em>learning order</em>.';
        viewBtn.textContent = 'Show as Classification Hierarchy';
        dirBtn.disabled = true;   // direction flip only meaningful for broader/narrower
        dirBtn.textContent = 'Flip: show narrower';
    }
}

// ===========================================
// SKOS RECORD INFOBOX (on node click)
// ===========================================
function showRecord(nodeId) {
    const infoTitle = document.getElementById('info-title');
    const infoContent = document.getElementById('info-content');

    // altLabel chip clicked
    if (nodeId === 'dag_chip') {
        infoTitle.textContent = 'skos:altLabel';
        infoContent.innerHTML =
            '<div class="rec-row"><span class="rec-val">"DAG" is an <strong>alternate label</strong> ' +
            'for <code>Directed Acyclic Graph (DAG)</code>. Alt labels are synonyms or abbreviations that ' +
            'point at the same concept as the prefLabel.</span></div>';
        return;
    }

    const rec = skosRecords[nodeId];
    if (!rec) return;

    let html = '';
    html += row('skos:prefLabel', esc(rec.pref));
    html += row('skos:altLabel', rec.alt.length ? rec.alt.map(a => '"' + esc(a) + '"').join(', ') : '<em>none</em>');
    html += row('skos:broader', rec.broader ? esc(skosRecords[rec.broader].pref) : '<em>none (top concept)</em>');
    html += row('skos:narrower', rec.narrower.length
        ? rec.narrower.map(id => esc(skosRecords[id].pref)).join(', ')
        : '<em>none (leaf concept)</em>');
    html += row('skos:related', rec.related.length
        ? rec.related.map(id => esc(skosRecords[id].pref)).join(', ')
        : '<em>none</em>');

    infoTitle.textContent = 'SKOS Record: ' + rec.pref;
    infoContent.innerHTML = html;
}

function row(key, val) {
    return '<div class="rec-row"><span class="rec-key">' + key + ':</span> ' +
           '<span class="rec-val">' + val + '</span></div>';
}

function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===========================================
// INITIALIZE
// ===========================================
function initializeNetwork() {
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);

    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            tooltipDelay: 120,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'ellipse',
            margin: 10,
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 }
        },
        edges: {
            width: 2,
            smooth: { type: 'curvedCW', roundness: 0.15 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            showRecord(params.nodes[0]);
        }
    });

    renderView();
}

// ===========================================
// EVENT WIRING
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    document.getElementById('view-toggle-btn').addEventListener('click', function () {
        currentView = (currentView === 'hierarchy') ? 'dependency' : 'hierarchy';
        renderView();
    });

    document.getElementById('direction-toggle-btn').addEventListener('click', function () {
        if (currentView !== 'hierarchy') return;
        showNarrower = !showNarrower;
        renderView();
    });

    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
