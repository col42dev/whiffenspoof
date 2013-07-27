(function() {
    "use strict";
    
    define( function () {     
           
        var tile = function(xUnit, yUnit, wUnit, hUnit, rgb) {
            this.wUnit = wUnit;
            this.hUnit = hUnit;
            this.box = new SAT.Box(new SAT.Vector(this.tileUnitSize*xUnit, this.tileUnitSize*yUnit), this.tileUnitSize*wUnit-2, this.tileUnitSize*hUnit-2).toPolygon();
            this.w = this.tileUnitSize*wUnit-2;
            this.h = this.tileUnitSize*hUnit-2;
            this.selectedTileOffset = {
                x : 0, 
                y : 0              
            };
            this.rgb = rgb;
            this.selectionLocked = 0; 
        };
        
        tile.prototype.resize = function( oldTileUnitSize ) { 
            var xUnit = Math.floor((this.box.pos.x + oldTileUnitSize / 2) / oldTileUnitSize);
            var yUnit = Math.floor((this.box.pos.y + oldTileUnitSize / 2) / oldTileUnitSize);
            this.box = new SAT.Box(new SAT.Vector(this.tileUnitSize*xUnit, this.tileUnitSize*yUnit), this.tileUnitSize*this.wUnit-2, this.tileUnitSize*this.hUnit-2).toPolygon();
            this.w = this.tileUnitSize*this.wUnit-2;
            this.h = this.tileUnitSize*this.hUnit-2;
        };
        
        
        tile.prototype.getDirtyRect = function() { 
            return { x : this.box.pos.x+1, y: this.box.pos.y+1, w : this.w-0, h: this.h-0 };
        };
        
        tile.prototype.draw = function (ctx) {
            ctx.fillStyle = this.rgb;  
            

            ctx.fillRect(this.box.pos.x+2, this.box.pos.y+2, this.w-2, this.h-2); 
            //console.log( ">>>" + this.box.pos.x+ this.box.pos.y+ this.box.w+ this.box.h);
        };
            
        tile.prototype.setPos = function (pos) {
            this.box.pos.x = pos.x;
            this.box.pos.y = pos.y;
        };
        
       
        tile.prototype.slideIncrement = 16;
        tile.prototype._slideToAxis = function(axisBox, axisVar, tileOffset, axisTargetPos, tiles) {
            for (var slideIncrement = this.slideIncrement;  slideIncrement > 0; slideIncrement = slideIncrement - 1) {                      
                if (Math.abs(axisBox.pos[axisVar] + tileOffset - axisTargetPos) < slideIncrement) {
                    continue; // within slideInrment of target, try smaller slideIncrement
                }
                var preIncrementPos = axisBox.pos[axisVar];
                if (axisBox.pos[axisVar] + tileOffset < axisTargetPos) {
                    axisBox.pos[axisVar] += slideIncrement;
                }
                else if (axisBox.pos[axisVar] + tileOffset > axisTargetPos) {
                    axisBox.pos[axisVar] -= slideIncrement;
                }     
                if (this.collisionCheck(this.box, tiles)) {
                    axisBox.pos[axisVar] = preIncrementPos;
                } else {
                    break;
                }
            }
        };

        tile.prototype.slideTo = function(targetPos, tiles) {
            this._slideToAxis(this.box, 'x', this.selectedTileOffset.x, targetPos.x, tiles);
            this._slideToAxis(this.box, 'y', this.selectedTileOffset.y, targetPos.y, tiles);
        };
        
        tile.prototype.snapToGrid = function () {
            if ( this.box.pos.x % this.tileUnitSize < this.tileUnitSize / 2) {
                this.box.pos.x = this.tileUnitSize * Math.floor(this.box.pos.x / this.tileUnitSize);
            } else {
                this.box.pos.x = this.tileUnitSize * Math.floor(this.box.pos.x / this.tileUnitSize) + this.tileUnitSize;
            }
            if ( this.box.pos.y % this.tileUnitSize < this.tileUnitSize / 2) {
                this.box.pos.y = this.tileUnitSize * Math.floor(this.box.pos.y / this.tileUnitSize);
            } else {
                this.box.pos.y = this.tileUnitSize * Math.floor(this.box.pos.y / this.tileUnitSize) + this.tileUnitSize;
            }
        };
      
        // true if sat collides with a Tile
        tile.prototype.collisionCheck = function (sat, tiles) {              
            var response = new SAT.Response();
            for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
                if (sat != tiles[tileIdx].box) {
                    var collided = SAT.testPolygonPolygon(tiles[tileIdx].box, sat, response);                    
                    if (collided) {
                        return true;
                    }    
                }      
            }
            return undefined;
        };
            
        tile.prototype.getCollisionTile = function (sat, tiles) {              
            var response = new SAT.Response();
            document.getElementById('collide').innerHTML = "---";
            for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
                if (sat != tiles[tileIdx].box) {
                    var collided = SAT.testPolygonCircle(tiles[tileIdx].box, sat, response);                    
                    if (collided) {
                        document.getElementById('collide').innerHTML = "Collide";
                        return tiles[tileIdx];
                    }          
                }
            }
            return undefined;
        }; 
        
        return tile;
        
    }); //define

}()); //IFFY
