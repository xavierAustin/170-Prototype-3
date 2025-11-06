function preload() {
    bubbleImg = loadImage("img/seal.png");
}

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    initGame(); 
}

function draw() {
    drawGame(); 
}

mState = { x: 0, y: 0, px: 0, py: 0 };

function mouseMoved(ev) {
    mState.px = mState.x;
    mState.py = mState.y;
    mState.x = ev.offsetX;
    mState.y = ev.offsetY;
}
