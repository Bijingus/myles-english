const deviceType = getDeviceType();
let scale = 1;

if( window.innerWidth < 1366 ) {
	scale = 0.75;
}

if( window.innerWidth < 980 ) {
	scale = 0.5;
}

const data = {
	id 				: 0, // used for incrementing IDs which are assigned to enemies and objects
	frame 			: 0,
	currentEvent 	: 0,
	eventTimer 		: 0,
	continueEvents 	: true,
	gamePause 		: false,
	gameComplete 	: false,
	waterPause 		: true,
	scale 			: scale,
}

data.groundH =  128 * data.scale;

var projectiles = [];
var enemies = [];
var effects = [];
var powerups = [];