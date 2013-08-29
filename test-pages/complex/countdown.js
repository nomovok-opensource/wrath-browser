var counter = 5;

var restartAnimation = function() {
    counter = 5;
    $('#loader').hide();
    $('#content').show();
    startAnimation();
}

var startAnimation = function() {
  $('.counter').text(counter);
  if (counter > 0)
  {
    counter = counter - 1;
    $('.counter').css('font-size', '40');
    $('.counter').animate({fontSize: 1}, 1000, startAnimation);
  }
  else
  {
    $('#content').hide();
    $('#loader').show();
    setTimeout(restartAnimation, 2000);
  }
};

$(document).ready(function() {
  startAnimation();
});

