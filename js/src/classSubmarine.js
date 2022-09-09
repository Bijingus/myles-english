class Submarine {
	constructor( x, y ) {
		data.id += 1;

		this.id = data.id;
		this.state = 'idle';
		this.attack = 0;
		this.health = 15;
		this.hp = 15;
		this.points = 0;
		this.accelerationX = 0.02;
		this.accelerationY = 0.02;
		this.vx = 0;
		this.vy = 0;
		this.maxVX = 1;
		this.maxVY = 1;
		this.attackVelocity = 0;
		this.attackSpeed = 0;
		this.w = 256;
		this.h = 169;
		this.x = x;
		this.y = y;
		this.spriteCount = 0;
		this.timerLength = 60;
		this.timer = 60;
		this.rand = 0; // 0 to 10

		let args = {
			ctx 		: ctxWater,
			//velocityY	: 2,
			minRandX 	: -2,
			maxRandX 	: 2,
			minRandY 	: -2,
			maxRandY 	: 2,
			velocityY 	: -0.5,
			velocityX 	: 3,
			x 			: x,
			y 			: y,
			w 			: 16,
			h 			: 16,
			spawnRate 	: 1,
			decayRate 	: 0.1,
			lifespan 	: 240,
			timer 		: false,
			gravity 	: -0.01,
			img   		: bubbleImg,
		}

		this.bubbles = new Particles( args );
	}

	trackMouse() {

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

		this.bubbles.brain( this.x + this.w, this.y + 110 );

		this.trackMouse();

	}

	draw() {

		if( this.state === 'idle' ){
			let spriteSheetCount = 6;
			let fps = 2;
			let spriteW = this.w;
			let spriteH = this.h;

			ctxWater.drawImage( submarineImg, spriteW * this.spriteCount, 0, spriteW, spriteH, this.x, this.y, spriteW, spriteH );
			this.bubbles.draw();

			if( this.spriteCount === spriteSheetCount - 1 ) {
				this.spriteCount = 0;
			} else if( data.frame % fps === 0 ) {
				this.spriteCount++;
			}
		}

	}

}