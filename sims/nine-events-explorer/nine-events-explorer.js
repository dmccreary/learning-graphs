// nine-events-explorer.js
// Interactive Mermaid MicroSim: Gagne's Nine Events of Instruction.
// Bloom L2 (Understand): learner clicks each sequential event to read what
// instructional purpose it serves and which earlier chapter's concept it
// operationalizes.
//
// CANVAS_HEIGHT: 920
//
// The showInfo() function below is wired to each Mermaid node via a
// `click NodeId call showInfo("N")` directive in main.html. It must be a
// global (attached to window) because Mermaid invokes click callbacks by name
// on the window object. mermaid.initialize() must set securityLevel:'loose'
// for these callbacks to fire.

// Ordered step data. `preview` is the short hover tooltip shown before a click.
// `title` and `description` populate the infobox on click. `concept` names the
// cross-chapter concept the step operationalizes (or null for steps original to
// Gagne's framing).
const STEP_DATA = {
  "1": {
    order: 1,
    title: "Gain Attention",
    preview: "Get the learner's focus before instruction begins.",
    description: "Signals to the learner that something worth their focus is beginning.",
    concept: null
  },
  "2": {
    order: 2,
    title: "Inform Objectives",
    preview: "Tell the learner what they should be able to do.",
    description: "States the learning objective in observable terms.",
    concept: "Chapter 6: Learning Objectives"
  },
  "3": {
    order: 3,
    title: "Stimulate Recall of Prior Knowledge",
    preview: "Reactivate what the learner already knows.",
    description: "This is Prior Knowledge Activation from Chapter 8, named independently by Gagne.",
    concept: "Chapter 8: Prior Knowledge Activation"
  },
  "4": {
    order: 4,
    title: "Present Content",
    preview: "Deliver the new material.",
    description: "Delivers the new material itself.",
    concept: null
  },
  "5": {
    order: 5,
    title: "Provide Learning Guidance",
    preview: "Scaffold the learner with support and examples.",
    description: "Offers scaffolding and worked examples.",
    concept: "Chapter 7: Scaffolding and Worked Examples"
  },
  "6": {
    order: 6,
    title: "Elicit Performance",
    preview: "Have the learner practice the skill.",
    description: "Has the learner practice or demonstrate the skill.",
    concept: null
  },
  "7": {
    order: 7,
    title: "Provide Feedback",
    preview: "Give corrective information about the practice.",
    description: "Gives specific, corrective information about that practice.",
    concept: null
  },
  "8": {
    order: 8,
    title: "Assess Performance",
    preview: "Verify mastery before advancing.",
    description: "Formally verifies mastery, gating advancement.",
    concept: "Chapter 7: Mastery Learning"
  },
  "9": {
    order: 9,
    title: "Enhance Retention and Transfer",
    preview: "Reinforce over time and apply to new contexts.",
    description: "Applies Spaced Repetition and connects the concept to new contexts.",
    concept: "Spaced Repetition"
  }
};

// Track which node is currently highlighted gold so we can clear it.
let currentSelectedId = null;

// Map a step id ("1".."9") to the rendered Mermaid SVG node element.
// Mermaid assigns each node an id of the form "flowchart-<NodeId>-<n>".
function findNodeElement(stepId) {
  const nodes = document.querySelectorAll(".mermaid .node");
  for (const node of nodes) {
    const cleaned = node.id.replace("flowchart-", "").split("-")[0];
    if (cleaned === "E" + stepId) {
      return node;
    }
  }
  return null;
}

// Apply the gold "selected" highlight to a node, clearing any previous one.
function highlightNode(stepId) {
  if (currentSelectedId !== null) {
    const prev = findNodeElement(currentSelectedId);
    if (prev) prev.classList.remove("selected");
  }
  const el = findNodeElement(stepId);
  if (el) el.classList.add("selected");
  currentSelectedId = stepId;
}

// Global callback invoked by every Mermaid `click` directive.
// Populates the infobox and highlights the clicked node in gold.
function showInfo(stepId) {
  const data = STEP_DATA[String(stepId)];
  if (!data) return;

  const infobox = document.getElementById("infobox");
  if (!infobox) return;

  let html = "";
  html += '<div class="infobox-step">Step ' + data.order + " of 9</div>";
  html += '<div class="infobox-title">' + data.title + "</div>";
  html += '<div class="infobox-desc">' + data.description + "</div>";
  if (data.concept) {
    html += '<div class="infobox-concept">';
    html += '<span class="infobox-concept-label">Operationalizes:</span> ';
    html += data.concept;
    html += "</div>";
  } else {
    html += '<div class="infobox-concept infobox-concept-original">';
    html += "Original to Gagne's framework (not a relabeled earlier concept).";
    html += "</div>";
  }
  infobox.innerHTML = html;

  highlightNode(String(stepId));
}
// Expose to window so Mermaid's click directives can resolve it by name.
window.showInfo = showInfo;

// ----- Hover tooltip preview (before a click) -----

let tooltipEl = null;

function ensureTooltip() {
  if (!tooltipEl) {
    tooltipEl = document.getElementById("tooltip");
  }
  return tooltipEl;
}

function positionTooltip(evt) {
  const tip = ensureTooltip();
  if (!tip) return;
  const pad = 14;
  let x = evt.clientX + pad;
  let y = evt.clientY + pad;
  const rect = tip.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - 8;
  const maxY = window.innerHeight - rect.height - 8;
  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;
  tip.style.left = x + "px";
  tip.style.top = y + "px";
}

// Attach hover + pointer affordance to every rendered node.
function setupNodeInteractions() {
  const nodes = document.querySelectorAll(".mermaid .node");
  nodes.forEach((node) => {
    const stepId = node.id.replace("flowchart-", "").split("-")[0]; // e.g. "E3"
    if (!/^E[1-9]$/.test(stepId)) return;
    const key = stepId.slice(1);
    const data = STEP_DATA[key];
    if (!data) return;

    node.classList.add("clickable-node");

    node.addEventListener("mouseenter", (e) => {
      const tip = ensureTooltip();
      if (tip) {
        tip.textContent = data.preview;
        tip.classList.add("visible");
        positionTooltip(e);
      }
    });
    node.addEventListener("mousemove", positionTooltip);
    node.addEventListener("mouseleave", () => {
      const tip = ensureTooltip();
      if (tip) tip.classList.remove("visible");
    });
  });
}

// Robust polling: wait until Mermaid has rendered the SVG and its nodes.
function waitForMermaid() {
  const mermaidDiv = document.querySelector(".mermaid");
  const svg = mermaidDiv ? mermaidDiv.querySelector("svg") : null;
  const nodes = document.querySelectorAll(".mermaid .node");
  if (svg && nodes.length > 0) {
    setupNodeInteractions();
  } else {
    setTimeout(waitForMermaid, 100);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(waitForMermaid, 100));
} else {
  setTimeout(waitForMermaid, 100);
}
