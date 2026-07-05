// Blocked vs. Interleaved Practice Simulator MicroSim
// CANVAS_HEIGHT: 540
// Bloom Level: Analyze (L4) - differentiate, compare, contrast, examine
// Learners run the SAME 12-problem set under a Blocked or Interleaved schedule and
// compare simulated in-practice accuracy against simulated one-week-delayed accuracy.
// The two accuracy patterns diverge: blocked feels easy now but fades; interleaved
// feels harder now but sticks. Bar values are pre-set illustrative values representing
// published research patterns, not a live experiment.

// ---- Standard responsive canvas globals ----
let canvasWidth = 400;          // initial width, updated responsively
let drawHeight = 490;           // drawing region height
let controlHeight = 50;         // control region height (1 row of controls)
let canvasHeight = drawHeight + controlHeight; // total = 540
let margin = 25;                // edge margin
let sliderLeftMargin = 140;     // kept for standard (no slider used here)
let defaultTextSize = 16;       // base text size

// ---- Concept types and colors ----
// B = graph traversal (blue), O = dependency validation (orange), G = taxonomy classification (green)
let conceptColors = {
  B: 'royalblue',
  O: 'darkorange',
  G: 'forestgreen'
};
let conceptNames = {
  B: 'Graph Traversal',
  O: 'Dependency Validation',
  G: 'Taxonomy Classification'
};

// Blocked order: grouped by concept. Interleaved: mixed so no two neighbors share a type.
let blockedOrder = ['B','B','B','B','O','O','O','O','G','G','G','G'];
let interleavedOrder = ['B','O','G','B','G','O','B','G','O','G','B','O'];

// Illustrative accuracy values (percent) - representative of the testing/interleaving literature.
let accuracyData = {
  blocked:     { inPractice: 90, delayed: 55 },
  interleaved: { inPractice: 70, delayed: 80 }
};

// Per-tile in-practice correctness marks, precomputed for the current run so the
// displayed check/X ratio matches the illustrative in-practice accuracy.
let tileMarks = []; // array of true(correct)/false(incorrect)

// ---- State ----
let schedule = 'blocked';       // 'blocked' | 'interleaved'
let runState = 'idle';          // 'idle' | 'running' | 'done'
let animIndex = 0;              // which tile the highlight is on during animation
let animTimer = 0;              // frame counter to pace the animation
let animFramesPerTile = 12;     // frames spent per tile
let showInPracticeBar = false;
let showDelayedBar = false;
let delayedRevealTimer = 0;     // frames before the delayed bar appears after in-practice

// ---- Controls ----
let scheduleToggleButton;
let runButton;
let resetButton;

// Layout: stack timeline above bars when narrow.
let stackBreakpoint = 640;

// Geometry recorded each frame for bar hover tooltips.
let barHitboxes = []; // {x,y,w,h,label,pct,explain}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Schedule toggle button (native control). Label shows the current schedule.
  scheduleToggleButton = createButton('Schedule: Blocked');
  scheduleToggleButton.parent(document.querySelector('main'));
  scheduleToggleButton.position(margin, drawHeight + 10);
  scheduleToggleButton.mousePressed(toggleSchedule);

  runButton = createButton('Run Simulated Session');
  runButton.parent(document.querySelector('main'));
  runButton.mousePressed(startRun);

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetSim);

  positionControls();

  describe('A practice-schedule simulator. Twelve problem tiles from three concept types ' +
    '(graph traversal in blue, dependency validation in orange, taxonomy classification in green) ' +
    'are arranged either Blocked (grouped by type) or Interleaved (mixed). Running a session ' +
    'animates a highlight across the tiles and then fills two bars: In-Practice Accuracy and ' +
    'Simulated One-Week-Later Accuracy. Blocked practice shows high in-practice but low delayed ' +
    'accuracy; interleaved shows lower in-practice but higher delayed accuracy.', LABEL);
}

// Place the three control buttons in a single row, spaced left to right.
function positionControls() {
  scheduleToggleButton.position(margin, drawHeight + 10);
  // Estimate widths so buttons do not overlap on narrow screens.
  let x2 = margin + 170;
  runButton.position(x2, drawHeight + 10);
  let x3 = x2 + 185;
  resetButton.position(x3, drawHeight + 10);
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

  // --- Title (after backgrounds, before content) ---
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Blocked vs. Interleaved Practice', canvasWidth / 2, 12);

  noStroke();
  fill('dimgray');
  textAlign(CENTER, TOP);
  textSize(13);
  text('Illustrative values representing published research patterns', canvasWidth / 2, 40);

  // Advance the run animation if in progress.
  updateAnimation();

  // Layout regions.
  let stacked = canvasWidth < stackBreakpoint;
  barHitboxes = [];

  if (stacked) {
    drawTimeline(margin, 64, canvasWidth - 2 * margin, 210);
    drawBars(margin, 288, canvasWidth - 2 * margin, drawHeight - 288 - margin);
  } else {
    // Left timeline ~420, right bars ~180 (proportional to available width).
    let gap = 20;
    let leftW = min(430, canvasWidth * 0.62);
    let topY = 64;
    let regionH = drawHeight - topY - margin;
    drawTimeline(margin, topY, leftW, regionH);
    let rightX = margin + leftW + gap;
    drawBars(rightX, topY, canvasWidth - rightX - margin, regionH);
  }

  // Draw hover tooltip on top of everything (if hovering a filled bar).
  drawBarTooltip();

  // Control-region status label.
  noStroke();
  fill('black');
  textAlign(RIGHT, CENTER);
  textSize(defaultTextSize);
  let status = runState === 'idle' ? 'Ready' :
               runState === 'running' ? 'Running...' : 'Session complete';
  text(status, canvasWidth - margin, drawHeight + 25);
}

// Draw the legend + the 12 problem tiles in the current schedule order.
function drawTimeline(x, y, w, h) {
  let order = (schedule === 'blocked') ? blockedOrder : interleavedOrder;

  // Section heading.
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Practice Session (' + (schedule === 'blocked' ? 'Blocked' : 'Interleaved') + ')',
    x, y);

  // Legend row. Measure each entry BEFORE placing it and wrap to a new line when it
  // would overflow, so no label is ever truncated on narrow viewports. Shrink the
  // legend text slightly on narrow canvases to keep all three swatches labeled.
  let legY = y + 26;
  let legKeys = ['B', 'O', 'G'];
  let lx = x;
  let legTextSize = (w < 340) ? 11 : 12;
  textSize(legTextSize);
  textAlign(LEFT, TOP);
  let swatch = 12;
  for (let k of legKeys) {
    let entryW = swatch + 4 + textWidth(conceptNames[k]) + 16;
    // If this entry would run past the region right edge, wrap to the next line first.
    if (lx > x && lx + entryW > x + w) {
      lx = x;
      legY += 18;
    }
    noStroke();
    fill(conceptColors[k]);
    rect(lx, legY, swatch, swatch, 2);
    noStroke();
    fill('black');
    text(conceptNames[k], lx + swatch + 4, legY);
    lx += entryW;
  }

  // Tile grid: up to 6 per row, two rows for 12 tiles.
  let gridTop = legY + 26;
  let perRow = 6;
  let rows = 2;
  let gapT = 8;
  let availW = w;
  let tileW = (availW - (perRow - 1) * gapT) / perRow;
  tileW = min(tileW, 66);
  let tileH = min(tileW, 52);

  for (let i = 0; i < order.length; i++) {
    let r = floor(i / perRow);
    let c = i % perRow;
    let tx = x + c * (tileW + gapT);
    let ty = gridTop + r * (tileH + 22);

    // Tile body.
    let isActive = (runState === 'running' && i === animIndex);
    let isPast = (runState === 'running' && i < animIndex) || runState === 'done';

    stroke(isActive ? 'black' : 'silver');
    strokeWeight(isActive ? 3 : 1);
    fill(conceptColors[order[i]]);
    rect(tx, ty, tileW, tileH, 6);

    // Order number inside tile.
    noStroke();
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(16);
    text(i + 1, tx + tileW / 2, ty + tileH / 2);

    // Per-tile correctness mark (check or X) once the highlight has passed it.
    if (isPast && tileMarks.length === order.length) {
      let correct = tileMarks[i];
      textSize(18);
      textAlign(CENTER, TOP);
      noStroke();
      if (correct) {
        fill('green');
        text('✓', tx + tileW / 2, ty + tileH + 2); // check mark
      } else {
        fill('crimson');
        text('✗', tx + tileW / 2, ty + tileH + 2); // X mark
      }
    }
  }

  // Prompt below tiles.
  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(13);
  let hintY = gridTop + rows * (tileH + 22) + 4;
  if (hintY < y + h - 14) {
    if (runState === 'idle') {
      text('Press "Run Simulated Session" to attempt each problem in order.', x, hintY);
    } else if (runState === 'done') {
      let ip = accuracyData[schedule].inPractice;
      text('In-practice accuracy this run: ' + ip + '% (' +
        round(ip / 100 * 12) + ' of 12 correct).', x, hintY);
    }
  }
}

// Draw the two accuracy bars for the current schedule.
function drawBars(x, y, w, h) {
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Accuracy', x, y);

  let data = accuracyData[schedule];

  // Bar chart geometry.
  let chartTop = y + 30;
  let chartBottom = y + h - 60;
  let chartH = chartBottom - chartTop;
  if (chartH < 60) chartH = 60;

  let barW = min(70, (w - 30) / 2 - 10);
  let gap = 30;
  let totalBarsW = barW * 2 + gap;
  let startX = x + max(0, (w - totalBarsW) / 2);

  // Baseline axis.
  stroke('silver');
  strokeWeight(1);
  line(x, chartBottom, x + w, chartBottom);

  // Y gridlines at 0/50/100.
  for (let pct = 0; pct <= 100; pct += 50) {
    let gy = chartBottom - (pct / 100) * chartH;
    stroke('gainsboro');
    strokeWeight(1);
    line(x, gy, x + w, gy);
    noStroke();
    fill('gray');
    textSize(11);
    textAlign(LEFT, CENTER);
    text(pct + '%', x, gy);
  }

  // Bar 1: In-Practice Accuracy.
  let b1x = startX;
  let b1val = showInPracticeBar ? data.inPractice : 0;
  drawSingleBar(b1x, chartBottom, barW, chartH, b1val, 'mediumseagreen',
    'In-Practice', showInPracticeBar);
  if (showInPracticeBar) {
    barHitboxes.push({
      x: b1x, y: chartBottom - (data.inPractice / 100) * chartH,
      w: barW, h: (data.inPractice / 100) * chartH,
      label: 'In-Practice Accuracy', pct: data.inPractice,
      explain: (schedule === 'blocked')
        ? 'Blocked in-practice accuracy is high because the concept type never changes, so each answer reuses the previous approach.'
        : 'Interleaved in-practice accuracy is lower because the concept type keeps changing, so it feels harder while practicing.'
    });
  }

  // Bar 2: Simulated 1-Week-Later Accuracy.
  let b2x = startX + barW + gap;
  let b2val = showDelayedBar ? data.delayed : 0;
  drawSingleBar(b2x, chartBottom, barW, chartH, b2val, 'slateblue',
    '1-Week Later', showDelayedBar);
  if (showDelayedBar) {
    barHitboxes.push({
      x: b2x, y: chartBottom - (data.delayed / 100) * chartH,
      w: barW, h: (data.delayed / 100) * chartH,
      label: 'Simulated 1-Week-Later Accuracy', pct: data.delayed,
      explain: (schedule === 'blocked')
        ? 'Blocked delayed accuracy drops because massed practice builds little durable retrieval strength.'
        : 'Interleaved delayed accuracy is higher because each retrieval required identifying the concept type first, strengthening memory.'
    });
  }

  // Contrast caption once both bars are shown.
  if (showDelayedBar) {
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    let capY = chartBottom + 20;
    if (schedule === 'blocked') {
      fill('saddlebrown');
      drawWrapped('Blocked: strong now (' + data.inPractice + '%), weak after a week (' +
        data.delayed + '%).', x, capY, w, 3);
    } else {
      fill('darkgreen');
      drawWrapped('Interleaved: weaker now (' + data.inPractice + '%), stronger after a week (' +
        data.delayed + '%).', x, capY, w, 3);
    }
  } else if (runState === 'idle') {
    noStroke();
    fill('gray');
    textAlign(LEFT, TOP);
    textSize(12);
    drawWrapped('Bars fill in after you run a session.', x, chartBottom + 20, w, 3);
  }
}

// Draw one bar with its value label and category label.
function drawSingleBar(bx, baseY, bw, chartH, value, col, label, filled) {
  let bh = (value / 100) * chartH;
  // Empty slot outline.
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(bx, baseY - chartH, bw, chartH, 3);

  if (filled && bh > 0) {
    noStroke();
    fill(col);
    rect(bx, baseY - bh, bw, bh, 3);
    // Value on top of bar.
    noStroke();
    fill('black');
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text(value + '%', bx + bw / 2, baseY - bh - 3);
  }

  // Category label under the bar.
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(12);
  text(label, bx + bw / 2, baseY + 4);
}

// Show a tooltip when the mouse hovers a filled bar.
function drawBarTooltip() {
  for (let hb of barHitboxes) {
    if (mouseX >= hb.x && mouseX <= hb.x + hb.w &&
        mouseY >= hb.y && mouseY <= hb.y + hb.h) {
      let tw = min(260, canvasWidth - 2 * margin);
      let pad = 8;
      let lines = wrapLines(hb.label + ': ' + hb.pct + '%. ' + hb.explain, tw - 2 * pad);
      let lineH = 16;
      let th = lines.length * lineH + 2 * pad;
      let tx = constrain(mouseX + 12, margin, canvasWidth - tw - margin);
      let ty = constrain(mouseY - th - 8, 8, drawHeight - th - 8);

      stroke('gray');
      strokeWeight(1);
      fill(255, 255, 240, 245);
      rect(tx, ty, tw, th, 6);

      noStroke();
      fill('black');
      textAlign(LEFT, TOP);
      textSize(12);
      for (let i = 0; i < lines.length; i++) {
        text(lines[i], tx + pad, ty + pad + i * lineH);
      }
      break; // only one tooltip at a time
    }
  }
}

// Advance the highlight animation and trigger bar reveals.
function updateAnimation() {
  if (runState === 'running') {
    animTimer++;
    if (animTimer >= animFramesPerTile) {
      animTimer = 0;
      animIndex++;
      if (animIndex >= 12) {
        // Animation finished: reveal in-practice bar, schedule delayed reveal.
        runState = 'done';
        animIndex = 12;
        showInPracticeBar = true;
        delayedRevealTimer = 45; // ~0.75s later
      }
    }
  }

  if (runState === 'done' && showInPracticeBar && !showDelayedBar) {
    if (delayedRevealTimer > 0) {
      delayedRevealTimer--;
      if (delayedRevealTimer === 0) {
        showDelayedBar = true;
      }
    }
  }
}

// ---- Control handlers ----
function toggleSchedule() {
  schedule = (schedule === 'blocked') ? 'interleaved' : 'blocked';
  scheduleToggleButton.html('Schedule: ' + (schedule === 'blocked' ? 'Blocked' : 'Interleaved'));
  resetRun(); // changing schedule clears any prior run
}

function startRun() {
  if (runState === 'running') return;
  // Build the per-tile correctness marks matching the illustrative in-practice accuracy.
  buildTileMarks();
  runState = 'running';
  animIndex = 0;
  animTimer = 0;
  showInPracticeBar = false;
  showDelayedBar = false;
  delayedRevealTimer = 0;
}

// Reset just the run (keep the selected schedule).
function resetRun() {
  runState = 'idle';
  animIndex = 0;
  animTimer = 0;
  showInPracticeBar = false;
  showDelayedBar = false;
  delayedRevealTimer = 0;
  tileMarks = [];
}

// Full reset: schedule back to Blocked and clear the run.
function resetSim() {
  schedule = 'blocked';
  scheduleToggleButton.html('Schedule: Blocked');
  resetRun();
}

// Create a deterministic pattern of correct/incorrect marks whose count of
// "correct" matches the illustrative in-practice accuracy for the schedule.
function buildTileMarks() {
  let ip = accuracyData[schedule].inPractice;      // e.g. 90 or 70
  let numCorrect = round(ip / 100 * 12);           // e.g. 11 or 8
  tileMarks = [];
  // Distribute the incorrect marks as evenly as possible across the 12 tiles.
  let numIncorrect = 12 - numCorrect;
  // Place incorrect marks at evenly spaced indices.
  let incorrectIndices = {};
  for (let k = 0; k < numIncorrect; k++) {
    let idx = floor((k + 0.5) * 12 / numIncorrect);
    incorrectIndices[constrain(idx, 0, 11)] = true;
  }
  for (let i = 0; i < 12; i++) {
    tileMarks.push(!incorrectIndices[i]);
  }
}

// ---- Text helpers ----
// Split text into lines that fit within maxW. Returns an array of strings.
function wrapLines(str, maxW) {
  let words = str.split(' ');
  let lines = [];
  let line = '';
  for (let n = 0; n < words.length; n++) {
    let test = line + words[n] + ' ';
    if (textWidth(test) > maxW && line.length > 0) {
      lines.push(line.trim());
      line = words[n] + ' ';
    } else {
      line = test;
    }
  }
  if (line.trim().length > 0) lines.push(line.trim());
  return lines;
}

// Draw wrapped text starting at (x,y). Returns the y after the last line.
function drawWrapped(str, x, y, maxW, lineGap) {
  let lines = wrapLines(str, maxW);
  let lineH = textAscent() + textDescent() + lineGap;
  for (let i = 0; i < lines.length; i++) {
    noStroke();
    text(lines[i], x, y + i * lineH);
  }
  return y + lines.length * lineH;
}

// ---- Responsive plumbing (must be at end) ----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls(); // no sliders to resize; reposition buttons for new width
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}
