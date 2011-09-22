/**
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
				
				// @REFACTOR we usually does not have a cache by the first call.. cookie based cache.. no.
				if(  this.storages.localStorage.instance.checkCompatibility() && this.storages.localStorage.instance.has(startPage) )
				{
					Humbaa.log("Set storage to localStorage");
					this.activeStorage = this.storages.localStorage.instance;
				}
				else if( this.storages.sqlite.instance.checkCompatibility() && this.storages.sqlite.instance.has(startPage) )
				{
					Humbaa.log("Set storage to sqlite");
					this.activeStorage = this.storages.sqlite.instance;
				}
				else if( this.storages.cookie.instance.has(startPage) )
				{
					Humbaa.log("Set storage to cookie");
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
			},
			
			set: function( key, value ) {

				if( !this.initialzied ) this.init();
				
				return this.activeStorage.set( key, value );
			}
			
		};
	}();
		
})();