// Domain Cluster Explorer
// CANVAS_HEIGHT: 580
// Chapter 15: Graph Clustering and Editing Tools. Bloom L3 (Apply).
// Learners toggle a 40-node sample learning graph between a fully expanded
// view and a domain-clustered view of the SAME graph, so the effect of Graph
// Cluster, Composite Node, and Cluster Expand/Collapse is directly observable.
//
// "Cluster by Domain" runs a joinCondition per domain value and calls
// network.cluster() four times (once per domain), folding all 40 nodes into 4
// composite nodes. Double-clicking a single composite node calls
// network.openCluster() for that node only. "Expand All" restores everything.

// ---------------------------------------------------------------------------
// ENVIRONMENT
// ---------------------------------------------------------------------------
function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

// ---------------------------------------------------------------------------
// DOMAINS
// ---------------------------------------------------------------------------
const DOMAINS = [
    { key: 'Graph Theory',      color: '#4e79a7', id: 'cluster:Graph Theory' },
    { key: 'Learning Science',  color: '#59a14f', id: 'cluster:Learning Science' },
    { key: 'Taxonomy Design',   color: '#e15759', id: 'cluster:Taxonomy Design' },
    { key: 'Visualization',     color: '#b07aa1', id: 'cluster:Visualization' }
];
const domainColor = {};
DOMAINS.forEach(function (d) { domainColor[d.key] = d.color; });

// ---------------------------------------------------------------------------
// 40 SAMPLE NODES, each with a `domain` property (11 / 10 / 10 / 9 = 40)
// ---------------------------------------------------------------------------
const NODE_DEFS = [
    // Graph Theory (11)
    'Node', 'Edge', 'Directed Graph', 'DAG', 'Adjacency List', 'Topological Sort',
    'Shortest Path', 'Cycle Detection', 'In-Degree', 'Out-Degree', 'Transitive Closure',
    // Learning Science (10)
    'Prerequisite', 'Bloom Taxonomy', 'Working Memory', 'Scaffolding', 'Zone of Proximal Development',
    'Spaced Practice', 'Retrieval Practice', 'Cognitive Load', 'Mastery Learning', 'Feedback Loop',
    // Taxonomy Design (10)
    'Concept', 'Category', 'ISO 11179', 'SKOS', 'Broader Term', 'Narrower Term',
    'Definition', 'Namespace', 'Controlled Vocabulary', 'Facet',
    // Visualization (9)
    'Node Shape', 'Edge Label', 'Force Layout', 'Hierarchical Layout', 'Color Encoding',
    'Legend', 'Tooltip', 'Zoom Control', 'Composite Node'
];
const DOMAIN_OF_RANGE = [
    { key: 'Graph Theory',     start: 0,  end: 11 },
    { key: 'Learning Science', start: 11, end: 21 },
    { key: 'Taxonomy Design',  start: 21, end: 31 },
    { key: 'Visualization',    start: 31, end: 40 }
];

function domainForIndex(i) {
    for (let d = 0; d < DOMAIN_OF_RANGE.length; d++) {
        if (i >= DOMAIN_OF_RANGE[d].start && i < DOMAIN_OF_RANGE[d].end) {
            return DOMAIN_OF_RANGE[d].key;
        }
    }
    return DOMAIN_OF_RANGE[0].key;
}

const NODES = NODE_DEFS.map(function (label, i) {
    const dom = domainForIndex(i);
    return {
        id: i + 1,
        label: label,
        domain: dom,
        group: dom,
        color: { background: domainColor[dom], border: '#2b2b2b' },
        font: { color: '#ffffff', size: 12 }
    };
});

// Per-domain member counts (fixed - the underlying graph never changes).
const DOMAIN_COUNTS = {};
DOMAINS.forEach(function (d) {
    DOMAIN_COUNTS[d.key] = NODES.filter(function (n) { return n.domain === d.key; }).length;
});

// ---------------------------------------------------------------------------
// EDGES: mostly within-domain, plus a few cross-domain bridges so the graph
// is one connected component.
// ---------------------------------------------------------------------------
function edgesWithin(start, end, extra) {
    const list = [];
    // chain the domain's nodes so every node is connected
    for (let i = start; i < end - 1; i++) {
        list.push({ from: i + 1, to: i + 2 });
    }
    // a few extra intra-domain edges for visual density
    (extra || []).forEach(function (pair) {
        list.push({ from: pair[0], to: pair[1] });
    });
    return list;
}

let EDGES = [];
EDGES = EDGES.concat(edgesWithin(0, 11, [[1, 3], [1, 5], [4, 6], [4, 8]]));   // Graph Theory
EDGES = EDGES.concat(edgesWithin(11, 21, [[12, 14], [12, 19], [15, 20]]));    // Learning Science
EDGES = EDGES.concat(edgesWithin(21, 31, [[22, 25], [22, 27], [24, 29]]));    // Taxonomy Design
EDGES = EDGES.concat(edgesWithin(31, 40, [[32, 34], [35, 39], [32, 40]]));    // Visualization
// Cross-domain bridges (one connected component; a handful only):
EDGES.push({ from: 4, to: 12 });   // DAG (GT) -> Prerequisite (LS)
EDGES.push({ from: 22, to: 12 });  // Concept (TX) -> Prerequisite (LS)
EDGES.push({ from: 34, to: 4 });   // Force Layout (VZ) -> DAG (GT)
EDGES.push({ from: 40, to: 22 });  // Composite Node (VZ) -> Concept (TX)
EDGES.push({ from: 2, to: 32 });   // Edge (GT) -> Node Shape (VZ)

const EDGE_DEFS = EDGES.map(function (e, idx) { return { id: idx, from: e.from, to: e.to }; });

// ---------------------------------------------------------------------------
// STATE
// ---------------------------------------------------------------------------
let nodes, edges, network;

// ---------------------------------------------------------------------------
// INITIALIZE (force-directed: physics on, disable after stabilization)
// ---------------------------------------------------------------------------
function initializeNetwork() {
    nodes = new vis.DataSet(NODES.map(function (n) {
        return {
            id: n.id, label: n.label, domain: n.domain, group: n.group,
            color: n.color, font: n.font, shape: 'dot', size: 12
        };
    }));
    edges = new vis.DataSet(EDGE_DEFS.map(function (e) {
        return { id: e.id, from: e.from, to: e.to };
    }));

    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: { gravitationalConstant: -60, springLength: 90, springConstant: 0.08 },
            stabilization: { enabled: true, iterations: 300, fit: true }
        },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: true,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'dot',
            size: 12,
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 4, x: 2, y: 2 }
        },
        edges: {
            color: { color: '#9aa5b1', highlight: '#607d8b' },
            width: 1,
            smooth: { enabled: true, type: 'continuous', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Disable physics once layout stabilizes (prevents jerky updates on cluster).
    network.on('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    // Double-click a composite node to expand just that domain.
    network.on('doubleClick', function (params) {
        if (params.nodes && params.nodes.length === 1) {
            const nodeId = params.nodes[0];
            if (network.isCluster(nodeId)) {
                network.openCluster(nodeId);
                updateReadout();
            }
        }
    });

    updateReadout();
}

// ---------------------------------------------------------------------------
// CLUSTERING
// ---------------------------------------------------------------------------
function clusterByDomain() {
    DOMAINS.forEach(function (d) {
        const count = DOMAIN_COUNTS[d.key];
        network.cluster({
            joinCondition: function (nodeOptions) {
                // Only fold nodes whose domain property matches this domain.
                return nodeOptions.domain === d.key;
            },
            processProperties: function (clusterOptions) {
                clusterOptions.label = d.key + ' (' + count + ')';
                return clusterOptions;
            },
            clusterNodeProperties: {
                id: d.id,
                label: d.key + ' (' + count + ')',
                shape: 'box',
                margin: 12,
                color: { background: d.color, border: '#1b1b1b' },
                font: { color: '#ffffff', size: 15, bold: { color: '#ffffff' } },
                borderWidth: 3,
                shadow: { enabled: true, color: 'rgba(0,0,0,0.3)', size: 6, x: 2, y: 2 }
            }
        });
    });
    network.fit({ animation: false });
    updateReadout();
}

function expandAll() {
    // Open every existing cluster.
    DOMAINS.forEach(function (d) {
        if (network.isCluster(d.id)) {
            network.openCluster(d.id);
        }
    });
    network.fit({ animation: false });
    updateReadout();
}

// ---------------------------------------------------------------------------
// STATUS + PER-DOMAIN READOUT
// ---------------------------------------------------------------------------
function countComposites() {
    let composites = 0;
    let foldedConcepts = 0;
    DOMAINS.forEach(function (d) {
        if (network.isCluster(d.id)) {
            composites += 1;
            foldedConcepts += DOMAIN_COUNTS[d.key];
        }
    });
    return { composites: composites, foldedConcepts: foldedConcepts };
}

function updateReadout() {
    const info = countComposites();
    const totalTopLevel = network.body.nodeIndices.length; // nodes currently on canvas
    const statusEl = document.getElementById('status-text');

    if (info.composites === 0) {
        statusEl.textContent = 'Showing: ' + NODES.length + ' individual nodes';
    } else if (info.composites === DOMAINS.length) {
        statusEl.textContent = 'Showing: ' + info.composites + ' composite nodes (' +
            info.foldedConcepts + ' concepts folded)';
    } else {
        const expandedNodes = totalTopLevel - info.composites;
        statusEl.textContent = 'Showing: ' + info.composites + ' composite node' +
            (info.composites === 1 ? '' : 's') + ' (' + info.foldedConcepts +
            ' concepts folded) + ' + expandedNodes + ' individual nodes';
    }

    // Per-domain readout: mark whether each domain is folded or expanded.
    function fmt(key) {
        const folded = network.isCluster('cluster:' + key);
        return key + ': ' + DOMAIN_COUNTS[key] + (folded ? ' (folded)' : ' (expanded)');
    }
    document.getElementById('count-graph').textContent = fmt('Graph Theory');
    document.getElementById('count-learn').textContent = fmt('Learning Science');
    document.getElementById('count-tax').textContent = fmt('Taxonomy Design');
    document.getElementById('count-vis').textContent = fmt('Visualization');

    // Disable "Cluster by Domain" when everything is already clustered.
    document.getElementById('cluster-btn').disabled = (info.composites === DOMAINS.length);
    document.getElementById('expand-btn').disabled = (info.composites === 0);
}

// ---------------------------------------------------------------------------
// BOOT
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();
    document.getElementById('cluster-btn').addEventListener('click', clusterByDomain);
    document.getElementById('expand-btn').addEventListener('click', expandAll);
    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
