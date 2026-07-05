// Taxonomy Classifier Workbench
// CANVAS_HEIGHT: 570
// Chapter 4: Concept Taxonomies and Ontologies. Bloom L3 (Apply): classify.
// The learner reads a concept label + one-sentence definition, then clicks the
// single best taxonomy category. Correct clicks flash green; incorrect clicks
// flash red and explain which category the concept actually belongs to and why.
// A "Show Reasoning" toggle reveals why the correct category fits best, and a
// running "Correct / Attempted" score builds metacognition before the learner
// trusts an AI classifier to do the same task at scale.

// ---------------------------------------------------------------------------
// CANVAS / LAYOUT GLOBALS (required MicroSim standard names)
// ---------------------------------------------------------------------------
let canvasWidth = 400;      // responsive width; overwritten in updateCanvasSize()
let drawHeight = 520;       // concept card (100) + category grid (300) + feedback (120)
let controlHeight = 50;     // one row of native controls
let canvasHeight = drawHeight + controlHeight; // 570
let margin = 25;
let sliderLeftMargin = 140; // no sliders, but kept for standard compliance
let defaultTextSize = 16;

// Region boundaries within the drawing area
const cardTop = 40;         // leave room for the title above the card
const cardHeight = 100;
const gridTop = cardTop + cardHeight;   // 140
const gridHeight = 300;
const feedbackTop = gridTop + gridHeight; // 440
const feedbackHeight = drawHeight - feedbackTop; // 80

// ---------------------------------------------------------------------------
// TAXONOMY CATEGORIES (TaxonomyID 1-6)
// Each carries a plain-language "holds concepts like" example used to explain
// why a wrong choice was wrong.
// ---------------------------------------------------------------------------
const categories = [
  { id: 1, name: 'Graph Theory',
    example: 'hop count, topological sort, in-degree' },
  { id: 2, name: 'Metadata Standards',
    example: 'SKOS, Dublin Core, RDF labels' },
  { id: 3, name: 'Visualization Tools',
    example: 'force-directed layout, node groups, edge styling' },
  { id: 4, name: 'Learning Science',
    example: 'zone of proximal development, spaced repetition' },
  { id: 5, name: 'Personalization',
    example: 'adaptive learning paths, mastery-based routing' },
  { id: 6, name: 'Governance & Validation',
    example: 'cycle detection, orphaned-node checks, quality rules' }
];

function categoryName(id) {
  const c = categories.find(function (x) { return x.id === id; });
  return c ? c.name : '';
}
function categoryExample(id) {
  const c = categories.find(function (x) { return x.id === id; });
  return c ? c.example : '';
}

// ---------------------------------------------------------------------------
// CONCEPT DECK (8 cards, cycled). correctCategoryId maps to a category above.
// ---------------------------------------------------------------------------
const deck = [
  { label: 'Force-Directed Layout',
    definition: 'A physics-based algorithm that positions graph nodes by simulating repulsion and spring forces.',
    correctCategoryId: 3,
    reasoning: 'it is a rendering algorithm whose only job is to lay out nodes for display' },
  { label: 'Cycle Detection',
    definition: 'A check that confirms a graph contains no circular dependency chains.',
    correctCategoryId: 6,
    reasoning: 'it is a validation rule that guards graph quality, not a drawing or theory concept' },
  { label: 'Zone of Proximal Development',
    definition: 'The gap between what a learner can do alone and with guidance.',
    correctCategoryId: 4,
    reasoning: 'it is a learning-theory construct about how instruction scaffolds a learner' },
  { label: 'Hop Count',
    definition: 'The number of edges separating two concepts along a prerequisite chain.',
    correctCategoryId: 1,
    reasoning: 'it is a pure graph-distance measurement defined over edges' },
  { label: 'SKOS',
    definition: 'A W3C standard vocabulary for expressing preferred and alternate labels.',
    correctCategoryId: 2,
    reasoning: 'it is a published metadata standard for describing vocabularies' },
  { label: 'Adaptive Learning Path',
    definition: "A sequence of concepts customized to one learner's mastery state.",
    correctCategoryId: 5,
    reasoning: 'it tailors the route through the graph to an individual learner' },
  { label: 'Orphaned Node',
    definition: 'A concept with no incoming or outgoing dependency edges.',
    correctCategoryId: 6,
    reasoning: 'detecting orphans is a graph-quality check, so it lives with validation' },
  { label: 'Node Group',
    definition: 'A collection of interconnected nodes treated as a unit for visualization.',
    correctCategoryId: 3,
    reasoning: 'it is a display construct for clustering nodes visually' }
];

// ---------------------------------------------------------------------------
// STATE
// ---------------------------------------------------------------------------
let currentCard = 0;        // index into deck
let answeredThisCard = false;
let lastChosenId = null;    // category id the learner clicked for this card
let lastCorrect = false;
let attempted = 0;
let correctCount = 0;
let showReasoning = false;

// flash feedback: which button id is flashing and its color + timer
let flashId = null;
let flashColor = null;      // 'lightgreen' or 'salmon'
let flashUntil = 0;         // millis() timestamp

// feedback message lines to display in the bottom panel
let feedbackLines = [];

// button hit rectangles for the category grid, rebuilt every frame
let categoryRects = [];

// native controls
let nextButton;
let resetButton;
let reasoningCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // --- Native p5 controls (all in the control region, y >= drawHeight) ---
  nextButton = createButton('Next Concept');
  nextButton.parent(document.querySelector('main'));
  nextButton.position(10, drawHeight + 10);
  nextButton.mousePressed(nextConcept);

  reasoningCheckbox = createCheckbox(' Show Reasoning', false);
  reasoningCheckbox.parent(document.querySelector('main'));
  reasoningCheckbox.position(150, drawHeight + 12);
  reasoningCheckbox.changed(function () {
    showReasoning = reasoningCheckbox.checked();
  });

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(320, drawHeight + 10);
  resetButton.mousePressed(resetWorkbench);

  loadCard(0);

  describe('A taxonomy classification workbench. A concept card at the top shows a ' +
    'term and its definition. Below are six taxonomy category buttons: Graph Theory, ' +
    'Metadata Standards, Visualization Tools, Learning Science, Personalization, and ' +
    'Governance and Validation. The learner clicks the category that best fits the ' +
    'concept and receives immediate green or red feedback with an explanation. A ' +
    'Next Concept button cycles an 8-card deck, a Show Reasoning toggle reveals why ' +
    'the correct category fits, and a running score of correct over attempted is shown ' +
    'in the top-right corner.', LABEL);
}

function draw() {
  updateCanvasSize();

  // --- Required region backgrounds ---
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // --- Title (drawn after backgrounds so nothing overwrites it) ---
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(22);
  text('Taxonomy Classifier Workbench', margin, 10);

  // --- Running score in the top-right corner ---
  noStroke();
  fill('dimgray');
  textSize(15);
  textAlign(RIGHT, TOP);
  text('Correct: ' + correctCount + ' / Attempted: ' + attempted,
       canvasWidth - margin, 14);

  drawConceptCard();
  drawCategoryGrid();
  drawFeedbackPanel();

  // reset text defaults after drawing
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

// ---------------------------------------------------------------------------
// CONCEPT CARD (top region)
// ---------------------------------------------------------------------------
function drawConceptCard() {
  const card = deck[currentCard];
  const x = margin;
  const w = canvasWidth - 2 * margin;
  const y = cardTop;
  const h = cardHeight - 12;

  noStroke();
  fill('white');
  stroke('lightsteelblue');
  strokeWeight(1.5);
  rect(x, y, w, h, 10);

  // "Concept" kicker
  noStroke();
  fill('slategray');
  textAlign(LEFT, TOP);
  textSize(13);
  text('CLASSIFY THIS CONCEPT', x + 14, y + 10);

  // Concept label in bold
  noStroke();
  fill('midnightblue');
  textStyle(BOLD);
  textSize(21);
  text(card.label, x + 14, y + 28);
  textStyle(NORMAL);

  // Definition, wrapped inside the card
  noStroke();
  fill('black');
  textSize(15);
  textAlign(LEFT, TOP);
  text(card.definition, x + 14, y + 55, w - 28, h - 55);
}

// ---------------------------------------------------------------------------
// CATEGORY GRID (middle region) - drawn interactive regions with hit testing.
// Reflows from 3 columns to 2 columns below 500px, per spec.
// ---------------------------------------------------------------------------
function drawCategoryGrid() {
  categoryRects = [];
  const cols = canvasWidth < 500 ? 2 : 3;
  const rows = Math.ceil(categories.length / cols);

  const gap = 14;
  const gridPad = margin;
  const usableW = canvasWidth - 2 * gridPad;
  const usableH = gridHeight - 30; // small headroom
  const cellW = (usableW - (cols - 1) * gap) / cols;
  const cellH = (usableH - (rows - 1) * gap) / rows;

  const startX = gridPad;
  const startY = gridTop + 10;

  const now = millis();

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const bx = startX + col * (cellW + gap);
    const by = startY + row * (cellH + gap);

    categoryRects.push({ id: cat.id, x: bx, y: by, w: cellW, h: cellH });

    // Determine fill: flash overrides; otherwise show persistent
    // correct/incorrect state once this card has been answered.
    let bg = 'white';
    let bd = 'steelblue';
    let bw = 1.5;

    if (answeredThisCard) {
      if (cat.id === deck[currentCard].correctCategoryId) {
        bg = 'honeydew';
        bd = 'seagreen';
      }
      if (!lastCorrect && cat.id === lastChosenId) {
        bg = 'mistyrose';
        bd = 'indianred';
      }
    }
    if (flashId === cat.id && now < flashUntil) {
      bg = flashColor;
      bd = flashColor === 'lightgreen' ? 'green' : 'firebrick';
      bw = 3;
    }

    // hover cue when this card is still unanswered
    const hovering = mouseX >= bx && mouseX <= bx + cellW &&
                     mouseY >= by && mouseY <= by + cellH;
    if (!answeredThisCard && hovering) {
      bg = 'lightyellow';
      bw = 2.5;
    }

    fill(bg);
    stroke(bd);
    strokeWeight(bw);
    rect(bx, by, cellW, cellH, 10);

    // TaxonomyID badge
    noStroke();
    fill('steelblue');
    textAlign(LEFT, TOP);
    textSize(13);
    text('ID ' + cat.id, bx + 12, by + 10);

    // Category name, centered in the cell
    noStroke();
    fill('black');
    textStyle(BOLD);
    textSize(cols === 2 ? 16 : 17);
    textAlign(CENTER, CENTER);
    text(cat.name, bx + 8, by + 6, cellW - 16, cellH - 12);
    textStyle(NORMAL);
  }
}

// ---------------------------------------------------------------------------
// FEEDBACK PANEL (bottom region)
// ---------------------------------------------------------------------------
function drawFeedbackPanel() {
  const x = margin;
  const w = canvasWidth - 2 * margin;
  const y = feedbackTop;
  const h = feedbackHeight - 6;

  noStroke();
  // panel color hints at correctness once answered
  let panelBg = 'ghostwhite';
  let panelBd = 'lightgray';
  if (answeredThisCard) {
    panelBg = lastCorrect ? 'honeydew' : 'seashell';
    panelBd = lastCorrect ? 'seagreen' : 'indianred';
  }
  fill(panelBg);
  stroke(panelBd);
  strokeWeight(1.5);
  rect(x, y, w, h, 10);

  noStroke();
  textAlign(LEFT, TOP);

  if (feedbackLines.length === 0) {
    fill('slategray');
    textSize(15);
    text('Read the concept above, then click the taxonomy category that fits best.',
         x + 14, y + 12, w - 28, h - 20);
    return;
  }

  // First line is the verdict (bold + colored); remaining lines are detail.
  fill(lastCorrect ? 'darkgreen' : 'firebrick');
  textStyle(BOLD);
  textSize(16);
  text(feedbackLines[0], x + 14, y + 12, w - 28, 22);
  textStyle(NORMAL);

  fill('black');
  textSize(14.5);
  let detail = feedbackLines.slice(1).join(' ');
  if (showReasoning && answeredThisCard) {
    detail += '  Why it fits: ' + deck[currentCard].reasoning + '.';
  }
  text(detail, x + 14, y + 38, w - 28, h - 44);
}

// ---------------------------------------------------------------------------
// INTERACTION
// ---------------------------------------------------------------------------
function mousePressed() {
  // Only category clicks inside the drawing region are handled here; native
  // controls handle their own presses.
  if (mouseY < gridTop || mouseY > feedbackTop) return;
  if (answeredThisCard) return; // one scored attempt per card

  for (let i = 0; i < categoryRects.length; i++) {
    const r = categoryRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w &&
        mouseY >= r.y && mouseY <= r.y + r.h) {
      submitClassification(r.id);
      return;
    }
  }
}

function submitClassification(chosenId) {
  const card = deck[currentCard];
  const correctId = card.correctCategoryId;
  answeredThisCard = true;
  lastChosenId = chosenId;
  lastCorrect = (chosenId === correctId);

  attempted += 1;
  if (lastCorrect) correctCount += 1;

  // flash the chosen button
  flashId = chosenId;
  flashColor = lastCorrect ? 'lightgreen' : 'salmon';
  flashUntil = millis() + 700;

  if (lastCorrect) {
    feedbackLines = [
      'Correct!',
      categoryName(correctId) + ' is the best fit because ' + card.reasoning + '.'
    ];
  } else {
    feedbackLines = [
      'Not quite.',
      categoryName(chosenId) + ' usually holds concepts like ' +
        categoryExample(chosenId) + '. This concept fits ' +
        categoryName(correctId) + ' better because ' + card.reasoning + '.'
    ];
  }
}

function nextConcept() {
  currentCard = (currentCard + 1) % deck.length; // wrap to start
  loadCard(currentCard);
}

function loadCard(idx) {
  currentCard = idx;
  answeredThisCard = false;
  lastChosenId = null;
  lastCorrect = false;
  flashId = null;
  flashUntil = 0;
  feedbackLines = [];
}

function resetWorkbench() {
  attempted = 0;
  correctCount = 0;
  loadCard(0);
}

// ---------------------------------------------------------------------------
// RESPONSIVE SIZING (required functions at end)
// ---------------------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  // reposition native controls (control-region y stays fixed)
  if (nextButton) nextButton.position(10, drawHeight + 10);
  if (reasoningCheckbox) reasoningCheckbox.position(150, drawHeight + 12);
  if (resetButton) resetButton.position(320, drawHeight + 10);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}
