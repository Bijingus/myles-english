$('#contact-form').submit(function(e) {
	e.preventDefault();

	let url = 'ajax/contact.php';

	let data = {
		name 		: $('#contact-name').val(),
		email 		: $('#contact-email').val(),
		phone 		: $('#contact-phone').val(),
		subject 	: $('#contact-subject').val(),
		message 	: $('#contact-message').val(),
	}

	$.post( url, data, function( response ) {
		response = JSON.parse( response );

		if( response.success === true ) {
			let $success = $('.form-success');
			let $form = $('#contact-form');
			$success.css('height', $form.height()); 
			$form.fadeOut(1000);
			$success.delay(1000).fadeIn();
		} else {
			let $alert = $('.form-alert');
			$alert.html( response.message );

			setTimeout(function(){
				$(response.selector).delay(500).focus();
			}, 500);

			$alert.fadeIn();
		}

	});
});

$('#hs-form').submit(function(e) {
	e.preventDefault();

	let url = 'ajax/submit-high-score.php';

	let data = {
		initials 	: $('#hs-initials').val(),
		score 		: player.points,
	}

	$.post( url, data, function( response ) {

		response = JSON.parse( response );

		if( response.success === true ) {
			$('#hs-form').fadeOut();
			$('#hs-form-success').delay(1000).fadeIn();
		} else {
			let $alert = $('#hs-form-alert');
			$alert.html( response.message );

			setTimeout(function(){
				$(response.selector).delay(500).focus();
			}, 500);

			$alert.fadeIn();
		}

	});
});