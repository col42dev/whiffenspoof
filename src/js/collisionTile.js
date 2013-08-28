(function() {
    "use strict";
    
    define( ["src/js/tile"], function (Tile) {   
    

           // returns Tile instance which collides with sat
           var getCollisionTile = function (sat, myTiles) {              
                var response = new SAT.Response();
                for (var tileIdx = 0;  tileIdx < myTiles.length; tileIdx += 1) {
                    if (sat != myTiles[tileIdx].box) {
                        var collided = SAT.testPolygonCircle(myTiles[tileIdx].box, sat, response);                    
                        if (collided) {
                            return myTiles[tileIdx];
                        }          
                    }
                }
                return undefined;
            };  
 

            return getCollisionTile;
        
        }); //define

}()); //IFFE