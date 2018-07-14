/**
 *
 */
var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(30);


    //ProgramCodeGoesHere

    // Adapted from Dan Shiffman, natureofcode.com

    var Walker = function() {
        this.x = width/2;
        this.y = height/2;

        this.workerWidth = 7;
    };

    Walker.prototype.display = function() {
        stroke(0, 0, 0);
        stroke(random(256), random(256), random(256));
        stroke(100, random(100), random(100));
//        noStroke();
        fill(random(256), random(256), random(256));
        fill(random(100), 0, random(100) + 150);
        fill(random(100) + 150, 100, random(100) + 150);
        rect(this.x+1, this.y+1, this.workerWidth-2, this.workerWidth-2);
//        point(this.x, this.y);
    };

    // Randomly move up, down, left, right, or stay in one place
    Walker.prototype.walk = function() {
        var choice = floor(random(4));
        if (choice === 0) {
            this.x+=this.workerWidth;
        } else if (choice === 1) {
            this.x-=this.workerWidth;
        } else if (choice === 2) {
            this.y+=this.workerWidth;
        } else {
            this.y-=this.workerWidth;
        }
    };

    var w = new Walker();

    var draw = function() {
        w.walk();
        w.display();
    };



}};



