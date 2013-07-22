(function() {
    "use strict";
    
    define( ["src/js/tile", "src/js/collisionTile"], function (Tile, getCollisionTile) {   
    
        var mEH = function ( myCanvas, myTiles ) {
            
                this.canvas = myCanvas;
                this.myTiles = myTiles;
                this.pos = {
                    x : 0, 
                    y : 0              
                };
    
                this.vol = new SAT.Circle(new SAT.Vector(0,0), 5);
                this.selectedTile = undefined;
                
                this.setMousePos = function(event) {
                    var rect = this.canvas.getBoundingClientRect();
                    this.pos = { x: event.clientX - rect.left, y: event.clientY - rect.top};      
                    this.vol.pos.x =     this.pos.x;    
                    this.vol.pos.y =     this.pos.y; 
                };
                
    
                this.canvas.addEventListener("mousedown", doMouseDown.bind(this), false);
                function doMouseDown (event) {
                     this.setMousePos(event); 
                     var collisionTile = getCollisionTile(this.vol, this.myTiles);
                     if (!collisionTile.selectionLocked) {
                        this.selectedTile = collisionTile;
                        if (this.selectedTile !== undefined) {
                           this.selectedTile.selectedTileOffset = { x: this.pos.x - this.selectedTile.box.pos.x,  y: this.pos.y - this.selectedTile.box.pos.y};
                         }
                     }
                }
                
                this.canvas.addEventListener("mouseup", doMouseUp.bind(this), false);
                function doMouseUp (event) {
                     this.setMousePos(event);
                     
                     if (this.selectedTile !== undefined) {
                        this.selectedTile.snapToGrid();
                        this.selectedTile = undefined;
                     }
                }
                
                this.canvas.addEventListener("mousemove", doMouseMove.bind(this), false);
                function doMouseMove (event) {
                    this.setMousePos(event);
                    getCollisionTile(this.vol, this.myTiles);
                    //document.getElementById('mouseMoveEvent').innerHTML = event.which;
                }
                
                this.getPos = function () { 
                    return this.pos;
                };
            };
            
            return mEH;
        
        }); //define

}()); //IFFY
        