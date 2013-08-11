(function() {
    "use strict";
    
    define( ["src/js/tile", "src/js/collisionTile", "src/js/gameState", "src/js/ioEventHandler"], function (Tile, getCollisionTile, GameState, IOEventHandler) {   
    
        var tEH = function ( myCanvas, myTiles, gameState ) {         
                var _this = this;
                
                IOEventHandler.call(this, myCanvas, myTiles, gameState);
    
                          
                this.canvas.addEventListener("touchstart", function (event) {
                    _this.onTouchStart(event);
                }, true);
 
                this.canvas.addEventListener("touchend", function (event) {
                    _this.onTouchEnd(event);
                }, true);         

                this.canvas.addEventListener("touchmove", function (event) {
                    _this.onTouchMove(event);
                }, true);
                
                // prevent scrolling
                document.body.addEventListener('touchmove', function(event) { event.preventDefault();}, false); 
            };
            
            tEH.prototype = new IOEventHandler();
  
            
            //proto type  
            tEH.prototype.onTouchStart = function(event) {
                if (typeof this.selectedTile !== "undefined") {
                    return;
                }
                if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];                  

                    this.setPos(event.pageX, event.pageY);                  
                    IOEventHandler.prototype.checkTouchingTile.call(this);
                }
            };
            
            tEH.prototype.onTouchMove = function(event) {
                if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];                  
                    if (typeof this.selectedTile !== "undefined") {
                         this.setPos(event.pageX, event.pageY);
                    }  
                }           
            };
            
            tEH.prototype.onTouchEnd = function(event) {
                if (typeof this.selectedTile !== "undefined") {
                    this.flagSnapToGrid = 1;
                    
                    // increment move counter
                    if (( this.startMovePos.x !== this.selectedTile.box.pos.x) || ( this.startMovePos.y !== this.selectedTile.box.pos.y)) {
                        this.gameState.incrementMoveCounter();
                    }
                }
            };

            return tEH;
                  
        }); //define

}()); //IFFE
        