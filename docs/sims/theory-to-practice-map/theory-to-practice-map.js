// Theory-to-Practice Concept Map - vis-network MicroSim
// Chapter 7: Learning Theories and Instructional Design
// Bloom: Understand (L2) - summarize, classify, interpret.
// A persistent two-tier map: five theories -> Instructional Design -> four practices.
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
const THEORY_COLOR    = { background: '#97c2fc', border: '#2b7ce9' };
const PRACTICE_COLOR  = { background: '#ffd54f', border: '#f5a623' };
const SECONDARY_COLOR = { background: '#e0e0e0', border: '#9e9e9e' };
const DIM = 0.18;   // opacity-like dim factor via color fade

// ===========================================
// NODE DEFINITIONS
// kind: 'theory' | 'practice' | 'secondary'
// def:  one-sentence definition (hover tooltip)
// full: paragraph explanation (side panel)
// level drives the hierarchical rows.
// ===========================================
const nodeDefs = [
    // Top tier: five theories (circles)
    { id: 'constructivism', label: 'Constructivism', kind: 'theory', level: 0,
      def: 'Learners actively build new knowledge by connecting it to what they already know.',
      full: 'Constructivism holds that knowledge is not simply transmitted from teacher to student but is actively constructed by the learner. New ideas are understood by relating them to prior experience, which is exactly why a learning graph maps prerequisites: each concept is scaffolded onto the concepts a learner already holds.' },
    { id: 'cognitivism', label: 'Cognitivism', kind: 'theory', level: 0,
      def: 'Learning is the processing, organizing, and storing of information in memory.',
      full: 'Cognitivism treats the mind as an information processor, focusing on how learners take in, organize, and retrieve knowledge. It motivates attention to working-memory limits and to structuring content so that dependencies are introduced in a manageable order.' },
    { id: 'behaviorism', label: 'Behaviorism', kind: 'theory', level: 0,
      def: 'Learning is a change in observable behavior shaped by stimulus, response, and reinforcement.',
      full: 'Behaviorism explains learning through observable responses to stimuli and the reinforcement that follows. It underpins practice-and-feedback loops, mastery checks, and the immediate feedback that instructional practices such as Mastery Learning rely on.' },
    { id: 'connectivism', label: 'Connectivism', kind: 'theory', level: 0,
      def: 'Learning happens across networks of people, resources, and technology, not just inside one head.',
      full: 'Connectivism frames learning as the ability to form and traverse connections across a network of information sources. It is the theory most aligned with non-linear, exploratory paths through a knowledge graph, where the learner chooses among many valid routes.' },
    { id: 'andragogy', label: 'Andragogy', kind: 'theory', level: 0,
      def: 'The theory and practice of teaching adults, who are self-directed and draw on life experience.',
      full: 'Andragogy is the study of how adults learn: they are self-directed, bring substantial experience, and are motivated by immediately useful, problem-centered content. It shapes how instructional designers sequence and frame material for adult audiences.' },

    // Middle tier: Instructional Design (practice, the hub)
    { id: 'instructional-design', label: 'Instructional\nDesign', kind: 'practice', level: 1,
      def: 'The systematic process of turning learning theory into effective instructional materials and experiences.',
      full: 'Instructional Design is the systematic practice of applying learning theory to create effective instruction. In this book it sits at the hub of the map: it depends on Constructivism, Behaviorism, and Cognitivism, and in turn every downstream practice (Scaffolding, Curriculum Design, Mastery Learning) depends on it.' },

    // Bottom tier: dependent practices (squares)
    { id: 'scaffolding', label: 'Scaffolding', kind: 'practice', level: 2,
      def: 'Temporary support that is gradually removed as a learner becomes able to work independently.',
      full: 'Scaffolding provides temporary, targeted support that is faded as the learner gains competence. It is an instructional-design practice and a prerequisite for Mastery Learning, which assumes learners can be supported to reach proficiency before advancing.' },
    { id: 'curriculum-design', label: 'Curriculum\nDesign', kind: 'practice', level: 2,
      def: 'Organizing learning goals, content, and sequence into a coherent course of study.',
      full: 'Curriculum Design organizes goals, content, and sequence into a coherent program. It depends on Instructional Design principles and is where a validated learning graph pays off, supplying a defensible order in which topics should be taught.' },
    { id: 'mastery-learning', label: 'Mastery\nLearning', kind: 'practice', level: 3,
      def: 'Requiring learners to demonstrate mastery of one unit before moving to the next.',
      full: 'Mastery Learning requires learners to demonstrate proficiency on each unit before progressing. It depends on Scaffolding to bring learners up to the mastery threshold, and it operationalizes the prerequisite ordering that a learning graph makes explicit.' },

    // Secondary / illustrative node (lower-right, lighter gray)
    { id: 'non-linear-path', label: 'Non-Linear\nLearning Path', kind: 'secondary', level: 2,
      def: 'A route through material that lets learners choose their own order rather than a single fixed sequence.',
      full: 'A Non-Linear Learning Path lets learners choose among multiple valid routes through the material instead of following one fixed sequence. It is shown here as an illustrative addition (not a core practice) and depends on Connectivism, the theory that best explains network-style, learner-chosen navigation.' }
];

// ===========================================
// EDGES (directed: dependent -> prerequisite)
// ===========================================
const edgeDefs = [
    { from: 'instructional-design', to: 'constructivism' },
    { from: 'instructional-design', to: 'behaviorism' },
    { from: 'instructional-design', to: 'cognitivism' },
    { from: 'scaffolding',          to: 'instructional-design' },
    { from: 'curriculum-design',    to: 'instructional-design' },
    { from: 'mastery-learning',     to: 'scaffolding' },
    { from: 'non-linear-path',      to: 'connectivism' }
];

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let selectedNode = null;

// ===========================================
// LOOKUPS
// ===========================================
const defById = {};
nodeDefs.forEach(n => { defById[n.id] = n; });

function colorFor(kind) {
    if (kind === 'theory') return THEORY_COLOR;
    if (kind === 'practice') return PRACTICE_COLOR;
    return SECONDARY_COLOR;
}

function shapeFor(kind) {
    return kind === 'theory' ? 'circle' : 'box';
}

// ===========================================
// BUILD DATASETS
// ===========================================
function buildNodes() {
    return nodeDefs.map(n => {
        const c = colorFor(n.kind);
        return {
            id: n.id,
            label: n.label,
            level: n.level,
            shape: shapeFor(n.kind),
            title: n.def,                 // native tooltip = one-sentence definition
            color: {
                background: c.background,
                border: c.border,
                highlight: { background: c.background, border: c.border }
            },
            font: { color: n.kind === 'practice' ? '#5b4300' : '#1a3a6c', size: 14, face: 'Arial' },
            borderWidth: 3,
            margin: 10,
            widthConstraint: n.kind === 'theory' ? { minimum: 70 } : undefined
        };
    });
}

function buildEdges() {
    return edgeDefs.map((e, i) => ({
        id: 'e' + i,
        from: e.from,
        to: e.to,
        color: { color: '#607d8b', highlight: '#37474f' },
        width: 2,
        arrows: { to: { enabled: true, scaleFactor: 1.0 } },
        smooth: { enabled: true, type: 'cubicBezier', roundness: 0.4 }
    }));
}

// ===========================================
// HIGHLIGHT / DIM ON CLICK
// ===========================================
function highlightNeighborhood(nodeId) {
    selectedNode = nodeId;
    const connectedNodes = new Set([nodeId]);
    network.getConnectedNodes(nodeId).forEach(id => connectedNodes.add(id));
    const connectedEdges = new Set(network.getConnectedEdges(nodeId));

    const nodeUpdates = nodeDefs.map(n => {
        const inFocus = connectedNodes.has(n.id);
        const c = colorFor(n.kind);
        return {
            id: n.id,
            color: {
                background: inFocus ? c.background : fade(c.background),
                border: inFocus ? c.border : fade(c.border)
            },
            font: {
                color: inFocus
                    ? (n.kind === 'practice' ? '#5b4300' : '#1a3a6c')
                    : '#bbbbbb',
                size: 14, face: 'Arial'
            }
        };
    });
    nodes.update(nodeUpdates);

    const edgeUpdates = edges.get().map(e => ({
        id: e.id,
        color: connectedEdges.has(e.id)
            ? { color: '#1565c0', highlight: '#0d47a1' }
            : { color: '#dce3e8', highlight: '#dce3e8' },
        width: connectedEdges.has(e.id) ? 3 : 1
    }));
    edges.update(edgeUpdates);

    showSidePanel(nodeId, connectedNodes);
}

function clearHighlight() {
    selectedNode = null;
    nodes.update(buildNodes());
    edges.update(buildEdges());
    resetSidePanel();
}

// Fade a hex color toward white for the dimmed state.
function fade(hex) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    const mix = (ch) => Math.round(ch + (255 - ch) * (1 - DIM));
    return 'rgb(' + mix(r) + ',' + mix(g) + ',' + mix(b) + ')';
}

// ===========================================
// SIDE PANEL
// ===========================================
function showSidePanel(nodeId, connectedNodes) {
    const n = defById[nodeId];
    if (!n) return;

    const title = document.getElementById('side-title');
    const badge = document.getElementById('side-badge');
    const body = document.getElementById('side-body');

    title.textContent = n.label.replace(/\n/g, ' ');

    badge.style.display = 'inline-block';
    if (n.kind === 'theory') {
        badge.textContent = 'Learning Theory';
        badge.className = 'side-badge badge-theory';
    } else if (n.kind === 'practice') {
        badge.textContent = 'Instructional-Design Practice';
        badge.className = 'side-badge badge-practice';
    } else {
        badge.textContent = 'Illustrative Addition';
        badge.className = 'side-badge badge-secondary';
    }

    // Build the "connects to" list (neighbors, excluding self).
    const neighbors = [];
    connectedNodes.forEach(id => {
        if (id !== nodeId && defById[id]) {
            neighbors.push(defById[id].label.replace(/\n/g, ' '));
        }
    });

    let html = '<div class="side-def">' + esc(n.def) + '</div>';
    html += '<div>' + esc(n.full) + '</div>';
    if (neighbors.length) {
        html += '<div class="side-connects"><strong>Directly connected to:</strong> ' +
                neighbors.map(esc).join(', ') + '</div>';
    }
    body.innerHTML = html;
}

function resetSidePanel() {
    document.getElementById('side-title').textContent = 'Explore the map';
    document.getElementById('side-badge').style.display = 'none';
    document.getElementById('side-body').innerHTML =
        '<p class="side-placeholder">Hover any node for a one-sentence definition. ' +
        '<strong>Click a node</strong> to highlight what it connects to and read the full explanation here. ' +
        'Click the background to reset.</p>';
}

function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===========================================
// INITIALIZE
// ===========================================
function initializeNetwork() {
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());

    const enableMouse = !isInIframe();

    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU',           // arrows point up to prerequisites; theories on top
                sortMethod: 'directed',
                levelSeparation: 120,
                nodeSpacing: 130,
                treeSpacing: 150,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true
            }
        },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            tooltipDelay: 120,
            zoomView: enableMouse,         // mouse-wheel zoom in standalone/fullscreen only
            dragView: enableMouse,         // click-drag pan in standalone/fullscreen only
            dragNodes: false,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 5, x: 2, y: 2 }
        },
        edges: {
            width: 2,
            smooth: { type: 'cubicBezier', roundness: 0.4 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            highlightNeighborhood(params.nodes[0]);
        } else {
            clearHighlight();   // background click resets
        }
    });

    // Fit once the initial layout settles.
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });
}

// ===========================================
// EVENT WIRING
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    window.addEventListener('resize', function () {
        if (network) network.fit({ animation: false });
    });
});
