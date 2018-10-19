
function Mozoom () {
	this.setSizeClass		= 's'
	this.setContainer		= $('#content');	// define wrapper container
	this.animationSpeed	= 200;	// Global animation speed

	$scrollPosition = 0;		// Initial scroll position	
	$zoomedImgWidth			= .35; 	// Define image width of zoomed images, relative to viewport width
	$zoomedSetPadding		= .3;		// Define top and bottom padding of zoomed sets
}

	/*
		ZOOM IN
	*/

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
		zoomedSet = targetSet.clone();
		zoomedSet.addClass('zoomedSet');
		
		// here we go
		
		// save current scroll position
		$scrollPosition = $(window).scrollTop();
		console.log($scrollPosition);
		
		// clone set to be zoomed
		zoomedSet.appendTo('body')
		.css({
			'position': 'absolute',
			'padding-top': $(window).height()*$zoomedSetPadding,
			'padding-bottom': $(window).height()*$zoomedSetPadding,
			'left': 0,
			'top': 0,
			'width': '100vw',
			'z-index': 20,
		})
		.find('img')
		.each(function() {							
			defineZoomedSize($(this));
		});
		
		zoomedSet.children('.set-head').hide();
		zoomedSet.hide();
		zoomedSet.fadeIn(this.animationSpeed);
		
		// identify zoomed equivalent of image
		zoomedTargetImage = zoomedSet.find('figure[data-slug='+targetImage.data("slug")+']');
		
		// get position of centered target image
		pos = zoomedTargetImage.offset().top - ($(window).height()-zoomedTargetImage.find('img').outerHeight(false))/2
		
		// scroll to position
		$([document.documentElement, document.body]).animate({
    	scrollTop: pos
    }, 0);
    		
	};
			
	/*
		ZOOM OUT
	*/
	Mozoom.prototype.zoomOut = function(zoomedSet) {
		zoomedSet.fadeOut(this.animationSpeed, function(){
			$(this).remove();
			$(window).scrollTop($scrollPosition);
		});
	}
	
	
	/* 
		HELPERS
	*/
	
	function defineZoomedSize(img) {
		var $windowWidth = $(window).width();		
		img.css({
				'height': $windowWidth*$zoomedImgWidth*img.data('ratio')
		});
	}
		
	Mozoom.prototype.rebuildZoomedImages = function() {
		zoomedSet.find('img').each(function(){
			defineZoomedSize($(this))
		})
	};
	

		
	/*
		TOGGLE ZOOM
	*/

	// helper function recognizing a set's current zoom state
	Mozoom.prototype.zoomToggle = function(targetSet, targetImage) {
		if ($('.zoomedSet').length) {
			this.zoomOut($('.zoomedSet'));
		} else {
			this.zoomIn(targetSet, targetImage);
		}
	}