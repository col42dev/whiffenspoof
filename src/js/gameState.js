(function() {
    "use strict";
    
    define( function () {     
           
        var gameState = function() {
            this.moveCounter = 0;
            this.flagMoveCounterRefresh = 1;
        };
        
        gameState.prototype.incrementMoveCounter = function () {
            this.moveCounter += 1;
            this.flagMoveCounterRefresh = 1;
        };
                                
        return gameState;
        
    }); //define

}()); //IFFY