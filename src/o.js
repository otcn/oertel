$(document).ready(function(){
	
	$('#overlay').hide();
	$('.set-head i').hide();

	var mo = new Mozoom();
	var portfolioImages = $('.set figure');
	
	var slickOptions = 
		{
			infinite: true,
			adaptiveHeight: true,
			arrows: false
		}
		
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
	var conditionallySlick = debounce(function() {
		if ($('#mobile-page-header').is(':visible')) {
			$('.page-body').slick(slickOptions);

			// navigate slick slider
			$('.set-head i').show();

			$('.fa-caret-left').click(function(){
				$('.page-body').slick('slickPrev');
			})
			
			$('.fa-caret-right').click(function(){
				$('.page-body').slick('slickNext');
			})
		} else {
			$('.page-body').slick('unslick');
		}
			
	}, 250);
	
	conditionallySlick();

	// listen for window to become small
	$(window).resize(function(){
		conditionallySlick();
	})
	
	// zoom images on click
	portfolioImages.click(function(){
		var targetSet = '#'+$(this).data('set');
		mo.zoomToggle($(targetSet), $(this));
	});

	// Show the title of project on image hover
	$('img').mouseenter(function() {
		$(this).parents('.project').siblings('.set-head').children('p').text($(this).data('title'));
	}).mouseleave(function() {
		$('.set-head p').text('');
	});





	
	// Function to show and hide information
	$('.info').hide();

	$('.fa-info-circle').click(function() {
		$('.info').toggle();
	});
	
});