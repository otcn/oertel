$(document).ready(function(){
	
	$('#overlay').hide();
	$('.set-head i').hide();

	var mo = new Mozoom();
	var portfolioImages = $('.set figure');
	
	var slickOptions = {
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

			height = $('.slick-active').height();
			console.log($('.slick-current').height());
			console.log($('.slick-active').height());

			$('.page-body').slick(slickOptions);
			$('.slick-list').css("height", height);
			$('.page-body').addClass('slicked');

			$('.caret-left').click(function(){
				$('.page-body').slick('slickPrev');
			})
			
			$('.caret-right').click(function(){
				$('.page-body').slick('slickNext');
			})

			portfolioImages.unbind('click');
			$('img').unbind('mouseenter');

		} else {

			portfolioImages.click(function(e){
				var targetSet = '#'+$(this).data('set');
				mo.zoomToggle($(targetSet), $(this));
			});

			// Show the title of project on image hover
			$('img').mouseenter(function() {
				$(this).parents('.project').siblings('.set-head').children('.placeholder').text($(this).data('title'));
			}).mouseleave(function() {
				$('.set-head .placeholder').text('');
			});
		}

	});

	conditionallySlick();

	// listen for window to become small
		$(window).resize(function(){
			
			if($('.page-body').hasClass('slicked')) {
				if(window.innerWidth >= 800) {
					$('.page-body').slick('unslick');
					$('.page-body').removeClass('slicked')
				}
			} else {
				conditionallySlick();
			}

		});

	/* portfolioImages.click(function(e){
		var targetSet = '#'+$(this).data('set');
		mo.zoomToggle($(targetSet), $(this));
	}); */

	// Function to show and hide information
	$('.info').hide();

	$('.infoButton').click(function() {
		$('.info').toggle();
	});
	
});