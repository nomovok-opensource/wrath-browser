
$(document).ready(function() {
  $('.controls a').toggle( function() {
    $(this).text('hide');
    $(this).parents('.container').children('.text-box').animate({height: 200}, function() {
      $(this).find('p').fadeIn('slow');
    });
  },
  function () {
    $(this).text('show');
    $(this).parents('.container').children('.text-box').find('p').fadeOut('slow', function() {
      $(this).parents('.text-box').animate({height: 0});
    });
  });
});
