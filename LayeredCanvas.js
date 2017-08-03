/**
 * Created by Brian Kaho on 7/19/2017 under the MIT License.
 *--------------------------------------------
 * Canvas Layer is only a simple drawing util.
 */

CanvasLayer = function(source, width, height, clearColor){
    console.log("creating layer");

    this.children = [];
    this.canvas = undefined;
    this.draw = undefined;

    //if canvas id is not specified then it is a buffer
    this.is_buffer = !(typeof source === 'string');

    //useful information
    this.name = 'layer';
    this.width = width;
    this.height = height;

    //create or find canvas element
    if(this.is_buffer)
        this.canvas = document.createElement("canvas");
    else {
        this.canvas = document.getElementById(source);
        this.name = "main_layer";
    }
    //Set canvas width/height
    this.canvas.width = width;
    this.canvas.height = height;

    //set default clear color if one does not exist
    if(clearColor === undefined)
        clearColor = [0,0,0];

    this.clearColor = "rgb(" + clearColor + ")";

    if(this.canvas.getContext){
        this.draw = this.canvas.getContext('2d');
    }else{
        console.error("canvas not supported");
    }


    //***************
    //Useful function
    //***************

    this.setClearColorToCurrent = function(){
        this.clearColor = this.draw.fillStyle;
    };

    //clear the screen
    this.clearCanvas = function(){
        var style = this.draw.fillStyle;
        this.draw.fillStyle = this.clearColor;
        this.draw.fillRect(0,0, this.width, this.height);
        this.draw.fillStyle = style;
    };

    //add buffer
    this.addChildLayer = function(name, width, height){
        //if size undefined then size = current layer
        if(width === undefined || height === undefined){
            width = this.width;
            height = this.height;
        }

        var canvas = new CanvasLayer(undefined, width, height);
        this.children.push(canvas);
        canvas.name = name ? name : this.name + "_sub_" + canvas.children.length;

        //if double buffer set parent to buffer;
        //if(this.double_buffer)
        //    canvas.parrent = this.children[0];
        //else
        //    canvas.parrent = this;

        return canvas;
    };


    //draw sub-buffer to this canvas
    this.drawChild = function(index, x=0, y=0){
        var can = this.children[index];
        if(can) {
            this.draw.drawImage(can.canvas, x, y);
            return true;
        }
        else
            return false;
    };

    //draw buffer to this canvas
    this.drawFromLayer = function(buff, x=0, y=0){
        if(buff)
            this.draw.drawImage(buff.canvas, x, y);
        else
            console.log("buffer is undefined")
    };

    //set draw color RGB
    this.setRGB = function(color){
        this.draw.fillStyle = 'rgb(' + color + ')';
    };

    //set draw color RGBA
    this.setRGBA = function(color){
        this.draw.fillStyle = 'rgba(' + color + ')';
    };

    this.setSize = function(width, height){
        if(width !== 0)
            this.canvas.width = this.width = width;
        if(height !== 0)
            this.canvas.height = this.height = height;
    };

    this.getSize = function(){
        return [this.width, this.height];
    };

    this.savePNG = function(){

    }
};