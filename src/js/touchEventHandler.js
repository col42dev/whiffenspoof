(function() {
    "use strict";
    

    
    define( ["src/js/tile", "src/js/collisionTile"], function (Tile, getCollisionTile) {   
    
        var tEH = function ( myCanvas, myTiles ) {         
                var _this = this;
                this.canvas = myCanvas;
                this.myTiles = myTiles;
                this.pos = {
                    x : 0, 
                    y : 0              
                };   
                this.vol = new SAT.Circle(new SAT.Vector(0,0), 5);
                this.selectedTile = undefined;
                          
                this.canvas.addEventListener("touchstart", function (event) {
                    _this.onTouchStart(event);
                }, false);
 
                this.canvas.addEventListener("touchend", function (event) {
                    _this.onTouchEnd(event);
                }, false);         

                this.canvas.addEventListener("touchmove", function (event) {
                    _this.onTouchMove(event);
                }, true);
     
            };
            
            
            //proto type
            tEH.prototype.setTouchPos = function(event) {
                var rect = this.canvas.getBoundingClientRect();
                this.pos = { x: event.pageX - rect.left, y: event.pageY - rect.top};      
                this.vol.pos.x =     this.pos.x;    
                this.vol.pos.y =     this.pos.y; 
            };
            
            tEH.prototype.getPos = function () { 
                return this.pos;
            };
            
            tEH.prototype.onTouchStart = function(event) {
                if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];                  
                    this.setTouchPos(event); 
                    var collisionTile = getCollisionTile(this.vol, this.myTiles);
                    if (typeof collisionTile !== "undefined") { 
                        if (!collisionTile.selectionLocked) {
                            this.selectedTile = collisionTile;
                            if (typeof this.selectedTile !== "undefined") {
                                this.selectedTile.selectedTileOffset = { x: this.pos.x - this.selectedTile.box.pos.x,  y: this.pos.y - this.selectedTile.box.pos.y};
                            }
                        }
                    }
                }
            };
            
            tEH.prototype.onTouchMove = function(event) {
                if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];
                    if (typeof this.selectedTile !== "undefined") {
                        this.setTouchPos(event);
                        getCollisionTile(this.vol, this.myTiles);
                    }
                }
            };
            
            tEH.prototype.onTouchEnd = function(event) {
                if (typeof this.selectedTile !== "undefined") {
                    this.selectedTile.snapToGrid();
                    this.selectedTile = undefined;
                }
            };
            
            return tEH;
        
        }); //define

}()); //IFFY
        