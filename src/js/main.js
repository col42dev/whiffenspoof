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
        
        main.config(function($httpProvider){
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        });

        
        
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
                
            //delete $http.defaults.headers.common['X-Requested-With'];
            $http.defaults.useXDomain = true;

            $scope.scoreTableURL = "ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080";
                
                
            $scope.scoreinfo = $http({method: 'GET', url: "http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com\:8080"}).
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
  /*
            $.ajax({
                url: "http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080",
                type: 'GET',
                dataType: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("x-some-header", "some-value");
                }
            }).done(function(data) { 
                $rootScope.$apply(function() {d.resolve(data); });
                alert("OK");
            }).fail(function(data) {
                $rootScope.$apply(function() {d.reject(data); });
                alert("fail");
            });
            */

 
            $scope.addScore = function() {
                $scope.scoreTable.push({tag:$scope.tag, moves:0, date:Date()});
                $scope.tag = '';
            };
 
            $scope.remaining = function() {
                var count = 0;
                angular.forEach($scope.scoreTable, function(score) {
                    count += score.done ? 0 : 1;
                });
                return count;
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
            
            $scope.$on("$destroy", function() {
                $scope.ml.onDestroy();
            });
            

        }]);
        
        
        main.directive("mainLoop", function() {
            return {
                restrict: "A",
                link: function(scope, element, attributes) {
 

                }
            };
        })



}()); //IFFY
