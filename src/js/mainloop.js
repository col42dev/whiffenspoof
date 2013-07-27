(function() {
    "use strict";
        
     define(["src/js/tile", "src/js/touchEventHandler", "src/js/mouseEventHandler", "src/js/gameState"], function(Tile, TouchEventHandler, MouseEventHandler, GameState) {   

         var mainloop = function ( mouseEventHandler, touchEventHandler, tiles) {         

              var myCanvas=document.getElementById("myCanvas");
              var ctx=myCanvas.getContext("2d");
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
              
              var flagResize = 1;
              window.addEventListener("resize", function() {
                    // Get screen size (inner/outerWidth, inner/outerHeight)
                    flagResize = 1;
    
                    }, false);

              
              function redraw() {
                ctx.fillStyle = "rgb(255, 255, 255)";  
                ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
                for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
                    tiles[tileIdx].draw(ctx);
                }         
              }
        
              //redraw();
              
              function onResize() {
                    myCanvas.height = document.body.clientHeight ; 
                    myCanvas.width = (myCanvas.height / 11)  * 6; 
                    
                    var oldTileUnitSize = Tile.prototype.tileUnitSize;
                    Tile.prototype.tileUnitSize = myCanvas.height / 11;
                    
                    
                    for (var tileIdx = 0;  tileIdx < tiles.length; tileIdx = tileIdx + 1) {
                        tiles[tileIdx].resize(oldTileUnitSize);
                    }  

                    redraw();              
              }
                      
              function myTimer( timerIntervalMilliseconds ) {
                  
                // reorientate/resize view
                if ( flagResize) {
                    onResize();
                    flagResize = 0; 
                    //console.log("resize");
                }
                   
                // for each IO event handler
                for ( var ioHandlerIndex=0; ioHandlerIndex<ioEventHandlers.length; ioHandlerIndex+=1) {
                    if (typeof ioEventHandlers[ioHandlerIndex] !== "undefined") {   
    
                      var touchPos = ioEventHandlers[ioHandlerIndex].pos;
                     
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
                              ioEventHandlers[ioHandlerIndex].selectedTile.slideTo(touchPos, tiles); 
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