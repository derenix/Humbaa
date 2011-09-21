/**
 * Name: cookie.js
 * 
 * 
 */

(function() {
	
	Humbaa.Cache.Cookie = function() {};
	
	Humbaa.Cache.Cookie.prototype = {
		
		get: function( key ) {
			return "[C] " + key;
		},
		
		set: function(key, value, expiration, meta ) {
			return key;
		},
		
		doDelete: function(key) {
			return true;
		},
		
		has: function( key ) {
			return true;
		},
		
		wipe: function() {
			return true;
		}
	};
		
})();