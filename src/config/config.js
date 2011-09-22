/**
 * Name: config.js
 * 
 * 
 */

(function() {
	
	Humbaa.Config = function() {
		return {
			config: {
				"controller": Humbaa.Controller,
				"cache": Humaa.Cache,
				"startPage": "/",
				"storageBase": "Humbaa"
			},
			
			Config: function(config) {
				this.config = Humbaa.extend( config, this.config );
			},
			
			get: function( key ) {
				debugger;
				return this.config[key];
			}
			
		};
	};
	
})();