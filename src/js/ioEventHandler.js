(function() {
    "use strict";
    
    define( ["src/js/tile", "src/js/collisionTile", "src/js/gameState"], function (Tile, getCollisionTile, GameState) {   
    
        var mEH = function ( myCanvas, myTiles, gameState) {
            this.pos = { x : 0, y : 0 };
            this.canvas = myCanvas;
            this.myTiles = myTiles;
            this.gameState = gameState;
            this.flagSnapToGrid = 0;
            this.vol = new SAT.Circle(new SAT.Vector(0,0), 5);
            this.selectedTile = undefined;           
            this.startMovePos = { x : 0,  y : 0 };
        };
        
        mEH.prototype.getPos = function () { 
            return this.pos;
        };
        
        mEH.prototype.setPos = function(sx, sy) {
            var rect = this.canvas.getBoundingClientRect();
            this.pos = { x: sx - rect.left, y: sy - rect.top};   
            this.vol.pos.x =     this.pos.x;    
            this.vol.pos.y =     this.pos.y; 
        };
        
        mEH.prototype.checkTouchingTile = function() {  
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
 
        return mEH;
        
     })
}());