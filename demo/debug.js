(function() {

	
	var files = [
 	    "ajax/ajax.js",
 	    
 	    "cache/cache.js",
 	    "cache/cookie.js",
 	    "cache/localStorage.js",
 	    "cache/sqlite.js",
 	    
 	    "controller/controller.js",
 	    
 	    "utils/utils.js",
 	    "utils/math.js",
 	    "utils/md5.js"
 	];
 	
 	for( var i=0; i<=files.length; i++ )
 	{
 		var s = null,
 			head = document.getElementsByTagName("head")[0],
 			t = null;
 		
 		s = document.createElement("script");
 		s.charset = "utf-8";
 		s.type="text/javascript";
 		s.src = "src/" + files[i];
 		
 		t = document.createTextNode("");
 		s.appendChild(t);
 		
 		head.appendChild(s);
 	}
	
})();