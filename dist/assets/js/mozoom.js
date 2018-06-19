
function Mozoom () {
	this.setSizeClass = 's'										//
	this.setContainer = $('#content');				// define wrapper container

	// store original image height including margin
	$('.set').each(function(){
		$(this).find('img').each(function(){
			$(this).data({
				'ogOuterHeight': $(this).outerHeight(true),
			});
		})
	})

}


	/*
		ZOOM IN
	*/

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
		
		ogScrollTop = $(window).scrollTop();

		// Make sure the div: #faderOverlay will not cover the target Set
		targetSet.css({ "z-index": "20" });

		// Hide navigation headers		
		targetSet.children('.set-head').fadeOut(400);

		// Get values for top and left position of target Set …
		ogOffset = targetSet.offset();

		// Fade in div: #faderOverlay with callback-function
		$('#faderOverlay').fadeIn(400, function() {

			// … and apply them to css
			targetSet
			.css({ "left": ogOffset.left + "px", "top": ogOffset.top + 140 + "px" })
			.css({ "position": "absolute" })
			.animate({
					"left": "0",
					"top": "0",
					"width": "100vw"
			}, 800)
			.find('.landscape')
				.animate({ 
					"width": "50vw",
					"margin-bottom": "300px"
				}, 800)
				.end()
			.find('.portrait')
				.animate({ 
					"height": "90vh",
					"margin-bottom": "300px"
				}, 800);

			// Calculate height of all images (including margins) before TargetImage
			// The top edge of targetImage is now equal to the top edge of the window
			var scrollTarget = 0;				

			targetSet.find('img').slice(0, targetSet.find('img').index(targetImage.children().first())).each(function(){
				
				if ($(this).hasClass('portrait')) {
					factor = ($(window).height() *.9) + 300;
				} else {
					factor = ($(window).width() * .5 * $(this).data('ratio')) + 300;
				}

				scrollTarget += Math.ceil(factor);
				console.log('ScrollTarget: ' + scrollTarget);
			});

			// Calculate the height of zoomed targetImage 
			if (targetImage.children().hasClass('portrait')) {
				targetImageHeight = $(window).height() * .9;
			}	else {
				targetImageHeight = ($(window).width() * .5) * (targetImage.children().data('ratio'));
			}

			// Substract half of targetImage's height
			// The middle of targetImage is now equal to the top edge of the window
			scrollTarget += targetImageHeight / 2;

			// Add half of the windows height
			// The targetImage is now in the middle of the window
			scrollTarget -= $(window).height() / 2;
					
			$('html, body').animate({
				scrollTop: scrollTarget
			}, 800)/*.delay(50).queue(function(){
				targetSet.find('.project-head').fadeIn();
				$(window).unbind("scroll");
			}) */;
		});	

			/*

			.delay(50).queue(function(){
				$(window).on("scroll", function() {
					targetSet.find('.project-head').fadeIn();
					$(window).unbind("scroll");
					console.log('done');
				});
			});

			*/



			
		// Prevent visible page body in case page is taller than the zoomed set
		this.setContainer.css('max-height', $(window).height());

		// Add class to describe current state of set
		targetSet.addClass('setZoomed');
	}
	



	/*
		ZOOM OUT
	*/

	Mozoom.prototype.zoomOut = function(targetSet, targetImage) {

		// Fade out project head when not zoomed
		$('.project-head').fadeOut();

		targetSet
			.animate({
					"left": ogOffset.left + "px",
					"top": ogOffset.top + 140 + "px",
					"width": "25vw"
			}, 800, function(){
				targetSet.css({
					"position": "relative",
					"left": "0",
					"top": "0"
				});

				// Hide navigation headers
				targetSet.children('.set-head').fadeIn(400);

				// Fade in div: #faderOverlay with callback-function
				$('#faderOverlay').fadeOut(400, function(){
					targetSet.css({"z-index": "0"});
				});
			})
			.find('.landscape')
				.animate({ 
					"width": "14vw",
					"margin-bottom": "120px"
				}, 800)
				.end()
			.find('.portrait')
				.animate({ 
					"height": "25vh",
					"margin-bottom": "120px"
				}, 800);

			$('html, body').animate({
				scrollTop: ogScrollTop
			}, 800);

		// reset page body height
		this.setContainer.css('max-height', 'none');

		// Remove class to describe current state of set
		targetSet.removeClass('setZoomed');
	};
	
	
	/*
		TOGGLE ZOOM
	*/

	// helper function recognizing a set's current zoom state
	Mozoom.prototype.zoomToggle = function(targetSet, targetImage) {
		if (targetSet.hasClass('setZoomed')) {
			this.zoomOut(targetSet, targetImage);
		} else {
			this.zoomIn(targetSet, targetImage);
		}
	}