(function() {
    "use strict";
    
    define( function () {     
           
        var returnedModule = function(xUnit, yUnit, wUnit, hUnit, rgb) {
            this.box = new SAT.Box(new SAT.Vector(60*xUnit,60*yUnit), 60*wUnit-2, 60*hUnit-2).toPolygon();
            this.w = 60*wUnit-2;
            this.h = 60*hUnit-2;
            this.selectedTileOffset = {
                x : 0, 
                y : 0              
            };
            this.rgb = rgb;
            this.selectionLocked = 0;

            
            this.draw = function (ctx) {
                ctx.fillStyle = this.rgb;  
                ctx.fillRect(this.box.pos.x, this.box.pos.y, this.w, this.h); 
                //console.log( ">>>" + this.box.pos.x+ this.box.pos.y+ this.box.w+ this.box.h);
            };
            
             // true if sat collides with a Tile
            this.collisionCheck = function (sat, tiles) {              
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
            
            this.getCollisionTile = function (sat, tiles) {              
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
            
            this.setPos = function (pos) {
                this.box.pos.x = pos.x;
                this.box.pos.y = pos.y;
            };
            
            this.slideIncrement = 8;
            this._slideToAxis = function(axisBox, axisVar, tileOffset, axisTargetPos, tiles) {
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
  

            this.slideTo = function(targetPos, tiles) {
                this._slideToAxis(this.box, 'x', this.selectedTileOffset.x, targetPos.x, tiles);
                this._slideToAxis(this.box, 'y', this.selectedTileOffset.y, targetPos.y, tiles);
            };
            
            this.snapToGrid = function() {
                if ( this.box.pos.x % 60 < 60 / 2) {
                    this.box.pos.x = 60 * Math.floor(this.box.pos.x / 60);
                } else {
                    this.box.pos.x = 60 * Math.floor(this.box.pos.x / 60) + 60;
                }
                if ( this.box.pos.y % 60 < 60 / 2) {
                    this.box.pos.y = 60 * Math.floor(this.box.pos.y / 60);
                } else {
                    this.box.pos.y = 60 * Math.floor(this.box.pos.y / 60) + 60;
                }
            };
        }
        
        
        return returnedModule;
        
    }); //define

}()); //IFFY
