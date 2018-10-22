$(document).ready(function(){
	var mo = new Mozoom();
	var portfolioImages = $('.set figure');
	var featuredSet = $('#featured');
		
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
				portfolioImages.unbind('click');
				$('img').unbind('mouseenter');
				
					$('.caret-left').click(function(){
			$(this).closest('.set').removeClass('visibleSet');
			$(this).closest('.set').prev().addClass('visibleSet');
	
			if($(this).closest('.set').is(':first-child')) {
				$('.set').last().addClass('visibleSet');
			}
		});
		
		$('.caret-right').click(function(){
			$(this).closest('.set').removeClass('visibleSet');
			$(this).closest('.set').next().addClass('visibleSet');
	
			if($(this).closest('.set').is(':last-child')) {
				$('.set').first().addClass('visibleSet');
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
		}
	});

	mobile();

	// Function to show and hide information
	$('.info').hide();

	$('.infoButton').click(function() {
		$('.info').toggle();
	});
	
});