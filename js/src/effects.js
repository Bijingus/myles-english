class effect {
	constructor(type = 'splat', x, y) {
		data.id += 1;

		this.id = data.id;
		this.type = type;
		this.x = x;
		this.y = y;
		this.spriteCount = 0;
		this.loop = false;
		this.timer = 120;

		this.sound();
	}

	brain() {
		this.timer -= 1;

		if( this.timer === 0 ){
			this.remove();
		}

	}

	remove() {
		const index = effects.findIndex( item => item.id === this.id );
		effects.splice(index, 1);
	}

	draw() { 
		if( this.type === 'splat' ) {

			let spriteSheetCount = 11;
			let fps = 3;
			let spriteW = 139;
			let spriteH = 120;

			ctx.drawImage( splat, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW * data.scale, spriteH * data.scale );

			if( this.spriteCount === spriteSheetCount - 1 ) {
				this.remove();
			} else if( data.frame % fps === 0 ){
				this.spriteCount++;
			}
			
		}

		if( this.type === 'explosion' ) {

			let spriteSheetCount = 7;
			let fps = 3;
			let spriteW = 130.5;
			let spriteH = 120;

			ctx.drawImage( explosion, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW * data.scale, spriteH * data.scale );

			if( this.spriteCount === spriteSheetCount - 1 ) {
				this.remove();
			} else if( data.frame % fps === 0 ){
				this.spriteCount++;
			}
			
		} 

	}

	sound(type) {

		if( this.type === 'splat' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/splat.wav']
			});

			sound.play();
		}

		if( this.type === 'explosion' ) {
			var sound = new Howl({
		  		src: ['sounds/effects/explosion.wav']
			});

			sound.play();
		}
		
	}
}