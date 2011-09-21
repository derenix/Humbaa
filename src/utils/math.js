/**
 * Name: math.js
 * 
 * 
 */

(function() {
	
	Humbaa.Utils.Math = function() {
		
	};
	
	Humbaa.Utils.Math.prototype = {
		
		randomInt: function( high, low ) {
			var rand = Math.random();
			return ~~(rand * (high - low + 1) + low);
		}
	
	};
	
})();