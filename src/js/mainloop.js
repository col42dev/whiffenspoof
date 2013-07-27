(function() {
    "use strict";
        
     define(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   

         var mainloop = function ( mouseEventHandler, touchEventHandler, tiles) {         
              var _this = this;
              this.tiles = tiles;
              this.mouseEventHandler=mouseEventHandler;
              this.touchEventHandler=touchEventHandler;    
              this.myCanvas = document.getElementById("myCanvas");
              this.ctx = myCanvas.getContext("2d");
              this.dirtyRect = { x : 0, y : 0, w : 0, h : 0};                    
              this.wasTileSelectedOnLastUpdate = 0;
              this.ioEventHandlers = [mouseEventHandler, touchEventHandler];
              this.flagResize = 1;
              this.mainTimerCallback = function() { 
                   _this.mainTimer(); 
              };
              this.clearStyle = "rgb(200, 200, 200)";
              
              setInterval(this.mainTimerCallback, 20);              
              window.addEventListener("resize", function() {
                    _this.flagResize = 1;
                    }, false);
        };
        
        mainloop.prototype.redraw = function () {
             this.ctx.fillStyle = this.clearStyle;  
             this.ctx.fillRect(0, 0, this.myCanvas.width, this.myCanvas.height);
             for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                 this.tiles[tileIdx].draw(this.ctx);
             }         
        };
              
        mainloop.prototype.onResize = function () {
            this.myCanvas.height = document.body.clientHeight ; 
            this.myCanvas.width = (this.myCanvas.height / 11)  * 6; 
            var oldTileUnitSize = Tile.prototype.tileUnitSize;
            Tile.prototype.tileUnitSize = this.myCanvas.height / 11;
            Tile.prototype.slideIncrement = Math.floor(Tile.prototype.tileUnitSize / 3);
            for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                this.tiles[tileIdx].resize(oldTileUnitSize);
            }    
            this.redraw();              
        };
                      
        mainloop.prototype.mainTimer = function( ) {
        
             // reorientate/resize view
             if ( this.flagResize) {
                 this.onResize();
                 this.flagResize = 0; 
             }
                
             // for each IO event handler
             for ( var ioHandlerIndex=0; ioHandlerIndex<this.ioEventHandlers.length; ioHandlerIndex+=1) {
                 if (typeof this.ioEventHandlers[ioHandlerIndex] !== "undefined") {   
            
                   var touchPos = this.ioEventHandlers[ioHandlerIndex].pos;
                  
                   if (typeof this.ioEventHandlers[ioHandlerIndex].selectedTile !== "undefined") {
                       if (!this.wasTileSelectedOnLastUpdate) {  // set dirtyRect to tile inital selection 
                           this.dirtyRect = this.ioEventHandlers[ioHandlerIndex].selectedTile.getDirtyRect(); 
                       }
                       // clear old tile render
                       this.ctx.fillStyle = this.clearStyle;
                       this.ctx.fillRect(this.dirtyRect.x, this.dirtyRect.y, this.dirtyRect.w, this.dirtyRect.h);
             
                       // move tile positon
                       if ( this.ioEventHandlers[ioHandlerIndex].flagSnapToGrid ) {
                           this.ioEventHandlers[ioHandlerIndex].selectedTile.snapToGrid();               
                       } else {
                           this.ioEventHandlers[ioHandlerIndex].selectedTile.slideTo(touchPos, this.tiles); 
                       }
                       
                       // draw tile in new position
                       this.ioEventHandlers[ioHandlerIndex].selectedTile.draw(this.ctx);  
                       
                       // set dirty rect ready for next update
                       this.dirtyRect = this.ioEventHandlers[ioHandlerIndex].selectedTile.getDirtyRect();   
                       
                       // handle deselected tile state
                       if ( this.ioEventHandlers[ioHandlerIndex].flagSnapToGrid ) {
                            this.ioEventHandlers[ioHandlerIndex].flagSnapToGrid = 0;
                            this.ioEventHandlers[ioHandlerIndex].selectedTile = undefined;
                       } 
                       this.wasTileSelectedOnLastUpdate = 1;
                   } else {
                       this.wasTileSelectedOnLastUpdate = 0;
                   }
                 }
             } // forloop
            
         }; // myTimer()  

         return mainloop;
                      }); //define      }()); //IFFY