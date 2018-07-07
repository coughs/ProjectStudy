/**
 * 
 */
var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(30);


/******************************************************************************************
 * 
 * i saw her standing there - Ryan Kee
 * Do NOT remove or change credit in any way
 * 
 * Created 12/11/14
 * 
 * A clone of "i saw her standing there"(With some of my own level designs):
 * http://www.kongregate.com/games/kranggames/i-saw-her-standing-there
 * 
 * Thank you everyone for the nice feeback!
 * 
 * TODO:
 * finish levels
 * 
*****************************************************************************************/

var gameState="inGame";

var keys=[];
var keyPressed=function(){
    keys[keyCode]=true;
};
var keyReleased=function(){
    keys[keyCode]=false;
};

var mouse=[];
mousePressed=function(){
    mouse[mouseButton]=true;
};
mouseReleased=function(){
    mouse[mouseButton]=false;
    return true;
};

// works for rectangles
var collide=function(obj1,obj2){
    return obj1.x<obj2.x+obj2.w&&obj1.x+obj1.w>obj2.x&&
           obj1.y<obj2.y+obj2.h&&obj1.y+obj1.h>obj2.y;
};

// button function
var button=function(x,y,w,h,txt,txtSize){
    var tSize;
    if(txtSize===undefined){
        tSize=((w+h)/2)/5;
    }else{
        tSize=txtSize;
    }
    if(mouseX>=x&&mouseX<=x+w&&mouseY>=y&&mouseY<=y+h){
        fill(100);
        x-=w/4;
    }
    else{
        fill(0);
    }
    
    textAlign(CENTER,CENTER);
    textSize(tSize);
    text(txt,x+w/2,y+h/2);

    if(mouseX>=x&&mouseX<=x+w&&mouseY>=y&&mouseY<=y+h&&mouse[LEFT]&&mouseReleased()){
        return true;
    }
};

// Player Object
var Player=function(x,y,w,h,keyInputs,color){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    
    this.velx=0;
    this.vely=0;
    
    this.moveSpeed=0.25;
    this.maxSpeed=2;
    this.moving=false;
    
    this.falling=false;
    this.gravity=0.4;
    
    this.keyInputs=keyInputs;
    this.color=color;
    
    this.dead=false;
    this.angle=0;
    this.falling=false;
};

Player.prototype.update=function(blocks){
    this.x=constrain(this.x,0,width-this.w);
    
    if(!this.dead){
        // key inputs and there responses
        if(keys[this.keyInputs[0]]){
            this.velx+=this.moveSpeed/2;
            this.moving=true;
        }
        if(keys[this.keyInputs[1]]){
            this.velx-=this.moveSpeed/2;
            this.moving=true;
        }
        
        if(keys[this.keyInputs[2]]&&!this.falling){
            this.vely=-10;
            this.falling=true;
        }
        
        // if the right input key and the left input key are not pressed, decrease the velocity until it comes to a complete stop
        if( !keys[this.keyInputs[0]]&&
            !keys[this.keyInputs[1]])
        {
            if(this.velx>0){
                this.velx-=this.moveSpeed/2;
            }
            if(this.velx<0){
                this.velx+=this.moveSpeed/2;
            }
            
            this.moving=false;
        }
        
        // limit the player's speed
        if(this.velx>this.maxSpeed){
            this.velx=this.maxSpeed;
        }
        if(this.velx<-this.maxSpeed){
            this.velx=-this.maxSpeed;
        }
        if(this.vely>12){
            this.vely=12;
        }
        // update the x position
        this.x+=this.velx;
        this.applyCollision(blocks,this.velx,0);
    }
    // update the y positions
    this.falling=true;
    this.y+=this.vely;
    this.applyCollision(blocks,0,this.vely);
    this.vely+=this.gravity;
};

Player.prototype.applyCollision=function(obj,velx,vely){
    for(var i=0; i<obj.length; i++){
        if(collide(this,obj[i]))
        {
            if(vely>0){
                this.vely=0;
                this.falling=false;
                this.y=obj[i].y-this.h;
            }
            if(vely<0){
                this.vely=0;
                this.falling=true;
                this.y=obj[i].y+obj[i].h;
            }
            if(velx<0){
                this.velx=0;
                this.x=obj[i].x+obj[i].w;
            }
            if(velx>0){
                this.velx=0;
                this.x=obj[i].x-this.w;
            }
        }
    }
};

Player.prototype.draw= function(hers) {
    noStroke();
    
    for(var i=0; i<hers.length; i++){
        if(hers[i].trapped){
            fill(255, 0, 150);
            textSize(12);
            textAlign(CENTER,CENTER);
            text("❤",this.x+this.w/2,this.y-this.h/4);
        }
    }
    
    if(!this.dead){
        // draw the player
        fill(this.color);
        ellipse(this.x+this.w/2,this.y+this.h/4,this.w/1.2,this.h/2.2);
        
        if(this.moving&&this.velx>0){
            quad(this.x+this.w/6,this.y+this.h/2,
                this.x+this.w,this.y+this.h/2,
                this.x+this.w-this.w/6,this.y+this.h,
                this.x,this.y+this.h);
        }
        else if(this.moving&&this.velx<0){
            quad(this.x,this.y+this.h/2,
                this.x+this.w-this.w/6,this.y+this.h/2,
                this.x+this.w,this.y+this.h,
                this.x+this.w/6,this.y+this.h);
        }else{
            rect(this.x,this.y+this.h/2,this.w,this.h/2);
        }
    }else{
        this.falling=true;
        fill(this.color);
        
        pushMatrix();
        
        if(this.falling&&!hers[0].trapped){
            for(var i=0; i<hers.length; i++){
                hers[0].sad=true;
                if(hers[0].x>this.x){
                    translate(this.x,this.y+this.h);
                    this.angle-=4;
                    if(this.angle<-90){
                        this.angle=-90;
                    }
                    
                    rotate(this.angle);
            
                    rect(0,-this.h/2,this.w,this.h/2);
                    ellipse(this.w/2,-this.h/1.3,this.w/1.2,this.h/2.2);
                }
                if(hers[0].x<this.x){
                    translate(this.x+this.w,this.y+this.h);
                    this.angle+=4;
                    if(this.angle>90){
                        this.angle=90;
                    }
                    
                    rotate(this.angle);
                    
                    rect(-this.w,-this.h/2,this.w,this.h/2);
                    ellipse(-this.w/2,-this.h/1.3,this.w/1.2,this.h/2.2);
                }
                popMatrix();
            }
        }
    }
};

// store 'Player' objects into an array
var players=[];
players.add=function(x,y,w,h,keyInputs,color){
    players.push(new Player(x,y,w,h,keyInputs,color));
};
players.apply=function(blocks,hers){
    for(var i=0; i<players.length; i++){
        players[i].draw(hers);
        players[i].update(blocks);
    }
};

var Her=function(x,y,w,h,color){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color=color;
    
    this.velx=0;
    this.vely=0;
    this.gravity=0.4;
    
    this.moveSpeed=0.125;
    this.maxSpeed=1.5;
    
    this.sad=false;
    this.counter=0;
    this.trapped=false;
    this.moving=false;
};

Her.prototype=Object.create(Player.prototype);

Her.prototype.update=function(players,blocks){
    for(var i=0; i<players.length; i++){
        if(dist(this.x,this.y,players[i].x,players[i].y)<150&&!this.sad){
            this.moving=true;
            
            if(this.x>players[i].x){
                this.velx-=this.moveSpeed;
                this.moving=true;
            }else if(this.x<players[i].x){
                this.velx+=this.moveSpeed;
                this.moving=true;
            }
        }else{
            this.moving=false;
            if(this.velx>0){
                this.velx-=this.moveSpeed;
            }
            if(this.velx<0){
                this.velx+=this.moveSpeed;
            }
        }
        
        if(collide(this,players[i])&&!this.trapped||this.y>height*4){
            players[i].dead=true;    
        }
    }
    
    // limit "her" speed
    if(this.velx>this.maxSpeed){
        this.velx=this.maxSpeed;
    }
    if(this.velx<-this.maxSpeed){
        this.velx=-this.maxSpeed;
    }
    
    this.x+=this.velx;
    this.applyCollision(blocks,this.velx,0);
    
    this.y+=this.vely;
    this.vely+=this.gravity;
    this.applyCollision(blocks,0,this.vely);
};

Her.prototype.draw= function() {
    // draw "her"
    fill(this.color);
    ellipse(this.x+this.w/2,this.y+this.h/4,this.w/1.2,this.h/2.2);
    
    if(this.moving&&this.velx>0){
        quad(this.x+this.w/6,this.y+this.h/2,
            this.x+this.w,this.y+this.h/2,
            this.x+this.w-this.w/6,this.y+this.h,
            this.x,this.y+this.h);
    }
    else if(this.moving&&this.velx<0){
        quad(this.x,this.y+this.h/2,
            this.x+this.w-this.w/6,this.y+this.h/2,
            this.x+this.w,this.y+this.h,
            this.x+this.w/6,this.y+this.h);
    }else{
        rect(this.x,this.y+this.h/2,this.w,this.h/2);
    }
};

Her.prototype.complete=function(){
    this.counter++;
    if(this.sad&&this.counter>150){
        this.sad=false;
        return true;
    }else if(!this.sad&&this.counter<150){
        this.counter=0;
    }
};

var hers=[];
hers.add=function(x,y,w,h,color){
    hers.push(new Her(x,y,w,h,color));
};
hers.apply=function(players,blocks){
    for(var i=0; i<hers.length; i++){
        hers[i].update(players,blocks);
        hers[i].draw();
    }
};

// Block Object
var Block=function(x,y,w,h,color){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color=color;
};

Block.prototype.draw= function() {
    noStroke();
    
    for(var i=0; i<this.h; i++){
        fill(100+i*20);
        rect(this.x,this.y+i*(this.h/7.5),this.w,this.h/8);
    }
};

// store 'Block' objects into an array
var blocks=[];
blocks.add=function(x,y,w,h,color){
    blocks.push(new Block(x,y,w,h,color));
};
blocks.apply=function(players){
    for(var i=0; i<blocks.length; i++){
        blocks[i].draw();
    }
};

var Cage=function(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    
    this.complete=false;
    this.trapped=false;
    
    this.counter=0;
    this.barY=0;
};

Cage.prototype.update=function(hers){
    for(var i=0; i<hers.length; i++){
        if(collide(this,hers[i])){
            if(hers[i].x<this.x){
                hers[i].x=this.x;
            }
            if(hers[i].x+hers[i].w>this.x+this.w){
                hers[i].x=this.x+this.w-hers[i].w;
            }
            this.trapped=true;
        }
        if(this.trapped){
            hers[i].trapped=true;
            this.counter++;
            if(this.counter>150){
                this.complete=true;
                this.counter=0;
            }
        }
    }
};

Cage.prototype.draw= function() {
    noFill();
    strokeWeight(2);
    stroke(0);
    
    rect(this.x,this.y,this.w,this.h);
    
    for(var i=0; i<4; i++){
        line(this.x+i*(this.w/3),this.y+this.barY-this.h,this.x+i*(this.w/3),this.y+this.barY);
        if(this.trapped){
            this.barY+=0.5;
            if(this.barY>=this.h){
                this.barY=this.h;
            }
        }
    }
};

var cages=[];
cages.add=function(x,y,w,h){
    cages.push(new Cage(x,y,w,h));
};
cages.apply=function(hers){
    for(var i=0; i<cages.length; i++){
        cages[i].update(hers);
        cages[i].draw();
    }
};

var Zombie=function(x,y,w,h,color){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color=color;
    
    this.velx=0;
    this.vely=0;
    
    this.moveSpeed=0.25;
    this.maxSpeed=1.2;
    this.gravity=0.4;
    
    this.moving=false;
    this.transparency=255;
};

Zombie.prototype=Object.create(Player.prototype);

Zombie.prototype.update=function(players,blocks,hers){
    for(var j=0; j<hers.length; j++){
    if(!hers[j].trapped){
        for(var i=0; i<players.length; i++){
            if(dist(this.x,this.y,players[i].x,players[i].y)<150){
                this.moving=true;
                
                if(this.x>players[i].x){
                    this.velx-=this.moveSpeed;
                    this.moving=true;
                }else if(this.x<players[i].x){
                    this.velx+=this.moveSpeed;
                    this.moving=true;
                }
            }else{
                this.moving=false;
                if(this.velx>0){
                    this.velx-=this.moveSpeed;
                }
                if(this.velx<0){
                    this.velx+=this.moveSpeed;
                }
            }
            
            if(collide(this,players[i])){
                players[i].dead=true;
                this.velx=0;
            }
        }
    }else{
        this.velx=0;
    }
        
        // limit the zombie's speed
        if(this.velx>this.maxSpeed){
            this.velx=this.maxSpeed;
        }
        if(this.velx<-this.maxSpeed){
            this.velx=-this.maxSpeed;
        }
    }
    
    this.x+=this.velx;
    this.applyCollision(blocks,this.velx,0);
    
    this.y+=this.vely;
    this.vely+=this.gravity;
    this.applyCollision(blocks,0,this.vely);
};

Zombie.prototype.draw= function() {
    // draw the zombie
    noStroke();
    
    fill(this.color);
    ellipse(this.x+this.w/2,this.y+this.h/4,this.w/1.2,this.h/2.2);
    
    if(this.moving&&this.velx>0){
        quad(this.x+this.w/6,this.y+this.h/2,
            this.x+this.w,this.y+this.h/2,
            this.x+this.w-this.w/6,this.y+this.h,
            this.x,this.y+this.h);
    }
    else if(this.moving&&this.velx<0){
        quad(this.x,this.y+this.h/2,
            this.x+this.w-this.w/6,this.y+this.h/2,
            this.x+this.w,this.y+this.h,
            this.x+this.w/6,this.y+this.h);
    }else{
        rect(this.x,this.y+this.h/2,this.w,this.h/2);
    }
};

var zombies=[];
zombies.add=function(x,y,w,h,color){
    zombies.push(new Zombie(x,y,w,h,color));
};
zombies.apply=function(players,blocks,hers){
    for(var i=0; i<zombies.length; i++){
        zombies[i].update(players,blocks,hers);
        zombies[i].draw();
    }
};

var Gun=function(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    
    this.origX=this.x;
    this.origY=this.y;
    
    this.collected=false;
    this.bullets=[];
    this.direction=""; // right or left
};

Gun.prototype.update=function(players,zombies,blocks){
    for(var i=0; i<players.length; i++){
        if(collide(this,players[0])){
            this.collected=true;
        }
    }
    if(this.collected){
        for(var i=0; i<players.length; i++){
            if(keys[32]&&frameCount%10===0&&!players[i].dead){
                this.bullets.push({
                    x:this.x,
                    y:this.y,
                    w:3,
                    h:3,
                    direction:this.direction
                });
            }
        }
        
        for(var i=0; i<this.bullets.length; i++){
            var b=this.bullets[i];
            noStroke();
            // draw the bullet
            fill(0, 0, 0);
            rect(b.x,b.y,b.w,b.h);
            
            if(b.direction==="right"){
                b.x+=5;
            }
            if(b.direction==="left"){
                b.x-=5;
            }
            
            for(var j=0; j<blocks.length; j++){
                if(collide(b,blocks[j])){
                    this.bullets.splice(i,1);
                }
            }
            
            for(var z=0; z<zombies.length; z++){
                if(collide(b,zombies[z])){
                    this.bullets.splice(i,1);
                    zombies.splice(z,1);
                }
            }
            if(b.x>width||b.x+b.w<0){
                this.bullets.splice(i,1);
            }
        }
    }
};

Gun.prototype.draw= function(players) {
    for(var i=0; i<this.h/2; i++){
        stroke(0,random(100),random(200,255),-i*5+200);
        line(this.origX,this.origY+i+this.h/2,this.origX+this.w,this.origY+i+this.h/2);
    }
    if(!this.collected){
        noStroke();
        // draw the gun
        fill(0, 0, 0);
        rect(this.x,this.y+this.h/12+sin(frameCount*4)*2,this.w/4,this.h/3);
        rect(this.x,this.y+this.h/12+sin(frameCount*4)*2,this.w,this.h/6);
        
    }else{
        fill(0, 0, 0);
        textSize(12);
        text("Press\n spacebar\nto shoot",this.origX,this.origY);
        var newWidth;
        var newHeight;
        for(var i=0; i<players.length; i++){
            newWidth=this.w-players[i].w/4;
            newHeight=this.h-players[i].h/1.5;
            if(players[i].velx>0){
                this.direction="right";
                this.x=players[i].x+players[i].w+players[i].w/4;
            }
            if(players[i].velx<0){
                this.direction="left";
                this.x=players[i].x-players[i].w/4;
            }
            this.y=players[i].y+players[i].h/2;
        }
        noStroke();
        // draw the gun
        fill(0, 0, 0);
        if(this.direction==="right"){
            rect(this.x,this.y,newWidth/3,newHeight);
            rect(this.x,this.y,newWidth,newHeight/3);
        }
        if(this.direction==="left"){
            rect(this.x,this.y,-newWidth/3,newHeight);
            rect(this.x,this.y,-newWidth,newHeight/3);
        }
    }
};

var guns=[];
guns.add=function(x,y,w,h){
    guns.push(new Gun(x,y,w,h));
};
guns.apply=function(players,zombies){
    for(var i=0; i<guns.length; i++){
        guns[i].update(players,zombies,blocks);
        guns[i].draw(players);
    }
};

var objects=[players,hers,blocks,cages,zombies,guns];
objects.remove=function(){
    for(var i=0; i<objects.length; i++){
    for(var j=0; j<objects[i].length; j++){
        objects[i].splice(j,objects[i].length);
    } 
    }
};

var Game=function(){
    this.counter=0;
    this.levels=[
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "  P        H  ",
            "##############",
            "              ",
            "              ",
            "              "
        ],
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "  C           ",
            "      P    H  ",
            "##############",
            "              ",
            "              ",
            "              "
        ],
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "     H      P ",
            "    ##########",
            "              ",
            "              ",
            "#########     ",
            "    C         ",
            "              ",
            "##############",
            "              ",
            "              "
        ],
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "  P         H ",
            " ###     #####",
            "              ",
            "           C  ",
            "              ",
            "       #######",
            "              ",
            "              ",
            "              ",
            "              "
        ],
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "         H    ",
            "  ##########  ",
            "              ",
            "     C        ",
            "              ",
            "#######       ",
            "              ",
            "     P        ",
            "    ###  ###  ",
            "              "
        ],
        [
            "              ",
            "              ",
            "          █###",
            "          █   ",
            "          █H  ",
            "          ██  ",
            "              ",
            "      ###  ###",
            "  C           ",
            "            P ",
            "##############",
            "              ",
            "              ",
            "              "
        ],
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "            H ",
            "           ###",
            "  P           ",
            "#####         ",
            "              ",
            "   C          ",
            "          !   ",
            "############  ",
            "              ",
            "              "
        ],
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "  !           ",
            "####       H! ",
            "       #######",
            "              ",
            "              ",
            "    #####     ",
            "            C ",
            " P            ",
            "###       ####",
            "              "
        ],
        [
            "              ",
            "              ",
            "         █    ",
            "         █    ",
            "         █████",
            " P            ",
            "## ##█   !!H  ",
            " G   █######  ",
            "####    C     ",
            "              ",
            "       #######",
            "              ",
            "              ",
            "              "
        ],
        [
            "              ",
            "           !H ",
            "! G      #####",
            "#####         ",
            "              ",
            "              ",
            "   #######    ",
            "              ",
            " !     !     P",
            "###   ########",
            "              ",
            "          C   ",
            "  !     !     ",
            "##############"
        ],
        [
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "           !! ",
            "           ###",
            " P        !!! ",
            "###       ####",
            " C            ",
            "            H ",
            "##############",
            "              ",
            "              "
        ]
        /*[
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              "
        ]*/
    ];
    this.level=0;
    this.messages=[
        ["i saw her standing there.","but then she was a zombie."],
        ["i loved her but she was a zombie.","so i put her safe in a cage."],
        ["i knew she loved me too.","because she always tried to hug me."],
        ["sometimes the cage was hard to reach.","i'm glad she loves to follow me."],
        ["she liked to escape from her cage.","but i'd always put her back."],
        ["she was sneaky and got into sneaky places.","i love her 'cuz of her mischief."],
        ["there were other zombies, too.","i didn't love them at all."],
        ["they were mean and got in my way.","but i was a lot smarter than them."],
        ["sometimes i'd even find a gun","take that, other zombies!"],
        ["if bullets ran out, i'd find another gun.","nothing's gonna keep me from my girl."],
        ["the other zombies got really angry.","that was when it got scary."]
    ];
};

Game.prototype.loadMap=function(){
    for(var col=0; col<this.levels[this.level].length; col++){
    for(var row=0; row<this.levels[this.level][col].length; row++){
        var s=this.levels[this.level][col][row];
        if(s==="#"){
            blocks.add(row*30,col*30,30,15,color(100, 100, 100));
        }
        if(s==="█"){
            blocks.add(row*30,col*30,30,30,color(100, 100, 100));
        }
        if(s==="P"){
            players.add(row*30,col*30,15,30,[RIGHT,LEFT,UP,DOWN],color(0, 0, 0));
        }
        if(s==="H"){
            hers.add(row*30,col*30,15,30,color(255, 0, 238));
        }
        if(s==="C"){
            cages.add(row*30,col*30+20,25,40);
        }
        if(s==="!"){
            zombies.add(row*30,col*30,15,30,color(0, 100, 0));
        }
        if(s==="G"){
            guns.add(row*30,col*30,15,30);
        }
    }
    }
};

var self;
Game.prototype.apply=function(){
    self=this;
    
    players.apply(blocks,hers);
    hers.apply(players,blocks);
    blocks.apply();
    cages.apply(hers);
    zombies.apply(players,blocks,hers);
    guns.apply(players,zombies,blocks);
    
    fill(0, 0, 0);
    textAlign(CENTER,CENTER);
    textSize(20);
        
    if(this.level===0){
        text(this.messages[this.level][0],200,50);
        if(hers[0].complete()){
            this.counter++;
            text(this.messages[this.level][1],200,79);
            if(this.counter>150){
                this.counter=0;
                gameState="menu";
            }
        }
        textSize(15);
        text("Arrow keys to move",100,330);
    }
    if(this.level!==0){
        text(this.messages[this.level][0],200,50);
        for(var i=0; i<cages.length; i++){
            if(cages[i].complete){
                this.counter++;
                text(this.messages[this.level][1],200,80);
                if(this.counter>150){
                    this.counter=0;
                    objects.remove();
                    self.level++;
                    self.loadMap();
                }
            }
        }
        for(var i=0; i<players.length; i++){
            if(players[i].dead){
                this.counter++;
                if(this.counter>100){
                    objects.remove();
                    self.loadMap();
                    this.counter=0;
                    players[i].dead=false;
                }
            }
            if(players[i].y>height){
                players[i].dead=true;
            }
        }
    }
};

var game=new Game();
game.loadMap();
draw= function() {
    background(255, 255, 255);
    
    if(gameState==="menu"){
        fill(0, 0, 0);
        textAlign(CENTER,CENTER);
        textSize(20);
        textLeading(30);
        text("i saw her standing there.\nbut then she was a zombie",200,60);
        
        players[0].color=color(0, 0, 0);
        players.apply(blocks,hers);
        blocks.apply();
        hers.apply(players,blocks);
        
        if(button(50,130,50,30,"Play",20)){
            objects.remove();
            self.level=1;
            self.loadMap();
            gameState="inGame";
        }
        if(button(50,180,125,30,"Level Select",20)){
            gameState="levelSelect";
        }
    }
    if(gameState==="inGame"){
        game.apply();
    }
    if(gameState==="levelSelect"){
        textSize(20);
        textAlign(CENTER,CENTER);
        fill(0, 0, 0);
        text("Level Select",width/2,50);
    
        for(var i=0; i<self.levels.length-1; i++){
            var x=i*50;
            var y=100;
            if(i<=6){
                x=i*50;
                y=100;
            }else if(i<=14){
                x-=350;
                y=150;
            }
            
            if(button(x+20,y,50,50,i+1,18)){
                objects.remove();
                self.level=i+1;
                self.loadMap();
                gameState="inGame";
            }
        }
        
        if(button(30,height-30,50,20,"back",18)){
            gameState="menu";
        }
    }
};


}};



