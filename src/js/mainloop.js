(function() {
    "use strict";
        
     define(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   

         var mainloop = function ( mouseEventHandler, touchEventHandler, tiles) {         

              var ctx=document.getElementById("myCanvas").getContext("2d");
              var timerMilliseconds = 20;
              var timerCallback = function() { 
                   myTimer(timerMilliseconds); 
              };
              var myVar=setInterval(timerCallback, timerMilliseconds);
               
              var dirtyRect = {
                           x : 0,
                           y : 0,
                           w : 0,
                           h : 0
                       };
                       
              var wasTileSelectedOnLastUpdate = 0;
              
              var ioEventHandlers = [mouseEventHandler, touchEventHandler];
                      
              function myTimer( timerIntervalMilliseconds ) {
                   
                for ( var ioHandlerIndex=0; ioHandlerIndex<ioEventHandlers.length; ioHandlerIndex+=1) {
                    if (typeof ioEventHandlers[ioHandlerIndex] !== "undefined") {   
        
                      var mousePos = ioEventHandlers[ioHandlerIndex].pos;
                      //document.getElementById('inner').innerHTML = "MOUSE: " + String(mousePos.x) + ", " + String(mousePos.y);
                     
                      if (typeof ioEventHandlers[ioHandlerIndex].selectedTile !== "undefined") {
                          if (!wasTileSelectedOnLastUpdate) {  // set dirtyRect to tile inital selection 
                              dirtyRect = ioEventHandlers[ioHandlerIndex].selectedTile.getDirtyRect(); 
                          }
                          // clear old tile render
                          ctx.clearRect(dirtyRect.x, dirtyRect.y, dirtyRect.w, dirtyRect.h);
            
                          // move tile positon
                          if ( ioEventHandlers[ioHandlerIndex].flagSnapToGrid ) {
                              ioEventHandlers[ioHandlerIndex].selectedTile.snapToGrid();               
                          } else {
                              ioEventHandlers[ioHandlerIndex].selectedTile.slideTo(mousePos, tiles); 
                          }
                          
                          // draw tile in new position
                          ioEventHandlers[ioHandlerIndex].selectedTile.draw(ctx);  
                          
                          // set dirty rect ready for next update
                          dirtyRect = ioEventHandlers[ioHandlerIndex].selectedTile.getDirtyRect();   
                          
                          // handle deselected tile state
                          if ( ioEventHandlers[ioHandlerIndex].flagSnapToGrid ) {
                               ioEventHandlers[ioHandlerIndex].flagSnapToGrid = 0;
                               ioEventHandlers[ioHandlerIndex].selectedTile = undefined;
                          } 
                          wasTileSelectedOnLastUpdate = 1;
                      } else {
                          wasTileSelectedOnLastUpdate = 0;
                      }
                    }
                  } // forloop
            
              } // myTimer()  

          };
          
          return mainloop;
                      }); //define      }()); //IFFY