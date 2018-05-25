define (function (require) {
  var CountDownTimer = require('./module');

  var timer = new CountDownTimer,
      timeObj = timer.parse(2);

  console.log(timeObj);
});