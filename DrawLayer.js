/**
 * Created by Brian Kaho on 8/2/2017.
 */
DrawLayer = {
  bubbleRect:function(size, fillColor, strokeColor, lineWidth=0){
      var l = new CanvasLayer(undefined, size[0], size[1]);
      drawBubbleRect(l.draw, size[0], size[1], fillColor, strokeColor, lineWidth);
      return l;
  }
};

function drawBubbleRect(ctx, width, height, fill, stroke, lineWidth){
    var hh = height / 2 - lineWidth;
    var hlw = lineWidth/2;
    ctx.beginPath();
    ctx.arc(hh+hlw, hh+hlw, hh, 0.5 * Math.PI, 1.5 * Math.PI, false);
    ctx.arc(width - hh-hlw, hh, hh, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.lineTo(hh, hh*2+hlw);
    ctx.fillStyle = fill;
    ctx.fill();
    if(stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}