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
            
            $routeProvider.otherwise( { 
               // redirectTo: '/menu'
                templateUrl: 'menu.html',
                controller: 'MenuController' 
            });
        });
        
        
        main.controller('MenuController', ['$scope', '$location', function($scope, $location) {
                
            // prevent scrolling
            $scope.el = window.addEventListener('touchmove', function(event) { event.preventDefault();}, true); 
     
            $scope.newgame = function() {
                window.removeEventListener("touchmove", $scope.el, false);
 
                $location.path('/game');
            };
        }]);
        
        
        main.controller('GameController', ['$scope', '$location', function($scope, $location) {

            require([ "src/js/mainloop"], function(MainLoop) {   
                $scope.ml = new MainLoop($scope); 
            });
            
            $scope.exitgame = function() {
                $location.path('/menu');
                $scope.$apply();
            };
        }]);
        


}()); //IFFY
