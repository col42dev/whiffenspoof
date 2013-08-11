// http://blog.modulus.io/nodejs-and-express-create-rest-api
// http://stackoverflow.com/questions/10578249/hosting-nodejs-application-in-ec2
// http://www.html5rocks.com/en/tutorials/cors/#toc-adding-cors-support-to-the-server
// http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs

var express = require('express');
//var ScoreTable = require('./scoretable').ScoreTable;

console.log("express..");

var app = express();

console.log("use bodyParser...");
app.use(express.bodyParser());

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});


console.log("running");

//@http://howtonode.org/node-js-and-mongodb-getting-started-with-mongoj
var databaseUrl = "redshift"; // "username:password@example.com/mydb"
var collections = ["scores"]
var db = require("mongojs").connect(databaseUrl, collections);

/*
db.scores.save({tag: "srirangan@gmail.com", moves: 100, date: Date()}, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});
*/
console.log("find");

db.scores.find(function(err, scores) {
  if( err || !scores) console.log("No scores found");
  else scores.forEach( function(score) {
    console.log(score);
  } );
});

var scores = [
  { tag : 'Audrey Hepburn', moves : 750, date: Date(), gameLevel:0},
  { tag : 'Walt Disney', moves : 666, date: Date(), gameLevel:0},
  { tag : 'Unknown', moves : 490, date: Date(), gameLevel:0},
  { tag : 'Neale Donald Walsch', moves : 950, date: Date(), gameLevel:0}
];

console.log("app.all");
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    next();
 });
 

// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"tag":"noob","score":43,"date":"now"}' http://ec2-54-213-75-45.us-west-2.compute.amazonaws.com:8080/score
console.log("app.post");
app.post('/score', function(req, res) {
    
  console.log("post score");
  console.log("body:" + req.body);
  console.log("req:" + req);
  
  req.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
    
  if(!req.body.hasOwnProperty('tag') ||
     !req.body.hasOwnProperty('moves') ||
     !req.body.hasOwnProperty('gameLevel') ||
     !req.body.hasOwnProperty('date')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  console.log("new score");

    db.scores.save({tag : req.body.tag, moves : req.body.moves, date: req.body.date, gameLevel: req.body.gameLevel}, function(err, saved) {
        if( err || !saved ) console.log("Score not saved");
        else console.log("Score saved");
    });

  var newScore = {
    tag : req.body.tag,
    moves : req.body.moves,
    date: req.body.date,
    gameLevel: req.body.gameLevel
  };

  //scores.push(newScore);
  
  res.header("Access-Control-Allow-Origin", "*");
  res.json(true);
});


console.log("app.get");
app.get('/', function(req, res) {

   //http://cypressnorth.com/programming/cross-domain-ajax-request-with-json-response-for-iefirefoxchrome-safari-jquery/
   //http://stackoverflow.com/questions/10078173/spine-node-js-express-and-access-control-allow-origin
   //http://cypressnorth.com/programming/cross-domain-ajax-request-with-json-response-for-iefirefoxchrome-safari-jquery/
   //http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is
   
  res.header("Access-Control-Allow-Origin", "*");
  //res.json(scores);
  
    db.scores.find(function(err, scores) {
        if( err || !scores) console.log("No scores found");
        else {
            console.log("scores found:" + scores.length);
            res.json(scores);
        };
    });
});

console.log("app.get");
app.get('/score/random', function(req, res) {
  var id = Math.floor(Math.random() * scores.length);
  var q = scores[id];
  res.header("Access-Control-Allow-Origin", "*");
  res.json(q);
});

console.log("app.get");
app.get('/score/:id', function(req, res) {
  if(scores.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  var q = scores[req.params.id];
  res.header("Access-Control-Allow-Origin", "*");
  res.json(q);
});



console.log("app.listen");
app.listen(8080);
