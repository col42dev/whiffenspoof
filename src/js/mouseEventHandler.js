(function() {
    "use strict";
    
    define( ["src/js/tile", "src/js/collisionTile", "src/js/gameState", "src/js/ioEventHandler"], function (Tile, getCollisionTile, GameState, IOEventHandler) {   
    
        var mEH = function ( myCanvas, myTiles, gameState) {
                IOEventHandler.call(this, myCanvas, myTiles, gameState);
                
                this.canvas.addEventListener("mousedown", this.doMouseDown.bind(this), false);   
                this.canvas.addEventListener("mouseup", this.doMouseUp.bind(this), false); 
                this.canvas.addEventListener("mousemove", this.doMouseMove.bind(this), false);
            };
            
            mEH.prototype = new IOEventHandler();
            
            
            mEH.prototype.doMouseDown = function (event) {
                if (typeof this.selectedTile !== "undefined") {
                    return;
                }
                this.setPos(event.clientX, event.clientY);              
                IOEventHandler.prototype.checkTouchingTile.call(this);
            };
            
            mEH.prototype.doMouseMove = function  (event) {
                if (typeof this.selectedTile !== "undefined") {
                    this.setPos(event.clientX, event.clientY);
                }
            };
            
            mEH.prototype.doMouseUp = function (event) {
                this.setPos(event.clientX, event.clientY);   
                if (typeof this.selectedTile !== "undefined") {
                    this.flagSnapToGrid = 1;
                        
                    // increment move counter
                    if ((this.startMovePos.x !== this.selectedTile.box.pos.x) || (this.startMovePos.y !== this.selectedTile.box.pos.y)) {
                        this.gameState.incrementMoveCounter();
                    }
                }
            };
                

            return mEH;
        
        }); //define

}()); //IFFY
        