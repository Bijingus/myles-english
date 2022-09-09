class Ship {
	constructor(x = null, y = null) {

		data.id += 1;

		this.id = data.id;
		this.state = 'idle';
		this.attack = 15;
		this.health = 34 * data.scale;
		this.hp = 34 * data.scale;
		this.points = 20;
		this.vx = -6 * data.scale;
		this.vy = 3 * data.scale;
		this.attackVelocity = 7;
		this.attackSpeed = 120;
		this.w = 67 * data.scale;
		this.h = 60 * data.scale;
		this.x = x === null ? window.innerWidth : x;
		this.y = y === null ? randomIntFromInterval( 0, window.innerHeight ) : y;
		this.spriteCount = 0;
		this.timerLength = 60;
		this.timer = 60;
		this.rand = randomIntFromInterval( 0, 10 ); // 0 to 10

		if( this.rand < 5 ) {
			this.direction = 'down';
		}

		if( this.rand >= 5 ) {
			this.direction = 'up';
		}

	}

	die() {
		player.points += this.points;

		this.remove();

		let images = [lightDebrisImg, darkDebrisImg];

		let args = {
			ctx 			: ctx,
			minRandX 		: 1,
			maxRandX 		: 1,
			minRandY 		: 1,
			maxRandY 		: 1,
			velocityX 		: 0,
			velocityY 		: 0,
			randomVelocity 	: 15,
			x 				: this.x + this.w / 2,
			y 				: this.y + this.h / 2,
			w 				: 30,
			h 				: 32,
			spawnRate 		: 8,
			decayRate 		: 1,
			lifespan 		: 64,
			timer 			: 1,
			gravity 		: 1,
			img 			: images,
		}

		effects.push( new Particles( args ) );

		this.sound('die');
	}

	remove() {
		const index = enemies.findIndex( item => item.id === this.id );
		enemies.splice(index, 1);
	}

	brain() {

		if( this.hp <= 0 ) {
			this.die();
			return;
		}

		if( this.x < 0 - this.w ) {
			this.remove();
			return;
		}

		if( this.y >= window.innerHeight - 256 ) {
			this.direction = 'up';
		}

		if( this.y <= 128 ) {
			this.direction = 'down';
		}

		if( this.direction === 'down'  ) {
			this.y += this.vy;
		}

		if( this.direction === 'up' ) {
			this.y -= this.vy;
		}

		this.x += this.vx;

		this.state = 'idle';

		if( data.frame % 150 <= 85  ){
			this.state = 'attack';
			if( data.frame % 14 === 0 && data.frame % 150 > 8 ) {
				this.shoot();
				// this.spriteCount = 0;
			}
		}

		if( this.state === 'idle' ) {
			this.spriteCount = 0;
		}

	}

	shoot() {
		let projectile = new photonProjectile();
		projectile.x = this.x - 15;
		projectile.y = this.y + this.h / 2 + 15;
		projectiles.push( projectile );
		projectile.sound();
	}

	draw() {

		let percent = this.hp / this.health * 100;
		let color = "#5edc76ff";

		if( percent >= 66 ) {
			color = "#5edc76ff";
		} else if( percent < 66 && percent > 33 ){
			color = "#f6ef3bff";
		} else {
			color = "#f22122ff";
		}

		ctx.strokeStyle = color;
		ctx.fillStyle = color;

		let containerW = this.w;
		let healthBarW = containerW * ( percent / 100 );
		healthBarW = Math.floor( healthBarW );

		ctx.strokeRect( this.x, this.y - 20, containerW, 4 );
		ctx.fillRect( this.x, this.y - 20, healthBarW, 4 );

		ctx.stroke();

		if( this.state === 'idle' ){
			let spriteSheetCount = 1;
			let fps = 3;
			let spriteW = 93;
			let spriteH = 64;

			ctx.drawImage( shipIdle, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW * data.scale, spriteH * data.scale );

			if( this.spriteCount === spriteSheetCount - 1 ) {
				this.spriteCount = 0;
			} else if( data.frame % fps === 0 ) {
				this.spriteCount++;
			}

		}

		if( this.state === 'attack' ) {
			let spriteSheetCount = 15;
			let fps = 6;
			let spriteW = 93.33;
			let spriteH = 64;

			ctx.drawImage( shipAttack, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW * data.scale, spriteH * data.scale );

			if( this.spriteCount === spriteSheetCount - 1 ) {
				this.spriteCount = 0;
			} else if( data.frame % fps === 0 ){
				this.spriteCount++;
			}
		}

	}

	sound( type = 'attack' ) {
		if( type === 'die' ) {

			var sound = new Howl({
		  		src: ['sounds/effects/ship-die.wav']
			});

			sound.play();

		}					
	}
}