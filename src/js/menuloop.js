(function() {
    "use strict";
        
     define(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   

        var menuLoop  = function MenuLoop($scope) {
            console.log("MenuLoop");

            var _this = this;

           this.$scope = $scope;
           
     
            //TODO: modularise this initlization 
            this.myCanvas = document.getElementById("redshiftCanvas");
            
            this.myCanvas.height = window.innerHeight; //document.body.clientHeight ; 
            this.myCanvas.width = window.innerWidth; //(this.myCanvas.height / 11)  * (6 + 2); //document.width is obsolete
            this.ctx = this.myCanvas.getContext("2d");

            this.myCanvas.style.userSelect = "none";
            this.myCanvas.style.webkitUserSelect = "none";
            this.myCanvas.style.MozUserSelect = "none";
            this.myCanvas.setAttribute("unselectable", "on"); 
             
            Tile.prototype.tileUnitSize = this.myCanvas.height / 11;
  
            this.gameState = new GameState($scope);
       

            this.tileBoardSize = {width:6, height:7};

            var rgbRed = "rgb(200, 0, 0)";
            var rgbGre = "rgb(0, 200, 0)";
            var rgbBlu = "rgb(0, 0, 200)";
            var rgbYel = "rgb(220, 220, 0)";
            var rgbBlk = "rgb(30, 30, 30)";
            this.tiles = [];       
            this.tiles.push(new Tile(1, 1, 2, 2, rgbRed));

            this.tiles.push(new Tile(2, 3, 1, 1, rgbBlk));

            this.dirtyRect = { x : 0, y : 0, w : 0, h : 0};                    
            this.wasTileSelectedOnLastUpdate = 0;

            this.mainTimerCallback = function() { 
                 _this.mainTimer(); 
            };
            this.clearStyle = "rgb(200, 200, 200)";


            if (typeof(window.ontouchstart) != 'undefined') {
                this.touchEventHandler = new TouchEventHandler(this.myCanvas, this.tiles, this.gameState);           
            } else {
                this.mouseEventHandler = new MouseEventHandler(this.myCanvas, this.tiles, this.gameState);
                //this.mouseEventHandler.selectedTile = this.tiles[0];
                console.log(this.mouseEventHandler);
            }  
            this.ioEventHandlers = [this.mouseEventHandler, this.touchEventHandler];
  

    
            this.mainloopInterval = setInterval(this.mainTimerCallback, 20);  
        };

        menuLoop.prototype.mainTimer = function( ) {

          
            Tile.prototype.slideIncrement = Math.floor(Tile.prototype.tileUnitSize / 3);
            /*
            for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                this.tiles[tileIdx].resize(oldTileUnitSize);
            } */   
             for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                 this.tiles[tileIdx].draw(this.ctx);
             }  
                
             // for each IO event handler
             for ( var ioHandlerIndex=0; ioHandlerIndex<this.ioEventHandlers.length; ioHandlerIndex+=1) {
                 var handler = this.ioEventHandlers[ioHandlerIndex];
                 if (typeof handler !== "undefined") {   
            
                   var touchPos = handler.pos;

                   //console.log(".");
                  
                   if (typeof handler.selectedTile !== "undefined") {
                        //console.log(".");
                       if (!this.wasTileSelectedOnLastUpdate) {  // set dirtyRect to tile inital selection 
                           this.dirtyRect = handler.selectedTile.getDirtyRect(); 
                       }
                       
                       // clear old tile render
                       this.ctx.fillStyle = this.clearStyle;
                       this.ctx.fillRect(this.dirtyRect.x, this.dirtyRect.y, this.dirtyRect.w, this.dirtyRect.h);
             
                       // move tile positon

                        handler.selectedTile.slideTo(touchPos, this.tiles); 
                       
                       // draw tile in new position
                       handler.selectedTile.draw(this.ctx);  
                       
                       // set dirty rect ready for next update
                       this.dirtyRect = handler.selectedTile.getDirtyRect();   
                       

                   }
                 }
             } // forloop
            

         }; // myTimer()  
        
        menuLoop.prototype.onDestroy = function () {

        };
        
        return menuLoop;
                  
    }); //define
      
}()); //IFFE