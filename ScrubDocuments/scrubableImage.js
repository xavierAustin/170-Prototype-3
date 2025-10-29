//will very likely need to be high
const WIN_THRESHOLD = 2000;

class ScrubbableImage {
    constructor(){
        this.points = [];
        this.regions = [];
        this.x = 0;
        this.y = 0;
        this.image = null;
    }
    checkWin(){
        let score = 0;
        //check if player censored region of image needed to be ceonsored
        for (let region of this.regions)
            for (let i of this.points)
                if (i.x > region.x0 && i.y > region.y0 && i.x < region.x1 && i.y < region.y1)
                    score ++;
        for (let i of this.points)
            for (let j of this.points){
                let hD = i.x - j.x; //horizontal distance
                let vD = i.y - j.y; //vertical distance
                //clumped points decrease score; neatly distributed points increase
                score *= min((vD*vD+hD*hD)/100,2);
            }
        if (score > WIN_THRESHOLD)
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
//