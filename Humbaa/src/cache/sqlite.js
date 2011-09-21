/**
 * Name: sqlite.js
 * 
 * 
 */

(function() {
	
	Humbaa.Cache.Sqlite = function() {
		
	};
	
	Humbaa.Cache.Sqlite.prototype = {
		
		checkCompatibility: function() {
			if( typeof window["openDatabase"] === "undefined" )
			{
				return false;
			}
			
			return true;
		},
		
		get: function( key ) {
			return "[SQLI] " + key;
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