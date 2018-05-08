$(document).ready(function(){
	$('#overlay').hide();
	
	var mo = new Mozoom();
	
	var portfolioImages = $('.set figure');
	
	portfolioImages.click(function(){
		var targetSet = '#'+$(this).data('set');
		mo.zoomToggle($(targetSet), $(this));
	});
	
	
	// Fade out not clicked sets
	/*
	$('img').click(function(el) {
		projects.not($(this).parents('.project')).fadeToggle( "slow" );
		$('.page-header, .set-head').toggleClass('inactive');
	});

	$('img').mouseenter(function() {
		$(this).parents('.project').siblings('.set-head').children('p').text($(this).data('title'));
	}).mouseleave(function() {
		$('.set-head p').text('');
	});
	*/
	

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

	// Function to show an dhide information
	$('.info').hide();

	$('.fa-info-circle').click(function() {
		$('.info').toggle();
	});
	
});