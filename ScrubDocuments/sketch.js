function preload(){
    //load images
}

function setup(){
    createCanvas(1280,720);
    ima = new ScrubbableImage();
}

function draw(){
    background(255);
}

//track mouse state
mState = {p: 0, x: 0, y: 0};
function mouseDragged(ev){
    mState = {p: 1, x: ev.x, y: ev.x};
}
function mouseReleased(){
    mState.p = 0;
}