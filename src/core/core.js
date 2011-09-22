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
	
	if( typeof Humbaa.Loader.getJQuery() != "undefined" ) {
		return jQuery.extend(subc, superc);
	}
	
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
