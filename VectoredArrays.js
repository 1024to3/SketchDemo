//Created by Brian Kaho on 7/27/2017 under the MIT License.
function _vectorOperation(a, b, func){
    var is_scalar = typeof(b) === "number";
    if (is_scalar || a.length === b.length) {
        var c = new Array(a.length);
        for (var i = 0; i < a.length; i++) {
            c[i] = func(a[i], is_scalar ? b : b[i]);
        }
        return c;
    }
    console.error("wrong type/length in b: " + b);
}

function _vectorSum(){

}

//a.x * b.x + a.y * b.y + ...
//takes two vectors an returns a scalar
function ArrayDot(a, b){
    if(a.length === b.length){
        return a.mul(b).sum();
    }
}

function ArrayCross(a, b){
    var c = [0,0,0];
    c[0] = (a[1] * b[2]) - (a[2] * b[1]);
    c[1] = (a[2] * b[0]) - (a[0] * b[2]);
    c[2] = (a[0] * b[1]) - (a[1] * b[0]);
    return c;
}

//get length from origin
function ArrayMagnitude(a){
    var b = a.mul(a).sum();
    if(a.length === 3)
        b = Math.cbrt(b);
    else
        b = Math.sqrt(b);
    return b;
}

//divide an array by its magnitude
function ArrayNormalize(a){
    var m = ArrayMagnitude(a);
    return a.div(m);
}

//bind to array prototypes
Array.prototype.dot = function(b){
    return ArrayDot(this, b);
};

Array.prototype.cross = function(b){
  return ArrayCross(this, b);
};

Array.prototype.mag = function(){
    return ArrayMagnitude(this);
};

Array.prototype.norm = function(){
  return ArrayNormalize(this);
};

Array.prototype.floor = function(){
    return _vectorOperation(this, 0, function(a){return Math.floor(a)});
};

Array.prototype.ceil = function(){
    return _vectorOperation(this, 0, function(a){return Math.ceil(a)});
};

//arithmetic functions
Array.prototype.add = function(b){
    return _vectorOperation(this, b, function(a, b){return a + b});
};

Array.prototype.sub = function(b){
    return _vectorOperation(this, b, function(a, b){return a - b});
};

Array.prototype.mul = function(b){
    return _vectorOperation(this, b, function(a, b){return a * b});
};

Array.prototype.div = function(b){
    return _vectorOperation(this, b, function(a, b){return a / b});
};

Array.prototype.sum = function(){
    var sum = 0;
        for(var i = 0; i < this.length; i++)
            sum += this[i];
    return sum;
};

Array.prototype.neg = function(){
    return _vectorOperation(this,0, function(a){return -a})
};

Array.prototype.or = function(b){
  return _vectorOperation(this, b, function(a,b){return a||b});
};


Array.prototype.and = function(b) {
    return _vectorOperation(this, b, function (a, b) {
        return a && b
    });
};