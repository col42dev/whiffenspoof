(function() {
	"use strict";
	


    require(["sat-js/SAT"], function(util) {   


        
        var myCanvas=document.getElementById("myCanvas");
        var ctx=myCanvas.getContext("2d");
        
        
  
  
        var tiles = [];       
        tiles.push(new Tile(1, 1, 60, 60));
        tiles.push(new Tile(61, 1, 60, 60));   
        tiles.push(new Tile(121, 1, 60, 120));
        tiles.push(new Tile(1, 121, 120, 60));        
        tiles.push(new Tile(1, 201, 120, 120));
        
        var collisionDetection = new CollisionDetection();
        var mouseEventHandler = new MouseEventHandler(myCanvas);
 
        var timerMilliseconds = 20;
        var myVar=setInterval(function(){myTimer(timerMilliseconds);}, timerMilliseconds);

        function CollisionDetection() {
           // returns Tile instance which collides with sat
           this.getCollisionTile = function (sat) {              
                var response = new SAT.Response();
                document.getElementById('collide').innerHTML = "---";
                for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
                    if (sat != tiles[tileIdx].box) {
                        var collided = SAT.testPolygonCircle(tiles[tileIdx].box, sat, response);                    
                        if (collided) {
                            document.getElementById('collide').innerHTML = "Collide";
                            return tiles[tileIdx];
                        }          
                    }
                }
                return undefined;
            };  
            // true if sat collides with a Tile
            this.tileCollisionCheck = function (sat) {              
                var response = new SAT.Response();
                for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
                    if (sat != tiles[tileIdx].box) {
                        var collided = SAT.testPolygonPolygon(tiles[tileIdx].box, sat, response);                    
                        if (collided) {
                            return true;
                        }    
                    }      
                }
                return undefined;
            };
        }
        
           
        function MouseEventHandler( myCanvas ) {
            
            this.canvas = myCanvas;
            this.pos = {
                x : 0, 
                y : 0              
            };

            this.vol = new SAT.Circle(new SAT.Vector(0,0), 5);
            this.selectedTile = undefined;
            
            this.setMousePos = function(event) {
                var rect = this.canvas.getBoundingClientRect();
                this.pos = { x: event.clientX - rect.left, y: event.clientY - rect.top};      
                this.vol.pos.x =     this.pos.x;    
                this.vol.pos.y =     this.pos.y; 
            };
            

            this.canvas.addEventListener("mousedown", doMouseDown.bind(this), false);
            function doMouseDown (event) {
                 this.setMousePos(event); 
                 this.selectedTile = collisionDetection.getCollisionTile(this.vol);
                 if (this.selectedTile) {
                    this.selectedTile.selectedTileOffset = { x: this.pos.x - this.selectedTile.box.pos.x,  y: this.pos.y - this.selectedTile.box.pos.y};
                 }
            }
            
            this.canvas.addEventListener("mouseup", doMouseUp.bind(this), false);
            function doMouseUp (event) {
                 this.setMousePos(event);
                 this.selectedTile = undefined;
            }
            
            this.canvas.addEventListener("mousemove", doMouseMove.bind(this), false);
            function doMouseMove (event) {
                this.setMousePos(event);
                collisionDetection.getCollisionTile(this.vol);

            }
            
            this.getPos = function () { 
                return this.pos;
            };
           
        }
        
       
        function Tile(x, y, w, h)
        {
            this.box = new SAT.Box(new SAT.Vector(x,y), w, h).toPolygon();
            this.w = w;
            this.h = h;
            this.selectedTileOffset = {
                x : 0, 
                y : 0              
            };
            
            this.draw = function () {
                ctx.fillStyle = "rgb(255, 0, 0)";  
                ctx.fillRect(this.box.pos.x, this.box.pos.y, this.w, this.h); 
                //console.log( ">>>" + this.box.pos.x+ this.box.pos.y+ this.box.w+ this.box.h);
            };
            
            this.setPos = function (pos) {
                this.box.pos.x = pos.x;
                this.box.pos.y = pos.y;
            };
            
            this._slideToAxis = function(axisBox, axisVar, tileOffset, axisTargetPos) {
                for (var slideIncrement = 4;  slideIncrement > 0; slideIncrement = slideIncrement - 1) {                      
                    if (Math.abs(axisBox.pos[axisVar] + tileOffset - axisTargetPos) < slideIncrement) {
                        continue; // within slideInrment of target, try smaller slideIncrement
                    }
                    var preIncrementPos = axisBox.pos[axisVar];
                    if (axisBox.pos[axisVar] + tileOffset < axisTargetPos) {
                        axisBox.pos[axisVar] += slideIncrement;
                    }
                    else if (axisBox.pos[axisVar] + tileOffset > axisTargetPos) {
                        axisBox.pos[axisVar] -= slideIncrement;
                    }     
                    if (collisionDetection.tileCollisionCheck(this.box)) {
                        axisBox.pos[axisVar] = preIncrementPos;
                    } else {
                        break;
                    }
                }
            };
  

            this.slideTo = function(targetPos) {
                this._slideToAxis(this.box, 'x', this.selectedTileOffset.x, targetPos.x);
                this._slideToAxis(this.box, 'y', this.selectedTileOffset.y, targetPos.y);
            };
        }
        
  
       
        function myTimer( timerIntervalMilliseconds ) {
            //ctx.fillStyle = "rgb(255, 255, 255)";  
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
                tiles[tileIdx].draw();
                //tiles[tileIdx].box.pos.x ++;
            }
   
            var mousePos = mouseEventHandler.pos;
            document.getElementById('inner').innerHTML = "MOUSE: " + String(mousePos.x) + ", " + String(mousePos.y);
                
            if (mouseEventHandler.selectedTile) {
                mouseEventHandler.selectedTile.slideTo(mousePos);      
            }
        }

    
    });

   
   /*
    require(["fabric/fabric"], function(fab) {
        
        var canvas = new fabric.Canvas('myCanvas');
        var tiles = [];
        
        tiles.push(new fabric.Rect({
          width: 60, height: 60, left: 40, top: 40, angle: 0,
          fill: 'rgba(255,0,0,0.5)'
        }));
        
        tiles.push(new fabric.Rect({
          width: 60, height: 60, left: 300, top: 70, angle: 0,
          fill: 'rgba(0,200,0,0.5)'
        }));
        

        

        //canvas.add(rect1, rect2, rect3);;
        for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
            canvas.add(tiles[tileIdx]);
        }
        
        var mouse = undefined;
        
        var tilePointerOffset = {
            x: 0,
            y: 0
        };
        
        var selTarget = undefined;
        var lastFreePos  = undefined;
        var colliding = false;
  
        var myVar=setInterval(function(){myTimer();},200);

        function myTimer() {
            
                if ( mouse)
                {
                    document.getElementById('inner').innerHTML = "MOUSE: " + mouse.x + ", " + mouse.y;
                }
          
                if (selTarget) {
                    document.getElementById('target').innerHTML = selTarget.left + ", " + selTarget.top;
                    document.getElementById('offset').innerHTML =  "OFFSET:" + String(tilePointerOffset.x) + "," + String(tilePointerOffset.y);
   
                    
                    canvas.forEachObject(function(obj) {
                        if (obj === selTarget) return;
                        if (selTarget.intersectsWithObject(obj)) {
                            //options.target.set(lastFreePos);
                            //colliding = true;
                        } 
                    });
                            
 
                            
      
                        // try incremtal vertical step nearer to target
                        var testRect = new fabric.Rect(lastFreePos);
                       if ( selTarget.top + tilePointerOffset.y  < mouse.y)
                        {
                            testRect.top = testRect.top + 1;
 
                        }
                        
                        if ( selTarget.top + tilePointerOffset.y  > mouse.y)
                        {
                            testRect.top = testRect.top - 1;
                            
                        }
                        testRect.setCoords();
                        console.log(testRect.top);
                        
                        //var freeTestRect = new fabric.Rect(lastFreePos);
                        //freeTestRect.setCoords();
  
                        var testColliding = false;
                        canvas.forEachObject(function(obj) {
                            if (obj === selTarget) return;
                            if (testRect.intersectsWithObject(obj)) {
                                testColliding = true;
                                 document.getElementById('collide').innerHTML = "Collide";
                            } 
                        });
                        
  
   
                        if (testColliding) {
                            //lastFreePos = { width: freeTestRect.width, height: freeTestRect.height, left: freeTestRect.left, top: freeTestRect.top,  angle: freeTestRect.angle, fill: freeTestRect.fill };
 
                        } else{
                             
                            lastFreePos = { width: testRect.width, height: testRect.height, left: testRect.left, top: testRect.top,  angle: testRect.angle, fill: testRect.fill };
                           
                        }
                        
                        target.set(lastFreePos);    
                        target.setCoords();                 

                    

                        // try incremtal horizontal step nearer to target

                }
       
        }

        function moving() {
            //var lastFreePos  = null;
            var colliding = false;
            var onMoving = function(options) {
               // console.log(".");
                //options.target.setCoords();
                
          
                if (options.target) {
    
                   
                        options.target.set(lastFreePos);    
                        options.target.setCoords();        
                        
                        selTarget = options.target;         

                    

                        // try incremtal horizontal step nearer to target

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
            
            
            // Mousemove 
            canvas.observe('mouse:move', function(e) { mousemove(e); });
   
            function mousemove(e) {
                mouse = canvas.getPointer(e.e);
                //console.log(mouse.x + " " + mouse.y);
                
            }
            
            // Mouseup
            canvas.observe('mouse:up', function(e) { mouseup(e); });
   
            function mouseup(e) {
                selTarget = undefined;
            }
   
   
            // Mousedown 
            canvas.observe('mouse:down', function(e) { mousedown(e); });
   
            function mousedown(e) {
                //mouse = canvas.getPointer(e.e);
                //console.log(mouse.x + " " + mouse.y);
                //document.getElementById('inner').innerHTML = mouse.x + ", " + mouse.y;
                mouse = canvas.getPointer(e.e);
                
                canvas.forEachObject(function(obj) {
                    if (mouse.x > obj.left - obj.width  / 2 ) {
                        if ( mouse.x < obj.left + obj.width  / 2 ) {
 
                            
                            if (mouse.y > obj.top - obj.height  / 2 ) {
                                if ( mouse.y < obj.top + obj.height  / 2 ) {
                                    tilePointerOffset.x = mouse.x - obj.left;
                                    tilePointerOffset.y = mouse.y - obj.top;
                                    selTarget = obj;
                                    lastFreePos = { width: selTarget.width, height: selTarget.height, left: selTarget.left, top: selTarget.top,  angle: selTarget.angle, fill: selTarget.fill };
 
                                    console.log("mousedown");
                                    console.log(lastFreePos.left);
                                    return;
                                    
                                }
                            } 
                        }
                    } 
                    
 
                });
            }

       }
        
        moving();
        
        
   
        
        
    });
    */

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
