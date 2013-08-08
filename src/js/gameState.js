(function() {
    "use strict";
    
    define( function () {     
           
        var gameState = function($scope) {
            this.moveCounter = 0;
            this.won=0;
            this.$scope = $scope;
        };
        
        gameState.prototype.incrementMoveCounter = function () {
            
            if (!this.hasWon()) {
                this.moveCounter += 1;
                this.$scope.moveCounter = this.moveCounter;
                this.$scope.$apply();
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