
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
        this.x = x + 600;
        this.y = y;
        this.r = r;
        this.speed = random(1.5, 3);

        this.spots = [];
        let numSpots = int(random(10, 20));
        for (let i = 0; i < numSpots; i++) {
            this.spots.push({
                ox: random(-this.r * 0.8, this.r * 0.8),
                oy: random(-this.r * 0.6, this.r * 0.6),
                size: random(6, 14),
                visible: true
            });
        }
    }

    draw() {
        push();
        imageMode(CENTER);
        noTint();
        image(bubbleImg, this.x, this.y, this.r * 2.2, this.r * 1.6);
        pop();

        noStroke();
        fill(110, 70, 30);
        for (let s of this.spots) {
            if (s.visible) {
                ellipse(this.x + s.ox, this.y + s.oy, s.size);
            }
        }
    }

    update() {
        this.x -= this.speed;

        // Scrubbing detection
        let moved = dist(mState.x, mState.y, mState.px, mState.py);
        if (moved > 0.5) {
            let d = dist(mState.x, mState.y, this.x, this.y);
            if (d < this.r) {
                // Randomly remove spots
                for (let i = 0; i < this.spots.length; i++) {
                    if (this.spots[i].visible && random() < 0.1) {
                        this.spots[i].visible = false;
                    }
                }
            }
        }

        let remaining = this.spots.filter(s => s.visible).length;

        if (remaining === 0) {
            score++;
            return true; 
        }

        if (this.x < -this.r) {
            missed++;
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
