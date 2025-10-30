function preload(){
    //load images
}

function setup(){
    createCanvas(800,600);
    currentImage = new ScrubbableImage();
}

function draw(){
    background(255);
    currentImage.update();
    currentImage.draw();
    //set after everything else is done
    mState.p = 0;
}

//track mouse state
mState = {p: 0, d: 0, x: 0, y: 0};
function mousePressed(ev){
    mState = {p: 1, d: 1, x: ev.x, y: ev.y};
}
function mouseDragged(ev){
    mState = {p: mState.p, d: 1, x: ev.x, y: ev.y};
}
function mouseReleased(){
    mState.d = 0;
}