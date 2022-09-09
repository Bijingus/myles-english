const mouse = {
	x 		: null,
	y 		: null,
	down 	: false,
}

const joy = {
	x 		: null,
	y 		: null,
	attack 	: false,
}

if( deviceType === 'mobile' ) {
	// Mobile controls.
	var options = {
		zone: document.querySelector('.joystick'),
	};

	var manager = nipplejs.create(options);

	manager.on( 'move', function( evt, nipple ){
		joy.x = nipple.vector.x;
		joy.y = nipple.vector.y;
	});

	manager.on( 'start', function( evt, nipple ){
		joy.attack = true;
		player.state = 'attack';
	});

	manager.on( 'end', function() {
		joy.x = 0;
		joy.y = 0;
		joy.attack = false;
		player.state = 'idle';
		player.spriteCount = 0;
	});
} else {
	// Desktop controls.
	document.querySelector('.game-wrapper').addEventListener('mousemove', function(e){
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	});

	document.querySelector('.game-wrapper').addEventListener('mousedown', function(e){
		mouse.down = true;
		player.spriteCount = 0;
		player.state = 'attack';
	});

	document.addEventListener('mouseup', function(e){
		mouse.down = false;
	});
}


document.addEventListener('keydown', function(e){

	if(data.gameComplete === true) {
		return;
	}

	if( e.keyCode === 49 || e.keyCode === 50 ) {
		var sound = new Howl({
	  		src: ['sounds/effects/weapon-change.wav']
		});

		sound.play();
	}
	if( e.keyCode === 49 ) {
		player.weapon = weapons.laser;
		player.spriteCount = 0;
		document.querySelector('.ui-weapon-laser').classList.add('ui-button-active');
		document.querySelector('.ui-weapon-rocket').classList.remove('ui-button-active');
	}
	if( e.keyCode === 50 ) {
		player.weapon = weapons.rocket;
		player.spriteCount = 0;
		document.querySelector('.ui-weapon-rocket').classList.add('ui-button-active');
		document.querySelector('.ui-weapon-laser').classList.remove('ui-button-active');
	}
});