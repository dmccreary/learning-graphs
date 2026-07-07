// Retrieval-Augmented Generation Step-Through MicroSim
// CANVAS_HEIGHT: 560
// A step-through explainer (NOT continuous animation): Next/Previous buttons
// walk the learner through the three RAG stages (Retrieve, Augment, Generate)
// with concrete visible data at each step, plus an optional Without-RAG comparison.
// Bloom Level: Understand (L2) - explain, summarize, sequence
// MicroSim template version 2026.03

// ----- Standard responsive canvas globals -----
let canvasWidth = 800;          // initial width, reset responsively in updateCanvasSize()
let drawHeight = 510;           // top drawing region (holds query + stage panel + comparison)
let controlHeight = 50;         // control region (buttons + toggle)
let canvasHeight = drawHeight + controlHeight; // total canvas height = 560
let margin = 25;                // margin around visual elements
let sliderLeftMargin = 140;     // kept for template consistency (no sliders here)
let defaultTextSize = 16;

// ----- Controls -----
let prevButton;
let nextButton;
let comparisonCheckbox;

// ----- Stage state -----
let stageIndex = 0;             // 0 = Retrieve, 1 = Augment, 2 = Generate
let stageNames = ['1. Retrieve', '2. Augment', '3. Generate'];
let showComparison = false;

// ----- Worked example content (fixed, no live model call) -----
let queryText = 'What is Universal Design for Learning?';

// Three-document mini knowledge source. Doc 2 is the match.
let knowledgeDocs = [
  {
    id: 'Doc 1',
    title: 'Chapter 3 - Bloom’s Taxonomy',
    body: 'Bloom’s Taxonomy classifies learning goals into six levels, from remembering facts up to creating new work.'
  },
  {
    id: 'Doc 2',
    title: 'Chapter 16 - Universal Design for Learning',
    body: 'Universal Design for Learning (UDL) is a framework for designing lessons that work for the widest range of learners. It rests on three principles: multiple means of engagement, representation, and action & expression. UDL removes barriers up front instead of retrofitting accommodations later.',
    isMatch: true
  },
  {
    id: 'Doc 3',
    title: 'Chapter 9 - Force-Directed Layout',
    body: 'A force-directed layout positions graph nodes using simulated springs and repulsion so related concepts cluster together.'
  }
];

// The exact retrieved passage (three sentences from Doc 2).
let retrievedPassage = 'Universal Design for Learning (UDL) is a framework for designing lessons that work for the widest range of learners. It rests on three principles: multiple means of engagement, representation, and action & expression. UDL removes barriers up front instead of retrofitting accommodations later.';

// Generated answer text and the grounded phrase that is underlined.
let generatedAnswer = 'Universal Design for Learning is a framework for designing lessons that work for the widest range of learners, built on three principles: engagement, representation, and action & expression.';
let groundedPhrase = 'three principles: engagement, representation, and action & expression';

// Without-RAG (ungrounded) answer for the comparison box.
let withoutRagAnswer = 'Universal Design for Learning is a general approach to making education more accessible and inclusive for different kinds of students.';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Previous button
  prevButton = createButton('← Previous');
  prevButton.parent(document.querySelector('main'));
  prevButton.position(10, drawHeight + 10);
  prevButton.mousePressed(goPrevious);

  // Next button
  nextButton = createButton('Next →');
  nextButton.parent(document.querySelector('main'));
  nextButton.position(115, drawHeight + 10);
  nextButton.mousePressed(goNext);

  // Toggle for the Without-RAG comparison box
  comparisonCheckbox = createCheckbox(' Show Without-RAG Comparison', false);
  comparisonCheckbox.parent(document.querySelector('main'));
  comparisonCheckbox.position(200, drawHeight + 12);
  comparisonCheckbox.changed(() => { showComparison = comparisonCheckbox.checked(); });

  updateButtonStates();

  describe('A three-stage step-through of Retrieval-Augmented Generation for the question ' +
    '"What is Universal Design for Learning?". Use Next and Previous to move through the Retrieve, ' +
    'Augment, and Generate stages, each showing concrete text. A toggle reveals a side-by-side ' +
    'comparison of the grounded answer with an ungrounded Without-RAG answer.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region background (required standard)
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region background (required standard)
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  // Title (drawn after background regions)
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('RAG Step-Through', canvasWidth / 2, 8);

  // Fixed example query header
  drawQueryHeader();

  // Stage progress row
  drawStageTracker();

  // Determine vertical space available for the active stage panel.
  // If the comparison box is shown, reserve room at the bottom for it.
  let comparisonH = showComparison ? 120 : 0;
  let panelTop = 118;
  let panelBottom = drawHeight - margin - comparisonH;

  // Active stage panel
  if (stageIndex === 0) {
    drawRetrieveStage(panelTop, panelBottom);
  } else if (stageIndex === 1) {
    drawAugmentStage(panelTop, panelBottom);
  } else {
    drawGenerateStage(panelTop, panelBottom);
  }

  // Optional comparison box
  if (showComparison) {
    drawComparisonBox(drawHeight - margin - comparisonH + 8, comparisonH - 8);
  }

  // Control labels
  drawControlLabels();

  // Reset defaults
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

// ----- Header with the fixed worked-example query -----
function drawQueryHeader() {
  let boxX = margin;
  let boxY = 38;
  let boxW = canvasWidth - 2 * margin;
  let boxH = 40;

  fill('white');
  stroke('steelblue');
  strokeWeight(1.5);
  rect(boxX, boxY, boxW, boxH, 8);

  noStroke();
  fill('steelblue');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('EXAMPLE QUERY', boxX + 12, boxY + 12);

  fill('black');
  textSize(16);
  textAlign(LEFT, CENTER);
  text('“' + queryText + '”', boxX + 12, boxY + 27);
}

// ----- Stage tracker (Retrieve / Augment / Generate) -----
function drawStageTracker() {
  let trackY = 92;
  let segW = (canvasWidth - 2 * margin) / 3;
  textAlign(CENTER, CENTER);
  textSize(15);
  for (let i = 0; i < 3; i++) {
    let cx = margin + segW * i + segW / 2;
    let active = (i === stageIndex);
    let done = (i < stageIndex);
    // connector arrow
    if (i > 0) {
      stroke('silver');
      strokeWeight(2);
      let ax = margin + segW * i;
      line(ax - 8, trackY, ax + 8, trackY);
      noStroke();
    }
    // pill
    if (active) {
      fill('steelblue');
    } else if (done) {
      fill('mediumseagreen');
    } else {
      fill('gainsboro');
    }
    stroke('silver');
    strokeWeight(1);
    rectMode(CENTER);
    rect(cx, trackY, segW - 24, 24, 12);
    rectMode(CORNER);
    noStroke();
    fill(active || done ? 'white' : 'dimgray');
    text(stageNames[i], cx, trackY);
  }
}

// ----- Stage 1: Retrieve -----
function drawRetrieveStage(top, bottom) {
  let x = margin;
  let w = canvasWidth - 2 * margin;

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Searching a 3-document knowledge source for the best match:', x, top);

  let docTop = top + 26;
  let available = bottom - docTop - 44;
  let gap = 10;
  let docH = (available - 2 * gap) / 3;

  for (let i = 0; i < knowledgeDocs.length; i++) {
    let d = knowledgeDocs[i];
    let dy = docTop + i * (docH + gap);
    let matched = d.isMatch === true;

    // Card
    if (matched) {
      fill('lightyellow');
      stroke('goldenrod');
      strokeWeight(2.5);
    } else {
      fill('white');
      stroke('silver');
      strokeWeight(1);
    }
    rect(x, dy, w, docH, 6);

    noStroke();
    // Doc id + title
    fill(matched ? 'darkgoldenrod' : 'dimgray');
    textStyle(BOLD);
    textSize(13);
    textAlign(LEFT, TOP);
    text(d.id + '  —  ' + d.title, x + 12, dy + 8);
    textStyle(NORMAL);

    // Body (clipped to a couple of lines)
    fill(matched ? 'black' : 'gray');
    textSize(12.5);
    text(d.body, x + 12, dy + 26, w - 24, docH - 30);

    // Match badge
    if (matched) {
      fill('goldenrod');
      noStroke();
      let badgeW = 118;
      rect(x + w - badgeW - 10, dy + 8, badgeW, 20, 10);
      fill('white');
      textStyle(BOLD);
      textSize(12);
      textAlign(CENTER, CENTER);
      text('✓ BEST MATCH', x + w - badgeW / 2 - 10, dy + 18);
      textStyle(NORMAL);
    }
  }

  // Caption explaining why this doc was selected
  drawCaption(x, bottom - 40, w,
    'Selected Doc 2: it shares the keywords "Universal Design for Learning" and matches the topic ' +
    'of the query. The other documents cover unrelated topics.');
}

// ----- Stage 2: Augment -----
function drawAugmentStage(top, bottom) {
  let x = margin;
  let w = canvasWidth - 2 * margin;

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('The query and the retrieved passage are combined into one augmented prompt:', x, top);

  let boxTop = top + 26;
  let boxH = bottom - boxTop - 44;

  // Augmented prompt block
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, boxTop, w, boxH, 6);
  noStroke();

  let pad = 14;
  let innerW = w - 2 * pad;
  let cy = boxTop + pad;

  // Original question (blue)
  fill('steelblue');
  textStyle(BOLD);
  textSize(13);
  textAlign(LEFT, TOP);
  text('ORIGINAL QUESTION (from the user)', x + pad, cy);
  cy += 18;
  fill('steelblue');
  textStyle(NORMAL);
  textSize(14);
  let qH = drawWrapped('“' + queryText + '”', x + pad, cy, innerW, 18);
  cy += qH + 12;

  // Inserted context (gold)
  fill('darkgoldenrod');
  textStyle(BOLD);
  textSize(13);
  text('INSERTED CONTEXT (from Doc 2, retrieved above)', x + pad, cy);
  cy += 18;
  fill('darkgoldenrod');
  textStyle(NORMAL);
  textSize(13.5);
  drawWrapped(retrievedPassage, x + pad, cy, innerW, 17);

  // Caption
  drawCaption(x, bottom - 40, w,
    'Blue is the user’s question; gold is the passage inserted from the knowledge source. ' +
    'The model now sees both together as a single prompt.');
}

// ----- Stage 3: Generate -----
function drawGenerateStage(top, bottom) {
  let x = margin;
  let w = canvasWidth - 2 * margin;

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('The model writes its final answer using the augmented prompt:', x, top);

  let boxTop = top + 26;
  let boxH = bottom - boxTop - 62;

  // Answer block
  fill('honeydew');
  stroke('mediumseagreen');
  strokeWeight(2);
  rect(x, boxTop, w, boxH, 6);
  noStroke();

  let pad = 14;
  let innerW = w - 2 * pad;

  fill('seagreen');
  textStyle(BOLD);
  textSize(13);
  textAlign(LEFT, TOP);
  text('GENERATED ANSWER', x + pad, boxTop + pad);

  // Answer text with the grounded phrase underlined
  fill('black');
  textStyle(NORMAL);
  textSize(15);
  drawAnswerWithUnderline(generatedAnswer, groundedPhrase,
    x + pad, boxTop + pad + 22, innerW, 20, 'darkgoldenrod');

  // Caption
  drawCaption(x, bottom - 58, w,
    'The underlined phrase came directly from the retrieved passage, not from the model’s memory. ' +
    'This is what "grounding" the answer means.');
}

// ----- Optional Without-RAG comparison box -----
function drawComparisonBox(top, h) {
  let x = margin;
  let w = canvasWidth - 2 * margin;
  let narrow = canvasWidth < 700;

  if (narrow) {
    // Stack vertically: split available height between the two answers
    let halfH = (h - 8) / 2;
    drawAnswerCard(x, top, w, halfH, 'Without RAG', withoutRagAnswer, 'indianred', 'mistyrose', null);
    drawAnswerCard(x, top + halfH + 8, w, halfH, 'With RAG', generatedAnswer, 'seagreen', 'honeydew', groundedPhrase);
  } else {
    let colW = (w - 12) / 2;
    drawAnswerCard(x, top, colW, h, 'Without RAG', withoutRagAnswer, 'indianred', 'mistyrose', null);
    drawAnswerCard(x + colW + 12, top, colW, h, 'With RAG', generatedAnswer, 'seagreen', 'honeydew', groundedPhrase);
  }
}

function drawAnswerCard(x, y, w, h, label, body, accent, bg, underlinePhrase) {
  fill(bg);
  stroke(accent);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill(accent);
  textStyle(BOLD);
  textSize(12.5);
  textAlign(LEFT, TOP);
  text(label.toUpperCase(), x + 10, y + 8);
  textStyle(NORMAL);

  fill('black');
  textSize(12.5);
  if (underlinePhrase) {
    drawAnswerWithUnderline(body, underlinePhrase, x + 10, y + 26, w - 20, 15, 'darkgoldenrod');
  } else {
    drawWrapped(body, x + 10, y + 26, w - 20, 15);
  }

  // Difference caption on the Without-RAG card
  if (label === 'Without RAG') {
    fill('firebrick');
    textStyle(ITALIC);
    textSize(11.5);
    text('Missing: the three-principles structure Chapter 16 defines.', x + 10, y + h - 30, w - 20, 26);
    textStyle(NORMAL);
  }
}

// ----- Caption helper (gray italic note) -----
function drawCaption(x, y, w, msg) {
  noStroke();
  fill('dimgray');
  textStyle(ITALIC);
  textSize(12.5);
  textAlign(LEFT, TOP);
  text(msg, x + 2, y, w - 4, 40);
  textStyle(NORMAL);
}

// ----- Word-wrap helper: returns height used -----
function drawWrapped(str, x, y, maxW, lineH) {
  let words = str.split(' ');
  let line = '';
  let cy = y;
  textAlign(LEFT, TOP);
  for (let i = 0; i < words.length; i++) {
    let test = line + words[i] + ' ';
    if (textWidth(test) > maxW && line.length > 0) {
      text(line.trim(), x, cy);
      line = words[i] + ' ';
      cy += lineH;
    } else {
      line = test;
    }
  }
  text(line.trim(), x, cy);
  return (cy - y) + lineH;
}

// ----- Word-wrap that underlines a target substring -----
function drawAnswerWithUnderline(str, phrase, x, y, maxW, lineH, underlineColor) {
  // Split into tokens, marking which fall inside the phrase.
  let idx = str.indexOf(phrase);
  let segments = [];
  if (idx >= 0) {
    if (idx > 0) segments.push({ t: str.substring(0, idx), u: false });
    segments.push({ t: phrase, u: true });
    let rest = str.substring(idx + phrase.length);
    if (rest.length > 0) segments.push({ t: rest, u: false });
  } else {
    segments.push({ t: str, u: false });
  }

  // Flatten to words carrying an underline flag.
  let words = [];
  for (let s of segments) {
    let parts = s.t.split(' ');
    for (let p of parts) {
      if (p.length > 0) words.push({ w: p, u: s.u });
    }
  }

  textAlign(LEFT, TOP);
  let cx = x;
  let cy = y;
  let spaceW = textWidth(' ');
  for (let i = 0; i < words.length; i++) {
    let ww = textWidth(words[i].w);
    if (cx + ww > x + maxW && cx > x) {
      cx = x;
      cy += lineH;
    }
    fill('black');
    text(words[i].w, cx, cy);
    if (words[i].u) {
      stroke(underlineColor);
      strokeWeight(1.5);
      line(cx, cy + lineH - 3, cx + ww, cy + lineH - 3);
      noStroke();
    }
    cx += ww + spaceW;
  }
  return (cy - y) + lineH;
}

// ----- Control labels + button state -----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Stage ' + (stageIndex + 1) + ' of 3', canvasWidth - 110, drawHeight + 25);
}

function updateButtonStates() {
  // Set the underlying DOM disabled property directly (robust across p5 versions).
  prevButton.elt.disabled = (stageIndex <= 0);
  nextButton.elt.disabled = (stageIndex >= 2);
}

function goNext() {
  if (stageIndex < 2) {
    stageIndex++;
    updateButtonStates();
  }
}

function goPrevious() {
  if (stageIndex > 0) {
    stageIndex--;
    updateButtonStates();
  }
}

// ----- Responsive plumbing -----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
