#!/bin/bash  
echo Publishing
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/main.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/tile.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/collisionTile.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/touchEventHandler.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/mouseEventHandler.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/ioEventHandler.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/gameState.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/mainloop.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/mainmenu.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/newgame.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/angular.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.


scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/redshift.html ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/game.html ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/menu.html ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/css/*.css ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/css/.