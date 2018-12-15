// Wait for window to load
window.requestAnimationFrame(function () {
	listen();
	animateBruhs();
});

// store universal variables, like intervals
let universals = {
	bruhFadingHeight: 200,
	bruhAscensionRate: 5,
	fps: 60
};

function listen () {
	const params = {
		url: 'setup',
		type: 'POST',
		success: () => {
			// listen for next bruh
			listen();

			// change sound
			const file = '../audio/bruh.mp3';

			// say bruh
			let audio = new Audio(file);
			audio.play();

			// spawn face
			spawnBruhFace();
		},
		error: (jqXHR, textStatus, errorThrown) => {
			// If request times out, resend
			console.log('error');
			listen();
		}
	};

	$.ajax(params);
}

function animateBruhs () {
	// stop animating if animation already started
	clearInterval(universals.bruhAnimation);
	let duration = (universals.bruhFadingHeight / universals.bruhAscensionRate) * (1000 / universals.fps);

	universals.bruhAnimation = setInterval( function () {
		$('.bruhface').each(function (index, dom) {
			img = $(dom);

			img.css('top', '-=' + universals.bruhAscensionRate);
			// If image is high enough on screen, start fading
			if (parseInt(img.css('top'), 10) < universals.bruhFadingHeight) {
				img.fadeOut( duration, function () {
					// JQuery's remove is buggy; use vanilla JS
					// The completion is also called multiple times (curse you JQuery!!!), make sure element exists
					let bruhContainer = document.getElementById('bruhContainer');
					if (bruhContainer.contains(dom)) {
						bruhContainer.removeChild(dom)
					}
				});
			}
		});
	}, 1000 / universals.fps);
}

function bruhClicked () {
	const params = {
		url: 'bruh',
		type: 'POST',
		success: () => {
			console.log('success')
		}
	};

	$.ajax(params);
}

function spawnBruhFace () {
	let img = document.createElement('img');
	img.src = '/images/bruh.png';
	img.classList.add('bruhface');
	img.style.top = (Math.random() * (window.innerHeight - universals.bruhFadingHeight)) + universals.bruhFadingHeight + 'px';
	img.style.left = (Math.random() * window.innerWidth) + 'px';

	document.getElementById('bruhContainer').appendChild(img);

	let jqImg = $(img);
	jqImg.fadeOut(0, function () {
		jqImg.fadeIn(250);
	});
}