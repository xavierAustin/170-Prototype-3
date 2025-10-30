
let bg;
let kb;
let ei;
let forests = [];
let monsters = [];

//remove the right click menu
document.addEventListener('contextmenu', event => event.preventDefault());

function preload(){
    bg = loadImage('img/photoFrame.png');
    kb = loadImage('img/keyboard.png');
    ei = loadImage('img/forest3.jpg');
    forests.push(loadImage('img/forest1.jpg'));
    forests.push(loadImage('img/forest2.jpg'));
    forests.push(loadImage('img/forest3.jpg'));
    forests.push(loadImage('img/forest4.jpeg'));
    forests.push(loadImage('img/forest5.png'));
    forests.push(loadImage('img/forest6.jpg'));
    forests.push(loadImage('img/forest7.jpg'));
    monsters.push(loadImage('img/monster1.png'));
    monsters.push(loadImage('img/monster2.jpg'));
    monsters.push(loadImage('img/monster3.png'));
    monsters.push(loadImage('img/monster4.png'));
    monsters.push(loadImage('img/monster5.png'));
    monsters.push(loadImage('img/monster6.png'));
    monsters.push(loadImage('img/monster7.png'));
    monsters.push(loadImage('img/monster8.png'));
    monsters.push(loadImage('img/monster9.png'));
}

function setup(){
    randomSeed();
    createCanvas(1080,810);
    let fI = floor(random(forests.length));
    let mI = floor(random(monsters.length));
    bGround = new ScrubImage({
        "image": forests[fI],
        "x": width*0.359, 
        "y": height*0.38, 
        "w": width*0.3,
        "h": height*0.365,
        "regions": [new Region(
            width*0.359 + random(width*0.3*0.75), 
            height*0.38 + height*0.365*0.25 + random(height*0.365*0.5),
            sqrt(monsters[mI].width  / width) * 100,
            sqrt(monsters[mI].height / height) * 100,
            monsters[mI]
        )]
    });
    /*
    monster = new ScrubImage({
        "image": monsters[mI],
        "x": width*0.359 + random(width*0.3*0.75), 
        "y": height*0.38 + height*0.365*0.25 + random(height*0.365*0.5),
        "w": monsters[mI].width / width * 50,
        "h": monsters[mI].height / height * 50
    });
    */
}

function draw(){
    randomSeed(1);
    background(255);
    bGround.update();
    bGround.draw();
    //monster.update();
    //monster.draw();
    filter(POSTERIZE, 8);
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
