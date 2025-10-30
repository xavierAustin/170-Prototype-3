const WEIGHT = 10;
const WIN_THRESHOLD_SCALAR = 0.06;

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
            w += region.x0 - region.x1;
            h += region.y0 - region.y1;
        }
        this.winThreshold = w*h;
    }
    update(){
        console.log(mState.button)
        if (mState.d && mState.button == 0)
            this.points.push({x: mState.x, y: mState.y, end: mState.p});
        else if (mState.d)
            for (let i in this.points)
                if (abs(this.points[i].x - mState.x) + abs(this.points[i].y - mState.y) < WEIGHT * 5){
                    if (this.points[i])
                        this.points[i] = 1;
                    this.points.splice(i,1);
                }
        if (!(frameCount % 10))
            this.checkWin();
    }
    checkWin(){
        let score = 0;
        //check if player censored region of image needed to be ceonsored
        for (let region of this.regions)
        for (let i of this.points){
            sameAsOtherPoint = false;
            for (let j of this.points){
                if (i == j)
                    break;
                //100 == 10 squared
                sameAsOtherPoint += 100 > (pow(j.x - i.x, 2) + pow(j.y - i.y, 2));
                //above might be slow as hell if so use this instead
                //sameAsOtherPoint += 10 > abs(j.x - i.x) + abs(j.y - i.y);
            }
            if (i.x > region.x0 && i.y > region.y0 && i.x < region.x1 && i.y < region.y1 && !sameAsOtherPoint)
                score ++;
        }
        if (score > WIN_THRESHOLD_SCALAR * this.winThreshold)
            ;// idk win or somn      
    }
    draw(){
        if (this.image)
            image(this.image,this.x,this.y, this.w, this.h);
        stroke(0);
        strokeWeight(WEIGHT);
        for (let i in this.points){
            let p0 = this.points[i];
            let p1 = this.points[i - 1];
            if (p0.end){
                point(p0.x,p0.y);
                continue;
            }
            if (p1)
                line(p0.x,p0.y,p1.x,p1.y);
        }
    }
}

class Region {
    constructor(x0,y0,x1,y1){
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
}