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
            this.red = 0;
            this.rounded = 0;
            this.text = undefined;
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

        tile.prototype.clear = function (ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.0)";  
            if (this.rounded) {
                //this.drawRounded(ctx, this.box.pos.x+2, this.box.pos.y+2, this.w-2, this.h-2, 5, true); 
            } else {
                if (this.selectionLocked==0) {
                    ctx.clearRect(this.box.pos.x+2, this.box.pos.y+2, this.w-2, this.h-2); 
                }
            }
        } 
        
        tile.prototype.draw = function (ctx) {

            ctx.fillStyle = this.rgb;  
            if (this.rounded) {
                this.drawRounded(ctx, this.box.pos.x+2, this.box.pos.y+2, this.w-2, this.h-2, 5, true); 
            } else {
                if (this.selectionLocked==0) {
                    ctx.fillRect(this.box.pos.x+2, this.box.pos.y+2, this.w-2, this.h-2); 
                }
            }

            if ( this.text !== undefined) {
                
                ctx.fillStyle = "rgba(30, 30, 30, 0.5)";

                var fontStr = "italic bold PSpx Verdana";

                var fontPointSizeStr = (this.tileUnitSize * 1.45).toString();
                ctx.font = fontStr.replace(/PS/g, fontPointSizeStr);

                ctx.textAlign="center";

                var x = this.box.pos.x+2;
                var y = this.box.pos.y+2;
                var w = this.w-2;
                var h = this.h-2;
                ctx.fillText(this.text, x + (w/2), y + (h/2), w);
            }
        };
        
        tile.prototype.drawRounded = function(ctx, x, y, width, height, radius, fill, stroke) {
              if (typeof stroke == "undefined" ) {
                stroke = true;
              }
              if (typeof radius === "undefined") {
                radius = 5;
              }
              ctx.beginPath();
              ctx.moveTo(x + radius, y);
              ctx.lineTo(x + width - radius, y);
              ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
              ctx.lineTo(x + width, y + height - radius);
              ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
              ctx.lineTo(x + radius, y + height);
              ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
              ctx.lineTo(x, y + radius);
              ctx.quadraticCurveTo(x, y, x + radius, y);
              ctx.closePath();
              if (stroke) {
                ctx.stroke();
              }
              if (fill) {
                ctx.fill();
              }        
        };
            
        tile.prototype.setPos = function (pos) {
            this.box.pos.x = pos.x;
            this.box.pos.y = pos.y;
        };
        
       
        tile.prototype.tileUnitSize = undefined;
        tile.prototype.slideIncrement = undefined;
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

            var xUnit = 0;
            var xSnapped = 0;
            while (!xSnapped) {
                if( this.box.pos.x >= this.tileUnitSize*xUnit && this.box.pos.x <= this.tileUnitSize*(xUnit+1) ) {
                    if (Math.abs(this.box.pos.x - this.tileUnitSize*xUnit) < Math.abs(this.box.pos.x - this.tileUnitSize*(xUnit+1))) {
                        this.box.pos.x = this.tileUnitSize*xUnit;
                    } else {
                        this.box.pos.x = this.tileUnitSize*(xUnit+1);
                    } 
                    xSnapped = 1;
                }
                xUnit += 1;
            }
            
            var yUnit = 0;
            var ySnapped = 0;
            while (!ySnapped) {
                if( this.box.pos.y >= this.tileUnitSize*yUnit && this.box.pos.y <= this.tileUnitSize*(yUnit+1) ) {
                    if (Math.abs(this.box.pos.y - this.tileUnitSize*yUnit) < Math.abs(this.box.pos.y - this.tileUnitSize*(yUnit+1))) {
                        this.box.pos.y = this.tileUnitSize*yUnit;
                    } else {
                        this.box.pos.y = this.tileUnitSize*(yUnit+1);
                    } 
                    ySnapped = 1;
                }
                yUnit += 1;
            }
 
        };
        
        tile.prototype.testWinCondition = function( tileBoardSize, $scope) {
            
            if ($scope.gameLevel === 0) {
                if (this.wUnit===1 && this.hUnit===4) {
                    if (this.box.pos.y >= 5*this.tileUnitSize) {
                        if (this.box.pos.x >= 3*this.tileUnitSize) {
                            return 1;
                        }   
                    }
                }
            }    
                    
            if ($scope.gameLevel === 1) {
                if (this.wUnit===2 && this.hUnit===2) {
                    if (this.box.pos.y >= 8*this.tileUnitSize) {
                        if (this.box.pos.x >= 3*this.tileUnitSize) {
                            return 1;
                        }   
                    }
                }
            }
            
            if ($scope.gameLevel === 2) {
                if (this.wUnit===2 && this.hUnit===2) {
                    if (this.box.pos.y >= 4*this.tileUnitSize) {
                        if (this.box.pos.x >1.9*this.tileUnitSize && this.box.pos.x <2.1*this.tileUnitSize) {
                            return 1;
                        }   
                    }
                }
            }
            
            if ($scope.gameLevel === 3) {
                if (this.wUnit===2 && this.hUnit===2) {
                    if (this.box.pos.y >= 4*this.tileUnitSize) {
                        if (this.box.pos.x <= 1.0 * this.tileUnitSize ) {
                            return 1;
                        }   
                    }
                }
            }
            
            return 0;
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

}()); //IFFE
