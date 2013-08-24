(function() {
    "use strict";
        
 

     	var myMenuUtils  = function MenuUtils($scope) {
    
            //onTouchmove
            $scope.touchmoveEventListener = function(event) {
                event.preventDefault();  // prevent scrolling
            };
            $scope.onTouchMoveEventListener = window.addEventListener('touchmove', $scope.touchmoveEventListener, true);
 
            $scope.renderMenuBackdrop = function() {
                var c=document.getElementById("redshiftCanvas");
 
                c.height = window.innerHeight; //document.body.clientHeight ;
                c.width = window.innerWidth; //(this.myCanvas.height / 11)  * (6 + 2); //document.width is obsolete
                var ctx = c.getContext("2d");
 
                // user-select: none; -webkit-user-select: none; -moz-user-select: none
                c.style.userSelect = "none";
                c.style.webkitUserSelect = "none";
                c.style.MozUserSelect = "none";
                c.setAttribute("unselectable", "on"); // For IE and Opera
 
                //var width = c.width;
 
                var grd=ctx.createLinearGradient(0,0,c.width,0);
                grd.addColorStop(0,"rgba(255,255,0,0.5)");
                grd.addColorStop(0.3,"orange");
                grd.addColorStop(1.0,"rgba(255,0,0,0.8)");
                ctx.fillStyle=grd;
                ctx.fillRect(0,0,c.width,c.height);
 
 
                //grd=ctx.createLinearGradient(width*0.825,0, width*0.025,0);
                grd=ctx.createLinearGradient(c.width*0.825,0, (c.width*0.825)+(c.width*0.025),0);
                grd.addColorStop(0.0,"rgba(40,40,40,0.2)");
                grd.addColorStop(0.4,"rgba(40,40,40,0.8)");
                grd.addColorStop(0.6,"rgba(40,40,40,0.8)");
                grd.addColorStop(1.0,"rgba(40,40,40,0.2)");
                ctx.fillStyle=grd;
                ctx.fillRect(c.width*0.825,0, c.width*0.025,c.height);
 
                //grd=ctx.createLinearGradient(width*0.7, 0, width*0.075, 0);
                grd=ctx.createLinearGradient(c.width*0.7, 0, (c.width*0.7)+(c.width*0.075), 0);
                grd.addColorStop(0.0,"rgba(40,40,40,0.2)");
                grd.addColorStop(0.2,"rgba(40,40,40,0.8)");
                grd.addColorStop(0.8,"rgba(40,40,40,0.8)");
                grd.addColorStop(1.0,"rgba(40,40,40,0.2)");
                ctx.fillStyle=grd;
                ctx.fillRect(c.width*0.7,  0, c.width*0.075,c.height);
 
 
                //Text
                ctx.fillStyle = "rgba(200,0,0,0.75)";
 
                var fontStr = "italic bold PSpx Verdana";
                var fontPointSizeStr = window.innerHeight/8;
                fontPointSizeStr = fontPointSizeStr.toString();
                ctx.font = fontStr.replace(/PS/g, fontPointSizeStr);
 
                ctx.textAlign = 'left';
                ctx.fillText("RED", window.innerWidth*0.04,  window.innerHeight * 0.12);
 
 
                fontStr = "italic bold PSpx Verdana";
                fontPointSizeStr = window.innerHeight/8;
                fontPointSizeStr = fontPointSizeStr.toString();
                ctx.font = fontStr.replace(/PS/g, fontPointSizeStr);
 
                ctx.textAlign = 'right';
                ctx.shadowColor="rgb(220,0,0)";
                ctx.shadowOffsetX=-7;
                ctx.shadowBlur=10;
                ctx.fillText("SHIFT", window.innerWidth *0.95,  window.innerHeight *0.94);
                ctx.shadowBlur=0;
                ctx.shadowOffsetX=0;
                //ctx.shadowColor="rgba(255,255,255,0.0)";
                //ctx.fillStyle="White";
            };
 
            //onResize
            $scope.onResize = function() {
                $scope.menuButtonStyle = {};
                $scope.menuButtonStyle["font-size"] = window.innerHeight/20 + "px";

                $scope.menuSmallButtonStyle = {};
                $scope.menuSmallButtonStyle["font-size"] = window.innerHeight/30 + "px";
 
                $scope.instructionTextStyle = {};
                $scope.instructionTextStyle["font-size"] = window.innerHeight/35 + "px";
 
                $scope.titleStyle = {};
                $scope.titleStyle["font-size"] = window.innerHeight/8 + "px";
 
                var c=document.getElementById("redshiftCanvas");
 
                if (c !== "undefined" && c) {
                    $scope.renderMenuBackdrop();
                }
 
 
            };
            $scope.resizeEventListener = function() {
                $scope.onResize();
                $scope.$apply();
            };
            $scope.onResizeEventListener = window.addEventListener("resize", $scope.resizeEventListener, false);
            $scope.onResize();
 
            //onOrientationChange
            $scope.onOrientationChange = function() {
                $scope.orientationChangeSetTimeout = window.setTimeout($scope.resizeEventListener, 20);
            }

            $scope.orientationChangeEventListener = function() {
                $scope.onOrientationChange();
            };
            $scope.onOrientationChangeEventListener = window.addEventListener("orientationchange", $scope.orientationChangeEventListener, false);

 
            // on Destroy
            $scope.$on("$destroy", function() {
            	//console.log("onDestroy");
                window.removeEventListener("resize", $scope.onResizeEventListener, false);
                window.removeEventListener("touchmove", $scope.onTouchMoveEventListener, false);
                window.removeEventListener("orientationchange", $scope.onOrientationChangeEventListener, false);
                window.clearTimeout($scope.orientationChangeSetTimeout);
            });   
        };
     

 
 	angular.module('main.menuUtils', []).factory('MenuUtils', function () {
 		return {
 			init : myMenuUtils
    		};
	});
      
}()); //IFFE
