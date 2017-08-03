/**
 * Created by Brian Kaho on 7/21/2017.
 */
Timer = function(){

    //set the timer beginning to now.
    this.reset = function(){
        this.time = this.getUTC();
    };

    //get the current time in UTC
    this.getUTC = function(){
        return Date.now();
    };

    //get time passed sense the timer was last reset
    this.getTimePassed = function(){
        return this.getUTC() - this.time;
    };

    //store the current time
    this.time = this.getUTC();
};

var GameLoop = function(){
    //undefined functions
    this.update = undefined;
    this.drawScreen = undefined;
    this.flip = undefined;

    //config
    this.update_delay = 0;

    //optional variables
    this.double_buffer = false;
    //used for drawing with LayeredCanvas
    this.main_layer = undefined;

    this.setFrameRate = function(fps){
        this.update_delay = Math.floor((1/fps) * 1000);
    };

    //utils
    this.run_timer = new Timer();
    this.gameInterval = undefined;

    //private update function
    this._update = function(self, args){
        var delta = self.run_timer.getTimePassed() / 1000;
        //run update function
        if(self.update){
            self.update(delta, args);
            self.run_timer.reset();
        }

        //run drawing function if defined
        if(self.drawScreen)
            self.drawScreen();
    };

    //begin game function
    this.runForever = function(args){
        //reset timer
        this.run_timer.reset();
        this.gameInterval = setInterval(this._update, this.update_delay, this, args);
    };

};