/**
 *
 */

var sketchProc=function(processingInstance){ with (processingInstance){

 //   import {mousePressed} from "./processing-1.4.8";

    size(400, 400);
    frameRate(30);


    //ProgramCodeGoesHere
    var backColor = color(89, 216, 255);
    background(backColor);

    var centerX = 200;
    var centerY = 100;
    var bodyLength = 118;
    var bodyHeight = 74;
    var bodyColor = color(162, 0, 255);
    noStroke();
    //    stroke(154, 163, 33);

    var drawFish=function(centerX, centerY, bodyLength,bodyHeight,bodyColor){
        fill(bodyColor);
        // body
        ellipse(centerX, centerY, bodyLength, bodyHeight);
        // tail
        var tailWidth = bodyLength/4;
        var tailHeight = bodyHeight/2;
        triangle(centerX-bodyLength/2, centerY,
            centerX-bodyLength/2-tailWidth, centerY-tailHeight,
            centerX-bodyLength/2-tailWidth, centerY+tailHeight);
        // eye
        fill(33, 33, 33);
        ellipse(centerX+bodyLength/4, centerY, bodyHeight/5, bodyHeight/5);
    };

    //drawFish(centerX, centerY, bodyLength,bodyHeight,bodyColor);
    var x=273;
    var y=177;

    var bX = 1;
    var bY = 1;
    draw = function(//x, y
    ){
//        mousePressed();
//        var p = mousePressed();

        var p = mousePressed + mouseReleased + mouseClicked;
        println(p);
        background(backColor);
        drawFish(centerX, centerY, bodyLength,bodyHeight,bodyColor);
        drawFish(mouseX,y, x,mouseY,color(162, 0, 255));
        //var bX = 1;
        if (x>300){
            bX=-distance;
        }
        if(x<20){
            bX=distance;
        }
        x+=1*bX;

        //var bY = 1;
        if (y>300){
            bY=-distance;
        }
        if(y<20){
            bY=distance;
        }

        y+=1.5*bY;

        drawFish(x,y, 184,59,color(0, 247, 255));
    };

    //swim (273, 177);


}};



