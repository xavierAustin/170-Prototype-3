function preload(){
    //load images
}

function setup(){
    createCanvas(1280,720);
    currentImage = new ScrubbableImage();
}

function draw(){
    background(255);
    currentImage.update();
    currentImage.draw();
}

//track mouse state
mState = {p: 0, d: 0, x: 0, y: 0};
function mousePressed(ev){
    mState = {p: 1, d: 1, x: ev.x, y: ev.y};
}
function mouseDragged(ev){
    mState = {p: 0, d: 1, x: ev.x, y: ev.y};
}
function mouseReleased(){
    mState.d = 0;
}