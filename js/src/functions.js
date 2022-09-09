function randomizeCoord(distance = 1) {
	return (Math.round(Math.random()) * 2 - 1);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function isCollide(a, b) {
    return !(
        ((a.y + a.h) < (b.y)) ||
        (a.y > (b.y + b.h)) ||
        ((a.x + a.w) < b.x) ||
        (a.x > (b.x + b.w))
    );
}

function doBrainAndDraw( objectsArray ) {
	// Objects are spliced from arrays often so draw loop needs to be separate
	for( let i = 0; i < objectsArray.length; i++ ) {
		objectsArray[i].brain();
	}

	for( let i = 0; i < objectsArray.length; i++ ) {
		objectsArray[i].draw();
	}
}

function randomPowerup( x, y ) {
	let rand = randomIntFromInterval( 1, 15 );

	if( rand === 1 && weapons.projectileSpawnRate < 2 ) {
		powerups.push( new attackCount( x, y ) );
	}

	if( rand > 2 && rand < 5 ) {
		powerups.push( new hp( x, y ) );
	}
}

function resizeVideo(selector = '.video') {
	let iframe = $(selector);
	iframe.each(function(){
		let w = $(this).parent().width();
		let h = w * 0.5625;

		$(this).width(w);
		$(this).height(h);
	});
}

function elementInView(element) {

	let elementHeight = element.offsetHeight;
	let elementWidth = element.offsetWidth;

    var bounding = element.getBoundingClientRect();

    if (bounding.top >= -elementHeight 
        && bounding.left >= -elementWidth
        && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + elementWidth
        && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elementHeight) {
        return true;
    } else {
    	return false;
    }
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "mobile";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

function resetHero(){
  $('.hero-content h5, .hero-content h1, .hero-content button').css('display', 'inline-block');
  $('.hero-content .ui-tooltip').css('display', 'block');

  anime({
    targets: '.hero-content h5',
    translateX : '0',
    opacity : 1,
    easing: 'easeInOutQuad',
  });

  anime({
    targets: '.hero-content h1',
    translateX : '0',
    opacity : 1,
    easing: 'easeInOutQuad',
  });

  anime({
    targets: '.hero-content .ui-tooltip, .hero-content button',
    opacity : 1,
    easing: 'easeInOutQuad',
  });
}