(function() {
	"use strict";
        
        function initMenuScreen($scope) {
    
            console.log("init");
            //onTouchmove
            $scope.touchmoveEventListener = function(event) {
                event.preventDefault();  // prevent scrolling
            };
            $scope.onTouchMoveEventListener = window.addEventListener('touchmove', $scope.touchmoveEventListener, true); 
            
            //onResize
            $scope.onResize = function() {
                $scope.menuButtonStyle = {};
                $scope.menuButtonStyle["font-size"] = window.innerHeight/20 + "px";

                $scope.menuSmallButtonStyle = {};
                $scope.menuSmallButtonStyle["font-size"] = window.innerHeight/30 + "px";
                
                $scope.titleStyle = {};
                $scope.titleStyle["font-size"] = window.innerHeight/8 + "px";
            };
            $scope.resizeEventListener = function() {
                $scope.onResize();
                $scope.$apply();
            };
            $scope.onResizeEventListener = window.addEventListener("resize", $scope.resizeEventListener, false);
            $scope.onResize();
            
            // on Destroy
            $scope.$on("$destroy", function() {
                window.removeEventListener("resize", $scope.onResizeEventListener, false);
                window.removeEventListener("touchmove", $scope.onTouchMoveEventListener, false);
            });   
        }
        
         
        var main = angular.module("main", []).config( ['$routeProvider', '$httpProvider',  function($routeProvider, $httpProvider) {
    
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
             
        main.controller('MenuController', ['$scope', '$location', function($scope, $location) {
                        
            initMenuScreen($scope);     
 
            // on click callbacks
            $scope.newgame = function() {
                $location.path('/difficulty');
            };
            
            $scope.scores = function() { 
                $location.path('/scores');
            };
                 
            $scope.about = function() { 
                $location.path('/about');
            };     

        }]);
        
        main.controller('DifficultyMenuController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
                        
            initMenuScreen($scope);     
 
            // on click callbacks
            $scope.Hughes = function() {
                $rootScope.gameLevel = 0;
                $location.path('/instructions');
            };
            
            $scope.Whiffen = function() {
                $rootScope.gameLevel = 1;
                $location.path('/instructions');
            };
            
            $scope.Ushi = function() {
                $rootScope.gameLevel = 2;
                $location.path('/instructions');
            };
            
            $scope.Dads = function() {
                $rootScope.gameLevel = 3;
                $location.path('/instructions');
            };
            
                 
            $scope.back = function() { 
                $location.path('/menu');
            };     

        }]);
        
        main.controller('InstructionsMenuController', ['$scope', '$location', function($scope, $location) {
                        
            initMenuScreen($scope);     
 
            // on click callbacks
            $scope.start = function() {
                $location.path('/game');
            };
                 
            $scope.back = function() { 
                $location.path('/difficulty');
            };     
            
            if ( $scope.gameLevel == 0) {
                $scope.instructions = "To complete the puzzle, slide the red tile in the top left corner down to the bottom right corner.";
            } else if ( $scope.gameLevel == 1) {
                $scope.instructions = "To complete the puzzle, slide the red tile in the top left corner down to the bottom right corner. Black tiles are fixed in position.";
            }  else if ( $scope.gameLevel == 2) {
                $scope.instructions = "To complete the puzzle, slide the red tile in the top-middle down to the bottom-middle.";
            } else if ( $scope.gameLevel == 3) {
                $scope.instructions = "Few solve it, it can be done. Move the red tile from the top-left to the bottom-left.";
            }   
 
        }]);
        
        main.controller('AboutController', ['$scope', '$location', function($scope, $location) {
                
            initMenuScreen($scope);
           
            $scope.linkDirtyRect = function() {
                window.open("http://twitter.com/dirtyrect" );
            };
            
            $scope.linkCol42dev = function() {
                window.open("http://github.com/col42dev/whiffenspoof");
            };
        
            $scope.back = function() {
                $location.path('/menu');
            };

        }]);
        
        main.controller('ScoreController', ['$scope', '$location', '$http', function($scope, $location, $http) {

            initMenuScreen($scope);   
                   
            $scope.scoreTable = [];
               // {tag:'Bill', moves:0, date:Date()},
               // {tag:'Ben', moves:42, date:Date()}];
                
            $scope.sortOrder = 'moves';
            $scope.menuGameLevel = 0;
            $http.defaults.useXDomain = true;
            
            $scope.showTable = 0; // hide until populated from server
                
            $scope.getInfo = function() {
                $http({method: 'GET', url: "http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080"}).
                    success(function(data, status, headers, config) {    
                        $scope.scoreTable = data;
                        $scope.showTable = 1;
                    }).error(function(data, status, headers, config) {
                        alert("scores not available");
                        alert(data + ":" + status + ":" + headers + ":" + config);
                    });
            };
            
            // populate table
            $scope.getInfo();
            
            $scope.setLevelName = function () {
                if ( $scope.menuGameLevel == 0) {
                    $scope.menuGameLevelName = "Hughes";
                } else if ( $scope.menuGameLevel == 1) {
                    $scope.menuGameLevelName = "Whiffen-Spoof";
                }  else if ( $scope.menuGameLevel == 2) {
                    $scope.menuGameLevelName = "Ushi";
                }  else if ( $scope.menuGameLevel == 3) {
                    $scope.menuGameLevelName = "Dad's Puzzler";
                }                 
            };
            
            $scope.setLevelName();
            
            // click button callback
            $scope.toggleMenuGameLevel = function() {
                $scope.menuGameLevel += 1;
                $scope.menuGameLevel %= 4;
                
                $scope.setLevelName();
            };
            
            // Filter table by game Level and max entries
            $scope.getFilteredScoreTable = function() {
                $scope.filteredScoreTable = [];
                $scope.filteredCount = 0;
                
                function compare(a,b) {
                    if (a.moves < b.moves)
                        return -1;
                    if (a.moves > b.moves)
                        return 1;
                    return 0;
                };
                
                angular.forEach( $scope.scoreTable.sort(compare), function( value, key) {
                    if ( $scope.filteredCount < 8) { // max of 10 entries
                        if ( value.gameLevel === $scope.menuGameLevel) {
                           $scope.filteredScoreTable.push(value);
                           $scope.filteredCount += 1;
                        }
                    }
                 }, $scope);
                
                return $scope.filteredScoreTable;
            };
 
            $scope.back = function() {
                $location.path('/menu');
            };
        }]);
        
        
        main.controller('GameController', ['$scope', '$rootScope','$location', '$http', function($scope, $rootScope, $location, $http) {

            $scope.moveCounter = "";
            
            $scope.moveCounterStyleDiv = {};
            $scope.tagEntryStyleDiv = {};
            $scope.tagEntryStyle = {};        

            $scope.showTagEntry = "0";
            $scope.onShowTagEntry = function() {
                $scope.showTagEntry = "1";
                $scope.$apply();
            };
            
            $scope.exitgame = function() {
                $location.path('/menu');
                $scope.$apply();
            };
            
            $scope.$on("$destroy", function() {
                $scope.ml.onDestroy();
            });
            
            $scope.addScore = function() {
                //console.log("ADD SCORE");
                if ($scope.tagname !== undefined)
                {
                    var newScore = {tag:$scope.tagname, moves:$scope.moveCounter, date:Date(), gameLevel:$scope.gameLevel};
                    $scope.postInfo(newScore);      
                }
            };
            
            // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"tag":"noob","score":43,"date":"now"}' http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score
            $scope.postInfo = function(newScore) {   
                //console.log("tv"+newScore.tag);
                //console.log("mv"+newScore.moves);
                //console.log("dv"+newScore.date);
                //console.log("dv"+newScore.gameLevel);
                
                $http.defaults.useXDomain = true;  
                delete $http.defaults.headers.common['X-Requested-With'];          
                $http({
                    url: "http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score",
                    method: "POST",
                    data: newScore,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    //$scope.users = data.users; 
                    $location.path('/scores'); 
                }).error(function (data, status, headers, config) {
                    //$scope.status = status + ' ' + headers;
                    alert("post error:" + status);
                });
            };
            
            $scope.back = function() {
                $location.path('/menu');
            };
            
            require([ "src/js/mainloop"], function(MainLoop) { 
                $scope.gameLevel = $rootScope.gameLevel; 
                $scope.ml = new MainLoop($scope);            
            });
        }]);
        

}()); //IFFE
