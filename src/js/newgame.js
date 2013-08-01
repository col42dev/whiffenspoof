(function() {
    "use strict";
        
     define(["src/js/mainloop"], function(MainLoop) {   

        var NewGame = function() {       
            this.bodynode = document.getElementById('body-id');      
            this.headnode = document.getElementById('head-id');
        };
        
        NewGame.prototype.start = function ( ) {
            this.mainloop = new MainLoop(); 
        };
            
        NewGame.prototype.markupHeadNodeGame = function () {
            var headTag = "";
            headTag += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />";
            headTag += "<title>Redshift</title>";
            headTag += "<link rel='stylesheet' href='./src/css/bootstrap.css'>";
            headTag += "<link rel='stylesheet' href='./src/css/docs.css'>";
            headTag += "<meta name='apple-mobile-web-app-capable' content='yes' />";
            headTag += "<meta name='apple-mobile-web-app-status-bar-style' content='black' />";
            
            headTag += "<script type='text/javascript' src='src/js/sat-js/SAT.js'></script>"
            headTag += "<script type='text/javascript' src='src/js/require.js'></script>"
            headTag += "<script type='text/javascript' src='vendor/js/angular.js'></script>" 
            headTag += "<script type='text/javascript' src='src/js/main.js'></script>"
 
 
            return headTag;
        };
            
        NewGame.prototype.markupCanvasTable = function () {
            var canvasTable = "";

            canvasTable  += "           <canvas id='myCanvas' style='border:1px solid #d3d3d3;'>Your browser does not support the HTML5 canvas tag.</canvas>";

            return canvasTable;
        };


        return NewGame;
                  
    }); //define
      
}()); //IFFY