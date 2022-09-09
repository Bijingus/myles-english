<?php require('includes/header.php'); ?>

<div class="hero">
	<div class="hero-content">
		<h1>Creative Web Development and Design</h1>
		<h5>I make highly interactive websites that your visitors will never forget (in a good way).</h5>
		<div class="ui-tooltip ui-start-button-tooltip animate-hover">Learn about my services and how I can help you through a short, fun game.</div>
		<button class="ui-start-button cartoon-btn" type="button">Start</button>
	</div>
</div>

<div class="game-wrapper">
	<?php require('includes/game-ui.php'); ?>
	<div class="joystick"></div>
	<canvas id="canvas" width="1920" height="1080"></canvas>
	<img class="hero-separator" src="images/separator-clouds.png" />
</div>

<section class="wrapper">
	<div class="container">
		<div class="row v-align-center">
			<div class="col-lg-6 mobile">
				<div class="video-wrapper" style="margin-bottom: 60px;">
					 <video class="video" width="320" height="240" autoplay muted loop>
					  	<source src="video/wave.mp4" type="video/mp4">
						<img src="images/myles-english-cartoon-wave-hello.png" alt="a cartoon drawing of myles english waving hello" />
					</video>
				</div>
			</div>

			<div class="col-lg-6">
				<h2 class="text-outline-dark">About Me</h2>
				<p>Hi, I'm Myles.  My skillset is a unique combination of technical and creative skills which allow me to create memorable websites that maximize user engagement, retention and brand recognition.</p>
				<p>Some of my go-to development tools are JavaScript, PHP, SQL, HTML/CSS, WordPress, Bootstrap and Git.</p>
				<p>For design work, you'll often find me working in either the Adobe Suite or leveraging some amazing open source tools like Blender, OpenToons, Inkscape and Krita.</p>
				<p>When not developing websites, I'll either be playing guitar, walking the dogs, tinkering on my Fiat 500 Abarth, exploring Canada or watching a movie.</p>
				<button class="open-contact-modal cartoon-btn" data-bs-toggle="modal" data-bs-target="#contact-modal">Contact Me</button>
			</div>

			<div class="col-lg-6 desktop">
				<div class="video-wrapper">
					 <video class="video" width="320" height="240" autoplay muted loop>
					  	<source src="video/wave.mp4" type="video/mp4">
						<img src="images/myles-english-cartoon-wave-hello.png" alt="a cartoon drawing of myles english waving hello" />
					</video>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="wrapper sky">
	<div class="container businesses-container">
		<div class="row">
			<div class="col-md-12">
				<div class="section-heading">
					<h2 class="green text-outline text-center section-header">Businesses I've Worked With</h2>
					<p class="text-center sub-header">I've worked with dozens of businesses across the world on hundreds of projects.</p>
				</div>
				<ul class="bxslider">
					<li><img src="images/buildings/ioncpa-office.png" /></li>
					<li><img src="images/buildings/proton-office.png" /></li>
					<li><img src="images/buildings/icon-oil-office.png" /></li>
					<li><img src="images/buildings/jst-building.png" /></li>
				</ul>
			</div>
		</div>
	</div>
	<img class="separator separator-desktop separator-dock" src="images/separator-dock.png" />
	<img class="separator separator-mobile separator-dock" src="images/separator-dock-mobile.png" />
</section>

<section id="water-wrapper" class="wrapper canvas-water-wrapper water">

	<div class="container" style="padding-bottom: 0;">
		<div class="row">
			<div class="col-md-12 text-center">
				<h2 class="purple text-outline">Services</h2>
				<p class="text-white sub-header">Creative website solutions that maximize user engagment, retention and brand recognition.</p>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-md-4 text-center service">
				<img class="service-icon" src="images/icons/web-design.png" />
				<h4 class="lblue">Design</h4>
				<p class="text-white">From professional to silly, my design work delivers memorable experiences that will set your brand far ahead of your competitors.</p>
			</div>
			<div class="col-md-4 text-center service">
				<img class="service-icon" src="images/icons/web-development.png" />
				<h4 class="lblue">Development</h4>
				<p class="text-white">I have extensive front-end and back-end development experience that allow me to tackle virtually any project.</p>
			</div>
			<div class="col-md-4 text-center service">
				<img class="service-icon" src="images/icons/consulting.png" />
				<h4 class="lblue">Consulting</h4>
				<p class="text-white">Not sure which direction to go with your next project? Let's clarify your goals and put together a clear project outline.</p>
			</div>
		</div>
	</div>

	<canvas id="canvas-water" class="canvas-bg" width="1920" height="1080"></canvas>

</section>

<?php require('includes/footer.php'); ?>