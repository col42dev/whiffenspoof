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
            return headTag;
        };
            
        NewGame.prototype.markupCanvasTable = function () {
            var canvasTable = "";
            canvasTable  += "<table>";
            canvasTable  += "   <tr>";
            canvasTable  += "       <td>";
            canvasTable  += "           <canvas id='myCanvas' style='border:1px solid #d3d3d3;'>Your browser does not support the HTML5 canvas tag.</canvas>";
            canvasTable  += "       </td>";
            canvasTable  += "       <td align='top'>";
            canvasTable  += "           <h4 id='moveCounter'>---</h4>";
            canvasTable  += "       </td>";
            canvasTable  += "   </tr>";
            canvasTable  += "</table>";
            return canvasTable;
        };


        return NewGame;
                  
    }); //define
      
}()); //IFFY