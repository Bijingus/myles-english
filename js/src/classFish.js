class Fish {
	constructor( x, y ) {
		data.id += 1;

		let rand = randomIntFromInterval( 1, 3 );

		if( rand === 1 ) {
			this.color = 'purple';
		} else if( rand === 2 ) {
			this.color = 'yellow';
		} else {
			this.color = 'green';
		}

		let args = {
			ctx 		: ctxWater,
			//velocityY	: 2,
			minRandX 	: 0,
			maxRandX 	: 0,
			minRandY 	: 0,
			maxRandY 	: 0,
			velocityY 	: -0.5,
			x 			: x,
			y 			: y,
			w 			: 16,
			h 			: 16,
			spawnRate 	: 0.15,
			spawnChance : 15,
			decayRate 	: 0.03,
			lifespan 	: 640,
			timer 		: false,
			gravity 	: -0.01,
			img   		: bubbleImg,
		}

		this.bubbles = new Particles( args );

		this.id = data.id;
		this.state = 'idle';
		this.attack = 0;
		this.health = 15;
		this.hp = 15;
		this.points = 0;
		this.accelerationX = 0.1;
		this.accelerationY = 0.1;
		this.vx = 0;
		this.vy = 0;
		this.maxVX = randomIntFromInterval( 2, 8 );
		this.maxVY = randomIntFromInterval( 2, 8 );
		this.attackVelocity = 0;
		this.attackSpeed = 0;
		this.w = 64;
		this.h = 42;
		this.x = x;
		this.y = y;
		this.spriteCount = 0;
		this.timerLength = 60;
		this.timer = 60;
		this.rand = 0; // 0 to 10
	}

	trackMouse() {

		if( this.y <= 0 ) {
			this.vy += 1;
		}

		if( this.y >= canvasWater.height ) {
			this.vy -= 1;
		}

		if( this.x <= 0 ) {
			this.vx += 1;
		}

		if( this.x >= canvasWater.width ) {
			this.vx -= 1;
		}

		if( this.x < mouse.x ) {
			if( this.vx < this.maxVX ) {
				this.vx += this.accelerationX;
			}
			this.x += this.vx;
		}

		if( this.x > mouse.x ) {
			if( this.vx > this.maxVX * -1 ) {
				this.vx -= this.accelerationX;
			}
			this.x += this.vx;
		}

		if( this.y < mouse.y ) {
			if( this.vy < this.maxVY ) {
				this.vy += this.accelerationY;
			}
			this.y += this.vy;
		}

		if( this.y > mouse.y ) {
			if( this.vy > this.maxVY * -1 ) {
				this.vy -= this.accelerationY;
			}
			this.y += this.vy;
		}


	}

	brain() {

		this.bubbles.brain( this.x, this.y );

		this.trackMouse();

	}

	draw() {

		if( this.state === 'idle' ){

			let spriteSheetCount = 4;
			let fps = 3;
			let spriteW = this.w;
			let spriteH = this.h;
			let spriteSheet;

			if( this.color === 'purple' ) {
				if( this.vx > 0 ) {
					spriteSheet = fishIdleRightImg;
				} else {
					spriteSheet = fishIdleLeftImg;
				}
			} else if( this.color === 'yellow' ) {
				if( this.vx > 0 ) {
					spriteSheet = fishYellowIdleRightImg;
				} else {
					spriteSheet = fishYellowIdleLeftImg;
				}
			} else if ( this.color === 'green' ){
				if( this.vx > 0 ) {
					spriteSheet = fishGreenIdleRightImg;
				} else {
					spriteSheet = fishGreenIdleLeftImg;
				}
			}

			ctxWater.drawImage( spriteSheet, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW, spriteH );
			this.bubbles.draw();

			if( this.spriteCount === spriteSheetCount - 1 ) {
				this.spriteCount = 0;
			} else if( data.frame % fps === 0 ) {
				this.spriteCount++;
			}
		}

	}

}