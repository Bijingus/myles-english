const weapons = {
	projectileSpawnRate 	: 1,
	laser : {
		type 		: 'laser',
		timeToRound : 0,
		loaded 		: true,
		attackSpeed : 10,
		attack 		: 5,
	},
	rocket : {
		timeToRound  	: 0,
		type 			: 'rocket',
		loaded 			: true,
		attackSpeed 	: 50,
		attack			: 30,
	}
}

let args = {
	ctx 		: ctx,
	minRandX 	: -1 * data.scale,
	maxRandX 	: 5 * data.scale,
	minRandY 	: 2 * data.scale,
	maxRandY 	: -5 * data.scale,
	x 			: 0,
	y 			: 0,
	w 			: 12 * data.scale,
	h 			: 12 * data.scale,
	spawnRate 	: 2,
	decayRate 	: 0.3,
	lifespan 	: 64,
	timer 		: false,
	gravity 	: 0.1,
	img   		: smokeImg,
}

const playerSmoke = new Particles( args );

const player = {
	startingLives 			: 2,
	lives 					: 2,
	hp 						: 100,
	points 					: 0,
	invincible 				: false,
	state 					: 'idle',
	projectiles 			: [],
	weapon 					: weapons.laser,
	w 						: 55 * data.scale,
	h 						: 110 * data.scale,
	y 						: window.innerHeight / 2,
	x 						: 60,
	maxSpeed 				: 9 * data.scale,
	acceleration			: 0.75,
	velocityX				: 0,
	velocityY 				: 0,
	img 					: new Image(),
	spriteCount 			: 0,
	respawnTimer 			: 120,
	respawnLength 			: 120,
	reset : function() {
		player.lives = player.startingLives;
		player.respawnTimer = player.respawnLength;
		player.hp = 100;
		player.state = 'idle';
		player.invincible = false;
		player.spriteCount = 0;
	},
	move : function() {
		if( deviceType === 'mobile' ) {
			player.moveMobile();
		} else {
			player.moveDesktop();
		}
	},
	moveDesktop	: function() {

		let tx = mouse.x - player.x - player.w / 2 - 10;
		let ty = mouse.y - player.y - player.h / 2;
		let dist = Math.sqrt(tx * tx + ty * ty);

		if ( dist >= player.maxSpeed ) {

		    player.velocityX = Math.floor( (tx / dist) * player.maxSpeed );

		    if( player.y > window.innerHeight - 256 * data.scale && mouse.y > window.innerHeight - 256 * data.scale ) {
		    	player.y = window.innerHeight - 256 * data.scale;
		    } else if( player.y > window.innerHeight - 256 * data.scale && mouse.y <= window.innerHeight - 256 * data.scale ) {
		    	player.velocityY -= player.maxSpeed;
		    } else {
		    	player.velocityY = Math.floor( (ty / dist) * player.maxSpeed );
		    }
		   
		    player.x += player.velocityX;
		    player.y += player.velocityY;
		}

	},
	moveMobile : function() {
		player.velocityX = player.maxSpeed * joy.x;
		player.velocityY = player.maxSpeed * joy.y;

		if( player.x >= 0 && player.x + player.w <= window.innerWidth ){
			player.x += player.velocityX;
		}

		if( player.y >= 0 && player.y + player.h <= window.innerHeight ) {
			player.y -= player.velocityY;
		}

		if( player.x < 0 ) {
			player.x = 0;
		}

		if( player.x + player.w > window.innerWidth ) {
			player.x = window.innerWidth - player.w;
		}

		if( player.y < 0 ) {
			player.y = 0;
		}

		if( player.y + player.h > window.innerHeight - data.groundH ) {
			player.y = window.innerHeight - player.h - data.groundH;
		}
		
	},
	draw : function() {

		player.logic();

		if( player.state !== 'dead' ) {
			playerSmoke.draw();
			playerSmoke.brain( player.x + 35 * data.scale, player.y + ( player.h / 2 ) );
		}

		if( 
			player.state === 'dead' && data.frame % 6 === 0 && player.respawnTimer < 60 
			|| player.state === 'idle' && player.weapon.type === 'laser' 
		) {

			let spriteSheetCount = 4;
			let fps = 6;
			let spriteW = 110;
			let spriteH = 220;

			ctx.drawImage( laserIdle, spriteW * player.spriteCount, 0, spriteW, spriteH, player.x, player.y, spriteW * data.scale, spriteH * data.scale );

			if( player.spriteCount === spriteSheetCount - 1 ) {
				player.spriteCount = 0;
			} else if( data.frame % fps === 0 ){
				player.spriteCount++;
			}
		}

		if( player.state === 'idle' && player.weapon.type === 'rocket' ) {
			let spriteSheetCount = 4;
			let fps = 6;
			let spriteW = 110;
			let spriteH = 220;

			ctx.drawImage( rocketIdle, spriteW * player.spriteCount, 0, spriteW, spriteH, player.x, player.y, spriteW * data.scale, spriteH * data.scale );

			if( player.spriteCount === spriteSheetCount - 1 ) {
				player.spriteCount = 0;
			} else if( data.frame % fps === 0 ) {
				player.spriteCount++;
			}
			
		}

		if( player.state === 'attack' && player.weapon.type === 'rocket' ) {
			let spriteSheetCount = 9;
			let fps = 6;
			let spriteW = 110;
			let spriteH = 220;

			ctx.drawImage( rocketAttack, spriteW * player.spriteCount, 0, spriteW, spriteH, player.x, player.y, spriteW * data.scale, spriteH * data.scale );

			if( player.spriteCount === spriteSheetCount - 1 ) {
				player.spriteCount = 0;

				if( mouse.down === false && deviceType === 'desktop' ){
					player.state = 'idle';
				}
					
			} else if( data.frame % fps === 0 ){
				player.spriteCount++;
			}
		}

		if( player.state === 'attack' && player.weapon.type === 'laser' ) {
			let spriteSheetCount = 4;
			let fps = 2;
			let spriteW = 110;
			let spriteH = 220;

			ctx.drawImage( laserAttack, spriteW * player.spriteCount, 0, spriteW, spriteH, player.x, player.y, spriteW * data.scale, spriteH * data.scale );

			if( player.spriteCount === spriteSheetCount - 1 ) {
				player.spriteCount = 0;

				if( mouse.down === false && deviceType === 'desktop' ){
					player.state = 'idle';
				}
				
			} else if( data.frame % fps === 0 ) {
				player.spriteCount++;
			}
		}

	},
	logic : function() {

		if( player.state === 'attack' ) {

			if( player.weapon.type === 'laser' ) {
				if( data.frame % player.weapon.attackSpeed === 0 ) {
					for( let i = 0; i < weapons.projectileSpawnRate; i++ ) {

						let projectile = new laserProjectile;

						if( weapons.projectileSpawnRate === 2 ) {
							if( i === 1 ) {
								projectile.y -= 30 * data.scale;
							} else {
								projectile.y += 30 * data.scale;
							}
						}

						player.projectiles.push( projectile );

					}
				}
			}

			if( player.weapon.type === 'rocket' ) {
				if( player.weapon.timeToRound === 0 ) {

					for( let i = 0; i < weapons.projectileSpawnRate; i++ ) {

						let projectile = new rocketProjectile;

						if( weapons.projectileSpawnRate === 2 ) {
							if( i === 1 ) {
								projectile.y -= 30 * data.scale;
							} else {
								projectile.y += 30 * data.scale;
							}
						}

						player.projectiles.push( projectile );

					}

				}
			}

			if( player.weapon.timeToRound === 0 ) {
				player.weapon.timeToRound = player.weapon.attackSpeed;
			}
	
		}

		if(player.weapon.timeToRound > 0){
			player.weapon.timeToRound -= 1;
		}

		if( player.hp <= 0 ) {
			player.state = 'dead';
		}

		if( player.respawnTimer === player.respawnLength && player.state === 'dead' ) {

			let args = {
				ctx 			: ctx,
				minRandX 		: 0,
				maxRandX 		: 0,
				minRandY 		: 0,
				maxRandY 		: 0,
				velocityX 		: 0,
				velocityY 		: 0,
				randomVelocity 	: 15,
				x 				: player.x,
				y 				: player.y + player.h / 2,
				w 				: 64 * data.scale,
				h 				: 64 * data.scale,
				spawnRate 		: 50,
				decayRate 		: 2,
				lifespan 		: 120,
				timer 			: 2,
				gravity 		: 0,
			}

			effects.push( new Particles( args ) );

			player.sound('fail');

		}

		if( player.state === 'dead' ) {

			player.respawnTimer -= 1;
			player.y = window.innerHeight / 2 - player.h / 2;
			player.x = 120 * data.scale;
			player.invincible = true;

			// Game over.
			if( player.lives === 0 && player.respawnTimer === 60 ) {

				resetHero();
				
				$('.ui').animate({
					opacity: 0,
				});

				world.reset();
				player.reset();
				
				var myModal = new bootstrap.Modal(document.getElementById('hs-modal'), {
				  keyboard: false,
				})

				myModal.show();

				$('.speech-bubble-wrapper').hide();
				level1Music.stop();

			}

			// Deduct points on die.
			if( player.respawnTimer === 0 && player.points > 0 ) {
				player.points -= 50;
				if( player.points < 0 ) {
					player.points = 0;
				}
			}

			// Respawn.
			if( player.respawnTimer === 0 && player.lives > 0 ) {
				player.hp = 100;
				player.lives -= 1;
				player.weapon = weapons.laser;
				player.respawnTimer = player.respawnLength;
				weapons.projectileSpawnRate = 1;

				player.sound('respawn');
				player.invincible = false;
				player.state = 'idle';
			}

		}

	},
	speak : function( content, sound = true ) {

		if( sound === true ){
			const sound = new Howl({
		  		src: ['sounds/effects/speech-bubble.wav'],
		  		volume: 0.5,
			});

			sound.play();
		}

		const bubble = document.querySelector('.speech-bubble-wrapper');
		const bubbleText = document.querySelector('.speech-bubble');
		
		bubble.style.display = 'block';
		bubble.style.top = player.y + 'px';
		bubble.style.left = player.x + player.w + 60 + 'px';

		bubbleText.innerHTML = content;
	},
	sound : function(type = 'oof') {
		if( type === 'oof' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/player-oof.wav']
			});

			sound.play();
		}

		if( type === 'fail' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/player-fail.wav']
			});

			sound.play();
		}

		if( type === 'respawn' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/player-respawn.wav']
			});

			sound.play();
		}
	}
}