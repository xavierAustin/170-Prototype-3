const WEIGHT = 10;

//https://oroboro.com/fast-approximate-distance/
const FAD_SCALAR0 = 1007/1024;
const FAD_SCALAR1 = 441/1024;
function fastApproxDist(x0,y0,x1,y1){
    let distX = abs(x0-x1);
    let distY = abs(y0-y1);
    return max(distX,distY)*FAD_SCALAR0+min(distX,distY)*FAD_SCALAR1;
}

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
            w += region.x1 - region.x0;
            h += region.y1 - region.y0;
        }
        this.winThreshold = sqrt(w * h) * 1.4;
        this.numOfWinChecks = 0;
        this.prevWinCheckScore = 0;
        this.prevWinCheckIndex = 0;
    }
    update(){
        if (this.won)
            return;
        if (mState.d && mState.button == 0){
            //for high mouse sense or low framerate
            //adds interpolation points between previous point
            let lastPoint = this.points.at(-1);
            let _x = mState.x - this.x;
            let _y = mState.y - this.y;
            if (!lastPoint || mState.p)
                lastPoint = {x:_x,y:_y};
            let dist = fastApproxDist(_x,_y,lastPoint.x,lastPoint.y);
            for(let i = 0; i <= dist;){
                i += 2;
                this.points.push({
                    x: lerp(lastPoint.x,_x,min(i/dist,1)), 
                    y: lerp(lastPoint.y,_y,min(i/dist,1)), 
                    end: mState.p
                });
            }
        }
        else if (mState.d)
            this.points = [];
        this.checkWin();
    }

    checkWin() {
        if (this.prevWinCheckIndex >= this.points.length){
            this.prevWinCheckScore = 0;
            this.prevWinCheckIndex = 0;
        }
        let score = this.prevWinCheckScore;

        let index
        for (let region of this.regions) {
            let yMin = min(region.y0, region.y2);
            let yMax = max(region.y0, region.y2);

            //obliterates ur big O notation w mind powers
            for (index = this.prevWinCheckIndex; index < min(this.prevWinCheckIndex + 100,this.points.length); index++) {
                let i = this.points[index];
                let sameAsOtherPoint = false;

                for (let j of this.points) {
                    if (i === j) break;
                    sameAsOtherPoint +=
                        (10 > fastApproxDist(j.x,j.y,i.x,i.y)) &&
                        this.points.indexOf(i) - this.points.indexOf(j) > 10 &&
                        (j.x > region.x0 && j.y > yMin && j.x < region.x1 && j.y < yMax);
                }
                score += (i.x > region.x0 && i.y > yMin && i.x < region.x1 && i.y < yMax && !sameAsOtherPoint);
            }

        }
        if (score > this.winThreshold) this.won = true;
        if (!this.won && index < this.points.length){
            this.prevWinCheckIndex = index;
            this.prevWinCheckScore = score;
        }
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
        

        for (let p of this.points)
            point(p.x,p.y);
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