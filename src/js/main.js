(function() {
	"use strict";
	

    require(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState", "src/js/mainloop"], function(Tile, TouchEventHandler, MouseEventHandler, GameState, MainLoop) {   


        var touchEventHandler = undefined;
        var mouseEventHandler = undefined;
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
            touchEventHandler = new TouchEventHandler(myCanvas, tiles, gameState);
            
           document.body.addEventListener('touchmove', function(event) { event.preventDefault();}, false); // prevent scrolling
        } else {
            console.log("mouse");
            mouseEventHandler = new MouseEventHandler(myCanvas, tiles, gameState);
        }
        
 
 

        
        var mainloop = new MainLoop(mouseEventHandler, touchEventHandler, tiles);

    });

}()); //IFFY
