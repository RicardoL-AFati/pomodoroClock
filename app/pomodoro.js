// required by requirejs to load modules
define (function (require) {
  // requiring the timer module
  var CountDownTimer = require('./module');

  // adds 0 in front of minutes and seconds if < 10. Changes countDown time to show time left 
  function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $("#countDown").text(minutes + ":" + seconds);
  }

  // Creates break timer and changes timerType display
  function startBreak() {
    // If current timer has expired
    if (this.expired()) {
      // Take current number in break span * 60 (for seconds) -> create new timer using that
      var breakLength = (Number($("#break").text())) * 60,
          timer = new CountDownTimer(breakLength);
      // Change div to reflect this is break timer
      $("#timerType").text("Break Time!");    
      // Add format() and newClickevent() to timer functions, start timer
      timer.onTick(format).onTick(newClickEvent).start();  
    }
  }

  // Start initial session timer 
  function startSession() {
    // Take current number in session span * 60 (for seconds) -> create timer using that
    var sessionLength = (Number($("#session").text())) * 60,
        timer = new CountDownTimer(sessionLength);
    // Change div to reflect this is session timer.   
    $("#timerType").text("Session");
    // Add format() and startBreak() to timer functions, start timer
    timer.onTick(format).onTick(startBreak).start();
  }

  // Added to break timer
  function newClickEvent() {
    // if break timer is expired
    if (this.expired()) {
      // Add one click event to sessionDisplay
      $("#sessionDisplay").one("click", function(){
        startSession();
      });
    }
  }

  // Click event for minus buttons
  $(".minus").on("click", function(){
    // Taking number from adjacent span
    var number = Number($(this).next().text());
    // Decrementing
    number--;
    // if number goes below 1, reassign to 1
    if (number < 1) number = 1;
    // change span text to reflect new number
    $(this).next().text(number);
  });

  // Click event for plus buttons
  $(".plus").on("click", function(){
    // Taking number from previous (adjacent) span
    var number = Number($(this).prev().text());
    // Incrementing
    number++;
    // change span to reflect new number
    $(this).prev().text(number);
  });
  
  // Adding one initial click event to sessionDisplay div
  $("#sessionDisplay").one("click", function(){
    // Start session timer
    startSession();
  });
  
});