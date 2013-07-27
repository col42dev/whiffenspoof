(function() {
    "use strict";
    
    define( ["src/js/tile", "src/js/collisionTile", "src/js/gameState"], function (Tile, getCollisionTile) {   
    
        var mEH = function ( myCanvas, myTiles, gameState) {
                this.canvas = myCanvas;
                this.myTiles = myTiles;
                this.gameState = gameState;
                this.pos = {
                    x : 0, 
                    y : 0              
                };
                this.flagSnapToGrid = 0;

    
                this.vol = new SAT.Circle(new SAT.Vector(0,0), 5);
                this.selectedTile = undefined;
                this.canvas.addEventListener("mousedown", this.doMouseDown.bind(this), false);   
                this.canvas.addEventListener("mouseup", this.doMouseUp.bind(this), false); 
                this.canvas.addEventListener("mousemove", this.doMouseMove.bind(this), false);
            };
            
            mEH.prototype.getPos = function () { 
                 return this.pos;
            };
            
            mEH.prototype.startMovePos = {
                    x : 0, 
                    y : 0              
            };
                
            mEH.prototype.setMousePos = function(event) {
                var rect = this.canvas.getBoundingClientRect();
                this.pos = { x: event.clientX - rect.left, y: event.clientY - rect.top};      
                this.vol.pos.x =     this.pos.x;    
                this.vol.pos.y =     this.pos.y; 
            };
            
            mEH.prototype.doMouseDown = function (event) {
                if (typeof this.selectedTile !== "undefined") {
                    return;
                }
                this.setMousePos(event); 
                var collisionTile = getCollisionTile(this.vol, this.myTiles);
                if (typeof collisionTile !== "undefined") {
                    if (!collisionTile.selectionLocked) {
                        this.selectedTile = collisionTile;
                        if (this.selectedTile !== undefined) {
                            this.selectedTile.selectedTileOffset = { x: this.pos.x - this.selectedTile.box.pos.x,  y: this.pos.y - this.selectedTile.box.pos.y};
                            this.startMovePos.x = this.selectedTile.box.pos.x;
                            this.startMovePos.y = this.selectedTile.box.pos.y;
                        }
                    }                 
                }
            };
            
            mEH.prototype.doMouseMove = function  (event) {
                this.setMousePos(event);
            };
            
            mEH.prototype.doMouseUp = function (event) {
                this.setMousePos(event);   
                if (typeof this.selectedTile !== "undefined") {
                    this.flagSnapToGrid = 1;
                        
                    // increment move counter
                    if ((this.startMovePos.x !== this.selectedTile.box.pos.x) || (this.startMovePos.y !== this.selectedTile.box.pos.y)) {
                        this.gameState.moveCounter += 1;
                    }
                }
            };
                

            
            return mEH;
        
        }); //define

}()); //IFFY
        