(function() {
	"use strict";

         
        var main = angular.module("main", ['main.controllers', 'main.menuUtils']).config( ['$routeProvider', '$httpProvider',  function($routeProvider, $httpProvider) {
    
                $httpProvider.defaults.useXDomain = true;
                            
                $routeProvider.when('/menu', {
                    templateUrl: 'src/template/menu.html',
                    controller: 'MenuController'     
                });
                
                $routeProvider.when('/game', {
                    templateUrl: 'src/template/game.html',
                    controller: 'GameController'     
                });
                
                $routeProvider.when('/scores', {
                    templateUrl: 'src/template/scores.html',
                    controller: 'ScoreController'     
                });
                
                $routeProvider.when('/about', {
                    templateUrl: 'src/template/about.html',
                    controller: 'AboutController'     
                });
                
                $routeProvider.when('/difficulty', {
                    templateUrl: 'src/template/difficultyMenu.html',
                    controller: 'DifficultyMenuController'     
                });
                
                $routeProvider.when('/instructions', {
                    templateUrl: 'src/template/instructionsMenu.html',
                    controller: 'InstructionsMenuController'     
                });
                
                $routeProvider.when( { 
                    templateUrl: 'devjournal.html',
                    controller: 'DevJournal' 
                });
                
                $routeProvider.otherwise( { 
                    templateUrl: 'src/template/menu.html',
                    controller: 'MenuController' 
                });
            }
        ]);
        
        main.config(['$httpProvider', function($httpProvider) {
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
            }
        ]);

        main.run(['$rootScope',function($rootScope) {
                $rootScope.gameLevel = 0;
            }
        ]);
             
  
}()); //IFFE
