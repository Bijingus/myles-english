class Particles {

	constructor(args) {		
		data.id += 1;

		this.id = data.id;
		this.type = 'particles';
		this.ctx = args.ctx;
		this.particles = [];
		this.x = args.hasOwnProperty('x') ? args.x : 0;
		this.y = args.hasOwnProperty('y') ? args.y : 0;
		this.w = args.hasOwnProperty('w') ? args.w : 32;
		this.h = args.hasOwnProperty('h') ? args.h : 32;
		this.gravity = args.hasOwnProperty('gravity') ? args.gravity : 0;
		this.drag = args.hasOwnProperty('drag') ? args.drag : 0;
		this.minRandX = args.hasOwnProperty('minRandX') ? args.minRandX : 0;
		this.maxRandX = args.hasOwnProperty('maxRandX') ? args.maxRandX : 0;
		this.minRandY = args.hasOwnProperty('minRandY') ? args.minRandY : 0;
		this.maxRandY = args.hasOwnProperty('maxRandY') ? args.maxRandY : 0;
		this.velocityX = args.hasOwnProperty('velocityX') ? args.velocityX : 0;
		this.velocityY = args.hasOwnProperty('velocityY') ? args.velocityY : 0;
		this.randomVelocity = args.hasOwnProperty('randomVelocity') ? args.randomVelocity : 0;
		this.spawnRate = args.hasOwnProperty('spawnRate') ? args.spawnRate : 1;
		this.spawnChance = args.hasOwnProperty('spawnChance') ? args.spawnChance : 100; // percent chance of particle spawning
		this.decayRate = args.hasOwnProperty('decayRate') ? args.decayRate : 0.4;
		this.lifespan = args.hasOwnProperty('lifespan') ? args.lifespan : 120;
		this.timer = args.hasOwnProperty('timer') ? args.timer : false;  // set to int to set max time until particles stop spawning
		this.img = args.hasOwnProperty('img') ? args.img : sparkImg;
	}

	brain( x = null, y = null ) {

		if( x !== null ) {
			this.x = x;
		}
		
		if( y !== null ) {
			this.y = y;
		}

		// Spawn new particles
		if( this.timer > 0 || this.timer === false ) {

			let chance = randomIntFromInterval( 1, Math.floor( 100 / this.spawnChance ) );

			if( chance === 1 ) {
				if( this.spawnRate < 1 ) {
					if( data.frame * this.spawnRate % 1 === 0 ) {
						this.particles.push( this.spawn() );
					}
				} else {
					for( let i = 0; i < this.spawnRate; i++ ) {
						this.particles.push( this.spawn() );
					}			
				}
			}
			
		}

		// Remove particles if lifespan complete.
		let remove = [];

		for( let i = 0; i < this.particles.length; i++ ) {

			this.particles[i].timer -= 1;

			this.particles[i].x += this.velocityX;
			this.particles[i].y += this.velocityY;

			this.particles[i].velocityY += this.gravity;

			this.particles[i].x += this.particles[i].velocityX;
			this.particles[i].y += this.particles[i].velocityY;

			this.particles[i].x -= randomIntFromInterval( this.minRandX, this.maxRandX );
			this.particles[i].y -= randomIntFromInterval( this.minRandY, this.maxRandY );
			this.particles[i].w = this.particles[i].w <= 0 ? 0 : this.particles[i].w -= this.decayRate;
			this.particles[i].h = this.particles[i].h <= 0 ? 0 : this.particles[i].h -= this.decayRate;

			if( this.particles[i].timer <= 0 ) {
				remove.push(i);
			}			

		}

		for( let i = 0; i < remove.length; i++ ) {
			this.particles.splice( remove[i], 1 );
		}

		if( this.timer <= 0 && this.particles.length <= 0 ) {
			this.remove();
			return;
		}

		if( this.timer !== false ) {
			this.timer -= 1;
		}

	}

	spawn() {
		return {
			x 			: this.x -= randomIntFromInterval( this.minRandX, this.maxRandX ),
			y 			: this.y -= randomIntFromInterval( this.minRandY, this.maxRandY ),
			w 			: this.w,
			h 			: this.h,
			velocityX 	: randomIntFromInterval( this.randomVelocity * -1, this.randomVelocity ),
			velocityY 	: randomIntFromInterval( this.randomVelocity * -1, this.randomVelocity ),
			timer 		: this.lifespan,
		}
	}

	remove() {
		const index = effects.findIndex( item => item.id === this.id );
		effects.splice(index, 1);
	}

	draw() {
		for( let i = 0; i < this.particles.length; i++ ) {

			if( Array.isArray( this.img ) ) {
				for( let g = 0; g < this.img.length; g++ ) {
					if( i % (g + 2) === 0 ){
						this.ctx.drawImage( this.img[g], this.particles[i].x, this.particles[i].y, this.particles[i].w, this.particles[i].h );
					}
				}
			} else {
				this.ctx.drawImage( this.img, this.particles[i].x, this.particles[i].y, this.particles[i].w, this.particles[i].h );
			}			

		}
	}

}