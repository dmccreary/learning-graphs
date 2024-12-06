// the width of the entire canvas
let canvasWidth = 800;
let canvasHeight = 600;
let topNodes = [];
let bottomNodes = [];
let topEdges = [];
let bottomEdges = [];
let conceptToContentEdges = []; // Store the edges between top and bottom layers

let numberConceptNodes = 40;  // top level are concept nodes in green
let numberContentNodes = 40;  // the bottom level are concent nodes in blue on the bottom
let numberConceptContentConnections = 20;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  noStroke();
  
  // Generate random nodes for top concepts layer
  for (let i = 0; i < numberConceptNodes; i++) {
    topNodes.push({ 
      x: random(-200, 200), 
      y: random(-100, 100) 
    });
  }
  
  // Generate random nodes for bottom content layer
  for (let i = 0; i < numberContentNodes; i++) {
    bottomNodes.push({ 
      x: random(-200, 200), 
      y: random(-100, 100) 
    });
  }
  
  // Random edges for top layer
  for (let i = 0; i < numberConceptNodes * 1.2; i++) {
    let a = floor(random(topNodes.length));
    let b = floor(random(topNodes.length));
    if (a !== b) {
      topEdges.push({ from: a, to: b });
    }
  }
  
  // Random edges for bottom layer
  for (let i = 0; i < numberContentNodes * 1.2; i++) {
    let a = floor(random(bottomNodes.length));
    let b = floor(random(bottomNodes.length));
    if (a !== b) {
      bottomEdges.push({ from: a, to: b });
    }
  }
  
  // Generate the concept-to-content edges only once
  for (let i = 0; i < numberConceptContentConnections; i++) {
    let topIndex = floor(random(topNodes.length));
    let bottomIndex = floor(random(bottomNodes.length));
    conceptToContentEdges.push({ topIndex: topIndex, bottomIndex: bottomIndex });
  }
}

function draw() {
  background('aliceblue');
  
  // Enable mouse control for rotation/zoom
  // orbitControl();
  orbitControl(1, 1, 0.1);

  
  // Slight rotation so we start with a perspective view
  rotateX(PI/3);
  rotateY(0);

  // Draw top green layer (concepts) at z = 100
  push();
  drawGraph(topNodes, topEdges, color(25, 100, 25, 150), 100, color('lightgreen'));
  pop();
  
  // Draw bottom layer (content) at z = -100
  push();
  drawGraph(bottomNodes, bottomEdges, color(0, 0, 255, 150), -100, color('lightblue'));
  pop();
  
  // Draw precomputed concept-to-content edges
  drawConceptToContentEdges();
}

function drawGraph(nodes, edges, col, zPos, edgeColor) {
  // Draw edges
  stroke(edgeColor, 10);
  strokeWeight(1);
  for (let e of edges) {
    let n1 = nodes[e.from];
    let n2 = nodes[e.to];
    line(n1.x, n1.y, zPos, n2.x, n2.y, zPos);
  }
  
  // Draw nodes
  noStroke();
  fill(col);
  for (let n of nodes) {
    push();
    translate(n.x, n.y, zPos);
    circle(0, 0, 20); // Nodes as circles
    pop();
  }
}

function drawConceptToContentEdges() {
  stroke(200, 0, 200, 100);
  strokeWeight(2);
  
  for (let edge of conceptToContentEdges) {
    let t = topNodes[edge.topIndex];
    let b = bottomNodes[edge.bottomIndex];
    line(t.x, t.y, 100, b.x, b.y, -100);
  }
}
