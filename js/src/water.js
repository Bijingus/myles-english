document.querySelector('#canvas-water').addEventListener('mousemove', function(e) {
	mouse.x = e.clientX;
	mouse.y = e.layerY;
});

const allFish = [];

// Create some fish
for( let i = 0; i < 15; i++ ) {
	let x = randomIntFromInterval( 100, canvasWater.offsetWidth - 100 );
	let y = randomIntFromInterval( 200, canvasWater.offsetHeight - 200 );
	let newFish = new Fish( x, y );

	allFish.push( newFish );
}

allFish.push( new Submarine( canvasWater.offsetWidth / 2, canvasWater.offsetHeight / 2 ) );