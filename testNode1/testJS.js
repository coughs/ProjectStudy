/**
 *
 */
var sketchProc=function(processingInstance){ with (processingInstance){
size(800, 700);
frameRate(30);


    //ProgramCodeGoesHere

    // Adapted from Dan Shiffman, natureofcode.com

    var Walker = function() {
        this.x = width/2;
        this.y = height/2;

        this.width = 7;
    };

    Walker.prototype.display = function() {
        stroke(0, 1+random(10), 1+random(10));
        fill(random(100) + 150, 100, random(100) + 150);
        rect(this.x, this.y, this.width-2, this.width-2);
    };

    // Randomly move up, down, left, right, or stay in one place
    Walker.prototype.walk = function() {
        var choice = floor(random(4));
        if (choice === 0) {
            if (this.x<width-this.width*3) {
                this.x+=this.width;
            }
        } else if (choice === 1) {
            if (this.x>this.width*2) {
                this.x -= this.width;
            }
        } else if (choice === 2) {
            if (this.y<height-this.width*3) {
                this.y+=this.width;
            }
        } else {
            if (this.width*2 < this.y) {
                this.y -= this.width;
            }
        }
    };

    var w = new Walker();

    draw = function() {

        w.walk();
        w.display();
    };



}};


