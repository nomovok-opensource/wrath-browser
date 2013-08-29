var rotBase = 0;

function updateRotation() {
  rotBase += 1;
  $('#root').css('-webkit-transform', 'rotate(' + rotBase + 'deg)');
  $('#sub').css('-webkit-transform', 'rotate(' + rotBase + 'deg)');
  $('#subsub').css('-webkit-transform', 'rotate(' + rotBase + 'deg)');
  $('#subsubsub').css('-webkit-transform', 'rotate(' + rotBase + 'deg)');
}

$(document).ready(function() {
  $('body').css('background-color', 'yellow');
  setInterval(updateRotation, 30);
}); 
