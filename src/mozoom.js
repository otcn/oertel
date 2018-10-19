
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
	
		// clone set to be zoomed
		zoomedSet = targetSet.clone();
		zoomedSet.children('.set-head').remove();
		
		// save current scroll position
		$scrollPosition = $(window).scrollTop();
		console.log($scrollPosition);
		
		// scroll lock body
		$('body').css('overflow', 'hidden');
		
		// display zoomed set
		zoomedSet
		.css({
			'position': 'absolute',
			'padding-top': $(window).height()*$zoomedSetPadding,
			'padding-bottom': $(window).height()*$zoomedSetPadding,
			'left': 0,
			'top': $scrollPosition,
			'width': '100vw',
			'height': '100vh',
			'overflow': 'scroll',
			'z-index': 20,
			'opacity': 0
		})
		.appendTo('body')
		.find('img')
		.each(function() {							
			defineZoomedSize($(this));
		});
		
		// identify zoomed equivalent of image
		zoomedTargetImage = zoomedSet.find('figure[data-slug='+targetImage.data("slug")+']');
		
		// get position of centered target image
		pos = zoomedTargetImage.position().top - ($(window).height()-zoomedTargetImage.find('img').outerHeight(false))/2
		
		// scroll to target image position
		zoomedSet.scrollTop(pos);

		// show zoomed set    						
		zoomedSet.animate({
    	opacity: 1
    }, this.animationSpeed);
    		
	};
			
	/*
		ZOOM OUT
	*/
	Mozoom.prototype.zoomOut = function(zoomedSet) {
		zoomedSet.fadeOut(this.animationSpeed, function(){
			$(this).remove();
			$('body').css('overflow', 'auto');
			// $(window).scrollTop($scrollPosition);
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