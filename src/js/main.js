(function() {
	"use strict";
	


    require(["sat-js/SAT"], function(util) {   


        
        var myCanvas=document.getElementById("myCanvas");
       
        //myCanvas.width = document.body.clientWidth; //document.width is obsolete
        //myCanvas.height = document.body.clientHeight; //document.height is obsolete
 
        var ctx=myCanvas.getContext("2d");
        
        
  
  
        var tileUnit = {x:60, y:60, w:60, h:60, b:2};


        var tiles = [];       
        tiles.push(new Tile(1, 1, 2, 2, "rgb(255, 255, 255)"));
        tiles.push(new Tile(3, 1, 2, 1, "rgb(0, 255, 0)"));   
        tiles.push(new Tile(3, 2, 2, 1, "rgb(0, 255, 0)"));
   
            
        tiles.push(new Tile(1, 3, 1, 1, "rgb(255, 255, 0)"));
        tiles.push(new Tile(2, 3, 1, 1, "rgb(0, 0, 0)"));
        tiles[tiles.length-1].selectionLocked = 1;
        tiles.push(new Tile(3, 3, 2, 1, "rgb(0, 255, 0)"));

        
        tiles.push(new Tile(1, 4, 1, 1, "rgb(255, 255, 0)"));
        tiles.push(new Tile(2, 4, 1, 1, "rgb(255, 255, 0)"));
        tiles.push(new Tile(3, 4, 2, 1, "rgb(0, 255, 0)"));
  
        tiles.push(new Tile(1, 5, 2, 1, "rgb(0, 255, 0)"));
        tiles.push(new Tile(3, 5, 2, 1, "rgb(0, 255, 0)"));
        
        tiles.push(new Tile(1, 6, 1, 2, "rgb(0, 0, 255)"));
        tiles.push(new Tile(2, 6, 1, 2, "rgb(0, 0, 255)"));
        tiles.push(new Tile(3, 6, 2, 1, "rgb(0, 255, 0)"));
        tiles.push(new Tile(3, 7, 1, 1, "rgb(0, 0, 0)"));
        tiles[tiles.length-1].selectionLocked = 1;
        tiles.push(new Tile(4, 7, 1, 1, "rgb(255, 255, 0)"));

        tiles.push(new Tile(1, 8, 1, 2, "rgb(0, 0, 255)"));
        tiles.push(new Tile(2, 8, 1, 2, "rgb(0, 0, 255)"));
 
       tiles.push(new Tile(0, 0, 6, 1, "rgb(0, 0, 0)"));
       tiles[tiles.length-1].selectionLocked = 1;
       tiles.push(new Tile(0, 0, 1, 11, "rgb(0, 0, 0)"));
       tiles[tiles.length-1].selectionLocked = 1;
       tiles.push(new Tile(0, 10, 6, 1, "rgb(0, 0, 0)"));
       tiles[tiles.length-1].selectionLocked = 1;
       tiles.push(new Tile(5, 0, 1, 11, "rgb(0, 0, 0)"));
       tiles[tiles.length-1].selectionLocked = 1;
 
       
        var collisionDetection = new CollisionDetection();
        
        function isTouchDevice(){
          return (typeof(window.ontouchstart) != 'undefined') ? true : false;
        }
        

        if (isTouchDevice()) {
            console.log("touch");
            var touchEventHandler = new TouchEventHandler(myCanvas);
            
           document.body.addEventListener('touchmove', function(event) { event.preventDefault();}, false); // prevent scrolling
        } else {
            console.log("mouse");
            var mouseEventHandler = new MouseEventHandler(myCanvas);
        }
        
 
        var timerMilliseconds = 20;
        var timerCallback = function() { 
            myTimer(timerMilliseconds); 
        };
        var myVar=setInterval(timerCallback, timerMilliseconds);

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
                 var collisionTile = collisionDetection.getCollisionTile(this.vol);
                 if (!collisionTile.selectionLocked) {
                    this.selectedTile = collisionTile;
                    if (this.selectedTile !== undefined) {
                       this.selectedTile.selectedTileOffset = { x: this.pos.x - this.selectedTile.box.pos.x,  y: this.pos.y - this.selectedTile.box.pos.y};
                     }
                 }
            }
            
            this.canvas.addEventListener("mouseup", doMouseUp.bind(this), false);
            function doMouseUp (event) {
                 this.setMousePos(event);
                 
                 if (this.selectedTile !== undefined) {
                    this.selectedTile.snapToGrid();
                    this.selectedTile = undefined;
                 }
            }
            
            this.canvas.addEventListener("mousemove", doMouseMove.bind(this), false);
            function doMouseMove (event) {
                this.setMousePos(event);
                collisionDetection.getCollisionTile(this.vol);
                //document.getElementById('mouseMoveEvent').innerHTML = event.which;
            }
            
            this.getPos = function () { 
                return this.pos;
            };
           
        }
        
        
        function TouchEventHandler( myCanvas ) {
            
            var _this = this;
            this.canvas = myCanvas;
            this.pos = {
                x : 0, 
                y : 0              
            };

            this.vol = new SAT.Circle(new SAT.Vector(0,0), 5);
            this.selectedTile = undefined;
            
            this.setTouchPos = function(event) {
                var rect = this.canvas.getBoundingClientRect();
                this.pos = { x: event.pageX - rect.left, y: event.pageY - rect.top};      
                this.vol.pos.x =     this.pos.x;    
                this.vol.pos.y =     this.pos.y; 
            };
            
 
            this.onTouchStarted = function (event) {
                 if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];                  
                    _this.setTouchPos(event); 

                    if (typeof collisionDetection !== "undefined") {  
                        var collisionTile = collisionDetection.getCollisionTile(_this.vol);
                        if (typeof collisionTile !== "undefined") { 
                            if (!collisionTile.selectionLocked) {
                                _this.selectedTile = collisionTile;
                                if (typeof _this.selectedTile !== "undefined") {
                                    _this.selectedTile.selectedTileOffset = { x: _this.pos.x - _this.selectedTile.box.pos.x,  y: _this.pos.y - _this.selectedTile.box.pos.y};
                                }
                            }
                        }
                    }
                 }
            };          
            this.canvas.addEventListener("touchstart", this.onTouchStarted, false);

       
            this.onTouchEnd =  function (event) {
                 //this.setTouchPos(event);
                    if (typeof _this.selectedTile !== "undefined") {
                        _this.selectedTile.snapToGrid();
                        _this.selectedTile = undefined;
                    }
            };
            this.canvas.addEventListener("touchend", this.onTouchEnd, false);
 
            
            this.onTouchMove = function(event) {
                 if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];
 
                    if (typeof _this.selectedTile !== "undefined") {
                        _this.setTouchPos(event);
                        collisionDetection.getCollisionTile(_this.vol);
                    }
                 }
            };
            this.canvas.addEventListener("touchmove", this.onTouchMove, true);
 
            
            this.getPos = function () { 
                return this.pos;
            };
           
        }
        
       
        function Tile(xUnit, yUnit, wUnit, hUnit, rgb)
        {      
            this.box = new SAT.Box(new SAT.Vector(60*xUnit,60*yUnit), 60*wUnit-2, 60*hUnit-2).toPolygon();
            this.w = 60*wUnit-2;
            this.h = 60*hUnit-2;
            this.selectedTileOffset = {
                x : 0, 
                y : 0              
            };
            this.rgb = rgb;
            this.selectionLocked = 0;

            
            this.draw = function () {
                ctx.fillStyle = this.rgb;  
                ctx.fillRect(this.box.pos.x, this.box.pos.y, this.w, this.h); 
                //console.log( ">>>" + this.box.pos.x+ this.box.pos.y+ this.box.w+ this.box.h);
            };
            
            this.setPos = function (pos) {
                this.box.pos.x = pos.x;
                this.box.pos.y = pos.y;
            };
            
            this.slideIncrement = 8;
            this._slideToAxis = function(axisBox, axisVar, tileOffset, axisTargetPos) {
                for (var slideIncrement = this.slideIncrement;  slideIncrement > 0; slideIncrement = slideIncrement - 1) {                      
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
            
            this.snapToGrid = function() {
                if ( this.box.pos.x % 60 < 60 / 2) {
                    this.box.pos.x = 60 * Math.floor(this.box.pos.x / 60);
                } else {
                    this.box.pos.x = 60 * Math.floor(this.box.pos.x / 60) + 60;
                }
                if ( this.box.pos.y % 60 < 60 / 2) {
                    this.box.pos.y = 60 * Math.floor(this.box.pos.y / 60);
                } else {
                    this.box.pos.y = 60 * Math.floor(this.box.pos.y / 60) + 60;
                }
            };
        }
        
  
       
        function myTimer( timerIntervalMilliseconds ) {
            //ctx.fillStyle = "rgb(255, 255, 255)";  
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
               tiles[tileIdx].draw();
            }
   
             
            if (typeof mouseEventHandler !== "undefined") {   
                console.log("meh");  
                var mousePos = mouseEventHandler.pos;
                document.getElementById('inner').innerHTML = "MOUSE: " + String(mousePos.x) + ", " + String(mousePos.y);
               
                if (typeof mouseEventHandler.selectedTile !== "undefined") {
                    mouseEventHandler.selectedTile.slideTo(mousePos);      
                }
            }
            
            if (typeof touchEventHandler !== "undefined") {   
                
                var touchPos = touchEventHandler.pos;
                document.getElementById('inner').innerHTML = "TOUCH: " + String(touchPos.x) + ", " + String(touchPos.y);
               
                if (typeof touchEventHandler.selectedTile !== "undefined") {
                    touchEventHandler.selectedTile.slideTo(touchPos);      
                }
            }
        }

    
    });

   
 

}());
