(function() {
	"use strict";
	

    require(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState", "src/js/mainloop"], function(Tile, TouchEventHandler, MouseEventHandler, GameState, MainLoop) {   


        var touchEventHandler = undefined;
        var mouseEventHandler = undefined;
        var myCanvas=document.getElementById("myCanvas");  
        myCanvas.height = document.body.clientHeight ; //document.height is obsolete
        myCanvas.width = (myCanvas.height / 11)  * 6; //document.width is obsolete
        var ctx=myCanvas.getContext("2d");
        
        
        Tile.prototype.tileUnitSize = myCanvas.height / 11;
  

        var rgbRed = "rgb(200, 0, 0)";
        var rgbGre = "rgb(0, 200, 0)";
        var rgbBlu = "rgb(0, 0, 200)";
        var rgbYel = "rgb(220, 220, 0)";
        var rgbBlk = "rgb(30, 30, 30)";
        var tiles = [];       
        tiles.push(new Tile(1, 1, 2, 2, rgbRed));
        tiles.push(new Tile(3, 1, 2, 1, rgbGre));   
        tiles.push(new Tile(3, 2, 2, 1, rgbGre));
   
            
        tiles.push(new Tile(1, 3, 1, 1, rgbYel));
        tiles.push(new Tile(2, 3, 1, 1, rgbBlk));
        tiles[tiles.length-1].selectionLocked = 1;
        tiles.push(new Tile(3, 3, 2, 1, rgbGre));

        
        tiles.push(new Tile(1, 4, 1, 1, rgbYel));
        tiles.push(new Tile(2, 4, 1, 1, rgbYel));
        tiles.push(new Tile(3, 4, 2, 1, rgbGre));
  
        tiles.push(new Tile(1, 5, 2, 1, rgbGre));
        tiles.push(new Tile(3, 5, 2, 1, rgbGre));
        
        tiles.push(new Tile(1, 6, 1, 2, rgbBlu));
        tiles.push(new Tile(2, 6, 1, 2, rgbBlu));
        tiles.push(new Tile(3, 6, 2, 1, rgbGre));
        tiles.push(new Tile(3, 7, 1, 1, rgbBlk));
        tiles[tiles.length-1].selectionLocked = 1;
        tiles.push(new Tile(4, 7, 1, 1, rgbYel));

        tiles.push(new Tile(1, 8, 1, 2, rgbBlu));
        tiles.push(new Tile(2, 8, 1, 2, rgbBlu));
 
        tiles.push(new Tile(0, 0, 6, 1, rgbBlk));
        tiles[tiles.length-1].selectionLocked = 1;
        tiles.push(new Tile(0, 0, 1, 11, rgbBlk));
        tiles[tiles.length-1].selectionLocked = 1;
        tiles.push(new Tile(0, 10, 6, 1, rgbBlk));
        tiles[tiles.length-1].selectionLocked = 1;
        tiles.push(new Tile(5, 0, 1, 11, rgbBlk));
        tiles[tiles.length-1].selectionLocked = 1;
 
        var gameState = new GameState();
        

        if (typeof(window.ontouchstart) != 'undefined') {
            console.log("touch");
            touchEventHandler = new TouchEventHandler(myCanvas, tiles, gameState);           
        } else {
            console.log("mouse");
            mouseEventHandler = new MouseEventHandler(myCanvas, tiles, gameState);
        }
        
        var mainloop = new MainLoop(mouseEventHandler, touchEventHandler, tiles);

    });

}()); //IFFY
