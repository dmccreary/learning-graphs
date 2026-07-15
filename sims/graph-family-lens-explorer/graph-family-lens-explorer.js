// Graph Family Lens Explorer
// Educational vis-network MicroSim: the SAME five entities rendered under
// five different graph-type "lenses" so learners see that the edge set --
// not the node set -- is what distinguishes graph types.
// CANVAS_HEIGHT: 540
//
// Bloom L4 (Analyze): differentiate, compare, contrast the lenses.
// Lenses are swapped on the dropdown "change" event using network.setData().

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
// NODE-TYPE STYLES
// concept  -> light blue circle
// content  -> green rounded rectangle
// external -> gray hexagon
// ===========================================
const TYPE_STYLE = {
    concept:  { shape: 'circle', color: { background: '#97c2fc', border: '#2b7ce9' } },
    content:  { shape: 'box',    color: { background: '#a5d6a7', border: '#43a047' } },
    external: { shape: 'hexagon',color: { background: '#cfd8dc', border: '#78909c' } }
};

// Which graph types each node TYPE belongs to (shown on node click).
const TYPE_MEMBERSHIP = {
    concept:  'Concept nodes appear in Concept, Knowledge, Dependency, and Learning graphs. They are the ideas a learner must master.',
    content:  'Content-item nodes appear in Content graphs and Knowledge graphs. They are the videos, quizzes, and readings that teach or test concepts.',
    external: 'External-entity nodes appear only in Knowledge graphs. They are outside things (organizations, people, sources) linked to concepts or content.'
};

// ===========================================
// FIXED BASE NODE SET (positions stable across lenses)
// ===========================================
const BASE_NODES = {
    fractions: { id: 'fractions', label: 'Fractions',                 type: 'concept',  x: -220, y: -110 },
    decimals:  { id: 'decimals',  label: 'Decimals',                  type: 'concept',  x:  -60, y: 120 },
    video:     { id: 'video',     label: 'Video:\nIntro to Fractions', type: 'content',  x:  120, y: -120 },
    quiz:      { id: 'quiz',      label: 'Quiz:\nFractions Basics',    type: 'content',  x:  260, y: 90 },
    khan:      { id: 'khan',      label: 'Khan Academy',              type: 'external', x:  360, y: -110 }
};

function buildNode(key) {
    const b = BASE_NODES[key];
    const s = TYPE_STYLE[b.type];
    return {
        id: b.id,
        label: b.label,
        _type: b.type,
        x: b.x,
        y: b.y,
        fixed: { x: true, y: true },
        shape: s.shape,
        size: 26,
        color: {
            background: s.color.background,
            border: s.color.border,
            highlight: { background: s.color.background, border: '#ff9800' }
        }
    };
}

// ===========================================
// LENS CONFIGURATIONS
// Each lens lists which node keys are visible and its edge set.
// Edge `title` is the hover tooltip; `label` renders inline.
// ===========================================
const LENSES = {
    concept: {
        name: 'Concept Graph',
        nodeKeys: ['fractions', 'decimals'],
        edges: [
            { from: 'fractions', to: 'decimals', label: 'related to', title: 'related to',
              arrows: { to: { enabled: false } }, dashes: false }
        ],
        info: 'A concept graph links ideas to related ideas. Here Fractions and Decimals are joined by a single undirected "related to" edge -- no direction, no prerequisite.',
        caption: 'Showing the <strong>Concept Graph</strong> lens: two concepts joined by an undirected &ldquo;related to&rdquo; edge.',
        dag: false
    },
    content: {
        name: 'Content Graph',
        nodeKeys: ['video', 'quiz'],
        edges: [
            { from: 'video', to: 'quiz', label: 'precedes', title: 'precedes' }
        ],
        info: 'A content graph links learning materials in the order a learner meets them. The intro video "precedes" the quiz -- a directed sequencing edge between content items, not concepts.',
        caption: 'Switched to the <strong>Content Graph</strong> lens: the concept nodes vanish and the two content items appear, ordered by a directed &ldquo;precedes&rdquo; edge.',
        dag: false
    },
    knowledge: {
        name: 'Knowledge Graph',
        nodeKeys: ['fractions', 'decimals', 'video', 'quiz', 'khan'],
        edges: [
            { from: 'video', to: 'khan', label: 'created by', title: 'created by' },
            { from: 'quiz',  to: 'fractions', label: 'tests', title: 'tests' }
        ],
        info: 'A knowledge graph mixes many node types and typed relationships. All five entities appear: the video is "created by" Khan Academy, and the quiz "tests" the Fractions concept.',
        caption: 'Switched to the <strong>Knowledge Graph</strong> lens: all five entities appear at once, joined by mixed typed edges (&ldquo;created by&rdquo;, &ldquo;tests&rdquo;).',
        dag: false
    },
    dependency: {
        name: 'Dependency Graph',
        nodeKeys: ['fractions', 'decimals'],
        edges: [
            { from: 'decimals', to: 'fractions', label: 'DEPENDS_ON', title: 'DEPENDS_ON' }
        ],
        info: 'A dependency graph shows what must be learned first. Decimals "DEPENDS_ON" Fractions -- a directed prerequisite edge. Same two nodes as the concept lens, but the edge now has direction and meaning.',
        caption: 'Switched to the <strong>Dependency Graph</strong> lens: the same two concepts, but the edge is now the directed prerequisite &ldquo;Decimals DEPENDS_ON Fractions&rdquo;.',
        dag: false
    },
    enablement: {
        name: 'Enablement Graph',
        nodeKeys: ['fractions', 'decimals'],
        edges: [
            { from: 'fractions', to: 'decimals', label: 'ENABLES LEARNING', title: 'ENABLES LEARNING' }
        ],
        info: 'An enablement graph is the mirror image of a dependency graph: the arrow points from the prerequisite toward what it unlocks. Fractions "ENABLES LEARNING" of Decimals -- same two nodes as the dependency lens, but the arrowhead direction and the relationship label both reverse.',
        caption: 'Switched to the <strong>Enablement Graph</strong> lens: the same two concepts as the dependency lens, but the arrow reverses to &ldquo;Fractions ENABLES LEARNING of Decimals&rdquo;.',
        dag: false
    },
    learning: {
        name: 'Learning Graph',
        nodeKeys: ['fractions', 'decimals'],
        edges: [
            { from: 'decimals', to: 'fractions', label: 'DEPENDS_ON', title: 'DEPENDS_ON' }
        ],
        info: 'A learning graph is a dependency graph with a rule: it must be a Directed Acyclic Graph (DAG) -- no prerequisite loops. The edge set is identical to the dependency lens, but validity is now a requirement.',
        caption: 'Switched to the <strong>Learning Graph</strong> lens: identical edge to the dependency lens, plus the guarantee that the whole graph is a valid DAG (no cycles).',
        dag: true
    }
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let currentLens = 'concept';
let previousLensName = null;

// ===========================================
// BUILD DATASETS FOR A LENS
// ===========================================
function nodesForLens(key) {
    return LENSES[key].nodeKeys.map(buildNode);
}

function edgesForLens(key) {
    return LENSES[key].edges.map((e, i) => ({
        id: 'edge-' + i,
        from: e.from,
        to: e.to,
        label: e.label,
        title: e.title,
        arrows: e.arrows,
        dashes: e.dashes
    }));
}

// ===========================================
// APPLY A LENS (with a 300ms fade transition)
// ===========================================
function applyLens(key, animate) {
    const lens = LENSES[key];

    function swap() {
        nodes = new vis.DataSet(nodesForLens(key));
        edges = new vis.DataSet(edgesForLens(key));
        network.setData({ nodes: nodes, edges: edges });
        // Re-fit so each lens is nicely framed.
        network.fit({ animation: { duration: 300, easingFunction: 'easeInOutQuad' } });
        updatePanels(key);
    }

    if (animate && network) {
        // Fade the current graph out, swap, then the new data fades in
        // via the DOM opacity transition on the canvas wrapper.
        const canvas = document.querySelector('#network canvas');
        if (canvas) {
            canvas.style.transition = 'opacity 300ms ease';
            canvas.style.opacity = '0';
            setTimeout(function () {
                swap();
                const c2 = document.querySelector('#network canvas');
                if (c2) {
                    c2.style.transition = 'opacity 300ms ease';
                    // Force reflow so the transition runs from 0 -> 1.
                    void c2.offsetWidth;
                    c2.style.opacity = '1';
                }
            }, 300);
            return;
        }
    }
    swap();
}

// ===========================================
// PANEL / CAPTION UPDATES
// ===========================================
function updatePanels(key) {
    const lens = LENSES[key];

    document.getElementById('infobox-title').textContent = lens.name;
    document.getElementById('infobox-text').textContent = lens.info;

    // DAG badge only for the learning lens.
    document.getElementById('dag-badge').style.display = lens.dag ? 'block' : 'none';

    // Persistent comparison caption: previous -> current.
    const captionEl = document.getElementById('caption');
    if (previousLensName && previousLensName !== lens.name) {
        captionEl.innerHTML = lens.caption +
            ' <em>(changed from the ' + previousLensName + ' lens.)</em>';
    } else {
        captionEl.innerHTML = lens.caption;
    }
    previousLensName = lens.name;
}

// ===========================================
// NODE CLICK -> node-type membership infobox
// ===========================================
function handleClick(params) {
    if (params.nodes.length > 0) {
        const node = nodes.get(params.nodes[0]);
        if (node && node._type) {
            const label = (node.label || '').replace(/\n/g, ' ');
            document.getElementById('infobox-title').textContent = label;
            document.getElementById('infobox-text').textContent = TYPE_MEMBERSHIP[node._type];
        }
    } else {
        // Clicked empty space: restore the lens description.
        const lens = LENSES[currentLens];
        document.getElementById('infobox-title').textContent = lens.name;
        document.getElementById('infobox-text').textContent = lens.info;
    }
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
function initializeNetwork() {
    nodes = new vis.DataSet(nodesForLens(currentLens));
    edges = new vis.DataSet(edgesForLens(currentLens));

    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },   // fixed positions; lenses swap edge sets
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: enableMouse, bindToWindow: false },
            hover: true,
            tooltipDelay: 120
        },
        nodes: {
            size: 26,
            margin: 10,
            font: { size: 13, face: 'Arial', color: '#111' },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            color: { color: '#5a5a5a', highlight: '#ff9800' },
            font: { size: 12, color: '#333', strokeWidth: 4, strokeColor: '#ffffff', align: 'middle' },
            width: 2,
            smooth: { enabled: true, type: 'curvedCW', roundness: 0.15 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.on('click', handleClick);

    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    updatePanels(currentLens);
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    document.getElementById('lens-select').addEventListener('change', function (e) {
        currentLens = e.target.value;
        applyLens(currentLens, true);
    });

    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
