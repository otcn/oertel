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
					mo.zoomToggle()
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
				var exitOffset = 0;

				featuredSet.children().each(function(){
					exitOffset += $(this).outerHeight();	
				});
								
				featuredSet.scroll(function() {
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