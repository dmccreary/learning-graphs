// Similarity Metric Comparison Tool MicroSim
// CANVAS_HEIGHT: 600
// Apply-level MicroSim: the learner picks a comparison type (Concept / Student / Content),
// adjusts ten sliders forming two 5-dimensional feature vectors (A in blue, B in orange),
// and watches the cosine-similarity score recompute live on a color-coded gauge with a
// plain-language interpretation. Randomize / Make Identical / Make Opposite buttons make
// the extreme cases concrete. The same cosine formula drives all three comparison types.
// Bloom Level: Apply (L3) - apply, calculate, demonstrate, use
// MicroSim template version 2026.03

// ----- Standard responsive canvas globals -----
let canvasWidth = 820;          // initial width, reset responsively
let drawHeight = 490;           // top drawing region (sliders + score gauge)
let controlHeight = 110;        // controls: selector row + two button rows
let canvasHeight = drawHeight + controlHeight; // 600
let margin = 25;
let sliderLeftMargin = 200;     // (template consistency; feature sliders are positioned individually)
let defaultTextSize = 16;

// ----- Controls -----
let typeSelect;                 // comparison-type selector
let randomizeButton;
let identicalButton;
let oppositeButton;

// Ten feature sliders: aSliders[0..4] and bSliders[0..4], each 0..10.
let aSliders = [];
let bSliders = [];

const NUM_FEATURES = 5;
const SLIDER_MIN = 0;
const SLIDER_MAX = 10;

// ----- Label sets keyed by comparison type -----
const LABEL_SETS = {
  student: {
    title: 'Student Similarity',
    aName: 'Learner A',
    bName: 'Learner B',
    unit: 'These two students',
    features: [
      'Mastered: Graph Theory',
      'Mastered: Taxonomy',
      'Mastered: Cognitive Load',
      'Quiz Accuracy',
      'Time on Task'
    ],
    defA: [7, 6, 8, 7, 5],
    defB: [6, 7, 7, 8, 6]
  },
  concept: {
    title: 'Concept Similarity',
    aName: 'Concept A',
    bName: 'Concept B',
    unit: 'These two concepts',
    features: [
      'Abstractness',
      'Prerequisite Depth',
      'Math Content',
      'Visual Content',
      'Domain: Graph Theory'
    ],
    defA: [8, 6, 7, 4, 9],
    defB: [7, 7, 6, 5, 8]
  },
  content: {
    title: 'Content Similarity',
    aName: 'Item A',
    bName: 'Item B',
    unit: 'These two content items',
    features: [
      'Reading Level',
      'Interactivity',
      'Length',
      'Topic: Personalization',
      'Media: Diagrams'
    ],
    defA: [6, 8, 5, 9, 7],
    defB: [7, 7, 6, 8, 8]
  }
};

let currentType = 'student';    // default per spec
let highlightIndex = -1;        // slider row briefly highlighted after a change
let highlightSide = '';         // 'A' or 'B'
let highlightTimer = 0;         // frames remaining for highlight
let caption = 'Identical vectors always produce the maximum similarity score of 1.00.';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Comparison-type selector
  typeSelect = createSelect();
  typeSelect.parent(document.querySelector('main'));
  typeSelect.option('Concept Similarity', 'concept');
  typeSelect.option('Student Similarity', 'student');
  typeSelect.option('Content Similarity', 'content');
  typeSelect.selected('student');
  typeSelect.changed(onTypeChanged);
  typeSelect.position(120, drawHeight + 12);

  // Create the ten feature sliders.
  for (let i = 0; i < NUM_FEATURES; i++) {
    let sa = createSlider(SLIDER_MIN, SLIDER_MAX, 5, 1);
    sa.parent(document.querySelector('main'));
    sa.input((function(idx){ return function(){ flagChange(idx, 'A'); }; })(i));
    aSliders.push(sa);

    let sb = createSlider(SLIDER_MIN, SLIDER_MAX, 5, 1);
    sb.parent(document.querySelector('main'));
    sb.input((function(idx){ return function(){ flagChange(idx, 'B'); }; })(i));
    bSliders.push(sb);
  }

  // Action buttons (row 2 of controls)
  randomizeButton = createButton('Randomize Both Vectors');
  randomizeButton.parent(document.querySelector('main'));
  randomizeButton.position(10, drawHeight + 48);
  randomizeButton.mousePressed(randomizeVectors);

  identicalButton = createButton('Make Identical');
  identicalButton.parent(document.querySelector('main'));
  identicalButton.position(180, drawHeight + 48);
  identicalButton.mousePressed(makeIdentical);

  oppositeButton = createButton('Make Opposite');
  oppositeButton.parent(document.querySelector('main'));
  oppositeButton.position(300, drawHeight + 48);
  oppositeButton.mousePressed(makeOpposite);

  // Default state: all sliders at mid-range (5) -> identical vectors -> score ~1.00.
  setAllSliders([5, 5, 5, 5, 5], [5, 5, 5, 5, 5]);

  layoutSliders();

  describe('An interactive cosine-similarity calculator. A selector chooses Concept, Student, or ' +
    'Content similarity, relabeling five feature dimensions. Ten sliders set two five-dimensional ' +
    'vectors (A in blue, B in orange). The cosine similarity score updates live on a color-coded ' +
    'gauge from red (low) to green (high) with a plain-language interpretation. Buttons randomize ' +
    'the vectors, make them identical (score 1.00), or make them opposite (low score).', LABEL);
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

  // Title (after background)
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Similarity Metric Comparison Tool', canvasWidth / 2, 8);

  // Subtitle: current comparison type + A/B legend
  let set = LABEL_SETS[currentType];
  textSize(13);
  fill('dimgray');
  textAlign(CENTER, TOP);
  text('Cosine similarity of two 5-D vectors  •  ' + set.title, canvasWidth / 2, 34);

  // Legend swatches
  drawABLegend(set);

  // Feature slider labels + value readouts (sliders themselves are DOM elements)
  drawFeatureRows(set);

  // Score gauge + interpretation
  let sim = cosineSimilarity(getVector(aSliders), getVector(bSliders));
  drawScoreGauge(sim, set);

  // Decrement highlight timer
  if (highlightTimer > 0) {
    highlightTimer--;
    if (highlightTimer === 0) { highlightIndex = -1; highlightSide = ''; }
  }

  // Control labels
  drawControlLabels();

  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

// ----- A/B legend near the top -----
function drawABLegend(set) {
  let cx = canvasWidth / 2;
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  let y = 56;
  // A swatch (blue)
  fill('steelblue');
  rect(cx - 150, y - 6, 14, 12, 3);
  fill('black');
  text(set.aName, cx - 132, y);
  // B swatch (orange)
  fill('darkorange');
  rect(cx + 20, y - 6, 14, 12, 3);
  fill('black');
  text(set.bName, cx + 38, y);
}

// ----- Feature rows: label + A value + B value, aligned to the DOM sliders -----
function drawFeatureRows(set) {
  let narrow = canvasWidth < 700;
  let rowsTop = 78;
  let rowH = getRowH();

  for (let i = 0; i < NUM_FEATURES; i++) {
    let rowY = rowsTop + i * rowH;
    let geom = rowGeometry(i);

    // Highlight background if this row's slider just changed
    if (highlightIndex === i) {
      noStroke();
      fill(255, 244, 200); // pale gold highlight
      rect(margin - 6, rowY - 4, canvasWidth - 2 * (margin - 6), rowH - 6, 6);
    }

    // Feature name
    noStroke();
    fill('black');
    textStyle(BOLD);
    textSize(narrow ? 12.5 : 13.5);
    textAlign(LEFT, TOP);
    text((i + 1) + '. ' + set.features[i], margin, rowY);
    textStyle(NORMAL);

    // A value (blue) and B value (orange) readouts to the left of each slider
    textSize(13);
    textAlign(LEFT, CENTER);
    fill('steelblue');
    text('A: ' + aSliders[i].value(), geom.labelX, geom.aY + 8);
    fill('darkorange');
    text('B: ' + bSliders[i].value(), geom.labelX, geom.bY + 8);
  }
}

// ----- Score gauge + plain-language interpretation -----
function drawScoreGauge(sim, set) {
  let gaugeTop = drawHeight - 96;
  let x = margin;
  let w = canvasWidth - 2 * margin;

  // Divider
  stroke('gainsboro');
  strokeWeight(1);
  line(x, gaugeTop - 10, x + w, gaugeTop - 10);
  noStroke();

  // Large numeric score
  let scoreColor = scoreToColor(sim);
  fill('black');
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(15);
  text('Cosine Similarity', x, gaugeTop + 4);
  textStyle(NORMAL);

  fill(scoreColor);
  textSize(40);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(nf(sim, 1, 2), x, gaugeTop + 34);
  textStyle(NORMAL);

  // Horizontal bar gauge (red -> yellow -> green gradient background, filled to score)
  let barX = x + 130;
  let barY = gaugeTop + 24;
  let barW = w - 130;
  let barH = 22;

  // Gradient background
  for (let i = 0; i < barW; i++) {
    let t = i / barW;
    let col = lerpColor(lerpColor(color('crimson'), color('gold'), min(t * 2, 1)),
                        color('mediumseagreen'), max((t - 0.5) * 2, 0));
    stroke(col);
    line(barX + i, barY, barX + i, barY + barH);
  }
  noStroke();
  // Track outline
  noFill();
  stroke('silver');
  strokeWeight(1);
  rect(barX, barY, barW, barH, 4);
  noStroke();

  // Marker at the current score
  let markerX = barX + barW * constrain(sim, 0, 1);
  fill('black');
  triangle(markerX - 6, barY - 8, markerX + 6, barY - 8, markerX, barY);
  stroke('black');
  strokeWeight(2);
  line(markerX, barY, markerX, barY + barH);
  noStroke();

  // 0 and 1 end labels
  fill('gray');
  textSize(11);
  textAlign(LEFT, TOP);
  text('0.0  (no similarity)', barX, barY + barH + 3);
  textAlign(RIGHT, TOP);
  text('1.0  (identical direction)', barX + barW, barY + barH + 3);

  // Plain-language interpretation
  let interp;
  if (sim >= 0.8) interp = set.unit + ' are highly similar.';
  else if (sim >= 0.6) interp = set.unit + ' are moderately similar.';
  else if (sim >= 0.3) interp = set.unit + ' are only somewhat similar.';
  else interp = set.unit + ' have little in common.';

  fill('black');
  textStyle(BOLD);
  textSize(14);
  textAlign(LEFT, TOP);
  text(interp, x, gaugeTop + 60);
  textStyle(NORMAL);

  // Rotating caption from the interaction stages
  fill('dimgray');
  textStyle(ITALIC);
  textSize(11.5);
  text(caption, x + 300, gaugeTop + 60, w - 300, 34);
  textStyle(NORMAL);
}

// ----- Cosine similarity of two vectors -----
function cosineSimilarity(vecA, vecB) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    na += vecA[i] * vecA[i];
    nb += vecB[i] * vecB[i];
  }
  if (na === 0 || nb === 0) return 0; // zero vector has undefined direction -> treat as 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function getVector(sliders) {
  return sliders.map(s => s.value());
}

function scoreToColor(sim) {
  // red (low) -> gold (mid) -> green (high)
  if (sim < 0.5) return lerpColor(color('crimson'), color('goldenrod'), sim / 0.5);
  return lerpColor(color('goldenrod'), color('seagreen'), (sim - 0.5) / 0.5);
}

// ----- Control labels -----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Compare:', 10, drawHeight + 24);
}

// ----- Slider change tracking -----
function flagChange(index, side) {
  highlightIndex = index;
  highlightSide = side;
  highlightTimer = 45; // ~0.75s at 60fps
  caption = 'Score recomputes live as you drag. Raising a shared feature on both A and B pushes ' +
    'the score up; pulling them apart pushes it down.';
}

// ----- Buttons -----
function randomizeVectors() {
  for (let i = 0; i < NUM_FEATURES; i++) {
    aSliders[i].value(floor(random(SLIDER_MIN, SLIDER_MAX + 1)));
    bSliders[i].value(floor(random(SLIDER_MIN, SLIDER_MAX + 1)));
  }
  caption = 'Random vectors usually land in the middle range — some agreement, some disagreement.';
}

function makeIdentical() {
  for (let i = 0; i < NUM_FEATURES; i++) {
    bSliders[i].value(aSliders[i].value());
  }
  caption = 'Identical vectors point the same direction, so cosine similarity is exactly 1.00.';
}

function makeOpposite() {
  // Configure A and B into a genuinely divergent (near-orthogonal) pair so the
  // score drops close to its minimum, making the teaching point unmistakable.
  //
  // Cosine similarity measures agreement in *direction*. Because features are
  // non-negative (0..10) two vectors can never be perfectly anti-parallel (that
  // needs negative components), so the lowest achievable score puts each vector's
  // weight on DIFFERENT dimensions. We give A its strongest emphasis on its
  // current top two dimensions and give B the complementary two dimensions, so the
  // two vectors barely overlap. This reliably yields a low score (well under 0.3)
  // even from a uniform starting point, and drives home that individually "large"
  // values do not matter — only whether the vectors agree in direction.
  let aVals = getVector(aSliders);
  // Rank dimensions by A value, descending (ties -> lower index first).
  let order = aVals.map((v, i) => i).sort((p, q) => {
    if (aVals[p] === aVals[q]) return p - q;
    return aVals[q] - aVals[p];
  });
  // A keeps strong values on its top two dimensions, weak elsewhere.
  // B takes the complementary (bottom two) dimensions, weak on A's strong ones.
  let aTop = [order[0], order[1]];
  let bTop = [order[NUM_FEATURES - 1], order[NUM_FEATURES - 2]];
  for (let i = 0; i < NUM_FEATURES; i++) {
    if (aTop.indexOf(i) !== -1) aSliders[i].value(SLIDER_MAX);
    else aSliders[i].value(1);
  }
  for (let i = 0; i < NUM_FEATURES; i++) {
    if (bTop.indexOf(i) !== -1) bSliders[i].value(SLIDER_MAX);
    else bSliders[i].value(1);
  }
  caption = 'Divergent vectors produce a low score — being individually "large" does not matter, ' +
    'only whether the two vectors agree in direction.';
}

function setAllSliders(aVals, bVals) {
  for (let i = 0; i < NUM_FEATURES; i++) {
    aSliders[i].value(aVals[i]);
    bSliders[i].value(bVals[i]);
  }
}

function onTypeChanged() {
  currentType = typeSelect.value();
  let set = LABEL_SETS[currentType];
  // Load this type's preset default vectors and recompute (Final stage requirement).
  setAllSliders(set.defA.slice(), set.defB.slice());
  caption = 'Same cosine formula, new features: switching comparison type reloads its preset ' +
    'vectors and recomputes the identical way.';
}

// ----- Slider geometry / layout -----
function getRowH() {
  let narrow = canvasWidth < 700;
  return narrow ? 66 : 62;
}

// Returns the geometry for feature row i: where its A and B sliders and value label sit.
function rowGeometry(i) {
  let narrow = canvasWidth < 700;
  let rowsTop = 78;
  let rowH = getRowH();
  let rowY = rowsTop + i * rowH;

  // Value labels sit just under the feature name; sliders to the right of the labels.
  let labelX = margin;
  let aY = rowY + 18;
  let bY = rowY + 38;
  return { rowY: rowY, labelX: labelX, aY: aY, bY: bY, narrow: narrow };
}

// Position/size the DOM sliders to align with the drawn rows.
function layoutSliders() {
  let narrow = canvasWidth < 700;
  // Sliders start after the value readout column.
  let sliderX = narrow ? margin + 70 : margin + 70;
  let sliderW = canvasWidth - sliderX - margin;

  for (let i = 0; i < NUM_FEATURES; i++) {
    let g = rowGeometry(i);
    aSliders[i].position(sliderX, g.aY);
    aSliders[i].size(sliderW);
    bSliders[i].position(sliderX, g.bY);
    bSliders[i].size(sliderW);
  }
}

// ----- Responsive plumbing -----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
