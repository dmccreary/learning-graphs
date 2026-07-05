// Dublin Core Metadata Explorer
// CANVAS_HEIGHT: 640
// Bloom L1 (Remember): identify / recall the 15 Dublin Core elements.
// Infographic flip-card grid. The #network element is kept as an empty
// background layer only so the MicroSim conforms to the vis-network harness;
// all interactive content lives in sibling overlay DOM built here.

// ---------------------------------------------------------------------------
// Environment detection (kept for harness parity; network stays empty here)
// ---------------------------------------------------------------------------
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ---------------------------------------------------------------------------
// The 15 Dublin Core elements, each with a one-sentence definition and an
// example value drawn from THIS book's own learning-graph.json record.
// ---------------------------------------------------------------------------
const dublinCoreElements = [
    {
        name: 'Title',
        definition: 'A name given to the resource.',
        example: 'Learning Graphs: The Key to Intelligent Textbooks'
    },
    {
        name: 'Creator',
        definition: 'An entity primarily responsible for making the resource.',
        example: 'Dan McCreary'
    },
    {
        name: 'Subject',
        definition: 'The topic of the resource, often expressed as keywords.',
        example: 'Concept Dependency Graphs, Intelligent Textbooks'
    },
    {
        name: 'Description',
        definition: 'An account of the resource, such as an abstract or summary.',
        example: 'A concept dependency graph of 200 concepts for teaching how to build learning graphs.'
    },
    {
        name: 'Publisher',
        definition: 'An entity responsible for making the resource available.',
        example: 'CoderDojo Twin Cities'
    },
    {
        name: 'Contributor',
        definition: 'An entity that made contributions to the resource.',
        example: 'Claude (AI content generation)'
    },
    {
        name: 'Date',
        definition: 'A point in time associated with an event in the resource lifecycle.',
        example: '2026-07-03'
    },
    {
        name: 'Type',
        definition: 'The nature or genre of the resource.',
        example: 'Dataset (concept dependency graph)'
    },
    {
        name: 'Format',
        definition: 'The file format, medium, or dimensions of the resource.',
        example: 'application/json'
    },
    {
        name: 'Identifier',
        definition: 'An unambiguous reference to the resource within a given context.',
        example: 'learning-graph.json'
    },
    {
        name: 'Source',
        definition: 'A related resource from which the described resource is derived.',
        example: 'Course description: Learning Graphs'
    },
    {
        name: 'Language',
        definition: 'A language of the resource.',
        example: 'en (English)'
    },
    {
        name: 'Relation',
        definition: 'A related resource.',
        example: 'Chapter 02 - Concept Labeling and Metadata Standards'
    },
    {
        name: 'Coverage',
        definition: 'The spatial or temporal topic, or jurisdiction, of the resource.',
        example: 'Global; undergraduate and professional learners'
    },
    {
        name: 'Rights',
        definition: 'Information about rights held in and over the resource.',
        example: 'Creative Commons CC BY-NC-SA 4.0'
    }
];

const TOTAL = dublinCoreElements.length;

// Track which tiles have been explored (page memory only, not persisted)
const explored = new Set();

// ---------------------------------------------------------------------------
// Build the grid of flip cards
// ---------------------------------------------------------------------------
function buildGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    dublinCoreElements.forEach((el, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', el.name + ' Dublin Core element. Activate to reveal definition.');
        card.dataset.index = String(index);

        card.innerHTML =
            '<div class="card-inner">' +
                '<div class="card-face card-front">' +
                    '<div class="element-name">' + el.name + '</div>' +
                    '<div class="element-tap">tap to explore</div>' +
                '</div>' +
                '<div class="card-face card-back">' +
                    '<div class="back-name">' + el.name + '</div>' +
                    '<div class="back-def">' + el.definition + '</div>' +
                    '<div class="back-example-label">Example in this book</div>' +
                    '<div class="back-example">' + el.example + '</div>' +
                '</div>' +
            '</div>';

        card.addEventListener('click', function () {
            toggleCard(card, index);
        });
        card.addEventListener('keydown', function (evt) {
            if (evt.key === 'Enter' || evt.key === ' ') {
                evt.preventDefault();
                toggleCard(card, index);
            }
        });

        grid.appendChild(card);
    });
}

function toggleCard(card, index) {
    card.classList.toggle('flipped');

    // Mark explored (and increment the counter) only the first time it flips open
    if (!explored.has(index)) {
        explored.add(index);
        card.classList.add('explored');
        updateProgress();
    }
}

function updateProgress() {
    const badge = document.getElementById('progress-badge');
    const count = explored.size;
    badge.textContent = count + ' of ' + TOTAL + ' explored';
    if (count === TOTAL) {
        badge.classList.add('complete');
        badge.textContent = 'All ' + TOTAL + ' explored ✓';
    } else {
        badge.classList.remove('complete');
    }
}

function resetAll() {
    explored.clear();
    document.querySelectorAll('.card').forEach(function (card) {
        card.classList.remove('flipped');
        card.classList.remove('explored');
    });
    updateProgress();
}

// ---------------------------------------------------------------------------
// Minimal empty background network (harness compliance)
// ---------------------------------------------------------------------------
function initBackgroundNetwork() {
    const container = document.getElementById('network');
    if (!container || typeof vis === 'undefined') return;
    const enableMouse = !isInIframe();
    const data = { nodes: new vis.DataSet([]), edges: new vis.DataSet([]) };
    const options = {
        physics: { enabled: false },
        interaction: {
            zoomView: enableMouse,
            dragView: enableMouse,
            navigationButtons: false,
            selectConnectedEdges: false
        }
    };
    // eslint-disable-next-line no-new
    new vis.Network(container, data, options);
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    initBackgroundNetwork();
    buildGrid();
    updateProgress();
    document.getElementById('reset-btn').addEventListener('click', resetAll);
});
