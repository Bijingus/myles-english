class hp {
	constructor( x, y ) {
		data.id += 1;

		this.id = data.id;
		this.w = 32 * data.scale;
		this.h = 32 * data.scale;
		this.x = x;
		this.y = y;
		this.animate = 'grow';

		this.sound('drop');
	}

	brain() {
		if( isCollide( this, player ) && player.invincible === false ) {
			player.hp += 20;
			this.remove();
			this.sound();
		}
	}

	remove() {
		const index = powerups.findIndex( item => item.id === this.id );
		powerups.splice(index, 1);
	}

	draw() {

		if( this.w === 32 * data.scale ) {
			this.animate = 'grow';
		}

		if( this.w === 48 * data.scale ) {
			this.animate = 'shrink';
		}

		if( this.animate === 'grow' ) {
			this.w += 1;
			this.h += 1;
			this.y -= 0.5;
			this.x -= 0.5;
		} 

		if(this.animate === 'shrink' ) {
			this.w -= 1;
			this.h -= 1;
			this.y += 0.5;
			this.x += 0.5;
		}

		ctx.drawImage( healthImg, this.x, this.y, this.w, this.h );
		this.x -= 5 * data.scale;
	}

	sound( type = 'collect' ) {
		if( type === 'collect' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/powerup-collect.wav']
			});

			sound.play();
		}

		if( type === 'drop' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/powerup-drop.wav']
			});

			sound.play();
		}
	}
}

class attackCount {
	constructor( x, y ) {
		data.id += 1;

		this.id = data.id;
		this.w = 32 * data.scale;
		this.h = 32 * data.scale;
		this.x = x;
		this.y = y;
		this.animate = 'grow';

		this.sound('drop');
	}

	brain() {
		if( isCollide( this, player ) && player.invincible === false ) {

			if( weapons.projectileSpawnRate < 2 ) {
				weapons.projectileSpawnRate += 1;
			}

			this.remove();
			this.sound();
		}
	}

	sound( type = 'collect' ) {
		if( type === 'collect' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/powerup-collect.wav']
			});

			sound.play();
		}
	}

	remove() {

		const index = powerups.findIndex( item => item.id === this.id );
		powerups.splice(index, 1);
	}

	draw() {

		if( this.w === 32 ) {
			this.animate = 'grow';
		}

		if( this.w === 48 ) {
			this.animate = 'shrink';
		}

		if( this.animate === 'grow' ) {
			this.w += 1;
			this.h += 1;
			this.y -= 0.5;
			this.x -= 0.5;
		}

		if( this.animate === 'shrink' ) {
			this.w -= 1;
			this.h -= 1;
			this.y += 0.5;
			this.x += 0.5;
		}

		ctx.drawImage( attackPowerupImg, this.x, this.y, this.w, this.h );

		this.x -= 5 * data.scale;
	}
}