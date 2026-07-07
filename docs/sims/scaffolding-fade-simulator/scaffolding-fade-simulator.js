// Scaffolding Fade Simulator MicroSim
// CANVAS_HEIGHT: 520
// Parameter-exploration MicroSim: the learner sets a Fade Rate, runs a 20-attempt
// simulation, and watches Support Level (blue, falling) and Simulated Mastery (gold,
// rising) evolve against a shaded green Zone of Proximal Development band. A status
// readout reports concrete numbers each attempt; a summary compares total mastery
// gained under Slow / Medium / Fast fade rates.
// Bloom Level: Apply (L3) - demonstrate, apply, practice
// MicroSim template version 2026.03

// ----- Standard responsive canvas globals -----
let canvasWidth = 800;          // initial width, reset responsively
let drawHeight = 440;           // top drawing region (chart + status/summary)
let controlHeight = 80;         // two control rows
let canvasHeight = drawHeight + controlHeight; // 520
let margin = 25;
let sliderLeftMargin = 250;     // room for two buttons + label + value before the slider
let defaultTextSize = 16;

// ----- Controls -----
let fadeSlider;                 // 0 = Slow, 1 = Medium, 2 = Fast
let runButton;
let resetButton;

// ----- Simulation constants (adjustable) -----
const TOTAL_ATTEMPTS = 20;      // number of simulated practice attempts
const INITIAL_SUPPORT = 90;     // starting Support Level (%)
const INITIAL_MASTERY = 10;     // starting Simulated Mastery (%)
const ZPD_HALF_WIDTH = 18;      // half-height of the ZPD band around the ideal support line (%)
// Fade steps: how many percentage points Support drops per attempt for each rate.
const FADE_STEPS = { 0: 2.2, 1: 4.2, 2: 8.0 }; // Slow, Medium, Fast
const FADE_LABELS = { 0: 'Slow', 1: 'Medium', 2: 'Fast' };
// Mastery growth model constants:
const MAX_GROWTH = 9.0;         // max mastery gain per attempt when support is ideal (%)
const FRUSTRATION_PENALTY = 0.85; // growth lost per % that support falls BELOW the ZPD band
const STAGNATION_PENALTY = 0.35;  // growth lost per % that support sits ABOVE the ZPD band

// The "ideal" support at a given mastery keeps the task just beyond current mastery
// (the essence of the ZPD). We model ideal support as mastery + ZPD_CENTER_OFFSET.
const ZPD_CENTER_OFFSET = 15;   // ideal support sits this far above current mastery (%)

// ----- Simulation state -----
let support = [];               // support[i]  = Support Level at attempt i
let mastery = [];               // mastery[i]  = Simulated Mastery at attempt i
let zpdLow = [];                // lower edge of ZPD band at attempt i
let zpdHigh = [];               // upper edge of ZPD band at attempt i
let inZPD = [];                 // was support within ZPD at attempt i?
let currentAttempt = 0;         // how many attempts have been revealed (0..TOTAL_ATTEMPTS)
let isRunning = false;
let framesPerStep = 8;          // animation pacing
let frameCounter = 0;
let statusMsg = 'Press "Run Simulation" to fade support across 20 practice attempts.';
let summary = null;             // {slow, medium, fast} totals, populated after a run

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Run button
  runButton = createButton('Run Simulation');
  runButton.parent(document.querySelector('main'));
  runButton.position(10, drawHeight + 10);
  runButton.mousePressed(runSimulation);

  // Reset button
  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(130, drawHeight + 10);
  resetButton.mousePressed(resetSimulation);

  // Fade Rate slider (0..2 integer -> Slow / Medium / Fast)
  fadeSlider = createSlider(0, 2, 1, 1); // default Medium
  fadeSlider.parent(document.querySelector('main'));
  fadeSlider.position(sliderLeftMargin, drawHeight + 12);
  fadeSlider.size(canvasWidth - sliderLeftMargin - margin);
  fadeSlider.input(onFadeChanged);

  precomputeSimulation();   // fill arrays for the default fade rate
  currentAttempt = 1;       // Stage 1: show starting values before running

  describe('A line chart over 20 practice attempts showing a blue Support Level curve that ' +
    'decreases and a gold Simulated Mastery curve that increases, against a shaded green Zone of ' +
    'Proximal Development band. A Fade Rate slider (Slow, Medium, Fast) sets how fast support is ' +
    'removed. Run Simulation animates the curves and a status line reports the numeric support and ' +
    'mastery at each attempt, plus a summary of total mastery gained under each fade rate.', LABEL);
}

// ----- Precompute the full 20-attempt simulation for the current fade rate -----
function precomputeSimulation() {
  let rate = fadeSlider ? fadeSlider.value() : 1;
  let step = FADE_STEPS[rate];

  support = [];
  mastery = [];
  zpdLow = [];
  zpdHigh = [];
  inZPD = [];

  let s = INITIAL_SUPPORT;
  let m = INITIAL_MASTERY;

  for (let i = 0; i < TOTAL_ATTEMPTS; i++) {
    // ZPD band is centered on the ideal support (mastery + offset).
    let idealSupport = m + ZPD_CENTER_OFFSET;
    let low = idealSupport - ZPD_HALF_WIDTH;
    let high = idealSupport + ZPD_HALF_WIDTH;

    let within = (s >= low && s <= high);

    support.push(s);
    mastery.push(m);
    zpdLow.push(low);
    zpdHigh.push(high);
    inZPD.push(within);

    // Mastery growth for the NEXT attempt depends on where support sits vs the ZPD band.
    let growth;
    if (within) {
      growth = MAX_GROWTH;                       // support is challenging but supported
    } else if (s < low) {
      // Support removed too fast -> frustration; growth falls off sharply.
      growth = MAX_GROWTH - FRUSTRATION_PENALTY * (low - s);
    } else {
      // Support too high (never removed) -> stagnation; mild growth penalty.
      growth = MAX_GROWTH - STAGNATION_PENALTY * (s - high);
    }
    growth = constrain(growth, 0, MAX_GROWTH);

    m = constrain(m + growth, 0, 100);
    s = constrain(s - step, 0, 100);
  }
}

// ----- Compute total mastery gained for an arbitrary fade rate (for the summary) -----
function totalMasteryForRate(rate) {
  let step = FADE_STEPS[rate];
  let s = INITIAL_SUPPORT;
  let m = INITIAL_MASTERY;
  for (let i = 0; i < TOTAL_ATTEMPTS; i++) {
    let idealSupport = m + ZPD_CENTER_OFFSET;
    let low = idealSupport - ZPD_HALF_WIDTH;
    let high = idealSupport + ZPD_HALF_WIDTH;
    let growth;
    if (s >= low && s <= high) {
      growth = MAX_GROWTH;
    } else if (s < low) {
      growth = MAX_GROWTH - FRUSTRATION_PENALTY * (low - s);
    } else {
      growth = MAX_GROWTH - STAGNATION_PENALTY * (s - high);
    }
    growth = constrain(growth, 0, MAX_GROWTH);
    m = constrain(m + growth, 0, 100);
    s = constrain(s - step, 0, 100);
  }
  return m - INITIAL_MASTERY;
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

  // Advance the animation one attempt every few frames while running.
  if (isRunning) {
    frameCounter++;
    if (frameCounter >= framesPerStep) {
      frameCounter = 0;
      currentAttempt++;
      updateStatusForAttempt(currentAttempt - 1);
      if (currentAttempt >= TOTAL_ATTEMPTS) {
        currentAttempt = TOTAL_ATTEMPTS;
        isRunning = false;
        runButton.html('Run Simulation');
        buildSummary();
      }
    }
  }

  // Decide layout: chart on the left, panel on the right (or stacked when narrow).
  let narrow = canvasWidth < 600;
  let panelW = narrow ? canvasWidth - 2 * margin : 210;
  let chartLeft = margin + 42;
  let chartRight = narrow ? canvasWidth - margin : canvasWidth - panelW - margin - 15;
  let chartTop = 78;
  let chartBottom = narrow ? drawHeight - 150 : drawHeight - margin;

  drawChart(chartLeft, chartRight, chartTop, chartBottom);

  // Title (after grid/axes)
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Scaffolding Fade Simulator', canvasWidth / 2, 8);

  // Legend under the title
  drawLegend(chartLeft, 40);

  // Status / readout panel
  if (narrow) {
    drawStatusPanel(margin, drawHeight - 142, canvasWidth - 2 * margin, 118, true);
  } else {
    drawStatusPanel(chartRight + 15, chartTop, panelW, chartBottom - chartTop, false);
  }

  // Control labels
  drawControlLabels();

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

// ----- Chart with ZPD band + two curves -----
function drawChart(left, right, top, bottom) {
  let plotW = right - left;
  let plotH = bottom - top;

  // Map helpers
  let xAt = (i) => left + (plotW * i) / (TOTAL_ATTEMPTS - 1);
  let yAt = (v) => bottom - (plotH * v) / 100;

  // Gridlines + Y labels (0..100)
  stroke('gainsboro');
  strokeWeight(1);
  noFill();
  for (let v = 0; v <= 100; v += 20) {
    let gy = yAt(v);
    line(left, gy, right, gy);
    noStroke();
    fill('gray');
    textAlign(RIGHT, CENTER);
    textSize(11);
    text(v + '%', left - 6, gy);
    stroke('gainsboro');
  }
  noStroke();

  // ZPD shaded band (green) across all revealed attempts
  fill(60, 179, 113, 60); // mediumseagreen, translucent
  noStroke();
  beginShape();
  let lastRevealed = min(currentAttempt, TOTAL_ATTEMPTS);
  for (let i = 0; i < lastRevealed; i++) {
    vertex(xAt(i), yAt(zpdHigh[i]));
  }
  for (let i = lastRevealed - 1; i >= 0; i--) {
    vertex(xAt(i), yAt(zpdLow[i]));
  }
  endShape(CLOSE);

  // Axes
  stroke('dimgray');
  strokeWeight(1.5);
  line(left, top, left, bottom);       // Y axis
  line(left, bottom, right, bottom);   // X axis
  noStroke();

  // X-axis ticks/labels (attempts 1,5,10,15,20)
  fill('gray');
  textSize(11);
  textAlign(CENTER, TOP);
  for (let a of [1, 5, 10, 15, 20]) {
    let gx = xAt(a - 1);
    stroke('dimgray');
    line(gx, bottom, gx, bottom + 4);
    noStroke();
    text(a, gx, bottom + 6);
  }

  // Axis titles
  fill('dimgray');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Practice Attempt (1–20)', (left + right) / 2, bottom + 20);
  push();
  translate(left - 34, (top + bottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Level (0–100%)', 0, 0);
  pop();

  if (lastRevealed < 1) return;

  // ZPD band edge labels (once, near the top-right of the band)
  noStroke();
  fill('seagreen');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('ZPD zone', xAt(0) + 4, yAt(zpdHigh[0]) - 8);

  // Support Level curve (blue)
  stroke('steelblue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < lastRevealed; i++) vertex(xAt(i), yAt(support[i]));
  endShape();

  // Simulated Mastery curve (gold)
  stroke('goldenrod');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < lastRevealed; i++) vertex(xAt(i), yAt(mastery[i]));
  endShape();

  // End-point dots + inline numeric values (Stage 2: plain numbers, not just curves)
  let li = lastRevealed - 1;
  noStroke();
  fill('steelblue');
  circle(xAt(li), yAt(support[li]), 8);
  fill('goldenrod');
  circle(xAt(li), yAt(mastery[li]), 8);

  // Numeric callouts near the last point
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  fill('steelblue');
  text(nf(support[li], 0, 0) + '%', xAt(li) + 8, yAt(support[li]));
  fill('goldenrod');
  text(nf(mastery[li], 0, 0) + '%', xAt(li) + 8, yAt(mastery[li]));
  textStyle(NORMAL);
}

function drawLegend(x, y) {
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  // Support swatch
  fill('steelblue');
  rect(x, y, 16, 4, 2);
  fill('black');
  text('Support Level', x + 22, y + 2);
  // Mastery swatch
  let x2 = x + 130;
  fill('goldenrod');
  rect(x2, y, 16, 4, 2);
  fill('black');
  text('Simulated Mastery', x2 + 22, y + 2);
}

// ----- Status / readout + summary panel -----
function drawStatusPanel(x, y, w, h, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();

  let pad = 12;
  let cy = y + pad;

  fill('black');
  textStyle(BOLD);
  textSize(14);
  textAlign(LEFT, TOP);
  let atShown = constrain(currentAttempt, 1, TOTAL_ATTEMPTS);
  text('Attempt ' + atShown + ' of ' + TOTAL_ATTEMPTS, x + pad, cy);
  textStyle(NORMAL);
  cy += 22;

  // Current numeric values
  let li = atShown - 1;
  textSize(13);
  fill('steelblue');
  text('Support:  ' + nf(support[li], 0, 0) + '%', x + pad, cy);
  cy += 18;
  fill('goldenrod');
  text('Mastery:  ' + nf(mastery[li], 0, 0) + '%', x + pad, cy);
  cy += 18;
  fill('seagreen');
  text('ZPD band: ' + nf(zpdLow[li], 0, 0) + '–' + nf(zpdHigh[li], 0, 0) + '%', x + pad, cy);
  cy += 22;

  // Status message (in/out of ZPD explanation)
  let boxH = narrow ? h - (cy - y) - pad : 92;
  let statusColor = 'dimgray';
  if (inZPD[li]) statusColor = 'seagreen';
  else if (support[li] < zpdLow[li]) statusColor = 'firebrick';
  else statusColor = 'darkorange';

  fill(statusColor);
  textSize(12.5);
  text(statusMsg, x + pad, cy, w - 2 * pad, boxH);

  // Summary (after a completed run), shown at the bottom if room / or in narrow layout
  if (summary && !narrow) {
    let sy = y + h - 92;
    stroke('gainsboro');
    line(x + pad, sy - 6, x + w - pad, sy - 6);
    noStroke();
    fill('black');
    textStyle(BOLD);
    textSize(12.5);
    text('Total mastery gained:', x + pad, sy);
    textStyle(NORMAL);
    sy += 18;
    drawSummaryRow(x + pad, sy, 'Slow', summary.slow, 0); sy += 16;
    drawSummaryRow(x + pad, sy, 'Medium', summary.medium, 1); sy += 16;
    drawSummaryRow(x + pad, sy, 'Fast', summary.fast, 2);
  }

  if (summary && narrow) {
    // In narrow mode place the summary as a compact inline line.
    let sy = y + h - 20;
    fill('black');
    textSize(12);
    text('Totals — Slow +' + nf(summary.slow, 0, 0) + ' | Med +' + nf(summary.medium, 0, 0) +
         ' | Fast +' + nf(summary.fast, 0, 0), x + pad, sy);
  }
}

function drawSummaryRow(x, y, label, val, rate) {
  let current = (fadeSlider.value() === rate);
  fill(current ? 'black' : 'gray');
  textStyle(current ? BOLD : NORMAL);
  textSize(12);
  textAlign(LEFT, TOP);
  text(label + ':', x, y);
  // small bar
  let bx = x + 62;
  let bw = map(val, 0, 90, 0, 90);
  fill('goldenrod');
  noStroke();
  rect(bx, y + 2, bw, 9, 2);
  fill(current ? 'black' : 'gray');
  text('+' + nf(val, 0, 0) + '%', bx + 96, y);
  textStyle(NORMAL);
}

// ----- Status text builder for a given attempt -----
function updateStatusForAttempt(i) {
  i = constrain(i, 0, TOTAL_ATTEMPTS - 1);
  let s = nf(support[i], 0, 0);
  if (inZPD[i]) {
    statusMsg = 'Support (' + s + '%) is within the learner’s ZPD — the task is challenging but ' +
      'reachable, so mastery is growing steadily.';
  } else if (support[i] < zpdLow[i]) {
    statusMsg = 'Support removed too fast — support (' + s + '%) has dropped below the ZPD. ' +
      'Frustration detected: mastery growth is stalling.';
  } else {
    statusMsg = 'Support (' + s + '%) is still above the ZPD — the task is too easy. ' +
      'Stagnation: little new mastery is being gained.';
  }
}

function buildSummary() {
  summary = {
    slow: totalMasteryForRate(0),
    medium: totalMasteryForRate(1),
    fast: totalMasteryForRate(2)
  };
}

// ----- Control labels -----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  let rate = fadeSlider.value();
  text('Fade Rate: ' + FADE_LABELS[rate], 200, drawHeight + 55);
}

// ----- Control handlers -----
function runSimulation() {
  if (isRunning) return;
  // Fresh run from the start using the current fade rate.
  precomputeSimulation();
  currentAttempt = 1;
  frameCounter = 0;
  summary = null;
  updateStatusForAttempt(0);
  isRunning = true;
  runButton.html('Running…');
}

function resetSimulation() {
  isRunning = false;
  runButton.html('Run Simulation');
  precomputeSimulation();
  currentAttempt = 1;
  frameCounter = 0;
  summary = null;
  statusMsg = 'Starting values: Support ' + INITIAL_SUPPORT + '%, Mastery ' + INITIAL_MASTERY +
    '%. Press "Run Simulation".';
}

function onFadeChanged() {
  // Changing the fade rate re-primes the (not-yet-run) simulation and clears results.
  if (!isRunning) {
    precomputeSimulation();
    currentAttempt = 1;
    summary = null;
    statusMsg = 'Fade Rate set to ' + FADE_LABELS[fadeSlider.value()] +
      '. Press "Run Simulation" to see the effect.';
  }
}

// ----- Responsive plumbing -----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  fadeSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
