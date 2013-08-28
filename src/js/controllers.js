(function() {

'use strict';

angular.module('main.controllers', []).
	controller('MenuController', ['$scope', '$location', 'MenuUtils', 'MenuTiles', function($scope, $location, MenuUtils, MenuTiles) {
           

		MenuUtils.init($scope);
        $scope.menuLoop = new MenuTiles($scope);
        //console.log("INIT " + $scope.menuLoop.ml);

        $scope.$on("$destroy", function() {
            console.log("onDestroy");
           $scope.menuLoop.onDestroy();
        });
		
		// on click callbacks
		$scope.newgame = function() {
            console.log("NG" + $scope.menuLoop);
            //$scope.menuLoop.onDestroy();
            delete $scope.menuLoop;
		    $location.path('/difficulty');
		};
		
		$scope.scores = function() { 
		    $location.path('/scores');
		};
		     
		$scope.about = function() { 
		    $location.path('/about');
		};     

  	}])
	.controller('DifficultyMenuController', ['$scope', '$rootScope', '$location', 'MenuUtils', function($scope, $rootScope, $location, MenuUtils) {
                          
  		MenuUtils.init($scope);
 
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
	}]).
	controller('InstructionsMenuController', ['$scope', '$location', 'MenuUtils', function($scope, $location, MenuUtils) {
                        
			MenuUtils.init($scope);   
 
            // on click callbacks
            $scope.start = function() {
                $location.path('/game');
            };
                 
            $scope.back = function() { 
                $location.path('/difficulty');
            };     
            
            if ( $scope.gameLevel == 0) {
                $scope.instructions = "Slide the red tile in the top left corner down to the bottom right corner.";
            } else if ( $scope.gameLevel == 1) {
                $scope.instructions = "Slide the red tile in the top left corner down to the bottom right corner. Black tiles are fixed in position.";
            }  else if ( $scope.gameLevel == 2) {
                $scope.instructions = "Slide the red tile in the top middle down to the bottom middle.";
            } else if ( $scope.gameLevel == 3) {
                $scope.instructions = "Slide the red tile from the top left to the bottom left.";
            }   
 
     }]).
     controller('AboutController', ['$scope', '$location', 'MenuUtils', function($scope, $location, MenuUtils) {
                
            $scope.mUtils  = MenuUtils.init($scope);

            $scope.linkDirtyRect = function() {
                window.open("http://twitter.com/dirtyrect" );
            };
            
            $scope.linkCol42dev = function() {
                window.open("http://github.com/col42dev/whiffenspoof");
            };
        
            $scope.back = function() {
                $location.path('/menu');
            };

    }]).
    controller('ScoreController', ['$scope', '$location', '$http', 'MenuUtils', function($scope, $location, $http, MenuUtils) {

            $scope.mUtils  = MenuUtils.init($scope);
                   
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
                    if ( $scope.filteredCount < 32) { // max of 32 entries
                        if ( value.gameLevel === $scope.menuGameLevel) {
                           $scope.filteredScoreTable.push(value);
                           $scope.filteredCount += 1;
                        }
                    }
                 }, $scope);
                
                return $scope.filteredScoreTable;
            };
                                            
            // limit max row dynamically based on window height
            $scope.maxRows = function() {
                                            
                for (var i=0; i <32; i ++) {
                    var tr = document.getElementById("tr"+i);
                    if (tr != undefined && tr) {
                        var trRect = tr.getBoundingClientRect();
                        if ( trRect.bottom > window.innerHeight* 0.8 ) {
                            return i;
                        }
                    }
                }
                                             
                return 32;
            }
 
            $scope.back = function() {
                $location.path('/menu');
            };
    }]).
    controller('GameController', ['$scope', '$rootScope','$location', '$http', function($scope, $rootScope, $location, $http) {

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