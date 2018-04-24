
function Mozoom () {
	this.setSizeClass = 's'
}

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
		console.log('+ zooming');
		console.log('- '+$(targetSet));
		console.log('- '+targetImage);
				
		targetSet.children('.set-head').hide();
		targetSet.removeClass(this.setSizeClass).addClass('zoomed');
	}
	
	Mozoom.prototype.zoomOut = function(targetSet, targetImage) {
		targetSet.removeClass('zoomed').addClass(this.setSizeClass);
		targetSet.children('.set-head').show();
	};
	
	Mozoom.prototype.zoomToggle = function(targetSet, targetImage) {
		if (targetSet.hasClass('zoomed')) {
			this.zoomOut(targetSet, targetImage);
		} else {
			this.zoomIn(targetSet, targetImage);
		}
	}