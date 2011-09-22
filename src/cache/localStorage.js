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
			return localStorage.getItem( Humbaa.Config.get("storageBase") + "_" + key );
		},
		
		set: function(key, value, expiration, meta ) {
			
			var obj = {
					"lifeTime": expiration,
					"meta": meta,
					"payload": value
			};
			
			return localStorage.setItem( Humbaa.Config.get("storageBase") + "_" + key, obj );
		},
		
		doDelete: function(key) {
			return !!(this.set(key, null, -1));
		},
		
		has: function( key ) {
			return !!(this.get(key));
		}
	};
		
})();