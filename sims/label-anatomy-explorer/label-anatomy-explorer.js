// Label Anatomy Explorer
// CANVAS_HEIGHT: 560
// Three concept clusters: each gold concept node carries one preferred label
// and orbits zero or more gray alternate-label nodes joined by dashed
// hasAlternateLabel edges. Alternates are ALIASES, not separate concepts.
// Bloom Understand (L2): distinguish preferred labels from alternate labels.

// ---------------------------------------------------------------------------
// Environment detection: mouse zoom/pan only outside an iframe.
// ---------------------------------------------------------------------------
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ---------------------------------------------------------------------------
// Fixed dataset (no live editing). Three small clusters.
// A "concept" node is the preferred label; "alt" nodes are its aliases.
// The `caution` flag marks a label that is a COMMON MISTAKE, not a true alias.
// ---------------------------------------------------------------------------
const clusters = [
    {
        concept: {
            id: 'c-bipartite',
            preferred: 'Bipartite Graph',
            def: 'A graph whose nodes split into two disjoint sets, with every edge joining a node in one set to a node in the other.'
        },
        alternates: [
            { id: 'a-twopart', label: 'Two-Part Graph',
              why: 'A plain-English rendering of the same idea — the node set is divided into two parts.' },
            { id: 'a-2partite', label: '2-Partite Graph',
              why: 'A shorthand form; "2-partite" is the numeric way of writing "bipartite".' }
        ]
    },
    {
        concept: {
            id: 'c-dag',
            preferred: 'Directed Acyclic Graph (DAG)',
            def: 'A directed graph that contains no cycles, so following the arrows never returns you to where you started.'
        },
        alternates: [
            { id: 'a-dag-abbr', label: 'DAG',
              why: 'A widely used acronym — the colloquial short form of the full term.' },
            { id: 'a-depgraph', label: 'Dependency Graph', caution: true,
              why: 'In everyday speech people sometimes say "dependency graph" when they mean a DAG.',
              caveat: 'In this course, "Dependency Graph" is a related-but-distinct concept (see Chapter 1), NOT a true synonym of DAG. It is shown here to illustrate a common labeling mistake — a dependency graph is one use of a DAG, but the two terms are not interchangeable.' }
        ]
    },
    {
        concept: {
            id: 'c-preferred',
            preferred: 'Preferred Label',
            def: 'The single canonical name chosen to represent a concept in a controlled vocabulary; all other names for it are alternate labels.'
        },
        alternates: [
            { id: 'a-canonical', label: 'Canonical Label',
              why: '"Canonical" is the formal metadata-standards term for the one authoritative name of a concept.' }
        ]
    }
];

// ---------------------------------------------------------------------------
// Build lookup tables + vis datasets.
// ---------------------------------------------------------------------------
const nodeInfo = {};   // id -> { type, ... } for infobox rendering
const conceptIds = [];
const nodeDefs = [];
const edgeDefs = [];
let edgeSeq = 1;

// Spread the three clusters horizontally as seed positions so physics settles
// into three distinct orbits rather than one clump.
const clusterSeedX = [-360, 0, 360];

clusters.forEach((cl, ci) => {
    const c = cl.concept;
    conceptIds.push(c.id);
    nodeInfo[c.id] = { type: 'concept', preferred: c.preferred, def: c.def };
    nodeDefs.push({
        id: c.id,
        label: c.preferred,
        shape: 'circle',
        x: clusterSeedX[ci],
        y: 0,
        widthConstraint: { minimum: 70, maximum: 130 },
        color: {
            background: '#ffce54',
            border: '#f6a623',
            highlight: { background: '#ffd76e', border: '#e6900f' }
        },
        borderWidth: 3,
        font: { size: 15, color: '#4a3200', face: 'Arial', bold: { color: '#4a3200' } },
        mass: 3
    });

    cl.alternates.forEach((alt, ai) => {
        nodeInfo[alt.id] = {
            type: 'alt',
            label: alt.label,
            preferred: c.preferred,
            why: alt.why,
            caution: !!alt.caution,
            caveat: alt.caveat || null
        };
        // Seed alternates near their concept in a small spread.
        const angle = (ai / cl.alternates.length) * Math.PI * 2;
        nodeDefs.push({
            id: alt.id,
            label: alt.caution ? (alt.label + '  ⚠') : alt.label,
            shape: 'box',
            x: clusterSeedX[ci] + Math.cos(angle) * 140,
            y: Math.sin(angle) * 140 - 60,
            color: {
                background: alt.caution ? '#ffe0b2' : '#e8e8e8',
                border: alt.caution ? '#e65100' : '#9e9e9e',
                highlight: {
                    background: alt.caution ? '#ffcc80' : '#f0f0f0',
                    border: alt.caution ? '#bf360c' : '#616161'
                }
            },
            borderWidth: alt.caution ? 2 : 1,
            shapeProperties: { borderRadius: 6 },
            font: { size: 12, color: alt.caution ? '#7a3b00' : '#424242', face: 'Arial' },
            margin: 8,
            mass: 1
        });

        edgeDefs.push({
            id: 'e' + (edgeSeq++),
            from: c.id,
            to: alt.id,
            dashes: true,
            color: { color: alt.caution ? '#e65100' : '#9e9e9e',
                     highlight: alt.caution ? '#bf360c' : '#616161' },
            width: alt.caution ? 2 : 1.5,
            smooth: false
        });
    });
});

// ---------------------------------------------------------------------------
// vis-network setup
// ---------------------------------------------------------------------------
let nodes, edges, network;
let hoverActive = false;

function initNetwork() {
    nodes = new vis.DataSet(nodeDefs);
    edges = new vis.DataSet(edgeDefs);

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        // Force-directed: run physics to lay out, then freeze on stabilization.
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -55,
                centralGravity: 0.012,
                springLength: 110,
                springConstant: 0.08,
                avoidOverlap: 0.6
            },
            stabilization: { enabled: true, iterations: 300, fit: true }
        },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: enableMouse,
            navigationButtons: true,
            keyboard: false
        },
        nodes: {
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: false } }, // hasAlternateLabel drawn undirected
            smooth: false
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Freeze layout once stabilized so hover/click don't jostle the graph.
    network.once('stabilizationIterationsDone', function () {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false });
    });

    // Click -> infobox in the side panel.
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            showNodeInfo(params.nodes[0]);
        }
    });

    // Hover -> spotlight only this node's direct edges; dim everything else.
    network.on('hoverNode', function (params) {
        spotlight(params.node);
    });
    network.on('blurNode', function () {
        clearSpotlight();
    });

    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
}

// ---------------------------------------------------------------------------
// Hover spotlight: dim all nodes/edges except the hovered node and its direct
// neighbors + connecting edges.
// ---------------------------------------------------------------------------
function spotlight(nodeId) {
    hoverActive = true;
    const connectedEdges = network.getConnectedEdges(nodeId);
    const connectedEdgeSet = new Set(connectedEdges);
    const neighborSet = new Set([nodeId]);
    edgeDefs.forEach(e => {
        if (connectedEdgeSet.has(e.id)) {
            neighborSet.add(e.from);
            neighborSet.add(e.to);
        }
    });

    nodeDefs.forEach(n => {
        const active = neighborSet.has(n.id);
        nodes.update({ id: n.id, opacity: active ? 1.0 : 0.18 });
    });
    edgeDefs.forEach(e => {
        const active = connectedEdgeSet.has(e.id);
        // Determine base color (caution edges stay orange even when spotlighted).
        const baseColor = (nodeInfo[e.to] && nodeInfo[e.to].caution) ? '#e65100' : '#9e9e9e';
        edges.update({
            id: e.id,
            color: { color: active ? baseColor : 'rgba(180,180,180,0.15)' },
            width: active ? (baseColor === '#e65100' ? 3 : 2.5) : 1
        });
    });
}

function clearSpotlight() {
    hoverActive = false;
    nodeDefs.forEach(n => { nodes.update({ id: n.id, opacity: 1.0 }); });
    edgeDefs.forEach(e => {
        const baseColor = (nodeInfo[e.to] && nodeInfo[e.to].caution) ? '#e65100' : '#9e9e9e';
        edges.update({ id: e.id, color: { color: baseColor }, width: baseColor === '#e65100' ? 2 : 1.5 });
    });
}

// ---------------------------------------------------------------------------
// Infobox
// ---------------------------------------------------------------------------
function setInfobox(title, html, cls) {
    const box = document.getElementById('infobox');
    box.className = 'infobox' + (cls ? ' ' + cls : '');
    document.getElementById('infobox-title').innerHTML = title;
    document.getElementById('infobox-content').innerHTML = html;
}

function showNodeInfo(id) {
    const info = nodeInfo[id];
    if (!info) return;

    if (info.type === 'concept') {
        setInfobox(info.preferred,
            '<strong>Preferred Label:</strong> ' + info.preferred +
            '<br><br>' + info.def +
            '<br><br><em>The gray nodes linked to this one are alternate labels — ' +
            'other names for this same concept.</em>',
            'concept-note');
    } else {
        // Alternate label node
        let html = '<strong>Alternate label for:</strong> ' + info.preferred +
                   '<br><br>' + info.why;
        let cls = 'alt-note';
        if (info.caution) {
            cls = 'caution-note';
            html = '<strong>&#9888; Caution &mdash; not a true synonym.</strong><br><br>' + html;
            if (info.caveat) {
                html += '<span class="caveat">' + info.caveat + '</span>';
            }
        }
        setInfobox(info.label + (info.caution ? '  ⚠' : ''), html, cls);
    }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initNetwork();
});
