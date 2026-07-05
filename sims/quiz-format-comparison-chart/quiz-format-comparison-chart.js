// quiz-format-comparison-chart.js
// Radar chart comparing Multiple-Choice vs. True/False quiz formats across
// four assessment-design dimensions. Illustrative fixed scores (1-5).
// Bloom Analyze (L4): learner differentiates the formats and recommends one
// for a stated assessment goal via the dropdown.
//
// CANVAS_HEIGHT: 620
// (title + recommend-for control row + recommendation box + 420px chart + padding)

// ---- Fixed illustrative data (from the specification) ----------------------
// Axis order: Authoring speed, Guess resistance, Diagnostic power, Completion speed
const dimensions = [
    'Authoring speed',
    'Guess resistance',
    'Diagnostic power',
    'Completion speed'
];

// Per-point explanatory sentences shown in the hover tooltip. Keyed by
// dataset index (0 = Multiple-Choice, 1 = True/False) then axis index.
const explanations = [
    // Multiple-Choice Question
    [
        'Writing three or four plausible distractors takes real effort, so authoring is slower than true/false.',
        'With three or four options a blind guess pays off only about a quarter of the time, giving solid guess resistance.',
        'The specific wrong option a learner picks pinpoints their misconception, the strongest diagnostic power of the two formats.',
        'Reading and weighing several options takes a moment, so completion is a little slower than true/false.'
    ],
    // True/False Question
    [
        'A single statement to mark true or false is the fastest kind of question to write, the strongest authoring speed of the two formats.',
        'A learner with zero knowledge has a 50% chance of guessing correctly, the weakest guess resistance of the two formats.',
        'A wrong answer only says the learner missed one statement, revealing little about the specific misconception.',
        'One statement to judge means learners answer almost instantly, the fastest completion speed of the two formats.'
    ]
];

// Base colors: blue for Multiple-Choice (structured/higher-effort),
// orange for True/False (quick/lightweight).
const MC_BORDER = 'rgb(0, 120, 212)';
const MC_FILL   = 'rgba(0, 120, 212, 0.20)';
const TF_BORDER = 'rgb(255, 140, 0)';
const TF_FILL   = 'rgba(255, 140, 0, 0.20)';
// Dimmed variants used when the other series is highlighted by the dropdown.
const MC_FILL_DIM = 'rgba(0, 120, 212, 0.06)';
const TF_FILL_DIM = 'rgba(255, 140, 0, 0.06)';
const BORDER_DIM  = 'rgba(150, 150, 150, 0.55)';

const datasetDefaults = [
    {
        label: 'Multiple-Choice Question',
        data: [2, 4, 5, 3],
        base: { border: MC_BORDER, fill: MC_FILL, point: MC_BORDER, dimFill: MC_FILL_DIM }
    },
    {
        label: 'True/False Question',
        data: [5, 2, 2, 5],
        base: { border: TF_BORDER, fill: TF_FILL, point: TF_BORDER, dimFill: TF_FILL_DIM }
    }
];

// ---- Recommendation dropdown mapping ---------------------------------------
// index: 0 = Multiple-Choice, 1 = True/False.
const recommendations = {
    recall: {
        index: 1,
        text: 'A quick ten-question recall check rewards speed on both sides of the desk. ' +
              'True/False is fastest to author and fastest to answer, so it clears a short factual sweep with the least friction.'
    },
    misconception: {
        index: 0,
        text: 'To diagnose a specific misconception you need the wrong answer itself to be informative. ' +
              'Multiple-Choice wins on diagnostic power because the distractor a learner selects reveals which mistaken idea they hold.'
    },
    'fast-author': {
        index: 1,
        text: 'When you must build a large quiz bank quickly, authoring speed dominates. ' +
              'True/False has the highest authoring speed, letting you produce many items in the time one good multiple-choice item takes.'
    },
    'guess-proof': {
        index: 0,
        text: 'To minimize lucky guessing, favor the format with higher guess resistance. ' +
              'Multiple-Choice cuts the blind-guess success rate to roughly one in four, well below True/False\'s coin-flip 50%.'
    }
};

let highlightedIndex = null; // null = neutral (no dropdown selection)

// ---- Build the chart -------------------------------------------------------
const ctx = document.getElementById('formatRadar').getContext('2d');

function buildDatasets() {
    return datasetDefaults.map((d, i) => {
        const dim = highlightedIndex !== null && highlightedIndex !== i;
        const hi  = highlightedIndex === i;
        return {
            label: d.label,
            data: d.data.slice(),
            borderColor: dim ? BORDER_DIM : d.base.border,
            backgroundColor: dim ? d.base.dimFill : d.base.fill,
            borderWidth: hi ? 4 : 2,
            pointBackgroundColor: dim ? BORDER_DIM : d.base.point,
            pointBorderColor: '#fff',
            pointRadius: hi ? 6 : 4,
            pointHoverRadius: 7,
            order: hi ? 0 : 1 // highlighted series drawn on top
        };
    });
}

const chart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: dimensions,
        datasets: buildDatasets()
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            r: {
                min: 0,
                max: 5,
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    backdropColor: 'rgba(255, 255, 255, 0.75)',
                    color: '#6c757d',
                    font: { size: 11 }
                },
                pointLabels: {
                    font: { size: 13, weight: '600' },
                    color: '#2c3e50'
                },
                grid: { color: 'rgba(0, 0, 0, 0.08)' },
                angleLines: { color: 'rgba(0, 0, 0, 0.08)' }
            }
        },
        plugins: {
            legend: {
                // Clickable legend, top-right, toggles a format's shape on/off.
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    padding: 16,
                    font: { size: 13 }
                }
            },
            tooltip: {
                callbacks: {
                    title: function(items) {
                        // Axis (dimension) name as the tooltip heading.
                        return items.length ? items[0].label : '';
                    },
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.r + ' / 5';
                    },
                    afterLabel: function(context) {
                        // One-sentence rationale for this exact point.
                        const dsi = context.datasetIndex;
                        const axi = context.dataIndex;
                        return explanations[dsi][axi];
                    }
                },
                titleFont: { size: 13, weight: '700' },
                bodyFont: { size: 12 },
                padding: 10,
                boxPadding: 4,
                displayColors: true,
                // Wrap long rationale sentences instead of one runaway line.
                bodySpacing: 4,
                caretPadding: 6
            }
        }
    }
});

// ---- Dropdown: highlight the recommended series ----------------------------
const goalSelect = document.getElementById('goalSelect');
const recBox = document.getElementById('recommendation');

goalSelect.addEventListener('change', function() {
    const key = goalSelect.value;

    if (key === 'none' || !recommendations[key]) {
        highlightedIndex = null;
        recBox.innerHTML =
            'Pick a goal above to see which format fits best, or hover any point ' +
            'to read why it earned its score.';
    } else {
        const rec = recommendations[key];
        highlightedIndex = rec.index;
        const name = datasetDefaults[rec.index].label;
        recBox.innerHTML =
            '<span class="rec-format">Recommended: ' + name + '.</span> ' + rec.text;
    }

    // Re-style datasets to reflect the current highlight and redraw.
    const next = buildDatasets();
    chart.data.datasets.forEach((ds, i) => {
        ds.borderColor = next[i].borderColor;
        ds.backgroundColor = next[i].backgroundColor;
        ds.borderWidth = next[i].borderWidth;
        ds.pointBackgroundColor = next[i].pointBackgroundColor;
        ds.pointRadius = next[i].pointRadius;
        ds.order = next[i].order;
    });
    chart.update();
});
