$(document).ready(function(){
	// Fade out not clicked sets
	var set = $(".set");

	set.click(function() {
			set.not(this).toggleClass("inactive");
	});
});