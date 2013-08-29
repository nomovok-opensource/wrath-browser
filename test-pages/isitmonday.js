var spin = null;
var first = true;
var curspin = 360;

function trans(e) {
    if (first) {
	spin.style.webkitTransform = "rotate(" + curspin + "deg) scale(3)";
	spin.style['-o-transform'] = "rotate(" + curspin + "deg) scale(3)";
    } else {
	spin.style.webkitTransform = "rotate(" + curspin + "deg) scale(1)";
	spin.style['-o-transform'] = "rotate(" + curspin + "deg) scale(1)";
    }

    curspin += 360;
    first = !first;
}    

window.onload = function() {
    spin = document.getElementById('mondayspin');
    spin.addEventListener('webkitTransitionEnd', trans);
    spin.addEventListener('oTransitionEnd', trans);
    trans(null);
}
