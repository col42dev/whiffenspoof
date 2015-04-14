#!/bin/bash  
echo Publishing
scp -i /Users/colinmoore/cmoore2.pem ./src/js/*.js ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.

scp -i /Users/colinmoore/cmoore2.pem ./src/js/sat-js/*.* ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/sat-js/.

scp -i /Users/colinmoore/cmoore2.pem ./src/css/*.css ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/css/.



scp -i /Users/colinmoore/cmoore2.pem ./src/template/*.* ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/template/.

#scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/img/*.* ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/img/.

scp -i /Users/colinmoore/cmoore2.pem ./scoretable.js ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.
scp -i /Users/colinmoore/cmoore2.pem ./scoretableApp.js ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.

scp -i /Users/colinmoore/cmoore2.pem ./doc/*.html ec2-user@ec2-54-201-237-107.compute.amazonaws.com:~/nginx/html/whiffenspoof/doc/.

scp -i /Users/colinmoore/cmoore2.pem ./redshift.html ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.
