let players = [];
let dirts = [];
const NUM_DIRT = 24;       // total dirt blobs
const CLEAN_RADIUS = 20;   // how close you must be to clean
const SPEED = 3;           // player movement speed
let keys = {};             // pressed keys map
let gameOver = false;
let showControls = true;
let allowRestart = true;

function restart(){
  players = [];
  dirts = [];
  gameOver = false;

  players = [(new Player(
    width * 0.25, height * 0.5,
    color(70, 150, 255),
    { up: 'w', down: 's', left: 'a', right: 'd' },
    "P1"
  )),
  (new Player(
    width * 0.75, height * 0.5,
    color(255, 80, 80),
    { up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright' },
    "P2"
  ))];

  // Scatter dirt blobs around the window
  const margin = 24;
  for (let i = 0; i < NUM_DIRT; i++) {
    dirts.push({
      x: random(margin, width - margin),
      y: random(margin, height - margin),
      r: random(6, 12),      // radius
      cleanedBy: null        // "P1" or "P2"
    });
  }
}

function setup() {
  createCanvas(720, 480);

  restart();

  textFont('sans-serif');
}

function draw() {
  if (allowRestart && keys["0"])
    restart();
  if (keys["0"])
    allowRestart = false;
  else
    allowRestart = gameOver || (players[0].score < 3 && players[1].score < 3);

  background(255);
  push();
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Controls\n\n\nPlayer 1: Use WASD\nPlayer 2: Use Arrow Keys\nBoth Players: Restart with 0\n\nClick the window to hide this screen,\nclick again to show",width/2,height/2);
  pop();

  if (gameOver || showControls)
    return;

  background(220, 240, 255); // light glass-like background

  // Window grid
  stroke(200, 220, 240);
  for (let gx = 0; gx < width; gx += 60) line(gx, 0, gx, height);
  for (let gy = 0; gy < height; gy += 60) line(0, gy, width, gy);
  noStroke();

  // Draw remaining dirts
  for (const d of dirts) {
    if (!d.cleanedBy) {
      fill(120, 120, 120, 200);
      circle(d.x, d.y, d.r * 2);
    }
  }

  // Update players (movement + cleaning), then draw
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    p.update();
    p.cleanNearby();
    p.draw();
  } 

  // Scores
  drawHUD();

  // all dirts cleaned
  if (!gameOver && dirts.every(d => d.cleanedBy)) {
    gameOver = true;
    //noLoop();
    showWinner();
  }
}

function drawHUD() {
  fill(255, 255, 255, 180);
  rect(10, 10, 260, 64, 8);
  fill(0);
  textSize(14);
  textAlign(LEFT, TOP);
  const p1 = players[0], p2 = players[1];
  text(`P1 (Blue) Score: ${p1.score}`, 20, 18);
  text(`P2 (Red)  Score: ${p2.score}`, 20, 40);
}

function showWinner() {
  const [p1, p2] = players;
  let msg = "Draw!";
  if (p1.score > p2.score) msg = "P1 wins!";
  else if (p2.score > p1.score) msg = "P2 wins!";

  fill(0, 160);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(255);
  text(`All clean! ${msg}\nP1: ${p1.score}  |  P2: ${p2.score}`, width / 2, height / 2);
}

// Input handling 
function keyPressed() {
  let k = key || '';
  if (k.length === 1) 
    k = k.toLowerCase();
  keys[k.toLowerCase()] = true;
  return false;
}

function keyReleased() {
  let k = key || '';
  if (k.length === 1) 
    k = k.toLowerCase();
  keys[k.toLowerCase()] = false;
  return false;
}

function mouseClicked(){
  showControls = !showControls;
}

class Player {
  constructor(x, y, col, controls, name) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.controls = controls; // expects lower-case key names
    this.name = name;         // "P1" or "P2"
    this.score = 0;
    this.radius = 13;         // player body radius
  }

  update() {
    // Movement based on key map
    if (keys[this.controls.up])    this.y -= SPEED;
    if (keys[this.controls.down])  this.y += SPEED;
    if (keys[this.controls.left])  this.x -= SPEED;
    if (keys[this.controls.right]) this.x += SPEED;

    // Keep inside the window
    this.x = constrain(this.x, this.radius, width - this.radius);
    this.y = constrain(this.y, this.radius, height - this.radius);
  }

  cleanNearby() {
    // Clean any dirt within CLEAN_RADIUS
    for (const d of dirts) {
      if (!d.cleanedBy) {
        const distToDirt = dist(this.x, this.y, d.x, d.y);
        if (distToDirt <= CLEAN_RADIUS + d.r) {
          d.cleanedBy = this.name;
          this.score += 1;
        }
      }
    }
  }

    draw() {
    fill(this.col);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
    }
}
