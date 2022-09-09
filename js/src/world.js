const world = {
	gravity 	: 1,
	groundH 	: 128 * data.scale,
	objects 	: [],
	events 		: [],
	ground 		: {
		spawnRate 	: 25,
	},
	hills 		: {
		spawnRate 	: 560,
	},
	trees 		: {
		spawnRate 	: 320,
	},
	clouds 		: {
		spawnRate 	: 240,
	},
	plants 		: {
		spawnRate 	: 48,
	},
	rocks 		: {
		spawnRate 	: 64,
	},
	reset : function() {
		data.continueEvents = false;
		data.currentEvent = 0;
		data.eventTimer = 0;
		data.gamePause = false;
		data.gameComplete = true;
		var projectiles = [];
		var enemies = [];
		var effects = [];
		var powerups = [];
	},
	update: function() {

		world.objects.sort(function(a,b) {
			if( a.z > b.z ) {
				return -1;
			}

			if( a.z > b.z ) {
				return 1;
			}

			return 0;
		});

		for( let i = 0; i < world.objects.length; i++ ) {

			if( world.objects[i].z === 1 ){
				world.objects[i].x -= 5 * data.scale;
			}

			if( world.objects[i].z === 2 ){
				world.objects[i].x -= 4 * data.scale;
			}

			if( world.objects[i].z === 3 ){
				world.objects[i].x -= 3 * data.scale;
			}

			if( world.objects[i].z === 4 ){
				world.objects[i].x -= 2 * data.scale;
			}

			if( world.objects[i].z === 5 ){
				world.objects[i].x -= 1 * data.scale;
			}
		}

		world.spawn();
		world.clean();

	},
	spawn 	: function() {
		if( data.frame % world.clouds.spawnRate === 0 ) {
			let newCloud = new cloud();
			newCloud.spawn();
		}

		if( data.frame % world.hills.spawnRate === 0 ) {
			let newHill = new hill();
			newHill.spawn();
		}

		if( data.frame % world.ground.spawnRate === 0 ) {
			let newGround = new ground();
			newGround.spawn();
		}

		if( data.frame % world.rocks.spawnRate === 0 ) {

			let rand = randomIntFromInterval(1, 4);

			if( rand === 1 ){
				let newRock = new rock();
				newRock.spawn();
			}

		}

		if( data.frame % world.trees.spawnRate === 0 ) {
			let newTree = new tree();
			newTree.spawn();
		}

		if( data.frame % world.plants.spawnRate === 0 ) {

			let rand = randomIntFromInterval(1, 2);

			if( rand === 1 ){
				let newPlant = new plant();
				newPlant.spawn();
			}
			
		}
	},
	clean: function() {
		let toSplice = [];

		for( let i = 0; i < world.objects.length; i++ ) {
			if( world.objects[i].x + world.objects[i].w < 0 ) {
				toSplice.push(i);
			}
		}

		for( let i = 0; i < toSplice.length; i++ ) {
			world.objects.splice(toSplice[i], 1);
		}
	},
	draw: function() {
		for( let i = 0; i < world.objects.length; i++ ) {
			world.objects[i].draw();
		}
		
		if( world.events.length < 1 ) {
			return;
		}

		if( data.continueEvents === false || data.gameComplete === true ) {
			const bubble = document.querySelector('.speech-bubble-wrapper');
			bubble.style.display = 'none';
			return;
		}

		let i = data.currentEvent;

		if( data.eventTimer < world.events[i].duration ) {
			data.eventTimer += 1;
		}

		if( world.events[i].type === 'speech-bubble' ) {

			let sound = data.eventTimer === 1 ? true : false;
			
			player.speak( world.events[i].content, sound );

			if( data.eventTimer === world.events[i].duration ) {
				if(typeof world.events[i].complete !== 'undefined') {
					world.events[i].complete();
				}
			}
		} else {
			const bubble = document.querySelector('.speech-bubble-wrapper');
			bubble.style.display = 'none';
		}

		if( world.events[i].type === 'spawn-enemy' ) {
			enemies.push( world.events[i].spawn() );
		}

		if( world.events[i].type === 'spawn-object' ) {
			world.objects.push( world.events[i].object );
		}

		if( data.eventTimer === world.events[i].duration ) {

			data.eventTimer = 0;

			if( data.currentEvent < world.events.length ) {
				data.currentEvent += 1;
			}
			
		}
		
	},
}

// Push some objects to the world so there are objects on page load

let groundW = 126 * data.scale;
let groundH = 128 * data.scale;
let count = window.innerWidth / groundW + 1;
count = Math.ceil(count);
let x = 0;

for( let i = 0; i < count; i++ ) {
	world.objects.push( new ground( x, window.innerHeight - groundH ) );
	x += groundW;
}