// GAME CANVAS
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const wrapper = document.querySelector('.game-wrapper')
wrapper.width = window.innerWidth;
wrapper.height = window.innerHeight;
canvas.height = wrapper.height;
canvas.width = wrapper.width;

resizeVideo();

$(window).resize(function(){
	wrapper.width = window.innerWidth;
	wrapper.height = window.innerHeight;
	canvas.height = wrapper.height;
	canvas.width = wrapper.width;
	resizeVideo();
});

// WATER CANVAS
const canvasWater = document.querySelector("#canvas-water");
const ctxWater = canvasWater.getContext("2d");

canvasWater.height = $('#water-wrapper').outerHeight();
canvasWater.width = $('#water-wrapper').outerWidth();

$(window).resize(function(){
	canvasWater.height = $('#water-wrapper').outerHeight();
	canvasWater.width = $('#water-wrapper').outerWidth();

	world.objects.forEach( (item, index) => {
		if( item.type !== 'cloud' && item.type !== 'ground' ){
			item.y = window.innerHeight - item.h - data.groundH;
		}

		if( item.type === 'ground' ){
			item.y = window.innerHeight - item.h;
		}
	});

});

