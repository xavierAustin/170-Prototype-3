function preload() {
    bubbleImg = loadImage("img/seal.png");
}

function setup() {
    createCanvas(800, 600);
    initGame(); 
}

function draw() {
    drawGame(); 
}

mState = { down: false, x: 0, y: 0, px: 0, py: 0 };

function mousePressed(ev) {
    mState.down = true;
    mState.x = ev.x;
    mState.y = ev.y;
}

function mouseDragged(ev) {
    mState.px = mState.x;
    mState.py = mState.y;
    mState.x = ev.x;
    mState.y = ev.y;
}

function mouseReleased() {
    mState.down = false;
}