
function Mozoom () {
	this.setSizeClass = 's'										//
	this.setContainer = $('#content');				// define wrapper container
}

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
		console.log('+ zooming');
		console.log('- '+$(targetSet));
		console.log('- '+targetImage);

		// Make sure the div: #faderOverlay will not cover the target Set
		targetSet.css({ "z-index": "20" });

		// hide navigation headers		
		targetSet.children('.set-head').fadeOut(400);

		$('#faderOverlay').fadeIn(400, function() {
			// Get values for top and left position of target …
			var offset = targetSet.offset();

			// … and apply them to css
			targetSet
				.css({ "left": offset.left + "px", "top": offset.top + 140 + "px" })
				.css({ "position": "absolute" })
				.animate({
						"left": "0",
						"top": "0",
						"width": "100vw"
				}, 800 )
				.find('.landscape').animate({ "width": "50vw" }, 800 );
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