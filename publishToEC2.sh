#!/bin/bash  
echo Publishing
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/main.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/tile.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/collisionTile.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/touchEventHandler.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/mouseEventHandler.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/index.html ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.