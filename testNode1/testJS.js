/**
 * 
 */
var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(30);


    //ProgramCodeGoesHere

    /*
      ________            __          __               _       __  __       ________
     /_  __/ /_  ___     / /   ____ _/ /_  __  _______(_)___  / /_/ /_     /  _/  _/
      / / / __ \/ _ \   / /   / __ `/ __ \/ / / / ___/ / __ \/ __/ __ \    / / / /
     / / / / / /  __/  / /___/ /_/ / /_/ / /_/ / /  / / / / / /_/ / / /  _/ /_/ /
    /_/ /_/ /_/\___/  /_____/\__,_/_.___/\__, /_/  /_/_/ /_/\__/_/ /_/  /___/___/
                                        /____/
    */
    /***
     Wow! My first 1000 Kelvin! Thank you so much!

     Saatvik Gaur was the first one to find the easter egg!


     When I first created The Labyrinth, I did not expect it to be so successful, and despite
     it's laggy and bugged beginning, it is still my most acclaimed program. I received multiple
     requests for a sequel, and I immediately began work on a program called The Forest. I immediately became bored with this venture and moved on to other programs. This was originally a randomly generated maze-gamed, but the randomly generated maze part went out the window, and what remained was a functioning sequel to The Labyrinth.

     So after a long and probably unnoticed wait, I present to you the Labyrinth II!

     Thanks to Gimcrack for helping me to fix the lag and giving helpful suggestions.

     **/

    var scene = 'logo';

// The logo
    {
        var spoiler = false;
        var Gear = function(x, y, size, direction) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.direction = direction;
        };
        Gear.prototype.draw = function() {
            for (var i = 0, numberOfTeeth = 10; i < numberOfTeeth; i++) {
                fill(75, 75, 75);
                noStroke();
                var p = this.direction * (this.size / 2) * cos(frameCount + (i * 360 / numberOfTeeth)) + this.x;
                var q = (this.size / 2) * sin(frameCount + (i * 360 / numberOfTeeth)) + this.y;
                ellipse(p, q, this.size / 8, this.size / 8);
                ellipse(this.x, this.y, this.size, this.size);
                noFill();
                stroke(125, 125, 125);
                strokeWeight(this.size / 20);
                ellipse(this.x, this.y, this.size / 1.2, this.size / 1.2);
                fill(0, 0, 0);
                noStroke();
                ellipse(this.x, this.y, this.size / 10, this.size / 10);
            }
        };
        var gearsX = -250;
        var gearsY = 200;
        var xChange = 1;
        var Logo = function() {
            var monospace = createFont("monospace");
            textFont(monospace, 20);
            background(200, 220, 200);
            textAlign(CENTER, CENTER);
            textSize(20);
            text("THE", gearsX - 150, gearsY - 135);
            textSize(25);
            text("Absent-minded Developer", gearsX, gearsY - 100);
            text("Presents", gearsX + 75, gearsY + 150);
            var largeCog = new Gear(gearsX - 100, gearsY, 100, 1);
            var smallCog = new Gear(gearsX - 55, gearsY + 75, 60, -1);
            var mediumCog = new Gear(gearsX + 10, gearsY + 35, 80, 1);
            var otherSmallCog = new Gear(gearsX + 73, gearsY + 75, 60, -1);
            var tinyCog = new Gear(gearsX + 100, gearsY + 30, 40, 1);
            largeCog.draw();
            smallCog.draw();
            mediumCog.draw();
            otherSmallCog.draw();
            tinyCog.draw();
            gearsX += xChange;
            if (gearsX > 200) {
                xChange = 0;
            }
        };
        var Timer = 0;
    }

// the maze grid-map
    var floorplan = [
        'eaaaaaaaaaaaaaab   eaaab eaaaaaaab  eaaab  eaaaaaaaaaaab    eaaaaab',
        'dffffffffffffffhaaaiFfFc dfffffffhaaifFfc  dfffffffffffc    dFFFFFc',
        'dfffpppppppffffffffff3fc dffffffff1ffF3Fc  dfpppfpf7ppfhaaaaiFFfFFc',
        'dffffffffffffffjkfjkFfFc dfffffffjmmkfFfc  dfp7pfpfpppfffffffFf4fFc',
        'lmmmmmkfjmmmmmmndfclmmmn lmmkfjmmn  lmmmn  dfpppfpfpppfjmmmmkFFfFFc',
        '      dfc       dfc         dfc            dfffffffffffc    dFFFFFc',
        '      dfc    eaaifhaab eaaaaifc eaaaaaaab  lmmkfjmmmmmmn    lmkfjmn',
        '      dfc    d7FfFfFpc d7pffffc dpfFFFf7c     dfc             dfc',
        '      dfc    dpfFfFfpc d3ffjkfc dpFfffFpc     dfc             dFc',
        '      dfc    lmmmmmmmn dfffcdfc dpFfFfFpc     d1c             dfc',
        '      dfc              lmmmndfc dPFfffFpc     dfc             dFc',
        'eaaaaaifhaaaaaab            dfc dpfFFFfpc  eaaifhaab          d1c',
        'dFFffFFffFFffFFhaaaaaaaaaaaaifc lmmkfjmmn  dFFfFfFFc          dFc',
        'dFFffFFffFFffFFFFFFFFFFFFFFFFfc    dfc     dFFfffFFc          dfc',
        'dffFFffFFffFFffjmmmmmmmmmmmmkfc    dfhaaaaaiffFFFffc          dFc',
        'dffFFffFFffFFffc            dfc    dfff6ffffFfFfFfFc    eaaaaaifc',
        'dfjmmmmmmmmmmmmn eaaaaaaaaaaifc    dfjmmmmmkffFFFffc    dfffffffc',
        'dfc   x    x     dffffffffffffc    dfc     dFFfffFFc    dfppfppfc',
        'dfhaaab eaEaaaaaaiffp7pffpppffc    dfc     dFFfFfFFc    dfppf3pfc',
        'dfFFFfc dfffffffffffffffffffffc    dfc     lmmkFjmmn    dfppfppfc',
        'dFpppFc dffppfppfppfppfppfppffhaaaaifc        d6c       dfffffffc',
        'dFpfPFc dffppfppfPpfppfppfppffff1ffffc        dFc       lmmmmmmmn',
        'dFpppFc dffppfppfppfppfppfppffjmmmmmmn        dfc',
        'dfFFFfc dfffffffffffffffffffffc               dFc',
        'lmmmmmn lmmmmmmmmmmmmmmmmmmmmmn               dfc',
        '      x x                                     d#c',
        '      x x                                     dfc',
        '      x x                                     dFc',
        '      x x                                     dfc',
        ' xxxxxx xxxxxx                                dFc',
        ' x           x                                dfc',
        ' x           x                                dFc',
        ' xxxxxxxxxxxxx                                lmn'];

// the variables that control the fading
    var fade = {
        value: 0,
        change: 0
    };

// the room coordinates
    var coord = {
        x: 0,
        y: 0
    };

    var mapCoords = {
        x: 0,
        y: 0
    };

    var speaking = function() {
        fill(255, 255, 0);
        text('You need 50 coins.', 20, 300);
    };

// stores which keys are being pressed
    var keysPressed = [];
    var keyIsPressed = false;

// returns a value of true in the keyPressed array when a key is pressed
    var keyPressed = function() {
        keysPressed[keyCode] = true;
        keyIsPressed = true;
    };

// returns a value of false in the keyPressed array when a key is pressed
    var keyReleased = function() {
        keyIsPressed = false;
        keysPressed[keyCode] = false;
    };

// generates the block images
    var Block = function(pixmap, size) {
        var p = createGraphics(size.width, size.height, JAVA2D);
        if (!p) {
            return;
        }
        p.background(0, 0, 0, 0);
        p.noStroke();
        for (var i = 0; i < pixmap.length; i++) {
            for (var j = 0; j < pixmap[i].length; j++) {
                if (pixmap[i][j] === '0') {
                    p.fill(20, 25, 20);
                }
                if (pixmap[i][j] === '1') {
                    p.fill(50, 55, 50);
                } else if (pixmap[i][j] === '2') {
                    p.fill(80, 85, 80);
                } else if (pixmap[i][j] === '3') {
                    p.fill(120, 125, 120);
                } else if (pixmap[i][j] === ' ') {
                    p.fill(255, 255, 255, 0);
                }
                p.rect(j * 2, i * 2, 2, 2);
            }
        }
        return (p.get());
    };
    var blocks = [];
// replaces a tile with another
    var replaceBlock = function(x, y, type, name) {
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].x === x && blocks[i].y === y) {
                blocks[i].name = name;
                blocks[i].type = type;
            }
        }
    };

// the block pixmaps
    {
        // block that runs across tops of rooms
        var topBlock = Block([
            '2222222222222222',
            '3222322232223222',
            '3333333333333333',
            '0000000000000000',
            '0222222202222222',
            '0222211102222111',
            '0221111102211111',
            '0000000000000000',
            '2222202222222022',
            '2211102222111022',
            '1111102111111022',
            '0000000000000000',
            '2202222222022222',
            '1102222111022221',
            '1102211111022111',
            '0000000000000000'
        ], {
            width: 32,
            height: 32
        });

        // block that runs across the bottoms of rooms
        var bottomBlock = Block([
            '0000000000000000',
            '1102211111022111',
            '1102222111022221',
            '2202222222022222',
            '0000000000000000',
            '1111102111111022',
            '2211102222111022',
            '2222202222222022',
            '0000000000000000',
            '0221111102211111',
            '0222211102222111',
            '0222222202222222',
            '0000000000000000',
            '3333333333333333',
            '3222322232223222',
            '2222222222222222'
        ], {
            width: 32,
            height: 32
        }); // r

        // top right corner block
        var topRightBlock = Block([
            '2222222222222222',
            '3222322232223222',
            '3333333333323222',
            '0000000000323222',
            '0222222030323332',
            '0222211030323222',
            '0221110230323222',
            '0000001230323222',
            '2222201230323332',
            '2211031230323222',
            '1111031110323222',
            '0000231230323222',
            '2201111230323332',
            '1101231230323222',
            '1011231110323222',
            '0221231230323222'

        ], {
            width: 32,
            height: 32
        });

        // the block that forms the top part of the right side doorways
        var rightEndBlock = Block([
            '0221231230323222',
            '0111231230323222',
            '0221221230323333',
            '0231111200000000',
            '0231221002222222',
            '0231231002222111',
            '0231230102211111',
            '0231200000000000',
            '0221202222222022',
            '0111002222111022',
            '0221002211111022',
            '0230000000000000',
            '0202222222022222',
            '0202222111022221',
            '0002211111022111',
            '0000000000000000'

        ], {
            width: 32,
            height: 32
        });


        // the block that forms the top part of the left side doorways
        var leftEndBlock = Block([
            '2222230321321220',
            '2222230321321110',
            '3333330321221220',
            '0000000021111320',
            '0222222201221320',
            '0222211101321320',
            '0221111100321320',
            '0000000000021320',
            '2222202222021220',
            '2211102222101110',
            '1111102211101220',
            '0000000000000320',
            '2202222222022020',
            '1102222111022020',
            '1102211111022100',
            '0000000000000000'

        ], {
            width: 32,
            height: 32
        });

        // the block that borders that right side of the map
        var rightBlock = Block([
            '0221231230323332',
            '0111231230323222',
            '0221221230323222',
            '0231111230323222',
            '0231221220323332',
            '0231231110323222',
            '0231231220323222',
            '0231231230323222',
            '0221231230323332',
            '0111231230323222',
            '0221221230323222',
            '0231111230323222',
            '0231221220323332',
            '0231231110323222',
            '0231231220323222',
            '0231231230323222'

        ], {
            width: 32,
            height: 32
        });

        // the block that forms the bottom part of the right side doorways
        var rightBeginBlock = Block([
            '0000000000000000',
            '0002211111022111',
            '0202222111022221',
            '0200222222022222',
            '0230000000000000',
            '0231002211111022',
            '02310p2222111022',
            '0231202222222022',
            '0221200000000000',
            '0111230102211111',
            '0221221002222111',
            '0231111002222222',
            '0231221200000000',
            '0231231110333333',
            '0231231220322222',
            '0231231230322222'

        ], {
            width: 32,
            height: 32
        });

        // the block that borders the left side of the map
        var leftBlock = Block([
            '2333230321321220',
            '2223230321321110',
            '2223230321221220',
            '2223230321111320',
            '2333230221221320',
            '2223230111321320',
            '2223230221321320',
            '2223230321321320',
            '2333230321321220',
            '2223230321321110',
            '2223230321221220',
            '2223230321111320',
            '2333230221221320',
            '2223230111321320',
            '2223230221321320',
            '2223230321321320'
        ], {
            width: 32,
            height: 32
        });

        // the block that forms the bottom part of the left side doorways
        var leftBeginBlock = Block([
            '0000000000000000',
            '1102211111022100',
            '1102222111022020',
            '2202222222022020',
            '0000000000000320',
            '1111102211101320',
            '2211102222101320',
            '2222202222021320',
            '0000000000021220',
            '0221111100321110',
            '0222211101221220',
            '0222222201111320',
            '0000000021221320',
            '3333330111321320',
            '2222230221321320',
            '2222230321321320'

        ], {
            width: 32,
            height: 32
        });

        // the top left corner block
        var topLeftBlock = Block([

            '2222222222222222',
            '2223222322232223',
            '2223233333333333',
            '2223230000000000',
            '2333230302222222',
            '2223230302222111',
            '2223230320211111',
            '2223230321000000',
            '2333230321022022',
            '2223230321301022',
            '2223230111301022',
            '2223230321320000',
            '2333230321111022',
            '2223230321321021',
            '2223230111321101',
            '2223230321321220'
        ], {
            width: 32,
            height: 32
        });

        // the bottom left corner block
        var bottomLeftBlock = Block([

            '2223230321321220',
            '2223230111321101',
            '2223230321321021',
            '2333230321111022',
            '2223230321320000',
            '2223230111301022',
            '2223230321301022',
            '2333230321022022',
            '2223230321000000',
            '2223230320211111',
            '2223230302222111',
            '2333230302222222',
            '2223230000000000',
            '2223233333333333',
            '2223222322232223',
            '2222222222222222'
        ], {
            width: 32,
            height: 32
        });

        // the bottom right corner block
        var bottomRightBlock = Block([
            '0221231230323222',
            '1011231110323222',
            '1101231230323222',
            '2201111230323332',
            '0000231230323222',
            '1111031110323222',
            '2211031230323222',
            '2222201230323332',
            '0000001230323222',
            '0221110230323222',
            '0222211030323222',
            '0222222030323332',
            '0000000000323222',
            '3333333333323222',
            '3222322232223222',
            '2222222222222222'
        ], {
            width: 32,
            height: 32
        });

        // the 2x2 tile floor
        var floorA = Block([
            '1111111133333333',
            '1111111132222222',
            '1111111132222222',
            '1111111132222222',
            '1111111132222222',
            '1111111132222222',
            '1111111132222222',
            '1111111132222222',
            '3333333311111111',
            '3222222211111111',
            '3222222211111111',
            '3222222211111111',
            '3222222211111111',
            '3222222211111111',
            '3222222211111111',
            '3222222211111111'
        ], {
            width: 32,
            height: 32
        });

        // the 2x2 tile floor with Lock
        var lockBlock = Block([
            '1111111133333333',
            '1111111002222222',
            '1111110330222222',
            '1111103003022222',
            '1111102002022222',
            '1111000000002222',
            '1111022222202222',
            '1111021001202222',
            '3333011001101111',
            '3222011201101111',
            '3222011121101111',
            '3222201111011111',
            '3222220000111111',
            '3222222211111111',
            '3222222211111111',
            '3222222211111111'
        ], {
            width: 32,
            height: 32
        });

        // the 2x2 tile with a coin
        var coin = Block([
            '1111111133333333',
            '1111111132222222',
            '1111111132222222',
            '1111111002222222',
            '1111100310022222',
            '1111013122102222',
            '1111031222102222',
            '1110312221210222',
            '3330122212110111',
            '3222022121101111',
            '3222011211101111',
            '3222200110011111',
            '3222222001111111',
            '3222222211111111',
            '3222222211111111',
            '3222222211111111'
        ], {
            width: 32,
            height: 32
        });

        // the 2x2 tile floor with key
        var keyBlock = Block([
            '1111111133333333',
            '1111111132222222',
            '1111100130022222',
            '1111103003022222',
            '1111102222022222',
            '1111102002022222',
            '1111101001022222',
            '1111101111022222',
            '3333330000111111',
            '3222222020111111',
            '3222200020111111',
            '3222011120111111',
            '3222200020111111',
            '3222011120111111',
            '3222200001111111',
            '3222222211111111'
        ], {
            width: 32,
            height: 32
        });

        // treasure chest block
        var closedTreasureChest = Block([
            '1111111133333333',
            '1111111132222222',
            '1000000000000002',
            '0102011111102010',
            '0203022222203020',
            '0303033333303030',
            '0303033333303030',
            '0202022222202020',
            '0202022222202020',
            '0002000000002000',
            '0222222222222220',
            '0000000110000000',
            '0202020110202020',
            '0102022002202010',
            '0102011111102010',
            '0000000000000000'
        ], {
            width: 32,
            height: 32
        });

        // open treasure chest block
        var openTreasureChest = Block([
            '1111111133333333',
            '1111111132222222',
            '1111111132222222',
            '0000000000000000',
            '0222222222222220',
            '0200000000000020',
            '0201111111111020',
            '0200000000000020',
            '0200000000000020',
            '0200000000000020',
            '0222222222222220',
            '0000000000000000',
            '0202020110202020',
            '0102022002202010',
            '0102011111102010',
            '0000000000000000'
        ], {
            width: 32,
            height: 32
        });

        // the 4x4 tile floor
        var floorB = Block([
            '1111333311113333',
            '1111322211113222',
            '1111322211113222',
            '1111322211113222',
            '3333111133331111',
            '3222111132221111',
            '3222111132221111',
            '3222111132221111',
            '1111333311113333',
            '1111322211113222',
            '1111322211113222',
            '1111322211113222',
            '3333111133331111',
            '3222111132221111',
            '3222111132221111',
            '3222111132221111'
        ], {
            width: 32,
            height: 32
        });

        // a small solid pot obsticle
        var pot = Block([
            '1111100000033333',
            '1111022222202222',
            '1110220000220222',
            '1110200000020222',
            '1100200000020022',
            '1030220000220302',
            '1033022222203302',
            '1023300000033202',
            '3022333333332201',
            '3012222222222101',
            '3011122222211101',
            '3201111111111011',
            '3220011111100111',
            '3222200000011111',
            '3222222211111111',
            '3222222211111111'
        ], {
            width: 32,
            height: 32
        });
        var pot2 = Block([
            '     000000     ',
            '    02222220    ',
            '   0220000220   ',
            '   0200000020   ',
            '  002000000200  ',
            ' 03022000022030 ',
            ' 03302222220330 ',
            ' 02330000003320 ',
            ' 02233333333220 ',
            ' 01222222222210 ',
            ' 01112222221110 ',
            '  011111111110  ',
            '   0011111100   ',
            '     000000     ',
            '                ',
            '                '
        ], {
            width: 32,
            height: 32
        });
        // the 4x4 tile floor
        var playerStandingFront = Block([
            '      0000      ',
            '     011220     ',
            '  000111111000  ',
            '  022000000220  ',
            '  022332233220  ',
            '   0230220320   ',
            '   0220220220   ',
            '    02222220    ',
            '   0100000010   ',
            '   0111201110   ',
            '  020112011020  ',
            '  020112011020  ',
            '   0011201100   ',
            '  002000000200  ',
            '  000202202000  ',
            '   0000000000   '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingFront = Block([
            '      0000      ',
            '     011220     ',
            '  000111111000  ',
            '  022000000220  ',
            '  022332233220  ',
            '   0230220320   ',
            '   0220220220   ',
            '    02222220    ',
            '   0100000010   ',
            '   0111201110   ',
            '  020112010020  ',
            '  020112002020  ',
            '   0011202220   ',
            '  002000011100  ',
            '  000000001000  ',
            '   0000000000   '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingFront2 = Block([
            '      0000      ',
            '     011220     ',
            '  000111111000  ',
            '  022000000220  ',
            '  022332233220  ',
            '   0230220320   ',
            '   0220220220   ',
            '    02222220    ',
            '   0100000010   ',
            '   0111201110   ',
            '  020012011020  ',
            '  020202011020  ',
            '   0222001100   ',
            '  001110000000  ',
            '  000100000000  ',
            '   0000000000   '
        ], {
            width: 32,
            height: 32
        });

        var playerStandingRight = Block([
            '     00000      ',
            '    0112220     ',
            '   011011110    ',
            '   010200000    ',
            '  0202223320    ',
            '  0200223020    ',
            '   0 02220220   ',
            '     0022220    ',
            '    0110000     ',
            '    01010120    ',
            '    01000120    ',
            '    00222020    ',
            '     0020120    ',
            '    00002000    ',
            '   0020222000   ',
            '    00000000    '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingRight = Block([
            '     00000      ',
            '    0112220     ',
            '    01011110    ',
            '  0010200000    ',
            ' 02202223320    ',
            '  0000223020    ',
            '     02220220   ',
            '     0022220    ',
            '    0110000     ',
            '    01010120    ',
            '    01000120    ',
            '    00222020    ',
            '     00201020   ',
            '    001010220  ',
            '   0020000020   ',
            '    00000000    '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingRight2 = Block([
            '     00000      ',
            '    0112220     ',
            '   011011110    ',
            '   010200000    ',
            '  0202223320    ',
            '  0200223020    ',
            '   0 02220220   ',
            '     0022220    ',
            '    0110000     ',
            '    01010120    ',
            '    01000120    ',
            '    00222020    ',
            '    02020120    ',
            '   022001000    ',
            '   0020002000   ',
            '    00000000    '
        ], {
            width: 32,
            height: 32
        });

        var playerStandingLeft = Block([
            '      00000     ',
            '     0222110    ',
            '    011110110   ',
            '    000002010   ',
            '    0233222020  ',
            '    0203220020  ',
            '   02202220 0   ',
            '    0222200     ',
            '     0000110    ',
            '    02101010    ',
            '    02100010    ',
            '    02022200    ',
            '    0210200     ',
            '    00020000    ',
            '   0002220200   ',
            '    00000000    '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingLeft = Block([
            '      00000     ',
            '     0222110    ',
            '    01111010    ',
            '    0000020100  ',
            '    02332220220 ',
            '    0203220000  ',
            '   02202220     ',
            '    0222200     ',
            '     0000110    ',
            '    02101010    ',
            '    02100010    ',
            '    02022200    ',
            '   02010200     ',
            '  022010100    ',
            '   0200000200   ',
            '    00000000    '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingLeft2 = Block([
            '      00000     ',
            '     0222110    ',
            '    011110110   ',
            '    000002010   ',
            '    0233222020  ',
            '    0203220020  ',
            '   02202220 0   ',
            '    0222200     ',
            '     0000110    ',
            '    02101010    ',
            '    02100010    ',
            '    02022200    ',
            '    02102020    ',
            '    000100220   ',
            '   0002000200   ',
            '    00000000    '
        ], {
            width: 32,
            height: 32
        });

        var playerStandingBack = Block([
            '      0000      ',
            '     011220     ',
            '  000111111000  ',
            '  022011110220  ',
            '  022200002220  ',
            '   0220220220   ',
            '   0222002220   ',
            '    02222220    ',
            '   0100000010   ',
            '   0111111110   ',
            '  020111111020  ',
            '  020111111020  ',
            '   0011111100   ',
            '  002000000200  ',
            '  000202202000  ',
            '   0000000000   '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingBack = Block([
            '      0000      ',
            '     011220     ',
            '  000111111000  ',
            '  022011110220  ',
            '  022200002220  ',
            '   0220220220   ',
            '   0222002220   ',
            '    02222220    ',
            '   0100000010   ',
            '   0111111110   ',
            '  020111110020  ',
            '  020111102020  ',
            '   0011102220   ',
            '  002000011100  ',
            '  000200001000  ',
            '   0000000000   '
        ], {
            width: 32,
            height: 32
        });

        var playerMovingBack2 = Block([
            '      0000      ',
            '     011220     ',
            '  000111111000  ',
            '  022011110220  ',
            '  022200002220  ',
            '   0220220220   ',
            '   0222002220   ',
            '    02222220    ',
            '   0100000010   ',
            '   0111111110   ',
            '  020011111020  ',
            '  020201111020  ',
            '   0222011100   ',
            '  001110000200  ',
            '  000102202000  ',
            '   0000000000   '
        ], {
            width: 32,
            height: 32
        });

        // old man
        var oldDude = Block([
            '1111110000333333',
            '1111102222022222',
            '1111033223302222',
            '1110230220320222',
            '1111020220202222',
            '1111022002202222',
            '1111020330202222',
            '1110203003020222',
            '3302203333022011',
            '3201220330221011',
            '3201222002221011',
            '3200122022210011',
            '3200122012210011',
            '3002011011102001',
            '3000200000020001',
            '3200000000000011'
        ], {
            width: 32,
            height: 32
        });

        // invisible block
        var invisibleBlock = Block([
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
            '2222222222222222',
        ], {
            width: 32,
            height: 32
        });
    }

    var monospace = createFont('monospace');
// tells the map how to draw and treat each block
    var blockKeys = [
        {
            key: 'a',
            name: topBlock,
            type: 'solid'
        },
        {
            key: 'b',
            name: topRightBlock,
            type: 'solid'
        },
        {
            key: 'c',
            name: rightBlock,
            type: 'solid'
        },
        {
            key: 'd',
            name: leftBlock,
            type: 'solid'
        },
        {
            key: 'e',
            name: topLeftBlock,
            type: 'solid'
        },
        {
            key: 'f',
            name: floorA,
            type: 'walkable'
        },
        {
            key: 'F',
            name: floorB,
            type: 'walkable'
        },
        {
            key: 'p',
            name: pot,
            type: 'pot'
        },
        {
            key: 'P',
            name: pot,
            type: 'keypot'
        },
        {
            key: 'h',
            name: rightEndBlock,
            type: 'solid'
        },
        {
            key: 'i',
            name: leftEndBlock,
            type: 'solid'
        },
        {
            key: 'j',
            name: rightBeginBlock,
            type: 'solid'
        },
        {
            key: 'k',
            name: leftBeginBlock,
            type: 'solid'
        },
        {
            key: 'l',
            name: bottomLeftBlock,
            type: 'solid'
        },
        {
            key: 'm',
            name: bottomBlock,
            type: 'solid'
        },
        {
            key: 'n',
            name: bottomRightBlock,
            type: 'solid'
        },
        {
            key: '1',
            name: lockBlock,
            type: 'lock'
        },
        {
            key: '2',
            name: keyBlock,
            type: 'key'
        },
        {
            key: '3',
            name: closedTreasureChest,
            type: 'closedmoneychest'
        },
        {
            key: '4',
            name: closedTreasureChest,
            type: 'closedkeychest'
        },
        {
            key: '5',
            name: openTreasureChest,
            type: 'openchest'
        },
        {
            key: '6',
            name: oldDude,
            type: 'npc'
        },
        {
            key: '7',
            name: pot,
            type: 'coinpot'
        },
        {
            key: '8',
            name: coin,
            type: 'coin'
        },
        {
            key: '#',
            name: floorA,
            type: 'end'
        },
        {
            key: 'x',
            name: invisibleBlock,
            type: 'solid'
        },
        {
            key: 'E',
            name: topBlock,
            type: 'walkable'
        }
    ];

// the player variables
    var p = {
        x: 40,
        y: 40,
        xc: 0,
        yc: 0,
        speed: 3, // the players travel speed
        inventory: {
            keys: 0,
            coins: 0
        },
        animation: {
            state: 0,
            image: playerStandingFront, // the current image displayed
            change: 0.1
        },
        facing: 'down',
        pot: false, // whether or not the player holds a pot
        speaking: false // whether or not the npc chat dialogue is open
    };

// menu variables
    var menu = {
        x: -200,
        y: -200,
        xc: -0.5,
        yc: -0.5
    };

// adds the entire map into one array to reduce lag
    for (var y = 0; y < floorplan.length; y++) {
        for (var x = 0; x < floorplan[y].length; x++) {
            // loops through the block assignment array
            for (var k = 0; k < blockKeys.length; k++) {
                if (floorplan[y][x] === blockKeys[k].key) {
                    blocks.push({
                        name: blockKeys[k].name,
                        type: blockKeys[k].type,
                        x: x * 40,
                        y: y * 40
                    });
                }
            }
        }
    }

    var mouseIsPressed = false;

    var mouse=[];
    mousePressed=function(){
        mouse[mouseButton]=true;
        mouseIsPressed = true;
    };
    mouseReleased=function(){
        mouse[mouseButton]=false;
        mouseIsPressed = false;
        return true;
    };

    var keys=[];
    var keyPressed=function(){
        keys[keyCode]=true;

        keysPressed[keyCode] = true;
        keyIsPressed = true;
    };
    var keyReleased=function(){
        keys[keyCode]=false;

            keysPressed[keyCode] = false;
            keyIsPressed = false;
    };


    draw = function() {
        if (scene === 'logo') {
            Logo();
            Timer += 0.1;
            if (Timer > 60) {
                scene = 'menu';
            }
            textFont(monospace, 14);
            text('skip >>', 370, 390);

            if (mouseIsPressed && mouseX > 330 && mouseX < 400 && mouseY > 380 && mouseY < 400) {
                scene = 'menu';
            }
        }
        if (scene === 'menu') {
            background(80, 85, 80);

            // scrolls the map
            menu.x += menu.xc;
            menu.y += menu.yc;

            // defines the borders of the scrolling
            if (menu.x < -2280) {
                menu.xc = random(0.1, 1);
            }
            if (menu.y < -560) {
                menu.yc = random(0.1, 1);
            }
            if (menu.x > 0) {
                menu.xc = -random(0.1, 1);
            }
            if (menu.y > 0) {
                menu.yc = -random(0.1, 1);
            }

            // draws the preview map

            for (var i = 0; i < blocks.length; i++) {
                image(blocks[i].name, blocks[i].x + menu.x, blocks[i].y + menu.y, 40, 40);
            }

            strokeWeight(4);
            fill(50, 55, 50);
            stroke(50, 55, 50);
            rect(154, 199, 100, 50, 5);
            rect(154, 299, 100, 50, 5);

            fill(50, 55, 50);
            stroke(180, 185, 180);

            // play button
            rect(150, 195, 100, 50, 5);
            // help button
            rect(150, 295, 100, 50, 5);

            fill(180, 185, 180);
            textFont(monospace, 30);
            textAlign(CENTER);

            // play button text
            text('Play', 200, 230);
            // help button text
            text('Help', 200, 330);

            fill(50, 55, 50);
            textSize(40);
            text('Labyrinth II', 204, 124);

            fill(180, 185, 180);
            textSize(40);
            text('Labyrinth II', 200, 120);

            textSize(20);
            fill(50, 55, 50);
            text('THE', 94, 94);

            fill(180, 185, 180);
            text('THE', 90, 90);

            if (mouseIsPressed && mouseX > 150 && mouseX < 250 && mouseY > 195 && mouseY < 245) {
                scene = 'game';
            }

            if (mouseIsPressed && mouseX > 150 && mouseX < 250 && mouseY > 295 && mouseY < 345) {
                scene = 'help';
            }
        }
        if (scene === 'help') {
            textSize(18);
            background(80, 85, 80);
            fill(50, 55, 50);
            text('Use the arrow keys to move,\nz to open chests and pick up pots,\nand x to throw them again.\n\nEscape the Labyrinth by collecting\ncoins and keys, unlocking\ndoors, and exploring rooms.\n\nGood luck!', 204, 44);
            fill(180, 185, 180);
            text('Use the arrow keys to move,\nz to open chests and pick up pots,\nand x to throw them again.\n\nEscape the Labyrinth by collecting\ncoins and keys, unlocking\ndoors, and exploring rooms.\n\nGood luck!', 200, 40);

            fill(50, 55, 50);
            stroke(50, 55, 50);
            // help button
            rect(154, 249, 100, 50, 5);
            stroke(180, 185, 180);
            rect(150, 245, 100, 50, 5);

            fill(180, 185, 180);
            textFont(monospace, 30);
            textAlign(CENTER);

            // play button text
            text('Back', 200, 280);

            if (mouseIsPressed && mouseX > 150 && mouseX < 250 && mouseY > 245 && mouseY < 295) {
                scene = 'menu';
            }
        }
        if (scene === 'game') {
            background(80, 85, 80);


            // animates the players movement
            p.animation.num += p.animation.change;

            // moves the player when keys are pressed
            p.x += p.xc;
            p.y += p.yc;

            // loops through the map arrays
            for (var i = 0; i < blocks.length; i++) {

                var o = blocks[i];

                // draws the block on the canvas
                image(blocks[i].name, blocks[i].x + mapCoords.x, blocks[i].y + mapCoords.y, 40, 40);

                // coordinates of the block
                var b = {
                    x: o.x + mapCoords.x,
                    y: o.y + mapCoords.y
                };

                // determines collisions for solid blocks
                if (o.type === 'solid' || o.type === 'lock' || o.type === 'closedmoneychest' || o.type === 'openchest' || o.type === 'closedkeychest' || o.type === 'pot' || o.type === 'keypot' || o.type === 'npc' || o.type === 'coinpot') {
                    // right
                    if (p.x < b.x + 40 && p.x + 20 > b.x && p.y + 30 > b.y && p.y < b.y + 30) {
                        p.x += p.speed;

                        // if the player touches a lock with a key
                        if (o.type === 'lock' && p.inventory.keys > 0) {
                            playSound(getSound("rpg/door-open"));
                            p.inventory.keys--;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }

                        // if the player touches a villager
                        if (o.type === 'npc' && p.inventory.coins >= 50) {
                            playSound(getSound("rpg/giant-yah"));
                            p.inventory.coins -= 50;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        } else if (o.type === 'npc' && p.inventory.coins < 50) {
                            p.speaking = true;
                        }
                    }

                    // left
                    if (p.x + 40 > b.x && p.x < b.x + 20 && p.y + 30 > b.y && p.y < b.y + 30) {
                        p.x += -p.speed;

                        // if the player touches a lock with a key
                        if (o.type === 'lock' && p.inventory.keys > 0) {
                            playSound(getSound("rpg/door-open"));
                            p.inventory.keys--;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }

                        // if the player touches a villager
                        if (o.type === 'npc' && p.inventory.coins >= 50) {
                            playSound(getSound("rpg/giant-yah"));
                            p.inventory.coins -= 50;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        } else if (o.type === 'npc' && p.inventory.coins < 50) {
                            p.speaking = true;
                        }
                    }

                    // up
                    if (p.y < b.y + 40 && p.y + 20 > b.y && p.x + 30 > b.x && p.x < b.x + 30) {
                        p.y += p.speed;

                        // if the player touches a lock with a key
                        if (o.type === 'lock' && p.inventory.keys > 0) {
                            playSound(getSound("rpg/door-open"));
                            p.inventory.keys--;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }

                        // if the player touches a villager
                        if (o.type === 'npc' && p.inventory.coins >= 50) {
                            playSound(getSound("rpg/giant-yah"));
                            p.inventory.coins -= 50;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        } else if (o.type === 'npc' && p.inventory.coins < 50) {
                            p.speaking = true;
                        }
                    }

                    // down
                    if (p.y + 40 > b.y && p.y < b.y + 20 && p.x + 30 > b.x && p.x < b.x + 30) {
                        p.y -= p.speed;

                        // if the player touches a lock with a key
                        if (o.type === 'lock' && p.inventory.keys > 0) {
                            playSound(getSound("rpg/door-open"));
                            p.inventory.keys--;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }

                        // if the player touches a villager
                        if (o.type === 'npc' && p.inventory.coins >= 50) {
                            playSound(getSound("rpg/giant-yah"));
                            p.inventory.coins -= 50;
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        } else if (o.type === 'npc' && p.inventory.coins < 50) {
                            p.speaking = true;
                        }
                    }
                }

                // if the player collides with a key
                if (o.type === 'key') {
                    if (p.y > b.y - 40 && p.y < b.y + 40 && p.x > b.x - 40 && p.x < b.x + 40) {
                        playSound(getSound("rpg/metal-chime"));
                        p.inventory.keys++;
                        replaceBlock(o.x, o.y, 'walkable', floorA);
                    }
                }

                // if the player reaches the end
                if (o.type === 'end') {
                    if (p.y > b.y - 40 && p.y < b.y + 40 && p.x > b.x - 40 && p.x < b.x + 40) {
                        scene = 'end';
                    }
                }

                // if the player collides with a coin
                if (o.type === 'coin') {
                    if (p.y > b.y - 40 && p.y < b.y + 40 && p.x > b.x - 40 && p.x < b.x + 40) {
                        playSound(getSound("rpg/coin-jingle"));
                        p.inventory.coins += 10;
                        replaceBlock(o.x, o.y, 'walkable', floorA);
                    }
                }

                // if the player opens a chest
                if (o.type === 'closedkeychest' && p.facing === 'up' || o.type === 'closedmoneychest' && p.facing === 'up') {
                    if (p.y > b.y && p.y < b.y + 50 && p.x > b.x - 10 && p.x < b.x + 10 && keysPressed[90]) {
                        // gives a key if it is a key chest, and gives 10 coins if it is a money chest
                        if (o.type === 'closedkeychest') {
                            p.inventory.keys++;
                            playSound(getSound("rpg/metal-chime"));
                        } else if (o.type === 'closedmoneychest') {
                            p.inventory.coins += 10;
                            playSound(getSound("rpg/coin-jingle"));
                        }
                        // places an open chest
                        replaceBlock(o.x, o.y, 'openchest', openTreasureChest);
                    }
                }

                // determines the functionality of the pots
                if (o.type === 'pot' || o.type === 'keypot' || o.type === 'coinpot') {
                    // picks one up while facing up
                    if (p.y > b.y && p.y < b.y + 44 && p.x > b.x - 10 && p.x < b.x + 10 && keysPressed[90] && p.facing === 'up' && !p.pot) {
                        // places either a key a coin or nothing
                        if (o.type === 'keypot') {
                            replaceBlock(o.x, o.y, 'key', keyBlock);
                        } else if (o.type === 'coinpot') {
                            replaceBlock(o.x, o.y, 'coin', coin);
                        } else {
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }
                        p.pot = true;
                    }
                    // picks one up while facing down
                    if (p.y > b.y - 44 && p.y < b.y && p.x > b.x - 10 && p.x < b.x + 10 && keysPressed[90] && p.facing === 'down' && !p.pot) {
                        // places either a key a coin or nothing
                        if (o.type === 'keypot') {
                            replaceBlock(o.x, o.y, 'key', keyBlock);
                        } else if (o.type === 'coinpot') {
                            replaceBlock(o.x, o.y, 'coin', coin);
                        } else {
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }
                        p.pot = true;
                    }
                    // picks one up while facing left
                    if (p.y > b.y - 10 && p.y < b.y + 10 && p.x > b.x && p.x < b.x + 44 && keysPressed[90] && p.facing === 'left' && !p.pot) {
                        // places either a key a coin or nothing
                        if (o.type === 'keypot') {
                            replaceBlock(o.x, o.y, 'key', keyBlock);
                        } else if (o.type === 'coinpot') {
                            replaceBlock(o.x, o.y, 'coin', coin);
                        } else {
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }
                        p.pot = true;
                    }
                    // picks one up while facing right
                    if (p.y > b.y - 10 && p.y < b.y + 10 && p.x > b.x - 44 && p.x < b.x && keysPressed[90] && p.facing === 'right' && !p.pot) {
                        if (o.type === 'keypot') {
                            replaceBlock(o.x, o.y, 'key', keyBlock);
                        } else if (o.type === 'coinpot') {
                            replaceBlock(o.x, o.y, 'coin', coin);
                        } else {
                            replaceBlock(o.x, o.y, 'walkable', floorA);
                        }
                        p.pot = true;
                    }
                }
            }

            // starts the animations when there is movement
            if (keyIsPressed) {
                if (p.animation.num <= 0) {
                    p.animation.change = 0.1;
                }
                if (p.animation.num >= 1) {
                    p.animation.change = -0.1;
                }
                p.animation.state = round(p.animation.num);
            } else {
                p.animation.num = 0;
            }
            if (!keysPressed[UP] && !keysPressed[DOWN] && !keysPressed[LEFT] && !keysPressed[RIGHT]) {
                p.animation.change = 0;
            }

            // determines movement, direction faced, and animation images to be displayed
            if (keysPressed[UP]) {
                p.yc = -p.speed;
                p.facing = 'up';
                if (p.y < 100) {
                    mapCoords.y += p.speed;
                    p.yc = 0;
                }
                if (p.animation.change === -0.1) {
                    p.animation.image = playerMovingBack;
                } else if (p.animation.change === 0.1) {
                    p.animation.image = playerMovingBack2;
                }

            } else if (keysPressed[DOWN]) {
                p.yc = p.speed;
                p.facing = 'down';
                if (p.y > 300) {
                    mapCoords.y -= p.speed;
                    p.yc = 0;
                }
                if (p.animation.change === -0.1) {
                    p.animation.image = playerMovingFront;
                } else if (p.animation.change === 0.1) {
                    p.animation.image = playerMovingFront2;
                }
            } else {
                p.yc = 0;
                if (p.facing === 'down') {
                    p.animation.image = playerStandingFront;
                }
                if (p.facing === 'up') {
                    p.animation.image = playerStandingBack;
                }
            }

            if (keysPressed[LEFT]) {
                p.xc = -p.speed;
                p.facing = 'left';
                if (p.x < 100) {
                    mapCoords.x += p.speed;
                    p.xc = 0;
                }
                if (p.animation.change === -0.1) {
                    p.animation.image = playerMovingLeft;
                } else if (p.animation.change === 0.1) {
                    p.animation.image = playerMovingLeft2;
                }
            } else if (keysPressed[RIGHT]) {
                p.xc = p.speed;
                p.facing = 'right';
                if (p.x > 300) {
                    mapCoords.x -= p.speed;
                    p.xc = 0;
                }
                if (p.animation.change === -0.1) {
                    p.animation.image = playerMovingRight;
                } else if (p.animation.change === 0.1) {
                    p.animation.image = playerMovingRight2;
                }
            } else {
                p.xc = 0;
                if (p.facing === 'right') {
                    p.animation.image = playerStandingRight;
                }
                if (p.facing === 'left') {
                    p.animation.image = playerStandingLeft;
                }
            }
            // allows the player to throw pots when x is pressed
            if (keysPressed[88] && p.pot) {
                playSound(getSound("rpg/battle-swing"));
                p.pot = false;
                p.speed = 3;
            }


            // draws the player
            image(p.animation.image, p.x, p.y, 40, 40);

            // draws a pot if the player is holding one
            if (p.pot === true) {
                p.speed = 2;
                image(pot2, p.x, p.y - 30, 40, 40);
            }

            // coin and key displays
            textAlign(LEFT, CENTER);
            textFont(monospace, 18);
            fill(200, 205, 205);
            if (p.inventory.keys !== 1) {
                text(p.inventory.keys + ' keys', 20, 20);
            } else {
                text(p.inventory.keys + ' key', 20, 20);
            }
            if (p.inventory.coins !== 1) {
                text(p.inventory.coins + ' coins', 100, 20);
            } else {
                text(p.inventory.coins + ' coin', 80, 20);
            }
            if (true === true) {
                text('You found an easter egg!', 260 + mapCoords.x, 1280 + mapCoords.y);
            }

            // closes the npc chat window if the player moves
            if (keyIsPressed) {
                p.speaking = false;
            }

            // draws the npc chat window
            if (p.speaking) {

                rectMode(LEFT);
                fill(20, 25, 20);
                strokeWeight(4);
                stroke(200, 205, 200);

                rect(20, 300, 360, 100);

                textAlign(CENTER, CENTER);
                textFont(monospace, 18);
                fill(200, 205, 205);

                text('You need 50 coins to pass.', 200, 350);
            }
        }
        if (scene === 'end') {
            textAlign(CENTER, CENTER);
            textFont(monospace, 26);
            background(80, 85, 80);
            fill(50, 55, 50);
            text('You escaped the Labyrinth!\nThe cold air of freedom\ngreets you as you emerge\ninto the light.', 204, 184);
            fill(180, 185, 180);
            text('You escaped the Labyrinth!\nThe cold air of freedom\ngreets you as you emerge\ninto the light.', 200, 180);
        }
    };

}};



