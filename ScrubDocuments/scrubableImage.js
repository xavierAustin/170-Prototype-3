const WEIGHT = 10;

class ScrubImage {
    constructor(selections = {}){
        //mutable
        this.points = [];
        this.regions = [];
        this.w = width;
        this.h = height;
        this.x = 0;
        this.y = 0;
        this.image = null;
        this.won = false;

        for (let x in selections){
            if (this[x] === undefined)
                throw new Error("Non-existant object variable: " + x);
            if (typeof this[x] == "function")
                throw new Error("Please don't modify methods dynamically ;-; its mean.");
            this[x] = selections[x];
        }

        //unmutable
        let w = 0;
        let h = 0;
        for (let region of this.regions){
            //console.log(region.x0,region.x1,region.y0,region.y1);
            w += region.x1 - region.x0;
            h += region.y1 - region.y0;
        }
        this.winThreshold = sqrt(w * h) * 1.4;
    }
    update(){
        if (mState.d && mState.button == 0 && !this.won)
            this.points.push({x: mState.x - this.x, y: mState.y - this.y, end: mState.p});
        else if (mState.d && !this.won)
            this.points = [];
            //for (let i = 0; i < this.points.length; i ++)
            //    if (abs(this.points[i].x - mState.x) + abs(this.points[i].y - mState.y) < WEIGHT * 2){
            //        if (this.points[i + 1])
            //            this.points[i + 1].end = 1;
            //        this.points.splice(i,1);
            //    }
        if (!(frameCount % 10))
            this.checkWin();
    }

    checkWin() {
        let score = 0;

        for (let region of this.regions) {
            let yMin = Math.min(region.y0, region.y2);
            let yMax = Math.max(region.y0, region.y2);

            for (let i of this.points) {
                let sameAsOtherPoint = false;

                for (let j of this.points) {
                    if (i === j) break;
                    sameAsOtherPoint +=
                        (10 > abs(j.x - i.x) + abs(j.y - i.y)) &&
                        this.points.indexOf(i) - this.points.indexOf(j) > 10 &&
                        (j.x > region.x0 &&
                         j.y > yMin &&
                         j.x < region.x1 &&
                         j.y < yMax);
                }

                if (
                    i.x > region.x0 &&
                    i.y > yMin &&
                    i.x < region.x1 &&
                    i.y < yMax &&
                    !sameAsOtherPoint
                ) {
                    score++;
                }
            }
        }

        //console.log("score:", score);
        if (score > this.winThreshold) this.won = true;
    }

    draw(){
        if (this.image)
            image(this.image,this.x,this.y,this.w,this.h);
        
        push();
        translate(this.x, this.y);
        for (let x of this.regions) {
            x.draw();
        }
        stroke(255,0,0);
        strokeWeight(WEIGHT);
        
        for (let i in this.points){
            let p0 = this.points[i];
            let p1 = this.points[i - 1];
            

            if (p0.end){
                point(p0.x, p0.y);
                continue;
            }
            if (p1)
                line(p0.x,p0.y,p1.x,p1.y);
        }
        pop();
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    drawWinMessage(){
        if (this.won) {
            push();
            textAlign(CENTER, CENTER);
            textSize(64);
            fill(255, 50, 50);
            stroke(0);
            strokeWeight(5);
            text("Evidence\nScrubbed!", width / 2, height / 2);
            pop();
        }
    }
}

class Region {
    constructor(x0,y0,w,h,image = undefined){
        this.x0 = x0;
        this.y0 = y0;
        this.image = image;
        this.x1 = x0 + w;
        this.y1 = y0 + h;
        this.y2 = y0 - h;
        this.h = h;
    }
    draw(){
        if (this.image) {
            imageMode(CORNERS);
            image(this.image,this.x0,this.y0,this.x1,this.y2);
            imageMode(CORNER);
        }
    }
}