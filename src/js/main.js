(function() {
	"use strict";
           
        
        var main = angular.module("main", []).config(function($routeProvider) {
            
            $routeProvider.when('/menu', {
                templateUrl: 'menu.html',
                controller: 'MenuController'     
            });
            
            $routeProvider.when('/game', {
                templateUrl: 'game.html',
                controller: 'GameController'     
            });
            
            $routeProvider.otherwise( { redirectTo: '/menu'} );
        });
        
        main.controller('MenuController', ['$scope', '$location', function($scope, $location) {
            $scope.newgame = function() {
                $location.path('/game');
            };
        }]);
        
        
        main.controller('GameController', ['$scope', '$location', function($scope, $location) {

            $scope.title = "Senetors";
            $scope.message = "Mouse over images to see a directive at work";

            
            require(["src/js/mainmenu", "src/js/newgame", "src/js/mainloop", "src/js/gameState", "src/js/mouseEventHandler", "src/js/touchEventHandler", "src/js/tile"], function(MainMenu, NewGame, MainLoop, GameState, MouseEventHandler, TouchEventHandler, Tile) {   
                var ml = new MainLoop($scope); 
            });
            
            $scope.exitgame = function() {
                //alert("called exit");
                $location.path('/menu');
                $scope.$apply();
            };
  
        }]);
        


}()); //IFFY
