class cloud {
	constructor() {
		this.type = 'cloud';
		this.w = 200 * data.scale;
		this.h = 120 * data.scale;
		this.x = window.innerWidth + this.w;
		this.y = randomIntFromInterval(20, 600);
		this.z = 4;
	}

	spawn(){
		world.objects.push( new cloud() );
	}

	draw() {
		ctx.drawImage( cloudImg, this.x, this.y, this.w, this.h );
	}
}

class hill {

	constructor( x = null, y = null ) {
		this.type = 'hill';
		this.w = 347 * data.scale;
		this.h = 641 * data.scale;
		this.x = x !== null ? x : window.innerWidth;
		this.y =  y !== null ? y : window.innerHeight - this.h - data.groundH + 4;
		this.z = 3;
	}

	spawn(){
		world.objects.push( new hill() );
	}

	draw() {
		ctx.drawImage( hillImg, this.x, this.y, this.w, this.h );
	}
}

class tree {

	constructor( x = null, y = null ) {
		this.type = 'hill';
		this.w = 201 * data.scale;
		this.h = 260 * data.scale
		this.x = x !== null ? x : window.innerWidth;
		this.y =  y !== null ? y : window.innerHeight - this.h - data.groundH;
		this.z = 2;
	}

	spawn(){
		world.objects.push( new tree() );
	}

	draw() {
		ctx.drawImage( treeImg, this.x, this.y, this.w, this.h );
	}
}

class ground {
	constructor( x = null, y = null ) {
		this.type = 'ground';
		this.w = 128 * data.scale;
		this.h = 128 * data.scale;
		this.x = x !== null ? x : window.innerWidth;
		this.y =  y !== null ? y : window.innerHeight - this.h;
		this.z = 1;
	}


	spawn(){
		world.objects.push( new ground() );
	}

	draw() {
		ctx.drawImage( groundImg, this.x, this.y, this.w, this.h );
	}
}

class plant {
	constructor( x = null, y = null ) {
		this.type = 'plant';
		this.w = 46 * data.scale;
		this.h = 62 * data.scale;
		this.x = x !== null ? x : window.innerWidth;
		this.y =  y !== null ? y : window.innerHeight - this.h - data.groundH;
		this.z = 1;
	}

	spawn(){
		world.objects.push( new plant() );
	}

	draw() {
		ctx.drawImage( plantImg, this.x, this.y, this.w, this.h );
	}
}

class rock {
	constructor( x = null, y = null ) {
		this.type = 'rock';
		this.w = 64 * data.scale;
		this.h = 38 * data.scale;
		this.x = x !== null ? x : window.innerWidth;
		this.y =  y !== null ? y : window.innerHeight - this.h - data.groundH;
		this.z = 1;
	}

	spawn(){
		world.objects.push( new rock() );
	}

	draw() {
		ctx.drawImage( rockImg, this.x, this.y, this.w, this.h );
	}
}