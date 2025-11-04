
let seals = [];
let score = 0;
let missed = 0;
let nextSpawn = 0;
let gameOver = false;

function initGame() {
    seals = [];
    score = 0;
    missed = 0;
    nextSpawn = millis() + 1000;
    gameOver = false;
}

class Seal {
    constructor(x, y, r = 50) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dirty = 100; // 100 = filthy, 0 = clean
        this.life = millis() + 12000; 
    }

    draw() {
    push();
    imageMode(CENTER);

    if (this.dirty > 0) {
        let alpha = map(this.dirty, 0, 100, 255, 180);
        tint(255, alpha);
    } else {
        noTint();
    }

    image(bubbleImg, this.x, this.y, this.r * 2.2, this.r * 1.6);

    pop();

    noFill();
    stroke(50, 150, 200);
    strokeWeight(4);

    let arcLen = map(this.dirty, 0, 100, 0, TWO_PI);

    arc(this.x, this.y, this.r * 2.4, this.r * 1.8, -HALF_PI, -HALF_PI + arcLen);
    }



    update() {
        if (millis() > this.life) {
            missed++;
            return true; 
        }

        // Always detect cursor movement (no need to hold mouse down)
        let moved = dist(mState.x, mState.y, mState.px, mState.py);
        if (moved > 0.5) { 
            let d = dist(mState.x, mState.y, this.x, this.y);
            if (d < this.r) {
                this.dirty -= moved * 0.7;
                if (this.dirty < 0) this.dirty = 0;
            }
        }

        // if clean
        if (this.dirty <= 0) {
            score++;
            return true;
        }

        return false;
    }
}

function drawGame() {
    background(220, 240, 255);

    if (gameOver) {
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(0);
        text("Game Over\nScore: " + score + "\nPress R to restart", width / 2, height / 2);
        return;
    }

    if (millis() > nextSpawn) {
        seals.push(new Seal(random(80, width - 80), random(80, height - 80)));
        nextSpawn = millis() + 1500;
    }

    for (let i = seals.length - 1; i >= 0; i--) {
        if (seals[i].update()) {
            seals.splice(i, 1);
        } else {
            seals[i].draw();
        }
    }


    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);
    text("Missed: " + missed + " / 5", 10, 30);

    if (missed >= 5) {
        gameOver = true;
    }
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        initGame();
    }
}
