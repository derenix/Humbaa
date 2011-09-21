/**
 * Name: core.js
 * 
 * 
 */

var Humbaa = (typeof Humbaa === 'undefined') ? {} : Humbaa;

/* borrowed from javascript patters book */
Humbaa.namespace = function(namespaceName) {

	var parts = namespaceName.split("."),
		parent = Humbaa,
		i = 0;

	// remove that humbaa
	if (parts[0] === "Humbaa") {
		parts = parts.slice(1);
	}

	var len = parts.length;

	for (i = 0; i < len; i++) {
		var part = parts[i];
		
		if (typeof parent[part] === "undefined") {
			parent[part] = {};
		}

		parent = parent[part];
	}

	return parent;
};

/**
 * http://www.kevs3d.co.uk/dev/canvask3d/scripts/mathlib.js
 * 
 * Utility to set up the prototype, constructor and superclass properties to
 * support an inheritance strategy that can chain constructors and methods.
 * Static members will not be inherited.
 * 
 * @method extend
 * @static
 * @param {Function} subc the object to modify
 * @param {Function} superc the object to inherit
 * @param {Object}	 overrides additional properties/methods to add to the subclass
 *            		  prototype. These will override the matching items obtained from
 *            		  the superclass.
 */
Humbaa.extend = function(subc, superc, overrides) {
	
	var F = function() {},
		i=0;
	
	F.prototype = superc.prototype;
	subc.prototype = new F();
	subc.prototype.constructor = subc;
	subc.superclass = superc.prototype;
	
	if (superc.prototype.constructor == Object.prototype.constructor) {
		superc.prototype.constructor = superc;
	}

	if (overrides) {
		for (i in overrides) {
			if (overrides.hasOwnProperty(i)) {
				subc.prototype[i] = overrides[i];
			}
		}
	};
};


Humbaa.log = function( message ) {
	if( window["console"] !== "undefined" ) {
		console.log( "[HUMBAA] " + message );
	}
};
/**
 * Name: loader.js
 * 
 * 
 *//**
 * Name: cache.js
 * 
 * 
 */

(function() {
	
	Humbaa.Cache = function() {
		
		return {
			activeStorage: undefined,
			storages: {
				"cookie": {
					"class": "cookie",
					"name": "Cookie",
					"maxSize": 4 * 1024, // 4KB, old browser doesn't like that, but.. meeh
					"instance": undefined
				},
				"localStorage": {
					"class": "localStorage",
					"name": "LocalStorage",
					"maxSize": 3 * 1024 * 1024, // 3MB, @see http://ejohn.org/blog/dom-storage/ 
					"instance": undefined
				},
				"sqlite": {
					"class": "sqlite",
					"name": "SQLite",
					"maxSize": 3 * 1024 * 1024, // 3MB, didn't found any information about that
					"instance": undefined
				}
			},
			initialzied: false,
			
			init: function( startPage ) {
				
				if(!this.initialzied) this.initStorages();
				
				if(  this.storages.localStorage.instance.checkCompatibility() && this.storages.localStorage.instance.has(startPage) )
				{
					this.activeStorage = this.storages.localStorage.instance;
				}
				else if( this.storages.sqlite.instance.checkCompatibility() && this.storages.sqlite.instance.has(startPage) )
				{
					this.activeStorage = this.storages.sqlite.instance;
				}
				else if( this.storages.cookie.instance.has(startPage) )
				{
					this.activeStorage = this.storages.cookie.instance;
				}
				
			},
			
			initStorages: function() {
				
				for( var i in this.storages )
				{
					 this.storages[i].instance = this.getStorageObject( this.storages[i]["class"] );
				}
				
				this.initialzied = true;
				
				return true;
			},
			
			getStorageObject: function( storage ) {
				
				switch( storage ) {
					case "cookie":
						return new Humbaa.Cache.Cookie();
						break;
					case "sqlite":
						return new Humbaa.Cache.Sqlite();
						break;
					case "localStorage":
						return new Humbaa.Cache.LocalStorage();
						break;
				}
				
			},
			
			getStorage: function() {
				if( typeof this.activeStorage === "undefined" )
				{
					return false;
				}
				
				return this.activeStorage;
			},
			
			has: function( key ) {
				
				if( !this.initialzied ) this.init();
				
				return this.activeStorage.get( key );
			},
			
			get: function( key ) {
				
				if( !this.initialzied ) this.init();
				
				return this.activeStorage.get( key );
			}
			
		};
	}();
		
})();/**
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
		
})();/**
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
		
})();/**
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
		
})();/**
 * Name: ajax.js
 * 
 * 
 *//**
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
	
})();/**
 * Name: config.js
 * 
 * 
 */

(function() {
	
	Humbaa.Config = function() {
		return {
			
		};
	};
	
})();/**
 * Name: routing.js
 * 
 * 
 */

(function() {
	
	Humbaa.Routing = function() {
		return {
			
		};
	};
	
})();/**
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
	
})();/**
 * Name: utils.js
 * 
 * 
 */


(function() {
	
	Humbaa.Utils = function() {
		
	};
	
})();

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
	
})();/**
 * Name: md5.js
 * 
 * 
 */

(function() {
	
	Humbaa.Utils.Md5 = function() {
		return {
			getHash: function( str ) {
				return str;
			}
		};
	}();
	
})();