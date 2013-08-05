var express = require('express');
var app = express();


var scores = [
  { tag : 'Audrey Hepburn', moves : 750, date: Date()},
  { tag : 'Walt Disney', moves : 666, date: Date()},
  { tag : 'Unknown', moves : 490, date: Date()},
  { tag : 'Neale Donald Walsch', moves : 950, date: Date()}
];

app.get('/', function(req, res) {
  //res.type('application/json');
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  //res.send('i am a beautiful butterfly');
  res.header("Access-Control-Allow-Origin", "*")
  res.json(scores);
});

app.get('/score/random', function(req, res) {
  var id = Math.floor(Math.random() * scores.length);
  var q = scores[id];
  res.json(q);
});

app.get('/score/:id', function(req, res) {
  if(scores.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  var q = scores[req.params.id];
  res.json(q);
});

app.post('/score', function(req, res) {
  if(!req.body.hasOwnProperty('tag') ||
     !req.body.hasOwnProperty('score')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var newScore = {
    tag : req.body.tag,
    score : req.body.score,
    date: Date()
  };

  scores.push(newQuote);
  res.header("Access-Control-Allow-Origin", "*")
  res.json(true);
});
