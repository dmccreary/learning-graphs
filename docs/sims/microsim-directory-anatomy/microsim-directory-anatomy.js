// MicroSim Directory Anatomy MicroSim
// CANVAS_HEIGHT: 500
// Chapter 18: Intelligent Textbooks, MicroSims, and Deployment
// Bloom Level: Understand (L2) — identify the role of each file and explain
// why the iframe embed pattern points at main.html specifically.
//
// A static block-diagram file tree for a deployed MicroSim directory. Clicking
// any file node opens an infobox below the tree describing that file's role.
// Clicking main.html additionally shows a two-line HTML snippet (loads p5.js
// from a CDN, then loads {sim-id}.js); clicking {sim-id}.js shows a four-line
// pseudocode snippet illustrating the setup()/draw() pattern.
//
// Layout is computed once in setup(); click regions are stored as rectangles
// and tested against mouseX/mouseY in mousePressed().

// ---- Standard responsive canvas globals ----
let canvasWidth = 400;
let drawHeight = 460;           // drawing region (tree + infobox)
let controlHeight = 40;         // control region: 1 row (Clear button)
let canvasHeight = drawHeight + controlHeight; // = 500
let margin = 25;
let sliderLeftMargin = 140;     // present for standard compliance (no sliders)
let defaultTextSize = 16;

let clearButton;

// The example sim-id used throughout the tree labels.
const SIM_ID = 'bouncing-ball';

// Node color roles.
const FOLDER_COLOR = 'slategray';
const ENTRY_COLOR = 'gold';         // main.html — the iframe entry point
const FILE_COLOR = 'lightblue';

// Node model: computed in layoutTree(). Each node has a rect {x,y,w,h},
// a label, a color, a key, and role/detail text for the infobox.
let root;
let fileNodes = [];             // the four child file nodes
let selectedKey = null;         // which file node is currently selected

// Infobox content keyed by node key.
const INFO = {
  'main.html': {
    title: 'main.html',
    role: 'The entry point. Every iframe embed in this book points at this file. ' +
      'It loads the p5.js library from a CDN and then loads the sketch file, so a ' +
      'single URL renders the whole MicroSim.',
    snippetTitle: 'What main.html contains (2 key lines):',
    snippet: [
      '<script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.js"></script>',
      '<script src="' + SIM_ID + '.js"></script>'
    ]
  },
  'sketch.js': {
    title: SIM_ID + '.js',
    role: 'The p5.js sketch. It contains setup() (runs once to build the canvas ' +
      'and controls) and draw() (runs every frame to render the simulation). This ' +
      'is where the educational behavior lives.',
    snippetTitle: 'The setup()/draw() pattern (pseudocode):',
    snippet: [
      'function setup() {   // runs once',
      '  createCanvas(w, h);  // build the drawing surface',
      '}',
      'function draw() {    // runs ~60x per second — animation loop'
    ]
  },
  'index.md': {
    title: 'index.md',
    role: 'A documentation page for the MicroSim. It describes the controls, states ' +
      'the learning objective and Bloom level, and embeds the running MicroSim with ' +
      'an iframe that points at main.html.',
    snippetTitle: null,
    snippet: null
  },
  'screenshot.png': {
    title: 'screenshot.png',
    role: 'A static preview image of the MicroSim. It is used as a thumbnail in the ' +
      'MicroSim index listings and in social-media link previews, so readers can see ' +
      'the simulation before opening it.',
    snippetTitle: null,
    snippet: null
  }
};

function setup() {
  updateCanvasSize(); // MUST be first line
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  clearButton = createButton('Clear Selection');
  clearButton.parent(document.querySelector('main'));
  clearButton.mousePressed(() => { selectedKey = null; });
  clearButton.position(10, drawHeight + 6);

  layoutTree();

  describe(
    'A labeled directory tree for a deployed MicroSim folder named docs/sims/' +
    SIM_ID + '/. The root folder branches to four files: main.html (highlighted ' +
    'gold as the iframe entry point), ' + SIM_ID + '.js (the p5.js sketch with ' +
    'setup and draw), index.md (the documentation page), and screenshot.png (a ' +
    'preview image). Clicking any file opens an infobox below the tree explaining ' +
    'its role. Clicking main.html also shows the HTML that loads p5.js then the ' +
    'sketch; clicking the sketch shows the setup/draw pseudocode.',
    LABEL
  );
}

// Compute node rectangles. Recomputed on resize so the layout stays responsive.
function layoutTree() {
  fileNodes = [];
  const stacked = canvasWidth < 600;

  // Root folder node, centered near the top.
  const rootW = min(320, canvasWidth - 2 * margin);
  const rootH = 44;
  const rootX = (canvasWidth - rootW) / 2;
  const rootY = 54;
  root = {
    key: 'root',
    label: 'docs/sims/' + SIM_ID + '/',
    x: rootX, y: rootY, w: rootW, h: rootH,
    color: FOLDER_COLOR
  };

  const children = [
    { key: 'main.html', label: 'main.html', color: ENTRY_COLOR },
    { key: 'sketch.js', label: SIM_ID + '.js', color: FILE_COLOR },
    { key: 'index.md', label: 'index.md', color: FILE_COLOR },
    { key: 'screenshot.png', label: 'screenshot.png', color: FILE_COLOR }
  ];

  if (stacked) {
    // Vertical stacked list on narrow viewports.
    const nodeW = min(260, canvasWidth - 2 * margin - 30);
    const nodeH = 36;
    const gap = 12;
    const startY = rootY + rootH + 26;
    const x = (canvasWidth - nodeW) / 2 + 15;
    for (let i = 0; i < children.length; i++) {
      children[i].x = x;
      children[i].y = startY + i * (nodeH + gap);
      children[i].w = nodeW;
      children[i].h = nodeH;
      fileNodes.push(children[i]);
    }
  } else {
    // Horizontal branch layout: four nodes in a row below the root.
    const totalW = canvasWidth - 2 * margin;
    const nodeW = min(150, (totalW - 3 * 14) / 4);
    const nodeH = 46;
    const gap = (totalW - nodeW * 4) / 3;
    const y = rootY + rootH + 60;
    for (let i = 0; i < children.length; i++) {
      children[i].x = margin + i * (nodeW + gap);
      children[i].y = y;
      children[i].w = nodeW;
      children[i].h = nodeH;
      fileNodes.push(children[i]);
    }
  }
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
  text('MicroSim Directory Anatomy', canvasWidth / 2, 10);

  // Connector lines from root to each child (drawn before nodes).
  stroke('gray');
  strokeWeight(1.5);
  const rootBottomX = root.x + root.w / 2;
  const rootBottomY = root.y + root.h;
  for (const n of fileNodes) {
    const cx = n.x + n.w / 2;
    const cy = n.y;
    // simple elbow connector
    line(rootBottomX, rootBottomY, rootBottomX, (rootBottomY + cy) / 2);
    line(rootBottomX, (rootBottomY + cy) / 2, cx, (rootBottomY + cy) / 2);
    line(cx, (rootBottomY + cy) / 2, cx, cy);
  }

  // Root folder node.
  drawNode(root, false);

  // Child file nodes.
  for (const n of fileNodes) {
    drawNode(n, n.key === selectedKey);
  }

  // Hint line.
  noStroke();
  fill('dimgray');
  textAlign(CENTER, TOP);
  textSize(13);
  const hintY = fileNodes.length ? fileNodes[0].y + fileNodes[0].h + 8 : 200;
  if (canvasWidth >= 600) {
    text('Click a file to see its role. main.html (gold) is the iframe entry point.',
      canvasWidth / 2, hintY);
  }

  // Infobox in the reserved area below the tree.
  drawInfobox();

  // Reset text defaults.
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawNode(n, selected) {
  // Folder nodes get a small "tab"; file nodes are plain rounded rects.
  strokeWeight(selected ? 3 : 1.5);
  stroke(selected ? 'black' : 'gray');
  fill(n.color);
  rect(n.x, n.y, n.w, n.h, 8);

  noStroke();
  // Choose a readable text color for the node fill.
  fill(n.color === FOLDER_COLOR ? 'white' : 'black');
  textAlign(CENTER, CENTER);
  textSize(n.key === 'root' ? 15 : 13);
  textStyle(n.key === 'main.html' ? BOLD : NORMAL);
  text(n.label, n.x + n.w / 2, n.y + n.h / 2);
  textStyle(NORMAL);
}

function drawInfobox() {
  // Reserved area: from below the lowest node to the bottom of the draw region.
  let lowest = root.y + root.h;
  for (const n of fileNodes) lowest = max(lowest, n.y + n.h);
  const boxY = lowest + 30;
  const boxX = margin;
  const boxW = canvasWidth - 2 * margin;
  const boxH = drawHeight - boxY - 14;
  if (boxH < 40) return;

  noStroke();
  stroke('silver');
  fill(255, 255, 255, 240);
  rect(boxX, boxY, boxW, boxH, 10);

  noStroke();
  if (!selectedKey) {
    fill('gray');
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    textSize(15);
    text('Click any file node above to read its role in the MicroSim directory.',
      boxX + boxW / 2, boxY + boxH / 2, boxW - 30);
    textStyle(NORMAL);
    return;
  }

  const info = INFO[selectedKey];
  let ty = boxY + 12;

  // Title.
  fill('midnightblue');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(17);
  text(info.title, boxX + 14, ty);
  ty += 26;

  // Role text (wrapped).
  fill('black');
  textStyle(NORMAL);
  textSize(14);
  text(info.role, boxX + 14, ty, boxW - 28);
  // Estimate wrapped height to place the snippet below.
  const roleLines = ceil(textWidth(info.role) / (boxW - 28));
  ty += roleLines * 18 + 10;

  // Optional code/pseudocode snippet in a monospace-ish block.
  if (info.snippet && ty < boxY + boxH - 40) {
    fill('gray');
    textSize(12);
    textStyle(BOLD);
    text(info.snippetTitle, boxX + 14, ty);
    ty += 18;
    textStyle(NORMAL);

    // Code panel.
    const codeH = info.snippet.length * 18 + 12;
    if (ty + codeH <= boxY + boxH - 6) {
      noStroke();
      fill(245, 245, 245);
      stroke('gainsboro');
      rect(boxX + 14, ty, boxW - 28, codeH, 6);
      noStroke();
      fill('darkslategray');
      textAlign(LEFT, TOP);
      textFont('monospace');
      textSize(12);
      let cy = ty + 6;
      for (const lineTxt of info.snippet) {
        text(lineTxt, boxX + 22, cy, boxW - 44);
        cy += 18;
      }
      textFont('Arial');
    }
  }
}

// Click handling: test click point against each file node's rectangle.
function mousePressed() {
  // Only respond to clicks inside the drawing region.
  if (mouseY < 0 || mouseY > drawHeight) return;
  for (const n of fileNodes) {
    if (mouseX >= n.x && mouseX <= n.x + n.w &&
        mouseY >= n.y && mouseY <= n.y + n.h) {
      selectedKey = n.key;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutTree();
  clearButton.position(10, drawHeight + 6);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
