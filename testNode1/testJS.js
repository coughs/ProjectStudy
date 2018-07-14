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
    };

    Walker.prototype.display = function() {
        stroke(0, 0, 0);
        point(this.x, this.y);
    };

    // Randomly move up, down, left, right, or stay in one place
    Walker.prototype.walk = function() {
        var choice = floor(random(4));
        if (choice === 0) {
            this.x++;
        } else if (choice === 1) {
            this.x--;
        } else if (choice === 2) {
            this.y++;
        } else {
            this.y--;
        }
    };

    var w = new Walker();

    var draw = function() {
        w.walk();
        w.display();
    };



}};



