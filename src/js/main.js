(function() {
	"use strict";
	
    require(["sat-js/SAT"], function(util) {
        //This function is called when scripts/helper/util.js is loaded.
        //If util.js calls define(), then this function is not fired until
        //util's dependencies have loaded, and the util argument will hold
        //the module value for "helper/util".
        
        var V = SAT.Vector;
        var C = SAT.Circle;
        
        var circle1 = new C(new V(0,0), 20);
        var circle2 = new C(new V(30,0), 5);
        var response = new SAT.Response();
        var collided = SAT.testCircleCircle(circle1, circle2, response);
    
        console.log(collided);
    
    });

	function f1 () {
		
		document.getElementById('inner').innerHTML = "Hello World!";
		document.getElementById('inner').innerHTML = (8).toString(2);
		
		//var V = SAT.Vector;
        //var C = SAT.Circle;
    
        //var circle1 = new C(new V(0,0), 20);
        //var circle2 = new C(new V(30,0), 20);
        //var response = new SAT.Response();
        //var collided = SAT.testCircleCircle(circle1, circle2, response);
    

	}
	
	f1();
}());
