// Linear Path vs. Rhizombic Exploration
// CANVAS_HEIGHT: 560
// Educational vis-network MicroSim (Bloom L4 - Analyze)
// Two side-by-side graphs over the SAME eight Photography Basics concepts:
//   LEFT  = strict linear prerequisite chain (hierarchical, one route)
//   RIGHT = rhizomatic exploration (force-directed, many routes)
// Learners click a node to trace the route(s) and compare structures.

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
// Per spec, this sim explicitly allows independent zoom/pan on each panel.
const ALLOW_VIEW = true;

// ===========================================
// SHARED CONCEPT DATA (eight nodes)
// ===========================================
const concepts = [
    { id: 'aperture',   label: 'Aperture',          def: 'The adjustable opening in a lens that controls how much light passes through.' },
    { id: 'shutter',    label: 'Shutter Speed',     def: 'How long the camera sensor is exposed to light, freezing or blurring motion.' },
    { id: 'iso',        label: 'ISO',               def: 'The sensor\'s sensitivity to light; higher ISO brightens images but adds noise.' },
    { id: 'triangle',   label: 'Exposure Triangle', def: 'The interplay of aperture, shutter speed, and ISO that determines exposure.' },
    { id: 'composition',label: 'Composition',       def: 'How visual elements are arranged within the frame.' },
    { id: 'thirds',     label: 'Rule of Thirds',    def: 'A composition guideline placing subjects along thirds of the frame.' },
    { id: 'dof',        label: 'Depth of Field',    def: 'The range of distance that appears acceptably sharp in a photo.' },
    { id: 'portrait',   label: 'Portrait Lighting', def: 'Techniques for lighting a subject\'s face flatteringly in portraits.' }
];
const conceptById = {};
concepts.forEach(c => { conceptById[c.id] = c; });

// LEFT panel: single fixed vertical chain (one entry -> one exit)
const linearOrder = ['aperture', 'shutter', 'iso', 'triangle', 'composition', 'thirds', 'dof', 'portrait'];
const linearEdges = [];
for (let i = 0; i < linearOrder.length - 1; i++) {
    linearEdges.push({ from: linearOrder[i], to: linearOrder[i + 1] });
}

// RIGHT panel: rhizomatic, undirected, many valid routes.
// A learner curious about Portrait Lighting can reach Depth of Field
// directly without ever passing through ISO.
const rhizoEdges = [
    { from: 'aperture',    to: 'dof' },
    { from: 'aperture',    to: 'triangle' },
    { from: 'shutter',     to: 'triangle' },
    { from: 'iso',         to: 'triangle' },
    { from: 'triangle',    to: 'dof' },
    { from: 'composition', to: 'thirds' },
    { from: 'composition', to: 'portrait' },
    { from: 'thirds',      to: 'portrait' },
    { from: 'dof',         to: 'portrait' },
    { from: 'dof',         to: 'composition' },
    { from: 'aperture',    to: 'portrait' }
];

// Undirected adjacency for the rhizomatic graph (for path enumeration)
const rhizoAdj = {};
concepts.forEach(c => { rhizoAdj[c.id] = []; });
rhizoEdges.forEach(e => {
    rhizoAdj[e.from].push(e.to);
    rhizoAdj[e.to].push(e.from);
});

// Node degree in the rhizomatic graph -> node size scaling
const rhizoDegree = {};
concepts.forEach(c => { rhizoDegree[c.id] = rhizoAdj[c.id].length; });

// ===========================================
// COLORS
// ===========================================
const LINEAR_COLOR   = { background: '#3182ce', border: '#2b6cb0', highlight: { background: '#63b3ed', border: '#2b6cb0' } };
const RHIZO_COLOR    = { background: '#ecc94b', border: '#b7791f', highlight: { background: '#f6e05e', border: '#975f11' } };
const PATH_COLOR     = '#e53e3e';   // red path highlight
const PATH_NODE_BG   = '#fc8181';
const PULSE_BG       = '#fefcbf';   // pale pulse for entry-point cycling
const TOKEN_COLOR    = '#805ad5';   // purple curious-learner token

// ===========================================
// STATE
// ===========================================
let linearNodes, linearEdgesDS, linearNetwork;
let rhizoNodes, rhizoEdgesDS, rhizoNetwork;
let pulseTimer = null;
let pulseIndex = 0;
let animTimer = null;

// ===========================================
// LINEAR NETWORK (hierarchical top-to-bottom)
// ===========================================
function buildLinearNetwork() {
    linearNodes = new vis.DataSet(concepts.map(c => ({
        id: c.id,
        label: c.label,
        title: c.def,
        color: {
            background: LINEAR_COLOR.background,
            border: LINEAR_COLOR.border,
            highlight: LINEAR_COLOR.highlight
        },
        font: { color: '#ffffff', size: 14, face: 'Arial' }
    })));

    linearEdgesDS = new vis.DataSet(linearEdges.map((e, i) => ({
        id: 'L' + i,
        from: e.from,
        to: e.to,
        color: { color: '#1a202c', highlight: PATH_COLOR },
        width: 2
    })));

    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'UD',
                sortMethod: 'directed',
                levelSeparation: 60,
                nodeSpacing: 90
            }
        },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: ALLOW_VIEW,
            dragView: ALLOW_VIEW,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'box',
            margin: 8,
            borderWidth: 2,
            widthConstraint: { maximum: 130 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            width: 2,
            smooth: false
        }
    };

    const container = document.getElementById('network-linear');
    linearNetwork = new vis.Network(container, { nodes: linearNodes, edges: linearEdgesDS }, options);

    linearNetwork.once('afterDrawing', () => linearNetwork.fit({ animation: false }));

    linearNetwork.on('click', (params) => {
        if (params.nodes.length > 0) {
            traceLinearPath(params.nodes[0]);
        } else {
            resetLinearHighlight();
        }
    });
}

// Linear graph has exactly ONE route: the full fixed chain.
// Clicking any node highlights that single ordered path (entry -> exit).
function traceLinearPath(nodeId) {
    resetLinearHighlight();

    // Highlight every node and edge in the single chain.
    const nodeUpdates = linearOrder.map(id => ({
        id: id,
        color: {
            background: PATH_NODE_BG,
            border: PATH_COLOR,
            highlight: { background: PATH_NODE_BG, border: PATH_COLOR }
        }
    }));
    linearNodes.update(nodeUpdates);

    const edgeUpdates = linearEdgesDS.get().map(e => ({
        id: e.id, color: { color: PATH_COLOR, highlight: PATH_COLOR }, width: 4
    }));
    linearEdgesDS.update(edgeUpdates);

    const c = conceptById[nodeId];
    setCaption('Linear path: there is exactly <strong>one</strong> route through all eight concepts. ' +
        'Reaching <strong>' + c.label + '</strong> requires visiting every prior concept in fixed order.', true);
}

function resetLinearHighlight() {
    linearNodes.update(concepts.map(c => ({
        id: c.id,
        color: {
            background: LINEAR_COLOR.background,
            border: LINEAR_COLOR.border,
            highlight: LINEAR_COLOR.highlight
        }
    })));
    linearEdgesDS.update(linearEdgesDS.get().map(e => ({
        id: e.id, color: { color: '#1a202c', highlight: PATH_COLOR }, width: 2
    })));
}

// ===========================================
// RHIZOMATIC NETWORK (force-directed)
// ===========================================
function buildRhizoNetwork() {
    rhizoNodes = new vis.DataSet(concepts.map(c => ({
        id: c.id,
        label: c.label,
        title: c.def,
        value: rhizoDegree[c.id],   // node size scales with degree
        color: {
            background: RHIZO_COLOR.background,
            border: RHIZO_COLOR.border,
            highlight: RHIZO_COLOR.highlight
        },
        font: { color: '#3a2f0b', size: 14, face: 'Arial' }
    })));

    rhizoEdgesDS = new vis.DataSet(rhizoEdges.map((e, i) => ({
        id: 'R' + i,
        from: e.from,
        to: e.to,
        color: { color: '#a0aec0', highlight: PATH_COLOR },
        width: 2
    })));

    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true,
            barnesHut: { gravitationalConstant: -4000, springLength: 110, springConstant: 0.03 },
            stabilization: { iterations: 200 }
        },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: ALLOW_VIEW,
            dragView: ALLOW_VIEW,
            dragNodes: true,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'dot',
            scaling: { min: 14, max: 34, label: { enabled: true, min: 12, max: 16 } },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: false } },   // undirected: no arrowheads
            width: 2,
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    const container = document.getElementById('network-rhizo');
    rhizoNetwork = new vis.Network(container, { nodes: rhizoNodes, edges: rhizoEdgesDS }, options);

    // Disable physics once settled so the layout stops drifting, then fit + start pulse.
    rhizoNetwork.once('stabilizationIterationsDone', () => {
        rhizoNetwork.setOptions({ physics: { enabled: false } });
        rhizoNetwork.fit({ animation: false });
        startEntryPulse();
    });

    rhizoNetwork.on('click', (params) => {
        if (params.nodes.length > 0) {
            traceRhizoPaths(params.nodes[0]);
        } else {
            resetRhizoHighlight(true);
        }
    });
}

// Enumerate every simple path from start -> 'portrait' in the undirected graph.
function enumeratePaths(start, goal) {
    const paths = [];
    const stack = [[start]];
    const visitedGuard = new Set();
    let guard = 0;
    (function dfs(path) {
        guard++;
        if (guard > 20000) return; // safety
        const last = path[path.length - 1];
        if (last === goal) { paths.push(path.slice()); return; }
        for (const nxt of rhizoAdj[last]) {
            if (path.indexOf(nxt) === -1) {
                path.push(nxt);
                dfs(path);
                path.pop();
            }
        }
    })([start]);
    return paths;
}

// Rhizomatic graph has MANY routes: clicking a node highlights ALL simple
// paths from it to Portrait Lighting (the union of edges/nodes used).
function traceRhizoPaths(nodeId) {
    resetRhizoHighlight(false);
    stopPulse();

    const goal = 'portrait';
    if (nodeId === goal) {
        setCaption('<strong>Portrait Lighting</strong> is the goal concept here. Click any other node ' +
            'to see how many different routes reach it.', true);
        highlightRhizoNodes([goal]);
        return;
    }

    const paths = enumeratePaths(nodeId, goal);
    const usedNodes = new Set();
    const usedEdgeKeys = new Set();
    paths.forEach(p => {
        p.forEach(n => usedNodes.add(n));
        for (let i = 0; i < p.length - 1; i++) {
            usedEdgeKeys.add(edgeKey(p[i], p[i + 1]));
        }
    });

    // Highlight edges that participate in any path.
    const edgeUpdates = rhizoEdgesDS.get().map(e => {
        const inPath = usedEdgeKeys.has(edgeKey(e.from, e.to));
        return {
            id: e.id,
            color: { color: inPath ? PATH_COLOR : '#dfe4ea', highlight: PATH_COLOR },
            width: inPath ? 4 : 1
        };
    });
    rhizoEdgesDS.update(edgeUpdates);

    highlightRhizoNodes(Array.from(usedNodes));

    const c = conceptById[nodeId];
    setCaption('Rhizombic: there are <strong>' + paths.length + ' different routes</strong> from ' +
        '<strong>' + c.label + '</strong> to Portrait Lighting. Any of them is a valid path — ' +
        'no single order is required.', true);
}

function edgeKey(a, b) {
    return a < b ? a + '|' + b : b + '|' + a;
}

function highlightRhizoNodes(ids) {
    const idSet = new Set(ids);
    rhizoNodes.update(concepts.map(c => {
        if (idSet.has(c.id)) {
            return {
                id: c.id,
                color: {
                    background: PATH_NODE_BG, border: PATH_COLOR,
                    highlight: { background: PATH_NODE_BG, border: PATH_COLOR }
                }
            };
        }
        return {
            id: c.id,
            color: {
                background: RHIZO_COLOR.background, border: RHIZO_COLOR.border,
                highlight: RHIZO_COLOR.highlight
            }
        };
    }));
}

function resetRhizoHighlight(restartPulse) {
    rhizoNodes.update(concepts.map(c => ({
        id: c.id,
        color: {
            background: RHIZO_COLOR.background, border: RHIZO_COLOR.border,
            highlight: RHIZO_COLOR.highlight
        }
    })));
    rhizoEdgesDS.update(rhizoEdgesDS.get().map(e => ({
        id: e.id, color: { color: '#a0aec0', highlight: PATH_COLOR }, width: 2
    })));
    if (restartPulse) startEntryPulse();
}

// ===========================================
// ENTRY-POINT PULSE (any node can start)
// ===========================================
function startEntryPulse() {
    stopPulse();
    pulseIndex = 0;
    pulseTimer = setInterval(() => {
        // reset previous
        const prevId = concepts[(pulseIndex - 1 + concepts.length) % concepts.length].id;
        rhizoNodes.update({
            id: prevId,
            color: {
                background: RHIZO_COLOR.background, border: RHIZO_COLOR.border,
                highlight: RHIZO_COLOR.highlight
            }
        });
        // pulse current
        const curId = concepts[pulseIndex].id;
        rhizoNodes.update({
            id: curId,
            color: {
                background: PULSE_BG, border: '#d69e2e',
                highlight: RHIZO_COLOR.highlight
            }
        });
        pulseIndex = (pulseIndex + 1) % concepts.length;
    }, 650);
}

function stopPulse() {
    if (pulseTimer) { clearInterval(pulseTimer); pulseTimer = null; }
}

// ===========================================
// "SIMULATE A CURIOUS LEARNER" TOKEN ANIMATION
// ===========================================
function simulateCuriousLearner() {
    stopPulse();
    resetRhizoHighlight(false);
    if (animTimer) { clearTimeout(animTimer); animTimer = null; }

    // A plausible but non-sequential exploration that reaches Depth of Field
    // WITHOUT ever visiting ISO: Portrait -> Composition -> DoF -> Aperture.
    const journey = ['portrait', 'composition', 'dof', 'aperture'];
    const btn = document.getElementById('simulate-btn');
    btn.disabled = true;
    setCaption('A curious learner starts exploring…', true);

    let step = 0;
    function hop() {
        // clear previous token styling
        if (step > 0) {
            rhizoNodes.update({
                id: journey[step - 1],
                color: {
                    background: RHIZO_COLOR.background, border: RHIZO_COLOR.border,
                    highlight: RHIZO_COLOR.highlight
                }
            });
        }
        if (step >= journey.length) {
            setCaption('This learner built a working understanding of <strong>Depth of Field</strong> ' +
                'without ever visiting <strong>ISO</strong> directly.', true);
            btn.disabled = false;
            return;
        }
        const id = journey[step];
        rhizoNodes.update({
            id: id,
            color: {
                background: TOKEN_COLOR, border: '#553c9a',
                highlight: { background: TOKEN_COLOR, border: '#553c9a' }
            }
        });
        rhizoNetwork.focus(id, { scale: 1.1, animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
        step++;
        animTimer = setTimeout(hop, 1100);
    }
    hop();
}

// ===========================================
// CAPTION HELPER
// ===========================================
function setCaption(html, highlight) {
    const el = document.getElementById('caption');
    el.innerHTML = html;
    el.classList.toggle('highlight', !!highlight);
}

// ===========================================
// RESET / RESIZE
// ===========================================
function resetAll() {
    if (animTimer) { clearTimeout(animTimer); animTimer = null; }
    document.getElementById('simulate-btn').disabled = false;
    resetLinearHighlight();
    resetRhizoHighlight(true);
    linearNetwork.fit({ animation: false });
    rhizoNetwork.fit({ animation: false });
    setCaption('Click a node on either side to trace its route(s). Hover any node for a definition.', false);
}

function handleResize() {
    if (linearNetwork) linearNetwork.fit({ animation: false });
    if (rhizoNetwork) rhizoNetwork.fit({ animation: false });
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    buildLinearNetwork();
    buildRhizoNetwork();

    document.getElementById('simulate-btn').addEventListener('click', simulateCuriousLearner);
    document.getElementById('reset-btn').addEventListener('click', resetAll);

    let resizeTO = null;
    window.addEventListener('resize', function() {
        if (resizeTO) clearTimeout(resizeTO);
        resizeTO = setTimeout(handleResize, 150);
    });
});
