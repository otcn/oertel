
function Mozoom () {
	this.setSizeClass = 's'										//
	this.setContainer = $('#content');				// define wrapper container

	// store original image height including margin
	$('.set').each(function(){
		$(this).find('img').each(function(){
			$(this).data({
				'ogOuterHeight': $(this).outerHeight(true),
				'ratio': $(this).height()/$(this).width()
			});
		})
	})

}

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
		/* console.log('+ zooming');
		console.log('- '+$(targetSet));
		console.log('- '+targetImage); */

		// Make sure the div: #faderOverlay will not cover the target Set
		targetSet.css({ "z-index": "20" });

		// hide navigation headers		
		targetSet.children('.set-head').fadeOut(400);

		$('#faderOverlay').fadeIn(400, function() {
			// Get values for top and left position of target Set …
			var offset = targetSet.offset();

			// … and apply them to css
			targetSet
				.css({ "left": offset.left + "px", "top": offset.top + 140 + "px" })
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
					}, 800, function(){

					});

					var scrollTarget = 0;				

					targetSet.find('img').slice(0, targetSet.find('img').index(targetImage.children().first())).each(function(){
						if ($(this).hasClass('portrait')) {
							factor = ($(window).height()*.9) + 300;
						} else {
							factor = $(window).width()*.5*$(this).data('ratio') + 300;
						}
					
						scrollTarget += factor;
					});

					console.log(scrollTarget);
					

					$('html, body').animate({
						scrollTop: scrollTarget
					}, 800);



		});
		
			
		// prevent visible page body in case page is taller than the zoomed set
		//this.setContainer.css('max-height', $(window).height());
	}
	
	Mozoom.prototype.zoomOut = function(targetSet, targetImage) {
		
		// reset zoomed state
		targetSet.removeClass('zoomed').addClass(this.setSizeClass);
		
		// show navigation headers
		targetSet.children('.set-head').show();

		// reset page body height
		//this.setContainer.css('max-height', 'none');
	};
	
	// helper function recognizing a set's current zoom state
	Mozoom.prototype.zoomToggle = function(targetSet, targetImage) {
		if (targetSet.hasClass('zoomed')) {
			this.zoomOut(targetSet, targetImage);
		} else {
			this.zoomIn(targetSet, targetImage);
		}
	}