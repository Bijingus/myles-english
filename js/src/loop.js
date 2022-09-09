let device = getDeviceType();

function update() {

	if( data.gamePause === false ) {
		document.getElementById('ui-hp').innerHTML = player.hp;
		document.getElementById('ui-lives').innerHTML = player.lives;
		document.getElementById('ui-points').innerHTML = player.points;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		world.update();
		world.draw();

		doBrainAndDraw(enemies);
		doBrainAndDraw(player.projectiles);
		doBrainAndDraw(projectiles);
		doBrainAndDraw(effects);
		doBrainAndDraw(powerups);

		player.move();
		player.draw();
	}


	if( data.waterPause === false ) {
		ctxWater.clearRect(0, 0, canvasWater.width, canvasWater.height);
		doBrainAndDraw(allFish);
	}
	
	data.frame++;

}


var stop = false;
var frameCount = 0;
var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(60);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}


function animate() {

    // stop
    if (stop) {
        return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here
		update( );

    }
}