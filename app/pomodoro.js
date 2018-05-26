define (function (require) {
  // requiring the timer module
  var CountDownTimer = require('./module');

  function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $("#countDown").text(minutes + ":" + seconds);
  }

  function startBreak() {
    if (this.expired()) {
      var breakLength = (Number($("#break").text())) * 60,
          timer = new CountDownTimer(breakLength);

      $("#timerType").text("Break Time!");    
      timer.onTick(format).onTick(newClickEvent).start();  
    }
  }

  function startSession() {
    var sessionLength = (Number($("#session").text())) * 60,
        timer = new CountDownTimer(sessionLength);

    $("#timerType").text("Session");
    timer.onTick(format).onTick(startBreak).start();
  }

  function newClickEvent() {
    if (this.expired()) {
      $("#sessionDisplay").one("click", function(){
        startSession();
      });
    }
  }
  $(".minus").on("click", function(){
    var number = Number($(this).next().text());
    number--;
    if (number < 1) number = 1;
    $(this).next().text(number);
  });

  $(".plus").on("click", function(){
    var number = Number($(this).prev().text());
    number++;
    $(this).prev().text(number);
  });

  $("#sessionDisplay").one("click", function(){
    startSession();
  });
  
});