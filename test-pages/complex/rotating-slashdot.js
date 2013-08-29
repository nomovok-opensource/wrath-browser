var rotBase = 0;

function updateRotation() {
  rotBase += 1;
  $('iframe').css('-webkit-transform', 'rotate(' + rotBase + 'deg)');
}

$(document).ready(function() {
  setInterval(updateRotation, 30);
}); 
