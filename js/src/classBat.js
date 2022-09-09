class Bat {
	constructor(x = null, y = null) {
		data.id += 1;

		this.id = data.id;
		this.state = 'idle';
		this.attack = 10;
		this.health = 16 * data.scale;
		this.hp = 16 * data.scale;
		this.points = 10;
		this.velocity = -3.5 * data.scale;
		this.attackVelocity = 10;
		this.attackSpeed = 60;
		this.w = 67 * data.scale;
		this.h = 60 * data.scale;
		this.x = x === null ? window.innerWidth : x;
		this.y = y === null ? randomIntFromInterval( 0, window.innerHeight ) : y;
		this.spriteCount = 0;
		this.timerLength = 60;
		this.timer = 60;
		this.rand = 0; // 0 to 10
	}

	trackPlayer() {
		if( this.y < player.y + ( player.h / 2 ) ) {
			this.y += 2 * data.scale;
			this.x -= 1 * data.scale;
		}

		if( this.y > player.y + ( player.h / 2 ) ) {
			this.y -= 2 * data.scale;
			this.x -= 1 * data.scale;
		}
	}

	die() {
		player.points += this.points;
		effects.push( new effect( 'splat', this.x, this.y ) );
		randomPowerup( this.x, this.y );
		this.remove();
		this.sound('die');
	}

	remove() {
		const index = enemies.findIndex( item => item.id === this.id );
		enemies.splice(index, 1);
	}

	brain() {

		this.x += this.velocity;

		if( this.x < 0 - this.w ) {
			this.remove();
			return;
		}

		if( this.hp <= 0 ) {
			this.die();
			return;
		}

		if( this.timer === this.timerLength ) {
			if( this.y > window.innerHeight - 300 ) {
				this.rand = 5;
			} else if( this.y < 128 ) {
				this.rand = 12;
			} else {
				this.rand = randomIntFromInterval( 0, 10 );
			}
		}

		this.timer -= 1;

		if( this.timer === 0 ) {
			this.timer = this.timerLength;
		}

		if( this.rand <= 2 ) {
			this.y += 2 * data.scale;
		} else if( this.rand >= 3 && this.rand < 6 ) {
			this.y -= 2 * data.scale;
		} else {
			this.trackPlayer();
		}			

		if( data.frame % 47 === 0 ) {
			this.state = 'attack';
			this.shoot();
			this.spriteCount = 0;
		}

		if(data.frame % 47 === 16) {
			this.spriteCount = 0;
			this.state = 'idle';
		}

		if( data.frame % 47 <= 15 ) {
			this.state = 'attack';
		}

	}

	shoot() {
		let projectile = new acidProjectile();
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
			let spriteSheetCount = 5;
			let fps = 3;
			let spriteW = 67;
			let spriteH = 60;

			ctx.drawImage( batIdle, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW * data.scale, spriteH * data.scale );

			if( this.spriteCount === spriteSheetCount - 1 ) {
				this.spriteCount = 0;
			} else if( data.frame % fps === 0 ) {
				this.spriteCount++;
			}
		}

		if( this.state === 'attack' ) {
			let spriteSheetCount = 4;
			let fps = 8;
			let spriteW = 67;
			let spriteH = 60;

			ctx.drawImage( batAttack, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW * data.scale, spriteH * data.scale );

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
		  		src: ['sounds/effects/bat-die.wav']
			});

			sound.play();

		}					
	}
}