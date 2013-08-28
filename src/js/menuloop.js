(function() {
    "use strict";
        
     define(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   

        var menuLoop  = function MenuLoop($scope) {

            var _this = this;

            this.$scope = $scope;
           
     
            //TODO: modularise this initlization 
            this.myCanvas = document.getElementById("menuButtonCanvas");
            
            this.myCanvas.height = window.innerHeight; //document.body.clientHeight ; 
            this.myCanvas.width = window.innerWidth; //(this.myCanvas.height / 11)  * (6 + 2); //document.width is obsolete
            this.ctx = this.myCanvas.getContext("2d");

            this.myCanvas.style.userSelect = "none";
            this.myCanvas.style.webkitUserSelect = "none";
            this.myCanvas.style.MozUserSelect = "none";
            this.myCanvas.setAttribute("unselectable", "on"); 
             
            Tile.prototype.tileUnitSize = this.myCanvas.height / 11;
  
            this.gameState = new GameState($scope);
       

            this.tileBoardSize = {width:this.myCanvas.width/16, height:this.myCanvas.height/16};

            var rgbRed = "rgb(200, 0, 0)";
            var rgbGre = "rgb(0, 200, 0)";
            var rgbBlu = "rgb(0, 0, 200)";
            var rgbYel = "rgb(220, 220, 0)";
            var rgbBlk = "rgb(30, 30, 30)";
            this.tiles = [];       

            var width16th= this.tileBoardSize.width/16;
            var height16th= this.tileBoardSize.height/16;
            this.tiles.push(new Tile(width16th*6, height16th*3, width16th*4, height16th*2, rgbRed));
            this.tiles[this.tiles.length-1].text = "Play";

            this.tiles.push(new Tile(width16th*6, height16th*6, width16th*4, height16th*2, rgbRed));
            this.tiles[this.tiles.length-1].text = "Score";

            this.tiles.push(new Tile(width16th*6, height16th*9, width16th*4, height16th*2, rgbRed));
            this.tiles[this.tiles.length-1].text = "About";


            this.dirtyRect = { x : 0, y : 0, w : 0, h : 0};                    

            this.mainTimerCallback = function() { 
                 _this.mainTimer(); 
            };
            this.clearStyle = "rgba(0, 0, 0, 0.0)";


            if (typeof(window.ontouchstart) != 'undefined') {
                this.touchEventHandler = new TouchEventHandler(this.myCanvas, this.tiles, this.gameState);           
            } else {
                this.mouseEventHandler = new MouseEventHandler(this.myCanvas, this.tiles, this.gameState);
            }  
            this.ioEventHandlers = [this.mouseEventHandler, this.touchEventHandler];
    
            this.mainloopInterval = setInterval(this.mainTimerCallback, 20);  


            this.onResizeWindow = function onResize() {
                _this.flagResize = 1; 
            };
                            
            window.addEventListener("resize", _this.onResizeWindow, false);
            _this.flagResize = 1; 
        };


        menuLoop.prototype.onDestroy = function () {

            if ( this.mainTimerCallback !== undefined ) {
                clearInterval(this.mainloopInterval);
            }
            this.mainTimerCallback = undefined;
            window.removeEventListener("resize", this.onResizeWindow, false);
        };

        menuLoop.prototype.onResize = function () {
            
            this.myCanvas = document.getElementById("menuButtonCanvas");
            
            if (window.innerHeight/this.tileBoardSize.height < window.innerWidth/this.tileBoardSize.width){
                this.myCanvas.height = window.innerHeight * 1.0; //document.body.clientHeight ;
                this.myCanvas.width = window.innerWidth; //(this.myCanvas.height / 11)  * (6 + 2); 
                var oldTileUnitSize = Tile.prototype.tileUnitSize;

                Tile.prototype.tileUnitSize = this.myCanvas.height / this.tileBoardSize.height;
            } else {
                this.myCanvas.height = window.innerHeight; //document.body.clientHeight ;
                this.myCanvas.width = window.innerWidth * 1.0; //(this.myCanvas.height / 11)  * (6 + 2);
                var oldTileUnitSize = Tile.prototype.tileUnitSize;
            
                Tile.prototype.tileUnitSize = this.myCanvas.width / this.tileBoardSize.width;
            } 
            
            Tile.prototype.slideIncrement = Math.floor(Tile.prototype.tileUnitSize / 1);
            for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                this.tiles[tileIdx].resize(oldTileUnitSize);
            }    

            for (var tileIdx = 0;  tileIdx < this.tiles.length; tileIdx = tileIdx + 1) {
                 this.tiles[tileIdx].draw(this.ctx);
            }      
        };
 
           // returns Tile instance which collides with sat
           var getBoxBoxCollision = function (sat, myTiles) {              
                var response = new SAT.Response();
                for (var tileIdx = 0;  tileIdx < myTiles.length; tileIdx += 1) {
                    if (sat != myTiles[tileIdx].box) {
                        var collided = SAT.testPolygonPolygon(myTiles[tileIdx].box, sat, response);                    
                        if (collided) {
                            return myTiles[tileIdx];
                        }          
                    }
                }
                return undefined;
            }; 

        menuLoop.prototype.mainTimer = function( ) {

            // reorientate/resize view
             if ( this.flagResize) {
                 this.onResize();
                 this.flagResize = 0; 
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
                      this.clearStyle = "rgba(0, 0, 0, 0.0)";
                      this.ctx.fillStyle = this.clearStyle;
                      this.ctx.clearRect(this.dirtyRect.x, this.dirtyRect.y, this.dirtyRect.w, this.dirtyRect.h);
             
                      // move tile positon
                      if ( handler.flagSnapToGrid ) {
                        handler.selectedTile.snapToGrid();
                      } else {
                        handler.selectedTile.slideTo(touchPos, this.tiles); 
                      }

                       //draw target drop location
                       var dropLocation = new Tile(2, this.tileBoardSize.height - 4, handler.selectedTile.wUnit, handler.selectedTile.hUnit,  "rgba(30, 30, 30, 0.4)");
                       dropLocation.text = handler.selectedTile.text;

                       dropLocation.clear(this.ctx);
                       dropLocation.draw(this.ctx);
                       
                       // draw tile in new position
                       handler.selectedTile.draw(this.ctx);  
                       
                       // set dirty rect ready for next update
                       this.dirtyRect = handler.selectedTile.getDirtyRect();  

                       // handle deselected tile state
                       if ( handler.flagSnapToGrid ) {
                            handler.flagSnapToGrid = 0;

                            var collisionTile = getBoxBoxCollision(dropLocation.box, this.tiles);
                            if (typeof collisionTile !== "undefined") {
                                this.$scope.newgame();
                                this.$scope.$apply();   
                            }
                            handler.selectedTile = undefined;
                       }  
                      this.wasTileSelectedOnLastUpdate = 1;
                   } else {
                      this.wasTileSelectedOnLastUpdate = 0;
                   }
                 }
             } // forloop
            

         }; // myTimer()  
        
 
        
        return menuLoop;
                  
    }); //define
      
}()); //IFFE