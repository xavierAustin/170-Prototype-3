//will very likely need to be high
const WIN_THRESHOLD_SCALAR = 0.06;

class ScrubbableImage {
    constructor(){
        //mutable
        this.points = [];
        this.regions = [];
        this.x = 0;
        this.y = 0;
        this.image = null;
        
        //unmutable
        let w = 0;
        let h = 0;
        for (let region of this.regions){
            w += region.x0 - region.x1;
            h += region.y0 - region.y1;
        }
        winThreshold = w*h;
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
            if (i.x > region.x0 && i.y > region.y0 && i.x < region.x1 && i.y < region.y1
                && !sameAsOtherPoint)
                score ++;
        }
        if (score > WIN_THRESHOLD_SCALAR)
            ;// idk win or somn      
    }
    draw(){
        for (let x of this.points)
            x.draw();
    }
}

class Point {
    constructor(){
        this.x;
        this.y;
    }
    draw(){
        
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