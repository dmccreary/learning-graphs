// Working Memory Load Simulator MicroSim - p5.js
// CANVAS_HEIGHT: 540
// Use this CANVAS_HEIGHT for all iframe heights that embed this MicroSim.
// Bloom Level: Apply (L3) - the learner drags 12 raw item tiles into chunk
// boxes and watches a live Working Memory Load gauge recompute in real time,
// personally performing chunking and seeing its numeric consequence.
// Width responsive: workbench and gauge sit side-by-side on wide viewports and
// stack vertically on viewports narrower than 640px.
// MicroSim template version 2026.03

// ---- Standard responsive canvas globals ----
let canvasWidth = 400;          // initial width; recomputed from container
let drawHeight = 480;           // fixed drawing region height
let controlHeight = 60;         // control region height (1 row of controls)
let canvasHeight = drawHeight + controlHeight; // 540 - single source of truth
let margin = 25;                // margin around visual elements
let sliderLeftMargin = 140;     // left margin for sliders (none used, kept for standard)
let defaultTextSize = 16;       // base text size

// ---- Controls ----
let resetButton;
let priorKnowledgeCheckbox;

// ---- Layout: computed each frame from canvasWidth ----
let stacked = false;            // true when width < 640 (gauge below workbench)
let workbenchX, workbenchY, workbenchW, workbenchH;
let gaugeX, gaugeY, gaugeW, gaugeH;

// ---- Constants ----
const TOTAL_ITEMS = 12;         // 12 raw information items
const WM_LIMIT = 7;             // four-to-seven item constraint (upper bound)
const NUM_BOXES = 5;            // one chunk box per cognitive-load term
const TILE_W = 78;
const TILE_H = 34;
const STACK_BREAKPOINT = 640;

// The chapter's five cognitive-load terms, each split into sub-fragments.
// Grouping the fragments that belong to the same term is the "correct" chunk.
// group index is used only to color-hint tiles; learners may group any way.
const ITEM_DEFS = [
  { label: 'Work',  group: 0 },
  { label: 'ing',   group: 0 },
  { label: 'Mem',   group: 0 },
  { label: 'Cog',   group: 1 },
  { label: 'nitive',group: 1 },
  { label: 'Load',  group: 1 },
  { label: 'Chunk', group: 2 },
  { label: 'ing',   group: 2 },
  { label: 'Pri',   group: 3 },
  { label: 'or',    group: 3 },
  { label: 'Know',  group: 4 },
  { label: 'ledge', group: 4 }
];

// Soft named colors for the 5 term groups (color hint only)
const GROUP_COLORS = ['lightsteelblue', 'khaki', 'lightgreen',
                      'lightpink', 'plum'];

// ---- Model ----
// Each tile: { label, group, x, y, homeX, homeY, box } where box === -1 means
// unassigned (free on the workbench), otherwise index into chunkBoxes.
let tiles = [];
let chunkBoxes = [];            // { x, y, w, h } rectangles (computed each frame)
let priorKnowledgeOn = false;   // schema pre-activated -> one box is "free"

// Drag state
let draggingIndex = -1;
let dragOffsetX = 0;
let dragOffsetY = 0;

function setup() {
  updateCanvasSize();                                   // MUST be first
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Reset Workbench button
  resetButton = createButton('Reset Workbench');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(10, drawHeight + 14);
  resetButton.mousePressed(resetWorkbench);

  // Activate Prior Knowledge toggle (off by default)
  priorKnowledgeCheckbox = createCheckbox('Activate Prior Knowledge', false);
  priorKnowledgeCheckbox.parent(document.querySelector('main'));
  priorKnowledgeCheckbox.position(170, drawHeight + 18);
  priorKnowledgeCheckbox.changed(onPriorKnowledgeChanged);

  computeLayout();
  initTiles();

  describe('A working memory load simulator. Twelve raw information item ' +
    'tiles start ungrouped on a workbench and a vertical load gauge reads ' +
    'twelve, in the red zone above the seven item constraint. Drag tiles into ' +
    'chunk boxes to group them; each occupied box counts as a single item, so ' +
    'the gauge falls and turns green at seven or fewer effective items. A ' +
    'toggle activates prior knowledge, pre-filling one chunk box whose ' +
    'already-known schema does not count against the load.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Required region backgrounds -------------------------------------------
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Recompute layout (responsive) and keep tiles pinned to their boxes -----
  computeLayout();
  reflowAssignedTiles();

  // Panels behind content
  drawWorkbenchPanel();
  drawChunkBoxes();

  // Title AFTER panels so it is never overwritten
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Working Memory Load Simulator', canvasWidth / 2, 8);

  // Content
  drawTiles();
  drawGauge();
  drawControlLabels();
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
function computeLayout() {
  stacked = canvasWidth < STACK_BREAKPOINT;
  const top = 40; // leave room for the title

  if (!stacked) {
    // Side by side: workbench left, gauge right (~180px reserved on right)
    const gaugePanelW = 190;
    workbenchX = margin;
    workbenchY = top;
    workbenchW = canvasWidth - gaugePanelW - margin * 2 - 10;
    workbenchH = drawHeight - top - margin;

    gaugeX = canvasWidth - gaugePanelW - margin + 10;
    gaugeY = top;
    gaugeW = gaugePanelW;
    gaugeH = drawHeight - top - margin;
  } else {
    // Stacked: workbench on top, gauge panel below
    const gaugePanelH = 150;
    workbenchX = margin;
    workbenchY = top;
    workbenchW = canvasWidth - margin * 2;
    workbenchH = drawHeight - top - gaugePanelH - margin - 10;

    gaugeX = margin;
    gaugeY = top + workbenchH + 10;
    gaugeW = canvasWidth - margin * 2;
    gaugeH = gaugePanelH;
  }

  // Place the 5 chunk boxes inside the lower part of the workbench.
  computeChunkBoxRects();
}

function computeChunkBoxRects() {
  chunkBoxes = [];
  const boxAreaTopFrac = 0.44;             // boxes occupy lower ~55% of bench
  const areaTop = workbenchY + workbenchH * boxAreaTopFrac + 6;
  const areaH = workbenchY + workbenchH - areaTop - 8;
  const cols = NUM_BOXES;                   // 5 boxes in a row when wide enough
  const perW = (workbenchW - 20) / cols;
  const boxW = perW - 8;
  const boxH = Math.min(areaH, 110);
  for (let i = 0; i < NUM_BOXES; i++) {
    const bx = workbenchX + 10 + i * perW;
    const by = areaTop;
    chunkBoxes.push({ x: bx, y: by, w: boxW, h: boxH });
  }
}

// ---------------------------------------------------------------------------
// Tiles
// ---------------------------------------------------------------------------
function initTiles() {
  tiles = [];
  for (let i = 0; i < ITEM_DEFS.length; i++) {
    tiles.push({
      label: ITEM_DEFS[i].label,
      group: ITEM_DEFS[i].group,
      x: 0, y: 0,
      box: -1
    });
  }
  layoutFreeTiles();
  applyPriorKnowledge();
}

// Arrange all unassigned tiles in a neat grid in the top part of the workbench.
function layoutFreeTiles() {
  const startX = workbenchX + 12;
  const startY = workbenchY + 34;
  const usableW = workbenchW - 24;
  const perRow = Math.max(1, Math.floor(usableW / (TILE_W + 8)));
  let slot = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].box !== -1) continue;      // only free tiles
    if (i === draggingIndex) continue;      // leave the dragged tile alone
    const col = slot % perRow;
    const row = Math.floor(slot / perRow);
    tiles[i].x = startX + col * (TILE_W + 8);
    tiles[i].y = startY + row * (TILE_H + 8);
    slot++;
  }
}

// Keep tiles that live in a box visually stacked inside that box.
function reflowAssignedTiles() {
  for (let b = 0; b < chunkBoxes.length; b++) {
    const members = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].box === b && i !== draggingIndex) members.push(i);
    }
    const box = chunkBoxes[b];
    const innerW = box.w - 12;
    const perRow = Math.max(1, Math.floor(innerW / (TILE_W - 18)));
    const miniW = TILE_W - 20;
    const miniH = 22;
    for (let k = 0; k < members.length; k++) {
      const col = k % perRow;
      const row = Math.floor(k / perRow);
      tiles[members[k]].x = box.x + 6 + col * (miniW + 4);
      tiles[members[k]].y = box.y + 26 + row * (miniH + 4);
    }
  }
  // Re-flow free tiles too so a resize keeps them tidy.
  layoutFreeTiles();
}

function drawWorkbenchPanel() {
  noStroke();
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(workbenchX, workbenchY, workbenchW, workbenchH, 8);

  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(15);
  text('Workbench: drag fragments into chunk boxes', workbenchX + 10,
       workbenchY + 8);
}

function drawChunkBoxes() {
  textAlign(CENTER, TOP);
  for (let b = 0; b < chunkBoxes.length; b++) {
    const box = chunkBoxes[b];
    const occupied = boxHasTiles(b);
    const isSchema = priorKnowledgeOn && b === 0;

    // Highlight box under the dragged tile
    const hover = draggingIndex !== -1 && pointInRect(mouseX, mouseY, box);

    stroke(hover ? 'royalblue' : 'silver');
    strokeWeight(hover ? 2 : 1);
    if (isSchema) {
      fill('honeydew');            // pre-activated schema box (does not count)
    } else if (occupied) {
      fill('aliceblue');
    } else {
      fill(245);                    // empty box
    }
    rect(box.x, box.y, box.w, box.h, 6);

    noStroke();
    fill(isSchema ? 'seagreen' : 'gray');
    textSize(12);
    const caption = isSchema ? 'Known schema (free)' : 'Chunk ' + (b + 1);
    text(caption, box.x + box.w / 2, box.y + 6);
  }
}

function drawTiles() {
  textAlign(CENTER, CENTER);
  for (let i = 0; i < tiles.length; i++) {
    if (i === draggingIndex) continue;       // draw dragged tile last (on top)
    drawOneTile(i);
  }
  if (draggingIndex !== -1) drawOneTile(draggingIndex);
}

function drawOneTile(i) {
  const t = tiles[i];
  const inBox = t.box !== -1;
  const w = inBox ? TILE_W - 20 : TILE_W;
  const h = inBox ? 22 : TILE_H;

  stroke('gray');
  strokeWeight(1);
  fill(GROUP_COLORS[t.group]);
  if (i === draggingIndex) {
    // subtle lift shadow while dragging
    noStroke();
    fill(0, 0, 0, 40);
    rect(t.x + 3, t.y + 3, w, h, 5);
    stroke('royalblue');
    strokeWeight(2);
    fill(GROUP_COLORS[t.group]);
  }
  rect(t.x, t.y, w, h, 5);

  noStroke();
  fill('black');
  textSize(inBox ? 12 : 14);
  text(t.label, t.x + w / 2, t.y + h / 2);
}

// ---------------------------------------------------------------------------
// Load model
// ---------------------------------------------------------------------------
// Effective load = (# free/unassigned tiles) + (# occupied chunk boxes),
// excluding the prior-knowledge schema box which is already known.
function effectiveLoad() {
  let free = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].box === -1) free++;
  }
  let occupiedBoxes = 0;
  for (let b = 0; b < chunkBoxes.length; b++) {
    if (boxHasTiles(b)) {
      if (priorKnowledgeOn && b === 0) continue;  // schema does not count
      occupiedBoxes++;
    }
  }
  return free + occupiedBoxes;
}

function boxHasTiles(b) {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].box === b) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Gauge (vertical 0..12 with red zone > 7, green zone <= 7)
// ---------------------------------------------------------------------------
function drawGauge() {
  const load = effectiveLoad();

  // Panel
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(gaugeX, gaugeY, gaugeW, gaugeH, 8);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(15);
  text('Working Memory Load', gaugeX + gaugeW / 2, gaugeY + 8);

  // Bar geometry (vertical). Top = 12, bottom = 0.
  const barW = 44;
  const barX = gaugeX + 24;
  const barTop = gaugeY + 34;
  const barBottom = gaugeY + gaugeH - 74;
  const barH = barBottom - barTop;

  // Zones: value 0..12 mapped to y (12 at top). Boundary at 7.
  const yFor = (v) => barBottom - (v / TOTAL_ITEMS) * barH;
  const y7 = yFor(WM_LIMIT);

  // Red zone (7..12) at the top
  noStroke();
  fill(255, 99, 71, 60);       // tomato, translucent
  rect(barX, barTop, barW, y7 - barTop);
  // Green zone (0..7) at the bottom
  fill(60, 179, 113, 55);      // mediumseagreen, translucent
  rect(barX, y7, barW, barBottom - y7);

  // Bar outline + tick labels
  stroke('gray');
  strokeWeight(1);
  noFill();
  rect(barX, barTop, barW, barH);

  noStroke();
  fill('dimgray');
  textAlign(RIGHT, CENTER);
  textSize(11);
  for (let v = 0; v <= TOTAL_ITEMS; v += 2) {
    const ty = yFor(v);
    stroke('gainsboro');
    line(barX, ty, barX + barW, ty);
    noStroke();
    text(v, barX - 4, ty);
  }
  // Constraint line at 7
  stroke('firebrick');
  strokeWeight(2);
  line(barX - 6, y7, barX + barW + 6, y7);
  noStroke();
  fill('firebrick');
  textAlign(LEFT, CENTER);
  textSize(11);
  text('limit 7', barX + barW + 8, y7);

  // Filled needle bar up to the current load
  const inRed = load > WM_LIMIT;
  const fillTop = yFor(load);
  noStroke();
  fill(inRed ? 'tomato' : 'mediumseagreen');
  rect(barX, fillTop, barW, barBottom - fillTop, 0, 0, 0, 0);

  // Needle marker + value
  stroke('black');
  strokeWeight(3);
  line(barX - 8, fillTop, barX + barW + 8, fillTop);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(20);
  text(load, barX + barW + 14, fillTop);

  // Status label under the bar
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  if (inRed) {
    fill('firebrick');
    text('Exceeds Working\nMemory Constraint', gaugeX + gaugeW / 2,
         barBottom + 8);
  } else {
    fill('seagreen');
    text('Within Working\nMemory Constraint', gaugeX + gaugeW / 2,
         barBottom + 8);
  }

  // Final side-by-side comparison: no-chunking vs current effective load
  drawComparison(gaugeX + 6, barBottom + 44, gaugeW - 12, load);
}

function drawComparison(cx, cy, cw, currentLoad) {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(11);
  const half = cw / 2;

  // No chunking = 12 raw items
  fill('firebrick');
  textSize(20);
  textAlign(CENTER, TOP);
  text('12', cx + half / 2, cy);
  fill('dimgray');
  textSize(10);
  text('no chunking', cx + half / 2, cy + 22);

  // With chunking (+ prior knowledge if on)
  fill(currentLoad > WM_LIMIT ? 'firebrick' : 'seagreen');
  textSize(20);
  text(currentLoad, cx + half + half / 2, cy);
  fill('dimgray');
  textSize(10);
  const rightCap = priorKnowledgeOn ? 'chunked + prior' : 'with chunking';
  text(rightCap, cx + half + half / 2, cy + 22);
}

// ---------------------------------------------------------------------------
// Control labels (in white control region)
// ---------------------------------------------------------------------------
function drawControlLabels() {
  // Native controls carry their own labels; add a short hint on the right.
  noStroke();
  fill('dimgray');
  textAlign(RIGHT, CENTER);
  textSize(13);
  const load = effectiveLoad();
  text('Effective load: ' + load + ' items', canvasWidth - margin,
       drawHeight + controlHeight / 2);
}

// ---------------------------------------------------------------------------
// Prior knowledge toggle
// ---------------------------------------------------------------------------
function onPriorKnowledgeChanged() {
  priorKnowledgeOn = priorKnowledgeCheckbox.checked();
  applyPriorKnowledge();
}

// When on, pre-fill chunk box 0 with the "Working Memory" fragment group
// (groups 0). When off, release those tiles back to the workbench.
function applyPriorKnowledge() {
  if (priorKnowledgeOn) {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].group === 0) tiles[i].box = 0;
    }
  } else {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].box === 0 && tiles[i].group === 0) tiles[i].box = -1;
    }
    layoutFreeTiles();
  }
}

function resetWorkbench() {
  draggingIndex = -1;
  for (let i = 0; i < tiles.length; i++) tiles[i].box = -1;
  layoutFreeTiles();
  applyPriorKnowledge();  // re-apply if the toggle is currently on
}

// ---------------------------------------------------------------------------
// Drag and drop (mouse + touch)
// ---------------------------------------------------------------------------
function startDrag(px, py) {
  // Topmost tile under the pointer (search draw order back to front).
  let order = [];
  for (let i = 0; i < tiles.length; i++) order.push(i);
  for (let k = order.length - 1; k >= 0; k--) {
    const i = order[k];
    const t = tiles[i];
    const inBox = t.box !== -1;
    const w = inBox ? TILE_W - 20 : TILE_W;
    const h = inBox ? 22 : TILE_H;
    if (px >= t.x && px <= t.x + w && py >= t.y && py <= t.y + h) {
      // Do not let the learner pull tiles out of the locked schema box.
      if (priorKnowledgeOn && t.box === 0) return false;
      draggingIndex = i;
      dragOffsetX = px - t.x;
      dragOffsetY = py - t.y;
      return true;
    }
  }
  return false;
}

function moveDrag(px, py) {
  if (draggingIndex === -1) return;
  tiles[draggingIndex].x = px - dragOffsetX;
  tiles[draggingIndex].y = py - dragOffsetY;
}

function endDrag(px, py) {
  if (draggingIndex === -1) return;
  const t = tiles[draggingIndex];

  // Dropped into a chunk box?
  let dropped = -1;
  for (let b = 0; b < chunkBoxes.length; b++) {
    if (pointInRect(px, py, chunkBoxes[b])) {
      if (priorKnowledgeOn && b === 0) { dropped = -2; break; } // locked
      dropped = b;
      break;
    }
  }

  if (dropped >= 0) {
    t.box = dropped;                 // assign to that box
  } else if (dropped === -2) {
    // dropped on locked schema box: send back to workbench
    t.box = -1;
  } else {
    // Dropped outside any box -> return to free workbench
    t.box = -1;
  }
  draggingIndex = -1;
  layoutFreeTiles();
}

function mousePressed() {
  if (mouseY <= drawHeight) startDrag(mouseX, mouseY);
}
function mouseDragged() {
  moveDrag(mouseX, mouseY);
}
function mouseReleased() {
  endDrag(mouseX, mouseY);
}

// Touch support (mobile). Return false to prevent page scroll while dragging.
function touchStarted() {
  if (touches.length > 0) {
    const p = touches[0];
    if (p.y <= drawHeight && startDrag(p.x, p.y)) return false;
  } else if (mouseY <= drawHeight) {
    if (startDrag(mouseX, mouseY)) return false;
  }
}
function touchMoved() {
  if (draggingIndex === -1) return;
  if (touches.length > 0) {
    moveDrag(touches[0].x, touches[0].y);
  } else {
    moveDrag(mouseX, mouseY);
  }
  return false; // block scroll while dragging a tile
}
function touchEnded() {
  if (draggingIndex === -1) return;
  // touches[] is empty on release; use last mouse position p5 provides.
  endDrag(mouseX, mouseY);
  return false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function pointInRect(px, py, r) {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

// ---------------------------------------------------------------------------
// Responsive plumbing (REQUIRED, placed at end)
// ---------------------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  computeLayout();
  reflowAssignedTiles();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}
