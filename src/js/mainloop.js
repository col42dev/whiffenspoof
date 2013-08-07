(function() {
    "use strict";
        
     define(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   

        var mainloop = function ( $scope ) {   
                   
            var _this = this;
            
            this.winState = 0;
            this.$scope = $scope;
           
     
            //TODO: modularise this initlization 
            this.myCanvas = document.getElementById("myCanvas");
            
            this.myCanvas.height = window.innerHeight; //document.body.clientHeight ; 
            this.myCanvas.width = window.innerWidth; //(this.myCanvas.height / 11)  * (6 + 2); //document.width is obsolete
            this.ctx = this.myCanvas.getContext("2d");
             
            // user-select: none; -webkit-user-select: none; -moz-user-select: none
            this.myCanvas.style.userSelect = "none";
            this.myCanvas.style.webkitUserSelect = "none";
            this.myCanvas.style.MozUserSelect = "none";
            this.myCanvas.setAttribute("unselectable", "on"); // For IE and Opera
                      
            // fit 11 tiles to device height
            Tile.prototype.tileUnitSize = this.myCanvas.height / 11;
                    
            this.createTiles();
        
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
            
            this.mainloopInterval = setInterval(this.mainTimerCallback, 20);  
            
            this.onResizeWindow = function onResize() {
                _this.flagResize = 1; 
            };
                            
            window.addEventListener("resize", _this.onResizeWindow, false);
        };
        
        mainloop.prototype.onDestroy = function () {

            if ( this.mainTimerCallback != undefined ) {
                clearInterval(this.mainloopInterval);
            }
            this.mainTimerCallback = undefined;
            window.removeEventListener("resize", this.onResizeWindow, false);
        };
        
       mainloop.prototype.createTilesDev = function () {
            
            var rgbRed = "rgb(200, 0, 0)";
            var rgbGre = "rgb(0, 200, 0)";
            var rgbBlu = "rgb(0, 0, 200)";
            var rgbYel = "rgb(220, 220, 0)";
            var rgbBlk = "rgb(30, 30, 30)";
            this.tiles = [];       
            this.tiles.push(new Tile(1, 1, 2, 2, rgbRed));
            this.tiles[this.tiles.length-1].red = 1;

            this.tiles.push(new Tile(2, 3, 1, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
     

            this.tiles.push(new Tile(1, 4, 1, 1, rgbYel));
            this.tiles.push(new Tile(2, 4, 1, 1, rgbYel));
            this.tiles.push(new Tile(3, 4, 2, 1, rgbGre));
 
 
            this.tiles.push(new Tile(3, 7, 1, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            
            this.tiles.push(new Tile(0, 0, 6, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(0, 0, 1, 11, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(0, 10, 6, 1, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
            this.tiles.push(new Tile(5, 0, 1, 11, rgbBlk));
            this.tiles[this.tiles.length-1].selectionLocked = 1;
        };
 
        mainloop.prototype.createTiles = function () {
            
            var rgbRed = "rgb(200, 0, 0)";
            var rgbGre = "rgb(0, 200, 0)";
            var rgbBlu = "rgb(0, 0, 200)";
            var rgbYel = "rgb(220, 220, 0)";
            var rgbBlk = "rgb(30, 30, 30)";
            this.tiles = [];       
            this.tiles.push(new Tile(1, 1, 2, 2, rgbRed));
            this.tiles[this.tiles.length-1].red = 1;
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
            this.myCanvas.width = window.innerWidth; //(this.myCanvas.height / 11)  * (6 + 2); 
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
        
        mainloop.prototype.onWin = function( ) {
            
            this.$scope.onShowTagEntry( this.gameState.moves() );
    
            var resplice = 1;
            
            while (resplice) {
                resplice = 0;
                for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                    if ( !this.tiles[tileIdx].selectionLocked ) {
                        if (!this.tiles[tileIdx].red) {
                            this.tiles.splice( tileIdx, 1 );
                            resplice = 1;
                            break;
                        }
                    
                    }
                } 
            }
            this.winState = 1;
            
        }
                      
        mainloop.prototype.mainTimer = function( ) {
            
             // Test win condition
             if ( this.gameState.hasWon() ) {
                 if ( this.winState == 0) {
                    this.onWin();
                 }
             }  
             
             // reorientate/resize view
             if ( this.flagResize) {
                 this.onResize();
                 this.flagResize = 0; 
                 this.gameState.flagMoveCounterRefresh = 1;
             }
             
             if ( this.gameState.flagMoveCounterRefresh ) {
                
                if ( this.gameState.moveCounter > 0) {
                    this.ctx.fillStyle = this.clearStyle;
                    this.ctx.fillRect(Tile.prototype.tileUnitSize * 6, 0, window.innerWidth - (Tile.prototype.tileUnitSize * 6), Tile.prototype.tileUnitSize * 2);
       
       
                    this.ctx.fillStyle = "Red";
                    var fontStr = "bold PSpx Verdana";
                    var fontPointSizeStr = (Tile.prototype.tileUnitSize * .9).toString();
               
                    this.ctx.font = fontStr.replace(/PS/g, fontPointSizeStr); 
                    this.ctx.textAlign = "right";
                    this.ctx.fillText(this.gameState.moveCounter.toString(), window.innerWidth - Tile.prototype.tileUnitSize/5,  Tile.prototype.tileUnitSize * 0.86 );
                    this.gameState.flagMoveCounterRefresh = 0;
                }
             }
                
             // for each IO event handler
             for ( var ioHandlerIndex=0; ioHandlerIndex<this.ioEventHandlers.length; ioHandlerIndex+=1) {
                 var handler = this.ioEventHandlers[ioHandlerIndex];
                 if (typeof handler !== "undefined") {   
            
                   var touchPos = handler.pos;
                  
                   if (typeof handler.selectedTile !== "undefined") {
                       if (!this.wasTileSelectedOnLastUpdate) {  // set dirtyRect to tile inital selection 
                           this.dirtyRect = handler.selectedTile.getDirtyRect(); 
                       }
                       
                       // clear old tile render
                       this.ctx.fillStyle = this.clearStyle;
                       this.ctx.fillRect(this.dirtyRect.x, this.dirtyRect.y, this.dirtyRect.w, this.dirtyRect.h);
             
                       // move tile positon
                       if ( handler.flagSnapToGrid ) {
                           handler.selectedTile.snapToGrid();
                           if( handler.selectedTile.testWinCondition()) {
                                this.gameState.win();
                           }
                       } else {
                           handler.selectedTile.slideTo(touchPos, this.tiles); 
                       }
                       
                       // draw tile in new position
                       handler.selectedTile.draw(this.ctx);  
                       
                       // set dirty rect ready for next update
                       this.dirtyRect = handler.selectedTile.getDirtyRect();   
                       
                       // handle deselected tile state
                       if ( handler.flagSnapToGrid ) {
                            handler.flagSnapToGrid = 0;
                            handler.selectedTile = undefined;
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