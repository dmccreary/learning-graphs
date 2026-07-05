// Learning Objective Builder MicroSim
// CANVAS_HEIGHT: 540
// Chapter 6: Bloom's Taxonomy and Learning Objectives
// Bloom Level: Apply / Create (L3) — the learner CONSTRUCTS a complete,
// well-formed, appropriately leveled learning objective from parts.
//
// The learner assembles an objective from three parts:
//   1. a Bloom level (six color-matched levels),
//   2. a Bloom Verb valid for that level (or a manually typed verb),
//   3. a target concept, plus an optional condition/context.
// A live sentence preview assembles as they build. "Check My Objective"
// returns criteria-based feedback: it confirms the verb matches a real Bloom
// Verb for the selected level, flags vague/non-actionable verbs, and reports
// which of the six levels the finished objective actually reflects.

// ---- Standard responsive canvas globals ----
let canvasWidth = 400;
let drawHeight = 390;           // drawing region (no controls)
let controlHeight = 150;        // control region: 4 rows ((4 x 35) + 10)
let canvasHeight = drawHeight + controlHeight; // = 540
let margin = 25;
let sliderLeftMargin = 140;     // present for standard compliance (no sliders)
let defaultTextSize = 16;

// ---- Controls ----
let levelSelect, verbSelect, conceptInput, conditionInput;
let checkButton, clearButton;

// ---- Bloom verb lists, keyed by level (the six lists from this chapter) ----
const BLOOM_VERBS = {
  'Remember':   ['define', 'list', 'recall', 'name', 'identify', 'label', 'recognize', 'state'],
  'Understand': ['explain', 'summarize', 'describe', 'interpret', 'classify', 'compare', 'illustrate', 'paraphrase'],
  'Apply':      ['use', 'execute', 'implement', 'solve', 'demonstrate', 'calculate', 'apply', 'practice'],
  'Analyze':    ['differentiate', 'organize', 'attribute', 'compare', 'contrast', 'examine', 'deconstruct', 'distinguish'],
  'Evaluate':   ['judge', 'critique', 'justify', 'assess', 'defend', 'appraise', 'evaluate', 'recommend'],
  'Create':     ['design', 'construct', 'produce', 'formulate', 'compose', 'generate', 'devise', 'invent']
};

// Ordered list of the six levels (low -> high).
const LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];

// Color-matched to the pyramid diagram earlier in the chapter.
const LEVEL_COLORS = {
  'Remember':   'mediumpurple',
  'Understand': 'cornflowerblue',
  'Apply':      'mediumseagreen',
  'Analyze':    'goldenrod',
  'Evaluate':   'darkorange',
  'Create':     'crimson'
};

// Vague, non-measurable verbs that should be flagged if typed manually.
const VAGUE_VERBS = ['understand', 'know', 'learn', 'learn about', 'appreciate',
  'be aware of', 'be familiar with', 'grasp', 'comprehend', 'get'];

// Reverse index: verb -> the level(s) it belongs to. Built once in setup().
let verbToLevel = {};

// ---- State ----
let selectedLevel = 'Apply';    // default per spec
const MANUAL_OPTION = '(type my own verb below)';
let feedback = null;            // {status:'good'|'warn'|'bad', lines:[...]}

function setup() {
  updateCanvasSize(); // MUST be first line
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Build the verb -> level reverse index (a verb like "compare" maps to
  // more than one level; we keep every level it appears in).
  for (const lvl of LEVELS) {
    for (const v of BLOOM_VERBS[lvl]) {
      if (!verbToLevel[v]) verbToLevel[v] = [];
      verbToLevel[v].push(lvl);
    }
  }

  // --- Row 1: Bloom level selector ---
  levelSelect = createSelect();
  levelSelect.parent(document.querySelector('main'));
  for (const lvl of LEVELS) levelSelect.option(lvl);
  levelSelect.selected(selectedLevel);
  levelSelect.changed(onLevelChange);

  // --- Row 2: verb selector (populated for the selected level) ---
  verbSelect = createSelect();
  verbSelect.parent(document.querySelector('main'));
  populateVerbSelect();
  verbSelect.changed(() => { feedback = null; });

  // --- Row 2/3: concept + condition inputs ---
  conceptInput = createInput('');
  conceptInput.parent(document.querySelector('main'));
  conceptInput.attribute('placeholder', 'e.g., cycle detection');
  conceptInput.input(() => { feedback = null; });

  conditionInput = createInput('');
  conditionInput.parent(document.querySelector('main'));
  conditionInput.attribute('placeholder', 'optional, e.g., given a sample dependency graph');
  conditionInput.input(() => { feedback = null; });

  // --- Row 3: buttons ---
  checkButton = createButton('Check My Objective');
  checkButton.parent(document.querySelector('main'));
  checkButton.mousePressed(checkObjective);

  clearButton = createButton('Clear');
  clearButton.parent(document.querySelector('main'));
  clearButton.mousePressed(clearAll);

  layoutControls();

  describe(
    'A learning-objective builder. Choose a Bloom level from a dropdown, then ' +
    'choose a matching Bloom Verb (or type your own), type a target concept, ' +
    'and optionally add a condition. A live sentence preview assembles the ' +
    'objective as: The learner will be able to VERB CONCEPT. Clicking Check My ' +
    'Objective returns feedback on whether the verb is a valid, measurable Bloom ' +
    'Verb for the chosen level and reports which Bloom level the sentence reflects.',
    LABEL
  );
}

function draw() {
  updateCanvasSize();

  // Region backgrounds (REQUIRED order) --------------------------------------
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title (after background) --------------------------------------------------
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Learning Objective Builder', canvasWidth / 2, 10);

  // Selected-level color band ------------------------------------------------
  const bandY = 46;
  const bandH = 30;
  noStroke();
  fill(LEVEL_COLORS[selectedLevel]);
  rect(margin, bandY, canvasWidth - 2 * margin, bandH, 6);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text('Selected level: ' + selectedLevel, canvasWidth / 2, bandY + bandH / 2);
  textStyle(NORMAL);

  // Live-assembled sentence preview ------------------------------------------
  drawPreview(margin, bandY + bandH + 12, canvasWidth - 2 * margin, 72);

  // Feedback panel ------------------------------------------------------------
  drawFeedback(margin, bandY + bandH + 12 + 84, canvasWidth - 2 * margin,
    drawHeight - (bandY + bandH + 12 + 84) - 14);

  // Control-region labels -----------------------------------------------------
  drawControlLabels();
}

// Return the currently chosen verb: either the dropdown selection or, if the
// learner picked the manual option, whatever they typed as the first word of
// the concept... no — we give the manual verb its own path via verbSelect.
function currentVerb() {
  const v = verbSelect.value();
  return v === MANUAL_OPTION ? '' : v;
}

// The manual-verb text comes from a dedicated field only when manual is chosen.
// To keep the control count within budget we reuse the verb dropdown: the
// manual option instructs the learner to type the verb at the start of the
// concept field. We parse it back out here.
function effectiveVerbAndConcept() {
  const rawConcept = conceptInput.value().trim();
  if (verbSelect.value() === MANUAL_OPTION) {
    // First token is treated as the (possibly vague) verb.
    const parts = rawConcept.split(/\s+/);
    const verb = (parts.shift() || '').toLowerCase();
    const concept = parts.join(' ');
    return { verb, concept, manual: true };
  }
  return { verb: verbSelect.value(), concept: rawConcept, manual: false };
}

function drawPreview(x, y, w, h) {
  noStroke();
  stroke('silver');
  fill('white');
  rect(x, y, w, h, 8);

  const { verb, concept } = effectiveVerbAndConcept();
  const condition = conditionInput.value().trim();

  noStroke();
  fill('gray');
  textAlign(LEFT, TOP);
  textSize(12);
  text('LIVE PREVIEW', x + 12, y + 8);

  // Assemble: [Condition,] the learner will be able to [verb] [concept].
  const verbTxt = verb ? verb : '_____';
  const conceptTxt = concept ? concept : '_____';
  let sentence = 'The learner will be able to ' + verbTxt + ' ' + conceptTxt + '.';
  if (condition) sentence = condition.charAt(0).toUpperCase() + condition.slice(1) + ', ' +
    'the learner will be able to ' + verbTxt + ' ' + conceptTxt + '.';

  fill('midnightblue');
  textSize(17);
  textStyle(BOLD);
  text(sentence, x + 12, y + 26, w - 24, h - 30);
  textStyle(NORMAL);
}

function drawFeedback(x, y, w, h) {
  noStroke();
  stroke('silver');
  fill(255, 255, 255, 235);
  rect(x, y, w, h, 8);

  noStroke();
  fill('gray');
  textAlign(LEFT, TOP);
  textSize(12);
  text('FEEDBACK', x + 12, y + 8);

  if (!feedback) {
    fill('gray');
    textSize(14);
    textStyle(ITALIC);
    text('Build an objective above, then click "Check My Objective" for ' +
      'criteria-based feedback.', x + 12, y + 28, w - 24);
    textStyle(NORMAL);
    return;
  }

  // Status color band on the left edge.
  const statusColor = feedback.status === 'good' ? 'mediumseagreen'
    : feedback.status === 'warn' ? 'goldenrod' : 'crimson';
  noStroke();
  fill(statusColor);
  rect(x, y, 8, h, 8, 0, 0, 8);

  let ty = y + 28;
  textAlign(LEFT, TOP);
  for (let i = 0; i < feedback.lines.length; i++) {
    if (i === 0) {
      fill(statusColor);
      textSize(15);
      textStyle(BOLD);
    } else {
      fill('black');
      textSize(14);
      textStyle(NORMAL);
    }
    text(feedback.lines[i], x + 18, ty, w - 30);
    // advance by rough wrapped-height estimate
    const est = ceil(textWidth(feedback.lines[i]) / (w - 30)) * (i === 0 ? 20 : 19);
    ty += max(est, i === 0 ? 24 : 20) + 4;
  }
  textStyle(NORMAL);
}

// ---- The core criteria-based checker --------------------------------------
function checkObjective() {
  const { verb, concept, manual } = effectiveVerbAndConcept();
  const lines = [];
  let status = 'good';

  // Guard: need a verb and a concept.
  if (!verb) {
    feedback = { status: 'bad', lines: [
      'No verb yet.',
      manual
        ? 'You chose "type my own verb" — type the verb as the first word of the Concept field.'
        : 'Pick a Bloom Verb from the dropdown, or choose "type my own verb below".'
    ] };
    return;
  }
  if (!concept) {
    feedback = { status: 'bad', lines: [
      'No concept yet.',
      manual
        ? 'After the verb, type the target concept, e.g. "differentiate cycle detection".'
        : 'Type a target concept in the Concept field, e.g. "cycle detection".'
    ] };
    return;
  }

  const vLower = verb.toLowerCase();

  // Case 1: vague / non-actionable verb.
  if (VAGUE_VERBS.includes(vLower)) {
    status = 'bad';
    const suggestions = BLOOM_VERBS[selectedLevel].slice(0, 2).join('" or "');
    lines.push('This objective uses "' + vLower + '", which is too vague to measure.');
    lines.push('Try a specific, observable verb from the ' + selectedLevel +
      ' level instead, like "' + suggestions + '".');
    feedback = { status, lines };
    return;
  }

  // Determine the actual level(s) of the verb.
  const actualLevels = verbToLevel[vLower] || null;

  // Case 2: verb is a real Bloom Verb for the SELECTED level.
  if (actualLevels && actualLevels.includes(selectedLevel)) {
    status = 'good';
    lines.push('Well matched.');
    lines.push('This objective uses "' + vLower + '", a ' + selectedLevel +
      '-level verb — a strong match to your selected level.');
    lines.push('Reflected Bloom level: ' + selectedLevel + '.');
    feedback = { status, lines };
    return;
  }

  // Case 3: verb is a real Bloom Verb, but for a DIFFERENT level.
  if (actualLevels && actualLevels.length > 0) {
    status = 'warn';
    const actual = actualLevels[0];
    lines.push('Level mismatch.');
    lines.push('This objective uses "' + vLower + '", which is a ' + actual +
      '-level verb, not a ' + selectedLevel + '-level verb.');
    lines.push('Your sentence actually reflects the ' + actual +
      ' level. Switch the level selector to ' + actual +
      ', or pick a ' + selectedLevel + '-level verb such as "' +
      BLOOM_VERBS[selectedLevel][0] + '".');
    feedback = { status, lines };
    return;
  }

  // Case 4: not a recognized Bloom Verb at all (typed something unusual).
  status = 'warn';
  lines.push('Unrecognized verb.');
  lines.push('"' + vLower + '" is not one of this chapter\'s listed Bloom Verbs, ' +
    'so its measurability is unclear.');
  lines.push('Pick a verb from the ' + selectedLevel + ' list to be safe, e.g. "' +
    BLOOM_VERBS[selectedLevel][0] + '" or "' + BLOOM_VERBS[selectedLevel][1] + '".');
  feedback = { status, lines };
}

// ---- Handlers --------------------------------------------------------------
function onLevelChange() {
  selectedLevel = levelSelect.value();
  populateVerbSelect();
  feedback = null;
}

function populateVerbSelect() {
  // Clear existing options by recreating the element's option list.
  // p5 has no removeOption; rebuild via the underlying DOM select.
  const el = verbSelect.elt;
  el.innerHTML = '';
  for (const v of BLOOM_VERBS[selectedLevel]) verbSelect.option(v);
  verbSelect.option(MANUAL_OPTION);
  verbSelect.selected(BLOOM_VERBS[selectedLevel][0]);
}

function clearAll() {
  conceptInput.value('');
  conditionInput.value('');
  selectedLevel = 'Apply';
  levelSelect.selected('Apply');
  populateVerbSelect();
  feedback = null;
}

// ---- Control labels drawn in the control region ---------------------------
// One label per control row, left-aligned before each field.
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Bloom Level:', 10, drawHeight + 8 + 12);
  text('Bloom Verb:', 10, drawHeight + 46 + 12);
  text('Concept:', 10, drawHeight + 84 + 12);
  text('Condition:', 10, drawHeight + 122 + 12);
}

// ---- Control layout (responsive) ------------------------------------------
// Four rows, each 38px apart, all within the 150px control region:
//   Row 1  Bloom Level  (dropdown)
//   Row 2  Bloom Verb   (dropdown)
//   Row 3  Concept      (text input)
//   Row 4  Condition    (text input) + Check + Clear buttons
function layoutControls() {
  const labelW = 110;                 // reserved width for row labels
  const fieldX = labelW + 10;
  const r1 = drawHeight + 8;
  const r2 = drawHeight + 46;
  const r3 = drawHeight + 84;
  const r4 = drawHeight + 122;

  levelSelect.position(fieldX, r1);
  levelSelect.style('font-size', '14px');

  verbSelect.position(fieldX, r2);
  verbSelect.style('font-size', '14px');

  conceptInput.position(fieldX, r3);
  conceptInput.size(max(120, canvasWidth - fieldX - margin));

  // Row 4: condition input shares the row with the two buttons.
  // Reserve room on the right for the buttons (~220px), condition takes the rest.
  const buttonBlockW = 220;
  const condW = max(120, canvasWidth - fieldX - buttonBlockW - margin);
  conditionInput.position(fieldX, r4);
  conditionInput.size(condW);

  const btnX = fieldX + condW + 10;
  if (btnX + 210 <= canvasWidth) {
    // Buttons fit to the right of the condition field.
    checkButton.position(btnX, r4);
    clearButton.position(btnX + 150, r4);
  } else {
    // Narrow: push buttons to the far-right edge, stacked tight.
    checkButton.position(canvasWidth - 205, r4);
    clearButton.position(canvasWidth - 55, r4);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
