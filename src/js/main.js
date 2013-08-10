(function() {
	"use strict";
        
        function initMenuScreen($scope) {
            
            // prevent scrolling
            $scope.touchmoveEventListener = function(event) {
                event.preventDefault(); 
            };
            $scope.el = window.addEventListener('touchmove', $scope.touchmoveEventListener, true); 
            
            //onResize
            $scope.onResize = function() {
                $scope.menuButtonStyle = {};
                $scope.menuButtonStyle["font-size"] = window.innerHeight/20 + "px";
                
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
                window.removeEventListener("touchmove", $scope.touchmoveEventListener, false);
            });   
        };

         
        var main = angular.module("main", []).config(function($routeProvider, $httpProvider) {
            
            $httpProvider.defaults.useXDomain = true;
                        
            $routeProvider.when('/menu', {
                templateUrl: 'menu.html',
                controller: 'MenuController'     
            });
            
            $routeProvider.when('/game', {
                templateUrl: 'game.html',
                controller: 'GameController'     
            });
            
            $routeProvider.when('/scores', {
                templateUrl: 'scores.html',
                controller: 'ScoreController'     
            });
            
            $routeProvider.when('/about', {
                templateUrl: 'about.html',
                controller: 'AboutController'     
            });
            
            $routeProvider.otherwise( { 
               // redirectTo: '/menu'
                templateUrl: 'menu.html',
                controller: 'MenuController' 
            });
        });
        

        main.config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            }
        ]);
        
        
        main.controller('MenuController', ['$scope', '$location', function($scope, $location) {
                        
            initMenuScreen($scope);      
 
            // on click callbacks
            $scope.newgame = function() {
                window.removeEventListener("touchmove", $scope.el, false);
                $location.path('/game');
            };
            
            $scope.scores = function() { 
                $location.path('/scores');
            };
                 
            $scope.about = function() { 
                $location.path('/about');
            };     

        }]);
        
       main.controller('AboutController', ['$scope', '$location', function($scope, $location) {
                
            initMenuScreen($scope);
           
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
                
            //delete $http.defaults.headers.common['X-Requested-With'];
            $http.defaults.useXDomain = true;
            
            $scope.showTable = 0;
                
            $scope.getInfo = function() {
                $http({method: 'GET', url: "http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080"}).
                    success(function(data, status, headers, config) {    
                        // this callback will be called asynchronously
                        // when the response is available
                        $scope.scoreTable = data;
                        $scope.showTable = 1;
                        //alert("success");
                        //alert(data);
                    }).error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert("scores not available");
                        alert(data + ":" + status + ":" + headers + ":" + config);
                    });
            };
            
            // populate table
            $scope.getInfo();
   
            // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"tag":"noob","score":43,"date":"now"}' http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score
            $scope.postInfo = function(newScore) {   
                
                $http.defaults.useXDomain = true;  
                delete $http.defaults.headers.common['X-Requested-With'];          
                $http({
                    url: "http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score",
                    method: "POST",
                    data: newScore,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    //$scope.users = data.users; 
                }).error(function (data, status, headers, config) {
                    //$scope.status = status + ' ' + headers;
                    alert("post error:" + status);
                });
            };
            
            $scope.addScore = function() {
                //$scope.scoreTable.push({tag:$scope.tag, moves:0, date:Date()});
                //$scope.tag = '';   
                var newScore = {tag:$scope.tag, moves:Math.floor((Math.random()*500)+1), date:Date()};
                //$scope.scoreTable.push();
                $scope.postInfo(newScore);         
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
                if ($scope.tagname != undefined)
                {
                    var newScore = {tag:$scope.tagname, moves:$scope.moveCounter, date:Date()};
                    $scope.postInfo(newScore);      
                }
            };
            
            // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"tag":"noob","score":43,"date":"now"}' http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score
            $scope.postInfo = function(newScore) {   
                //console.log("tv"+newScore.tag);
                //console.log("mv"+newScore.moves);
                //console.log("dv"+newScore.date);
                
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
                $scope.ml = new MainLoop($scope);            
            });
            

        }]);
        
        



}()); //IFFY
