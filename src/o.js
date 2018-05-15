$(document).ready(function(){
	$('#overlay').hide();

	var mo = new Mozoom();
	
	var portfolioImages = $('.set figure');
	
	portfolioImages.click(function(){
		var targetSet = '#'+$(this).data('set');
		mo.zoomToggle($(targetSet), $(this));
	});
	
	// Slick slider for mobile version
	$('.mobile-page-body').slick({
		infinite: true,
		adaptiveHeight: true,
		arrows: false,
	});

	$('.fa-caret-left').click(function(){
		$('.mobile-page-body').slick('slickPrev');
	})
	
	$('.fa-caret-right').click(function(){
		$('.mobile-page-body').slick('slickNext');
	})

	// Function to show and hide information
	$('.info').hide();

	$('.fa-info-circle').click(function() {
		$('.info').toggle();
	});
	
});