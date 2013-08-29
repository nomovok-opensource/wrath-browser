
var t = 0;
var amp = 50;
var min = 10;
var speed = 0.04;

var startAnimation = function() {
    t = t + speed;
    var div = $('#content');
    var s = min + amp + (amp*Math.sin(t));
    var c = min + amp + (amp*Math.cos(t));
    var ns = min + amp - (amp*Math.sin(t));
    var nc = min + amp - (amp*Math.cos(t));
    div.css('border-top-left-radius', (s) + 'px');
    div.css('border-top-right-radius', (c) + 'px');
    div.css('border-bottom-right-radius', (ns) + 'px');
    div.css('border-bottom-left-radius', (nc) + 'px');

    setTimeout(startAnimation, 20);
};

$(document).ready(function() {
  startAnimation();
});

