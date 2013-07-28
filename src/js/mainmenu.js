(function() {
    "use strict";
        
     define(["src/js/newgame"], function(NewGame) {   

        var Mainmenu = function ( ) {  
            var _this = this;
            this.bodynode = document.getElementById('body-id');
            this.templateBodynodeInnerHTML = this.bodynode.innerHTML;       
            this.headnode = document.getElementById('head-id');
            this.headnode.innerHTML = this.markupHeadNodeMainMenu();          
            this.bodynode.innerHTML = this.markupBodyNodeMainMenu() + this.bodynode.innerHTML; 
            this.newGame = new NewGame();
                 
                   
            document.getElementById('newgame').onclick = function () { 
                document.getElementById('head-id').innerHTML = _this.newGame.markupHeadNodeGame(); 
                document.getElementById('body-id').innerHTML = _this.newGame.markupCanvasTable() + _this.templateBodynodeInnerHTML;
                _this.newGame.start();
            };
            document.getElementById('newgame').ontouchstart = function () { 
                document.getElementById('head-id').innerHTML = _this.newGame.markupHeadNodeGame(); 
                document.getElementById('body-id').innerHTML = _this.newGame.markupCanvasTable() + _this.templateBodynodeInnerHTML;
                _this.newGame.start();
           };
        };
        
        Mainmenu.prototype.markupHeadNodeMainMenu = function() {       
                var headTag = "";
                headTag += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />";
                headTag += "<title>Redshift</title>";
                headTag += "<!--link rel='stylesheet' href='./src/css/bootstrap.css'-->";
                headTag += "<!--link rel='stylesheet' href='./src/css/docs.css'-->";
                headTag += "<!--prevent zooming -->";
                headTag += "<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no'>";
                headTag += "<meta http-equiv='Content-Type' content='application/xhtml+xml; charset=utf-8' />";
                headTag += "<meta name='description' content='iPad CSS Layout with Landscape/Portrait Orientations (Demo)' />";
                headTag += "<meta name='keywords' content='iPad CSS Layout with Landscape/Portrait Orientations (Demo)' />";
                headTag += "<meta name='robots' content='index, follow' />";
                headTag += "<meta name='apple-mobile-web-app-capable' content='yes' />";
                headTag += "<meta name='apple-mobile-web-app-status-bar-style' content='black' />";
                headTag += "<link rel='stylesheet' type='text/css' href='./src/css/ipad.css' media='screen' />";
                headTag += "<link rel='stylesheet' type='text/css' href='./src/css/menu.css' />";      
                return headTag;
        };
            
        Mainmenu.prototype.markupBodyNodeMainMenu = function() {
                 var menuMarkup = "";
                 menuMarkup  += "<div>";
                 menuMarkup  += "    <table width='100%'>";
                 menuMarkup  += "        <tr>";
                 menuMarkup  += "            <td>";
                 menuMarkup  += "                <h1 class='red'>Red&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1> <h1 class='shift'>&nbsp;Shift</h1>";
                 menuMarkup  += "           </td>";
                 menuMarkup  += "       </tr>";
                 menuMarkup  += "    </table>";
                 menuMarkup  += "</div>";
                 menuMarkup  += "<div>";
                 menuMarkup  += "    <table width='100%'>";
                 menuMarkup  += "        <tr>";
                 menuMarkup  += "           <td>";
                 menuMarkup  += "                <h2 id='newgame'>start</h2>";
                 menuMarkup  += "           </td>";
                 menuMarkup  += "        </tr>";
                 menuMarkup  += "        <tr>";
                 menuMarkup  += "           <td>";
                 menuMarkup  += "                <h2>scores</h2>";
                 menuMarkup  += "           </td>";
                 menuMarkup  += "        </tr>";
                 menuMarkup  += "        <tr>";
                 menuMarkup  += "           <td>";
                 menuMarkup  += "                <h2>about</h2>";
                 menuMarkup  += "           </td>";
                 menuMarkup  += "        </tr>";
                 menuMarkup  += "    </table>";
                 menuMarkup  += "</div>";           
                 return menuMarkup;
        };
                   
        return Mainmenu;
                  
    }); //define
      
}()); //IFFY