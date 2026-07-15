// Category Balance and Overlap Auditor
// CANVAS_HEIGHT: 560
//
// A sample 12-category taxonomy over 200 concepts. One category is deliberately
// over the 30% balance ceiling; two others share an ambiguous boundary that the
// bar chart cannot reveal — you have to open them up and read their rules.
//
// The pairing is the lesson: balance is a counting problem a chart can show,
// while overlap is a definitional problem it cannot. Both are taxonomy defects,
// and Chapter 5's structural validators catch neither.

// ===========================================
// DATA
// ===========================================

const TOTAL = 200;
const THRESHOLD_PCT = 30;

// Sorted descending; percentages are exact against TOTAL = 200.
const CATEGORIES = [
    { name: 'Graph Theory & Structure', count: 76, flag: 'over' },
    { name: 'Learning Science',         count: 24 },
    { name: 'Visualization',            count: 20 },
    { name: 'Metadata & Standards',     count: 16, flag: 'overlap' },
    { name: 'Taxonomy & Classification', count: 14, flag: 'overlap' },
    { name: 'Assessment',               count: 12 },
    { name: 'Data Pipeline',            count: 10 },
    { name: 'Dependencies',             count: 8 },
    { name: 'Quality & Validation',     count: 6 },
    { name: 'AI & Agents',              count: 6 },
    { name: 'Personalization',          count: 5 },
    { name: 'Deployment',               count: 3 }
];

const OVERLAP = {
    a: {
        name: 'Metadata & Standards',
        rule: 'Concepts describing published specifications and the named fields used to ' +
              'annotate a concept.'
    },
    b: {
        name: 'Taxonomy & Classification',
        rule: 'Concepts describing how this graph\'s own concepts are grouped into categories ' +
              'and hierarchies.'
    },
    // Each of these has a real argument for both categories — that is what makes
    // the boundary ambiguous rather than merely unclear.
    ambiguous: [
        {
            concept: 'SKOS',
            forA: 'it is a published W3C specification',
            forB: 'its whole purpose is expressing taxonomies'
        },
        {
            concept: 'Concept Label',
            forA: 'it is a field defined by ISO 11179',
            forB: 'labels are what a taxonomy classifies'
        },
        {
            concept: 'Dublin Core Subject Field',
            forA: 'it is one named field in a standard',
            forB: 'the subject field is literally a classification'
        }
    ],
    model: 'Assign by <b>where the concept is defined</b>: outside this project, or by us. All ' +
           'three are defined outside — W3C, ISO 11179, DCMI — so all three go to Metadata &amp; ' +
           'Standards, leaving Taxonomy &amp; Classification for our own grouping decisions ' +
           '(Category Balance, Domain Cluster). Note that "is it about classifying things?" ' +
           'fails as a criterion: it splits the three instead of deciding them.',
    // The discriminating axis, for checking whether a learner's criterion is on it.
    axisTerms: ['external', 'outside', 'published', 'standard', 'specification', 'spec',
                'w3c', 'iso', 'third-party', 'internal', 'our own', 'our graph', 'this project',
                'in-house', 'we define', 'we decide', 'defined by us', 'authored']
};

const COLORS = {
    normal:      { fill: '#b0bec5', border: '#90a4ae' },
    over:        { fill: '#e53935', border: '#b71c1c' },
    overlap:     { fill: '#cfd8dc', border: '#ffa000' },
    normalHover: '#90a4ae',
    overHover:   '#c62828',
    overlapHover: '#b0bec5'
};

function pct(count) {
    return (count / TOTAL) * 100;
}

function pctLabel(count) {
    const p = pct(count);
    return (Number.isInteger(p) ? p : p.toFixed(1)) + '%';
}

// ===========================================
// THRESHOLD LINE PLUGIN
// ===========================================
// Drawn inline rather than via chartjs-plugin-annotation: one dashed rule does
// not justify a second CDN dependency.

const thresholdLine = {
    id: 'thresholdLine',
    afterDatasetsDraw(chart) {
        const { ctx, chartArea, scales } = chart;
        const x = scales.x.getPixelForValue(TOTAL * THRESHOLD_PCT / 100);
        if (!Number.isFinite(x)) return;

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([6, 4]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#c62828';
        ctx.moveTo(x, chartArea.top);
        ctx.lineTo(x, chartArea.bottom);
        ctx.stroke();

        // Label goes at the BOTTOM: the top of the line lands inside the 38% bar,
        // where the text is unreadable against the red fill. The halo keeps it
        // legible if a bar ever grows under it.
        ctx.setLineDash([]);
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255,255,255,0.95)';
        ctx.strokeText(THRESHOLD_PCT + '% ceiling', x + 4, chartArea.bottom - 3);
        ctx.fillStyle = '#c62828';
        ctx.fillText(THRESHOLD_PCT + '% ceiling', x + 4, chartArea.bottom - 3);
        ctx.restore();
    }
};

// ===========================================
// CHART
// ===========================================

let chart;

function styleFor(cat, key) {
    if (cat.flag === 'over') return COLORS.over[key];
    if (cat.flag === 'overlap') return COLORS.overlap[key];
    return COLORS.normal[key];
}

function buildChart() {
    const ctx = document.getElementById('balance-chart');

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: CATEGORIES.map(c => c.name),
            datasets: [{
                label: 'Concepts',
                data: CATEGORIES.map(c => c.count),
                backgroundColor: CATEGORIES.map(c => styleFor(c, 'fill')),
                borderColor: CATEGORIES.map(c => styleFor(c, 'border')),
                // gold outline marks the two overlap-flagged categories
                borderWidth: CATEGORIES.map(c => (c.flag === 'overlap' ? 2.5 : 1)),
                borderSkipped: false,
                barPercentage: 0.82
            }]
        },
        options: {
            indexAxis: 'y',           // horizontal bars
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 400 },
            layout: { padding: { right: 46, top: 2, bottom: 2 } },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label(item) {
                            const c = CATEGORIES[item.dataIndex];
                            const bits = [c.count + ' concepts (' + pctLabel(c.count) + ' of ' +
                                          TOTAL + ')'];
                            if (c.flag === 'over') bits.push('Over the ' + THRESHOLD_PCT +
                                '% ceiling — click to see why that matters');
                            if (c.flag === 'overlap') bits.push('Boundary overlap flagged — ' +
                                'click to inspect');
                            return bits;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    suggestedMax: 84,
                    title: { display: true, text: 'Concepts in category',
                             font: { size: 11, weight: 'bold' }, color: '#546e7a' },
                    ticks: { font: { size: 10 }, color: '#607d8b' },
                    grid: { color: '#eceff1' }
                },
                y: {
                    ticks: {
                        font: { size: 10.5 },
                        color: CATEGORIES.map(c => c.flag === 'over' ? '#c62828' : '#37474f'),
                        crossAlign: 'far',
                        autoSkip: false
                    },
                    grid: { display: false }
                }
            },
            onClick(evt, els) {
                if (!els.length) return;
                onBarClick(CATEGORIES[els[0].index]);
            },
            onHover(evt, els) {
                evt.native.target.style.cursor = els.length ? 'pointer' : 'default';
            }
        },
        plugins: [thresholdLine, valueLabels]
    });
}

// Count + percentage printed at the end of each bar, so the chart is readable
// without hovering every category.
const valueLabels = {
    id: 'valueLabels',
    afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        ctx.save();
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        meta.data.forEach((bar, i) => {
            const c = CATEGORIES[i];
            ctx.fillStyle = c.flag === 'over' ? '#c62828' : '#546e7a';
            ctx.fillText(c.count + ' (' + pctLabel(c.count) + ')', bar.x + 5, bar.y);
        });
        ctx.restore();
    }
};

// ===========================================
// INFOBOX
// ===========================================

function showViolation() {
    const box = document.getElementById('infobox');
    box.className = 'infobox violation';
    box.innerHTML = '<div><div class="info-head violation">Balance violation: Graph Theory &amp; ' +
        'Structure holds 76 of 200 concepts (38%)</div>' +
        '<div class="info-body">A category past roughly 30% is doing too much work. It usually ' +
        'means the category is really several categories that were never separated — and ' +
        'because every concept in it shares one label, the graph loses the ability to say ' +
        'anything useful about how those 76 concepts differ. The fix is to split it, not to ' +
        'move concepts out to make the number look better.</div></div>';
}

function showOverlapNote() {
    const box = document.getElementById('infobox');
    box.className = 'infobox info';
    box.innerHTML = '<div><div class="info-head info">Boundary overlap: Metadata &amp; Standards ' +
        'vs. Taxonomy &amp; Classification</div>' +
        '<div class="info-body">These two are balanced — 8% and 7%, both well under the ceiling ' +
        '— and the chart says nothing is wrong. Click <b>Inspect Overlap</b>: three concepts ' +
        'have a real argument for either category, which means the boundary, not the count, is ' +
        'the defect.</div></div>';
}

function showIdle() {
    const box = document.getElementById('infobox');
    box.className = 'infobox';
    box.innerHTML = '<div class="info-idle">One category is over the 30% balance threshold, ' +
        'and two have a boundary problem the chart cannot show you. Click the red bar to ' +
        'start.</div>';
}

function onBarClick(cat) {
    if (cat.flag === 'over') showViolation();
    else if (cat.flag === 'overlap') { showOverlapNote(); openOverlap(); }
    else {
        const box = document.getElementById('infobox');
        box.className = 'infobox';
        box.innerHTML = '<div><div class="info-head">' + cat.name + '</div>' +
            '<div class="info-body">' + cat.count + ' concepts, ' + pctLabel(cat.count) +
            ' of the graph — comfortably under the ' + THRESHOLD_PCT + '% ceiling, and no ' +
            'boundary overlap flagged against it.</div></div>';
    }
}

// ===========================================
// OVERLAP PANEL
// ===========================================

function openOverlap() {
    document.getElementById('cat-a-name').textContent = OVERLAP.a.name;
    document.getElementById('cat-a-rule').textContent = OVERLAP.a.rule;
    document.getElementById('cat-b-name').textContent = OVERLAP.b.name;
    document.getElementById('cat-b-rule').textContent = OVERLAP.b.rule;

    const list = document.getElementById('op-list');
    list.innerHTML = '';
    OVERLAP.ambiguous.forEach(item => {
        const li = document.createElement('li');
        // The reason is wrapped so it can collapse once the model answer appears.
        li.innerHTML = '<b>' + item.concept + '</b><span class="reason"> — ' + item.forA +
                       ', but ' + item.forB + '</span>';
        list.appendChild(li);
    });

    const panel = document.getElementById('overlap-panel');
    panel.hidden = false;
    panel.classList.remove('model-shown');
    document.querySelector('.main-row').classList.add('overlap-open');
    document.getElementById('op-model').hidden = true;
    showOverlapNote();
}

function closeOverlap() {
    document.getElementById('overlap-panel').hidden = true;
    document.querySelector('.main-row').classList.remove('overlap-open');
}

// Free text cannot be honestly auto-graded, so this does not pretend to score.
// It reveals the model answer and reports one useful, checkable signal: whether
// the learner's criterion even mentions the axis that separates the two rules.
function submitCriterion() {
    const text = document.getElementById('criterion').value.trim();
    const model = document.getElementById('op-model');
    const onAxis = text && OVERLAP.axisTerms.some(t => text.toLowerCase().includes(t));

    let echo;
    if (!text) {
        echo = '<span class="echo">You have not written a criterion yet — try one before ' +
               'reading on, even a rough one.</span>';
    } else if (onAxis) {
        echo = '<span class="echo">Your criterion mentions the same axis the model answer ' +
               'turns on (external specification vs. internal decision). Check it against all ' +
               'three concepts: does it place every one of them, or only two?</span>';
    } else {
        echo = '<span class="echo">Your criterion does not appear to mention where a concept ' +
               'is defined. Test it against all three concepts — a criterion that leaves any ' +
               'one of them arguable has not resolved the overlap.</span>';
    }

    model.innerHTML = '<span class="model-head">Model answer</span>' + OVERLAP.model + echo;
    model.hidden = false;
    document.getElementById('overlap-panel').classList.add('model-shown');
}

function reset() {
    closeOverlap();
    document.getElementById('criterion').value = '';
    document.getElementById('op-model').hidden = true;
    document.getElementById('overlap-panel').classList.remove('model-shown');
    showIdle();
}

// ===========================================
// INIT
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    buildChart();
    showIdle();

    document.getElementById('btn-overlap').addEventListener('click', openOverlap);
    document.getElementById('op-close').addEventListener('click', closeOverlap);
    document.getElementById('btn-submit').addEventListener('click', submitCriterion);
    document.getElementById('btn-reset').addEventListener('click', reset);
});
