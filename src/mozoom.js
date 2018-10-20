
function Mozoom () {
	this.setSizeClass		= 's'
	this.setContainer		= $('#content');	// define wrapper container
	this.animationSpeed	= 200;	// Global animation speed

	$zoomedImgWidth			= .35; 	// Define image width of zoomed images, relative to viewport width
	$zoomedSetPadding		= .3;		// Define top and bottom padding of zoomed sets

	$('.project-head').hide();
}

	/*
		ZOOM IN
	*/

	Mozoom.prototype.zoomIn = function(targetSet, targetImage) {
	
		// clone set to be zoomed
		zoomedSet = targetSet.clone();
		zoomedSet.children('.set-head').remove();
		zoomedSet.addClass('zoomedSet');
		
		// scroll lock body
		$('body').css('overflow', 'hidden');
		
		// display zoomed set
		zoomedSet
		.css({
			'position': 'absolute',
			'left': 0,
			'top': $(window).scrollTop(),
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
		
		// create padding around images to make sure first and last images can be centered
		zoomedSet.find('.project-head').first().css({
			'padding-bottom': $(window).height()*$zoomedSetPadding,
			'margin-bottom': 0
		});
		zoomedSet.find('figure').last().css('padding-bottom',$(window).height()*$zoomedSetPadding);
		
		// show project headers
		zoomedSet.find('.project-head').show();
		
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
		if (zoomedSet.length) {
			zoomedSet.find('img').each(function(){
				defineZoomedSize($(this))
			})
		}
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