var CADE_MINSIZE = 25;
var CADE_MAXSIZE = 40;
var CADE_ROTATE = 15;
var CADE_RATIO = 0.5575;


function caderand(minval, maxval) {
	return (Math.random() * (maxval - minval)) + minval;
}


function addCade() {
	var newCade = document.createElement("img");
	newCade.className = "fixedcade";
	if (Math.random() > 0.5) {
		newCade.src = "/cade/cade1.gif";
	} else {
		newCade.src = "/cade/cade2.gif";
	}
	var size = caderand(CADE_MINSIZE, CADE_MAXSIZE);
	newCade.style.height = size.toString() + '%';
	newCade.style.top = caderand(-10, 110 - size).toString() + '%';
	newCade.style.left = caderand(-10, 110 - size * CADE_RATIO).toString() + '%';
	var trans;
	if (Math.random() > 0.5) {
		trans = "scaleX(1)"
	} else {
		trans = "scaleX(-1)"
	}
	trans += " rotate(" + caderand(-CADE_ROTATE, CADE_ROTATE).toString() + "deg)";
	console.debug(trans);
	newCade.style.transform = trans;
	document.body.appendChild(newCade);
}
