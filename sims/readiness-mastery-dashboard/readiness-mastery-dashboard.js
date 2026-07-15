// Readiness and Mastery Dashboard
// CANVAS_HEIGHT: 620
//
// Eight knowledge components, one mastery slider each, one dependency graph.
// The readiness frontier and the recommended sequence are recomputed on every
// slider move, so a learner can predict what will light up and check instantly.
//
// Readiness frontier = every prerequisite mastered, but not yet mastered itself.
// Root concepts are vacuously ready, which is why the frontier is non-empty at
// 0% mastery — there is always somewhere to start.

// ===========================================
// GRAPH DATA
// ===========================================
// `needs` lists prerequisites: a component is learnable once all of them are
// mastered. Graph and Directed Edge are roots.
//
// Declaration order doubles as the topological tie-break, so it decides the
// unconstrained sequence wherever the graph leaves a genuine choice. DAG is
// declared before Traversal deliberately: both become available at the same
// moment, the unconstrained order therefore takes DAG first, and the sample
// constraint below has something real to override. Declared the other way round
// the constraint would already be satisfied and toggling it would do nothing.

const COMPONENTS = [
    { id: 'Graph',          needs: [],                              x: -190, y: -110 },
    { id: 'Directed Edge',  needs: [],                              x: -190, y:   30 },
    { id: 'DAG',            needs: ['Graph', 'Directed Edge'],      x:  -55, y:   10 },
    { id: 'Traversal',      needs: ['Graph'],                       x:  -55, y: -130 },
    { id: 'Prerequisite',   needs: ['DAG'],                         x:   75, y:   10 },
    { id: 'Learning Path',  needs: ['Prerequisite', 'Traversal'],   x:  195, y:  -60 },
    { id: 'Readiness',      needs: ['Learning Path'],               x:  310, y:  -60 },
    { id: 'Personalization', needs: ['Readiness'],                  x:  420, y:  -60 }
];

const IDS = COMPONENTS.map(c => c.id);
const BY_ID = {};
COMPONENTS.forEach(c => { BY_ID[c.id] = c; });

// A sample learning-path constraint, per the spec's "must include F before G".
const CONSTRAINT = {
    before: 'Traversal',
    after: 'DAG',
    why: 'a curriculum policy that introduces traversal early, so learners write working ' +
         'code before meeting the formal DAG definition'
};

const DEFAULT_THRESHOLD = 70;

const COLORS = {
    none: { background: '#e0e0e0', border: '#9e9e9e' },
    dev:  { background: '#ffd54f', border: '#ffa000' },
    mast: { background: '#66bb6a', border: '#2e7d32' }
};

// ===========================================
// STATE
// ===========================================

let mastery = {};
IDS.forEach(id => { mastery[id] = 0; });
let threshold = DEFAULT_THRESHOLD;
let constraintOn = false;

let nodes, edges, network;
let pulseOn = false;
let pulseTimer = null;

function isMastered(id) {
    return mastery[id] >= threshold;
}

// Every prerequisite mastered, but not yet mastered itself. Roots qualify
// vacuously — an empty prerequisite list is trivially satisfied.
function isReady(id) {
    return !isMastered(id) && BY_ID[id].needs.every(isMastered);
}

function frontier() {
    return IDS.filter(isReady);
}

function stateOf(id) {
    if (isMastered(id)) return 'mast';
    if (mastery[id] > 0) return 'dev';
    return 'none';
}

// ===========================================
// SEQUENCING
// ===========================================
// Kahn's algorithm over the prerequisite DAG, ties broken by declaration order
// so the unconstrained result is stable. The constraint is applied as an extra
// ordering edge, exactly as a real path constraint would be.

function topoSort(extraEdge) {
    const indeg = {};
    const adj = {};
    IDS.forEach(id => { indeg[id] = 0; adj[id] = []; });

    COMPONENTS.forEach(c => {
        c.needs.forEach(p => { adj[p].push(c.id); indeg[c.id]++; });
    });

    if (extraEdge) {
        adj[extraEdge.before].push(extraEdge.after);
        indeg[extraEdge.after]++;
    }

    const ready = IDS.filter(id => indeg[id] === 0);
    const order = [];

    while (ready.length) {
        // stable tie-break: earliest declared component first
        ready.sort((a, b) => IDS.indexOf(a) - IDS.indexOf(b));
        const u = ready.shift();
        order.push(u);
        adj[u].forEach(v => { if (--indeg[v] === 0) ready.push(v); });
    }

    // A constraint that contradicts a real prerequisite would leave nodes
    // unplaced. Fall back rather than silently show a short sequence.
    return order.length === IDS.length ? order : null;
}

function currentSequence() {
    if (!constraintOn) return { order: topoSort(null), moved: [] };

    const base = topoSort(null);
    const withC = topoSort(CONSTRAINT);
    if (!withC) return { order: base, moved: [], failed: true };

    const moved = withC.filter((id, i) => base[i] !== id);
    return { order: withC, moved: moved };
}

// ===========================================
// NETWORK
// ===========================================

function buildNetwork() {
    nodes = new vis.DataSet(COMPONENTS.map(c => ({
        id: c.id, label: c.id, x: c.x, y: c.y,
        color: COLORS.none,
        font: { color: '#37474f', size: 11, face: 'Arial' },
        borderWidth: 2
    })));

    // Arrows point from prerequisite to dependent: the direction a learner moves.
    const list = [];
    COMPONENTS.forEach(c => c.needs.forEach(p => list.push({ from: p, to: c.id })));
    edges = new vis.DataSet(list.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to,
        color: { color: '#cfd8dc', highlight: '#cfd8dc' }, width: 1.5
    })));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            dragNodes: false,
            dragView: false,
            zoomView: false,
            hover: true,
            navigationButtons: false,
            tooltipDelay: 120
        },
        nodes: {
            shape: 'dot',
            size: 12,
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 3, x: 1, y: 1 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.55 } },
            smooth: { type: 'continuous', roundness: 0.2 }
        }
    };

    network = new vis.Network(document.getElementById('network'),
        { nodes: nodes, edges: edges }, options);
    network.once('afterDrawing', () => network.fit({ animation: false }));
}

function renderGraph() {
    nodes.update(COMPONENTS.map(c => {
        const st = stateOf(c.id);
        const ready = isReady(c.id);
        const col = COLORS[st];
        return {
            id: c.id,
            label: c.id,
            title: c.id + ' — mastery ' + mastery[c.id] + '%' +
                   (isMastered(c.id) ? ' (mastered)' : ready ? ' (ready to learn)' : '') +
                   (c.needs.length ? '\nneeds: ' + c.needs.join(', ') : '\nno prerequisites'),
            color: {
                background: col.background,
                // frontier nodes get a blue ring that pulses
                border: ready ? '#1e88e5' : col.border
            },
            borderWidth: ready ? (pulseOn ? 5 : 3) : 2,
            font: { color: '#37474f', size: 11, face: 'Arial' }
        };
    }));
}

// ===========================================
// SLIDERS
// ===========================================

function buildSliders() {
    const host = document.getElementById('sliders');
    host.innerHTML = '';
    COMPONENTS.forEach(c => {
        const row = document.createElement('div');
        row.className = 'slider-row';
        row.id = 'row-' + c.id.replace(/\s+/g, '-');
        row.innerHTML =
            '<div class="slider-top">' +
                '<span class="slider-name">' + c.id + '</span>' +
                '<span class="slider-val" id="val-' + c.id.replace(/\s+/g, '-') + '">0%</span>' +
            '</div>';
        const input = document.createElement('input');
        input.type = 'range';
        input.min = 0;
        input.max = 100;
        input.step = 5;
        input.value = 0;
        input.addEventListener('input', () => {
            mastery[c.id] = parseInt(input.value, 10);
            render();
        });
        row.appendChild(input);
        host.appendChild(row);
    });
}

function renderSliders() {
    COMPONENTS.forEach(c => {
        const key = c.id.replace(/\s+/g, '-');
        const row = document.getElementById('row-' + key);
        const val = document.getElementById('val-' + key);
        const st = stateOf(c.id);

        row.className = 'slider-row' +
            (st === 'mast' ? ' mastered' : st === 'dev' ? ' developing' : '') +
            (isReady(c.id) ? ' frontier' : '');
        val.className = 'slider-val' +
            (st === 'mast' ? ' mastered' : st === 'dev' ? ' developing' : '');
        val.textContent = mastery[c.id] + '%';
    });
}

// ===========================================
// SEQUENCE
// ===========================================

function renderSequence() {
    const { order, moved } = currentSequence();
    const list = document.getElementById('seq-list');
    const note = document.getElementById('seq-note');
    const row = document.querySelector('.sequence-row');

    row.className = 'sequence-row' + (constraintOn ? ' constrained' : '');
    list.innerHTML = '';

    // What to study next: first unmastered component in the ordering.
    const next = order.find(id => !isMastered(id));

    order.forEach((id, i) => {
        const li = document.createElement('li');
        li.className = 'seq-item' +
            (isMastered(id) ? ' done' : '') +
            (id === next ? ' next' : '') +
            (constraintOn && moved.includes(id) ? ' moved' : '');
        li.innerHTML = '<span class="n">' + (i + 1) + '</span>' + id;
        list.appendChild(li);
    });

    const done = order.filter(isMastered).length;

    if (!constraintOn) {
        note.innerHTML = done === IDS.length
            ? '— every component is above the ' + threshold + '% threshold; nothing left to study.'
            : '— unconstrained topological order. ' + done + ' of ' + IDS.length +
              ' mastered; study <b>' + next + '</b> next.';
    } else {
        note.innerHTML = '— constraint active: <b>' + CONSTRAINT.before + ' before ' +
            CONSTRAINT.after + '</b>, ' + CONSTRAINT.why + '. ' +
            (moved.length
                ? 'Purple components moved as a result.'
                : 'The unconstrained order already satisfied it, so nothing moved.');
    }
}

// ===========================================
// RENDER
// ===========================================

function render() {
    renderSliders();
    renderGraph();
    renderSequence();
}

// Gentle pulse on the frontier ring only.
function startPulse() {
    if (pulseTimer) return;
    pulseTimer = setInterval(() => {
        const f = frontier();
        if (!f.length) return;
        pulseOn = !pulseOn;
        nodes.update(f.map(id => ({ id: id, borderWidth: pulseOn ? 5 : 3 })));
    }, 550);
}

// ===========================================
// ACTIONS
// ===========================================

function setThreshold(v) {
    threshold = parseInt(v, 10);
    document.getElementById('threshold-value').textContent = threshold + '%';
    render();
}

function toggleConstraint() {
    constraintOn = document.getElementById('constraint-toggle').checked;
    render();
}

function reset() {
    IDS.forEach(id => { mastery[id] = 0; });
    threshold = DEFAULT_THRESHOLD;
    constraintOn = false;
    document.getElementById('threshold').value = DEFAULT_THRESHOLD;
    document.getElementById('threshold-value').textContent = DEFAULT_THRESHOLD + '%';
    document.getElementById('constraint-toggle').checked = false;
    document.querySelectorAll('.slider-row input[type="range"]').forEach(i => { i.value = 0; });
    render();
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    buildSliders();
    buildNetwork();
    render();
    startPulse();

    document.getElementById('threshold').addEventListener('input', e => setThreshold(e.target.value));
    document.getElementById('constraint-toggle').addEventListener('change', toggleConstraint);
    document.getElementById('btn-reset').addEventListener('click', reset);
    window.addEventListener('resize', () => network.fit({ animation: false }));
});
