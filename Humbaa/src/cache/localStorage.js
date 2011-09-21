/**
 * Name: localStorage.js
 * 
 * 
 */

(function() {
	
	Humbaa.Cache.LocalStorage = function() {
		
	};
	
	Humbaa.Cache.LocalStorage.prototype = {
		
		checkCompatibility: function() {
			
			if( typeof window["localStorage"] === "undefined" )
			{
				return false;
			}
			
			return true;
		},
		
		get: function( key ) {
			return "[LS] " + key;
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