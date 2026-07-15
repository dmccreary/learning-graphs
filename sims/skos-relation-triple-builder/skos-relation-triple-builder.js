// SKOS Relation Triple Builder
// CANVAS_HEIGHT: 490
//
// Six concept pairs drawn from this book's own vocabulary. The learner picks the
// SKOS relation (broader / narrower / related) for the arrow between them.
//
// Direction is half the answer. Each pair's key is stated for the A→B ordering
// shown on load; the Swap button reverses the arrow, and the correct answer
// inverts with it (broader <-> narrower, related is symmetric). A learner who
// picks the right relation type but the wrong direction is still wrong, which is
// exactly the distinction an Apply-level objective needs to test.

// ===========================================
// ANSWER KEY
// ===========================================
// `relation` is the correct SKOS relation FROM `a` TO `b` as first presented.
//
// `why` must stay DIRECTION-NEUTRAL: it states which concept is the more general
// of the two, never which way the arrow points. The learner may swap the arrow
// before answering, and the feedback headline already shows the correct triple
// for whichever direction is on screen. An explanation that named a direction
// would contradict the arrow half the time.

const PAIRS = [
    {
        a: 'Depth-First Search',
        b: 'Graph Traversal',
        relation: 'broader',
        why: 'Depth-First Search is one specific kind of Graph Traversal, so Graph Traversal ' +
             'is the more general of the two.'
    },
    {
        a: 'Graph Traversal',
        b: 'Breadth-First Search',
        relation: 'narrower',
        why: 'Breadth-First Search is one specific kind of Graph Traversal. The relation you ' +
             'pick has to name the direction the arrow actually points: toward the general ' +
             'concept is broader, toward the specific one is narrower.'
    },
    {
        a: 'SKOS',
        b: 'Dublin Core Metadata',
        relation: 'related',
        why: 'Both are metadata standards, but neither is a kind of the other. Associative ' +
             'links like this are what related exists for — and related is symmetric, so ' +
             'swapping the arrow does not change the answer.'
    },
    {
        a: 'Directed Acyclic Graph',
        b: 'Graph',
        relation: 'broader',
        why: 'Every DAG is a Graph, but not every Graph is a DAG, which makes Graph the more ' +
             'general of the two.'
    },
    {
        a: 'Assessment',
        b: 'Formative Assessment',
        relation: 'narrower',
        why: 'Formative Assessment is one type of Assessment, so Assessment is the more ' +
             'general of the two.'
    },
    {
        a: 'Betweenness Centrality',
        b: 'Graph Density',
        relation: 'related',
        why: 'Both are graph metrics computed over the same structure, but one is not a kind ' +
             'of the other — they are siblings, not parent and child.'
    }
];

// Swapping the arrow inverts a hierarchical relation; related is symmetric.
const INVERSE = { broader: 'narrower', narrower: 'broader', related: 'related' };

const REL_LABEL = { broader: 'broader', narrower: 'narrower', related: 'related' };

const COLORS = {
    idle:    { background: '#eceff1', border: '#90a4ae' },
    correct: { edge: '#ffa000', node: { background: '#fff8e1', border: '#ffa000' } },
    wrong:   { edge: '#e53935', node: { background: '#ffebee', border: '#e53935' } }
};

// ===========================================
// STATE
// ===========================================

let nodes, edges, network;
let index = 0;          // which pair, 0-based
let swapped = false;    // has the learner flipped the arrow for this pair?
let answered = false;   // has this pair been answered yet?
let attempts = 0;       // attempts on the current pair (first-try scoring)
const results = [];     // per-pair: {pair, chosen, correct, firstTry, swapped}

function current() {
    return PAIRS[index];
}

// The two labels as currently displayed (left -> right).
function displayed() {
    const p = current();
    return swapped ? { from: p.b, to: p.a } : { from: p.a, to: p.b };
}

// The relation that is correct for the arrow as currently drawn.
function correctRelation() {
    return swapped ? INVERSE[current().relation] : current().relation;
}

// ===========================================
// NETWORK
// ===========================================

// Default fit() caps at 1:1, which leaves a two-node graph marooned in a
// mostly-empty panel. Allow modest zoom-in so the concept boxes read clearly.
function fitView() {
    network.fit({ animation: false, maxZoomLevel: 1.5 });
}

function buildNetwork() {
    // The 8px y-offset is deliberate. vis-network fails to render an edge label
    // on a perfectly horizontal edge on initial load; a slight angle fixes it.
    // The tilt is imperceptible across a 300px span.
    nodes = new vis.DataSet([
        { id: 'from', label: '', x: -150, y: 0 },
        { id: 'to',   label: '', x:  150, y: 8 }
    ]);
    edges = new vis.DataSet([
        { id: 'rel', from: 'from', to: 'to', label: '?' }
    ]);

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            dragNodes: false,
            dragView: false,
            zoomView: false,
            hover: false,
            navigationButtons: false,
            selectable: false
        },
        nodes: {
            shape: 'box',
            margin: 12,
            widthConstraint: { maximum: 150 },
            borderWidth: 2,
            font: { size: 14, face: 'Arial', color: '#212121', multi: false },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 1 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.1 } },
            width: 2,
            font: { size: 14, face: 'Arial', align: 'top', strokeWidth: 4, strokeColor: '#f0f8ff' },
            smooth: false
        }
    };

    network = new vis.Network(document.getElementById('network'),
        { nodes: nodes, edges: edges }, options);
    network.once('afterDrawing', () => fitView());
}

function renderGraph() {
    const d = displayed();
    const state = !answered ? 'idle' : (lastWasCorrect() ? 'correct' : 'wrong');

    nodes.update([
        {
            id: 'from', label: d.from,
            color: state === 'idle' ? COLORS.idle : COLORS[state].node
        },
        {
            id: 'to', label: d.to,
            color: state === 'idle' ? COLORS.idle : COLORS[state].node
        }
    ]);

    edges.update({
        id: 'rel',
        // dashed placeholder until the learner commits to a relation
        label: answered ? REL_LABEL[lastChoice()] : '?',
        dashes: !answered,
        width: answered ? 3 : 2,
        color: answered
            ? { color: COLORS[state].edge, highlight: COLORS[state].edge }
            : { color: '#90a4ae', highlight: '#90a4ae' },
        font: {
            size: 14,
            color: answered ? COLORS[state].edge : '#607d8b',
            align: 'top',
            strokeWidth: 4,
            strokeColor: '#f0f8ff'
        }
    });

    fitView();
}

function lastResult() {
    return results[index];
}

function lastChoice() {
    return lastResult() ? lastResult().chosen : null;
}

function lastWasCorrect() {
    return lastResult() ? lastResult().correct : false;
}

// ===========================================
// UI
// ===========================================

function renderProgress() {
    document.getElementById('progress-text').textContent =
        'Pair ' + (index + 1) + ' of ' + PAIRS.length;

    const dots = document.getElementById('dots');
    dots.innerHTML = '';
    PAIRS.forEach((p, i) => {
        const d = document.createElement('span');
        d.className = 'dot';
        const r = results[i];
        if (r) d.classList.add(r.firstTry ? 'correct' : 'wrong');
        if (i === index) d.classList.add('active');
        dots.appendChild(d);
    });

    const done = results.filter(Boolean);
    const firstTry = done.filter(r => r.firstTry).length;
    document.getElementById('score').textContent =
        'First-try score: ' + firstTry + ' / ' + done.length;
}

function renderControls() {
    const finished = results.filter(Boolean).length === PAIRS.length && answered;
    document.querySelectorAll('.btn-rel').forEach(b => { b.disabled = answered; });
    document.getElementById('btn-swap').disabled = answered;
    document.getElementById('btn-next').disabled = !answered || finished;
    document.getElementById('btn-next').textContent =
        index === PAIRS.length - 1 ? 'See Summary' : 'Next Pair';
}

function triple(from, rel, to) {
    return '<span class="triple">' + from + ' &nbsp;—' + rel + '→&nbsp; ' + to + '</span>';
}

function renderFeedback() {
    const fb = document.getElementById('feedback');

    if (!answered) {
        fb.className = 'feedback';
        fb.innerHTML = '<div class="fb-idle">Which SKOS relation belongs on this arrow? ' +
            'Use <b>Swap</b> if the arrow points the wrong way.</div>';
        return;
    }

    const r = lastResult();
    const d = displayed();
    const right = correctRelation();

    if (r.correct) {
        fb.className = 'feedback correct';
        fb.innerHTML = '<div><div class="fb-head correct">Correct — ' +
            triple(d.from, right, d.to) + '</div>' +
            '<div class="fb-body">' + current().why + '</div></div>';
    } else {
        fb.className = 'feedback wrong';
        fb.innerHTML = '<div><div class="fb-head wrong">Not quite — the correct relation is ' +
            triple(d.from, right, d.to) + '</div>' +
            '<div class="fb-body">' + current().why + '</div></div>';
    }
}

// Stage 3: scorecard listing each pair and whether it was right on the first try.
function renderScorecard() {
    const fb = document.getElementById('feedback');
    fb.className = 'feedback done';
    const rows = PAIRS.map((p, i) => {
        const r = results[i];
        const ok = r && r.firstTry;
        return '<div class="card-row"><span class="card-mark ' + (ok ? 'ok">✓' : 'no">✗') +
            '</span><span class="card-pair">' + p.a + ' —' + p.relation + '→ ' + p.b +
            '</span></div>';
    }).join('');
    const firstTry = results.filter(r => r && r.firstTry).length;
    fb.innerHTML = '<div class="card-rows">' +
        '<div class="fb-head" style="color:#e65100">First-try score: ' + firstTry + ' of ' +
        PAIRS.length + '</div>' + rows + '</div>';
}

function render() {
    renderGraph();
    renderProgress();
    renderControls();
}

// ===========================================
// ACTIONS
// ===========================================

function answer(chosen) {
    if (answered) return;
    attempts++;
    const correct = chosen === correctRelation();

    // Only the first attempt on a pair counts toward the score.
    results[index] = {
        pair: index,
        chosen: chosen,
        correct: correct,
        firstTry: correct && attempts === 1,
        swapped: swapped
    };

    answered = true;
    render();
    renderFeedback();
}

function nextPair() {
    if (index >= PAIRS.length - 1) {
        renderScorecard();
        document.getElementById('btn-next').disabled = true;
        return;
    }
    index++;
    swapped = false;
    answered = false;
    attempts = 0;
    render();
    renderFeedback();
}

function swap() {
    if (answered) return;
    swapped = !swapped;
    render();
}

function reset() {
    index = 0;
    swapped = false;
    answered = false;
    attempts = 0;
    results.length = 0;
    render();
    renderFeedback();
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    buildNetwork();
    render();
    renderFeedback();

    document.querySelectorAll('.btn-rel').forEach(b => {
        b.addEventListener('click', () => answer(b.dataset.rel));
    });
    document.getElementById('btn-swap').addEventListener('click', swap);
    document.getElementById('btn-next').addEventListener('click', nextPair);
    document.getElementById('btn-reset').addEventListener('click', reset);
    window.addEventListener('resize', fitView);
});
