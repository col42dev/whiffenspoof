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
        var tiles = [];
        
        tiles.push(new fabric.Rect({
          width: 60, height: 60, left: 40, top: 40, angle: 0,
          fill: 'rgba(255,0,0,0.5)'
        }));
        
        tiles.push(new fabric.Rect({
          width: 60, height: 120, left: 300, top: 70, angle: 0,
          fill: 'rgba(0,200,0,0.5)'
        }));
        
        tiles.push(new fabric.Rect({
          width: 120, height: 60, left: 70, top: 100, angle: 0,
          stroke: '#eee',
          fill: 'rgba(0,0,200,0.5)'
        }));
        
        tiles.push(new fabric.Rect({
          width: 120, height: 120, left: 300, top: 200, angle: 0,
          stroke: '#eee',
          fill: 'rgba(0,0,200,0.5)'
        }));
        

 

        //canvas.add(rect1, rect2, rect3);;
        for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
            canvas.add(tiles[tileIdx]);
        }
        
        function moving() {
            var lastFreePos  = null;
            var colliding = false;
            var mouse = undefined;
            var onMoving = function(options) {
               // console.log(".");
                options.target.setCoords();
          
                colliding = false;
                if (options.target) {
                    canvas.forEachObject(function(obj) {
                        if (obj === options.target) return;
                        if (options.target.intersectsWithObject(obj)) {
                            options.target.set(lastFreePos);
                            colliding = true;
                        } 
                    });
                            
 
                            
                    lastFreePos = { width: options.target.width, height: options.target.height, left: options.target.left, top: options.target.top,  angle: options.target.angle, fill: options.target.fill };
                    if (colliding) {
                        // try incremtal vertical step nearer to target
                        var testRect = new fabric.Rect(lastFreePos);
                        if ( options.target.top < mouse.y)
                        {
                            testRect.top = testRect.top + 1;
                        }
                        
                        if ( options.target.top > mouse.y)
                        {
                            testRect.top = testRect.top - 1;
                        }
                        testRect.setCoords();
                        var testColliding = false;
                        canvas.forEachObject(function(obj) {
                            if (obj === options.target) return;
                            if (testRect.intersectsWithObject(obj)) {
                                testColliding = true;
                            } 
                        });
                        if (testColliding === false) {
                            lastFreePos = { width: testRect.width, height: testRect.height, left: testRect.left, top: testRect.top,  angle: testRect.angle, fill: testRect.fill };                     
                        }
                        //testRect.top 
                    }
                    
                    if (colliding) {
                        // try incremtal horizontal step nearer to target
                    }
                }
            };
                    
        
            canvas.on({
              'object:moving': onMoving,
              'object:scaling': onChange,
              'object:rotating': onChange,
            });
            
            
            function onChange(options) {
              //options.target.setCoords();
              canvas.forEachObject(function(obj) {
                if (obj === options.target) return;
                obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
              });
            }
            
            
            /* Mousemove */
            canvas.observe('mouse:move', function(e) { mousemove(e); });
   
            function mousemove(e) {
                mouse = canvas.getPointer(e.e);
                //console.log(mouse.x + " " + mouse.y);
                document.getElementById('inner').innerHTML = mouse.x;
            }

       }
        
        moving();
        
        
   
        
        
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
