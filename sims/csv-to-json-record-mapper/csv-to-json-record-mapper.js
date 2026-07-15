// CSV-to-JSON Record Mapper
// CANVAS_HEIGHT: 480
//
// One CSV row becomes one node record and N edge records, four clicks at a time.
//
// The transformation mirrors this project's real src/csv-to-json/csv-to-json.py:
//     node = { 'id': concept_id, 'label': concept_name, 'group': category_id }
//     for dep_id in dependency_list.split('|'):
//         edges.append({ 'from': concept_id, 'to': dep_id })
// One row, one node, one edge per pipe-delimited dependency. The sample row
// 6,Learning Graph,5|4,FOUND therefore yields one node and two edges.
//
// A step-through rather than a running animation: the Understand-level objective
// asks the learner to predict the output for an unseen row, and prediction needs
// a pause between "here is the input" and "here is what it became".

// ===========================================
// PIPELINE (mirrors csv-to-json.py)
// ===========================================

const HEADER = ['ConceptID', 'ConceptLabel', 'Dependencies', 'TaxonomyID'];
const SAMPLE_ROW = '6,Learning Graph,5|4,FOUND';

// Split on comma, split Dependencies on pipe. Deliberately simple — the real
// script uses Python's csv module, which also handles quoted commas.
function parseRow(text) {
    const parts = text.split(',');
    if (parts.length !== 4) {
        return { error: 'Need exactly 4 comma-separated fields, got ' + parts.length + '.' };
    }
    const [id, label, deps, tax] = parts.map(p => p.trim());
    if (!id)    return { error: 'ConceptID cannot be empty.' };
    if (!label) return { error: 'ConceptLabel cannot be empty — csv-to-json.py skips such rows.' };
    if (!tax)   return { error: 'TaxonomyID cannot be empty.' };

    return {
        id: id,
        label: label,
        deps: deps ? deps.split('|').map(d => d.trim()).filter(Boolean) : [],
        tax: tax,
        raw: { id: id, label: label, deps: deps, tax: tax }
    };
}

// ===========================================
// STEPS
// ===========================================
// Order per spec: ID, label, dependencies-split, taxonomy/group.

const STEPS = [
    { field: 'id',  cls: 'f-id',  key: 'k-id',
      name: 'ConceptID 6 becomes the node record\'s "id"' },
    { field: 'lab', cls: 'f-lab', key: 'k-lab',
      name: 'ConceptLabel becomes the node record\'s "label"' },
    { field: 'dep', cls: 'f-dep', key: 'k-dep',
      name: 'Dependencies splits on the pipe — one edge record per value' },
    { field: 'tax', cls: 'f-tax', key: 'k-tax',
      name: 'TaxonomyID becomes the node record\'s "group"' }
];

let row = parseRow(SAMPLE_ROW);
let step = 0;

function litThrough(n) {
    return STEPS.slice(0, n).map(s => s.field);
}

// ===========================================
// RENDER: CSV PANEL
// ===========================================

function renderCsv() {
    const lit = litThrough(step);
    const active = step > 0 ? STEPS[step - 1].field : null;

    function span(field, cls, text) {
        const on = lit.includes(field);
        const isActive = field === active;
        return '<span class="field ' + cls + (on ? ' lit' : '') +
               (isActive ? ' active' : '') + '" id="fld-' + field + '">' + text + '</span>';
    }

    // Show the pipe in red once the split step has fired, so "what splits" is visible.
    let depText = row.raw.deps || '(empty)';
    if (lit.includes('dep') && row.deps.length > 1) {
        depText = row.deps.join('<span class="pipe">|</span>');
    }

    const c = '<span class="comma">,</span>';
    document.getElementById('csv-row').innerHTML =
        span('id', 'f-id', row.raw.id) + c +
        span('lab', 'f-lab', row.raw.label) + c +
        span('dep', 'f-dep', depText) + c +
        span('tax', 'f-tax', row.raw.tax);

    const note = document.getElementById('csv-note');
    if (step === 0) {
        note.textContent = 'One row. Four comma-separated fields, one of which is a list.';
    } else if (step >= 3 && row.deps.length !== 1) {
        note.textContent = 'The Dependencies cell held ' + row.deps.length +
            ' values packed into one field. CSV has no list type, so the pipe character ' +
            'carries the structure.';
    } else {
        note.textContent = STEPS[step - 1].name + '.';
    }
}

// ===========================================
// RENDER: JSON PANEL
// ===========================================

const P = t => '<span class="punct">' + t + '</span>';

function renderJson() {
    const lit = litThrough(step);
    document.getElementById('json-empty').hidden = step > 0;

    // Node record: appears at step 1, gains keys as their steps fire.
    const nodeBlock = document.getElementById('json-node');
    nodeBlock.hidden = !lit.includes('id');
    if (!nodeBlock.hidden) {
        const lines = [];
        if (lit.includes('id')) {
            lines.push('  <span class="k-id">"id"</span>' + P(': ') + row.id);
        }
        if (lit.includes('lab')) {
            lines.push('  <span class="k-lab">"label"</span>' + P(': "') + row.label + P('"'));
        }
        if (lit.includes('tax')) {
            lines.push('  <span class="k-tax">"group"</span>' + P(': "') + row.tax + P('"'));
        }
        document.getElementById('node-code').innerHTML =
            P('{') + '\n' + lines.join(P(',') + '\n') + '\n' + P('}');
    }

    // Edge records: one per pipe-delimited dependency, all at the split step.
    const edgeBlock = document.getElementById('json-edges');
    edgeBlock.hidden = !lit.includes('dep');
    if (!edgeBlock.hidden) {
        const objs = row.deps.map(d =>
            P('{ ') + '<span class="k-id">"from"</span>' + P(': ') + row.id + P(', ') +
            '<span class="k-dep">"to"</span>' + P(': ') + d + P(' }')
        );
        document.getElementById('edge-code').innerHTML =
            objs.length ? objs.join('\n') : P('(none — this concept has no dependencies)');

        const n = row.deps.length;
        document.getElementById('split-note').textContent =
            n === 0 ? '— no dependencies, so no edges'
                    : '— splits into ' + n + ' edge' + (n === 1 ? '' : 's');
    }
}

// ===========================================
// CONNECTORS
// ===========================================
// A dashed line from each CSV field to the JSON key it became. Coordinates are
// resolved against .main-row, which both panels and the SVG share.

const COLOR = { 'f-id': '#1e88e5', 'f-lab': '#2e7d32', 'f-dep': '#ef6c00', 'f-tax': '#6a1b9a' };

function renderConnectors() {
    const svg = document.getElementById('map-overlay');
    svg.innerHTML = '';
    if (step === 0) return;

    const wrap = document.getElementById('main-row').getBoundingClientRect();
    const ns = 'http://www.w3.org/2000/svg';

    // Only the step just revealed gets a connector. Drawing all four at once
    // turns the panel into a cat's cradle and stops pointing at anything; the
    // persistent field/key colour coding already carries the earlier mappings.
    const s = STEPS[step - 1];
    const from = document.getElementById('fld-' + s.field);
    const targets = document.querySelectorAll('.' + s.key);
    if (!from || !targets.length) return;

    const fb = from.getBoundingClientRect();
    const x1 = fb.right - wrap.left + 2;
    const y1 = fb.top + fb.height / 2 - wrap.top;

    targets.forEach(t => {
        const tb = t.getBoundingClientRect();
        // stop short of the key: a line ending on the glyphs reads as an artifact
        const x2 = tb.left - wrap.left - 4;
        const y2 = tb.top + tb.height / 2 - wrap.top;
        if (x2 <= x1) return;   // stacked layout: skip rather than draw backwards

        // gentle S-curve so the two edge-record lines stay distinguishable
        const mid = (x1 + x2) / 2;
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + mid + ' ' + y1 + ', ' +
                               mid + ' ' + y2 + ', ' + x2 + ' ' + y2);
        path.setAttribute('class', 'map-line');
        path.setAttribute('stroke', COLOR[s.cls]);
        svg.appendChild(path);

        // arrowhead at the key end
        const head = document.createElementNS(ns, 'path');
        head.setAttribute('d', 'M ' + x2 + ' ' + y2 + ' l -5 -3.5 l 0 7 z');
        head.setAttribute('fill', COLOR[s.cls]);
        head.setAttribute('class', 'map-head');
        svg.appendChild(head);
    });
}

// ===========================================
// UI
// ===========================================

function renderControls() {
    document.getElementById('step-counter').textContent = 'Step ' + step + ' of ' + STEPS.length;
    document.getElementById('step-name').textContent =
        step === 0 ? 'Nothing transformed yet — the JSON panel is empty.'
                   : STEPS[step - 1].name + '.';
    document.getElementById('btn-next').disabled = step >= STEPS.length;
    document.getElementById('btn-next').textContent =
        step >= STEPS.length ? 'Complete' : 'Next Step';
}

function render() {
    renderCsv();
    renderJson();
    renderControls();
    // let the DOM settle before measuring for the connectors
    requestAnimationFrame(renderConnectors);
}

// ===========================================
// ACTIONS
// ===========================================

function nextStep() {
    if (step >= STEPS.length) return;
    step++;
    render();
}

function reset() {
    step = 0;
    render();
}

function transform() {
    const text = document.getElementById('try-input').value.trim() || SAMPLE_ROW;
    const parsed = parseRow(text);
    const err = document.getElementById('try-error');

    if (parsed.error) {
        err.textContent = parsed.error;
        err.hidden = false;
        return;
    }

    err.hidden = true;
    row = parsed;
    step = 0;
    render();
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('csv-header').textContent = HEADER.join(',');
    document.getElementById('try-input').value = SAMPLE_ROW;

    document.getElementById('btn-next').addEventListener('click', nextStep);
    document.getElementById('btn-reset').addEventListener('click', reset);
    document.getElementById('btn-transform').addEventListener('click', transform);
    document.getElementById('try-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') transform();
    });
    window.addEventListener('resize', renderConnectors);

    render();
});
