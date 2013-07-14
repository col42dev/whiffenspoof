(function() {
	"use strict";
	

	/*
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
        
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        
        //ctx.fillStyle = "rgb(255, 0, 0)";  
        //ctx.fillRect(200, 50, 100, 100); 
        
        function Tile(x, y, w, h)
        {
            this.box = new SAT.Box(new SAT.Vector(x,y), w, h);
            
            this.draw = function () {
                ctx.fillStyle = "rgb(255, 0, 0)";  
                ctx.fillRect(this.box.pos.x, this.box.pos.y, this.box.w, this.box.h); 
                console.log( ">>>" + this.box.pos.x+ this.box.pos.y+ this.box.w+ this.box.h)
            };
    
        }
        
        var myTile = new Tile(100, 12, 100, 100);
        myTile.draw();
    
    });
    */
    require(["fabric/fabric"], function(fab) {
        
        var canvas = new fabric.Canvas('myCanvas');
        
        var rect1 = new fabric.Rect({
          width: 200, height: 100, left: 100, top: 100, angle: 0,
          fill: 'rgba(255,0,0,0.5)'
        });
        
        var rect2 = new fabric.Rect({
          width: 100, height: 100, left: 400, top: 300, angle: 0,
          fill: 'rgba(0,200,0,0.5)'
        });
        
        var rect3 = new fabric.Rect({
          width: 50, height: 100, left: 300, top: 400, angle: 0,
          stroke: '#eee', strokeWidth: 10,
          fill: 'rgba(0,0,200,0.5)'
        });
        
        var circle = new fabric.Circle({
          radius: 50, left: 300, top: 100, fill: '#aac'
        });
        
        var triangle = new fabric.Triangle({
          width: 100, height: 100, left: 100, top: 350, fill: '#cca'
        });
        
        canvas.add(rect1, rect2, rect3, circle, triangle);
        canvas.on({
          'object:moving': onChange,
          'object:scaling': onChange,
          'object:rotating': onChange,
        });
        
        function onChange(options) {
          options.target.setCoords();
          canvas.forEachObject(function(obj) {
            if (obj === options.target) return;
            obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
          });
        }
        
        var lastPos;
        canvas.on('object:moving', function(options) {

            if (options.target) {
               //console.log('an object was moved! ', options.target.type);
                
                canvas.forEachObject(function(obj) {
                    if (obj === options.target) return;
                    if (options.target.intersectsWithObject(obj)) {
                        options.target.set(lastPos);
                    }
                });
                
                lastPos = options.target.get();
                console.log(lastPos);
                
                lastPos = { width: options.target.width, height: options.target.height, left: options.target.left, top: options.target.top,  angle: options.target.angle, fill: options.target.fill };
            }
        });
        
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
