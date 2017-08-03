/**
 * Created by Brian Kaho on 7/27/2017.
 */

var COMMONKEY = {
    ENTER:13,
    SPACE:32,
    UP:38,
    LEFT:37,
    RIGHT:39,
    DOWN:40,
    W:87,
    A:65,
    S:83,
    D:68,
    Q:81,
    E:69,
    SHIFT:16,
    CTRL:17,
    ALT:18,
    ESC:27,
    GRAVE_ACCENT:192,
    ZERO:48
};

//object for holding key information and state
var _Key = function(key) {
    this.key = key;
    this.state = false;
    this.onkeydown = undefined;
    this.onkeyup = undefined;
};

KH = {
    registerd_keys:[],
    settings:{preventDefault:true},
    registerKey:function (key){
        var key = new _Key(key);
        this.registerd_keys.push(key);
        return key;
    },
    findKey:function(keyCode){
        for(var i =0;i<this.registerd_keys.length;i++){
            if(this.registerd_keys[i].key === keyCode)
                return this.registerd_keys[i];
        }
    },

    handleKeyUp: function(event){
    var key = KH.findKey(event.keyCode);
        if(key){
            key.state = false;
            if(key.onkeyup)
                key.onkeyup();
        }
    },

    handleKeyDown:function(event){
        var key = KH.findKey(event.keyCode);
        if(key){
            if(!key.state) {
                key.state = true;
                if (key.onkeydown)
                    key.onkeydown();
            }
            if(KH.settings.preventDefault)
                event.preventDefault();
        }
    }

};

document.onkeydown = KH.handleKeyDown;
document.onkeyup = KH.handleKeyUp;