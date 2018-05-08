
function Mozoom () {
	this.setSizeClass = 's'										//
	this.setContainer = $('#content');				// define wrapper container
}

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
		console.log('+ zooming');
		console.log('- '+$(targetSet));
		console.log('- '+targetImage);
		
		// hide navigation headers		
		targetSet.children('.set-head').hide();
		
		targetSet.css({
			// setze top auf die aktuelle vertikale position des elements
			// setze left auf die aktuelle horizontale position des elements	
		})
		.css({
			// setze position auf absolute
		});
		
		// zoom set
		targetSet.removeClass(this.setSizeClass).addClass('zoomed');
		
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