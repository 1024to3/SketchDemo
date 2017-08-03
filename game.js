//Created by Brian Kaho on 7/27/2017.

//register keys to be watched for
var A = KH.registerKey(COMMONKEY.A);
var D = KH.registerKey(COMMONKEY.D);
var UP = KH.registerKey(COMMONKEY.LEFT);
var DOWN = KH.registerKey(COMMONKEY.RIGHT);
var SPACE = KH.registerKey(COMMONKEY.SPACE);

//bound to prevent scrolling
KH.registerKey(COMMONKEY.UP);
KH.registerKey(COMMONKEY.DOWN);

//runtime variables
var p_loc = [200, 270];
var move_speed = 10;

//draw a blue bubbleRect to a new layer //#1000FFCC//#0000FF10
var bubble = DrawLayer.bubbleRect([215, 20],"rgba(0,0,255,10)","rgb(16,0,240)", 2);
//draw text onto bubbles layer
bubble.setRGB([10, 10, 10]);
bubble.draw.fillText("a/d=left/right left-arrow/right-arrow=up/down", 4, 12);


//after all resource have loaded run code
window.onload = function(){
    //********************
    //Setup game resources
    //********************

    //make a game loop with double buffer.
    var game = Templates.gameSetup('canvas', 600, 600, 32, [0, 0, 0], true, true);

    //add layer where the drawing is stored
    var draw_layer = game.main_layer.addChildLayer("draw_layer");

    //set background or clear color on buffer
    game.buffer_layer.setRGBA([172, 186, 151, 0.32]);
    game.buffer_layer.setClearColorToCurrent();

    //set draw color
    draw_layer.setRGB([0,0,0]);

    //add clear function to remove drawing when the board is shaken
    draw_layer.clearDrawing = function(){
        this.draw.clearRect(0,0, this.width, this.height)
    };

    //when window resized the drawing layer will be resized without losing drawing
    game.onresize = function(size){
        //if window gets bigger make the the buffer bigger
        if(draw_layer.width < size[0] || draw_layer.height < size[1]){
            //temporary backup layer
            var backup_layer = new CanvasLayer("", draw_layer.width, draw_layer.height);
            backup_layer.drawFromLayer(draw_layer,0,0);
            draw_layer.setSize(size[0], size[1]);
            draw_layer.drawFromLayer(backup_layer,0,0);
        }
    };

    //***************
    //game loop
    //***************

    //update function is called by GameLoop object to update the game
    game.update = function (delta){
        //check control states
        // /move left
        if (A.state)
            p_loc[0] -= move_speed * delta;
        //move right
        if (D.state)
            p_loc[0] += move_speed * delta;
        //move up
        if (UP.state)
            p_loc[1] -= move_speed * delta;
        //move down
        if (DOWN.state)
            p_loc[1] += move_speed * delta;

        //shake the board
        if(SPACE.state)
            draw_layer.clearDrawing();

        //clear the main_layer to clear color
        this.buffer_layer.clearCanvas();

        //draw bubble and instructions
        this.buffer_layer.drawFromLayer(bubble, 10, 18);

        //draw on draw_layer
        draw_layer.draw.fillRect(p_loc[0], p_loc[1], 0.1, 0.1);

        //set color to almost white
        this.buffer_layer.setRGB([200, 200, 200]);
        //draw cursor location to buffer
        this.buffer_layer.draw.fillRect(p_loc[0] - 1, p_loc[1]-1, 3, 3);

        //copy drawing onto buffer layer
        this.buffer_layer.drawFromLayer(draw_layer, 0,0);

        //------------------------------------------------------------------------------------------------------------------------------
        // the second buffer will be draw(flipped) by default if constructed with a template unless you set game.drawScreen to undefined
        //------------------------------------------------------------------------------------------------------------------------------
    };

    //************
    //Run the game
    //************

    game.runForever();
};
