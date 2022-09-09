class acidProjectile {
	constructor() {
		data.id += 1;

		this.id = data.id;
		this.type = 'acid';
		this.velocityX = 7;
		this.velocityY = 0;
		this.acceleration = -0.2;
		this.maxSpeed = -12 * data.scale;
		this.attack = 10;
		this.gravity = 0.02;
		this.x = 0;
		this.y = 0;
		this.w = 36 * data.scale;
		this.h = 16 * data.scale;
	}

	brain() {

		if( this.x - this.w < 0 ) {
			this.remove();
			return;
		}

		if( this.velocityX > this.maxSpeed ) {
			this.velocityX -= this.acceleration;
		}

		this.velocityY += this.gravity;
		this.x -= this.velocityX;
		this.y += this.velocityY;

		this.collisions();

	}

	collisions() {
		if( isCollide( player, this ) && player.invincible !== true ){
			player.hp -= this.attack;
			this.remove();
			player.sound('oof');
		}
	}

	remove() {
		const index = projectiles.findIndex( item => item.id === this.id );
		projectiles.splice(index, 1);
	}

	draw() {
		ctx.drawImage( acidProjectileImg, this.x, this.y, this.w, this.h );
	}

	sound() {
		var sound = new Howl({
		  src: ['sounds/effects/bat-attack.wav'],
		  volume: 0.3,
		});

		sound.play();
	}
}

class photonProjectile {
	constructor() {
		data.id += 1;

		this.id = data.id;
		this.type = 'photon';
		this.velocityX = 7;
		this.velocityY = 0;
		this.acceleration = -0.1;
		this.maxSpeed = -9 * data.scale;
		this.attack = 15;
		this.x = 0;
		this.y = 0;
		this.w = 32 * data.scale;
		this.h = 32 * data.scale;
	}

	brain() {

		if( this.x - this.w < 0 ) {
			this.remove();
			return;
		}

		if( this.velocityX > this.maxSpeed ) {
			this.velocityX -= this.acceleration;
		}

		this.x -= this.velocityX;
		this.y += this.velocityY;

		this.collisions();

	}

	collisions() {
		if( isCollide( player, this ) && player.invincible !== true ){
			player.hp -= this.attack;
			this.remove();
			player.sound('oof');
		}
	}

	remove() {
		const index = projectiles.findIndex( item => item.id === this.id );
		projectiles.splice(index, 1);
	}

	draw() {
		ctx.drawImage( photonProjectileImg, this.x, this.y, this.w, this.h );
	}

	sound() {
		var sound = new Howl({
		  src: ['sounds/effects/photon.wav'],
		  volume: 0.3,
		});

		sound.play();
	}
}

class laserProjectile {
	constructor() {
		data.id += 1;

		this.id = data.id;
		this.type = 'laser';
		this.drag = 0;
		this.velocityX = 25 * data.scale;
		this.acceleration = 5;
		this.maxSpeed = 150;
		this.attack = weapons.projectileSpawnRate === 1 ? weapons.laser.attack : weapons.laser.attack * 0.65;
		this.x = player.x + player.w;
		this.y = player.y + player.h / 2 - 7;
		this.w = 184 * data.scale;
		this.h = 32 * data.scale;

		this.sound();

	}

	brain() {
		if( this.x + this.w > window.innerWidth ) {
			this.remove();
			return;
		}

		if( this.velocityX < this.maxSpeed ){
			this.velocityX += this.acceleration;
		}

		this.x += this.velocityX;

		this.collisions();
	}

	collisions() {
		for( let i = 0; i < enemies.length; i++ ) {
			if( isCollide( this, enemies[i] ) ) {

				enemies[i].hp -= this.attack;

				let args = {
					ctx 			: ctx,
					minRandX 		: 0,
					maxRandX 		: 0,
					minRandY 		: 0,
					maxRandY 		: 0,
					velocityX 		: 0,
					velocityY 		: 0,
					randomVelocity 	: 15,
					x 				: this.x + this.w,
					y 				: this.y + this.h / 2,
					w 				: 16,
					h 				: 16,
					spawnRate 		: 15,
					decayRate 		: 1,
					lifespan 		: 16,
					timer 			: 1,
					gravity 		: 2,
				}

				effects.push( new Particles( args ) );

				this.remove();

				break;

			}
		}						
	}

	remove() {
		const index = player.projectiles.findIndex( item => item.id === this.id );
		player.projectiles.splice(index, 1);
	}

	draw() {
		ctx.drawImage( laserProjectileImg, this.x, this.y, this.w, this.h );
	}

	sound() {
		var sound = new Howl({
		  src: ['sounds/effects/laser.wav'],
		  volume: 0.85,
		});

		sound.play();
	}
}

class rocketProjectile {
	constructor() {

		data.id += 1;

		let args = {
			ctx 		: ctx,
			minRandX 	: 2.5,
			maxRandX 	: -2.5,
			minRandY 	: -2.5,
			maxRandY 	: 2.5,
			w 			: 8 * data.scale,
			h 			: 8 * data.scale,
			spawnRate 	: 3,
			decayRate 	: 0.15,
			lifespan 	: 80,
			gravity 	: 0.05,
			img   		: smokeDarkImg,
		}

		this.id = data.id;
		this.particles = new Particles( args );
		this.type = 'rocket';
		this.velocityX = 3;
		this.velocityY = 0;
		this.acceleration = 0.2;
		this.maxSpeed = 20 * data.scale;
		this.drag = 10;
		this.gravity = 0.02;
		this.attackSpeed = weapons.rocket.attackSpeed;
		this.attack = weapons.rocket.attack;
		this.x = player.x + player.w;
		this.y = player.y + player.h / 2;
		this.w = 24 * data.scale;
		this.h = 12 * data.scale;

		this.sound();
	}

	brain() {
		if( this.x + this.w > window.innerWidth + 1200 ) {
			this.remove();
			return;
		}

		if( this.velocityX < this.maxSpeed ){
			this.velocityX += this.acceleration;
		}

		this.velocityY += this.gravity;
		this.x += this.velocityX;
		this.y += this.velocityY;

		this.collisions();
	}

	remove() {
		const index = player.projectiles.findIndex( item => item.id === this.id );
		player.projectiles.splice(index, 1);
	}

	collisions() {
		for( let i = 0; i < enemies.length; i++ ) {
			if( isCollide( this, enemies[i] ) ){
				this.remove();
				enemies[i].hp -= this.attack;
				effects.push( new effect( 'explosion', enemies[i].x, enemies[i].y ) );
			}
		}
	}

	draw() {

		this.particles.brain(this.x - 10, this.y + 3);
		this.particles.draw();

		ctx.drawImage( rocketProjectileImg, this.x, this.y, this.w, this.h );
	}

	sound() {
		var sound = new Howl({
		  src: ['sounds/effects/rocket-launch.wav'],
		  volume: 0.7,
		});

		sound.play();
	}

}