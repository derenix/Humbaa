/**
 * Name: cookie.js
 * 
 * 
 */

(function() {
	
	Humbaa.Cache.Cookie = function() {};
	
	Humbaa.Cache.Cookie.prototype = {
			
		get: function( key ) {
			return document.cookie = Humbaa.Config.get("storageBase") + "_" + key;
		},
		
		set: function(key, value, expiration, meta ) {
			return document.cookie = Humbaa.Config.get("storageBase") + "_" + key + "=" + value + ";expires=" + expiration;
		},
		
		doDelete: function(key) {
			return document.cookie = Humbaa.Config.get("storageBase") + "_" + key + "=" + this.get(key) + ";expires=" + 0;
		},
		
		has: function( key ) {
			return !!(this.get(key));
		},
		
		wipe: function() {
			return true;
		}
	};
		
})();