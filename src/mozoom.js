
function Mozoom () {
	this.setSizeClass		= 's'
	this.setContainer		= $('#content');	// define wrapper container

	$zoomedImgMargin		= 300;				// Define bottom margin for zoomded images
	$unZoomedImgMargin		= 120;				// Define bottom margin for unzoomded images			
	$faderMovement			= 0;				// Define speed for fades
	$zoomMovement			= 200;				// Define speed for zooms


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
		zoomedImage = targetImage
									.clone()
									.appendTo('body')
									.css({
										'position': 'absolute',
										'z-index': 20
									});
		
		zoomedImage.css({
			'left': 0,
			'top': $(window).scrollTop(),
			'width': '100vw'
		});

	};
	/*
		ZOOM OUT
	*/

	Mozoom.prototype.zoomOut = function(targetSet, targetImage) {

		targetSet.stop('zoom', true, true);
		targetSet.stop('headers', true, true);

		$('footer').show();

		// Calculate height of all images (including margins) before TargetImage
		var scrollTarget = 0;				

		targetSet.find('img').slice(0, targetSet.find('img').index(targetImage.children().first())).each(function() {					
			
			if ($(this).hasClass('portrait')) {
				factor = $(window).height()*.25 + $unZoomedImgMargin;
			} else if ($(this).hasClass('landscape')) {
				factor = ($(window).width() * .14 * $(this).data('ratio')) + $unZoomedImgMargin;
			}
			
			scrollTarget += factor;
		});

		targetSet
		.queue('putSetBack', function() {
			
			$(this).animate({
				"left": ogOffset.left,
				"top": ogOffset.top,
				"width": "25vw"
			}, $zoomMovement)
			.promise().done(function(){
				$(this).css({
					"position": "relative",
					"left": "0",
					"top": "0"
				});
			})

			// Show navigation headers
			$(this).children('.set-head').fadeIn($faderMovement);

			// Fade out #faderOverlay
			$('#faderOverlay').fadeOut($faderMovement, function(){
				targetSet.css({"z-index": "0"});
			});
			
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
			$(this).find('.portrait, .square').animate({ 
				"height": "25vh",
				"margin-bottom": $unZoomedImgMargin
			}, { duration: $zoomMovement });
			next();
		})
		.queue('zoomOut', function(){
			$('html, body').animate({
				scrollTop: scrollTarget
			}, { duration: $zoomMovement });
			targetSet.dequeue('putSetBack');
		});
		
		// Prepare hiding headers and run queues
		targetSet.find('.project-head').animate({
			'opacity': 0
		}).promise().done(function(){
			targetSet.dequeue('zoomOut');
		});


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