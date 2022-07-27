
function Mozoom () {
	this.setSizeClass		= 's'
	this.setContainer		= $('#content');	// define wrapper container
	this.animationSpeed	= 1200;	// Global animation speed
	
	$portraitImgWidth		= .35;
	$landscapeImgWidth	= .55;
	$zoomedSetPadding		= .3;		// Define top and bottom padding of zoomed sets

	$('.project-head').hide();
}

	/*
		ZOOM IN
	*/

	Mozoom.prototype.zoomIn = function(targetSet, targetImage, animated) {
	
		// clone set to be zoomed
		zoomedSet = targetSet.clone();
		zoomedSet.children('.set-head').remove();
		zoomedSet.addClass('zoomedSet');

		
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
		.removeAttr('id')
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
			
			toggleScrollLock(false);

			zoomedSet.animate({
					opacity: 1
				}, this.animationSpeed);		
			});
		
		// zoom set without animation		
		} else {
			
			$('#faderOverlay').show();
			zoomedSet.find('.project-head').css('opacity', 0);
			zoomedSet.css('opacity',1);
			
			toggleScrollLock(false);
			
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
		toggleScrollLock(true);
		
		// if the featured set was zoomed, hide it when zooming out
			if (zoomedSet.hasClass('featured')) {
				$('#featured').remove();
		}
			
		$('#faderOverlay').hide();

		zoomedSet.fadeOut(this.animationSpeed * .5, function() {
			$(this).remove();
			$('#zoomedImage').remove();

		});
	}
	
	/* 
		HELPERS
	*/
	
	function toggleScrollLock(unlock) {
		if (!unlock) {
			$('html, body').css({
				'overflow': 'hidden',
				'height': '100vh'
			});
		} else {
			$('html, body').css({
				'overflow': 'unset',
				'height': 'auto'
			});
		}
	}
	
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
	
$(document).ready(function(){
	var mo = new Mozoom();
	
	var portfolioImages 	= $('.set figure');
	var featuredSet				= $('#featured');
		
		
	// debouncer
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	// inits slick slider if screen is small as indicated by presence of mobile header || breakpoint
	var mobile = debounce(function() {

		if ($('#mobile-page-header').is(':visible')) {
			
			$('.set').first().show();
			$('.project-head').show();
			$('#faderOverlay').hide();
			$('#featured').remove();
			
			// slide sets
			$('.caret').click(function(){
				
				var active = $('.set:visible');
				
				// forward
				if ($(this).hasClass('caret-right')) {
										
					if (!$('.set:visible').is(':last-child')) {
						active.hide().next().show();
					}	
					
					else {
						
						active.hide();
						$('.set:first-child').show();
					}
					
				// back
				} else {
					
					if (!active.is(':first-child')) {
						active.prev().show();
					}	

					else {
						
						active.hide();
						$('.set:last-child').show();
					}					
					
				}
			});

			
		// desktop, zoom on click etc.
		
		} else {
			
			portfolioImages.click(function(e){
				e.stopPropagation();
				
				if ($(this).is('figure')) {
					var targetSet = '#'+$(this).data('set');
					mo.zoomToggle($(targetSet), $(this), true);
				}
				
			});
			
			$(window).click(function(){
					mo.zoomToggle();
			})
			
			// recalculate zoomed image sizes on window resize
			var rebuild = debounce(function() {
				mo.rebuildZoomedImages();
				closeFeatured();
			}, 250);	
					
			$(window).resize(rebuild);

			// Show the title of project on image hover
			$('img').mouseenter(function() {
				$(this).parents('.project').siblings('.set-head').children('.placeholder').text($(this).data('title'));
			}).mouseleave(function() {
				$('.set-head .placeholder').text('');
			});
			
			// automatically zoom featured set on page load
			mo.zoomToggle(featuredSet, featuredSet.find('figure').first(), false)
			
			// close featured set when scrolled to bottom
			var closeFeatured = debounce(function() {
				var featuredSet = $('.zoomedSet');
				var featuredImages = featuredSet.children('.project').children('figure');
				var exitOffset = 0;

				featuredImages.each(function(){
					exitOffset += $(this).outerHeight();
				});
								
				featuredSet.scroll(function() {
					console.log('scroll');
					if ($(this).scrollTop()+$(window).height()*.5 > exitOffset) {
						mo.zoomToggle();
   	 			}
				});				
			}, 250);
			
			closeFeatured();
		}
	});

	mobile();

	// Function to show and hide information
	$('#mobileInfo').hide();

	$('#mobileInfoButton').click(function() {
		$('#mobileInfo').toggle();
	});
	
});