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

        this.width = 7;
    };

    Walker.prototype.display = function() {
        stroke(100, random(100), random(100));
        fill(random(100) + 150, 100, random(100) + 150);
        rect(this.x+1, this.y+1, this.width-2, this.width-2);
    };

    // Randomly move up, down, left, right, or stay in one place
    Walker.prototype.walk = function() {
        var choice = floor(random(4));
        if (choice === 0) {
            this.x+=this.width;
        } else if (choice === 1) {
            this.x-=this.width;
        } else if (choice === 2) {
            this.y+=this.width;
        } else {
            this.y-=this.width;
        }
    };

    var w = new Walker();

    var draw = function() {
        w.walk();
        w.display();
    };



}};



