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
                
                this.setTouchPos = function(event) {
                    var rect = this.canvas.getBoundingClientRect();
                    this.pos = { x: event.pageX - rect.left, y: event.pageY - rect.top};      
                    this.vol.pos.x =     this.pos.x;    
                    this.vol.pos.y =     this.pos.y; 
                };
                
     
                this.onTouchStarted = function (event) {
                     if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];                  
                        _this.setTouchPos(event); 
                        var collisionTile = getCollisionTile(_this.vol, _this.myTiles);
                        if (typeof collisionTile !== "undefined") { 
                            if (!collisionTile.selectionLocked) {
                                _this.selectedTile = collisionTile;
                                if (typeof _this.selectedTile !== "undefined") {
                                    _this.selectedTile.selectedTileOffset = { x: _this.pos.x - _this.selectedTile.box.pos.x,  y: _this.pos.y - _this.selectedTile.box.pos.y};
                                }
                            }
                        }
                     }
                };          
                this.canvas.addEventListener("touchstart", this.onTouchStarted, false);
    
           
                this.onTouchEnd =  function (event) {
                        if (typeof _this.selectedTile !== "undefined") {
                            _this.selectedTile.snapToGrid();
                            _this.selectedTile = undefined;
                        }
                };
                this.canvas.addEventListener("touchend", this.onTouchEnd, false);
     
                
                this.onTouchMove = function(event) {
                     if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];
     
                        if (typeof _this.selectedTile !== "undefined") {
                            _this.setTouchPos(event);
                            getCollisionTile(_this.vol, _this.myTiles);
                        }
                     }
                };
                this.canvas.addEventListener("touchmove", this.onTouchMove, true);
     
                
                this.getPos = function () { 
                    return this.pos;
                };
            };
            
            return tEH;
        
        }); //define

}()); //IFFY
        