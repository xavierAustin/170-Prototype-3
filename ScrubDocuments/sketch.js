let bg;
let kb;
let ei;

function preload(){
    bg = loadImage('img/photoFrame.png');
    kb = loadImage('img/keyboard.png');
    ei = loadImage('img/forest2.jpg');
}

function setup(){
    createCanvas(800,600);
    currentImage = new ScrubImage({
        "image": ei, 
        "x": width*0.359, 
        "y": height*0.38, 
        "w": width*0.3, 
        "h": height*0.365
    });
}

function draw(){
    background(255);
    currentImage.update();
    currentImage.draw();
    image(bg, 0, 0, width, height);
    image(kb, 0, 0, width, height);
    
    //set after everything else is done
    mState.p = 0;
}

//track mouse state
mState = {p: 0, d: 0, x: 0, y: 0, button: 0};
function mousePressed(ev){
    //console.log(ev);
    mState = {p: 1, d: 1, x: ev.x, y: ev.y, button: ev.button};
}
function mouseDragged(ev){
    mState = {p: mState.p, d: 1, x: ev.x, y: ev.y, button: mState.button};
}
function mouseReleased(){
    mState.d = 0;
}