(function() {
	"use strict";
	

    require(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   


        
        var myCanvas=document.getElementById("myCanvas");
       
       myCanvas.height = document.body.clientHeight ; //document.height is obsolete
       myCanvas.width = (myCanvas.height / 11)  * 6; //document.width is obsolete
 
        //myCanvas.width =  80 * 6; //document.width is obsolete
        //myCanvas.height =  80 * 11; //document.height is obsolete
 

 
        var ctx=myCanvas.getContext("2d");
        
        
        Tile.prototype.tileUnitSize = myCanvas.height / 11;
  

        var tiles = [];       
        tiles.push(new Tile(1, 1, 2, 2, "rgb(255, 0, 0)"));
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
 
       

        var gameState = new GameState();
        
        function isTouchDevice(){
          return (typeof(window.ontouchstart) != 'undefined') ? true : false;
        }
        

        if (isTouchDevice()) {
            console.log("touch");
            var touchEventHandler = new TouchEventHandler(myCanvas, tiles, gameState);
            
           document.body.addEventListener('touchmove', function(event) { event.preventDefault();}, false); // prevent scrolling
        } else {
            console.log("mouse");
            var mouseEventHandler = new MouseEventHandler(myCanvas, tiles, gameState);
        }
        
 
        var timerMilliseconds = 20;
        var timerCallback = function() { 
            myTimer(timerMilliseconds); 
        };
        var myVar=setInterval(timerCallback, timerMilliseconds);

        function drawAll() {
             ctx.fillStyle = "rgb(255, 255, 255)";  
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
               tiles[tileIdx].draw(ctx);
            }       
        }
        
        drawAll();
        

         var dirtyRect = {
                    x : 0,
                    y : 0,
                    w : 0,
                    h : 0
                };
        var wasTileSelectedOnLastUpdate = 0;
                
        function myTimer( timerIntervalMilliseconds ) {

   
             
            if (typeof mouseEventHandler !== "undefined") {   

                var mousePos = mouseEventHandler.pos;
                //document.getElementById('inner').innerHTML = "MOUSE: " + String(mousePos.x) + ", " + String(mousePos.y);
               
                if (typeof mouseEventHandler.selectedTile !== "undefined") {
                    if (!wasTileSelectedOnLastUpdate) {  // set dirtyRect to tile inital selection 
                        dirtyRect = mouseEventHandler.selectedTile.getDirtyRect(); 
                    }
                    // clear old tile render
                    ctx.clearRect(dirtyRect.x, dirtyRect.y, dirtyRect.w, dirtyRect.h);
    
                    // move tile positon
                    if ( mouseEventHandler.flagSnapToGrid ) {
                        mouseEventHandler.selectedTile.snapToGrid();               
                    } else {
                        mouseEventHandler.selectedTile.slideTo(mousePos, tiles); 
                    }
                    
                    // draw tile in new position
                    mouseEventHandler.selectedTile.draw(ctx);  
                    
                    // set dirty rect ready for next update
                    dirtyRect = mouseEventHandler.selectedTile.getDirtyRect();   
                    
                    // handle deselected tile state
                    if ( mouseEventHandler.flagSnapToGrid ) {
                         mouseEventHandler.flagSnapToGrid = 0;
                         mouseEventHandler.selectedTile = undefined;
                    } 
                    wasTileSelectedOnLastUpdate = 1;
                } else {
                    wasTileSelectedOnLastUpdate = 0;
                }
            }
            
            if (typeof touchEventHandler !== "undefined") {   
                
                var touchPos = touchEventHandler.pos;
                //document.getElementById('inner').innerHTML = "TOUCH: " + String(touchPos.x) + ", " + String(touchPos.y);
                
                if (typeof touchEventHandler.selectedTile !== "undefined") {
                    if (!wasTileSelectedOnLastUpdate) {  // set dirtyRect to tile inital selection 
                        dirtyRect = touchEventHandler.selectedTile.getDirtyRect(); 
                    }
                    // clear old tile render
                    ctx.clearRect(dirtyRect.x, dirtyRect.y, dirtyRect.w, dirtyRect.h);
    
                    // move tile positon
                    if ( touchEventHandler.flagSnapToGrid ) {
                        touchEventHandler.selectedTile.snapToGrid();               
                    } else {
                        touchEventHandler.selectedTile.slideTo(touchPos, tiles); 
                    }
                    
                    // draw tile in new position
                    touchEventHandler.selectedTile.draw(ctx);  
                    
                    // set dirty rect ready for next update
                    dirtyRect = touchEventHandler.selectedTile.getDirtyRect();   
                    
                    // handle deselected tile state
                    if ( touchEventHandler.flagSnapToGrid ) {
                         touchEventHandler.flagSnapToGrid = 0;
                         touchEventHandler.selectedTile = undefined;
                    } 
                    wasTileSelectedOnLastUpdate = 1;
                } else {
                    wasTileSelectedOnLastUpdate = 0;
                }
            }
            
            //document.getElementById('moveCounter').innerHTML = gameState.moveCounter;
        }

    
    });

   
 

}()); //IFFY
