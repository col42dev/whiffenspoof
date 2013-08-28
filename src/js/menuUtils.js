(function() {
    "use strict";




	/** Taken from Earl F. Glynn's web page:
	* <a href="http://www.efg2.com/Lab/ScienceAndEngineering/Spectra.htm">Spectra Lab Report</a>
	* */
	var waveLengthToRGB = function(Wavelength) {
	    var factor;
	    var Red,Green,Blue;
	
	    var Gamma = 0.80;
		var IntensityMax = 255;
	
	    if((Wavelength >= 380) && (Wavelength<440)){
	        Red = -(Wavelength - 440) / (440 - 380);
	        Green = 0.0;
	        Blue = 1.0;
	    }else if((Wavelength >= 440) && (Wavelength<490)){
	        Red = 0.0;
	        Green = (Wavelength - 440) / (490 - 440);
	        Blue = 1.0;
	    }else if((Wavelength >= 490) && (Wavelength<510)){
	        Red = 0.0;
	        Green = 1.0;
	        Blue = -(Wavelength - 510) / (510 - 490);
	    }else if((Wavelength >= 510) && (Wavelength<580)){
	        Red = (Wavelength - 510) / (580 - 510);
	        Green = 1.0;
	        Blue = 0.0;
	    }else if((Wavelength >= 580) && (Wavelength<645)){
	        Red = 1.0;
	        Green = -(Wavelength - 645) / (645 - 580);
	        Blue = 0.0;
	    }else if((Wavelength >= 645) && (Wavelength<781)){
	        Red = 1.0;
	        Green = 0.0;
	        Blue = 0.0;
	    }else{
	        Red = 0.0;
	        Green = 0.0;
	        Blue = 0.0;
	    };
	
	    // Let the intensity fall off near the vision limits
	
	    if((Wavelength >= 380) && (Wavelength<420)){
	        factor = 0.3 + 0.7*(Wavelength - 380) / (420 - 380);
	    }else if((Wavelength >= 420) && (Wavelength<701)){
	        factor = 1.0;
	    }else if((Wavelength >= 701) && (Wavelength<781)){
	        factor = 0.3 + 0.7*(780 - Wavelength) / (780 - 700);
	    }else{
	        factor = 0.0;
	    };
	
	
	    var rgb = {};
	
	    // Don't want 0^x = 1 for x <> 0
	    rgb.r = Math.round(IntensityMax * Math.pow(Red * factor, Gamma));
	    rgb.g = Math.round(IntensityMax * Math.pow(Green * factor, Gamma));
	    rgb.b = Math.round(IntensityMax * Math.pow(Blue * factor, Gamma));
	
	    return rgb;
	}


	var wavelengthGradient  = function () {

		var c=document.getElementById("redshiftCanvas");
 
    	c.height = window.innerHeight; //document.body.clientHeight ;
    	c.width = window.innerWidth; //(this.myCanvas.height / 11)  * (6 + 2); //document.width is obsolete
    	var ctx = c.getContext("2d");
    
        var grd=ctx.createLinearGradient(0,0,c.width,0);

    	grd.addColorStop(0,"rgba(255,255,0,0.5)");
    	grd.addColorStop(0.3,"orange");
    	grd.addColorStop(1.0,"rgba(255,0,0,0.8)");
    	ctx.fillStyle=grd;
    	ctx.fillRect(0,0,c.width,c.height);
 
    	for (var wl = 380; wl < 780; wl += 1) {
    		//console.log( waveLengthToRGB(wl));
    		var rgb = waveLengthToRGB(wl);
    		grd.addColorStop((wl-380)/(780-380),"rgb("+rgb.r+","+rgb.g+","+rgb.b+")");
    	}

    	return grd;
    }

        
    var renderMenuBackdrop = function( $scope ) {


    	var c=document.getElementById("redshiftCanvas");
 
    	c.height = window.innerHeight * 1; //document.body.clientHeight ;
    	c.width = window.innerWidth * 1//(this.myCanvas.height / 11)  * (6 + 2); //document.width is obsolete
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

    	//ctx.fillStyle=wavelengthGradient();
    	//ctx.fillRect(0,c.height * .4,c.width,c.height *.2);
 
 
   
    	grd=ctx.createLinearGradient(c.width*0.825,0, (c.width*0.825)+(c.width*0.025),0);
    	grd.addColorStop(0.0,"rgba(40,40,40,0.2)");
    	grd.addColorStop(0.4,"rgba(40,40,40,0.8)");
    	grd.addColorStop(0.6,"rgba(40,40,40,0.8)");
    	grd.addColorStop(1.0,"rgba(40,40,40,0.2)");
    	ctx.fillStyle=grd;
    	ctx.fillRect(c.width*0.825,0, c.width*0.025,c.height);
 
    
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

    var onResize = function($scope) {
    	$scope.menuButtonStyle = {};
    	$scope.menuButtonStyle["font-size"] = window.innerHeight/20 + "px";
    	//$scope.menuButtonStyle.

    	$scope.menuSmallButtonStyle = {};
    	$scope.menuSmallButtonStyle["font-size"] = window.innerHeight/30 + "px";

 
    	$scope.instructionTextStyle = {};
    	$scope.instructionTextStyle["font-size"] = window.innerHeight/35 + "px";
 
    	$scope.titleStyle = {};
    	$scope.titleStyle["font-size"] = window.innerHeight/8 + "px";
 
    	var c=document.getElementById("redshiftCanvas");
 
    	if (c !== "undefined" && c) {
    	    $scope.renderMenuBackdrop($scope);
    	}
    };


    var myMenuUtils  = function MenuUtils($scope) {

         //onTouchmove
         $scope.touchmoveEventListener = function(event) {
             event.preventDefault();  // prevent scrolling
         };
         $scope.onTouchMoveEventListener = window.addEventListener('touchmove', $scope.touchmoveEventListener, true);
 
 		//render
         $scope.renderMenuBackdrop = renderMenuBackdrop;
 
         //onResize
         $scope.onResize = onResize;
         $scope.resizeEventListener = function() {
             $scope.onResize($scope);
             $scope.$apply();
         };
         $scope.onResizeEventListener = window.addEventListener("resize", $scope.resizeEventListener, false);
         $scope.onResize($scope);
 
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
             window.removeEventListener("resize", $scope.onResizeEventListener, false);
             window.removeEventListener("touchmove", $scope.onTouchMoveEventListener, false);
             window.removeEventListener("orientationchange", $scope.onOrientationChangeEventListener, false);
             window.clearTimeout($scope.orientationChangeSetTimeout);
         });   
 	};

  

  
 
    //Factory methods for Menus
 	angular.module('main.menuUtils', []).factory('MenuUtils', function () {
 		return {
 			init : myMenuUtils,
            initMainMenu :  function($scope) { 

                    require([ "src/js/menuloop"], function(MenuLoop) { 

                        //var ml = new MenuLoop($scope);
                        //console.log(ml);
            
                    });

                }
    		};
	});


    function MenuLoopWrapper($scope) {
                    require([ "src/js/menuloop"], function( MenuLoop) { 

                        var ml = new MenuLoop($scope);
                        //console.log("1" + ml.dirtyRect);
                        return ml;
                        
            
                    });
                }

    //Factory methods for Menus
    angular.module('main.menuTiles', []).factory('MenuTiles', ['$http',  function ($http) {
        return  function($scope) { 
                    this.mlw = undefined;

                     this.mlw = new MenuLoopWrapper($scope);
                        console.log("1" + this.mlw.dirtyRect);

                    return this.mlw;

                };
     }]);
      
}()); //IFFE
