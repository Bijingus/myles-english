anime({
	targets: '.animate-hover',
	translateY: 20,
	direction: 'alternate',
	loop: true,
	easing: 'easeInOutSine'
});

var level1Music = new Howl({
		src: ['sounds/music/level-1.mp3'],
		volume : 0.7,
		loop : true,
});

window.onscroll = function() {

	let game = document.querySelector('#canvas');
	let gameInView = elementInView(game);

	if( gameInView === true ) {
		data.gamePause = false;
		level1Music.mute(false);
	} else { 
		data.gamePause = true;
		level1Music.mute(true);
	}

	let waterCanvas = document.querySelector('#canvas-water');
	let waterInView = elementInView(waterCanvas);

	if( waterInView === true ) {
		data.waterPause = false;
	} else {
		data.waterPause = true;
	}

};

document.querySelector('.ui-start-button').addEventListener('mousedown', function(){
	world.events = events;

	document.getElementById('hs-form-success').style.display = 'none';
	document.getElementById('hs-form-alert').style.display = 'none';
	document.getElementById('hs-form').style.display = 'block';
});

document.querySelector('.open-contact-modal').addEventListener('click', function(){
	anime({
	  targets: '.hero-content h1',
	  opacity : 1,
	  display : 'block',
	  easing: 'easeInOutQuad',
	});
});

document.querySelector('.ui-start-button').addEventListener('click', function(){

	data.continueEvents = true;
	data.gameComplete = false;
	player.points = 0;
	player.hp = 100;

	var sound = new Howl({
  		src: ['sounds/effects/start.wav']
	});

	sound.play();

	level1Music.seek(0);
	level1Music.volume(0.7);
	level1Music.play();

	$('.ui').animate({
		opacity: 1,
	});

	anime({
	  targets: '.hero-content h5',
	  translateX : '1200px',
	  opacity : 0,
	  easing: 'easeInOutQuad',
	});

	anime({
	  targets: '.hero-content h1',
	  translateX : '-1200px',
	  opacity : 0,
	  easing: 'easeInOutQuad',
	  complete : function(){
	  	document.querySelector('.hero-content h1').style.display = 'none';
	  }
	});

	anime({
	  targets: '.hero-content .ui-tooltip, .hero-content button',
	  opacity : 0,
	  easing: 'easeInOutQuad',
	  complete : function(){
	  	document.querySelector('.hero-content .ui-tooltip, .hero-content button').style.display = 'none';
	  }
	});

});

document.querySelector('.ui-weapon-laser').addEventListener('click', function(e) {
	player.weapon = weapons.laser;
	player.spriteCount = 0;
	document.querySelector('.ui-weapon-laser').classList.add('ui-button-active');
	document.querySelector('.ui-weapon-rocket').classList.remove('ui-button-active');
});

document.querySelector('.ui-weapon-rocket').addEventListener('click', function(e) {
	player.weapon = weapons.rocket;
	player.spriteCount = 0;
	document.querySelector('.ui-weapon-rocket').classList.add('ui-button-active');
	document.querySelector('.ui-weapon-laser').classList.remove('ui-button-active');
});

let buttons = document.getElementsByClassName('ui-weapon-button');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
    	var sound = new Howl({
  			src: ['sounds/effects/weapon-change.wav']
		});

		sound.play();

    }, false);
}

$(document).ready(function() {
	if( window.innerWidth > 1200 ) {
		$('.bxslider').bxSlider({
		  	pager 	: false,
		  	minSlides : 3,
		  	maxSlides : 3,
		  	slideWidth: 600,
		  });
	} else if( window.innerWidth < 1200 && window.innerWidth > 767 ) {
		$('.bxslider').bxSlider({
		  	pager 	: false,
		  	minSlides : 2,
		  	maxSlides : 2,
		  	slideWidth: 600,
		});
	} else {
		$('.bxslider').bxSlider({
		  	pager 	: false,
		  	minSlides : 1,
		  	maxSlides : 1,
		  	slideWidth: 600,
		});
	}
});