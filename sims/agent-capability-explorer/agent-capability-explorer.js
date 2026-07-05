// Agent Capability Explorer MicroSim
// CANVAS_HEIGHT: 540
// Bloom Level: Analyze (L4) - differentiate, examine, distinguish
// Learners toggle four defining agent capabilities on/off and read a live-updating
// "Simulated Agent Behavior" panel. With all four off, the system is equivalent to a
// single generative-AI call. Each toggle adds/removes exactly one behavior sentence so
// the learner can isolate the independent contribution of each capability.
// No live AI model is involved - this is an illustrative simulation.

// ---- Standard responsive canvas globals ----
let canvasWidth = 400;          // initial width, updated responsively
let drawHeight = 490;           // drawing region height
let controlHeight = 50;         // control region height (1 row)
let canvasHeight = drawHeight + controlHeight; // total canvas height = 540
let margin = 25;                // margin around edges
let sliderLeftMargin = 140;     // left margin for any slider (none here, kept for standard)
let defaultTextSize = 16;       // base text size

// ---- Application state ----
// Four independent capabilities. Order matters for stable panel display.
let capabilities = [
  {
    key: 'autonomy',
    label: 'Agent Autonomy',
    behavior: 'Decides its next action without waiting for a new human prompt.',
    on: false
  },
  {
    key: 'iterative',
    label: 'Iterative Workflow',
    behavior: 'Evaluates its own output and refines it across repeated cycles.',
    on: false
  },
  {
    key: 'tools',
    label: 'Tool Use',
    behavior: 'Queries the learning graph and other external systems for real data instead of relying on memory.',
    on: false
  },
  {
    key: 'multiagent',
    label: 'Multi-Agent Collaboration',
    behavior: 'Coordinates with other specialized agents on subtasks.',
    on: false
  }
];

// Baseline description shown when all toggles are off.
let baselineBehavior = 'Generates one response to one prompt, then stops.';

// Highlight animation: maps capability key -> remaining highlight frames.
let highlightFrames = {};

let resetButton;

// Layout breakpoint: stack panels vertically below this width.
let stackBreakpoint = 640;

// Toggle switch geometry (recomputed each frame for responsiveness).
let toggleHitboxes = []; // {x, y, w, h, index}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Reset All Toggles button (native p5 control) in the control region.
  resetButton = createButton('Reset All Toggles');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(margin, drawHeight + 10);
  resetButton.mousePressed(resetAllToggles);

  describe('Interactive explorer with four toggle switches for agent capabilities: ' +
    'Agent Autonomy, Iterative Workflow, Tool Use, and Multi-Agent Collaboration. ' +
    'A behavior panel updates live as each toggle is switched, adding or removing one ' +
    'sentence describing what that capability enables. With all toggles off the panel ' +
    'shows the baseline generative-AI-only behavior.', LABEL);
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

  // --- Title (drawn after backgrounds) ---
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Agent Capability Explorer', canvasWidth / 2, 12);

  textAlign(CENTER, TOP);
  textSize(14);
  fill('dimgray');
  noStroke();
  text('Illustrative simulation - no live AI model', canvasWidth / 2, 40);

  // Decrement highlight animation counters.
  for (let k in highlightFrames) {
    if (highlightFrames[k] > 0) highlightFrames[k]--;
  }

  // Choose layout: side by side on wide viewports, stacked when narrow.
  let stacked = canvasWidth < stackBreakpoint;

  if (stacked) {
    drawToggleColumn(margin, 68, canvasWidth - 2 * margin, 200);
    drawBehaviorPanel(margin, 280, canvasWidth - 2 * margin, drawHeight - 280 - margin);
  } else {
    // Left toggle column ~300px, right behavior panel ~remaining.
    let leftW = 300;
    let gap = 20;
    let topY = 68;
    let panelH = drawHeight - topY - margin;
    drawToggleColumn(margin, topY, leftW - margin, panelH);
    let rightX = margin + leftW + gap;
    drawBehaviorPanel(rightX, topY, canvasWidth - rightX - margin, panelH);
  }

  // Control label reminder in the control region.
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  let activeCount = capabilities.filter(c => c.on).length;
  text('Capabilities on: ' + activeCount + ' of 4', margin + 190, drawHeight + 25);
}

// Draw the column of four toggle switches. Records hitboxes for click handling.
function drawToggleColumn(x, y, w, h) {
  toggleHitboxes = [];

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Capabilities', x, y);

  let rowH = 44;
  let startY = y + 28;
  let switchW = 52;
  let switchH = 26;

  for (let i = 0; i < capabilities.length; i++) {
    let cap = capabilities[i];
    let ry = startY + i * rowH;

    // Toggle switch track.
    let hot = highlightFrames[cap.key] && highlightFrames[cap.key] > 0;
    stroke('silver');
    strokeWeight(1);
    if (cap.on) {
      fill(hot ? 'gold' : 'mediumseagreen');
    } else {
      fill('lightgray');
    }
    rect(x, ry, switchW, switchH, switchH / 2);

    // Toggle knob.
    noStroke();
    fill('white');
    let knobX = cap.on ? x + switchW - switchH / 2 : x + switchH / 2;
    circle(knobX, ry + switchH / 2, switchH - 6);

    // ON / OFF micro-label inside track.
    noStroke();
    fill(cap.on ? 'white' : 'gray');
    textSize(10);
    textAlign(CENTER, CENTER);
    if (cap.on) {
      text('ON', x + switchH / 2 + 2, ry + switchH / 2);
    } else {
      text('OFF', x + switchW - switchH / 2 - 1, ry + switchH / 2);
    }

    // Capability label to the right of the switch.
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(15);
    let labelX = x + switchW + 12;
    text(cap.label, labelX, ry + switchH / 2);

    // Record hitbox spanning switch + label so either is clickable.
    toggleHitboxes.push({
      x: x,
      y: ry,
      w: (labelX + textWidth(cap.label)) - x,
      h: switchH,
      index: i
    });
  }
}

// Draw the "Simulated Agent Behavior" panel with live sentences.
function drawBehaviorPanel(x, y, w, h) {
  // Panel card.
  stroke('silver');
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(x, y, w, h, 10);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Simulated Agent Behavior', x + 14, y + 12);

  let anyOn = capabilities.some(c => c.on);
  let allOn = capabilities.every(c => c.on);

  let contentX = x + 14;
  let contentW = w - 28;
  let cursorY = y + 42;
  let lineGap = 6;

  textAlign(LEFT, TOP);
  textSize(15);

  if (!anyOn) {
    // Baseline generative-AI-only behavior.
    fill('black');
    noStroke();
    cursorY = drawWrappedBullet(baselineBehavior, contentX, cursorY, contentW, lineGap, 'gray');
    cursorY += 10;
    // Caption for Stage 1.
    fill('saddlebrown');
    noStroke();
    textSize(14);
    cursorY = drawWrappedText('This is generative AI without agent capabilities.',
      contentX, cursorY, contentW, lineGap);
  } else {
    // One bullet per active capability, in fixed order.
    for (let i = 0; i < capabilities.length; i++) {
      let cap = capabilities[i];
      if (!cap.on) continue;
      let hot = highlightFrames[cap.key] && highlightFrames[cap.key] > 0;
      let dotColor = hot ? 'goldenrod' : 'mediumseagreen';
      textSize(15);
      cursorY = drawWrappedBullet(cap.behavior, contentX, cursorY, contentW, lineGap, dotColor);
      cursorY += 8;
    }
    // Caption for Stage 3 when all four are on.
    if (allOn) {
      cursorY += 4;
      fill('darkgreen');
      noStroke();
      textSize(14);
      cursorY = drawWrappedText('This is a fully capable intelligent agent.',
        contentX, cursorY, contentW, lineGap);
    }
  }
}

// Draw a colored bullet dot plus wrapped text. Returns the new y cursor.
function drawWrappedBullet(str, x, y, w, lineGap, dotColor) {
  let indent = 16;
  noStroke();
  fill(dotColor);
  circle(x + 4, y + 8, 8);
  fill('black');
  return drawWrappedText(str, x + indent, y, w - indent, lineGap);
}

// Word-wrap helper. Returns the y position after the last line.
function drawWrappedText(str, x, y, w, lineGap) {
  let words = str.split(' ');
  let line = '';
  let lineH = textAscent() + textDescent() + lineGap;
  let cy = y;
  for (let n = 0; n < words.length; n++) {
    let test = line + words[n] + ' ';
    if (textWidth(test) > w && line.length > 0) {
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

// Handle clicks on any toggle hitbox.
function mousePressed() {
  for (let hb of toggleHitboxes) {
    if (mouseX >= hb.x && mouseX <= hb.x + hb.w &&
        mouseY >= hb.y && mouseY <= hb.y + hb.h) {
      let cap = capabilities[hb.index];
      cap.on = !cap.on;
      // Trigger a brief highlight animation only when turning ON.
      if (cap.on) {
        highlightFrames[cap.key] = 30;
      } else {
        highlightFrames[cap.key] = 0;
      }
      return;
    }
  }
}

// Reset every toggle to off (baseline generative-AI-only state).
function resetAllToggles() {
  for (let cap of capabilities) {
    cap.on = false;
  }
  highlightFrames = {};
}

// ---- Responsive plumbing (must be at end) ----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  // Reposition the reset button; no sliders to resize in this sim.
  resetButton.position(margin, drawHeight + 10);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}
