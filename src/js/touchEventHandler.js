(function() {
    "use strict";
    

    
    define( ["src/js/tile", "src/js/collisionTile"], function (Tile, getCollisionTile) {   
    
        var tEH = function ( myCanvas, myTiles, gameState ) {         
                var _this = this;
                this.canvas = myCanvas;
                this.myTiles = myTiles;
                this.gameState = gameState;
                this.pos = {
                    x : 0, 
                    y : 0              
                };   
                 this.dirtyRect = {
                    x : 0,
                    y : 0,
                    w : 0,
                    h : 0
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
            
            tEH.prototype.startMovePos = {
                    x : 0, 
                    y : 0              
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
                                this.startMovePos.x = this.selectedTile.box.pos.x;
                                this.startMovePos.y = this.selectedTile.box.pos.y;
                                this.dirtyRect = { x : this.selectedTile.box.pos.x, y: this.selectedTile.box.pos.y, w : this.selectedTile.w, h: this.selectedTile.h };
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

                        var ctx=this.canvas.getContext("2d");
                        ctx.clearRect(this.dirtyRect.x, this.dirtyRect.y, this.dirtyRect.w, this.dirtyRect.h);
                        this.selectedTile.draw(ctx);      
                        this.dirtyRect = { x : this.selectedTile.box.pos.x, y: this.selectedTile.box.pos.y, w : this.selectedTile.w, h: this.selectedTile.h };
                    }  
                }           
            };
            
            tEH.prototype.onTouchEnd = function(event) {
                if (typeof this.selectedTile !== "undefined") {
                    this.selectedTile.snapToGrid();
                    
                    // increment move counter
                    if (( this.startMovePos.x !== this.selectedTile.box.pos.x) || ( this.startMovePos.y !== this.selectedTile.box.pos.y)) {
                        this.gameState.moveCounter += 1;
                    }
                    
                    var ctx=this.canvas.getContext("2d");
                    ctx.clearRect(this.dirtyRect.x, this.dirtyRect.y, this.dirtyRect.w, this.dirtyRect.h);
                    this.selectedTile.draw(ctx);   
                    
                    this.selectedTile = undefined;
                }
            };
            
            return tEH;
        
        }); //define

}()); //IFFY
        