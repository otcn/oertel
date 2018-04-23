$(document).ready(function(){

	// Fade out not clicked sets
	var projects = $('.project');

	$('img').click(function(el) {
		projects.not($(this).parents('.project')).fadeToggle( "slow" );
		$('.page-header, .set-head').toggleClass('inactive');

		console.log(el.target);
		// zoom.to();
	});

	$('img').mouseenter(function() {
		$(this).parents('.project').siblings('.set-head').children('p').text($(this).data('title'));
	}).mouseleave(function() {
		$('.set-head p').text('');
	});
});