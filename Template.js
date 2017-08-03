/**
 * Created by Brian Kaho on 7/21/2017.
 */


var Templates = {
    gameSetup: function(source, width, height, fps, clearColor=[0, 0, 0], fullScreen=true, double_buffer=true){
        console.log(arguments);
        //return output is a GameLoop object
        var output = new GameLoop();
        output.main_layer = new CanvasLayer(source, width, height, clearColor);

        if(double_buffer){
            Templates.ModularFunctions.addDoubleBuff(output);
            //add buffer flip function
            output.drawScreen = output.flip = Templates.ModularFunctions.flip;
        }

        if(fullScreen){
            Templates.ModularFunctions.makeFullScreen(output)
        }

        return output;
    },

    ModularFunctions: {
        addDoubleBuff: function(loopObj){
            var width = loopObj.main_layer.width;
            var height = loopObj.main_layer.height;
            loopObj.buffer_layer = loopObj.main_layer.addChildLayer(width, height);
            loopObj.buffer_layer.name = "buffer_layer";
        },
        makeFullScreen: function(loopObj){
            loopObj.onresize = undefined;
            window.loopobj = loopObj;
            window.onresize = function(){
                var size = getWindowSize();
                this.loopobj.main_layer.setSize(size[0], size[1]);
                this.loopobj.buffer_layer.setSize(size[0], size[1]);
                if(this.loopobj.onresize)
                    this.loopobj.onresize(size);
            };
            window.onresize();
        },

        flip: function(){
            this.main_layer.drawChild(0,0,0);
        }
    }
};

//get window size
var getWindowSize = function(){
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return [x,y]
};