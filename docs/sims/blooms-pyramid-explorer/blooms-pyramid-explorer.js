// Bloom's Taxonomy Pyramid Explorer MicroSim - p5.js
// CANVAS_HEIGHT: 600
// Bloom level of this MicroSim: Remember (L1) - click a tier to recall its
// name, its position in the six-level hierarchy, and its associated verbs.
// The learner SEES every element: the six-tier pyramid and an infobox that
// shows the selected level's definition, verbs, and one worked example drawn
// from this book's own concept list.
// Width-responsive: infobox sits to the right of the pyramid on wide viewports
// and reflows below the pyramid on narrow viewports.
// MicroSim template version 2026.03

// ----- Canvas / layout globals (single source of truth) -----
let canvasWidth = 400;            // responsive; set from container width
let drawHeight = 550;             // top drawing region (no controls here)
let controlHeight = 50;           // one row of controls
let canvasHeight = drawHeight + controlHeight; // 600 - matches // CANVAS_HEIGHT
let margin = 25;                  // outer margin for drawing elements
let sliderLeftMargin = 140;       // standard slider left margin (no sliders here)
let defaultTextSize = 16;         // base text size

// Reflow threshold: below this internal width the infobox stacks under the pyramid
let reflowWidth = 600;

// ----- Reset View button -----
let resetButton;

// ----- Interaction state -----
let selectedLevel = -1;  // -1 = none selected (default state)
let hoverLevel = -1;     // tier currently under the mouse (-1 = none)

// Tier geometry is recomputed every frame (responsive) and cached here so the
// mouse handlers can hit-test against the same trapezoids that were drawn.
let tierPolys = [];      // array of {level, pts:[{x,y}...], cx, cy}

// ----- The six cognitive-domain levels (bottom -> top) -----
// levels[0] is the base (Remembering, L1); levels[5] is the peak (Creating, L6).
// Colors run along a single blue-to-gold gradient to show increasing complexity
// without implying any level is more "correct" than another.
let levels = [
  {
    num: 1,
    name: 'Remembering',
    color: '#1f4e9e', // deep blue (base)
    definition: 'Recall facts, terms, and basic concepts from memory.',
    verbs: 'identify, recall, name, list, define, label, recognize',
    example: 'Name the three concept types used in a learning graph: foundation, term, and goal.'
  },
  {
    num: 2,
    name: 'Understanding',
    color: '#2f6fb0', // blue
    definition: 'Explain ideas or concepts in your own words.',
    verbs: 'explain, summarize, interpret, classify, compare, contrast, exemplify, infer',
    example: 'Explain why a concept dependency graph must be a directed acyclic graph (no cycles).'
  },
  {
    num: 3,
    name: 'Applying',
    color: '#4f97b8', // teal-blue
    definition: 'Use information in new but familiar situations.',
    verbs: 'apply, use, implement, solve, demonstrate, compute, execute',
    example: 'Use a topological sort to order a set of concepts into a valid teaching sequence.'
  },
  {
    num: 4,
    name: 'Analyzing',
    color: '#8fb98a', // sage green
    definition: 'Break information into parts and see how the parts relate.',
    verbs: 'analyze, differentiate, organize, compare, deconstruct, attribute, outline',
    example: 'Differentiate a structural check from a coverage check on a learning graph.'
  },
  {
    num: 5,
    name: 'Evaluating',
    color: '#d9b24a', // gold-amber
    definition: 'Justify a decision or judge the value of ideas or work.',
    verbs: 'evaluate, judge, critique, justify, defend, assess, prioritize',
    example: 'Judge whether two candidate learning graphs cover the course goals equally well.'
  },
  {
    num: 6,
    name: 'Creating',
    color: '#f2c437', // bright gold (peak)
    definition: 'Combine parts to form a new, coherent whole or original product.',
    verbs: 'create, design, construct, generate, compose, plan, produce',
    example: 'Design a new learning graph for a course from its list of concepts and goals.'
  }
];

function setup() {
  updateCanvasSize(); // MUST be first: reads container width into canvasWidth
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Native p5 control: Reset View button clears the selected infobox.
  resetButton = createButton('Reset View');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(10, drawHeight + 10);
  resetButton.mousePressed(resetView);

  describe(
    'An interactive six-tier Bloom\'s Taxonomy pyramid. From bottom to top the ' +
    'tiers are Remembering (L1), Understanding (L2), Applying (L3), Analyzing (L4), ' +
    'Evaluating (L5), and Creating (L6), colored along a blue-to-gold gradient. ' +
    'Click any tier to show its definition, its list of Bloom action verbs, and one ' +
    'example objective drawn from this book. A Reset View button clears the selection.',
    LABEL
  );
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

  // Decide layout: side-by-side (wide) or stacked (narrow).
  let stacked = canvasWidth < reflowWidth;

  // Compute the pyramid drawing box and the infobox rectangle.
  let titleBottom = margin + 34; // space reserved under the title
  let pyBox, infoBox;
  if (!stacked) {
    // Pyramid on the left ~55%, infobox on the right.
    let splitX = canvasWidth * 0.55;
    pyBox = {
      x: margin,
      y: titleBottom,
      w: splitX - margin - 10,
      h: drawHeight - titleBottom - margin
    };
    infoBox = {
      x: splitX + 5,
      y: titleBottom,
      w: canvasWidth - splitX - 5 - margin,
      h: drawHeight - titleBottom - margin
    };
  } else {
    // Pyramid on top, infobox stacked below.
    let pyH = (drawHeight - titleBottom - margin) * 0.55;
    pyBox = {
      x: margin,
      y: titleBottom,
      w: canvasWidth - 2 * margin,
      h: pyH
    };
    infoBox = {
      x: margin,
      y: titleBottom + pyH + 10,
      w: canvasWidth - 2 * margin,
      h: drawHeight - (titleBottom + pyH + 10) - margin
    };
  }

  // Update hover state before drawing so highlight is current.
  updateHover();

  // Draw main content, then title on top.
  drawPyramid(pyBox);
  drawInfoBox(infoBox);

  // --- Title (drawn after content so it is never overwritten) ---
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text("Bloom's Taxonomy Pyramid Explorer", canvasWidth / 2, 12);

  // --- Hover tooltip (level name + number) follows the cursor ---
  if (hoverLevel >= 0) {
    drawTooltip();
  }

  // --- Control-area label ---
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Click a tier to explore it. Hover for its name.', 130, drawHeight + 25);

  // Reset text defaults for the next frame.
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

// Build and draw the six-tier pyramid inside the given box.
// Also refreshes tierPolys for hit-testing.
function drawPyramid(box) {
  tierPolys = [];

  let n = levels.length;
  let tierH = box.h / n;         // each tier the same height
  let cx = box.x + box.w / 2;    // horizontal center of the pyramid
  let apexHalf = box.w * 0.06;   // half-width at the very top (small, not a point)
  let baseHalf = box.w * 0.5;    // half-width at the very bottom

  textAlign(CENTER, CENTER);

  for (let i = 0; i < n; i++) {
    // level index i: 0 = base tier (bottom), n-1 = peak tier (top)
    // Bottom of this tier sits lower on screen than its top.
    let yBottom = box.y + box.h - i * tierH;
    let yTop = yBottom - tierH;

    // Interpolate half-widths so the stack forms a pyramid.
    let fracBottom = i / n;         // 0 at base .. up toward 1
    let fracTop = (i + 1) / n;
    let halfBottom = lerp(baseHalf, apexHalf, fracBottom);
    let halfTop = lerp(baseHalf, apexHalf, fracTop);

    // Trapezoid corners (clockwise).
    let pts = [
      { x: cx - halfTop, y: yTop },
      { x: cx + halfTop, y: yTop },
      { x: cx + halfBottom, y: yBottom },
      { x: cx - halfBottom, y: yBottom }
    ];

    let lvl = levels[i];
    let isSelected = (selectedLevel === i);
    let isHover = (hoverLevel === i);

    // Fill: base color, lightened on hover, kept solid on selection.
    let baseCol = color(lvl.color);
    let fillCol = baseCol;
    if (isHover && !isSelected) {
      fillCol = lerpColor(baseCol, color('white'), 0.35); // lighter shade on hover
    }
    fill(fillCol);

    // Border: thick dark outline when selected, else thin white separators.
    if (isSelected) {
      stroke('black');
      strokeWeight(3);
    } else {
      stroke('white');
      strokeWeight(2);
    }

    beginShape();
    for (let p of pts) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);

    // Cache polygon for hit-testing.
    tierPolys.push({ level: i, pts: pts, cx: cx, cy: (yTop + yBottom) / 2 });

    // Tier label: name + level number, bold, contrast-aware text color.
    let midY = (yTop + yBottom) / 2;
    noStroke();
    fill(isDark(baseCol) ? 'white' : 'black');
    textStyle(BOLD);
    // Scale label to fit small canvases; keep readable.
    let lblSize = constrain(tierH * 0.42, 11, 18);
    textSize(lblSize);
    text('L' + lvl.num + '  ' + lvl.name, cx, midY);
    textStyle(NORMAL);
  }

  // Axis-style hint: complexity increases toward the top.
  noStroke();
  fill('black');
  textStyle(ITALIC);
  textSize(constrain(box.w * 0.035, 10, 13));
  textAlign(CENTER, TOP);
  text('increasing cognitive complexity  ↑', box.x + box.w / 2, box.y + box.h + 4);
  textStyle(NORMAL);
}

// Draw the infobox: either the default prompt or the selected level's detail.
function drawInfoBox(box) {
  // Panel background (rounded, semi-transparent white, light border).
  push();
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(box.x, box.y, box.w, box.h, 10);
  pop();

  let pad = 14;
  let tx = box.x + pad;
  let tw = box.w - 2 * pad;
  let ty = box.y + pad;

  noStroke();
  textAlign(LEFT, TOP);

  if (selectedLevel < 0) {
    // Default state: prompt text.
    fill('gray');
    textStyle(ITALIC);
    textSize(constrain(box.w * 0.045, 14, 18));
    text('Click a level to see its verbs and an example.', tx, ty, tw);
    textStyle(NORMAL);
    return;
  }

  let lvl = levels[selectedLevel];

  // Colored header swatch + level name.
  let headerH = 34;
  push();
  noStroke();
  fill(lvl.color);
  rect(box.x, box.y, box.w, headerH, 10, 10, 0, 0);
  fill(isDark(color(lvl.color)) ? 'white' : 'black');
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  textSize(18);
  text('L' + lvl.num + ' – ' + lvl.name, tx, box.y + headerH / 2);
  // Position label on the right of the header.
  textAlign(RIGHT, CENTER);
  textSize(13);
  text('level ' + lvl.num + ' of 6', box.x + box.w - pad, box.y + headerH / 2);
  pop();

  // Body content below the header.
  let y = box.y + headerH + 12;
  textAlign(LEFT, TOP);

  // Definition
  fill('black');
  textStyle(BOLD);
  textSize(14);
  text('Definition', tx, y);
  y += 20;
  textStyle(NORMAL);
  fill(50);
  textSize(15);
  text(lvl.definition, tx, y, tw);
  y += textHeightFor(lvl.definition, tw, 15) + 12;

  // Bloom verbs
  fill('black');
  textStyle(BOLD);
  textSize(14);
  text('Bloom Verbs', tx, y);
  y += 20;
  textStyle(NORMAL);
  fill(50);
  textSize(15);
  text(lvl.verbs, tx, y, tw);
  y += textHeightFor(lvl.verbs, tw, 15) + 12;

  // Example objective from this book
  fill('black');
  textStyle(BOLD);
  textSize(14);
  text('Example Objective', tx, y);
  y += 20;
  textStyle(NORMAL);
  fill(50);
  textSize(15);
  text('“' + lvl.example + '”', tx, y, tw);
}

// Estimate the pixel height a wrapped string occupies at a given width/size.
// Used to advance the vertical cursor between infobox sections.
function textHeightFor(str, w, size) {
  push();
  textSize(size);
  // Rough word-wrap count using p5 textWidth.
  let words = str.split(' ');
  let lines = 1;
  let line = '';
  for (let word of words) {
    let test = line.length === 0 ? word : line + ' ' + word;
    if (textWidth(test) > w && line.length > 0) {
      lines++;
      line = word;
    } else {
      line = test;
    }
  }
  pop();
  let lineH = size * 1.25;
  return lines * lineH;
}

// Draw a small tooltip near the cursor with the hovered level's name + number.
function drawTooltip() {
  let lvl = levels[hoverLevel];
  let label = 'L' + lvl.num + ' – ' + lvl.name;
  textSize(14);
  textStyle(BOLD);
  let tw = textWidth(label) + 16;
  let th = 24;
  let tx = mouseX + 14;
  let ty = mouseY - 10;
  // Keep tooltip inside the drawing region.
  if (tx + tw > canvasWidth - 4) tx = canvasWidth - 4 - tw;
  if (ty < 4) ty = 4;
  if (ty + th > drawHeight - 4) ty = drawHeight - 4 - th;

  push();
  stroke(120);
  strokeWeight(1);
  fill(0, 0, 0, 210);
  rect(tx, ty, tw, th, 6);
  noStroke();
  fill('white');
  textAlign(LEFT, CENTER);
  text(label, tx + 8, ty + th / 2);
  pop();
  textStyle(NORMAL);
}

// Update which tier (if any) is under the mouse.
function updateHover() {
  hoverLevel = -1;
  if (mouseY < 0 || mouseY > drawHeight) return; // ignore control area / offscreen
  for (let poly of tierPolys) {
    if (pointInPoly(mouseX, mouseY, poly.pts)) {
      hoverLevel = poly.level;
      return;
    }
  }
}

// Returns true when a color is dark enough to need white text on top of it.
// Uses relative luminance (0..1) so blue tiers get white and gold tiers get black.
function isDark(col) {
  let r = red(col) / 255;
  let g = green(col) / 255;
  let b = blue(col) / 255;
  let lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.5;
}

// Standard ray-casting point-in-polygon test.
function pointInPoly(px, py, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    let xi = pts[i].x, yi = pts[i].y;
    let xj = pts[j].x, yj = pts[j].y;
    let intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Click a tier to select it (updates the infobox).
function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  for (let poly of tierPolys) {
    if (pointInPoly(mouseX, mouseY, poly.pts)) {
      selectedLevel = poly.level;
      return;
    }
  }
}

// Reset View button handler: clear the selection.
function resetView() {
  selectedLevel = -1;
}

// ----- Responsiveness (required at end of file) -----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  // Reposition the button (its y depends on drawHeight, which is fixed, but
  // keep this here for consistency with the responsive pattern).
  resetButton.position(10, drawHeight + 10);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}
