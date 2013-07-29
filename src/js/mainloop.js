(function() {
    "use strict";
        
     define(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   

        var mainloop = function ( ) {   
                   
            var _this = this;
     
            //TODO: modularise this initlization 
            this.myCanvas = document.getElementById("myCanvas");
            
            this.myCanvas.height = window.innerHeight; //document.body.clientHeight ; 
            this.myCanvas.width = (this.myCanvas.height / 11)  * (6 + 2); //document.width is obsolete
            this.ctx = this.myCanvas.getContext("2d");
             
            // user-select: none; -webkit-user-select: none; -moz-user-select: none
            this.myCanvas.style.userSelect = "none";
            this.myCanvas.style.webkitUserSelect = "none";
            this.myCanvas.style.MozUserSelect = "none";
            this.myCanvas.setAttribute("unselectable", "on"); // For IE and Opera
            
            // fit 11 tiles to device height
            Tile.prototype.tileUnitSize = this.myCanvas.height / 11;
                    
            var rgbRed = "rgb(200, 0, 0)";
            var rgbGre = "rgb(0, 200, 0)";
            var rgbBlu = "rgb(0, 0, 200)";
            var rgbYel = "rgb(220, 220, 0)";
            var rgbBlk = "rgb(30, 30, 30)";
            this.tiles = [];       
            this.tiles.push(new Tile(1, 1, 2, 2, rgbRed));
            this.tiles.push(new Tile(3, 1, 2, 1, rgbGre));   
            this.tiles.push(new Tile(3, 2, 2, 1, rgbGre));
                
            this.tiles.push(new Tile(1, 3, 1, 1, rgbYel));
            this.tiles.push(new Tile(2, 3, 1, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(3, 3, 2, 1, rgbGre));
                 
            this.tiles.push(new Tile(1, 4, 1, 1, rgbYel));
            this.tiles.push(new Tile(2, 4, 1, 1, rgbYel));
            this.tiles.push(new Tile(3, 4, 2, 1, rgbGre));
            
            this.tiles.push(new Tile(1, 5, 2, 1, rgbGre));
            this.tiles.push(new Tile(3, 5, 2, 1, rgbGre));
            
            this.tiles.push(new Tile(1, 6, 1, 2, rgbBlu));
            this.tiles.push(new Tile(2, 6, 1, 2, rgbBlu));
            this.tiles.push(new Tile(3, 6, 2, 1, rgbGre));
            this.tiles.push(new Tile(3, 7, 1, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(4, 7, 1, 1, rgbYel));
            
            this.tiles.push(new Tile(1, 8, 1, 2, rgbBlu));
            this.tiles.push(new Tile(2, 8, 1, 2, rgbBlu));
            
            this.tiles.push(new Tile(0, 0, 6, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(0, 0, 1, 11, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(0, 10, 6, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(5, 0, 1, 11, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            
            this.gameState = new GameState();
   
            if (typeof(window.ontouchstart) != 'undefined') {
                //console.log("touch");
                this.touchEventHandler = new TouchEventHandler(this.myCanvas, this.tiles, this.gameState);           
            } else {
                //console.log("mouse");
                this.mouseEventHandler = new MouseEventHandler(this.myCanvas, this.tiles, this.gameState);
            }              
            
            this.dirtyRect = { x : 0, y : 0, w : 0, h : 0};                    
            this.wasTileSelectedOnLastUpdate = 0;
            this.ioEventHandlers = [this.mouseEventHandler, this.touchEventHandler];
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
            this.myCanvas = document.getElementById("myCanvas");
            this.myCanvas.height = window.innerHeight; //document.body.clientHeight ; 
            this.myCanvas.width = (this.myCanvas.height / 11)  * (6 + 2); 
            var oldTileUnitSize = Tile.prototype.tileUnitSize;

            Tile.prototype.tileUnitSize = this.myCanvas.height / 11;
            
            Tile.prototype.slideIncrement = Math.floor(Tile.prototype.tileUnitSize / 3);
            for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                this.tiles[tileIdx].resize(oldTileUnitSize);
            }    
            this.redraw();      
            

            this.ctx.fillStyle = "Red";
            var fontStr = "bold PSpx Verdana";
            var fontPointSizeStr = Tile.prototype.tileUnitSize.toString();
            
            this.ctx.textAlign = 'left';
            this.ctx.font = fontStr.replace(/PS/g, fontPointSizeStr);
            this.ctx.fillText("Red", 2,  Tile.prototype.tileUnitSize * 0.86);
            
            
            fontStr = "italic bold PSpx Verdana";
            fontPointSizeStr = Tile.prototype.tileUnitSize.toString();
            this.ctx.font = fontStr.replace(/PS/g, fontPointSizeStr);
            
            this.ctx.textAlign = 'right';
            this.ctx.shadowColor="rgb(220,0,0)";
            this.ctx.shadowOffsetX=-7;
            this.ctx.shadowBlur=10;
            this.ctx.fillText("SHIFT", (Tile.prototype.tileUnitSize * 6)-10,  (Tile.prototype.tileUnitSize * 10) + Tile.prototype.tileUnitSize * 0.86);
            this.ctx.shadowBlur=0;
            this.ctx.shadowOffsetX=0;
            this.ctx.shadowColor="rgba(255,255,255,0.0)";
            this.ctx.fillStyle="White";
        };
                      
        mainloop.prototype.mainTimer = function( ) {
        
             // reorientate/resize view
             if ( this.flagResize) {
                 this.onResize();
                 this.flagResize = 0; 
                 this.gameState.flagMoveCounterRefresh = 1;
             }
             
             if ( this.gameState.flagMoveCounterRefresh ) {
                 
                this.ctx.fillStyle = this.clearStyle;
                this.ctx.fillRect(Tile.prototype.tileUnitSize * 6, 0, Tile.prototype.tileUnitSize * 2, Tile.prototype.tileUnitSize * 2);
   
   
                this.ctx.fillStyle = "Red";
                var fontStr = "bold PSpx Verdana";
                var fontPointSizeStr = (Tile.prototype.tileUnitSize * .9).toString();
           
                this.ctx.font = fontStr.replace(/PS/g, fontPointSizeStr); 
                this.ctx.textAlign = "left";
                this.ctx.fillText(this.gameState.moveCounter.toString(), (Tile.prototype.tileUnitSize * 6),  Tile.prototype.tileUnitSize );
                this.gameState.flagMoveCounterRefresh = 0;
 
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