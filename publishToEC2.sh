#!/bin/bash  
echo Publishing
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/*.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/.

scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/js/sat-js/*.* ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/js/sat-js/.

scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/css/*.css ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/css/.



scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/template/*.* ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/template/.

#scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/src/img/*.* ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/src/img/.

scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/scoretable.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.
scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/scoretableApp.js ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.

scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/doc/*.html ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/doc/.

scp -i /Users/colinmoore/cmoore2.pem /Users/colinmoore/dev/ASWorkspace/whiffenspoof/redshift.html ec2-user@ec2-54-213-75-45.us-west-2.compute.amazonaws.com:~/nginx/html/whiffenspoof/.
