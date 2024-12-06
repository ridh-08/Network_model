let nodes = [];
let edges = [];
let infectionRadius = 50;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 20; i++) {
    nodes.push({ x: random(width), y: random(height), infected: false });
  }
  // Create edges between nodes if they are close enough
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y) < infectionRadius) {
        edges.push([i, j]);
      }
    }
  }
}

function draw() {
  background(220);
  
  // Draw edges
  stroke(0, 100);
  for (let edge of edges) {
    let [i, j] = edge;
    line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
  }
  
  // Draw nodes
  noStroke();
  for (let node of nodes) {
    fill(node.infected ? 'red' : 'blue');
    circle(node.x, node.y, 15);
  }
}

function mousePressed() {
  // Infect a node if clicked
  for (let node of nodes) {
    if (dist(mouseX, mouseY, node.x, node.y) < 15) {
      node.infected = true;
      spreadInfection(node);
    }
  }
}

function spreadInfection(node) {
  for (let edge of edges) {
    let [i, j] = edge;
    if ((nodes[i] === node && !nodes[j].infected) || (nodes[j] === node && !nodes[i].infected)) {
      nodes[i].infected = true;
      nodes[j].infected = true;
    }
  }
}