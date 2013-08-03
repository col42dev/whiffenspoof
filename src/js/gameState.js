(function() {
    "use strict";
    
    define( function () {     
           
        var gameState = function() {
            this.moveCounter = 0;
            this.flagMoveCounterRefresh = 1;
            this.won=0;
        };
        
        gameState.prototype.incrementMoveCounter = function () {
            
            if (!this.hasWon()) {
                this.moveCounter += 1;
                this.flagMoveCounterRefresh = 1;
            }
        };
        
        gameState.prototype.moves = function() {
            return this.moveCounter;
        };
        
        gameState.prototype.win = function () {
            this.won = 1;
        };
        
        gameState.prototype.hasWon = function () {
            return this.won;
        };
                                
        return gameState;
        
    }); //define

}()); //IFFY