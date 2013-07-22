(function() {
	"use strict";
	

    require(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler"], function(Tile, TouchEventHandler, MouseEventHandler) {   


        
        var myCanvas=document.getElementById("myCanvas");
       
        //myCanvas.width = document.body.clientWidth; //document.width is obsolete
        //myCanvas.height = document.body.clientHeight; //document.height is obsolete
 
        var ctx=myCanvas.getContext("2d");
        
        
  
  
        var tileUnit = {x:60, y:60, w:60, h:60, b:2};


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
 
       

        
        function isTouchDevice(){
          return (typeof(window.ontouchstart) != 'undefined') ? true : false;
        }
        

        if (isTouchDevice()) {
            console.log("touch");
            var touchEventHandler = new TouchEventHandler(myCanvas, tiles);
            
           document.body.addEventListener('touchmove', function(event) { event.preventDefault();}, false); // prevent scrolling
        } else {
            console.log("mouse");
            var mouseEventHandler = new MouseEventHandler(myCanvas, tiles);
        }
        
 
        var timerMilliseconds = 20;
        var timerCallback = function() { 
            myTimer(timerMilliseconds); 
        };
        var myVar=setInterval(timerCallback, timerMilliseconds);

        

       
        function myTimer( timerIntervalMilliseconds ) {
            //ctx.fillStyle = "rgb(255, 255, 255)";  
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
               tiles[tileIdx].draw(ctx);
            }
   
             
            if (typeof mouseEventHandler !== "undefined") {   

                var mousePos = mouseEventHandler.pos;
                document.getElementById('inner').innerHTML = "MOUSE: " + String(mousePos.x) + ", " + String(mousePos.y);
               
                if (typeof mouseEventHandler.selectedTile !== "undefined") {
                    mouseEventHandler.selectedTile.slideTo(mousePos, tiles);      
                }
            }
            
            if (typeof touchEventHandler !== "undefined") {   
                
                var touchPos = touchEventHandler.pos;
                document.getElementById('inner').innerHTML = "TOUCH: " + String(touchPos.x) + ", " + String(touchPos.y);
               
                if (typeof touchEventHandler.selectedTile !== "undefined") {
                    touchEventHandler.selectedTile.slideTo(touchPos, tiles);      
                }
            }
        }

    
    });

   
 

}()); //IFFY
