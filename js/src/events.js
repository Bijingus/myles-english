const events = [
	{
		type 		: 'delay',
		duration 	: 60,
	},
	{
		type 	: 'speech-bubble',
		content : "Hi there!  I'm on my way to my office.",
		duration 	: 120,
	},
	{
		type 		: 'speech-bubble',
		content 	: "The route I'm taking is dangerous though, so I'll need your help getting there.",
		duration 	: 200,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Maybe you'll get a high score!",
		duration 	: 200,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Oh, I'm Myles by the way.",
		duration 	: 160,
	},
	{
		type 		: 'speech-bubble',
		content 	: "I specialize in making interactive websites, web apps and WordPress sites.",
		duration 	: 200,
	},
	{
		type 		: 'delay',
		duration 	: 60,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Oh no...  I was afraid of this...  Killer bats!!!",
		duration 	: 140,
		complete 	: function() {

			data.continueEvents = false;

			enemies.push( new Bat );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 500 );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 1000 );

			// Calculate milliseconds until last enemy leaves the screen.
			let timer = window.innerWidth / 5 / 60 * 1000 + 1000;
			timer = Math.floor(timer);

			setTimeout(function(){
				data.continueEvents = true;
				data.currentEvent += 1;
			}, timer);

		}
	},
	{
		type 		: 'speech-bubble',
		content 	: "Phew... Making websites can be dangerous!",
		duration 	: 120,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Oh no... More bats!",
		duration 	: 120,
		complete 	: function() {

			data.continueEvents = false;

			enemies.push( new Bat );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 500 );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 1000 );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 1500 );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 2000 );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 2500 );

			// Calculate milliseconds until last enemy leaves the screen.
			let timer = window.innerWidth / 5 / 60 * 1000 + 2500;
			timer = Math.floor(timer);

			setTimeout(function(){
				data.continueEvents = true;
				data.currentEvent += 1;
			}, timer);

		}
	},
	{
		type 		: 'speech-bubble',
		content 	: "Sheesh...",
		duration 	: 90,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Just a couple more minutes until I arrive.",
		duration 	: 120,
	},
	{
		type 	: 'speech-bubble',
		content : "I have a feeling that's not all of the enemies we're going to see though.",
		duration 	: 180,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Oh, look.  There are some businesses I've worked with.",
		duration 	: 180,
		complete 	: function() {
			world.objects.push(
				{
					w : 600 * data.scale,
					h : 341 * data.scale,
					x : window.innerWidth,
					y : window.innerHeight - 341 * data.scale - data.groundH,
					z : 1,
					draw : function() {
						ctx.drawImage( ionOffice, this.x, this.y, this.w, this.h );
					}
				}
			);

			setTimeout(function(){
				world.objects.push(
					{
						w : 600 * data.scale,
						h : 341 * data.scale,
						x : window.innerWidth,
						y : window.innerHeight - 341 * data.scale - data.groundH,
						z : 1,
						draw : function() {
							ctx.drawImage( iconOilOffice, this.x, this.y, this.w, this.h );
						}
					}
				);
			}, 4500 );

			setTimeout(function(){
				world.objects.push(
					{
						w : 600 * data.scale,
						h : 341 * data.scale,
						x : window.innerWidth,
						y : window.innerHeight - 341 * data.scale - data.groundH,
						z : 1,
						draw : function() {
							ctx.drawImage( jstBuilding, this.x, this.y, this.w, this.h );
						}
					}
				);
			}, 9000 );

			setTimeout(function(){
				world.objects.push(
					{
						w : 600 * data.scale,
						h : 341 * data.scale,
						x : window.innerWidth,
						y : window.innerHeight - 341 * data.scale - data.groundH,
						z : 1,
						draw : function() {
							ctx.drawImage( protonOffice, this.x, this.y, this.w, this.h );
						}
					}
				);
			}, 13500 );

		}
	},
	{
		type 		: 'speech-bubble',
		content 	: "What!?!?  Attack drones!!!",
		duration 	: 100,
		complete 	: function() {
			data.continueEvents = false;

			enemies.push( new Ship );

			setTimeout( function (){
				enemies.push( new Ship );
			}, 500 );

			// Calculate milliseconds until last enemy leaves the screen.
			let timer = window.innerWidth / 5 / 60 * 1000 + 500;
			timer = Math.floor(timer);

			setTimeout(function(){
				data.continueEvents = true;
				data.currentEvent += 1;
			}, timer);
		}
	},
	{
		type 		: 'speech-bubble',
		content 	: "Oh no... The bats and attack drones have formed an alliance!",
		duration 	: 180,
		complete 	: function() {
			data.continueEvents = false;

			enemies.push( new Bat );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 500 );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 1000 );

			setTimeout( function (){
				enemies.push( new Bat );
			}, 1500 );
			
			setTimeout( function (){
				enemies.push( new Bat );
			}, 2000 );

			setTimeout( function (){
				enemies.push( new Ship );
			}, 3000 );

			setTimeout( function (){
				enemies.push( new Ship );
			}, 4000 );

			// Calculate milliseconds until last enemy leaves the screen.
			let timer = window.innerWidth / 5 / 60 * 1000 + 500;
			timer = Math.floor(timer);

			setTimeout(function(){
				data.continueEvents = true;
				data.currentEvent += 1;
			}, timer);
		},
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, 0 );
		},
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, window.innerHeight );
		},
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 180,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, 0 );
		},
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, window.innerHeight );
		},
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 180,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, 0 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 * 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 * 3 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 * 4 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 * 5 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 * 6 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 * 7 ); },
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 8 * 8 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 300,
	},	
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, 0 );
		},
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, window.innerHeight );
		},
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 140,
	},	
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, 0 );
		},
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, window.innerHeight );
		},
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 140,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, 0 );
		},
		duration 	: 1,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() {
			 return new Ship( window.innerWidth, window.innerHeight );
		},
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 300,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'spawn-enemy',
		spawn 		: function() { return new Bat( window.innerWidth, window.innerHeight / 2 ); },
		duration 	: 1,
	},
	{
		type 		: 'delay',
		duration 	: 15,
	},
	{
		type 		: 'delay',
		duration 	: 480,
	},
	{
		type 		: 'speech-bubble',
		content 	: "That was crazy!  Part of the job though.",
		duration 	: 180,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Anyway, we're pretty much there.",
		duration 	: 120,
	},
	{
		type 		: 'speech-bubble',
		content 	: "If you're looking for help building your next website or web app, we should talk!",
		duration 	: 320,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Click \"Contact Me\" to send a message.",
		duration 	: 240,
	},
	{
		type 		: 'speech-bubble',
		content 	: "Here we are.  Thanks for your help!",
		duration 	: 360,
		complete 	: function() {
			data.continueEvents = false;

			world.objects.push(
				{
					w : 600 * data.scale,
					h : 341 * data.scale,
					x : window.innerWidth,
					y : window.innerHeight - 341 * data.scale - data.groundH,
					z : 1,
					draw : function() {
						ctx.drawImage( mylesOffice, this.x, this.y, this.w, this.h );
					}
				}
			);

			setTimeout(function(){
				data.gamePause = true;
				data.gameComplete = true;

				level1Music.fade( 0.8, 0, 1000 );

				let sound = new Howl({
			  		src 	: ['sounds/music/level-complete.wav'],
			  		volume 	: 0.7,
				});
				sound.play();

				resetHero();
				
				$('.ui').animate({
					opacity: 0,
				});

				world.reset();
				player.reset();
				data.continueEvents = false;

				var myModal = new bootstrap.Modal(document.getElementById('hs-modal'), {
				  keyboard: false,
				})

				myModal.show();

			}, 2500 );

		},
	},

];



let dType = getDeviceType();

if( dType === 'desktop' ) {
	events.splice(3, 0, 
		{
			type 	: 'speech-bubble',
			content : "Use your mouse to move and left click to attack.",
			duration 	: 240,
		},
	);
}

if( dType === 'mobile' ) {
	events.splice(3, 0, 
		{
			type 	: 'speech-bubble',
			content : "Drag your finger across the screen to play.",
			duration 	: 240,
		},
	);
}