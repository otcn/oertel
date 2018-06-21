
function Mozoom () {
	this.setSizeClass		= 's'
	this.setContainer		= $('#content');	// define wrapper container

	$zoomedImgMargin		= 300;				// Define bottom margin for zoomded images
	$unZoomedImgMargin		= 120;				// Define bottom margin for unzoomded images			
	$faderMovement			= 400;				// Define value for slow fade
	$zoomMovement			= 400;				// Define value for slow fade

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
		targetSet.children('.set-head').fadeOut($faderMovement);

		// Get values for top and left position of target Set …
		ogOffset = targetSet.offset();

		// Calculate height of all images (including margins) before TargetImage
		// The top edge of targetImage is now equal to the top edge of the window
		var scrollTarget = 0;	
		var factor = 0;
		
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
		scrollTarget += targetImageHeight * .5;

		// Add half of the windows height
		// The targetImage is now in the middle of the window
		scrollTarget -= $(window).height() * .5;

		// Fade in div: #faderOverlay with callback-function
		$('#faderOverlay').fadeIn($faderMovement, function() {

			// prepare showing headers
			targetSet
			.queue('showHeaders', function(){
				targetSet.find('.project-head').delay($faderMovement).animate({
					'opacity': 1
				});
			});
			
			// prepare zooming set and run queues
			targetSet
			.queue('zoomIn', function(next){
				$(this).css({
					'left': ogOffset.left + 'px',
					'top': ogOffset.top + 140 + 'px' ,
					'position': 'absolute'
				});
				next();
			})
			.queue('zoomIn', function(next){
				$(this).animate({
					"left": "0",
					"top": "0",
					"width": "100vw"
				}, { duration: $zoomMovement });
				next();			
			})
			.queue('zoomIn', function(next){
				$(this).find('.landscape').animate({ 
					"width": "50vw",
					"margin-bottom": $zoomedImgMargin
				}, { duration: $zoomMovement });
				next();			
			})
			.queue('zoomIn', function(next){
				$(this).find('.portrait')
				.animate({ 
					"height": "90vh",
					"margin-bottom": $zoomedImgMargin
				}, { duration: $zoomMovement });
				next();			
			})
			.queue('zoomIn', function(next){
				$(this).find('.project .project-head').animate({
					'margin-bottom': '300px'
				}, { duration: $zoomMovement });
				next();
			})
			.queue('zoomIn', function(next){
				$('html, body').animate({
					scrollTop: scrollTarget
				}, { duration: $zoomMovement });
				targetSet.dequeue('showHeaders');
			})
			.dequeue('zoomIn');
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
		
		targetSet.stop('zoom', true, true);
		targetSet.stop('headers', true, true);

		// Calculate height of all images (including margins) before TargetImage
		var scrollTarget = 0;				

		targetSet.find('img').slice(0, targetSet.find('img').index(targetImage.children().first())).each(function() {					
			
			if ($(this).hasClass('portrait')) {
				factor = $(window).height()*0.25 + $unZoomedImgMargin;
			} else if ($(this).hasClass('landscape')) {
				factor = ($(window).width() * .14 * $(this).data('ratio')) + $unZoomedImgMargin;
			}
			
			scrollTarget += factor;
		});

		// Preparing queues		
		targetSet
		.queue('zoomOut', function(next){
			$(this).find('.project .project-head').animate({
				'margin-bottom': 0
			}, { duration: $zoomMovement });
			next();
		})
		.queue('zoomOut', function(next){
			$(this).find('.landscape').animate({ 
				"width": "14vw",
				"margin-bottom": $unZoomedImgMargin
			}, { duration: $zoomMovement });
			next();
		})
		.queue('zoomOut', function(next){
			$(this).find('.portrait').animate({ 
				"height": "25vh",
				"margin-bottom": $unZoomedImgMargin
			}, { duration: $zoomMovement });
			next();
		})
		.queue('zoomOut', function(){
			$('html, body').animate({
				scrollTop: scrollTarget
			}, { duration: $zoomMovement });
		});

		targetSet
		.queue('resetOffset', function(){
			$(this).css({
				"position": "relative",
				"left": "0",
				"top": "0"
			});

			// Show  navigation headers
			$(this).children('.set-head').fadeIn($faderMovement);

			// Fade out #faderOverlay
			$('#faderOverlay').fadeOut($faderMovement, function(){
				targetSet.css({"z-index": "0"});
			});
		});

		// Fireing queues
		targetSet
		.queue('setOffset', function(){
			$(this).animate({
				"left": ogOffset.left + "px",
				"top": ogOffset.top + 140 + "px",
				"width": "25vw"
			}, $zoomMovement);
			targetSet.dequeue('resetOffset');
		});

		// Prepare hiding headers and run queues
		targetSet
		.queue('hideHeaders', function(){
			targetSet.find('.project-head').animate({
				'opacity': 0
			});
			targetSet.dequeue('setOffset');
			targetSet.dequeue('zoomOut');
		})
		.dequeue('hideHeaders');


		
			
			
		/* targetSet
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

				// Show  navigation headers
				targetSet.children('.set-head').fadeIn($faderMovement);

				// Fade out #faderOverlay
				$('#faderOverlay').fadeOut($faderMovement, function(){
					targetSet.css({"z-index": "0"});
				});
			})
			
			.find('.project .project-head').animate({
					'margin-bottom': 0
			}, {duration: $zoomMovement, queue: false})
			.end()
			
			.find('.landscape')
				.animate({ 
					"width": "14vw",
					"margin-bottom": $unZoomedImgMargin
				}, {duration: $zoomMovement, queue: false})
			.end()
				
			.find('.portrait')
				.animate({ 
					"height": "25vh",
					"margin-bottom": $unZoomedImgMargin
				}, {duration: $zoomMovement, queue: false});


			$('html, body').animate({
				scrollTop: scrollTarget
			}, {duration: $zoomMovement, queue: false}); */
			

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