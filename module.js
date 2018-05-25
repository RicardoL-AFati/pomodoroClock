class CountDownTimer {

// Constructor Function
constructor(duration, granularity) {
    this.duration = duration;
    // If granularity is falsey -> default value of 1000 (milliseconds)
    this.granularity = granularity || 1000;
    // Functions to call on timer instance for
    this.tickFtns = [];
    this.running = false;
  }

  // -- start --
  start() {
    // if timer is already running - stop function execution.  
    if (this.running) {
      return;
    }
    this.running = true;
    // Initial start time when countDownTimer.start() was called 
    var start = Date.now(),
        that = this,
        diff, obj;
    
    (function timer() {
      // diff is time left on timer(seconds) = that.duration - elapsed time since initial start call.   
      diff = that.duration - (((Date.now() - start) / 1000) | 0);
        
      if (diff > 0) {
        // Calls timer function after 1 second (default)  
        setTimeout(timer, that.granularity);
      } else {
        // no time left on this timer - no longer running   
        diff = 0;
        that.running = false;
      }
      // creates timer object using parse(diff)
      obj = CountDownTimer.parse(diff);
      // that (countDownTimer) - for each function on it's tickFtns array ->
      that.tickFtns.forEach(function(ftn) {
        // Call current function on this timer using obj.minutes and obj.seconds as arguments
        ftn.call(this, obj.minutes, obj.seconds);
        // that (countDownTimer) used as reference object (this for the callback)
      }, that);
    }());
  };

  /* -- onTick -- 
  adds argument to timer's tickFtns array if it's a function */
  onTick(ftn) {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn);
    }
    // returns timer so onTick's can be chained 
    return this;
  };

  /* -- expired --
  returns true if timer.running = false and vice versa */
  expired() {
    return !this.running;
  };

  /* -- parse --
  Creates object with minutes and seconds as key-value pairs. Using seconds parameter */
  parse(seconds) {
    return {
      // minutes is total seconds / 60 - default value of 0 
      'minutes': (seconds / 60) | 0,
      // seconds is remainder of seconds after dividing by minutes (60 sec) - default value of 0
      'seconds': (seconds % 60) | 0
    };
  };

}

export default CountDownTimer;