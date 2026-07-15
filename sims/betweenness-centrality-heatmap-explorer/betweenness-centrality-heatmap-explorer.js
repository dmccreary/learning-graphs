// Betweenness Centrality Heatmap Explorer
// CANVAS_HEIGHT: 620
//
// A 25-node sample learning graph colored by betweenness centrality. Centrality
// is computed once at load with Brandes' algorithm; shortest-path distances are
// precomputed with a BFS from every source, so click and removal interactions
// are table lookups rather than live recomputation.
//
// The teaching payload: centrality counts how many shortest paths cross a node,
// which is NOT the same as how essential it is. "Path" ranks 5th of 25 yet
// removing it disconnects nothing, because two alternative routes exist.

// ===========================================
// GRAPH DATA
// ===========================================
// Positions are hand-placed left-to-right by dependency depth. Node size is held
// constant everywhere so that COLOR is the only centrality cue.

const NODE_DEFS = [
    { id: 'Set',            x: -440, y: -120 },
    { id: 'Node',           x: -440, y:  -40 },
    { id: 'Edge',           x: -440, y:   40 },

    { id: 'Graph',          x: -330, y:  -40 },

    { id: 'Dir. Edge',      x: -220, y: -150 },
    { id: 'Path',           x: -220, y:  -70 },
    { id: 'Adj. List',      x: -220, y:   10 },
    { id: 'Concept',        x: -220, y:  100 },
    { id: 'Dependency',     x: -220, y:  175 },

    { id: 'DAG',            x: -110, y: -110 },
    { id: 'Traversal',      x: -110, y:  -20 },

    { id: 'DFS',            x:    0, y: -160 },
    { id: 'BFS',            x:    0, y:  -80 },
    { id: 'Learning Graph', x:    0, y:  100 },

    { id: 'Topo Sort',      x:  115, y: -190 },
    { id: 'Cycle Detect',   x:  115, y: -120 },
    { id: 'Shortest Path',  x:  115, y:  -50 },
    { id: 'Prerequisite',   x:  115, y:   25 },
    { id: 'Taxonomy',       x:  115, y:   95 },
    { id: 'Concept Label',  x:  115, y:  165 },

    { id: 'Learning Path',  x:  235, y:  -70 },
    { id: 'Graph Quality',  x:  235, y:  130 },

    { id: 'Readiness',      x:  350, y:  -70 },
    { id: 'Validation',     x:  350, y:  130 },

    { id: 'Personalize',    x:  455, y:  -70 }
];

const EDGE_DEFS = [
    ['Set', 'Graph'], ['Node', 'Graph'], ['Edge', 'Graph'],
    ['Graph', 'Dir. Edge'], ['Graph', 'Path'], ['Graph', 'Adj. List'],
    ['Dir. Edge', 'DAG'], ['Path', 'DAG'],
    ['Path', 'Traversal'], ['Adj. List', 'Traversal'],
    ['Traversal', 'DFS'], ['Traversal', 'BFS'],
    ['DFS', 'Cycle Detect'], ['DFS', 'Topo Sort'], ['BFS', 'Shortest Path'],
    ['DAG', 'Topo Sort'],
    ['Concept', 'Learning Graph'], ['Dependency', 'Learning Graph'], ['DAG', 'Learning Graph'],
    ['Learning Graph', 'Prerequisite'], ['Learning Graph', 'Taxonomy'],
    ['Learning Graph', 'Concept Label'],
    ['Prerequisite', 'Learning Path'], ['Topo Sort', 'Learning Path'],
    ['Learning Path', 'Readiness'], ['Shortest Path', 'Readiness'],
    ['Readiness', 'Personalize'],
    ['Taxonomy', 'Graph Quality'], ['Concept Label', 'Graph Quality'],
    ['Cycle Detect', 'Validation'], ['Graph Quality', 'Validation']
];

const IDS = NODE_DEFS.map(n => n.id);
const ADJ = {};
IDS.forEach(id => { ADJ[id] = []; });
EDGE_DEFS.forEach(([from, to]) => { ADJ[from].push(to); });

const NODE_SIZE = 13;
const MAX_PAIR_CHIPS = 12;

// ===========================================
// ALGORITHMS
// ===========================================

// Brandes' algorithm for betweenness centrality on an unweighted DIRECTED graph.
// (No halving at the end — that correction applies only to undirected graphs,
// where each pair would otherwise be counted from both endpoints.)
function brandes() {
    const CB = {};
    IDS.forEach(id => { CB[id] = 0; });

    IDS.forEach(s => {
        const stack = [];
        const preds = {};
        const sigma = {};   // number of shortest paths from s
        const dist = {};
        IDS.forEach(id => { preds[id] = []; sigma[id] = 0; dist[id] = -1; });
        sigma[s] = 1;
        dist[s] = 0;

        const queue = [s];
        while (queue.length) {
            const v = queue.shift();
            stack.push(v);
            ADJ[v].forEach(w => {
                if (dist[w] < 0) { queue.push(w); dist[w] = dist[v] + 1; }
                if (dist[w] === dist[v] + 1) { sigma[w] += sigma[v]; preds[w].push(v); }
            });
        }

        const delta = {};
        IDS.forEach(id => { delta[id] = 0; });
        while (stack.length) {
            const w = stack.pop();
            preds[w].forEach(v => { delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]); });
            if (w !== s) CB[w] += delta[w];
        }
    });

    return CB;
}

// BFS shortest-path distances from every source. `skip` removes one node from
// the graph, which is how the Simulate Removal view is computed.
function allDistances(skip) {
    const table = {};
    IDS.forEach(s => {
        if (s === skip) return;
        const dist = {};
        dist[s] = 0;
        const queue = [s];
        while (queue.length) {
            const v = queue.shift();
            ADJ[v].forEach(w => {
                if (w === skip) return;
                if (dist[w] === undefined) { dist[w] = dist[v] + 1; queue.push(w); }
            });
        }
        table[s] = dist;
    });
    return table;
}

const CB = brandes();
const DIST = allDistances(null);
const MAX_CB = Math.max.apply(null, IDS.map(id => CB[id]));

// Rank 1 = highest centrality. Ties share the better rank.
const RANK = {};
IDS.slice().sort((a, b) => CB[b] - CB[a]).forEach((id, i, arr) => {
    RANK[id] = (i > 0 && CB[id] === CB[arr[i - 1]]) ? RANK[arr[i - 1]] : i + 1;
});

// Every (s,t) pair whose shortest path runs through x: standard test, the
// distance through x equals the direct distance.
function pairsThrough(x) {
    const out = [];
    IDS.forEach(s => IDS.forEach(t => {
        if (s === t || s === x || t === x) return;
        const direct = DIST[s][t], toX = DIST[s][x], fromX = DIST[x][t];
        if (direct !== undefined && toX !== undefined && fromX !== undefined &&
            toX + fromX === direct) {
            out.push([s, t]);
        }
    }));
    return out;
}

// What actually happens to the rest of the graph if x is deleted.
function removalImpact(x) {
    const after = allDistances(x);
    const broken = [];
    const longer = [];
    let unchanged = 0;

    IDS.forEach(s => IDS.forEach(t => {
        if (s === t || s === x || t === x) return;
        const before = DIST[s][t];
        if (before === undefined) return;          // never connected anyway
        const now = after[s][t];
        if (now === undefined) broken.push([s, t]);
        else if (now > before) longer.push([s, t]);
        else unchanged++;
    }));

    // Per-node status, for coloring the graph in the removal view.
    const status = {};
    IDS.forEach(id => { status[id] = 'same'; });
    broken.forEach(([s, t]) => { status[s] = 'broken'; status[t] = 'broken'; });
    longer.forEach(([s, t]) => {
        if (status[s] !== 'broken') status[s] = 'longer';
        if (status[t] !== 'broken') status[t] = 'longer';
    });

    return { broken: broken, longer: longer, unchanged: unchanged, status: status };
}

// Edges a shortest path through x would actually traverse: the shortest-path
// in-tree feeding x, plus the shortest-path out-tree leaving x.
function edgesThrough(x) {
    const ids = new Set();
    EDGE_DEFS.forEach(([u, v], i) => {
        const feedsX = DIST[v] && DIST[v][x] !== undefined && DIST[u][x] !== undefined &&
                       DIST[u][x] === DIST[v][x] + 1;
        const leavesX = DIST[x][u] !== undefined && DIST[x][v] !== undefined &&
                        DIST[x][v] === DIST[x][u] + 1;
        if (feedsX || leavesX) ids.add('e' + i);
    });
    return ids;
}

// ===========================================
// COLOR SCALE (light yellow -> deep red)
// ===========================================
// Stops mirror the CSS gradient on .scale-bar in style.css.

const STOPS = [
    { p: 0.00, c: [255, 253, 231] },
    { p: 0.35, c: [255, 224, 130] },
    { p: 0.60, c: [255, 179,   0] },
    { p: 0.80, c: [244,  81,  30] },
    { p: 1.00, c: [183,  28,  28] }
];

function colorFor(norm) {
    const t = Math.max(0, Math.min(1, norm));
    for (let i = 1; i < STOPS.length; i++) {
        if (t <= STOPS[i].p) {
            const a = STOPS[i - 1], b = STOPS[i];
            const f = (t - a.p) / (b.p - a.p);
            const rgb = a.c.map((v, k) => Math.round(v + f * (b.c[k] - v)));
            return 'rgb(' + rgb.join(',') + ')';
        }
    }
    return 'rgb(' + STOPS[STOPS.length - 1].c.join(',') + ')';
}

// The 'dot' shape renders its label BELOW the node, on the aliceblue canvas —
// never on the fill — so labels stay dark at every centrality value. (Keying
// label color to the fill makes the hottest nodes illegible.)
const LABEL_COLOR = '#37474f';

function borderFor(norm) {
    return norm > 0.62 ? '#7f1d1d' : '#c9b458';
}

// ===========================================
// STATE
// ===========================================

let nodes, edges, network;
let selected = null;
let removalOn = false;

function normOf(id) {
    return MAX_CB > 0 ? CB[id] / MAX_CB : 0;
}

function baseNode(def) {
    const n = normOf(def.id);
    return {
        id: def.id,
        label: def.id,
        x: def.x,
        y: def.y,
        size: NODE_SIZE,
        title: def.id + ' — betweenness ' + CB[def.id].toFixed(1) +
               '  (Rank ' + RANK[def.id] + ' of ' + IDS.length + ')',
        color: {
            background: colorFor(n),
            border: borderFor(n),
            highlight: { background: colorFor(n), border: '#212121' }
        },
        borderWidth: 1.5,
        font: { color: LABEL_COLOR, size: 11, face: 'Arial' },
        shapeProperties: { borderDashes: false },
        opacity: 1
    };
}

function buildNetwork() {
    nodes = new vis.DataSet(NODE_DEFS.map(baseNode));
    edges = new vis.DataSet(EDGE_DEFS.map(([from, to], i) => ({
        id: 'e' + i,
        from: from,
        to: to,
        color: { color: '#cfd8dc', highlight: '#cfd8dc' },
        width: 1
    })));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            dragNodes: false,
            dragView: false,   // never steal scroll from the page
            zoomView: false,
            hover: true,
            navigationButtons: false,
            tooltipDelay: 100
        },
        nodes: {
            shape: 'dot',       // fixed size: color carries the metric, not area
            borderWidth: 1.5,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 1, y: 1 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.5 } },
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    network = new vis.Network(document.getElementById('network'),
        { nodes: nodes, edges: edges }, options);
    network.once('afterDrawing', () => network.fit({ animation: false }));
    network.on('click', params => {
        if (params.nodes.length) select(params.nodes[0]);
        else clearSelection();
    });
}

// ===========================================
// RENDERING
// ===========================================

// Stage 1: every node colored by centrality, nothing selected.
function renderHeatmap() {
    nodes.update(NODE_DEFS.map(baseNode));
    edges.update(EDGE_DEFS.map((e, i) => ({
        id: 'e' + i, color: { color: '#cfd8dc', highlight: '#cfd8dc' }, width: 1, dashes: false
    })));
}

// Stage 2: gold-highlight the shortest paths that run through the selected node.
function renderSelection() {
    renderHeatmap();
    const hot = edgesThrough(selected);
    edges.update(EDGE_DEFS.map((e, i) => {
        const on = hot.has('e' + i);
        return {
            id: 'e' + i,
            color: { color: on ? '#ffa000' : '#e8eaed', highlight: on ? '#ffa000' : '#e8eaed' },
            width: on ? 2.5 : 1
        };
    }));
    nodes.update({ id: selected, borderWidth: 4, color: { border: '#212121' } });
}

// Stage 3: drop the node and repaint everything by what the removal did to it.
function renderRemoval() {
    const impact = removalImpact(selected);
    // Labels sit below the dots on the canvas, so every font stays dark enough
    // to read against aliceblue regardless of the fill behind the dot.
    const palette = {
        broken: { background: '#e53935', border: '#b71c1c', font: '#b71c1c' },
        longer: { background: '#ffb300', border: '#ef6c00', font: '#37474f' },
        same:   { background: '#eceff1', border: '#b0bec5', font: '#78909c' }
    };

    nodes.update(NODE_DEFS.map(def => {
        if (def.id === selected) {
            return {
                id: def.id, label: def.id, size: NODE_SIZE,
                color: { background: '#fafafa', border: '#9e9e9e' },
                borderWidth: 2,
                shapeProperties: { borderDashes: [4, 3] },
                font: { color: '#bdbdbd', size: 11, face: 'Arial' },
                opacity: 0.45
            };
        }
        const p = palette[impact.status[def.id]];
        return {
            id: def.id, label: def.id, size: NODE_SIZE,
            color: { background: p.background, border: p.border },
            borderWidth: 1.5,
            shapeProperties: { borderDashes: false },
            font: { color: p.font, size: 11, face: 'Arial' },
            opacity: 1
        };
    }));

    // Edges touching the removed node are gone; the rest fade to context.
    edges.update(EDGE_DEFS.map(([from, to], i) => {
        const cut = from === selected || to === selected;
        return {
            id: 'e' + i,
            color: { color: cut ? '#f5f5f5' : '#cfd8dc', highlight: cut ? '#f5f5f5' : '#cfd8dc' },
            width: 1,
            dashes: cut ? [2, 4] : false
        };
    }));

    return impact;
}

// ===========================================
// INFOBOX
// ===========================================

function pairChips(list, cls) {
    const shown = list.slice(0, MAX_PAIR_CHIPS)
        .map(([s, t]) => '<span class="pair ' + cls + '">' + s + '→' + t + '</span>')
        .join('');
    const rest = list.length - MAX_PAIR_CHIPS;
    return '<div class="pair-list">' + shown +
        (rest > 0 ? '<span class="pair more">+' + rest + ' more</span>' : '') + '</div>';
}

function renderInfoSelection() {
    const box = document.getElementById('infobox');
    box.className = 'infobox selected';
    const through = pairsThrough(selected);
    const head = '<div class="info-head">' +
        '<span class="info-name">' + selected + '</span>' +
        '<span class="info-rank">Rank ' + RANK[selected] + ' of ' + IDS.length + '</span>' +
        '<span class="info-metric">betweenness ' + CB[selected].toFixed(1) + '</span></div>';

    if (!through.length) {
        box.innerHTML = head + '<div class="info-body">No shortest path between any other ' +
            'pair of concepts runs through <b>' + selected + '</b> — nothing depends on it as a ' +
            'connector. Turn on <b>Simulate Removal</b> to confirm nothing breaks.</div>';
        return;
    }

    box.innerHTML = head +
        '<div class="info-body"><b>' + through.length + '</b> concept pair' +
        (through.length === 1 ? '' : 's') + ' route a shortest path through <b>' + selected +
        '</b> (gold edges). Turn on <b>Simulate Removal</b> to see which of them actually break.' +
        pairChips(through, '') + '</div>';
}

function renderInfoRemoval(impact) {
    const box = document.getElementById('infobox');
    const nothingBroke = impact.broken.length === 0 && impact.longer.length === 0;
    box.className = 'infobox removal' + (nothingBroke ? ' safe' : '');
    const head = '<div class="info-head">' +
        '<span class="info-name">' + selected + ' removed</span>' +
        '<span class="info-rank">Rank ' + RANK[selected] + ' of ' + IDS.length + '</span>' +
        '<span class="info-metric">betweenness ' + CB[selected].toFixed(1) + '</span></div>';

    const counts = '<div class="impact">' +
        '<span class="impact-item"><span class="impact-dot dot-broken"></span>' +
        '<span class="impact-num">' + impact.broken.length + '</span> pairs disconnected</span>' +
        '<span class="impact-item"><span class="impact-dot dot-longer"></span>' +
        '<span class="impact-num">' + impact.longer.length + '</span> pairs need a longer path</span>' +
        '<span class="impact-item"><span class="impact-dot dot-same"></span>' +
        '<span class="impact-num">' + impact.unchanged + '</span> unaffected</span></div>';

    let verdict;
    if (nothingBroke) {
        verdict = '<div class="verdict safe"><b>' + selected + ' is redundant.</b> It ranks ' +
            RANK[selected] + ' of ' + IDS.length + ' for betweenness, yet removing it disconnects ' +
            'nothing and lengthens nothing — every path through it has an equally short ' +
            'alternative. High centrality is not the same as being essential.</div>';
    } else if (impact.broken.length === 0) {
        verdict = '<div class="verdict"><b>No pair is cut off,</b> but ' + impact.longer.length +
            ' must now take a longer route. ' + selected + ' was a shortcut, not a sole connector.</div>';
    } else {
        verdict = '<div class="verdict"><b>' + impact.broken.length + ' pairs lose their only ' +
            'connecting path.</b> Red concepts can no longer reach, or be reached by, at least one ' +
            'concept they depended on.</div>' + pairChips(impact.broken, 'broken');
    }

    box.innerHTML = head + counts + verdict;
}

function renderInfoPrompt() {
    const box = document.getElementById('infobox');
    box.className = 'infobox';
    box.innerHTML = '<div class="info-prompt">Click a red or orange node to see which paths ' +
        'depend on it.</div>';
}

// ===========================================
// ACTIONS
// ===========================================

function syncControls() {
    const toggle = document.getElementById('removal-toggle');
    const label = document.getElementById('removal-label');
    toggle.disabled = !selected;
    toggle.checked = removalOn;
    label.classList.toggle('disabled', !selected);
    document.getElementById('clear-btn').disabled = !selected;
}

function select(id) {
    selected = id;
    removalOn = false;
    renderSelection();
    renderInfoSelection();
    syncControls();
}

function clearSelection() {
    selected = null;
    removalOn = false;
    renderHeatmap();
    renderInfoPrompt();
    syncControls();
    network.unselectAll();
}

function toggleRemoval() {
    if (!selected) return;
    removalOn = document.getElementById('removal-toggle').checked;
    if (removalOn) {
        renderInfoRemoval(renderRemoval());
    } else {
        renderSelection();
        renderInfoSelection();
    }
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    buildNetwork();
    renderInfoPrompt();
    syncControls();

    document.getElementById('removal-toggle').addEventListener('change', toggleRemoval);
    document.getElementById('clear-btn').addEventListener('click', clearSelection);
    window.addEventListener('resize', () => network.fit({ animation: false }));
});
