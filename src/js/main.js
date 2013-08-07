(function() {
	"use strict";
           
         
        var main = angular.module("main", ['ngResource']).config(function($routeProvider, $httpProvider) {
            
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
                
            // prevent scrolling

            $scope.el = window.addEventListener('touchmove', function(event) { event.preventDefault();}, true); 
     
            $scope.newgame = function() {
                window.removeEventListener("touchmove", $scope.el, false);
 
                $location.path('/game');
            };
            
            $scope.scores = function() { 
                $location.path('/scores');
            };
            $scope.testng = "curl http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/";
        }]);
        
        main.controller('ScoreController', ['$scope', '$location', '$http', function($scope, $location, $http) {
                        
            $scope.back = function() {
                $location.path('/menu');
            };
            
   
            $scope.scoreTable = [
                {tag:'Bill', moves:0, date:Date()},
                {tag:'Ben', moves:42, date:Date()}];
                
            $scope.sortOrder = 'moves';
                
            //delete $http.defaults.headers.common['X-Requested-With'];
            $http.defaults.useXDomain = true;
              
                
            $scope.getInfo = function() {
                $http({method: 'GET', url: "http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080"}).
                    success(function(data, status, headers, config) {    
                        // this callback will be called asynchronously
                        // when the response is available
                        $scope.scoreTable = data;
                        //alert("success");
                        //alert(data);
                    }).error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert("scores not available");
                        alert(data + ":" + status + ":" + headers + ":" + config);
                    });
            };
            
            $scope.getInfo();
            
            
            // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"tag":"noob","score":43,"date":"now"}' http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score
            $scope.postInfo = function(newScore) {   
                console.log("tv"+newScore.tag);
                console.log("mv"+newScore.moves);
                console.log("dv"+newScore.date);
                
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
 
            $scope.remaining = function() {
                var count = 0;
                angular.forEach($scope.scoreTable, function(score) {
                    count += score.done ? 0 : 1;
                });
                return count;
            };
 

        }]);
        
        
        main.controller('GameController', ['$scope', '$location', '$http', function($scope, $location, $http) {

           
            $scope.moveCount = 0;
            $scope.showTagEntry = "0";
            $scope.onShowTagEntry = function( moveCount) {
                $scope.showTagEntry = "1";
                $scope.moveCount = moveCount;
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
                console.log("ADD SCORE");
                var newScore = {tag:$scope.tagname, moves:$scope.moveCount, date:Date()};
                $scope.postInfo(newScore);      
                $location.path('/scores');   
            };
            
            // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"tag":"noob","score":43,"date":"now"}' http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score
            $scope.postInfo = function(newScore) {   
                console.log("tv"+newScore.tag);
                console.log("mv"+newScore.moves);
                console.log("dv"+newScore.date);
                
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
            
            
            require([ "src/js/mainloop"], function(MainLoop) {  
                $scope.ml = new MainLoop($scope);            
            });
            
            //$scope.onShowTagEntry();
  

        }]);
        
        
        main.directive("mainLoop", function() {
            return {
                restrict: "A",
                link: function(scope, element, attributes) {
 

                }
            };
        })



}()); //IFFY
