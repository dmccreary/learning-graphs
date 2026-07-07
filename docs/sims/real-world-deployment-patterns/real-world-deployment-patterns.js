// Real-World Deployment Patterns Explorer
// CANVAS_HEIGHT: 520
// Educational vis-network MicroSim (Bloom L5 - Evaluate)
// Three deployment patterns as clickable cards. Selecting one reveals a
// case-study summary, a mini dependency graph of the chapters/concepts it
// relies on most, and a reveal-on-click "what to validate first" answer.
// Learners assess and justify which learning-graph checks matter per pattern.

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
const ENABLE_VIEW = !isInIframe();

// ===========================================
// PATTERN DATA
// Each pattern has a case-study summary, a 4-6 node mini dependency graph
// (nodes carry a `title` tooltip naming chapter + concept), and a suggested
// first-validation answer drawn verbatim from the specification.
// ===========================================
const patterns = {
    corporate: {
        name: 'Corporate Onboarding',
        color: { background: '#4a5a8a', border: '#2d3a63' },
        accent: '#4a5a8a',
        summary: 'A manufacturing firm rebuilt new-hire onboarding as a learning graph. ' +
            'Foundational graph structure (Chapters 1-5) defines the concept dependencies, ' +
            'mastery-based sequencing (Chapter 9) gates each policy behind its prerequisites, ' +
            'and LMS integration (Chapter 18) pushes completion records back to HR. ' +
            'The result: no employee is asked to apply a tool before the module that introduces it.',
        nodes: [
            { id: 'c_root',    label: 'Corporate\nOnboarding', chapter: 'This pattern', concept: 'Deployment scenario', hub: true },
            { id: 'c_struct',  label: 'Graph\nStructure',      chapter: 'Chapters 1-5', concept: 'Nodes, edges, dependencies' },
            { id: 'c_cycle',   label: 'Cycle\nDetection',      chapter: 'Chapter 5',    concept: 'Acyclic prerequisite validation' },
            { id: 'c_mastery', label: 'Mastery &\nSequencing', chapter: 'Chapter 9',    concept: 'Mastery-based ordering' },
            { id: 'c_lms',     label: 'LMS\nIntegration',      chapter: 'Chapter 18',   concept: 'Deployment to a learning platform' }
        ],
        edges: [
            { from: 'c_root', to: 'c_struct' },
            { from: 'c_root', to: 'c_mastery' },
            { from: 'c_root', to: 'c_lms' },
            { from: 'c_struct', to: 'c_cycle' }
        ],
        validation: 'Confirm no policy depends on a tool introduced in a later training module ' +
            '(a cycle-detection problem, Chapter 5).'
    },
    courseware: {
        name: 'K-12 / Higher-Ed Courseware',
        color: { background: '#2f855a', border: '#22543d' },
        accent: '#2f855a',
        summary: 'A university course team authored an intelligent textbook from a learning graph. ' +
            'Learning-theory chapters (Chapters 6-10) shape how concepts are introduced and reinforced, ' +
            'and personalization (Chapter 16) adapts the path to each student\'s prior knowledge. ' +
            'Because the taxonomy separates foundational from goal concepts, the same graph serves both ' +
            'a remedial and an honors track without rewriting the content.',
        nodes: [
            { id: 'w_root',   label: 'Courseware', chapter: 'This pattern', concept: 'Deployment scenario', hub: true },
            { id: 'w_theory', label: 'Learning\nTheory',   chapter: 'Chapters 6-10', concept: 'Instructional design' },
            { id: 'w_tax',    label: 'Taxonomy\nBalance',  chapter: 'Chapter 4',     concept: 'Foundational vs. goal concepts' },
            { id: 'w_pers',   label: 'Personal-\nization', chapter: 'Chapter 16',    concept: 'Adaptive learning paths' },
            { id: 'w_grade',  label: 'Grade-Level\nFit',   chapter: 'Chapter 16',    concept: 'Audience-appropriate pacing' }
        ],
        edges: [
            { from: 'w_root', to: 'w_theory' },
            { from: 'w_root', to: 'w_pers' },
            { from: 'w_theory', to: 'w_tax' },
            { from: 'w_pers', to: 'w_grade' }
        ],
        validation: 'Confirm the taxonomy balances foundational and goal concepts appropriately ' +
            'for the target grade level (Chapter 4).'
    },
    certification: {
        name: 'Certification Prep',
        color: { background: '#b7791f', border: '#7b5210' },
        accent: '#b7791f',
        summary: 'A professional-certification provider mapped an exam blueprint onto a learning graph. ' +
            'Validation (Chapter 5) guarantees the prerequisite structure is sound, and the Chapter 18 ' +
            'Quality Gate enforces coverage: every exam objective must trace to at least one section ' +
            'and one assessment item. Candidates practice only concepts the exam actually tests, and ' +
            'gaps are caught before launch rather than by failing test-takers.',
        nodes: [
            { id: 't_root',  label: 'Certification\nPrep', chapter: 'This pattern', concept: 'Deployment scenario', hub: true },
            { id: 't_valid', label: 'Validation',          chapter: 'Chapter 5',  concept: 'Prerequisite-structure checks' },
            { id: 't_gate',  label: 'Quality\nGate',       chapter: 'Chapter 18', concept: 'Coverage enforcement' },
            { id: 't_cover', label: 'Coverage\nCheck',     chapter: 'Chapter 18', concept: 'Objective-to-section mapping' },
            { id: 't_assess',label: 'Assessment\nItems',   chapter: 'Chapter 18', concept: 'One item per tested concept' }
        ],
        edges: [
            { from: 't_root', to: 't_valid' },
            { from: 't_root', to: 't_gate' },
            { from: 't_gate', to: 't_cover' },
            { from: 't_gate', to: 't_assess' }
        ],
        validation: 'Confirm every exam-tested concept has at least one chapter section and one ' +
            'assessment item (Quality Gate coverage check).'
    }
};

// ===========================================
// STATE
// ===========================================
let network = null;
let selectedPattern = null;

// ===========================================
// BUILD / REBUILD THE MINI GRAPH FOR A PATTERN
// ===========================================
function renderPatternGraph(key) {
    const p = patterns[key];

    const visNodes = new vis.DataSet(p.nodes.map(n => ({
        id: n.id,
        label: n.label,
        title: n.chapter + ' — ' + n.concept,   // hover tooltip: chapter + concept
        color: n.hub
            ? { background: p.color.background, border: p.color.border,
                highlight: { background: p.color.background, border: p.color.border } }
            : { background: '#ffffff', border: p.accent,
                highlight: { background: '#f7fafc', border: p.accent } },
        font: { color: n.hub ? '#ffffff' : '#1a202c', size: 13, face: 'Arial', multi: false },
        borderWidth: n.hub ? 3 : 2,
        value: n.hub ? 3 : 1
    })));

    const visEdges = new vis.DataSet(p.edges.map((e, i) => ({
        id: 'e' + i,
        from: e.from,
        to: e.to,
        color: { color: p.accent, opacity: 0.7 },
        width: 2
    })));

    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true,
            barnesHut: { gravitationalConstant: -3200, springLength: 120, springConstant: 0.04 },
            stabilization: { iterations: 180 }
        },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            zoomView: ENABLE_VIEW,
            dragView: ENABLE_VIEW,
            dragNodes: true,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'box',
            margin: 10,
            scaling: { min: 12, max: 20 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'dynamic' }
        }
    };

    const container = document.getElementById('network');
    // Destroy previous network so a fresh dataset renders cleanly.
    if (network) { network.destroy(); network = null; }
    network = new vis.Network(container, { nodes: visNodes, edges: visEdges }, options);

    network.once('stabilizationIterationsDone', function() {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false, maxZoomLevel: 1.3 });
    });
}

// ===========================================
// CARD SELECTION
// ===========================================
function selectPattern(key) {
    selectedPattern = key;
    const p = patterns[key];

    // Toggle card highlight state.
    document.querySelectorAll('.card').forEach(card => {
        const isSel = card.getAttribute('data-pattern') === key;
        card.classList.toggle('selected', isSel);
        card.setAttribute('aria-pressed', isSel ? 'true' : 'false');
    });

    // Reveal detail area; hide the pre-prompt.
    document.getElementById('pre-prompt').style.display = 'none';
    document.getElementById('detail').style.display = 'block';

    // Summary text + accent color.
    const summaryEl = document.getElementById('summary');
    summaryEl.textContent = p.summary;
    summaryEl.style.borderLeftColor = p.accent;

    // Reset the validation reveal for the new pattern.
    const answerEl = document.getElementById('validate-a');
    answerEl.textContent = p.validation;
    answerEl.style.display = 'none';
    const revealBtn = document.getElementById('reveal-btn');
    revealBtn.textContent = 'Reveal Suggested Answer';
    revealBtn.style.backgroundColor = p.accent;

    // Render the mini dependency graph.
    renderPatternGraph(key);
}

// ===========================================
// REVEAL-ON-CLICK ANSWER TOGGLE
// ===========================================
function toggleAnswer() {
    const answerEl = document.getElementById('validate-a');
    const revealBtn = document.getElementById('reveal-btn');
    const showing = answerEl.style.display !== 'none';
    if (showing) {
        answerEl.style.display = 'none';
        revealBtn.textContent = 'Reveal Suggested Answer';
    } else {
        answerEl.style.display = 'block';
        revealBtn.textContent = 'Hide Suggested Answer';
    }
}

// ===========================================
// RESIZE
// ===========================================
function handleResize() {
    if (network) network.fit({ animation: false, maxZoomLevel: 1.3 });
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            selectPattern(card.getAttribute('data-pattern'));
        });
    });

    document.getElementById('reveal-btn').addEventListener('click', toggleAnswer);

    let resizeTO = null;
    window.addEventListener('resize', function() {
        if (resizeTO) clearTimeout(resizeTO);
        resizeTO = setTimeout(handleResize, 150);
    });
});
