
function Mozoom () {
	this.setSizeClass		= 's'
	this.setContainer		= $('#content');	// define wrapper container
	this.animationSpeed	= 1200;	// Global animation speed
	
	$portraitImgWidth		= .35;
	$landscapeImgWidth	= .55;
	$zoomedSetPadding		= .3;		// Define top and bottom padding of zoomed sets

	$('.project-head').hide();
	$('#faderOverlay').hide();
}

	/*
		ZOOM IN
	*/

	Mozoom.prototype.zoomIn = function(targetSet, targetImage, animated) {
	
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
		
		// should we animate zooming this set?
		if (animated) {
			
			// clone image to be zoomed
			clonedImage = targetImage.clone().css({
				'z-index': 15,
				'position': 'absolute',
				'left': targetImage.offset().left,
				'top': targetImage.offset().top,
				'width': targetImage.width(),
				'height': 'auto'
			})
			.attr('id','zoomedImage')
			.appendTo('body');
			
			// overlay body, then show zoomed set
			$('#faderOverlay').fadeIn(this.animationSpeed * .5, function(){						
				zoomedSet.animate({
		    	opacity: 1
		    }, this.animationSpeed);		
			});
		
		// zoom set without animation		
		} else {
			console.log('no animation zoom');
			zoomedSet.find('.project-head').css('opacity', 0);
			zoomedSet.css('opacity',1);
			zoomedSet.scroll(function(){
				zoomedSet.find('.project-head').animate({
					'opacity': 1
				}, this.animationSpeed);
			});
			
		};
		
	};
			
	/*
		ZOOM OUT
	*/
	Mozoom.prototype.zoomOut = function(zoomedSet) {
		console.log('zoomin out');
		$('#faderOverlay').hide();
		zoomedSet.fadeOut(this.animationSpeed * .5, function(){
			$(this).remove();
			$('#zoomedImage').remove();
			$('body').css('overflow', 'auto');
		});
	}
	
	/* 
		HELPERS
	*/
	
	function defineZoomedSize(img) {
		var $windowWidth = $(window).width();
		var w = $portraitImgWidth;
		if (img.hasClass('landscape')) {
			w = $landscapeImgWidth;
		}
		img.css({
			'height': $windowWidth*w*img.data('ratio')
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
	Mozoom.prototype.zoomToggle = function(targetSet, targetImage, introZoom) {
		if (!$('.zoomedSet').length && targetSet && targetImage) {
			this.zoomIn(targetSet, targetImage, introZoom);
		} else {
			this.zoomOut($('.zoomedSet'));
		}
	}