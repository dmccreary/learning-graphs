// Zone of Proximal Development Explorer - p5.js
// CANVAS_HEIGHT: 728
// Bloom level of this MicroSim: Apply (L3) - the learner places concepts into
// the three ZPD regions and then watches the boundary MOVE as concepts are
// mastered. The learner SEES every element: three concentric zones around a
// learner marker, one circle per concept colored by zone, a mastery-confidence
// number inside each circle, and the concept name under it.
// Width-responsive: node geometry is recomputed from container width each frame.
// MicroSim template version 2026.03

// ----- Canvas / layout globals (single source of truth) -----
let canvasWidth = 400;            // responsive; set from container width
let drawHeight = 640;             // top drawing region (no controls here)
let controlHeight = 88;           // two rows of controls
let canvasHeight = drawHeight + controlHeight; // 728 - matches // CANVAS_HEIGHT
let margin = 25;                  // outer margin for drawing elements
let defaultTextSize = 16;         // base text size

// Below this internal width the controls stack onto two rows more tightly.
let narrowWidth = 640;

// ----- Native p5 controls -----
let layoutSelect;                 // Concentric | Left to Right | Top to Bottom
let edgeCheckbox;                 // show every prerequisite link at once
let resetButton;                  // restore the starting learner model

// ----- Interaction state -----
let selectedId = null;            // concept clicked most recently
let hoverId = null;               // concept under the mouse
let currentLayout = 'Concentric'; // active layout strategy
let prevLayout = 'Concentric';    // layout we are fading out of
let layoutT = 1;                  // 0 -> 1 crossfade of the zone backgrounds

// Infobox contents, rewritten by every interaction.
let infoTitle = 'Three zones around one learner';
let infoBody =
  'Each circle is a concept, and the number inside it is the model’s confidence ' +
  'that this learner could succeed at that concept right now. Amber concepts sit ' +
  'in the Zone of Proximal Development: every prerequisite is already mastered, ' +
  'so guidance will land. Click an amber concept to master it and watch the ' +
  'ZPD boundary move outward.';

// ----- Zone definitions -----
// 'mastered' = comfort zone, 'zpd' = zone of proximal development,
// 'far' = frustration zone (at least one prerequisite is still unmastered).
const ZONES = [
  {
    key: 'mastered',
    title: 'Comfort Zone',
    sub: 'Can already do alone — practice here wastes time',
    fill: '#e9f6ed', edge: '#8dc9a2',
    node: '#2e9e4f', nodeStroke: '#1b6b34', numText: '#ffffff'
  },
  {
    key: 'zpd',
    title: 'Zone of Proximal Development',
    shortTitle: 'ZPD',
    sub: 'Can do with guidance — real learning happens here',
    fill: '#fdf3e0', edge: '#e0b263',
    node: '#f0a020', nodeStroke: '#a8690a', numText: '#3a2500'
  },
  {
    key: 'far',
    title: 'Frustration Zone',
    sub: 'Prerequisites missing — even good help will not land',
    fill: '#fceeec', edge: '#e5a49b',
    node: '#d94a3d', nodeStroke: '#8f2519', numText: '#ffffff'
  }
];

function zoneMeta(key) {
  return ZONES.find(z => z.key === key);
}

// ----- The learner's concept model -----
// A small slice of this book's own learning graph. `conf` holds the mastery
// confidence the model would report in each of the three situations, so the
// number visibly RISES when a concept's prerequisites get satisfied.
// `label` is the full concept name used in the infobox prose; `short` is the
// version drawn under the circle, kept to one line so that labels in one ring
// cannot reach the circles in the next ring in.
const CONCEPTS = [
  { id: 'node',   label: 'Node', short: 'Node', prereqs: [],
    conf: { far: 0.10, zpd: 0.55, mastered: 0.97 }, startMastered: true },
  { id: 'edge',   label: 'Edge', short: 'Edge', prereqs: [],
    conf: { far: 0.10, zpd: 0.55, mastered: 0.95 }, startMastered: true },
  { id: 'digraph', label: 'Directed Graph', short: 'Directed Graph',
    prereqs: ['node', 'edge'],
    conf: { far: 0.13, zpd: 0.57, mastered: 0.93 }, startMastered: true },
  { id: 'prereq',  label: 'Prerequisite', short: 'Prerequisite', prereqs: ['edge'],
    conf: { far: 0.14, zpd: 0.56, mastered: 0.91 }, startMastered: true },

  { id: 'dag',     label: 'Acyclic Graph', short: 'Acyclic Graph',
    prereqs: ['digraph'],
    conf: { far: 0.14, zpd: 0.58, mastered: 0.92 }, startMastered: false },
  { id: 'traverse', label: 'Graph Traversal', short: 'Traversal',
    prereqs: ['node', 'edge'],
    conf: { far: 0.16, zpd: 0.63, mastered: 0.93 }, startMastered: false },
  { id: 'adjlist', label: 'Adjacency List', short: 'Adjacency List',
    prereqs: ['node', 'edge'],
    conf: { far: 0.15, zpd: 0.52, mastered: 0.92 }, startMastered: false },
  { id: 'concdep', label: 'Concept Dependency', short: 'Concept Dep.',
    prereqs: ['prereq', 'digraph'],
    conf: { far: 0.12, zpd: 0.47, mastered: 0.91 }, startMastered: false },

  { id: 'toposort', label: 'Topological Sort', short: 'Topo Sort',
    prereqs: ['dag', 'traverse'],
    conf: { far: 0.22, zpd: 0.49, mastered: 0.91 }, startMastered: false },
  { id: 'cycle',    label: 'Cycle Detection', short: 'Cycle Detection',
    prereqs: ['dag', 'traverse'],
    conf: { far: 0.19, zpd: 0.54, mastered: 0.92 }, startMastered: false },
  { id: 'shortest', label: 'Shortest Path', short: 'Shortest Path',
    prereqs: ['traverse', 'adjlist'],
    conf: { far: 0.17, zpd: 0.51, mastered: 0.92 }, startMastered: false },
  { id: 'lpgen',    label: 'Learning Path Generation', short: 'Learning Paths',
    prereqs: ['toposort', 'concdep'],
    conf: { far: 0.08, zpd: 0.44, mastered: 0.90 }, startMastered: false },
  { id: 'between',  label: 'Betweenness Centrality', short: 'Betweenness',
    prereqs: ['shortest'],
    conf: { far: 0.06, zpd: 0.46, mastered: 0.91 }, startMastered: false }
];

// Runtime node objects: animated position + current zone.
let nodes = [];
let byId = {};

const NODE_R = 22;      // circle radius at full scale
const LABEL_W = 100;    // wrap width for the label under a circle, at full scale

// Everything drawn inside the zones shrinks together on narrow viewports so
// that circles, their numbers, and their labels keep the same relationship.
function uiScale() {
  return constrain(canvasWidth / 860, 0.58, 1);
}
function nodeRadius() {
  return NODE_R * uiScale();
}
function labelWidth() {
  return LABEL_W * uiScale();
}

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
function buildNodes() {
  nodes = CONCEPTS.map((c, i) => ({
    id: c.id,
    label: c.label,
    short: c.short,
    prereqs: c.prereqs,
    conf: c.conf,
    order: i,
    mastered: c.startMastered,
    zone: 'far',
    x: canvasWidth / 2,
    y: drawHeight / 2,
    placed: false
  }));
  byId = {};
  nodes.forEach(n => { byId[n.id] = n; });
  recomputeZones();
}

// A concept is in the ZPD when it is not yet mastered but every prerequisite
// IS mastered. Otherwise it is in the frustration zone.
function recomputeZones() {
  nodes.forEach(n => {
    if (n.mastered) {
      n.zone = 'mastered';
    } else if (n.prereqs.every(p => byId[p] && byId[p].mastered)) {
      n.zone = 'zpd';
    } else {
      n.zone = 'far';
    }
  });
}

function confidenceOf(n) {
  return n.conf[n.zone];
}

function missingPrereqs(n) {
  return n.prereqs.filter(p => byId[p] && !byId[p].mastered).map(p => byId[p].label);
}

function nodesInZone(key) {
  return nodes.filter(n => n.zone === key).sort((a, b) => a.order - b.order);
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------
function setup() {
  updateCanvasSize(); // MUST be first: reads container width into canvasWidth
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);
  buildNodes();

  layoutSelect = createSelect();
  layoutSelect.parent(document.querySelector('main'));
  layoutSelect.option('Concentric');
  layoutSelect.option('Left to Right');
  layoutSelect.option('Top to Bottom');
  layoutSelect.selected('Concentric');
  layoutSelect.changed(onLayoutChanged);

  edgeCheckbox = createCheckbox(' Show all prerequisite links', false);
  edgeCheckbox.parent(document.querySelector('main'));

  resetButton = createButton('Reset Learner');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetLearner);

  positionControls();

  describe(
    'An interactive map of one learner’s Zone of Proximal Development. ' +
    'Thirteen concepts from a graph-theory learning graph are drawn as circles ' +
    'inside three regions. Green circles are mastered concepts in the inner ' +
    'comfort zone, amber circles are concepts whose prerequisites are all ' +
    'mastered and which therefore sit in the Zone of Proximal Development, and ' +
    'red circles are concepts still missing prerequisites in the outer ' +
    'frustration zone. Each circle shows a mastery-confidence number in its ' +
    'center and the concept name beneath it. Clicking an amber concept masters ' +
    'it, which moves it into the comfort zone and pulls newly unblocked red ' +
    'concepts into the Zone of Proximal Development. A layout menu switches ' +
    'between Concentric, Left to Right, and Top to Bottom arrangements.'
  );
}

function onLayoutChanged() {
  const next = layoutSelect.value();
  if (next === currentLayout) return;
  prevLayout = currentLayout;
  currentLayout = next;
  layoutT = 0; // start the zone-background crossfade
}

function resetLearner() {
  buildNodes();
  selectedId = null;
  hoverId = null;
  infoTitle = 'Learner model reset';
  infoBody =
    'The learner is back to four mastered concepts. Four more concepts have ' +
    'every prerequisite satisfied and therefore sit in the Zone of Proximal ' +
    'Development; the remaining five are still blocked. Click an amber concept ' +
    'to master it.';
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------
// The infobox needs more rows for the same prose on a narrow canvas.
function infoBoxHeight() {
  return canvasWidth < 700 ? 138 : 98;
}
function infoBoxTop() {
  return drawHeight - infoBoxHeight() - 14;
}

// The drawing region reserved for the zones themselves.
function graphBox() {
  const top = 72;
  const bottom = infoBoxTop() - 10;
  return { x: margin, y: top, w: canvasWidth - 2 * margin, h: bottom - top };
}

// Concentric: rx/ry are the outer (frustration) boundary radii. Nodes sit on
// rings strictly inside their zone's boundary.
const RING = {
  mastered: { node: 0.30, bound: 0.44 },
  zpd:      { node: 0.57, bound: 0.72 },
  far:      { node: 0.94, bound: 1.03 }
};

// The comfort zone fills up as the learner masters concepts, so its node ring
// grows with its population to keep circles (and their labels) from colliding.
function nodeRingFactor(zoneKey, count) {
  if (zoneKey !== 'mastered') return RING[zoneKey].node;
  return Math.min(RING.mastered.node + 0.022 * Math.max(0, count - 4), 0.40);
}

function concentricRadii(box) {
  const s = uiScale();
  // Reserve room under the outermost ring for that ring's labels.
  const ry = Math.max(60, (box.h / 2 - 50 * s) / RING.far.node);
  const rx = Math.max(80, box.w / 2 - 66 * s);
  return { cx: box.x + box.w / 2, cy: box.y + box.h / 2, rx: Math.min(rx, 420), ry: ry };
}

// Evenly spaced around the ellipse, offset by half a step so that no node
// lands at top dead center where the ring titles are drawn.
function ringAngle(i, n) {
  return radians(-90 + 180 / n + i * (360 / n));
}

function targetPosition(n, box) {
  const zoneIndex = ZONES.findIndex(z => z.key === n.zone);
  const peers = nodesInZone(n.zone);
  const i = peers.indexOf(n);
  const count = peers.length;

  if (currentLayout === 'Left to Right') {
    const bandW = box.w / 3;
    const cx = box.x + (zoneIndex + 0.5) * bandW;
    const areaTop = box.y + 62;
    const areaBottom = box.y + box.h - 16;
    const spacing = Math.min(76 * uiScale() + 14,
                             (areaBottom - areaTop) / Math.max(count, 1));
    const cy = (areaTop + areaBottom) / 2;
    return { x: cx, y: cy + (i - (count - 1) / 2) * spacing };
  }

  if (currentLayout === 'Top to Bottom') {
    const bandH = box.h / 3;
    const cy = box.y + zoneIndex * bandH + bandH / 2 + 16;
    const spacing = Math.min(150, (box.w - 30) / Math.max(count, 1));
    const cx = box.x + box.w / 2;
    return { x: cx + (i - (count - 1) / 2) * spacing, y: cy };
  }

  // Concentric (default)
  const g = concentricRadii(box);
  const f = nodeRingFactor(n.zone, count);
  const a = ringAngle(i, count);
  return { x: g.cx + g.rx * f * Math.cos(a), y: g.cy + g.ry * f * Math.sin(a) };
}

// ---------------------------------------------------------------------------
// Draw
// ---------------------------------------------------------------------------
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

  drawTitleAndLegend();

  const box = graphBox();

  // Crossfade the zone backgrounds when the layout strategy changes.
  layoutT = Math.min(1, layoutT + 0.06);
  if (layoutT < 1) drawZones(prevLayout, box, 1 - layoutT);
  drawZones(currentLayout, box, layoutT);

  // Animate every node toward its target for the active layout.
  nodes.forEach(n => {
    const t = targetPosition(n, box);
    if (!n.placed) { n.x = t.x; n.y = t.y; n.placed = true; }
    n.x = lerp(n.x, t.x, 0.14);
    n.y = lerp(n.y, t.y, 0.14);
  });

  drawEdges();
  nodes.forEach(drawNode);

  if (currentLayout === 'Concentric') drawLearnerMarker(box);

  drawInfobox();
  drawControlLabels();
}

function drawTitleAndLegend() {
  noStroke();
  fill('#12385e');
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(Math.min(23, canvasWidth / 19));
  text('Zone of Proximal Development Explorer', canvasWidth / 2, 30);
  textStyle(NORMAL);

  // Legend doubles as the live count for each zone.
  textSize(canvasWidth < 620 ? 11 : 13);
  const items = ZONES.map(z => {
    const n = nodesInZone(z.key).length;
    const name = z.key === 'mastered' ? 'Mastered' :
                 z.key === 'zpd' ? 'In the ZPD' : 'Out of reach';
    return { z: z, label: name + ' (' + n + ')' };
  });
  const gap = canvasWidth < 620 ? 14 : 26;
  let total = 0;
  items.forEach(it => { total += 16 + textWidth(it.label) + gap; });
  total -= gap;
  let x = canvasWidth / 2 - total / 2;
  const y = 56;
  items.forEach(it => {
    fill(it.z.node);
    stroke(it.z.nodeStroke);
    strokeWeight(1);
    circle(x + 5, y, 11);
    noStroke();
    fill('#333333');
    textAlign(LEFT, CENTER);
    text(it.label, x + 16, y);
    x += 16 + textWidth(it.label) + gap;
  });
}

// Zone backgrounds for one layout strategy, at the given opacity (0..1).
function drawZones(layoutName, box, alpha) {
  push();
  if (layoutName === 'Concentric') {
    const g = concentricRadii(box);
    // Largest first so the nested fills read as three bands.
    for (let i = ZONES.length - 1; i >= 0; i--) {
      const z = ZONES[i];
      const f = RING[z.key].bound;
      fill(colorWithAlpha(z.fill, alpha));
      stroke(colorWithAlpha(z.edge, alpha * 0.9));
      strokeWeight(1.5);
      drawingContext.setLineDash([6, 5]);
      ellipse(g.cx, g.cy, 2 * g.rx * f, 2 * g.ry * f);
      drawingContext.setLineDash([]);
    }
    // Ring titles sit in the gap above each zone's node ring. On a narrow
    // canvas the long ZPD title would spill over the circles, so abbreviate.
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(12 * Math.max(uiScale(), 0.8));
    ZONES.forEach(z => {
      const f = RING[z.key].bound;
      fill(colorWithAlpha('#5a5a5a', alpha));
      noStroke();
      const t = (canvasWidth < 760 && z.shortTitle) ? z.shortTitle : z.title;
      text(t, g.cx, g.cy - g.ry * f + 5);
    });
    textStyle(NORMAL);
  } else if (layoutName === 'Left to Right') {
    const bandW = box.w / 3;
    ZONES.forEach((z, i) => {
      fill(colorWithAlpha(z.fill, alpha));
      stroke(colorWithAlpha(z.edge, alpha * 0.9));
      strokeWeight(1.5);
      rect(box.x + i * bandW + 3, box.y, bandW - 6, box.h, 10);
      noStroke();
      fill(colorWithAlpha('#4a4a4a', alpha));
      textAlign(CENTER, TOP);
      textStyle(BOLD);
      textSize(13);
      // With a text box, x is the box's LEFT edge; CENTER aligns inside it.
      text(z.title, box.x + i * bandW + 12, box.y + 10, bandW - 24, 20);
      textStyle(NORMAL);
      textSize(11);
      fill(colorWithAlpha('#6d6d6d', alpha));
      text(z.sub, box.x + i * bandW + 12, box.y + 30, bandW - 24, 32);
    });
  } else {
    const bandH = box.h / 3;
    ZONES.forEach((z, i) => {
      fill(colorWithAlpha(z.fill, alpha));
      stroke(colorWithAlpha(z.edge, alpha * 0.9));
      strokeWeight(1.5);
      rect(box.x, box.y + i * bandH + 3, box.w, bandH - 6, 10);
      noStroke();
      fill(colorWithAlpha('#4a4a4a', alpha));
      textAlign(LEFT, TOP);
      textStyle(BOLD);
      textSize(13);
      text(z.title, box.x + 14, box.y + i * bandH + 10);
      textStyle(NORMAL);
      textSize(11);
      fill(colorWithAlpha('#6d6d6d', alpha));
      text(z.sub, box.x + 14, box.y + i * bandH + 27);
    });
  }
  pop();
}

// Small marker for the learner at the exact center of the concentric rings.
function drawLearnerMarker(box) {
  const g = concentricRadii(box);
  const s = uiScale();
  noStroke();
  fill('#12385e');
  circle(g.cx, g.cy, 30 * s);
  fill('#ffffff');
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(Math.max(7.5, 10 * s));
  text('YOU', g.cx, g.cy);
  textStyle(NORMAL);
}

function drawEdges() {
  const showAll = edgeCheckbox.checked();
  const focus = hoverId || selectedId;
  push();
  nodes.forEach(n => {
    n.prereqs.forEach(pid => {
      const p = byId[pid];
      if (!p) return;
      const related = focus && (focus === n.id || focus === pid);
      if (!showAll && !related) return;
      if (related) {
        stroke('#12385e');
        strokeWeight(2.2);
      } else {
        stroke(200, 205, 212);
        strokeWeight(1.2);
      }
      drawArrow(p.x, p.y, n.x, n.y);
    });
  });
  pop();
}

// Line from the prerequisite to the dependent concept, stopping at the rims.
function drawArrow(x1, y1, x2, y2) {
  const r = nodeRadius();
  const a = Math.atan2(y2 - y1, x2 - x1);
  const sx = x1 + Math.cos(a) * r;
  const sy = y1 + Math.sin(a) * r;
  const ex = x2 - Math.cos(a) * (r + 5);
  const ey = y2 - Math.sin(a) * (r + 5);
  line(sx, sy, ex, ey);
  push();
  translate(ex, ey);
  rotate(a);
  noStroke();
  fill(drawingContext.strokeStyle);
  triangle(0, 0, -7, -3.5, -7, 3.5);
  pop();
}

function drawNode(n) {
  const z = zoneMeta(n.zone);
  const isSel = n.id === selectedId;
  const isHover = n.id === hoverId;
  const s = uiScale();
  const r = nodeRadius();
  const lw = labelWidth();

  push();
  // Learnable concepts get a soft halo so the click affordance is visible.
  if (n.zone === 'zpd') {
    noStroke();
    fill(240, 160, 32, isHover ? 70 : 38);
    circle(n.x, n.y, r * 2 + (isHover ? 18 : 12) * s);
  }
  stroke(isSel ? '#12385e' : z.nodeStroke);
  strokeWeight(isSel ? 4 : (isHover ? 3 : 2));
  fill(z.node);
  circle(n.x, n.y, r * 2);

  // Mastery confidence, centered inside the circle.
  noStroke();
  fill(z.numText);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(Math.max(9, 13 * s));
  text(nf(confidenceOf(n), 1, 2), n.x, n.y + 1);
  textStyle(NORMAL);

  // Concept name, in black, under the circle.
  fill('#000000');
  textAlign(CENTER, TOP);
  textSize(Math.max(9, 11.5 * s));
  text(n.short, n.x - lw / 2, n.y + r + 4, lw, 32);
  pop();
}

function drawInfobox() {
  const x = margin;
  const y = infoBoxTop();
  const w = canvasWidth - 2 * margin;
  const h = infoBoxHeight();
  push();
  fill('#ffffff');
  stroke('#b9c6d4');
  strokeWeight(1.5);
  rect(x, y, w, h, 8);
  noStroke();
  fill('#12385e');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(14);
  text(infoTitle, x + 12, y + 9, w - 24, 20);
  textStyle(NORMAL);
  fill('#333333');
  textSize(12.5);
  text(infoBody, x + 12, y + 30, w - 24, h - 38);
  pop();
}

function drawControlLabels() {
  noStroke();
  fill('#333333');
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  textSize(14);
  text('Layout:', 12, drawHeight + 26);
}

// ---------------------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------------------
function nodeUnderMouse() {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i];
    if (dist(mouseX, mouseY, n.x, n.y) <= nodeRadius() + 3) return n;
  }
  return null;
}

function mouseMoved() {
  const n = nodeUnderMouse();
  hoverId = n ? n.id : null;
  cursor(n ? HAND : ARROW);
}

function mousePressed() {
  if (mouseY > drawHeight) return; // clicks in the control strip
  const n = nodeUnderMouse();
  if (!n) return;
  selectedId = n.id;

  if (n.zone === 'zpd') {
    masterConcept(n);
  } else if (n.zone === 'mastered') {
    infoTitle = n.label + ' — comfort zone (' + nf(confidenceOf(n), 1, 2) + ')';
    infoBody =
      'This learner can already do ' + n.label + ' without help, so assigning ' +
      'more practice on it produces almost no learning. Its real value now is ' +
      'as a prerequisite: it is what makes other concepts reachable.';
  } else {
    const missing = missingPrereqs(n);
    infoTitle = n.label + ' — frustration zone (' + nf(confidenceOf(n), 1, 2) + ')';
    infoBody =
      'Guidance will not help yet. ' + n.label + ' still depends on ' +
      missing.join(' and ') + ', which this learner has not mastered. ' +
      'Master ' + (missing.length > 1 ? 'those concepts' : 'that concept') +
      ' first and ' + n.label + ' will move into the Zone of Proximal Development.';
  }
}

function masterConcept(n) {
  const before = nodesInZone('zpd').map(x => x.id);
  n.mastered = true;
  recomputeZones();
  const after = nodesInZone('zpd');
  const newly = after.filter(x => before.indexOf(x.id) === -1).map(x => x.label);

  infoTitle = 'Mastered ' + n.label + ' (confidence now ' +
              nf(confidenceOf(n), 1, 2) + ')';
  if (newly.length > 0) {
    infoBody =
      n.label + ' moved into the comfort zone, and the Zone of Proximal ' +
      'Development moved outward with it: ' + newly.join(' and ') +
      ' just became reachable, because the last missing prerequisite is now in ' +
      'place. The ZPD is not a fixed set of concepts — it is a moving ' +
      'frontier that depends on what the learner already knows.';
  } else {
    infoBody =
      n.label + ' moved into the comfort zone. Nothing new entered the Zone of ' +
      'Proximal Development this time — the remaining red concepts are ' +
      'still waiting on other prerequisites.';
  }
}

// ---------------------------------------------------------------------------
// Responsive plumbing
// ---------------------------------------------------------------------------
function positionControls() {
  const row1 = drawHeight + 12;
  const row2 = drawHeight + 50;
  layoutSelect.position(70, row1);
  if (canvasWidth >= narrowWidth) {
    edgeCheckbox.position(250, row1 + 4);
    resetButton.position(canvasWidth - 140, row1);
  } else {
    edgeCheckbox.position(12, row2 + 4);
    resetButton.position(230, row1);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}

// Return a p5 color for a hex string at the given 0..1 opacity.
function colorWithAlpha(hex, a) {
  const c = color(hex);
  c.setAlpha(255 * constrain(a, 0, 1));
  return c;
}
