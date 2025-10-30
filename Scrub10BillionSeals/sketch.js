function preload(){
    //load images
}

function setup(){
    //idk do stuff :)
}

function draw(){
    //guess
}

//track mouse state
mState = {p: 0, x: 0, y: 0};
function mouseDragged(ev){
    mState = {p: 1, x: ev.x, y: ev.x};
}
function mouseReleased(){
    mState.p = 0;
}