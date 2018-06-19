
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
		SET VARIABLES
	*/

		$(document).ready(function(){
			// Define bottom margin for zoomded images
			$zoomedImgMargin = 300;

			// Define bottom margin for unzoomded images
			$unZoomedImgMargin = 120;

			// Define value for slow fade
			$faderMovement = 400;

			// Define value for slow fade
			$zoomMovement = 400;
		});



	/*
		ZOOM IN
	*/

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
		
		ogScrollTop = $(window).scrollTop();

		// Make sure the div: #faderOverlay will not cover the target Set
		targetSet.css({ "z-index": "20" });

		// Hide navigation headers		
		targetSet.children('.set-head').fadeOut($faderMovement);

		// Get values for top and left position of target Set …
		ogOffset = targetSet.offset();

		// Fade in div: #faderOverlay with callback-function
		$('#faderOverlay').fadeIn($faderMovement, function() {

			// … and apply them to css
			targetSet
			.css({ "left": ogOffset.left + "px", "top": ogOffset.top + 140 + "px" })
			.css({ "position": "absolute" })
			.animate({
					"left": "0",
					"top": "0",
					"width": "100vw"
			}, $zoomMovement)
			.find('.landscape')
				.animate({ 
					"width": "50vw",
					"margin-bottom": $zoomedImgMargin
				}, $zoomMovement)
				.end()
			.find('.portrait')
				.animate({ 
					"height": "90vh",
					"margin-bottom": $zoomedImgMargin
				}, $zoomMovement)
					.end()
				.find('.project .project-head').animate({
					'margin-bottom': '300px'
				});

			// Calculate height of all images (including margins) before TargetImage
			// The top edge of targetImage is now equal to the top edge of the window
			var scrollTarget = 0;				

			targetSet.find('img').slice(0, targetSet.find('img').index(targetImage.children().first())).each(function() {
				
				if ($(this).hasClass('portrait')) {
					factor = ($(window).height() *.9) + $zoomedImgMargin;
				} else if ($(this).hasClass('landscape')) {
					factor = ($(window).width() * .5 * $(this).data('ratio')) + $zoomedImgMargin;
				}

				scrollTarget += factor;
			});
			
			// Calculate project head heights			
			scrollTarget += (targetImage.parent().prevAll('.project').length+1)*$zoomedImgMargin;

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
			}, $zoomMovement).delay(800).queue(function(){
				targetSet.find('.project-head').animate({
					'opacity': 1
				})
			});
		});
			
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
			}, $zoomMovement, function(){
				targetSet.css({
					"position": "relative",
					"left": "0",
					"top": "0"
				});

				// Hide navigation headers
				targetSet.children('.set-head').fadeIn($faderMovement);

				// Fade in div: #faderOverlay with callback-function
				$('#faderOverlay').fadeOut($faderMovement, function(){
					targetSet.css({"z-index": "0"});
				});
			})
			.find('.landscape')
				.animate({ 
					"width": "14vw",
					"margin-bottom": $unZoomedImgMargin
				}, $zoomMovement)
				.end()
			.find('.portrait')
				.animate({ 
					"height": "25vh",
					"margin-bottom": $unZoomedImgMargin
				}, $zoomMovement);

			$('html, body').animate({
				scrollTop: ogScrollTop
			}, $zoomMovement);

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