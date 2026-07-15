// Dependency Review Console
// CANVAS_HEIGHT: 480
//
// Eight pre-written dependency edges from this book's own vocabulary. Each shows
// the asserted rationale, the asserter's confidence, and its provenance; the
// learner judges it as sound / overconstrained / underconstrained / false.
//
// Edge convention matches the rest of this book: A -> B reads "A depends on B",
// so B is the prerequisite.
//
// The confidence values deliberately cross-cut correctness. Edge 5 is a SOUND
// edge asserted at medium confidence; edge 6 is an OVERCONSTRAINED edge asserted
// at high confidence. Confidence records how sure the asserter was, not whether
// they were right — a learner who classifies by reading the badge will score
// about 50%, which is the point.

// ===========================================
// ANSWER KEY
// ===========================================
// answer: 'sound' | 'overconstrained' | 'underconstrained' | 'false'

const EDGES = [
    {
        from: 'Breadth-First Search',
        to: 'Graph Traversal',
        confidence: 'high',
        provenance: 'human domain expert',
        rationale: 'Breadth-First Search is one specific traversal strategy. A learner cannot ' +
                   'follow what BFS is doing without first knowing what it means to traverse a graph.',
        answer: 'sound',
        why: 'A genuine necessary prerequisite, and correctly scoped. The dependency is ' +
             'definitional — BFS is literally defined as a kind of traversal — so it is not ' +
             'possible to learn the specific concept without the general one.'
    },
    {
        from: 'Node Styling',
        to: 'Graph Theory',
        confidence: 'medium',
        provenance: 'generative-AI pass',
        rationale: 'Understanding graph theory makes vis.js node styling much easier to ' +
                   'reason about.',
        answer: 'overconstrained',
        why: '"Makes it easier" is the signature of a recommended prerequisite, not a ' +
             'necessary one. Encoded as a hard edge, it blocks a designer who just wants to ' +
             'change a node\'s color until they have studied graph theory.'
    },
    {
        from: 'Dublin Core Metadata',
        to: "Bloom's Taxonomy",
        confidence: 'low',
        provenance: 'automated inference step',
        rationale: 'Both concepts appear in the standards-and-metadata chapters, so they are ' +
                   'closely related.',
        answer: 'false',
        why: 'Topical proximity is not prerequisite structure. Dublin Core is a metadata ' +
             'standard; Bloom\'s Taxonomy is a learning-objective framework. Neither requires ' +
             'the other. This is exactly the "edge based on topical proximity rather than ' +
             'domain expertise" that Chapter 19 flagged as a false-prerequisite risk.'
    },
    {
        from: 'Betweenness Centrality',
        to: 'Graph',
        confidence: 'medium',
        provenance: 'generative-AI pass',
        rationale: 'Centrality is computed over a graph, so a learner needs to know what a ' +
                   'graph is first.',
        answer: 'underconstrained',
        why: 'True, but not enough. Betweenness centrality is defined in terms of shortest ' +
             'paths, so Shortest Path is also necessary. Depending only on Graph lets a ' +
             'learner reach the metric without having met the thing it counts.'
    },
    {
        from: 'Topological Sort',
        to: 'Directed Acyclic Graph',
        confidence: 'medium',
        provenance: 'generative-AI pass',
        rationale: 'A topological ordering only exists for a graph with no cycles; the ' +
                   'algorithm is defined over DAGs.',
        answer: 'sound',
        why: 'Correct and correctly scoped — despite the medium confidence. Confidence ' +
             'records how sure the asserter was, not whether the edge is right. This one was ' +
             'marked medium only because no source was cited; the dependency itself is ' +
             'definitional and necessary.'
    },
    {
        from: 'Concept Label',
        to: 'Learning Graph',
        confidence: 'high',
        provenance: 'human domain expert',
        rationale: 'You must understand the complete learning graph model before you can ' +
                   'write a concept label for it.',
        answer: 'overconstrained',
        why: 'High confidence does not make an edge right. Writing a good ISO 11179 ' +
             'definition needs the concept being defined, not the whole graph model around ' +
             'it. As written, this edge forces the entire structure to be learned before a ' +
             'single label can be drafted.'
    },
    {
        from: 'Graph Diameter',
        to: 'Betweenness Centrality',
        confidence: 'medium',
        provenance: 'automated inference step',
        rationale: 'Both are graph metrics, and centrality is usually taught first.',
        answer: 'false',
        why: 'Teaching order is not dependency. Graph diameter is the longest shortest path, ' +
             'so it needs Shortest Path — not centrality. Sibling metrics do not depend on ' +
             'each other just because a syllabus happens to sequence them that way.'
    },
    {
        from: 'Personalized Learning Path',
        to: 'Learning Graph',
        confidence: 'low',
        provenance: 'generative-AI pass',
        rationale: 'A personalized learning path is a route through the learning graph.',
        answer: 'underconstrained',
        why: 'The edge is real but the prerequisite set is too thin. Generating a personalized ' +
             'path also requires a Learner Model and Readiness Estimation. Without them, a ' +
             'learner meets the concept with no idea what the "personalized" part is computed ' +
             'from.'
    }
];

const LABELS = {
    sound: 'Sound',
    overconstrained: 'Overconstrained',
    underconstrained: 'Underconstrained',
    'false': 'False Prerequisite'
};

// ===========================================
// STATE
// ===========================================

let index = 0;
let answered = false;
const results = [];   // per-edge: { chosen, correct }

function current() {
    return EDGES[index];
}

// ===========================================
// RENDER: CARD
// ===========================================

function renderCard() {
    const e = current();
    const r = results[index];

    document.getElementById('concept-from').textContent = e.from;
    document.getElementById('concept-to').textContent = e.to;
    document.getElementById('rationale-text').textContent = '“' + e.rationale + '”';

    const badge = document.getElementById('confidence-badge');
    badge.className = 'badge ' + e.confidence;
    badge.textContent = e.confidence + ' confidence';

    document.getElementById('provenance').textContent = 'asserted by: ' + e.provenance;

    const card = document.getElementById('card');
    card.className = 'card' + (answered ? (r.correct ? ' correct' : ' wrong') : '');
}

// ===========================================
// RENDER: PROGRESS
// ===========================================

function renderProgress() {
    document.getElementById('progress-text').textContent =
        'Edge ' + (index + 1) + ' of ' + EDGES.length;

    const dots = document.getElementById('dots');
    dots.innerHTML = '';
    EDGES.forEach((e, i) => {
        const d = document.createElement('span');
        d.className = 'dot';
        const r = results[i];
        if (r) d.classList.add(r.correct ? 'correct' : 'wrong');
        if (i === index) d.classList.add('active');
        dots.appendChild(d);
    });

    const done = results.filter(Boolean);
    const right = done.filter(r => r.correct).length;
    document.getElementById('score').textContent = 'Accuracy: ' + right + ' / ' + done.length;
}

// ===========================================
// RENDER: CONTROLS
// ===========================================

function renderControls() {
    const finished = results.filter(Boolean).length === EDGES.length && answered;
    const r = results[index];

    document.querySelectorAll('.btn-class').forEach(b => {
        b.disabled = answered;
        b.classList.remove('is-answer', 'is-chosen-wrong');
        if (answered) {
            // green the model answer; red the learner's pick if it missed
            if (b.dataset.cls === current().answer) b.classList.add('is-answer');
            else if (r && b.dataset.cls === r.chosen) b.classList.add('is-chosen-wrong');
        }
    });

    const next = document.getElementById('btn-next');
    next.disabled = !answered || finished;
    next.textContent = index === EDGES.length - 1 ? 'Review Summary' : 'Next Edge';
}

// ===========================================
// RENDER: VERDICT
// ===========================================

function renderVerdict() {
    const v = document.getElementById('verdict');

    if (!answered) {
        v.className = 'verdict';
        v.innerHTML = '<div class="v-idle">Judge this edge. Is it sound, or does it over- or ' +
            'under-constrain the learner — or should it not be here at all?</div>';
        return;
    }

    const e = current();
    const r = results[index];
    const model = '<span class="tag">' + LABELS[e.answer] + '</span>';

    if (r.correct) {
        v.className = 'verdict correct';
        v.innerHTML = '<div><div class="v-head correct">Correct — this edge is ' + model +
            '</div><div class="v-body">' + e.why + '</div></div>';
    } else {
        v.className = 'verdict wrong';
        v.innerHTML = '<div><div class="v-head wrong">You said <span class="tag">' +
            LABELS[r.chosen] + '</span> — the model answer is ' + model +
            '</div><div class="v-body">' + e.why + '</div></div>';
    }
}

// Stage 3: learner's classifications vs the model answers, with running accuracy.
// Swaps the card out so all eight rows have room (see .summary-mode in the CSS).
function renderSummary() {
    document.querySelector('.container').classList.add('summary-mode');
    const v = document.getElementById('verdict');
    v.className = 'verdict done';
    const rows = EDGES.map((e, i) => {
        const r = results[i];
        const ok = r && r.correct;
        return '<tr><td class="mark ' + (ok ? 'ok">✓' : 'no">✗') + '</td>' +
            '<td class="edge-cell">' + e.from + ' → ' + e.to + '</td>' +
            '<td class="ans-cell">you: ' + (r ? LABELS[r.chosen] : '—') + '</td>' +
            '<td class="ans-cell">model: ' + LABELS[e.answer] + '</td></tr>';
    }).join('');
    const right = results.filter(r => r && r.correct).length;
    v.innerHTML = '<div style="width:100%"><div class="summary-head">Review accuracy: ' +
        right + ' of ' + EDGES.length + '</div>' +
        '<table class="summary-table">' + rows + '</table></div>';
}

function render() {
    renderCard();
    renderProgress();
    renderControls();
    renderVerdict();
}

// ===========================================
// ACTIONS
// ===========================================

function classify(chosen) {
    if (answered) return;
    results[index] = { chosen: chosen, correct: chosen === current().answer };
    answered = true;
    render();
}

function nextEdge() {
    if (index >= EDGES.length - 1) {
        renderSummary();
        document.getElementById('btn-next').disabled = true;
        return;
    }
    index++;
    answered = false;
    render();
}

function reset() {
    document.querySelector('.container').classList.remove('summary-mode');
    index = 0;
    answered = false;
    results.length = 0;
    render();
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-class').forEach(b => {
        b.addEventListener('click', () => classify(b.dataset.cls));
    });
    document.getElementById('btn-next').addEventListener('click', nextEdge);
    document.getElementById('btn-reset').addEventListener('click', reset);
    render();
});
