// Distractor Quality Rater MicroSim
// CANVAS_HEIGHT: 560
// Bloom Level: Evaluate (L5) - judge, critique, assess, justify
// Learners JUDGE each candidate multiple-choice distractor as Weak or Strong against three
// explicit criteria, then compare their rating to an expert rating with a justification that
// names the specific misconception a strong distractor targets. A running score and an
// end-of-bank summary of the most-overlooked criterion make this an active evaluation task,
// not passive reading. No scoring persistence beyond the current session.

// ---- Standard responsive canvas globals ----
let canvasWidth = 400;          // initial width, updated responsively
let drawHeight = 510;           // drawing region height
let controlHeight = 50;         // control region height (1 row of buttons)
let canvasHeight = drawHeight + controlHeight; // total = 560
let margin = 25;                // edge margin
let sliderLeftMargin = 140;     // kept for standard (no slider used here)
let defaultTextSize = 16;       // base text size

// ---- Distractor bank ----
// Each item: stem, key (correct answer), distractor, expertRating ('weak'|'strong'),
// misconceptionTargeted (named confusion for strong distractors; '' for weak),
// and criteriaMet: which of the three criteria an expert judges TRUE for this distractor.
// Criteria order: [0] grammatically parallel, [1] plausible without deep understanding,
// [2] targets a specific nameable misconception.
let distractorBank = [
  {
    stem: 'What is a Prerequisite Chain?',
    key: 'A sequence of concepts connected end to end by prerequisite relationships',
    distractor: 'The set of concepts a learner has not yet mastered on the way to a goal',
    expertRating: 'strong',
    misconceptionTargeted: 'This distractor targets confusion with Skill Gap (Chapter 3).',
    criteriaMet: [true, true, true],
    justification: 'It is a grammatically parallel noun phrase, plausible to a learner who has ' +
      'not distinguished a path from what is missing along it, and it targets the specific, ' +
      'nameable confusion between a Prerequisite Chain and a Skill Gap.'
  },
  {
    stem: 'What does a Directed Edge represent in a learning graph?',
    key: 'A prerequisite dependency pointing from an earlier concept to a later concept',
    distractor: 'A purple banana that flies over the mountains at sunrise',
    expertRating: 'weak',
    misconceptionTargeted: '',
    criteriaMet: [false, false, false],
    justification: 'It is off-topic and absurd. No learner would find it plausible, it is not ' +
      'grammatically parallel to the key, and it targets no real misconception, so it can be ' +
      'eliminated without any understanding.'
  },
  {
    stem: 'What is Topological Sort used for in a learning graph?',
    key: 'Ordering concepts so every prerequisite appears before the concepts that depend on it',
    distractor: 'Sorting concepts alphabetically by their labels for display in a glossary',
    expertRating: 'strong',
    misconceptionTargeted: 'This distractor targets confusion with a simple alphabetical Sort.',
    criteriaMet: [true, true, true],
    justification: 'It is parallel in form, plausible to someone who hears "sort" and thinks of ' +
      'alphabetization, and it targets the specific misconception that a topological sort is just ' +
      'any ordering rather than a dependency-respecting one.'
  },
  {
    stem: 'What is a Learning Objective?',
    key: 'A statement of what a learner should be able to do after instruction',
    distractor: 'A statement of what the learner should be able to do after instruction, written down',
    expertRating: 'weak',
    misconceptionTargeted: '',
    criteriaMet: [true, false, false],
    justification: 'It merely restates the key with trivial extra words. It is grammatically ' +
      'parallel but not independently plausible as a different answer, and it targets no ' +
      'misconception, so a careful reader spots it as a near-duplicate of the key.'
  },
  {
    stem: 'What is a Cycle in a dependency graph?',
    key: 'A path that returns to its starting concept, creating an impossible prerequisite loop',
    distractor: 'A concept that has no incoming or outgoing edges anywhere in the graph',
    expertRating: 'strong',
    misconceptionTargeted: 'This distractor targets confusion with an Orphan Node.',
    criteriaMet: [true, true, true],
    justification: 'It is parallel and plausible to a learner still learning graph vocabulary, ' +
      'and it targets the nameable confusion between a Cycle and an Orphan Node (a disconnected ' +
      'concept), two distinct structural problems.'
  },
  {
    stem: 'What is Bloom\'s Taxonomy used for when writing assessments?',
    key: 'Classifying the cognitive level a question demands, from Remember up to Create',
    distractor: 'Ranking questions by how many students historically answered them correctly',
    expertRating: 'strong',
    misconceptionTargeted: 'This distractor targets confusion with Item Difficulty.',
    criteriaMet: [true, true, true],
    justification: 'It is grammatically parallel and plausible because both concern question ' +
      '"level," and it targets the specific confusion between cognitive level (Bloom) and ' +
      'empirical Item Difficulty, which are independent properties.'
  }
];

let criterionLabels = [
  'Grammatically parallel to the key',
  'Plausible without deep understanding',
  'Targets a specific, nameable misconception'
];

// ---- State ----
let currentIndex = 0;           // which distractor is showing
let checkStates = [false, false, false]; // learner's ticks for the current item
let submittedRating = null;     // 'weak' | 'strong' | null
let ratingCorrect = null;       // boolean once submitted
let ratedCorrectCount = 0;      // running score numerator
let ratedItems = [];            // indices already rated (avoid double counting)
// Tally of how often the learner's ticks disagreed with the expert per criterion,
// used for the end-of-bank "most overlooked criterion" summary.
let criterionMissCounts = [0, 0, 0];
let finished = false;           // true once all items rated -> show summary

// ---- Controls ----
let check0, check1, check2;
let weakButton, strongButton;
let nextButton, resetButton;

// Layout breakpoint: stack the three regions when narrow.
let stackBreakpoint = 600;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Three criterion checkboxes (native controls). Positioned each frame in draw's
  // control layout via positionCheckboxes(); created here once.
  check0 = createCheckbox(' ' + criterionLabels[0], false);
  check0.parent(document.querySelector('main'));
  check0.changed(() => { checkStates[0] = check0.checked(); });

  check1 = createCheckbox(' ' + criterionLabels[1], false);
  check1.parent(document.querySelector('main'));
  check1.changed(() => { checkStates[1] = check1.checked(); });

  check2 = createCheckbox(' ' + criterionLabels[2], false);
  check2.parent(document.querySelector('main'));
  check2.changed(() => { checkStates[2] = check2.checked(); });

  // Rating buttons.
  weakButton = createButton('Weak Distractor');
  weakButton.parent(document.querySelector('main'));
  weakButton.mousePressed(() => submitRating('weak'));

  strongButton = createButton('Strong Distractor');
  strongButton.parent(document.querySelector('main'));
  strongButton.mousePressed(() => submitRating('strong'));

  // Navigation buttons (control region row).
  nextButton = createButton('Next Distractor');
  nextButton.parent(document.querySelector('main'));
  nextButton.mousePressed(nextDistractor);

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetSim);

  positionAllControls();

  describe('An evaluation task for judging multiple-choice distractor quality. The question ' +
    'stem and correct key are shown at the top. One candidate distractor is shown at a time ' +
    'with three criterion checkboxes: grammatically parallel to the key, plausible without deep ' +
    'understanding, and targets a specific nameable misconception. The learner ticks the criteria ' +
    'that apply, then rates the distractor as Weak or Strong. Feedback reveals the expert rating, ' +
    'the justification, and for strong distractors the specific concept it is easy to confuse with ' +
    'the key. A running score tracks correct ratings across a bank of six distractors, and a final ' +
    'summary names the criterion the learner most often overlooked.', LABEL);
}

// Position the in-canvas checkboxes and rating buttons based on current layout.
// Checkboxes and rating buttons live inside the drawing region conceptually but are
// HTML controls, so we place them at computed screen coordinates each resize.
function positionAllControls() {
  let regions = computeRegions();

  // Criterion checkboxes stacked in the middle region.
  let cx = regions.middle.x + 14;
  let cyStart = regions.checkboxTop;
  let cw = regions.middle.w - 28;
  check0.position(cx, cyStart);
  check0.size(cw);
  check1.position(cx, cyStart + 28);
  check1.size(cw);
  check2.position(cx, cyStart + 56);
  check2.size(cw);

  // Rating buttons row, just below the checkboxes.
  let by = cyStart + 88;
  weakButton.position(cx, by);
  strongButton.position(cx + 150, by);

  // Navigation buttons in the control region (below drawHeight).
  nextButton.position(margin, drawHeight + 10);
  resetButton.position(margin + 165, drawHeight + 10);

  // Hide rating controls once finished (summary view).
  toggleRatingControlsVisible(!finished);
}

// Show/hide the checkboxes and rating buttons together.
function toggleRatingControlsVisible(visible) {
  let disp = visible ? 'block' : 'none';
  check0.style('display', disp);
  check1.style('display', disp);
  check2.style('display', disp);
  weakButton.style('display', disp);
  strongButton.style('display', disp);
}

// Compute the three stacked regions and key y offsets used for control placement.
// The spec's three panels (top reference, middle candidate+criteria, bottom feedback)
// are stacked vertically within the single drawing region. Heights are tuned so the
// feedback panel is tall enough for the longest expert justification without spilling
// into the control strip below drawHeight. "stacked" only affects text-wrapping widths.
function computeRegions() {
  let stacked = canvasWidth < stackBreakpoint;

  let topY = 56;                       // below the title band
  let topH = 86;                       // stem + correct key reference card
  let midY = topY + topH + 8;          // = 150
  let midH = 244;                      // distractor card + criteria + rating buttons
  let bottomY = midY + midH + 8;       // = 402
  let bottomH = drawHeight - bottomY - 10; // ~98px feedback panel

  let regionX = margin;
  let regionW = canvasWidth - 2 * margin;

  // Checkboxes begin below the distractor card (96px) and its instruction line,
  // with clearance so the instruction text does not collide with the first box.
  let checkboxTop = midY + 122;

  return {
    top: { x: regionX, y: topY, w: regionW, h: topH },
    middle: { x: regionX, y: midY, w: regionW, h: midH },
    bottom: { x: regionX, y: bottomY, w: regionW, h: bottomH },
    checkboxTop: checkboxTop,
    stacked: stacked
  };
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

  // --- Title ---
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Distractor Quality Rater', canvasWidth / 2, 12);

  noStroke();
  fill('dimgray');
  textAlign(CENTER, TOP);
  textSize(13);
  text('Judge each distractor against three criteria, then rate it', canvasWidth / 2, 40);

  let regions = computeRegions();

  if (finished) {
    drawSummary(regions);
  } else {
    drawStemCard(regions.top);
    drawDistractorAndCriteria(regions.middle);
    drawFeedback(regions.bottom);
  }

  // Control-region running score. Use a compact form on narrow canvases so the
  // text does not collide with the Next/Reset buttons on the left of the row.
  noStroke();
  fill('black');
  textAlign(RIGHT, CENTER);
  let narrow = canvasWidth < 560;
  textSize(narrow ? 13 : defaultTextSize);
  let scoreStr;
  if (narrow) {
    scoreStr = ratedCorrectCount + '/' + distractorBank.length + ' correct';
  } else {
    scoreStr = 'Score: ' + ratedCorrectCount + ' correct  |  ' +
      ratedItems.length + ' of ' + distractorBank.length + ' rated';
  }
  text(scoreStr, canvasWidth - margin, drawHeight + 25);
}

// Top region: fixed reference stem and correct key.
function drawStemCard(r) {
  let item = distractorBank[currentIndex];

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);

  let pad = 12;
  noStroke();
  fill('navy');
  textAlign(LEFT, TOP);
  textSize(13);
  text('QUESTION ' + (currentIndex + 1) + ' OF ' + distractorBank.length,
    r.x + pad, r.y + 8);

  fill('black');
  textSize(15);
  textStyle(BOLD);
  let y = drawWrapped('Stem: ' + item.stem, r.x + pad, r.y + 26, r.w - 2 * pad, 2);
  textStyle(NORMAL);

  fill('darkgreen');
  textSize(14);
  drawWrapped('Correct key: ' + item.key, r.x + pad, y + 2, r.w - 2 * pad, 2);
}

// Middle region: the candidate distractor card plus criterion instructions.
// (The checkboxes themselves are HTML controls positioned over this region.)
function drawDistractorAndCriteria(r) {
  let item = distractorBank[currentIndex];

  // Distractor card.
  stroke('silver');
  strokeWeight(1);
  fill('lemonchiffon');
  let cardH = 96;
  rect(r.x, r.y, r.w, cardH, 8);

  let pad = 12;
  noStroke();
  fill('saddlebrown');
  textAlign(LEFT, TOP);
  textSize(13);
  text('CANDIDATE DISTRACTOR', r.x + pad, r.y + 8);

  fill('black');
  textSize(15);
  drawWrapped(item.distractor, r.x + pad, r.y + 26, r.w - 2 * pad, 2);

  // Instruction above the checkboxes.
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Tick each criterion this distractor meets, then rate it:',
    r.x + pad, r.y + cardH + 4);

  // The three checkboxes render here (HTML). We draw nothing else for them.
  // Reserve space; rating buttons follow (also HTML).
}

// Bottom region: feedback panel after a rating is submitted.
function drawFeedback(r) {
  stroke('silver');
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(r.x, r.y, r.w, r.h, 8);

  let pad = 12;

  if (submittedRating === null) {
    noStroke();
    fill('gray');
    textAlign(LEFT, TOP);
    textSize(14);
    drawWrapped('Feedback appears here after you rate this distractor. ' +
      'Decide: is it weak or strong?', r.x + pad, r.y + 12, r.w - 2 * pad, 3);
    return;
  }

  let item = distractorBank[currentIndex];

  // Verdict line: did the learner's rating match the expert?
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  if (ratingCorrect) {
    fill('green');
    text('Correct - your rating matches the expert.', r.x + pad, r.y + 10);
  } else {
    fill('crimson');
    text('Not quite - compare with the expert rating below.', r.x + pad, r.y + 10);
  }
  textStyle(NORMAL);

  // Expert rating + justification.
  fill('black');
  textSize(14);
  let y = r.y + 34;
  let expertLabel = (item.expertRating === 'strong') ? 'STRONG distractor' : 'WEAK distractor';
  text('Expert rating: ' + expertLabel, r.x + pad, y);
  y += 20;

  fill('dimgray');
  textSize(13);
  y = drawWrapped(item.justification, r.x + pad, y, r.w - 2 * pad, 2);

  // Named misconception for strong distractors.
  if (item.expertRating === 'strong' && item.misconceptionTargeted) {
    y += 2;
    fill('mediumblue');
    textSize(13);
    y = drawWrapped(item.misconceptionTargeted, r.x + pad, y, r.w - 2 * pad, 2);
  }

  // Nudge to advance.
  y += 4;
  if (y < r.y + r.h - 16) {
    fill('gray');
    textSize(12);
    if (ratedItems.length < distractorBank.length) {
      text('Press "Next Distractor" to continue.', r.x + pad, y);
    } else {
      text('All rated - press "Next Distractor" for your summary.', r.x + pad, y);
    }
  }
}

// Final summary panel after all items are rated.
function drawSummary(regions) {
  let x = margin;
  let y = 64;
  let w = canvasWidth - 2 * margin;
  let h = drawHeight - y - 12;

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 10);

  let pad = 16;
  noStroke();
  fill('navy');
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  text('Session Summary', x + pad, y + 14);
  textStyle(NORMAL);

  fill('black');
  textSize(16);
  let cy = y + 48;
  text('You rated ' + ratedCorrectCount + ' of ' + distractorBank.length +
    ' distractors correctly.', x + pad, cy);
  cy += 30;

  // Determine most-overlooked criterion (highest miss count).
  let maxMiss = Math.max(...criterionMissCounts);
  textSize(14);
  fill('black');
  if (maxMiss === 0) {
    fill('green');
    cy = drawWrapped('You applied all three criteria consistently with the expert - ' +
      'excellent evaluative judgment.', x + pad, cy, w - 2 * pad, 3);
  } else {
    // Report every criterion tied for the most overlooked.
    let overlooked = [];
    for (let i = 0; i < 3; i++) {
      if (criterionMissCounts[i] === maxMiss) overlooked.push(criterionLabels[i]);
    }
    fill('crimson');
    cy = drawWrapped('Criterion you most often overlooked (disagreed with the expert on ' +
      maxMiss + ' of ' + distractorBank.length + ' items):', x + pad, cy, w - 2 * pad, 3);
    cy += 4;
    fill('black');
    for (let label of overlooked) {
      cy = drawWrapped('- ' + label, x + pad + 6, cy, w - 2 * pad - 6, 2);
    }
  }

  cy += 12;
  fill('dimgray');
  textSize(13);
  drawWrapped('A strong distractor is grammatically parallel to the key, plausible to a ' +
    'learner without deep understanding, and targets one specific, nameable misconception. ' +
    'Press "Reset" to rate the bank again.', x + pad, cy, w - 2 * pad, 3);
}

// ---- Control handlers ----
function submitRating(rating) {
  if (finished) return;
  // Only score the first rating for a given item.
  if (ratedItems.indexOf(currentIndex) !== -1) {
    // Already rated this item; ignore repeat clicks until Next.
    return;
  }
  let item = distractorBank[currentIndex];
  submittedRating = rating;
  ratingCorrect = (rating === item.expertRating);
  if (ratingCorrect) ratedCorrectCount++;

  // Record which criteria the learner judged differently from the expert.
  for (let i = 0; i < 3; i++) {
    if (checkStates[i] !== item.criteriaMet[i]) {
      criterionMissCounts[i]++;
    }
  }

  ratedItems.push(currentIndex);
}

function nextDistractor() {
  // If the current item has not been rated yet, do not skip it (keeps score honest).
  if (!finished && submittedRating === null) {
    // Gentle guard: require a rating before advancing.
    return;
  }

  if (ratedItems.length >= distractorBank.length) {
    // All items rated -> go to summary.
    finished = true;
    toggleRatingControlsVisible(false);
    return;
  }

  // Advance to the next UNRATED item (they are rated in order, so index+1).
  currentIndex++;
  if (currentIndex >= distractorBank.length) {
    currentIndex = distractorBank.length - 1;
  }
  clearCurrentSelections();
}

// Reset the ticks/rating for the current item.
function clearCurrentSelections() {
  checkStates = [false, false, false];
  check0.checked(false);
  check1.checked(false);
  check2.checked(false);
  submittedRating = null;
  ratingCorrect = null;
}

// Full reset back to the first distractor.
function resetSim() {
  currentIndex = 0;
  ratedCorrectCount = 0;
  ratedItems = [];
  criterionMissCounts = [0, 0, 0];
  finished = false;
  clearCurrentSelections();
  toggleRatingControlsVisible(true);
  positionAllControls();
}

// ---- Text helper ----
// Draw wrapped text; returns the y after the last line.
function drawWrapped(str, x, y, maxW, lineGap) {
  let words = str.split(' ');
  let line = '';
  let lineH = textAscent() + textDescent() + lineGap;
  let cy = y;
  for (let n = 0; n < words.length; n++) {
    let test = line + words[n] + ' ';
    if (textWidth(test) > maxW && line.length > 0) {
      noStroke();
      text(line.trim(), x, cy);
      line = words[n] + ' ';
      cy += lineH;
    } else {
      line = test;
    }
  }
  noStroke();
  text(line.trim(), x, cy);
  return cy + lineH;
}

// ---- Responsive plumbing (must be at end) ----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionAllControls(); // reposition/resize all HTML controls for the new width
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}
