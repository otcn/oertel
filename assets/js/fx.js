$(document).ready(function(){
	var options = {
		width: {
			min: 35,
			max: 70,
			unit: '%'
		},
		margin: {
			min: 5,
			max: 30,
			unit: '%'
		}
	
	}
	
	
	function getRandomInt (min, max, unit) {
		return Math.floor(Math.random() * (max - min + 1)) + min + unit;
	}
	function randomize() {
	  var img =  document.querySelectorAll('img');
	  for (var p = 0; p < img.length; p++) {
		img[p].style.margin =  getRandomInt(options.margin.min,options.margin.max, options.margin.unit) + " " + getRandomInt(options.margin.min,options.margin.max, options.margin.unit);
		img[p].style.width = getRandomInt(options.width.min,options.width.max, options.width.unit);
	  }
	}
	
	 randomize();
});
