// Content Sequencing Algorithm Simulator
// Educational vis-network MicroSim - Chapter 9: Mastery, Metacognition, Instructional Sequencing
// Bloom Level: Apply (L3) - apply, demonstrate, use, practice
// CANVAS_HEIGHT: 580
//
// The learner acts AS the sequencing algorithm: click nodes to toggle mastery,
// and the "Recommended Next" panel recomputes the ready-to-learn set live.
// A node is ready-to-learn when every one of its dependency-direction
// prerequisites is Mastered. Spaced-repetition and interleaving toggles re-rank
// that base set so the learner can see how each weighting changes the output.

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
// MASTERY STATES + COLORS
// ===========================================
const STATE = { NOT: 'not', MASTERED: 'mastered', DUE: 'due' };

const STATE_COLORS = {
    not:      { background: '#c8c8c8', border: '#8a8a8a', font: '#222' },
    mastered: { background: '#43a047', border: '#2e7d32', font: '#fff' },
    due:      { background: '#f5a623', border: '#b97e12', font: '#3a2a05' }
};

const RING_COLOR = '#e53935';   // recommended-next ring
const RING_WIDTH = 5;
const NORMAL_BORDER = 2;

// ===========================================
// GRAPH DATA - 10 nodes across 3 branches, exactly 2 roots (no prerequisites)
// Branch M (main math spine): Arithmetic -> Number Sense feed Algebra ->
//   {Applied Calculus, Linear Algebra}
// Branch G (geometry): Geometry <- Arithmetic; Trigonometry <- Geometry
// Branch S (statistics): Statistics <- Number Sense; Probability <- Statistics;
//   Data Modeling <- Probability
// Roots Arithmetic (id 1) and Number Sense (id 2) start Mastered.
// ===========================================
const nodeData = [
    { id: 1,  label: 'Arithmetic',       branch: 'M', x: -360, y:  -40 },
    { id: 2,  label: 'Number Sense',     branch: 'M', x: -360, y:  120 },
    { id: 3,  label: 'Algebra',          branch: 'M', x: -170, y:   40 },
    { id: 4,  label: 'Applied Calculus', branch: 'M', x:   20, y:  -40 },
    { id: 5,  label: 'Linear Algebra',   branch: 'M', x:   20, y:  110 },
    { id: 6,  label: 'Geometry',         branch: 'G', x: -170, y: -170 },
    { id: 7,  label: 'Trigonometry',     branch: 'G', x:   20, y: -190 },
    { id: 8,  label: 'Statistics',       branch: 'S', x: -170, y:  230 },
    { id: 9,  label: 'Probability',      branch: 'S', x:   20, y:  260 },
    { id: 10, label: 'Data Modeling',    branch: 'S', x:  210, y:  230 }
];

const BRANCH_NAMES = { M: 'Algebra Spine', G: 'Geometry', S: 'Statistics' };

// Directed dependency edges: from = prerequisite, to = dependent concept.
const edgeData = [
    { from: 1, to: 3 },   // Arithmetic -> Algebra
    { from: 2, to: 3 },   // Number Sense -> Algebra
    { from: 3, to: 4 },   // Algebra -> Applied Calculus
    { from: 3, to: 5 },   // Algebra -> Linear Algebra
    { from: 1, to: 6 },   // Arithmetic -> Geometry
    { from: 6, to: 7 },   // Geometry -> Trigonometry
    { from: 2, to: 8 },   // Number Sense -> Statistics
    { from: 8, to: 9 },   // Statistics -> Probability
    { from: 9, to: 10 }   // Probability -> Data Modeling
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let masteryState = {};       // nodeId -> STATE
let weightSpaced = false;
let preferInterleave = false;
let lastRecommendedBranch = null; // for interleaving continuity

// ===========================================
// ADJACENCY
// ===========================================
function getPrerequisites(id) {
    return edgeData.filter(e => e.to === id).map(e => e.from);
}

// ===========================================
// READY-TO-LEARN RULE
// A Not-Mastered node is ready when ALL its prerequisites are Mastered.
// (Due-for-Review counts as mastered-for-prerequisite purposes, since the
// concept was learned; it is only "due" for refresh.)
// ===========================================
function isMasteredForPrereq(id) {
    return masteryState[id] === STATE.MASTERED || masteryState[id] === STATE.DUE;
}

function computeReadyToLearn() {
    return nodeData
        .filter(n => masteryState[n.id] === STATE.NOT)
        .filter(n => {
            const prereqs = getPrerequisites(n.id);
            return prereqs.every(p => isMasteredForPrereq(p));
        })
        .map(n => n.id);
}

function getDueNodes() {
    return nodeData
        .filter(n => masteryState[n.id] === STATE.DUE)
        .map(n => n.id);
}

// ===========================================
// RECOMMENDATION BUILD (base + optional re-ranking)
// Returns an ordered array of { id, kind } where kind is 'ready' | 'due'.
// ===========================================
function buildRecommendations() {
    const readyIds = computeReadyToLearn();
    let items = readyIds.map(id => ({ id: id, kind: 'ready' }));

    // Spaced-repetition weighting: add Due-for-Review nodes to the panel.
    if (weightSpaced) {
        getDueNodes().forEach(id => items.push({ id: id, kind: 'due' }));
    }

    // Interleaving re-ranking: when multiple branches have ready items, order so
    // consecutive recommendations come from different branches, and lead with a
    // branch different from the previously surfaced top recommendation.
    if (preferInterleave && items.length > 1) {
        items = interleaveByBranch(items);
    } else {
        // Stable default order: by node id.
        items.sort((a, b) => a.id - b.id);
    }

    return items;
}

function branchOf(id) {
    const n = nodeData.find(nn => nn.id === id);
    return n ? n.branch : '?';
}

// Round-robin across branches so no two adjacent items share a branch when
// avoidable; bias the first pick away from lastRecommendedBranch.
function interleaveByBranch(items) {
    const byBranch = {};
    items.forEach(it => {
        const b = branchOf(it.id);
        if (!byBranch[b]) byBranch[b] = [];
        byBranch[b].push(it);
    });
    Object.keys(byBranch).forEach(b => byBranch[b].sort((a, c) => a.id - c.id));

    // Branch visiting order: start with a branch != lastRecommendedBranch if possible.
    let branchOrder = Object.keys(byBranch).sort();
    if (lastRecommendedBranch && branchOrder.length > 1 &&
        branchOrder[0] === lastRecommendedBranch) {
        branchOrder.push(branchOrder.shift());
    }

    const result = [];
    let added = true;
    while (added) {
        added = false;
        for (const b of branchOrder) {
            if (byBranch[b].length) {
                result.push(byBranch[b].shift());
                added = true;
            }
        }
    }
    return result;
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id,
        label: n.label,
        x: n.x,
        y: n.y,
        borderWidth: NORMAL_BORDER
    })));

    edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        color: { color: '#9fb3c4', highlight: '#607d8b' },
        width: 2
    })));

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'box',
            margin: 8,
            widthConstraint: { maximum: 110 },
            font: { size: 13, face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 1 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    // Click a node: cycle Not Mastered -> Mastered -> Not Mastered.
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            toggleNode(params.nodes[0]);
        }
    });
}

// ===========================================
// STATE MUTATION
// ===========================================
function toggleNode(id) {
    const cur = masteryState[id];
    // Due -> Not (clicking a due node clears it too, returning to Not Mastered).
    if (cur === STATE.MASTERED || cur === STATE.DUE) {
        masteryState[id] = STATE.NOT;
    } else {
        masteryState[id] = STATE.MASTERED;
    }
    refresh();
}

function simulateTimePassing() {
    // Randomly mark one or two already-Mastered nodes as Due for Review.
    const mastered = nodeData
        .filter(n => masteryState[n.id] === STATE.MASTERED)
        .map(n => n.id);
    if (mastered.length === 0) return;

    const count = Math.min(mastered.length, 1 + Math.floor(Math.random() * 2));
    // Shuffle and take `count`.
    const shuffled = mastered.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.slice(0, count).forEach(id => { masteryState[id] = STATE.DUE; });
    refresh();
}

function reset() {
    weightSpaced = false;
    preferInterleave = false;
    lastRecommendedBranch = null;
    document.getElementById('spaced-toggle').checked = false;
    document.getElementById('interleave-toggle').checked = false;

    // All Not Mastered except the two roots (no prerequisites), which are Mastered.
    nodeData.forEach(n => {
        masteryState[n.id] = getPrerequisites(n.id).length === 0
            ? STATE.MASTERED
            : STATE.NOT;
    });
    refresh();
}

// ===========================================
// RENDER
// ===========================================
function refresh() {
    const recs = buildRecommendations();
    const recSet = new Set(recs.map(r => r.id));

    // Recolor + ring nodes.
    nodes.update(nodeData.map(n => {
        const st = masteryState[n.id];
        const c = STATE_COLORS[st];
        const recommended = recSet.has(n.id);
        return {
            id: n.id,
            color: {
                background: c.background,
                border: recommended ? RING_COLOR : c.border
            },
            font: { color: c.font, size: 13, face: 'Arial' },
            borderWidth: recommended ? RING_WIDTH : NORMAL_BORDER
        };
    }));

    renderRecommendations(recs);
}

function renderRecommendations(recs) {
    const list = document.getElementById('rec-list');
    const caption = document.getElementById('rec-caption');
    list.innerHTML = '';

    if (recs.length === 0) {
        const li = document.createElement('li');
        li.className = 'rec-empty';
        li.textContent = 'No concepts are ready to learn. Master a prerequisite to unlock the next concept.';
        list.appendChild(li);
        caption.className = 'rec-caption';
        caption.textContent = '';
        lastRecommendedBranch = null;
        return;
    }

    recs.forEach(rec => {
        const node = nodeData.find(n => n.id === rec.id);
        const li = document.createElement('li');
        if (rec.kind === 'due') li.className = 'rec-due';
        const branchName = BRANCH_NAMES[node.branch] || node.branch;
        const tag = rec.kind === 'due' ? 'Due for Review' : branchName;
        li.innerHTML = '<span class="rec-branch">' + tag + '</span>' + node.label;
        list.appendChild(li);
    });

    // Caption logic explaining the active weighting.
    updateCaption(recs, caption);

    // Track the branch of the top recommendation for interleaving continuity.
    lastRecommendedBranch = branchOf(recs[0].id);
}

function updateCaption(recs, caption) {
    const branchesPresent = new Set(recs
        .filter(r => r.kind === 'ready')
        .map(r => branchOf(r.id)));
    const dueCount = recs.filter(r => r.kind === 'due').length;

    let msg = '';
    if (preferInterleave && branchesPresent.size > 1) {
        const topBranch = BRANCH_NAMES[branchOf(recs[0].id)] || branchOf(recs[0].id);
        msg = 'Interleaving is ON: ready concepts come from ' + branchesPresent.size +
              ' branches, so the list alternates branches (top pick: ' + topBranch +
              ') instead of stacking one branch. This spreads practice across topics.';
    } else if (weightSpaced && dueCount > 0) {
        msg = 'Spaced repetition is ON: ' + dueCount + ' already-mastered concept' +
              (dueCount > 1 ? 's' : '') + ' turned amber and rejoined the list for ' +
              'timely review, alongside any newly ready-to-learn concepts.';
    }

    if (msg) {
        caption.textContent = msg;
        caption.className = 'rec-caption show';
    } else {
        caption.textContent = '';
        caption.className = 'rec-caption';
    }
}

// ===========================================
// BOOT
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    document.getElementById('time-btn').addEventListener('click', simulateTimePassing);
    document.getElementById('reset-btn').addEventListener('click', reset);
    document.getElementById('spaced-toggle').addEventListener('change', function (e) {
        weightSpaced = e.target.checked;
        refresh();
    });
    document.getElementById('interleave-toggle').addEventListener('change', function (e) {
        preferInterleave = e.target.checked;
        refresh();
    });

    reset(); // sets initial mastery (two roots mastered) and first recommendations
});
