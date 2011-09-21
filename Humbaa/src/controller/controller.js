/**
 * Name: controller.js
 * 
 * 
 */

(function() {
	
	Humbaa.Controller = function() {
		return {
			
			getPage: function( url ) {
				
				if( Humbaa.Cache.has( url ) )
				{
					return Humbaa.Cache.get(url);
				}
				// nope, no cache for you!
				
				// fetch it, baby
				return Humbaa.Ajax.get(url);
			}
		};
	}();
	
})();