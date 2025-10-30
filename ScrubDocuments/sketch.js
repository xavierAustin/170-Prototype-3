let bg;
let kb;
let ei;
let forests = [];
let monsters = [];
let t;
let tS;
let m;
let images = [];
let duration = 2500; //anim duration
let easing = false;

//remove the right click menu
document.addEventListener('contextmenu', event => event.preventDefault());

function preload(){
    bg1 = loadImage('img/photoFrame.png');
    bg2 = loadImage('img/photoFrame.png');
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
    let fI0 = floor(random(forests.length));
    let mI0 = floor(random(monsters.length));
    let fI1 = floor(random(forests.length));
    let mI1 = floor(random(monsters.length));

    images.push(new ScrubImage({
        "image": forests[fI0],
        "x": width*0.359-width, 
        "y": height*0.38, 
        "w": width*0.3,
        "h": height*0.375,
        "regions": [new Region(
            random(width*0.3*0.5),
            height*0.365*0.75+random(height*0.365*0.25),
            sqrt(monsters[mI0].width  / width) * 100,
            sqrt(monsters[mI0].height / height) * 100,
            monsters[mI0]
        )]
        
    }));
    images.push(new ScrubImage({
        "image": forests[fI1],
        "x": width*0.359, 
        "y": height*0.38, 
        "w": width*0.3,
        "h": height*0.375,
        "regions": [new Region(
            random(width*0.3*0.5),
            height*0.365*0.75+random(height*0.365*0.25),
            sqrt(monsters[mI1].width  / width) * 100,
            sqrt(monsters[mI1].height / height) * 100,
            monsters[mI1]
        )]
        
    }));
    /*
    monster = new ScrubImage({
        "image": monsters[mI],
        "x": width*0.359 + random(width*0.3*0.75), 
        "y": height*0.38 + height*0.365*0.25 + random(height*0.365*0.5),
        "w": monsters[mI].width / width * 50,
        "h": monsters[mI].height / height * 50
    });
    */
   
    tS = millis();
    t = millis();
}

function draw(){
    background(255);
    
    m = millis() - tS;
    
    for (let img of images) {
        img.update();
        img.draw();
        
    }

    filter(POSTERIZE, 8);
    
    if (images[0].won) {
        let buf = images[1];
        images[1] = images[0];
        images[0] = buf;
        t = m;
        easing = true;
    }
    if (m - t > duration && easing) {
        let fI = floor(random(forests.length));
        let mI = floor(random(monsters.length));
        images[1] = new ScrubImage({
            "image": forests[fI],
            "x": width*0.359-width, 
            "y": height*0.38, 
            "w": width*0.3,
            "h": height*0.375,
            "regions": [new Region(
                random(width*0.3*0.5),
                height*0.365*0.75+random(height*0.365*0.25),
                sqrt(monsters[mI].width  / width) * 100,
                sqrt(monsters[mI].height / height) * 100,
                monsters[mI]
            )]
        });
        easing = false;
    }

    
    let x0 = easeAnim(-width, 0, t);
    let x1 = easeAnim(0, width, t);
    let x2 = easeAnim(width*0.359-width, width*0.359, t);
    let x3 = easeAnim(width*0.359, width*0.359+width, t);
    

    image(bg2, x0, 0, width, height);
    image(bg1, x1, 0, width, height);
    images[0].setX(x2);
    images[1].setX(x3);
    image(kb, 0, 0, width, height);

    for (let img of images) {
        img.drawWinMessage();
    }
    
    
    //set after everything else is done
    mState.p = 0;
}

function easeAnim(start, end, t) {
  let elapsed = m - t;
  if (elapsed < 0) return start; 
  if (elapsed > duration) elapsed = duration; 

  let progress = elapsed / duration;
  let eased = (1 - cos(progress * PI)) / 2;

  return start + (end - start) * eased;
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